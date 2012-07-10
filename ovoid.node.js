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
 * Node object constructor.
 * 
 * @class Generic Node object.
 * <br>
 * <br>
 * This class provides an implementation of a graph node. Node is the 
 * fundamental unit of which graphs are formed. In Ovoid, Node are the base 
 * class for all the scene's objects and obviously a scene is what is called a
 * graph. The Node object forms two types of paralel graph, first one is the 
 * world hierarchy tree and the second is the dependency graph.
 * <br>
 * <br>
 * <b>The Node world hierarchy concept</b>
 * <br>
 * <br>
 * Nodes are almost all connected ones with the others. The most known and 
 * common node relationship is the hierarchy, described with a graph of parent 
 * and child nodes, it is also the most visible. This relationship is called 
 * "world" because it affect the nodes's world transformations in space.
 * <br>
 * <br>
 * The node world hierarchy 
 * can be defined as how a node's transformations lead the transformations of 
 * another one, or from an other point of view, in which order the nodes's 
 * transformations should be treated to accomplish the global scene 
 * transformation. For example, suppose two nodes, the first is the parent of
 * the second, and so the first has the second as child. If you move the first
 * (parent) node, the second (child) node will follow the first in all its 
 * transformations. However, if you move the second (child) node, the first 
 * (parent) will not be affected by this transformation.
 * <br>
 * <br>
 * In Node object the world hierarchy graph is defined by the <code>parent</code>
 * and 
 * <code>child</code> fields. The first is a reference to an other Node object, 
 * the second is an Array of other Node objets. The <code>parent</code> is a 
 * the parent node of the Node object. The <code>child</code> Array contains all 
 * nodes who are child of the Node object.
 * <br>
 * <br>
 * <b>The Node dependency concept</b>
 * <br>
 * <br>
 * Nodes are almost all connected ones with the others. The most known and 
 * common node relationship is the hierarchy, described with a graph of parent 
 * and child nodes. An other node relation is the dependency. 
 * <br>
 * <br>
 * The node dependency 
 * can be defined as how a node depends of another one to do its job, or 
 * from an other point of view, in which order the nodes should be treated to 
 * accomplish a global good job. For example, you can easily understand that a 
 * Mesh node that use some Material nodes depends of the Material nodes. 
 * If the Material nodes have a problem, the Mesh node has problem too.
 * <br>
 * <br>
 * In Node object the dependency graph is defined by the <code>link</code> and 
 * <code>depend</code> fields that are Array of other Node objects. The 
 * <code>depend</code> Array contains all nodes whose the Node object directly 
 * depends. The <code>link</code> Array contains all nodes whose directly 
 * depends of the Node object.
 * 
 * @see Ovoid.Scene
 * @see Ovoid.WgIterator
 * @see Ovoid.DgIterator
 * 
 * @param {string} name Name of the new node.
 */
Ovoid.Node = function(name) {

  /** Node type.
   * @type bitmask */
  this.type |= Ovoid.NODE;
  /** Node name.
   * @type string */
  this.name = name;
  /** Node visibility.
   * @type bool */
  this.visible = true;
  /** Node pickability.
   * @type bool */
  this.pickable = false;
  /** Unique identification number.
   * @type int */
  this.uid = 0;
  /** Parent node.
   * @type Node */
  this.parent = null;
  /** Child nodes.
   * @type Node[] */
  this.child = new Array();
  /** Depend nodes.
   * @type Node[] */
  this.depend = new Array();
  /** Linked nodes.
   * @type Node[] */
  this.link = new Array();
  /** Node caching bitmask.
   * @type bitmask */
  this.cach = 0;
  
  /** Node bounding box.
   * @type Boundingbox */
  this.boundingBox = new Ovoid.Boundingbox();
  /** Node bounding sphere.
   * @type Boundingsphere */
  this.boundingSphere = new Ovoid.Boundingsphere();
};


/**
 * Set parent.
 * 
 * <br><br>Sets the parent node of this instance.
 *
 * @param {Node} node Node object to be parent.
 */
Ovoid.Node.prototype.setParent = function(node) {

  if (this.parent != node)
  {
    if (this.parent != null)
    {
      /* on enleve cette node de la liste d'enfant de
       * l'ancien parent */
      var i = this.parent.child.length;
      while (i--) {
        if (this.parent.child[i] === this) {
          this.parent.child.splice(i, 1);
          break;
        }
      }
    }

    if (node != null)
    {
      /* si le parent a deja cet enfant */
      var i = node.child.length;
      while (i--)
        if (node.child[i] === node)
          return;
        /* si non on ajoute cette node */
        node.child.push(this);
    }

    this.parent = node;
  }
};


/**
 * Make dependency link.
 * 
 * <br><br>Make a dependency link between this node and the specified one.
 * This will add a node who this instance depends on, and add this instance 
 * as linked one to the specified node.
 *
 * @param {Node} node Node object to make as dependency.
 */
Ovoid.Node.prototype.makeDepend = function(node) {

  /* si la dependence existe deja on degage */
  var c = this.depend.length;
  while (c--)
    if (node === this.depend[c]) return;

    /* on peut maintenant faire ou refaire le link */
    this.depend.push(node);
  node.link.push(this);
};


/**
 * Break dependency link.
 * 
 * <br><br>If link exists, break the dependency link between this node and the 
 * specified one.
 *
 * @param {Node} node Node Object to break dependency link with.
 */
Ovoid.Node.prototype.breakDepend = function(node) {

  var c = this.depend.length;
  while (c--)
  {
    if (node === this.depend[c])
    {
      this.depend.splice(c, 1);
      c = node.link.length;
      while (c--)
      {
        if (this === node.link[c])
        {
          node.link.splice(c, 1);
          return;
        }
      }
      return;
    }
  }
};


/**
 * Enable caching bit.
 * 
 * <br><br>Enable the specified caching bit for this instance.
 *
 * @param {bitmask} cach Bitmask of the cach bits to enable.
 */
Ovoid.Node.prototype.addCach = function(cach) {

  this.cach |= cach;
};


/**
 * Disable caching bit.
 * 
 * <br><br>Disable the specified caching bit for this instance.
 *
 * @param {bitmask} cach Bitmask of the cach bits to disable.
 */
Ovoid.Node.prototype.unCach = function(cach) {

  this.cach &= ~cach;
};


/**
 * Set visibility.
 * 
 * <br><br>Sets the visibility attribute of this instance and for the whole
 * children tree of this instance.
 *
 * @param {bool} v Boolean value to set visibility.
 */
Ovoid.Node.prototype.setVisible = function(v) {

  this.visible = v;
  var i = this.child.length;
  while (i--)
    this.child[i].setTreeVisible(v);
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
Ovoid.Node.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.NODE;
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
    
  return o;

};
