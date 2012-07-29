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
 * Contact object constructor.
 *
 * @class Contact object.<br><br>
 * 
 * This class provides an implementation of a collision contact point with
 * local space velocity and responses data. 
 * 
 */
Ovoid.Contact = function() {
  
  /** Contact friction */
  this._f = false;
  
  /** Contact restitution */
  this._r = 0.5;
  
  /** Contact actors bodys */
  this._b = new Array(2);
  
  /** Contact penetration */
  this._p = 0.0;
  
  /** Contact center position in world coordinate */
  this._c = new Ovoid.Point();
  
  /** Contact normal in world coordinate */
  this._n = new Ovoid.Vector();
  
  /** Contact velocity at contact point */
  this._v = new Ovoid.Vector();

  /** Contact position in relative to body coordinate */
  this._rc = [new Ovoid.Vector(), new Ovoid.Vector()];
  
  /** Contact angular velocity in relative to body coordinate */
  this._rt = [new Ovoid.Vector(), new Ovoid.Vector()];
  
  /** Contact velocity delta change */
  this._d = 0.0;
  
  /** Linear response impulse influence */
  this._li = [new Ovoid.Vector(), new Ovoid.Vector()];
  
  /** Torque response impulse influence */
  this._ti = [new Ovoid.Vector(), new Ovoid.Vector()];
  
  /** Position change delta to adjuste other contact penetration */
  this._ap = [new Ovoid.Vector(), new Ovoid.Vector()];
  
  /** Rotation vector change delta to adjuste other contact 
   * penetration */
  this._ar = [new Ovoid.Vector(), new Ovoid.Vector()];
  
  this._as = [0.0, 0.0];
  
  /** Contact world to local transform matrix */
  this._matrix = new Ovoid.Matrix3();
  
};


/**
 * Calculate desired delta velocity.<br><br>
 * 
 * @param {float} q Time delta to adjust physical parameters.
 */
Ovoid.Contact.prototype._solveDelta = function(q) {
  
  /* calcul du delta de velocity */
  var av = new Ovoid.Vector();
  var fa;
  av.copy(this._b[0]._oldLinear);
  av.scaleBy(q);
  fa = av.dot(this._n);
  
  if (this._b[1]) {
    av.copy(this._b[1]._oldLinear);
    av.scaleBy(q);
    fa -= av.dot(this._n);
  }

  /* Si la velocite est tres lente on limite la restitution */
  var r = this._r;
  if (Math.abs(this._v.v[0]) < 0.25) {
      r = 0.0;
  }
  this._d = -this._v.v[0] - r * (this._v.v[0] - fa);
}

/**
 * Initialize contact data.<br><br>
 * 
 * Initialize the collision contact data between two rigid body.
 * 
 * @param {Physics} b0 The first body involved in the contact.
 * @param {Physics} b1 The second body involved in the contact.
 * @param {Point} c Contact point world position.
 * @param {Vector} n Contact normal in world coordinate.
 * @param {float} p Contact penetration.
 * @param {float} q Time delta.
 */
