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
 * @class Hermite Interpolated curve object.<br><br>
 * 
 * This class provides an implementation of a Hermite interpolation curve. 
 * 
 * @see Ovoid.Animation
 * 
 * @param {float[]} x Curve keyframe x coordinates (time) array.
 * @param {float[]} y Curve keyframe y coordonates (value) array.
 * @param {float[]} v Curve keyframe tangent vector array.
 */
Ovoid.Hspline = function(x, y, v) {

  /* composants de courbe */
  this._x = x;             /* keys time */
  this._y = y;             /* keys vals */
  this._v = v;             /* tan vecors */
  this._n = x.length;      /* nb keys */
  this._nv = v.length;     /* nb tan vectors */

  /* controles d'animation */
  this._t = 0.0;           /* time cursor */
  this._d = 0.0;           /* key2key duration */
  this._i = this._n;        /* key2key index cursor */
  this._e = (this._n * 2) - 1;  /* key2key index limit */
  this._stop = false;

  /* composants d'interpolation */
  this._p = 0.0;           /* key2key phase */
  this._v1 = 0.0;          /* key0 tan vector IN */
  this._v2 = 0.0;          /* key1 tan vector OUT */
  this._y1 = 0.0;          /* key0 value */
  this._y2 = 0.0;          /* key1 valye */
  
  this.seekStart(false, 0.0);
};


/**
 * Place the time cursor to the begining.<br><br>
 *
 * Place the curve's time cursor to the begining plus the given offset value, 
 * and interpolate data according to the given interpolation option.
 * 
 * @param {bool} xerp Interpolation flag. Tell to use the linear or hermite 
 * interpotation algorythme to compute output data. If true, the hermite
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} offset Time offset form the begining.
 */
Ovoid.Hspline.prototype.seekStart = function(xerp, offset) {

  this._i = this._n;

  /* composants d'interpolation lineaire */
  this._y1 = this._y[(this._i) % this._n];
  this._y2 = this._y[(this._i + 1) % this._n];

  this._t = offset;
  this._d = this._x[(this._i + 1) % this._n] - this._x[(this._i) % this._n];

  if (xerp) {
    /* composants vecteurs tangeants */
    this._v1 = this._v[((this._i * 2) + 1) % this._nv]; /* out y1 */
    this._v2 = this._v[((this._i * 2) + 2) % this._nv]; /*  in y2 */
  }

  this._p = this._t / this._d;
};


/**
 * Place the time cursor to the end.<br><br>
 *
 * Place the curve's time cursor to the end minus the given offset value, 
 * and interpolate data according to the given interpolation option.
 * 
 * @param {bool} xerp Interpolation flag. Tell to use the linear or hermite 
 * interpotation algorythme to compute output data. If true, the hermite
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} offset Time offset form the end.
 */
Ovoid.Hspline.prototype.seekEnd = function(xerp, offset) {

  this._i = this._e - 1;

  /* composants d'interpolation lineaire */
  this._y1 = this._y[(this._i) % this._n];
  this._y2 = this._y[(this._i + 1) % this._n];

  this._d = this._x[(this._i + 1) % this._n] - this._x[(this._i) % this._n];
  this._t = this._d + offset;

  if (xerp) {
    /* composants vecteurs tangeants */
    this._v1 = this._v[((this._i * 2) + 1) % this._nv]; /* out y1 */
    this._v2 = this._v[((this._i * 2) + 2) % this._nv]; /*  in y2 */
  }

  this._p = this._t / this._d;
};


/**
 * Move the time cursor forward.<br><br>
 *
 * Move the curve's time cursor forward according the given time offset, 
 * and interpolate data according to the given interpolation option.
 * 
 * @param {bool} xerp Interpolation flag. Tell to use the linear or hermite 
 * interpotation algorythme to compute output data. If true, the hermite
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} seconds A positive time delta to seek forward.
 */
