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
 * @class World Scene Graph object.<br><br>
 * 
 * The scene graph is a structure that arranges the logical and spatial 
 * representation of a graphical scene. The Scene object is the main work space 
 * where nodes are stored. It is designed to store and organize nodes and to 
 * provide an interface to access, search and create nodes.<br><br>
 * 
 * <b>Active Scene</b><br><br>
 * 
 * In OvoiD.JS, a scene must be assigned to the global pipeline as active one in 
 * order to be treated by the Library mecanism.<br><br>
 * 
 * <blockcode>
 * var scene = new Ovoid.Scene("Hello");<br>
 * Ovoid.useScene(scene);<br>
 * </blockcode><br><br>
 * 
 * Once a scene is used as active, its graph (nodes) are updated, treated and
 * may be drawn each frames. Several scenes can be created and set as active at 
 * desired time until an other is set as active one. While a scene is not 
 * active, it is left without any change or update.<br><br>
 * 
 * <b>Active Camera</b><br><br>
 * 
 * Scene active camera is the one used as point of view to draw the scene. It 
 * must be in the scene graph.<br><br>
 * 
 * <blockcode>
 * scene.create(Ovoid.CAMERA, "Camera1");<br>
 * scene.useCamera("Camera1");<br>
 * </blockcode><br><br>
 * 
 * If no active camera is declared, an built-in camera is used. A scene can have 
 * several cameras which can be set as active at desired time until an other is 
 * set as active one.
 * 
 * <b>Scene components</b><br><br>
 * 
 * The Scene object is roughly divided in three elements.<br><br>
 * 
 * <ul>
 * <li><b>The World Graph</b><br>
 * The world graph is the graph tree of transformable nodes who takes place in 
 * the 3D world. World graph have a generic Node object (<code>world</code>) as 
 * root who is the overall parent of all world nodes.</li>
 * 
 * <li><b>The Overlay Graph</b><br>
 * The overlay graph is the graph tree of transformable nodes who take place in 
 * the 2D overlay screen space. Overlay graph have a generic Node object 
 * (<code>overlay</code>) as root who is the overall parent of all overlay 
 * nodes.</li>
 * 
 * <li><b>The Nodes Groups</b><br>
 * For access, performance and design issues, all nodes are stored in groups 
 * (Array) according to their type and / or typical usage.</li>
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
 * Create node.<br><br>
 * 
 * Creates a new node of the given type and name, then if specified, 
 * parent it to the given parent node. The node is automatically included
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
 * @param {string} name Node name.
 * 
 * @param {Node} parent Parent node (must be in the scene). If null or undefined
 * the created node is parent to the world root or overlay root node according
 * to its type.
 *
 * @return {Node} The new created node.
 * 
 * @see Ovoid.Node
 */
