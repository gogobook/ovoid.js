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
 * Bounding box object constructor.
 *
 * @class Bounding box object.<br><br>
 * 
 * This class provides an implementation of a bounding box. A bounding box 
 * describes a volume in space that bounds a piece of geometry. 
 * The box is defined by two points which describe the minimum and maximum 
 * corners of the box.
 */
Ovoid.Boundingbox = function() {

  /** Bounding box's min point 
   * @type Point*/
  this.min = new Ovoid.Point(-0.05, -0.05, -0.05, 1.0);
  /** Bounding box's max point 
   * @type Point*/
  this.max = new Ovoid.Point(0.05, 0.05, 0.05, 1.0);
  /** Bounding box's half size in X, Y and Z axis
   * @type Vector*/
  this.hsize = new Ovoid.Vector(0.1, 0.1, 0.1);
  /** Bounding box's center relative to its shape node.
   * @type Point*/
  this.center = new Ovoid.Point(0.0, 0.0, 0.0, 1.0);
  /** Bounding box's center's position in absolute world coordinates.
   * @type Point*/
  this.worldCenter = new Ovoid.Point(0.0, 0.0, 0.0, 1.0);

};


/**
 * Copy method.<br><br>
 * 
 * Copies a bounding box.
 *
 * @param {Boundingbox} bbox Bounding box to be copied.
 */
Ovoid.Boundingbox.prototype.copy = function(bbox) {

  this.hsize.copy(bbox.hsize);
  this.min.copy(bbox.min);
  this.max.copy(bbox.max);
  this.center.copy(bbox.center);
};


/**
 * Set volume bounds.<br><br>
 * 
 * Set or modify the bounding box's size and relative center according to the given
 * min and max points.
 *
 * @param {Point} min Min point relative to center.
 * @param {Point} max Max point relative to center.
 * 
 * @see Ovoid.Point
 */
Ovoid.Boundingbox.prototype.setBound = function(min, max) {

  this.min.copy(min);
  this.max.copy(max);
      
  this.hsize.set((max.v[0] - min.v[0]) * 0.5,
      (max.v[1] - min.v[1]) * 0.5,
      (max.v[2] - min.v[2]) * 0.5);
    
  this.center.set(this.hsize.v[0] + this.min.v[0],
      this.hsize.v[1] + this.min.v[1],
      this.hsize.v[2] + this.min.v[2], 
      1.0);
};


/**
 * Transform center.<br><br>
 * 
 * Transform the bounding box's world center according to the given 
 * 4x4 transformation matrix.
 *
 * @param {Matrix4} matrix 4x4 transformation matrix.
 * 
 * @see Ovoid.Matrix4
 */
Ovoid.Boundingbox.prototype.transform = function(matrix) {

  this.worldCenter.transform4Of(this.center, matrix);
};


/**
 * Project on axis.<br><br>
 *
 * Projects the bounding box in a one-dimensionnal line along the given axis and
 * 4x4 transformation matrix. This function returns the size of the line that 
 * represents the projected box in the given axis.
 * 
 * @param {Vector} axis Projection axis.
 * @param {Matrix4} transform 4x4 transformation matrix to transform the 
 * bounding box
 * 
 * @return {float} Resulting One-dimensionnal projected line size.
 * 
 * @see Ovoid.Vector
 * @see Ovoid.Matrix4
 */
Ovoid.Boundingbox.prototype.axisProject = function(axis, transform) {

    /* 1D proj = halfsize.x * abs(axis.dot(transform.Xaxis)) + 
     *    halfsize.y * abs(axis.dot(transform.Yaxis)) +
     *    halfsize.z * abs(axis.dot(transform.Zaxis))
     */
    return (this.hsize.v[0] * Math.abs(axis.v[0] * transform.m[ 0] + 
        axis.v[1] * transform.m[ 1] + 
        axis.v[2] * transform.m[ 2])) +
        (this.hsize.v[1] * Math.abs(axis.v[0] * transform.m[ 4] + 
        axis.v[1] * transform.m[ 5] + 
        axis.v[2] * transform.m[ 6])) +
        (this.hsize.v[2] * Math.abs(axis.v[0] * transform.m[ 8] + 
        axis.v[1] * transform.m[ 9] + 
        axis.v[2] * transform.m[10]));
};
