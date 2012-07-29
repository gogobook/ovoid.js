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
 * Material node constructor.
 * 
 * @class Material node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Material node is used to describe shaded surfaces properties. The 
 * Material is defined by five compoment color (or/and Textures) plus one 
 * special texture components for normal mapping. The Material node is a 
 * dependency node and does not takes place directly in the 3D world.<br><br>
 * 
 * <blockcode>
 * var material = scene.create(Ovoid.MATERIAL, "green");<br>
 * material.setColor(Ovoid.DIFFUSE, 0.0, 1.0, 0.0, 1.0);<br>
 * material.setTexture(Ovoid.DIFFUSE, anyTexture);<br>
 * </blockcode><br><br>
 * 
 * The Material's components/slots are the followings:
 * 
 * <ul>
 * <li><code>Ovoid.AMBIENT</code></li>
 * The ambient component defines how ambient light act on the surface. It can 
 * be a simple flat color or a Texture.<br><br>
 * 
 * <li><code>Ovoid.DIFFUSE</code></li>
 * The diffuse component defines how normal light sources act on the surface. It 
 * can be a simple flat color or a Texture.<br><br>
 * 
 * <li><code>Ovoid.SPECULAR</code></li>
 * The specular component defines the (simulated) direct light specular 
 * reflection of the surface. It can be a simple flat color or a Texture.<br><br>
 * 
 * <li><code>Ovoid.EMISSIVE</code></li>
 * The emissive component defines how the surface emits its own color without
 * light interaction. It can be a simple flat color or a Texture.<br><br>
 * 
 * <li><code>Ovoid.REFLECT</code></li>
 * The reflect component defines how the surface reflect its environement. It 
 * can be a simple flat color or (more interesting) a Texture.<br><br>
 * 
 * <li><code>Ovoid.NORMAL</code></li>
 * The normal component defines the normal map for this material. It 
 * must be a (normal map) Texture. (Not yet implemented in the default supplied 
 * shaders)<br><br>
 * </ul>
 * 
 * The color and textures compoments are typically merged together, which mean 
 * that if you set a full colored Diffuse texture, and, an all black Diffuse 
 * color, you'll obtain an all black surface because the texture's components 
 * are multiplied by the color's compomnents. However, this behaviour is 
 * specific to a shader and how is designed.<br><br><br>
 * 
 * 
 * <b>Lights, Materials and Shaders issue</b><br><br>
 * 
 * One important thing to know is that all the render process is finaly 
 * determined by the shader program. Render nodes like Light or Material could 
 * have many parameters and options, if the shader program does not implements 
 * them, all these parameters take no effect. Material and Light nodes are 
 * designed to offer as many parameters as possible. But keep in mind that 
 * these parameters may be implemented (or not at all) in an unexpected way, 
 * depending on the used shader program.<br><br>
 * 
 * For more information about how shaders are implemented in OvoiD.JS, 
 * refere to <code>Ovoid.Shader</code> class documentation.
 * 
 * @extends Ovoid.Node
 *
 * @param {string} name Name of the node.
 */
Ovoid.Material = function(name) {

  Ovoid.Node.call(this);
  /** node type */
  this.type |= Ovoid.MATERIAL;
  /** node name.
   * @type string */
  this.name = name;
  /** Materia components color array.
   * @type Color[] */
  this.color = Ovoid.Color.newArray(5);

  this.color[0].set(1.0, 1.0, 1.0, 1.0);
  this.color[1].set(0.0, 1.0, 0.0, 1.0);
  this.color[2].set(1.0, 1.0, 1.0, 1.0);
  this.color[3].set(0.0, 0.0, 0.0, 1.0);
  this.color[4].set(1.0, 1.0, 1.0, 1.0);

  /** Materia components texture array.
   * @type Texture[] */
  this.texture = new Array(6);
  var i = 6;
  while (i--) { this.texture[i] = null; }

  /** Materia shininess.
   * @type float */
  this.shininess = 100.0;
  /** Materia reflectivity factor.
   * @type float */
  this.reflectivity = 0.0;
  /** Materia opacity factor.
   * @type float */
  this.opacity = 1.0;
};
Ovoid.Material.prototype = new Ovoid.Node;
Ovoid.Material.prototype.constructor = Ovoid.Material;


