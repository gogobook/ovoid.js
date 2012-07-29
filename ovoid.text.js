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
 * @class Overlay Text node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Text node implements an 2D text string overlayed on the 
 * rendered scene. It uses the texture mapped font technic to draw characters as 
 * point-sprites. Inherited from the Layer node, it is a world-transformable 
 * node, which means it can be transformed in a 2D space coordinate who 
 * corresponds to the canvas/client area.
 * 
 * <blockcode>
 * var hello = scene.create(Ovoid.TEXT, "BlueText");<br>
 * hello.setFgColor(0.0, 0.5, 1.0, 1.0);<br>
 * hello.moveXyz(320, 240, 0.0);<br>
 * hello.string = "Hello World !";<br>
 * </blockcode><br><br>
 * 
 * <b>Texture Mapped Font</b><br><br>
 * 
 * The Texture Mapped Font uses a special texture who store font's characters 
 * arranged in rows and collumns matrix. The suitable character is drawn by 
 * selecting an texture portion according to the texture coordinates.
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
  this.fontmap = null;
  /** Text string.
   * @type string */
  this.string = '';
  /** Text parameters.
   * @type Coord */
  this.param = new Ovoid.Coord(16.0, 0.5, 1.0);
};
Ovoid.Text.prototype = new Ovoid.Layer;
Ovoid.Text.prototype.constructor = Ovoid.Text;


/**
 * Set font format.<br><br>
 * 
 * Sets text font format according to the specified values.
 *
 * @param {float} s Character sprite size in pixel.
 * @param {float} c Interchar value in pixel.
 * @param {float} l Interline value in pixel.
 */
Ovoid.Text.prototype.setFormat = function(s, c, l) {

  this.param.set(s, c, l);
};


/**
 * Assign font texture.<br><br>
 * 
 * Assigns the specified Texture object as font map. If null, the 
 * default global font map texture is used.
 *
 * @param {Texture} texture Texture object.
 * 
 * @see Ovoid.Texture
 */
Ovoid.Text.prototype.setFontmap = function(texture) {

  this.fontmap = texture;
};



/**
 * Get width.<br><br>
 * 
 * Returns the layer width according to the current string and font
 * parameters.
 */
Ovoid.Text.prototype.getWidth = function(texture) {

  return (this.string.length * (this.param.v[0] * this.param.v[1]));
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
  o['action'] = this.action?this.action.uid:'null';
  /* Ovoid.Text */
  if (this.fontmap) {
    o['fontmap'] = this.fontmap.uid;
  } else {
    o['fontmap'] = 'null';
  }
  o['string'] = this.string;
  o['param'] = this.param;
  
  return o;
};

