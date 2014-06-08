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
 * @class 4x4 Matrix object.<br><br>
 * 
 * This class provides an implementation of a 4x4 matrix.
 *
 * @param {float[]} array Array of sixteen values in row major.
 */
Ovoid.Matrix4 = function(array) {

  this.m = new Float32Array(16);
  if (array != null && array != undefined)
  {
    this.m[0] = array[0]; this.m[1] = array[1];
    this.m[2] = array[2]; this.m[3] = array[3];

    this.m[4] = array[4]; this.m[5] = array[5];
    this.m[6] = array[6]; this.m[7] = array[7];

    this.m[8] = array[8]; this.m[9] = array[9];
    this.m[10] = array[10]; this.m[11] = array[11];

    this.m[12] = array[12]; this.m[13] = array[13];
    this.m[14] = array[14]; this.m[15] = array[15];
  }
  else
  {
    this.m[0] = this.m[5] = this.m[10] = this.m[15] = 1.0;
  }
};


/**
 * Component assigment. <br><br>
 *
 * Sets the values of the matrix using the specified Array.
 *
 * @param {float[]} array Array of sixteen values in row major.
 */
Ovoid.Matrix4.prototype.setv = function(array) {

  this.m.set(array);
};


/**
 * Copy method.<br><br>
 *
 * Copies an Matrix4.
 *
 * @param {Matrix4} mat Matrix4 object to copy.
 */
Ovoid.Matrix4.prototype.copy = function(mat) {

  this.m.set(mat.m);
};


/**
 * In place multiplication.<br><br>
 * 
 * Sets this instance to the result of the multiplication of this instance by an 
 * other one.
 *
 * @param {Matrix4} mat The Matrix4 object to be multiplied with this.
 */
Ovoid.Matrix4.prototype.multBy = function(mat) {

  var result = new Array(16);
  result[0] = this.m[0] * mat.m[0] + this.m[1] * mat.m[4] +
      this.m[2] * mat.m[8] + this.m[3] * mat.m[12];

  result[1] = this.m[0] * mat.m[1] + this.m[1] * mat.m[5] +
      this.m[2] * mat.m[9] + this.m[3] * mat.m[13];

  result[2] = this.m[0] * mat.m[2] + this.m[1] * mat.m[6] +
      this.m[2] * mat.m[10] + this.m[3] * mat.m[14];

  result[3] = this.m[0] * mat.m[3] + this.m[1] * mat.m[7] +
      this.m[2] * mat.m[11] + this.m[3] * mat.m[15];

  result[4] = this.m[4] * mat.m[0] + this.m[5] * mat.m[4] +
      this.m[6] * mat.m[8] + this.m[7] * mat.m[12];

  result[5] = this.m[4] * mat.m[1] + this.m[5] * mat.m[5] +
      this.m[6] * mat.m[9] + this.m[7] * mat.m[13];

  result[6] = this.m[4] * mat.m[2] + this.m[5] * mat.m[6] +
      this.m[6] * mat.m[10] + this.m[7] * mat.m[14];

  result[7] = this.m[4] * mat.m[3] + this.m[5] * mat.m[7] +
      this.m[6] * mat.m[11] + this.m[7] * mat.m[15];

  result[8] = this.m[8] * mat.m[0] + this.m[9] * mat.m[4] +
      this.m[10] * mat.m[8] + this.m[11] * mat.m[12];

  result[9] = this.m[8] * mat.m[1] + this.m[9] * mat.m[5] +
      this.m[10] * mat.m[9] + this.m[11] * mat.m[13];

  result[10] = this.m[8] * mat.m[2] + this.m[9] * mat.m[6] +
      this.m[10] * mat.m[10] + this.m[11] * mat.m[14];

  result[11] = this.m[8] * mat.m[3] + this.m[9] * mat.m[7] +
      this.m[10] * mat.m[11] + this.m[11] * mat.m[15];

  result[12] = this.m[12] * mat.m[0] + this.m[13] * mat.m[4] +
      this.m[14] * mat.m[8] + this.m[15] * mat.m[12];

  result[13] = this.m[12] * mat.m[1] + this.m[13] * mat.m[5] +
      this.m[14] * mat.m[9] + this.m[15] * mat.m[13];

  result[14] = this.m[12] * mat.m[2] + this.m[13] * mat.m[6] +
      this.m[14] * mat.m[10] + this.m[15] * mat.m[14];

  result[15] = this.m[12] * mat.m[3] + this.m[13] * mat.m[7] +
      this.m[14] * mat.m[11] + this.m[15] * mat.m[15];

  this.m[0] = result[0];
  this.m[1] = result[1];
  this.m[2] = result[2];
  this.m[3] = result[3];
  this.m[4] = result[4];
  this.m[5] = result[5];
  this.m[6] = result[6];
  this.m[7] = result[7];
  this.m[8] = result[8];
  this.m[9] = result[9];
  this.m[10] = result[10];
  this.m[11] = result[11];
  this.m[12] = result[12];
  this.m[13] = result[13];
  this.m[14] = result[14];
  this.m[15] = result[15];
};


