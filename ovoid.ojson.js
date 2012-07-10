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
 * OJSON translator constructor.
 * 
 * @class OJSON translator object.
 * <br>
 * <br>
 * This class provides an implementation of an Ovoid JSON scene file importer
 * and exporter.
 * <br>
 * <br>
 * <ul>
 * <li><b>The Ovoid JSON File Format</b></li>
 * First of all, Ovoid JSON file format is - you'll guessed it - in JSON format.
 * JSON, or JavaScript Object Notation, is a lightweight text-based open 
 * standard designed for human-readable data interchange. It is derived from 
 * the JavaScript scripting language for representing simple data structures 
 * and associative arrays, called objects.<br>
 * Ovoid JSON is simply a JSON file of an specific encapsulation object. The 
 * encapsulation object for scene files is as follows:
 * <br>
 * <br>
 * <blockcode>
 * {<br>
 * &nbsp;"OJSON":1,<br>
 * &nbsp;"type":"scene",<br>
 * &nbsp;"scene":{...}<br>
 * }<br>
 * </blockcode>
 * <br>
 * <br>
 * Ovoid JSON format is designed to be used with the OvoiD.JS Library as the main 
 * saving and loading file format.
 * <br>
 * <br>
 * <li><b>What is imported/exported</b></li>
 * (Note: At this stage of developpement only Scene object with contents are 
 * exported and imported.)
 * <br>
 * <br>
 * <ul>
 * <li>Scene</li>
 * Nearly all nodes and object involved in a scene are exported with all common
 * properties.
 * </ul>
 * <br>
 * <br>
 * <li><b>Why use Ojson instead of COLLADA ?</b></li>
 * The question may be clever since you can import scene contents directly from 
 * 3D software without using the OJSON export. However, the OJSON translator 
 * was not implemented for cosmetic reasons. Here is some good reasons:
 * <ul>
 * <li>COLLADA import is slower and COLLADA files are heavier than OJSON for 
 * less contents.</li>
 * <li>COLLADA doese not contain all the scene interactions nodes such as Action
 * node with scripts, and Physic node constraints with parameters.</li>
 * <li>If your final scene is composed of several COLLADA files (to have 
 * several animations for the same object for exemple), you can save the 
 * final result as OJSON and then all reimports all at once.</li>
 * <li>With COLLADA you have to optimize all your meshs at loading. 
 * OSJON save the mesh datas in their optimized state.</li>
 * </ul>
 * COLLADA is a good way to import data from CG softwares and to develop 
 * your application. But is rather a bad way for the final show.
 * </ul>
 */ 
Ovoid.Ojson = function() {

  /** Instance name.
   * @type string. */
  this.name = '';
  /** Importation source file name.
   * @type string */
  this.url = '';
  /** JSON parsed Object */
  this._json = null;
  /** Destination scene */
  this._dstsc = null;
  /** Loading status code.
   * @type int */
  this.loadStatus = 0;
};


/**
 * Load the specified source file for this instance.
 * 
 * <br><br>By this method you can specify the source file to load and use to be
 * the data source of this instance. The file loading is instantaneously 
 * started in asynby this method. Once the loading is started you can check the 
 * <code>loadStatus</code> variable of this instance to know if and when 
 * the loading is done.
 * <br>
 * <br>
 * This <code>loadStatus</code> variable describe the current loading status of 
 * the source file. A value of 0 means that the file is not loaded, a value of 1 
 * means that the file was successfully loaded, and a value of -1 means that the 
 * file loading.
 * 
 * @param {string} url Source file name to load. Keep in mind that the 
 * <code>Ovoid.opt_ojsonPath</code> option will be used to retrieve the file.
 * @param {bool} async Optionnal asynchronous loading flag. If true or not null
 * the source is loaded in asynchronous way.
 * @param {bool} nopath ignore the default search path 
 * (<code>Ovoid.opt_ojsonPath</code>).
 */
