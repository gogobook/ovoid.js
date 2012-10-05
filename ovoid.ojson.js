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
 * @class OvoiD.JSON translator object.<br><br>
 *
 * The Ojson object implements a JSON format scene exporter/importer.<br><br>
 * 
 * <b>The OvoiD.JSON File Format</b><br><br>
 * 
 * OvoiD.JSON is a JSON formated file who store an OvoiD.JS specific data 
 * encapsulation object.<br><br>
 * 
 * <blockcode>
 * {"OJSON":1, "type":"scene", "scene":{...}}<br>
 * </blockcode><br><br>
 * 
 * OvoiD.JSON is designed to be used as the main OvoiD.JS Library saving and 
 * loading file format. It currently provides full support for Scene exporation
 * and importation.<br><br>
 * 
 * <blockcode>
 * var ojson = new Ovoid.Ojson();<br>
 * ojson.exportScene(scene);<br>
 * </blockcode><br><br>
 * 
 * <b>Saving your work</b><br><br>
 * 
 * The exportation process is rather rustical since the Javascript environment 
 * is client side and forbids some basic functionnalities. It currently consist 
 * of a simple popup window who contains the resulting JSON export in text 
 * format. You have to copy and paste the text to save in any file.<br><br>
 * 
 * <blockcode>
 * var ojson = new Ovoid.Ojson();<br>
 * ojson.loadSource("savedscene.ojsn");<br>
 * ojson.importScene(scene);<br>
 * </blockcode><br><br>
 * 
 * The Ojson export includes all OvoiD.JS nodes with custom trigger functions, 
 * optimized mesh data and global nodes status.
 * 
 * <b>Why use Ojson instead of COLLADA</b>
 * <ul>
 * <li>COLLADA import is slower and COLLADA files are heavier than OJSON for 
 * less contents.</li>
 * <li>COLLADA doese not contain all the scene interactions nodes such as Action
 * node with scripts, and Physics node constraints with parameters.</li>
 * <li>If your final scene is composed of several COLLADA files (to have 
 * several animations for the same object for exemple), you can save the 
 * final result as OJSON and then reimports all at once.</li>
 * <li>With COLLADA you have to optimize all your meshs at loading. 
 * OSJON save the optimized mesh data.</li>
 * </ul>
 * COLLADA is a good way to import data from 3D softwares and to build complex 
 * composite scenes. But is rather a bad way for the final show.
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
  /** Relinking stack */
  this._rlnkstack = new Array();
  /** Loading status code.
   * @type int */
  this.loadStatus = 0;
};


/**
 * Load the specified source file for this instance.<br><br>
 * 
 * Loads the specified external source file and extracts, decodes or parses the 
 * loaded data. If not specified, the loading is made in the asynchronous way.<br><br>
 *  
 * The <code>loadSatus</code> member indicates the loading status through an 
 * integer value of 0, 1 or -1. A value of 0 means that the file is not yet 
 * loaded, a value of 1 means that the source was successfully loaded, and a 
 * value of -1 means the loading failed.<br><br>
 * 
 * @param {string} url Source file name to load.
 * <code>Ovoid.opt_ojsonPath</code> is used as base path.
 * 
 * @param {bool} async Optionnal asynchronous loading flag. If true or not null
 * the source is loaded in asynchronous way.
 * 
 * @param {bool} nopath ignore the default search path 
 * (<code>Ovoid.opt_ojsonPath</code>).
 */
