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
 * Create a Polygon polyset object.
 *
 * @class Polygon polyset object.
 * <br>
 * <br>
 * This class provides an implementation of a polygon set. The 
 * polygon set is used by Mesh to define a trangle faces (polygons) ranges 
 * that use a specific material.
 * 
 * @see Ovoid.Mesh
 */
Ovoid.Polyset = function() {

  /** Indices offset.
   * @type int */
  this.ioffset = 0;
  /** Indices count.
   * @type int */
  this.icount = 0;
  /** Material reference.
   * @type Material */
  this.material = null;
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
Ovoid.Polyset.prototype.toJSON = function() {
  
  var o = new Object();
  o['ioffset'] = this.ioffset;
  o['icount'] = this.icount;
  if(this.material) {
    o['material'] = this.material.uid;
  } else {
    o['material'] = 'null';
  }
  return o;
};
