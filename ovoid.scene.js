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

 
/** Constructor method.
 * 
 * @class Scene graph object.<br><br>
 * 
 * The Scene contains and manages all nodes of a particular world. It 
 * is a representation off all nodes that will exist for the Instance. 
 * Scene is mainly what we called a graph or a tree. Nodes are all 
 * parents and/or child of another, except the Scene's world root and
 * overlay root Nodes.<br><br>
 * 
 * <b>Creating Nodes</b><br><br>
 * 
 * The Scene provides a method to create all kind of Nodes. The 
 * <c>Scene.newNode()</c> method should be always used to create 
 * new nodes since it automaticaly registers the newly created node to 
 * the proper Instance object.<br><br>
 * 
 * <blockcode>
 * var light = Instance.Scene.newNode(Ovoid.LIGHT, "myLight");<br>
 * var matfx = Instance.Scene.newNode(Ovoid.MATERIAL, "coolMaterial");<br>
 * </blockcode><br><br>
 * 
 * <b>Finding or removing Nodes</b><br><br>
 * 
 * The Scene provides several methods to find and or remove a Node or a 
 * group of Nodes according some rules.<br><br>
 * 
 * To find and retrieve a particular Node you can use the 
 * <c>Scene.findNode()</c> method to search a Node by its name or its 
 * uid. To find and retrieve several Nodes you can use 
 * <c>Scene.findMatches()</c> method to search Nodes by name or 
 * type.<br><br>
 * 
 * To find and remove a particular Node you can use the 
 * <c>Scene.remNode()</c> method to search and remove a Node 
 * by its name or its uid, or by passing the Node object to remove as 
 * argument. To find and remove several Nodes you can use 
 * <c>Scene.remMatches()</c> method to search Nodes by name 
 * or type.<br><br>
 * 
 * Finally The <c>Scene.clean()</c> method removes all unused 
 * nodes, for example a Material with no references or a Mesh who is 
 * never used as shape.<br><br>
 * 
 * <b>Active Camera</b><br><br>
 * 
 * As a Scene can contain several Camera object, the active camera is 
 * the only one who is used to render the scene and compute data 
 * relative to the current context. At the creation, the Scene create 
 * a new default Camera object who is defined as the active one.<br><br>
 * 
 * You can retrieve the current active Camera Node via the 
 * <c>Scene.activeCamera</c> member.<br><br>
 * 
 * If you created or imported a new Camera Node in the Scene, you can 
 * set it as the active one using the 
 * <c>Scene.useCamera()</c> method.<br><br>
 * 
 * <blockcode>
 * Instance.Scene.newNode(Ovoid.CAMERA, "Camera1");<br>
 * Instance.Scene.useCamera("Camera1");<br>
 * </blockcode><br><br>
 * 
 * <b>Scene components</b><br><br>
 * 
 * The Scene object is divided in three elements.<br><br>
 * 
 * <ul>
 * <li><b>The World Graph</b><br>
 * The world graph is the graph tree of transformable nodes who takes 
 * place in the 3D world. World graph have a generic Node object 
 * (<c>world</c>) as root who is the overall parent of all 
 * world nodes.</li>
 * 
 * <li><b>The Overlay Graph</b><br>
 * The overlay graph is the graph tree of transformable nodes who take 
 * place in the 2D overlay screen space. Overlay graph have a generic 
 * Node object (<c>overlay</c>) as root who is the overall parent 
 * of all overlay nodes.</li>
 * 
 * <li><b>The Nodes Groups</b><br>
 * For access and convenience, all nodes are stored in Array according 
 * to their type and / or typical usage.</li>
 * </ul><br><br>
 * 
 * @see Ovoid.Node
 * 
 * @param {string} name Name of the new scene.
 * @param {object} i Instance object to register object to.
 * 
 */
Ovoid.Scene = function(name, i) {

  /** scene name.
   * @type string */
  this.name = name;
  /** World root node.
   * @type Node */
  this.world = new Ovoid.Node('world', i);
  /** Overlays root node.
   * @type Node */
  this.overlay = new Ovoid.Node('overlay', i);
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
  /** Expression list.
   * @type Expression[] */
  this.expression = new Array();
  /** Aim list.
   * @type Aim[] */
  this.aim = new Array();
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
  this.activeCamera = new Ovoid.Camera("defaultView", i);
  
  /* Configuration de la camera par defaut */
  this.camera.push(this.activeCamera);
  this.transform.push(this.activeCamera);
  this.activeCamera.setParent(this.world);
  var p = i.opt_sceneDefaultViewPosition;
  this.activeCamera.moveXyz(p[0],p[1],p[2],0,1); // Ovoid.WORLD,Ovoid.ABSOLUTE
  var r = i.opt_sceneDefaultViewRotation;
  this.activeCamera.rotateXyz(r[0],r[1],r[2],0,0); // Ovoid.WORLD, Ovoid.RELATIVE
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
};


