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
 * Animation node constructor.
 * 
 * @class Animation node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Animation node is a Constraint node and, as its name indicates, the 
 * node used to animate the other nodes such as transformable nodes (Transform). 
 * An Animation node traditionnally animates one and only one target node. 
 * Animation nodes are usually not created on the fly and are more often 
 * created by importing Collada/DAE scene files. 
 * <br>
 * <br>
 * To create an Animation from nothing, you have to create relevant 
 * curve objects and assign them to the Animation node with the appropriate 
 * <code>set*spline</code> method depending the curve type.
 * 
 * @extends Ovoid.Constraint
 *
 * @param {string} name Name of the node.
 */
Ovoid.Animation = function(name) {

  Ovoid.Constraint.call(this);
  /** node type */
  this.type |= Ovoid.ANIMATION;
  /** Node name 
   * @type string */
  this.name = name;
  /** Animation playing stat.
   * @type bool */
  this.playing = false;
  /** Animation looping stat.
   * @type bool */
  this.loop = false;
  /** Animation ended stat.
   * @type bool */
  this.ended = false;
  /** Animation smoothing flag.
   * Tell if the animation curves should be interpolated using linear or full 
   * algorythme. Linear interpolation is often sufficiant and performance 
   * saver.
   * @type bool */
  this.smooth = false;
  /** Animation playing factor.
   * Define the time factor to play and interpolate the animation. The factor 
   * can be negative to play the animation backward. For example a value of -2.0
   * will play the animation backward twice the normal speed.
   * @type float */
  this.factor = 1.0;
  /** Overridable triggered function.
   * Function triggered once the animation is end.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the Animation's target node.
   * <br><br>
   * <blockcode>
   * animation.onended = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field
   * @type Function
   */
  this.onended = function(node) {};
  /** Animation format. */
  this._format = 0;
  /** Animation channel curves */
  this._channel = new Array(21);
  /** Animation output array */
  this._output = new Float32Array(21);
};
Ovoid.Animation.prototype = new Ovoid.Constraint;
Ovoid.Animation.prototype.constructor = Ovoid.Animation;


/**
 * Assign a curve to a target channel.
 * 
 * Assign an linear-cosin interpolated curve to the specified target channel.
 *
 * @param {bitmask} f Curve target channel. Can be one the following symbolic 
 * constant:<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_R (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_G (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_B (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_A (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_VISIBILITY (not yet implemented)<br>
 * @param {float[]} x Curve keyframe times Array.
 * @param {float[]} y Curve keyframe values Array.
 */
Ovoid.Animation.prototype.setCspline = function(f, x, y) {

  this._format |= f;
  for (var i = 0, b = 0x1, P = 0; i < 21; i++, b <<= 1) {
    if (f & b) {
      this._channel[i] = new Ovoid.Cspline(x, y);
    }
  }
};


/**
 * Assign a curve to a target channel.
 * 
 * Assign an Hermit interpolated curve to the specified target channel.
 *
 * @param {bitmask} f Curve target channel. Can be one the following symbolic 
 * constant:<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_R (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_G (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_B (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_A (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_VISIBILITY (not yet implemented)<br>
 * @param {float[]} x Curve keyframe time array.
 * @param {float[]} y Curve keyframe value array.
 * @param {float[]} v Curve Tangent vector array.
 */
Ovoid.Animation.prototype.setHspline = function(f, x, y, v) {

  this._format |= f;
  for (var i = 0, b = 0x1, P = 0; i < 21; i++, b <<= 1) {
    if (f & b) {
      this._channel[i] = new Ovoid.Hspline(x, y, v);
    }
  }
};


/**
 * Assign a curve to a target channel.
 * 
 * Assign an Bezier interpolated curve to the specified target channel.
 *
 * @param {bitmask} f Curve target channel. Can be one the following symbolic 
 * constant:<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_ROTATE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_ORIENTE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_X,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_Y,<br>
 * Ovoid.ANIMATION_CHANNEL_SCALE_Z,<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_R (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_G (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_B (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_COLOR_A (not yet implemented),<br>
 * Ovoid.ANIMATION_CHANNEL_VISIBILITY (not yet implemented)<br>
 * @param {float[]} x Curve keyframe time array.
 * @param {float[]} y Curve keyframe value array.
 * @param {float[]} cx Curve control-point time array.
 * @param {float[]} cy Curve control-point value array.
 */
Ovoid.Animation.prototype.setBspline = function(f, x, y, cx, cy) {

  this._format |= f;
  for (var i = 0, b = 0x1, P = 0; i < 21; i++, b <<= 1) {
    if (f & b) {
      this._channel[i] = new Ovoid.Bspline(x, y, cx, cy);
    }
  }
};


