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
 * Create a Vector object.
 *
 * @class Vector object.
 * 
 * <br><br>This class provides an implementation of a tridimentionnal vector.
 *
 * @param {float} x The X component.
 * @param {float} y The Y component.
 * @param {float} z The Z component.
 */
Ovoid.Vector = function(x, y, z) {

  this.v = new Float32Array(3);
  if (x != undefined) {
    this.v[0] = x; this.v[1] = y; this.v[2] = z;
  }
};


/**
 * Component assigment.
 *
 * <br><br>Sets the values of the Vector components using the specified values.
 * 
 * @param {float} x The X component.
 * @param {float} y The Y component.
 * @param {float} z The Z component.
 */
Ovoid.Vector.prototype.set = function(x, y, z) {

  this.v[0] = x; this.v[1] = y; this.v[2] = z;
};


/**
 * Component assigment.
 * 
 * <br><br>Sets the values of the Vector components using the specified array.
 *
 * @param {float[]} a Float Array with x, y and z components.
 */
Ovoid.Vector.prototype.setv = function(a) {

  this.v.set(a);
};


/**
 * Copy method.
 *
 * <br><br>Copies a Vector.
 * 
 * @param {Vector} vect The Vector object to copy.
 */
Ovoid.Vector.prototype.copy = function(vect) {

  this.v[0] = vect.v[0];
  this.v[1] = vect.v[1];
  this.v[2] = vect.v[2];
};


/**
 * Equality test.
 * 
 * <br><br>Compares the x, y and z components of two Vector.
 *
 * @param {Vector} vect Vector to which this Coord will be compared.
 *
 * @return {bool} true if the Vectors are identical, false otherwise.
 */
Ovoid.Vector.prototype.equal = function(vect) {

  return (this.v[0] == vect.v[0] &&
          this.v[1] == vect.v[1] &&
          this.v[2] == vect.v[2]);
};


/**
 * In place subtraction.
 * 
 * <br><br>Sets this instance to the result of the subtraction of this instance by an 
 * other one.
 *
 * @param {Vector} vect The Vector object to be subtracted with this.
 */
Ovoid.Vector.prototype.subBy = function(vect) {

  this.v[0] -= vect.v[0];
  this.v[1] -= vect.v[1];
  this.v[2] -= vect.v[2];
};



/**
 * In place scalar multiplication.
 * 
 * <br><br>Sets this instance to the result of the multiplication of this instance by a
 * scalar.
 *
 * @param {float} scale Scalar value.
 */
Ovoid.Vector.prototype.scaleBy = function(scale) {

  this.v[0] *= scale;
  this.v[1] *= scale;
  this.v[2] *= scale;
};


/**
 * In place addition.
 * 
 * <br><br>Sets this instance to the result of the addition of this instance by an 
 * other one.
 *
 * @param {Vector} vect The Vector object to be added with this.
 */
Ovoid.Vector.prototype.addBy = function(vect) {

  this.v[0] += vect.v[0];
  this.v[1] += vect.v[1];
  this.v[2] += vect.v[2];
};


/**
 * In place vector cross product.
 *
 * <br><br>Sets this instance to the result of the cross product of this instance by an 
 * other one.
 * 
 * @param {Vector} vect Vector object to take the cross product with.
 */
Ovoid.Vector.prototype.crossBy = function(vect) {

  var xx = this.v[1] * vect.v[2] - this.v[2] * vect.v[1];
  var yy = this.v[2] * vect.v[0] - this.v[0] * vect.v[2];
  var zz = this.v[0] * vect.v[1] - this.v[1] * vect.v[0];
  
  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
  
};


/**
 * Operation result assignment.
 * 
 * <br><br>Sets this instance to the result of the subtraction of two others.
 *
 * @param {Vector} a Left operand of the operation.
 * @param {Vector} b Right operand of the operation.
 */
Ovoid.Vector.prototype.subOf = function(a, b) {

  this.v[0] = a.v[0] - b.v[0];
  this.v[1] = a.v[1] - b.v[1];
  this.v[2] = a.v[2] - b.v[2];
};


/**
 * Operation result assignment.
 * 
 * <br><br>Sets this instance to the result of the addition of two others.
 *
 * @param {Vector} a Left operand of the operation.
 * @param {Vector} b Right operand of the operation.
 */
Ovoid.Vector.prototype.addOf = function(a, b) {

  this.v[0] = a.v[0] + b.v[0];
  this.v[1] = a.v[1] + b.v[1];
  this.v[2] = a.v[2] + b.v[2];
};


/**
 * In place normalization.
 * 
 * <br><br>Sets this instance to its normalized.
 */
