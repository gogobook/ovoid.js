/**
 * OvoiD.JS - WebGL Wrapper Library
 * 
 * Copyright (C) 2011 - 2012  Eric M.
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
 * Mesh node constructor.
 * 
 * @class Mesh node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Mesh node implements a mesh geometry structure. 
 * is a collection of vertices, edges and faces that defines the shape of a 
 * polyhedral object. 
 * The Mesh node is a dependency node and does not takes place directly in 
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
 * several Body nodes in the same scene, then you obtain several identical 
 * shapes with different transformations (rotation, position, etc...).<br><br>
 * 
 * <blockcode>
 * &nbsp;&nbsp;var mesh = scene.create(Ovoid.MESH, "box1");<br>
 * &nbsp;&nbsp;body1.setShape(mesh);<br>
 * &nbsp;&nbsp;body2.setShape(mesh);<br>
 * </blockcode><br><br>
 * 
 * <b>The Mesh Structure</b>
 * <ul>
 * <li><b>Polysets</b></li>
 * The Mesh's polysets consist of a list of polygons (triangle faces) which are 
 * drawn with the same Material. The Mesh node use the <code>Ovoid.Polyset</code> 
 * object to store polysets.<br><br>
 * 
 * <li><b>Triangle Faces</b></li>
 * The Triangles consist of a triangular polygon defined by three 
 * vertices who describe a triangular surface. (OvoiD.JS supports only 
 * triangle faces). The Mesh node use the <code>Ovoid.Triangle</code> object to 
 * store triangles faces.<br><br>
 * 
 * <li><b>Vertices</b></li>
 * The Vertices consist of a position along with other information such 
 * as color, normal vector and texture coordinates.
 * The Mesh node use the <code>Ovoid.Vertex</code> object to store vertices.
 * </ul><br><br>
 * 
 * <b>The Vertex Format</b><br><br>
 * 
 * The Vertex Format describes of which properties vertices of a list are 
 * composed and how the vertices's data should be arranged in Vertex Buffer
 * Objets (VBO).  The simplest vertex has only one property: its position in 
 * space defined by a point. But a vertices can have other properties such as 
 * normal, texture coordinates, color, etc...<br><br>
 * 
 * In the OvoiD.JS Library, the Vertex Format is defined using an bitmask 
 * integer value that can be defined with symbolic constants:<br><br>
 * 
 * <blockcode>
 * var format = Ovoid.Ovoid.VERTEX_VEC4_P | Ovoid.VERTEX_VEC3_N | Ovoid.VERTEX_VEC4_C;
 * </blockcode><br><br>
 * 
 * In the above example, the resulting vertices of the specified format will 
 * include four float values for position in space, three float values for 
 * normal vector and four float values for color that give an eleven 32 
 * bits floats vertex.<br><br>
 * 
 * The available vertex format components are the following ones: <br><br>
 * 
 * <ul>
 * <li><code>Ovoid.VERTEX_VEC4_P</code></li>
 * Four 32 bits float (x,y,z,w) for position point in space.<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_N</code></li>
 * Three 32 bits float (x,y,z) for normal vector.<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_U</code></li>
 * Three 32 bits float (u,v,w) for Uv texture coordinate.<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_T</code></li>
 * Three 32 bits float (u,v,w) for Tangent space coordinate. (normal mapping)<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_B</code></li>
 * Three 32 bits float (u,v,w) for binormal vector. (normal mapping)<br><br>
 * <li><code>Ovoid.VERTEX_VEC4_C</code></li>
 * Four 32 bits float (r,g,b,a) for vertex color.<br><br>
 * <li><code>Ovoid.VERTEX_VEC4_I</code></li>
 * Four 32 bits float (i,i,i,i) for influence matrix index. (skin deform)<br><br>
 * <li><code>Ovoid.VERTEX_VEC4_W</code></li>
 * Four 32 bits float (w,w,w,w) for influence wheight. (skin deform)<br><br>
 * </ul><br><br>
 * 
 * As object, <code>Ovoid.Vertex</code> class contains 
 * all these components that can be filled at your convenience and usage. 
 * The vertex format is used to build and arrange data in Vertex Buffer Objets 
 * (VBO) and describe the GLSL vertex attributes in shaders.<br><br>
 * 
 * For more information about shader, refere to
 * <code>Ovoid.Shader</code> class documentation.<br><br><br>
 * 
 * 
 * <b>Mesh optimizations</b><br><br>
 * 
 * The mesh can and should be optimized using <code>optimizeVertices</code> and 
 * <code>optimizeTriangles</code>, especialy if you are planning to use the 
 * shadow casting rendering.<br><br>
 * 
 * <b>The vertices optimization</b> consists on 
 * merging  duplicated vertices and reassign triangles vertices's indices. 
 * This optimization reduce the vertex buffer size and improve the GPU 
 * cache-hit.<br><br>
 * 
 * <b>The triangles optimizations</b> consists on building an edge/adjacent 
 * faces map. This "map" is heavily used to build object's shadow volumes 
 * during the shadow casting rendering process. Without edge/adjacent faces 
 * map, the shadow-casting will not work properly.<br><br>
 * 
 * These optimization usualy occur during the COLLADA importation process if 
 * the suitable importation options are enabled. <b>This may take a long time 
 * to finish if the mesh has many vertices and triangles, and especialy the 
 * triangles optimization that have more or less a polynomial O(n²) 
 * complexity.</b><br><br>
 * 
 * To avoid this long time to wait (that can be VERY annoying for the final 
 * user) you should import and optimize your mesh ONCE then export it in OvoiD 
 * JSON format. You will now import the well optimized mesh directly from OvoiD 
 * JSON, which is significantly faster. <br><br>
 * 
 * See the <code>Ovoid.Ojson</code> class 
 * documentation page for more information about OvoiD JSON.
 * 
 * @see Ovoid.Body
 *
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the node.
 */
