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
 * @class Drawer Module Class.<br><br>
 * 
 * The Drawer class implements a WebGL rendering engine. This is what
 * is called a Module class because used as core module for the 
 * Ovoid.Instance class. A Module class is a part of Instance class and 
 * can be used only within the Instance class.<br><br>
 * 
 * The Drawer is the main rendering engine of the Instance. It provide
 * many mecanism and public methods to allow experienced and patient 
 * developpers to customize the rendering process and evend create their
 * own <c>Instance.ondraw()</c> or 
 * <c>Instance.waitdraw()</c> method to override the default
 * render method for scene dans wait screen.<br><br>
 * 
 * <b>Drawing Pipelines and Render Layers</b><br><br>
 * 
 * Here, the pipelines term does not refer to the well known "rendering 
 * pipeline" which talks about a very low level program context. The 
 * Drawer provides several way to draw objects using several set of GLSL 
 * shaders according the rendering context (objects, overlays, 
 * particles, etc.) and level of details (vertex lighting, pixel 
 * shading, multitexture, etc.). These several "ways" of draw are 
 * what is called  "drawing pipelines".<br><br>
 * 
 * Each drawing pipeline uses a dedicated GLSL shader program defined 
 * by the traditional couple vertex + fragment shader. The Drawer 
 * currently use up to 15 pieplines to cover all the combinations. 
 * All these pipelines form the drawing process.<br><br>
 * 
 * The currently drawing pipelines are the following ones:<br><br>
 * 
 * <ul>
 * <li><b>ReadPixel Geometry</b><br><br>
 * 
 * Symbolic constant:  Ovoid.PIPE_RP_GEOMETRY<br>
 * Number Id: 20<br>
 * Pipeline for readPixel picking frame geometry draw.
 * </li><br><br>
 * 
 * <li><b>ReadPixel Particle</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_RP_PARTICLE<br>
 * Number Id: 22<br>
 * Pipeline for readPixel picking frame particles draw.
 * </li><br><br>
 * 
 * <li><b>ReadPixel Layer</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_RP_LAYER<br>
 * Number Id: 23<br>
 * Pipeline for readPixel picking frame layer-sprites draw.
 * </li><br><br>
 * 
 * <li><b>ReadPixel String</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_RP_STRING<br>
 * Number Id: 24<br>
 * Pipeline for readPixel picking frame text-strings draw.
 * </li><br><br>
 * 
 * <li><b>Per-pixel 1-light shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L2_GEOMETRY_LP<br>
 * Number Id: 0<br>
 * Pipeline for per-light passes per-pixel lighting shading geometry draw.
 * <br>NOTE: This pipeline is used when opt_renderLopLevel is equal to 2 and 
 * opt_renderPerLightPass is set to true. This pipeline is NEVER used to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-pixel n-lights shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L2_GEOMETRY_1P<br>
 * Number Id: 1<br>
 * Pipeline for monopass per-pixel lighting shading geometry draw. 
 * <br>NOTE: This pipeline is used when opt_renderLopLevel is equal to 2 and 
 * opt_renderPerLightPass is set to false and to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex 1-light shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L1_GEOMETRY_LP<br>
 * Number Id: 10<br>
 * Pipeline for per-light passes per-vertex lighting shading geometry draw.
 * <br>NOTE: This pipeline is used when opt_renderLopLevel is equal to 1 and 
 * opt_renderPerLightPass is set to true. This pipeline is NEVER used to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex n-lights shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L1_GEOMETRY_1P<br>
 * Number Id: 11<br>
 * Pipeline for monopass per-vertex lighting shading geometry draw.
 * <br>NOTE: This pipeline is used when opt_renderLopLevel is equal to 1 and 
 * opt_renderPerLightPass is set to false and to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex 1-light shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L0_GEOMETRY_LP<br>
 * Number Id: 13<br>
 * Pipeline for per-light passes low-end per-vertex lighting shading geometry draw.
 * <br>NOTE: This pipeline is used when opt_renderLopLevel is equal to 0 and 
 * opt_renderPerLightPass is set to true. This pipeline is NEVER used to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex n-lights shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L0_GEOMETRY_1P<br>
 * Number Id: 14<br>
 * Pipeline for monopass low-end per-vertex lighting shading geometry draw. 
 * <br>NOTE: This pipeline is used when opt_renderLopLevel is equal to 0 and 
 * opt_renderPerLightPass is set to false and to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Particles</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_PARTICLE<br>
 * Number Id: 2<br>
 * Pipeline for point-sprite particles draw. 
 * </li><br><br>
 * 
 * <li><b>Layers</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_LAYER<br>
 * Number Id: 3<br>
 * Pipeline for layer-sprites draw. 
 * </li><br><br>
 * 
 * <li><b>Strings</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_STRING<br>
 * Number Id: 4<br>
 * Pipeline for text-string draw. 
 * </li><br><br>
 * 
 * <li><b>Helpers</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_HELPER<br>
 * Number Id: 5<br>
 * Pipeline for helpers-items draw. 
 * </li><br><br>
 * 
 * <li><b>Shadow volumes</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_SHADOW_VOLUME<br><br>
 * Number Id: 6<br><br>
 * Pipeline for shadow volumes draw. 
 * </li>
 * 
 * <li><b>Billboard particles</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_BILLBOARD<br><br>
 * Number Id: 7<br><br>
 * Pipeline for billboard/sprite particles draw. 
 * </li>
 * 
 * <li><b>Per-light pass fog</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_FOG_LP<br><br>
 * Number Id: 8<br><br>
 * Pipeline for fog draw in per-light pass mode.
 * </li>
 * </ul><br><br>
 * 
 * A render layer is an abstract set of pipelines who form a drawing 
 * process. This means that, by default, the Drawer uses ONE layer 
 * which is the default set of pipelines's shaders. BUT, you can define 
 * and use several layers to render several selected object via one 
 * particular layer. You can define the render layer of an object, so it 
 * will be rendered using this render layer. Render layers are rendered 
 * in order, from 0 to Ovoid.MAX_RENDER_LAYER (up to 8 by default) like 
 * in any layered process.<br><br>
 * 
 * This mecanism allow to create a complex rendering process with 
 * custom GLSL shaders dedicated to several object of your scene. 
 * For example, if you want to render an object with a special mirror 
 * shader, and another with a special lighting processing, you can 
 * define two new layers, set your custom shaders in the proper 
 * pipelines for these layers, then affect objects to the desired 
 * render layer.<br><br>
 * 
 * Render layer process currently works only with geometry pipelines, 
 * this mean you can only set render layers for Mesh nodes rendered 
 * during the scene rendering. Supported pipelines for render Layer 
 * are the following:
 * <ul>
 * <li>Ovoid.PIPE_L2_GEOMETRY_LP</li>
 * <li>Ovoid.PIPE_L2_GEOMETRY_1P</li>
 * <li>Ovoid.PIPE_L1_GEOMETRY_LP</li>
 * <li>Ovoid.PIPE_L1_GEOMETRY_1P</li>
 * <li>Ovoid.PIPE_L0_GEOMETRY_LP</li>
 * <li>Ovoid.PIPE_L0_GEOMETRY_1P</li>
 * </ul>
 * 
 * Here is some example to show how to use render Layers, pipelines, and
 * user defined GLSL shaders. (For more details about creating custom
 * shaders, see the <a href="Ovoid.Shader.html">Ovoid.Shader</a> reference
 * documentation)<br><br>
 * 
 * Adding and plug shader by including them to loading stacks:<br>
 * <blockcode>
 * var Instance = Ovoid.newInstance("myOvoid", "myCanvas", cfg);<br>
 * if(Instance) {<br>
 * &nbsp;&nbsp;<cc>// Load custom shaders and plug them to specified layers and pipelines</cc><br>
 * &nbsp;&nbsp;<cc>// (-1 means assign to all layers)</cc><br>
 * &nbsp;&nbsp;Instance.includeShader("My_Shader_for_L2_LP", "land.vs", "land_1l.fs", null, Ovoid.PIPE_L2_GEOMETRY_LP, -1);<br>
 * &nbsp;&nbsp;Instance.includeShader("My_Shader_for_L2_1P", "land.vs", "land_nl.fs", null, Ovoid.PIPE_L2_GEOMETRY_1P, -1);<br>
 * &nbsp;&nbsp;<cc>// Start Instance</cc><br>
 * &nbsp;&nbsp;Instance.start();<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * Adding and plug shader manually:<br>
 * <blockcode>
 * <cc>// Create a new Shader object</cc><br>
 * var sp = Instance.newShader("MyNewShader");<br>
 * <cc>// Load sources synchronous way and compile</cc><br>
 * sp.loadSource("snow.vs", "snow.fs", "snow.wm", false);<br>
 * <cc>// Add the Shader to the Drawer's stock</cc><br>
 * if( Instance.Drawer.addShader(sp) != -1) {<br>
 * &nbsp;&nbsp;<cc>// plug Shader to all layers of the particle pipeline</cc><br>
 * &nbsp;&nbsp;Instance.Drawer.plugShader("MyNewShader", Ovoid.DRAWER_SP_PARTICLES, -1);<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * adding and plug shaders to specific render layers:<br>
 * <blockcode>
 * <cc>// Define all landscape body at Render Layer 0</cc><br>
 * for(var i = 0; i < landscapes.length; i++)<br>
 * &nbsp;&nbsp;landscapes[i].renderLayer = 0;<br>
 * <cc>// Define all trees body at Render Layer 1</cc><br>
 * for(var i = 0; i < trees.length; i++)<br>
 * &nbsp;&nbsp;trees[i].renderLayer = 1;<br>
 * <br>
 * <cc>// Load custom shader for landscape and assing it to layer 0</cc><br>
 * var Slandscape = Instance.Drawer.addShader("land.vs", "land.fs", "custom.wm");<br>
 * if( Slandscape == -1) {<br>
 * &nbsp;&nbsp;<cc>// error</cc><br>
 * }<br>
 * Instance.Drawer.plugShader(Slandscape, Ovoid.PIPE_L2_GEOMETRY_LP, 0);<br>
 * Instance.Drawer.plugShader(Slandscape, Ovoid.PIPE_L1_GEOMETRY_LP, 0);<br>
 * Instance.Drawer.plugShader(Slandscape, Ovoid.PIPE_L0_GEOMETRY_LP, 0);<br>
 * <br>
 * <cc>// Load custom shader for trees and assing it to layer 1 (with 'null' wrapmap source to use default)</cc><br>
 * var Strees = Instance.Drawer.addShader("tree.vs", "tree.fs", null);<br>
 * if( Strees == -1) {<br>
 * &nbsp;&nbsp;<cc>// error</cc><br>
 * }<br>
 * Instance.Drawer.plugShader(Ovoid.PIPE_L2_GEOMETRY_LP, 1, Strees);<br>
 * Instance.Drawer.plugShader(Ovoid.PIPE_L1_GEOMETRY_LP, 1, Strees);<br>
 * Instance.Drawer.plugShader(Ovoid.PIPE_L0_GEOMETRY_LP, 1, Strees);<br>
 * </blockcode><br><br>
 * 
 * <b>Pass-drawing technics</b><br><br>
 * 
 * The Drawer implement two pass-drawing technics:
 * <ul>
 * <li>Monopass</li> This is the simplest render technic, use one pass
 * to draw all the scene with lights data addition during sahder process.
 * <li>Per-light passes</li> Use one pass per light in the scene to 
 * render the scene. The scene is drawn several times to add lighting 
 * one by one to produce a final composite of all lighting. This 
 * technic must be enabled to render shadow volums.
 * </ul><br><br>
 * 
 * As previously detailed, each technic uses a specific pipeline 
 * (*_1P for monopass and *_LP for per-light passes).<br><br>
 * 
 * To enable or disable the per-light pass technic you have to set the 
 * <c>Instance.opt_renderPerLightPass</c> option to 
 * <c>true</c> or <c>false</c>.<br><br>
 * 
 * <b>Solid and alpha/fx objects</b><br><br>
 * 
 * Transparent objects should not be drawn like solid/opaque objets. 
 * This is why transparent objets are drawn in a speratate stage from a 
 * specific  queue (see Ovoid.Queuer for more details). The pipeline 
 * used to draw transparent objects are ALLWAYS the "monopasse" pipeline 
 * (*_1P) even if the <c>Instance.opt_renderPerLightPass</c> option 
 * is set to true.<br><br>
 * 
 * <b>Level of performance</b><br><br>
 * 
 * The level of performance is typically a graphic quality level option. 
 * There is up to three level of performance with dedicated drawing 
 * pipelines. The level of performance can be fixed or adaptive. 
 * Adaptive level of performance is enabled through the 
 * <c>Instance.opt_renderAdaptLop</c> option. To set a fixed level 
 * of performance uses the <c>Instance.opt_renderLopLevel</c> 
 * option.<br><br>
 * 
 * <b>Custom Shaders</b><br><br>
 * 
 * The Drawer class implements ways and methodes to use several 
 * custom shaders and switch between them during the runtime.<br><br>
 * 
 * To use custom shaders you have to add them to the drawer's 
 * stock using  the <c>Drawer.addShader()</c> method who returns 
 * an index identifier of the added shaders. (The shader must be 
 * successfully linked and wrapped)<br><br>
 * 
 * Once shaders are in the Drawer stock, you can plug it to the desired 
 * pipeline of a render layer using the <c>Drawer.plugShader()</c>
 * method. This takes effect immediately.<br><br>
 * 
 * <b>Picking modes</b><br><br>
 * 
 * To able to interact with the mouse on the rendered objects on the 
 * screen, the Drawer must create some mecanism of pixel recongnition 
 * and objects references. This mecanism uses an hidden frame rendered 
 * offscreen with a special coloring technics. This extra offscreen 
 * rendering can be both useless (if you don't use mouse interaction) 
 * and produce a performance hit. This is why you can disable it, or 
 * use a selective render picking mode: Geometry world objects 
 * (Ovoid.RP_WORLD), Overlay objects (Ovoid.RP_OVERLAY), or both.<br><br>
 * 
 * You can define the render picking mode by setting the 
 * <c>Instance.opt_renderPickingMode</c> option. To 0 to disable, 
 * or with a combination of Ovoid.RP_WORLD and Ovoid.RP_OVERLAY 
 * symbolic constants.<br><br>
 * 
 * <blockcode>
 * <cc>// Enable picking for both world and overlay objects</cc><br>
 * Instance.opt_renderPickingMode = Ovoid.RP_WORLD|Ovoid.RP_OVERLAY;<br>
 * </blockcode><br><br>
 * 
 * @param {object} i Instance object to register object to.
 * 
 */
Ovoid.Drawer = function(i) {
  
  /** Instance parent */
  this._i = i;
  

  /** WebGL rendrer informations **/
  this.glInfo = {};


  /** Drawn mesh polyset count since the last begin draw. */
  this._drawnpolyset = 0;


  /** Drawn dynamic buffer count since the last begin draw. */
  this._drawndynamic = 0;


  /** Drawn sprite buffer count since the last begin draw. */
  this._drawnsprite = 0;


  /** Drawn symbolic buffer count since the last begin draw. */
  this._drawnsymbolic = 0;


  /** Drawn character string count since the last begin draw. */
  this._drawnchar = 0;


  /** Drawn particle count since the last begin draw. */
  this._drawnparticle = 0;


  /** Drawn shadow volume count since the last begin draw. */
  this._drawnshadow = 0;


  /** Render passes count since the last begin draw. */
  this._renderpasses = 0;


  /** Theme colors **/
  this._tcolor = Ovoid.Color.newArray(12);
  /* white */
  this._tcolor[0].set(1.0,1.0,1.0,1.0);
  /* black */
  this._tcolor[1].set(0.0,0.0,0.0,1.0);
  /* grey */
  this._tcolor[2].set(0.5,0.5,0.5,1.0);
  /* red */
  this._tcolor[3].set(1.0,0.0,0.0,1.0);
  /* orange */
  this._tcolor[4].set(1.0,0.5,0.0,1.0);
  /* yellow */
  this._tcolor[5].set(1.0,1.0,0.0,1.0);
  /* light-green */
  this._tcolor[6].set(0.5,1.0,0.5,1.0);
  /* green */
  this._tcolor[7].set(0.0,1.0,0.0,1.0);
  /* cyan */
  this._tcolor[8].set(0.3,0.6,1.0,1.0);
  /* blue */
  this._tcolor[9].set(0.0,0.0,1.0,1.0);
  /* indigo */
  this._tcolor[10].set(0.5,0.0,1.0,1.0);
  /* magenta */
  this._tcolor[11].set(1.0,0.0,1.0,1.0);

  /** Default blank material **/
  this._mblank = null;


  /** Default blank texture **/
  this._tblank = null;


  /** Default font mapping texture **/
  this._tfontm = null;


  /** Primitives buffer handles array **/
  this._bprimitive = null;


  /** Dynamic temporary buffer handle **/
  this._bdynamic = null;


  /** Picking frame buffer handle **/
  this._fbrpixel = null;


  /** Shader program stock **/
  this._splib = new Array();


  /** Shader program pipes **/
  this._sppipe = new Array(Ovoid.MAX_RENDER_LAYER);


  /** Current used shader program **/
  this.sp = null;


  /** Pipe swapper **/
  this._swpipe = new Array(2);


  /** Layer swapper **/
  this._swlayer = new Array(2);


  /** Shader swapper **/
  this._swshader = new Array(2);


  /** Blend swapper **/
  this._swblend = new Array(2);


  /** Depth swapper **/
  this._swdepth = new Array(2);


  /** Internal ambiant color **/
  this._abcolor = new Float32Array(4);


  /** Internal fog color **/
  this._fogcolor = new Float32Array(4);


  /** Picking readed pixel buffer. */
  this._rpcolor = new Uint8Array(256);


  /** Picking readed pixel depth. */
  this._rpdepth = new Float32Array(1);


  /** Temp buffer for shadow volum vertices : 100 000 faces max. */
  this._dV = new Float32Array(1200000);
  
  /** Temp buffers for light array */
  this._lp = new Float32Array(4*Ovoid.MAX_LIGHT_BY_DRAW);
  this._ld = new Float32Array(3*Ovoid.MAX_LIGHT_BY_DRAW);
  this._lc = new Float32Array(4*Ovoid.MAX_LIGHT_BY_DRAW);
  this._li = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);
  this._lr = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);
  this._lf = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);
  this._la = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);
  this._le = new Int32Array(Ovoid.MAX_LIGHT_BY_DRAW);
    
  /** Temp matrix 4x4 */
  this._tM = new Float32Array(16);
  
  /** Matrix 4x4 identity pattern */
  this._tMi = new Float32Array(16);
    
  /** Level of performance for geometry drawing. */
  this._lop = 2;
  
  
  /** Level of performance private framerate. */
  this._lopfps = 0;
  
  
  /** Current used pipe for light-pass geometry render. */
  this._pipeLp = 0;
  
  
  /** Current used pipe for monopass geometry render. */
  this._pipe1p = 1;
  
  
  /** Level of performance for geometry drawing. */
  this.gl = null;
  
};

