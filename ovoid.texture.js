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
 * @class Texture node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Texture node is the node used to load and store a texture image source. 
 * The Texture node is an abstract dependency node and is not in the world. 
 * Usualy, Texture are used for Material, Text (for font map) and Layer 
 * (for background).
 * <br>
 * <br>
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
  /** Source image loading status.
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

  this.owner.width = this.width;
  this.owner.height = this.height;
  Ovoid.gl.bindTexture(this.owner.target, this.owner.handle);

  Ovoid.gl.texImage2D(this.owner.target,
      0,
      Ovoid.gl.RGBA,
      Ovoid.gl.RGBA,
      Ovoid.gl.UNSIGNED_BYTE,
      this);
  
  this.owner.setFilter(this.owner.filter);

  if (Ovoid.isPowerOfTwo(this.width) &&
      Ovoid.isPowerOfTwo(this.height))
  {
    Ovoid.gl.generateMipmap(this.owner.target);
  }
  
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
 * Define filtering.
 * 
 * <br><br>Sets the filtering for this instance. 
 *
 * @param {bool} filter If true the linear filtering is enabled, otherwize
 * the Nearest technique is used.
 */
Ovoid.Texture.prototype.setFilter = function(filter) {

  this.filter = filter;
  Ovoid.gl.bindTexture(this.target, this.handle);
  if (filter) {
    
    if (Ovoid.isPowerOfTwo(this.width) &&
        Ovoid.isPowerOfTwo(this.height))
    {
      Ovoid.gl.texParameteri(this.target,
          Ovoid.gl.TEXTURE_MAG_FILTER,
          Ovoid.gl.LINEAR);

      Ovoid.gl.texParameteri(this.target,
          Ovoid.gl.TEXTURE_MIN_FILTER,
          Ovoid.gl.LINEAR_MIPMAP_LINEAR);
    } else {
      Ovoid.gl.texParameteri(this.target,
          Ovoid.gl.TEXTURE_WRAP_S,
          Ovoid.gl.CLAMP_TO_EDGE);

      Ovoid.gl.texParameteri(this.target,
          Ovoid.gl.TEXTURE_WRAP_T,
          Ovoid.gl.CLAMP_TO_EDGE);

      Ovoid.gl.texParameteri(this.target,
          Ovoid.gl.TEXTURE_MAG_FILTER,
          Ovoid.gl.LINEAR);

      Ovoid.gl.texParameteri(this.target,
          Ovoid.gl.TEXTURE_MIN_FILTER,
          Ovoid.gl.LINEAR);
    }
  } else {
    Ovoid.gl.texParameteri(this.target,
        Ovoid.gl.TEXTURE_MAG_FILTER,
        Ovoid.gl.NEAREST);

    Ovoid.gl.texParameteri(this.target,
        Ovoid.gl.TEXTURE_MIN_FILTER,
        Ovoid.gl.NEAREST);
        
    Ovoid.gl.texParameteri(this.target,
        Ovoid.gl.TEXTURE_WRAP_S,
        Ovoid.gl.CLAMP_TO_EDGE);

    Ovoid.gl.texParameteri(this.target,
        Ovoid.gl.TEXTURE_WRAP_T,
        Ovoid.gl.CLAMP_TO_EDGE);
  }

  Ovoid._logGlerror('Ovoid.Texture.setFilter :: ' + this.url);
};


/**
 * Load the specified source file for this instance.
 * 
 * <br><br>By this method you can specify the source file to load and use to be
 * the data source of this instance. The file loading is instantaneously 
 * started in asynby this method. Once the loading is started you can check the 
 * <code>loadStatus</code> variable of this instance to know if and when 
 * the loading is done.
 * <br>
 * <br>
 * This <code>loadStatus</code> variable describe the current loading status of 
 * the source file. A value of 0 means that the file is not loaded, a value of 1 
 * means that the file was successfully loaded, and a value of -1 means that the 
 * file loading 
 *
 * @param {string} url Source file name to load. Keep in mind that the 
 * <code>Ovoid.opt_texturePath</code> option will be used to retrieve the file.
 * @param {bool} filter Texture filtering to apply at loading.
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
  this.target = Ovoid.gl.TEXTURE_2D;

  this.filter = filter;

  this.pixmap = new Image();
  this.pixmap.owner = this;
  this.pixmap.onload = this._handleLoad;
  this.pixmap.onerror = this._handleError;
  /*this.pixmap.addEventListener('error', this._handleError, false);*/
  this.pixmap.src = src;
};


/**
 * Bind texture.
 * 
 * <br><br>Bind the Gl texture handle to the current Gl sampler.
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

