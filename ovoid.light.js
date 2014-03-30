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
 * Constructor method.
 * 
 * @class Light node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Light node implements a world light source. Inherited from the 
 * Transform node, it is a world-transformable node, which means it can be moved
 * rotated, scaled...<br><br>
 * 
 * <blockcode>
 * var spot = scene.create(Ovoid.LIGHT, "redSpot");<br>
 * spot.setColor(1.0, 0.0, 0.0, 1.0);<br>
 * spot.setSpotAngle(45.0, 0.05);<br>
 * <br>
 * var lamp = scene.create(Ovoid.LIGHT, "pointLight");<br>
 * lamp.setColor(1.0, 1.0, 1.0, 1.0);<br>
 * </blockcode><br><br>
 * 
 * <b>Lights Model</b><br><br>
 * 
 * The light model is defined by the <c>model</c> attribute of the Light 
 * node. Available light model are the following:
 * 
 * <ul>
 * <li><b>Ovoid.LIGHT_DIRECTIONAL</b><br>
 * This symbolic constant set the light model as a directionnal light.<br><br></li>
 * <li><b>Ovoid.LIGHT_POINT</b><br>
 * This symbolic constant set the light model as a point light.<br><br></li>
 * <li><b>Ovoid.LIGHT_SPOT</b><br>
 * This symbolic constant set the light model as a spot light.<br><br></li>
 * </ul>
 * 
 * <b>Lights, Materials and Shaders issue</b><br><br>
 * 
 * One important thing to know is that all the render process is finaly 
 * determined by the shader program. Render nodes like Light or Material could 
 * have many parameters and options, if the shader program does not implements 
 * them,  all these parameters take no effect. Material and Light nodes are 
 * designed to offer as many parameters as possible. But keep in mind that 
 * these parameters may be implemented (or not at all) in an unexpected way, 
 * depending on the used shader program.<br><br>
 * 
 * For more information about how shaders are implemented in OvoiD.JS, see the 
 * <c>Ovoid.Shader</c> class documentation.
 * 
 * @extends Ovoid.Transform
 *
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Light = function(name, i) {

  Ovoid.Transform.call(this);
  /** Node type */
  this.type |= Ovoid.LIGHT;
  /** Node name.
   * @type string */
  this.name = name;

  /** Light model.
   * @type enum */
  this.model = Ovoid.LIGHT_POINT;
  /** Light source color.
   * @type Color */
  this.color = new Ovoid.Color(1.0, 1.0, 1.0, 1.0);
  /** Light source intensity.
   * @type float */
  this.intensity = 1.0;
  /** Light source constant attenuation.
   *  @type float */
  this.attenuationC = 1.0;
  /** Light source linear attenuation.
   * @type float */
  this.attenuationL = 0.0;
  /** Light source quadratic attenuation.
   * @type float */
  this.attenuationQ = 0.01;
  /** Lighting maximum radius range.
   * @type float */
  this.range = 1 / ((this.attenuationL * 0.01) +
      Math.sqrt((this.attenuationQ * 0.01)));
  /** Light source falloff.
   *  @type float */
  this.falloff = 0.0;
  /** Light spot angle (in radians).
   * @type float */
  this.spotAngle = Ovoid.deg2Rad(180.0);
  /** Light shadow casting flag.
   *  @type bool */
  this.shadowCasting = true;
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;

};
Ovoid.Light.prototype = new Ovoid.Transform;
Ovoid.Light.prototype.constructor = Ovoid.Light;


/**
 * Set light source color.<br><br>
 * 
 * Sets the light source color according to the specified values.
 *
 * @param {float} r The Red component.
 * @param {float} g The Green component.
 * @param {float} b The Blue component.
 * @param {float} a The Alpha component.
 */
Ovoid.Light.prototype.setColor = function(r, g, b, a) {

  this.color.set(r, g, b, a);
};


/**
 * Set light source color from array.<br><br>
 *
 * Sets the light source color according to the specified components 
 * array.
 * 
 * @param {float[]} a Float Array with r, g, b and a components.
 */
Ovoid.Light.prototype.setColorv = function(a) {

  this.color.v.set(a);
};


/**
 * Set light source range.<br><br>
 *
 * Sets the light source maximum sphere range radius according to the specified 
 * value.
 * 
 * @param {float} range The range value.
 */
Ovoid.Light.prototype.setRange = function(range) {

  this.range = range;
  this.unCach(Ovoid.CACH_LIGHT);
};


/**
 * Set light source attenuation model.<br><br>
 * 
 * Sets the light source attenuation model according to the specified values.
 * This will automaticaly recalculate light range from attenuation equation.
 *
 * @param {float} c The constant attenuation value.
 * @param {float} l The linear attenuation value.
 * @param {float} q The quadratic attenuation value.
 */
Ovoid.Light.prototype.setAttenuation = function(c, l, q) {

  this.attenuationC = c;
  this.attenuationL = l;
  this.attenuationQ = q;
  if (this.attenuationQ > 0 || this.attenuationL > 0)
  {
    this.range = 1 / ((this.attenuationL * 0.01) +
        Math.sqrt((this.attenuationQ * 0.01)));
  }

  this.unCach(Ovoid.CACH_LIGHT);
};


/**
 * Set light spot angle and falloff.<br><br>
 * 
 * Sets the light source's spot angle (in degrees) and falloff according to the 
 * specified value.
 *
 * @param {float} angle The spot angle value in degrees.
 * @param {float} angle The spot falloof value.
 */
Ovoid.Light.prototype.setSpotAngle = function(angle, falloff) {

  this.spotAngle = Ovoid.deg2Rad(angle);
  if(falloff) this.falloff = falloff;
};


/**
 * Lightening test.<br><br>
 * 
 * Checks whether an Transform node is enlightened by this instance. This method 
 * isused to define the light-linking and use the light instance's and 
 * Transform's bounding spheres. The light instance's bounding sphere is defined
 * by its range sphere.
 *
 * @param {Transform} tform Transform object to check.
 *
 * @return {bool} True if the specified Transform is into the light's range,
 * false otherwise.
 * 
 * @see Ovoid.Transform
 */
Ovoid.Light.prototype.isLightening = function(tform) {

  /* simple test d'intersection des bounding sphere */

  /* size2 <= somme des radius2 */
  return this.boundingSphere.worldCenter.dist(tform.boundingSphere.worldCenter) <= 
      (this.boundingSphere.radius + tform.boundingSphere.radius);
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
Ovoid.Light.prototype.cachLight = function() {

  if(this.model == 1) /* Ovoid.LIGHT_DIRECTIONAL */
    this.worldPosition.v[3] = 0.0;
      
  if (!(this.cach & Ovoid.CACH_LIGHT))
  {
    this.boundingSphere.setRadius(this.range);
    this.addCach(Ovoid.CACH_LIGHT);
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
Ovoid.Light.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.LIGHT;
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
  o['pivot'] = this.pivot;
  o['ts'] = this.scaling;
  o['tt'] = this.translation;
  o['to'] = this.orientation;
  o['tr'] = this.rotation;
  /* Ovoid.Light */
  o['md'] = this.model;
  o['cl'] = this.color;
  o['it'] = this.intensity;
  o['ac'] = this.attenuationC;
  o['al'] = this.attenuationL;
  o['aq'] = this.attenuationQ;
  o['rn'] = this.range
  o['ff'] = this.falloff;
  o['sa'] = this.spotAngle;
  o['sc'] = this.shadowCasting;

  return o;
};