Ovoid.Ojson.prototype.loadSource = function(url, async, nopath) {

  this.url = url;

  this.loadStatus = 0;
  var htreq = new XMLHttpRequest();

  /* La définition de onreadystatechange n'est utile qu'en
   * mode asynchrone */
  if (async) {
    htreq.owner = this;
    htreq.onreadystatechange = function()
    {
      if (this.readyState == 4) {
        if (this.status == 200 || this.status == 304) {
          this.owner._json = JSON.parse(this.responseText);
          this.owner.loadStatus = 1;
        } else {
          this.owner.loadStatus = -1;
          Ovoid.log(2, 'Ovoid.Ojson ' + this.name,
              "unable to load source '" +
              this.owner.url + "'");
        }
      }
    }
  }

  var src;
  nopath?src='':src=Ovoid.opt_ojsonPath;
  src += this.url;
  if (Ovoid.opt_debugMode) 
    src += '?' + Math.random();
    
  htreq.open('GET',src, async);
  htreq.send(null);

  /* Si nous sommes en mode synchrone */
  if (!async) {
    if (htreq.status == 200 || htreq.status == 304) {
      this._json = JSON.parse(htreq.responseText);
      this.loadStatus = 1;
    } else {
      this.loadStatus = -1;
      Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "unable to load source '" +
          this.url + "'");
    }
  }
};

/**
 * Scene export.
 * 
 * <br><br>Exports the specified scene with all included nodes and properties. This 
 * method will display the JSON result in text format in a pop-up windows. Make
 * sure you don't block pop-up before using this method.
 *
 * @param {Object} scene Scene Object to export.
 * 
 * @return {String} Ovoid JSON exportation result string.
 */
Ovoid.Ojson.prototype.exportScene = function(scene) {
  
  /* Entête d'objet */
  this._json = new Object();
  this._json['OJSON'] = Ovoid.OVOI3D_VERSION;
  this._json['type'] = "scene";
  /* Export de la scene */
  this._json['scene'] = scene;
  var Ojson = JSON.stringify(this._json);
  /* Affiche le popup avec le contenu JSON */
  var pop = window.open("scene.ojsn","Ojson export","width=600,height=300,scrollbars=yes,resizable=yes", true);
  var doc = pop.document.open();
  doc.write("<html><header><title>Ojson export</title><header><body style=\"font-family:monospace;font-size:10\">");
  doc.write(Ojson);
  doc.write("</body></html>");

  return Ojson;
};

/**
 * Parse function body and arguments form a string.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} s Function string to parse.
 * 
 * @return {Object} new Function Object.
 */
Ovoid.Ojson.prototype._parseFunc = function(s) {
  /* parse les argument entre ( ) */
  var lp = s.indexOf('(')+1;
  var rp = s.indexOf(')');
  var args = s.substring(lp,rp);
  /* parse le corps de fonction entre { } */
  var lb = s.indexOf('{')+1;
  var rb = s.lastIndexOf('}');
  var body = s.substring(lb,rb);
  if(args.length > 0) {
    return new Function (args, body);
  } else {
    return new Function (body);
  }
};

/**
 * Proceed to importation of the typed Node from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} j OJSON Node sub-object.
 */
Ovoid.Ojson.prototype._importNode = function(j) {
  
  switch (j.type)
  {
    case Ovoid.TRANSFORM:
      n = new Ovoid.Transform(j.name);
      this._procTransform(n, j);
      break;
    case Ovoid.CAMERA:
      n = new Ovoid.Camera(j.name);
      this._procCamera(n, j);
      break;
    case Ovoid.LIGHT:
      n = new Ovoid.Light(j.name);
      this._procLight(n, j);
      break;
    case Ovoid.BODY:
      n = new Ovoid.Body(j.name);
      this._procBody(n, j);
      break;
    case Ovoid.JOINT:
      n = new Ovoid.Joint(j.name);
      this._procJoint(n, j);
      break;
    case Ovoid.MESH:
      n = new Ovoid.Mesh(j.name);
      this._procMesh(n, j);
      break;
    case Ovoid.MATERIAL:
      n = new Ovoid.Material(j.name);
      this._procMaterial(n, j);
      break;
    case Ovoid.TEXTURE:
      n = new Ovoid.Texture(j.name);
      this._procTexture(n, j);
      break;
    case Ovoid.ACTION:
      n = new Ovoid.Action(j.name);
      this._procAction(n, j);
      break;
    case Ovoid.PHYSICS:
      n = new Ovoid.Physics(j.name);
      this._procPhysic(n, j);
      break;
    case Ovoid.ANIMATION:
      n = new Ovoid.Animation(j.name);
      this._procAnimation(n, j);
      break;
    case Ovoid.TRACK:
      n = new Ovoid.Track(j.name);
      this._procTrack(n, j);
      break;
    case Ovoid.SKIN:
      n = new Ovoid.Skin(j.name);
      this._procSkin(n, j);
      break;
    case Ovoid.EMITTER:
      n = new Ovoid.Emitter(j.name);
      this._procEmitter(n, j);
      break;
    case Ovoid.AUDIO:
      n = new Ovoid.Audio(j.name);
      this._procAudio(n, j);
      break;
    case Ovoid.TEXT:
      n = new Ovoid.Text(j.name);
      this._procText(n, j);
      break;
    case Ovoid.LAYER:
      n = new Ovoid.Layer(j.name);
      this._procLayer(n, j);
      break;
    case Ovoid.SOUND:
      n = new Ovoid.Sound(j.name);
      this._procSound(n, j);
      break;
    default:
      n = new Ovoid.Node(j.name);
      this._procNode(n, j);
      break;
  }
  this._dstsc.insert(n, null, true, true);
};


