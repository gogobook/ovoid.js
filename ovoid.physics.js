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
 * Physics node constructor.
 * 
 * @class Physics node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Physics node implements an abstract object subjected to the laws of 
 * physics. The Physics node is a dependency node and does not takes 
 * place directly in the 3D world. It is a Constraint inherited node who modify 
 * its target node's transformations.<br><br>
 * 
 * <blockcode>
 * var phyics = scene.create(Ovoid.PHYSICS, "bodyPhysics");<br>
 * physics.model = Ovoid.RIGID_MASSIVE_SPHERE;<br>
 * physics.setTarget(body);<br>
 * </blockcode><br><br>
 * 
 * The Physics node is designed to be what is commonly called a Rigid Body. It 
 * currently provides three behaviour models:<br><br>
 * <ul>
 * <li><b>Ovoid.RIGID_MASSIVE_SPHERE</b><br>
 * The Rigid Massive Sphere model corresponds to a sphere shaped rigid body who 
 * undergoes and react to applied forces (gravity, wind... ). The collision 
 * shape is defined by the target node's bounding sphere.
 * </li>
 * <li><b>Ovoid.RIGID_MASSIVE_BOX</b><br>
 * The Rigid Massive Box model corresponds to a box shaped rigid body who 
 * undergoes and react to applied forces (gravity, wind... ). The collision 
 * shape is defined by the target node's bounding box.
 * </li>
 * <li><b>Ovoid.RIGID_LANDSCAPE</b><br>
 * The Rigid Landscape model corresponds to a mesh shaped rigid body who does 
 * not undergoes nor react to applied forces and is dedicated to be used as 
 * static collision landscape. The collision  shape is defined by the target 
 * node's mesh.
 * </li>
 * </ul>
 * 
 * @extends Ovoid.Constraint
 *
 * @param {string} name Name of the new node.
*/
Ovoid.Physics = function(name) {

  Ovoid.Constraint.call(this);
  /** Node type.
   * @type bitmask */
  this.type |= Ovoid.PHYSICS;
  /** Node name.
   * @type string */
  this.name = name;
  /** Inverse mass.
   * @type float */
  this.imass = 10.0;
  /** Inverse inertia tensor.
   * @type Matrix3 */
  this.itensor = new Ovoid.Matrix3();
  
  /** Collision model.
   * @type enum */
  this.model = Ovoid.RIGID_MASSIVE_SPHERE;
    
  /** Damping factor.
   * @type float */
  this.damping = 0.1;
  
  /** Use friction for contact.
   * @type bool */
  this.useFriction = false;
  /** Contact restitution factor.
   * @type bool */
  this.restitution = 0.5;
  
  /** Linear velocity.
   * @type Vector */
  this.linearVelocity = new Ovoid.Vector(0.0,0.0,0.0);
  /** Angular velocity.
   * @type Vector */
  this.angularVelocity = new Ovoid.Vector(0.0,0.0,0.0);
  
  /** Linear influence accumulator.
   * @type Vector */
  this.linearInfluence = new Ovoid.Vector(0.0,0.0,0.0);
  /** Torque influence accumulator.
   * @type Vector */
  this.torqueInfluence = new Ovoid.Vector(0.0,0.0,0.0);
  
  /** Last linear accumulator */
  this._oldLinear = new Ovoid.Vector(0.0,0.0,0.0);
  /** Last torque accumulator */
  this._oldTorque = new Ovoid.Vector(0.0,0.0,0.0);
  
  /** Motion factor. */
  this._motion = Ovoid.PHYSICS_MOTION_EPSILON * 10.0;

};
Ovoid.Physics.prototype = new Ovoid.Constraint;
Ovoid.Physics.prototype.constructor = Ovoid.Physics;


/**
 * Define mass.
 * 
 * <br><br>Sets the mass of this instance according to the specified value.
 *
 * @param {float} mass Mass.
 */
