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
 * @class Aim node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Aim node is a Constraint node who apply orientation on  
 * Transform node to aim another one.<br><br> The Aim node can be applied to 
 * several constrained-target nodes.<br><br>
 * 
 * <blockcode>
 * var Aim = myOvoid.Scene.newNode(Ovoid.AIM, "aimToBox1");<br>
 * Aim.aimat = Box1;<br>
 * Aim.setTarget(Eye1);<br>
 * Aim.setTarget(Eye2);<br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Constraint
 *
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Aim = function(name, i) {

  Ovoid.Constraint.call(this);
  /** node type */
  this.type |= Ovoid.AIM;
  /** Node name 
   * @type string */
  this.name = name;
  /** Aim up vector.
   * @type Vector */
  this.upvector = new Ovoid.Vector(0.0,1.0,0.0);
  /** Aim at node
   * @type Transform */
  this.aimat = null;

  /** Invert aiming flag
   * @type bool */
  this.invert = true;
  
  /** X vector for internal usage
   * @type Vector */
  this._x = new Ovoid.Vector();
  /** Y vector for internal usage
   * @type Vector */
  this._y = new Ovoid.Vector();
  /** Z vector for internal usage
   * @type Vector */
  this._z = new Ovoid.Vector();
  
  /** Aim point for internal usage
   * @type Vector */
  this._a = new Ovoid.Point();
  
  /** Aim moved flag for internal usage
   * @type Bool */
  this._amoved = true;
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
  
};
Ovoid.Aim.prototype = new Ovoid.Constraint;
Ovoid.Aim.prototype.constructor = Ovoid.Aim;



/**
 * Set the node to be aimed.<br><br>
 *
 * Assign the specified node as aimed node of this instance. 
 * The node must be of type or inherited of Ovoid.TRANSFORM.
 * 
 * @param {Node} node Node object to set as the aimed one.
 * 
 * @see Ovoid.Node
 */
Ovoid.Aim.prototype.setAimedNode = function(node) {
  
  if(node) {
    if(node.type) {
      if(node.type & Ovoid.TRANSFORM) {
        this.aimat = node;
        return;
      }
    }
  }
  this.aimat = null;
  
};


/**
 * Set the Up vector from Vector object.<br><br>
 *
 * Defines the Up vector for aiming computation.
 * 
 * @param {Vector} vect Vector to copy as up Vector.
 */
Ovoid.Aim.prototype.setUpVector = function(vect) {
  
  this.upvector.copy(vect);
};


/**
 * Set the Up vector.<br><br>
 *
 * Defines the Up vector for aiming computation.
 * 
 * @param {Float} x X component for Up vector.
 * @param {Float} y Y component for Up vector.
 * @param {Float} z Z component for Up vector.
 */
Ovoid.Aim.prototype.setUpVectorXyz = function(x, y, z) {
  
  this.upvector.set(x, y, z);
};


/**
 * Set invert aiming.<br><br>
 *
 * Defines aiming inversion. If <c>true</c> aiming is oriented to -Z, 
 * otherwise it is oriented to +Z.
 * 
 * @param {Bool} inv Inversion flag value.
 */
Ovoid.Aim.prototype.setInvert = function(inv) {
  
  this.invert = inv;
};


/**
 * Node's caching function.<br><br>
 *
 * Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <c>Ovoid.Queuer</c> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Aim.prototype.cachAim = function() {

  if(!this.aimat)
    return;
  
  // Ca evite de tout recalculer si rien n'a bougé du aimat et du constraint'target
  if(this._a.equal(this.aimat.worldPosition)) {
    this._amoved=false
  } else {
    this._amoved=true;
    this._a.copy(this.aimat.worldPosition);
  }
  
  var i = this.target.length;
  while(i--) {
    if(!(this.target[i].cach & Ovoid.CACH_WORLD) || this._amoved) {
      
      // Construits les axes 
      if(this.invert) {
        this._z.subOf(this.target[i].worldPosition, this._a);
      } else {
        this._z.subOf(this._a, this.target[i].worldPosition);
      }
      
      // Evite la division par zero si aimat et target sont confondus ou si les vecteurs s'annullent completement
      if(this._z.v[0] == 0.0 && this._z.v[1] == 0.0 && this._z.v[2] == 0.0)
        return;

      this._z.normalize();
      this._x.crossOf(this.upvector, this._z);
      this._y.crossOf(this._z, this._x);
      
      /* Convertis les axes en angles d'euler selon le schema d'une matrice 
       * de transformation:
       * 
       * | m0=x0  m1=x1  m2=x2  |
       * | m4=y0  m5=y1  m6=y2  |
       * | m8=z0  m9=z1  m10=z2 |
       */
      var rx, ry, rz;
      var cy = Math.sqrt(this._x.v[0] * this._x.v[0] + this._x.v[1] * this._x.v[1]);
      if (cy > 0.001) {
        rx = Math.atan2(this._y.v[2], this._z.v[2]);
        ry = Math.atan2(-this._x.v[2], cy);
        rz = Math.atan2(this._x.v[1], this._x.v[0]);
      } else {
        rx = Math.atan2(-this._z.v[1], this._y.v[1]);
        ry = Math.atan2(-this._x.v[2], cy);
        rz = 0.0;
      }

      // Evite les accidents en cas d'exception arythmétique
      if( rx == NaN || ry == NaN || rz == NaN)
        return;
      // On applique la rotation au target
      this.target[i].rotateXyz(0.0,0.0,0.0,0,1);
      this.target[i].rotateXyz(rx,ry,rz);
    }
  }
  
};


/**
 * JavaScript Object Notation (JSON) serialization method.
 * 
 * <br><br>This method is commonly used by the <c>Ovoid.Ojson</c> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Aim.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.EXPRESSION;
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
  /* Ovoid.Constraint */
  o['ct'] = new Array();
  for(var i = 0; i < this.target.length; i++)
    o['ct'][i] = this.target[i].uid;
  /* Ovoid.Aim */
  o['up'] = this.upvector;
  o['at'] = (this.aimat)?this.aimat.uid:"null";

  return o;
};
