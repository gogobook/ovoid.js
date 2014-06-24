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
 * @class Texture node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Texture node implement a generic texture image. It is a 
 * dependency node and does not takes place directly in the 3D world.<br><br>
 * 
 * <blockcode>
 * var brick = Instance.Scene.newNode(Ovoid.TEXTURE, "BrickTexture");<br>
 * brick.loadSource("brickwall.png", true);<br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Texture = function(name, i) {

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
  this.target = 0x0DE1;
  /** Texture width.
   * @type float */
  this.width;
  /** Texture height.
   * @type float */
  this.height;
  /** Filtering flag.
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
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
};
Ovoid.Texture.prototype = new Ovoid.Node;
Ovoid.Texture.prototype.constructor = Ovoid.Texture;


/**
 * Bind texture.<br><br>
 * 
 * Bind the texture handle to the current sampler.
 */
Ovoid.Texture.prototype.bind = function() {

  this._i.gl.bindTexture(this.target, this.handle);
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

  this._i._clearGlerror();

  this.filter = filter;
  this._i.gl.bindTexture(this.target, this.handle);
  if (filter) {
    
    if (Ovoid.isPowerOfTwo(this.width) && Ovoid.isPowerOfTwo(this.height))
    {
      this._i.gl.texParameteri(this.target,0x2800,0x2601);
      this._i.gl.texParameteri(this.target,0x2801,0x2703);
    } else {
      Ovoid._log(2,this._i, '::Texture.setFilter', this.name +
            ":: is NPO2, unable to set filtering.");
      this._i.gl.texParameteri(this.target,0x2802,0x812F);
      this._i.gl.texParameteri(this.target,0x2803,0x812F);
      this._i.gl.texParameteri(this.target,0x2800,0x2601);
      this._i.gl.texParameteri(this.target,0x2801,0x2601);
    }
  } else {
    this._i.gl.texParameteri(this.target,0x2800,0x2600);
    this._i.gl.texParameteri(this.target,0x2801,0x2600);
    this._i.gl.texParameteri(this.target,0x2802,0x812F);
    this._i.gl.texParameteri(this.target,0x2803,0x812F);
  }

  this._i.gl.bindTexture(this.target, null);

  this._i._logGlerror('::Texture.setFilter::' + this.name);
};


/**
 * Create texture 2D from raw texel data.<br><br>
 * 
 * Creates a 2D texture according to the specified parameters with the 
 * given raw texels data.<br><br>
 *  
 * @param {enum} format WebGL texture pixel format.
 * @param {int} width Texel image data width.
 * @param {int} height Texel image data height.
 * @param {Uint8Array} data Image pixels data.
 * 
 * @return {bool} True if succes, false otherwise
 */
Ovoid.Texture.prototype.create2dFromRaw = function(format, w, h, data) {
  
  this._i._clearGlerror();

  this.width = w;
  this.height = h;  
  this.handle = this._i.gl.createTexture();
  this.target = 0x0DE1; //this._i.gl.TEXTURE_2D;

  this._i.gl.bindTexture(this.target, this.handle);
  this._i.gl.texImage2D(this.target,0,format,w,h,0,format,0x1401,data);
  if (Ovoid.isPowerOfTwo(this.width) && Ovoid.isPowerOfTwo(this.height)) {
    this._i.gl.generateMipmap(this.target);
  } else {
    Ovoid._log(2,this._i, '::Texture.create2dFromRaw', this.name +
        ":: is NPO2, unable to create mipmaps.");
  }
  
  this.setFilter(this.filter);
  
  /* unbind la texture */
  this._i.gl.bindTexture(this.target, null);

  if(this._i._logGlerror('::Texture.create2dFromRaw::' + this.name)) {
    return false;
  }
  
  Ovoid._log(3,this._i, '::Texture.create2dFromRaw', this.name +
      ":: created");
  this.loadStatus = 1;

  return true;
};


/**
 * Create texture 2D from HTML Canvas or Image.<br><br>
 * 
 * Creates a 2D texture according to the specified parameters from an
 * HTML Canvas or Image object.<br><br>
 *  
 * @param {enum} format WebGL texture pixel format.
 * @param {Object} image HTML Image or Canvas object.
 * 
 * @return {bool} True if succes, false otherwise
 */
Ovoid.Texture.prototype.create2dFromImg = function(format, image) {
  
  this._i._clearGlerror();
  
  this.width = image.width;
  this.height = image.height;
  this.handle = this._i.gl.createTexture();
  this.target = 0x0DE1; //this._i.gl.TEXTURE_2D;

  this._i.gl.bindTexture(this.target, this.handle);
  this._i.gl.texImage2D(this.target,0,format,format,0x1401,image);
  if (Ovoid.isPowerOfTwo(this.width) && Ovoid.isPowerOfTwo(this.height)) {
    this._i.gl.generateMipmap(this.target);
  } else {
    Ovoid._log(2,this._i, '::Texture.create2dFromImg', this.name +
        ":: is NPO2, unable to create mipmaps.");
  }
  
  this.setFilter(this.filter);
  
  /* unbind la texture */
  this._i.gl.bindTexture(this.target, null);
  
  if(this._i._logGlerror('::Texture.create2dFromImg::' + this.name)) {
    return false;
  }
  
  Ovoid._log(3,this._i, '::Texture.create2dFromImg', this.name + 
      ":: created");
  this.loadStatus = 1;
      
  return true;
};


/**
 * Handle texture loading.
 *
 */
Ovoid.Texture.prototype._handleLoad = function() {

  this._i._clearGlerror();

  this.o.handle = this._i.gl.createTexture();
  this.o.width = this.width;
  this.o.height = this.height;
  this._i.gl.bindTexture(this.o.target, this.o.handle);
  this._i.gl.texImage2D(this.o.target,0,0x1908,0x1908,0x1401,this);
  
  if (Ovoid.isPowerOfTwo(this.width) && Ovoid.isPowerOfTwo(this.height)) {
    this._i.gl.generateMipmap(this.o.target);
  } else {
    Ovoid._log(2,this._i, '::Texture.loadSource', this.o.name +
        ":: is NPO2, unable to create mipmaps.");
  }
  
  this.o.setFilter(this.o.filter);
  
  /* unbind la texture */
  this._i.gl.bindTexture(this.o.target, null);

  if(this._i._logGlerror('::Texture.loadSource::' + this.o.name)) {
    return;
  }
  
  Ovoid._log(3,this._i, '::Texture.loadSource', this.o.name + 
      ":: loaded");
  this.o.loadStatus = 1;
};


/**
 * Handle texture loading error.
 */
Ovoid.Texture.prototype._handleError = function() {

  Ovoid._log(2,this._i, '::Texture.loadSource', this.o.name +
      ":: unable to load '" + this.o.url + "'");

  this.o.loadStatus = -1;
};


/**
 * Load the specified source file for this instance.<br><br>
 * 
 * Loads the specified external source file and extracts, decodes or parses the 
 * loaded data. If not specified, the loading is made in the asynchronous way.<br><br>
 *  
 * The <c>loadSatus</c> member indicates the loading status through an 
 * integer value of 0, 1 or -1. A value of 0 means that the file is not yet 
 * loaded, a value of 1 means that the source was successfully loaded, and a 
 * value of -1 means the loading failed.<br><br>
 *
 * @param {string} url Source file name/url to load.
 * 
 * @param {bool} filter Enable or disable the texture filtering on loaded 
 * texture.
 * 
 */
Ovoid.Texture.prototype.loadSource = function(url, filter) {

  this.loadStatus = 0;
    
  this.url = url;
  
  var src = this.url;
  if (this._i.opt_debugMode) 
    src += '?' + Math.random();
  
  this.target = 0x0DE1; //this._i.gl.TEXTURE_2D;

  this.filter = filter;

  this.pixmap = new Image();
  this.pixmap.o = this;
  this.pixmap._i = this._i;
  this.pixmap.onload = this._handleLoad;
  this.pixmap.onerror = this._handleError;
  this.pixmap.src = src;
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
Ovoid.Texture.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.TEXTURE;
  /* Ovoid.Node */
  o['n'] = this.name;
  o['v'] = this.visible;
  o['u'] = this.uid;
  o['p'] = this.parent?this.parent.uid:'null';
  o['c'] = new Array();
  for(var i = 0; i < this.child.length; i++)
    o['c'][i] = this.child[i].uid;
  o['dp'] = new Array();
  for(var i = 0; i < this.depend.length; i++)
    o['dp'][i] = this.depend[i].uid;
  o['lk'] = new Array();
  for(var i = 0; i < this.link.length; i++)
    o['lk'][i] = this.link[i].uid;
  o['bmn'] = this.boundingBox.min;
  o['bmx'] = this.boundingBox.max;
  o['brd'] = this.boundingSphere.radius;
  /* Ovoid.Texture */
  o['url'] = this.url;
  o['fl'] = this.filter;

  return o;
};

