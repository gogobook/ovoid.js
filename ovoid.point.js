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
 * @class Point object.<br><br>
 * 
 * This class provides an implementation of a tridimentionnal weighted point.
 *
 * @param {float} x The X component.
 * @param {float} y The Y component.
 * @param {float} z The Z component.
 * @param {float} w The W component.
 */
Ovoid.Point = function(x, y, z, w) {

  this.v = new Float32Array(4);
  if (x != undefined) {
    this.v[0] = x; this.v[1] = y; this.v[2] = z; this.v[3] = w;
  }
};


/**
 * Component assigment.<br><br>
 *
 * Sets the values of the Point components using the specified values.
 * 
 * @param {float} x The X component.
 * @param {float} y The Y component.
 * @param {float} z The Z component.
 * @param {float} w The W component.
 */
Ovoid.Point.prototype.set = function(x, y, z, w) {

  this.v[0] = x; this.v[1] = y; this.v[2] = z; this.v[3] = w;
};


/**
 * Component assigment from array.<br><br>
 * 
 * Sets the values of the Point components using the specified array.
 *
 * @param {float[]} a Float Array with x, y, z and w components.
 */
Ovoid.Point.prototype.setv = function(a) {

  this.v.set(a);
};


/**
 * Copy method.<br><br>
 *
 * Copies a Point.
 * 
 * @param {Point} point The Point object to copy.
 */
Ovoid.Point.prototype.copy = function(point) {

  this.v.set(point.v);
};


/**
 * Equality test.<br><br>
 * 
 * Compares the x, y, z and w components of two Point.
 *
 * @param {Point} point Point to which this Coord will be compared.
 *
 * @return {bool} true if the Points are identical, false otherwise.
 */
Ovoid.Point.prototype.equal = function(point) {

  return (this.v[0] == point.v[0] &&
          this.v[1] == point.v[1] &&
          this.v[2] == point.v[2]);
};


/**
 * In place subtraction.<br><br>
 * 
 * Sets this instance to the result of the substraction of this instance by an 
 * other one.
 *
 * @param {Point} point The Point object to be subtracted with this.
 */
Ovoid.Point.prototype.subBy = function(point) {

  this.v[0] -= point.v[0];
  this.v[1] -= point.v[1];
  this.v[2] -= point.v[2];
  this.v[3] -= point.v[3];
};


/**
 * In place addition.<br><br>
 * 
 * Sets this instance to the result of the addition of this instance by an 
 * other one.
 *
 * @param {Point} point The Point object to be added with this.
 */
Ovoid.Point.prototype.addBy = function(point) {

  this.v[0] += point.v[0];
  this.v[1] += point.v[1];
  this.v[2] += point.v[2];
  this.v[3] += point.v[3];
};


/**
 * In place scalar multiplication.<br><br>
 * 
 * Sets this instance to the result of the multiplication of this instance by a
 * scalar.
 *
 * @param {float} scale Scalar value.
 */
Ovoid.Point.prototype.scaleBy = function(scale) {

  this.v[0] *= scale;
  this.v[1] *= scale;
  this.v[2] *= scale;
  this.v[3] *= scale;
};


/**
 * Subtraction result assignment.<br><br>
 * 
 * Sets this instance to the result of the subtraction of two others.
 *
 * @param {Point} a Left operand of the operation.
 * @param {Point} b Right operand of the operation.
 */
Ovoid.Point.prototype.subOf = function(a, b) {

  this.v[0] = a.v[0] - b.v[0];
  this.v[1] = a.v[1] - b.v[1];
  this.v[2] = a.v[2] - b.v[2];
  this.v[3] = a.v[3] - b.v[3];
};


/**
 * Addition result assignment.<br><br>
 * 
 * Sets this instance to the result of the addition of two others.
 *
 * @param {Point} a Left operand of the operation.
 * @param {Point} b Right operand of the operation.
 */
Ovoid.Point.prototype.addOf = function(pointa, pointb) {

  this.v[0] = pointa.v[0] + pointb.v[0];
  this.v[1] = pointa.v[1] + pointb.v[1];
  this.v[2] = pointa.v[2] + pointb.v[2];
  this.v[3] = pointa.v[3] + pointb.v[3];
};


/**
 * In place normalization.<br><br>
 * 
 * Sets this instance to its normalized.
 */
Ovoid.Point.prototype.normalize = function() {

  /* methode la plus rapide */
  var mag = Math.sqrt((this.v[0] * this.v[0]) +
                      (this.v[1] * this.v[1]) +
                      (this.v[2] * this.v[2]));
  this.v[0] /= mag;
  this.v[1] /= mag;
  this.v[2] /= mag;
  this.v[3] = 1.0;
};


/**
 * In place weight normalization.<br><br>
 * 
 * Sets this instance to its normalized.
 */
Ovoid.Point.prototype.normalizeWeight = function() {

  this.v[0] /= this.v[3];
  this.v[1] /= this.v[3];
  this.v[2] /= this.v[3];
  this.v[3] = 1.0;
};


