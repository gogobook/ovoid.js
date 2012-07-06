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
 * @class Overlay Layer node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Layer node is the main representative overlay object. Inherited from the 
 * Transform node, it is a transformable node. That means the node can be moved
 * rotated, scaled, since it evolve in the world 3D space.
 * <br>
 * <br>
 * The Layer node is what we call an "overlay sprite". An overlay sprite 
 * structurally is a 3D object, but appears as 2D object over the scene. 
 * The overlay sprite is not drawn according to the perspective and world 
 * coordinates, but according to the screen surface and resolution. In fact, 
 * the overlay sprite is a quad polygon (sprite) rendered over the 3D scene 
 * in a particular orthographic projection.
 * <br>
 * <br>
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
  this.size = new Ovoid.Coord(0.0, 0.0, 0.0);
  /** Layer foreground color.
   * @type Color */
  this.fgColor = new Ovoid.Color(0.0, 0.0, 0.0, 1.0);
  /** Layer background color.
   * @type Color */
  this.bgColor = new Ovoid.Color(1.0, 1.0, 1.0, 1.0);
  /** Layer background texture.
   * @type Texture */
  this.bgTexture = null;

  this.unCach(Ovoid.CACH_LAYER);
};
Ovoid.Layer.prototype = new Ovoid.Transform;
Ovoid.Layer.prototype.constructor = Ovoid.Layer;


/**
 * Define layer size.
 * 
 * <br><br>Sets the size of this instance in pixel according to the spedified values.
 *
 * @param {float} x Layer width in pixel.
 * @param {float} y Layer height in pixel.
 */
Ovoid.Layer.prototype.setSize = function(x, y) {

  this.size.set(x, y, 0.0);
};


/**
 * Define layer background color.
 * 
 * <br><br>Sets the background color of this instance according to the specified values.
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
 * Define layer background texture.
 * 
 * <br><br>Sets the background texture of this instance with the given one. 
 *
 * @param {Texture} texture Texture object to use as background.
 * 
 * @see Ovoid.Texture
 */
Ovoid.Layer.prototype.setBgTexture = function(texture) {

  this.bgTexture = texture;
};


/**
 * Define layer foreground color.
 * 
 * <br><br>Sets the foreground color of this instance according to the specified values.
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


