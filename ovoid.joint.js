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
 * Joint node constructor.
 * 
 * @class Skeketon Joint node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Joint node implements a joint (often called bone) of a rig/skeleton
 * structure. 
 * Inherited from the Transform node, it is a world-transformable node, which 
 * means it can be moved rotated, scaled, etc... The Joint node is dedicated 
 * to be used as influence for the Skin node.<br><br>
 * 
 * @extends Ovoid.Transform
 *
 * @param {string} name Name of the node.
 */
Ovoid.Joint = function(name) {

  Ovoid.Transform.call(this);
  /** node type */
  this.type |= Ovoid.JOINT;
  /** node name.
   * @type string */
  this.name = name;
  /** linked skin deformer.
   * @type Skin */
  this.skin = null;
  /** Joint's bone size.
   * @type float */
  this.size = 1.0;
};
Ovoid.Joint.prototype = new Ovoid.Transform;
Ovoid.Joint.prototype.constructor = Ovoid.Joint;


/**
 * Node's caching function.
 *
 * <br><br>Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <code>Ovoid.Queuer</code> global class and should not be called independently.
 */
Ovoid.Joint.prototype.cachJoint = function() {
  
  if (!(this.cach & Ovoid.CACH_WORLD)) {
    this.skin.unCach(Ovoid.CACH_SKIN);
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
Ovoid.Joint.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.JOINT;
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
  /* Ovoid.Transform */
  o['pivot'] = this.pivot;
  o['scaling'] = this.scaling;
  o['translation'] = this.translation;
  o['orientation'] = this.orientation;
  o['rotation'] = this.rotation;
  /* Ovoid.Joint */
  o['size'] = this.size;
  o['skin'] = this.skin?this.skin.uid:'null';


  return o;
};
