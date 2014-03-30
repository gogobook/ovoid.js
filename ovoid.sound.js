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
 * @class Sound node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Sound node implements a global or localized in space sound emitter. 
 * Inherited from the Transform node, it is a world-transformable node, which 
 * means it can be moved, rotated, scaled... The Sound node is dedicated to have 
 * an Audio node assigned.<br><br>
 * 
 * <blockcode>
 * var vroum = scene.create(Ovoid.AUDIO, "vroum");<br>
 * vroum.loadSource("vroum.ogg");<br>
 * <br>
 * var sound = scene.create(Ovoid.SOUND, "engineSound");<br>
 * sound.setAudio(vroum);<br>
 * sound.spatialize(true);<br>
 * </blockcode><br><br>
 * 
 * The Sound spatialization is browsers depend. OvoiD.JS currently support the 
 * spatialization through the Webkit Audio API. Else, OvoiD.JS uses the HTML5 
 * standard implementation where the spatialization is unavailable.
 * 
 * @extends Ovoid.Transform
 * 
 * @see Ovoid.Audio
 *
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Sound = function(name, i) {

  Ovoid.Transform.call(this);
  /** Node type.
   * @type bitmask */
  this.type |= Ovoid.SOUND;
  /** Node name.
   * @type string */
  this.name = name;
  /** Source Audio buffer.
   * @type Audio **/
  this.audio = null
  /** Flat sound flag.
   * @type bool **/
  this.flat = true;
  /** Sound inner cone angle in degrees (Webkit audio API only)
   * @type int **/
  this.innerCone = 360;
  /** Sound outer cone angle in degrees (Webkit audio API only)
   * @type int **/
  this.outerCone = 360;
  /** Sound outer cone gain (Webkit audio API only)
   * @type float **/
  this.outerGain = 0.5;
  /** Sound reference distance (Webkit audio API only)
   * @type float **/
  this.refDistance = 1.0;
  /** Sound maximum distance (Webkit audio API only)
   * @type float **/
  this.maxDistance = 0.0;
  /** Sound rolloff factor (Webkit audio API only)
   * @type float **/
  this.rolloffFactor = 0.5;
  /** Audio Layer source node */
  this._alsource = null;
  /** Audio Layer gain node */
  this._algain = null;
  /** Audio Layer panner node */
  this._alpanner = null;
  
  /* init les nodes Audio API */
  if(i.al) { 
    /* Ovoid.WEB_AUDIO_API */
    this._alsource = i.al.createBufferSource();
    this._algain = i.al.createGain(); /* was Ovoid.al.createGainNode() (deprecated) */
    this._alpanner = i.al.createPanner();
    this._alpanner.distanceModel = "inverse";
    this._alpanner.panningModel = "HRTF";
    /* non local par defaut */
    this._algain.connect(i.al.destination);
  } else {
    this._alsource = null;
    this._algain = null;
    this._alpanner = null;
  }
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
  
  this.unCach(Ovoid.CACH_SOUND);
};
Ovoid.Sound.prototype = new Ovoid.Transform;
Ovoid.Sound.prototype.constructor = Ovoid.Sound;

/**
 * Set sound spatialization.<br><br>
 * 
 * Sets the sound as spatialized relative to a virtual listener or flat 
 * background sound. (The sound spatialization only works with Webkit Audio API).
 *
 * @param {bool} e True to spatialize the sound, or false for a standard sound.
 */
Ovoid.Sound.prototype.spatialize = function(e) {
  
  if(this._i.al) { 
    this._alpanner.disconnect();
    this._algain.disconnect();
    if(!e) {
      this._algain.connect(this._i.al.destination);
      this.flat = true;
    } else {
      this._alpanner.connect(this._algain);
      this._algain.connect(this._i.al.destination);
      this.flat = false;
    }
  } else {
    this.flat = true;
  }
};


/**
 * Set panner cone.<br><br>
 * 
 * Sets the spatialized sound's panner cone parameters according to the specified
 * values. (This takes effect only on spatialized sounds)
 *
 * @param {float} iangle Cone inner angle.
 * @param {float} oangle Cone outer angle.
 * @param {float} ogain Cone outer gain.
 */
Ovoid.Sound.prototype.setPannerCone = function(iangle, oangle, ogain) {
  
    this.innerCone = iangle;
    this.outerCone = oangle;
    this.outerGain = ogain;
};