Ovoid.Mesh = function(name) {

  Ovoid.Node.call(this);
  /** Node type. */
  this.type |= Ovoid.MESH;
  /** Node name.
   * @type string */
  this.name = name;

  /** polyset list.
   * @type Polyset[][] */
  this.polyset = new Array(Ovoid.MAX_MESH_LOD);
  for (var i = 0; i < Ovoid.MAX_MESH_LOD; i++)
    this.polyset[i] = new Array();

  /** Vertices list.
   * @type Vertex[][] */
  this.vertices = new Array(Ovoid.MAX_MESH_LOD);
  for (var i = 0; i < Ovoid.MAX_MESH_LOD; i++)
    this.vertices[i] = new Array();

  /** Triangles list.
   * @type Triangle[][] */
  this.triangles = new Array(Ovoid.MAX_MESH_LOD);
  for (var i = 0; i < Ovoid.MAX_MESH_LOD; i++)
    this.triangles[i] = new Array();

  /** Indices buffer (VBO) list. */
  this._ibuffer = new Array(Ovoid.MAX_MESH_LOD);
  /** Vertices buffer (VBO) list. */
  this._vbuffer = new Array(Ovoid.MAX_MESH_LOD);
  /** Vertex format. */
  this._vformat = 0;
  /** Vertex size in bytes. */
  this._vfbytes = 0;

};
Ovoid.Mesh.prototype = new Ovoid.Node;
Ovoid.Mesh.prototype.constructor = Ovoid.Mesh;


/**
 * Add polygon polyset.<br><br>
 * 
 * Add a polyset to the mesh at the specified LOD position 
 * with the given Vertices list and Material.
 * 
 * @param {int} l LOD level (not yet fully implemented).
 * @param {Vertex[]} vertices Array of Vertices for the new Polyset.
 * @param {Material} material Material for the new Polyset.
 *
 * @return {bool} True if succeed, false otherwise.
 * 
 * @see Ovoid.Polyset
 * @see Ovoid.Triangle
 * @see Ovoid.Vertex
 * @see Ovoid.Material
 */
