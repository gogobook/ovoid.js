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
 * Create a 3x3 Matrix object.
 *
 * @class 3x3 Matrix object.
 * 
 * <br><br>This class provides an implementation of a 3x3 matrix.
 *
 * @param {float[]} array Array of nine values in row major.
 */
Ovoid.Matrix3 = function(array) {

  this.m = new Float32Array(9);
  if (array != null && array != undefined)
  {
    this.m[0] = array[0];
    this.m[1] = array[1];
    this.m[2] = array[2];
    this.m[3] = array[3];
    this.m[4] = array[4];
    this.m[5] = array[5];
    this.m[6] = array[6];
    this.m[7] = array[7];
    this.m[8] = array[8];
  }
  else
  {
    this.m[0] = this.m[4] = this[8] = 1.0;
  }
};


/**
 * Component assigment.
 *
 * <br><br>Sets the values of the matrix using the specified Array.
 *
 * @param {float[]} array Array of nine values in row major.
 */
Ovoid.Matrix3.prototype.setv = function(array) {

  this.m.set(array);
};


/**
 * Copy method.
 *
 * <br><br>Copies an Matrix3.
 *
 * @param {Matrix3} mat Matrix3 object to copy.
 */
Ovoid.Matrix3.prototype.copy = function(mat) {

  this.m.set(mat.m);
};


/**
 * In place multiplication.
 * 
 * <br><br>Sets this instance to the result of the multiplication of this instance by an 
 * other one.
 *
 * @param {Matrix3} mat The Matrix3 object to be multiplied with this.
 */
Ovoid.Matrix3.prototype.multBy = function(mat) {

  var result = new Float32Array(9);

  result[0] = this.m[0] * mat.m[0] +
              this.m[1] * mat.m[3] +
              this.m[2] * mat.m[6];

  result[1] = this.m[0] * mat.m[1] +
              this.m[1] * mat.m[4] +
              this.m[2] * mat.m[7];

  result[2] = this.m[0] * mat.m[2] +
              this.m[1] * mat.m[5] +
              this.m[2] * mat.m[8];

  result[3] = this.m[3] * mat.m[0] +
              this.m[4] * mat.m[3] +
              this.m[5] * mat.m[6];

  result[4] = this.m[3] * mat.m[1] +
              this.m[4] * mat.m[4] +
              this.m[5] * mat.m[7];

  result[5] = this.m[3] * mat.m[2] +
              this.m[4] * mat.m[5] +
              this.m[5] * mat.m[8];

  result[6] = this.m[6] * mat.m[0] +
              this.m[7] * mat.m[3] +
              this.m[8] * mat.m[6];

  result[7] = this.m[6] * mat.m[1] +
              this.m[7] * mat.m[4] +
              this.m[8] * mat.m[7];

  result[8] = this.m[6] * mat.m[2] +
              this.m[7] * mat.m[5] +
              this.m[8] * mat.m[8];

  this.m[0] = result[0];
  this.m[1] = result[1];
  this.m[2] = result[2];
  this.m[3] = result[3];
  this.m[4] = result[4];
  this.m[5] = result[5];
  this.m[6] = result[6];
  this.m[7] = result[7];
  this.m[8] = result[8];
};


/**
 * Operation result assignment.
 * 
 * <br><br>Sets this instance to the result of the multiplication of two others.
 *
 * @param {Matrix3} a Left operand of the operation.
 * @param {Matrix3} b Right operand of the operation.
 */
Ovoid.Matrix3.prototype.multOf = function(a, b) {

  this.m[0] = a.m[0] * b.m[0] + a.m[1] *
              b.m[3] + a.m[2] * b.m[6];

  this.m[1] = a.m[0] * b.m[1] + a.m[1] *
              b.m[4] + a.m[2] * b.m[7];

  this.m[2] = a.m[0] * b.m[2] + a.m[1] *
              b.m[5] + a.m[2] * b.m[8];

  this.m[3] = a.m[3] * b.m[0] + a.m[4] *
              b.m[3] + a.m[5] * b.m[6];

  this.m[4] = a.m[3] * b.m[1] + a.m[4] *
              b.m[4] + a.m[5] * b.m[7];

  this.m[5] = a.m[3] * b.m[2] + a.m[4] *
              b.m[5] + a.m[5] * b.m[8];

  this.m[6] = a.m[6] * b.m[0] + a.m[7] *
              b.m[3] + a.m[8] * b.m[6];

  this.m[7] = a.m[6] * b.m[1] + a.m[7] *
              b.m[4] + a.m[8] * b.m[7];

  this.m[8] = a.m[6] * b.m[2] + a.m[7] *
              b.m[5] + a.m[8] * b.m[8];
};


/**
 * Component assigment from 4x4 matrix.
 * 
 * <br><br>Sets this instance's components according to the given 4x4 matrix.
 *
 * @param {Matrix4} mat Matrix4 object.
 */
