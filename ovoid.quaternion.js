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
 * Create a Quaternion object.
 *
 * @class Quaternion object.
 * 
 * <br><br>This class provides an implementation of a quaternion.
 *
 * @param {float} x The X quaternion component.
 * @param {float} y The Y quaternion component.
 * @param {float} z The Z quaternion component.
 * @param {float} w The W quaternion component.
 */
Ovoid.Quaternion = function(x, y, z, w) {

  this.v = new Float32Array(4);
  if (x != undefined) {
    this.v[0] = x; this.v[1] = y; this.v[2] = z; this.v[3] = w;
  }
};


/**
 * Component assigment.
 *
 * <br><br>Sets the values of the Quaternion components using the specified values.
 * 
 * @param {float} x The X quaternion component.
 * @param {float} y The Y quaternion component.
 * @param {float} z The Z quaternion component.
 * @param {float} w The W quaternion component.
 */
Ovoid.Quaternion.prototype.set = function(x, y, z, w) {

  this.v[0] = x; this.v[1] = y; this.v[2] = z; this.v[3] = w;
};


/**
 * Component assigment.
 * 
 * <br><br>Sets the values of the Quaternion components using the specified array.
 *
 * @param {float[]} a Float Array with x, y, z and w components.
 */
Ovoid.Quaternion.prototype.setv = function(a) {

  this.v.set(a);
};


/**
 * Copy method.
 *
 * <br><br>Copies a Quaternion.
 * 
 * @param {Quaternion} quat The Quaternion object to copy.
 */
Ovoid.Quaternion.prototype.copy = function(quat) {

  this.v.set(quat.v);
};


/**
 * In place multiplication.
 * 
 * <br><br>Sets this instance to the result of the multiplication of this instance by an 
 * other one.
 *
 * @param {Quaternion} quat The Quaternion object to be multiplied with this.
 */
Ovoid.Quaternion.prototype.multBy = function(quat) {

  var xx = this.v[3] * quat.v[0] +
      this.v[0] * quat.v[3] +
      this.v[1] * quat.v[2] -
      this.v[2] * quat.v[1];

  var yy = this.v[3] * quat.v[1] +
      this.v[1] * quat.v[3] +
      this.v[2] * quat.v[0] -
      this.v[0] * quat.v[2];

  var zz = this.v[3] * quat.v[2] +
      this.v[2] * quat.v[3] +
      this.v[0] * quat.v[1] -
      this.v[1] * quat.v[0];

  var ww = this.v[3] * quat.v[3] -
      this.v[0] * quat.v[0] -
      this.v[1] * quat.v[1] -
      this.v[2] * quat.v[2];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
  this.v[3] = ww;
};


/**
 * In place multiplication.
 * 
 * <br><br>Sets this instance to the result of the multiplication of this instance by 
 * the specified quaternion component values.
 *
 * @param {float} x The X quaternion component.
 * @param {float} y The Y quaternion component.
 * @param {float} z The Z quaternion component.
 * @param {float} w The W quaternion component.
 */
Ovoid.Quaternion.prototype.multByXyzw = function(x, y, z, w) {

  var xx = this.v[3] * x + this.v[0] * w +
      this.v[1] * z - this.v[2] * y;

  var yy = this.v[3] * y + this.v[1] * w +
      this.v[2] * x - this.v[0] * z;

  var zz = this.v[3] * z + this.v[2] * w +
      this.v[0] * y - this.v[1] * x;

  var ww = this.v[3] * w - this.v[0] * x -
      this.v[1] * y - this.v[2] * z;

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
  this.v[3] = ww;
};


/**
 * Operation result assignment.
 * 
 * <br><br>Sets this instance to the result of the multiplication of two others.
 *
 * @param {Quaternion} a Left operand of the operation.
 * @param {Quaternion} b Right operand of the operation.
 */
Ovoid.Quaternion.prototype.multOf = function(a, b) {

  this.v[0] = a.v[3] * b.v[0] +
              a.v[0] * b.v[3] +
              a.v[1] * b.v[2] -
              a.v[2] * b.v[1];

  this.v[1] = a.v[3] * b.v[1] +
              a.v[1] * b.v[3] +
              a.v[2] * b.v[0] -
              a.v[0] * b.v[2];

  this.v[2] = a.v[3] * b.v[2] +
              a.v[2] * b.v[3] +
              a.v[0] * b.v[1] -
              a.v[1] * b.v[0];

  this.v[3] = a.v[3] * b.v[3] -
              a.v[0] * b.v[0] -
              a.v[1] * b.v[1] -
              a.v[2] * b.v[2];
};