/**
 * Drawer initialization.<br><br>
 * 
 * Global initialization method. This methode is called once during the library 
 * main initalization. It shouldn't be called a second time.
 * 
 * @see Ovoid.init
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Drawer.prototype._init = function() {
  
  this.gl = this._i.gl;
  
  var i;
    
  this._i._clearGlerror();
  
  /* performance counter */
  var t = (new Date().getTime());
  
  /* recupere les informations du renderer */
  this.glInfo.VENDOR = this.gl.getParameter(this.gl.VENDOR);
  Ovoid._log(3, this._i, '.Drawer._init', ' VENDOR : ' + this.glInfo.VENDOR);
  this.glInfo.VERSION = this.gl.getParameter(this.gl.VERSION);
  Ovoid._log(3, this._i, '.Drawer._init', ' VERSION : ' + this.glInfo.VERSION);
  this.glInfo.SHADING_LANGUAGE_VERSION = this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION);
  Ovoid._log(3, this._i, '.Drawer._init', ' SHADING_LANGUAGE_VERSION : ' + this.glInfo.SHADING_LANGUAGE_VERSION);
  this.glInfo.MAX_TEXTURE_IMAGE_UNITS = this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS);
  Ovoid._log(3, this._i, '.Drawer._init', ' MAX_TEXTURE_IMAGE_UNITS : ' + this.glInfo.MAX_TEXTURE_IMAGE_UNITS);
  this.glInfo.MAX_COMBINED_TEXTURE_IMAGE_UNITS = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  Ovoid._log(3, this._i, '.Drawer._init', ' MAX_COMBINED_TEXTURE_IMAGE_UNITS : ' + this.glInfo.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  this.glInfo.MAX_VARYING_VECTORS = this.gl.getParameter(this.gl.MAX_VARYING_VECTORS);
  Ovoid._log(3, this._i, '.Drawer._init', ' MAX_VARYING_VECTORS : ' + this.glInfo.MAX_VARYING_VECTORS);
  this.glInfo.MAX_VERTEX_ATTRIBS = this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS);
  Ovoid._log(3, this._i, '.Drawer._init', ' MAX_VERTEX_ATTRIBS : ' + this.glInfo.MAX_VERTEX_ATTRIBS);
  this.glInfo.MAX_VERTEX_UNIFORM_VECTORS = this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS);
  Ovoid._log(3, this._i, '.Drawer._init', ' MAX_VERTEX_UNIFORM_VECTORS : ' + this.glInfo.MAX_VERTEX_UNIFORM_VECTORS);
  this.glInfo.MAX_FRAGMENT_UNIFORM_VECTORS = this.gl.getParameter(this.gl.MAX_FRAGMENT_UNIFORM_VECTORS);
  Ovoid._log(3, this._i, '.Drawer._init', ' MAX_FRAGMENT_UNIFORM_VECTORS : ' + this.glInfo.MAX_FRAGMENT_UNIFORM_VECTORS);
  this.glInfo.MAX_VERTEX_TEXTURE_IMAGE_UNITS = this.gl.getParameter(this.gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  Ovoid._log(3, this._i, '.Drawer._init', ' MAX_VERTEX_TEXTURE_IMAGE_UNITS : ' + this.glInfo.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  
  /* toutes les textures flip en Y */
  this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
  
  /* Nouvelle texture blank */
  this._tblank = new Ovoid.Texture("Drawer.blank_texture", this._i);
  var px = new Uint8Array(256); /* (8 * 8 * RGBA) */
  for (i = 0; i < 256; i++) px[i] = 255;
  if(!this._tblank.create2dFromRaw(this.gl.RGBA, 8, 8, px))
    return false;
  
  /* fontmap par defaut */
  if(Ovoid._curBrower == "firefox") {
    var sy = 9; // shift y
  } else {
    var sy = 8; // shift y
  }
  var im = Ovoid.genFontmap(256,16,7,sy,Ovoid.DEFAULT_FONT_MAP);
  this._tfontm = new Ovoid.Texture("Drawer.defaut_fontmap", this._i);
  if(!this._tfontm.create2dFromImg(this.gl.RGBA, im)) {
    return false;
  }
  
  /* material blank */
  this._mblank = new Ovoid.Material("blank", this._i);

  /* Cree les buffers de primitives */
  var buffdata;
  this._bprimitive = new Array(6);
  
  /* Sprite triangle */ 
  buffdata = [0.0,0.0,0.0,1.0,0.0,1.0,0.0, 0.0,1.0,0.0,1.0,0.0,0.0,0.0,
            1.0,1.0,0.0,1.0,1.0,0.0,0.0, 0.0,0.0,0.0,1.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,1.0,0.0,0.0, 1.0,0.0,0.0,1.0,1.0,1.0,0.0];
            
  this._bprimitive[0] = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892, this._bprimitive[0]);
  this.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
  
  /* Billboard (triangle-strip) */ 
  buffdata = [-0.5,-0.5,0.0,0.0,0.0,1.0,0.0, -0.5,0.5,0.0,0.0,0.0,0.0,0.0,
            0.5,-0.5,0.0,0.0,1.0,1.0,0.0, 0.5,0.5,0.0,0.0,1.0,0.0,0.0];
            
  this._bprimitive[6] = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892, this._bprimitive[6]);
  this.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
  
  /* Symoblic box */
  buffdata = [0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0, -0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0, 
    -0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0, -0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 
    0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0, -0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 
    0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0, 0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 
     0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0, 
    -0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 
     0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 
     0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0, 0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 
     0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0, 0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0, 
     -0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0, 
     0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0, 
    -0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0];
    
  this._bprimitive[1] = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892,this._bprimitive[1]);
  this.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
  
  /* Symbolic sphere */
  buffdata = Ovoid.Vertex.newArray(24 * 3 * 2);

  var sd = 24.0;
  var sinI, cosI, sinII, cosII;

  var ix, iy, iz;

  var j = 0;
  for (i = 0; i < 24 * 2; i += 2)
  {
    sinI = Math.sin((Ovoid._2PI) * (j / sd));
    cosI = Math.cos((Ovoid._2PI) * (j / sd));
    sinII = Math.sin((Ovoid._2PI) * ((j + 1) / sd));
    cosII = Math.cos((Ovoid._2PI) * ((j + 1) / sd));

    ix = i;
    iy = ix + (24 * 2);
    iz = iy + (24 * 2);

    buffdata[ix].p.set(cosI, 0.0, sinI, 1.0);
    buffdata[ix + 1].p.set(cosII, 0.0, sinII, 1.0);
    buffdata[iy].p.set(cosI, sinI, 0.0, 1.0);
    buffdata[iy + 1].p.set(cosII, sinII, 0.0, 1.0);
    buffdata[iz].p.set(0.0, cosI, sinI, 1.0);
    buffdata[iz + 1].p.set(0.0, cosII, sinII, 1.0);

    buffdata[ix].c.set(1.0, 1.0, 1.0, 1.0);
    buffdata[ix + 1].c.set(1.0, 1.0, 1.0, 1.0);
    buffdata[iy].c.set(1.0, 1.0, 1.0, 1.0);
    buffdata[iy + 1].c.set(1.0, 1.0, 1.0, 1.0);
    buffdata[iz].c.set(1.0, 1.0, 1.0, 1.0);
    buffdata[iz + 1].c.set(1.0, 1.0, 1.0, 1.0);

    j++;
  }
  
  this._bprimitive[2] = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892, this._bprimitive[2]);
  this.gl.bufferData(0x8892,
      Ovoid.Vertex.bufferize(Ovoid.VERTEX_VEC4_P|Ovoid.VERTEX_VEC4_C,buffdata),
      0x88E4);
  
  /* Tricolor axis */
  buffdata = [0.0,0.0,0.0,1.0,1.0,0.0,0.0,1.0, 0.25,0.0,0.0,1.0,1.0,0.0,0.0,1.0, 
     0.0,0.0,0.0,1.0,0.0,1.0,0.0,1.0, 0.0,0.25,0.0,1.0,0.0,1.0,0.0,1.0, 
     0.0,0.0,0.0,1.0,0.0,0.0,1.0,1.0, 0.0,0.0,0.25,1.0,0.0,0.0,1.0,1.0];
  
  this._bprimitive[3] = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892, this._bprimitive[3]);
  this.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);

  /* Symbolic pyramid */
  buffdata = [0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, 0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, -0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, 0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, -0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    -0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    -0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0];
  
  this._bprimitive[4] = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892, this._bprimitive[4]);
  this.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
    
  /* Symbolic star */
  buffdata = [0.25,0.0,0.0,1.0,1.0,1.0,1.0,1.0, -0.25,0.0,0.0,1.0,1.0,1.0,1.0,1.0, 
  0.0,0.25,0.0,1.0,1.0,1.0,1.0,1.0, 0.0,-0.25,0.0,1.0,1.0,1.0,1.0,1.0, 
  0.0,0.0,0.25,1.0,1.0,1.0,1.0,1.0, 0.0,0.0,-1.0,1.0,1.0,1.0,1.0,1.0, 
  0.125,0.125,0.125,1.0,1.0,1.0,1.0,1.0, -0.125,-0.125,-0.125,1.0,1.0,1.0,1.0,1.0, 
  -0.125,0.125,0.125,1.0,1.0,1.0,1.0,1.0, 0.125,-0.125,-0.125,1.0,1.0,1.0,1.0,1.0];
  
  this._bprimitive[5] = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892, this._bprimitive[5]);
  this.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);

  if (this._i._logGlerror('.Drawer._init:: Primitive buffer creation'))
    return false;
    
  /* Cree le buffer dynamique temporaire */  
  this._bdynamic = this.gl.createBuffer();
  this.gl.bindBuffer(0x8892, this._bdynamic);
  // 4 800 000 octect = 100 000 faces
  this.gl.bufferData(0x8892,4800000,0x88E8); // DYNAMIC_DRAW
  
  if (this._i._logGlerror('.Drawer._init:: Dynamic buffer creation'))
    return false;
    
  /* unbind les buffers */
  this.gl.bindBuffer(0x8892, null);
  this.gl.bindBuffer(0x8893, null);
  
  /* Creation du frame buffer pour le picking */
  
  /* Frame buffer render texture */
  var x = Ovoid.PICKING_OFFSCREEN_FRAME_X;
  var y = Ovoid.PICKING_OFFSCREEN_FRAME_Y;
  var rdrtex = this.gl.createTexture();
  this.gl.bindTexture(0x0DE1, rdrtex);
  this.gl.texImage2D(0x0DE1,0,0x1908,x,y,0,0x1908,0x1401,null);
  
  this.gl.bindTexture(0x0DE1, null);
  
  /* Frame buffer render buffer */
  var rdrbuf = this.gl.createRenderbuffer();
  this.gl.bindRenderbuffer(0x8D41, rdrbuf);
  this.gl.renderbufferStorage(0x8D41,0x81A5,x,y);
      
  this.gl.bindRenderbuffer(0x8D41, null);
  
  /* Frame buffer */
  this._fbrpixel = this.gl.createFramebuffer();
  this.gl.bindFramebuffer(0x8D40, this._fbrpixel);
  this.gl.framebufferTexture2D(0x8D40,0x8CE0,0x0DE1,rdrtex,0);
  this.gl.framebufferRenderbuffer(0x8D40,0x8D00,0x8D41,rdrbuf);
      
  this.gl.bindFramebuffer(0x8D40, null);

  if (this._i._logGlerror('.Drawer._init:: RP Frame buffer creation'))
    return false;

  /* Construit le tableau de pipeline */
  for(i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    this._sppipe[i] = new Array();
  }
  /* Ajout des shaders par défaut */
  var sp;

  /*   pipeline (vp, sp)                                // Symbolic constant = id;
   * ------------------------------------------------------------------------------------
   * - picking geometrie (p, c)                          // Ovoid.PIPE_RP_GEOMETRY = 20;
   * - picking particles (pu_particle, c)                // Ovoid.PIPE_RP_PARTICLE = 22;
   * - picking layer (p, c)                              // Ovoid.PIPE_RP_LAYER = 23;
   * - picking string (p_zstring, c)                     // Ovoid.PIPE_RP_STRING = 24;
   * - picking billboard (p_billboard, c)                // Ovoid.PIPE_RP_BILLBOARD = 27;
   * - pixel-light per-light geometrie (...)             // Ovoid.PIPE_L2_GEOMETRY_LP = 0;
   * - pixel-light one pass geometrie (...)              // Ovoid.PIPE_L2_GEOMETRY_1P = 1;
   * - vertex-light per-light geometrie (...)            // Ovoid.PIPE_L1_GEOMETRY_LP = 10;
   * - vertex-light one pass geometrie (...)             // Ovoid.PIPE_L1_GEOMETRY_1P = 11;
   * - Low-end vertex-light per-light geometrie (...)    // Ovoid.PIPE_L0_GEOMETRY_LP = 13;
   * - Low-end vertex-light one pass geometrie (...)     // Ovoid.PIPE_L0_GEOMETRY_1P = 14;
   * - particles (puc_particle, vc_tex_particle);        // Ovoid.PIPE_PARTICLE = 2;
   * - layer (pu, c_tex);                                // Ovoid.PIPE_LAYER = 3;
   * - string (p_zwstring, c_tex_string)                 // Ovoid.PIPE_STRING = 4;
   * - helpers (pc, vcc);                                // Ovoid.PIPE_HELPER = 5;
   * - shadow volumes (p, black)                         // Ovoid.PIPE_SHADOW_VOLUME = 6;
   * - billboard sprites (pu_billboard,c_tex_billboard)  // Ovoid.PIPE_BILLBOARD = 7;
   * - light-pass fog (... , ...)                        // Ovoid.PIPE_FOG_LP = 8;
  */

  

  sp = new Ovoid.Shader("PIPE_L2_GEOMETRY_LP", this._i);
  if(!sp.setSources(Ovoid.GLSL_PNUIW_HYBRID_VS, Ovoid.GLSL_AERDS_FULLTEX_LP_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_L2_GEOMETRY_LP pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),0,-1);
  
  sp = new Ovoid.Shader("PIPE_L2_GEOMETRY_1P", this._i);
  if(!sp.setSources(Ovoid.GLSL_PNUIW_HYBRID_VS, Ovoid.GLSL_AERDS_FULLTEX_1P_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_L2_GEOMETRY_1P pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),1,-1);

  sp = new Ovoid.Shader("PIPE_L1_GEOMETRY_LP", this._i);
  if(!sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_LP_VS, Ovoid.GLSL_VL_AERDS_FULLTEX_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_L1_GEOMETRY_LP pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),10,-1);
  
  sp = new Ovoid.Shader("PIPE_L1_GEOMETRY_1P", this._i);
  if(!sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_1P_VS, Ovoid.GLSL_VL_AERDS_FULLTEX_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_L1_GEOMETRY_1P pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),11,-1);
  
  sp = new Ovoid.Shader("PIPE_L0_GEOMETRY_LP", this._i);
  if(!sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_LP_VS, Ovoid.GLSL_VL_ADS_1TEX_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_L0_GEOMETRY_LP pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),13,-1);
  
  sp = new Ovoid.Shader("PIPE_L0_GEOMETRY_1P", this._i);
  if(!sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_1P_VS, Ovoid.GLSL_VL_ADS_1TEX_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_L0_GEOMETRY_1P pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),14,-1);
  
  sp = new Ovoid.Shader("PIPE_PARTICLE", this._i);
  if(!sp.setSources(Ovoid.GLSL_PUC_PARTICLE_VS, Ovoid.GLSL_VC_TEX_PARTICLE_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_PARTICLE pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),2,-1);

  sp = new Ovoid.Shader("PIPE_LAYER", this._i);
  if(!sp.setSources(Ovoid.GLSL_PU_VS, Ovoid.GLSL_C_TEX_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_LAYER pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),3,-1);
  
  sp = new Ovoid.Shader("PIPE_STRING", this._i);
  if(!sp.setSources(Ovoid.GLSL_P_ZWSRING_VS, Ovoid.GLSL_C_TEX_STRING_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_STRING pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),4,-1);
  
  sp = new Ovoid.Shader("PIPE_HELPER", this._i);
  if(!sp.setSources(Ovoid.GLSL_PC_VS, Ovoid.GLSL_VCC_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_HELPER pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),5,-1);
  
  sp = new Ovoid.Shader("PIPE_SHADOW_VOLUME", this._i);
  if(!sp.setSources(Ovoid.GLSL_P_VS, Ovoid.GLSL_BLACK_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_SHADOW_VOLUME pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),6,-1);
  
  sp = new Ovoid.Shader("PIPE_BILLBOARD", this._i);
  if(!sp.setSources(Ovoid.GLSL_PU_BILLBOARD_VS, Ovoid.GLSL_C_TEX_BILLBOARD_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_BILLBOARD pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),7,-1);
  
  sp = new Ovoid.Shader("PIPE_FOG_LP", this._i);
  if(!sp.setSources(Ovoid.GLSL_PIW_HYBRID_VS, Ovoid.GLSL_FOG_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_FOG_LP pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),8,-1);
  
  sp = new Ovoid.Shader("PIPE_RP_GEOMETRY", this._i);
  if(!sp.setSources(Ovoid.GLSL_PIW_HYBRID_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_RP_GEOMETRY pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),20,-1);
  
  sp = new Ovoid.Shader("PIPE_RP_PARTICLE", this._i);
  if(!sp.setSources(Ovoid.GLSL_PU_PARTICLE_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_RP_PARTICLE pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),22,-1);
 
  sp = new Ovoid.Shader("PIPE_RP_LAYER", this._i);
  if(!sp.setSources(Ovoid.GLSL_P_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_RP_LAYER pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),23,-1);
  
  sp = new Ovoid.Shader("PIPE_RP_STRING", this._i);
  if(!sp.setSources(Ovoid.GLSL_P_ZSRING_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_RP_STRING pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),24,-1);
  
  sp = new Ovoid.Shader("PIPE_RP_BILLBOARD", this._i);
  if(!sp.setSources(Ovoid.GLSL_PU_BILLBOARD_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP)) {
    Ovoid._log(1, this._i, '.Drawer._init', " error wrapping default PIPE_RP_BILLBOARD pipeline shader program.");
    return false;
  }
  this.plugShader(this.addShader(sp),27,-1);
  
  
  if (this._i._logGlerror('.Drawer._init:: Shader program creation.'))
    return false;
    
  /* Initialization des parameteres WebGL par defaut */
  this.gl.viewport(0, 0, this._i.Frame.size.v[0], this._i.Frame.size.v[1]);
  this.gl.clear(0x4000|0x100); /* COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT*/
  
  // Blend soustractif 
  this.gl.enable(0x0BE2); // BLEND
  this.gl.blendFunc(0x0302, 0x0303); // SRC_ALPHA, ONE_MINUS_SRC_ALPHA
  /* geometrie */
  this.gl.lineWidth(1.0);
  /* face culling par defaut */
  this.gl.disable(0x0B44); // CULL_FACE
  this.gl.cullFace(0x0405); // BACK
  /* Cconfiguration depth par defaut */
  this.gl.depthMask(1);
  this.gl.enable(0x0B71); // DEPTH_TEST
  this.gl.depthFunc(0x0201); // LESS
  /* configuration du stencil */
  this.gl.disable(0x0B90); /* STENCIL_TEST */ 
  
  if (this._i._logGlerror('Drawer._init:: Default settings'))
    return false;
  
  Ovoid._log(3, this._i, '.Drawer._init', ' done in: ' + 
      ((new Date().getTime() - t) * 0.001) + 's');

  return true;
}

