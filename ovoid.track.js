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
 * @class Track node object.
 * <br>
 * <br>
 * The Tack node is an Animation group node. Track is implemented to allow to 
 * create animation blocks which can be played or stopped all at once without 
 * having to deal with all Animations independently. Keep in mind that there is 
 * allways ONE Animation node for ONE object. So, if you have a skeletal/rig 
 * animation that involves many bones/joints, you'll also have much of 
 * Animation nodes.
 * <br>
 * <br>
 * One Track node is created, if desired, during the COLLADA scene importation. 
 * In this case, the Track node will contain all the Animations imported during 
 * the importation process (which are supposed to be grouped, for example : walk
 * animation, jump animation, run animation, etc...).
 * <br>
 *
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the new node.
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
  /** Animation time factor */
  this.factor = -1.0;
  /** Animation channel curves */
  this.animation = new Array();
  /** Animation overridable onended function
    * @param {Object} node Animation's target node. */
  this.onended = function(node) {};
};
Ovoid.Track.prototype = new Ovoid.Node;
Ovoid.Track.prototype.constructor = Ovoid.Track;


/**
 * Add animation.
 * 
 * <br><br>Adds an Animation node to this instance.
 *
 * @param {Animation} anim Animation object to be added.
 * 
 * @see Ovoid.Animation
 */
Ovoid.Track.prototype.addAnimation = function(anim) {

  this.animation.push(anim);
};



/**
 * Set track loop.
 * 
 * <br><br>Enable or disable loop playing.
 *
 * @param {bool} loop Loop flag value to set.
 */
Ovoid.Track.prototype.setLoop = function(loop) {

  var i = this.animation.length;
  while (i--) this.animation[i].loop = loop;
};


/**
 * Stop track.
 * 
 * <br><br>Stops to play all animations of this instance.
 */
Ovoid.Track.prototype.stop = function() {

  var i = this.animation.length;
  while (i--) this.animation[i].stop();
  this.playing = false;
};


/**
 * Play track.
 * 
 * <br><br>Start or restart to play all animations of this instance according 
 * to the specified playing factor.
 *
 * @param {float} factor The time factor to play and interpolate the animation. 
 * The factor can be negative to play the animation backward. For example a 
 * value of -2.0 will play the animation backward twice the normal speed.
 */
Ovoid.Track.prototype.play = function(factor) {

  var i = this.animation.length;
  while (i--) this.animation[i].play(factor);
  this.playing = true;
};


/**
 * Rewind track.
 * 
 * <br><br>Rewind all animations of this instance according to the specified
 * playing factor.
 *
 * @param {float} factor The time factor to rewind the animation. 
 * A positive value will set the animation at its begining, a negative value 
 * will set the animation at its end.
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
  o['type'] = Ovoid.TRACK;
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
  /* Ovoid.Track */
  o['playing'] = this.playing;
  o['loop'] = this.loop;
  o['ended'] = this.ended;
  o['factor'] = this.factor;
  o['animation'] = new Array();
  for (var i = 0; i < this.animation.length; i++)
    o['animation'][i] = this.animation[i].uid;
  o['onended'] = String(this.onended);
  return o;
};
