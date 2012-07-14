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
 * Create a Vertex object.
 *
 * @class Vertex object.<br><br>
 * 
 * This class provides an implementation of a mesh/geometry vertex. The 
 * vertex is defined by several parameters such as position, normal, etc. 
 * 
 * @see Ovoid.Mesh
 */
Ovoid.Vertex = function() {

  /** Position component.
   * @type Point */
  this.p = new Ovoid.Point();
  /** Normal component.
   * @type Vector */
  this.n = new Ovoid.Vector();
  /** Texcoord component.
   * @type Coord */
  this.u = new Ovoid.Coord();
  /** Tangent component.
   * @type Vector */
  this.t = new Ovoid.Vector();
  /** Binormal component.
   * @type Vector */
  this.b = new Ovoid.Vector();
  /** Color component.
   * @type Color */
  this.c = new Ovoid.Color();
  /** Influence indices component.
   * @type Point */
  this.i = new Ovoid.Point();
  /** Influence Weights component.
   * @type Point */
  this.w = new Ovoid.Point();
};


/**
 * Copy method.<br><br>
 *
 * Copies a vertex.
 * 
 * @param {Vertex} other The vertex object to copy.
 */
Ovoid.Vertex.prototype.copy = function(other) {

  this.p.copy(other.p);
  this.n.copy(other.n);
  this.u.copy(other.u);
  this.t.copy(other.t);
  this.b.copy(other.b);
  this.c.copy(other.c);
  this.i.copy(other.i);
  this.w.copy(other.w);
};


/**
 * Equality test.<br><br>
 * 
 * Compares position, normal, texture coords and color components of 
 * two vertices.
 *
 * @param {Vertex} other Vertex to which this Vertex will be compared.
 *
 * @return {bool} true if the Vertex are (p,n,u,c) identical, false otherwise.
 */
Ovoid.Vertex.prototype.equal = function(other) {

  /* on ne compare que le plus signifiant */
  if (this.p.equal(other.p)) {
    if (this.n.equal(other.n)) {
      if (this.u.equal(other.u)) {
        if (this.c.equal(other.c)) {
          return true;
        }
      }
    }
  }
  return false;
};


/**
 * Component assigment from Float32Array.<br><br>
 * 
 * Sets the values of the vertex components using the given 
 * Float32Array and the specified Vertex format.
 *
 * @param {bitmask} format Vertex Format bitmask. Can be any combinaison of 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W.<br><br>
 * 
 * @param {Float32Array} floatArray Float32Array with components values.
 */
Ovoid.Vertex.prototype.fromFloat32Array = function(format, floatArray) {

  stride = 0;
  if (format & Ovoid.VERTEX_VEC4_P) {
    this.p.setv(floatArray.subarray(stride, stride + 4)); stride += 4;
  }
  if (format & Ovoid.VERTEX_VEC3_N) {
    this.n.setv(floatArray.subarray(stride, stride + 3)); stride += 3;
  }
  if (format & Ovoid.VERTEX_VEC3_U) {
    this.u.setv(floatArray.subarray(stride, stride + 3)); stride += 3;
  }
  if (format & Ovoid.VERTEX_VEC3_T) {
    this.t.setv(floatArray.subarray(stride, stride + 3)); stride += 3;
  }
  if (format & Ovoid.VERTEX_VEC3_B) {
    this.b.setv(floatArray.subarray(stride, stride + 3)); stride += 3;
  }
  if (format & Ovoid.VERTEX_VEC4_C) {
    this.c.setv(floatArray.subarray(stride, stride + 4)); stride += 4;
  }
  if (format & Ovoid.VERTEX_VEC4_I) {
    this.i.setv(floatArray.subarray(stride, stride + 4)); stride += 4;
  }
  if (format & Ovoid.VERTEX_VEC4_W) {
    this.w.setv(floatArray.subarray(stride, stride + 4)); stride += 4;
  }
};


/**
 * Component conversion to Float32Array.<br><br>
 *
 * Convert the vertex components into an Float32Array according to the
 * specified vertex format.
 * 
 * @param {bitmask} format Vertex Format bitmask. Can be any combinaison of 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W.<br><br>
 *
 * @return {Float32Array} Float32Array buffer of vertex components.
 */
Ovoid.Vertex.prototype.asFloat32Array = function(format) {

  var stride = 0;
  if (format & Ovoid.VERTEX_VEC4_P) stride += 4;
  if (format & Ovoid.VERTEX_VEC3_N) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_U) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_T) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_B) stride += 3;
  if (format & Ovoid.VERTEX_VEC4_C) stride += 4;
  if (format & Ovoid.VERTEX_VEC4_I) stride += 4;
  if (format & Ovoid.VERTEX_VEC4_W) stride += 4;

  var floatArray = new Float32Array(stride);
  var offset = 0;
  if (format & Ovoid.VERTEX_VEC4_P) {
    floatArray.set(this.p.v, offset); offset += 4;
  }
  if (format & Ovoid.VERTEX_VEC3_N) {
    floatArray.set(this.n.v, offset); offset += 3;
  }
  if (format & Ovoid.VERTEX_VEC3_U) {
    floatArray.set(this.u.v, offset); offset += 3;
  }
  if (format & Ovoid.VERTEX_VEC3_T) {
    floatArray.set(this.t.v, offset); offset += 3;
  }
  if (format & Ovoid.VERTEX_VEC3_B) {
    floatArray.set(this.b.v, offset); offset += 3;
  }
  if (format & Ovoid.VERTEX_VEC4_C) {
    floatArray.set(this.c.v, offset); offset += 4;
  }
  if (format & Ovoid.VERTEX_VEC4_I) {
    floatArray.set(this.i.v, offset); offset += 4;
  }
  if (format & Ovoid.VERTEX_VEC4_W) {
    floatArray.set(this.w.v, offset); offset += 4;
  }
  return floatArray;
};


