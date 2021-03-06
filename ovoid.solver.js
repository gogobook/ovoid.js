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
 * @class Solver Module Class.<br><br>
 * 
 * The Solver class implements a physics engine. This is 
 * what is called a Module class because used as core module for the 
 * Ovoid.Instance class. A Module class is a part of Instance class and 
 * can be used only within the Instance class.<br><br>
 * 
 * The Solver is the main physics engine of the Instance and computes 
 * the collision detection and reposes between scene's rigid bodys.<br><br>
 * 
 * This Module class does not provide public data or method since  it is 
 * an internal Module who does not offer usefull data to be retrieved or 
 * way to control anything.<br><br>
 * 
 * For more details about rigid body, collision control and interactions
 * see the <a href="Ovoid.Physics.html">Ovoid.Physics</a> node 
 * documentation reference.
 * 
 * <b>Gravity</b><br><br>
 * 
 * The Solver currently work with only one constant force: Gravity. 
 * Gravity is a vector who describe the constant applyed force to all
 * rigid bodies. Gravity is defined by the 
 * <c>Instance.opt_gravity</c> option, also used by particles 
 * Emitter.<br><br>
 * 
 * <b>Iterative collision solving</b><br><br>
 * 
 * To compensate collision overlapping side effects when several objets 
 * collided to each others, the solver can use an iterative solving. 
 * Iterative solving can produce performance hit in some case, this is 
 * why you can defines the maximum iterration count, or simply disable 
 * the iterative solving.<br><br>
 * 
 * To enable or disable the iterrative solving, you can set the 
 * <c>Instance.opt_physicsIterativeSolver</c>
 * option to <c>true</c> or <c>false</c>.<br><br>
 * 
 * To define the maximum iterration count, you can set the 
 * <c>Instance.opt_physicsContactItFactor</c> option by an 
 * integer.<br><br>
 * 
 * @param {object} i Instance object to register object to.
 * 
 */
Ovoid.Solver = function(i) {
  
  /** Instance parent */
  this._i = i;


  /** Contact stack */
  this._contactq = new Ovoid.Stack(Ovoid.MAX_CONTACT_BY_CYCLE);


  /** Vector array stock for temporary computing */
  this._tmpVect = Ovoid.Vector.newArray(22);


  /** Point array stock for temporary computing */
  this._tmpPoint = Ovoid.Point.newArray(11);


  /** Point for temporary contact center computing */
  this._tmpc = new Ovoid.Point();


  /** Vector for temporary contact normal computing */
  this._tmpn = new Ovoid.Vector();

};

/**
 * Solver initialization.<br><br>
 * 
 * Global initialization method. This methode is called once during the library 
 * main initalization. It shouldn't be called a second time.
 * 
 * @see Ovoid.init
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Solver.prototype._init = function() {
  
  var i = this._contactq.length;
  while(i--) {
    this._contactq[i] = new Ovoid.Contact();
  }
  
  Ovoid._log(3, this._i, '.Solver._init', ' done');
  
  return true;
};


/**
 * Check whether bodys's contact allready exist or not.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Physics} a First Physics node to test with the second.
 * @param {Physics} b Second Physics node to test with the first.
 * 
 * @return {bool} True if any contact with the two specified bodys allready 
 * exist, false otherwise.
 */
Ovoid.Solver.prototype._hasContact = function (a, b) {

  var i = this._contactq.count; 
  while(i--) {
    if((this._contactq[i]._b[0] == b && 
        this._contactq[i]._b[1] == a) || 
        (this._contactq[i]._b[0] == a && 
        this._contactq[i]._b[1] == b)) {  
          return true;
        }
  }
  return false;
};


/**
 * Check whether two bodys are close enought or not to generate contact.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Physics} a First Physics node to test with the second.
 * @param {Physics} b Second Physics node to test with the first.
 * @param {float} m Margin tolerence to add to bounding spheres radius.
 * 
 * @return {bool} True if sphere intersect, false otherwise.
 */
Ovoid.Solver.prototype._canContact = function (a, b, m) {
  /* a.dist2(b) <= a.r2 + b.r2 + t */
  return a.target[0].boundingSphere.worldCenter.dist(
      b.target[0].boundingSphere.worldCenter) <= 
      (a.target[0].boundingSphere.radius + 
      b.target[0].boundingSphere.radius + m);
};


/**
 * Add a contact to the contact queue. This function simply set the contact at
 * the current stack position and jump stack forward.
 * 
 * @param {Physics} b0 First Physics involved in contact.
 * @param {Physics} b1 Second Physics involved in contact.
 * @param {Point} c Contact world position.
 * @param {Vector} n Contact normal.
 * @param {float} p Contact penetration.
 * @param {float} q Time delta to adjust physical parameters.
 */
