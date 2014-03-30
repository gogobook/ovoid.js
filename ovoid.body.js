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



/**
 * Constructor method.
 *
 * @class Body node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
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
 * &nbsp;&nbsp;var mesh = myOvoid.Scene.newNode(Ovoid.MESH, "box1");<br>
 * &nbsp;&nbsp;body1.setShape(mesh);<br>
 * &nbsp;&nbsp;body2.setShape(mesh);<br>
 * </blockcode><br><br>
 * 
 * <b>Body intersection handling</b><br><br>
 * 
 * For interactivity purpose, the Body node is designed to be able detect 
 * intersections with each others through the bounding sphere. To enable this 
 * functionnaly you must set the <c>intersectable</c> attribute to true. 
 * The intersection is detected only if both body are set as "intersectable". 
 * Each Body keeps its list of Body in intersection with him in the 
 * <c>intersect</c> member, while the list of Body just enterd and just 
 * leaved in/from intersection are stored (during ONE frame) in the 
 * <c>enter</c> and <c>leave</c> member.<br><br>
 * 
 * For more information about intesection usage and handling you should refer to
 * the <a href="Ovoid.Action.php"><c>Ovoid.Action</c></a> node 
 * documentation.<br><br>
 * 
 * <b>Render Layer and Alpha</b><br><br>
 * 
 * For rendering purposes, a Body can be placed in a particular render layer. 
 * You can set the render layer of the body through the <c>renderLayer</c> 
 * attribute member. The <c>renderLayer</c> value must be an integer 
 * between 0 to  <c>Ovoid.MAX_RENDER_LAYER</c> (8). You also can define 
 * the Body as an Alpha (Transparent/FX) object through the 
 * <c>renderAlpha</c> attribute member. If your object is dedicated to be 
 * transparent or a particle emitter, you should set this attribute to 
 * <c>true</c>.<br><br>
 * 
 * For more informations about render layers and alpha you should refer to the
 * <a href="Ovoid.Drawer.php"><c>Ovoid.Drawer</c></a> global class  
 * documentation.<br><br>
 * 
 * <b>Shadow casting</b><br><br>
 * 
 * You can include or exclude a Body node of the shadow casting process through 
 * the <c>shadowCasting</c> attribute member. If set to <c>true</c> 
 * (default) and the Body's shape is a Mesh while the cast shadow rendering is 
 * enabled, the shadow volum of the mesh will be computed and rendered, 
 * otherwise the Mesh's shadow computation is jumped.
 * 
 * For more informations about cast shadows you should refer to the
 * <a href="Ovoid.Drawer.php"><c>Ovoid.Drawer</c></a> global class  
 * documentation.<br><br>
 * 
 * @extends Ovoid.Transform
 *
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
*/
Ovoid.Body = function(name, i) {

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
  /** Visibility range from distance from eye.
   * @type float */
  this.visibleRange = 0.0;
  /** Body shadow casting flag.
   * @type bool */
  this.shadowCasting = true;
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
  /** Render layer index.
   * @type int */
  this.renderLayer = 0;
  /** Render alpha flag.
   * @type int */
  this.renderAlpha = false;
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
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
 * <c>Ovoid.Queuer</c> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Body.prototype.cachBody = function() {

  if (!(this.cach & Ovoid.CACH_BOUNDING_SHAPE))
  {
    if (this.shape) {
      
        this.boundingBox.copy(this.shape.boundingBox);
        this.boundingSphere.copy(this.shape.boundingSphere);
        
      if (this.shape.type & Ovoid.SKIN) {
          /* Correction du centre des volumes, ça ne fonctionne pas très bien
           * pour la bounding box, mais c'est suffisant pour la bounding sphere. */
          this.boundingBox.center.transform4Inverse(this.worldMatrix);
          this.boundingSphere.center.transform4Inverse(this.worldMatrix);
      }
    }
    this.addCach(Ovoid.CACH_BOUNDING_SHAPE);
  }
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
Ovoid.Body.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.BODY;
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
  /* Ovoid.Transform */
  o['ts'] = this.scaling;
  o['tt'] = this.translation;
  o['to'] = this.orientation;
  o['tr'] = this.rotation;
  /* Ovoid.Body */
  o['bs'] = this.shape?this.shape.uid:'null';
  o['bi'] = this.intersectable;
  o['bc'] = this.shadowCasting;
  o['bl'] = this.renderLayer;
  o['ba'] = this.renderAlpha;
  o['vr'] = this.visibleRange;
  return o;
};

