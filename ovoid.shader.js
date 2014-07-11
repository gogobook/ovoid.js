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
 * @class Shader program object.<br><br>
 * 
 * The Shader object is a wrapping interface to access and interact
 * with a GLSL shader program.<br><br>
 * 
 * <blockcode>
 * var phong = new Ovoid.Shader();<br>
 * phong.loadSource("phong.vs", "phong.fs", "custom.xml", true)<br>
 * </blockcode><br><br>
 * 
 * <b>Why wrapping shader programs</b><br><br>
 * 
 * Work with shaders by interacting with uniforms or attributes using the WebGL 
 * built-in functions quickly becomes intricate depending on the shader's 
 * complexity. The usual way consist on hard-coding the variables assignation 
 * which creates a rigid program where shaders must always have the same 
 * variables names to fit with the hard-coded assignation. Wrapping shader 
 * allow an unified access to the variables of any custom shader without 
 * rewriting the core rendering process.<br><br>
 * 
 * <b>Wrapping Map Concept</b><br><br>
 * 
 * The wrapping map is an XML or JSON file that indicate to which 
 * slot/role the shader's variables (uniforms, attributes) are assigned.
 * It's a kind of template to assign variables's names to 
 * attributes and uniforms's id.
 * OvoiD.JS provide an hard-coded wrapping map for default mapping, but 
 * allows to use custom wrapping maps.<br><br>
 * 
 * The wrapper must know what variable's name matches with the 
 * appropriate role in the rendering process to set the proper 
 * attribute/uniform's id to call when needed. For example if you have 
 * an uniform matrix called "MvMtx" in you vertex shader source, the 
 * wrapper must know that  this uniform "MvMtx" is dedicated to be the 
 * main Modelview matrix in order to fill and update its data during 
 * the rendering process. The wrapping map provides a mecanism to 
 * automatize this translation.<br><br>
 * 
 * The wrapping map file simply consists of a list of assignement 
 * parameters, writed in XML or JSON format. Here is an XML 
 * sample:<br><br>
 * 
 * <blockcode>
 * &lt;uniformMatrix&gt;<br>
 * &nbsp;&nbsp;&lt;s symbol="UNIFORM_MATRIX_TRANSFORM_MAT4" id="0"&gt;MXF&lt;/s&gt;<br>
 * &nbsp;&nbsp;&lt;s symbol="UNIFORM_MATRIX_NORMAL_MAT3" id="1"&gt;MNR&lt;/s&gt;<br>
 * </blockcode><br><br>
 * 
 * In the above sample, we can see two &lt;s&gt; tags with 'symbol' and 'id' 
 * attributes. The 'symbol' attribute matches the Ovoid.JS's constant
 * symbolic <c>Ovoid.UNIFORM_MATRIX_TRANSFORM_MAT4</c>. The 'symbol' 
 * attribute si here for readability and convenience: the parser 
 * will only take care about the 'id' attribute. What you have to 
 * modify here to match your shader program are the 
 * two values MXF and MNR which are the variables names to be identified 
 * in the shader program.<br><br>
 * 
 * A shader does not have to use ALL the available wrap slots, the 
 * unfound shader variables are simply ignored and not wrapped.<br><br>
 * 
 * Full filled XML and JSON wrapping map examples are provided in OvoiD.JS 
 * source packages.<br><br>
 * 
 * <b>The default wrapping map</b><br><br>
 * 
 * If you don't want to use your own wrapping map you can let the 
 * Shader object use the built-in default wrapping map. If you choose 
 * this option, you however have to write your shader with the 
 * variable's names according to the default wrapping rules. Here is 
 * the default wrapping map rules:<br><br>
 * 
 * <table id=thintb>
 * <tr>
 * <td><b>Ovoid.JS Symbolic Constant</b></td>
 * <td><b>GLSL Variable type</b></td>
 * <td><b>GLSL Variable name</b></td>
 * <td><b>Description</b></td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC4_P</td>
 * <td>attribute vec4</td>
 * <td>p</td>
 * <td>Vertex Position</td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC3_N</td>
 * <td>attribute vec3</td>
 * <td>n</td>
 * <td>Vertex Normal vector</td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC3_U</td>
 * <td>attribute vec3</td>
 * <td>u</td>
 * <td>Vertex Texture coordinates</td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC3_T</td>
 * <td>attribute vec3</td>
 * <td>t</td>
 * <td>Vertex Tangent vector</td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC3_B</td>
 * <td>attribute vec3</td>
 * <td>b</td>
 * <td>Vertex Binormal vector</td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC4_C</td>
 * <td>attribute vec4</td>
 * <td>c</td>
 * <td>Vertex Color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC4_I</td>
 * <td>attribute vec4</td>
 * <td>i</td>
 * <td>Vertex skin/deform Influence Index</td>
 * </tr>
 * <tr>
 * <td>Ovoid.VERTEX_VEC4_W</td>
 * <td>attribute vec4</td>
 * <td>w</td>
 * <td>Vertex skin/deform Influence Weight</td>
 * </tr>
 * </table>
 * <table id=thintb>
 * <tr>
 * <td><b>Ovoid.JS Symbolic Constant</b></td>
 * <td><b>GLSL Variable type</b></td>
 * <td><b>GLSL Variable name</b></td>
 * <td><b>Description</b></td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_DIFFUSE_LIGHTING_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENd</td>
 * <td>Diffuse lighting enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_AMBIENT_LIGHTING_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENa</td>
 * <td>Ambient lighting enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_SPECULAR_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENs</td>
 * <td>Specular enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_REFLECT_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENr</td>
 * <td>Reflexion enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_PARALAX_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENp</td>
 * <td>Paralax mapping enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_MATERIAL_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENm</td>
 * <td>Material shading enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_VERTEX_WEIGHT_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENw</td>
 * <td>Vertex Weight enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ENABLE_COMPUT_TANGENT_BOOL</td>
 * <td>uniform bool</td>
 * <td>ENt</td>
 * <td>Compute Vertex Tangent space enabled flag</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_ZOFFSET_FLOAT</td>
 * <td>uniform float</td>
 * <td>Z</td>
 * <td>Z-Offset value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_COLOR_VEC4</td>
 * <td>uniform vec4</td>
 * <td>C</td>
 * <td>Render color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_AMBIENT_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Ma</td>
 * <td>Material Ambient Color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_DIFFUSE_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Md</td>
 * <td>Material Diffuse Color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_SPECULAR_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Ms</td>
 * <td>Material Specular Color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_EMISSIVE_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Me</td>
 * <td>Material Emissive Color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_REFLECT_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Mr</td>
 * <td>Material Reflection Color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_SHININESS_FLOAT</td>
 * <td>uniform float</td>
 * <td>Mi</td>
 * <td>Material shininess factor value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_OPACITY_FLOAT</td>
 * <td>uniform float</td>
 * <td>Mo</td>
 * <td>Material Opacity value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_REFLECTIVITY_FLOAT</td>
 * <td>uniform float</td>
 * <td>My</td>
 * <td>Material Reflectivity factor value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATERIAL_BUMPINESS_FLOAT</td>
 * <td>uniform float</td>
 * <td>Mb</td>
 * <td>Material bumpiness factor value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_AMBIENT_COLOR_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Ac</td>
 * <td>Ambient lighting color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_ENABLED_BOOL</td>
 * <td>uniform bool</td>
 * <td>Le</td>
 * <td>Light(s) Enabled flag</td>
 * </tr>
 * <tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_POSITION_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Lp</td>
 * <td>Light(s) Position</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_DIRECTION_VEC3</td>
 * <td>uniform vec3</td>
 * <td>Ld</td>
 * <td>Light(s) Direction vector</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_COLOR_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Lc</td>
 * <td>Light(s) Color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_INTENSITY_FLOAT</td>
 * <td>uniform float</td>
 * <td>Li</td>
 * <td>Light(s) Intensity value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_CONSTANT_ATTENUATION_FLOAT</td>
 * <td>uniform float</td>
 * <td>Lac</td>
 * <td>Light(s) Constant attenuation value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_LINEAR_ATTENUATION_FLOAT</td>
 * <td>uniform float</td>
 * <td>Lal</td>
 * <td>Light(s) Linear Attenuation value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_QUADRIC_ATTENUATION_FLOAT</td>
 * <td>uniform float</td>
 * <td>Laq</td>
 * <td>Light(s) Quadratic Attenuation value</td>
 * </tr>
 * <td>Ovoid.UNIFORM_LIGHT_RANGE_FLOAT</td>
 * <td>uniform float</td>
 * <td>Lr</td>
 * <td>Light(s) Range value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_FALLOFF_FLOAT</td>
 * <td>uniform float</td>
 * <td>Lf</td>
 * <td>Light(s) Falloff value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LIGHT_SPOTANGLE_FLOAT</td>
 * <td>uniform float</td>
 * <td>La</td>
 * <td>Light(s) Spot Angle value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_EYE_POSITION_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Ep</td>
 * <td>Camera/Eye Position</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_EYE_DIRECTION_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Ed</td>
 * <td>Camera/Eye Direction</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_EYE_VIEWSIZE_VEC3</td>
 * <td>uniform vec3</td>
 * <td>Es</td>
 * <td>Camera/Eye View Size</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_FOG_COLOR_VEC4</td>
 * <td>uniform vec4</td>
 * <td>Fc</td>
 * <td>Fog color</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_FOG_DENSITY_FLOAT</td>
 * <td>uniform float</td>
 * <td>Fd</td>
 * <td>Fog density value</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_LAYER_SIZE_VEC3</td>
 * <td>uniform vec3</td>
 * <td>Ls</td>
 * <td>Layer Size</td>
 * </tr>
 * </table>
 * <table id=thintb>
 * <tr>
 * <td><b>Ovoid.JS Symbolic Constant</b></td>
 * <td><b>GLSL Variable type</b></td>
 * <td><b>GLSL Variable name</b></td>
 * <td><b>Description</b></td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATRIX_TRANSFORM_MAT4</td>
 * <td>uniform matrix4</td>
 * <td>MXF</td>
 * <td>Body Transformation World Matrix</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATRIX_NORMAL_MAT3</td>
 * <td>uniform matrix3</td>
 * <td>MNR</td>
 * <td>Body Transformation Normal Matrix</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATRIX_MODELVIEW_MAT4</td>
 * <td>uniform matrix4</td>
 * <td>MMV</td>
 * <td>Model-View Matrix</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATRIX_EYEVIEW_MAT4</td>
 * <td>uniform matrix4</td>
 * <td>MEV</td>
 * <td>Eye-View Matrix</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATRIX_PROJECTION_MAT4</td>
 * <td>uniform matrix4</td>
 * <td>MPJ</td>
 * <td>Projection Matrix</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATRIX_LOOKAT_MAT4</td>
 * <td>uniform matrix4</td>
 * <td>MLA</td>
 * <td>Look-at Matrix</td>
 * </tr>
 * <tr>
 * <td>Ovoid.UNIFORM_MATRIX_JOINTS_MAT4</td>
 * <td>uniform matrix4</td>
 * <td>MJT</td>
 * <td>Skin Bones/Joint Influence transformation matrix</td>
 * </tr>
 * </table>
 * <table id=thintb>
 * <tr>
 * <td><b>Ovoid.JS Symbolic Constant</b></td>
 * <td><b>GLSL Variable type</b></td>
 * <td><b>GLSL Variable name</b></td>
 * <td><b>Description</b></td>
 * </tr>
 * <tr>
 * <td>Ovoid.SAMPLER_DEFAULT</td>
 * <td>uniform sampler2D</td>
 * <td>Sd</td>
 * <td>Default Texture Sampler</td>
 * </tr>
 * <tr>
 * <td>Ovoid.SAMPLER_AMBIENT</td>
 * <td>uniform sampler2D</td>
 * <td>Sa</td>
 * <td>Ambient color Texture Sampler</td>
 * </tr>
 * <tr>
 * <td>Ovoid.SAMPLER_DIFFUSE</td>
 * <td>uniform sampler2D</td>
 * <td>Sd</td>
 * <td>Diffuse color Texture Sampler</td>
 * </tr>
 * <tr>
 * <td>Ovoid.SAMPLER_SPECULAR</td>
 * <td>uniform sampler2D</td>
 * <td>Ss</td>
 * <td>Specular color Texture Sampler</td>
 * </tr>
 * <tr>
 * <td>Ovoid.SAMPLER_EMISSIVE</td>
 * <td>uniform sampler2D</td>
 * <td>Se</td>
 * <td>Emissive color Texture Sampler</td>
 * </tr>
 * <tr>
 * <td>Ovoid.SAMPLER_REFLECT</td>
 * <td>uniform sampler2D</td>
 * <td>Sr</td>
 * <td>Reflection Texture Sampler</td>
 * </tr>
 * <tr>
 * <td>Ovoid.SAMPLER_NORMAL</td>
 * <td>uniform sampler2D</td>
 * <td>Sn</td>
 * <td>Normal map Texture Sampler</td>
 * </tr>
 * </table><br><br>
 * 
 * Here is an example of a very simple vertex shader source 
 * compatible with the default wrapping map. This is the current 
 * Ovoid.JS's built-in vertex shader used to draw plain colored vertex 
 * without lighting:<br><br>
 * 
 * <blockcode>
 * <cc>// OvoiD.JS - Built-in vertex shader - PC</cc><br>
 * <cc>// Main vertex shader for colored vertex.</cc><br>
 * <br>
 * attribute vec4 p;<br>
 * attribute vec4 c;<br>
 * uniform mat4 MEV;<br>
 * uniform mat4 MXF;<br>
 * varying vec4 Vc;<br>
 * <br>
 * void main(void) {<br>
 * &nbsp;&nbsp;Vc = c;<br>
 * &nbsp;&nbsp;gl_Position = MEV * (MXF * p);<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * 
 * <b>The Vertex Format</b><br><br>
 * 
 * The Vertex Format is an easy way to define vertex's components of a 
 * mesh, then automatically enable or disables the vertex attributes 
 * pointers during Mesh drawing. This is why the Vertex Format is used 
 * by the Mesh Node, it define what components (position, normal, 
 * color, textures coordinates, etc...) will be used to render the 
 * mesh. This vertex format is then passed to the Shader object to 
 * setup attributes pointers.<br><br>
 * 
 * A vertex format is defined by a bitmask using symbolic 
 * constants:<br><br>
 * 
 * <blockcode>
 * var format = Ovoid.Ovoid.VERTEX_VEC4_P | Ovoid.VERTEX_VEC3_N | Ovoid.VERTEX_VEC4_C;
 * </blockcode><br><br>
 * 
 * The above example define a vertex format with [x,y,z,w] Position 
 * (vec4 float), [x,y,z] Normal vector (vec3 float) and [r,g,b,a] Color 
 * (vec4 float). This is typical vertex with color instead of texture
 * coordinates.<br><br>
 * 
 * The available components and symbolic constants to define a Vertex 
 * Format are the followings: <br><br>
 * 
 * <ul>
 * <li><c>Ovoid.VERTEX_VEC4_P</c></li>
 * Four 32 bits float (x,y,z,w) for position point in space.<br><br>
 * <li><c>Ovoid.VERTEX_VEC3_N</c></li>
 * Three 32 bits float (x,y,z) for normal vector.<br><br>
 * <li><c>Ovoid.VERTEX_VEC3_U</c></li>
 * Three 32 bits float (u,v,w) for Uv texture coordinate.<br><br>
 * <li><c>Ovoid.VERTEX_VEC3_T</c></li>
 * Three 32 bits float (u,v,w) for Tangent space coordinate. (normal mapping)<br><br>
 * <li><c>Ovoid.VERTEX_VEC3_B</c></li>
 * Three 32 bits float (u,v,w) for binormal vector. (normal mapping)<br><br>
 * <li><c>Ovoid.VERTEX_VEC4_C</c></li>
 * Four 32 bits float (r,g,b,a) for vertex color.<br><br>
 * <li><c>Ovoid.VERTEX_VEC4_I</c></li>
 * Four 32 bits float (i,i,i,i) for influence matrix index. (skin deform)<br><br>
 * <li><c>Ovoid.VERTEX_VEC4_W</c></li>
 * Four 32 bits float (w,w,w,w) for influence wheight. (skin deform)<br><br>
 * </ul><br><br>
 * 
 * @param {string} name Indicative name for this shader.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Shader = function(name, i) {

  /** Shader indicative name 
   * @type string */
  this.name = name;
  /** Vertex program url.
   * @type string */
  this.verturl = '';
  /** Fragment program url.
   * @type string */
  this.fragurl = '';
  /** Wrap map url.
   * @type string */
  this.wrapurl = '';
  /** Vertex program source.
   * @type string */
  this.vertsource = '';
  /** Fragment program source.
   * @type string */
  this.fragsource = '';
  /** wrap map XML or JSON source.
   * @type string */
  this.wrapsource = Ovoid.GLSL_WRAPMAP;
  /** Vertex program compilation status.
   * @type string */
  this.vertstat = '';
  /** Fragment program compilation status.
   * @type string */
  this.fragstat = '';
  /** Shader program link status.
   * @type string */
  this.progstat = '';
  /** Vertex program Gl handle.
   * @type int */
  this.verthandle = -1;
  /** Fragment program Gl handle.
   * @type int */
  this.fraghandle = -1;
  /** Shader program Gl handle.
   * @type int*/
  this.proghandle = -1;

  /** LinkWrap shader status.
   * @type bool*/
  this.linkStatus = false;
  
  /** Vertex attribute slots list.
   * @type int[] */
  this.attribute = new Array(Ovoid.MAX_VERTEX_ATTRIB);
  for (var j = 0; j < Ovoid.MAX_VERTEX_ATTRIB; j++)
    this.attribute[j] = -1;

  this.attrsize = new Uint16Array(Ovoid.MAX_VERTEX_ATTRIB);

  /** Uniform slots list.
   * @type int[] */
  this.uniform = new Array(Ovoid.MAX_UNIFORM);
  for (var j = 0; j < Ovoid.MAX_UNIFORM; j++)
    this.uniform[j] = -1;

  /** Uniform Matrix slots list.
   * @type int[] */
  this.uniformMatrix = new Array(Ovoid.MAX_UNIFORM_MATRIX);
  for (var j = 0; j < Ovoid.MAX_UNIFORM_MATRIX; j++)
    this.uniformMatrix[j] = -1;

  /** Uniform Sampler slots list.
   * @type int[] */
  this.uniformSampler = new Array(Ovoid.MAX_UNIFORM_SAMPLER);
  for (var j = 0; j < Ovoid.MAX_UNIFORM_SAMPLER; j++)
    this.uniformSampler[j] = -1;

  this.outFragment = new Array(Ovoid.MAX_OUT_FRAGMENT);
  for (var j = 0; j < Ovoid.MAX_OUT_FRAGMENT; j++)
    this.outFragment[j] = -1;

  /** Sahder source files loading status.<br><br>
   * A value of 0 means that one or more file is not yet loaded, a value of 1 
   * means that all the sources was successfully loaded, and a value of -1 means 
   * the loading failed.
   * @type int */
  this.loadStatus = 0;
  
  /** vertex source load status */
  this._vslstatus = 0;
  /** fragment source load status */
  this._fslstatus = 0;
  /** wrapmap source load status */
  this._wmlstatus = 0;
  /** pointer to attached Ovoid.JS instance */
  this._i = i;
  
};


/**
 * Load the specified source files for this instance.<br><br>
 * 
 * Loads the specified external source files and store the 
 * loaded data. If not specified, the loading is made in the asynchronous way.<br><br>
 *  
 * The <c>loadSatus</c> member indicates the loading status through an 
 * integer value of 0, 1 or -1. A value of 0 means that one or more file is not 
 * yet loaded, a value of 1 means that all the sources was successfully loaded, 
 * and a value of -1 means the loading failed.<br><br>
 *
 * @param {string} vs Vertex program shader source file url. 
 * 
 * @param {string} fs Fragment program shader source file url.
 * 
 * @param {string} wm XML or JSON wrap map file url or null to use default.
 * 
 * @param {bool} async Optionnal asynchronous loading flag. If true or not null
 * the source is loaded in asynchronous way.
 * 
 */
Ovoid.Shader.prototype.loadSource = function(vs, fs, wm, async) {

  this.verturl = vs;
  this.fragurl = fs;
  this.wrapurl = wm;
  if (wm == undefined || wm == null || wm == "") {
    wm = null;
    this._wmlstatus = 1;
  }
  
  var fsrc, vsrc, wsrc;
  
  var fsrc = fs;
  if (this._i.opt_debugMode) 
    fsrc += '?' + Math.random();
  
  var vsrc = vs;
  if (this._i.opt_debugMode) 
    vsrc += '?' + Math.random();
  
  if (wm) {
    var wsrc = wm;
    if (this._i.opt_debugMode) 
      wsrc += '?' + Math.random();
  }
    
  var vxhr = new XMLHttpRequest();
  vxhr.id = 0;
  vxhr.o = this;
  vxhr._i = this._i;
  
  var fxhr = new XMLHttpRequest();
  fxhr.id = 1;
  fxhr.o = this;
  fxhr._i = this._i;
  
  if (wm) {
    var wxhr = new XMLHttpRequest();
    wxhr.id = 2;
    wxhr.o = this;
    wxhr._i = this._i;
  }
  
  /* La définition de onreadystatechange n'est utile qu'en
   * mode asynchrone */
  if (async) {
    var hthndfunc =  function()
    {
      if (this.readyState == 4) {
        if (this.status == 200 || this.status == 304) {
          switch(this.id)
          {
            case 0:
              this.o.vertsource = this.responseText;
                this.o._vslstatus = 1;
            break;
            case 1:
              this.o.fragsource = this.responseText;
                this.o._fslstatus = 1;
            break;
            case 2:
              this.o.wrapsource = this.responseText;
                this.o._wmlstatus = 1;
            break;
          }
          
          if( (this.o._vslstatus + this.o._fslstatus + this.o._wmlstatus) == 3) {
            this.o.loadStatus = 1;
            this.o._linkWrap()
          }
          
        } else {
          switch(this.id)
          {
            case 0:
              Ovoid._log(2,this._i,' Shader.loadSource', this.o.name +
                ":: unable to load source '" + this.o.verturl + "'");
                this.o._vslstatus = -1;
                this.o.loadStatus = -1;
            break;
            case 1:
              Ovoid._log(2,this._i,' Shader.loadSource', this.o.name +
                ":: unable to load source '" + this.o.fragurl + "'");
                this.o._fslstatus = -1;
                this.o.loadStatus = -1;
            break;
            case 2:
              Ovoid._log(2,this._i, ' Shader.loadSource', this.o.name +
                ":: unable to load source '" + this.o.wrapurl + "'");
                this.o._wmlstatus = -1;
                this.o.loadStatus = -1;
            break;
          }
        }
      }
    }
    vxhr.onreadystatechange = hthndfunc;
    fxhr.onreadystatechange = hthndfunc;
    if (wm) wxhr.onreadystatechange = hthndfunc;
  }
  
  fxhr.open("GET", fsrc, async);
  fxhr.send();
  vxhr.open("GET", vsrc, async);
  vxhr.send();
  if (wm) {
    wxhr.open("GET", wsrc, async);
    wxhr.send();
  }
  
  // Si nous sommes en mode synchrone
  if (!async) {
    if(wm) {
      if (wxhr.status == 200 || wxhr.status == 304) {
        this.wrapsource = wxhr.responseText;
        this._wmlstatus = 1;
      } else {
        this._wmlstatus = -1;
        this.loadStatus = -1;
        Ovoid._log(2,this._i,' Shader.loadSource', this.name +
            ":: unable to load source '" +
            this.wrapurl + "'");
      }
    } else {
      this._wmlstatus = 1;
    }
    if (fxhr.status == 200 || fxhr.status == 304) {
      this.fragsource = fxhr.responseText;
      this._fslstatus = 1;
    } else {
      this._fslstatus = -1;
      this.loadStatus = -1;
      Ovoid._log(2,this._i,' Shader.loadSource', this.name +
          ":: unable to load source '" +
          this.fragurl + "'");
    }
    if (vxhr.status == 200 || vxhr.status == 304) {
      this.vertsource = vxhr.responseText;
      this._vslstatus = 1;
    } else {
      this._vslstatus = -1;
      this.loadStatus = -1;
      Ovoid._log(2,this._i,' Shader.loadSource', this.name +
          ":: unable to load source '" +
          this.verturl + "'");
    }
    if( (this._vslstatus + this._fslstatus + this._wmlstatus) == 3) {
      this.loadStatus = 1;
      this._linkWrap()
    }
  }
};


/**
 * Set shader's sources.<br><br>
 * 
 * Sets the sahder's vertex program, fragment program and wrap map source 
 * strings. 
 *
 * @param {string} vs Vertex program shader source string.
 * 
 * @param {string} fs Fragment program shader source string.
 * 
 * @param {string} wm XML or JSON wrap map string or null to use default.
 */
Ovoid.Shader.prototype.setSources = function(vs, fs, wm) {
  
  if (wm != undefined && wm != null && wm != "") {
    this.wrapsource = wm;
  }
  this.fragsource = fs;
  this.vertsource = vs;
  this.loadStatus = 1;
  return this._linkWrap();
}

/**
 * Link & wrap shader sources.<br><br>
 * 
 * Compiles, links and then wraps the current shader's sources. Source strings 
 * must be loaded or defined using the <c>loadSource</c> or 
 * <c>setSources</c> method.
 * 
 * @return {bool} True if operations suceeds, false otherwise.
 */
Ovoid.Shader.prototype._linkWrap = function() {
  
  if (this.loadStatus != 1) {
    Ovoid._log(2,this._i, ' Shader.linkWrap', this.name + 
        ":: link/compil error, sources not loaded.");
    return false;
  }

  this.verthandle = this._i.gl.createShader(this._i.gl.VERTEX_SHADER);
  this.fraghandle = this._i.gl.createShader(this._i.gl.FRAGMENT_SHADER);

  this._i.gl.shaderSource(this.verthandle, this.vertsource);
  this._i.gl.compileShader(this.verthandle);
  this.vertstat = this._i.gl.getShaderInfoLog(this.verthandle);

  if (! this._i.gl.getShaderParameter(this.verthandle,
      this._i.gl.COMPILE_STATUS))
  {
    this.clear();
    Ovoid._log(2,this._i, ' Shader.linkWrap', this.name + 
        ":: '" + this.verturl + "' compil error: " + this.vertstat);
    return false;
  }

  this._i.gl.shaderSource(this.fraghandle, this.fragsource);
  this._i.gl.compileShader(this.fraghandle);
  this.fragstat = this._i.gl.getShaderInfoLog(this.fraghandle);

  if (!this._i.gl.getShaderParameter(this.fraghandle,
      this._i.gl.COMPILE_STATUS))
  {
    this.clear();
    Ovoid._log(2,this._i, ' Shader.linkWrap', this.name + 
        ":: '" + this.fragurl + "' compil error: " + this.fragstat);
    return false;
  }

  this.proghandle = this._i.gl.createProgram();
  this._i.gl.attachShader(this.proghandle, this.verthandle);
  this._i.gl.attachShader(this.proghandle, this.fraghandle);
  this._i.gl.linkProgram(this.proghandle);

  this.progstat = this._i.gl.getProgramInfoLog(this.proghandle);

  if (!this._i.gl.getProgramParameter(this.proghandle,
      this._i.gl.LINK_STATUS))
  {
    this.clear();
    Ovoid._log(2,this._i, ' Shader.linkWrap', this.name + 
        ":: link error: " + this.progstat);
    return false;
  }
  
  Ovoid._log(3,this._i, ' Shader.linkWrap', this.name + 
        ":: link log: " + this.progstat);
  
  this._i._logGlerror(' Shader.linkWrap::' + this.name);

  /* retrouve le type de fichier */
  if(this.wrapurl) {
    var ext = Ovoid.extractExt(this.wrapurl).toUpperCase();
    if (ext == "XML") {
      if (!this._wrapXml()) {
        Ovoid._log(2,this._i, ' Shader.linkWrap', this.name + 
            ":: program wrap error.");
        return false;
      }
    } else {
      if (!this._wrapJson()) {
        Ovoid._log(2,this._i, ' Shader.linkWrap', this.name + 
            ":: program wrap error.");
        return false;
      }
    }
  } else {
    if (!this._wrapJson()) {
      Ovoid._log(2,this._i, ' Shader.linkWrap', this.name + 
          ":: program wrap error.");
      return false;
    }
  }
  
  this.linkStatus = true;
  
  return true;
};


/**
 * Wrap shader.
 * 
 * <br><br>Wraps the current shader with the current loaded wrap map source 
 * parsed as OJSON.
 * 
 * @return {bool} True if wrap suceeds, false otherwise.
 */
Ovoid.Shader.prototype._wrapJson = function() {
  
  var ojson = JSON.parse(this.wrapsource);
      
  if (ojson == null) {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: unable to load Json wrap map '"+wm+"'");
    return false;
  }
  
  /* Verifie le format JSON */
  if(!ojson.OJSON) {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: '"+wm+"' is not a valid Ovoid JSON format");
    return false;
  }
  
  if(ojson.type != "glslmap") {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: '"+wm+"' is not a valid Ovoid JSON glslmap");
    return false;
  }
  
  if(!ojson.wrapmap) {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: '"+wm+"' no wrapmap object found in Ovoid JSON");
    return false;
  }
  
  var map = ojson.wrapmap;
  
  if (map.attribute) {
    if (map.attribute.length > 0) {
      i = map.attribute.length;
      while (i--) {
        this.plugVertexAttrib(map.attribute[i].id, map.attribute[i].name);
      }
    } else {
      Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
          ":: '"+wm+"' wrap : no attribute slot.");
    }
  } else {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: '"+wm+"' wrap : missing attribute map.");
    return false;
  }
  
  if (map.uniform) {
    if (map.uniform.length > 0) {
      i = map.uniform.length;
      while (i--) {
        this.plugUniform(map.uniform[i].id, map.uniform[i].name);
      }
    } else {
      Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
          ":: '"+wm+"' wrap : no uniform slot.");
    }
  } else {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: '"+wm+"' wrap : missing uniform map.");
    return false;
  }
  
  if (map.uniformMatrix) {
    if (map.uniformMatrix.length > 0) {
      i = map.uniformMatrix.length;
      while (i--) {
        this.plugUniformMatrix(map.uniformMatrix[i].id, map.uniformMatrix[i].name);
      }
    } else {
      Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
          ":: '"+wm+"' wrap : no uniformMatrix slot.");
    }
  } else {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: '"+wm+"' wrap : missing uniformMatrix map.");
    return false;
  }
  
  if (map.uniformSampler) {
    if (map.uniformSampler.length > 0) {
      i = map.uniformSampler.length;
      while (i--) {
        this.plugUniformSampler(map.uniformSampler[i].id, map.uniformSampler[i].name);
      }
    } else {
      Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
          ":: '"+wm+"' wrap : no uniformSampler slot.");
    }
  } else {
    Ovoid._log(2,this._i,' Shader._wrapJson', this.name + 
        ":: '"+wm+"' wrap : missing uniformSampler map.");
    return false;
  }

  return true;
}