/**
 * In place swapped multiplication.
 * 
 * <br><br>Sets this instance to the result of the multiplication of the specified 
 * Quaternion by this instance (The left operand become the right operand and
 * vice versa).
 * 
 * @param {Quaternion} quat The Quaternion object to be multiplied with this.
 */
Ovoid.Quaternion.prototype.multSwapBy = function(quat) {

  /* mult Reverse, une maniere de dire qu'on applique la
   * multplitication qb * q plutot que q * qb, il en resulte
   * une rotation selon l'axe locale */

  var xx = quat.v[3] * this.v[0] +
      quat.v[0] * this.v[3] +
      quat.v[1] * this.v[2] -
      quat.v[2] * this.v[1];

  var yy = quat.v[3] * this.v[1] +
      quat.v[1] * this.v[3] +
      quat.v[2] * this.v[0] -
      quat.v[0] * this.v[2];

  var zz = quat.v[3] * this.v[2] +
      quat.v[2] * this.v[3] +
      quat.v[0] * this.v[1] -
      quat.v[1] * this.v[0];

  var ww = quat.v[3] * this.v[3] -
      quat.v[0] * this.v[0] -
      quat.v[1] * this.v[1] -
      quat.v[2] * this.v[2];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
  this.v[3] = ww;
};


/**
 * In place swapped multiplication.
 * 
 * <br><br>Sets this instance to the result of the multiplication of the specified 
 * quaternion component values by this instance (The left operand become the 
 * right operand and vice versa).
 *
 * @param {float} x The X quaternion component.
 * @param {float} y The Y quaternion component.
 * @param {float} z The Z quaternion component.
 * @param {float} w The W quaternion component.
 */
Ovoid.Quaternion.prototype.multSwapByXyz = function(x, y, z, w) {

  /* mult Reverse, une maniere de dire qu'on applique la
   * multplitication qb * q plutot que q * qb, il en resulte
   * une rotation selon l'axe locale */

  var xx = w * this.v[0] + x * this.v[3] +
      y * this.v[2] - z * this.v[1];

  var yy = w * this.v[1] + y * this.v[3] +
      z * this.v[0] - x * this.v[2];

  var zz = w * this.v[2] + z * this.v[3] +
      x * this.v[1] - y * this.v[0];

  var ww = w * this.v[3] - x * this.v[0] -
      y * this.v[1] - z * this.v[2];

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
  this.v[3] = ww;
};


/**
 * In place rotation.
 * 
 * <br><br>Sets this instance to the result of the rotation of this instance by the 
 * specified Euler object.
 * 
 * @param {Euler} euler Euler object to rotate this.
 *
 * @see Ovoid.Euler
 */
Ovoid.Quaternion.prototype.rotateBy = function(euler) {

  var sx = Math.sin(euler.v[0] * -0.5);
  var cx = Math.cos(euler.v[0] * -0.5);
  var sy = Math.sin(euler.v[1] * -0.5);
  var cy = Math.cos(euler.v[1] * -0.5);
  var sz = Math.sin(euler.v[2] * -0.5);
  var cz = Math.cos(euler.v[2] * -0.5);

  /* qx * qy */
  var tx = sx * cy;
  var ty = cx * sy;
  var tz = sx * sy;
  var tw = cx * cy;

  /* qt * qz */
  var ex = tx * cz + ty * sz;
  var ey = ty * cz - tx * sz;
  var ez = tw * sz + tz * cz;
  var ew = tw * cz - tz * sz;

  var xx = this.v[3] * ex + this.v[0] * ew +
      this.v[1] * ez - this.v[2] * ey;

  var yy = this.v[3] * ey + this.v[1] * ew +
      this.v[2] * ex - this.v[0] * ez;

  var zz = this.v[3] * ez + this.v[2] * ew +
      this.v[0] * ey - this.v[1] * ex;

  var ww = this.v[3] * ew - this.v[0] * ex -
      this.v[1] * ey - this.v[2] * ez;

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
  this.v[3] = ww;
};


/**
 * In place rotation.
 * 
 * <br><br>Sets this instance to the result of the rotation of this instance by the 
 * specified euler angles.
 *
 * @param {float} rx The X Euler component.
 * @param {float} ry The Y Euler component.
 * @param {float} rz The Z Euler component.
 */
