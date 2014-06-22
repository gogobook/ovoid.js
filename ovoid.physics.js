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
 * @class Physics node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.
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
 * <li><b>Ovoid.GHOST_MASSIVE_SPHERE</b><br>
 * The Ghost Massive Sphere model corresponds to a sphere shaped body who 
 * undergoes and react to applied forces (gravity, wind... ) but cannot collide.
 * </li>
 * <li><b>Ovoid.GHOST_MASSIVE_BOX</b><br>
 * The Ghost Massive Box model corresponds to a box shaped body who 
 * undergoes and react to applied forces (gravity, wind... ) but cannot collide.
 * </li>
 * </ul>
 * 
 * <b>Simulation sleeping</b><br><br>
 * 
 * To keep performances and prevent the forever trembling objects on the floor, 
 * the physics simulation includes a "sleep" mechanism who stop the simulation 
 * of  the Physics node until something awake it. The "sleep" mechanism uses a 
 * quantity of motion to evaluate when the simulation should stop. The quantiy 
 * of motion threshold is defined by the <c>sleeping</c> attribute 
 * (default = 1.0).<br><br>
 * 
 * <b>Contact/Collision handling</b><br><br>
 * 
 * For interactivity purpose, the physics engine is designed to make able to 
 * handle rigid body collision events. The <c>oncontact</c> trigger 
 * function member is called each time a collision of the Physics node with 
 * another one happen. So you can override this function to handle the collision 
 * and create some interactive effects. The function should take three argument 
 * which are the other Physics node involved in the contact, the contact point 
 * in world coordinates, and the contact normal in world coordinates. If the 
 * other involved Physics node of the collision is a RIGID_LANDSCAPE model, 
 * the first argument will be <c>null</c>.<br><br>
 * 
 * <blockcode>
 * var shoot = function(node, point, normal) {<br>
 * &nbsp;&nbsp;if(node.target[0].name == "bullet") {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;this.target[0].visible = false;<br>
 * &nbsp;&nbsp;}<br>
 * };<br>
 * <br>
 * physics.oncontact = shoot;<br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Constraint
 *
 * @param {string} name Name of the new node.
 * @param {object} i Instance object to register object to.
*/
Ovoid.Physics = function(name, i) {

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
    
  /** Linear Damping factor.
   * @type float */
  this.linearDamping = 0.9;
  
  /** Angular Damping factor.
   * @type float */
  this.angularDamping = 0.9;
  
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
  
  /** Sleeping motion threshold.
   * @type float */
  this.sleeping = 0.5;
  
  /** Overridable triggered function.<br><br>
   * 
   * This function is triggered each time this instance has contact with
   * another one.<br><br>
   * 
   * The function accepts three parameters which are the other instance involved 
   * in contact, contact point and contact normal.<br><br>
   * 
   * Note: If the orther instance involved in contact is a RIGID_LANDSCAPE model
   * the passed parameter as node will be null.<br><br>
   * 
   * <blockcode>
   * physics.oncontact = function (node, point, normal) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field
   * @type Function
   */
  this.oncontact = function(node, point, normal) {};
  
  /** Time scaled linear velocity */
  this._scaledLinear = new Ovoid.Vector(0.0,0.0,0.0);
  /** Time scaled angular velocity */
  this._scaledTorque = new Ovoid.Vector(0.0,0.0,0.0);
  
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
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;

};
Ovoid.Physics.prototype = new Ovoid.Constraint;
Ovoid.Physics.prototype.constructor = Ovoid.Physics;


/**
 * Set mass.
 * 
 * <br><br>Sets the mass of this instance according to the specified value.
 *
 * @param {float} mass Mass.
 */
Ovoid.Physics.prototype.setMass = function(mass) {
  
  (mass>0.0)?this.imass = 1.0/mass:this.imass = 0.0;
};


/**
 * Set damping.
 * 
 * <br><br>Sets the damping factor of this instance according to the specified 
 * value.
 *
 * @param {float} ldamp Linear Damping factor.
 * @param {float} adamp Angular Damping factor.
 */