/* **************************** PIPELINE METHODS **************************** */

/**
 * Add a shader to shader stock.<br><br>
 * 
 * Adds the specified Shader object into the shader stock and returns stock 
 * index identifier.
 * 
 * @param {string} sp Shader program object to be added.
 * 
 * @return {int} Shader index or -1 if shader is not complited/wrapped.
 */
Ovoid.Drawer.prototype.addShader = function(sp) {
  
  if ( !sp.linkStatus ) {
    Ovoid._log(2, this._i, '.Drawer.addShader', " adding shader '" + 
      sp.name + "' fail, shader is not linked");
    return -1;
  }
  var i = this._splib.length;
  this._splib.push(sp);
  Ovoid._log(3, this._i, '.Drawer.addShader', " adding shader '" + 
     sp.name + "' in stock with id:" + i);
  return i;
};


/**
 * Plug a shader to drawing pipeline.<br><br>
 * 
 * Plugs the specified shader to the desired drawing pipeline slot 
 * and layer. The Shader must exists in the Drawer's shader stock.
 * 
 * @param {int|string} id Shader index or Shader's symbolic name to 
 * be pluged.
 * 
 * @param {int} pipe Symbolic constant for drawing pipeline. Can be one of the 
 * following ones or corresponding number:
 * Ovoid.PIPE_RP_GEOMETRY (20),<br>
 * Ovoid.PIPE_RP_PARTICLE (22),<br>
 * Ovoid.PIPE_RP_LAYER (23),<br>
 * Ovoid.PIPE_RP_STRING (24),<br>
 * Ovoid.PIPE_RP_BILLBOARD (27),<br>
 * Ovoid.PIPE_L2_GEOMETRY_LP (0),<br>
 * Ovoid.PIPE_L2_GEOMETRY_1P (1),<br>
 * Ovoid.PIPE_L1_GEOMETRY_LP (10),<br>
 * Ovoid.PIPE_L1_GEOMETRY_1P (11),<br>
 * Ovoid.PIPE_L0_GEOMETRY_LP (13),<br>
 * Ovoid.PIPE_L0_GEOMETRY_1P (14),<br>
 * Ovoid.PIPE_PARTICLE (2),<br>
 * Ovoid.PIPE_LAYER (3),<br>
 * Ovoid.PIPE_STRING (4),<br>
 * Ovoid.PIPE_HELPER (5),<br>
 * Ovoid.PIPE_SHADOW_VOLUME (6),<br>
 * Ovoid.PIPE_BILLBOARD (7)<br><br>
 * 
 * @param {int} layer Render/Drawing layer to assing the shader to. Can be an
 * integer up to Ovoid.MAX_RENDER_LAYER or -1 to assing to all available 
 * layers. 
 * 
 * @return {bool} True if plug succeeds, false if id is not a valid index.
 */
