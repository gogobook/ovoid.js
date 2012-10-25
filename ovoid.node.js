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
 * @class Generic Node object.<br><br>
 * 
 * This class provides an implementation of a graph node. Node is the 
 * fundamental unit of which graphs are formed. Node class is the base 
 * class for all Node objects.<br><br>
 * 
 * The Node object implements two types of node relationships which forms two 
 * types of graphs. The both relationship types can (and typically) occur in 
 * same time for each nodes. One can say that nodes form two diferent parallel 
 * graphs.<br><br>
 * 
 * <b>World hierarchy graph</b><br><br>
 * 
 * The world hierarchy is the most common and known relationship type in 3D 
 * context. It is defined by the child-parent relationship, 
 * who describes how a node will affects (leads) the transformation of one or 
 * several other nodes. In practice, each child nodes recursively undergoes the 
 * transformation (in parent space coordinate) applied to its parents.<br><br>
 * 
 * <blockcode>
 * var node0 = scene.create(Ovoid.NODE, "node0");<br>
 * var node1 = scene.create(Ovoid.NODE, "node1");<br>
 * node0.setParent(node1);<br>
 * </blockcode><br><br>
 * 
 * The Node class implement this relationship through its <code>parent</code> and 
 * <code>child</code> member fields, and the relationship is created using the 
 * <code>setParent</code> method. One node can only have one parent, and an 
 * limitless amount of children.<br><br>
 * 
 * <b>Nodes dependency graph</b><br><br>
 * 
 * The nodes dependency is a less known relationship type who describe, as its 
 * name says, the relative dependencies of nodes between them. In practice, the 
 * the dependency graph tells which nodes should be updated in 
 * order to fulfill updates of an other one.<br><br>
 * 
 * <blockcode>
 * var node0 = scene.create(Ovoid.NODE, "node0");<br>
 * var node1 = scene.create(Ovoid.NODE, "node1");<br>
 * node0.makeDepend(node1);<br>
 * </blockcode><br><br>
 * 
 * The Node class implement this relationship through its <code>depend</code> and 
 * <code>link</code> member fields, and the relationship is created or 
 * destroyed using the <code>makeDepend</code> and <code>breakDepend</code> 
 * methods. One node can have an limitless amount of linked and depend nodes.<br><br> 
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
 * Set parent.<br><br>
 * 
 * Sets the parent node of this instance.
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
 * Make dependency link.<br><br>
 * 
 * Make a dependency link between this node and the specified one.
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
 * Break dependency link.<br><br>
 * 
 * If link exists, break the dependency link between this node and the 
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
 * Enable caching bit.<br><br>
 * 
 * Enable the specified caching bit for this instance.
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
 * Set visibility.<br><br>
 * 
 * Sets the visibility attribute of this instance and for the whole
 * children tree of this instance.
 *
 * @param {bool} v Boolean value to set visibility.
 */
Ovoid.Node.prototype.setTreeVisible = function(v) {

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
  o['t'] = Ovoid.NODE;
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
  return o;

};