Ovoid.Contact.prototype.set = function(b0, b1, c, n, p, q) {
  
  if( b1 ) {
    this._f = (b0.useFriction && b1.useFriction);
    this._r = (b0.restitution * b1.restitution);
  } else {
    this._f = Ovoid.Solver.opt_landscapeFriction;
    this._r = b0.restitution;
  }
  this._b[0] = b0;
  this._b[1] = b1;
  this._c.copy(c);
  this._n.copy(n);
  this._p = p;
  
  /* On commence par créer la matrice locale au contact */
  this._matrix.m[0] = this._n.v[0];
  this._matrix.m[1] = this._n.v[1];
  this._matrix.m[2] = this._n.v[2];
  if(Math.abs(this._n.v[0]) > Math.abs(this._n.v[1])) {
    var s = 1.0 / Math.sqrt(this._n.v[2]*this._n.v[2] +
            this._n.v[0]*this._n.v[0]);
    this._matrix.m[3] = this._n.v[2] * s;
    this._matrix.m[4] = 0.0;
    this._matrix.m[5] = -this._n.v[0] * s;
    this._matrix.m[6] = this._n.v[1] * this._matrix.m[3];
    this._matrix.m[7] = this._n.v[2] * this._matrix.m[3] - 
        this._n.v[0] * this._matrix.m[5];
    this._matrix.m[8] = -this._n.v[1] * this._matrix.m[3];
    
  } else {
    var s = 1.0 / Math.sqrt(this._n.v[2]*this._n.v[2] +
            this._n.v[1]*this._n.v[1]);
    this._matrix.m[3] = 0.0;
    this._matrix.m[4] = -this._n.v[2] * s;
    this._matrix.m[5] = this._n.v[1] * s;
    this._matrix.m[6] = this._n.v[1] * this._matrix.m[5] - 
        this._n.v[2] * this._matrix.m[4];
    this._matrix.m[7] = -this._n.v[0] * this._matrix.m[5];
    this._matrix.m[8] = this._n.v[0] * this._matrix.m[4];
  }
  
  /* Les contact position relatifs à chaque object */
  this._rc[0].subOf(this._c, this._b[0].target[0].worldPosition);
  if(this._b[1]) {
    this._rc[1].subOf(this._c, this._b[1].target[0].worldPosition);
  }
  
  /* velocité locale au contact */
  var vv = new Ovoid.Vector();
  var av = new Ovoid.Vector();
  /* velocité angulaire et lineaire at point de contact */
  vv.crossOf(this._b[0].angularVelocity, this._rc[0]);
  vv.addBy(this._b[0].linearVelocity);
  /* transforme en coordonné locale au contact */
  vv.transform3Inverse(this._matrix);
  /* L'acceleration résiduelle planaire du body */
  av.copy(this._b[0]._oldLinear);
  /* par rapport au temps */
  av.scaleBy(q);
  av.transform3Inverse(this._matrix);
  av.v[0] = 0.0;
  /* On additionne les deux composantes */
  vv.addBy(av);

  /* L'acceleration au contact */
  this._v.copy(vv);
  /* même processus pour l'autre body */
  if(this._b[1]) {
    /* velocité angulaire et lineaire at point de contact */
    vv.crossOf(this._b[1].angularVelocity, this._rc[1]);
    vv.addBy(this._b[1].linearVelocity);
    /* transforme en coordonné locale au contact */
    vv.transform3Inverse(this._matrix);
    /* L'acceleration résiduelle planaire du body */
    av.copy(this._b[1]._oldLinear);
    /* par rapport au temps */
    av.scaleBy(q);
    av.transform3Inverse(this._matrix);
    av.v[0] = 0.0;
    /* On additionne les deux composantes */
    vv.addBy(av);
    
    /* la velocité est soustraite */
    this._v.subBy(vv);
  }
  
  this._solveDelta(q);
  
  /* calcul la velocité angulaire relative */
  this._rt[0].crossOf(this._rc[0], this._n);
  this._rt[0].transform3(this._b[0].itensor);
  
  if (this._b[1]) {
    this._rt[1].crossOf(this._rc[1], this._n);
    this._rt[1].transform3(this._b[1].itensor);
  }
  
};

/**
 * Adjust bodys's position and rotation to resolve interpenetration.<br><br>
 * 
 * @param {float} p Penetration offset.
 */
