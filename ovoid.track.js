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
 * Track node object constructor.
 *
 * @class Track node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Track node is an Animation grouping node. The Track node purpose is to 
 * provide a more maniable way to play, stop or rewind several Animation nodes 
 * at once. The Track node is typically useful for rigged character animations, 
 * which have several animations (one per joint/bone) for only one animation 
 * sequence, which should all be started and ended at the same time.<br><br>
 * 
 * <blockcode>
 * var characterSet1 = scene.create(Ovoid.TRACK, "CharacterSet1");<br>
 * characterSet1.addAnimation(leftArmAnimation);<br>
 * characterSet1.addAnimation(rightArmAnimation);<br>
 * characterSet1.addAnimation(LeftLegAnimation);<br>
 * characterSet1.addAnimation(RightLegAnimation);<br>
 * characterSet1.addAnimation(HeadAnimation);<br>
 * characterSet1.play();<br>
 * </blockcode><br><br>
 * 
 * The Track node is one of the few which is not a dependency node nor a world 
 * node.  Because it does not create dependency relationship (but has animations
 * as dependencies) and is obviously not a world node.<br><br>
 * 
 * <b>Track creation at Collada import<b><br><br>
 * One Track node is created per COLLADA scene importation (if the suitable 
 * option Ovoid.DAE_CREATE_TRACK is passed in the importation method's mask 
 * parameter). The created Track node will contains all the Animation nodes 
 * imported during the importation process (which are supposed to be grouped, 
 * for example : walk animation, jump animation, run animation, etc...).
 *
 * @param {string} name Name of the node.
 */
Ovoid.Track = function(name) {

  Ovoid.Node.call(this);
  /** node type */
  this.type |= Ovoid.TRACK;
  /** node name */
  this.name = name;
  /** Animation playing flag */
  this.playing = false;
  /** Animation loop flag */
  this.loop = false;
  /** Animation ended flag */
  this.ended = false;
  /** Animation channel curves */
  this.animation = new Array();
  /** Animation overridable onended function
    * @param {Object} node Animation's target node. */
  this.onended = function(node) {};
};
Ovoid.Track.prototype = new Ovoid.Node;
Ovoid.Track.prototype.constructor = Ovoid.Track;


/**
 * Add animation.<br><br>
 * 
 * Adds an Animation node to this instance.
 *
 * @param {Animation} anim Animation object to be added.
 * 
 * @see Ovoid.Animation
 */
Ovoid.Track.prototype.addAnimation = function(anim) {

  this.animation.push(anim);
  this.makeDepend(anim);
};


/**
 * Remove animation.<br><br>
 * 
 * Removes an Animation node from this instance.
 *
 * @param {Animation} anim Animation object to be removed.
 * 
 * @see Ovoid.Animation
 */
Ovoid.Track.prototype.remAnimation = function(anim) {

  var i = this.animation.length;
  while (i--) {
    if(this.animation[i] === anim) {
      this.animation.splice(i, 1);
    }
  }
  this.breakDepend(anim);
};


/**
 * Set track loop.<br><br>
 * 
 * Enable or disable loop playing.
 *
 * @param {bool} loop Boolean to enable or disable.
 */
Ovoid.Track.prototype.setLoop = function(loop) {

  var i = this.animation.length;
  while (i--) this.animation[i].loop = loop;
};


/**
 * Set track pitch.<br><br>
 * 
 * Changes the animation pitch while playing.
 *
 * @param {float} factor Pitch time factor.
 * The factor can be positive to increase the animation pitch or negative to 
 * play the animation backward. For example a value of -2.0 will play the 
 * animation backward twice the normal speed.
 */
Ovoid.Track.prototype.setFactor = function(factor) {

  var i = this.animation.length;
  while (i--) this.animation[i].factor = factor;
};


/**
 * Play track.<br><br>
 * 
 * Play all the animations of this instance from the current time with the 
 * specified pitch.
 *
 * @param {float} factor Pitch time factor.
 * The factor can be positive to increase the animation pitch or negative to 
 * play the animation backward. For example a value of -2.0 will play the 
 * animation backward twice the normal speed.
 */
Ovoid.Track.prototype.play = function(factor) {

  var i = this.animation.length;
  while (i--) this.animation[i].play(factor);
  this.playing = true;
};


/**
 * Stop track.<br><br>
 * 
 * Stop or pause all the animations of this instance.
 */
Ovoid.Track.prototype.stop = function() {

  var i = this.animation.length;
  while (i--) this.animation[i].stop();
  this.playing = false;
};


/**
 * Rewind track.<br><br>
 * 
 * Rewind all the animation at the end or the begining according to the s
 * pecified pitch.
 *
 * @param {float} factor Pitch time factor.
 * A positive value will set the track at its begining, a negative value 
 * will set the track at its end.
 */
Ovoid.Track.prototype.rewind = function(factor) {

  var i = this.animation.length;
  while (i--) this.animation[i].rewind(factor);
  this.ended = false;
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
Ovoid.Track.prototype.cachTrack = function() {

  if (this.playing)
  {
    this.playing = false;

    var i = this.animation.length;
    while (i--) { 
      if( this.animation[i].playing ) { 
        this.playing = true;
        break;
      }
    }
  
    /* Controle d'animation play/end/loop */
    if (!this.playing) {
      if (this.loop) {
        this.rewind();
        this.playing = true;
      } else {
        this.ended = true;
        this.onended(this);
        return;
      }
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
Ovoid.Track.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.TRACK;
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
  /* Ovoid.Track */
  o['pl'] = this.playing;
  o['lo'] = this.loop;
  o['en'] = this.ended;
  o['an'] = new Array();
  for (var i = 0; i < this.animation.length; i++)
    o['an'][i] = this.animation[i].uid;
  o['oe'] = String(this.onended);
  return o;
};
