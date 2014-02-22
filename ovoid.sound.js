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
 * Sound node constructor.
 * 
 * @class Sound node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
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
 */
Ovoid.Sound = function(name) {

  Ovoid.Node.call(this);
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
  if(Ovoid.al.type == 3) { 
    /* Ovoid.WEB_AUDIO_API */
    this._alsource = Ovoid.al.createBufferSource();
    this._algain = Ovoid.al.createGain(); /* was Ovoid.al.createGainNode() (deprecated) */
    this._alpanner = Ovoid.al.createPanner();
    this._alpanner.distanceModel = "inverse";
    this._alpanner.panningModel = "HRTF";
    /* non local par defaut */
    this._algain.connect(Ovoid.al.destination);
  } 
  
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
  
  if(Ovoid.al.type == 3) { 
    /* Ovoid.WEB_AUDIO_API */
    this._alpanner.disconnect();
    this._algain.disconnect();
    if(!e) {
      // src --> gain --> dest
      this._algain.connect(Ovoid.al.destination);
      this.flat = true;
    } else {
	  // src --> panner --> gain --> dest
      this._alpanner.connect(this._algain);
      this._algain.connect(Ovoid.al.destination);
      this.flat = false;
    }
  } else {
    /* Ovoid.HTML5_AUDIO */
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

  if(Ovoid.al.type != 3) {  /* Ovoid.HTML5_AUDIO */
	  this._alsource = audio._albuffer.cloneNode(true);
  }
  
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
  
  if(!this._alsource)
    return;
    
  this._alsource.loop = e;

};


/**
 * Play sound.<br><br>
 * 
 * Plays the Sound.
 */
Ovoid.Sound.prototype.play = function() {
  
  if(!this._alsource)
    return;

  if(Ovoid.al.type == 3) {
    /* Ovoid.WEB_AUDIO_API */
    /* He bien oui, il faut refaire tout ça pour 
       * rejouer un son... */
      this._alsource = Ovoid.al.createBufferSource();
      this._alsource.buffer = this.audio._albuffer;
      if(this.flat) 
        // src --> gain -> dest
        this._alsource.connect(this._algain);
      else
        // src --> panner --> gain --> dest
        this._alsource.connect(this._alpanner);
      this._alsource.start(0); /* was this._alsource.noteOn(0); (deprecated) */
  } else {
    /* Ovoid.HTML5_AUDIO */
    if(this._alsource.readyState != 4)
      return;
    this._alsource.currentTime = 0;
    this._alsource.play();
  }
};


/**
 * Stop sound.<br><br>
 * 
 * Stops the Sound.
 */
Ovoid.Sound.prototype.stop = function() {
  
  if(!this._alsource)
    return;
  if(Ovoid.al.type == 3) { 
    /* Ovoid.WEB_AUDIO_API */
    this._alsource.stop(0);
  } else { 
    /* Ovoid.HTML5_AUDIO */
    this._alsource.pause();
  }
};


/**
 * Sound volum.<br><br>
 * 
 * Sets the Sound base gain.
 *
 * @param {float} gain Volum gain.
 */
Ovoid.Sound.prototype.volum = function(gain) {
  
  if(!this._alsource)
    return;
    
  if(Ovoid.al.type == 3) { 
    /* Ovoid.WEB_AUDIO_API */
    this._algain.gain.value = gain;
  } else { 
    /* Ovoid.HTML5_AUDIO */
    if(gain > 1.0) gain = 1.0;
    this._alsource.volume = gain;
  }

};

/**
 * Node's caching function.
 *
 * <br><br>Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <code>Ovoid.Queuer</code> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Sound.prototype.cachSound = function() {

  /* Petit hack pour éviter les blocages lorsque la lecture arrive en 
   * fin de buffer... c'est moche, mais bon... */
  if (this.audio && Ovoid.al.type != 3) { 
    /* Ovoid.HTML5_AUDIO */
    if(this._alsource.duration) {
      if(this._alsource.currentTime > this._alsource.duration - 0.7) {
        this._alsource.pause();
        this._alsource.currentTime = 0;
      }
    }
  }

  if ( !(this.cach & Ovoid.CACH_SOUND)) {
   
    if (Ovoid.al.type == 3) {
      /* Ovoid.WEB_AUDIO_API */
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
 * <br><br>This method is commonly used by the <code>Ovoid.Ojson</code> class
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


/**
 * Create a new array of Sound nodes.
 *
 * @param {int} count Size of the new array.
 *
 * @return {Object[]} Array of Sound node objects.
 */
Ovoid.Sound.newArray = function(count) {

  var array = new Array;
  while (count--) array.push(new Ovoid.Sound());
  return array;
};
