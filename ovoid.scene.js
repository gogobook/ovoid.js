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
 * Create a Scene object.
 *
 * @class World Scene Graph object.
 * <br>
 * <br>
 * The scene graph is a structure that arranges the logical and spatial 
 * representation of a graphical scene. The Scene object can be defined as the 
 * main place where nodes are stored and as in the primary meaning of the word 
 * "scene" i.e. a place to show (draw) and act with nodes. The scene object is 
 * designed to provide an interface to access, search and create nodes.
 * <br>
 * <br>
 * <b>The Scene components</b>
 * <br>
 * The Scene object combine several element:
 * <br>
 * <ul>
 * <li><b>The World Scene</b></li>
 * The world scene is the graph tree of transformable nodes that concern the 
 * 3D space. World scene graph is defined by a root generic Node object who 
 * is the overall parent of all nodes.
 * <br>
 * <br>
 * <li><b>The Overlay Scene</b></li>
 * The overlay scene is the graph tree of transformable nodes that concern the 
 * 2D overlay context. Overlay scene graph is defined by a root generic Node 
 * object who is the overall parent of all nodes.
 * <br>
 * <br>
 * <li><b>The Active Camera</b></li>
 * The active camera is the one that is used to calculate the rendering's point 
 * of view perspective. A scene can contain more than one camera, and so the 
 * active camera must be explicitely defined to tell to the render engine wich 
 * camera to use to render the scene. The active camera can be switched at 
 * any time.
 * <br>
 * <br>
 * <li><b>The Nodes Groups</b></li>
 * For conveniences and overall for access, performance and design issue, all 
 * nodes are stored in groups (Array) according to their type and/or usage. 
 * Although a node can be retrieved using any graph iterator, it is far simpler 
 * and quicker to search it in the suitable group, or even, in a simple list of 
 * all nodes.
 * </ul>
 * 
 * @see Ovoid.Node
 * 
 * @param {string} name Name of the new scene.
 */
Ovoid.Scene = function(name) {

  /** scene name.
   * @type string */
  this.name = name;
  /** World root node.
   * @type Node */
  this.world = new Ovoid.Node('world');
  /** Overlays root node.
   * @type Node */
  this.overlay = new Ovoid.Node('overlay');
  /** Node list.
   * @type Node[] */
  this.node = new Array();
  /** Light list.
   * @type Light[] */
  this.light = new Array();
  /** Camera list.
   * @type Camera[] */
  this.camera = new Array();
  /** Transform list.
   * @type Transform[] */
  this.transform = new Array();
  /** Shape list.
   * @type Shape[] */
  this.shape = new Array();
  /** Material list.
   * @type Material[] */
  this.material = new Array();
  /** Action list.
   * @type Action[] */
  this.action = new Array();
  /** Texture list.
   * @type Texture[] */
  this.texture = new Array();
  /** Animation list.
   * @type Animation[] */
  this.animation = new Array();
  /** Track list.
   * @type Track[] */
  this.track = new Array();
  /** Physicss list.
   * @type Physicss[] */
  this.physics = new Array();
  /** Layer list.
   * @type Layer[] */
  this.layer = new Array();
  /** Audio list.
   * @type Audio[] */
  this.audio = new Array();
  /** Sound list.
   * @type Sound[] */
  this.sound = new Array();
  /** UID counter.
   * @type int */
  this._uidn = 1000 + Math.floor(Math.random()*9999);
  /** Active camera.
   * @type Camera */
  this.activeCamera = null;
};