Ovoid.Mesh.prototype.addPolyset = function(l, vertices, material) {

  if (l >= Ovoid.MAX_MESH_LOD) {
    Ovoid.log(1, 'Ovoid.Mesh', 
        "'" + this.name + "' Lod index > MAX_MESH_LOD");
    return false;
  }

  /* probleme de triangulation ? */
  if ((vertices.length % 3) != 0) {
    Ovoid.log(1, 'Ovoid.Mesh',
        "'" + this.name + "' Not multple of 3 vertices count : " +
        vertices.length);
    return false;
  }

  /* ajout des nouveaux vertices */
  var c = vertices.length;
  for (var i = 0; i < c; i++)
    this.vertices[l].push(vertices[i]);

  /* le nombre actuel d'indice donne le debut
   * des nouveaux indinces */
  var vid = this.triangles[l].length * 3;

  /* configuration du polyset */
  var polyset = new Ovoid.Polyset();
  polyset.ioffset = vid * 2; /* offset en byte, ici Uint16 : 2 bytes */
  polyset.icount = vertices.length;
  polyset.material = material;
  if (material != null)
    this.makeDepend(material);
  /* ajoute ce polyset */
  this.polyset[l].push(polyset);

  /* stuff pour calculer la face normale et le centre */
  var p0;
  var p1;
  var p2;
  var v0 = new Ovoid.Vector();
  var v1 = new Ovoid.Vector();

  /* construction des indices, normale et centre pour chaque nouveau
   * triangle et on configure et poids et influences par defaut */
  var triangle;
  var c = vertices.length / 3;
  for (var f = 0; f < c; f++)
  {
    triangle = new Ovoid.Triangle();

    p0 = this.vertices[l][vid].p;
    triangle.index[0] = vid;
    vid++;

    p1 = this.vertices[l][vid].p;
    triangle.index[1] = vid;
    vid++;

    p2 = this.vertices[l][vid].p;
    triangle.index[2] = vid;
    vid++;

    // calcul de la normale
    v0.subOf(p0, p1);
    v1.subOf(p0, p2);

    triangle.normal.crossOf(v0, v1);
    triangle.normal.normalize();

    // calcule du centre
    triangle.center.set((p0.v[0] + p1.v[0] + p2.v[0]) / 3,
        (p0.v[1] + p1.v[1] + p2.v[1]) / 3,
        (p0.v[2] + p1.v[2] + p2.v[2]) / 3,
        1.0);

    // calcul de l'equation du plan
    triangle.equation = -(triangle.normal.v[0] * triangle.center.v[0] + 
        triangle.normal.v[1] * triangle.center.v[1] +
        triangle.normal.v[2] * triangle.center.v[2]);
        
    // on ajoute ce triangle à la liste
    this.triangles[l].push(triangle);
  }

  this.unCach(Ovoid.CACH_GEOMETRY);

  return true;
};


/**
 * Generates Gl buffers.<br><br>
 * 
 * Generate and fill the GL Vertex Buffer Objects (VBOs) for this instance. 
 * (Required to be drawable).
 *
 * @param {bitmask} format Vertex Format bitmask. Can be any combinaison of 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W.<br><br>
 * 
 * @param {enum} type VBO Usage pattern, can be one of the 
 * following symbolic constants:<br>
 * Ovoid.BUFFER_STATIC,<br> 
 * Ovoid.BUFFER_DYNAMIC,<br>
 * Ovoid.BUFFER_STREAM<br>
 * <br>
 * The VBO Usage pattern is corresponding to the OpenGL/WebGL specifications:<br><br>
 * Ovoid.BUFFER_STATIC is GL_STATIC_DRAW :<br>
 * The data store contents will be modified once and used many times.<br>
 * <br>
 * Ovoid.BUFFER_DYNAMIC is GL_DYNAMIC_DRAW :<br>
 * The data store contents will be modified repeatedly and used many times.<br>
 * <br>
 * Ovoid.BUFFER_STREAM is GL_STREAM_DRAW :<br>
 * The data store contents will be modified once and used at most a few times.<br>
 * <br>
 * 
 * @See Ovoid.Vertex
 */
Ovoid.Mesh.prototype.createBuffers = function(format, type) {

  this._vformat = format;
  this._vfbytes = Ovoid.Vertex.getFormatSize(this._vformat);

  var ibo, vbo;
  for (var l = 0; l < Ovoid.MAX_MESH_LOD; l++)
  {
    if (this.triangles[l].count == 0)
      continue;

    ibo = Ovoid.gl.createBuffer();
    vbo = Ovoid.gl.createBuffer();

    Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, vbo);
    Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
        Ovoid.Vertex.arrayAsVbo(this._vformat,
			this.vertices[l]),
			type);

    Ovoid.gl.bindBuffer(Ovoid.gl.ELEMENT_ARRAY_BUFFER, ibo);
    Ovoid.gl.bufferData(Ovoid.gl.ELEMENT_ARRAY_BUFFER,
        Ovoid.Triangle.arrayAsIbo(this.triangles[l]),
		Ovoid.gl.STATIC_DRAW);

    this._ibuffer[l] = ibo;
    this._vbuffer[l] = vbo;
  }
};


