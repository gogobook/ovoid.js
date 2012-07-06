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
 * Light node constructor.
 * 
 * @class Light node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Light node is used to describe a world light source. 
 * Inherited from the Transform node, it is a transformable node. That means the 
 * node can be moved, rotated, scaled, since it evolve in the world 3D space. 
 * <br>
 * <br>
 * The Light node is not drawn, since it is only used as the light source
 * to calculate objects's colours and shading. The Light node is, as the 
 * Material node, intimely linked to shaders.
 * <br>
 * <br>
 * <b>Lights, Materials and Shaders issue</b>
 * <br>
 * <br>
 * One important thing to understand is that all the render process is finaly 
 * determined by the shader program. Render nodes like Light or Material can 
 * have many parameters and options, if the shader program don't implement it, 
 * all these parameters take no effect. Material and Light node are designed to
 * offer as many parameters as possible. But keep in mind that these parameters 
 * can be not implemented or implemented in an unexpected way, depending on the 
 * used shader program.
 * <br>
 * <br>
 * Shaders are simple programs that describe the traits of either a vertex or a 
 * pixel. Vertex shaders describe the traits (position, texture coordinates, 
 * colors, etc.) of a vertex, while pixel shaders describe the traits (color, 
 * z-depth and alpha value) of a pixel. A vertex shader is called for each 
 * vertex in a primitive (possibly after tessellation); thus one vertex in, 
 * one (updated) vertex out. Each vertex is then rendered as a series of 
 * pixels onto a surface (block of memory) that will eventually be sent to 
 * the screen.
 * <br>
 * <br>
 * For more information about how shaders are implemented in Ovoid, see the 
 * <code>Ovoid.Shader</code> class documentation.
 * 
 * @extends Ovoid.Transform
 *
 * @param {string} name Name of the node.
 */
Ovoid.Light = function(name) {

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

};
Ovoid.Light.prototype = new Ovoid.Transform;
Ovoid.Light.prototype.constructor = Ovoid.Light;


/**
 * Define light source color.
 * 
 * <br><br>Sets the light source color according to the specified values.
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
 * Define light source color.
 *
 * <br><br>Sets the light source color according to the specified components array.
 * 
 * @param {float[]} a Float Array with r, g, b and a components.
 */
Ovoid.Light.prototype.setColorv = function(a) {

  this.color.v.set(a);
};


/**
 * Define light source range.
 *
 * <br><br>Sets the light source maximum range radius according to the specified value.
 * 
 * @param {float} range The range value.
 */
Ovoid.Light.prototype.setRange = function(range) {

  this.range = range;
  this.unCach(Ovoid.CACH_LIGHT);
};


/**
 * Define light source attenuation model.
 * 
 * <br><br>Sets the light source attenuation model according to the specified values.
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
 * Define light spot angle.
 * 
 * <br><br>Sets the light source spot angle according to the specified value in degrees
 *
 * @param {float} angle The spot angle value in degrees.
 */
Ovoid.Light.prototype.setSpotAngle = function(angle) {

  this.spotAngle = Ovoid.deg2Rad(angle);
};


/**
 * Lightening test.
 * 
 * <br><br>Checks whether an Transform node is enlightened by this instance. This method is
 * used to define the light-linking.
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
  return this.boundingSphere.worldCenter.dist2(tform.boundingSphere.worldCenter) <= 
      (this.boundingSphere.radius2 + tform.boundingSphere.radius2);
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
Ovoid.Light.prototype.cachLight = function() {

  if (!(this.cach & Ovoid.CACH_LIGHT))
  {
    this.boundingSphere.setRadius(this.range);
    this.addCach(Ovoid.CACH_LIGHT);
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
Ovoid.Light.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.LIGHT;
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
  /* Ovoid.Light */
  o['model'] = this.model = Ovoid.LIGHT_POINT;
  o['color'] = this.color;
  o['intensity'] = this.intensity;
  o['attenuationC'] = this.attenuationC;
  o['attenuationL'] = this.attenuationL;
  o['attenuationQ'] = this.attenuationQ;
  o['range'] = this.range
  o['falloff'] = this.falloff;
  o['spotAngle'] = this.spotAngle;
  o['shadowCasting'] = this.shadowCasting;
  o['action'] = this.action?this.action.uid:'null';

  return o;
};