Ovoid.Solver.prototype._addContact = function(b0, b1, c, n, p) {

    if (this._contactq.isFull()) {
      Ovoid._log(2, this._i, ".Solver._addContact", " contact stack overflow.");
      return;
    }
    /* init le contact courent dans la liste */
    this._contactq.current().set(b0, b1, c, n, p,  this._i.Timer.quantum);
    /* Contact suivant dans la pile */
    this._contactq.forward();
    /* Lance les fonctions oncontact */
    b0.oncontact(b1, c, n);
    if(b1) b1.oncontact(b0, c, n);
};


/**
 * Solve collision between box and landscape mesh.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Physics} a First Physic node to test collision as box.
 * @param {Physics} l Second Physic node to test collision as landscape.
 */
Ovoid.Solver.prototype._getContactB2L = function (a, b) {
  
  /* On retrouve le mesh du landscape pour tester les collisions */
  var mesh = null;
  if(b.target[0].shape) {
    if(b.target[0].shape.type & Ovoid.MESH) {
        mesh = b.target[0].shape;
    }
  }
  
  if(!mesh) 
    return;
  
  /* La boundingSphere du body */
  var Ba = a.target[0].boundingBox;
  var Bb = b.target[0].boundingBox;
  
  /* La matrices de transformation du landscape */
  var Tb = b.target[0].worldMatrix;
  var Ta = a.target[0].worldMatrix;
  
  /* Transforme le centre de la box dans le repère du landscape */
  var Lc = this._tmpPoint[8];
  Lc.transform4InverseOf(Ba.worldCenter, Tb);
  
  /* On calcul le rayon maximum de la box pour verifier si 
   * la sphere englobant la box est susceptible de collisionner 
   * ou non */
  var br = Ba.max.dist(Ba.min);
  
  /* Constitution des 8 vertices de la box qu'on transforme */
  var bv = new Array(8);
  bv[0] = this._tmpPoint[0];
  bv[0].set(Ba.min.v[0], Ba.min.v[1], Ba.min.v[2], 1.0);
  bv[1] = this._tmpPoint[1];
  bv[1].set(Ba.min.v[0], Ba.min.v[1], Ba.max.v[2], 1.0);
  bv[2] = this._tmpPoint[2];
  bv[2].set(Ba.max.v[0], Ba.min.v[1], Ba.min.v[2], 1.0);
  bv[3] = this._tmpPoint[3];
  bv[3].set(Ba.max.v[0], Ba.min.v[1], Ba.max.v[2], 1.0);
  bv[4] = this._tmpPoint[4];
  bv[4].set(Ba.min.v[0], Ba.max.v[1], Ba.min.v[2], 1.0);
  bv[5] = this._tmpPoint[5];
  bv[5].set(Ba.min.v[0], Ba.max.v[1], Ba.max.v[2], 1.0);
  bv[6] = this._tmpPoint[6];
  bv[6].set(Ba.max.v[0], Ba.max.v[1], Ba.min.v[2], 1.0);
  bv[7] = this._tmpPoint[7];
  bv[7].set(Ba.max.v[0], Ba.max.v[1], Ba.max.v[2], 1.0);

  var j = 8;
  /* on transforme les vertices du box */
  while(j--) {
    /* selon la box */
    bv[j].transform4(Ta);
    /* puis en inverse du landscape pour l'avoir dans l'espace du landscape */
    bv[j].transform4Inverse(Tb);
  }
  
  /* Informations de contact */
  var nC = 0;
  var P = 0.0;
  var C = this._tmpc;
  C.set(0.0,0.0,0.0,1.0);
  var N = this._tmpn;
  N.set(0.0,0.0,0.0);
  var nD = 0.0;
  var nN = new Ovoid.Vector();
  var nP = new Ovoid.Point();
  
  /* trois vertices et une normale */
  var v0, v1, v2, n;
  /* stuff pour le calcul du point dans le triangle */
  var t0 = this._tmpVect[1];
  var t1 = this._tmpVect[2];
  var t2 = this._tmpVect[3];
  var dot00, dot01, dot02, dot11, dot12;
  var f, u, v;
  /* distance */
  var d;
 
  /* parcourre la liste des triangles */
  var i = mesh.triangles[0].length;
  while(i--) {
    /* d = distance au plan du centre de la box */    
    n = mesh.triangles[0][i].normal;
    d = Lc.dot(n) + mesh.triangles[0][i].equation;
    /* si l'objet est derière la face on passe */
    if(d < 0.0) continue;
    /* test de collision avec le rayon max de la box */
    if(d > br) continue;
    
    /* On test la collision avec chaque point  */
    j = 8
    while(j--) {
      /* d = distance au plan du vertex de la box */
      d = bv[j].dot(n) + mesh.triangles[0][i].equation;
      if(d <= 0.0) {
        /* On verifie que le coin de la box est dans la face */
        v0 = mesh.vertices[0][mesh.triangles[0][i].index[0]].p;
        v1 = mesh.vertices[0][mesh.triangles[0][i].index[1]].p;
        v2 = mesh.vertices[0][mesh.triangles[0][i].index[2]].p;
        
        t0.subOf(v2, v0);
        t1.subOf(v1, v0);
        t2.subOf(Lc, v0);
        
        dot00 = t0.dot(t0);
        dot01 = t0.dot(t1);
        dot11 = t1.dot(t1);
        dot02 = t0.dot(t2);
        dot12 = t1.dot(t2);
        
        f = 1.0 /  (dot00 * dot11 - dot01 * dot01);
        u = (dot11 * dot02 - dot01 * dot12) * f;
        v = (dot00 * dot12 - dot01 * dot02) * f;

        if ( (u >= 0.0) && (v >= 0.0) && (u + v < 1.0) ) {
          /* Retrouve la normale du contact en coordonnée monde  */
          nN.transform4Of(n, Tb);
          nP.transform4Of(bv[j], Tb);
          nD += -d;
          N.addBy(nN);
          C.addBy(nP);
          /*
          N.transform4Of(n, Tb);
          N.normalize();
          // on retransforme le point pour l'avoir en coordonnée monde
          C.transform4Of(bv[j], Tb);
          // Ajoute un contact
          Ovoid.Solver._addContact(a, null, C, N, -d);
          */
          nC++;
          if(nC == 4) 
            break; // On se limite à 4 contacts par landscape
        }
      }
    }
    if(nC) { 
      if(nC > 1) {
        N.normalize();
        nD /= nC;
        C.v[0] /= nC;
        C.v[1] /= nC;
        C.v[2] /= nC;
        C.v[3] = 1.0;
      }
      this._addContact(a, null, C, N, nD*1.5);
      delete nN;
      delete nP;
      return;
    }
  }
  delete nN;
  delete nP;
};


