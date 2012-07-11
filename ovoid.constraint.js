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
 * Constraint node constructor.
 *
 * @class Constraint node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Constraint node is the base class for constraint nodes type. It 
 * implements a simple node targeting abstract mechanism. The Constraint node is 
 * a dependency node and does not takes place directly in the 3D world. The 
 * Constraint node is typically used to modify the transformation behaviours of 
 * one Body node.<br><br>
 * 
 * @extends Ovoid.Node
 * 
 * @see Ovoid.Animation
 * @see Ovoid.Physics
 *
 * @param {string} name Name of the new node.
*/
Ovoid.Constraint = function(name) {

  Ovoid.Node.call(this);
  /** node type */
  this.type |= Ovoid.CONSTRAINT;
  /** Node name 
   * @type string */
  this.name = name;
  /** Constraint's target node 
   * @type Node */
  this.target = null;

};
Ovoid.Constraint.prototype = new Ovoid.Node;
Ovoid.Constraint.prototype.constructor = Ovoid.Constraint;


/**
 * Set the target node of this instance.<br><br>
 *
 * Assign the specified node as target node of this instance. The assigned node 
 * will have this instance as dependency (depend node).
 * 
 * @param {Node} node Node object to assign as target.
 * 
 * @see Ovoid.Node
 */
Ovoid.Constraint.prototype.setTarget = function(node) {

    if (this.target != null) {
        this.target.breakDepend(this);
    }
    this.target = node;
    this.target.makeDepend(this);
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
Ovoid.Constraint.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.CONSTRAINT;
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
  /* Ovoid.Constraint */
  if (this.target) {
    o['target'] = this.target.uid;
  } else {
    o['target'] = 'null';
  }
  return o;

};
