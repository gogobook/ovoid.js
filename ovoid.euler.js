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
 * @class Euler angle rotation object.<br><br>
 * 
 * This class provides methods for working with euler angle rotations.
 *
 * @param {float} x The X component.
 * @param {float} y The Y component.
 * @param {float} z The Z component.
 */
Ovoid.Euler = function(x, y, z) {

  this.v = new Float32Array(3);
  if (x != undefined) {
    this.v[0] = x; this.v[1] = y; this.v[2] = z;
  }
};


/**
 * Component assigment.<br><br>
 *
 * Sets the values of the Coord components using the specified values.
 * 
 * @param {float} x The X angle component.
 * @param {float} y The Y angle component.
 * @param {float} z The Z angle component.
 */
Ovoid.Euler.prototype.set = function(x, y, z) {

  this.v[0] = x; this.v[1] = y; this.v[2] = z;
};


/**
 * Component assigment from array.<br><br>
 * 
 * Sets the values of the Coord components using the specified array.
 *
 * @param {float[]} a Float Array with x, y and z components.
 */
Ovoid.Euler.prototype.setv = function(a) {

  this.v.set(a);
};


/**
 * Copy method.<br><br>
 *
 * Copies an Euler.
 *
 * @param {Euler} euler The Euler Object to copy.
 */
Ovoid.Euler.prototype.copy = function(euler) {

  this.v[0] = euler.v[0];
  this.v[1] = euler.v[1];
  this.v[2] = euler.v[2];
};


/**
 * In place addition.<br><br>
 * 
 * Sets this instance to the result of the addition of this instance by an 
 * other one.
 *
 * @param {Object} euler The Euler object to be added with this.
 */
Ovoid.Euler.prototype.addBy = function(euler) {

  this.v[0] += euler.v[0];
  this.v[1] += euler.v[1];
  this.v[2] += euler.v[2];
};


/**
 * In place addition.<br><br>
 * 
 * Sets this instance to the result of the addition of this instance by the 
 * specified x, y and z values.
 * 
 * @param {float} x The X angle component.
 * @param {float} y The Y angle component.
 * @param {float} z The Z angle component.
 */
Ovoid.Euler.prototype.addByXyx = function(x, y, z) {

  this.v[0] += x;
  this.v[1] += y;
  this.v[2] += z;
};


/**
 * Component assigment from 3x3 matrix.<br><br>
 * 
 * Sets this instance according to the given 3x3 rotation matrix.
 *
 * @param {Matrix3} mat 3x3 rotation matrix.
 * 
 * @see Ovoid.Matrix3
 */
Ovoid.Euler.prototype.fromMat3 = function(mat) {

  var cy = Math.sqrt(mat.m[0] * mat.m[0] + mat.m[1] * mat.m[1]);
  if (cy > 0.001) {
    this.v[0] = Math.atan2(mat.m[5], mat.m[8]);
    this.v[1] = Math.atan2(-mat.m[2], cy);
    this.v[2] = Math.atan2(mat.m[1], mat.m[0]);
  } else {
    this.v[0] = Math.atan2(-mat.m[7], mat.m[4]);
    this.v[1] = Math.atan2(-mat.m[2], cy);
    this.v[2] = 0;
  }
};


/**
 * Component assigment from 4x4 matrix.<br><br>
 * 
 * Sets this instance according to the given 4x4 transformation matrix.
 *
 * @param {Matrix4} mat 4x4 transformation matrix.
 * 
 * @see Ovoid.Matrix4
 */
Ovoid.Euler.prototype.fromMat4 = function(mat) {
  
  var cy = Math.sqrt(mat.m[0] * mat.m[0] + mat.m[1] * mat.m[1]);
  if (cy > 0.001) {
    this.v[0] = Math.atan2(mat.m[6], mat.m[10]);
    this.v[1] = Math.atan2(-mat.m[2], cy);
    this.v[2] = Math.atan2(mat.m[1], mat.m[0]);
  } else {
    this.v[0] = Math.atan2(-mat.m[9], mat.m[5]);
    this.v[1] = Math.atan2(-mat.m[2], cy);
    this.v[2] = 0;
  }
};


/**
 * Component conversion to Matrix4.<br><br>
 * 
 * Convert this euler instance to a 4x4 transformation matrix with
 * rotation.
 *
 * @return {Matrix4} Transformation matrix with rotation.
 */
Ovoid.Euler.prototype.asMat4 = function() {
  
  var r = new Ovoid.Matrix4();
	var ci = Math.cos(this.v[0]);
	var cj = Math.cos(this.v[1]);
	var ch = Math.cos(this.v[2]);
	var si = Math.sin(this.v[0]);
	var sj = Math.sin(this.v[1]);
	var sh = Math.sin(this.v[2]);
	var cc = ci * ch;
	var cs = ci * sh;
	var sc = si * ch;
	var ss = si * sh;
	r.m[0] = (cj * ch);
	r.m[1] = (cj * sh);
  r.m[2] = -sj;
	r.m[4] = (sj * sc - cs);
	r.m[5] = (sj * ss + cc);
	r.m[6] = (cj * si);
  r.m[8] = (sj * cc + ss);
  r.m[9] = (sj * cs - sc);
	r.m[10] = (cj * ci);
  return r;
};


/**
 * Component conversion to Quaternion.<br><br>
 * 
 * Convert this euler instance to a Quaterion rotation.
 *
 * @return {Quaternion} Quaternion rotation.
 */
Ovoid.Euler.prototype.asQuat = function() {
  
  var q = new Ovoid.Quaternion();
  
  /* methode consistant à transformer les angles euleurs en
   * axis-angles et en multipliant les quaternions x, y et z à la
   * suite. La méthode de Martin Baker est plus rapide, mais n'a pas
   * le comportement attendu.
   *
   * qx = Math.sin(rx), 0.0, 0.0, Math.cos(rx)
   * qy = 0.0, Math.sin(ry), 0.0, Math.cos(ry)
   * qz = 0.0, 0.0, Math.sin(rz), Math.cos(rz)
   * qt = qx * qy;
   * q  = qt * qz;
   *
   * Il s'agit ici de 2 multiplication de quaternion optimisé en
   * supprimant les multiplications par zero */

  var sx = Math.sin(this.v[0] * -0.5);
  var cx = Math.cos(this.v[0] * -0.5);
  var sy = Math.sin(this.v[1] * -0.5);
  var cy = Math.cos(this.v[1] * -0.5);
  var sz = Math.sin(this.v[2] * -0.5);
  var cz = Math.cos(this.v[2] * -0.5);

  /* qx * qy */
  var tx = sx * cy;
  var ty = cx * sy;
  var tz = sx * sy;
  var tw = cx * cy;

  /* qt * qz */
  q.v[0] = tx * cz + ty * sz;
  q.v[1] = ty * cz - tx * sz;
  q.v[2] = tw * sz + tz * cz;
  q.v[3] = tw * cz - tz * sz;
  
  return q;
};


/**
 * Create a new Euler objects array.
 *
 * @param {int} count Size of the array to create.
 *
 * @return {Object[]} Array of Euler objects.
 */
Ovoid.Euler.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Euler());
  return array;
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Euler.prototype.toJSON = function() {
  
  var o = new Array();
  for(var i = 0; i < this.v.length; i++)
    o[i] = this.v[i];
  return o
};
