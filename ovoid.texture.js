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
 * Texture node constructor.
 * 
 * @class Texture node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Texture node implement a generic texture image. It is a 
 * dependency node and does not takes place directly in the 3D world.<br><br>
 * 
 * <blockcode>
 * var brick = scene.create(Ovoid.TEXTURE, "BrickTexture");<br>
 * brick.loadSource("brickwall.png", true);<br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the node.
 */
Ovoid.Texture = function(name) {

  Ovoid.Node.call(this);
  /** node type.
   * @type bitmask */
  this.type |= Ovoid.TEXTURE;
  /** node name.
   * @type string */
  this.name = name;
  /** Source image file name.
   * @type string */
  this.url = '';
  /** Gl Handle.
   * @type int */
  this.handle = null;
  /** Gl Target.
   * @type enum */
  this.target = 0;
  /** Texture width.
   * @type float */
  this.width;
  /** Texture height.
   * @type float */
  this.height;
  /** Filtering level.
   * @type bool */
  this.filter = false;
  /** Source image loading status.<br><br>
   * A value of 0 means that the file is not yet 
   * loaded, a value of 1 means that the source was successfully loaded, and a 
   * value of -1 means the loading failed.
   * @type int */
  this.loadStatus = 0;
  /** Pixmap object.
   * @type Pixmap */
  this.pixmap = null;
};
Ovoid.Texture.prototype = new Ovoid.Node;
Ovoid.Texture.prototype.constructor = Ovoid.Texture;


/**
 * Handle texture loading.
 *
 * @return {bool} True if successfull texture creation, false otherwise.
 */
Ovoid.Texture.prototype._handleLoad = function() {

  Ovoid._clearGlerror();

  this.owner.width = this.width;
  this.owner.height = this.height;
  Ovoid.gl.bindTexture(this.owner.target, this.owner.handle);
  Ovoid.gl.texImage2D(this.owner.target,0,0x1908,0x1908,0x1401,this);
  
  if (Ovoid.isPowerOfTwo(this.width) && Ovoid.isPowerOfTwo(this.height)) {
    Ovoid.gl.generateMipmap(this.owner.target);
  }
  
  this.owner.setFilter(this.owner.filter);
  
  /* unbind la texture */
  Ovoid.gl.bindTexture(this.owner.target, null);

  if (Ovoid._logGlerror('Ovoid.Texture._handleLoad :: ' +
      this.owner.url))
  {
    return false;
  }

  this.owner.loadStatus = 1;
  return true;
};


/**
 * Handle texture loading error.
 */
Ovoid.Texture.prototype._handleError = function() {

  Ovoid.log(2, 'Ovoid.Texture', "'" + this.owner.name +
      "' unable to load '" + this.owner.url + "'");

  this.owner.loadStatus = -1;
};


/**
 * Set filtering.<br><br>
 * 
 * Sets the texture filtering for this instance.
 *
 * @param {bool} filter If true all filtering are enabled as possible, otherwize
 * the "nearest" technic is used.
 */
Ovoid.Texture.prototype.setFilter = function(filter) {

  Ovoid._clearGlerror();

  this.filter = filter;
  Ovoid.gl.bindTexture(this.target, this.handle);
  if (filter) {
    
    if (Ovoid.isPowerOfTwo(this.width) && Ovoid.isPowerOfTwo(this.height))
    {
      Ovoid.gl.texParameteri(this.target,0x2800,0x2601);
      Ovoid.gl.texParameteri(this.target,0x2801,0x2703);
    } else {
      Ovoid.gl.texParameteri(this.target,0x2802,0x812F);
      Ovoid.gl.texParameteri(this.target,0x2803,0x812F);
      Ovoid.gl.texParameteri(this.target,0x2800,0x2601);
      Ovoid.gl.texParameteri(this.target,0x2801,0x2601);
    }
  } else {
    Ovoid.gl.texParameteri(this.target,0x2800,0x2600);
    Ovoid.gl.texParameteri(this.target,0x2801,0x2600);
    Ovoid.gl.texParameteri(this.target,0x2802,0x812F);
    Ovoid.gl.texParameteri(this.target,0x2803,0x812F);
  }

  Ovoid.gl.bindTexture(this.target, null);

  Ovoid._logGlerror('Ovoid.Texture.setFilter :: ' + this.url);
};


