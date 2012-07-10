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
 * Camera node constructor.
 * 
 * @class Camera node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Camera node is used to describe the rendering's point of view. 
 * Inherited from the Transform node, it is a transformable node. That means the 
 * node can be moved, rotated, scaled, since it evolve in the world 3D space. 
 * <br>
 * <br>
 * The Camera node is not drawn, since it is used as the point of 
 * view to draw the scene. To use or select a camera as active one for 
 * rendering, you have to define it as "active camera" in the scene where the
 * camera is included.
 * <br>
 * <br>
 * <blockcode>
 * &nbsp;&nbsp;camera = scene.create(Ovoid.CAMERA, "MyEye");<br>
 * &nbsp;&nbsp;scene.useCamera(camera);<br>
 * </blockcode>
 * <br>
 * <br>
 * Obviously, you can have several cameras in the same scene and switch between
 * them during the runtime.
 * 
 * @extends Ovoid.Transform
 *
 * @param {string} name Name of the new node.
 */
Ovoid.Camera = function(name) {

  Ovoid.Transform.call(this);
  /** Node type */
  this.type |= Ovoid.CAMERA;
  /** Node name
   * @type string */
  this.name = name;

  /** Viewport width in pixel.
   * @type float */
  this.viewX = 1.0;
  /** Viewport height in pixel.
   * @type float */
  this.viewY = 1.0;
  /** Field of view angle in degrees.
   * @type float */
  this.fov = 60.0;
  /** Viewport aspect ratio.
   * @type float */
  this.aspect = 1.0;
  /** Near clipping plane distance.
   * @type float */
  this.clipNear = 1.0;
  /** Far clipping plane distance.
   * @type float */
  this.clipFar = 500.0;

  /** Look-at matrix.
   * @type Matrix4 */
  this.lookat = new Ovoid.Matrix4();
  /** Perspective projection matix.
   * @type Matrix4 */
  this.perspective = new Ovoid.Matrix4();
  /** Orthographic projection matrix.
   * @type Matrix4 */
  this.orthographic = new Ovoid.Matrix4();
  /** Combined Eye-View matrix.
   * This matrix is the product of the look-at and the perspective matrix.
   * @type Matrix4 */
  this.eyeview = new Ovoid.Matrix4();
  
  /** Frustum plans list */
  this._fstum = Ovoid.Point.newArray(6);

  this.unCach(Ovoid.CACH_VIEWPROJ);
};
Ovoid.Camera.prototype = new Ovoid.Transform;
Ovoid.Camera.prototype.constructor = Ovoid.Camera;


/**
 * Define viewport.
 * 
 * <br><br>Sets the camera's viewport size according to the given width and height value
 * in pixel.
 *
 * @param {float} width Viewport width value.
 * @param {float} height Viewport height value.
 */
Ovoid.Camera.prototype.setView = function(width, height) {

  this.viewX = width; this.viewY = height;
  this.aspect = width / height;
  this.unCach(Ovoid.CACH_VIEWPROJ);
};


/**
 * Define field of view.
 * 
 * <br><br>Sets the camera's field of view angle in degrees according to the given value.
 *
 * @param {float} f Field of view angle.
 */
Ovoid.Camera.prototype.setFov = function(f) {

  this.fov = f;
  this.unCach(Ovoid.CACH_VIEWPROJ);
};


/**
 * Define clipping.
 * 
 * <br><br>Sets the camera's near and far clipping planes distance according to the 
 * given values.
 *
 * @param {float} n Near clipping plane distance.
 * @param {float} f Far clipping plane distance.
 */
Ovoid.Camera.prototype.setCliping = function(n, f) {

  this.clipNear = n;
  this.clipFar = f;
  this.unCach(Ovoid.CACH_VIEWPROJ);
};


