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
 * @class Transform node object.<br><br>
 * 
 * The Transform node implements an transformable node. It is the main 
 * base class for all world-transformable node. It is a geometrical affine 
 * transformer and provides common transformation methods such as translation,
 * rotation, scale...<br><br>
 * 
 * <blockcode>
 * var locator = Instance.Scene.newNode(Ovoid.TRANSFORM, "nullobject");<br>
 * locator.moveXyz(5.0, -2.0, 0.0, Ovoid.WORLD, Ovoid.ABSOLUT);<br>
 * locator.rotateXyz(0.0, 1.57, 0.0, Ovoid.LOCAL, Ovoid.RELATIVE);<br>
 * </blockcode><br><br>
 * 
 * <b>Transformation matrices</b>
 * 
 * Transform node implements transformations through an optimized version of the
 * commonly used matrices multiplication:<br><br>
 * 
 * [S]*[RX]*[RY]*[RZ]*[T]<br><br>
 * 
 * Where S=Scale matrix, R=Rotation matrix, T=Translation matrix.<br><br>
 * 
 * <li>matrix</li><br>
 * The local transformation matrix describes the transformation of the object 
 * relative to itself without the recursive parent's transformations. 
 * (This is a 4x4 matrix)<br><br>
 * 
 * <li>worldMatrix</li><br>
 * The world transformation matrix describes the transformation of the object 
 * relative to the world origin, in other words, the local transformation with 
 * the recursive parent's transformations.<br>
 * (This is a 4x4 matrix)<br><br>
 * 
 * <li>normalMatrix</li><br>
 * The normal transformation matrix is the transformation matrix for
 * faces's or vertices's normals. It is the inverse "rotation" component 
 * of the world transformation matrix.<br>
 * (This is a 3x3 matrix)<br><br>
 * </ul>
 * 
 * <b>Transformation Space</b><br><br>
 * 
 * The transformation space defines in which space coordinate the transformation 
 * is applied. The Transform node considers two space coordinate.<br><br>
 * <ul>
 * <li>Ovoid.LOCAL</li><br>
 * Local space, or object space, is relative to the object's local 
 * transformations. Transformations applied using this space are applied from 
 * object's point of view.<br><br>
 * 
 * <li>Ovoid.WORLD</li><br>
 * World space is relative to the world origin's coordinates. Transformations 
 * applied using this space are applied from world's point of view.<br><br>
 * </ul>
 * 
 * <b>Transformation Mode</b><br><br>
 * 
 * The transformation mode describes how the transformation is applied according
 * to the object's origin.<br><br>
 * <ul>
 * <li>Ovoid.RELATIVE</li><br>
 * This is the most common way to transform objects. the given transformation is 
 * applied as an addition to the current transformation.<br><br>
 * 
 * <li>Ovoid.ABSOLUTE</li><br>
 * In absolute mode, the given transformation is applied as absolute values 
 * from the world origin.<br><br>
 * </ul>
 * 
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the new node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Transform = function(name, i) {

  Ovoid.Node.call(this);
  /** Node type.
   * @type bitmask */
  this.type |= Ovoid.TRANSFORM;
  /** Node name.
   * @type string */
  this.name = name;

  /** Scale.
   * @type Vector */
  this.scaling = new Ovoid.Vector(1.0, 1.0, 1.0);
  /** Translation.
   * @type Vector */
  this.translation = new Ovoid.Vector(0.0, 0.0, 0.0);
  /** Orientation.
   * @type Quaternion */
  this.orientation = new Ovoid.Quaternion(0.0, 0.0, 0.0, 1.0);
  /** Rotation.
   * @type Quaternion */
  this.rotation = new Ovoid.Quaternion(0.0, 0.0, 0.0, 1.0);

  /** Local transformation.
   * @type Matrix4 */
  this.matrix = new Ovoid.Matrix4();
  /** World transformation. 
   * @type Matrix4 */
  this.worldMatrix = new Ovoid.Matrix4();
  /** World normal.
   * @type Matrix3 */
  this.normalMatrix = new Ovoid.Matrix3();

  /** World Z direction.
   * @type Vector */
  this.worldDirection = new Ovoid.Vector(0.0, 0.0, 0.0);
  /** World position.
   * @type Point */
  this.worldPosition = new Ovoid.Point(0.0, 0.0, 0.0, 1.0);

  /** Rendered flag.
   * @type bool */
  this.rendered = false;
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;

  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};
Ovoid.Transform.prototype = new Ovoid.Node;
Ovoid.Transform.prototype.constructor = Ovoid.Transform;



/**
 * Get distance from another instance.<br><br>
 * 
 * Calculates the distance between this instance and another 
 * Transform instance.
 *
 * @param {Transform} transform Another Transform.
 *
 * @return {float} The distance from this instance and the specified one.
 */