Ovoid.Quaternion.prototype.rotateByXyz = function(rx, ry, rz) {

  var sx = Math.sin(rx * -0.5);
  var cx = Math.cos(rx * -0.5);
  var sy = Math.sin(ry * -0.5);
  var cy = Math.cos(ry * -0.5);
  var sz = Math.sin(rz * -0.5);
  var cz = Math.cos(rz * -0.5);

  /* qx * qy */
  var tx = sx * cy;
  var ty = cx * sy;
  var tz = sx * sy;
  var tw = cx * cy;

  /* qt * qz */
  var ex = tx * cz + ty * sz;
  var ey = ty * cz - tx * sz;
  var ez = tw * sz + tz * cz;
  var ew = tw * cz - tz * sz;

  var xx = this.v[3] * ex + this.v[0] * ew +
      this.v[1] * ez - this.v[2] * ey;

  var yy = this.v[3] * ey + this.v[1] * ew +
      this.v[2] * ex - this.v[0] * ez;

  var zz = this.v[3] * ez + this.v[2] * ew +
      this.v[0] * ey - this.v[1] * ex;

  var ww = this.v[3] * ew - this.v[0] * ex -
      this.v[1] * ey - this.v[2] * ez;

  this.v[0] = xx;
  this.v[1] = yy;
  this.v[2] = zz;
  this.v[3] = ww;
};



/** 
 * In place swapped rotation.
 * 
 * <br><br>Sets this instance to the quaternion result of the rotation of the specified 
 * Euler object by this instance (The left operand become the right operand and 
 * vice versa).
 * 
 * @param {Euler} euler Euler Object to be rotated with this.
 *
 * @see Ovoid.Euler
 */
Ovoid.Quaternion.prototype.rotateSwapBy = function(euler) {

  /* rotate swapp by euler, une manière de dire qu'on applique
   * la rotation "q(euler) * q" plutot que "q * q(euler)" c'est
   * utile pour obtenir une rotation en "espace local" */

  var sx = Math.sin(euler.v[0] * -0.5);
  var cx = Math.cos(euler.v[0] * -0.5);
  var sy = Math.sin(euler.v[1] * -0.5);
  var cy = Math.cos(euler.v[1] * -0.5);
  var sz = Math.sin(euler.v[2] * -0.5);
  var cz = Math.cos(euler.v[2] * -0.5);

  /* qx * qy */
  var tx = sx * cy;
  var ty = cx * sy;
  var tz = sx * sy;
  var tw = cx * cy;

  /* qt * qz */
  var ex = tx * cz + ty * sz;
  var ey = ty * cz - tx * sz;
  var ez = tw * sz + tz * cz;
  var ew = tw * cz - tz * sz;

  var qx = this.v[0];
  var qy = this.v[1];
  var qz = this.v[2];
  var qw = this.v[3];

  this.v[0] = ew * qx + ex * qw + ey * qz - ez * qy;
  this.v[1] = ew * qy + ey * qw + ez * qx - ex * qz;
  this.v[2] = ew * qz + ez * qw + ex * qy - ey * qx;
  this.v[3] = ew * qw - ex * qx - ey * qy - ez * qz;

};


/**
 * In place swapped rotation.
 * 
 * <br><br>Sets this instance to the quaternion result of the rotation of the specified 
 * euler angles by this instance (The left operand become the right operand and 
 * vice versa).
 * 
 * @param {float} rx The X Euler component.
 * @param {float} ry The Y Euler component.
 * @param {float} rz The Z Euler component.
 */
Ovoid.Quaternion.prototype.rotateSwapByXyz = function(rx, ry, rz) {

  /* rotate switch by euler, une manière de dire qu'on applique
   * la rotation "q(euler) * q" plutot que "q * q(euler)" c'est
   * utile pour obtenir une rotation en "espace local" */

  var sx = Math.sin(rx * -0.5);
  var cx = Math.cos(rx * -0.5);
  var sy = Math.sin(ry * -0.5);
  var cy = Math.cos(ry * -0.5);
  var sz = Math.sin(rz * -0.5);
  var cz = Math.cos(rz * -0.5);

  /* qx * qy */
  var tx = sx * cy;
  var ty = cx * sy;
  var tz = sx * sy;
  var tw = cx * cy;

  /* qt * qz */
  var ex = tx * cz + ty * sz;
  var ey = ty * cz - tx * sz;
  var ez = tw * sz + tz * cz;
  var ew = tw * cz - tz * sz;

  var qx = this.v[0];
  var qy = this.v[1];
  var qz = this.v[2];
  var qw = this.v[3];

  this.v[0] = ew * qx + ex * qw + ey * qz - ez * qy;
  this.v[1] = ew * qy + ey * qw + ez * qx - ex * qz;
  this.v[2] = ew * qz + ez * qw + ex * qy - ey * qx;
  this.v[3] = ew * qw - ex * qx - ey * qy - ez * qz;

};