/**
 * Wrap shader.
 * 
 * <br><br>Wraps the current shader with the current loaded wrap map source 
 * parsed as XML.
 * 
 * @return {bool} True if wrap suceeds, false otherwise.
 */
Ovoid.Shader.prototype._wrapXml = function() {
  
  var parser = new DOMParser();
  var xmlWrapmap = parser.parseFromString(this.wrapsource,'text/xml');

  if (xmlWrapmap == null) {
    Ovoid._log(2,this._i, ' Shader._wrapXml', this.name + 
        ":: unable to load Xml wrap map '"+wm+"'");
    return false;
  }

  var xmlAttribute = xmlWrapmap.getElementsByTagName('attribute')[0];
  var xmlUniform = xmlWrapmap.getElementsByTagName('uniform')[0];
  var xmlUniformMatrix = xmlWrapmap.getElementsByTagName('uniformMatrix')[0];
  var xmlUniformSampler = xmlWrapmap.getElementsByTagName('uniformSampler')[0];

  var xmlSlot, name, id, map, i;
  if (xmlAttribute != null) {

    xmlSlot = xmlAttribute.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugVertexAttrib(id, map);
      }
    } else {
      Ovoid._log(2,this._i,' Shader._wrapXml', this.name + 
          ":: '"+wm+"' wrap : no attribute slot.");
    }
  } else {
    Ovoid._log(2,this._i,' Shader._wrapXml', this.name + 
        ":: '"+wm+"' wrap : missing attribute map.");
    return false;
  }

  if (xmlUniform != null) {

    xmlSlot = xmlUniform.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugUniform(id, map);
      }
    } else {
      Ovoid._log(2,this._i, ' Shader._wrapXml', this.name + 
          ":: '"+wm+"' wrap : no uniform slot.");
    }
  } else {
    Ovoid._log(2,this._i, ' Shader._wrapXml', this.name + 
        ":: '"+wm+"' wrap : missing uniform map.");
    return false;
  }

  if (xmlUniformMatrix != null) {

    xmlSlot = xmlUniformMatrix.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugUniformMatrix(id, map);
      }
    } else {
      Ovoid._log(2,this._i,' Shader._wrapXml', this.name + 
          ":: '"+wm+"' wrap : no uniformMatrix slot.");
    }
  } else {
    Ovoid._log(2,this._i,' Shader._wrapXml', this.name + 
        ":: '"+wm+"' wrap : missing uniformMatrix map.");
    return false;
  }

  if (xmlUniformSampler != null) {

    xmlSlot = xmlUniformSampler.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugUniformSampler(id, map);
      }
    } else {
      Ovoid._log(2,this._i,' Shader._wrapXml', this.name + 
          ":: '"+wm+"' wrap : no uniformSampler slot.");
    }
  } else {
    Ovoid._log(2,this._i,' Shader._wrapXml', this.name + 
        ":: '"+wm+"' wrap : missing uniformSampler map.");
    return false;
  }
  
  return true;
};


