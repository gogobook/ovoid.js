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
 * @class Coord object.<br><br>
 * 
 * This class provides an implementation of a tridimentionnal coordinate.
 *
 * @param {float} u The U component.
 * @param {float} v The V component.
 * @param {float} w The W component.
 */
Ovoid.Coord = function(u, v, w) {

  this.v = new Float32Array(3);
  if (u != undefined) {
    this.v[0] = u;
    this.v[1] = v;
    this.v[2] = w;
  }
};


/**
 * Component assigment.<br><br>
 *
 * Sets the values of the Coord components using the specified values.
 * 
 * @param {float} u The U component.
 * @param {float} v The V component.
 * @param {float} w The W component.
 */
Ovoid.Coord.prototype.set = function(u, v, w) {

  this.v[0] = u;
  this.v[1] = v;
  this.v[2] = w;
};


/**
 * Component assigment from array.<br><br>
 * 
 * Sets the values of the Coord components using the specified array.
 *
 * @param {float[]} a Float Array with x, y and z components.
 */
Ovoid.Coord.prototype.setv = function(a) {

  this.v.set(a);
};


/**
 * Copy method.<br><br>
 *
 * Copies a Coord.
 * 
 * @param {Coord} coord The Coord object to copy.
 */
Ovoid.Coord.prototype.copy = function(coord) {

  this.v[0] = coord.v[0];
  this.v[1] = coord.v[1];
  this.v[2] = coord.v[2];
};


/**
 * Equality test.<br><br>
 * 
 * Compares the u, v and w components of two Coord.
 *
 * @param {Coord} coord Coord to which this Coord will be compared.
 *
 * @return {bool} true if the Coords are identical, false otherwise.
 */
Ovoid.Coord.prototype.equal = function(coord) {

  return (this.v[0] == coord.v[0] &&
      this.v[1] == coord.v[1] &&
      this.v[2] == coord.v[2]);
};


/**
 * Subtraction result assignment.<br><br>
 * 
 * Sets this instance to the result of the subtraction of two others.
 *
 * @param {Coord} a Left operand of the operation.
 * @param {Coord} b Right operand of the operation.
 */
Ovoid.Coord.prototype.subOf = function(l, r) {

  this.v[0] = l.v[0] - r.v[0];
  this.v[1] = l.v[1] - r.v[1];
  this.v[2] = l.v[2] - r.v[2];
};


/**
 * Addition result assignment.<br><br>
 * 
 * Sets this instance to the result of the addition of two others.
 *
 * @param {Coord} a Left operand of the operation.
 * @param {Coord} b Right operand of the operation.
 */
Ovoid.Coord.prototype.addOf = function(l, r) {

  this.v[0] = l.v[0] - r.v[0];
  this.v[1] = l.v[1] - r.v[1];
  this.v[2] = l.v[2] - r.v[2];
};


/**
 * In place scalar multiplication.<br><br>
 * 
 * Sets this instance to the result of the multiplication of this instance by a
 * scalar.
 *
 * @param {float} scale Scalar value.
 */
Ovoid.Coord.prototype.scaleBy = function(scale) {

  this.v[0] *= scale;
  this.v[1] *= scale;
  this.v[2] *= scale;
};


/**
 * In place transformation.<br><br>
 * 
 * Transform this instance by the specified 4x4 transformation matrix.
 *
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Coord.prototype.transform = function(mat4) {

  var xx = (this.v[0] * mat4.m[0] +
            this.v[1] * mat4.m[4] +
            this.v[2] * mat4.m[8]);

  var yy = (this.v[0] * mat4.m[1] +
            this.v[1] * mat4.m[5] +
            this.v[2] * mat4.m[9]);

  var zz = (this.v[0] * mat4.m[2] +
            this.v[1] * mat4.m[6] +
            this.v[2] * mat4.m[10]);

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Coord.prototype.toJSON = function() {
  
  var o = new Array();
  for(var i = 0; i < this.v.length; i++)
    o[i] = this.v[i];
  return o
};