/**
 * In place vector rotation.
 * 
 * <br><br>Sets this instance to the result of the rotation of this instance along the
 * specified axis-angle vector.
 *
 * @param {Object} vect Axis-angle Vector to rotate this.
 *
 * @see Ovoid.Vector
 */
Ovoid.Quaternion.prototype.vectorRotateBy = function(vect) {
         
  var xx = this.v[3] * vect.v[0] +
      this.v[0] * 0.0 +
      this.v[1] * vect.v[2] -
      this.v[2] * vect.v[1];

  var yy = this.v[3] * vect.v[1] +
      this.v[1] * 0.0 +
      this.v[2] * vect.v[0] -
      this.v[0] * vect.v[2];

  var zz = this.v[3] * vect.v[2] +
      this.v[2] * 0.0 +
      this.v[0] * vect.v[1] -
      this.v[1] * vect.v[0];

  var ww = this.v[3] * 0.0 -
      this.v[0] * vect.v[0] -
      this.v[1] * vect.v[1] -
      this.v[2] * vect.v[2];
      
  this.v[3] += ww * -0.5;
  this.v[0] += xx * -0.5;
  this.v[1] += yy * -0.5;
  this.v[2] += zz * -0.5;
};


/**
 * In place vector swapped rotation.
 * 
 * <br><br>Sets this instance to the result of the rotation of the specified axis-angle 
 * Vector by this instance.
 *
 * @param {Object} vect Axis-angle Vector to rotate.
 *
 * @see Ovoid.Vector
 */
Ovoid.Quaternion.prototype.vectorRotateSwapBy = function(vect) {
         
  var xx = 0.0 * this.v[0] +
      vect.v[0] * this.v[3] +
      vect.v[1] * this.v[2] -
      vect.v[2] * this.v[1];

  var yy = 0.0 * this.v[1] +
      vect.v[1] * this.v[3] +
      vect.v[2] * this.v[0] -
      vect.v[0] * this.v[2];

  var zz = 0.0 * this.v[2] +
      vect.v[2] * this.v[3] +
      vect.v[0] * this.v[1] -
      vect.v[1] * this.v[0];

  var ww = 0.0 * this.v[3] -
      vect.v[0] * this.v[0] -
      vect.v[1] * this.v[1] -
      vect.v[2] * this.v[2];
      
  this.v[3] += ww * 0.5;
  this.v[0] += xx * 0.5;
  this.v[1] += yy * 0.5;
  this.v[2] += zz * 0.5;
};


/**
 * In place normalization.
 * 
 * <br><br>Sets this instance to its normalized.
 */
Ovoid.Quaternion.prototype.normalize = function() {

  /* methode la plus rapide */
  var mag = Math.sqrt((this.v[0] * this.v[0]) +
                      (this.v[1] * this.v[1]) +
                      (this.v[2] * this.v[2]) +
                      (this.v[3] * this.v[3]));
  this.v[0] /= mag;
  this.v[1] /= mag;
  this.v[2] /= mag;
  this.v[3] /= mag;
};



/**
 * Component assigment from Euler.
 * 
 * <br><br>Sets this instance's components according to the given Euler object rotation.
 *
 * @param {Euler} euler Euler object.
 */
Ovoid.Quaternion.prototype.fromEuler = function(euler) {

  var sx = Math.sin(euler.v[0] * -0.5);
  var cx = Math.cos(euler.v[0] * -0.5);
  var sy = Math.sin(euler.v[1] * -0.5);
  var cy = Math.cos(euler.v[1] * -0.5);
  var sz = Math.sin(euler.v[2] * -0.5);
  var cz = Math.cos(euler.v[2] * -0.5);

  /* qx * qy */
  var tx = sx * cy;
  var ty = cx * sy;
  var tz = sx * sy;
  var tw = cx * cy;

  /* qt * qz */
  this.v[0] = tx * cz + ty * sz;
  this.v[1] = ty * cz - tx * sz;
  this.v[2] = tw * sz + tz * cz;
  this.v[3] = tw * cz - tz * sz;

};


/**
 * Component assigment from euler angles.
 * 
 * <br><br>Sets this instance's components according to the given euler angles.
 *
 * @param {float} rx The X Euler component to set from.
 * @param {float} ry The Y Euler component to set from.
 * @param {float} rz The Z Euler component to set from.
 */
