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
 * Create a Particle object.
 * 
 * @class Particle object.
 * <br>
 * <br>
 * This class provides an implementation of a particle. Particles are
 * used by the <code>Ovoid.Emitter</code> class.
 * 
 * @see Ovoid.Emitter
 */
Ovoid.Particle = function() {

  /** Position component.
   * @type Point */
  this.p = new Ovoid.Point();
  /** Color component.
   * @type Color */
  this.c = new Ovoid.Color();
  /** TexCoord and Size component.
   * @type Coord */
  this.u = new Ovoid.Coord();
  /** Velocity component.
   * @type Vector */
  this.v = new Ovoid.Vector();
  /** Life component.
   * @type float */
  this.l = 0.0;
};


/**
 * Create a new array of Particles.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Particle[]} Array of Particle objects.
 */
Ovoid.Particle.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Particle());
  return array;
};


/**
 * Translate Particles array in Float32Array.
 * 
 * <br><br>Translates the specified Particle objects Array in an Float32Array 
 * which can be used to fill GL Buffer Object (VBO).
 *
 * @param {Particle[]} particles Array of Particle objects to translate.
 *
 * @return {Float32Array} Particles data as Float32Array.
 */
Ovoid.Particle.arrayAsVbo = function(particles) {

  var c = particles.length;
  var n = 0;
  var floatArray = new Float32Array(c * 11);
  for (i = 0; i < c; i++) {
    /* On ne copie que les particules vivantes */
    if(particles[i].l > 0.0) {
      floatArray.set(particles[i].p.v, (n * 11));
      floatArray.set(particles[i].u.v, (n * 11) + 4);
      floatArray.set(particles[i].c.v, (n * 11) + 7);
      n++;
    }
  }
  
  return floatArray;
};