Ovoid.Transform.prototype.distanceFrom = function(transform) {

  var x = this.worldPosition.v[0] - transform.worldPosition.v[0];
  var y = this.worldPosition.v[1] - transform.worldPosition.v[1];
  var z = this.worldPosition.v[2] - transform.worldPosition.v[2];

  return Math.sqrt(x * x + y * y + z * z);
};


/**
 * Get the direction from this instance to another.<br><br>
 * 
 * Calculates the normalized direction vector from this instance to another 
 * Transform instance.
 *
 * @param {Transform} transform Transform.
 *
 * @return {Vector} The normalized Vector from this to the specified Transform.
 *
 * @see Ovoid.Vector
 */
Ovoid.Transform.prototype.directionTo = function(transform) {

  var x = this.worldPosition.v[0] - transform.worldPosition.v[0];
  var y = this.worldPosition.v[1] - transform.worldPosition.v[1];
  var z = this.worldPosition.v[2] - transform.worldPosition.v[2];

  var mag = Math.sqrt(x * x + y * y + z * z);
  x /= mag;
  y /= mag;
  z /= mag;

  return new Ovoid.Vector(x, y, z);
};


/**
 * Scale transform.<br><br>
 * 
 * Applies scale transformation to this instance according to the 
 * specified Vector.
 *
 * @param {Object} vect Scales Vector.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 *
 * @see Ovoid.Vector
 */
Ovoid.Transform.prototype.scale = function(vect, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
      this.scaling.v[0] = vect.v[0];
      this.scaling.v[1] = vect.v[1];
      this.scaling.v[2] = vect.v[2];
      break;
    default:
      this.scaling.v[0] += vect.v[0];
      this.scaling.v[1] += vect.v[1];
      this.scaling.v[2] += vect.v[2];
      break;
  }
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Scale transform.<br><br>
 * 
 * Applies scale transformation to this instance according to the 
 * specified x, y and z values.
 *
 * @param {float} x The X scale value.
 * @param {float} y The Y scale value.
 * @param {float} z The Z scale value.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 */
Ovoid.Transform.prototype.scaleXyz = function(x, y, z, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
      this.scaling.v[0] = x;
      this.scaling.v[1] = y;
      this.scaling.v[2] = z;
      break;
    default:
      this.scaling.v[0] += x;
      this.scaling.v[1] += y;
      this.scaling.v[2] += z;
      break;
  }
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Translation transform.<br><br>
 * 
 * Applies translation transformation to this instance according to the 
 * specified Vector.
 * 
 * @param {Vector} vect Translation Vector.
 * @param {int} c Transformation space. Can be Ovoid.LOCAL or Ovoid.WORLD.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 *
 * @see Ovoid.Vector
 */
Ovoid.Transform.prototype.move = function(vect, c, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.translation.v[0] = vect.v[0] * this.matrix.m[0] +
              vect.v[1] * this.matrix.m[4] +
              vect.v[2] * this.matrix.m[8];

          this.translation.v[1] = vect.v[0] * this.matrix.m[1] +
              vect.v[1] * this.matrix.m[5] +
              vect.v[2] * this.matrix.m[9];

          this.translation.v[2] = vect.v[0] * this.matrix.m[2] +
              vect.v[1] * this.matrix.m[6] +
              vect.v[2] * this.matrix.m[10];
          break;
        default: // Ovoid.WORLD
          this.translation.v[0] = vect.v[0];
          this.translation.v[1] = vect.v[1];
          this.translation.v[2] = vect.v[2];
          break;
      }
      break;
    default: // Ovoid.RELATIVE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.translation.v[0] += vect.v[0] * this.matrix.m[0] +
              vect.v[1] * this.matrix.m[4] +
              vect.v[2] * this.matrix.m[8];

          this.translation.v[1] += vect.v[0] * this.matrix.m[1] +
              vect.v[1] * this.matrix.m[5] +
              vect.v[2] * this.matrix.m[9];

          this.translation.v[2] += vect.v[0] * this.matrix.m[2] +
              vect.v[1] * this.matrix.m[6] +
              vect.v[2] * this.matrix.m[10];
          break;
        default: // Ovoid.WORLD
          this.translation.v[0] += vect.v[0];
          this.translation.v[1] += vect.v[1];
          this.translation.v[2] += vect.v[2];
          break;
      }
      break;
  }
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Translation transform.<br><br>
 * 
 * Applies translation transformation to this instance according to the 
 * specified x, y and z values.
 *
 * @param {float} x The X translation value.
 * @param {float} y The Y translation value.
 * @param {float} z The Z translation value.
 * @param {int} c Transformation space. Can be Ovoid.WORLD or Ovoid.LOCAL.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 */
