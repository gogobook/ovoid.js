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
 * @class Sound node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Sound node is used to describe a world sound source. Inherited from the 
 * Transform node, it is a transformable node. That means the node can be moved
 * rotated, scaled, since it evolve in the world 3D space. the Sound node takes 
 * an Audio node as "audio buffer source". <br>
 * Like the Mesh node is a "shape" for Body nodes, the Audio node is a kind of 
 * "shape" for Sound nodes. So you guess that you can (and it's hardly 
 * recommended) use the same Audio node as audio source for several Sound nodes 
 * at the same time.
 * <br>
 * <br>
 * If available, the Sound node use the W3C Web Audio API, in other case, it use
 * the HTML5 audio element object. If the Web Audio API is available, the sound
 * node can act as a spacialised sound source. 
 * <br>
 * <br>
 * Note: The global audio and sound implementation is at early stage.
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
  switch(Ovoid.al.type)
  {
    case 1: /* Ovoid.HTML5_AUDIO */
    break;
    case 2: /* Ovoid.MOZ_AUDIO_API */
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      this._alsource = Ovoid.al.createBufferSource();
      this._algain = Ovoid.al.createGainNode();
      this._alpanner = Ovoid.al.createPanner();
      /* non local par defaut */
      this._algain.connect(Ovoid.al.destination);
    break;
  }
  
  this.unCach(Ovoid.CACH_SOUND);
};
Ovoid.Sound.prototype = new Ovoid.Transform;
Ovoid.Sound.prototype.constructor = Ovoid.Sound;

/**
 * Spatialize sound.
 * 
 * <br><br>Sets the sound as spatialized or standard flat sound.
 *
 * @param {bool} e If true the sound is make spatial sound, otherwize the 
 * sound is make standard flat sound.
 */
Ovoid.Sound.prototype.spatialize = function(e) {
  
  if(Ovoid.al.type == 3) { 
    /* Ovoid.WEBKIT_AUDIO_API */
    this._alpanner.disconnect();
    this._algain.disconnect();
    if(!e) {
      this._algain.connect(Ovoid.al.destination);
      this.flat = true;
    } else {
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
 * Define panner cone.
 * 
 * <br><br>Sets the sound's panner cone parameters according to the specified
 * values.
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
 * Define panner dinstances.
 * 
 * <br><br>Sets the sound's panner dinstances parameters according to the specified
 * values.
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
 * Link Audio node.
 *
 * <br><br>Sets the specified Audio node as audio source buffer for this instance.
 * 
 * @param {Audio} audio Audio object.
 * 
 * @see Ovoid.Audio
 */
Ovoid.Sound.prototype.setAudio = function(audio) {

  switch(Ovoid.al.type)
  {
    case 1: /* Ovoid.HTML5_AUDIO */
        this._alsource = audio._albuffer.cloneNode(true);
    break;
    case 2: /* Ovoid.MOZ_AUDIO_API */
        this._alsource = audio._albuffer.cloneNode(true);
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
    break;
  }
  
  /* crée la dépendence */
  if (this.audio != null) {
    this.breakDepend(this.audio);
  }
  this.audio = audio;
  this.makeDepend(audio);
};


/**
 * Loop playing.
 * 
 * <br><br>Sets whether the Sound should loop.
 *
 * @param {bool} enable Enable or disable loop playing.
 */
Ovoid.Sound.prototype.setLoop = function(e) {
  
  if(!this._alsource)
    return;
    
  switch(Ovoid.al.type)
  {
    case 1: /* Ovoid.HTML5_AUDIO */
      this._alsource.loop = e;
    break;
    case 2: /* Ovoid.MOZ_AUDIO_API */
      this._alsource.loop = e;
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      this._alsource.loop = e;
    break;
  }
};


/**
 * Play sound.
 * 
 * <br><br>Plays the Sound's audio buffer source.
 */
Ovoid.Sound.prototype.play = function() {
  
  if(!this._alsource)
    return;

  switch(Ovoid.al.type)
  {
    case 1: /* Ovoid.HTML5_AUDIO */
      this._alsource.play();
    break;
    case 2: /* Ovoid.MOZ_AUDIO_API */
      this._alsource.currentTime = 0;
      this._alsource.play();
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      /* He bien oui, il faut refaire tout ça pour 
       * rejouer un son... */
      this._alsource = Ovoid.al.createBufferSource();
      if(this.flat) 
        this._alsource.connect(this._algain);
      else
        this._alsource.connect(this._alpanner);
      this._alsource.buffer = this.audio._albuffer;
      this._alsource.noteOn(0);
    break;
  }
};


/**
 * Stop sound.
 * 
 * <br><br>Stops the Sound's audio buffer source.
 */
Ovoid.Sound.prototype.stop = function() {
  
  if(!this._alsource)
    return;

  switch(Ovoid.al.type)
  {
    case 1: /* Ovoid.HTML5_AUDIO */
      this._alsource.pause();
    break;
    case 2: /* Ovoid.MOZ_AUDIO_API */
      this._alsource.pause();
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      this._alsource.noteOff(0);
    break;
  }
};


/**
 * Sound volum.
 * 
 * <br><br>Sets the Sound's base gain.
 *
 * @param {float} gain Volum gain.
 */
Ovoid.Sound.prototype.volum = function(gain) {
  
  if(!this._alsource)
    return;
    
  switch(Ovoid.al.type)
  {
    case 1: /* Ovoid.HTML5_AUDIO */
      this._alsource.volume = gain;
    break;
    case 2: /* Ovoid.MOZ_AUDIO_API */
      this._alsource.volume = gain;
    break;
    case 3: /* Ovoid.WEBKIT_AUDIO_API */
      this._algain.gain.value = gain;
    break;
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
  if (this.audio && Ovoid.al.type < 3) {
    
    if(this._alsource.duration) {
      if(this._alsource.currentTime > this._alsource.duration - 0.7) {
        this._alsource.pause();
        this._alsource.currentTime = 0;
      }
    }
  }

  if ( !(this.cach & Ovoid.CACH_SOUND)) {
   
    if (Ovoid.al.type == 3) {
      /* Ovoid.WEBKIT_AUDIO_API */
      this._alpanner.coneInnerAngle = this.innerCone;
      this._alpanner.coneOuterAngle = this.outerCone;
      this._alpanner.coneOuterGain = this.outerGain;
      this._alpanner.refDistance = this.refDistance;
      this._alpanner.maxDistance = this.maxDistance;
      this._alpanner.rolloffFactor = this.rolloffFactor;
    } else {

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
  o['type'] = Ovoid.SOUND;
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
  /* Ovoid.Transform */
  o['pivot'] = this.pivot;
  o['scaling'] = this.scaling;
  o['translation'] = this.translation;
  o['orientation'] = this.orientation;
  o['rotation'] = this.rotation;
  /* Ovoid.Sound */
  o['audio'] = this.audio?this.audio.uid:'null';
  o['flat'] =  this.flat;
  if(this._alpanner) {
    o['coneInnerAngle'] = this._alpanner.coneInnerAngle;
    o['coneOuterAngle'] = this._alpanner.coneOuterAngle;
    o['coneOuterGain'] = this._alpanner.coneOuterGain;
    o['refDistance'] = this._alpanner.refDistance;
    o['maxDistance'] = this._alpanner.maxDistance;
    o['rolloffFactor'] = this._alpanner.rolloffFactor;
  }
  if(this._alsource) {
    o['loop'] = this._alsource.loop
  } else {
    o['loop'] = false;
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