/**
 * Generate a debug box.<br><br>
 * 
 * Generates a box mesh structure polyset and put it at the specified LOD
 * position.
 *
 * @param {int} l LOD level (not yet fully implemented).
 * @param {float} size Box size.
 * @param {int} div Box subdivision count.
 * @param {Material} material Material object for the new polyset.
 */
Ovoid.Mesh.prototype.genDebugBox = function(l, size, div, material) {

  var nv, vt,
      mnu, mxu, mnv, mxv, mnw, mxw, mns, mxs, mnt, mxt, min,
      u, t, v, du, dv, P, N, U, C;

  nv = 6 * (((div * div) * 2) * 3);

  vt = Ovoid.Vertex.newArray(nv);

  u = size / div;
  t = 1.0 / div; // coordonnée de texture

  min = -(size * 0.5);
  mnw = -(size * 0.5);
  mxw = (size * 0.5);

  P = new Float32Array([0, 0, 0, 1]);
  N = new Float32Array([0, 0, 0]);
  U = new Float32Array([0, 0, 0]);
  C = new Float32Array([1, 1, 1, 1]);

  v = 0;
  /* bottom */
  for (du = 0; du < div; du++)
  {
    mnu = min + (du * u); mxu = min + (u + (du * u));
    mns = (du * t); mxs = (t + (du * t));

    for (dv = 0; dv < div; dv++)
    {
      mnv = min + (dv * u); mxv = min + (u + (dv * u));
      mnt = (dv * t); mxt = (t + (dv * t));

      P[0] = mnu; P[1] = mnw; P[2] = mnv;
      N[0] = 0.0; N[1] = -1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[1] = mnw; P[2] = mxv;
      N[0] = 0.0; N[1] = -1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[1] = mnw; P[2] = mxv;
      N[0] = 0.0; N[1] = -1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;

      P[0] = mxu; P[1] = mnw; P[2] = mxv;
      N[0] = 0.0; N[1] = -1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[1] = mnw; P[2] = mnv;
      N[0] = 0.0; N[1] = -1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[1] = mnw; P[2] = mnv;
      N[0] = 0.0; N[1] = -1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
    }
  }

  /* up */
  for (du = 0; du < div; du++)
  {
    mnu = min + (du * u); mxu = min + (u + (du * u));
    mns = 1.0 - (du * t); mxs = 1.0 - (t + (du * t));

    for (dv = 0; dv < div; dv++)
    {
      mnv = min + (dv * u); mxv = min + (u + (dv * u));
      mnt = (dv * t); mxt = (t + (dv * t));

      P[0] = mnu; P[1] = mxw; P[2] = mnv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[1] = mxw; P[2] = mxv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[1] = mxw; P[2] = mxv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;

      P[0] = mxu; P[1] = mxw; P[2] = mxv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[1] = mxw; P[2] = mnv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[1] = mxw; P[2] = mnv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
    }
  }

  /* left */
  for (du = 0; du < div; du++)
  {
    mnu = min + (du * u); mxu = min + (u + (du * u));
    mns = (du * t); mxs = (t + (du * t));

    for (dv = 0; dv < div; dv++)
    {
      mnv = min + (dv * u); mxv = min + (u + (dv * u));
      mnt = (dv * t); mxt = t + (dv * t);

      P[2] = mnu; P[0] = mnw; P[1] = mnv;
      N[2] = 0.0; N[0] = -1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mxu; P[0] = mnw; P[1] = mxv;
      N[2] = 0.0; N[0] = -1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mnu; P[0] = mnw; P[1] = mxv;
      N[2] = 0.0; N[0] = -1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;

      P[2] = mxu; P[0] = mnw; P[1] = mxv;
      N[2] = 0.0; N[0] = -1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mnu; P[0] = mnw; P[1] = mnv;
      N[2] = 0.0; N[0] = -1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mxu; P[0] = mnw; P[1] = mnv;
      N[2] = 0.0; N[0] = -1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
    }
  }

  /* right */
  for (du = 0; du < div; du++)
  {
    mnu = min + (du * u); mxu = min + (u + (du * u));
    mns = 1.0 - (du * t); mxs = 1.0 - (t + (du * t));

    for (dv = 0; dv < div; dv++)
    {
      mnv = min + (dv * u); mxv = min + (u + (dv * u));
      mnt = (dv * t); mxt = (t + (dv * t));

      P[2] = mnu; P[0] = mxw; P[1] = mnv;
      N[2] = 0.0; N[0] = 1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mnu; P[0] = mxw; P[1] = mxv;
      N[2] = 0.0; N[0] = 1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mxu; P[0] = mxw; P[1] = mxv;
      N[2] = 0.0; N[0] = 1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;

      P[2] = mxu; P[0] = mxw; P[1] = mxv;
      N[2] = 0.0; N[0] = 1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mxu; P[0] = mxw; P[1] = mnv;
      N[2] = 0.0; N[0] = 1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[2] = mnu; P[0] = mxw; P[1] = mnv;
      N[2] = 0.0; N[0] = 1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
    }
  }

  /* back */
  for (du = 0; du < div; du++)
  {
    mnu = min + (du * u); mxu = min + (u + (du * u));
    mns = 1.0 - (du * t); mxs = 1.0 - (t + (du * t));

    for (dv = 0; dv < div; dv++)
    {
      mnv = min + (dv * u); mxv = min + (u + (dv * u));
      mnt = (dv * t); mxt = (t + (dv * t));

      P[0] = mnu; P[2] = mnw; P[1] = mnv;
      N[0] = 0.0; N[2] = -1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[2] = mnw; P[1] = mxv;
      N[0] = 0.0; N[2] = -1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[2] = mnw; P[1] = mxv;
      N[0] = 0.0; N[2] = -1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;

      P[0] = mxu; P[2] = mnw; P[1] = mxv;
      N[0] = 0.0; N[2] = -1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[2] = mnw; P[1] = mnv;
      N[0] = 0.0; N[2] = -1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[2] = mnw; P[1] = mnv;
      N[0] = 0.0; N[2] = -1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
    }
  }

  /* front */
  for (du = 0; du < div; du++)
  {
    mnu = min + (du * u); mxu = min + (u + (du * u));
    mns = (du * t); mxs = (t + (du * t));

    for (dv = 0; dv < div; dv++)
    {
      mnv = min + (dv * u); mxv = min + (u + (dv * u));
      mnt = (dv * t); mxt = (t + (dv * t));

      P[0] = mnu; P[2] = mxw; P[1] = mnv;
      N[0] = 0.0; N[2] = 1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[2] = mxw; P[1] = mxv;
      N[0] = 0.0; N[2] = 1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[2] = mxw; P[1] = mxv;
      N[0] = 0.0; N[2] = 1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;


      P[0] = mxu; P[2] = mxw; P[1] = mxv;
      N[0] = 0.0; N[2] = 1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[2] = mxw; P[1] = mnv;
      N[0] = 0.0; N[2] = 1.0; N[1] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[2] = mxw; P[1] = mnv;
      N[0] = 0.0; N[2] = 1.0; N[1] = 0.0;
      U[0] = mxs; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
    }
  }
  
  if (!material) {
    material = new Ovoid.Material("blank_material");
  }

  this.addPolyset(l, vt, material);
};