/**
 * Proceed to relink / reparent node from Json uid's to Node pointers.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Node Object to relink.
 */
Ovoid.Ojson.prototype._relinkNode = function(n) {
  
  /* relink du node de base */
  if(n.parent != null) {
    if(n.parent != 0) {
      n.parent = this._dstsc.search(n.parent);
    } else {
      /* parent par defaut */
      n.parent = null;
      if (n.type & Ovoid.LAYER) {
        n.setParent(this._dstsc.overlay);
      }
      if (n.type & Ovoid.TRANSFORM) {
        n.setParent(this._dstsc.world);
      }
    }
  }
  
  for(var i = 0; i < n.child.length; i++) {
    n.child[i] = this._dstsc.search(n.child[i]);
  }
  for(var i = 0; i < n.depend.length; i++)
    n.depend[i] = this._dstsc.search(n.depend[i]);
  for(var i = 0; i < n.link.length; i++)
    n.link[i] = this._dstsc.search(n.link[i]);
    
  if(n.type & Ovoid.CONSTRAINT)
    n.target = this._dstsc.search(n.target);
    
  if(n.type & Ovoid.LIGHT || n.type & Ovoid.CAMERA) 
    n.action = this._dstsc.search(n.action);

  if(n.type & Ovoid.BODY) {
    n.shape = this._dstsc.search(n.shape);
    n.action = this._dstsc.search(n.action);
  }

  if(n.type & Ovoid.SKIN) {
    n.mesh = this._dstsc.search(n.mesh);
    /* retrouve les joints */
    var joints = new Array();
    for(var i = 0; i < n.joint.length; i++) {
      n.joint[i] = this._dstsc.search(n.joint[i]);
      /* Il faut aussi recréer les tableaux de matrices */
      n.bindJointMatrix.push(new Ovoid.Matrix4());
      n.infWorldMatrix.push(new Ovoid.Matrix4());
      n.infNormalMatrix.push(new Ovoid.Matrix3());
      n.unCach(Ovoid.CACH_SKIN);
    }
    /* mirroir des vertices et polygones du mesh */
    if (Ovoid.opt_localSkinData) {
      n._localMirror();
    }
  }

  if(n.type & Ovoid.JOINT)
    n.skin = this._dstsc.search(n.skin);
  
  if(n.type & Ovoid.SOUND)
    n.audio = this._dstsc.search(n.audio);

  if(n.type & Ovoid.LAYER)
    n.action = this._dstsc.search(n.action);
    n.bgTexture = this._dstsc.search(n.bgTexture);

  if(n.type & Ovoid.TEXT)
    n.fontmapTexture = this._dstsc.search(n.fontmapTexture);
    
  if(n.type & Ovoid.MATERIAL) {
    for(var i = 0; i < n.texture.length; i++)
      n.texture[i] = this._dstsc.search(n.texture[i]);
  }
  
  if(n.type & Ovoid.TRACK) {
    for(var i = 0; i < n.animation.length; i++)
      n.animation[i] = this._dstsc.search(n.animation[i]);
  }
  
  if(n.type & Ovoid.MESH) {
    for (var l = 0; l < Ovoid.MAX_MESH_LOD; l++) {
      for (var s = 0; s < n.polyset[l].length; s++) {
        n.polyset[l][s].material = this._dstsc.search(n.polyset[l][s].material);
      }
    }
  }
};



