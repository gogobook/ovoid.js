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
 * @class Animation node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Animation node is a Constraint node who apply an prerecorded animation 
 * to one other node. Animations are composed of several curves which describes 
 * the value interpolation over the time. The Animation node is a dependency 
 * node and does not takes place directly in 
 * the 3D world. The Animation node is typically assigned to one and only one 
 * other node.<br><br>
 * 
 * <blockcode>
 * var youpi = scene.create(Ovoid.ANIMATION, "youpiAnim");<br>
 * youpi.setCspline(Ovoid.ANIMATION_CHANNEL_ROTATE_X, keyTimes, keyValues);<br>
 * <br>
 * youpi.setTarget(box);<br>
 * youpi.play();<br>
 * </blockcode><br><br>
 * 
 * <b>Animation channels</b><br><br>
 * 
 * The Animation node acts as an attributes modifier for the targeted node. An 
 * animation channel is defined by one animation curve which modify one 
 * attribute (for example : X translation, Z Rotation, etc...). Attributes are 
 * not all currently supported, or, so to speak, can be animated.<br><br>
 * The currently implemented channels are the following ones:<br><br>
 * <ul>
 * <li>Translation X (Ovoid.ANIMATION_CHANNEL_TRANSLATE_X)</li>
 * <li>Translation Y (Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y)</li>
 * <li>Translation Z (Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z</li>
 * <li>Rotation (euler) X (Ovoid.ANIMATION_CHANNEL_ROTATE_X)</li>
 * <li>Rotation (euler) Y (Ovoid.ANIMATION_CHANNEL_ROTATE_Y)</li>
 * <li>Rotation (euler) Z (Ovoid.ANIMATION_CHANNEL_ROTATE_Z)</li>
 * <li>Orientation (euler) X (Ovoid.ANIMATION_CHANNEL_ORIENTE_X)</li>
 * <li>Orientation (euler) Y (Ovoid.ANIMATION_CHANNEL_ORIENTE_Y)</li>
 * <li>Orientation (euler) Z (Ovoid.ANIMATION_CHANNEL_ORIENTE_Z)</li>
 * <li>Scalling X (Ovoid.ANIMATION_CHANNEL_SCALE_X)</li>
 * <li>Scalling Y (Ovoid.ANIMATION_CHANNEL_SCALE_Y)</li>
 * <li>Scalling Z (Ovoid.ANIMATION_CHANNEL_SCALE_Z)</li>
 * </ul>
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
  /** Overridable triggered function.<br><br>
   * 
   * This function is triggered each time the animation ends.<br><br>
   * 
   * The function accepts one parameter which is the involved 'this' instance.<br><br>
   * 
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
 * Create curve on animation channel.<br><br>
 * 
 * Creates an linear/cosin interpolation curve to the specified animation 
 * channel according to the specified data arrays.<br><br>
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
 * Create curve on animation channel.<br><br>
 * 
 * Creates an Hermit interpolation curve to the specified animation 
 * channel according to the specified data arrays.<br><br>
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
 * Create curve on animation channel.<br><br>
 * 
 * Creates an Bezier interpolation curve to the specified animation 
 * channel according to the specified data arrays.<br><br>
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
 * Set animation loop.<br><br>
 * 
 * Enable or disable the animation looping.
 *
 * @param {bool} loop Boolean to enable or disable.
 */
Ovoid.Animation.prototype.setLoop = function(loop) {

  this.loop = loop;
};


/**
 * Stop animation.<br><br>
 * 
 * Stop or pause the animation at the current time.
 */
Ovoid.Animation.prototype.stop = function() {

  if (!this.playing) return;
  this.playing = false;
};


/**
 * Play animation.<br><br>
 * 
 * Play the animation from the current time with the specified pitch.
 *
 * @param {float} factor Pitch time factor.
 * The factor can be positive to increase the animation pitch or negative to 
 * play the animation backward. For example a value of -2.0 will play the 
 * animation backward twice the normal speed.
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
 * Rewind animation.<br><br>
 * 
 * Rewind the animation at the end or the begining according to the specified 
 * pitch.
 *
 * @param {float} factor Pitch time factor.
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
 * Node's caching function.<br><br>
 *
 * Ovoid implements a node's caching system to prevent useless data computing, 
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
    if(this.target[0]) {
      if (this._format & Ovoid.ANIMATION_CHANNEL_TRANSLATE)
      {
        this.target[0].translation.setv(this._output.subarray(0, 3));
        this.target[0].unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
      }

      if (this._format & Ovoid.ANIMATION_CHANNEL_ROTATE)
      {
        this.target[0].rotation.fromEulerXyz(this._output[3],
                                          this._output[4],
                                          this._output[5]);

        this.target[0].unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
      }

      if (this._format & Ovoid.ANIMATION_CHANNEL_ORIENTE) {

        this.body.orientation.fromEulerXyz(this._output[6],
            this._output[7],
            this._output[8]);

        this.target[0].unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
      }

      if (this._format & Ovoid.ANIMATION_CHANNEL_SCALE) {
        this.target[0].scaling.setv(this._output.subarray(9, 12));
        this.target[0].unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
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
  o['bvolumemin'] = this.boundingBox.min;
  o['bvolumemax'] = this.boundingBox.max;
  o['bvolumerad'] = this.boundingSphere.radius;
  /* Ovoid.Constraint */
  o['target'] = new Array();
  for(var i = 0; i < this.target.length; i++)
    o['target'][i] = this.target[i].uid;
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