/**
 * Generate a debug grid/plane.<br><br>
 * 
 * Generates a grid/plane mesh structure polyset and put it at the 
 * specified LOD position.
 *
 * @param {int} l LOD level (not yet fully implemented).
 * @param {float} size Grid size.
 * @param {int} div Grid subdivision count.
 * @param {Material} material Material object for the new polyset.
 */
Ovoid.Mesh.prototype.genDebugGrid = function(l, size, div, material) {

  var nv, vt,
      mnu, mxu, mnv, mxv, mns, mxs, mnt, mxt, min,
      u, t, v, du, dv, P, N, U, C, seed;

  nv = 6 * (((div * div) * 2) * 3);

  vt = Ovoid.Vertex.newArray(nv);

  u = size / div;
  t = 1.0 / div; // coordonnée de texture

  min = -(size * 0.5);
  
  P = new Float32Array([0, 0, 0, 1]);
  N = new Float32Array([0, 0, 0]);
  U = new Float32Array([0, 0, 0]);
  C = new Float32Array([1, 1, 1, 1]);

  v = 0;

  /* up */
  for (du = 0; du < div; du++)
  {
    mnu = min + (du * u); mxu = min + (u + (du * u));
    mns = 1.0 - (du * t); mxs = 1.0 - (t + (du * t));

    for (dv = 0; dv < div; dv++)
    {
      mnv = min + (dv * u); mxv = min + (u + (dv * u));
      mnt = (dv * t); mxt = (t + (dv * t));

      P[0] = mnu; P[1] = 0.0; P[2] = mnv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[1] = 0.0; P[2] = mxv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[1] = 0.0; P[2] = mxv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;

      P[0] = mxu; P[1] = 0.0; P[2] = mxv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mxt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mxu; P[1] = 0.0; P[2] = mnv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mxs; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
      P[0] = mnu; P[1] = 0.0; P[2] = mnv;
      N[0] = 0.0; N[1] = 1.0; N[2] = 0.0;
      U[0] = mns; U[1] = mnt;
      C[0] = 1.0; C[1] = 1.0; C[2] = 1.0; C[3] = 1.0;
      vt[v].p.setv(P); vt[v].n.setv(N); vt[v].u.setv(U);
      vt[v].c.setv(C);
      v++;
    }
  }
  
  if (!material) {
    material = new Ovoid.Material("blank_material");
  }

  this.addPolyset(l, vt, material);
};