/**
 * Proceed to importation of the Node part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procNode = function(n, j) {
  
  /* - OJSON.Node structure -
   * .type
   * .name
   * .visible
   * .uid
   * .parent*
   * .child[*]
   * .depend[*]
   * .link[*]
   */
  n.visible = j.visible;
  n.uid = j.uid;
  (j.parent == 'null')?n.parent=null:n.parent=j.parent;
  for (var i = 0; i < j.child.length; i++)
    n.child.push(j.child[i]);
  for (var i = 0; i < j.depend.length; i++)
    n.depend.push(j.depend[i]);
  for (var i = 0; i < j.link.length; i++)
    n.link.push(j.link[i]);
};


/**
 * Proceed to importation of the Material part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procMaterial = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procNode(n, j);
  /* - OJSON.Material structure -
   * .color[]
   * .texture[]
   * .shininess
   * .reflectivity
   * .opacity
   */
   
  for(var i = 0; i < j.color.length; i++) {
    n.color[i].setv(j.color[i]);
  }
  
  for(var i = 0; i < j.texture.length; i++) {
    if(n.texture[i] != 'null') {
      n.texture[i] = j.texture[i];
    }
  }
  
  n.shininess = j.shininess;
  n.reflectivity = j.reflectivity;
  n.opacity = j.opacity;
  
};


/**
 * Proceed to importation of the Texture part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procTexture = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procNode(n, j);
  /* - OJSON.Texture structure -
   * .url
   * .filter
   */
  n.url = j.url;
  n.filter = j.filter;
};


/**
 * Proceed to importation of the Audio part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procAudio = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procNode(n, j);
  /* - OJSON.Texture structure -
   * .url
   */
  n.url = j.url;
};


/**
 * Proceed to importation of the Track part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procTrack = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procNode(n, j);
  /* - OJSON.Track structure -
   * .playing
   * .loop
   * .ended
   * .animation[]
   * .onended()
   */
  n.playing = j.playing;
  n.loop = j.loop;
  n.ended = j.ended;
  for (var i = 0; i < j.animation.length; i++)
    n.animation.push(j.animation[i]);
  n.onended = this._parseFunc(j.onended);
};


/**
 * Proceed to importation of the Mesh part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procMesh = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procNode(n, j);
  /* - OJSON.Mesh structure -
   * .polyset[]
   * .vertices[]
   * .triangles[]
   * .vformat
   * ._vfbytes
   * .modifier*
   */
  for (var l = 0; l < Ovoid.MAX_MESH_LOD; l++) {
    if(j.polyset[l].length > 0) {
      for (var s = 0; s < j.polyset[l].length; s++) {
        var polyset = new Ovoid.Polyset();
        polyset.ioffset = j.polyset[l][s].ioffset;
        polyset.icount = j.polyset[l][s].icount;
        polyset.material = j.polyset[l][s].material;
        n.polyset[l].push(polyset);
      }
    }
    
    if(j.vertices[l].length > 0) {
      for (var v = 0; v < j.vertices[l].length; v++) {
        var vertex = new Ovoid.Vertex();
        vertex.p.setv(j.vertices[l][v][0]);
        vertex.n.setv(j.vertices[l][v][1]);
        vertex.u.setv(j.vertices[l][v][2]);
        vertex.t.setv(j.vertices[l][v][3]);
        vertex.b.setv(j.vertices[l][v][4]);
        vertex.c.setv(j.vertices[l][v][5]);
        vertex.i.setv(j.vertices[l][v][6]);
        vertex.w.setv(j.vertices[l][v][7]);
        n.vertices[l].push(vertex);
      }
    }
    
    //alert("LOD:"+ l + " = " + n.vertices[l].length);
    
    if(j.triangles[l].length > 0) {
      for (var t = 0; t < j.triangles[l].length; t++) {
        var triangle = new Ovoid.Triangle();
        triangle.index[0] = j.triangles[l][t].i[0];
        triangle.index[1] = j.triangles[l][t].i[1];
        triangle.index[2] = j.triangles[l][t].i[2];
        triangle.normal.setv(j.triangles[l][t].n);
        triangle.center.setv(j.triangles[l][t].c);
        triangle.adjacent[0] = j.triangles[l][t].a[0];
        triangle.adjacent[1] = j.triangles[l][t].a[1];
        triangle.adjacent[2] = j.triangles[l][t].a[2];
        triangle.equation = j.triangles[l][t].e;
        n.triangles[l].push(triangle);
      }
    }
  }
  
  n._vfbytes = j.vfbytes;
  n._vformat = j.vformat;
  (j.modifier == 'null')?n.modifier=null:n.modifier=j.modifier;
  
  n.createBuffers(n._vformat, Ovoid.BUFFER_STATIC);
};