/**
 * Multiplication result assignment.<br><br>
 * 
 * Sets this instance to the result of the multiplication of two others.
 *
 * @param {Matrix4} a Left operand of the operation.
 * @param {Matrix4} b Right operand of the operation.
 */
Ovoid.Matrix4.prototype.multOf = function(a, b) {

  this.m[0] = a.m[0] * b.m[0] + a.m[1] * b.m[4] +
      a.m[2] * b.m[8] + a.m[3] * b.m[12];

  this.m[1] = a.m[0] * b.m[1] + a.m[1] * b.m[5] +
      a.m[2] * b.m[9] + a.m[3] * b.m[13];

  this.m[2] = a.m[0] * b.m[2] + a.m[1] * b.m[6] +
      a.m[2] * b.m[10] + a.m[3] * b.m[14];

  this.m[3] = a.m[0] * b.m[3] + a.m[1] * b.m[7] +
      a.m[2] * b.m[11] + a.m[3] * b.m[15];

  this.m[4] = a.m[4] * b.m[0] + a.m[5] * b.m[4] +
      a.m[6] * b.m[8] + a.m[7] * b.m[12];

  this.m[5] = a.m[4] * b.m[1] + a.m[5] * b.m[5] +
      a.m[6] * b.m[9] + a.m[7] * b.m[13];

  this.m[6] = a.m[4] * b.m[2] + a.m[5] * b.m[6] +
      a.m[6] * b.m[10] + a.m[7] * b.m[14];

  this.m[7] = a.m[4] * b.m[3] + a.m[5] * b.m[7] +
      a.m[6] * b.m[11] + a.m[7] * b.m[15];

  this.m[8] = a.m[8] * b.m[0] + a.m[9] * b.m[4] +
      a.m[10] * b.m[8] + a.m[11] * b.m[12];

  this.m[9] = a.m[8] * b.m[1] + a.m[9] * b.m[5] +
      a.m[10] * b.m[9] + a.m[11] * b.m[13];

  this.m[10] = a.m[8] * b.m[2] + a.m[9] * b.m[6] +
      a.m[10] * b.m[10] + a.m[11] * b.m[14];

  this.m[11] = a.m[8] * b.m[3] + a.m[9] * b.m[7] +
      a.m[10] * b.m[11] + a.m[11] * b.m[15];

  this.m[12] = a.m[12] * b.m[0] + a.m[13] * b.m[4] +
      a.m[14] * b.m[8] + a.m[15] * b.m[12];

  this.m[13] = a.m[12] * b.m[1] + a.m[13] * b.m[5] +
      a.m[14] * b.m[9] + a.m[15] * b.m[13];

  this.m[14] = a.m[12] * b.m[2] + a.m[13] * b.m[6] +
      a.m[14] * b.m[10] + a.m[15] * b.m[14];

  this.m[15] = a.m[12] * b.m[3] + a.m[13] * b.m[7] +
      a.m[14] * b.m[11] + a.m[15] * b.m[15];
};