/**
 * Create node.
 * 
 * <br><br>Creates a new node of the given type and name, then if specified, 
 * parent it to the specified parent node. The node is automatically included
 * in the world or overlay graph and the suitable groups according to its type.
 *
 * @param {int} type Node type to create. Can be one of the followin symbolic 
 * constants: <br>
 * Ovoid.NODE,<br> 
 * Ovoid.TEXTURE,<br>
 * Ovoid.MATERIAL,<br>
 * Ovoid.TRANSFORM, <br>
 * Ovoid.BODY, <br>
 * Ovoid.JOINT, <br>
 * Ovoid.CAMERA, <br>
 * Ovoid.LIGHT, <br>
 * Ovoid.MESH, <br>
 * Ovoid.SKIN, <br>
 * Ovoid.ANIMATION, <br>
 * Ovoid.ACTION, <br>
 * Ovoid.PHYSICS, <br>
 * Ovoid.EMITTER, <br>
 * Ovoid.TRACK, <br>
 * Ovoid.TEXT, <br>
 * Ovoid.LAYER, <br>
 * Ovoid.AUDIO, <br>
 * Ovoid.SOUND.<br><br>
 * 
 * @param {string} name Node name. If a node with the same name allready exists,
 * the created one will be automaticaly renamed with a #<number> at the end of 
 * the specified name. For example "mynode" will be renamed to "mynode#2".
 * 
 * @param {Node} parent Parent node (must be in the scene). If null or undefined
 * the created node is parented to the world root or overlay root node according
 * to its type.
 *
 * @return {Node} The new created node.
 * 
 * @see Ovoid.Node
 */
Ovoid.Scene.prototype.create = function(type, name, parent) {

  /* verifie les collisions de nom */
  if (this.search(name)) {

    Ovoid.log(2, 'Ovoid.Scene ' + this.name,
        " create node, name collision '" + name + "'");

    var ct = 1; var basename = name;

    while (this.search(name)) {
      name = basename + '#' + ct.toString();
      ct++;
    }
  }

  var dparent;
  var node;
  switch (type)
  {
    case Ovoid.TRANSFORM:
      node = new Ovoid.Transform(name);
      this.node.push(node);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.CAMERA:
      node = new Ovoid.Camera(name);
      this.camera.push(node);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.LIGHT:
      node = new Ovoid.Light(name);
      this.light.push(node);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.BODY:
      node = new Ovoid.Body(name);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.JOINT:
      node = new Ovoid.Joint(name);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.MESH:
      node = new Ovoid.Mesh(name);
      this.shape.push(node);
      break;
    case Ovoid.MATERIAL:
      node = new Ovoid.Material(name);
      this.material.push(node);
      break;
    case Ovoid.TEXTURE:
      node = new Ovoid.Texture(name);
      this.texture.push(node);
      break;
    case Ovoid.ACTION:
      node = new Ovoid.Action(name);
      this.action.push(node);
      break;
    case Ovoid.PHYSICS:
      node = new Ovoid.Physics(name);
      this.physics.push(node);
      if(Ovoid.Solver != undefined)
        Ovoid.log(2, "Ovoid.Scene.create", 
            "Creating PHYSICS node while Ovoid.Solver module is not loaded.");
      break;
    case Ovoid.ANIMATION:
      node = new Ovoid.Animation(name);
      this.animation.push(node);
      break;
    case Ovoid.TRACK:
      node = new Ovoid.Track(name);
      this.track.push(node);
      break;
    case Ovoid.SKIN:
      node = new Ovoid.Skin(name);
      this.shape.push(node);
      break;
    case Ovoid.EMITTER:
      node = new Ovoid.Emitter(name);
      this.shape.push(node);
      break;
    case Ovoid.AUDIO:
      node = new Ovoid.Audio(name);
      this.audio.push(node);
      break;
    case Ovoid.TEXT:
      node = new Ovoid.Text(name);
      this.layer.push(node);
      dparent = this.overlay;
      break;
    case Ovoid.LAYER:
      node = new Ovoid.Layer(name);
      this.layer.push(node);
      dparent = this.overlay;
      break;
    case Ovoid.SOUND:
      node = new Ovoid.Sound(name);
      this.sound.push(node);
      this.transform.push(node);
      dparent = this.world;
      break;
    default:
      node = new Ovoid.Node(name);
      break;
  }

  /* on ajoute a la liste generale */
  this.node.push(node);

  /* on parente la node selon cas */
  if (parent == null) {

    parent = dparent;

  } else {

    if (!this.ownsNode(parent))
      parent = dparent;

  }
  node.setParent(parent);

  /* On définie l'uid de la node */
  node.uid = this._uidn;
  this._uidn++;

  return node;
};