Ovoid.Contact.prototype._adjustPositions = function(p) {
  
  /* si p n'est pas défini on utilise la pénétration courente du contact */
 // if(p == undefined || p == null) p = this._p;
  
  /* ajustement angulaire */
  var radjust = new Ovoid.Vector();
  /* ajustement linéaire */
  var ladjust = new Ovoid.Vector();
  
  /* inertie totale */
  var tinert = 0.0;
  /* inertie lineaire (pour deux corps) */
  var linert = [0.0, 0.0];
  /* inertie angulaire (pour deux corps) */
  var ainert = [0.0, 0.0];
  
  /* Il faut calculer l'inertie pour chaque objet dans la direction de la 
   * normal */
  for (var i = 0; i < 2; i++) {
    /* si le body existe */
    if(this._b[i]) {
      
      /* Pour l'inertie angulaire on utilise le même procédé que pour calculer 
       * le changement de velocitée mais sans la friction */
      radjust.crossOf(this._rt[i], this._rc[i]);
  
      ainert[i] = radjust.dot(this._n);
      
      /* Le composant lineair est simplement l'inverse mass */
      linert[i] = this._b[i].imass;
      
      /* on garde l'inertie totale de tous les composants pour chaque body */
      tinert += ainert[i] + linert[i];
    }
  }
  
  /* Compensation de penetration angulaire */
  var adelta = [0.0, 0.0];
  /* Compensation de penetration linéaire */
  var ldelta = [0.0, 0.0];

  adelta[0] = (p * ainert[0] / tinert);
  ldelta[0] = (p * linert[0] / tinert);
  
  if (this._b[1]) {
      adelta[1] = -1.0 * (p * ainert[1] / tinert);
      ldelta[1] = -1.0 * (p * linert[1] / tinert);
  }
  
  for (var i = 0; i < 2; i++) {
    
    if (this._b[i]) {
      
      if (adelta[i] != 0.0) {
        /* direction de la rotation à appliquer */
        this._ar[i].copy(this._rt[i]);
        this._as[i] = (adelta[i] / ainert[i]);

      } else {
        this._ar[i].set(0.0,0.0,0.0);
        this._as[i] = 1.0;
      }

      /* Application du retrait linéaire */
      ladjust.copy(this._n);
      ladjust.scaleBy(ldelta[i]);
      this._b[i].target[0].translation.addBy(ladjust);
      
      radjust.copy(this._ar[i]);
      radjust.scaleBy(this._as[i] * 0.5);
      this._b[i].target[0].rotation.vectorRotateBy(radjust);
      this._b[i].target[0].rotation.normalize();
      /* On garde les informations pour modifier les autres
       * contacts */
      this._ap[i].copy(this._n);
      this._ap[i].scaleBy(ldelta[i] / this._as[i]);
    }
  }
};


/**
 * Apply the bodys's collision responses.<br><br>
 */