/**
 * Use shader.
 * 
 * <br><br>Tells to GL API to uses this shader for rendering pipeline. This is 
 * a shurtcut for <c>gl.useProgram()</c> funtion.
 * 
 */
Ovoid.Shader.prototype.use = function() {

  this._i.gl.useProgram(this.proghandle);
};


/**
 * Plug vertex attribute.<br><br>
 * 
 * Plugs the given vertex attribute to the specified slot.
 *
 * @param {enum} slot Vertex attribute slot identifier. Can be one of the 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W<br><br>
 * 
 * @param {string} attr Shaders's vertex attribute name to be plugged.
 *
 * @return {int} The vertex attribute location or -1 if attribute is not found.
 */
Ovoid.Shader.prototype.plugVertexAttrib = function(slot, attr) {

  var id = this._i.gl.getAttribLocation(this.proghandle, attr);
  switch (slot)
  {
    case Ovoid.VERTEX_VEC4_P:
      this.attribute[0] = id;
      this.attrsize[0] = 4;
      return id;
    case Ovoid.VERTEX_VEC3_N:
      this.attribute[1] = id;
      this.attrsize[1] = 3;
      return id;
    case Ovoid.VERTEX_VEC3_U:
      this.attribute[2] = id;
      this.attrsize[2] = 3;
      return id;
    case Ovoid.VERTEX_VEC3_T:
      this.attribute[3] = id;
      this.attrsize[3] = 3;
      return id;
    case Ovoid.VERTEX_VEC3_B:
      this.attribute[4] = id;
      this.attrsize[4] = 3;
      return id;
    case Ovoid.VERTEX_VEC4_C:
      this.attribute[5] = id;
      this.attrsize[5] = 4;
      return id;
    case Ovoid.VERTEX_VEC4_I:
      this.attribute[6] = id;
      this.attrsize[6] = 4;
      return id;
    case Ovoid.VERTEX_VEC4_W:
      this.attribute[7] = id;
      this.attrsize[7] = 4;
      return id;
    default:
      return -1;
  }
};


