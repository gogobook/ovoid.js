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
 * Constraint node is typically used to modify the behaviours of one or several 
 * nodes.<br><br>
 * 
 * @extends Ovoid.Node
 * 
 * @see Ovoid.Animation
 * @see Ovoid.Physics
 * @see Ovoid.Expression
 * @see Ovoid.Aim
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
  this.target = new Array();

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

    this.target.push(node);
    node.makeDepend(this);
};


/**
 * Remove a target node of this instance.<br><br>
 *
 * Unassing and break dependencies of the specified node as target node 
 * of this instance.
 * 
 * @param {Node} node Node object to remove as target.
 * 
 * @see Ovoid.Node
 */
Ovoid.Constraint.prototype.remTarget = function(node) {

    var c = this.target.length;
    while(c--) {
      if(this.target[c] === node) {
        this.target.splice(c, 1);
        node.breakDepend(this);
      }
    }
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
  o['t'] = Ovoid.CONSTRAINT;
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
  /* Ovoid.Constraint */
  o['ct'] = new Array();
  for(var i = 0; i < this.target.length; i++)
    o['ct'][i] = this.target[i].uid;
    
  return o;

};
