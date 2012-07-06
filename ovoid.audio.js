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
 * Audio node constructor.
 * 
 * @class Audio node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Audio node is the node used to load and store an audio source buffer. 
 * The Audio node is an abstract dependency node and is not in the world. Like 
 * the Mesh node is a "shape" for Body nodes, the Audio node is a kind of 
 * "shape" for Sound nodes. So you guess that you can (and it's hardly 
 * recommended) use the same Audio node as audio source for several Sound nodes 
 * at the same time.
 * <br>
 * <br>
 * If available, the Audio node use the W3C Web Audio API, in other case, it use
 * the HTML5 audio element object.
 * 
 * @extends Ovoid.Node
 *
 * @see Ovoid.Sound
 * 
 * @param {string} name Name of the new node.
 */
Ovoid.Audio = function(name) {

  Ovoid.Node.call(this);
  /** node type */
  this.type |= Ovoid.AUDIO;
  /** Node name 
   * @type string */
  this.name = name;
  /** Audio source file name.
   * Keep in mind that the <code>Ovoid.opt_audioPath</code> option will be used 
   * to retrieve the file.
   * @type string */
  this.url = '';
  /** Audio source channels
   * @type int
   */
  this.channels = 0;
  /** Audio source sample rate
   * @type int
   */
  this.samplerate = 0;
  /** Audio source duration
   * @type int
   */
  this.duration = 0;
  /** Audio source file loading status.
   * This variable describe the current loading status of the source file. A 
   * value of 0 means that the file is not loaded, a value of 1 means that the 
   * file was successfully loaded, and a value of -1 means that the file loading 
   * has failed.
   * @type int */
  this.loadStatus = 0;
  /** Audio Layer buffer */
  switch(Ovoid.al.type)
  {
    case 2: /* Ovoid.MOZ_AUDIO_API */
      this._albuffer = null;
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      this._albuffer = Ovoid.al.createBuffer(1, 1, 22050);
    break;
    default:
      this._albuffer = null;
    break;
  }
};
Ovoid.Audio.prototype = new Ovoid.Node;
Ovoid.Audio.prototype.constructor = Ovoid.Audio;


/**
 * Handle sound loading.
 */
Ovoid.Audio.prototype._handleLoad = function(e) {
  
  switch(Ovoid.al.type)
  {
    case 2: /* Ovoid.MOZ_AUDIO_API */
      this.owner.loadStatus = 1;
      this.owner.duration = this.duration;
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      if(this.response.byteLength > 311) {
        this.owner._albuffer = Ovoid.al.createBuffer(this.response, false);
        this.owner.loadStatus = 1;
      } else {
        Ovoid.log(2, 'Ovoid.Audio', "'" + this.owner.name +
          "' unable to load '" + this.owner.src + "'");
        this.owner.loadStatus = -1;
      }
    break;
    default:
      this.owner.loadStatus = 1;
      this.owner.duration = this.duration;
    break;
  }
  
};


/**
 * Handle sound buffer data loading.
 */
Ovoid.Audio.prototype._handleBuffer = function(e) {
  
  switch(Ovoid.al.type)
  {
    case 2: /* Ovoid.MOZ_AUDIO_API */
      var size = 0;
      if( this.owner._albuffer ) size += this.owner._albuffer.length;
      size += e.frameBuffer.length;
      
      var albuffer = new Float32Array(size);
      if( this.owner._albuffer ) {
        albuffer.set(this.owner._albuffer, 0);
        albuffer.set(e.frameBuffer, this.owner._albuffer.length);
      } else {
        albuffer.set(e.frameBuffer);
      }
      
      this.owner._albuffer = albuffer;
    break;
  }
};


/**
 * Handle sound meta data.
 */
Ovoid.Audio.prototype._handleMeta = function(e) {
  
  switch(Ovoid.al.type)
  {
    case 2: /* Ovoid.MOZ_AUDIO_API */
      this.owner.channels = this.mozChannels;
      this.owner.samplerate = this.mozSampleRate;
    break;
  }
};


/**
 * Handle sound loading error.
 */
Ovoid.Audio.prototype._handleError = function() {

  Ovoid.log(2, 'Ovoid.Audio', "'" + this.owner.name +
      "' unable to load '" + this.owner.src + "'");
  this.owner.loadStatus = -1;
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
 * file loading.
 *
 * @param {string} url Source file name to load. Keep in mind that the 
 * <code>Ovoid.opt_audioPath</code> option will be used to retrieve the file.
 * @param {bool} nopath ignore the default search path 
 * (<code>Ovoid.opt_audioPath</code>).
 */
Ovoid.Audio.prototype.loadSource = function(url, nopath) {

  this.url = url;
  
  var src;
  nopath?src='':src=Ovoid.opt_audioPath;
  src += this.url;
  if (Ovoid.opt_debugMode) 
    src += '?' + Math.random();
  
  switch(Ovoid.al.type)
  {
    case 1: /* Ovoid.HTML5_AUDIO */
      this._albuffer = new Audio();
      this._albuffer.owner = this;
      this._albuffer.addEventListener('canplaythrough', this._handleLoad, false);
      this._albuffer.addEventListener('error', this._handleError, false);
      this._albuffer.src = src;
      this._albuffer.load();
    break;
    case 2: /* Ovoid.MOZ_AUDIO_API */
      /* Moz Audio API = CACA
      var audio = new Audio();
      audio.owner = this;
      audio.addEventListener('canplaythrough', this._handleLoad, false);
      audio.addEventListener('MozAudioAvailable', this._handleBuffer, false);
      audio.addEventListener('progress', this._handleBuffer, false);
      audio.addEventListener('loadedmetadata', this._handleMeta, false);
      audio.addEventListener('error', this._handleError, false);
      audio.src = src;
      audio.play();
      */
      this._albuffer = new Audio();
      this._albuffer.owner = this;
      this._albuffer.addEventListener('loadeddata', this._handleLoad, false);
      this._albuffer.addEventListener('error', this._handleError, false);
      this._albuffer.src = src;
      this._albuffer.load();
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      var xhr = new XMLHttpRequest();
      xhr.owner = this;
      xhr.onload = this._handleLoad;
      xhr.open("GET", src, true);
      xhr.responseType = "arraybuffer";
      xhr.send();
    break;
  }
};


/**
 * Create a new array of Audio nodes.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Object[]} Array of Audio node.
 */
Ovoid.Audio.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Audio());
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
Ovoid.Audio.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.AUDIO;
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
  /* Ovoid.Audio */
  o['url'] = this.url;

  return o;
};
