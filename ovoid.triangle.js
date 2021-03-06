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
 * @class Triangle face object.<br><br>
 * 
 * This class provides an implementation of a triangle face. The 
 * triangle face is mainly defined by three vertex indinces.
 * 
 * @see Ovoid.Mesh
 */
Ovoid.Triangle = function() {

  /** Vertices indices.
   * @type Uint16Array[3] */
  this.index = new Uint16Array(3);
  /** Face normal.
   * @type Vector */
  this.normal = new Ovoid.Vector();
  /** Face center.
   * @type Point */
  this.center = new Ovoid.Point();
  /** Adjacent faces indices list.
   * @type Int16Array[3] */
  this.adjacent = new Int16Array([-1, -1, -1]);
  /** Face plane equation.
   * @type float */
  this.equation = 0.0;
};


/**
 * Copy method.<br><br>
 *
 * Copies a triangle.
 * 
 * @param {Triangle} tri The Triangle object to copy.
 */
Ovoid.Triangle.prototype.copy = function(tri) {

    this.index.set(tri.index);
    this.normal.copy(tri.normal);
    this.center.copy(tri.center);
    this.adjacent.set(tri.adjacent);
    this.equation = tri.equation;
};


/**
 * Create a new array of Triangles.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Triangle[]} Array of Triangle objects.
 */
Ovoid.Triangle.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Triangle());
  return array;
};


/**
 * Translate Triangles array in Uint16Array.<br><br>
 * 
 * Translates the specified Triangles Array in Uint16Array 
 * which can be used to fill Vertex Buffer Object (VBO).
 *
 * @param {Triangle[]} triangles Array of Triangle objects to translate.
 *
 * @return {Uint16Array} Triangles data as Uint16Array.
 */
Ovoid.Triangle.arrayAsIbo = function(triangles) {

  var c = triangles.length;
  var uintArray = new Uint16Array(c * 3);
  var i;
  for (i = 0; i < c; i++)
    uintArray.set(triangles[i].index, i * 3);

  return uintArray;
};


/**
 * JavaScript Object Notation (JSON) serialization method.
 * 
 * <br><br>This method is commonly used by the <c>Ovoid.Ojson</c> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Triangle.prototype.toJSON = function() {
  
  var o = new Array(6);
  o[0] = this.index[0];
  o[1] = this.index[1];
  o[2] = this.index[2];
  o[3] = this.adjacent[0];
  o[4] = this.adjacent[1];
  o[5] = this.adjacent[2];
  
  return o;
};