/**
 * Plug uniform.<br><br>
 * 
 * Plugs the given uniform to the specified slot.
 *
 * @param {enum} slot Uniform slot identifier. Can be one of the 
 * following symbolic constants:<br><br>
 * 	Ovoid.UNIFORM_ENABLE_DIFFUSE_LIGHTING_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_AMBIENT_LIGHTING_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_SPECULAR_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_REFLECT_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_PARALAX_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_MATERIAL_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_VERTEX_WEIGHT_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_COMPUT_TANGENT_BOOL,<br>
		Ovoid.UNIFORM_ZOFFSET_FLOAT,<br>
		Ovoid.UNIFORM_COLOR_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_AMBIENT_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_DIFFUSE_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_SPECULAR_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_EMISSIVE_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_REFLECT_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_SHININESS_FLOAT,<br>
		Ovoid.UNIFORM_MATERIAL_OPACITY_FLOAT,<br>
		Ovoid.UNIFORM_MATERIAL_REFLECTIVITY_FLOAT,<br>
		Ovoid.UNIFORM_MATERIAL_BUMPINESS_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_POSITION_VEC4,<br>
		Ovoid.UNIFORM_LIGHT_DIRECTION_VEC3,<br>
		Ovoid.UNIFORM_LIGHT_COLOR_VEC4,<br>
		Ovoid.UNIFORM_LIGHT_INTENSITY_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_CONSTANT_ATTENUATION_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_RANGE_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_FALLOFF_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_SPOTANGLE_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_LINEAR_ATTENUATION_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_ENABLED_BOOL,<br>
		Ovoid.UNIFORM_LIGHT_QUADRIC_ATTENUATION_FLOAT,<br>
		Ovoid.UNIFORM_EYE_POSITION_VEC4,<br>
		Ovoid.UNIFORM_EYE_DIRECTION_VEC4,<br>
		Ovoid.UNIFORM_EYE_VIEWSIZE_VEC3,<br>
		Ovoid.UNIFORM_LAYER_SIZE_VEC3,<br><br>
    * 
 * @param {string} name Shaders's uniform name to be plugged.
 *
 * @return {int} The uniform location or -1 if uniform is not found.
 */
