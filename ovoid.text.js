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
 * @class Overlay Text node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Text node is a specific overlay to display text. Inherited from the 
 * Layer node, it is a transformable node. That means the node can be moved
 * rotated, scaled, since it evolve in the world 3D space. Text node use the
 * texture font technique to display text from string. The texture font 
 * technique use a special texture as font library.
 * <br>
 * <br>
 * The Text node is what we call an "overlay sprite". An overlay sprite 
 * structurally is a 3D object, but appears as 2D object over the scene. 
 * The overlay sprite is not drawn according to the perspective and world 
 * coordinates, but according to the screen surface and resolution. In fact, 
 * the overlay sprite is a quad polygon (sprite) rendered over the 3D scene 
 * in a particular orthographic projection.
 * <br>
 * <br>
 * 
 * @extends Ovoid.Layer
 *
 * @param {string} name Name of the new node.
 */
Ovoid.Text = function(name) {

  Ovoid.Layer.call(this);
  /** node type.
   * @type bitmask */
  this.type |= Ovoid.TEXT;
  /** Node name.
   * @type string */
  this.name = name;
  /** Fontmap texture.
   * @type Texture */
  this.fontmapTexture = null;
  /** Text string.
   * @type string */
  this.string = '';
  /* default size */
  this.size.set(16.0, 0.5, 1.0);
};
Ovoid.Text.prototype = new Ovoid.Layer;
Ovoid.Text.prototype.constructor = Ovoid.Text;


/**
 * Define format.
 * 
 * <br><br>Sets text font format according to the specified values.
 *
 * @param {float} s Character sprite size in pixel.
 * @param {float} c Interchar value in pixel.
 * @param {float} l Interline value in pixel.
 */
Ovoid.Text.prototype.setFormat = function(s, c, l) {

  this.size.set(s, c, l);
};


/**
 * Fontmap assignment.
 * 
 * <br><br>Assigns the specified Texture object as fontmap. If null, the 
 * default render engine's fontmap is used.
 *
 * @param {Texture} texture Texture object. If null, the 
 * default render engine's fontmap is used.
 * 
 * @see Ovoid.Texture
 */
Ovoid.Text.prototype.setFontmap = function(texture) {

  this.fontmapTexture = texture;
};



/**
 * Get width.
 * 
 * <br><br>Returns the layer width according to the current string and font
 * parameters.
 */
Ovoid.Text.prototype.getWidth = function(texture) {

  return (this.string.length * (this.size.v[0] * this.size.v[1]));
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
  o['action'] = this.action?this.action.uid:'null';
  /* Ovoid.Text */
  if (this.fontmapTexture) {
    o['fontmapTexture'] = this.fontmapTexture.uid;
  } else {
    o['fontmapTexture'] = 'null';
  }
  o['string'] = this.string;
  
  return o;
};