Ovoid.Physics.prototype.setMass = function(mass) {
  
  this.imass = 1.0/mass;
};


/**
 * Add newton influence.
 * 
 * <br><br>Applies an uniform newton force influence to this instance according to the
 * specified vector.
 *
 * @param {Vector} g Force vector.
 * 
 * @see Ovoid.Vector
 */
Ovoid.Physics.prototype.newton = function(g) {
  
  if(!(this.cach & Ovoid.CACH_PHYSICS)) {
    var mass = 1.0/this.imass;
    this.linearInfluence.v[0] += mass * g.v[0];
    this.linearInfluence.v[1] += mass * g.v[1];
    this.linearInfluence.v[2] += mass * g.v[2];
    this.unCach(Ovoid.CACH_INFLUENCES);
  }
};


/**
 * Add newton influence.
 * 
 * <br><br>Applies an uniform newton force influence to this instance according to the
 * specified x, y and z vector values.
 *
 * @param {Vector} g Force vector.
 * 
 * @see Ovoid.Vector
 */
Ovoid.Physics.prototype.newtonXyz = function(x, y, z) {
  
  if(!(this.cach & Ovoid.CACH_PHYSICS)) {
    var mass = 1.0/this.imass;
    this.linearInfluence.v[0] += mass * x;
    this.linearInfluence.v[1] += mass * y;
    this.linearInfluence.v[2] += mass * z;
    this.unCach(Ovoid.CACH_INFLUENCES);
  }
};


/**
 * Add wind influence.
 * 
 * <br><br>Applies an uniform wind force influence to this instance according to the
 * specified vector.
 *
 * @param {Vector} f Force vector.
 * 
 * @see Ovoid.Vector
 */
Ovoid.Physics.prototype.wind = function(f) {
  
  if(!(this.cach & Ovoid.CACH_PHYSICS)) {
    this.linearInfluence.addBy(f);
    this.unCach(Ovoid.CACH_INFLUENCES);
  }
};


/**
 * Add wind influence.
 * 
 * <br><br>Applies an uniform wind force influence to this instance according to the
 * specified x, y and z vector values.
 *
 * @param {Vector} f Force vector.
 * 
 * @see Ovoid.Vector
 */
Ovoid.Physics.prototype.windXyz = function(x, y, z) {
  
  if(!(this.cach & Ovoid.CACH_PHYSICS)) {
    this.linearInfluence.v[0] += x;
    this.linearInfluence.v[1] += y;
    this.linearInfluence.v[2] += z;
    this.unCach(Ovoid.CACH_INFLUENCES);
  }
};


/**
 * Ponctual impultion.
 * 
 * <br><br>Applies a ponctual force influence to this instance at the given
 * point according to the specified vector.
 *
 * @param {Vector} force Impulsion vector.
 * @param {Point} point Impulsion point.
 * 
 * @see Ovoid.Vector
 * @see Ovoid.Point
 */
Ovoid.Physics.prototype.impulse = function(force, point) {
  
  this.linearInfluence.addBy(force);

  /* vecteur radius = point -> centre de gravité */
  var rx = point.v[0] - this.target.worldPosition.v[0];
  var ry = point.v[1] - this.target.worldPosition.v[1];
  var rz = point.v[2] - this.target.worldPosition.v[2];
  
  /* torque += rvect.cross(force) */
  this.torqueInfluence.v[0] += ry * force.v[2] - rz * force.v[1];
  this.torqueInfluence.v[1] += rz * force.v[0] - rx * force.v[2];
  this.torqueInfluence.v[2] += rx * force.v[1] - ry * force.v[0];
  
  /*
   * Le couple se calcul selon l'equation T = r * F
   * où :
   * T : couple
   * r : vecteur rayon
   * F : vecteur force
   * 
   *       T  r 
   *       | / 
   * F <___|/
   *       . c
   * 
   * Le resultat est un axe de rotation dont la taille 
   * représente la force.
   */
  
  this.unCach(Ovoid.CACH_INFLUENCES|Ovoid.CACH_PHYSICS);
};