Ovoid.Shader.prototype.plugUniform = function(slot, name) {

  var id = this._i.gl.getUniformLocation(this.proghandle, name);
  if (id) {
    this.uniform[slot] = id; return id;
  } else {
    return -1;
  }
};


/**
 * Plug matrix uniform.<br><br>
 *
 * Plugs the given matrix uniform to the specified slot.
 * 
 * @param {enum} slot Matrix uniform slot identifier. Can be one of the 
 * following symbolic constants:<br><br>
 * Ovoid.UNIFORM_MATRIX_TRANSFORM_MAT4,<br>
   Ovoid.UNIFORM_MATRIX_NORMAL_MAT3,<br>
	 Ovoid.UNIFORM_MATRIX_MODELVIEW_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_EYEVIEW_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_PROJECTION_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_LOOKAT_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_JOINTS_MAT4,<br><br>
 * 
 * @param {string} name Shaders's matrix uniform name to be plugged.
 *
 * @return {int} The matrix uniform location or -1 if matrix uniform is not found.
 */
Ovoid.Shader.prototype.plugUniformMatrix = function(slot, name) {

  var id = this._i.gl.getUniformLocation(this.proghandle, name);
  if (id) {
    this.uniformMatrix[slot] = id; return id;
  } else {
    return -1;
  }
};