Ovoid.Drawer.prototype.plugShader = function(id, pipe, layer) {
  
  if(layer > Ovoid.MAX_RENDER_LAYER) {
    Ovoid._log(2, this._i, ".Drawer.plugShader", " invalid layer index");
    return false;
  }
  if(typeof(id) == "number") {
    if(!this._splib[id]) {
      Ovoid._log(2, this._i, ".Drawer.plugShader", " no such shader with id " + id);
      return false;
    }
  } else if (typeof(id) == 'string') {
    var f = -1;
    for(var i = 0; i < this._splib.length; i++) {
      if(this._splib[i].name == id) {
        f = i;
        break;
      }
    }
    if(f < 0.0) {
      Ovoid._log(2, this._i, ".Drawer.plugShader", " no such shader with name " + id);
      return false;
    }
    id = f;
  }
  
  if(layer == -1) {
    Ovoid._log(3, this._i, ".Drawer.plugShader", 
        " plug shader "+id+" to pipe "+pipe+" for all layers");
    for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
      this._sppipe[i][pipe] = id;
    }
  } else {
    Ovoid._log(3, this._i, ".Drawer.plugShader", 
        " plug shader "+id+" to pipe "+pipe+" for layer "+layer);
    this._sppipe[layer][pipe] = id;
  }
  return true;
};

/* ****************** DRAWING CONTEXT PARAMETERS METHODS ******************** */
/**
 * Switch shader program.<br><br>
 * 
 * Switch the current shader program to the specified one.
 * 
 * @param {int} id Shader id to switch.
 */
Ovoid.Drawer.prototype.switchSp = function(id) {

  this._swshader[0] = this._swshader[1];
  this._swshader[1] = id;
  this.sp = this._splib[id];
  this.sp.use();
};


/**
 * Restore shader program.<br><br>
 * 
 * Restores the last previous used shader program.
 */
Ovoid.Drawer.prototype.restorSp = function() {
  
  this.switchSp(this._swshader[0]);
};


/**
 * Switch drawing pipeline.<br><br>
 * 
 * Switch the current drawing pipeline to the specified one.
 * 
 * @param {int} id Pipeline id to switch.
 * @param {int} layer Render layer index to switch.
 */
Ovoid.Drawer.prototype.switchPipe = function(id, layer) {

  this._swpipe[0] = this._swpipe[1];
  this._swpipe[1] = id;
  this._swlayer[0] = this._swlayer[1];
  this._swlayer[1] = layer;
  
  this.sp = this._splib[this._sppipe[layer][id]];
  this.sp.use();
};


/**
 * Restore drawing pipeline.<br><br>
 * 
 * Restores the last previous used drawing pipeline.
 */
Ovoid.Drawer.prototype.restorePipe = function() {
  
  this.switchPipe(this._swpipe[0], this._swlayer[0]);
};


/**
 * Switch blend parameters.<br><br>
 * 
 * Switchs the current blend parameters to the specified configuration.
 * 
 * @param {int} id Blend type, can be 0, 1, 2, or 3.<br><br>
 * 0 : blending disabled.<br><br>
 * 1 : additive alpha. SRC_ALPHA, ONE<br><br>
 * 2 : additive colors. ONE, ONE<br><br>
 * 3 : substractive alpha. SRC_ALPHA, ONE_MINUS_SRC_ALPHA<br><br>
 */
Ovoid.Drawer.prototype.switchBlend = function(id) {

  this._swblend[0] = this._swblend[1];
  this._swblend[1] = id;
  switch(id)
  {
    case 0: 
      this.gl.disable(0x0BE2);
    return;
    case 1:
      // Blend alpha additif
      this.gl.enable(0x0BE2);
      this.gl.blendFunc(0x0302, 1);
    return;
    case 2:
      // Blend couleur additive
      this.gl.enable(0x0BE2);
      this.gl.blendFunc(1, 1);
    return;
    default:
      // Blend soustractif 
      this.gl.enable(0x0BE2);
      this.gl.blendFunc(0x0302, 0x0303);
    return;
  }
};


/**
 * Restore blend parameters.<br><br>
 * 
 * Restores the last previous used blend parameters.
 */
Ovoid.Drawer.prototype.restoreBlend = function() {
  
  this.switchBlend(this._swblend[0]);
};


/**
 * Switch depth parameters.<br><br>
 * 
 * Switchs the current depth parameters to the specified configuration.
 * 
 * @param {int} id Depth type, can be 0, 1, 2, or 3.<br><br>
 * 0 : all disabled.<br><br>
 * 1 : depthMask on, depth test less.<br><br>
 * 2 : depthMask off, depth test less.<br><br>
 * 3 : depthMask off, depth test less equal.<br><br>
 * 4 : depthMask off, depth test equal.<br><br>
 */
Ovoid.Drawer.prototype.switchDepth = function(id) {

  this._swdepth[0] = this._swdepth[1];
  this._swdepth[1] = id;
  switch(id)
  {
    case 0: 
      this.gl.depthMask(0);
      this.gl.disable(0x0B71);
    return;
    case 1:
      this.gl.depthMask(1);
      this.gl.enable(0x0B71);
      this.gl.depthFunc(0x0201);
    return;
    case 2:
      this.gl.depthMask(0);
      this.gl.enable(0x0B71);
      this.gl.depthFunc(0x0201);
    return;
    case 4:
      this.gl.depthMask(0);
      this.gl.enable(0x0B71);
      this.gl.depthFunc(0x0202);
    return;
    default:
      this.gl.depthMask(0);
      this.gl.enable(0x0B71);
      this.gl.depthFunc(0x0203);
    return;
  }
};


/**
 * Restore depth parameters.<br><br>
 * 
 * Restores the last previous used depth parameters.
 */
Ovoid.Drawer.prototype.restoreDepth = function() {
  
  this.switchDepth(this._swdepth[0]);
};


/**
 * Set culling parameters.<br><br>
 * 
 * Sets face culling parameters.
 * 
 * @param {int} id Blend type, can be 0, 1, 2, or 3.<br><br>
 * 0 : disabled.<br><br>
 * 1 : cull back.<br><br>
 * 2 : cull front.<br><br>
 */
Ovoid.Drawer.prototype.setCull = function(id) {

  switch(id)
  {
    case 0: 
      this.gl.disable(0x0B44); // CULL_FACE
    return;
    case 2:
      this.gl.enable(0x0B44); // CULL_FACE
      this.gl.cullFace(0x0404); // FRONT
    return;
    default:
      this.gl.enable(0x0B44); // CULL_FACE
      this.gl.cullFace(0x0405); // BACK
    return;
  }
};


/**
 * Begin draw session.<br><br>
 * 
 * Initializes for a new drawing session.
 */
Ovoid.Drawer.prototype.beginDraw = function() {
  
  /* performance counter */
  this._pc = (new Date().getTime());
  
  if (this._i.Frame.changed) {
    this.gl.viewport(0,0,this._i.Frame.size.v[0],this._i.Frame.size.v[1]);
  }
  
  /* ambient color par defaut */
  var c;
  c = this._i.opt_renderAmbientColor;
  this._abcolor[0] = c[0];
  this._abcolor[1] = c[1];
  this._abcolor[2] = c[2];
  this._abcolor[3] = c[3];
  /* fog color si necessaire */
  if(this._i.opt_renderFogDensity > 0.0) {
    c = this._i.opt_renderFogColor;
    this._fogcolor[0] = c[0];
    this._fogcolor[1] = c[1];
    this._fogcolor[2] = c[2];
    this._fogcolor[3] = c[3];
  }

  c = this._i.opt_renderClearColor;
  this.gl.clearColor(c[0],c[1],c[2],c[3]);
  
  this.gl.depthMask(1);
  this.gl.clear(0x4000|0x100); /* COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT*/
  
  this._drawnpolyset = 0;
  this._drawnparticle = 0;
  this._renderpasses = 0;
  this._drawndynamic = 0;
  this._drawnsprite = 0;
  this._drawnsymbolic = 0;
  this._drawnchar = 0;
  this._drawnshadow = 0;
  
  // setup le level of performance
  if (this._i.opt_renderAdaptLop) {
    
    this._lopfps = this._i.Timer.framerate;
    var lth = this._i.opt_renderAdaptLopThreshold;
    var lvl = this._i.opt_renderLopLevel;
    
    if (this._lopfps < lth) {
      this._lop--;
      this._lopfps = lth;
    }
    
    if (this._lopfps >= 58) this._lop++;
    if (this._lop > lvl) this._lop = lvl;
    if (this._lop < 0) this._lop = 0;
    
  } else {
    this._lop = lvl;
  }
  
  // pipeline geometrie selon level of performance
  switch(this._lop)
  {
	case 0:
	  this._pipeLp = 13;
	  this._pipe1p = 14;
    break;
	case 1:
	  this._pipeLp = 10;
	  this._pipe1p = 11;
    break;
	default:
	  this._pipeLp = 0;
	  this._pipe1p = 1;
    break;
  }
};