/**
 * Solve collision between spheres and landscape mesh.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} a First Physic node to test collision as sphere.
 * @param {Object} l Second Physic node to test collision as landscape.
 */
Ovoid.Solver.prototype._getContactS2L = function (a, b) {
 
  /* On retrouve le mesh du landscape pour tester les collisions */
  var mesh = null;
  if(b.target[0].shape) {
    if(b.target[0].shape.type & Ovoid.MESH) {
        mesh = b.target[0].shape;
    }
  }
  
  if(!mesh) 
    return;

  /* La boundingSphere du body */
  var Sa = a.target[0].boundingSphere;
  
  /* La matrices de transformation du landscape */
  var Tb = b.target[0].worldMatrix;
  var Ta = a.target[0].worldMatrix;
  
  /* Transforme la sphere dans le repère du landscape */
  var Lc = this._tmpPoint[0];
  Lc.transform4InverseOf(Sa.worldCenter, Tb);
  
  /* trois vertices et une normale */
  var v0, v1, v2, n;
  /* stuff pour le calcul du point dans le triangle */
  var t0 = this._tmpVect[1];
  var t1 = this._tmpVect[2];
  var t2 = this._tmpVect[3];
  var dot00, dot01, dot02, dot11, dot12;
  var f, u, v;
  /* distance */
  var d;
  
  /* Nombre de contact */
  var nC = 0;

  /* parcourre la liste des triangles */
  var i = mesh.triangles[0].length;
  while(i--) {
    n = mesh.triangles[0][i].normal;
    /* distance au plan */
    d = Lc.dot(n) +  mesh.triangles[0][i].equation;
    /* si l'objet est derière la face on passe */
    if(d < 0.0) 
      continue;
    /* une collision est-elle possible ? */
    if(d < Sa.radius) {
      /* On verifie que le point est sur la face */
      v0 = mesh.vertices[0][mesh.triangles[0][i].index[0]].p;
      v1 = mesh.vertices[0][mesh.triangles[0][i].index[1]].p;
      v2 = mesh.vertices[0][mesh.triangles[0][i].index[2]].p;
      
      t0.subOf(v2, v0);
      t1.subOf(v1, v0);
      t2.subOf(Lc, v0);
      
      dot00 = t0.dot(t0);
      dot01 = t0.dot(t1);
      dot02 = t0.dot(t2);
      dot11 = t1.dot(t1);
      dot12 = t1.dot(t2);
      
      f = 1.0 /  (dot00 * dot11 - dot01 * dot01);
      u = (dot11 * dot02 - dot01 * dot12) * f;
      v = (dot00 * dot12 - dot01 * dot02) * f;
      
      if ( (u >= 0.0) && (v >= 0.0) && (u + v < 1.0) ) {
        /* Informations de contact */
        var P = 0.0;
        var C = this._tmpc;
        var N = this._tmpn;
        /* Penetration */
        P = Sa.radius - d;
        /* Retrouve la normale du contact en coordonnée monde  */
        N.transform4Of(n, Tb);
        var Np = this._tmpVect[0];
        Np.copy(N);
        /* Ho... mais qu'est-ce que j'ai fais là ?!! j'étais saoul ?
         * Je garde cette hérésie en souvenir... */
        //Np.scaleBy(-d);
        //C.addOf(Lc, Np);
        //C.v[3] = 1.0;
        //C.transform4(Tb);
        Np.scaleBy(-1.0);
        Np.scaleBy(Sa.radius);
        C.addOf(Sa.worldCenter, Np);
        C.v[3] = 1.0;
        /* Ajoute un contact */
        this._addContact(a, null, C, N, P);
        return; // On se limite à un contact par landscape
      }
    }
  }
};