Ovoid.Physics.prototype.setDamping = function(ldamp, adamp) {
  
  this.linearDamping = ldamp;
  this.angularDamping = adamp;
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
    var mass;
    (this.imass>0.0)?mass = 1.0/this.imass:mass = 0.0;
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
    var mass;
    (this.imass>0.0)?mass = 1.0/this.imass:mass = 0.0;
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
 * @param {int} c Space coordinate for impulsion point. Can be Ovoid.WORLD or 
 * Ovoid.LOCAL.
 * 
 * @see Ovoid.Vector
 * @see Ovoid.Point
 */
Ovoid.Physics.prototype.impulse = function(force, point, c) {
  
  if(force.size2() > 0.0) {

    this.linearInfluence.addBy(force);

    /* vecteur radius = point -> centre de gravité */
    var rx, ry, rz;
    switch (c)
    {
      case 1: // Ovoid.LOCAL
        // Transforme en coordonnées local à l'objet
        rx = point.v[0] * this.target[0].worldMatrix.m[0] +
                point.v[1] * this.target[0].worldMatrix.m[4] +
                point.v[2] * this.target[0].worldMatrix.m[8];

        ry = point.v[0] * this.target[0].worldMatrix.m[1] +
                point.v[1] * this.target[0].worldMatrix.m[5] +
                point.v[2] * this.target[0].worldMatrix.m[9];

        rz = point.v[0] * this.target[0].worldMatrix.m[2] +
                point.v[1] * this.target[0].worldMatrix.m[6] +
                point.v[2] * this.target[0].worldMatrix.m[10];
        break;
      default:
        rx = point.v[0] - this.target[0].worldPosition.v[0];
        ry = point.v[1] - this.target[0].worldPosition.v[1];
        rz = point.v[2] - this.target[0].worldPosition.v[2];
        break;
    }
          
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
  }
};


/**
 * Spring impultion.
 * 
 * <br><br>Applies a ponctual spring influence to this instance according to the
 * given spring parameters.
 *
 * @param {Point} point Spring anchor point.
 * @param {Point} target Spring other extremity position.
 * @param {float} strength Spring strength.
 * @param {float} limit Spring distance limit.
 * @param {int} c Space coordinate for anchor point. Can be Ovoid.WORLD or 
 * Ovoid.LOCAL.
 * 
 * @see Ovoid.Point
 */
Ovoid.Physics.prototype.spring = function(point, target, strength, limit, c) {
  
  var force = new Ovoid.Vector();
  force.subOf(this.target[0].worldPosition, target);
  var mag = force.size();
  if(mag) {
    force.normalize();
    force.scaleBy(-((mag - limit) * strength));
    this.impulse(force, point, c);
  }
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
    this._motion = this.sleeping * 10.0;
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
 * <c>Ovoid.Queuer</c> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Physics.prototype.cachPhysics = function() {
    
  if(!this.model) /* Ovoid.RIGID_LANDSCAPE */
    return;

  if(!(this.cach & Ovoid.CACH_PHYSICS)) {
      
    /* Update l'inertia tensor */
    if( ( this.target[0].boundingBox.hsize.v[0] + 
          this.target[0].boundingBox.hsize.v[1] +
          this.target[0].boundingBox.hsize.v[2]) > 0.0) {

      var mass;
      (this.imass>0.0)?mass = 1.0/this.imass:mass = 0.0;
      var Ix, Iy, Iz;
      
      /* il s'agit d'un inverse, comme la masse */
      switch(this.model)
      {
        case 1: /* Ovoid.RIGID_MASSIVE_BOX */

          var sx = (this.target[0].boundingBox.hsize.v[0] * 2.0);
          var sy = (this.target[0].boundingBox.hsize.v[1] * 2.0);
          var sz = (this.target[0].boundingBox.hsize.v[2] * 2.0);
          sx *= sx;
          sy *= sy;
          sz *= sz;
          Ix = 1.0 / (0.333 * mass * (sy + sz) );
          Iy = 1.0 / (0.333 * mass * (sx + sz) );
          Iz = 1.0 / (0.333 * mass * (sx + sy) );
      
          break;
        default: /* Ovoid.RIGID_MASSIVE_SPHERE | Ovoid.GHOST_MASSIVE */

          var r2 = this.target[0].boundingSphere.radius;
          r2 *= r2;
          
          Ix = 1.0 / (0.666 * mass * r2 );
          Iy = 1.0 / (0.666 * mass * r2 );
          Iz = 1.0 / (0.666 * mass * r2 );
          
          break;
      }

      /* transforme le tenseur inertiel en coordonnée monde : 
       * [Iw] = [R] * [I] * [R'] */
      
      /* Premiere etape: [RI] = [R] * [I] */
      var RI = new Array(9);
      RI[0] = this.target[0].worldMatrix.m[0] * Ix;
      RI[1] = this.target[0].worldMatrix.m[1] * Iy;
      RI[2] = this.target[0].worldMatrix.m[2] * Iz;
      RI[3] = this.target[0].worldMatrix.m[4] * Ix;
      RI[4] = this.target[0].worldMatrix.m[5] * Iy;
      RI[5] = this.target[0].worldMatrix.m[6] * Iz;
      RI[6] = this.target[0].worldMatrix.m[8] * Ix;
      RI[7] = this.target[0].worldMatrix.m[9] * Iy;
      RI[8] = this.target[0].worldMatrix.m[10] * Iz;
      
      /* Seconde etape: [Iw] = [RI] * [R'] */
      this.itensor.m[0] = RI[0] * this.target[0].worldMatrix.m[0] + 
          RI[1] * this.target[0].worldMatrix.m[1] + 
          RI[2] * this.target[0].worldMatrix.m[2];
      this.itensor.m[1] = RI[0] * this.target[0].worldMatrix.m[4] + 
          RI[1] * this.target[0].worldMatrix.m[5] + 
          RI[2] * this.target[0].worldMatrix.m[6];
      this.itensor.m[2] = RI[0] * this.target[0].worldMatrix.m[8] + 
          RI[1] * this.target[0].worldMatrix.m[9] + 
          RI[2] * this.target[0].worldMatrix.m[10];
      this.itensor.m[3] = RI[3] * this.target[0].worldMatrix.m[0] + 
          RI[4] * this.target[0].worldMatrix.m[1] + 
          RI[5] * this.target[0].worldMatrix.m[2];
      this.itensor.m[4] = RI[3] * this.target[0].worldMatrix.m[4] + 
          RI[4] * this.target[0].worldMatrix.m[5] + 
          RI[5] * this.target[0].worldMatrix.m[6];
      this.itensor.m[5] = RI[3] * this.target[0].worldMatrix.m[8] + 
          RI[4] * this.target[0].worldMatrix.m[9] + 
          RI[5] * this.target[0].worldMatrix.m[10];
      this.itensor.m[6] = RI[6] * this.target[0].worldMatrix.m[0] + 
          RI[7] * this.target[0].worldMatrix.m[1] + 
          RI[8] * this.target[0].worldMatrix.m[2];
      this.itensor.m[7] = RI[6] * this.target[0].worldMatrix.m[4] + 
          RI[7] * this.target[0].worldMatrix.m[5] + 
          RI[8] * this.target[0].worldMatrix.m[6];
      this.itensor.m[8] = RI[6] * this.target[0].worldMatrix.m[8] + 
          RI[7] * this.target[0].worldMatrix.m[9] + 
          RI[8] * this.target[0].worldMatrix.m[10];
      
      delete RI;
      
      /* applique la gravité */
      this.linearInfluence.v[0] += mass * this._i.opt_gravity[0];
      this.linearInfluence.v[1] += mass * this._i.opt_gravity[1];
      this.linearInfluence.v[2] += mass * this._i.opt_gravity[2];
      this.unCach(Ovoid.CACH_INFLUENCES);
    }
    
    if(!(this.cach & Ovoid.CACH_INFLUENCES)) {    
      
      /* sommes des influences selon la masse */
      this.linearInfluence.scaleBy(this.imass);
      this.torqueInfluence.transform3(this.itensor);
      /* par le delta temporel */
      this.linearInfluence.scaleBy(this._i.Timer.quantum);
      this.torqueInfluence.scaleBy(this._i.Timer.quantum);
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
    
    /* attenuation */
    this.linearVelocity.scaleBy(Math.pow(this.linearDamping, this._i.Timer.quantum));
    this.angularVelocity.scaleBy(Math.pow(this.angularDamping, this._i.Timer.quantum));
    
    /* ajoute a la transformation */
    this._scaledLinear.copy(this.linearVelocity);
    this._scaledLinear.scaleBy(this._i.Timer.quantum);
    this.target[0].translation.addBy(this._scaledLinear);

    /* ajoute la rotation */
    this._scaledTorque.copy(this.angularVelocity);
    this._scaledTorque.scaleBy(this._i.Timer.quantum);
    this.target[0].rotation.vectorRotateBy(this._scaledTorque);
    this.target[0].rotation.normalize();
    
    /* Mise en someil du node physique si ses mouvements sont 
     * stables depuis un certain temps */;
    var d = Math.pow(0.1, this._i.Timer.quantum);
    this._motion = d*this._motion + (1-d)*(this.linearVelocity.size()+this.angularVelocity.size());
    
    if (this._motion < this.sleeping) {
      /* Suppression de toutes vélocté*/
      this.clearInfluences();
      /* Le CASH_PHYSICS correspond à une mise en someil */
      this.addCach(Ovoid.CACH_PHYSICS);
    }

    this.target[0].unCach(Ovoid.CACH_WORLD|Ovoid.CACH_TRANSFORM);
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
Ovoid.Physics.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.PHYSICS;
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
  /* Ovoid.Physics */
  o['im'] = this.imass;
  o['it'] = this.itensor;
  o['md'] = this.model;
  o['dm'] = this.damping;
  o['uf'] = this.useFriction;
  o['re'] = this.restitution;
  o['sl'] = this.sleeping;
  o['oc'] = Ovoid.compact(this.oncontact);
  
  return o;
};
