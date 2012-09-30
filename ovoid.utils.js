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
 * Degrees to radians conversion.<br><br>
 * 
 * Converts the specified value from degrees to radians.
 *
 * @param {float} degrees Degrees value.
 *
 * @return {float} Radians value.
 */
Ovoid.deg2Rad = function(degrees) {

  /* radians = degrees * PI / 180 */
  return degrees * 0.017453293;
  /* / 180 = * 0.00555 ; PI * 0.00555 = 0.017453293 */
};


/**
 * Radians to degrees conversion.<br><br>
 * 
 * Converts the specified value from radians to degrees.
 *
 * @param {float} radians Radians value.
 *
 * @return {float} Degrees value.
 */
Ovoid.rad2Deg = function(radians) {

  /* degres = radians / PI * 180 */
  return radians * 57.295779513;
  /* / 3.14159... = * 0.31830; 0.31830 * 180 = 57.295779513 */
};


/**
 * Power of two number.<br><br>
 * 
 * Checks whether a number is a power of two.
 *
 * @param {int} val Number to check.
 *
 * @return {bool} True if the specified number is power of two,
 * false otherwise.
 */
Ovoid.isPowerOfTwo = function(val) {

  return (val & (val - 1)) == 0;
};


/**
 * Get perlin noise.<br><br>
 * 
 * Returns a perlin noise value according to the specified seed.
 *
 * @param {int} f Perlin noise seed.
 *
 * @return {bool} Perlin noise value.
 */
