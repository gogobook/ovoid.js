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
 * Create a new bezier curve object.
 *
 * @class Bezier Interpolated curve object.<br><br>
 * 
 * This class provides an implementation of a Bezier interpolation curve.
 * 
 * @see Ovoid.Animation
 *
 * @param {float[]} x Curve keyframe x coordinates (time) array.
 * @param {float[]} y Curve keyframe y coordonates (value) array.
 * @param {float[]} cx Curve control-point x coordinates (time) array.
 * @param {float[]} cy Curve control-point y coordinates (value) array.
 */
Ovoid.Bspline = function(x, y, cx, cy) {

  /* composants de courbe */
  this._x = x;       /* keys time */
  this._y = y;       /* keys vals */
  this._cx = cx;     /* cp bezier Time */
  this._cy = cy;     /* cp bezier vals */
  this._n = x.length;    /* nb keys */
  this._nc = cx.length;  /* nb bezier cp */

  /* controles d'animation */
  this._t = 0.0;     /* time cursor */
  this._d = 0.0;       /* key2key duration */
  this._i = this._n;    /* key2key keys index cursor */
  this._e = (this._n * 2) - 1;  /* key2key index limit */
  this._stop = false;

  /* composants d'interpolation */
  this._p = 0.0;     /* key2key phase */
  this._u1 = 0.0;      /* key0 cp Time bezier phase */
  this._u2 = 0.0;      /* key1 cp Time bezier phase */
  this._c1 = 0.0;      /* key0 cp bezier value */
  this._c2 = 0.0;      /* key1 cp bezier value */
  this._y1 = 0.0;      /* key0 value */
  this._y2 = 0.0;      /* key1 value */

  /* on normalise les coordonnées temporelles des control-point
   * cx relativement a la durée des segements. les données absolues
   * n'ayant aucune utilité pour l'interpolation autant precalculer
   * les valeurs normaliser et remplacer les valeurs.
   */
  var i, d;
  var i = this._n;
  while (i < this._e) {
    d = this._x[(i + 1) % this._n] - this._x[(i) % this._n];
    /* out */
    this._cx[((i * 2) + 1) % this._nc] = (this._cx[((i * 2) + 1) % this._nc] -
                    this._x[(i) % this._n]) / d;
    /*  in */
    this._cx[((i * 2) + 2) % this._nc] = (this._cx[((i * 2) + 2) % this._nc] -
                    this._x[(i) % this._n]) / d;
    i++;
  }

  /* La courbe bezier d'un segement est decrit tel que
   *
   *       u1,c1               u2,c2
   *        o                    o
   *       /                      \
   *      /   __..---''''---..__   \
   * 0,y1/.-''                  ''-.\1,y2
   *
   * où:
   * 0  = valeur normalisé temporel (x) de départ (toujours à 0)
   * 1  = valeur normalisé temporel (x) d'arrivée (toujours à 1)
   * u1 = Control-point normalisé temporel (x) OUT tangent de la
   *    keyframe de départ
   * u2 = Control-point normalisé temporel (x) IN tangent de la
   *    keyframe d'arrivée
   * y1 = valeur (y) de la keyframe de départ
   * y2 = valeur (y) de la keyframe d'arrivée
   * c1 = Control-point de valeur (y) OUT tangent de la
   *    keyframe de départ
   * c2 = Control-point de valeur (y) IN tangent de la
   *    keyframe d'arrivée
   */
   
   this.seekStart(false, 0.0);

};


/**
 * Place the time cursor to the begining.<br><br>
 *
 * Place the curve's time cursor to the begining plus the given offset value, 
 * and interpolate data according to the given interpolation option.
 * 
 * @param {bool} xerp Interpolation flag. Tell to use the linear or bezier 
 * interpotation algorythme to compute output data. If true, the bezier
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} offset Time offset form the begining.
 */
Ovoid.Bspline.prototype.seekStart = function(xerp, offset) {

  this._i = this._n;

  /* composants d'interpolation lineaire */
  this._y1 = this._y[(this._i) % this._n];
  this._y2 = this._y[(this._i + 1) % this._n];

  this._t = offset;
  this._d = this._x[(this._i + 1) % this._n] - this._x[(this._i) % this._n];

  if (xerp) {
    /* composants control point beziers */

    /* composants in et out sont entrelacés :
     *
     * i =       0        1        2
     *    -----y--------y--------y
     *        i   o    i   o    i
     * in =   0   1    2   3    4
     *
     * */
    this._c1 = this._cy[((this._i * 2) + 1) % this._nc]; /* out */
    this._c2 = this._cy[((this._i * 2) + 2) % this._nc]; /*  in */

    this._u1 = this._cx[((this._i * 2) + 1) % this._nc]; /* out */
    this._u2 = this._cx[((this._i * 2) + 2) % this._nc]; /*  in */
  }

  this._p = this._t / this._d;
};


/**
 * Place the time cursor to the end.<br><br>
 *
 * Place the curve's time cursor to the end minus the given offset value, 
 * and interpolate data according to the given interpolation option.
 * 
 * @param {bool} xerp Interpolation flag. Tell to use the linear or bezier 
 * interpotation algorythme to compute output data. If true, the bezier
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} offset Time offset form the end.
 */