/**
 * Plug sampler uniform.<br><br>
 *
 * Plugs the given sampler uniform to the specified slot.
 * 
 * @param {enum} slot Sampler uniform slot identifier. Can be one of the 
 * following symbolic constants:<br><br>
		Ovoid.SAMPLER_DEFAULT,<br>
		Ovoid.SAMPLER_AMBIENT,<br>
		Ovoid.SAMPLER_DIFFUSE,<br>
		Ovoid.SAMPLER_SPECULAR,<br>
		Ovoid.SAMPLER_EMISSIVE,<br>
		Ovoid.SAMPLER_REFLECT,<br>
		Ovoid.SAMPLER_NORMAL,<br><br>
 * 
 * @param {string} name Shaders's sampler uniform name to be plugged.
 *
 * @return {int} The sampler uniform location or -1 if matrix uniform is not found.
 */
Ovoid.Shader.prototype.plugUniformSampler = function(slot, name) {

  var id = this._i.gl.getUniformLocation(this.proghandle, name);
  if (id) {
    this.uniformSampler[slot] = id; return id;
  } else {
    return -1;
  }
};


/**
 * 1 float uniform value assignment.
 * 
 * @param {enum} s Uniform slot identifier.
 * @param {float} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1f = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform1f(this.uniform[s], v);
};


/**
 * 1 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1fv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform1fv(this.uniform[s], v);
};


/**
 * 2 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform2fv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform2fv(this.uniform[s], v);
};


/**
 * 3 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform3fv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform3fv(this.uniform[s], v);
};


/**
 * 4 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform4fv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform4fv(this.uniform[s], v);
};


/**
 * 1 int uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {int} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1i = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform1i(this.uniform[s], v);
};


/**
 * 1 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1iv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform1iv(this.uniform[s], v);
};


/**
 * 2 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform2iv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform2iv(this.uniform[s], v);
};


/**
 * 3 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform3iv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform3iv(this.uniform[s], v);
};


/**
 * 4 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform4iv = function(s, v) {

  if (this.uniform[s] != -1) this._i.gl.uniform4iv(this.uniform[s], v);
};


/**
 * 3x3 matrix array uniform value assignment.
 *
 * @param {enum} s Uniform matrix slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniformMatrix3fv = function(s, v) {

  if (this.uniformMatrix[s] != -1)
    this._i.gl.uniformMatrix3fv(this.uniformMatrix[s], 0, v);
};


/**
 * 4x4 matrix array uniform value assignment.
 *
 * @param {enum} s Uniform matrix slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniformMatrix4fv = function(s, v) {

  if (this.uniformMatrix[s] != -1)
    this._i.gl.uniformMatrix4fv(this.uniformMatrix[s], 0, v);
};


/**
 * Enable sampler uniform.
 *
 * @param {enum} s Uniform sampler slot identifier.
 */
