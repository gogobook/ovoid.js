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
 * Bounding sphere object constructor.
 *
 * @class Bounding sphere object.
 * <br>
 * <br>
 * This class provides an implementation of a bounding sphere. A bounding sphere 
 * describes a volume in space that bounds a piece of geometry. 
 * The sphere is defined by its radius.
 */
Ovoid.Boundingsphere = function() {

  /** Bounding sphere's radius.
   * @type float */
  this.radius = 0.0;
  /** Bounding sphere's squared radius.
   * @type float */
  this.radius2 = 0.0;
  /** Bounding sphere's center relative to its shape node.
   * @type Point*/
  this.center = new Ovoid.Point(0.0, 0.0, 0.0, 1.0);
  /** Bounding sphere's center's position in absolute world coordinates.
   * @type Point*/
  this.worldCenter = new Ovoid.Point(0.0, 0.0, 0.0, 1.0);
  
};


/**
 * Copy from another.
 *
 * @param {Boundingsphere} sphere Bounding sphere to copy from.
 */
Ovoid.Boundingsphere.prototype.copy = function(bsphere) {

  this.radius = bsphere.radius;
  this.radius2 = bsphere.radius2;
  this.center.copy(bsphere.center);
};


/**
 * Set the bounding sphere's size and proportions.
 * 
 * Set or modify the bounding sphere's radius and relative center according 
 * to the given min point, max point and squared radius.
 *
 * @param {Point} min Min point relative to center.
 * @param {Point} max Max point relative to center.
 * @param {float} rad2 Squared radius.
 * 
 * @see Ovoid.Point
 */
Ovoid.Boundingsphere.prototype.setBound = function(min, max, rad2) {

  /* half size */
  var hsx = (max.v[0] - min.v[0]) * 0.5;
  var hsy = (max.v[1] - min.v[1]) * 0.5;
  var hsz = (max.v[2] - min.v[2]) * 0.5;
                
  this.center.set(hsx + min.v[0],
      hsy + min.v[1],
      hsz + min.v[2], 
      1.0);

  this.radius2 = rad2;
  this.radius = Math.sqrt(this.radius2);
};


/**
 * Set the bounding sphere's radius.
 * 
 * Set the bounding sphere's radius and squared radius according to the given
 * radius.
 *
 * @param {float} rad Radius value.
 */
Ovoid.Boundingsphere.prototype.setRadius = function(rad) {

  /* half size */
  this.radius2 = rad * rad;
  this.radius = rad;

};


/**
 * Transform the bounding sphere.
 * 
 * Transform the bounding sphere's world center according to the given 
 * 4x4 transformation matrix.
 *
 * @param {Matrix4} matrix 4x4 transformation matrix.
 * 
 * @see Ovoid.Matrix4
 */
Ovoid.Boundingsphere.prototype.transform = function(matrix) {

  this.worldCenter.transform4Of(this.center, matrix);
};

