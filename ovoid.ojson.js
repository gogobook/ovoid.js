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
 * @class OvoiD.JSON translator object.<br><br>
 *
 * The Ojson object implements a JSON format scene exporter/importer.<br><br>
 * 
 * <b>The OvoiD.JSON Files</b><br><br>
 * 
 * OvoiD.JSON is a JSON formated file who store an OvoiD.JS specific 
 * data.<br><br>
 * 
 * OvoiD.JSON is designed to be used as the main OvoiD.JS Library saving 
 * and loading file format. It currently provides full support for 
 * Scene and Instance's environment.<br><br>
 * 
 * The Ovoid.Ojson class can export and import two file type, one 
 * dedicated to Scene data, with the ".ojs" extention, and another 
 * dedicated to Instance's environment, with the ".oje" extention. 
 * The data type and file format is automaticaly selected depending 
 * the object's type you pass as argument to the <c>save()</c> method. 
 * If you give an Scene object, it will export an ".ojs" file with 
 * Scene data. If you give an Instance object, it will export an 
 * ".oje" file with Instance's environment data.<br><br>
 * 
 * <b>Which data is saved ?</b><br><br>
 * 
 * For the Scene data ".ojs" file:<br>
 * <ul>
 * <li>Scene's name and Uid</li>
 * <li>All Scene's Nodes with data including user-defined functions.</li>
 * </ul><br><br>
 * 
 * For the Instance's environment data ".oje" file:<br>
 * <ul>
 * <li>Instance's options, except WebGL context options (who must be 
 * defined before Instance's creation).</li>
 * <li>Input's triggers with user-defined functions</li>
 * <li><c>onloop()</c>, <c>ondraw()</c> and <c>waitdraw()</c> user-defined 
 * methods (the <c>onload()</c> method is not saved since it may produce 
 * redundant code)</li>
 * <li>Custom user-defined Drawer's Shaders with pipes and layers 
 * configuration</li>
 * </ul><br><br>
 * 
 * <b>Saving data</b><br><br>
 * 
 * Once you created an interactive application using Action Nodes, 
 * Expression Nodes, COLLADA importations, user-defined onload() and 
 * onloop(), Input triggers, custom shaders with layers configuration, 
 * etc... you can save all data using the Ojson translator. It's simple, 
 * you just have to create an Ovoid.Ojson object and call the <c>save()</c> 
 * method at the good time in your code.
 * 
 * <blockcode>
 * <cc>// Our application entry, called via 'onload="main()"' in our HTML code</cc><br>
 * function main() {<br>
 * &nbsp;&nbsp;<cc>// Create a Config object
 * &nbsp;&nbsp;var myConf = Ovoid.newConfig();<br>
 * &nbsp;&nbsp;<cc>// Adjust some options</cc><br>
 * &nbsp;&nbsp;<cc>// ...</cc><br>
 * &nbsp;&nbsp;<cc>// Create a new instance</cc><br>
 * &nbsp;&nbsp;var Instance = Ovoid.newInstance("myOvoid", "myCanvas", myConf);<br>
 * &nbsp;&nbsp;<cc>// The Config object is now useless</cc><br>
 * &nbsp;&nbsp;delete myConf;<br>
 * &nbsp;&nbsp;<cc>// Creation successfull ? </cc><br>
 * &nbsp;&nbsp;if(Instance) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Include stuff to load</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// ...</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Then define the onload() function</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.onload = function() {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// ...</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// Create a Ojson object</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var ojson = new Ovoid.Ojson();<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// Export the current Instance's environment</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ojson.save(this);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// Export the current Instance's active Scene</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ojson.save(this.Scene);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;}<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// And define the onloop() function</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.onloop = function() {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// ...</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;}<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// All is ready now, we can start the Instance</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.start();<br>
 * &nbsp;&nbsp;}<br>
 * }<br>
 * </blockcode>
 * 
 * With the above example, your browser will prompt you to dowload two
 * files, an .oje, this is the Instance's Env data, and an .ojs, this
 * is the Scene's data.<br><br>
 * 
 * <b>Restore saved data</b><br><br>
 * 
 * Once you saved an Instance's environment and/or a scene
 * you can erase almost all your code and just have to restore it via 
 * the <c>Instance.includeOjson()</c> method before starting the 
 * Instance.<br><br>
 * 
 * <blockcode>
 * <cc>// Our application entry, called via 'onload="main()"' in our HTML code</cc><br>
 * function main() {<br>
 * &nbsp;&nbsp;<cc>// Create a Config object<br>
 * &nbsp;&nbsp;var myConf = Ovoid.newConfig();<br>
 * &nbsp;&nbsp;<cc>// Adjust some options </cc><br>
 * &nbsp;&nbsp;<cc>// ... </cc><br>
 * &nbsp;&nbsp;<cc>// Create a new instance</cc><br>
 * &nbsp;&nbsp;var Instance = Ovoid.newInstance("myOvoid", "myCanvas", myConf);<br>
 * &nbsp;&nbsp;<cc>// The Config object is now useless</cc><br>
 * &nbsp;&nbsp;delete myConf;<br>
 * &nbsp;&nbsp;<cc>// Creation successfull ? </cc><br>
 * &nbsp;&nbsp;if(Instance) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Include our saved Instance's Env</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.includeOjson("myOvoid.oje");<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Include our saved Scene</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.includeOjson("myOvoidScene.ojs");<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Then just start the instance</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.start();<br>
 * &nbsp;&nbsp;}<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * <b>Why using Ojson instead still use Dae/Collada file ?</b><br><br>
 * 
 * Dae/Collada is an exchange format. It is optimised to make easy the 
 * translation from a 3D application to another, but NOT optimized for 
 * weight and data storing. In Ovoid.JS,  and if you don't specify the 
 * option, all mesh's data from a Dae file are imported as raw data 
 * then optimized to be more lightweight, take less memory and 
 * optimized for some computation (like shadow volums). This operation 
 * can take many time if the mesh is complex. If you export the 
 * optimised mesh as Ojson, the mesh is stored as a native node, full 
 * ready and optimized. It is lightweight to load, and is computed 
 * quickly. And more, the Ojson format saves ALL Ovoid.JS specific 
 * data, like Lod data, Body's visible range, layers,  interactive 
 * configuration, etc...<br><br>
 * 
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
  /** pointer to attached Ovoid.JS instance */
  this._i = null;
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
  
  Ovoid._log(3,this._i,'::Ojson._linkReport', this.name + 
      ":: relink '" + n.name + "' has "+ s +" '" + lname + "'");
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
      n = new Ovoid.Transform(j.n, this._i);
      this._procTransform(n, j);
      Ovoid._log(3,this._i, '::Ojson._importNode', this.name + 
        ":: import Transform node '" + j.n + "'");
      break;
    case Ovoid.CAMERA:
      n = new Ovoid.Camera(j.n, this._i);
      this._procCamera(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Camera node '" + j.n + "'");
      break;
    case Ovoid.LIGHT:
      n = new Ovoid.Light(j.n, this._i);
      this._procLight(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Light node '" + j.n + "'");
      break;
    case Ovoid.BODY:
      n = new Ovoid.Body(j.n, this._i);
      this._procBody(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Body node '" + j.n + "'");
      break;
    case Ovoid.JOINT:
      n = new Ovoid.Joint(j.n, this._i);
      this._procJoint(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Joint node '" + j.n + "'");
      break;
    case Ovoid.MESH:
      n = new Ovoid.Mesh(j.n, this._i);
      this._procMesh(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Mesh node '" + j.n + "'");
      break;
    case Ovoid.MATERIAL:
      n = new Ovoid.Material(j.n, this._i);
      this._procMaterial(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Material node '" + j.n + "'");
      break;
    case Ovoid.TEXTURE:
      n = new Ovoid.Texture(j.n, this._i);
      this._procTexture(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Texture node '" + j.n + "'");
      break;
    case Ovoid.ACTION:
      n = new Ovoid.Action(j.n, this._i);
      this._procAction(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Action node '" + j.n + "'");
      break;
    case Ovoid.PHYSICS:
      n = new Ovoid.Physics(j.n, this._i);
      this._procPhysic(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Physics node '" + j.n + "'");
      break;
    case Ovoid.ANIMATION:
      n = new Ovoid.Animation(j.n, this._i);
      this._procAnimation(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        "import Animation node '" + j.n + "'");
      break;
    case Ovoid.EXPRESSION:
      n = new Ovoid.Expression(j.n, this._i);
      this._procExpression(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Expression node '" + j.n + "'");
      break;
    case Ovoid.AIM:
      n = new Ovoid.Aim(j.n, this._i);
      this._procAim(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Aim node '" + j.n + "'");
      break;
    case Ovoid.TRACK:
      n = new Ovoid.Track(j.n, this._i);
      this._procTrack(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Track node '" + j.n + "'");
      break;
    case Ovoid.SKIN:
      n = new Ovoid.Skin(j.n, this._i);
      this._procSkin(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Skin node '" + j.n + "'");
      break;
    case Ovoid.EMITTER:
      n = new Ovoid.Emitter(j.n, this._i);
      this._procEmitter(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Emitter node '" + j.n + "'");
      break;
    case Ovoid.AUDIO:
      n = new Ovoid.Audio(j.n, this._i);
      this._procAudio(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Audio node '" + j.n + "'");
      break;
    case Ovoid.TEXT:
      n = new Ovoid.Text(j.n, this._i);
      this._procText(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Text node '" + j.n + "'");
      break;
    case Ovoid.LAYER:
      n = new Ovoid.Layer(j.n, this._i);
      this._procLayer(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Layer node '" + j.n + "'");
      break;
    case Ovoid.SOUND:
      n = new Ovoid.Sound(j.n, this._i);
      this._procSound(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name + 
        ":: import Sound node '" + j.n + "'");
      break;
    default:
      n = new Ovoid.Node(j.n, this._i);
      this._procNode(n, j);
      Ovoid._log(3,this._i,'::Ojson._importNode', this.name +
        ":: import Null node '" + j.n + "'");
      break;
  }
  this._dstsc.insNode(n, null, true, true);
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
      n.parent = this._dstsc.findNode(n.parent);
    } else {
      /* parent par defaut */
      n.parent = null;
      if (n.type & Ovoid.LAYER) {
        n.setParent(this._dstsc.overlay);
      } else {
        if (n.type & Ovoid.TRANSFORM) {
          n.setParent(this._dstsc.world);
        }
      }
    }
  }
  
  for(var i = 0; i < n.child.length; i++) 
    n.child[i] = this._dstsc.findNode(n.child[i]);
    
  for(var i = 0; i < n.depend.length; i++)
    n.depend[i] = this._dstsc.findNode(n.depend[i]);
    
  for(var i = 0; i < n.link.length; i++)
    n.link[i] = this._dstsc.findNode(n.link[i]);
    
  if(n.type & Ovoid.CONSTRAINT)
    for(var i = 0; i < n.target.length; i++)
      n.target[i] = this._dstsc.findNode(n.target[i]);
  
  if(n.type & Ovoid.AIM)
    n.aimat[i] = this._dstsc.findNode(n.aimat[i]);

  if(n.type & Ovoid.BODY)
    n.shape = this._dstsc.findNode(n.shape);

  if(n.type & Ovoid.SKIN) {
    n.mesh = this._dstsc.findNode(n.mesh);
    /* retrouve les joints */
    var joints = new Array();
    for(var i = 0; i < n.joint.length; i++) {
      n.joint[i] = this._dstsc.findNode(n.joint[i]);
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
      n.skin = this._dstsc.findNode(n.skin);
  
  if(n.type & Ovoid.SOUND)
      n.audio = this._dstsc.findNode(n.audio);

  if(n.type & Ovoid.LAYER)
      n.bgTexture = this._dstsc.findNode(n.bgTexture);

  if(n.type & Ovoid.TEXT)
      n.fontmap = this._dstsc.findNode(n.fontmap);
    
  if(n.type & Ovoid.MATERIAL)
    for(var i = 0; i < n.texture.length; i++)
        n.texture[i] = this._dstsc.findNode(n.texture[i]);
  
  if(n.type & Ovoid.TRACK)
    for(var i = 0; i < n.animation.length; i++)
        n.animation[i] = this._dstsc.findNode(n.animation[i]);
  
  if(n.type & Ovoid.MESH) {
    for (var l = 0; l < Ovoid.MAX_MESH_LOD; l++) {
      for (var s = 0; s < n.polyset[l].length; s++) {
        n.polyset[l][s].material = this._dstsc.findNode(n.polyset[l][s].material);
        if(!n.polyset[l][s].material) {
          Ovoid._log(2,this._i,'::Ojson._relinkNode', this.name + 
              ":: polyset #" + l + " of '" + n.name + "' has null material.");
        }
      }
    }
  }

  if(n.type & Ovoid.EMITTER)
    n.texture = this._dstsc.findNode(n.texture);
        
  if(n.type & Ovoid.ACTION) {
    for (var i = 0; i < n.onIntersect[0].length; i++)
        n.onIntersect[0][i] = this._dstsc.findNode(n.onIntersect[0][i]);
    for (var i = 0; i < n.onIntersectEnter[0].length; i++)
        n.onIntersectEnter[0][i] = this._dstsc.findNode(n.onIntersectEnter[0][i]);
    for (var i = 0; i < n.onIntersectLeave[0].length; i++) 
      n.onIntersectLeave[0][i] = this._dstsc.findNode(n.onIntersectLeave[0][i]);
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
   * .k
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
  n.pickable = j.k;
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
      Ovoid._log(3,this._i, '::Ojson._procMesh', this.name + 
        ":: unpack vertices buffer:" + j.mv[l].length + " floats");
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
    
    n._lodt[l] = j.lt[l];
    
    n.recalcTriangles(l);
  }
  
  n._vfbytes = j.mb;
  n._vformat = j.mf;
  (j.mm == 'null')?n.modifier=null:n.modifier=j.mm;
  
  n._createBuffers(n._vformat, Ovoid.BUFFER_STATIC);
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
  n.useFriction = j.uf;
  n.restitution = j.re;
  n.sleeping = j.sl;
  n.oncontact = this._parseFunc(j.oc);
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
  n.billboard = j.bb;
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
   * .model
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
  n.intensity = j.it;
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
  n.visibleRange = j.vr;
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
  n.fgColor.setv(j.fc);
  n.bgColor.setv(j.bc);
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
 * Export data as Ovoid.JSON file.<br><br>
 * 
 * Exports the given object to Ovoid.JSON file. Once exportation done, 
 * the browser will prompts to download the generated file.<br><br>
 * 
 * The output file format depend of the object's type you pass as 
 * argument. An Scene object will export the Scene and outputs an .ojs 
 * file. An Instance object will export the Instance's environment and 
 * outputs an .oje file.<br><br>
 *
 * @param {Object} recp Source object to export, can be a Scene object 
 * or Instance object.
 * 
 * @return {String} Exportation result string.
 */
Ovoid.Ojson.prototype.save = function(recp) {
  
  this.name = recp.name;
  var jdata = new Object();
  jdata['OJSN'] = Ovoid.VERSION;
  var ext;
      
  if(recp instanceof Ovoid.Scene) {
    Ovoid._log(3,this._i,'::Ojson.save', this.name + ":: Scene data export.");
    this._i = recp._i;
    /* Entête d'objet */
    jdata['TYPE'] = "SCN";
    jdata['SCENE'] = recp;
    ext = ".ojs";
  } else {
    if(recp instanceof Ovoid.Instance) {
      Ovoid._log(3,this._i,'::Ojson.save', this.name + ":: Instance's env data export.");
      this._i = recp;
      /* Entête d'objet */
      jdata['TYPE'] = "ENV";
      jdata['INENV'] = recp;
      ext = ".oje";
    } else {
      Ovoid._log(1,this._i,'::Ojson.save', this.name + 
      ":: invalid object type to export, expected Scene or Instance.");
      return null;
    }
  }
  
  /* Export des données */
  Ovoid._log(3,this._i,'::Ojson.save', this.name + ":: stringify data.");
  try {
    this._json = JSON.stringify(jdata);
    delete jdata;
    Ovoid._log(3,this._i,'::Ojson.save', this.name + ":: " + Math.round((this._json.length * 8) / 1000) + " Ko of JSON data created.");
  } catch (e) {
    Ovoid._log(1,this._i,'::Ojson.save', this.name + ":: stringify exception thrown: " + e);
    return null;
  }

  var dl = document.createElement('a');
  if(dl) {
    try {
      // Il faut encoder les espaces pour les préserver (la fonction encodeURIcomponent() crée une string trop lourde qui fait crasher le browser)
      this._json = this._json.replace(/ /g, "%20"); 
      dl.setAttribute('href', 'data:text/plain;charset=utf-8,' + this._json);
      dl.setAttribute('download', this.name + ext);
      document.body.appendChild(dl); // Pour Firefox
      dl.click();
    } catch (e) {
      Ovoid._log(1,this._i,'::Ojson.save', this.name + ":: download exception thrown: " + e);
    }
  } else {
    Ovoid._log(1,this._i,'::Ojson.save', this.name + 
      ":: unable to create download link");
    alert("Ovoid :: Ojson.save :: unable to create download link.");
  }
  
  return this._json;
};


/**
 * Import OJSON scene data.<br><br>
 * 
 * Interprets the current parsed OSJON source and import the result in 
 * the given recipient scene.
 *
 * @param {Object} scene Recipient Scene object.
 * 
 * @return {bool} True if import suceeds, false otherwise.
 */
Ovoid.Ojson.prototype._importScene = function(scene) {
    
  if(!this._json.SCENE) {
    Ovoid._log(1,this._i, '::Ojson._importScene', this.name +
          ":: no scene object found in Ovoid JSON");
    return false;
  }
  
  Ovoid._log(3,this._i, '::Ojson._importScene', this.name + 
      ":: begin");
      
  /* reset le relink stack */
  this._rlnkstack = new Array();
  
  /* Scene de destination */
  this._dstsc = scene;
  
  var jsonnode = this._json.SCENE.nl;
  /* importation de toutes les nodes */
  Ovoid._log(3,this._i,'::Ojson._importScene', this.name + 
      ":: importing nodes...");
  for (var i = 0; i < jsonnode.length; i++) {
    //debug += jsonnode[i].name + "\n";
    try {
      this._importNode(jsonnode[i]);
    } catch (e) {
      Ovoid._log(1,this._i,'::Ojson._importScene', this.name +
          ":: error during node importation:"
          + e.stack
          + " file may be corrupted.");
      return false;
    }
  }
  /* relink / reparente toutes les nodes */
  Ovoid._log(3,this._i,'::Ojson._importScene', this.name + 
      ":: relinking nodes...");
  for (var i = 0; i < this._rlnkstack.length; i++) {
    this._relinkNode(this._rlnkstack[i]);
  }
  
  this._dstsc.name = this._json.SCENE.n;
  this._dstsc._uidn = this._json.SCENE.u;
  
  Ovoid._log(3,this._i,'::Ojson._importScene', this.name + 
      ":: done");
  
  return true;
};


/**
 * Import OJSON Instance's Env data.<br><br>
 * 
 * Interprets the current parsed OSJON source and import the result in 
 * the given recipient Instance.
 *
 * @param {Object} inst Recipient Instance object.
 * 
 * @return {bool} True if import suceeds, false otherwise.
 */
Ovoid.Ojson.prototype._importEnv = function(inst) {

  if(!this._json.INENV) {
    Ovoid._log(1,this._i, '::Ojson._importEnv', this.name +
          ":: no Instance Env object found in Ovoid JSON");
    return false;
  }
  var env = this._json.INENV;
  
  Ovoid._log(3,this._i, '::Ojson._importEnv', this.name + 
      ":: begin");
  
  try {
    /* Import des input triggers */
    var s, c, t, i;
    for(s = 0; s < 3; s++) {
      c = env.oi[s].length;
      for(t = 0; t < c; t++) {
        this._i.Input.setTrigger(0, env.oi[s][t][0], s, this._parseFunc(env.oi[s][t][1]));
      }
      c = env.oci[s].length;
      for(t = 0; t < c; t++) {
        this._i.Input.setTrigger(1, env.oci[s][t][0], s, this._parseFunc(env.oci[s][t][1]));
      }
      c = env.oai[s].length;
      for(t = 0; t < c; t++) {
        this._i.Input.setTrigger(2, env.oai[s][t][0], s, this._parseFunc(env.oai[s][t][1]));
      }
      c = env.osi[s].length;
      for(t = 0; t < c; t++) {
        this._i.Input.setTrigger(3, env.osi[s][t][0], s, this._parseFunc(env.osi[s][t][1]));
      }
      c = env.olsi[s].length;
      for(t = 0; t < c; t++) {
        this._i.Input.setTrigger(4, env.olsi[s][t][0], s, this._parseFunc(env.olsi[s][t][1]));
      }
      c = env.orsi[s].length;
      for(t = 0; t < c; t++) {
        this._i.Input.setTrigger(5, env.orsi[s][t][0], s, this._parseFunc(env.orsi[s][t][1]));
      }
    }
    
    /* Import des fonctions */
    this._i.onloop = this._parseFunc(env.olp);
    this._i.ondraw = this._parseFunc(env.odw);
    this._i.waitdraw = this._parseFunc(env.wdw);
    
    /* import des shaders */
    this._i.Drawer._splib[i] = new Array();
    c = env.sl.length;
    for(i = 0; i < c; i++) {
      s = new Ovoid.Shader(env.sl[i].n, this._i);
      s.setSources(env.sl[i].vs, env.sl[i].fs, env.sl[i].ws);
      this._i.Drawer._splib[i] = s;
    }
    
    /* import des index pipes shader */
    this._i.Drawer._sppipe = new Array(Ovoid.MAX_RENDER_LAYER);
    c = env.sp.length;
    for(i = 0; i < c; i++) {
      this._i.Drawer._sppipe[i] = env.sp[i];
    }
    
    this._i.opt_debugMode = env.o[0];
    this._i.opt_enableAlerts = env.o[1];
    this._i.opt_logLevel = env.o[2];
    this._i.opt_customErrContent = env.o[3];
    this._i.opt_showHud = env.o[4];
    this._i.opt_showDebug = env.o[5];
    this._i.opt_gravity = env.o[6];
    /* Options de preload */
    this._i.opt_preloadStyle = env.o[7];
    this._i.opt_preloadBgColor = env.o[8];
    this._i.opt_preloadFgColor = env.o[9];
    this._i.opt_preloadAcColor = env.o[10];
    /* Options de frame */
    this._i.opt_frameMode = env.o[11];
    /* Options du drawer */
    this._i.opt_renderClearColor = env.o[12];
    this._i.opt_renderAmbientColor = env.o[13];
    this._i.opt_renderFogColor = env.o[14];
    this._i.opt_renderFogDensity = env.o[15];
    this._i.opt_renderPickingMode = env.o[16];
    this._i.opt_renderLopLevel = env.o[17];
    this._i.opt_renderAdaptLop = env.o[18];
    this._i.opt_renderAdaptLopThreshold = env.o[19];
    this._i.opt_renderPerLightPass = env.o[20];
    this._i.opt_renderShadowCasting = env.o[21];
    this._i.opt_renderShadowCastingExclusion = env.o[22];
    this._i.opt_renderDrawLayers = env.o[23];
    this._i.opt_renderDrawHelpers = env.o[24];
    this._i.opt_renderDrawAxis = env.o[25];
    this._i.opt_renderDrawBoundingBox = env.o[26];
    this._i.opt_renderDrawBoundingSphere = env.o[27];
    this._i.opt_renderDrawJoints = env.o[28];
    this._i.opt_renderDrawLights = env.o[29];
    this._i.opt_renderDrawCameras = env.o[30];
    this._i.opt_renderDrawNormals = env.o[31];
    this._i.opt_renderJointSize = env.o[32];
    this._i.opt_renderNormalScale = env.o[33];
    /* Options du queuer */
    this._i.opt_sceneViewcull = env.o[34];
    this._i.opt_sceneLightcull = env.o[35];
    this._i.opt_sceneIntersectDetect = env.o[36];
    this._i.opt_sceneDefaultViewPosition = env.o[37];
    this._i.opt_sceneDefaultViewRotation = env.o[38];
    /* Options du solver */
    this._i.opt_physicsIterativeSolver = env.o[39];
    this._i.opt_physicsContactItFactor = env.o[40];
    /* Options de derniere minute */
    this._i.opt_renderCullFace = env.o[41];
    /* Options audio */
    this._i.opt_audioDopplerFactor = env.o[42];
    /* Options divers */
    this._i.opt_skinLocalComput = env.o[43];
  
  } catch (e) {
    Ovoid._log(1,this._i,'::Ojson._importEnv', this.name +
        ":: error during Env importation:"
        + e.stack
        + " file may be corrupted.");
    return false;
  }
  
  Ovoid._log(3,this._i,'::Ojson._importEnv', this.name + 
      ":: done");
      
  return true;
};

/**
 * Handle loaded JSON file.<br><br>
 * 
 * Analyses the loaded JSON file and dispatch it to the proper importer
 * method.
 * 
 * @param {Object} d Recipient destination object, Scene or Instance.
 */
Ovoid.Ojson.prototype._importOjson = function(d) {
  
  /* Si le JSON object n'existe on ne peut rien faire */
  if (!this._json) {
    Ovoid._log(1,this._i, '::Ojson._importOjson', this.name + 
        ":: no JSON data.");
    return false;
  }

  /* Verifie si c'est un OJSON */
  if(!this._json.OJSN) {
    Ovoid._log(1,this._i, '::Ojson._importOjson', this.name +
          ":: is not a valid Ovoid.JSON format");
    return false;
  } else {
    /* Vérifie la version OJSON*/
    if(this._json.OJSN != Ovoid.VERSION) {
      Ovoid._log(1,this._i, '::Ojson._importOjson', this.name +
          ":: wrong Ovoid.JSON version, is:" + this._json.OJSN +
          " expected:" + Ovoid.VERSION);
      return false;
    }
  }

  /* Est-ce une Scene ? */
  if(this._json.TYPE == "SCN") {
    if(d instanceof Ovoid.Scene) {
      return this._importScene(d);
    } else {
      Ovoid._log(1,this._i, '::Ojson._importOjson', this.name +
          ":: invalid destination object for Scene type Ovoid.JSON, Ovoid.Scene object expected");
      return false;
    }
  } else {
    /* Si non est-ce un Env ? */
    if(this._json.TYPE == "ENV") {
      if(d instanceof Ovoid.Instance) {
        return this._importEnv(d);
      } else {
        Ovoid._log(1,this._i, '::Ojson._importOjson', this.name +
            ":: invalid destination object for Env type Ovoid.JSON, Ovoid.Instance object expected");
        return false;
      }
    } else {
      Ovoid._log(1,this._i, '::Ojson._importOjson', this.name +
          ":: unknow Ovoid.JSON type.");
      return false;
    }
  }
}


/**
 * Load and import Ojson file.<br><br>
 * 
 * Loads the specified Ojson file and once the source file is 
 * successfully loaded, imports data into the specified recipient 
 * Scene.<br><br>
 *  
 * The <c>loadSatus</c> member indicates the loading status through an 
 * integer value of 0, 1 or -1. A value of 0 means that the file is not 
 * yet loaded, a value of 1 means that the source was successfully 
 * loaded, and a value of -1 means the loading failed.<br><br>
 * 
 * @param {string} url Source file name to load.
 * 
 * @param {Object} recp Recipient object, must be Scene or Instance.
 * 
 * @param {bool} async Sets synchronous or asynchronous way for data loading. 
 * If false or null the source is loaded in synchronous way.
 */
Ovoid.Ojson.prototype.loadSource = function(url, recp, async) {
  
  this.loadStatus = 0;
  
  this.url = url;
  
  if(recp instanceof Ovoid.Scene) {
    this._i = recp._i;
  } else {
    if(recp instanceof Ovoid.Instance) {
      this._i = recp;
    } else {
      Ovoid._log(1,this._i, '::Ojson._importOjson', this.name +
          ":: invalid destination object, expected Scene or Instance");
      return false;
    }
  }
  
  /* détermine le nom du ojson d'apres l'url */
  this.name = Ovoid.extractName(this.url);
  
  Ovoid._log(3,this._i, '::Ojson.loadSource', this.name + 
      ":: loading source file '" + this.url + "'");
          
  var xhr = new XMLHttpRequest();
  if(async) {
    xhr.o = this;
    xhr._i = this._i;
    xhr.d = recp;
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4) {
        if (this.status == 200 || this.status == 304) {
          Ovoid._log(3,this._i, '::Ojson.loadSource', this.o.name + 
              ":: parsing source file '" + this.o.url + "'");
          try{
            this.o._json = JSON.parse(this.responseText);
          } catch(e) {
            Ovoid._log(2,this._i, '::Ojson.loadSource', this.o.name + 
                ":: parse error '" + e.stack + "'");
          }
          this.o.loadStatus = 1;
          this.o._importOjson(this.d);
        } else {
          this.o.loadStatus = -1;
          Ovoid._log(2,this._i, 'Ojson.loadSource', + this.o.name +
              ":: unable to load source '" + this.o.url + "'");
        }
      }
    }
  }
  
  var src = this.url;
  if (this._i.opt_debugMode) 
    src += '?' + Math.random();
    
  xhr.open('GET',src, async);
  xhr.send(null);
  
  /* Si nous sommes en mode synchrone */
  if (!async) {
    if (xhr.status == 200 || xhr.status == 304) {
        Ovoid._log(3,this._i, '::Ojson.loadSource', this.name + 
            ":: parsing source file '" + this.url + "'");
        try{
          this._json = JSON.parse(xhr.responseText);
        } catch(e) {
          Ovoid._log(2,this._i, '::Ojson.loadSource', this.name + 
              ":: parse error '" + e.stack + "'");
        }
        this.loadStatus = 1;
        this._importOjson(recp);
    } else {
      this.loadStatus = -1;
      Ovoid._log(2,this._i, 'Ojson.loadSource', + this.name +
              ":: unable to load source '" + this.url + "'");
    }
  }
};