/**
 * End draw session.<br><br>
 * 
 * Conclude the current drawing session.
 */
Ovoid.Drawer.prototype.endDraw = function() {

  /* Sais pas si c'est très utile... */
  this.gl.flush();
};


/**
 * Begin readPixels draw session.<br><br>
 * 
 * Initializes for a new readPixels drawing sub-session.
 */
Ovoid.Drawer.prototype.beginRpDraw = function() {
  
  this.gl.bindFramebuffer(0x8D40, this._fbrpixel); /* FRAMEBUFFER */
  /* clear avec un fond noir */
  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.gl.clear(0x4000|0x100); /* COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT*/
}

/**
 * End readPixels draw session.<br><br>
 * 
 * Conclude the current readPixels drawing sub-session.
 */
Ovoid.Drawer.prototype.endRpDraw = function() {
    
    /* Read pixel a la position du pointeur actuel */
    this.gl.readPixels(this._i.Input.mousePosition.v[0],
        (this._i.Frame.size.v[1] - this._i.Input.mousePosition.v[1]),
        1,1,0x1908,0x1401,/* RGBA, UNSIGNED_BYTE */
        this._rpcolor);
        
    this.gl.bindFramebuffer(0x8D40, null); /* FRAMEBUFFER */
    
    this._i.Input.mouseLeaveUid = this._i.Input.mouseOverUid;
    
    /* convertis RGB en entier */
    this._i.Input.mouseOverUid = 0x000000 |
        ((this._rpcolor[0]) << 16) |
        ((this._rpcolor[1]) << 8) |
        ((this._rpcolor[2]));
    
    this._rpdepth[0] = (this._rpcolor[3] / 255);
    
    /* calcule l'unproject */
    this._i.Queuer._rcamera.unproject(this._i.Input.mousePosition.v[0],
        (this._i.Frame.size.v[1] - this._i.Input.mousePosition.v[1]),
        this._rpdepth[0],
        this._i.Input.mouseCursor);
        
    if(this._i.Input.mouseLeaveUid != this._i.Input.mouseOverUid) {
      this._i.Input.mouseEnterUid = this._i.Input.mouseOverUid;
    } else {
      this._i.Input.mouseEnterUid = this._i.Input.mouseLeaveUid = 0;
    }
}
  
/* ********************** DRAWING SHADER SETUP METHODS ********************** */
/**
 * Set light.<br><br>
 * 
 * Setup one or more light for the current used shader.
 * 
 * @param {Light|Stack<Light>} light Light node or Stack containing Light nodes.
 */
Ovoid.Drawer.prototype.light = function(light) {
  
  if (light.count) { /* stack ? */

    /* obligé d'utiliser des array créé à l'avance, si non: 
     * memory leak! */
    for (var i = 0; i < Ovoid.MAX_LIGHT_BY_DRAW; i++) {
      if (i < light.count) {
        this._lp.set(light[i].worldPosition.v, i*4);
        this._ld.set(light[i].worldDirection.v, i*3); 
        this._lc.set(light[i].color.v, i*4);
        this._li[i] = light[i].intensity;
        this._lr[i] = light[i].range;
        this._lf[i] = light[i].falloff;
        this._la[i] = light[i].spotAngle;
        this._le[i] = 1; /*enabled*/
      } else {
        this._le[i] = 0; /*enabled*/
      }
    }
    
    this.sp.setUniform4fv(20, this._lp); /*position*/
    this.sp.setUniform3fv(21, this._ld); /*direction*/
    this.sp.setUniform4fv(22, this._lc); /*color*/
    this.sp.setUniform1fv(23, this._li); /*intensity*/
    this.sp.setUniform1fv(24, this._lr); /*range*/
    this.sp.setUniform1fv(25, this._lf); /*falloff*/
    this.sp.setUniform1fv(26, this._la); /*spotangle*/
    this.sp.setUniform1iv(28, this._le); /*enabled*/
    
  } else {
    if (light.type) {
      this.sp.setUniform4fv(20, light.worldPosition.v);
      this.sp.setUniform3fv(21, light.worldDirection.v);
      this.sp.setUniform4fv(22, light.color.v);
      this.sp.setUniform1f(23, light.intensity);
      this.sp.setUniform1f(24, light.range);
      this.sp.setUniform1f(25, light.falloff);
      this.sp.setUniform1f(26, light.spotAngle);
    }
  }
};


/**
 * Set ambient and fog parameters.<br><br>
 * 
 * Setup ambient lighting color and fog parameters for the current used shader.
 */
Ovoid.Drawer.prototype.ambient = function() {
  
  this.sp.setUniform4fv(40, this._abcolor);
  if(this._i.opt_renderFogDensity > 0.0) {
    this.sp.setUniform4fv(44, this._fogcolor);
    this.sp.setUniform1f(45, this._i.opt_renderFogDensity);
  }
}


/**
 * Set perspective.<br><br>
 * 
 * Setup view perspective matrices and positions of the specified camera for 
 * the current used shader.
 * 
 * @param {Camera} camera Camera node.
 */
Ovoid.Drawer.prototype.persp = function(camera) {

  this.sp.setUniformMatrix4fv(3, camera.eyeview.m);
  this.sp.setUniformMatrix4fv(4, camera.perspective.m);
  this.sp.setUniformMatrix4fv(5, camera.lookat.m);
  this.sp.setUniform4fv(30, camera.worldPosition.v);
};


/**
 * Set orthographic.<br><br>
 * 
 * Setup view orthographic matrix of the specified camera for the current 
 * used shader.
 * 
 * @param {Camera} camera Camera node.
 */
Ovoid.Drawer.prototype.ortho = function(camera) {

  this.sp.setUniformMatrix4fv(3, camera.orthographic.m);
};


/**
 * Set screen.<br><br>
 * 
 * Setup screen view orthographic matrix for the current used shader.
 * 
 * @param {Matrix4} matrix Screen orthographic matrix.
 */
Ovoid.Drawer.prototype.screen = function(matrix) {

  this.sp.setUniformMatrix4fv(3, matrix.m);
};


/**
 * Set model transformations.<br><br>
 * 
 * Setup transform and normal matrices for the current 
 * used shader.
 * 
 * @param {Float32Array[16]} tmatrix Transformation matrix.
 * @param {Float32Array[9]} [nmatrix] Normal matrix.
 */
Ovoid.Drawer.prototype.model = function(tmatrix, nmatrix) {

  this.sp.setUniformMatrix4fv(0,tmatrix);
  if (nmatrix)
    this.sp.setUniformMatrix3fv(1,nmatrix);
};


/**
 * Enable option.<br><br>
 * 
 * Enables the specified shader parameter.
 * 
 * @param {enum} u Shader boolean option to enable. Can be one the followings 
 * symbolic constants:<br>
 * UNIFORM_ENABLE_DIFFUSE_LIGHTING_BOOL (0)<br>
 * UNIFORM_ENABLE_AMBIENT_LIGHTING_BOOL (1)<br>
 * UNIFORM_ENABLE_SPECULAR_BOOL (2)<br>
 * UNIFORM_ENABLE_REFLECT_BOOL (3)<br>
 * UNIFORM_ENABLE_PARALAX_BOOL (4)<br>
 * UNIFORM_ENABLE_MATERIAL_BOOL (5)<br>
 * UNIFORM_ENABLE_VERTEX_WEIGHT_BOOL (6)<br>
 * UNIFORM_ENABLE_COMPUT_TANGENT_BOOL (7)<br>
 */
Ovoid.Drawer.prototype.enable = function(u) {

  this.sp.setUniform1i(u, 1);
};


/**
 * Disable option.<br><br>
 * 
 * Disable the specified shader parameter.
 * 
 * @param {enum} u Shader boolean option to enable. Can be one the followings 
 * symbolic constants:<br>
 * UNIFORM_ENABLE_DIFFUSE_LIGHTING_BOOL (0)<br>
 * UNIFORM_ENABLE_AMBIENT_LIGHTING_BOOL (1)<br>
 * UNIFORM_ENABLE_SPECULAR_BOOL (2)<br>
 * UNIFORM_ENABLE_REFLECT_BOOL (3)<br>
 * UNIFORM_ENABLE_PARALAX_BOOL (4)<br>
 * UNIFORM_ENABLE_MATERIAL_BOOL (5)<br>
 * UNIFORM_ENABLE_VERTEX_WEIGHT_BOOL (6)<br>
 * UNIFORM_ENABLE_COMPUT_TANGENT_BOOL (7)<br>
 */
Ovoid.Drawer.prototype.disable = function(u) {

  this.sp.setUniform1i(u, 0);
};


/* *********************** DRAWING PRIMITIVES METHODS *********************** */
/**
 * Draw sprite.<br><br>
 * 
 * Draws a sprite transformed according to the specified transformation matrix.
 */
Ovoid.Drawer.prototype.sprite = function() {
  
  this.gl.bindBuffer(0x8892,this._bprimitive[0]);
  this.sp.setVertexAttribPointers(5,28); /* VEC4_P|VEC3_U == 5 */
  this.gl.drawArrays(4,0,6);
  this._drawnsprite++;
};


/**
 * Draw symbolic box.<br><br>
 * 
 * Draws a symbolic box.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.prototype.symBox = function(color) {
  
  this.sp.setUniform4fv(9, color.v);
  this.gl.bindBuffer(0x8892,this._bprimitive[1]);
  this.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  this.gl.drawArrays(1,0,24);
  this._drawnsymbolic++;
};


/**
 * Draw symbolic sphere.<br><br>
 * 
 * Draws a symbolic sphere.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.prototype.symSphere = function(color) {
  
  this.sp.setUniform4fv(9, color.v);
  this.gl.bindBuffer(0x8892,this._bprimitive[2]);
  this.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  this.gl.drawArrays(1,0,144);
  this._drawnsymbolic++;
};


/**
 * Draw symbolic axis.<br><br>
 * 
 * Draws a symbolic axis.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.prototype.symAxis = function(color) {
  
  this.sp.setUniform4fv(9, color.v);
  this.gl.bindBuffer(0x8892,this._bprimitive[3]);
  this.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  this.gl.drawArrays(1,0,6);
  this._drawnsymbolic++;
};


/**
 * Draw symbolic pyramid.<br><br>
 * 
 * Draws a symbolic pyramid.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.prototype.symPyramid = function(color) {
  
  this.sp.setUniform4fv(9, color.v);
  this.gl.bindBuffer(0x8892,this._bprimitive[4]);
  this.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  this.gl.drawArrays(1,0,16);
  this._drawnsymbolic++;
};


/**
 * Draw symbolic star.<br><br>
 * 
 * Draws a symbolic star.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.prototype.symStar = function(color) {
  
  this.sp.setUniform4fv(9, color.v);
  this.gl.bindBuffer(0x8892,this._bprimitive[5]);
  this.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  this.gl.drawArrays(1,0,10);
  this._drawnsymbolic++;
};


/**
 * Draw point-sprite string.<br><br>
 * 
 * Draws a point-sprite string. This method should use a special shader. The 
 * generated point-sprite vertices embeds special data instead of z position
 * and traditionnal "1.0" w value:<br><br>
 * 
 * [x position, y position, point-size, char code]
 * 
 * @param {float} w Horizontal point-sprite spacing (interchar).
 * @param {float} r Vertical point-sprite spacing (interline).
 * @param {float} s Point-sprite size.
 * @param {String} string String to generates as point-sprites.
 */
Ovoid.Drawer.prototype.string = function(w, r, s, string) {
  
  var data = this._dV;
  var v = 0; /* pointeur */
  var a, b; /* char, old char */
  var u = 0; /* colone */
  var l = 0; /* ligne */
  /* point coord & size */
  var x = s * w;
  var y = s * r;
  for (var i = 0; i < string.length; i++) {
    b = a;
    a = string.charCodeAt(i);
    /* \n */
    if (a == 0x0A) { l++; u = 0; continue; }
    /* \t */
    if (a == 0x09) { u += 4; continue; }
    /* unicod 1er octect */
    if (a == 0xC2 || a == 0xC3) { continue; }
    /* unicod correction d'index */
    if (b == 0xC3) { a += 64; }
    data[v]   = x + (u * x);
    data[v+1] = (y * 0.5) + (l * y);
    data[v+2] = s;
    data[v+3] = a - 32;
    v += 4;
    u++;
  }
  this.gl.bindBuffer(0x8892,this._bdynamic);
  this.gl.bufferSubData(0x8892,0,data.subarray(0,v));
  this.sp.setVertexAttribPointers(1,16); /* VEC4_P == 1 */
  this.gl.drawArrays(0,0,v/4);
  this._drawnchar+=v/4;
};