Ovoid.Scene.prototype.create = function(type, name, parent) {

  /* verifie les collisions de nom */
  if (this.search(name)) {

    Ovoid.log(2, 'Ovoid.Scene.create',"name collision '" + name + "'");

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
 * Remove node.<br><br>
 *
 * Removes the specified node from the scene. The node is automaticaly and 
 * carefully removed from groups and graph. If the node has a child tree, 
 * the whole child tree is removed too.
 * 
 * @param {Node|String|int} item Node object, node's name or node's Uid to removes.
 * @param {Bool} rdep If possible, removes node's dependencies nodes.
 * 
 * @see Ovoid.Node
 */
Ovoid.Scene.prototype.remove = function(item, rdep) {

  var i, rmgroup, node;
  
  if(typeof(item) == 'number' || typeof(item) == 'string') {
    node = this.search(item);
    if(!node) return;
  } else {
    node = item;
  }

  // Liste des noeud à supprimer avec celui-ci
  var related = new Array();
  
  /* On supprime les liens de dependence */
  var links = new Array();
  for (i = 0; i < node.link.length; i++) {
    links.push(node.link[i]);
  }
  for (i = 0; i < links.length; i++) {
    links[i].breakDepend(node);
    Ovoid.log(2, "Ovoid.Scene.remove", "Break link " + links[i].name);
    /* Cas particulier pour les Track */
    if(links[i].type & Ovoid.TRACK) {
        Ovoid.log(2, "Ovoid.Scene.remove", "Removing animation from " + links[i].name);
        links[i].remAnimation(node);
    }
    /* Cas particulier pour les Skin */
    if(links[i].type & Ovoid.SKIN) {
      Ovoid.log(2, "Ovoid.Scene.remove", "Removing joint from " + links[i].name);
      links[i].unlinkJoint(node);
    }
  }
  /* On regarde les dependence, si ce noeud est leur seul link
   * on les supprimer avec */
  var depends = new Array();
  for (i = 0; i < node.depend.length; i++) {
    depends.push(node.depend[i]);
    
  }
  for (i = 0; i < depends.length; i++) {
    node.breakDepend(depends[i]);
    Ovoid.log(2, "Ovoid.Scene.remove", "Break Dependency " + depends[i].name);
    // Si il n'ya plus de link, ce noeud était le seul a dependre, on 
    // supprime donc le noeud qui ne sert plus à rien
    if(depends[i].link.length == 0 && rdep) {
      Ovoid.log(2, "Ovoid.Scene.remove", "Removes unused dependency " + depends[i].name);
      related.push(depends[i]);
    }
  }
  /* On ajoute tous les enfants à supprimer */
  var it = new Ovoid.WgIterator(node);
  while(it.explore()) {
    related.push(it.current);
  }
  /* Operation recurcive pour tous les noeuds, afin de bien supprimer
   * tout l'arbre de dependence */
  for (i = 0; i < related.length; i++) {
    this.remove(related[i], rdep);
  }
  
  /* Cherche les link et dependences */
  
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
 * Insert node.<br><br>
 * 
 * Inserts a node who was not created using the <code>create</code> method of 
 * this instance.<br><br>
 * 
 * The node is automatically included in the world or overlay graph and the 
 * suitable groups according to its type and the given options.
 *
 * @param {Node} node Node to insert.
 * 
 * @param {Node} parent Parent node (must be in the scene). If null or undefined
 * the created node is parented to the world root or overlay root node according
 * to its type.
 * 
 * @param {bool} preserveParent If true, the inserted node will not be 
 * reparented at all. However the node will be included in suitable groups 
 * according to its type and the given options.
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

    Ovoid.log(2, 'Ovoid.Scene.insert',"name collision '" + name + "'");

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
 * Parent two nodes.<br><br>
 * 
 * Sets a node as parent to another.
 *
 * @param {Node|string|int} child Node object, name or UID to be child.
 * @param {Node|string|int} parent Node object, name or UID to be parent.
 *
 */
Ovoid.Scene.prototype.parent = function(child, parent) {
  
  var nchild, nparent;
  
  if(typeof(child) === 'string' || typeof(child) === 'number') {
    nchild = this.search(child);
    if(!nchild) {
       Ovoid.log(2, "Ovoid.Scene.parent", "No node matches with name or UID:" + child);
       return;
     }
  } else {
    nchild = child;
  }
  
  if(typeof(parent) === 'string' || typeof(parent) === 'number') {
    nparent = this.search(parent);
    if(!nparent) {
       Ovoid.log(2, "Ovoid.Scene.parent", "No node matches with name or UID:" + parent);
       return;
     }
  } else {
    nparent = parent;
  }
    
  nchild.setParent(nparent);
}


/**
 * Transplant tree.<br><br>
 * 
 * Transplants the specified node's child tree into the scene including the
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
 * Use camera as active.<br><br>
 * 
 * Sets the specified Camera node as active camera. It must be 
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
 * Check whether has node.<br><br>
 * 
 * Checks whether the scene owns the specified node.
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
 * Search node.<br><br>
 * 
 * Search and returns the node with the specified name or UID.
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
 * Search by matches.<br><br>
 * 
 * Search and returns one or more nodes whose name contains the 
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
 * Remove by matches.<br><br>
 * 
 * Search and removes one or more nodes whose name contains the 
 * specified string, or nodes whose type matches with the specified bitmask.
 *
 * @param {string|bitmask} item String that matches nodes's name or bitmask
 * that matches nodes's type.
 * 
 * @param {Bool} rdep If possible, removes node's dependencies.
 *
 * @return {bool} True if a node is removed, false otherwise.
 */
Ovoid.Scene.prototype.removeMatches = function(item, rdep) {

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