/**
 * Solve collision between two spheres and generate appropriate
 * contact.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} a First Physic node to test collision as sphere.
 * @param {Object} b Second Physic node to test collision as sphere.
 */
Ovoid.Solver.prototype._getContactS2S = function (a, b) {
  
  /* Les boundingBox et boundingSphere des deux bodys */
  var Sa = a.target[0].boundingSphere;
  var Sb = b.target[0].boundingSphere;
  
  /* vecteur entre les deux body */
  var atob = this._tmpVect[16];
  atob.subOf(Sa.worldCenter, Sb.worldCenter);
  
  var d = atob.size();
  var r = Sa.radius + Sb.radius;
  
  /* Collision possible ? */
  if (d > r) 
    return;

  /* Informations de contact */
  var P = 0.0;
  var C = this._tmpc;
  var N = this._tmpn;
  
  P = r - d;
  atob.normalize();
  N.copy(atob);
  atob.scaleBy(Sa.radius);
  C.addOf(Sa.worldCenter, atob);

  /* Ajoute un contact */
  this._addContact(a, b, C, N, P);
  return;
};


/**
 * Solve collision between a box and a sphere and generate appropriate
 * contact.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} a First Physic node to test collision as box.
 * @param {Object} b Second Physic node to test collision as sphere.
 */
Ovoid.Solver.prototype._getContactB2S = function (a, b) {
  
  /* Les boundingBox et boundingSphere des deux bodys */
  var Ba = a.target[0].boundingBox;
  var Sb = b.target[0].boundingSphere;
  /* Les matrices de transformation de la box */
  var Ta = a.target[0].worldMatrix;
  
  /* Transforme la sphere dans le repère de la box */
  var Lc = this._tmpPoint[0];
  Lc.transform4InverseOf(Sb.worldCenter, Ta);
  
  /* Informations de contact */
  var P = 0.0;
  var C = this._tmpc;
  var N = this._tmpn;
  
  C.copy(Lc);
  
  /* On clampe les coordonnées aux paroies de la box */
  if (Lc.v[0] > Ba.hsize.v[0])  C.v[0] = Ba.hsize.v[0];
  if (Lc.v[0] < -Ba.hsize.v[0])  C.v[0] = -Ba.hsize.v[0];
  if (Lc.v[1] > Ba.hsize.v[1])  C.v[1] = Ba.hsize.v[1];
  if (Lc.v[1] < -Ba.hsize.v[1])  C.v[1] = -Ba.hsize.v[1];
  if (Lc.v[2] > Ba.hsize.v[2])  C.v[2] = Ba.hsize.v[2];
  if (Lc.v[2] < -Ba.hsize.v[2])  C.v[2] = -Ba.hsize.v[2];
  
  /* on ajuste par rapport au centre de la box */
  C.addBy(Ba.center);
  C.v[3] = 1.0;

  /* y'a-t-il bien contact ? */
  var r = Sb.radius;
  var d = C.dist(Lc);
  
  if (d > r) 
    return;
        
  /* replace le point en coordonnée monde */
  C.transform4(Ta);
  N.subOf(C, Sb.worldCenter);
  N.normalize();
  P = r - d;
  
  /* Ajoute un contact */
  this._addContact(a, b, C, N, P);
  return;
};


/**
 * Solve collision between two boxes and generate appropriate contact.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} a First Physic node to test collision as box.
 * @param {Object} b Second Physic node to test collision as box.
 */
