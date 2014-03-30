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
 * @class Audio node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Audio node implements a cross-platform source audio buffer. It is used to
 * load, decode and store external audio files source. An external audio file 
 * should be loaded only once using the Audio node.<br><br>
 * 
 * The Audio node is a dependency node and does not takes place directly in 
 * the 3D world. The Audio node is typically assigned to one or more Sound node.<br><br>
 * 
 * <blockcode>
 * var vroum = myOvoid.Scene.newNode(Ovoid.AUDIO, "vroum");<br>
 * vroum.loadSource("vroum.ogg");<br>
 * <br>
 * var sound = myOvoid.Scene.newNode(Ovoid.SOUND, "engineSound");<br>
 * sound.setAudio(vroum);<br>
 * sound.spatialize(true);<br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Node
 *
 * @see Ovoid.Sound
 * 
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Audio = function(name, i) {

  Ovoid.Node.call(this);
  /** node type */
  this.type |= Ovoid.AUDIO;
  /** Node name 
   * @type string */
  this.name = name;
  /** Audio source file name.
   * Keep in mind that the <c>Ovoid.opt_audioPath</c> option will be used 
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
  /** Audio source file loading status.<br><br>
   * A value of 0 means that the file is not yet 
   * loaded, a value of 1 means that the source was successfully loaded, and a 
   * value of -1 means the loading failed.
   * @type int */
  this.loadStatus = 0;
  /** Audio Layer buffer */
  if(i.al) {
    this._albuffer = inst.al.createBuffer(1, 1, 22050);
  } else {
    this._albuffer = null;
  }
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
};
Ovoid.Audio.prototype = new Ovoid.Node;
Ovoid.Audio.prototype.constructor = Ovoid.Audio;


/**
 * Handle sound loading.
 */
Ovoid.Audio.prototype._handleLoad = function(e) {
  
  if(this.o.i.al) {
    var o = this.o;
    var i = this._i;
    this.o.i.al.decodeAudioData(
          this.response,
          function(b){Ovoid._log(2,i,'::Audio.loadSource',o.name+":: loaded");o._albuffer=b;o.loadStatus=1;},
          function(){Ovoid._log(2,i,'::Audio.loadSource',o.name+":: unable to decode audio '"+o.src+"'");o.loadStatus=-1;}
          );
  }
};


/**
 * Handle sound loading error.
 */
Ovoid.Audio.prototype._handleError = function() {

  Ovoid._log(2,this._i,'::Audio.loadSource', this.o.name +
      ":: ' unable to load '" + this.o.src + "'");
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
 */
Ovoid.Audio.prototype.loadSource = function(url) {

  this.loadStatus = 0;
    
  this.url = url;
  
  var src = this.url;
  if (this._i.opt_debugMode) 
    src += '?' + Math.random();
  
  if(this._i.al) {
    var xhr = new XMLHttpRequest();
    xhr.o = this;
    xhr._i = this._i;
    xhr.onload = this._handleLoad;
    xhr.onerror = this._handleError;
    xhr.open("GET", src, true);
    xhr.responseType = "arraybuffer";
    xhr.send();
  }
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
Ovoid.Audio.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.AUDIO;
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
  /* Ovoid.Audio */
  o['url'] = this.url;

  return o;
};