/**
 * Component assigment from 3x3 matrix.<br><br>
 * 
 * Sets this instance's components according to the given 3x3 matrix.
 *
 * @param {Matrix3} mat Matrix3 object.
 */
Ovoid.Matrix4.prototype.fromMatrix3 = function(mat) {

  this.m[0] = mat.m[0];
  this.m[1] = mat.m[1];
  this.m[2] = mat.m[2];
  this.m[4] = mat.m[3];
  this.m[5] = mat.m[4];
  this.m[6] = mat.m[5];
  this.m[8] = mat.m[6];
  this.m[9] = mat.m[7];
  this.m[10] = mat.m[8];
};


/**
 * In place transposition.<br><br>
 * 
 * Sets this instance to its transposed.
 */
Ovoid.Matrix4.prototype.toTranspose = function() {

  var mswap;
  mswap = this.m[1];
  this.m[1] = this.m[4];
  this.m[4] = mswap;
  mswap = this.m[2];
  this.m[2] = this.m[8];
  this.m[8] = mswap;
  mswap = this.m[6];
  this.m[6] = this.m[9];
  this.m[9] = mswap;
  mswap = this.m[3];
  this.m[3] = this.m[12];
  this.m[12] = mswap;
  mswap = this.m[7];
  this.m[7] = this.m[13];
  this.m[13] = mswap;
  mswap = this.m[11];
  this.m[11] = this.m[14];
  this.m[14] = mswap;
};


/**
 * In place inversion.<br><br>
 * 
 * Sets this instance to its inverse.
 */