/**
 * Vector dot product.<br><br>
 * 
 * Returns the the dot product of the vector component of this instance by an 
 * other Point or Vector.
 * 
 * param {Point|Vector} vect Point or Vector object to take the dot product with.

 * return {float} The dot product result.
 */
Ovoid.Point.prototype.dot = function(vect) {

  return this.v[0] * vect.v[0] +
      this.v[1] * vect.v[1] +
      this.v[2] * vect.v[2];
};


/**
 * Vector size.<br><br>
 *
 * Returns the size of the vector component of this instance.
 * 
 * @return {float} The vector component size.
 */
Ovoid.Point.prototype.size = function() {

  return Math.sqrt(this.v[0] * this.v[0] +
      this.v[1] * this.v[1] +
      this.v[2] * this.v[2]);
};


/**
 * Vector magnitude.<br><br>
 * 
 * Returns the magnitude (or squared size) of the vector component of this instance.
 *
 * @return {float} The vector component magnitude.
 */
Ovoid.Point.prototype.size2 = function() {

  return this.v[0] * this.v[0] + this.v[1] * this.v[1] + this.v[2] * this.v[2];
};


/**
 * Point distance.<br><br>
 * 
 * Measures the distance in space between this instance and an orher one.
 *
 * @param {Point} point Point to measure distance.
 *
 * @return {float} The distance between this instance and the specified one.
 */
Ovoid.Point.prototype.dist = function(point) {

  var xx = this.v[0] - point.v[0];
  var yy = this.v[1] - point.v[1];
  var zz = this.v[2] - point.v[2];
  return Math.sqrt(xx * xx + yy * yy + zz * zz);
};


/**
 * Point squared distance.<br><br>
 * 
 * Measures the squared distance in space between this instance and an orher one.
 *
 * @param {Point} point Point to measure squared distance.
 *
 * @return {float} The squared distance between this instance and the specified one.
 */
Ovoid.Point.prototype.dist2 = function(point) {

  var xx = this.v[0] - point.v[0];
  var yy = this.v[1] - point.v[1];
  var zz = this.v[2] - point.v[2];
  return xx * xx + yy * yy + zz * zz;
};


/**
 * In place transformation.<br><br>
 * 
 * Transform this instance by the specified 4x4 transformation matrix.
 *
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Point.prototype.transform4 = function(mat4) {

  var xx = this.v[0] * mat4.m[0] +
      this.v[1] * mat4.m[4] +
      this.v[2] * mat4.m[8] +
      this.v[3] * mat4.m[12];

  var yy = this.v[0] * mat4.m[1] +
      this.v[1] * mat4.m[5] +
      this.v[2] * mat4.m[9] +
      this.v[3] * mat4.m[13];

  var zz = this.v[0] * mat4.m[2] +
      this.v[1] * mat4.m[6] +
      this.v[2] * mat4.m[10] +
      this.v[3] * mat4.m[14];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
};


/**
 * Transformation result assignment.<br><br>
 * 
 * Sets this instance to the result of the specified Point transformed
 * by the given 4x4 transformation matrix.
 * 
 * @param {Point} point Point for the base of transformation.
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Point.prototype.transform4Of = function(point, mat4) {

  this.v[0] = point.v[0] * mat4.m[0] +
      point.v[1] * mat4.m[4] +
      point.v[2] * mat4.m[8] +
      point.v[3] * mat4.m[12];

  this.v[1] = point.v[0] * mat4.m[1] +
      point.v[1] * mat4.m[5] +
      point.v[2] * mat4.m[9] +
      point.v[3] * mat4.m[13];

  this.v[2] = point.v[0] * mat4.m[2] +
      point.v[1] * mat4.m[6] +
      point.v[2] * mat4.m[10] +
      point.v[3] * mat4.m[14];
};



/**
 * In place inverse transformation.<br><br>
 * 
 * Transform inverse this instance by the specified 4x4 transformation matrix.
 *
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Point.prototype.transform4Inverse = function(mat4) {

  var tx = this.v[0] - mat4.m[12] * this.v[3];
  var ty = this.v[1] - mat4.m[13] * this.v[3];
  var tz = this.v[2] - mat4.m[14] * this.v[3];
  this.v[0] = tx * mat4.m[0] + ty * mat4.m[1] + tz * mat4.m[2];
  this.v[1] = tx * mat4.m[4] + ty * mat4.m[5] + tz * mat4.m[6];
  this.v[2] = tx * mat4.m[8] + ty * mat4.m[9] + tz * mat4.m[10];
};



/**
 * Inverse transformation result assignment.<br><br>
 * 
 * Sets this instance to the result of the specified Point inverse transformed
 * by the given 4x4 transformation matrix.
 * 
 * @param {Point} point Point for the base of transformation.
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Point.prototype.transform4InverseOf = function(point, mat4) {

  var tx = point.v[0] - mat4.m[12] * point.v[3];
  var ty = point.v[1] - mat4.m[13] * point.v[3];
  var tz = point.v[2] - mat4.m[14] * point.v[3];
  this.v[0] = tx * mat4.m[0] + ty * mat4.m[1] + tz * mat4.m[2];
  this.v[1] = tx * mat4.m[4] + ty * mat4.m[5] + tz * mat4.m[6];
  this.v[2] = tx * mat4.m[8] + ty * mat4.m[9] + tz * mat4.m[10];
};


/**
 * Weighted transformation result addition.<br><br>
 * 
 * Sets this instance to the result of the specified Point weighted transformed
 * by the given wieght and 4x4 matrix.
 * 
 * @param {Point} point Point for the base of transformation.
 * @param {Matrix4} mat3 3x3 rotation matrix.
 * @param {float} w Weight.
 */