/**
 * Set panner dinstances.<br><br>
 * 
 * Sets the spatialized sound's panner dinstances parameters according to the 
 * specified values. (This takes effect only on spatialized sounds)
 *
 * @param {float} ref Source gain reference distance.
 * @param {float} max Source gain maximum distance.
 * @param {float} rolloff Source gain rolloff factor.
 */
Ovoid.Sound.prototype.setPannerDist = function(ref, max, rolloff) {
  
    this.refDistance = ref;
    this.maxDistance = max;
    this.rolloffFactor = rolloff;
};


/**
 * Link Audio node.<br><br>
 *
 * Assings the specified Audio node as audio source buffer for this instance. 
 * The assigned Audio will be a dependency (depend node) for this instance.
 * 
 * @param {Audio} audio Audio object.
 * 
 * @see Ovoid.Audio
 */
Ovoid.Sound.prototype.setAudio = function(audio) {

  /* crée la dépendence */
  if (this.audio != null) {
    this.breakDepend(this.audio);
  }
  this.audio = audio;
  this.makeDepend(audio);
};


/**
 * Loop playing.<br><br>
 * 
 * Sets whether the Sound should loop.
 *
 * @param {bool} enable Enable or disable loop playing.
 */
Ovoid.Sound.prototype.setLoop = function(e) {
  
  if(this._alsource) this._alsource.loop = e;
};


/**
 * Play sound.<br><br>
 * 
 * Plays the Sound.
 */
Ovoid.Sound.prototype.play = function() {
  
  if(this._alsource) {
    /* He bien oui, il faut refaire tout ça pour rejouer un son... */
      this._alsource = this._i.al.createBufferSource();
      this._alsource.buffer = this.audio._albuffer;
      if(this.flat) 
        this._alsource.connect(this._algain);
      else
        this._alsource.connect(this._alpanner);
      this._alsource.start(0);
  }
};


/**
 * Stop sound.<br><br>
 * 
 * Stops the Sound.
 */
Ovoid.Sound.prototype.stop = function() {
  
  if(this._alsource) this._alsource.stop(0);
};


/**
 * Sound volum.<br><br>
 * 
 * Sets the Sound base gain.
 *
 * @param {float} gain Volum gain.
 */
Ovoid.Sound.prototype.volum = function(gain) {
  
  if(this._algain) this._algain.gain.value = gain;
};

/**
 * Node's caching function.
 *
 * <br><br>Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <c>Ovoid.Queuer</c> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Sound.prototype.cachSound = function() {

  if ( !(this.cach & Ovoid.CACH_SOUND)) {
   
    if (this._alpanner) {
      this._alpanner.coneInnerAngle = this.innerCone;
      this._alpanner.coneOuterAngle = this.outerCone;
      this._alpanner.coneOuterGain = this.outerGain;
      this._alpanner.refDistance = this.refDistance;
      this._alpanner.maxDistance = this.maxDistance;
      this._alpanner.rolloffFactor = this.rolloffFactor;
    }
    this.addCach(Ovoid.CACH_SOUND); 
  }
  
  if (!this.flat) {
    
    if (!(this.cach & Ovoid.CACH_WORLD)) {
      
      this._alpanner.setPosition(this.worldMatrix.m[12], 
          this.worldMatrix.m[13], 
          this.worldMatrix.m[14]);
          
      this._alpanner.setOrientation(-this.worldMatrix.m[8], 
          -this.worldMatrix.m[9], 
          -this.worldMatrix.m[10],
          this.worldMatrix.m[4], 
          this.worldMatrix.m[5], 
          this.worldMatrix.m[6]);
          
      this.addCach(Ovoid.CACH_WORLD);
    }
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
Ovoid.Sound.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.SOUND;
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
  /* Ovoid.Transform */
  o['pivot'] = this.pivot;
  o['ts'] = this.scaling;
  o['tt'] = this.translation;
  o['to'] = this.orientation;
  o['tr'] = this.rotation;
  /* Ovoid.Sound */
  o['au'] = this.audio?this.audio.uid:'null';
  o['fl'] =  this.flat;
  if(this._alpanner) {
    o['ia'] = this._alpanner.coneInnerAngle;
    o['oa'] = this._alpanner.coneOuterAngle;
    o['og'] = this._alpanner.coneOuterGain;
    o['rd'] = this._alpanner.refDistance;
    o['md'] = this._alpanner.maxDistance;
    o['rf'] = this._alpanner.rolloffFactor;
  }
  if(this._alsource) {
    o['lo'] = this._alsource.loop
  } else {
    o['lo'] = false;
  }
  
  return o;
};