Ovoid.Matrix4.prototype.toInverse = function() {

  var tempf = new Array(12);
  tempf[0] = this.m[0] * this.m[5] - this.m[1] * this.m[4];
  tempf[1] = this.m[0] * this.m[6] - this.m[2] * this.m[4];
  tempf[2] = this.m[0] * this.m[7] - this.m[3] * this.m[4];
  tempf[3] = this.m[1] * this.m[6] - this.m[2] * this.m[5];
  tempf[4] = this.m[1] * this.m[7] - this.m[3] * this.m[5];
  tempf[5] = this.m[2] * this.m[7] - this.m[3] * this.m[6];
  tempf[11] = this.m[8] * this.m[13] - this.m[9] * this.m[12];
  tempf[10] = this.m[8] * this.m[14] - this.m[10] * this.m[12];
  tempf[9] = this.m[8] * this.m[15] - this.m[11] * this.m[12];
  tempf[8] = this.m[9] * this.m[14] - this.m[10] * this.m[13];
  tempf[7] = this.m[9] * this.m[15] - this.m[11] * this.m[13];
  tempf[6] = this.m[10] * this.m[15] - this.m[11] * this.m[14];

  var fdet = 1.0 / (tempf[0] * tempf[6] - tempf[1] * tempf[7] +
      tempf[2] * tempf[8] + tempf[3] * tempf[9] -
      tempf[4] * tempf[10] + tempf[5] * tempf[11]);

  var result = new Array(16);
  result[0] = + this.m[5] * tempf[6] -
      this.m[6] * tempf[7] +
      this.m[7] * tempf[8];

  result[4] = - this.m[4] * tempf[6] +
      this.m[6] * tempf[9] -
      this.m[7] * tempf[10];

  result[8] = + this.m[4] * tempf[7] -
      this.m[5] * tempf[9] +
      this.m[7] * tempf[11];

  result[12] = - this.m[4] * tempf[8] +
      this.m[5] * tempf[10] -
      this.m[6] * tempf[11];

  result[1] = - this.m[1] * tempf[6] +
      this.m[2] * tempf[7] -
      this.m[3] * tempf[8];

  result[5] = + this.m[0] * tempf[6] -
      this.m[2] * tempf[9] +
      this.m[3] * tempf[10];

  result[9] = - this.m[0] * tempf[7] +
      this.m[1] * tempf[9] -
      this.m[3] * tempf[11];

  result[13] = + this.m[0] * tempf[8] -
      this.m[1] * tempf[10] +
      this.m[2] * tempf[11];

  result[2] = + this.m[13] * tempf[5] -
      this.m[14] * tempf[4] +
      this.m[15] * tempf[3];

  result[6] = - this.m[12] * tempf[5] +
      this.m[14] * tempf[2] -
      this.m[15] * tempf[1];

  result[10] = + this.m[12] * tempf[4] -
      this.m[13] * tempf[2] +
      this.m[15] * tempf[0];

  result[14] = - this.m[12] * tempf[3] +
      this.m[13] * tempf[1] -
      this.m[14] * tempf[0];
  result[3] = - this.m[9] * tempf[5] +
      this.m[10] * tempf[4] -
      this.m[11] * tempf[3];

  result[7] = + this.m[8] * tempf[5] -
      this.m[10] * tempf[2] +
      this.m[11] * tempf[1];

  result[11] = - this.m[8] * tempf[4] +
      this.m[9] * tempf[2] -
      this.m[11] * tempf[0];

  result[15] = + this.m[8] * tempf[3] -
      this.m[9] * tempf[1] +
      this.m[10] * tempf[0];

  result[0] *= fdet;
  result[1] *= fdet;
  result[2] *= fdet;
  result[3] *= fdet;
  result[4] *= fdet;
  result[5] *= fdet;
  result[6] *= fdet;
  result[7] *= fdet;
  result[8] *= fdet;
  result[9] *= fdet;
  result[10] *= fdet;
  result[11] *= fdet;
  result[12] *= fdet;
  result[13] *= fdet;
  result[14] *= fdet;
  result[15] *= fdet;

  this.m[0] = result[0];
  this.m[1] = result[1];
  this.m[2] = result[2];
  this.m[3] = result[3];
  this.m[4] = result[4];
  this.m[5] = result[5];
  this.m[6] = result[6];
  this.m[7] = result[7];
  this.m[8] = result[8];
  this.m[9] = result[9];
  this.m[10] = result[10];
  this.m[11] = result[11];
  this.m[12] = result[12];
  this.m[13] = result[13];
  this.m[14] = result[14];
  this.m[15] = result[15];
};


/**
 * In place transformation inversion.<br><br>
 * 
 * Sets this instance to its inverse transformation matrix.
 */
Ovoid.Matrix4.prototype.toInverseTransform = function() {

  /* inversion de matrice plus économique que l'inversion classique
   * specialement adapté pour les matrices de transformation affine */

  /* transpose de la partie rotation */
  var mswap;
  mswap = this.m[1];
  this.m[1] = this.m[4];
  this.m[4] = mswap;
  mswap = this.m[2];
  this.m[2] = this.m[8];
  this.m[8] = mswap;
  mswap = this.m[6];
  this.m[6] = this.m[9];
  this.m[9] = mswap;

  /* inversion des translations et transformation par l'inverse
   * rotation */
  var x = -this.m[12]; var y = -this.m[13]; var z = -this.m[14];
  this.m[12] = x * this.m[0] + y * this.m[4] + z * this.m[8];
  this.m[13] = x * this.m[1] + y * this.m[5] + z * this.m[9];
  this.m[14] = x * this.m[2] + y * this.m[6] + z * this.m[10];
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Matrix4.prototype.toJSON = function() {
  
  var o = new Array();
  for(var i = 0; i < this.m.length; i++)
    o[i] = this.m[i];
  return o
};