/**
 * Draw raw data.<br><br>
 * 
 * Draws the given data according to the specified parameters.
 * 
 * @param {Matrix4} matrix Transformation matrix.
 * @param {bitmask} format Vertex Format bitmask. Can be any combinaison of 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W.<br><br>
 * @param {int} stride Vertex size in bytes.
 * @param {enum} type WebGL primitive type. Can one of the standard 
 * WeGL primitives.
 * @param {int} count Vertices count.
 * @param {Float32Array} data Buffer data.
 */
Ovoid.Drawer.prototype.raw = function(format, stride, type, count, data) {
  
  this.gl.bindBuffer(0x8892,this._bdynamic);
  this.gl.bufferSubData(0x8892,0,data);
  this.sp.setVertexAttribPointers(format,stride);
  this.gl.drawArrays(type,0,count);
  this._drawndynamic++;
};


/* ********************* DRAWING RAW NODES METHODS ************************** */
/**
 * Draw Layer.<br><br>
 * 
 * Draws a Layer node with the current used shader.
 * 
 * @param {Layer} layer Layer node to be drawn.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.prototype.layer = function(layer, color) {
  
  //Ovoid.Drawer.sp.setUniform3fv(42, layer.size.v); /* layer size */
  this.gl.activeTexture(0x84C1); /* TEXTURE1 */
  if (color) {
    this.sp.setUniform4fv(9, color.v); /* set color */
    /* change texture */
    this._tblank.bind();
  } else {
    this.sp.setUniform4fv(9, layer.bgColor.v); /* set color */
    /* change texture */
    (layer.bgTexture)?layer.bgTexture.bind():this._tblank.bind();
  }
  this.sp.setUniformSampler(1,1);
  /* Draw a sprite */
  this.sprite();
};


/**
 * Draw Text.<br><br>
 * 
 * Draws a Text node with the current used shader.
 * 
 * @param {Text} text Text node to be drawn.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.prototype.text = function(text, color) {

  this.gl.activeTexture(0x84C1); /* TEXTURE1 */
  if (color) {
    this.sp.setUniform4fv(9, color.v); /* set color */
    /* change texture */
    this._tblank.bind();
  } else {
    this.sp.setUniform4fv(9, text.fgColor.v); /* set color */
    /* change texture */
    (text.fontmap)?text.fontmap.bind():this._tfontm.bind();
  }
  this.sp.setUniformSampler(1,1);
  /* Draw a string */
  this.string(text.param.v[1],text.param.v[2],text.param.v[0],text.string);
};


/**
 * Draw Mesh.<br><br>
 * 
 * Draws a Mesh node with the current used shader.
 * 
 * @param {Mesh} mesh Mesh node to be drawn.
 * @param {Color} [color] Optionnal flat color.
 * @param {Bool} [alpha] Optionnal draw as alpha.
 */
Ovoid.Drawer.prototype.mesh = function(mesh, color, alpha) {

  var l, j, k, s, m;
  l = mesh._lod;
  this.gl.bindBuffer(0x8892, mesh._vbuffer[l]);
  this.gl.bindBuffer(0x8893, mesh._ibuffer[l]);
  this.sp.setVertexAttribPointers(mesh._vformat, mesh._vfbytes);
  j = mesh.polyset[l].length;
  if (color) {
    this.sp.setUniform4fv(9, color.v); /* set color */   
    while (j--) {
      s = mesh.polyset[l][j];
      /* TRIANGLES, count, UNSIGNED_SHORT, offset */
      this.gl.drawElements(s.mode,s.icount,0x1403,s.ioffset); 
      this._drawnpolyset++;
    }
  } else {
    /* parcour des polysets */  
    while (j--) {
      s = mesh.polyset[l][j];
      s.material?m=s.material:m=this._mblank;
      /* set material  */
      this.sp.setUniform4fv(10,m.color[0].v);
      this.sp.setUniform4fv(11,m.color[1].v);
      this.sp.setUniform4fv(12,m.color[2].v);
      this.sp.setUniform4fv(13,m.color[3].v);
      this.sp.setUniform4fv(14,m.color[4].v);
      this.sp.setUniform1f(15,m.shininess);
      this.sp.setUniform1f(16,m.opacity);
      this.sp.setUniform1f(17,m.reflectivity);
      this.sp.setUniform1f(18,m.bumpiness);
      /* bind texture */
      for (k = 0; k < 6; k++) {
        if(this.sp.uniformSampler[k] != -1) {
          this.gl.activeTexture(0x84C0+k); /* TEXTURE0+k */
          (m.texture[k])?m.texture[k].bind():this._tblank.bind();
          this.gl.uniform1i(this.sp.uniformSampler[k], k);
        }
      }
      /* dessin special si c'est un alpha*/
      if(!alpha) {
        /* TRIANGLES, count, UNSIGNED_SHORT, offset */
        this.gl.drawElements(s.mode,s.icount,0x1403,s.ioffset);
      } else {
        this.setCull(2); // CULL FRONT
        /* TRIANGLES, count, UNSIGNED_SHORT, offset */
        this.gl.drawElements(s.mode,s.icount,0x1403,s.ioffset);
        this.setCull(3); // CULL BACK
        /* TRIANGLES, count, UNSIGNED_SHORT, offset */
        this.gl.drawElements(s.mode,s.icount,0x1403,s.ioffset);
        this.setCull(this._i.opt_renderCullFace);
      }
      this._drawnpolyset++;
    }
  }
};


/**
 * Draw Emitter.<br><br>
 * 
 * Draws a Emitter node's particles with the current used shader.
 * 
 * @param {Emitter} emitter Emitter node to be drawn.
 * @param {int} layer Render layer to use.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.prototype.emitter = function(emitter, layer, color) {
  
  this.setCull(0); // disable face culling
  if (color) {
    if(emitter.billboard) {
      this.switchPipe(27,layer); // PIPE_RP_BILLBOARD
    } else {
      this.switchPipe(22,layer); // PIPE_RP_PARTICLE
    }
    this.sp.setUniform4fv(9, color.v); // set color
    this.persp(this._i.Queuer._rcamera); // mise à jour de la perspective
    this.gl.activeTexture(0x84C1); // TEXTURE1
    this._tblank.bind();
    this.sp.setUniformSampler(1,1);
    this.switchBlend(0); // substractive alpha. SRC_ALPHA, ONE_MINUS_SRC_ALPHA 
    this.switchDepth(2); // Disable depth mask
    
    if(emitter.billboard) {
      this.gl.bindBuffer(0x8892,this._bprimitive[6]); // Buffer spirte billboard
      this.sp.setVertexAttribPointers(5,28); // VEC4_P|VEC3_U == 5 
      var m, s, i;
      m = this._tM; // Matrice temporaire
      m.set(this._tMi); // Copie l'identity
      i = emitter._particles.length;
      while(i--) {
        s = emitter._particles[i];
        if(s.l > 0.0) {
          m[0] = s.u.v[2]; // Taille du sprite 
          m[12] = s.p.v[0]; m[13] = s.p.v[1]; m[14] = s.p.v[2]; m[15] = 1.0; // Translations
          this.model(m);
          this.gl.drawArrays(5,0,4); // TRIANGLES_STRIP
          this._drawnsprite++;
        }
      }
    } else {
      // Ovoid.VERTEX_PARTICLE, stride, gl.POINTS,
      var n = emitter._alives;
      this.raw(Ovoid.VERTEX_PARTICLE, 44, 0, n, emitter._fbuffer.subarray(0,n*11));
      this._drawnparticle+=n;
    }
  } else {
    // model de rendu pour les particules
    if(emitter.model == 3) {
      this.switchBlend(1); // additive alpha. SRC_ALPHA, ONE
    } else {
      this.switchBlend(3); // substractive alpha. SRC_ALPHA, ONE_MINUS_SRC_ALPHA
    }
    
    if(emitter.billboard) {
      this.switchPipe(7,layer); // PIPE_BILLBOARD
    } else {
      this.switchPipe(2,layer); // PIPE_PARTICLE
    }
    
    this.persp(this._i.Queuer._rcamera); // Force la mise à jour de la perspective 
    this.gl.activeTexture(0x84C1); /* TEXTURE1 */
    (emitter.texture)?emitter.texture.bind():this._tblank.bind();
    this.sp.setUniformSampler(1,1);
    this.switchDepth(2); // Disable depth mask
      
    if(emitter.billboard) {
      this.gl.bindBuffer(0x8892,this._bprimitive[6]); // Buffer spirte billboard
      this.sp.setVertexAttribPointers(5,28); // VEC4_P|VEC3_U == 5
      var m, s, i;
      m = this._tM; // Matrice temporaire
      m.set(this._tMi); // Copie l'identity
      i = emitter._particles.length;
      while(i--) {
        s = emitter._particles[i];
        if(s.l > 0.0) {
          m[0] = s.u.v[2]; // Taille du sprite 
          m[12] = s.p.v[0]; m[13] = s.p.v[1]; m[14] = s.p.v[2]; m[15] = 1.0; // Translations
          this.sp.setUniform4fv(9, s.c.v); // set color
          this.model(m);
          this.gl.drawArrays(5,0,4);
          this._drawnsprite++;
        }
      }
    } else {
      // Ovoid.VERTEX_PARTICLE, stride, gl.POINTS,
      var n = emitter._alives;
      this.raw(Ovoid.VERTEX_PARTICLE, 44, 0, n, emitter._fbuffer.subarray(0,n*11));
      this._drawnparticle+=n;
    }
  }
  // restore depth, blend, pipe et culling
  this.restoreBlend();
  this.restoreDepth();
  this.restorePipe();
  this.setCull(this._i.opt_renderCullFace);
};


/* ************************ DRAWING SPECIAL METHODS ************************* */
/**
 * Draw shadow volume.<br><br>
 * 
 * Draws shadow volume of the given Body's shape according to the specified 
 * light and in Z-Fail stencil way.
 * 
 * @param {Light} light Light for shadow projection.
 * @param {Body} body Body node to project shape's shadow.
 */