Ovoid.Shader.prototype.setUniformSampler = function(s) {

  if (this.uniformSampler[s] != -1)
    this._i.gl.uniform1i(this.uniformSampler[s], s);
};


/** Set attributes pointers.<br><br>
 * 
 * Enables and/or disables WebGL vertex attributes pointers and arrays 
 * according to the given Vertex format and vertex size.
 *
 * @param {bitmask} vformat Vertex format.
 * @param {int} vfbytes Vertex size in bytes.
 */
Ovoid.Shader.prototype.setVertexAttribPointers = function(vformat, vfbytes) {

  for (var i = 0, b = 0x1, P = 0;
      i < Ovoid.MAX_VERTEX_ATTRIB;
      i++, b <<= 1)
  {
    if (vformat & b) { /* enable vertex attrib */

      if (-1 != this.attribute[i]) {

        this._i.gl.vertexAttribPointer(this.attribute[i],
            this.attrsize[i],
            this._i.gl.FLOAT,
            false,
            vfbytes,
            P);

        this._i.gl.enableVertexAttribArray(this.attribute[i]);
      }

      P += (this.attrsize[i] * 4);

    } else { /* disable vertex attrib */

      if (-1 != this.attribute[i])
        this._i.gl.disableVertexAttribArray(this.attribute[i]);
    }
  }
};