Ovoid.Quaternion.prototype.fromEulerXyz = function(rx, ry, rz) {

  var sx = Math.sin(rx * -0.5);
  var cx = Math.cos(rx * -0.5);
  var sy = Math.sin(ry * -0.5);
  var cy = Math.cos(ry * -0.5);
  var sz = Math.sin(rz * -0.5);
  var cz = Math.cos(rz * -0.5);

  /* qx * qy */
  var tx = sx * cy;
  var ty = cx * sy;
  var tz = sx * sy;
  var tw = cx * cy;

  /* qt * qz */
  this.v[0] = tx * cz + ty * sz;
  this.v[1] = ty * cz - tx * sz;
  this.v[2] = tw * sz + tz * cz;
  this.v[3] = tw * cz - tz * sz;
};


/**
 * Component assigment from 4x4 matrix.
 * 
 * <br><br>Sets this instance's components according to the given 4x4 
 * transformation matrix.
 *
 * @param {Matrix4} mat Matrix4 object.
 */
Ovoid.Quaternion.prototype.fromMat4 = function(mat) {

  var t = 1.0 + mat.m[0] + mat.m[5] + mat.m[10];
  if (t > 0.001) {

    var s = 0.5 / Math.sqrt(t);
    this.v[3] = 0.25 / s;
    this.v[0] = (mat.m[9] - mat.m[6]) * s;
    this.v[1] = (mat.m[2] - mat.m[8]) * s;
    this.v[2] = (mat.m[4] - mat.m[1]) * s;
  } else {

    if ((mat.m[0] > mat.m[5]) && (mat.m[0] > mat.m[8])) {
      var s = Math.sqrt(1.0 + mat.m[0] - mat.m[4] - mat.m[10]) * 2.0;

      this.v[0] = 0.25 * s;
      this.v[1] = (mat.m[1] + mat.m[4]) / s;
      this.v[2] = (mat.m[2] + mat.m[8]) / s;
      this.v[3] = (mat.m[6] - mat.m[9]) / s;
    } else {

      if (mat.m[4] > mat.m[8]) {
        var s = Math.sqrt(1.0 + mat.m[5] - mat.m[0] - mat.m[10]) * 2.0;

        this.v[0] = (mat.m[1] + mat.m[4]) / s;
        this.v[1] = 0.25 * s;
        this.v[2] = (mat.m[6] + mat.m[9]) / s;
        this.v[3] = (mat.m[2] - mat.m[8]) / s;
      } else {

        var s = Math.sqrt(1.0 + mat.m[10] - mat.m[0] - mat.m[5]) * 2.0;
        this.v[0] = (mat.m[2] + mat.m[8]) / s;
        this.v[1] = (mat.m[6] + mat.m[9]) / s;
        this.v[2] = 0.25 * s;
        this.v[3] = (mat.m[1] - mat.m[4]) / s;
      }
    }
  }

  // normalise
  var mag = Math.sqrt(this.v[0] * this.v[0] +
                      this.v[1] * this.v[1] +
                      this.v[2] * this.v[2] +
                      this.v[3] * this.v[3]);

  this.v[0] /= mag;
  this.v[1] /= mag;
  this.v[2] /= mag;
  this.v[3] /= mag;
  
};


/**
 * Component conversion to Matrix4.
 * 
 * <br><br>Convert this quaternion instance to a 4x4 transformation matrix with
 * rotation.
 *
 * @return {Matrix4} Transformation matrix with rotation.
 */
Ovoid.Quaternion.prototype.asMat4 = function() {
  
    var r = new Ovoid.Matrix4();
    
    var x2 = this.v[0] + this.v[0];
    var y2 = this.v[1] + this.v[1];
    var z2 = this.v[2] + this.v[2];
    var xx = this.v[0] * x2;
    var xy = this.v[0] * y2;
    var xz = this.v[0] * z2;
    var yy = this.v[1] * y2;
    var yz = this.v[1] * z2;
    var zz = this.v[1] * z2;
    var wx = this.v[3] * x2;
    var wy = this.v[3] * y2;
    var wz = this.v[3] * z2;

    r.m[0] = (1.0 - (yy + zz));
    r.m[1] = (xy - wz);
    r.m[2] = (xz + wy);
    r.m[4] = (xy + wz);
    r.m[5] = (1.0 - (xx + zz));
    r.m[6] = (yz - wx);
    r.m[8] = (xz - wy);
    r.m[9] = (yz + wx);
    r.m[10] = (1.0 - (xx + yy));
    
    return r;
};


/**
 * Create a new Quaternion objects array.
 *
 * @param {int} count Size of the array to create.
 *
 * @return {Quaternion[]} Array of Quaternion objects.
 */
Ovoid.Quaternion.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Quaternion());
  return array;
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Quaternion.prototype.toJSON = function() {
  
  var o = new Array();
  for(var i = 0; i < this.v.length; i++)
    o[i] = this.v[i];
  return o
};
