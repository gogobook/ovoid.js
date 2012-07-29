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
 * Layer node constructor.
 *
 * @class Overlay Layer node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Layer node implements a sprite drawn as an 2D overlayed rectangle on the 
 * rendered scene.
 * Inherited from the Transform node, it is a world-transformable node, which 
 * means it can be moved rotated, scaled, etc... It is typically 
 * used to display images in a 2D space coordinate who corresponds to the 
 * canvas/client area. Layer node is used, so to speak, to simulates a 2D 
 * context through 3D environment.<br><br>
 * 
 * <blockcode>
 * var logo = scene.create(Ovoid.LAYER, "logo");<br>
 * logo.setBgColor(1.0, 0.5, 0.0, 1.0);<br>
 * logo.setBgTexture(logoTexture);<br>
 * logo.setSize(320, 240);<br>
 * <br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Transform
 *
 * @param {string} name Name of the new node.
 */
Ovoid.Layer = function(name) {

  Ovoid.Transform.call(this);
  /** node type */
  this.type |= Ovoid.LAYER;
  /** node name.
   * @type string */
  this.name = name;

  /** Layer size.
   * @type Coord */
  this.size = new Ovoid.Coord(1.0, 1.0, 1.0);
  /** Layer foreground color.
   * @type Color */
  this.fgColor = new Ovoid.Color(0.0, 0.0, 0.0, 1.0);
  /** Layer background color.
   * @type Color */
  this.bgColor = new Ovoid.Color(1.0, 1.0, 1.0, 1.0);
  /** Layer background texture.
   * @type Texture */
  this.bgTexture = null;
  /** Layer transformation matrix.
   * @type Matrix1 */
  this.layerMatrix = new Ovoid.Matrix4();

  this.unCach(Ovoid.CACH_LAYER);
};
Ovoid.Layer.prototype = new Ovoid.Transform;
Ovoid.Layer.prototype.constructor = Ovoid.Layer;


/**
 * Set layer size.<br><br>
 * 
 * Sets the size of this instance in pixel according to the spedified values.
 *
 * @param {float} x Layer width in pixel.
 * @param {float} y Layer height in pixel.
 */
Ovoid.Layer.prototype.setSize = function(x, y) {

  this.size.set(x, y, 1.0);
};


/**
 * Set layer background color.<br><br>
 * 
 * Sets the background color of this instance according to the specified values.
 *
 * @param {float} r The Red component.
 * @param {float} g The Green component.
 * @param {float} b The Blue component.
 * @param {float} a The Alpha component.
 */
Ovoid.Layer.prototype.setBgColor = function(r, g, b, a) {

  this.bgColor.set(r, g, b, a);
};


/**
 * Set layer background texture.<br><br>
 * 
 * Sets the background texture of this instance with the specified 
 * Texture object. 
 *
 * @param {Texture} texture Texture object to use as background.
 * 
 * @see Ovoid.Texture
 */
Ovoid.Layer.prototype.setBgTexture = function(texture) {

  this.bgTexture = texture;
};


/**
 * Set layer foreground color.<br><br>
 * 
 * Sets the foreground color of this instance according to the specified values.
 *
 * @param {float} r The Red component.
 * @param {float} g The Green component.
 * @param {float} b The Blue component.
 * @param {float} a The Alpha component.
 */
Ovoid.Layer.prototype.setFgColor = function(r, g, b, a) {

  this.fgColor.set(r, g, b, a);
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
Ovoid.Layer.prototype.cachLayer = function() {
  
  if ( !(this.cach & Ovoid.CACH_WORLD) || !(this.cach & Ovoid.CACH_LAYER))
  {
    this.layerMatrix.copy(this.worldMatrix);
    this.layerMatrix.m[0] *= this.size.v[0];
    this.layerMatrix.m[1] *= this.size.v[1];
    this.layerMatrix.m[4] *= this.size.v[0];
    this.layerMatrix.m[5] *= this.size.v[1];
    this.layerMatrix.m[8] *= this.size.v[0];
    this.layerMatrix.m[9] *= this.size.v[1];
    this.addCach(Ovoid.CACH_LAYER);
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
Ovoid.Layer.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.LAYER;
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
  /* Ovoid.Layer */
  o['size'] = this.size;
  o['fgColor'] = this.fgColor;
  o['bgColor'] = this.bgColor;
  o['bgTexture'] = this.bgTexture;
  o['bgTexture'] = this.bgTexture?
    this.bgTexture.uid:
    'null';
  o['action'] = this.action?
    this.action.uid:
    'null';
  return o;
};