/**
 * Proceed to importation of the Constraint part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procConstraint = function(n, j) {
  
  /* Importation hérité de "Ovoid.Node" */
  this._procNode(n, j);
  /* - OJSON.Constraint structure -
   * .target*
   */
  (j.target == 'null')?n.target=null:n.target=j.target;
};


/**
 * Proceed to importation of the Animation part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procAnimation = function(n, j) {
  
  /* Importation hérité de "Ovoid.Constraint" */
  this._procConstraint(n, j);
  /* - OJSON.Animation structure -
   * .format
   * .playing
   * .loop
   * .ended
   * .smooth
   * .factor
   * .channel[#]
   * .onended()
   */
  n._format = j.format;
  n.playing = j.playing;
  n.loop = j.loop;
  n.ended = j.ended;
  n.smooth = j.smooth;
  n.factor = j.factor;
  
  for (var i = 0; i < 21; i++) {
    if (j.channel[i] == 'null') {
      n._channel[i] = null;
    } else {
      var curve;
      switch (j.channel[i].type)
      {
        case "Bspline":
          curve = new Ovoid.Bspline(
            new Float32Array(j.channel[i].x),
            new Float32Array(j.channel[i].y),
            new Float32Array(j.channel[i].cx),
            new Float32Array(j.channel[i].cy));
          break;
        case "Hspline":
          curve = new Ovoid.Hspline(
            new Float32Array(j.channel[i].x),
            new Float32Array(j.channel[i].y),
            new Float32Array(j.channel[i].v));
          break;
        default:
          curve = new Ovoid.Cspline(
            new Float32Array(j.channel[i].x),
            new Float32Array(j.channel[i].y));
          break;
      }
      n._channel[i] = curve;
    }
  }
  n.onended = this._parseFunc(j.onended);
};


/**
 * Proceed to importation of the Physic part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procPhysic = function(n, j) {
  
  /* Importation hérité de "Ovoid.Constraint" */
  this._procConstraint(n, j);
  /* - OJSON.Physics structure -
   * .imass
   * .itensor
   * .kind
   * .damping
   */
  n.imass = j.imass;
  n.itensor.setv(j.itensor);
  n.model = j.model;
  n.damping = j.damping;
};


/**
 * Proceed to importation of the Skin part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procSkin = function(n, j) {
  
  /* Importation hérité de "Ovoid.Node" */
  this._procNode(n, j);
  /* - OJSON.Skin structure -
   * .mesh*
   * .joint[*]
   * .bindJointMatrix[]
   * .bindShapeMatrix
   */
  (j.mesh == 'null')?n.mesh=null:n.mesh=j.mesh;
  for (var i = 0; i < j.joint.length; i++)
    n.joint.push(j.joint[i]);
  n.bindJointMatrix = new Array(j.bindJointMatrix.length);
  for (var i = 0; i < n.bindJointMatrix.length; i++) {
    n.bindJointMatrix[i] = new Ovoid.Matrix4();
    n.bindJointMatrix[i].setv(j.bindJointMatrix[i]);
  }
  n.bindShapeMatrix.setv(j.bindShapeMatrix);
};