Ovoid.Bspline.prototype.seekEnd = function(xerp, offset) {

  this._i = this._e - 1;

  /* composants d'interpolation lineaire */
  this._y1 = this._y[(this._i) % this._n];
  this._y2 = this._y[(this._i + 1) % this._n];

  this._d = this._x[(this._i + 1) % this._n] - this._x[(this._i) % this._n];
  this._t = this._d + offset;

  if (xerp) {
    /* composants control point beziers */

    /* composants in et out sont entrelacés :
     *
     * i =       0        1        2
     *    -----y--------y--------y
     *        i   o    i   o    i
     * in =   0   1    2   3    4
     *
     * */
    this._c1 = this._cy[((this._i * 2) + 1) % this._nc]; /* out */
    this._c2 = this._cy[((this._i * 2) + 2) % this._nc]; /*  in */

    this._u1 = this._cx[((this._i * 2) + 1) % this._nc]; /* out */
    this._u2 = this._cx[((this._i * 2) + 2) % this._nc]; /*  in */
  }

  this._p = this._t / this._d;
};


/**
 * Move the time cursor forward.<br><br>
 *
 * Move the curve's time cursor forward according the given time offset, 
 * and interpolate data according to the given interpolation option.
 * 
 * @param {bool} xerp Interpolation flag. Tell to use the linear or bezier 
 * interpotation algorythme to compute output data. If true, the bezier
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} seconds A positive time delta to seek forward.
 */
Ovoid.Bspline.prototype.seekForward = function(xerp, seconds) {

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
      /* composants control point beziers */
      this._c1 = this._cy[((this._i * 2) + 1) % this._nc]; /* out */
      this._c2 = this._cy[((this._i * 2) + 2) % this._nc]; /*  in */

      /* on recalcule les coordonnées temporelles des
       * control-point relativement a la durée du segment */
      this._u1 = this._cx[((this._i * 2) + 1) % this._nc]; /* out */
      this._u2 = this._cx[((this._i * 2) + 2) % this._nc]; /*  in */
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
 * @param {bool} xerp Interpolation flag. Tell to use the linear or bezier 
 * interpotation algorythme to compute output data. If true, the bezier
 * interpolation is used, otherwize the linear interpolation is used.
 * @param {float} seconds A negative time delta to seek backward.
 */
Ovoid.Bspline.prototype.seekBackward = function(xerp, seconds) {

  this._t += seconds;

  if (this._t < 0.0) {
    
    /* Parcour des clefs jusqu'a ce que d rattrape t */
    while ( this._t <= 0.0 ) {
      this._i--;

      if (this._i < this._n + 1) {
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
      /* composants control point beziers */
      this._c1 = this._cy[((this._i * 2) + 1) % this._nc]; /* out */
      this._c2 = this._cy[((this._i * 2) + 2) % this._nc]; /*  in */

      /* on recalcule les coordonnées temporelles des
       * control-point relativement a la durée du segment */
      this._u1 = this._cx[((this._i * 2) + 1) % this._nc]; /* out */
      this._u2 = this._cx[((this._i * 2) + 2) % this._nc]; /*  in */
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
 * @param {bool} xerp Interpolation flag. Tell to use the linear or bezier 
 * interpotation algorythme to compute output data. If true, the bezier
 * interpolation is used, otherwize the linear interpolation is used.
 *
 * @return {float} Interpolated value at the current time position.
 */
Ovoid.Bspline.prototype.getOutput = function(xerp) {

  /* si l'interpolation est autre que lineaire (=0) */
  if (xerp) { /* interpolation bezier */

    /* le calcul des bezier se fait en deux etapes :
     * 1)   Calcul de 'Qx' l'interpolation bezier selon les
     *    coordonnées x (temps) des control-points, pour phase 'p'
     * 2) Calcul de 'Qy' l'interpolation bezier selon les
     *    coordonnée y (valeur) des control-points, pour phase 'Qx'
     *
     * Qx = Qx(p ) = B0(p )0.0 + B1(p )X1 + B2(p )X2 + B3(p )1.0
     * Y  = Qy(Qx) = B0(Qx)Y0 + B1(Qx)Y1 + B2(Qx)Y2 + B3(Qx)Y3
     *
     * note: X0 et X1 sont respectivement 0.0 et 1.0 car les valeurs
     * sont normalisés et relatives à la durée du segment.
     *
     * this._y1 * Math.pow(1-this._p,3) + 3 *
     * this._c1 * this._p * Math.pow(1-this._p,2) + 3 *
     * this._c2 * Math.pow(this._p,2) * (1-this._p) +
     * this._y2 * Math.pow(this._p,3)
     */

    /* calcul de l'interpolation de phase. Simplifié car X0 et X3 sont
     * egales a 0.0 et 1.0 */
    var qx = 3 * this._u1 * this._p * Math.pow(1 - this._p, 2) + 3 *
        this._u2 * Math.pow(this._p, 2) * (1 - this._p) +
        1.0 * Math.pow(this._p, 3);

    /* calcul de l'interpolation finale */
    return this._y1 * Math.pow(1 - qx, 3) + 3 *
        this._c1 * qx * Math.pow(1 - qx, 2) + 3 *
            this._c2 * Math.pow(qx, 2) * (1 - qx) +
            this._y2 * Math.pow(qx, 3);

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
Ovoid.Bspline.prototype.toJSON = function() {
  
  var o = new Object();
  o['t'] = 'Bspline';
  o['x'] = new Array();
  for (var i = 0; i < this._x.length; i++)
    o['x'][i] = this._x[i];
  o['y'] = new Array();
  for (var i = 0; i < this._y.length; i++)
    o['y'][i] = this._y[i];
  o['cx'] = new Array();
  for (var i = 0; i < this._cx.length; i++)
    o['cx'][i] = this._cx[i];
  o['cy'] = new Array();
  for (var i = 0; i < this._cy.length; i++)
    o['cy'][i] = this._cy[i];
  o['n'] = this._n;
  o['nc'] = this._nc;
  return o;
};
