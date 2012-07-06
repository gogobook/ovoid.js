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
 * Transform node constructor.
 *
 * @class Transform node object.
 * <br>
 * <br>
 * The Transform node is the main base class for all transformable node. 
 * Transform is designed to be transformable in 3D world space.
 * <br>
 * <br>
 * Transform node is a geometrical affine transformer. In geometry, an affine 
 * transformation is a transformation which preserves straight lines  
 * and ratios of distances between points lying on a straight line. For this 
 * purpose, it use transformation matrices.
 * <br>
 * <br>
 * <b>Transformation matrices</b>
 * <br>
 * The transformation matrices of the Transform node are 4x4 matrices 
 * defined as follows:
 * <br>
 * <blockcode>
 * | Xx  Xy  Xz  0 |<br>
 * | Yx  Yy  Yz  0 |<br>
 * | Zx  Zy  Zz  0 |<br>
 * | Tx  Ty  Tz  1 |<br>
 * </blockcode>
 * <br>
 * Where X, Y and Z are the main axis vectors of the object, and T the 
 * translation component.
 * <br>
 * Note: Unlike OpenGL (and so, WebGL) the OvoiD.JS Library uses
 * row-major transformation matrices order. (The matrices's data are in all 
 * cases stored as an 16 floats array, so, the OvoiD.JS Library's matrices's data 
 * can directly fill the GL's matrices)
 * <ul>
 * <li>Local Transformation matrix</li>
 * The local transformation matrix describes the transformation of the object 
 * relative to itself or, in other words, its own origin. This matrix is 
 * directly made from the Transform's attributes : scale, translation, 
 * orientation, rotation.<br>
 * This an row-major 4x4 matrix.
 * <br>
 * <br>
 * <li>World transformation matrix</li>
 * The world transformation matrix describes the transformation of the object 
 * relative to the world origin. This can be the same as the local 
 * transformation matrix if the Transform has no parent node. Otherwise, 
 * the world transformation matrix is a combinaison of the local 
 * transformation matrix and parent's world transformation matrix.<br>
 * This an row-major 4x4 matrix.
 * <br>
 * <br>
 * <li>Normal transformation matrix</li>
 * The normal transformation matrix is the transformation matrix applied to 
 * faces's or vertices's normals. This is the inverted "rotation" component 
 * of the  world transformation matrix.<br>
 * This is an row-major 3x3 matrix.
 * </ul>
 * <br>
 * <b>Transformation space</b>
 * <br>
 * The transformation space describe in what space coordinate the transformation 
 * is applied. The Transform node considers two spaces coordinates, the local 
 * and world.
 * <ul>
 * <li>Local Space</li>
 * Local space, or object space is relative to the object's local 
 * transformations. Transformations applied using this space are applied from 
 * the object's "point of view".
 * <br>
 * <br>
 * <li>World Space</li>
 * World space is relative to the world origin's coordinates. Transformations 
 * applied using this space are applied from world's "point of view".
 * </ul>
 * <br>
 * <br>
 * <b>Transformation mode</b>
 * <br>
 * The transformation mode describes how the transformation is applied according
 * to the object's origin.
 * <ul>
 * <li>Relative</li>
 * This is the most common way to transform objects. In relative mode, the given
 * transformation is applied as an "addition" to the current transformation.
 * <br>
 * <br>
 * <li>Absolute</li>
 * In absolute mode, the given transformation is applied from the world origin. 
 * </ul>
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the new node.
 */
Ovoid.Transform = function(name) {

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

  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};
Ovoid.Transform.prototype = new Ovoid.Node;
Ovoid.Transform.prototype.constructor = Ovoid.Transform;



/**
 * Transform distance.
 * <br>
 * <br>
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
 * Transform direction.
 * 
 * <br><br>Retriev the direction Vector from this instance to another Transform 
 * instance.
 *
 * @param {Transform} transform Transform.
 *
 * @return {Vector} The normalized Vector to the specified Transform.
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
 * Scale transform.
 * 
 * <br><br>Applies scale transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
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
 * Scale transform.
 * 
 * <br><br>Applies scale transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
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
 * Translation transform.
 * 
 * <br><br>Applies translation transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
      switch (c)
      {
        case Ovoid.LOCAL:
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
        default:
          this.translation.v[0] = vect.v[0];
          this.translation.v[1] = vect.v[1];
          this.translation.v[2] = vect.v[2];
          break;
      }
      break;
    default:
      switch (c)
      {
        case Ovoid.LOCAL:
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
        default:
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
 * Translation transform.
 * 
 * <br><br>Applies translation transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
      switch (c)
      {
        case Ovoid.LOCAL:
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
        default:
          this.translation.v[0] = x;
          this.translation.v[1] = y;
          this.translation.v[2] = z;
          break;
      }
      break;
    default:
      switch (c)
      {
        case Ovoid.LOCAL:
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
        default:
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
 * Orientation transform.
 * 
 * <br><br>Applies orientation transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
      this.orientation.fromEuler(euler);
      break;
    default:
      switch (c)
      {
        case Ovoid.LOCAL:
          this.orientation.rotateSwapBy(euler);
          break;
        default:
          this.orientation.rotateBy(euler);
          break;
      }
      break;
  }
  this.orientation.normalize();
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Orientation transform.
 * 
 * <br><br>Applies orientation transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
      this.orientation.fromEulerXyz(x, y, z);
      break;
    default:
      switch (c)
      {
        case Ovoid.LOCAL:
          this.orientation.rotateSwapByXyz(x, y, z);
          break;
        default:
          this.orientation.rotateByXyz(x, y, z);
          break;
      }
      break;
  }
  this.orientation.normalize();
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};


/**
 * Rotation transform.
 * 
 * <br><br>Applies rotation transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
      switch (c)
      {
        default:
          this.rotation.fromEuler(euler);
          break;
      }
      break;
    default:
      switch (c)
      {
        case Ovoid.LOCAL:
          this.rotation.rotateSwapBy(euler);
          break;
        default:
          this.rotation.rotateBy(euler);
          break;
      }
      break;
  }
  this.rotation.normalize();
  this.unCach(Ovoid.CACH_WORLD | Ovoid.CACH_TRANSFORM);
};

 
/**
 * Rotation transform.
 * 
 * <br><br>Applies rotation transformation to this instance according to the 
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
    case Ovoid.ABSOLUTE:
      switch (c)
      {
        default:
          this.rotation.fromEulerXyz(x, y, z);
          break;
      }
      break;
    default:
      switch (c)
      {
        case Ovoid.LOCAL:
          this.rotation.rotateSwapByXyz(x, y, z);
          break;
        default:
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
 * <code>Ovoid.Queuer</code> global class and should not be called independently.
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
    for (var i = 0; i < this.child.length; i++)
    {
      this.child[i].unCach(Ovoid.CACH_MATRIX);
    }

    this.addCach(Ovoid.CACH_MATRIX);
    this.unCach(Ovoid.CACH_WORLD);
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
Ovoid.Transform.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.TRANSFORM;
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
  /* Ovoid.Transform */
  o['scaling'] = this.scaling;
  o['translation'] = this.translation;
  o['orientation'] = this.orientation;
  o['rotation'] = this.rotation;

  return o;
};