/**
 * Proceed to importation of the Emitter part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procEmitter = function(n, j) {
  
  /* Importation hérité de "Ovoid.Node" */
  this._procNode(n, j);
  /* - OJSON.Emitter structure -
   * .model
   * .mass
   * .life
   * .rate
   * .velocity
   * .damping
   * .scattering
   * .color[]
   * .size[]
   * .emits
   * .texture*
   */
  n.model = j.model;
  n.mass = j.mass;
  n.life = j.life;
  n.rate = j.rate;
  n.velocity = j.velocity;
  n.damping = j.damping;
  n.delta = j.delta;
  n.scattering = j.scattering;
  for(var i = 0; i < j.color.length; i++) {
    n.color[i].setv(j.color[i]);
  }
  n.size[0] = j.size[0];
  n.size[1] = j.size[1];
  n.emits = j.emits;
  (j.texture == 'null')?n.texture=null:n.texture=j.texture;
  
};


/**
 * Proceed to importation of the Transform part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procTransform = function(n, j) {
  
  /* Importation hérité de "Ovoid.Node" */
  this._procNode(n, j);
  /* - OJSON.Transform structure -
   * .scaling[x,y,z]
   * .translation[x,y,z]
   * .orientation[x,y,z,w]
   * .rotation[x,y,z,w]
   */
  n.scaling.setv(j.scaling);
  n.translation.setv(j.translation);
  n.orientation.setv(j.orientation);
  n.rotation.setv(j.rotation);
};


/**
 * Proceed to importation of the Camera part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procCamera = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procTransform(n, j);
  /* - OJSON.Camera structure -
   * .viewX
   * .viewY
   * .fov
   * .aspect
   * .clipNear
   * .clipFar
   * .action*
   */
  n.viewX = j.viewX;
  n.viewY = j.viewY;
  n.fov = j.fov;
  n.aspect = j.aspect;
  n.clipNear = j.clipNear;
  n.clipFar = j.clipFar;
  (j.action == 'null')?n.action=null:n.action=j.action;
};


/**
 * Proceed to importation of the Camera part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procLight = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procTransform(n, j);
  /* - OJSON.Light structure -
   * .kind
   * .color[r,g,b,a]
   * .intensity
   * .attenuationC
   * .attenuationL
   * .attenuationQ
   * .range
   * .falloff
   * .spotAngle
   * .shadowCasting
   * .action*
   */
  n.model = j.model;
  n.color.setv(j.color);
  n.intensity = j.intensity;
  n.attenuationC = j.attenuationC;
  n.attenuationL = j.attenuationL;
  n.attenuationQ = j.attenuationQ;
  n.range = j.range;
  n.falloff = j.falloff;
  n.spotAngle = j.spotAngle;
  n.shadowCasting = j.shadowCasting;
  (j.action == 'null')?n.action=null:n.action=j.action;
  
};


/**
 * Proceed to importation of the Body part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procBody = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procTransform(n, j);
  /* - OJSON.Body structure -
   * .shape*
   * .action*
   */
  (j.shape == 'null')?n.shape=null:n.shape=j.shape;
  (j.action == 'null')?n.action=null:n.action=j.action;
};


/**
 * Proceed to importation of the Joint part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procJoint = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procTransform(n, j);
  /* - OJSON.Joint structure -
   * .size
   * .skin*
   */
  n.size = j.size;
  (j.skin == 'null')?n.skin=null:n.skin=j.skin;
};


/**
 * Proceed to importation of the Sound part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procSound = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procTransform(n, j);
  /* - OJSON.Sound structure -
   * .audio*
   * .flat
   * {
   *  .coneInnerAngle
   *  .coneOuterAngle
   *  .coneOuterGain
   *  .refDistance
   *  .maxDistance
   *  .rolloffFactor
   * }
   * .loop
   */
  (j.audio == 'null')?n.audio=null:n.audio=j.audio;
  n.spatialize(!j.flat);
  if(n.alpanner && j.coneInnerAngle) {
    n.alpanner.coneInnerAngle = j.coneInnerAngle;
    n.alpanner.coneOuterAngle = j.coneOuterAngle;
    n.alpanner.coneOuterGain = j.coneOuterGain;
    n.alpanner.refDistance = j.refDistance;
    n.alpanner.maxDistance = j.maxDistance;
    n.alpanner.rolloffFactor = j.rolloffFactor;
  }
  n.setLoop(j.loop);
};


