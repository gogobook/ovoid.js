/**
 * OvoiD.JS - WebGL Based Multimedia Middleware API
 * 
 * Copyright (C) 2011 - 2014  Eric M.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */



/**
 * Constructor method.
 * 
 * @class Skin controler node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Skin node implements a mesh skinning deformer.
 * The Skin node is a dependency node and does not takes place directly in 
 * the 3D world. It is typically assigned to one or more Body node.<br><br>
 * 
 * <b>Body node and shape concept</b><br><br>
 * 
 * A Mesh node which is not assigned to a Body node will never be drawn. The 
 * Mesh node is what is called a "shape" and must be assigned to a 
 * world-transformable Body node to be included in the drawing pipeline.<br><br>
 * 
 * To make the concept more understandable, think that Body nodes are like 
 * invisible spirits without shape floating in the 3D world. To make a visible 
 * spirit, you have to give it a shape. You can assign the same shape node to 
 * several Body nodes in the same scene, than you obtain several identical 
 * shapes with different transformations (rotation, position, etc...).<br><br>
 * 
 * <b>Skin Local Data Mirroring</b><br><br>
 * 
 * The local data mirroring force the node to creates its own copy of the 
 * deformed mesh in real-time. Usually, the mesh is deformed through the vertex 
 * shader by the GPU, which prevent hitting global performances. Unfortunately, 
 * the deformed data are not retrievable, and can not be used for further 
 * operations like building shadow volumes  or bounding box. For this reason, 
 * a local version of the deformed mesh must be created. Because the mesh 
 * deformation is calculated through normal process, it impacts the global 
 * performances.<br><br>
 * 
 * The Local Data Mirroring can be enabled or disabled through the 
 * <c>Ovoid.opt_localSkinData</c> global option.
 * 
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Skin = function(name, i) {

  Ovoid.Node.call(this);
  /** node type */
  this.type |= Ovoid.SKIN;
  /** Node name.
   * @type string */
  this.name = name;
  /** Target mesh reference.
   * @type Mesh */
  this.mesh = null;
  /** Joints references list.
   * @type Joint[] */
  this.joint = new Array();

  /** Joint's bind pose inverse matrices.
   * @type Matrix4[] */
  this.bindJointMatrix = new Array();
  /** Mesh's bind pose matrix.
   * @type Matrix4 */
  this.bindShapeMatrix = new Ovoid.Matrix4();
  /** Skinning world influence matrices.
   * @type Matrix4[] */
  this.infWorldMatrix = new Array();
  /** Skinning normal influence matrices.
   * @type Matrix3[] */
  this.infNormalMatrix = new Array();
  
  /** Skin influence matrices buffer.
   * @type Float32Array */
  this.infMxfArray = new Float32Array(Ovoid.MAX_JOINT_BY_SKIN * 16);
  /** Skin influence normal matrices buffer
   * @type Float32Array */
  this.infMnrArray = new Float32Array(Ovoid.MAX_JOINT_BY_SKIN * 9);
  
  /** Local mirror vertices list.
   * @type Vertex[][] */
  this.vertices = new Array(Ovoid.MAX_MESH_LOD);

  /** Local mirror triangles list.
   * @type Triangle[][] */
  this.triangles = new Array(Ovoid.MAX_MESH_LOD);
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;

};
Ovoid.Skin.prototype = new Ovoid.Node;
Ovoid.Skin.prototype.constructor = Ovoid.Skin;


/**
 * Link influence Joint.<br><br>
 *
 * Links the specified Joint to this instance as skinning influence.
 * 
 * @param {Object} joint Joint node.
 */
Ovoid.Skin.prototype.linkJoint = function(joint) {

  this.joint.push(joint);
  this.makeDepend(joint);
  joint.skin = this;
  this.bindJointMatrix.push(new Ovoid.Matrix4());
  this.infWorldMatrix.push(new Ovoid.Matrix4());
  this.infNormalMatrix.push(new Ovoid.Matrix3());
  this.unCach(Ovoid.CACH_SKIN);
};


/**
 * Unlink influence Joint.<br><br>
 *
 * Unkinks the specified Joint from this instance as skinning influence.
 * 
 * @param {Object} joint Joint node.
 */
Ovoid.Skin.prototype.unlinkJoint = function(joint) {

  var i = this.joint.length;
  while (i--) {
    if(this.joint[i] === joint) {
      this.joint.splice(i, 1);
      this.bindJointMatrix.splice(i, 1);
      this.infWorldMatrix.splice(i, 1);
      this.infNormalMatrix.splice(i, 1);
    }
  }
  this.breakDepend(joint);
  joint.skin = null;
  this.unCach(Ovoid.CACH_SKIN);
};


/**
 * Mirror mesh data.<br><br>
 * 
 * Create a local mesh's data mirror to calculate the wheited/deformed mesh data
 * in real time.
 * 
 * @private
 */
