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
 * Constructor method.
 *
 * @class RGBA color object.<br><br>
 * 
 * This class is used to store values of color attributes.
 *
 * @param {float} r The red component.
 * @param {float} g The green component.
 * @param {float} b The blue component.
 * @param {float} a The alpha component.
 */
Ovoid.Color = function(r, g, b, a) {

  this.v = new Float32Array(4);
  if (r != undefined) {
    this.v[0] = r; this.v[1] = g; this.v[2] = b; this.v[3] = a;
  }
};


/**
 * Component assigment.<br><br>
 *
 * Sets the values of the color components using the specified values.
 * 
 * @param {float} r The red component.
 * @param {float} g The green component.
 * @param {float} b The blue component.
 * @param {float} a The alpha component.
 */
Ovoid.Color.prototype.set = function(r, g, b, a) {

  this.v[0] = r; this.v[1] = g; this.v[2] = b; this.v[3] = a;
};


/**
 * Component assigment from array.<br><br>
 * 
 * Sets the values of the color components using the specified array.
 *
 * @param {float[]} a Float Array with red, green, blue and alpha components.
 */
Ovoid.Color.prototype.setv = function(a) {

  this.v.set(a);
};


/**
 * Copy method.<br><br>
 *
 * Copies a color.
 * 
 * @param {Color} color The Color object to copy.
 */
Ovoid.Color.prototype.copy = function(color) {

  this.v[0] = color.v[0];
  this.v[1] = color.v[1];
  this.v[2] = color.v[2];
  this.v[3] = color.v[3];
};


/**
 * Equality test.<br><br>
 * 
 * Compares the red, green, blue and alpha components of two color.
 *
 * @param {Color} color Color to which this color will be compared.
 *
 * @return {bool} true if the colors are identical, false otherwise.
 */
Ovoid.Color.prototype.equal = function(color) {

  return (this.v[0] == color.v[0] &&
          this.v[1] == color.v[1] &&
          this.v[2] == color.v[2] &&
          this.v[3] == color.v[3]);
};


/**
 * Component conversion to integer.<br><br>
 * 
 * Convert the red, green and blue component into an RGB 24 bits integer 
 * representation.
 *
 * @return {int} The RGB 24 bits integer representation of this
 * instance.
 */
Ovoid.Color.prototype.asInt = function() {

  return 0x000000 | ((this.v[0] * 255) << 16) |
      ((this.v[1] * 255) << 8) |
      ((this.v[2] * 255));
};


/**
 * Component assigment from integer.<br><br>
 * 
 * Sets the values of the color components using the specified RGB 24 Bits 
 * integer representation.
 *
 * @param {int} i RGB 24 bits integer value.
 */
Ovoid.Color.prototype.fromInt = function(i) {

  this.v[0] = ((i >> 16) & 0xFF) / 255.0;
  this.v[1] = ((i >> 8) & 0xFF) / 255.0;
  this.v[2] = (i & 0xFF) / 255.0;
  this.v[3] = 1.0;
};


/**
 * Create a new array of color objects.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Object[]} Array of color objects.
 */
Ovoid.Color.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Color());
  return array;
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Color.prototype.toJSON = function() {
  
  var o = new Array();
  for(var i = 0; i < this.v.length; i++)
    o[i] = this.v[i];
  return o
};