/**
 * Set animation loop.
 * 
 * <br><br>Enable or disable the animation looping.
 *
 * @param {bool} loop Loop flag value to set.
 */
Ovoid.Animation.prototype.setLoop = function(loop) {

  this.loop = loop;
};


/**
 * Stop animation.
 * 
 * <br><br>Stop to play the animation.
 */
Ovoid.Animation.prototype.stop = function() {

  if (!this.playing) return;
  this.playing = false;
};


/**
 * Play animation.
 * 
 * <br><br>Start or restart to play the animation according to the specified
 * playing factor.
 *
 * @param {float} factor The time factor to play and interpolate the animation. 
 * The factor can be negative to play the animation backward. For example a 
 * value of -2.0 will play the animation backward twice the normal speed.
 */
Ovoid.Animation.prototype.play = function(factor) {

  if (factor)
    this.factor = factor;

  if (this.ended) {
    while (i--) {
      if (this._channel[i]) this._channel[i]._stop = false;
    }
  }

  this.playing = true;
};


/**
 * Rewind animation.
 * 
 * <br><br>Rewind the animation according to the specified
 * playing factor.
 *
 * @param {float} factor The time factor to rewind the animation. 
 * A positive value will set the animation at its begining, a negative value 
 * will set the animation at its end.
 */
Ovoid.Animation.prototype.rewind = function(factor) {

  var i = 32;

  if (factor)
    this.factor = factor;

  if (this.factor > 0.0) {
    while (i--) {
      if (this._channel[i]) this._channel[i].seekStart(this.smooth, 0);
      if (this._channel[i]) this._channel[i]._stop = false;
    }
  } else {
    while (i--) {
      if (this._channel[i]) this._channel[i].seekEnd(this.smooth, 0);
      if (this._channel[i]) this._channel[i]._stop = false;
    }
  }
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
Ovoid.Animation.prototype.cachAnimation = function() {

  if (this.playing)
  {
    this.playing = false;

    /* Avance/recule les curves et update les output */
    var qt = Ovoid.Timer.quantum * this.factor;
    var i = 32;
    if (this.factor > 0.0) {
      while (i--) {
        if (this._channel[i]) {
          if (!this._channel[i]._stop) {
            this._channel[i].seekForward(this.smooth, qt);
            this._output[i] = this._channel[i].getOutput(this.smooth);
            this.playing = true;
          }
        }
      }
    } else {
      while (i--) {
        if (this._channel[i]) {
          if (!this._channel[i]._stop) {
            this._channel[i].seekBackward(this.smooth, qt);
            this._output[i] = this._channel[i].getOutput(this.smooth);
            this.playing = true;
          }
        }
      }
    }

    /* Controle d'animation play/end/loop */
    if (!this.playing) {
      if (this.loop) {
        i = 32;
        while (i--) {
          if (this._channel[i]) this._channel[i]._stop = false;
        }
        this.ended = false;
        this.playing = true;
      } else {
        this.ended = true;
        this.onended(this);
        return;
      }
    }

    /* Application des valeurs output à la node Transform */
    if (this._format & Ovoid.ANIMATION_CHANNEL_TRANSLATE)
    {
      this.target.translation.setv(this._output.subarray(0, 3));
      this.target.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
    }

    if (this._format & Ovoid.ANIMATION_CHANNEL_ROTATE)
    {
      this.target.rotation.fromEulerXyz(this._output[3],
                                        this._output[4],
                                        this._output[5]);

      this.target.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
    }

    if (this._format & Ovoid.ANIMATION_CHANNEL_ORIENTE) {

      this.body.orientation.fromEulerXyz(this._output[6],
          this._output[7],
          this._output[8]);

      this.target.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
    }

    if (this._format & Ovoid.ANIMATION_CHANNEL_SCALE) {
      this.target.scaling.setv(this._output.subarray(9, 12));
      this.target.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
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
Ovoid.Animation.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.ANIMATION;
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
  /* Ovoid.Constraint */
  o['target'] = this.target?this.target.uid:'null';
  /* Ovoid.Animation */
  o['format'] = this._format;
  o['playing'] = this.playing;
  o['loop'] = this.loop;
  o['ended'] = this.ended;
  o['smooth'] = this.smooth;
  o['factor'] = this.factor;

  o['channel'] = new Array(21);
  for (var i = 0; i < 21; i++) {
    if(this._channel[i]) {
      o['channel'][i] = this._channel[i];
    } else {
      o['channel'][i] = 'null';
    }
  }
  o['onended'] = String(this.onended);
  return o;
};