Ovoid.Ojson.prototype.loadSource = function(url, async, nopath) {

  this.url = url;

  Ovoid.log(3, 'Ovoid.Ojson', "loading source file '" + this.url + "'");
          
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
          Ovoid.log(3, 'Ovoid.Ojson', "parsing source file '" + this.owner.url + "'");
          try{
            this.owner._json = JSON.parse(this.responseText);
          } catch(e) {
            Ovoid.log(2, 'Ovoid.Ojson', "parse error '" + e.stack + "'");
          }
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
 * Export Scene as OJSON data.<br><br>
 * 
 * Exports the given scene with all included nodes and properties. It returns 
 * the exportation result in a string and creates a popup window filled with the 
 * exportation data result in text format. You have to copy and paste the text 
 * to save in any file.<br><br>
 * 
 * (be sure your browser will autorize popup window before using this method)
 *
 * @param {Object} scene Scene object to export.
 * 
 * @return {String} Exportation result string.
 */
Ovoid.Ojson.prototype.exportScene = function(scene) {
  
  /* Entête d'objet */
  this._json = new Object();
  this._json['OJSON'] = Ovoid.OVOIDJS_VERSION;
  this._json['TYPE'] = "SCN";
  /* Export de la scene */
  this._json['SCENE'] = scene;
  var Ojson = JSON.stringify(this._json);

  /* reformate le json pour inclure quelques espaces pour permetre le retour
   * a la ligne automatique, sans ca l'outup peut bugger */
  var c = Ojson.length;
  var p = 0;
  for(var i = 0; i < c; i++, p++) {
    if(p > 2048) {
      if(Ojson[i] == ',') {
        Ojson = [Ojson.slice(0, i+1), '<br>', Ojson.slice(i+1)].join('');
        p = 0;
      }
    }
  }
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
 * Create log output for relinking report.
 * 
 * @param {Object} n Relinked node.
 * @param {Object} l Link found.
 * @param {Object} s Link string.
 */
Ovoid.Ojson.prototype._linkReport = function(n, l, s) {
  
  var lname;
  if(l) {
    lname = l.name;
  } else {
    lname = "null";
  }
  
  Ovoid.log(3, 'Ovoid.Ojson ' + this.name, "relink '" + n.name + "' has "+ s +" '" + lname + "'");
}

/**
 * Proceed to importation of the typed Node from a OJSON sub-object.
 * 
 * @param {Object} j OJSON Node sub-object.
 */
Ovoid.Ojson.prototype._importNode = function(j) {
  
  switch (j.t)
  {
    case Ovoid.TRANSFORM:
      n = new Ovoid.Transform(j.n);
      this._procTransform(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Transform node '" + j.n + "'");
      break;
    case Ovoid.CAMERA:
      n = new Ovoid.Camera(j.n);
      this._procCamera(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Camera node '" + j.n + "'");
      break;
    case Ovoid.LIGHT:
      n = new Ovoid.Light(j.n);
      this._procLight(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Light node '" + j.n + "'");
      break;
    case Ovoid.BODY:
      n = new Ovoid.Body(j.n);
      this._procBody(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Body node '" + j.n + "'");
      break;
    case Ovoid.JOINT:
      n = new Ovoid.Joint(j.n);
      this._procJoint(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Joint node '" + j.n + "'");
      break;
    case Ovoid.MESH:
      n = new Ovoid.Mesh(j.n);
      this._procMesh(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Mesh node '" + j.n + "'");
      break;
    case Ovoid.MATERIAL:
      n = new Ovoid.Material(j.n);
      this._procMaterial(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Material node '" + j.n + "'");
      break;
    case Ovoid.TEXTURE:
      n = new Ovoid.Texture(j.n);
      this._procTexture(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Texture node '" + j.n + "'");
      break;
    case Ovoid.ACTION:
      n = new Ovoid.Action(j.n);
      this._procAction(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Action node '" + j.n + "'");
      break;
    case Ovoid.PHYSICS:
      n = new Ovoid.Physics(j.n);
      this._procPhysic(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Physics node '" + j.n + "'");
      break;
    case Ovoid.ANIMATION:
      n = new Ovoid.Animation(j.n);
      this._procAnimation(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Animation node '" + j.n + "'");
      break;
    case Ovoid.EXPRESSION:
      n = new Ovoid.Expression(j.n);
      this._procExpression(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Expression node '" + j.n + "'");
      break;
    case Ovoid.AIM:
      n = new Ovoid.Aim(j.n);
      this._procAim(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Aim node '" + j.n + "'");
      break;
    case Ovoid.TRACK:
      n = new Ovoid.Track(j.n);
      this._procTrack(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Track node '" + j.n + "'");
      break;
    case Ovoid.SKIN:
      n = new Ovoid.Skin(j.n);
      this._procSkin(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Skin node '" + j.n + "'");
      break;
    case Ovoid.EMITTER:
      n = new Ovoid.Emitter(j.n);
      this._procEmitter(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Emitter node '" + j.n + "'");
      break;
    case Ovoid.AUDIO:
      n = new Ovoid.Audio(j.n);
      this._procAudio(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Audio node '" + j.n + "'");
      break;
    case Ovoid.TEXT:
      n = new Ovoid.Text(j.n);
      this._procText(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Text node '" + j.n + "'");
      break;
    case Ovoid.LAYER:
      n = new Ovoid.Layer(j.n);
      this._procLayer(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Layer node '" + j.n + "'");
      break;
    case Ovoid.SOUND:
      n = new Ovoid.Sound(j.n);
      this._procSound(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Sound node '" + j.n + "'");
      break;
    default:
      n = new Ovoid.Node(j.n);
      this._procNode(n, j);
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "import Null node '" + j.n + "'");
      break;
  }
  this._dstsc.insert(n, null, true, true);
  this._rlnkstack.push(n);
};


/**
 * Proceed to relink / reparent node from Json uid's to Node pointers.
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
  
  for(var i = 0; i < n.child.length; i++) 
    n.child[i] = this._dstsc.search(n.child[i]);
    
  for(var i = 0; i < n.depend.length; i++)
    n.depend[i] = this._dstsc.search(n.depend[i]);
    
  for(var i = 0; i < n.link.length; i++)
    n.link[i] = this._dstsc.search(n.link[i]);
    
  if(n.type & Ovoid.CONSTRAINT)
    for(var i = 0; i < n.target.length; i++)
      n.target[i] = this._dstsc.search(n.target[i]);
  
  if(n.type & Ovoid.AIM)
    n.aimat[i] = this._dstsc.search(n.aimat[i]);

  if(n.type & Ovoid.BODY)
    n.shape = this._dstsc.search(n.shape);

  if(n.type & Ovoid.SKIN) {
    n.mesh = this._dstsc.search(n.mesh);
    /* retrouve les joints */
    var joints = new Array();
    for(var i = 0; i < n.joint.length; i++) {
      n.joint[i] = this._dstsc.search(n.joint[i]);
      this._linkReport(n, n.joint[i], "joint");
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
      n.bgTexture = this._dstsc.search(n.bgTexture);

  if(n.type & Ovoid.TEXT)
      n.fontmap = this._dstsc.search(n.fontmap);
    
  if(n.type & Ovoid.MATERIAL)
    for(var i = 0; i < n.texture.length; i++)
        n.texture[i] = this._dstsc.search(n.texture[i]);
  
  if(n.type & Ovoid.TRACK)
    for(var i = 0; i < n.animation.length; i++)
        n.animation[i] = this._dstsc.search(n.animation[i]);
  
  if(n.type & Ovoid.MESH) {
    for (var l = 0; l < Ovoid.MAX_MESH_LOD; l++) {
      for (var s = 0; s < n.polyset[l].length; s++) {
        n.polyset[l][s].material = this._dstsc.search(n.polyset[l][s].material);
        if(!n.polyset[l][s].material) {
          Ovoid.log(2, 'Ovoid.Ojson ' + this.name, 
              "polyset #" + l + " of '" + n.name + "' has null material.");
        }
      }
    }
  }
  
  if(n.type & Ovoid.ACTION) {
    for (var i = 0; i < n.onIntersect[0].length; i++)
        n.onIntersect[0][i] = this._dstsc.search(n.onIntersect[0][i]);
    for (var i = 0; i < n.onIntersectEnter[0].length; i++)
        n.onIntersectEnter[0][i] = this._dstsc.search(n.onIntersectEnter[0][i]);
    for (var i = 0; i < n.onIntersectLeave[0].length; i++) 
      n.onIntersectLeave[0][i] = this._dstsc.search(n.onIntersectLeave[0][i]);
  }
};



/**
 * Proceed to importation of the Node part from a OJSON sub-object.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procNode = function(n, j) {
  
  /* - OJSON.Node structure -
   * .t
   * .n
   * .v
   * .u
   * .p*
   * .c[*]
   * .dp[*]
   * .lk[*]
   * .bmn
   * .bmx
   * .brd
   */
  n.visible = j.v;
  n.uid = j.u;
  (j.p == 'null')?n.parent=null:n.parent=j.p;
  for (var i = 0; i < j.c.length; i++)
    n.child.push(j.c[i]);
  for (var i = 0; i < j.dp.length; i++)
    n.depend.push(j.dp[i]);
  for (var i = 0; i < j.lk.length; i++)
    n.link.push(j.lk[i]);
  var min = new Ovoid.Point();
  var max = new Ovoid.Point();
  min.setv(j.bmn);
  max.setv(j.bmx);
  n.boundingBox.setBound(min, max);
  n.boundingSphere.setBound(min, max);
  n.boundingSphere.setRadius(j.brd);
};


/**
 * Proceed to importation of the Material part from a OJSON sub-object.
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
   
  for(var i = 0; i < j.cl.length; i++) {
    n.color[i].setv(j.cl[i]);
  }
  
  for(var i = 0; i < j.tx.length; i++) {
    if(n.texture[i] != 'null') {
      n.texture[i] = j.tx[i];
    }
  }
  
  n.shininess = j.sh;
  n.reflectivity = j.re;
  n.opacity = j.op;
  
};


/**
 * Proceed to importation of the Texture part from a OJSON sub-object.
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
  n.filter = j.fl;
};


/**
 * Proceed to importation of the Audio part from a OJSON sub-object.
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
  n.playing = j.pl;
  n.loop = j.lo;
  n.ended = j.en;
  for (var i = 0; i < j.an.length; i++)
    n.animation.push(j.an[i]);
  n.onended = this._parseFunc(j.oe);
};


/**
 * Proceed to importation of the Mesh part from a OJSON sub-object.
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
    if(j.mp[l].length > 0) {
      for (var s = 0; s < j.mp[l].length; s++) {
        var polyset = new Ovoid.Polyset();
        polyset.ioffset = j.mp[l][s][0];
        polyset.icount = j.mp[l][s][1];
        polyset.material = j.mp[l][s][2];
        n.polyset[l].push(polyset);
      }
    }
    
    if(j.mv[l].length > 0) {
      Ovoid.log(3, 'Ovoid.Ojson ' + this.name, 
        "unpack vertices buffer:" + j.mv[l].length + " floats");
      n.vertices[l] = Ovoid.Vertex.upack(j.mf, j.mv[l]);
    }
    
    if(j.mt[l].length > 0) {
      for (var t = 0; t < j.mt[l].length; t++) {
        var triangle = new Ovoid.Triangle();
        triangle.index[0] = j.mt[l][t][0];
        triangle.index[1] = j.mt[l][t][1];
        triangle.index[2] = j.mt[l][t][2];
        triangle.adjacent[0] = j.mt[l][t][3];
        triangle.adjacent[1] = j.mt[l][t][4];
        triangle.adjacent[2] = j.mt[l][t][5];
        n.triangles[l].push(triangle);
      }
    }
    
    n.recalcTriangles(l);
  }
  
  n._vfbytes = j.mb;
  n._vformat = j.mf;
  (j.mm == 'null')?n.modifier=null:n.modifier=j.mm;
  
  n.createBuffers(n._vformat, Ovoid.BUFFER_STATIC);
};


/**
 * Proceed to importation of the Constraint part from a OJSON sub-object.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procConstraint = function(n, j) {
  
  /* Importation hérité de "Ovoid.Node" */
  this._procNode(n, j);
  /* - OJSON.Constraint structure -
   * .target[]
   */
  for (var i = 0; i < j.ct.length; i++)
    n.target.push(j.ct[i]);
};


/**
 * Proceed to importation of the Animation part from a OJSON sub-object.
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
  n._format = j.ft;
  n.playing = j.pl;
  n.loop = j.lo;
  n.ended = j.en;
  n.smooth = j.sm;
  n.factor = j.fc;
  
  for (var i = 0; i < 21; i++) {
    if (j.cn[i] == 'null') {
      n._channel[i] = null;
    } else {
      var curve;
      switch (j.cn[i].type)
      {
        case "Bspline":
          curve = new Ovoid.Bspline(
            new Float32Array(j.cn[i].x),
            new Float32Array(j.cn[i].y),
            new Float32Array(j.cn[i].cx),
            new Float32Array(j.cn[i].cy));
          break;
        case "Hspline":
          curve = new Ovoid.Hspline(
            new Float32Array(j.cn[i].x),
            new Float32Array(j.cn[i].y),
            new Float32Array(j.cn[i].v));
          break;
        default:
          curve = new Ovoid.Cspline(
            new Float32Array(j.cn[i].x),
            new Float32Array(j.cn[i].y));
          break;
      }
      n._channel[i] = curve;
    }
  }
  n.onended = this._parseFunc(j.oe);
};


/**
 * Proceed to importation of the Physic part from a OJSON sub-object.
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
  n.imass = j.im;
  n.itensor.setv(j.it);
  n.model = j.md;
  n.damping = j.dm;
};


/**
 * Proceed to importation of the Skin part from a OJSON sub-object.
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
  (j.mh == 'null')?n.mesh=null:n.mesh=j.mh;
  for (var i = 0; i < j.jt.length; i++)
    n.joint.push(j.jt[i]);
  n.bindJointMatrix = new Array(j.bjm.length);
  for (var i = 0; i < n.bindJointMatrix.length; i++) {
    n.bindJointMatrix[i] = new Ovoid.Matrix4();
    n.bindJointMatrix[i].setv(j.bjm[i]);
  }
  n.bindShapeMatrix.setv(j.bsm);
};


/**
 * Proceed to importation of the Emitter part from a OJSON sub-object.
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
  n.model = j.md;
  n.mass = j.ms;
  n.life = j.lf;
  n.rate = j.rt;
  n.velocity = j.vl;
  n.damping = j.dm;
  n.delta = j.dt;
  n.scattering = j.sc;
  for(var i = 0; i < j.cl.length; i++) {
    n.color[i].setv(j.cl[i]);
  }
  n.size[0] = j.sz[0];
  n.size[1] = j.sz[1];
  n.emits = j.em;
  (j.tx == 'null')?n.texture=null:n.texture=j.tx;
  
};


/**
 * Proceed to importation of the Transform part from a OJSON sub-object.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procTransform = function(n, j) {
  
  /* Importation hérité de "Ovoid.Node" */
  this._procNode(n, j);
  /* - OJSON.Transform structure -
   * .ts[x,y,z]
   * .tt[x,y,z]
   * .to[x,y,z,w]
   * .tr[x,y,z,w]
   */
  n.scaling.setv(j.ts);
  n.translation.setv(j.tt);
  n.orientation.setv(j.to);
  n.rotation.setv(j.tr);
};


/**
 * Proceed to importation of the Camera part from a OJSON sub-object.
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
   */
  n.viewX = j.vx;
  n.viewY = j.vy;
  n.fov = j.fv;
  n.aspect = j.ar;
  n.clipNear = j.cn;
  n.clipFar = j.cf;
};


/**
 * Proceed to importation of the Camera part from a OJSON sub-object.
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
   */
  n.model = j.md;
  n.color.setv(j.cl);
  n.intensity = j.in;
  n.attenuationC = j.ac;
  n.attenuationL = j.al;
  n.attenuationQ = j.aq;
  n.range = j.rn;
  n.falloff = j.ff;
  n.spotAngle = j.sa;
  n.shadowCasting = j.sc;
  
};


/**
 * Proceed to importation of the Body part from a OJSON sub-object.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procBody = function(n, j) {
  
  /* Importation hérité de "Ovoid.Transform" */
  this._procTransform(n, j);
  /* - OJSON.Body structure -
   * .shape*
   * .intersectable
   */
  (j.shape == 'null')?n.shape=null:n.shape=j.bs;
  n.intersectable = j.bi;
  n.shadowCasting = j.bc;
  n.renderLayer = j.bl;
  n.renderAlpha = j.ba;
};


/**
 * Proceed to importation of the Joint part from a OJSON sub-object.
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
  n.sz = j.size;
  (j.sk == 'null')?n.skin=null:n.skin=j.sk;
};


/**
 * Proceed to importation of the Sound part from a OJSON sub-object.
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
  (j.au == 'null')?n.audio=null:n.audio=j.au;
  n.spatialize(!j.fl);
  if(n.alpanner && j.ia) {
    n.alpanner.coneInnerAngle = j.ia;
    n.alpanner.coneOuterAngle = j.oa;
    n.alpanner.coneOuterGain = j.og;
    n.alpanner.refDistance = j.rd;
    n.alpanner.maxDistance = j.md;
    n.alpanner.rolloffFactor = j.rf;
  }
  n.setLoop(j.lo);
};


/**
 * Proceed to importation of the Layer part from a OJSON sub-object.
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
   */
  n.size.setv(j.sz);
  n.size.setv(j.fc);
  n.size.setv(j.bc);
  (j.bt == 'null')?
    n.bgTexture=null:
    n.bgTexture=j.bt;
};


/**
 * Proceed to importation of the Text part from a OJSON sub-object.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procText = function(n, j) {
  
  /* Importation hérité de "Ovoid.Layer" */
  this._procLayer(n, j);
  /* - OJSON.Text structure -
   * .fontmap*
   * .string
   * .param[u,v,w]
   */
  (j.fm == 'null')?
    n.fontmap=null:
    n.fontmap=j.fm;
  n.string = j.st;
  n.param.setv(j.pr);
};


/**
 * Proceed to importation of the Expression part from a OJSON sub-object.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procExpression = function(n, j) {
  
  /* Importation hérité de "Ovoid.Constraint" */
  this._procConstraint(n, j);
  /* - OJSON.Expression structure -
   * .playing
   * .factor
   * .exprfunc[]
   */
  n.playing = j.pl;
  n.factor = j.fc;
  for (var i = 0; i < j.ex.length; i++)
    n.exprfunc.push(this._parseFunc(j.ex[i]));
};


/**
 * Proceed to importation of the Aim part from a OJSON sub-object.
 * 
 * @param {Object} n Ovoid typed Node object to structure from JSON.
 * @param {Object} j OJSON object.
 */
Ovoid.Ojson.prototype._procAim = function(n, j) {
  
  /* Importation hérité de "Ovoid.Constraint" */
  this._procConstraint(n, j);
  /* - OJSON.Expression structure -
   * .upvector[x,y,z]
   * .aimat*
   */
  n.upvector.set(j.up);
  (j.at == 'null')?n.aimat=null:n.aimat=j.at;
};


/**
 * Proceed to importation of the Action part from a OJSON sub-object.
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
   * .onIntersect[[][]]
   * .onIntersectEnter[[][]]
   * .onIntersectLeave[[][]]
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
  
  for (var i = 0; i < j.onIntersect[0].length; i++) {
    (j.onIntersect[0][i] == 'null')?
    n.onIntersect[0][i]=null:
    n.onIntersect[0][i]=j.onIntersect[0][i];
    
    n.onIntersect[1][i] = this._parseFunc(j.onIntersect[1][i]);
  }
  for (var i = 0; i < j.onIntersectEnter[0].length; i++) {
    (j.onIntersectEnter[0][i] == 'null')?
    n.onIntersectEnter[0][i]=null:
    n.onIntersectEnter[0][i]=j.onIntersectEnter[0][i];
    
    n.onIntersectEnter[1][i] = this._parseFunc(j.onIntersectEnter[1][i]);
  }
  for (var i = 0; i < j.onIntersectLeave[0].length; i++) {
    (j.onIntersectLeave[0][i] == 'null')?
    n.onIntersectLeave[0][i]=null:
    n.onIntersectLeave[0][i]=j.onIntersectLeave[0][i];
    
    n.onIntersectLeave[1][i] = this._parseFunc(j.onIntersectLeave[1][i]);
  }
};


/**
 * Import OJSON scene data.<br><br>
 * 
 * Interprets the current parsed OSJON source and import the result in the
 * given recipient scene.
 *
 * @param {Object} scene Recipient Scene object.
 * 
 * @return {bool} True if import suceeds, false otherwise.
 */
Ovoid.Ojson.prototype.importScene = function(scene) {

  /* détermine le nom du ojson d'apres l'url */
  var tmp = this.url;
  tmp = tmp.split('/');
  tmp = tmp[tmp.length - 1];
  tmp = tmp.split('.');
  this.name = tmp[0];
  
  Ovoid.log(3, 'Ovoid.Ojson ' + this.name, "importScene START");
  
  /* Si le JSON object n'existe on ne peut rien faire */
  if (!this._json) {
    Ovoid.log(1, 'Ovoid.Ojson ' + this.name, "no data to import.");
    return false;
  }

  /* Verifie le format JSON */
  if(!this._json.OJSON) {
    Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "is not a valid Ovoid JSON format");
    return false;
  }
  
  if(this._json.TYPE != "SCN") {
    Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "is not a valid Ovoid JSON Scene");
    return false;
  }
  
  if(!this._json.SCENE) {
    Ovoid.log(1, 'Ovoid.Ojson ' + this.name,
          "no scene object found in Ovoid JSON");
    return false;
  }
  
  /* reset le relink stack */
  this._rlnkstack = new Array();
  
  /* Scene de destination */
  this._dstsc = scene;
  
  //var debug = '';
  var jsonnode = this._json.SCENE.nl;
  /* importation de toutes les nodes */
  Ovoid.log(3, 'Ovoid.Ojson ' + this.name, "importing nodes...");
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
  Ovoid.log(3, 'Ovoid.Ojson ' + this.name, "relinking nodes...");
  for (var i = 0; i < this._rlnkstack.length; i++) {
    this._relinkNode(this._rlnkstack[i]);
  }
  
  this._dstsc.name = this._json.SCENE.n;
  this._dstsc._uidn = this._json.SCENE.u;
  
  Ovoid.log(3, 'Ovoid.Ojson ' + this.name, "importScene END");
  
  return true;
};
