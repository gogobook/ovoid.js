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
  this.i = new Ovoid.Point(-1.0,-1.0,-1.0,-1.0);
  /** Influence Weights component.
   * @type Point */
  this.w = new Ovoid.Point(0.0,0.0,0.0,0.0);
  
  /* On passe tous les index de matrice influences (i) à zero pour rester
   * sur la premiere matrice dans le vertex shader. La derniere valeur
   * du poids (w) sera 1.0, ce qui calculera automatiquement l'influence 1
   * pour la premiere matrice. */
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
 * Pack vertices data in Array.<br><br>
 * 
 * Translates the given Vertices Array in number Array according to the 
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
 * @param {Vertex[]} vertices Array of Vertex objects to translate.
 *
 * @return {float[]} Vertices data as Array of float.
 */
Ovoid.Vertex.pack = function(format, vertices) {
  
  var c = vertices.length;
  
  var s = Ovoid.Vertex.getFormatStride(format);
  
  var array = new Array(c * s);
  
  var p = 0;
  for(var i = 0; i < c; i++) {
    if (format & Ovoid.VERTEX_VEC4_P) {
      array[p] = vertices[i].p.v[0]; p++;
      array[p] = vertices[i].p.v[1]; p++;
      array[p] = vertices[i].p.v[2]; p++;
      array[p] = vertices[i].p.v[3]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_N) {
      array[p] = vertices[i].n.v[0]; p++;
      array[p] = vertices[i].n.v[1]; p++;
      array[p] = vertices[i].n.v[2]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_U) {
      array[p] = vertices[i].u.v[0]; p++;
      array[p] = vertices[i].u.v[1]; p++;
      array[p] = vertices[i].u.v[2]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_T) {
      array[p] = vertices[i].t.v[0]; p++;
      array[p] = vertices[i].t.v[1]; p++;
      array[p] = vertices[i].t.v[2]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_B) {
      array[p] = vertices[i].b.v[0]; p++;
      array[p] = vertices[i].b.v[1]; p++;
      array[p] = vertices[i].b.v[2]; p++;
    }
    if (format & Ovoid.VERTEX_VEC4_C) {
      array[p] = vertices[i].c.v[0]; p++;
      array[p] = vertices[i].c.v[1]; p++;
      array[p] = vertices[i].c.v[2]; p++;
      array[p] = vertices[i].c.v[3]; p++;
    }
    if (format & Ovoid.VERTEX_VEC4_I) {
      array[p] = vertices[i].i.v[0]; p++;
      array[p] = vertices[i].i.v[1]; p++;
      array[p] = vertices[i].i.v[2]; p++;
      array[p] = vertices[i].i.v[3]; p++;
    }
    if (format & Ovoid.VERTEX_VEC4_W) {
      array[p] = vertices[i].w.v[0]; p++;
      array[p] = vertices[i].w.v[1]; p++;
      array[p] = vertices[i].w.v[2]; p++;
      array[p] = vertices[i].w.v[3]; p++;
    }
  }
  
  return array;
};


/**
 * Unpack vertices data from Array.<br><br>
 * 
 * Translates the given Array of float in Vertex object Array according to the 
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
 * @param {float[]} array Array of float data to translate.
 *
 * @return {Vertex[]} Vertex object Array.
 */
Ovoid.Vertex.upack = function(format, array) {
  
  var s = Ovoid.Vertex.getFormatStride(format);
  var c = array.length / s;
          
  var vertices = Ovoid.Vertex.newArray(c);

  var p = 0;
  for(var i = 0; i < c; i++) {
    if (format & Ovoid.VERTEX_VEC4_P) {
      vertices[i].p.v[0] = array[p]; p++;
      vertices[i].p.v[1] = array[p]; p++;
      vertices[i].p.v[2] = array[p]; p++;
      vertices[i].p.v[3] = array[p]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_N) {
      vertices[i].n.v[0] = array[p]; p++;
      vertices[i].n.v[1] = array[p]; p++;
      vertices[i].n.v[2] = array[p]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_U) {
      vertices[i].u.v[0] = array[p]; p++;
      vertices[i].u.v[1] = array[p]; p++;
      vertices[i].u.v[2] = array[p]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_T) {
      vertices[i].t.v[0] = array[p]; p++;
      vertices[i].t.v[1] = array[p]; p++;
      vertices[i].t.v[2] = array[p]; p++;
    }
    if (format & Ovoid.VERTEX_VEC3_B) {
      vertices[i].b.v[0] = array[p]; p++;
      vertices[i].b.v[1] = array[p]; p++;
      vertices[i].b.v[2] = array[p]; p++;
    }
    if (format & Ovoid.VERTEX_VEC4_C) {
      vertices[i].c.v[0] = array[p]; p++;
      vertices[i].c.v[1] = array[p]; p++;
      vertices[i].c.v[2] = array[p]; p++;
      vertices[i].c.v[3] = array[p]; p++;
    }
    if (format & Ovoid.VERTEX_VEC4_I) {
      vertices[i].i.v[0] = array[p]; p++;
      vertices[i].i.v[1] = array[p]; p++;
      vertices[i].i.v[2] = array[p]; p++;
      vertices[i].i.v[3] = array[p]; p++;
    }
    if (format & Ovoid.VERTEX_VEC4_W) {
      vertices[i].w.v[0] = array[p]; p++;
      vertices[i].w.v[1] = array[p]; p++;
      vertices[i].w.v[2] = array[p]; p++;
      vertices[i].w.v[3] = array[p]; p++;
    }
  }

  return vertices;
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
Ovoid.Vertex.bufferize = function(format, vertices) {

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
 * <br><br>This method is commonly used by the <c>Ovoid.Ojson</c> class
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
  o[6] = this._i;
  o[7] = this.w;
  return o;
};