/**
 * Get Vertex Format stride.<br><br>
 * 
 * Returns the vertex float components count (stride) according
 * to the specified vertex format.
 *
 * @param {bitmask} format Vertex Format bitmask. Can be any combinaison of 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W.<br><br>
 *
 * @return {int} Vertex Format's float component count.
 */
Ovoid.Vertex.getFormatStride = function(format) {

  var stride = 0;
  if (format & Ovoid.VERTEX_VEC4_P) stride += 4;
  if (format & Ovoid.VERTEX_VEC3_N) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_U) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_T) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_B) stride += 3;
  if (format & Ovoid.VERTEX_VEC4_C) stride += 4;
  if (format & Ovoid.VERTEX_VEC4_I) stride += 4;
  if (format & Ovoid.VERTEX_VEC4_W) stride += 4;
  return stride;
};


/**
 * Get Vertex Format bytes.<br><br>
 * 
 * Returns the vertex's size in bytes (stride) according
 * to the specified vertex format.
 *
 * @param {bitmask} format Vertex format.
 *
 * @return {int} Vertex Format's size in bytes.
 */
Ovoid.Vertex.getFormatSize = function(format) {

  var stride = 0;
  if (format & Ovoid.VERTEX_VEC4_P) stride += 4;
  if (format & Ovoid.VERTEX_VEC3_N) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_U) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_T) stride += 3;
  if (format & Ovoid.VERTEX_VEC3_B) stride += 3;
  if (format & Ovoid.VERTEX_VEC4_C) stride += 4;
  if (format & Ovoid.VERTEX_VEC4_I) stride += 4;
  if (format & Ovoid.VERTEX_VEC4_W) stride += 4;
  return stride * 4;
};


/**
 * Translate Vertices array in Float32Array.<br><br>
 * 
 * Translates the given Vertices Array in Float32Array according to the 
 * specified vertex format which can be used to fill Vertex Buffer Object (VBO). 
 *
 * @param {bitmask} format Vertex Format bitmask. Can be any combinaison of 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W.<br><br>
 * 
 * @param {Vertex[]} vertices Array of Vertex objects to translate.
 *
 * @return {Float32Array} Vertices data as Float32Array.
 */
Ovoid.Vertex.arrayAsVbo = function(format, vertices) {

  var c = vertices.length;
  var ofp, ofn, ofu, oft, ofb, ofc, ofi, ofw;
  var s = 0;
  if (format & Ovoid.VERTEX_VEC4_P) { ofp = s; s += 4; }
  if (format & Ovoid.VERTEX_VEC3_N) { ofn = s; s += 3; }
  if (format & Ovoid.VERTEX_VEC3_U) { ofu = s; s += 3; }
  if (format & Ovoid.VERTEX_VEC3_T) { oft = s; s += 3; }
  if (format & Ovoid.VERTEX_VEC3_B) { ofb = s; s += 3; }
  if (format & Ovoid.VERTEX_VEC4_C) { ofc = s; s += 4; }
  if (format & Ovoid.VERTEX_VEC4_I) { ofi = s; s += 4; }
  if (format & Ovoid.VERTEX_VEC4_W) { ofw = s; s += 4; }

  var floatArray = new Float32Array(c * s);
  var i;
  if (format & Ovoid.VERTEX_VEC4_P) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].p.v, (i * s) + ofp);
  }
  if (format & Ovoid.VERTEX_VEC3_N) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].n.v, (i * s) + ofn);
  }
  if (format & Ovoid.VERTEX_VEC3_U) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].u.v, (i * s) + ofu);
  }
  if (format & Ovoid.VERTEX_VEC3_T) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].t.v, (i * s) + oft);
  }
  if (format & Ovoid.VERTEX_VEC3_B) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].b.v, (i * s) + ofb);
  }
  if (format & Ovoid.VERTEX_VEC4_C) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].c.v, (i * s) + ofc);
  }
  if (format & Ovoid.VERTEX_VEC4_I) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].i.v, (i * s) + ofi);
  }
  if (format & Ovoid.VERTEX_VEC4_W) {
    for (i = 0; i < c; i++)
      floatArray.set(vertices[i].w.v, (i * s) + ofw);
  }

  return floatArray;
};


/**
 * Create a new array of Vertices.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Object[]} Array of Vertex objects.
 */
Ovoid.Vertex.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Vertex());
  return array;
};


/**
 * JavaScript Object Notation (JSON) serialization method.
 * 
 * <br><br>This method is commonly used by the <code>Ovoid.Ojson</code> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Vertex.prototype.toJSON = function() {
  
  var o = new Array(8);
  o[0] = this.p;
  o[1] = this.n;
  o[2] = this.u;
  o[3] = this.t;
  o[4] = this.b;
  o[5] = this.c;
  o[6] = this.i;
  o[7] = this.w;
  return o;
};