/**
 * Clear out fragment.<br><br>
 * 
 * Clears all wrapped output fragments. (not yet implemented).
 */
Ovoid.Shader.prototype.clearOutFragment = function() {

  for (var i = 0; i < Ovoid.MAX_OUT_FRAGMENT; i++)
    this.outFragment[i] = -1;
};


/**
 * Clear attributes.<br><br>
 * 
 * Clears all wrapped vertex attributes.
 */
Ovoid.Shader.prototype.clearVertexAttribs = function() {

  for (var i = 0; i < Ovoid.MAX_VERTEX_ATTRIB; i++)
    this.attribute[i] = -1;
};


/**
 * Clear uniforms.<br><br>
 * 
 * Clears all wrapped uniforms.
 */
Ovoid.Shader.prototype.clearUniforms = function() {

  for (var i = 0; i < Ovoid.MAX_UNIFORM; i++)
    this.uniform[i] = -1;
};


/**
 * Clear matrix uniforms.<br><br>
 * 
 * Clears all wrapped matrix uniforms.
 */
Ovoid.Shader.prototype.clearUniformMatrices = function() {

  for (var i = 0; i < Ovoid.MAX_UNIFORM_MATRIX; i++)
    this.uniformMatrix[i] = -1;
};


/**
 * Clear sampler uniforms.<br><br>
 * 
 * Clears all wrapped sampler uniforms.
 */
Ovoid.Shader.prototype.clearUniformSamplers = function() {

  for (var i = 0; i < Ovoid.MAX_UNIFORM_SAMPLER; i++)
    this.uniformSampler[i] = -1;
};


/**
 * Clear shader.<br><br>
 * 
 * Clears and resets this instance.
 */
Ovoid.Shader.prototype.clear = function() {

  if (this.verthandle != -1)
  {
    this._i.gl.deleteShader(this.verthandle);
    this.verthandle = -1;
  }

  if (this.fraghandle != -1)
  {
    this._i.gl.deleteShader(this.fraghandle);
    this.fraghandle = -1;
  }

  if (this.proghandle != -1)
  {
    //Ovoid.gl.deletePogram(this.proghandle);
    this.proghandle = -1;
  }

  this.clearVertexAttribs();
  this.clearUniforms();
  this.clearUniformMatrices();
  this.clearUniformSamplers();
};


/**
 * JavaScript Object Notation (JSON) serialization method.<br><br>
 * 
 * This method is commonly used by the <c>Ovoid.Ojson</c> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Shader.prototype.toJSON = function() {
  var o = new Object();
  /* Ovoid.Node */
  o['n'] = this.name;
  o['vs'] = this.vertsource;
  o['fs'] = this.fragsource;
  o['ws'] = this.wrapsource;
  return o;
}