Ovoid.Solver.prototype._getContactB2B = function (a, b) {

  var i;
  /* Les boundingBox des deux bodys */
  var Ba = a.target[0].boundingBox;
  var Bb = b.target[0].boundingBox;
  /* Les matrices de transformation des deux bodys */
  var Ta = a.target[0].worldMatrix;
  var Tb = b.target[0].worldMatrix;

  /* vecteur entre les deux body */
  var btoa = this._tmpVect[16];
  btoa.subOf(Bb.worldCenter, Ba.worldCenter);
    
  /* Le tableau de vecteur pour les axes overlas */
  var olaps = this._tmpVect;

  /* constitue la liste des axes de projection pour les test d'overlaps */
  /* Les axes principaux de chaque box */
  olaps[0 ].set(Ta.m[ 0], Ta.m[ 1], Ta.m[ 2]);
  olaps[1 ].set(Ta.m[ 4], Ta.m[ 5], Ta.m[ 6]);
  olaps[2 ].set(Ta.m[ 8], Ta.m[ 9], Ta.m[10]);
  olaps[3 ].set(Tb.m[ 0], Tb.m[ 1], Tb.m[ 2]);
  olaps[4 ].set(Tb.m[ 4], Tb.m[ 5], Tb.m[ 6]);
  olaps[5 ].set(Tb.m[ 8], Tb.m[ 9], Tb.m[10]);
  /* Les axes cross product pour les contacts edge/edge ou edge/face */
  olaps[6 ].crossOf(olaps[0], olaps[3]);
  olaps[7 ].crossOf(olaps[0], olaps[4]);
  olaps[8 ].crossOf(olaps[0], olaps[5]);
  olaps[9 ].crossOf(olaps[1], olaps[3]);
  olaps[10].crossOf(olaps[1], olaps[4]);
  olaps[11].crossOf(olaps[1], olaps[5]);
  olaps[12].crossOf(olaps[2], olaps[3]);
  olaps[13].crossOf(olaps[2], olaps[4]);
  olaps[14].crossOf(olaps[2], olaps[5]);

  /* On test la penetration des box sur tous les axes en rentenant la 
   * penetration la moins importante, c'est l'axe de notre penetration */
  var pja, pjb, dab;
  
  /* axis penetration */
  var p;
  /* min penetration */
  var cp = Ovoid.FLOAT_MAX;
  /* best axis index */
  var ap = -1;
  var ma = -1;
  for (i = 0; i < 15; i++) {

    /* projection des boxes selon les différents axes. 
     * 
     * Proj = halfsize.x * abs(axis.dot(transform.Xaxis)) + 
     *    halfsize.y * abs(axis.dot(transform.Yaxis)) +
     *    halfsize.z * abs(axis.dot(transform.Zaxis))
     * 
     * transform = worldTransform de la box
     * halfsize = halfsize de la box
     * axis = axe selon lequel la projection s'effectue.
     */
    
    /* On réutilise les axes overlaps en lieu et place des axes de 
     * transformation, puisque ce sont les mêmes */
    pja = (Ba.hsize.v[0] * Math.abs(olaps[i].dot(olaps[0]))) +
        (Ba.hsize.v[1] * Math.abs(olaps[i].dot(olaps[1]))) +
        (Ba.hsize.v[2] * Math.abs(olaps[i].dot(olaps[2])));
        
    pjb = (Bb.hsize.v[0] * Math.abs(olaps[i].dot(olaps[3]))) +
        (Bb.hsize.v[1] * Math.abs(olaps[i].dot(olaps[4]))) +
        (Bb.hsize.v[2] * Math.abs(olaps[i].dot(olaps[5])));
    
    dab = Math.abs(btoa.dot(olaps[i]));
    
    p = (pja + pjb) - dab;

    /* pas de penetration sur un axe signifie qu'il n'y a pas
     * contact */
    if(p < 0.0) 
      return;
    
    /* on note la penetration la plus faible et l'axe correspondant */
    if(p < cp) {
      cp = p;
      ap = i;
      /* on garde l'axe de penetration correspondant aux axes principaux en cas 
       * de contact edge/face */
      if(i < 6)  ma = ap;
    }
  }
  
  if(ap == -1) 
    return;

  /* Informations de contact */
  var P = 0.0;
  var C = this._tmpc;
  var N = this._tmpn;
        
  P = cp;
  
  /* selon l'index de axe de penetration on a différent types de contacts */
  if (ap > 5) {
    /* entre 6 et 14 c'est un contact edge-edge ou edge-face */

    /* il faut retrouver l'axe de chaque edge, ils correspondent 
     * aux deux axes dont l'axe de projection est le résultat du produit
     * vectoriel */
    var ae1 = Math.floor((ap-6) / 3);
    var ae2 = (ap-6) % 3;
    
    /* on recupère l'axe de collision pour normal */
    
    /* On verifie que les boxes ne sont pas allignés, donnant un
     * vecteur a 0 0 0 */
    if( (olaps[ap].v[0] + olaps[ap].v[1] + olaps[ap].v[2]) == 0.0) {
      /* ma est l'indexe de l'axe majeur ou la penetration est la plus faible */ 
      N.copy(olaps[ma]);
    } else {
      N.copy(olaps[ap]);
    }
    N.normalize();

    /* La normale devrait pointer du bodA au bodB selon cas on définie
     * les deux normales dans un sens ou dans l'autre */
    if (N.dot(btoa) > 0.0) N.scaleBy(-1.0);

    /* il faut retrouver les deux points sur edege les plus proches du point de 
     * collision */
    var e1p = this._tmpVect[17];
    e1p.copy(Ba.hsize);
    var e2p = this._tmpVect[18];
    e2p.copy(Bb.hsize);
  
    /* Encore une fois on recupere les overlaps en lieu et place des axes de
     * transformation puisque ce sont ceux-là même */

    e1p.v[ae1] = 0.0;
    if ( olaps[0].dot(N) > 0) e1p.v[0] *= -1.0;
    if ( olaps[1].dot(N) > 0) e1p.v[1] *= -1.0;
    if ( olaps[2].dot(N) > 0) e1p.v[2] *= -1.0;
    /* reajuste par rapport au pivot de la box */
    e1p.addBy(Ba.center);
    
    e2p.v[ae2] = 0.0;
    if ( olaps[3].dot(N) < 0) e2p.v[0] *= -1.0;
    if ( olaps[4].dot(N) < 0) e2p.v[1] *= -1.0;
    if ( olaps[5].dot(N) < 0) e2p.v[2] *= -1.0;
    /* reajuste par rapport au pivot de la box */
    e2p.addBy(Bb.center);
    
    /* On translate seulement, car les axes sont déja orientés */
    var xx, yy, zz;
    xx = e1p.v[0] * Ta.m[0] + e1p.v[1] * Ta.m[4] + 
        e1p.v[2] * Ta.m[8] + Ta.m[12];
    yy = e1p.v[0] * Ta.m[1] + e1p.v[1] * Ta.m[5] + 
        e1p.v[2] * Ta.m[9] + Ta.m[13];
    zz =  e1p.v[0] * Ta.m[2] + e1p.v[1] * Ta.m[6] + 
        e1p.v[2] * Ta.m[10] + Ta.m[14];
    e1p.set(xx,yy,zz);
    
    xx = e2p.v[0] * Tb.m[0] + e2p.v[1] * Tb.m[4] + 
        e2p.v[2] * Tb.m[8] + Tb.m[12];
    yy = e2p.v[0] * Tb.m[1] + e2p.v[1] * Tb.m[5] + 
        e2p.v[2] * Tb.m[9] + Tb.m[13];
    zz =  e2p.v[0] * Tb.m[2] + e2p.v[1] * Tb.m[6] + 
        e2p.v[2] * Tb.m[10] + Tb.m[14];   
    e2p.set(xx,yy,zz);
    
    /* Avec un point-on-edege pour chaque edge, l'axe du edge et la taille
     * de chaque edge, il faut maintenant trouver le point d'intersection */
    
    /* Chaque edge est décrit par un point, une direction et une taille. 
     * 
     * e1p = point on edge1
     * e2p = point on edge2 
     * e1d = direction edge1 
     * e2d = direction edge2 
     * e1s = size edge1 
     * e2s = size edge2 
     * */
    
    var e1d = olaps[ae1];
    var e2d = olaps[ae2+3]; 
    
    var e1s = Ba.hsize.v[ae1];
    var e2s = Bb.hsize.v[ae2];
    
    /* on récupere le vecteur entre les deux points on edge */
    var e1ptoe2p = this._tmpVect[19];
    e1ptoe2p.subOf(e1p, e2p);
    
    /* taille (au carré) des deux vecteurs direction de edge */
    var e1dm = e1d.size2();
    var e2dm = e2d.size2();
    /* l'angle entre les deux direction */
    var eda = e2d.dot(e1d);

    /* angle entre les deux directions et le point to point */
    var e1dpa = e1d.dot(e1ptoe2p);
    var e2dpa = e2d.dot(e1ptoe2p);

    var denom = e1dm * e2dm - eda * eda;
    
    /* zero signifie que les deux edges sont paralèlles */
    if (Math.abs(denom) < 0.001) {

      (ma > 2)?C.copy(e1p):C.copy(e2p);
      
      /* Ajoute un contact */
      this._addContact(a, b, C, N, P);
      return true;
    }
    
    var mua = (eda * e2dpa - e2dm * e1dpa) / denom;
    var mub = (e1dm * e2dpa - eda * e1dpa) / denom;
    
    /* Si l'un ou l'autre des edges à le point le plus proche hors des limites, 
     * alors les edges ne sont pas croisés, c'est donc un contact edge-face. 
     * 
     * Notre point est sur un edge, qui est connu selon ma > 2.
     */
  
    if (mua > e1s || mua < -e1s || mub > e2s ||  mub < -e2s) {
      
      (ma > 2)?C.copy(e1p):C.copy(e2p);
      
      /* Ajoute un contact */
      this._addContact(a, b, C, N, P);
      return;
      
    } else {
        /* on retrouve le point d'intersection des deux edges */
      var c1 = this._tmpVect[20];
      var c2 = this._tmpVect[21];
      
      e1d.scaleBy(mua);
      e2d.scaleBy(mub);
      
      c1.addOf(e1p, e1d);
      c1.scaleBy(0.5);
      
      c2.addOf(e2p, e2d);
      c2.scaleBy(0.5);
      
      C.addOf(c1, c2);
      
      /* Ajoute un contact */
      this._addContact(a, b, C, N, P);
      return;
    }
  } else {

    /* Notre axe donne la normal */
    N.copy(olaps[ap]);
    N.normalize();

    if (ap > 2) { /* entre 3 et 5 c'est un contact point box1 -> face box2 */
    
      /* La normale devrait pointer du bodA au bodB */
      if (N.dot(btoa) > 0.0) N.scaleBy(-1.0);
      
      /* on retrouve la coordonnée du point */
      C.copy(Ba.hsize);
      /* Selon l'angle entre la normal on parametre le point, ici il s'agit de
       * trois dot product avec les axes de la world matrix */
      if ( olaps[0].dot(N) < 0) C.v[0] *= -1.0;
      if ( olaps[1].dot(N) < 0) C.v[1] *= -1.0;
      if ( olaps[2].dot(N) < 0) C.v[2] *= -1.0;
      /* on ajuste par rapport au centre de la box */
      C.addBy(Ba.center);
      /* On s'assure que le poids est à 1 avant de transformer */
      C.v[3] = 1.0;
      /* on transforme le point */
      C.transform4(Ta);
    } else { /* entre 0 et 2 c'est un contact point box2 -> face box1 */
      /* on inverse le vecteur btoa pour le rendre 'a to b' */
      btoa.scaleBy(-1.0);
      
      /* La normale devrait pointer du bodA au bodB */
      if (N.dot(btoa) > 0.0) N.scaleBy(-1.0);
      
      /* même principe qu'au dessus mais on inverse les roles */
      C.copy(Bb.hsize);
      if ( olaps[3].dot(N) < 0) C.v[0] *= -1.0;
      if ( olaps[4].dot(N) < 0) C.v[1] *= -1.0;
      if ( olaps[5].dot(N) < 0) C.v[2] *= -1.0;
      C.addBy(Bb.center);
      C.v[3] = 1.0;
      C.transform4(Tb);
    }
    /* Ajoute un contact */
    this._addContact(a, b, C, N, P);
    return;
  }
};