/**
 * Remove node.
 *
 * <br><br>Removes the specified node from the scene. The node is automaticaly and 
 * carefully removed from groups and graph. If the node has a child tree, 
 * the whole child tree is removed too.
 * 
 * @param {Node} node Node to remove.
 * 
 * @see Ovoid.Node
 */
Ovoid.Scene.prototype.remove = function(node) {

  var i, rmgroup;

  if(node.child.length) {
    /* Construit la liste des enfants */
    var child = new Array();
    var it = new Ovoid.WgIterator(node);
    while(it.explore()) {
      child.push(it.current);
    }
    /* Supprime tous les enfants des groupes */
    for (i = 0; i < child.length; i++) {
      
      if (child[i].type & Ovoid.CAMERA)
        rmgroup = this.camera;

      if (child[i].type & Ovoid.LIGHT)
        rmgroup = this.light;

      if (child[i].type & Ovoid.TRANSFORM)
        rmgroup = this.transform;

      if (child[i].type & Ovoid.MESH || 
          node.type & Ovoid.SKIN || 
          node.type & Ovoid.EMITTER)
        rmgroup = this.shape;

      if (child[i].type & Ovoid.MATERIAL)
        rmgroup = this.material;

      if (child[i].type & Ovoid.TEXTURE)
        rmgroup = this.texture;

      if (child[i].type & Ovoid.ANIMATION)
        rmgroup = this.animation;

      if (child[i].type & Ovoid.TRACK)
        rmgroup = this.track;
        
      if (child[i].type & Ovoid.PHYSICS)
        rmgroup = this.physics;
        
      if (child[i].type & Ovoid.ACTION)
        rmgroup = this.action;

      if (child[i].type & Ovoid.LAYER)
        rmgroup = this.layer;

      if (child[i].type & Ovoid.SOUND)
        rmgroup = this.sound;
        
      if (child[i].type & Ovoid.AUDIO)
        rmgroup = this.audio;
        
      i = rmgroup.length;
      while (i--) {

        if (rmgroup[i] === child[i])
          rmgroup.splice(i, 1);

      }

      i = this.node.length;
      while (i--) {

        if (this.node[i] === child[i])
          this.node.splice(i, 1);
      }
    }
  }
  
  /* Supprime la node des groupes */
  if (node.type & Ovoid.CAMERA)
    rmgroup = this.camera;

  if (node.type & Ovoid.LIGHT)
    rmgroup = this.light;

  if (node.type & Ovoid.TRANSFORM)
    rmgroup = this.transform;

  if (node.type & Ovoid.MESH || 
      node.type & Ovoid.SKIN || 
      node.type & Ovoid.EMITTER)
    rmgroup = this.shape;

  if (node.type & Ovoid.MATERIAL)
    rmgroup = this.material;

  if (node.type & Ovoid.TEXTURE)
    rmgroup = this.texture;

  if (node.type & Ovoid.ANIMATION)
    rmgroup = this.animation;

  if (node.type & Ovoid.TRACK)
    rmgroup = this.track;
    
  if (node.type & Ovoid.PHYSICS)
    rmgroup = this.physics;
    
  if (node.type & Ovoid.ACTION)
    rmgroup = this.action;

  if (node.type & Ovoid.LAYER)
    rmgroup = this.layer;

  if (node.type & Ovoid.SOUND)
    rmgroup = this.sound;
    
  if (node.type & Ovoid.AUDIO)
    rmgroup = this.audio;
    
  i = rmgroup.length;
  while (i--) {

    if (rmgroup[i] === node)
      rmgroup.splice(i, 1);

  }

  i = this.node.length;
  while (i--) {

    if (this.node[i] === node)
      this.node.splice(i, 1);
  }

  node.setParent(null); /* bye bye ! */
};


/**
 * Insert node.
 * 
 * <br><br>Inserts a node that was not created using the create method of this instance.
 * The node is automatically included in the world or overlay graph and the 
 * suitable groups according to its type and the given options.
 *
 * @param {Node} node Node to insert.
 * 
 * @param {Node} parent Parent node (must be in the scene). If null or undefined
 * the created node is parented to the world root or overlay root node according
 * to its type.
 * 
 * @param {bool} preserveParent If true, the inserted node parent will not be 
 * modified and the parent parameter will be ignored. However the node will be 
 * included in suitable groups according to its type and the given options.
 * 
 * @param {bool} preserveUid If true, the inserted node UID will not be 
 * modified.
 *
 * @return {bool} True if node insertion suceeds, false otherwise.
 * 
 * @see Ovoid.Node
 */