Ovoid.noise = function(f) {
  //f = (f << 13) ^ f;
  return ( 1.0 - ( (f * (f * f * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
};


/**
 * Get random integer.<br><br>
 * 
 * Returns a random integer between the specified values.
 *
 * @param {int} min Range min interger value.
 * @param {int} max Range max interger value.
 *
 * @return {bool} Random integer between min and max.
 */
Ovoid.randInt = function(min, max) {

		return min + Math.round((Math.random() * (max - min)));
};


/**
 * Get random float.<br><br>
 * 
 * Returns a random float between the specified values.
 *
 * @param {int} min Range min float value.
 * @param {int} max Range max float value.
 *
 * @return {bool} Random float between min and max.
 */
Ovoid.randFloat = function(min, max) {

		return min + (Math.random() * (max - min));
};


/**
 * Get file content.<br><br>
 * 
 * Load and returns the contents of the file at the specified url.
 *
 * @param {string} url File URL.
 * @param {bool} freload Avoid browser cache and force reloading file.
 *
 * @return {string} File content in text format.
 */
Ovoid.getContent = function(url) {

  /* Pour forcer le rechargement sans utiliser
   * le cach naviguateur, on rajoute une portion
   * aléatoire à l'url */
  if (Ovoid.opt_debugMode) 
      url += '?' + Math.random();
      
  var hreq = new XMLHttpRequest();
  hreq.open('GET', url, false);

  hreq.send(null);

  if (hreq.status == 200 || hreq.status == 304) {
    return hreq.responseText;
  } else {
    Ovoid.log(1, 'Ovoid.Io', "failled to open '" + url + "'");
    return null;
  }
};


/**
 * Get file XML content.<br><br>
 * 
 * Load and returns the XML object of the file at the specified url.
 *
 * @param {string} url File URL.
 * @param {bool} freload Avoid browser cache and force reloading file.
 *
 * @return {DOM_Object} Parsed XML object of file content.
*/
Ovoid.getXml = function(url) {

  /* Pour forcer le rechargement sans utiliser
   * le cach naviguateur, on rajoute une portion
   * aléatoire à l'url */
  if (Ovoid.opt_debugMode) 
    url += '?' + Math.random();
    
  var hreq = new XMLHttpRequest();
  hreq.open('GET', url, false);

  hreq.send(null);

  if (hreq.status == 200 || hreq.status == 304)
  {
    return hreq.responseXML;
  } else {
    Ovoid.log(1, 'Ovoid', "failled to open '" + url + "'");
    return null;
  }
};


/**
 * Get file JSON content.<br><br>
 * 
 * Load and returns the JSON object of the file at the specified url.
 *
 * @param {string} url File URL.
 * @param {bool} freload Avoid browser cache and force reloading file.
 *
 * @return {Object} Parsed JSON object of file content.
*/
Ovoid.getJson = function(url) {

  /* Pour forcer le rechargement sans utiliser
   * le cach naviguateur, on rajoute une portion
   * aléatoire à l'url */
  if (Ovoid.opt_debugMode) 
    url += '?' + Math.random();
    
  var hreq = new XMLHttpRequest();
  hreq.open('GET', url, false);

  hreq.send(null);

  if (hreq.status == 200 || hreq.status == 304) {
    return JSON.parse(hreq.responseText);
  } else {
    Ovoid.log(1, 'Ovoid', "failled to open '" + url + "'");
    return null;
  }
};


/**
 * Get file binary content.<br><br>
 * 
 * Load and returns the binary content of the file at the specified url.
 *
 * @param {string} url File URL.
 * @param {bool} freload Avoid browser cache and force reloading file.
 *
 * @return {Arraybuffer} File content in binary format.
*/
Ovoid.getBinary = function(url) {

  /* Pour forcer le rechargement sans utiliser
   * le cach naviguateur, on rajoute une portion
   * aléatoire à l'url */
  if (Ovoid.opt_debugMode) 
    url += '?' + Math.random();
    
  var hreq = new XMLHttpRequest();
  hreq.responseType = 'arraybuffer';
  hreq.open('GET', url, false);
  
  if (hreq.status == 200 || hreq.status == 304)
  {
    return hreq.response;
  } else {
    Ovoid.log(1, 'Ovoid', "failled to open '" + url + "'");
    return null;
  }
};


/**
 * Convert Array to Float32Array.<br><br>
 * 
 * Returns Float32Array filled with to the given Array values.
 *
 * @param {Array} array Array to convert to Float32Array.
 *
 * @return {Float32Array} new Float32Array filled.
 */
Ovoid.array2Float32 = function(array) {
  
  var i = array.length;
  var buffer = new Float32Array(i);
  while(i--) buffer[i] = array[i];
  return buffer;
};


/**
 * Convert Float32Array to Array.<br><br>
 * 
 * Returns Array filled with to the given Float32Array values.
 *
 * @param {Float32Array} buffer Float32Array to convert to Array.
 *
 * @return {Array} new Array filled.
 */
Ovoid.float322Array = function(buffer) {
  
  var i = buffer.length;
  var array = new Array(i);
  while(i--) array[i] = buffer[i];
  return array;
};


/**
 * Exctract file name.<br><br>
 * 
 * Extrats the file name from the specified full URL string.
 *
 * @param {string} url URL string to extract name.
 * @param {bool} ext Keep the file extention.
 *
 * @return {string} Extracted file name.
 */
Ovoid.extractName = function(url, ext) {

  var name = url.split('/');
  name = name[name.length-1];
  if(!ext) {
    name = name.split('.');
    name = name[name.length-2]
  }
  return name;
};


/**
 * Exctract file extention.<br><br>
 * 
 * Extrats the file extention from the specified full URL string.
 *
 * @param {string} url URL string to extract extention.
 *
 * @return {string} Extracted file extention.
 */
Ovoid.extractExt = function(url) {

  var ext = url.split('/');
  ext = ext[ext.length-1];
  ext = ext.split('.');
  return ext[ext.length-1];
};


/**
 * Decimal round.<br><br>
 * 
 * Round number at its four decimal.
 *
 * @param {float} f Float value to be rounded.
 *
 * @return {string} Rounded float.
 */
Ovoid.frnd = function(f) {

  return (Math.round(f*1000) / 1000);
};


/**
 * Request animation frame in a cross browser way.
 * @memberOf _global_
 * @private
 */
window.requestAnimFrame = (
    function() {
      return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
          };
    }
    )();


/**
 * Cancel request animation frame in a cross browser way.
 * @memberOf _global_
 * @private
 */
window.cancelRequestAnimFrame = (function() {
  return window.cancelCancelRequestAnimationFrame ||
         window.webkitCancelRequestAnimationFrame ||
         window.mozCancelRequestAnimationFrame ||
         window.oCancelRequestAnimationFrame ||
         window.msCancelRequestAnimationFrame ||
         window.clearTimeout;
})();