/**
 * Load the specified source file for this instance.<br><br>
 * 
 * Loads the specified external source file and extracts, decodes or parses the 
 * loaded data. If not specified, the loading is made in the asynchronous way.<br><br>
 *  
 * The <code>loadSatus</code> member indicates the loading status through an 
 * integer value of 0, 1 or -1. A value of 0 means that the file is not yet 
 * loaded, a value of 1 means that the source was successfully loaded, and a 
 * value of -1 means the loading failed.<br><br>
 *
 * @param {string} url Source file name/url to load.
 * <code>Ovoid.opt_texturePath</code> is used as base path.
 * 
 * @param {bool} filter Enable or disable the texture filtering on loaded 
 * texture.
 * 
 * @param {bool} nopath ignore the default search path 
 * (<code>Ovoid.opt_texturePath</code>).
 */
Ovoid.Texture.prototype.loadSource = function(url, filter, nopath) {

  this.url = url;
  
  var src;
  nopath?src='':src=Ovoid.opt_texturePath;
  src += this.url;
  if (Ovoid.opt_debugMode) 
    src += '?' + Math.random();
  
  this.handle = Ovoid.gl.createTexture();
  this.target = 0x0DE1;

  this.filter = filter;

  this.pixmap = new Image();
  this.pixmap.owner = this;
  this.pixmap.onload = this._handleLoad;
  this.pixmap.onerror = this._handleError;
  /*this.pixmap.addEventListener('error', this._handleError, false);*/
  this.pixmap.src = src;
};



/**
 * Create texture.<br><br>
 * 
 * Creates a 2D texture according to the specified parameters with the given 
 * texels data.<br><br>
 *  
 *
 * @param {enum} format WebGL texture pixel format.
 * 
 * @param {int} width Texel image data width.
 * 
 * @param {int} height Texel image data height.
 * 
 * @param {Uint8Array} data Image pixels data.
 */
Ovoid.Texture.prototype.create2d = function(format, width, height, data) {
  
  Ovoid._clearGlerror();
  
  this.handle = Ovoid.gl.createTexture();
  this.target = Ovoid.gl.TEXTURE_2D;

  Ovoid.gl.bindTexture(this.target, this.handle);

  Ovoid.gl.texImage2D(Ovoid.gl.TEXTURE_2D,
                      0, format,
                      width, height, 0,
                      format,
                      Ovoid.gl.UNSIGNED_BYTE, data);
                      
  Ovoid.gl.bindTexture(this.target, null);
  
  Ovoid._logGlerror('Ovoid.Texture.create2d :: ' + this.name);
                      
};


/**
 * Bind texture.<br><br>
 * 
 * Bind the texture handle to the current sampler.
 */
Ovoid.Texture.prototype.bind = function() {

  Ovoid.gl.bindTexture(this.target, this.handle);
};


/**
 * Create a new array of Texture nodes.
 *
 * @param {int} count Size of the new array.
 * 
 * @return {Texture[]} Array of texture objects.
 */
Ovoid.Texture.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Texture());
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
Ovoid.Texture.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.TEXTURE;
  /* Ovoid.Node */
  o['name'] = this.name;
  o['visible'] = this.visible;
  o['uid'] = this.uid;
  o['parent'] = this.parent?this.parent.uid:'null';
  o['child'] = new Array();
  for(var i = 0; i < this.child.length; i++)
    o['child'][i] = this.child[i].uid;
  o['depend'] = new Array();
  for(var i = 0; i < this.depend.length; i++)
    o['depend'][i] = this.depend[i].uid;
  o['link'] = new Array();
  for(var i = 0; i < this.link.length; i++)
    o['link'][i] = this.link[i].uid;
  /* Ovoid.Texture */
  o['url'] = this.url;
  o['filter'] = this.filter;

  return o;
};