Ovoid.Transform.prototype.moveXyz = function(x, y, z, c, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.translation.v[0] = x * this.matrix.m[0] +
              y * this.matrix.m[4] +
              z * this.matrix.m[8];

          this.translation.v[1] = x * this.matrix.m[1] +
              y * this.matrix.m[5] +
              z * this.matrix.m[9];

          this.translation.v[2] = x * this.matrix.m[2] +
              y * this.matrix.m[6] +
              z * this.matrix.m[10];
          break;
        default: // Ovoid.WORLD
          this.translation.v[0] = x;
          this.translation.v[1] = y;
          this.translation.v[2] = z;
          break;
      }
      break;
    default: // Ovoid.RELATIVE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.translation.v[0] += x * this.matrix.m[0] +
              y * this.matrix.m[4] +
              z * this.matrix.m[8];

          this.translation.v[1] += x * this.matrix.m[1] +
              y * this.matrix.m[5] +
              z * this.matrix.m[9];

          this.translation.v[2] += x * this.matrix.m[2] +
              y * this.matrix.m[6] +
              z * this.matrix.m[10];
          break;
        default: // Ovoid.WORLD
          this.translation.v[0] += x;
          this.translation.v[1] += y;
          this.translation.v[2] += z;
          break;
      }
      break;
  }
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Orientation transform.<br><br>
 * 
 * Applies orientation transformation to this instance according to the 
 * specified Euler rotation.
 *
 * @param {Euler} euler Orientation Euler.
 * @param {int} c Space coordinate. Can be Ovoid.WORLD or Ovoid.LOCAL.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 *
 * @see Ovoid.Euler
 */
Ovoid.Transform.prototype.orient = function(euler, c, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
      this.orientation.fromEuler(euler);
      break;
    default: // Ovoid.RELATIVE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.orientation.rotateSwapBy(euler);
          break;
        default: // Ovoid.WORLD
          this.orientation.rotateBy(euler);
          break;
      }
      break;
  }
  this.orientation.normalize();
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Orientation transform.<br><br>
 * 
 * Applies orientation transformation to this instance according to the 
 * specified x, y, and z euler angles.
 *
 * @param {float} x The X angle orientation value.
 * @param {float} y The Y angle orientation value.
 * @param {float} z The Z angle orientation value.
 * @param {int} c Space coordinate. Can be Ovoid.WORLD or Ovoid.LOCAL.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 */
Ovoid.Transform.prototype.orientXyz = function(x, y, z, c, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
      this.orientation.fromEulerXyz(x, y, z);
      break; 
    default: // Ovoid.RELATIVE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.orientation.rotateSwapByXyz(x, y, z);
          break;
        default: // Ovoid.WORLD
          this.orientation.rotateByXyz(x, y, z);
          break;
      }
      break;
  }
  this.orientation.normalize();
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Rotation transform.<br><br>
 * 
 * Applies rotation transformation to this instance according to the 
 * specified Euler rotation.
 *
 * @param {Euler} euler Rotation Euler.
 * @param {int} c Space coordinate. Can be Ovoid.WORLD or Ovoid.LOCAL.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 *
 * @see Ovoid.Euler
 */
Ovoid.Transform.prototype.rotate = function(euler, c, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
        this.rotation.fromEuler(euler);
      break;
    default: // Ovoid.RELATIVE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.rotation.rotateSwapBy(euler);
          break;
        default: // Ovoid.WORLD
          this.rotation.rotateBy(euler);
          break;
      }
      break;
  }
  this.rotation.normalize();
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};

 
/**
 * Rotation transform.<br><br>
 * 
 * Applies rotation transformation to this instance according to the 
 * specified x, y and z euler angles.
 *
 * @param {float} x The X angle rotation value.
 * @param {float} y The Y angle rotation value.
 * @param {float} z The Z angle rotation value.
 * @param {int} c Space coordinate. Can be Ovoid.WORLD or Ovoid.LOCAL.
 * @param {int} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 */