Ovoid.Vector.prototype.normalize = function() {
  /* methode la plus rapide */
  var mag = Math.sqrt(this.v[0] * this.v[0] +
                      this.v[1] * this.v[1] +
                      this.v[2] * this.v[2]);
  this.v[0] /= mag;
  this.v[1] /= mag;
  this.v[2] /= mag;
};


/**
 * Vector dot product.
 * 
 * <br><br>Returns the the dot product of this instance by an other Point or Vector.
 * 
 * param {Point|Vector} vect Point or Vector object to take the dot product with.

 * return {float} The dot product result.
 */
Ovoid.Vector.prototype.dot = function(vect) {

  return this.v[0] * vect.v[0] +
      this.v[1] * vect.v[1] +
      this.v[2] * vect.v[2];
};


/**
 * Vector size.
 *
 * <br><br>Returns the size of this instance.
 * 
 * @return {float} The Vector size.
 */
Ovoid.Vector.prototype.size = function() {

  return Math.sqrt(this.v[0] * this.v[0] +
      this.v[1] * this.v[1] +
      this.v[2] * this.v[2]);
};


/**
 * Vector magnitude.
 * 
 * <br><br>Returns the magnitude (or squared size) of this instance.
 *
 * @return {float} The Vector magnitude.
 */
Ovoid.Vector.prototype.size2 = function() {

  return this.v[0] * this.v[0] +
      this.v[1] * this.v[1] +
      this.v[2] * this.v[2];
};


/**
 * Operation result assignment.
 * 
 * <br><br>Sets this instance to the result of the cross product of two others.
 *
 * @param {Vector} a Left operand of the operation.
 * @param {Vector} b Right operand of the operation.
 */
Ovoid.Vector.prototype.crossOf = function(a, b) {

  this.v[0] = a.v[1] * b.v[2] - a.v[2] * b.v[1];
  this.v[1] = a.v[2] * b.v[0] - a.v[0] * b.v[2];
  this.v[2] = a.v[0] * b.v[1] - a.v[1] * b.v[0];
};


/**
 * Vector distance.
 * 
 * <br><br>Measures the distance in space between this instance and an orher one.
 *
 * @param {Vector} vect Vector to measure distance.
 *
 * @return {float} The distance between this instance and the specified one.
 */
Ovoid.Vector.prototype.dist = function(vect) {

  var xx = this.v[0] - vect.v[0];
  var yy = this.v[1] - vect.v[1];
  var zz = this.v[2] - vect.v[2];

  return Math.sqrt(xx * xx + yy * yy + zz * zz);
};


/**
 * Vector squared distance.
 * 
 * <br><br>Measures the squared distance in space between this instance and an orher one.
 *
 * @param {Vector} vect Vector to measure squared distance.
 *
 * @return {float} The squared distance between this instance and the specified one.
 */
Ovoid.Vector.prototype.dist2 = function(vect) {

  var xx = this.v[0] - vect.v[0];
  var yy = this.v[1] - vect.v[1];
  var zz = this.v[2] - vect.v[2];

  return xx * xx + yy * yy + zz * zz;
};


/**
 * In place transformation.
 * 
 * <br><br>Transform this instance by the specified 4x4 transformation matrix.
 *
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Vector.prototype.transform4 = function(mat4) {

  var xx = this.v[0] * mat4.m[0] +
      this.v[1] * mat4.m[4] +
      this.v[2] * mat4.m[8];

  var yy = this.v[0] * mat4.m[1] +
      this.v[1] * mat4.m[5] +
      this.v[2] * mat4.m[9];

  var zz = this.v[0] * mat4.m[2] +
      this.v[1] * mat4.m[6] +
      this.v[2] * mat4.m[10];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
};


/**
 * Transformation result assignment.
 * 
 * <br><br>Sets this instance to the result of the specified Vector transformed
 * by the given 4x4 transformation matrix.
 * 
 * @param {Vector} vect Vector for the base of transformation.
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Vector.prototype.transform4Of = function(vect, mat4) {

  this.v[0] = vect.v[0] * mat4.m[0] +
      vect.v[1] * mat4.m[4] +
      vect.v[2] * mat4.m[8];

  this.v[1] = vect.v[0] * mat4.m[1] +
      vect.v[1] * mat4.m[5] +
      vect.v[2] * mat4.m[9];

  this.v[2] = vect.v[0] * mat4.m[2] +
      vect.v[1] * mat4.m[6] +
      vect.v[2] * mat4.m[10];
};


/**
 * In place inverse transformation.
 * 
 * <br><br>Transform inverse this instance by the specified 4x4 transformation matrix.
 *
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Vector.prototype.transform4Inverse = function(mat4) {

  var xx = this.v[0] * mat4.m[0] +
      this.v[1] * mat4.m[1] +
      this.v[2] * mat4.m[2];

  var yy = this.v[0] * mat4.m[4] +
      this.v[1] * mat4.m[5] +
      this.v[2] * mat4.m[6];

  var zz = this.v[0] * mat4.m[8] +
      this.v[1] * mat4.m[9] +
      this.v[2] * mat4.m[10];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
};


/**
 * Inverse transformation result assignment.
 * 
 * <br><br>Sets this instance to the result of the specified Vector inverse transformed
 * by the given 4x4 transformation matrix.
 * 
 * @param {Vector} vect Vector for the base of transformation.
 * @param {Matrix4} mat4 4x4 transformation matrix.
 */
