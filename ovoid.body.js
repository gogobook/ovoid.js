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
 * Body node constructor.
 *
 * @class Body node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Body node is the main representative world object. Inherited from the 
 * Transform node, it is a world-transformable node, which means it can be moved
 * rotated, scaled, etc... The Body node is dedicated (but not forced) to have a 
 * shape (Mesh, Emitter, etc...) assigned.<br><br>
 * 
 * <b>Body node and shape concept</b><br><br>
 * 
 * A Mesh node which is not assigned to a Body node will never be drawn. The 
 * Mesh node is what is called a "shape" and must be assigned to a 
 * world-transformable Body node to be included in the drawing pipeline.<br><br>
 * 
 * To make the concept more understandable, think that Body nodes are like 
 * invisible spirits without shape floating in the 3D world. To make a visible 
 * spirit, you have to give it a shape. You can assign the same shape node to 
 * several Body nodes in the same scene, then you obtain several identical 
 * shapes with different transformations (rotation, position, etc...).<br><br>
 * 
 * <blockcode>
 * &nbsp;&nbsp;var mesh = scene.create(Ovoid.MESH, "box1");<br>
 * &nbsp;&nbsp;body1.setShape(mesh);<br>
 * &nbsp;&nbsp;body2.setShape(mesh);<br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Transform
 *
 * @param {string} name Name of the node.
*/
Ovoid.Body = function(name) {

  Ovoid.Transform.call(this);
  /** Node type */
  this.type |= Ovoid.BODY;
  /** Node name 
   * @type string */
  this.name = name;
  /** Shape node reference.
   * @type Node */
  this.shape = null;
  /** Distance from the current render camera.
   * @type float */
  this.distFromEye = 0.0;
  /** Intersectable flag.
   * @type bool */
  this.intersectable = false;
  /** Intersect nodes.
   * @type Node[] */
  this.intersect = new Ovoid.Stack(Ovoid.MAX_BODY_INTERSECT);
  /** Enter nodes.
   * @type Node[] */
  this.enter = new Ovoid.Stack(Ovoid.MAX_BODY_INTERSECT);
  /** Leave nodes.
   * @type Node[] */
  this.leave = new Ovoid.Stack(Ovoid.MAX_BODY_INTERSECT);
};
Ovoid.Body.prototype = new Ovoid.Transform;
Ovoid.Body.prototype.constructor = Ovoid.Body;


/**
 * Assing a shape to this instance.<br><br>
 * 
 * Assings a Mesh, Emitter or Skin node as shape for this instance. 
 * The assigned shape will be a dependency (depend node) for this instance.
 * 
 * @param {Node} shape Shape node to assing to this Body.
 * 
 * @see Ovoid.Mesh
 * @see Ovoid.Skin
 * @see Ovoid.Emitter
 */
Ovoid.Body.prototype.setShape = function(shape) {

  if (this.shape != null)
  {
    this.breakDepend(this.shape);
  }
  this.shape = shape;
  this.makeDepend(shape);
};


/**
 * Node's caching function.
 *
 * <br><br>Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <code>Ovoid.Queuer</code> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Body.prototype.cachBody = function() {

  if (!(this.cach & Ovoid.CACH_BOUNDING_SHAPE))
  {
    if (this.shape) {
      this.boundingBox.copy(this.shape.boundingBox);
      this.boundingSphere.copy(this.shape.boundingSphere);
    }
    this.addCach(Ovoid.CACH_BOUNDING_SHAPE);
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
Ovoid.Body.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.BODY;
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
  o['bvolumemin'] = this.boundingBox.min;
  o['bvolumemax'] = this.boundingBox.max;
  o['bvolumerad'] = this.boundingSphere.radius;
  /* Ovoid.Transform */
  o['pivot'] = this.pivot;
  o['scaling'] = this.scaling;
  o['translation'] = this.translation;
  o['orientation'] = this.orientation;
  o['rotation'] = this.rotation;
  /* Ovoid.Body */
  o['shape'] = this.shape?this.shape.uid:'null';
  o['intersectable'] = this.intersectable;
  
  return o;
};