Ovoid.Scene.prototype.insert = function(node, parent, preserveParent, preserveUid) {

  /* on verifie que la node n'est pas déja
   * inséré */
  if (this.ownsNode(node))
    return false;

  /* verifie les collisions de nom */
  if (this.search(node.name)) {

    Ovoid.log(2, 'Ovoid.Scene ' + this.name,
        " create node, name collision '" +
        node.name + "'");

    var ct = 1; var basename = node.name;

    while (this.search(node.name)) {
      node.name = basename + '#' + ct.toString();
      ct++;
    }
  }

  /* on verifie que c'est une node */
  if (node.type & Ovoid.NODE) {
    this.node.push(node);
  } else {
    return false;
  }

  /* On définie l'uid de la node */
  if(!preserveUid) {
    node.uid = this._uidn;
    this._uidn++;
  }

  /* On commence par ajouter au groupe selon le type
   * de node */
  if (node.type & Ovoid.MATERIAL)
    this.material.push(node);

  if (node.type & Ovoid.TEXTURE)
    this.texture.push(node);

  if (node.type & Ovoid.ACTION)
    this.action.push(node);

  if (node.type & Ovoid.ANIMATION)
    this.animation.push(node);
    
  if (node.type & Ovoid.TRACK)
    this.track.push(node);
    
  if (node.type & Ovoid.PHYSICS)
    this.physics.push(node);

  if (node.type & Ovoid.CAMERA)
    this.camera.push(node);

  if (node.type & Ovoid.LIGHT)
    this.light.push(node);

  if (node.type & Ovoid.SOUND) {
    this.sound.push(node);
  }

  if (node.type & Ovoid.SKIN || 
      node.type & Ovoid.MESH || 
      node.type & Ovoid.EMITTER)
    this.shape.push(node);
    
  if (node.type & Ovoid.AUDIO) {
    this.audio.push(node);
  }
  
  /* parent par defaut */
  var dparent;
  /* si la node est un layer */
  if (node.type & Ovoid.LAYER) {
    this.layer.push(node);
    dparent = this.overlay;
  }
  /* si la node est un transform */
  if (node.type & Ovoid.TRANSFORM) {
    this.transform.push(node);
    dparent = this.world;
  }
  
  if (!preserveParent) { /* preserver la hierachie ? */
    if (parent == null) {
      parent = dparent;
    } else {
      if (!this.ownsNode(parent))
        parent = dparent;
    }
    node.setParent(parent);
  }

  return true;
};


/**
 * Transplant tree.
 * 
 * <br><br>Transplants the specified node's child tree into the scene including the
 * dependencies nodes. The specified root node is NOT included.
 *
 * @param {Node} tree Root node of the tree to be transplanted.
 */
Ovoid.Scene.prototype.transplant = function(tree) {

  var defaultParent;
  var node;
  var depd;

  /* on commence par parcourir le graph du node à importer */
  var itdg = new Ovoid.DgIterator();
  var itdag = new Ovoid.DagIterator();

  itdag.init(tree);
  while (itdag.explore())
  {
    node = itdag.current;
    /* insert la node sans toucher au parent */
    this.insert(node, null, true);

    /* par cour des dépendants de la node */
    itdg.init(node);
    while (itdg.exploreDepend())
    {
      depd = itdg.current;
      /* insert la node sans toucher au parent */
      this.insert(depd, null, true);
    }
  }

  /* on reparente finalement les enfants du node à importer */
  var i;

  /* recupere la liste des enfants de premier niveau */
  var childList = new Array(tree.child.length);
  i = tree.child.length;
  while (i--) {
    childList[i] = tree.child[i];
  }
  /* on reparente tous les enfants selon le parent par defaut */
  i = childList.length;
  while (i--) {
    if (childList[i].type & Ovoid.TRANSFORM) {
      childList[i].setParent(this.world);
    }
    if (childList[i].type & Ovoid.LAYER) {
      childList[i].setParent(this.overlay);
    }
  }
};