/** 
 * Optimize mesh vertices.<br><br>
 * 
 * Optimizes mesh duplicated vertices. This method will merge
 * identical vertices as possible and rebuild indices list.
 * 
 * <br><br>NOTE: This function can be an huge time consumer according to the
 * mesh complexity. It is recommanded to use this function in developement time 
 * and export optimized mesh to Ojson for production.
 * 
 * @see Ovoid.Ojson
 */
Ovoid.Mesh.prototype.optimizeVertices = function() {

  var i, j, k;
  var vertex = new Array(3); // trois vertex par triangle
  var unique = new Array(3); // vertex sont ils uniques

  var l = Ovoid.MAX_MESH_LOD;
  while (l--)
  {
    if (this.triangles[l].length == 0)
      continue;

    /* fusion des vertices identiques pour reduire la taille du
     * vertex buffers et améliorer le hit-cache.

    /* on cree la nouvelle liste de vertices */
    var new_vertex = new Array();
    var new_vertex_count = 0;
    var c = this.triangles[l].length;
    /* pour chaque triangle */
    for (i = 0; i < c; i++)
    {
      /* on recupere les vertex */
      vertex[0] = this.vertices[l][this.triangles[l][i].index[0]];
      vertex[1] = this.vertices[l][this.triangles[l][i].index[1]];
      vertex[2] = this.vertices[l][this.triangles[l][i].index[2]];
      /* suppose aucune duplication */
      unique[0] = unique[1] = unique[2] = true;
      /* cherche les duplications */

      /* pour chaque vertex de la nouvelle liste*/
      for (j = 0; j < new_vertex_count; j++)
      {
        /* pour les 3 vertices du triangle */
        for (k = 0; k < 3; k++)
        {
          /* si le vertex est déja présent dans la liste */
          if (new_vertex[j].equal(vertex[k])) {
            /* on modifinie l'indice dans le triangle */
            this.triangles[l][i].index[k] = j;
            /* ce vertex n'est pas unique */
            unique[k] = false;
          }
        }
      }
      /* On verifie les uniques */
      for (k = 0; k < 3; k++) {
        /* si le vertex 'k' est unique */
        if (unique[k]) {
          /* on note le nouvel indice dans le triangle */
          this.triangles[l][i].index[k] = new_vertex_count;
          /* on ajoute le vertex à la nouvelle liste */
          new_vertex.push(vertex[k]);
          new_vertex_count++;
        }
      }
    }
    /* on remplace la liste de vertice */
    this.vertices[l] = new_vertex;
  }
};