Ovoid.Contact.prototype._applyImpulses = function() {

  /* Impulsion du contact */
  var impulse = new Ovoid.Vector();
  
  /* sans friction le calcul est simplifié */
  if (!this._f) {
    
    /* Vecteur temporaire */
    var vv = new Ovoid.Vector();
    /* Delta de velocité */
    var vdelta = 0.0;

    for (var i = 0; i < 2; i++) {
        if(this._b[i]) {
          vv.crossOf(this._rt[i], this._rc[i]);
          vdelta += vv.dot(this._n);
          vdelta += this._b[i].imass;
      }
    }
  
    impulse.v[0] = this._d / vdelta;
    impulse.v[1] = 0;
    impulse.v[2] = 0;
      
  } else {
    /* calcul complet avec friction */

    var vdelta = new Ovoid.Matrix3();
    var T = new Float32Array(9);
    var U = new Float32Array(9);
    
    /* Calcul de la réponse de collision via multiplication de matrices 
     * 
     * L'équivalent d'un cross product dans des matrices est une multiplication
     * par une matrice "skew symetric" ou antisymétrique. On construit la 
     * matrice pour convertir entre quantités linéaire et angulaires. C'est une 
     * matrice qui sert à créer des cross product de vecteur.
     * 
     * La matrice Skew [S] est construite ainsi :
     * 
     *  0    -z     y
     * 
     *  z     0    -x
     * 
     * -y     x     0
     * 
     * La matrixs Skew [S] est composé du vecteur de point de contact relatif
     * a l'objet.
     */
    
    /* Construit la matrice pour convertir l'impulsion de contact en changement 
     * de velocité dans des coordonnées monde. Avec [S] la matrice Skew et [I]
     * la matrice de tenseur inertiel inverse :
     * 
     * [U] = [S] * [I] * [S] * -1.0 
     */
    
    /* Premiere partie : [T] = [S] * [I] */
    T[0] = -this._rc[0].v[2] * this._b[0].itensor.m[3] + 
        this._rc[0].v[1] * this._b[0].itensor.m[6];
    T[1] = -this._rc[0].v[2] * this._b[0].itensor.m[4] + 
        this._rc[0].v[1] * this._b[0].itensor.m[7];
    T[2] = -this._rc[0].v[2] * this._b[0].itensor.m[5] + 
        this._rc[0].v[1] * this._b[0].itensor.m[8];
    T[3] = this._rc[0].v[2] * this._b[0].itensor.m[0] + 
        -this._rc[0].v[0] * this._b[0].itensor.m[6];
    T[4] = this._rc[0].v[2] * this._b[0].itensor.m[1] + 
        -this._rc[0].v[0] * this._b[0].itensor.m[7];
    T[5] = this._rc[0].v[2] * this._b[0].itensor.m[2] + 
        -this._rc[0].v[0] * this._b[0].itensor.m[8];
    T[6] = -this._rc[0].v[1] * this._b[0].itensor.m[0] + 
        this._rc[0].v[0] * this._b[0].itensor.m[3];
    T[7] = -this._rc[0].v[1] * this._b[0].itensor.m[1] + 
        this._rc[0].v[0] * this._b[0].itensor.m[4];
    T[8] = -this._rc[0].v[1] * this._b[0].itensor.m[2] + 
        this._rc[0].v[0] * this._b[0].itensor.m[5];
    
    /* Seconde partie: [U] = [SI] * [S] * -1.0 */
    U[0] = (T[1] * this._rc[0].v[2] + T[2] * -this._rc[0].v[1]) * -1.0;
    U[1] = (T[0] * -this._rc[0].v[2] + T[2] * this._rc[0].v[0]) * -1.0;
    U[2] = (T[0] * this._rc[0].v[1] + T[1] * -this._rc[0].v[0]) * -1.0;
    U[3] = (T[4] * this._rc[0].v[2] + T[5] * -this._rc[0].v[1]) * -1.0;
    U[4] = (T[3] * -this._rc[0].v[2] + T[5] * this._rc[0].v[0]) * -1.0;
    U[5] = (T[3] * this._rc[0].v[1] + T[4] * -this._rc[0].v[0]) * -1.0;
    U[6] = (T[7] * this._rc[0].v[2] + T[8] * -this._rc[0].v[1]) * -1.0;
    U[7] = (T[6] * -this._rc[0].v[2] + T[8] * this._rc[0].v[0]) * -1.0;
    U[8] = (T[6] * this._rc[0].v[1] + T[7] * -this._rc[0].v[0]) * -1.0;
    
    var imass = this._b[0].imass;

    /* Même principe pour le second body */
    if (this._b[1])
    {
      /* Premiere partie : [T] = [S] * [I] */
      T[0] = -this._rc[1].v[2] * this._b[1].itensor.m[3] + 
          this._rc[1].v[1] * this._b[1].itensor.m[6];
      T[1] = -this._rc[1].v[2] * this._b[1].itensor.m[4] + 
          this._rc[1].v[1] * this._b[1].itensor.m[7];
      T[2] = -this._rc[1].v[2] * this._b[1].itensor.m[5] + 
          this._rc[1].v[1] * this._b[1].itensor.m[8];
      T[3] = this._rc[1].v[2] * this._b[1].itensor.m[0] + 
          -this._rc[1].v[0] * this._b[1].itensor.m[6];
      T[4] = this._rc[1].v[2] * this._b[1].itensor.m[1] + 
          -this._rc[1].v[0] * this._b[1].itensor.m[7];
      T[5] = this._rc[1].v[2] * this._b[1].itensor.m[2] + 
          -this._rc[1].v[0] * this._b[1].itensor.m[8];
      T[6] = -this._rc[1].v[1] * this._b[1].itensor.m[0] + 
          this._rc[1].v[0] * this._b[1].itensor.m[3];
      T[7] = -this._rc[1].v[1] * this._b[1].itensor.m[1] + 
          this._rc[1].v[0] * this._b[1].itensor.m[4];
      T[8] = -this._rc[1].v[1] * this._b[1].itensor.m[2] + 
          this._rc[1].v[0] * this._b[1].itensor.m[5];

      /* Seconde partie: [U] += [SI] * [S] * -1.0 (le résultat est ajouté
       * aux valeurs existantes) */
      U[0] += (T[1] * this._rc[1].v[2] + T[2] * -this._rc[1].v[1]) * -1.0;
      U[1] += (T[0] * -this._rc[1].v[2] + T[2] * this._rc[1].v[0]) * -1.0;
      U[2] += (T[0] * this._rc[1].v[1] + T[1] * -this._rc[1].v[0]) * -1.0;
      U[3] += (T[4] * this._rc[1].v[2] + T[5] * -this._rc[1].v[1]) * -1.0;
      U[4] += (T[3] * -this._rc[1].v[2] + T[5] * this._rc[1].v[0]) * -1.0;
      U[5] += (T[3] * this._rc[1].v[1] + T[4] * -this._rc[1].v[0]) * -1.0;
      U[6] += (T[7] * this._rc[1].v[2] + T[8] * -this._rc[1].v[1]) * -1.0;
      U[7] += (T[6] * -this._rc[1].v[2] + T[8] * this._rc[1].v[0]) * -1.0;
      U[8] += (T[6] * this._rc[1].v[1] + T[7] * -this._rc[1].v[0]) * -1.0;

      imass += this._b[1].imass;
    }

    /* On change le repère de la matrice pour la place dans les coordonnées 
     * du repère du contact. Comme pour la matrice d'inertie le calcul 
     * s'effectue via la matrice de transformation et sa transposée. 
     * 
     * Avec [L] pour matrice de transformation local au contact, [L'] sa 
     * transposée et [U] la matrice de vélocité prédemment constituée.
     * 
     * [DV] = [L'] * [U] * [L]
     */
    
    /* Premiere partie: [T] = [L'] * [U] */
    T[0] = this._matrix.m[0] * U[0] + 
        this._matrix.m[3] * U[3] + this._matrix.m[6] * U[6];
    T[1] = this._matrix.m[0] * U[1] + 
        this._matrix.m[3] * U[4] + this._matrix.m[6] * U[7];
    T[2] = this._matrix.m[0] * U[2] + 
        this._matrix.m[3] * U[5] + this._matrix.m[6] * U[8];
    T[3] = this._matrix.m[1] * U[0] + 
        this._matrix.m[4] * U[3] + this._matrix.m[7] * U[6];
    T[4] = this._matrix.m[1] * U[1] + 
        this._matrix.m[4] * U[4] + this._matrix.m[7] * U[7];
    T[5] = this._matrix.m[1] * U[2] + 
        this._matrix.m[4] * U[5] + this._matrix.m[7] * U[8];
    T[6] = this._matrix.m[2] * U[0] + 
        this._matrix.m[5] * U[3] + this._matrix.m[8] * U[6];
    T[7] = this._matrix.m[2] * U[1] + 
        this._matrix.m[5] * U[4] + this._matrix.m[8] * U[7];
    T[8] = this._matrix.m[2] * U[2] + 
        this._matrix.m[5] * U[5] + this._matrix.m[8] * U[8];
    
    /* Seconde partie: [DV] = [T] * [L] */
    vdelta.m[0] = T[0] * this._matrix.m[0] + 
        T[1] * this._matrix.m[3] + T[2] * this._matrix.m[6];
    vdelta.m[1] = T[0] * this._matrix.m[1] + 
        T[1] * this._matrix.m[4] + T[2] * this._matrix.m[7];
    vdelta.m[2] = T[0] * this._matrix.m[2] + 
        T[1] * this._matrix.m[5] + T[2] * this._matrix.m[8];
    vdelta.m[3] = T[3] * this._matrix.m[0] + 
        T[4] * this._matrix.m[3] + T[5] * this._matrix.m[6];
    vdelta.m[4] = T[3] * this._matrix.m[1] + 
        T[4] * this._matrix.m[4] + T[5] * this._matrix.m[7];
    vdelta.m[5] = T[3] * this._matrix.m[2] + 
        T[4] * this._matrix.m[5] + T[5] * this._matrix.m[8];
    vdelta.m[6] = T[6] * this._matrix.m[0] + 
        T[7] * this._matrix.m[3] + T[8] * this._matrix.m[6];
    vdelta.m[7] = T[6] * this._matrix.m[1] + 
        T[7] * this._matrix.m[4] + T[8] * this._matrix.m[7];
    vdelta.m[8] = T[6] * this._matrix.m[2] + 
        T[7] * this._matrix.m[5] + T[8] * this._matrix.m[8];
    
    /* On ajoute la velocité linéaire via les masse inverse */
    vdelta.m[0] += imass;
    vdelta.m[4] += imass;
    vdelta.m[8] += imass;

    /* valeurs de vdelta avant l'inversion */
    var vdelta0 = vdelta.m[0];
    var vdelta1 = vdelta.m[1];
    var vdelta2 = vdelta.m[2];
    
    /* On inverse la matrice pour avoir l'impulse nécéssaire par unité de 
     * vélocité */
    vdelta.toInverse();
    impulse.set(this._d, -this._v.v[1], -this._v.v[2]);
    impulse.transform3(vdelta);
    
    /* verifie les friction excessives */
    var pi = Math.sqrt(impulse.v[1]*impulse.v[1]+impulse.v[2]*impulse.v[2]);
    if(pi > impulse.v[0] * this._f) {
      impulse.v[1] /= pi;
      impulse.v[2] /= pi;
      
      impulse.v[0] = vdelta0 + vdelta1 * this._f * impulse.v[1] + vdelta2 * this._f * impulse.v[2];
      impulse.v[0] = this._d / impulse.v[0];
      impulse.v[1] *= this._f * impulse.v[0];
      impulse.v[2] *= this._f * impulse.v[0];
    }
  }
  
  /* Convertis l'impulsion en coordonnée world */
  impulse.transform3(this._matrix);
  
  /* sépare l'impulsion en couple et force linéaire */
  this._ti[0].crossOf(this._rc[0], impulse);
  this._ti[0].transform3(this._b[0].itensor);
  this._li[0].copy(impulse);
  this._li[0].scaleBy(this._b[0].imass);
  /* applique le changement de velocité */
  this._b[0].linearVelocity.addBy(this._li[0]);
  this._b[0].angularVelocity.addBy(this._ti[0]);
  this._b[0].unCach(Ovoid.CACH_INFLUENCES|Ovoid.CACH_PHYSICS);
  
  if (this._b[1]) {
    /* sépare l'impulsion en couple et force linéaire */
    this._ti[1].crossOf(impulse, this._rc[1]);
    this._ti[1].transform3(this._b[1].itensor);
    this._li[1].copy(impulse);
    this._li[1].scaleBy(-this._b[1].imass);
    /* applique le changement de velocité */
    this._b[1].linearVelocity.addBy(this._li[1]);
    this._b[1].angularVelocity.addBy(this._ti[1]);
    this._b[1].unCach(Ovoid.CACH_INFLUENCES|Ovoid.CACH_PHYSICS);
  }
};