Ovoid.Matrix3.prototype.fromMat4 = function(mat) {

  this.m[0] = mat.m[0];
  this.m[1] = mat.m[1];
  this.m[2] = mat.m[2];
  this.m[3] = mat.m[4];
  this.m[4] = mat.m[5];
  this.m[5] = mat.m[6];
  this.m[6] = mat.m[8];
  this.m[7] = mat.m[9];
  this.m[8] = mat.m[10];
};


/**
 * In place transposition.
 * 
 * <br><br>Sets this instance to its transposed.
 */
Ovoid.Matrix3.prototype.toTranspose = function() {

  var mswap;
  mswap = this.m[1];
  this.m[1] = this.m[3];
  this.m[3] = mswap;
  mswap = this.m[2];
  this.m[2] = this.m[6];
  this.m[6] = mswap;
  mswap = this.m[5];
  this.m[5] = this.m[7];
  this.m[7] = mswap;
};


/**
 * In place inversion.
 * 
 * <br><br>Sets this instance to its inverse.
 */
Ovoid.Matrix3.prototype.toInverse = function() {

  var fdet = 1.0 / (this.m[0] *
                    (this.m[4] * this.m[8] - this.m[7] * this.m[5]) -
                    this.m[1] *
                    (this.m[3] * this.m[8] - this.m[6] * this.m[5]) +
                    this.m[2] *
                    (this.m[3] * this.m[7] - this.m[6] * this.m[4]));

  var result = new Float32Array(9);

  result[0] = (this.m[4] * this.m[8] - this.m[7] * this.m[5]) * fdet;
  result[1] = -(this.m[1] * this.m[8] - this.m[7] * this.m[2]) * fdet;
  result[2] = (this.m[1] * this.m[5] - this.m[4] * this.m[2]) * fdet;
  result[3] = -(this.m[3] * this.m[8] - this.m[6] * this.m[5]) * fdet;
  result[4] = (this.m[0] * this.m[8] - this.m[6] * this.m[2]) * fdet;
  result[5] = -(this.m[0] * this.m[5] - this.m[3] * this.m[2]) * fdet;
  result[6] = (this.m[3] * this.m[7] - this.m[6] * this.m[4]) * fdet;
  result[7] = -(this.m[0] * this.m[7] - this.m[6] * this.m[1]) * fdet;
  result[8] = (this.m[0] * this.m[4] - this.m[3] * this.m[1]) * fdet;

  this.m[0] = result[0];
  this.m[1] = result[1];
  this.m[2] = result[2];
  this.m[3] = result[3];
  this.m[4] = result[4];
  this.m[5] = result[5];
  this.m[6] = result[6];
  this.m[7] = result[7];
  this.m[8] = result[8];
};


/**
 * In place transformation inversion.
 * 
 * <br><br>Sets this instance to its inverse transformation matrix.
 */
Ovoid.Matrix3.prototype.toInverseTransform = function() {

  var mswap;
  mswap = this.m[1];
  this.m[1] = this.m[3];
  this.m[3] = mswap;
  mswap = this.m[2];
  this.m[2] = this.m[6];
  this.m[6] = mswap;
  mswap = this.m[5];
  this.m[5] = this.m[7];
  this.m[7] = mswap;
};


/**
 * In place conversion to normal matrix.
 * 
 * <br><br>Sets this instance to its corresponding normal transformation matrix.
 */
Ovoid.Matrix3.prototype.toNormalTransform = function() {

  var mag2, mag;

  mag2 = this.m[0] * this.m[0] + this.m[1] *
          this.m[1] + this.m[2] * this.m[2];

  if (Math.abs(mag2 - 1.0) > 0.0001)
  {
    mag = 1.0 / Math.sqrt(mag2);
    this.m[0] *= mag; this.m[1] *= mag; this.m[2] *= mag;
  }

  mag2 = this.m[3] * this.m[3] + this.m[4] *
          this.m[4] + this.m[5] * this.m[5];

  if (Math.abs(mag2 - 1.0) > 0.0001)
  {
    mag = 1.0 / Math.sqrt(mag2);
    this.m[3] *= mag; this.m[4] *= mag; this.m[5] *= mag;
  }

  mag2 = this.m[6] * this.m[6] + this.m[7] *
          this.m[7] + this.m[8] * this.m[8];

  if (Math.abs(mag2 - 1.0) > 0.0001)
  {
    mag = 1.0 / Math.sqrt(mag2);
    this.m[6] *= mag; this.m[7] *= mag; this.m[8] *= mag;
  }
};


/**
 * Create a new array of Matrix3 objects.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Object[]} Array of matrix3 objects.
 */
Ovoid.Matrix3.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Matrix3());
  return array;
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Matrix3.prototype.toJSON = function() {
  
  var o = new Array();
  for(var i = 0; i < this.m.length; i++)
    o[i] = this.m[i];
  return o
};