Ovoid.Vector.prototype.transform4InverseOf = function(vect, mat4) {

  this.v[0] = vect.v[0] * mat4.m[0] +
      vect.v[1] * mat4.m[1] +
      vect.v[2] * mat4.m[2];

  this.v[1] = vect.v[0] * mat4.m[4] +
      vect.v[1] * mat4.m[5] +
      vect.v[2] * mat4.m[6];

  this.v[2] = vect.v[0] * mat4.m[8] +
      vect.v[1] * mat4.m[9] +
      vect.v[2] * mat4.m[10];
};


/**
 * In place transformation.
 * 
 * <br><br>Transform this instance by the specified 3x3 rotation matrix.
 *
 * @param {Matrix4} mat4 3x3 rotation matrix.
 */
Ovoid.Vector.prototype.transform3 = function(mat3) {

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
 * In place inverse transformation.
 * 
 * <br><br>Transform inverse this instance by the specified 3x3 rotation matrix.
 *
 * @param {Matrix4} mat3 3x3 rotation matrix.
 */
Ovoid.Vector.prototype.transform3Inverse = function(mat3) {

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
 * Inverse transformation result assignment.
 * 
 * <br><br>Sets this instance to the result of the specified Vector inverse transformed
 * by the given 3x3 rotation matrix.
 * 
 * @param {Vector} vect Vector for the base of transformation.
 * @param {Matrix4} mat3 3x3 rotation matrix.
 */
Ovoid.Vector.prototype.transform3InverseOf = function(vect, mat3) {

  this.v[0] = vect.v[0] * mat3.m[0] +
      vect.v[1] * mat3.m[1] +
      vect.v[2] * mat3.m[2];

  this.v[1] = vect.v[0] * mat3.m[3] +
      vect.v[1] * mat3.m[4] +
      vect.v[2] * mat3.m[5];

  this.v[2] = vect.v[0] * mat3.m[6] +
      vect.v[1] * mat3.m[7] +
      vect.v[2] * mat3.m[8];
};


/**
 * Weighted transformation result addition.
 * <br>
 * <br>
 * Sets this instance to the result of the specified Point weighted transformed
 * by the given wieght and 3x3 matrix.
 * 
 * @param {Vector} vect Vector for the base of transformation.
 * @param {Matrix4} mat3 3x3 rotation matrix.
 * @param {float} w Weight.
 */
Ovoid.Vector.prototype.addWeightTransform3Of = function(vect, mat3, w) {
  
  this.v[0] += (vect.v[0] * mat3.m[0] +
      vect.v[1] * mat3.m[3] +
      vect.v[2] * mat3.m[6]) * w;

  this.v[1] += (vect.v[0] * mat3.m[1] +
      vect.v[1] * mat3.m[4] +
      vect.v[2] * mat3.m[7]) * w;

  this.v[2] += (vect.v[0] * mat3.m[2] +
      vect.v[1] * mat3.m[5] +
      vect.v[2] * mat3.m[8]) * w;
};


/**
 * In place vector reflection.
 *
 * <br><br>Reflect this instance according to the the specified normal.
 * 
 * @param {Vector} vect Normal Vector to reflect.
 */
Ovoid.Vector.prototype.reflect = function(vect) {
  
  var r = -2.0 * (this.v[0] * vect.v[0] +
    this.v[1] * vect.v[1] +
    this.v[2] * vect.v[2]);
    
  this.v[0] += vect.v[0] * r;
  this.v[1] += vect.v[1] * r;
  this.v[2] += vect.v[2] * r;
}


/**
 * Not a number test.
 * 
 * <br><br>Checks whether this instance contains a "NaN" (Not a Number) component.
 *
 * @return {bool} True if one or more component is NaN, false otherwise.
 */
Ovoid.Vector.prototype.isNaN = function() {

    return (isNaN(this.v[0]) || isNaN(this.v[1]) || isNaN(this.v[2]));
};


/**
 * Create a new array of Vector objects.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Object[]} Array of vector objects.
 */
Ovoid.Vector.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Vector());
  return array;
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Vector.prototype.toJSON = function(k) {
  
  var o = new Array();
  for(var i = 0; i < this.v.length; i++)
    o[i] = this.v[i];
  return o
};
