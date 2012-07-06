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
 * @class Constraint node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * Constraint nodes are intermediary abstract nodes dedicated to be used as 
 * inheritance by others classes. Alone, Constraint nodes does not have any 
 * utility.<br>
 * <br>
 * At this stage of developement there is two Constraint inherited nodes, 
 * <code>Ovoid.Physics</code> and <code>Ovoid.Animation</code>.
 * <br>
 * <br>
 * The Constraint nodes are defined by the fact they are able to constrain the 
 * transformable nodes's (Transform inherited) behaviours. The constrained node 
 * is called the target node. The target node will be under the influence of 
 * the Constraint node.
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
 * Set the target node of this instance.
 *
 * <br><br>This method will set the specified node under the influence of this instance.
 * 
 * @param {Node} node Node object to set as target.
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