/**
 * Optimize mesh triangles.<br><br>
 * 
 * Optimizes mesh triangles components. This method will setup normal,
 * center, and adjacents triangles indices for all triangles.
 * 
 * <br><br>NOTE: This function can be an VERY huge time consumer according to 
 * the mesh complexity. It is recommanded to use this function in developement 
 * time and export optimized mesh to Ojson for production.
 * 
 * @see Ovoid.Ojson
 */
Ovoid.Mesh.prototype.optimizeTriangles = function() {
    
  var i, j, k;
  var vertex = new Array(3); // trois vertex par triangle
  var unique = new Array(3); // vertex sont ils uniques

  var l = Ovoid.MAX_MESH_LOD;
  while (l--)
  {
    if (this.triangles[l].length == 0)
      continue;

    /* creation de la liste des adjacents pour chaque triangle,
     * utile pour la creation des shadow volums */

    var iedge01 = new Array(2);
    var iedge12 = new Array(2);
    var iedge20 = new Array(2);
    var jedge01 = new Array(2);
    var jedge12 = new Array(2);
    var jedge20 = new Array(2);

    var c = this.triangles[l].length;
    /* pour chaque triangle */
    for (i = 0; i < c; i++)
    {

      /* On note les couples de vertices (edges) */
      iedge01[0] = this.vertices[l][this.triangles[l][i].index[0]].p;
      iedge01[1] = this.vertices[l][this.triangles[l][i].index[1]].p;

      iedge12[0] = this.vertices[l][this.triangles[l][i].index[1]].p;
      iedge12[1] = this.vertices[l][this.triangles[l][i].index[2]].p;

      iedge20[0] = this.vertices[l][this.triangles[l][i].index[2]].p;
      iedge20[1] = this.vertices[l][this.triangles[l][i].index[0]].p;

      /* dans chaque triangle */
      for (j = 0; j < c; j++)
      {

        if (i == j)
          continue;
        /* On note les couples de vertices (edges) */
        jedge01[0] = this.vertices[l][this.triangles[l][j].index[0]].p;
        jedge01[1] = this.vertices[l][this.triangles[l][j].index[1]].p;

        jedge12[0] = this.vertices[l][this.triangles[l][j].index[1]].p;
        jedge12[1] = this.vertices[l][this.triangles[l][j].index[2]].p;

        jedge20[0] = this.vertices[l][this.triangles[l][j].index[2]].p;
        jedge20[1] = this.vertices[l][this.triangles[l][j].index[0]].p;

        /* On compare les couples de vertices, dans tous les sens... */

        /* si le premier adjacentn'est pas encore trouvé */
        if (this.triangles[l][i].adjacent[0] == -1)
        {
          if (iedge01[0].equal(jedge01[0]) &&
              iedge01[1].equal(jedge01[1]) ||
              iedge01[0].equal(jedge01[1]) &&
              iedge01[1].equal(jedge01[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[0] = j;
            this.triangles[l][j].adjacent[0] = i;

          }

          if (iedge01[0].equal(jedge12[0]) &&
              iedge01[1].equal(jedge12[1]) ||
              iedge01[0].equal(jedge12[1]) &&
              iedge01[1].equal(jedge12[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[0] = j;
            this.triangles[l][j].adjacent[1] = i;

          }

          if (iedge01[0].equal(jedge20[0]) &&
              iedge01[1].equal(jedge20[1]) ||
              iedge01[0].equal(jedge20[1]) &&
              iedge01[1].equal(jedge20[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[0] = j;
            this.triangles[l][j].adjacent[2] = i;

          }
        }

        /* si le premier adjacentn'est pas encore trouvé */
        if (this.triangles[l][i].adjacent[1] == -1)
        {
          if (iedge12[0].equal(jedge01[0]) &&
              iedge12[1].equal(jedge01[1]) ||
              iedge12[0].equal(jedge01[1]) &&
              iedge12[1].equal(jedge01[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[1] = j;
            this.triangles[l][j].adjacent[0] = i;

          }

          if (iedge12[0].equal(jedge12[0]) &&
              iedge12[1].equal(jedge12[1]) ||
              iedge12[0].equal(jedge12[1]) &&
              iedge12[1].equal(jedge12[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[1] = j;
            this.triangles[l][j].adjacent[1] = i;

          }

          if (iedge12[0].equal(jedge20[0]) &&
              iedge12[1].equal(jedge20[1]) ||
              iedge12[0].equal(jedge20[1]) &&
              iedge12[1].equal(jedge20[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[1] = j;
            this.triangles[l][j].adjacent[2] = i;

          }
        }

        /* si le premier adjacentn'est pas encore trouvé */
        if (this.triangles[l][i].adjacent[2] == -1)
        {
          if (iedge20[0].equal(jedge01[0]) &&
              iedge20[1].equal(jedge01[1]) ||
              iedge20[0].equal(jedge01[1]) &&
              iedge20[1].equal(jedge01[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[2] = j;
            this.triangles[l][j].adjacent[0] = i;

          }

          if (iedge20[0].equal(jedge12[0]) &&
              iedge20[1].equal(jedge12[1]) ||
              iedge20[0].equal(jedge12[1]) &&
              iedge20[1].equal(jedge12[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[2] = j;
            this.triangles[l][j].adjacent[1] = i;

          }

          if (iedge20[0].equal(jedge20[0]) &&
              iedge20[1].equal(jedge20[1]) ||
              iedge20[0].equal(jedge20[1]) &&
              iedge20[1].equal(jedge20[0]))
          {
            /* Nous avons deux faces adjacentes */
            this.triangles[l][i].adjacent[2] = j;
            this.triangles[l][j].adjacent[2] = i;
          }
        }
      }
    }
  }
};


/**
 * Node's caching function.<br><br>
 *
 * Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <code>Ovoid.Queuer</code> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Mesh.prototype.cachMesh = function() {

  /* update bounding box et bounding sphere */
  if (!(this.cach & Ovoid.CACH_GEOMETRY)) {

    var min = new Ovoid.Point(Ovoid.FLOAT_MAX,
        Ovoid.FLOAT_MAX,
        Ovoid.FLOAT_MAX,
        1.0);

    var max = new Ovoid.Point(Ovoid.FLOAT_MIN,
        Ovoid.FLOAT_MIN,
        Ovoid.FLOAT_MIN,
        1.0);

    var rad = 0.0;

    var P;
    var S;
    var c = this.vertices[0].length;
    for (var i = 0; i < c; i++) {
      
      P = this.vertices[0][i].p;
      S = P.size2();
      
      if (S > rad) rad = S;

      if (P.v[0] > max.v[0]) max.v[0] = P.v[0];
      if (P.v[1] > max.v[1]) max.v[1] = P.v[1];
      if (P.v[2] > max.v[2]) max.v[2] = P.v[2];

      if (P.v[0] < min.v[0]) min.v[0] = P.v[0];
      if (P.v[1] < min.v[1]) min.v[1] = P.v[1];
      if (P.v[2] < min.v[2]) min.v[2] = P.v[2];
    }

    this.boundingBox.setBound(min, max);
    this.boundingSphere.setBound(min, max, rad);

    /* propage l'uncach du shape */
    for (var i = 0; i < this.link.length; i++)
      this.link[i].unCach(Ovoid.CACH_BOUNDING_SHAPE);

    this.addCach(Ovoid.CACH_GEOMETRY);
  }
};


/**
 * JavaScript Object Notation (JSON) serialization method.<br><br>
 * 
 * This method is commonly used by the <code>Ovoid.Ojson</code> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Mesh.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.MESH;
  /* Ovoid.Node */
  o['name'] = this.name;
  o['visible'] = this.visible;
  o['uid'] = this.uid;
  o['parent'] = this.parent?this.parent.uid:'null';
  o['child'] = new Array();
  for(var i = 0; i < this.child.length; i++)
    o['child'][i] = this.child[i].uid;
  o['depend'] = new Array();
  for(var i = 0; i < this.depend.length; i++)
    o['depend'][i] = this.depend[i].uid;
  o['link'] = new Array();
  for(var i = 0; i < this.link.length; i++)
    o['link'][i] = this.link[i].uid;
  /* Ovoid.Mesh */
  o['polyset'] = this.polyset;
  o['vertices'] = this.vertices;
  o['triangles'] = this.triangles;
  o['vformat'] = this._vformat;
  o['vfbytes'] = this._vfbytes;
  if(this.modifier) {
    o['modifier'] = this.modifier.uid;
  } else {
    o['modifier'] = 'null';
  }

  return o;
};
