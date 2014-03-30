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
 * @class Polygon polyset object.<br><br>
 * 
 * This class provides an implementation of a polygons set. A Polyset defines a 
 * trangles list assigned to a specific material.
 * 
 * @see Ovoid.Mesh
 */
Ovoid.Polyset = function() {

  /** Indices offset (bytes).
   * @type int */
  this.ioffset = 0;
  /** Indices count.
   * @type int */
  this.icount = 0;
  /** Material reference.
   * @type Material */
  this.material = null;
  /** Drawing mode.
   * @type enum */
  this.mode = 4; /* TRIANGLES */
  /** Associated Vertex Buffer.
   * @type int */
  this.ibuffer = null;
  /** Associated Indices Buffer.
   * @type int */
  this.vbuffer = null;
  /** Vertex Format.
   * @type bitmask */
  this.vformat = 0;
  /** Vertex size in bytes.
   * @type int */
  this.vfbytes = 0;
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
Ovoid.Polyset.prototype.toJSON = function() {
  
  var o = new Array(3);
  o[0] = this.ioffset;
  o[1] = this.icount;
  if(this.material) {
    o[2] = this.material.uid;
  } else {
    o[2] = 'null';
  }
  return o;
};