/**
 * Set material component texture.<br><br>
 * 
 * Sets the specified material component's texture with the specified one.
 *
 * @param {enum} slot Component identifier. Can be an integer between 0 and 5 or
 * one of the following symbolic constants:<br>
 * Ovoid.AMBIENT<br>
 * Ovoid.DIFFUSE<br>
 * Ovoid.SPECULAR<br>
 * Ovoid.EMISSIVE<br>
 * Ovoid.REFLECT<br>
 * Ovoid.NORMAL<br><br>
 * @param {Texture} texture Texture object to set as component texture.
 * 
 * @see Ovoid.Texture
 */
Ovoid.Material.prototype.setTexture = function(slot, texture) {

  if (slot > 5) return;
  if (this.texture[slot] != null)
    this.breakDepend(this.texture[slot]);

  this.texture[slot] = texture;
  if (texture != null)
    this.makeDepend(texture);
};


/**
 * Set material component color.<br><br>
 *
 * Sets the specified material component's color according to the specified 
 * values.
 * 
 * @param {enum} slot Component identifier. Can be an integer between 0 and 5 or
 * one of the following symbolic constants:<br>
 * Ovoid.AMBIENT<br>
 * Ovoid.DIFFUSE<br>
 * Ovoid.SPECULAR<br>
 * Ovoid.EMISSIVE<br>
 * Ovoid.REFLECT<br>
 * Ovoid.NORMAL<br><br>
 * @param {float} r The Red color component.
 * @param {float} g The Green color component.
 * @param {float} b The Blue color component.
 * @param {float} a The Alpha color component.
 */
Ovoid.Material.prototype.setColor = function(slot, r, g, b, a) {

  this.color[slot].v[0] = r;
  this.color[slot].v[1] = g;
  this.color[slot].v[2] = b;
  this.color[slot].v[3] = a;
};


/**
 * Set material component color from array.<br><br>
 *
 * Sets the specified material component's color according to the specified 
 * array.
 * 
 * @param {enum} slot Component identifier. Can be an integer between 0 and 5 or
 * one of the following symbolic constants:<br>
 * Ovoid.AMBIENT<br>
 * Ovoid.DIFFUSE<br>
 * Ovoid.SPECULAR<br>
 * Ovoid.EMISSIVE<br>
 * Ovoid.REFLECT<br>
 * Ovoid.NORMAL<br><br>
 * @param {float[]} a Float Array with r, g, b and a components.
 */
Ovoid.Material.prototype.setColorv = function(slot, a) {

  this.color[slot].v.set(a);
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
Ovoid.Material.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.MATERIAL;
  /* Ovoid.Node */
  o['name'] = this.name;
  o['visible'] = this.visible;
  o['uid'] = this.uid;
  o['parent'] = this.parent?this.parent.name:'null';
  o['child'] = new Array();
  for(var i = 0; i < this.child.length; i++)
    o['child'][i] = this.child[i].uid;
  o['depend'] = new Array();
  for(var i = 0; i < this.depend.length; i++)
    o['depend'][i] = this.depend[i].uid;
  o['link'] = new Array();
  for(var i = 0; i < this.link.length; i++)
    o['link'][i] = this.link[i].uid;
  o['bvolumemin'] = this.boundingBox.min;
  o['bvolumemax'] = this.boundingBox.max;
  o['bvolumerad'] = this.boundingSphere.radius;
  /* Ovoid.Material */
  o['color'] = this.color;
  o['texture'] = new Array(6);
  for(var i = 0; i < 6; i++) {
    if(this.texture[i]) {
      o['texture'][i] = this.texture[i].uid;
    } else {
      o['texture'][i] = 'null';
    }
  }
  o['shininess'] = this.shininess;
  o['reflectivity'] = this.reflectivity;
  o['opacity'] = this.opacity;

  return o;
};