/**
 * Create node.<br><br>
 * 
 * Creates a new Node of the given type and name, then if specified, 
 * parent it to the specified one. The Node is automatically included
 * in the world or overlay graph and the suitable groups according to 
 * its type.
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
 * Ovoid.EXPRESSION, <br>
 * Ovoid.AIM, <br>
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
 * @return {Node} The newly created Node.
 * 
 * @see Ovoid.Node
 */
Ovoid.Scene.prototype.newNode = function(type, name, parent) {

  /* verifie les collisions de nom */
  if (this.findNode(name)) {

    Ovoid._log(2,this._i, '::Scene.create', this.name+
        ":: name collision '" + name + "'");

    var ct = 1; var basename = name;

    while (this.findNode(name)) {
      name = basename + '#' + ct.toString();
      ct++;
    }
  }

  var dparent;
  var node;
  switch (type)
  {
    case Ovoid.TRANSFORM:
      node = new Ovoid.Transform(name, this._i);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.CAMERA:
      node = new Ovoid.Camera(name, this._i);
      this.camera.push(node);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.LIGHT:
      node = new Ovoid.Light(name, this._i);
      this.light.push(node);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.BODY:
      node = new Ovoid.Body(name, this._i);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.JOINT:
      node = new Ovoid.Joint(name, this._i);
      this.transform.push(node);
      dparent = this.world;
      break;
    case Ovoid.MESH:
      node = new Ovoid.Mesh(name, this._i);
      this.shape.push(node);
      break;
    case Ovoid.MATERIAL:
      node = new Ovoid.Material(name, this._i);
      this.material.push(node);
      break;
    case Ovoid.TEXTURE:
      node = new Ovoid.Texture(name, this._i);
      this.texture.push(node);
      break;
    case Ovoid.ACTION:
      node = new Ovoid.Action(name, this._i);
      this.action.push(node);
      break;
    case Ovoid.PHYSICS:
      node = new Ovoid.Physics(name, this._i);
      this.physics.push(node);
      break;
    case Ovoid.ANIMATION:
      node = new Ovoid.Animation(name, this._i);
      this.animation.push(node);
      break;
    case Ovoid.AIM:
      node = new Ovoid.Aim(name, this._i);
      this.aim.push(node);
      break;
    case Ovoid.EXPRESSION:
      node = new Ovoid.Expression(name, this._i);
      this.expression.push(node);
      break;
    case Ovoid.TRACK:
      node = new Ovoid.Track(name, this._i);
      this.track.push(node);
      break;
    case Ovoid.SKIN:
      node = new Ovoid.Skin(name, this._i);
      this.shape.push(node);
      break;
    case Ovoid.EMITTER:
      node = new Ovoid.Emitter(name, this._i);
      this.shape.push(node);
      break;
    case Ovoid.AUDIO:
      node = new Ovoid.Audio(name, this._i);
      this.audio.push(node);
      break;
    case Ovoid.TEXT:
      node = new Ovoid.Text(name, this._i);
      this.layer.push(node);
      dparent = this.overlay;
      break;
    case Ovoid.LAYER:
      node = new Ovoid.Layer(name, this._i);
      this.layer.push(node);
      dparent = this.overlay;
      break;
    case Ovoid.SOUND:
      node = new Ovoid.Sound(name, this._i);
      this.sound.push(node);
      this.transform.push(node);
      dparent = this.world;
      break;
    default:
      node = new Ovoid.Node(name, this._i);
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
 * Removes the specified Node from the scene. The Node is automaticaly and 
 * carefully removed from groups and graph. If the Node has a child tree, 
 * the whole child tree is removed too.
 * 
 * @param {Node|String|int} item Node object, Node's name or Node's Uid to removes.
 * @param {Bool} rdep If possible, removes Node's dependencies nodes.
 * 
 * @see Ovoid.Node
 */
Ovoid.Scene.prototype.remNode = function(item, rdep) {

  var i, rmgroup, node;
  
  if(typeof(item) == 'number' || typeof(item) == 'string') {
    node = this.findNode(item);
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
    Ovoid._log(2,this._i, '::Scene.remove', this.name + 
        ":: Break link " + links[i].name);
    /* Cas particulier pour les Track */
    if(links[i].type & Ovoid.TRACK) {
        Ovoid._log(2,this._i, '::Scene.remove', this.name + 
            ":: Removing animation from " + links[i].name);
        links[i].remAnimation(node);
    }
    /* Cas particulier pour les Skin */
    if(links[i].type & Ovoid.SKIN) {
      Ovoid._log(2,this._i, '::Scene.remove', this.name + 
          ":: Removing joint from " + links[i].name);
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
    Ovoid._log(2,this._i, '::Scene.remove', this.name +  
        ":: Break Dependency " + depends[i].name);
    // Si il n'ya plus de link, ce noeud était le seul a dependre, on 
    // supprime donc le noeud qui ne sert plus à rien
    if(depends[i].link.length == 0 && rdep) {
      Ovoid._log(2,this._i, '::Scene.remove', this.name + 
          ":: Removes unused dependency " + depends[i].name);
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
    this.remNode(related[i], rdep);
  }
  
  /* Cherche les link et dependences */
  
  /* Supprime la node des groupes */
  if (node.type & Ovoid.CAMERA)
    rmgroup = this.camera;

  if (node.type & Ovoid.LIGHT)
    rmgroup = this.light;

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
    
  if (node.type & Ovoid.EXPRESSION)
    rmgroup = this.expression;

  if (node.type & Ovoid.AIM)
    rmgroup = this.aim;
    
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
  
  if(rmgroup) {
    i = rmgroup.length;
    while (i--) {
      if (rmgroup[i] === node)
        rmgroup.splice(i, 1);
    }
  }
  
  if (node.type & Ovoid.TRANSFORM) {
    i = this.transform.length;
    while (i--) {
      if (this.transform[i] === node)
        this.transform.splice(i, 1);
    }
  }
  
  i = this.node.length;
  while (i--) {
    if (this.node[i] === node)
      this.node.splice(i, 1);
  }

  node.setParent(null); /* bye bye ! */
  
  Ovoid._log(2,this._i, '::Scene.remove', this.name + 
      ":: Removing node " + node.name);
};


/**
 * Remove nodes by matches.<br><br>
 * 
 * Search and removes one or more Nodes whose name contains the 
 * specified string, or Nodes whose type matches with the specified bitmask.
 *
 * @param {string|bitmask} item String that matches nodes's name or bitmask
 * that matches Nodes's type.
 * 
 * @param {Bool} rdep If possible, removes Node's dependencies.
 *
 * @return {bool} True if at least one Node is removed, false otherwise.
 */
Ovoid.Scene.prototype.remMatches = function(item, rdep) {

  var i = this.node.length;
  var f = false;
  
  if(typeof(item) == 'string') {
    
    while (i--) {
      if (this.node[i].name.indexOf(item, 0) != -1) {
        this.remNode(this.node[i]);
        f = true;
      }
    }
  } else if (typeof(item) == 'number') {
    
    while (i--) {
      if (this.node[i].type & item) {
          this.remNode(this.node[i]);
          f = true;
      }
    }
  }
  
  return f;
};


/**
 * Insert node.<br><br>
 * 
 * Insert a Node who was not created using the 
 * <c>Scene.newNode()</c> method of this Scene.<br><br>
 * 
 * You can use this method if you know exactly what you do since Nodes 
 * should all be registered to the proper Instance object.<br><br>
 * 
 * The inserted Node is automatically included in the world or overlay 
 * graph and the suitable groups according to its type and the given 
 * options.
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
Ovoid.Scene.prototype.insNode = function(node, parent, preserveParent, preserveUid) {

  /* On verifie que la node a la bonne Instance */
  if (node._i != this._i) {
      Ovoid._log(2,this._i, '::Scene.insNode', this.name + 
      ":: node has wrong Instance '" + node.name + "'");
      return false;
  }

  /* on verifie que la node n'est pas déja
   * inséré */
  if (this.ownsNode(node))
    return false;

  /* verifie les collisions de nom */
  if (this.findNode(node.name)) {

    Ovoid._log(2,this._i, '::Scene.insNode', this.name + 
        ":: name collision '" + node.name + "'");

    var ct = 1; var basename = node.name;

    while (this.findNode(node.name)) {
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
    
  if (node.type & Ovoid.EXPRESSION)
    this.expression.push(node);
    
  if (node.type & Ovoid.AIM)
    this.aim.push(node);
    
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
  /* si la node est un transform */
  if (node.type & Ovoid.TRANSFORM) {
    this.transform.push(node);
    dparent = this.world;
  }
  /* si la node est un layer */
  if (node.type & Ovoid.LAYER) {
    this.layer.push(node);
    dparent = this.overlay;
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
 * Insert Node's childs tree.<br><br>
 * 
 * Insert the specified Node's childs tree into the Scene including the
 * dependencies Nodes. The specified root Node is not inserted.
 *
 * @param {Node} tree Root node of the tree to be inserted.
 */
Ovoid.Scene.prototype.insTree = function(tree) {

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
    this.insNode(node, null, true);

    /* par cour des dépendants de la node */
    itdg.init(node);
    while (itdg.exploreDepend())
    {
      depd = itdg.current;
      /* insert la node sans toucher au parent */
      this.insNode(depd, null, true);
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
 * Parent two nodes.<br><br>
 * 
 * Sets a Node as parent to another.
 *
 * @param {Node|string|int} child Node object, name or UID to be child.
 * @param {Node|string|int} parent Node object, name or UID to be parent.
 *
 */
Ovoid.Scene.prototype.parentNode = function(child, parent) {
  
  var nchild, nparent;
  
  if(typeof(child) === 'string' || typeof(child) === 'number') {
    nchild = this.findNode(child);
    if(!nchild) {
       Ovoid._log(2,this._i, '::Scene.parent', this.name + 
          ":: No node matches with name or UID:" + child);
       return;
     }
  } else {
    nchild = child;
  }
  
  if(typeof(parent) === 'string' || typeof(parent) === 'number') {
    nparent = this.findNode(parent);
    if(!nparent) {
       Ovoid._log(2,this._i, '::Scene.parent', this.name + 
          ":: No node matches with name or UID:" + parent);
       return;
     }
  } else {
    nparent = parent;
  }
    
  nchild.setParent(nparent);
}


/**
 * Search node.<br><br>
 * 
 * Search and returns the Node with the specified name or UID.
 *
 * @param {string|int} item Name or UID of the Node to find.
 *
 * @return {Node} The found Node, or null if none is found.
 */
Ovoid.Scene.prototype.findNode = function(item) {

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
 * Search nodes by matches.<br><br>
 * 
 * Search and returns one or more nodes whose name contains the 
 * specified string, or nodes whose type matches with the specified 
 * bitmask.
 *
 * @param {string|bitmask} item String that matches Nodes's name or 
 * bitmask that matches Nodes's type.
 *
 * @return {Node[]} Array of found Nodes, empty Array if none is found.
 */
Ovoid.Scene.prototype.findMatches = function(item) {

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
 * Check whether has node.<br><br>
 * 
 * Checks whether the Scene owns the specified node.
 *
 * @param {Object} node Node to test.
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
 * Set active camera.<br><br>
 * 
 * Sets the specified Camera node as active camera. It must be 
 * in the Scene.
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
    this.activeCamera = this.findNode(camera);
  }
  
  if(this.activeCamera) {
    this.activeCamera.setView(this._i.Frame.size.v[0],
        this._i.Frame.size.v[1]);
    this.activeCamera.cachTransform();
    this.activeCamera.cachCamera();
  }
  
};


/**
 * Clean the scene.<br><br>
 * 
 * Find and removes all unlinked and uninstancied Nodes of the Scene.
 */
Ovoid.Scene.prototype.clean = function() {
  
  Ovoid._log(3,this._i, '::Scene.clean', this.name + 
      ":: start scene cleaning");
  var i;
  /* Since arrays indexing will change while removing nodes, we create a local one */
  var array = new Array();
  /* Adding all removables dependencies node */
  /* top-level dependencies nodes */
  for(i = 0; i < this.material.length; i++) array.push(this.material[i]);
  for(i = 0; i < this.texture.length; i++) array.push(this.texture[i]);
  for(i = 0; i < this.audio.length; i++) array.push(this.audio[i]);
  /* shape nodes */
  for(i = 0; i < this.shape.length; i++) array.push(this.shape[i]);
  /* constraint nodes */
  for(i = 0; i < this.animation.length; i++) array.push(this.animation[i]);
  for(i = 0; i < this.expression.length; i++) array.push(this.expression[i]);
  for(i = 0; i < this.action.length; i++) array.push(this.action[i]);
  for(i = 0; i < this.physics.length; i++) array.push(this.physics[i]);
  for(i = 0; i < this.aim.length; i++) array.push(this.aim[i]);

  /* For all nodes we check if it has some links or not */
  i = array.length;
  while(i--) {
    /* node has some links ? */
    if(!array[i].link.length) {
      /* no, then we remove it */
      this.remNode(array[i], true);
    }
  }
  Ovoid._log(3,this._i, '::Scene.clean', this.name + 
      ":: scene cleaning finished");
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
Ovoid.Scene.prototype.toJSON = function() {
  
  var o = new Object();
  o['n'] = this.name;
  o['u'] = this._uidn;
  o['ac'] = this.activeCamera?this.activeCamera.uid:'null';
  o['nl'] = this.node;
  return o;
};