Ovoid.Skin.prototype._localMirror = function() {
  
  /* mirroir des vertices et polygones du mesh */
  for (var l = 0; l < Ovoid.MAX_MESH_LOD; l++) {
    this.triangles[l] = Ovoid.Triangle.newArray(this.mesh.triangles[l].length);
    this.vertices[l] = Ovoid.Vertex.newArray(this.mesh.vertices[l].length);
    for (var t = 0; t < this.mesh.triangles[l].length; t++) {
      this.triangles[l][t].copy(this.mesh.triangles[l][t]);
    }
  }
}


/**
 * Bind skin.<br><br>
 * 
 * Configures vertices of the specified Mesh according to the given 
 * weigths, Joints indices and matrices. The weights and joint's id are stored
 * in the mesh's vertice's data.
 *
 * @param {Mesh} mesh Mesh Object to bind skin.
 * @param {Matrix4} mbindshape Mesh bind pose matrix.
 * @param {Matrix4[]} mbindjoint Joints's bind pose inverse matrices array.
 * @param {float[]} refpos Mesh's vertices position reference Array.
 * @param {float[]} jointid Mesh's vertices Joint indices Array.
 * @param {float[]} wweigth Mesh's vertices weights Array.
 */
Ovoid.Skin.prototype.bindSkin = function(mesh, mbindshape, mbindjoint,
                                    refpos, jointid, weigth) {

  /* TODO: Il est inutile de garder ces listes dans la classe, les infos
   * sont stoqués dans les vertices du shape, pourquoi les garder ?? */
  
  /* assigne le shape */
  if (this.mesh != null) {
    this.breakDepend(this.mesh);
  }
  this.mesh = mesh;
  this.makeDepend(mesh);
  
  /* mirroir des vertices et polygones du mesh */
  if (Ovoid.opt_localSkinData) {
    this._localMirror();
  }
  
  /* on ajoute ensuite les weights et les ijoint aux nouveau
   * tableau de vertices */
  for (var l = 0; l < Ovoid.MAX_MESH_LOD; l++) {
      
    var v, i, j, p;
    i = this.mesh.vertices[l].length;
    while (i--) {
      j = refpos.length / 3;
      while (j--) {

        p = this.mesh.vertices[l][i].p;
        /* si la position du vertice du shape correspond a la
         * position reference on ajoute les weights et les ijoint
         * au vertex */

        /* TODO: on peut envisager une tolérence de position pour
         * un skining des lods inférieurs... */
        if (p.v[0] == refpos[(j * 3) + 0] &&
            p.v[1] == refpos[(j * 3) + 1] &&
            p.v[2] == refpos[(j * 3) + 2])
        {
          v = j * 4;
          this.mesh.vertices[l][i].i.setv(
              jointid.subarray(v, v + 4));

          this.mesh.vertices[l][i].w.setv(
              weigth.subarray(v, v + 4));
        }
      }
    }
  }
  
  /* On definie les bindpose pour chaque joint. Il faut la matrice
   * monde de l'objet et de chaque joint au moment du bind (c'est un
   * instantané du bind). On multiplie ensuite l'inverse de chaque
   * matrice joint à la matrice de l'objet */
  this.bindShapeMatrix = mbindshape;

  /* TODO: A priori, la bindshape matrix n'est pas utile au delà de l'init
   * du skinning, pourquoi la garder après ? */
  var c = mbindjoint.length;
  for (var i = 0; i < c; i++) {

    this.bindJointMatrix[i] = new Ovoid.Matrix4();
    this.bindJointMatrix[i].multOf(this.bindShapeMatrix,
        mbindjoint[i]);
  }

  /* on crée ou recrée les buffers avec le nouveau format de vertex */
  var vformat = this.mesh._vformat | Ovoid.VERTEX_VEC4_I | Ovoid.VERTEX_VEC4_W;
  this.mesh._createBuffers(vformat, Ovoid.BUFFER_STATIC);

  this.unCach(Ovoid.CACH_SKIN);
};