Ovoid.Hspline.prototype.seekForward = function(xerp, seconds) {

  this._t += seconds;
  
  if (this._t > this._d) {
    
    /* Parcour des clefs jusqu'a ce que d rattrape t */
    while ( this._t >= this._d ) {
      this._i++;

      if (this._i > this._e - 1) {
        //this.seekStart(xerp, (this._t - this._d));
        this._stop = true;
        return;
      }
      
      this._t -= this._d;
      this._d = this._x[(this._i + 1) % this._n] - this._x[(this._i) % this._n];
    }
    
    /* composants d'interpolation lineaire */
    this._y1 = this._y[(this._i) % this._n];
    this._y2 = this._y[(this._i + 1) % this._n];

    if (xerp) {
      /* composants vecteurs tangeants */
      this._v1 = this._v[((this._i * 2) + 1) % this._nv]; /* out y1 */
      this._v2 = this._v[((this._i * 2) + 2) % this._nv]; /*  in y2 */
    }
  }

  this._p = this._t / this._d;
};


/**
 * Move the time cursor backward.<br><br>
 *
 * Move the curve's time cursor backward according the given time offset, 
 * and interpolate data according to the given interpolation option.
 * 
 * @param {bool} xerp Interpolation flag. Tell to use the linear or hermite 
 * interpotation algorythme to compute output data. If true, the hermite
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} seconds A negative time delta to seek backward.
 */
Ovoid.Hspline.prototype.seekBackward = function(xerp, seconds) {

  this._t += seconds;
  
  if (this._t < 0.0) {
    
    /* Parcour des clefs jusqu'a ce que d rattrape t */
    while ( this._t <= 0.0 ) {
      
      this._i--;

      if (this._i < this._n) {
        //this.seekEnd(xerp, this._t);
        this._stop = true;
        return;
      }

      this._d = this._x[(this._i + 1) % this._n] - this._x[(this._i) % this._n];
      this._t += this._d;
    }
    
    /* composants d'interpolation lineaire */
    this._y1 = this._y[(this._i) % this._n];
    this._y2 = this._y[(this._i + 1) % this._n];

    if (xerp) {
      /* composants vecteurs tangeants */
      this._v1 = this._v[((this._i * 2) + 1) % this._nv]; /* out y1 */
      this._v2 = this._v[((this._i * 2) + 2) % this._nv]; /*  in y2 */
    }
  }
  this._p = this._t / this._d;
};


/**
 * Get interpolated value.<br><br>
 * 
 * Get the interpolated value at the current curve's time cursor according to 
 * the given interpolation option.
 *
 * @param {bool} xerp Interpolation flag. Tell to use the linear or hermite 
 * interpotation algorythme to compute output data. If true, the hermite
 * interpolation is used, otherwize the linear interpolation is used.
 *
 * @return {float} Interpolated value at the current time position.
 */
Ovoid.Hspline.prototype.getOutput = function(xerp) {

  /* si l'interpolation est autre que lineaire (=0) */
  if (xerp) { /* interpolation hermite */
    var p2 = this._p * this._p;
    var p3 = p2 * this._p;

    return (/*h1*/(2.0 * p3 - 3.0 * p2 + 1) * this._y1 +
            /*h2*/(-2.0 * p3 + 3.0 * p2) * this._y2 +
            /*h3*/(p3 - 2.0 * p2 + this._p) * this._v1 +
            /*h4*/(p3 - p2) * this._v2);

  } else { /* interpolation lineaire */
    return this._y1 + ((this._y2 - this._y1) * this._p);
  }
};


/**
 * JSON export function.
 *
 * @return {Object} Abstract Object for JSON stringify.
 * @private
 */
Ovoid.Hspline.prototype.toJSON = function() {
  
  var o = new Object();
  o['t'] = 'Hspline';
  o['x'] = new Array();
  for (var i = 0; i < this._x.length; i++)
    o['x'][i] = this._x[i];
  o['y'] = new Array();
  for (var i = 0; i < this._y.length; i++)
    o['y'][i] = this._y[i];
  o['v'] = new Array();
  for (var i = 0; i < this._v.length; i++)
    o['v'][i] = this._v[i];
  o['n'] = this._n;
  o['nv'] = this._nv;
  return o;
};