/**
 * Viewability test.
 *
 * <br><br>Checks whether an Transform node is the view frustum. In other words this function
 * checks whether an Transform node is viewable in the final scene rendering.
 * 
 * @param {Transform} transform Transform node to check its viewability.
 *
 * @return {bool} True if the specified Transform is in the view frustum,
 * false otherwise.
 * 
 * @see Ovoid.Transform
 */
Ovoid.Camera.prototype.isWatching = function(transform) {

  var i = 6;
  while (i--) {
    if ( (this._fstum[i].v[0] * transform.boundingSphere.worldCenter.v[0] + 
        this._fstum[i].v[1] * transform.boundingSphere.worldCenter.v[1] + 
        this._fstum[i].v[2] * transform.boundingSphere.worldCenter.v[2] + 
        this._fstum[i].v[3]) <= -transform.boundingSphere.radius )
    {
      return false;
    }
  }
  return true;
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
Ovoid.Camera.prototype.cachCamera = function() {

  /* calcul de la matrice de provjection, selon l'ordre et la manière
    dont OpenGL le comprend nativement */
  if (!(this.cach & Ovoid.CACH_VIEWPROJ))
  {
    //  f / aspect  0     0     0
    //
    //  0     f     0     0
    //
    //  0     0   far+near
    //            / near-far    -1
    //
    //  0     0   2*far*near    0
    //            / near-far

    var f = 1.0 / Math.tan(Ovoid.deg2Rad(this.fov) * 0.5);
    this.perspective.m[0] = f / this.aspect;
    this.perspective.m[5] = f;
    this.perspective.m[15] = 0.0;
    this.perspective.m[11] = -1.0;
    /* si inferieur  ou egal à zero, la projection est calculé différament avec 
     * un far_clip infini. c'est utile pour le rendu stencil des ombres 
     * volumétriques */
    if(Ovoid.Drawer.opt_shadowCasting) {
      var zfact = 1.0 / (this.clipNear - -1.0);
      this.perspective.m[10] = 0.0;
      this.perspective.m[14] = (2.0 * -1.0 * this.clipNear) * zfact;
    } else {
      var zfact = 1.0 / (this.clipNear - this.clipFar);
      this.perspective.m[10] = (this.clipFar + this.clipNear) * zfact;
      this.perspective.m[14] = (2.0 * this.clipFar * this.clipNear) * zfact;
    }
    

    //  2 /     0     0     Tx
    //  right-left
    //
    //  0     2 /     0     Ty
    //      top-bottom
    //
    //  0     0     -2 /
    //              far-near    Tz
    //
    //  0     0     0     1

    this.orthographic.m[0] = 2.0 / this.viewX;
    this.orthographic.m[5] = 2.0 / this.viewY;
    this.orthographic.m[10] = -2.0 / (this.clipNear - this.clipFar);

    this.orthographic.m[3] = 0.0;
    this.orthographic.m[7] = 0.0;
    this.orthographic.m[11] = (this.clipNear + this.clipFar) /
        (this.clipNear - this.clipFar);

    this.orthographic.m[12] = -1.0;
    this.orthographic.m[13] = 1.0;
    this.orthographic.m[14] = 0.0;

    this.addCach(Ovoid.CACH_VIEWPROJ);
  }

  /* calcul de la matrice lookat et du fustrum */
  if (!(this.cach & Ovoid.CACH_WORLD))
  {

    // c = center (target position)
    // e = eye    (eye position)
    // s = xaxis  (side)
    // u = yaxis  (up)
    // f = zaxis  (forward)
    // up = upVector (world up vector)

    // facultatif :
    // f = c - e; normalize(f);
    // s = cross(f, up); normalize(s);
    // u = cross(s, f);

    // t.x = -e.x * s.x + -e.y * s.y + -e.z * s.z
    // t.y = -e.x * u.x + -e.y * u.y + -e.z * u.z
    // t.z = -e.x * f.x + -e.y * f.y + -e.z * f.z

    //  s.x     u.x     f.x     0
    //
    //
    //  s.y     u.y     f.y     0
    //
    //
    //  s.z     u.z     f.z     0
    //
    //
    //  t.x     t.y     t.z     1

    var s = new Ovoid.Vector(this.worldMatrix.m[0],
        this.worldMatrix.m[1],
        this.worldMatrix.m[2]);

    var u = new Ovoid.Vector(this.worldMatrix.m[4],
        this.worldMatrix.m[5],
        this.worldMatrix.m[6]);

    var f = new Ovoid.Vector(this.worldMatrix.m[8],
        this.worldMatrix.m[9],
        this.worldMatrix.m[10]);

    var e = new Ovoid.Vector(this.worldMatrix.m[12],
        this.worldMatrix.m[13],
        this.worldMatrix.m[14]);

    this.lookat.m[0] = s.v[0];
    this.lookat.m[4] = s.v[1];
    this.lookat.m[8] = s.v[2];

    this.lookat.m[1] = u.v[0];
    this.lookat.m[5] = u.v[1];
    this.lookat.m[9] = u.v[2];

    this.lookat.m[2] = f.v[0];
    this.lookat.m[6] = f.v[1];
    this.lookat.m[10] = f.v[2];

    this.lookat.m[12] = -e.v[0] * s.v[0] +
        -e.v[1] * s.v[1] +
        -e.v[2] * s.v[2];

    this.lookat.m[13] = -e.v[0] * u.v[0] +
        -e.v[1] * u.v[1] +
        -e.v[2] * u.v[2];

    this.lookat.m[14] = -e.v[0] * f.v[0] +
        -e.v[1] * f.v[1] +
        -e.v[2] * f.v[2];

    this.eyeview.multOf(this.lookat, this.perspective);

    /* extraction des plans du frustum */
    var p = 0;
    for (i = 0; i < 3; i++)
    {
      // Pour i=0: Right; i=1: Top; i=2: Far
      this._fstum[p].v[0] = this.eyeview.m[3] - this.eyeview.m[0 + i];
      this._fstum[p].v[1] = this.eyeview.m[7] - this.eyeview.m[4 + i];
      this._fstum[p].v[2] = this.eyeview.m[11] - this.eyeview.m[8 + i];
      this._fstum[p].v[3] = this.eyeview.m[15] - this.eyeview.m[12 + i];
      p++;
      // Pour i=0: Left; i=1: Bottom; i=2: Near
      this._fstum[p].v[0] = this.eyeview.m[3] + this.eyeview.m[0 + i];
      this._fstum[p].v[1] = this.eyeview.m[7] + this.eyeview.m[4 + i];
      this._fstum[p].v[2] = this.eyeview.m[11] + this.eyeview.m[8 + i];
      this._fstum[p].v[3] = this.eyeview.m[15] + this.eyeview.m[12 + i];
      p++;
    }

    var m;
    var p = 6;
    while (p--)
    {
      /* normalisation du point-plan, comme pour un point au detail
       * pres que le w est normalisé sur base de la partie vecteur */
      m = Math.sqrt(this._fstum[p].v[0] * this._fstum[p].v[0] +
          this._fstum[p].v[1] * this._fstum[p].v[1] +
          this._fstum[p].v[2] * this._fstum[p].v[2]);
      this._fstum[p].v[0] /= m;
      this._fstum[p].v[1] /= m;
      this._fstum[p].v[2] /= m;
      this._fstum[p].v[3] /= m;
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
Ovoid.Camera.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.CAMERA;
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
  o['pivot'] = this.pivot;
  o['scaling'] = this.scaling;
  o['translation'] = this.translation;
  o['orientation'] = this.orientation;
  o['rotation'] = this.rotation;
  /* Ovoid.Camera */
  o['viewX'] = this.viewX;
  o['viewY'] = this.viewY;
  o['fov'] = this.fov;
  o['aspect'] = this.aspect;
  o['clipNear'] = this.clipNear;
  o['clipFar'] = this.clipFar;
  o['action'] = this.action?this.action.uid:'null';

  return o;
};