/**
 * Node's caching function.
 *
 * <br><br>Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <c>Ovoid.Queuer</c> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Skin.prototype.cachSkin = function() {

  if (!(this.cach & Ovoid.CACH_SKIN)) {

    var c = this.joint.length;
    for (var i = 0; i < c; i++) {
      this.infWorldMatrix[i].multOf(this.bindJointMatrix[i],
          this.joint[i].worldMatrix);

      this.infNormalMatrix[i].fromMat4(this.infWorldMatrix[i]);
      this.infNormalMatrix[i].toNormalTransform();
      
      this.infMxfArray.set(this.infWorldMatrix[i].m, i * 16);
      this.infMnrArray.set(this.infNormalMatrix[i].m, i * 9);
      // On world-cach le joint à partir du moment où le skin est up-to-date
      this.joint[i].addCach(Ovoid.CACH_WORLD);
    }
    
    // Mirroring des weighted vertices
    if (this._i.opt_localSkinData && this.mesh) {
        
      // Pour le calcul du bounding volum
      var min = new Ovoid.Point(Ovoid.FLOAT_MAX,
          Ovoid.FLOAT_MAX,
          Ovoid.FLOAT_MAX,
          1.0);
          
      var max = new Ovoid.Point(Ovoid.FLOAT_MIN,
          Ovoid.FLOAT_MIN,
          Ovoid.FLOAT_MIN,
          1.0);
          
      var mv, sv, p0, p1, p2;
      
      var l = mesh._lod;
      var c = this.mesh.vertices[l].length;
      for (var i = 0; i < c; i++) {
        sv = this.vertices[l][i];
        mv = this.mesh.vertices[l][i];
        // remet le vertice a zero
        sv.p.set(0.0,0.0,0.0,0.0);
        // ajoute les influences

        if(mv.w.v[0]!=0.0)
          sv.p.addWeightTransform4Of(mv.p, this.infWorldMatrix[mv.i.v[0]], mv.w.v[0]); 
        if(mv.w.v[1]!=0.0)
          sv.p.addWeightTransform4Of(mv.p, this.infWorldMatrix[mv.i.v[1]], mv.w.v[1]); 
        if(mv.w.v[2]!=0.0)
          sv.p.addWeightTransform4Of(mv.p, this.infWorldMatrix[mv.i.v[2]], mv.w.v[2]); 
        if(mv.w.v[3]!=0.0)
          sv.p.addWeightTransform4Of(mv.p, this.infWorldMatrix[mv.i.v[3]], mv.w.v[3]);
          
        /* normalise le poids */
        sv.p.normalizeWeight();
        // calcul min et max pour le bounding volum
        if (sv.p.v[0] > max.v[0]) max.v[0] = sv.p.v[0];
        if (sv.p.v[1] > max.v[1]) max.v[1] = sv.p.v[1];
        if (sv.p.v[2] > max.v[2]) max.v[2] = sv.p.v[2];

        if (sv.p.v[0] < min.v[0]) min.v[0] = sv.p.v[0];
        if (sv.p.v[1] < min.v[1]) min.v[1] = sv.p.v[1];
        if (sv.p.v[2] < min.v[2]) min.v[2] = sv.p.v[2];
      }
      // On met a jour les infos triangles si le shadow-volum est enabled
      if (this._i.opt_shadowCasting) {
        // pour la maj des triangles
        var v0 = new Ovoid.Vector();
        var v1 = new Ovoid.Vector();
        for (var t = 0; t < this.triangles[l].length; t++) {
          // les 3 vertices du triangle
          p0 = this.vertices[l][this.triangles[l][t].index[0]].p;
          p1 = this.vertices[l][this.triangles[l][t].index[1]].p;
          p2 = this.vertices[l][this.triangles[l][t].index[2]].p;
          
          // calcul de la normale
          v0.subOf(p0, p1);
          v1.subOf(p0, p2);

          this.triangles[l][t].normal.crossOf(v0, v1);

          // calcule du centre
          this.triangles[l][t].center.set(
              (p0.v[0] + p1.v[0] + p2.v[0]) / 3,
              (p0.v[1] + p1.v[1] + p2.v[1]) / 3,
              (p0.v[2] + p1.v[2] + p2.v[2]) / 3,
              1.0);
        }
      }

      this.boundingBox.setBound(min, max);
      this.boundingSphere.setBound(min, max);

      // propage l'uncach du shape
      for (var i = 0; i < this.link.length; i++)
        this.link[i].unCach(Ovoid.CACH_BOUNDING_SHAPE);
    }
    
    this.addCach(Ovoid.CACH_SKIN);
  }
};


/**
 * JavaScript Object Notation (JSON) serialization method.
 * 
 * <br><br>This method is commonly used by the <c>Ovoid.Ojson</c> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Skin.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.SKIN;
  /* Ovoid.Node */
  o['n'] = this.name;
  o['v'] = this.visible;
  o['u'] = this.uid;
  o['p'] = this.parent?this.parent.uid:'null';
  o['c'] = new Array();
  for(var i = 0; i < this.child.length; i++)
    o['c'][i] = this.child[i].uid;
  o['dp'] = new Array();
  for(var i = 0; i < this.depend.length; i++)
    o['dp'][i] = this.depend[i].uid;
  o['lk'] = new Array();
  for(var i = 0; i < this.link.length; i++)
    o['lk'][i] = this.link[i].uid;
  o['bmn'] = this.boundingBox.min;
  o['bmx'] = this.boundingBox.max;
  o['brd'] = this.boundingSphere.radius;
  /* Ovoid.Skin */
  o['mh'] = this.mesh?this.mesh.uid:'null';
  o['jt'] = new Array();
  for(var i = 0; i < this.joint.length; i++)
    o['jt'][i] = this.joint[i].uid;
  o['bjm'] = this.bindJointMatrix;
  o['bsm'] = this.bindShapeMatrix;
  
  return o;

};