/**
 * Detect all contacts between physic nodes.
 */
Ovoid.Solver.prototype._detectContacts = function() {
  
  /* Reset le contact stack */
  this._contactq.empty();

  var a, b, i, j;
  
  i = this._i.Queuer.qphycs.count;
  while(i--) {
    j = this._i.Queuer.qphycs.count;
    while(j--) {
      
      if(j != i && !this._contactq.isFull()) {
        
        a = this._i.Queuer.qphycs[i];
        b = this._i.Queuer.qphycs[j];
        
        /* Si les deux body sont trop éloignés pour rentrer en contact
         * on peut laisser tomber */
        if(!this._canContact(a, b, 0.0))
          continue;

        if(this._hasContact(a, b))
          continue;

        /* Selon le type physic on choisi le test de contact */
        switch(a.model)
        {
          case 2: /* Ovoid.RIGID_MASSIVE_SPHERE */
            switch(b.model)
            {
              case 2: /* Ovoid.RIGID_MASSIVE_SPHERE */
                this._getContactS2S(a, b);
                break;
              case 0: /* Ovoid.RIGID_LANDSCAPE */
                /* Le CASH_PHYSICS correspond à une mise en someil, signifie donc
                 * que le physic est immobile, on ne calcul donc pas de collision
                 * avec les landscapes. */
                if (!(a.cach & Ovoid.CACH_PHYSICS))
                  this._getContactS2L(a, b);
                break;
              default: /* Ovoid.RIGID_MASSIVE_BOX */
                this._getContactB2S(b, a);
                break;
            }
            break;
          case 0: /* Ovoid.RIGID_LANDSCAPE */
            continue;
            break;
          default: /* Ovoid.RIGID_MASSIVE_BOX */
            switch(b.model)
            {
              case 2: /* Ovoid.RIGID_MASSIVE_SPHERE */
                this._getContactB2S(a, b);
                break;
              case 0: /* Ovoid.RIGID_LANDSCAPE */
                /* Le CASH_PHYSICS correspond à une mise en someil, signifie donc
                 * que le physic est immobile, on ne calcul donc pas de collision
                 * avec les landscapes */
                if (!(a.cach & Ovoid.CACH_PHYSICS))
                  this._getContactB2L(a, b);
                break;
              default: /* Ovoid.RIGID_MASSIVE_BOX */
                this._getContactB2B(a, b);
                break;
            }
            break;
        }
      }
    }
  }
};


