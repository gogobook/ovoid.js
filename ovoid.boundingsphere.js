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
 * @class Bounding sphere object.<br><br>
 * 
 * This class provides an implementation of a bounding sphere. A bounding sphere 
 * describes a volume in space that bounds a piece of geometry. 
 * The sphere is defined by its radius.
 */
Ovoid.Boundingsphere = function() {

  /** Bounding sphere's radius.
   * @type float */
  this.radius = 0.0;
  /** Bounding sphere's center relative to its shape node.
   * @type Point*/
  this.center = new Ovoid.Point(0.0, 0.0, 0.0, 1.0);
  /** Bounding sphere's center's position in absolute world coordinates.
   * @type Point*/
  this.worldCenter = new Ovoid.Point(0.0, 0.0, 0.0, 1.0);
  
};


/**
 * Copy method.<br><br>
 * 
 * Copies a bounding sphere.
 *
 * @param {Boundingsphere} sphere Bounding sphere to be copied.
 */
Ovoid.Boundingsphere.prototype.copy = function(bsphere) {

  this.radius = bsphere.radius;
  this.center.copy(bsphere.center);
};


/**
 * Set volume bounds.<br><br>
 * 
 * Set or modify the bounding sphere's radius and relative center according 
 * to the given min point, max point and squared radius.
 *
 * @param {Point} min Min point relative to center.
 * @param {Point} max Max point relative to center.
 * 
 * @see Ovoid.Point
 */
Ovoid.Boundingsphere.prototype.setBound = function(min, max) {

  /* half size */
  var hsx = (max.v[0] - min.v[0]) * 0.5;
  var hsy = (max.v[1] - min.v[1]) * 0.5;
  var hsz = (max.v[2] - min.v[2]) * 0.5;
                
  this.center.set(hsx + min.v[0],
      hsy + min.v[1],
      hsz + min.v[2], 
      1.0);

  this.radius = 0.0;

  var S;
  S = max.dist(this.center);
  if (S > this.radius) this.radius = S;
  S = min.dist(this.center);
  if (S > this.radius) this.radius = S;
};


/**
 * Set radius.<br><br>
 * 
 * Set the bounding sphere's radius and squared radius according to the given
 * radius.
 *
 * @param {float} rad Radius value.
 */
Ovoid.Boundingsphere.prototype.setRadius = function(rad) {

  this.radius = rad;
};


/**
 * Transform center.<br><br>
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