/**
 * Proceed to importation of the Layer part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procLayer = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procTransform(n, j);
  /* - OJSON.Layer structure -
   * .size[x,y,z]
   * .fgColor[r,g,b,a]
   * .bgTexture[r,g,b,a]
   * .bgTexture*
   * .action*
   */
  n.size.setv(j.size);
  n.size.setv(j.fgColor);
  n.size.setv(j.bgColor);
  (j.bgTexture == 'null')?
    n.bgTexture=null:
    n.bgTexture=j.bgTexture;
  (j.action == 'null')?n.action=null:n.action=j.action;
};


/**
 * Proceed to importation of the Text part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procText = function(n, j) {
  
  /* Importation hérité de "Ovoid.Layer" */
  this._procLayer(n, j);
  /* - OJSON.Text structure -
   * .fontmapTexture*
   * .string
   */
  (j.fontmapTexture == 'null')?
    n.fontmapTexture=null:
    n.fontmapTexture=j.fontmapTexture;
  n.string = j.string;
};


/**
 * Proceed to importation of the Action part from a OJSON sub-object.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procAction = function(n, j) {
  
  /* Importation hérité de "Ovoid.Node" */
  this._procNode(n, j);
  /* - OJSON.Action structure -
   * .onEnter()
   * .onLeave()
   * .onOver()
   * .onLmbDn()
   * .onLmbUp()
   * .onLmbHl()
   * .onMmbDn()
   * .onMmbUp()
   * .onMmbHl()
   * .onRmbDn()
   * .onRmbUp()
   * .onMmbHl()
   * .onGrabd()
   * .onUgrabd()
   */
  n.onEnter = this._parseFunc(j.onEnter);
  n.onLeave = this._parseFunc(j.onLeave);
  n.onOver = this._parseFunc(j.onOver);
  n.onLmbDn = this._parseFunc(j.onLmbDn);
  n.onLmbUp = this._parseFunc(j.onLmbUp);
  n.onLmbHl = this._parseFunc(j.onLmbHl);
  n.onMmbDn = this._parseFunc(j.onMmbDn);
  n.onMmbUp = this._parseFunc(j.onMmbUp);
  n.onMmbHl = this._parseFunc(j.onMmbHl);
  n.onRmbDn = this._parseFunc(j.onRmbDn);
  n.onRmbUp = this._parseFunc(j.onRmbUp);
  n.onRmbHl = this._parseFunc(j.onRmbHl);
  n.onGrabd = this._parseFunc(j.onGrabd);
  n.onUgrabd = this._parseFunc(j.onUgrabd);
};


/**
 * Scene import.
 * 
 * <br>
 * <br>
 * Imports all the given OJSON scene file content and include it in the specified
 * scene.
 *
 * @param {Object} scene Recipient Scene object.
 * 
 * @return {bool} True if import suceeds, false otherwise.
 */
Ovoid.Ojson.prototype.importScene = function(scene) {
                              
  /* Si le JSON object n'existe on ne peut rien faire */
  if (!this._json) {
    return false;
  }
  
  /* détermine le nom du ojson d'apres l'url */
  var tmp = this.url;
  tmp = tmp.split('/');
  tmp = tmp[tmp.length - 1];
  tmp = tmp.split('.');
  this.name = tmp[0];

  /* Verifie le format JSON */
  if(!this._json.OJSON) {
    Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "is not a valid Ovoid JSON format");
    return false;
  }
  
  if(this._json.type != "scene") {
    Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "is not a valid Ovoid JSON Scene");
    return false;
  }
  
  if(!this._json.scene) {
    Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "no scene object found in Ovoid JSON");
    return false;
  }
  
  /* Scene de destination */
  this._dstsc = scene;
  
  //var debug = '';
  var jsonnode = this._json.scene.node;
  /* importation de toutes les nodes */
  for (var i = 0; i < jsonnode.length; i++) {
    //debug += jsonnode[i].name + "\n";
    try {
      this._importNode(jsonnode[i]);
    } catch (e) {
      Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "Error during node importation:"
          + e.stack
          + " File may be corrupted.");
    }
  }
  /* relink / reparente toutes les nodes */
  for (var i = 0; i < this._dstsc.node.length; i++) {
    this._relinkNode(this._dstsc.node[i]);
  }
  
  this._dstsc.name = this._json.scene.name;
  this._dstsc._uidn = this._json.scene.uidn;
  
  return true;
};