/**
 * Use camera as active.
 * 
 * <br><br>Sets the specified Camera node as active camera. The Camera node must be 
 * in the scene.
 *
 * @param {Camera|string|int} node Camera object, name or UID to be active.
 *
 */
Ovoid.Scene.prototype.useCamera = function(camera) {
  
  if(typeof(camera) === 'object') {
    if (camera != null) {
      if (this.ownsNode(camera))
        this.activeCamera = camera;
    } else {
      this.activeCamera = null;
    }
  } else {
    this.activeCamera = this.search(camera);
  }
  
  if(this.activeCamera) {
    this.activeCamera.setView(Ovoid.Frame.size.v[0],
        Ovoid.Frame.size.v[1]);
    this.activeCamera.cachTransform();
    this.activeCamera.cachCamera();
  }
  
};


/**
 * Check whether has node.
 * 
 * <br><br>Checks whether the scene owns the specified node.
 *
 * @param {Object} node Node to search.
 *
 * @return {bool} True if the node is found, false otherwise.
 */
Ovoid.Scene.prototype.ownsNode = function(node) {

  var i = this.node.length;
  while (i--)
    if (this.node[i] === node)
      return true;

  return false;
};


/**
 * Search node.
 * 
 * <br><br>Retrieves and returns the node with the specified name or UID.
 *
 * @param {string|int} item Name or UID of the Node to search.
 *
 * @return {Node} The found node, or null if none is found.
 */
Ovoid.Scene.prototype.search = function(item) {

  var i = this.node.length;

  if(typeof(item) == 'string') {
    while (i--)
      if (this.node[i].name == item)
        return this.node[i];
    
  } else if (typeof(item) == 'number') {
    
    while (i--)
      if (this.node[i].uid == item)
        return this.node[i];
  }
  return null;
};


/**
 * Search by matches.
 * 
 * <br><br>Retrieves and returns one or more nodes whose name is containing the 
 * specified string, or nodes whose type matches with the specified bitmask.
 *
 * @param {string|bitmask} item String that matches nodes's name or bitmask
 * that matches nodes's type.
 *
 * @return {Node[]} Array of found nodes, empty Array if none is found.
 */
Ovoid.Scene.prototype.searchMatches = function(item) {

  var list = new Array();
  var i = this.node.length;

  if(typeof(item) == 'string') {
    
    while (i--)
      if (this.node[i].name.indexOf(item, 0) != -1)
        list.push(this.node[i]);
    
  } else if (typeof(item) == 'number') {
    
    while (i--)
      if (this.node[i].type & item)
        list.push(this.node[i]);
  }

  return list;
};


/**
 * Remove by matches.
 * 
 * <br><br>Removesone or more nodes whose name is containing the 
 * specified string, or nodes whose type matches with the specified bitmask.
 *
 * @param {string|bitmask} item String that matches nodes's name or bitmask
 * that matches nodes's type.
 *
 * @return {bool} True if a node is removed, false otherwise.
 */
Ovoid.Scene.prototype.removeMatches = function(item) {

  var i = this.node.length;
  var f = false;
  
  if(typeof(item) == 'string') {
    
    while (i--) {
      if (this.node[i].name.indexOf(name, 0) != -1) {
        this.remove(this.node[i]);
        f = true;
      }
    }
  } else if (typeof(item) == 'number') {
    
    while (i--) {
      if (this.node[i].type & item) {
          this.remove(this.node[i]);
          f = true;
      }
    }
  }
  
  return f;
};


/**
 * JavaScript Object Notation (JSON) serialization method.
 * 
 * <br><br>This method is commonly used by the <code>Ovoid.Ojson</code> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Scene.prototype.toJSON = function() {
  
  var o = new Object();
  o['name'] = this.name;
  o['uidn'] = this._uidn;
  o['activeCamera'] = this.activeCamera?this.activeCamera.uid:'null';
  o['node'] = this.node;
  return o;
};