/**
 * Solves all contacts from the contact stack in fine (High Resolution) way.
 * This function use an iterative algorithm to solve and adjust contacts 
 * interpenetration and response. (Not sure if this is very usefull)
 */
Ovoid.Solver.prototype._solveContactsHr = function() {
  
  // Resolution des contacts 
  var m = this._contactq.count * this._i.opt_physicsContactItFactor;

  var p;
  var i,c;
  var adjust = new Ovoid.Vector();
  var ci;
  var cc;
  var it;
  
  // resoud les interpenetration iterativement par ordre de severité 
  it = 0;
  while(it < m)
  {
    // trouve la plus grand penetration parmi tous les contacts 
    p = 0.0; // epsilon
    c = this._contactq.count;
    i = c;
    while(i--) {
        if(this._contactq[i]._p > p) {
            p = this._contactq[i]._p;
            c = i;
        }
    }
    if (c == this._contactq.count) break;
    cc = this._contactq[c];
    // Resoud l'interpenetration pour ce contact
    cc._adjustPositions(p);
    // Cette action a du changer la penetration d'autres bodys en contact
    // adjacents, on update donc les contacts si nécéssaire 
    i = this._contactq.count;
    while(i--) {
      ci = this._contactq[i];
      if(ci._b[0] === cc._b[0]) {
        adjust.crossOf(ci._ar[0], ci._rc[0]);
        adjust.addBy(ci._ap[0]);
        ci._p -=  ci._as[0] * adjust.dot(ci._n);
      }
      else if(ci._b[0] === cc._b[1]) {
        adjust.crossOf(ci._ar[1], ci._rc[0]);
        adjust.addBy(ci._ap[1]);
        ci._p -=  ci._as[1] * adjust.dot(ci._n);
      }
      if (ci._b[1]) {
        if (ci._b[1] === cc._b[0]) {
          adjust.crossOf(ci._ar[0], ci._rc[1]);
          adjust.addBy(ci._ap[0]);
          ci._p +=  ci._as[0] * adjust.dot(ci._n);
        }
        else if (ci._b[1] === cc._b[1]) {
          adjust.crossOf(ci._ar[1], ci._rc[1]);
          adjust.addBy(ci._ap[1]);   
          ci._p +=  ci._as[1] * adjust.dot(ci._n);
        }
      }
    }
    it++;
  }

  // resoud les interpenetration iterativement par ordre de severité 
  it = 0;
  while(it < m) {
    // trouve la plus grande magnitude d'influence parmi tous les contacts 
    d = 0.0;
    c = this._contactq.count;
    i = c;
    while(i--) {
        if(this._contactq[i]._d > d) {
            d = this._contactq[i]._d;
            c = i;
        }
    }
    if (c == this._contactq.count) break;
    cc = this._contactq[c];
    // Resoud l'impulsion pour ce contact
    cc._applyImpulses();
    // blah blah blah blah ....
    i = this._contactq.count;
    while(i--) {
  
      ci = this._contactq[i];
      if (ci._b[0]) {
        if (ci._b[0] === cc._b[0]) {
          adjust.crossOf(ci._ti[0], ci._rc[0]);
          adjust.addBy(ci._li[0]);
          adjust.transform3Inverse(ci._matrix);
          ci._v.addBy(adjust);
          ci._solveDelta(this._i.Timer.quantum);
        }
        else if (ci._b[0] === cc._b[1]) {
          adjust.crossOf(ci._ti[1], ci._rc[0]);
          adjust.addBy(ci._li[1]);
          adjust.transform3Inverse(ci._matrix);
          ci._v.addBy(adjust);
          ci._solveDelta(this._i.Timer.quantum);
        }
      }
      if (ci._b[1]) {
        if (ci._b[1]==cc._b[0]) {
          adjust.crossOf(ci._ti[0], ci._rc[1]);
          adjust.addBy(ci._li[0]);
          adjust.transform3Inverse(ci._matrix);
          ci._v.subBy(adjust);
          ci._solveDelta(this._i.Timer.quantum);
        }
        else if (ci._b[1]==cc._b[1]) {
          adjust.crossOf(ci._ti[1], ci._rc[1]);
          adjust.addBy(ci._li[1]);
          adjust.transform3Inverse(ci._matrix);
          ci._v.subBy(adjust);
          ci._solveDelta(this._i.Timer.quantum);
        }
      }
    }
    it++;
  }
};


/**
 * Solves all contacts from the contact stack in coarse (Low Resolution) way.
 * This function simply solve contact reponses in one pass.
 */
Ovoid.Solver.prototype._solveContactsLr = function() {
  
  var i = this._contactq.count;
  while(i--) {
    this._contactq[i]._adjustPositions(this._contactq[i]._p);
    this._contactq[i]._applyImpulses();
  }
};


/**
 * Solve the physics queue.<br><br>
 * 
 * Checks the current Physics stack for collisions and applies the suitable 
 * reponses for all of them.
 * 
 * This method does not takess argument because it work directly with 
 * Ovoid.Queuer stacks. This function should be called after an
 * <c>Ovoid.Queuer.QueueScene</c> call.<br><br>
 * 
 * This methode is automaticaly called at each main loop. 
 * It shoulds not be called manually.
 * 
 * @see Ovoid.Queuer
 */
Ovoid.Solver.prototype._solveQueue = function() {
  
  this._detectContacts();
  
  this._i.opt_physicsIterativeSolver?
    this._solveContactsHr():
    this._solveContactsLr();
};