Ovoid.Drawer.prototype.shadow = function(light, body) {
  
  var shape;
  if (body.shape.type & Ovoid.MESH) {
    this.model(body.worldMatrix.m);
    shape = body.shape;
  }
  if (body.shape.type & Ovoid.SKIN) {
    if (body.shape.mesh) {
      // tentative d'implémentation des shadow volume pour les skin
      if (!this._i.opt_localSkinData)
        return;
      /* les vertices sont déja transformmé en coordonnée monde, pas besoin
       * de transformer le modelview */
      this.model(new Ovoid.Matrix4().m);
      shape = body.shape.mesh;
    }
  }
  
  if(!shape) return;
  
  var l = 0; // TODO: implementation du Lod si besoin
  var c = shape.triangles[l].length;
  
  var P = new Array(6);
  P[3] = new Ovoid.Point();
  P[4] = new Ovoid.Point();
  P[5] = new Ovoid.Point();
  var LP = new Ovoid.Point();
  var LV = new Ovoid.Vector();  /* Light vector, rayons par rapport à la normale */
  
  // 4 float par vertex, 3 vertex par face = 12 float par face et on double la mise
  if(((c*12)*2) > this._dV.length)
    return;
     
  var V = this._dV;

  // position de la lumiere en coordonnée locale à l'objet 
  if(light.model == 1) { /* Ovoid.LIGHT_DIRECTIONAL */
    LV.copy(light.worldDirection);
    /* les vertices sont déja transformmé en coordonnée monde, pas besoin
       * de transformer le modelview pour le skin */
    if (body.shape.type & Ovoid.MESH) 
        LV.transform4Inverse(body.worldMatrix);
    LP.copy(LV);
    LV.scaleBy(-1.0);
  } else {
    LP.copy(light.worldPosition);
    /* les vertices sont déja transformmé en coordonnée monde, pas besoin
       * de transformer le modelview pour le skin */
    if (body.shape.type & Ovoid.MESH) 
        LP.transform4Inverse(body.worldMatrix);
  }
  
  // on parcour la liste de triangles pour creer le vertex buffer du shadow volum
  var i, j, k, a;
  var n = 0;
  for (i = 0; i < c; i++)
  {
    if(light.model != 1) /* Ovoid.LIGHT_DIRECTIONAL */
      LV.subOf(LP, body.shape.triangles[l][i].center);
      
    if (LV.dot(body.shape.triangles[l][i].normal) > 0.0)
    {
      // triangles face lumiere 
      P[0] = body.shape.vertices[l][body.shape.triangles[l][i].index[0]].p;
      P[1] = body.shape.vertices[l][body.shape.triangles[l][i].index[1]].p;
      P[2] = body.shape.vertices[l][body.shape.triangles[l][i].index[2]].p;
      
      // triangle extrudé à l'infini lumiere 
      if(light.model == 1) { /* Ovoid.LIGHT_DIRECTIONAL */
        P[3].copy(LP);
        P[4].copy(LP);
        P[5].copy(LP);
      } else {
        P[3].subOf(P[0], LP);
        P[4].subOf(P[1], LP);
        P[5].subOf(P[2], LP);
      }
      // ( La methode d'assignation est bête et brute, mais c'est la plus rapide )
      V[n] = P[0].v[0]; n++; V[n] = P[0].v[1]; n++; V[n] = P[0].v[2]; n++; V[n] = 1.0; n++;
      V[n] = P[1].v[0]; n++; V[n] = P[1].v[1]; n++; V[n] = P[1].v[2]; n++; V[n] = 1.0; n++;
      V[n] = P[2].v[0]; n++; V[n] = P[2].v[1]; n++; V[n] = P[2].v[2]; n++; V[n] = 1.0; n++;
      // doivent être dessiné a l'envers pour le face-culling Front/Back 
      V[n] = P[3].v[0]; n++; V[n] = P[3].v[1]; n++; V[n] = P[3].v[2]; n++; V[n] = 0.0; n++;
      V[n] = P[5].v[0]; n++; V[n] = P[5].v[1]; n++; V[n] = P[5].v[2]; n++; V[n] = 0.0; n++;
      V[n] = P[4].v[0]; n++; V[n] = P[4].v[1]; n++; V[n] = P[4].v[2]; n++; V[n] = 0.0; n++;
      
      // on verifie les adjacents 
      for (j = 0; j < 3; j++)
      {
        // a-t-il une face adjacente ?
        a = body.shape.triangles[l][i].adjacent[j];
        if (a != -1.0)
        {
          if(light.model != 1) /* Ovoid.LIGHT_DIRECTIONAL */
            LV.subOf(LP, body.shape.triangles[l][a].center);
            
          if (LV.dot(body.shape.triangles[l][a].normal) <= 0.0)
          {
            /* le premier triangle du "ring", l'index des vertices
             * est trouvé car l'ordre des edges est 01-12-20 le second
             * peut donc être trouvé grace à un modulo :
             * (0+1)%3 = 1, (1+1)%3 = 2, (1+2)%3 = 0*/
            k = (j + 1) % 3;
            if(light.model == 1) { /* Ovoid.LIGHT_DIRECTIONAL */
              P[3].copy(LP);
              P[4].copy(LP);
            } else {
              P[3].subOf(P[j], LP);
              P[4].subOf(P[k], LP);
            }
      
            V[n] = P[j].v[0]; n++;V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
            V[n] = P[4].v[0]; n++;V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
            V[n] = P[k].v[0]; n++;V[n] = P[k].v[1]; n++;V[n] = P[k].v[2]; n++;V[n] = 1.0; n++;
            
            V[n] = P[j].v[0]; n++;V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
            V[n] = P[3].v[0]; n++;V[n] = P[3].v[1]; n++;V[n] = P[3].v[2]; n++;V[n] = 0.0; n++;
            V[n] = P[4].v[0]; n++;V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
          }
        } else {
          // si pas de face adjacente c'est un face de bordure on extrude les bords
          k = (j + 1) % 3;
          
          if(light.model == 1) { /* Ovoid.LIGHT_DIRECTIONAL */
            P[3].copy(LP);
            P[4].copy(LP);
          } else {
            P[3].subOf(P[j], LP);
            P[4].subOf(P[k], LP);
          }

          V[n] = P[j].v[0]; n++; V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
          V[n] = P[4].v[0]; n++; V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
          V[n] = P[k].v[0]; n++; V[n] = P[k].v[1]; n++;V[n] = P[k].v[2]; n++;V[n] = 1.0; n++;
          
          V[n] = P[j].v[0]; n++;V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
          V[n] = P[3].v[0]; n++;V[n] = P[3].v[1]; n++;V[n] = P[3].v[2]; n++;V[n] = 0.0; n++;
          V[n] = P[4].v[0]; n++;V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
        }
      }
    }
  }
  
  delete P[3];
  delete P[4];
  delete P[5];
  delete P;
  delete LP;
  delete LV;
  
  // buffer dynamique
  this.gl.bindBuffer(0x8892,this._bdynamic);
  this.gl.bufferSubData(0x8892,0,V.subarray(0,n));
  this.sp.setVertexAttribPointers(1,16);
  
  // dessins des faces arrieres, incremente le stencil 
  this.gl.cullFace(0x0404); // FRONT
  this.gl.stencilOp(0x1E00, 0x1E02, 0x1E00); // KEEP, INCR, KEEP
  this.gl.drawArrays(4, 0, (n/4));
  this._drawndynamic++;

  // dessins des faces avant, decremente le stencil 
  this.gl.cullFace(0x0405); // BACK
  this.gl.stencilOp(0x1E00, 0x1E03, 0x1E00); // KEEP, DECR, KEEP
  this.gl.drawArrays(4, 0, (n/4));
  this._drawndynamic++;
  
  this._drawnshadow++;
};


/**
 * Draw faces normals.<br><br>
 * 
 * Draws shape's faces normals of the given Body node.
 * 
 * @param {Body} body Body node.
 * @param {float} scale Normal scale.
 */
Ovoid.Drawer.prototype.normals = function(body, scale) {
  
  if(!body.shape.triangles)
    return;
  
  var l = body.shape._lod;
  
  this.model(body.worldMatrix.m);
  triangles = body.shape.triangles[l];

  var V = this._dV;
  var C, N;
  var n = 0;
  for (var t = 0; t < triangles.length; t++) {
    C = triangles[t].center;
    N = triangles[t].normal;
    V[n] = C.v[0]; n++;
    V[n] = C.v[1]; n++;
    V[n] = C.v[2]; n++;
    V[n] = 1.0; n++;
    V[n] = 1.0; n++; 
    V[n] = 1.0; n++; 
    V[n] = 1.0; n++; 
    V[n] = 1.0; n++;
    V[n] = C.v[0] + N.v[0] * scale; n++;
    V[n] = C.v[1] + N.v[1] * scale; n++;
    V[n] = C.v[2] + N.v[2] * scale; n++;
    V[n] = 1.0; n++;
    V[n] = 1.0; n++; 
    V[n] = 1.0; n++; 
    V[n] = 1.0; n++; 
    V[n] = 1.0; n++;
  }
  
  this.sp.setUniform4fv(9, this._tcolor[10].v);
  this.raw(33, 32, 1, n/8, V.subarray(0,n));
};


/**
 * Draw helpers.<br><br>
 * 
 * Draws helpers and symbols for the given Transform node.
 * 
 * @param {Transform} tform Transform node.
 */
Ovoid.Drawer.prototype.helpers = function(tform) {

  this.model(tform.worldMatrix.m);
  
  var m = this._tM; // Matrice temporaire
      
  if (this._i.opt_renderDrawAxis) {
    this.symAxis(this._tcolor[0]);
  }
  
  if ((tform.type & Ovoid.CAMERA) && this._i.opt_renderDrawCameras) {
    this.symPyramid(this._tcolor[1]);
  }
  
  if ((tform.type & Ovoid.LIGHT) && this._i.opt_renderDrawLights) {
    this.symStar(this._tcolor[4]);
  }
  
  if ((tform.type & Ovoid.JOINT) && this._i.opt_renderDrawJoints) {
    m.set(tform.worldMatrix.m); // Copie 
    var s = this._i.opt_renderJointSize * tform.size;
    m[0] *= s; m[1] *= s; m[2] *= s;
    m[4] *= s; m[5] *= s; m[6] *= s;
    m[8] *= s; m[9] *= s; m[10] *= s;
    this.model(m);
    this.symSphere(this._tcolor[2]);
  }
  
  if(tform.type & Ovoid.BODY) {
    if (this._i.opt_renderDrawBoundingBox) {
      m.set(tform.worldMatrix.m); // Copie 
      var sx = tform.boundingBox.hsize.v[0] * 2.0;
      var sy = tform.boundingBox.hsize.v[1] * 2.0;
      var sz = tform.boundingBox.hsize.v[2] * 2.0;
      var cx = tform.boundingBox.center.v[0];
      var cy = tform.boundingBox.center.v[1];
      var cz = tform.boundingBox.center.v[2];
      m[0] *= sx; m[1] *= sx; m[2] *= sx;
      m[4] *= sy; m[5] *= sy; m[6] *= sy;
      m[8] *= sz; m[9] *= sz; m[10] *= sz;
      m[12] += cx * tform.worldMatrix.m[0] +
                cy * tform.worldMatrix.m[4] +
                cz * tform.worldMatrix.m[8];
      m[13] += cx * tform.worldMatrix.m[1] +
                cy * tform.worldMatrix.m[5] +
                cz * tform.worldMatrix.m[9];
      m[14] += cx * tform.worldMatrix.m[2] +
                cy * tform.worldMatrix.m[6] +
                cz * tform.worldMatrix.m[10];
      this.model(m);
      this.symBox(this._tcolor[8]);
                        
    }
    if (this._i.opt_renderDrawBoundingSphere) {
      m.set(tform.worldMatrix.m); // Copie 
      var s = tform.boundingSphere.radius;
      var cx = tform.boundingSphere.center.v[0];
      var cy = tform.boundingSphere.center.v[1];
      var cz = tform.boundingSphere.center.v[2];
      m[0] *= s; m[1] *= s; m[2] *= s;
      m[4] *= s; m[5] *= s; m[6] *= s;
      m[8] *= s; m[9] *= s; m[10] *= s;
      m[12] += cx * tform.worldMatrix.m[0] +
                cy * tform.worldMatrix.m[4] +
                cz * tform.worldMatrix.m[8];
      m[13] += cx * tform.worldMatrix.m[1] +
                cy * tform.worldMatrix.m[5] +
                cz * tform.worldMatrix.m[9];
      m[14] += cx * tform.worldMatrix.m[2] +
                cy * tform.worldMatrix.m[6] +
                cz * tform.worldMatrix.m[10];
      this.model(m);
      this.symSphere(this._tcolor[6]);
    }
  }
};


/* ************************ DRAWING STACK METHODS *************************** */
/**
 * Draw Body shape.<br><br>
 * 
 * Draws Body's shape using the current used shader.
 * 
 * @param {Body} body Body node.
 * @param {int} layer Render layer to use.
 * @param {Color} [color] Optionnal flat color.
 * @param {Bool} [alpha] Draw as alpha.
 */
Ovoid.Drawer.prototype.body = function(body, layer, color, alpha) {
  
  if (body.shape.type & Ovoid.MESH) {
    this.model(body.worldMatrix.m, body.normalMatrix.m);
    this.mesh(body.shape, color, alpha);
    body.addCach(Ovoid.CACH_WORLD);
    return;
  }
  if (body.shape.type & Ovoid.SKIN) {
    if (body.shape.mesh) {
      this.model(body.shape.infMxfArray, body.shape.infMnrArray);
      this.enable(6);
      this.mesh(body.shape.mesh, color, alpha);
      this.disable(6);
    }
    body.addCach(Ovoid.CACH_WORLD);
    return;
  }
  if (body.shape.type & Ovoid.EMITTER) {
    this.model(body.worldMatrix.m);
    this.emitter(body.shape, layer, color);
    body.addCach(Ovoid.CACH_WORLD);
  }
};


/**
 * Draw Body stack.<br><br>
 * 
 * Draws Bodys's shape of the given Stack using the current used shader.
 * 
 * @param {Stack<Body>} stack Stack of Body nodes.
 * @param {int} layer Render layer to use.
 * @param {bool} [rp] Optionnal draw for readPixel picking frame (per-id flat
 * color).
 * @param {bool} [alpha] Draw as alpha
 */
Ovoid.Drawer.prototype.bodyStack = function(stack, layer, rp, alpha) {
  
  var i = stack.count;
  if (rp) {
    var color = new Ovoid.Color();
    while(i--) {
      if(stack[i].pickable) {
        color.fromInt(stack[i].uid);
        this.body(stack[i], layer, color, alpha);
      }
    }
  } else {
    while(i--) {
      this.body(stack[i], layer, null, alpha);
    }
  }
};


