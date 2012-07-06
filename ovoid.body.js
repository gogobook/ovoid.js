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
 * @class Body node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Body node is the main representative world object. Inherited from the 
 * Transform node, it is a transformable node. That means the node can be moved
 * rotated, scaled, since it evolve in the world 3D space. The Body node is 
 * considered "drawable" or "renderable", but is not "rendered" until it have 
 * a "shape".
 * <br>
 * <br>
 * <b>Body node and shape concept</b>
 * <br>
 * <br>
 * Once a Mesh node (for example) is ready to be drawn, in fact it is NOT yet 
 * "renderable". In fact Mesh objects are abstract and are not in the world, it 
 * is called a "shape" node. To display our Mesh, we need to create a Body node 
 * that will be in the world and "attach" the Mesh node to this Body.
 * <br>
 * <br>
 * To make the concept more understandable, think that Body nodes are like 
 * invisible spirits without shape floating in the world . To make a visible 
 * spirit, you have to give it a shape. You now guess that you can attach the 
 * same Shape node to several Body nodes at the same time. The Body node is 
 * inherited from Transform node, and so is transformable (move, rotate, 
 * scale...). Shape nodes, like Mesh node, are NOT.
 * <br>
 * <br>
 * <blockcode>
 * &nbsp;&nbsp;body = scene.create(Ovoid.BODY, "HelloBox");<br>
 * &nbsp;&nbsp;body.setShape(mesh);<br>
 * </blockcode>
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
  
};
Ovoid.Body.prototype = new Ovoid.Transform;
Ovoid.Body.prototype.constructor = Ovoid.Body;


/**
 * Assing a shape to this instance.
 * 
 * <br><br>Assing a Mesh, Emitter or Skin node as shape for this Body. The assigned 
 * shape will be a dependency for this instance.
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
  /* Ovoid.Transform */
  o['pivot'] = this.pivot;
  o['scaling'] = this.scaling;
  o['translation'] = this.translation;
  o['orientation'] = this.orientation;
  o['rotation'] = this.rotation;
  /* Ovoid.Body */
  o['shape'] = this.shape?this.shape.uid:'null';
  o['action'] = this.action?this.action.uid:'null';
  
  return o;
};