Ovoid.Point.prototype.addWeightTransform4Of = function(point, mat4, w) {

  this.v[0] += (point.v[0] * mat4.m[0] +
      point.v[1] * mat4.m[4] +
      point.v[2] * mat4.m[8] +
      mat4.m[12]) * w;

  this.v[1] += (point.v[0] * mat4.m[1] +
      point.v[1] * mat4.m[5] +
      point.v[2] * mat4.m[9] +
      mat4.m[13]) * w;

  this.v[2] += (point.v[0] * mat4.m[2] +
      point.v[1] * mat4.m[6] +
      point.v[2] * mat4.m[10] +
      mat4.m[14]) * w;
      
  this.v[3] += w;
      
};


/**
 * In place transformation.<br><br>
 * 
 * Transform this instance by the specified 3x3 rotation matrix.
 *
 * @param {Matrix4} mat4 3x3 rotation matrix.
 */
Ovoid.Point.prototype.transform3 = function(mat3) {

  var xx = this.v[0] * mat3.m[0] +
      this.v[1] * mat3.m[3] +
      this.v[2] * mat3.m[6];

  var yy = this.v[0] * mat3.m[1] +
      this.v[1] * mat3.m[4] +
      this.v[2] * mat3.m[7];

  var zz = this.v[0] * mat3.m[2] +
      this.v[1] * mat3.m[5] +
      this.v[2] * mat3.m[8];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
};


/**
 * Transformation result assignment.<br><br>
 * 
 * Sets this instance to the result of the specified Point transformed
 * by the given 3x3 rotation matrix.
 * 
 * @param {Point} point Point for the base of transformation.
 * @param {Matrix4} mat3 3x3 rotation matrix.
 */
Ovoid.Point.prototype.transform3Of = function(point, mat3) {

  this.v[0] = point.v[0] * mat3.m[0] +
      point.v[1] * mat3.m[3] +
      point.v[2] * mat3.m[6];

  this.v[1] = point.v[0] * mat4.m[1] +
      point.v[1] * mat3.m[4] +
      point.v[2] * mat3.m[7];

  this.v[2] = point.v[0] * mat4.m[2] +
      point.v[1] * mat3.m[5] +
      point.v[2] * mat3.m[8];
};


/**
 * In place inverse transformation.<br><br>
 * 
 * Transform inverse this instance by the specified 3x3 rotation matrix.
 *
 * @param {Matrix4} mat3 3x3 rotation matrix.
 */
Ovoid.Point.prototype.transform3Inverse = function(mat3) {

  var xx = this.v[0] * mat3.m[0] +
      this.v[1] * mat3.m[1] +
      this.v[2] * mat3.m[2];

  var yy = this.v[0] * mat3.m[3] +
      this.v[1] * mat3.m[4] +
      this.v[2] * mat3.m[5];

  var zz = this.v[0] * mat3.m[6] +
      this.v[1] * mat3.m[7] +
      this.v[2] * mat3.m[8];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
};


/**
 * Inverse transformation result assignment.<br><br>
 * 
 * Sets this instance to the result of the specified Point inverse transformed
 * by the given 3x3 rotation matrix.
 * 
 * @param {Point} point Point for the base of transformation.
 * @param {Matrix4} mat3 3x3 rotation matrix.
 */
Ovoid.Point.prototype.transform3InverseOf = function(point, mat3) {

  this.v[0] = point.v[0] * mat4.m[0] +
      point.v[1] * mat4.m[1] +
      point.v[2] * mat4.m[2];

  this.v[1] = point.v[0] * mat4.m[3] +
      point.v[1] * mat4.m[4] +
      point.v[2] * mat4.m[5];

  this.v[2] = point.v[0] * mat4.m[6] +
      point.v[1] * mat4.m[7] +
      point.v[2] * mat4.m[8];
};


/**
 * Not a number test.<br><br>
 * 
 * Checks whether this instance contains a "NaN" (Not a Number) component.
 *
 * @return {bool} True if one or more component is NaN, false otherwise.
 */
Ovoid.Point.prototype.isNaN = function() {

    return (isNaN(this.v[0]) || isNaN(this.v[1]) || isNaN(this.v[2]) || isNaN(this.v[3]));
};


/**
 * Create a new array of Point objets.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Object[]} Array of point objects.
 */
Ovoid.Point.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Point());
  return array;
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Point.prototype.toJSON = function() {
  
  var o = new Array();
  for(var i = 0; i < this.v.length; i++)
    o[i] = this.v[i];
  return o
};