/**
 * Clear physics influences.
 * <br>
 * <br>
 * Reset all influence, velocity and torque to its original values.
 *
 */
Ovoid.Physics.prototype.clearInfluences = function() {
    
    // reset velocity et torque
    this.linearVelocity.set(0.0,0.0,0.0);
    this.angularVelocity.set(0.0,0.0,0.0);
    // reset influences
    this.linearInfluence.set(0.0,0.0,0.0);
    this.torqueInfluence.set(0.0,0.0,0.0);
    // Motion par defaut
    this._motion = Ovoid.PHYSICS_MOTION_EPSILON * 10.0;
};


/**
 * Get instance's motion.
 * <br>
 * <br>
 * Returns the current motion factor of this instance.
 * 
 * @returns {float} Current motion factor.
 */
Ovoid.Physics.prototype.getMotion = function() {
  
  return this._motion;
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
Ovoid.Physics.prototype.cachPhysics = function() {
    
  if(!this.model) /* Ovoid.RIGID_LANDSCAPE */
    return;

  if(!(this.cach & Ovoid.CACH_PHYSICS)) {
    
    /* Update l'inertia tensor */
    if( (this.target.boundingBox.hsize.v[0] + this.target.boundingBox.hsize.v[1] +
        this.target.boundingBox.hsize.v[2]) > 0.0) {

      var mass = 1.0/this.imass;
      var Ix, Iy, Iz;
      
      /* il s'agit d'un inverse, comme la masse */
      switch(this.model)
      {
        case 2: /* Ovoid.RIGID_MASSIVE_SPHERE */

          var r2 = (this.target.boundingSphere.radius * 2.0);
          r2 *= r2;
          
          Ix = 1.0 / (0.3 * mass * r2 );
          Iy = 1.0 / (0.3 * mass * r2 );
          Iz = 1.0 / (0.3 * mass * r2 );
          
          break;
        default: /* Ovoid.RIGID_MASSIVE_BOX */

          var sx = (this.target.boundingBox.hsize.v[0] * 2.0);
          var sy = (this.target.boundingBox.hsize.v[1] * 2.0);
          var sz = (this.target.boundingBox.hsize.v[2] * 2.0);
          sx *= sx;
          sy *= sy;
          sz *= sz;
          Ix = 1.0 / (0.333 * mass * (sy + sz) );
          Iy = 1.0 / (0.333 * mass * (sx + sz) );
          Iz = 1.0 / (0.333 * mass * (sx + sy) );
      
          break;
      }

      /* transforme le tenseur inertiel en coordonnée monde : 
       * [Iw] = [R] * [I] * [R'] */
      
      /* Premiere etape: [RI] = [R] * [I] */
      var RI = new Float32Array(9);
      RI[0] = this.target.worldMatrix.m[0] * Ix;
      RI[1] = this.target.worldMatrix.m[1] * Iy;
      RI[2] = this.target.worldMatrix.m[2] * Iz;
      RI[3] = this.target.worldMatrix.m[4] * Ix;
      RI[4] = this.target.worldMatrix.m[5] * Iy;
      RI[5] = this.target.worldMatrix.m[6] * Iz;
      RI[6] = this.target.worldMatrix.m[8] * Ix;
      RI[7] = this.target.worldMatrix.m[9] * Iy;
      RI[8] = this.target.worldMatrix.m[10] * Iz;
      
      /* Seconde etape: [Iw] = [RI] * [R'] */
      this.itensor.m[0] = RI[0] * this.target.worldMatrix.m[0] + 
          RI[1] * this.target.worldMatrix.m[1] + 
          RI[2] * this.target.worldMatrix.m[2];
      this.itensor.m[1] = RI[0] * this.target.worldMatrix.m[4] + 
          RI[1] * this.target.worldMatrix.m[5] + 
          RI[2] * this.target.worldMatrix.m[6];
      this.itensor.m[2] = RI[0] * this.target.worldMatrix.m[8] + 
          RI[1] * this.target.worldMatrix.m[9] + 
          RI[2] * this.target.worldMatrix.m[10];
      this.itensor.m[3] = RI[3] * this.target.worldMatrix.m[0] + 
          RI[4] * this.target.worldMatrix.m[1] + 
          RI[5] * this.target.worldMatrix.m[2];
      this.itensor.m[4] = RI[3] * this.target.worldMatrix.m[4] + 
          RI[4] * this.target.worldMatrix.m[5] + 
          RI[5] * this.target.worldMatrix.m[6];
      this.itensor.m[5] = RI[3] * this.target.worldMatrix.m[8] + 
          RI[4] * this.target.worldMatrix.m[9] + 
          RI[5] * this.target.worldMatrix.m[10];
      this.itensor.m[6] = RI[6] * this.target.worldMatrix.m[0] + 
          RI[7] * this.target.worldMatrix.m[1] + 
          RI[8] * this.target.worldMatrix.m[2];
      this.itensor.m[7] = RI[6] * this.target.worldMatrix.m[4] + 
          RI[7] * this.target.worldMatrix.m[5] + 
          RI[8] * this.target.worldMatrix.m[6];
      this.itensor.m[8] = RI[6] * this.target.worldMatrix.m[8] + 
          RI[7] * this.target.worldMatrix.m[9] + 
          RI[8] * this.target.worldMatrix.m[10];

    }
    
    if(!(this.cach & Ovoid.CACH_INFLUENCES)) {    
      
      /* sommes des influences selon la masse */
      this.linearInfluence.scaleBy(this.imass);
      this.torqueInfluence.transform3(this.itensor);
      /* par le delta temporel */
      this.linearInfluence.scaleBy(Ovoid.Timer.quantum);
      this.torqueInfluence.scaleBy(Ovoid.Timer.quantum);
      /* ajoute de la velocité */
      this.linearVelocity.addBy(this.linearInfluence);
      this.angularVelocity.addBy(this.torqueInfluence);

      /* raz les influences et copie dans les lasts */
      this._oldLinear.copy(this.linearInfluence);
      this._oldTorque.copy(this.torqueInfluence);
      
      this.linearInfluence.set(0.0,0.0,0.0);
      this.torqueInfluence.set(0.0,0.0,0.0);
      
      this.addCach(Ovoid.CACH_INFLUENCES);
    }
    
    /* damping */
    var d = Math.pow(this.damping, Ovoid.Timer.quantum);
    /* attenuation */
    this.linearVelocity.scaleBy(d);
    this.angularVelocity.scaleBy(d);
    
    /* ajoute a la transformation */
    this.target.translation.addBy(this.linearVelocity);

    /* ajoute la rotation */
    this.target.rotation.vectorRotateBy(this.angularVelocity);
    this.target.rotation.normalize();
    
    /* Mise en someil du node physique si ses mouvements sont 
     * stables depuis un certain temps */;
    var curmot = (this.linearVelocity.size2() + this.angularVelocity.size2());
    var bias = Math.pow(0.5, Ovoid.Timer.quantum);
    this._motion = bias*this._motion + (1-bias)*curmot;
    
    if (this._motion < Ovoid.PHYSICS_MOTION_EPSILON) {
      /* Suppression de toutes vélocté*/
      this.clearInfluences();
      /* Le CASH_PHYSICS correspond à une mise en someil */
      this.addCach(Ovoid.CACH_PHYSICS);
    }

    this.target.unCach(Ovoid.CACH_WORLD|Ovoid.CACH_TRANSFORM);
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
Ovoid.Physics.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.PHYSICS;
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
  /* Ovoid.Physics */
  o['imass'] = this.imass;
  o['itensor'] = this.itensor;
  o['model'] = this.model;
  o['damping'] = this.damping;
  
  return o;
};