Ovoid.Transform.prototype.rotateXyz = function(x, y, z, c, m) {

  switch (m)
  {
    case 1: // Ovoid.ABSOLUTE
        this.rotation.fromEulerXyz(x, y, z);
    default: // Ovoid.RELATIVE
      switch (c)
      {
        case 1: // Ovoid.LOCAL
          this.rotation.rotateSwapByXyz(x, y, z);
          break;
        default: // Ovoid.WORLD
          this.rotation.rotateByXyz(x, y, z);
          break;
      }
      break;
  }
  this.rotation.normalize();
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
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
Ovoid.Transform.prototype.cachTransform = function() {

  if (!(this.cach & Ovoid.CACH_TRANSFORM))
  {
    /* creation de la matrice de rotation a partir de l'orientation et rotation
     *
     * Le principe est que l'orientation sert de repère de base selon lequel les
     * rotations sont appliqués en lieu et place d'un classique repère en
     * coordonnée monde.
     */

    /* multiplication des quaternions
     * R = Q(r) * Q(o) */
    var qx = this.rotation.v[3] * this.orientation.v[0] +
        this.rotation.v[0] * this.orientation.v[3] +
        this.rotation.v[1] * this.orientation.v[2] -
        this.rotation.v[2] * this.orientation.v[1];

    var qy = this.rotation.v[3] * this.orientation.v[1] +
        this.rotation.v[1] * this.orientation.v[3] +
        this.rotation.v[2] * this.orientation.v[0] -
        this.rotation.v[0] * this.orientation.v[2];

    var qz = this.rotation.v[3] * this.orientation.v[2] +
        this.rotation.v[2] * this.orientation.v[3] +
        this.rotation.v[0] * this.orientation.v[1] -
        this.rotation.v[1] * this.orientation.v[0];

    var qw = this.rotation.v[3] * this.orientation.v[3] -
        this.rotation.v[0] * this.orientation.v[0] -
        this.rotation.v[1] * this.orientation.v[1] -
        this.rotation.v[2] * this.orientation.v[2];

    var x2 = qx + qx;
    var y2 = qy + qy;
    var z2 = qz + qz;
    var xx = qx * x2;
    var xy = qx * y2;
    var xz = qx * z2;
    var yy = qy * y2;
    var yz = qy * z2;
    var zz = qz * z2;
    var wx = qw * x2;
    var wy = qw * y2;
    var wz = qw * z2;

    /* calcul de la matrice de transformation simplifiée
     * M = S * R * T */
    this.matrix.m[0] = (1.0 - (yy + zz)) * this.scaling.v[0];
    this.matrix.m[1] = (xy - wz) * this.scaling.v[0];
    this.matrix.m[2] = (xz + wy) * this.scaling.v[0];
    this.matrix.m[3] = 0.0;

    this.matrix.m[4] = (xy + wz) * this.scaling.v[1];
    this.matrix.m[5] = (1.0 - (xx + zz)) * this.scaling.v[1];
    this.matrix.m[6] = (yz - wx) * this.scaling.v[1];
    this.matrix.m[7] = 0.0;

    this.matrix.m[8] = (xz - wy) * this.scaling.v[2];
    this.matrix.m[9] = (yz + wx) * this.scaling.v[2];
    this.matrix.m[10] = (1.0 - (xx + yy)) * this.scaling.v[2];
    this.matrix.m[11] = 0.0;

    this.matrix.m[12] = this.translation.v[0];
    this.matrix.m[13] = this.translation.v[1];
    this.matrix.m[14] = this.translation.v[2];
    this.matrix.m[15] = 1.0;

    /* defini les caching nécéssaires */
    this.addCach(Ovoid.CACH_TRANSFORM);
    this.unCach(Ovoid.CACH_MATRIX);
  }

  /* WM = M * parent.M */
  if (!(this.cach & Ovoid.CACH_MATRIX)) {
    
    if (this.parent != null) {
      if (this.parent.type & Ovoid.TRANSFORM) {
        this.worldMatrix.multOf(this.matrix, this.parent.worldMatrix);
      } else {
        this.worldMatrix.copy(this.matrix);
      }
    } else {
      this.worldMatrix.copy(this.matrix);
    }

    /* Calcul de la normal-matrix */
    this.normalMatrix.fromMat4(this.worldMatrix);
    this.normalMatrix.toNormalTransform();

    /* direction monde -Z */
    this.worldDirection.v[0] = -this.worldMatrix.m[8];
    this.worldDirection.v[1] = -this.worldMatrix.m[9];
    this.worldDirection.v[2] = -this.worldMatrix.m[10];

    this.worldPosition.v[0] = this.worldMatrix.m[12];
    this.worldPosition.v[1] = this.worldMatrix.m[13];
    this.worldPosition.v[2] = this.worldMatrix.m[14];
    this.worldPosition.v[3] = 1.0;
    
    this.boundingBox.transform(this.worldMatrix);
    this.boundingSphere.transform(this.worldMatrix);
    
    /* Propage l'uncach matrix aux enfants */
    for (var i = 0; i < this.child.length; i++) {
      this.child[i].unCach(Ovoid.CACH_MATRIX);
    }

    this.addCach(Ovoid.CACH_MATRIX);
    this.unCach(Ovoid.CACH_WORLD);
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
Ovoid.Transform.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.TRANSFORM;
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
  /* Ovoid.Transform */
  o['ts'] = this.scaling;
  o['tt'] = this.translation;
  o['to'] = this.orientation;
  o['tr'] = this.rotation;

  return o;
};