/**
 * Draw Layer stack.<br><br>
 * 
 * Draws Layers of the given Stack using the current used shader.
 * 
 * @param {Stack<Layer>} stack Stack of Layer nodes.
 * @param {bool} [rp] Optionnal draw for readPixel picking frame (per-id flat
 * color).
 */
Ovoid.Drawer.prototype.layerStack = function(stack, rp) {

  var i;
  var c = stack.count;
  if (rp) {
    var color = new Ovoid.Color();
    for (i = 0; i < c; i++) {
      if(stack[i].pickable) {
        color.fromInt(stack[i].uid);
        this.model(stack[i].layerMatrix.m);
        this.layer(stack[i], color);
        stack[i].addCach(Ovoid.CACH_WORLD);
      }
    }
  } else {
    for (i = 0; i < c; i++) {
      this.model(stack[i].layerMatrix.m);
      this.layer(stack[i], color);
      stack[i].addCach(Ovoid.CACH_WORLD);
    }
  }
};


/**
 * Draw Text stack.<br><br>
 * 
 * Draws Text of the given Stack using the current used shader.
 * 
 * @param {Stack<Text>} stack Stack of Text nodes.
 * @param {bool} [rp] Optionnal draw for readPixel picking frame (per-id flat
 * color).
 */
Ovoid.Drawer.prototype.textStack = function(stack, rp) {

  var i;
  var c = stack.count;
  if (rp) {
    var color = new Ovoid.Color();
    for (i = 0; i < c; i++) {
      if(stack[i].pickable) {
        color.fromInt(stack[i].uid);
        this.model(stack[i].layerMatrix.m);
        this.text(stack[i], color);
        stack[i].addCach(Ovoid.CACH_WORLD);
      }
    }
  } else {
    for (i = 0; i < c; i++) {
      this.model(stack[i].layerMatrix.m);
      this.text(stack[i], color);
      stack[i].addCach(Ovoid.CACH_WORLD);
    }
  }
};


/**
 * Draw Transform's helpers stack.<br><br>
 * 
 * Draws Transform's helpers of the given Stack using the current used shader.
 * 
 * @param {Stack<Transform>} stack Stack of Transform nodes.
 */
Ovoid.Drawer.prototype.helpersStack = function(stack) {

  var i = stack.count;
  while(i--) {
    this.helpers(stack[i]);
  }
};


/**
 * Draw Body's shapes normals stack.<br><br>
 * 
 * Draws Body's shapes face normals of the given Stack using the current 
 * used shader.
 * 
 * @param {Stack<Body>} stack Stack of Body nodes.
 */
Ovoid.Drawer.prototype.normalsStack = function(stack) {

  var i = stack.count;
  while(i--) {
    this.normals(stack[i], this._i.opt_renderNormalScale);
  }
};


/**
 * Draw Body's z-fail shadow volumes stack.<br><br>
 * 
 * Draws Body's z-fail shadow volumes of the given Stack using the current 
 * used shader.
 * 
 * @param {Light} light Light node to project shadow.
 * @param {Stack<Body>} stack Stack of Body nodes.
 */
Ovoid.Drawer.prototype.zfailStack = function(light, stack) {

  var i = stack.count;
  while(i--) {
    if(stack[i].shadowCasting)
      this.shadow(light, stack[i]);
  }
};


/* *************************** GLOBAL METHODS ******************************* */

/**
 * Draw current queue subfunction for Read Pixels frame.<br><br>
 * 
 * Draws all the current queue available in <c>Ovoid.Queuer</c>. 
 * This method does not takes argument because it get data directly from the 
 * <c>Ovoid.Queuer</c> global class. 
 */
Ovoid.Drawer.prototype.drawQueueRP = function() {
  // Picking frame
  if (this._i.opt_renderPickingMode) { 
    this.beginRpDraw();
    this.switchBlend(0); // blend off
    this.switchDepth(1); // depth mask on, test less
    this.setCull(this._i.opt_renderCullFace);
    if(this._i.opt_renderPickingMode & 2) { /* Ovoid.RP_WORLD */
      for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
        this.switchPipe(20,0); //PIPE_RP_GEOMETRY
        this.persp(this._i.Queuer._rcamera);
        this.bodyStack(this._i.Queuer.qsolid[i], 0, true, false);
        this.bodyStack(this._i.Queuer.qalpha[i], 0, true, true);
      }
    }
    if (this._i.opt_renderDrawLayers && (this._i.opt_renderPickingMode & 1)) { /* Ovoid.RP_OVERLAY */
      this.switchDepth(0); // depth all disable
      //Ovoid.Drawer.setCull(1); // cull back
      this.switchPipe(23,0); //PIPE_RP_LAYER
      this.screen(this._i.Frame.matrix);
      this.layerStack(this._i.Queuer.qlayer, true);
      this.switchPipe(24,0); //PIPE_RP_STRING
      this.screen(this._i.Frame.matrix);
      this.textStack(this._i.Queuer.qtext, true);
    }
    this.endRpDraw();
    this._renderpasses++;
  }
}

/**
 * Draw current queue subfunction for Helpers and layers.<br><br>
 * 
 * Draws all the current queue available in <c>Ovoid.Queuer</c>. 
 * This method does not takes argument because it get data directly from the 
 * <c>Ovoid.Queuer</c> global class. 
 */
Ovoid.Drawer.prototype.drawQueueHL = function() {
 
  this.switchDepth(0); // depth all disable
  // Helpers 
  if (this._i.opt_renderDrawHelpers) {
    this.switchPipe(5,0); // PIPE_HELPER
    this.persp(this._i.Queuer._rcamera);
    if (this._i.opt_renderDrawNormals) {
      for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
        this.normalsStack(this._i.Queuer.qsolid[i]);
        this.normalsStack(this._i.Queuer.qalpha[i]);
      }
    }
    this.helpersStack(this._i.Queuer.qtform);
    
    // Dessin du curseur
    this.model(this._i.Input.mouseCursor.m);
    this.symSphere(this._tcolor[1]);
    
  }
  // Layers & text
  if (this._i.opt_renderDrawLayers) {
    this.switchBlend(3); // blend substracting alpha
    if(this._i.Queuer.qlayer.count) {
      this.switchPipe(3,0); //PIPE_LAYER
      this.screen(this._i.Frame.matrix);
      this.layerStack(this._i.Queuer.qlayer, false);
    }
    if(this._i.Queuer.qtext.count) {
      this.switchPipe(4,0); //PIPE_STRING
      this.screen(this._i.Frame.matrix);
      this.textStack(this._i.Queuer.qtext, false);
    }
  }
}

/**
 * Draw current queue subfunction for per-light Passes.<br><br>
 * 
 * Draws all the current queue available in <c>Ovoid.Queuer</c>. 
 * This method does not takes argument because it get data directly from the 
 * <c>Ovoid.Queuer</c> global class. 
 */
Ovoid.Drawer.prototype.drawQueueLP = function(pipe) {
  
  var i;
  this.setCull(this._i.opt_renderCullFace);
  this.switchBlend(3); // blending substracting alpha
  this.switchDepth(1); // depth mask on, test less
  
  // initialize projection pour les shadow volume
  this.switchPipe(6,0); // PIPE_SHADOW_VOLUME
  this.persp(this._i.Queuer._rcamera);
  // Passe de rendu Ambient
  for(i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    if(!this._i.Queuer.qsolid[i].count) continue;
    this.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_LP
    this.persp(this._i.Queuer._rcamera);
    this.ambient();  // set scene ambiant parameters
    this.disable(0); // disable diffuse; ENd 
    this.enable(1);  // enable ambient; ENa 
    this.bodyStack(this._i.Queuer.qsolid[i], i, false, false);
  }
  this._renderpasses++;
  // Passes de rendu par lumiere
  this.switchBlend(2); // blend additive color
  this.switchDepth(3); // depth mask off, test lessequal
  var l = this._i.Queuer.qlight.count
  while (l--) {
    if (this._i.Queuer.qlight[l].shadowCasting && this._i.opt_renderShadowCasting) {
      
      this.switchPipe(6,0); // PIPE_SHADOW_VOLUME
      this.switchBlend(0); // blend off
      this.switchDepth(2); // mask off, test less
      
      this.gl.enable(0x0B90); // STENCIL_TEST
      this.gl.clear(0x00000400); // STENCIL_BUFFER_BIT
      this.gl.colorMask(0,0,0,0); 
      this.gl.stencilFunc(0x0207,0,0); // ALWAYS,0,0
  
      for(i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
        if(!this._i.Queuer.qsolid[i].count) continue;
        this.zfailStack(this._i.Queuer.qlight[l], this._i.Queuer.qsolid[i]);
      }
      
      this.gl.stencilFunc(0x0202,0,-1); // EQUAL
      this.gl.stencilOp(0x1E00,0x1E00,0x1E00); // KEEP,KEEP,KEEP
      this.gl.colorMask(1,1,1,1);

      // retour au culling par default
      this.setCull(this._i.opt_renderCullFace);
      this.restoreBlend(); // one, one
      this.restoreDepth(); 
    }
    
    for(i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) { 
      if(!this._i.Queuer.qsolid[i].count) continue;
      this.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_LP
      this.ambient(); // set scene ambiant parameters
      this.enable(0); // enable diffuse
      this.disable(1); // disable ambient
      this.light(this._i.Queuer.qlight[l]);
      this.bodyStack(this._i.Queuer.qsolid[i], i, false, false);
    }
    this._renderpasses++;
  }
  this.gl.disable(0x0B90); // STENCIL_TEST
  
  // Passe de rendu pour le fog
  this.switchBlend(3); // blend soustractif
  this.gl.depthMask(1); // depthMask on
  this.gl.enable(0x0B71);  // DEPTH_TEST
  this.gl.depthFunc(0x0203); // LEQUAL
  
  this.switchPipe(8,0); // PIPE_FOG_LP
  this.persp(this._i.Queuer._rcamera);
  this.ambient();  // set scene ambiant parameters
  
  for(i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    if(!this._i.Queuer.qsolid[i].count) continue;
    this.bodyStack(this._i.Queuer.qsolid[i], i, false, false);
  }
  this._renderpasses++;
}

/**
 * Draw current queue subfunction for one Passe.<br><br>
 * 
 * Draws all the current queue available in <c>Ovoid.Queuer</c>. 
 * This method does not takes argument because it get data directly from the 
 * <c>Ovoid.Queuer</c> global class. 
 */
Ovoid.Drawer.prototype.drawQueue1P = function(pipe) {

  this.setCull(this._i.opt_renderCullFace);
  this.switchBlend(3); // blending disabled
  this.switchDepth(1); // depth mask on, test less
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    if(!this._i.Queuer.qsolid[i].count) continue;
    this.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_1P
    this.persp(this._i.Queuer._rcamera);
    this.ambient(); // set scene ambiant parameters
    this.enable(0); // enable diffuse; ENd 
    this.enable(1); // enable ambient; ENa 
    this.light(this._i.Queuer.qlight);
    this.bodyStack(this._i.Queuer.qsolid[i], i, false, false);
  }
  this._renderpasses++;
}

/**
 * Draw current queue subfunction for one Passe aplha/FX objects.<br><br>
 * 
 * Draws all the current queue available in <c>Ovoid.Queuer</c>. 
 * This method does not takes argument because it get data directly from the 
 * <c>Ovoid.Queuer</c> global class. 
 */
Ovoid.Drawer.prototype.drawQueueFX = function(pipe) {

  this.switchBlend(3); // blend substractive alpha
  this.switchDepth(2); // depthMask off, depth test less
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    if(!this._i.Queuer.qalpha[i].count) continue;
    this.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_1P
    this.persp(this._i.Queuer._rcamera);
    this.ambient();   // set scene ambiant parameters
    this.light(this._i.Queuer.qlight);
    this.bodyStack(this._i.Queuer.qalpha[i], i, false, true);
  }
  this._renderpasses++;
}


/**
 * Draw current queue.<br><br>
 * 
 * Draws all the current queue available in <c>Ovoid.Queuer</c>. 
 * This method does not takes argument because it get data directly from the 
 * <c>Ovoid.Queuer</c> global class. 
 */
Ovoid.Drawer.prototype.drawQueue = function() {
  
  this.beginDraw();
  this.drawQueueRP();
  if (this._i.opt_renderPerLightPass) {
    this.drawQueueLP(this._pipeLp);
  } else {
    this.drawQueue1P(this._pipe1p);
  }
  this.drawQueueFX(this._pipe1p);
  this.drawQueueHL();
  this.endDraw();
};
