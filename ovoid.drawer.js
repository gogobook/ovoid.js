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
 * Drawer global static class.
 *
 * @namespace Drawer global class.<br><br>
 * 
 * The Drawer class implements a WebGL rendering engine. It is a global 
 * static (namespace) class. The Drawer class is the main OvoiD.JS rendering 
 * engine. It provides all the methods which are directly related to the WebGL
 * drawing pipeline.<br><br>
 * 
 * <b>Drawing Pipelines</b><br><br>
 * 
 * The Drawer uses several drawing pipelines depending on what is drawn. For 
 * example you don't draw particles like you draw common objects. This is why 
 * OvoiD.JS use several shaders.<br><br>
 * 
 * The currently implemented drawing pipelines are the following ones:<br><br>
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
 * <br>NOTE: This pipeline is used when opt_lopLevel is equal to 2 and 
 * opt_perLightPass is set to true. This pipeline is NEVER used to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-pixel n-lights shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L2_GEOMETRY_1P<br>
 * Number Id: 1<br>
 * Pipeline for one-pass per-pixel lighting shading geometry draw. 
 * <br>NOTE: This pipeline is used when opt_lopLevel is equal to 2 and 
 * opt_perLightPass is set to false and to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex 1-light shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L1_GEOMETRY_LP<br>
 * Number Id: 10<br>
 * Pipeline for per-light passes per-vertex lighting shading geometry draw.
 * <br>NOTE: This pipeline is used when opt_lopLevel is equal to 1 and 
 * opt_perLightPass is set to true. This pipeline is NEVER used to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex n-lights shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L1_GEOMETRY_1P<br>
 * Number Id: 11<br>
 * Pipeline for one-pass per-vertex lighting shading geometry draw.
 * <br>NOTE: This pipeline is used when opt_lopLevel is equal to 1 and 
 * opt_perLightPass is set to false and to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex 1-light shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L0_GEOMETRY_LP<br>
 * Number Id: 13<br>
 * Pipeline for per-light passes low-end per-vertex lighting shading geometry draw.
 * <br>NOTE: This pipeline is used when opt_lopLevel is equal to 0 and 
 * opt_perLightPass is set to true. This pipeline is NEVER used to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Per-vertex n-lights shading geometry</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_L0_GEOMETRY_1P<br>
 * Number Id: 14<br>
 * Pipeline for one-pass low-end per-vertex lighting shading geometry draw. 
 * <br>NOTE: This pipeline is used when opt_lopLevel is equal to 0 and 
 * opt_perLightPass is set to false and to draw alpha objects.
 * </li><br><br>
 * 
 * <li><b>Particles</b><br><br>
 * Symbolic constant:  Ovoid.PIPE_PARTICLE<br>
 * Number Id: 2<br>
 * Pipeline for particles draw. 
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
 * </ul><br><br>
 * 
 * <b>Custom Shaders</b><br><br>
 * 
 * The Drawer class implements ways and methodes to use several 
 * custom shaders and switch between them during the runtime.<br><br>
 * 
 * To use custom shaders you first have to add them to the drawer's stock using 
 * the <code>addShader</code> method who returns an index identifier 
 * of the added shaders. (The shader must be successfully linked and wrapped)<br><br>
 * 
 * Once shaders are in the Drawer stock, you can plug it to the desired 
 * pipeline using the <code>plugShader</code> method. This takes effect 
 * immediately.<br><br>
 * 
 * <b>Per-light passes or one passe</b><br><br>
 * 
 * The Drawer implement two drawing mechanisms, one for per-light passes and an
 * other for classical mutiple lights computed at once in one passe. Each 
 * mecanism uses a specific pipeline (*_1P for one passe and 
 * *_LP for per-light passes).<br><br>
 * 
 * <b>Solid and alpha/fx objects</b><br><br>
 * 
 * Transparent objects should not be drawn like solid/opaque objets. For this
 * reason transparent objets are drawn in a speratate stage from a specific 
 * queue (see Ovoid.Queuer for more details). The pipeline used to draw 
 * transparent objects are ALLWAYS the "one passe" pipeline (*_1P) even if the
 * opt_perLightPass option is set to true.<br><br>
 * 
 * <b>Level of performance</b><br><br>
 * 
 * The level of performance is typically a graphic quality level option. There 
 * is up to three level of performance with dedicated drawing pipeline. The 
 * level of performance can be fixed or adaptive. Adaptive level of 
 * performance is enabled through the <code>opt_adaptativeLop</code> option. To
 * set a fixed level of performance uses the <code>opt_lopLevel</code> 
 * option.<br><br>
 * 
 * <b>Render Layer</b><br><br>
 * 
 * In conjunction with Ovoid.Queuer, the Drawer class implements a Render Layer 
 * mechanism who allow to draw sequentially (one after the other) several sets 
 * of Body nodes of the same scene using different custom shaders. (This 
 * mecanism is currently implemented only for geometry pipelines 
 * Ovoid.PIPE_L2_GEOMETRY_LP, Ovoid.PIPE_L2_GEOMETRY_1P, Ovoid.PIPE_L1_GEOMETRY_LP, 
 * Ovoid.PIPE_L1_GEOMETRY_1P, Ovoid.PIPE_L0_GEOMETRY_LP and 
 * Ovoid.PIPE_L0_GEOMETRY_1P).<br><br>
 * 
 * Once you have defined the render layer of a Body 
 * node by setting its <code>renderLayer</code> variable (default value is 0), 
 * the Queuer will put each node in their defined render layer's queues which 
 * will be drawed with the shader defined for each of them.<br><br>
 * 
 * adding and plug shader inline way:<br>
 * <blockcode>
 * var id = Ovoid.Drawer.addShader("snow.vs", "snow.fs", "snow.wm");<br>
 * if( id == -1) {<br>
 * &nbsp;&nbsp;<codecomment>// error</codecomment><br>
 * }<br>
 * <codecomment>// plug custum shader to all layers of the particle pipeline</codecomment><br>
 * Ovoid.Drawer.plugShader(Ovoid.DRAWER_SP_PARTICLES, -1, id);<br>
 * </blockcode><br><br>
 * 
 * adding and plug shader preloading way:<br>
 * <blockcode>
 * <codecomment>// Here is our startup main function</codecomment><br>
 * main() {<br>
 * &nbsp;&nbsp;<codecomment>// preload the shader through the loader</codecomment><br>
 * &nbsp;&nbsp;<codecomment>// (-1 means keep in library and do not plug)</codecomment><br>
 * &nbsp;&nbsp;Ovoid.includeShader(-1, -1, "land.vs", "land_1l.fs", "custom.wm", "CUST_LANDSCAPE_LP");<br>
 * &nbsp;&nbsp;Ovoid.includeShader(-1, -1, "land.vs", "land_nl.fs", "custom.wm", "CUST_LANDSCAPE_1P");<br>
 * <br>
 * &nbsp;&nbsp;Ovoid.init("canvas");<br>
 * }<br>
 * <br>
 * <codecomment>// We define our onload function</codecomment><br>
 * Ovoid.onload = function() {<br>
 * &nbsp;&nbsp;<codecomment>// Once loaded, plug the shader where we need</codecomment><br>
 * &nbsp;&nbsp;<codecomment>// We found it through its name instead of its id</codecomment><br>
 * &nbsp;&nbsp;<codecomment>// -1 means assing to all available render layers</codecomment><br>
 * &nbsp;&nbsp;Ovoid.Drawer.plugShader(Ovoid.PIPE_L2_GEOMETRY_1P, -1, "CUST_LANDSCAPE_1P");<br>
 * &nbsp;&nbsp;Ovoid.Drawer.plugShader(Ovoid.PIPE_L2_GEOMETRY_LP, -1, "CUST_LANDSCAPE_LP");<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * adding and plug shaders to specific render layers:<br>
 * <blockcode>
 * <codecomment>// Define all landscape body at Render Layer 0</codecomment><br>
 * for(var i = 0; i < landscapes.length; i++)<br>
 * &nbsp;&nbsp;landscapes[i].renderLayer = 0;<br>
 * <codecomment>// Define all trees body at Render Layer 1</codecomment><br>
 * for(var i = 0; i < trees.length; i++)<br>
 * &nbsp;&nbsp;trees[i].renderLayer = 1;<br>
 * <br>
 * <codecomment>// Load custom shader for landscape and assing it to layer 0</codecomment><br>
 * var Slandscape = Ovoid.Drawer.addShader("land.vs", "land.fs", "custom.wm");<br>
 * if( Slandscape == -1) {<br>
 * &nbsp;&nbsp;<codecomment>// error</codecomment><br>
 * }<br>
 * Ovoid.Drawer.plugShader(Ovoid.PIPE_L2_GEOMETRY_LP, 0, Slandscape);<br>
 * Ovoid.Drawer.plugShader(Ovoid.PIPE_L1_GEOMETRY_LP, 0, Slandscape);<br>
 * Ovoid.Drawer.plugShader(Ovoid.PIPE_L0_GEOMETRY_LP, 0, Slandscape);<br>
 * <br>
 * <codecomment>// Load custom shader for trees and assing it to layer 1</codecomment><br>
 * var Strees = Ovoid.Drawer.addShader("tree.vs", "tree.fs", "custom.wm");<br>
 * if( Strees == -1) {<br>
 * &nbsp;&nbsp;<codecomment>// error</codecomment><br>
 * }<br>
 * Ovoid.Drawer.plugShader(Ovoid.PIPE_L2_GEOMETRY_LP, 1, Strees);<br>
 * Ovoid.Drawer.plugShader(Ovoid.PIPE_L1_GEOMETRY_LP, 1, Strees);<br>
 * Ovoid.Drawer.plugShader(Ovoid.PIPE_L0_GEOMETRY_LP, 1, Strees);<br>
 * </blockcode><br><br>
 * 
 * For more informations about shaders link and wrapping see the 
 * <code>Ovoid.Shader</code> object documentation page.<br><br>
 * 
 * <b>Picking modes</b><br><br>
 * 
 * OvoiD.JS implements a mouse picking system trough specific render passe in
 * hidden render buffer. The Picking mode is set through the 
 * <code>Drawer.opt_pickingMode</code>.<br><br>
 * 
 * The picking can be enabled for world objects only, overlay objects only, both
 * world and overlay objects using the Ovoid.RP_WORLD and/or Ovoid.RP_OVERLAY 
 * bitmask options, or disabled by setting <code>Drawer.opt_pickingMode</code> 
 * to <code>0</code>.<br><br>
 * 
 * <blockcode>
 * <codecomment>// Enable picking for both world and overlay objects</codecomment><br>
 * Ovoid.Drawer.opt_pickingMode = Ovoid.RP_WORLD|Ovoid.RP_OVERLAY;<br>
 * </blockcode><br><br>
 * 
 */
Ovoid.Drawer = {};


/** Clearing buffer color */
Ovoid.Drawer.opt_clearColor = [1.0, 1.0, 1.0, 1.0];


/** Global ambient lighting color */
Ovoid.Drawer.opt_ambientColor = [0.2, 0.2, 0.2, 1.0];


/** Global fog/atmosphere color */
Ovoid.Drawer.opt_fogColor = [1.0, 1.0, 1.0, 1.0];


/** Global fog/atmosphere density */
Ovoid.Drawer.opt_fogDensity = 0.0;


/** Picking mode. */
Ovoid.Drawer.opt_pickingMode = 0;


/** Level of performance */
Ovoid.Drawer.opt_lopLevel = 2;


/** Enable adaptative level of performance */
Ovoid.Drawer.opt_adaptativeLop = true;


/** Adaptative level of performance threshold */
Ovoid.Drawer.opt_adaptiveLopThreshold = 45;


/** Enable per-light pass rendering (required for shadow casting) */
Ovoid.Drawer.opt_perLightPass = true;


/** Enable Z-fail shadow casting rendering */
Ovoid.Drawer.opt_shadowCasting = true;


/** Minimum average size to build shadow volum for */
Ovoid.Drawer.opt_shadowCastingExclusion = 2.0;


/** Enable layers drawing */
Ovoid.Drawer.opt_drawLayers = true;


/** Enable helpers drawing */
Ovoid.Drawer.opt_drawHelpers = false;


/** Enable axis drawing */
Ovoid.Drawer.opt_drawAxis = false;


/** Enable bounding box drawing */
Ovoid.Drawer.opt_drawBoundingBox = false;


/** Enable bounding _sphere drawing */
Ovoid.Drawer.opt_drawBoundingSphere = false;


/** Enable joint helpers drawing */
Ovoid.Drawer.opt_drawJointBones = false;


/** Enable light helpers drawing */
Ovoid.Drawer.opt_drawLights = false;


/** Enable camera helpers drawing */
Ovoid.Drawer.opt_drawCameras = false;


/** Enable face normal drawing */
Ovoid.Drawer.opt_drawNormals = false;


/** Joint helpers's size */
Ovoid.Drawer.opt_jointSize = 1.0;

/** Normals scale */
Ovoid.Drawer.opt_normalScale = 0.7;


/** WebGL rendrer informations **/
Ovoid.Drawer.glInfo = {};


/** Drawn mesh polyset count since the last begin draw. */
Ovoid.Drawer._drawnpolyset = 0;


/** Drawn dynamic buffer count since the last begin draw. */
Ovoid.Drawer._drawndynamic = 0;


/** Drawn sprite buffer count since the last begin draw. */
Ovoid.Drawer._drawnsprite = 0;


/** Drawn symbolic buffer count since the last begin draw. */
Ovoid.Drawer._drawnsymbolic = 0;


/** Drawn character string count since the last begin draw. */
Ovoid.Drawer._drawnchar = 0;


/** Drawn particle count since the last begin draw. */
Ovoid.Drawer._drawnparticle = 0;


/** Drawn shadow volume count since the last begin draw. */
Ovoid.Drawer._drawnshadow = 0;


/** Render passes count since the last begin draw. */
Ovoid.Drawer._renderpasses = 0;


/** Theme colors **/
Ovoid.Drawer._tcolor = Ovoid.Color.newArray(12);
/* white */
Ovoid.Drawer._tcolor[0].set(1.0,1.0,1.0,1.0);
/* black */
Ovoid.Drawer._tcolor[1].set(0.0,0.0,0.0,1.0);
/* grey */
Ovoid.Drawer._tcolor[2].set(0.5,0.5,0.5,1.0);
/* red */
Ovoid.Drawer._tcolor[3].set(1.0,0.0,0.0,1.0);
/* orange */
Ovoid.Drawer._tcolor[4].set(1.0,0.5,0.0,1.0);
/* yellow */
Ovoid.Drawer._tcolor[5].set(1.0,1.0,0.0,1.0);
/* light-green */
Ovoid.Drawer._tcolor[6].set(0.5,1.0,0.5,1.0);
/* green */
Ovoid.Drawer._tcolor[7].set(0.0,1.0,0.0,1.0);
/* cyan */
Ovoid.Drawer._tcolor[8].set(0.3,0.6,1.0,1.0);
/* blue */
Ovoid.Drawer._tcolor[9].set(0.0,0.0,1.0,1.0);
/* indigo */
Ovoid.Drawer._tcolor[10].set(0.5,0.0,1.0,1.0);
/* magenta */
Ovoid.Drawer._tcolor[11].set(0.1,0.0,1.0,1.0);


/** Default blank material **/
Ovoid.Drawer._mblank = null;


/** Default blank texture **/
Ovoid.Drawer._tblank = null;


/** Default font mapping texture **/
Ovoid.Drawer._tfontm = null;


/** Primitives buffer handles array **/
Ovoid.Drawer._bprimitive = null;


/** Dynamic temporary buffer handle **/
Ovoid.Drawer._bdynamic = null;


/** Picking frame buffer handle **/
Ovoid.Drawer._fbrpixel = null;


/** Shader program stock **/
Ovoid.Drawer._splib = new Array();


/** Shader program pipes **/
Ovoid.Drawer._sppipe = new Array(Ovoid.MAX_RENDER_LAYER);


/** Current used shader program **/
Ovoid.Drawer.sp = null;


/** Pipe swapper **/
Ovoid.Drawer._swpipe = new Array(2);


/** Layer swapper **/
Ovoid.Drawer._swlayer = new Array(2);


/** Shader swapper **/
Ovoid.Drawer._swshader = new Array(2);


/** Blend swapper **/
Ovoid.Drawer._swblend = new Array(2);


/** Depth swapper **/
Ovoid.Drawer._swdepth = new Array(2);


/** Internal ambiant color **/
Ovoid.Drawer._abcolor = new Float32Array(4);


/** Internal fog color **/
Ovoid.Drawer._fogcolor = new Float32Array(4);


/** Picking readed pixel buffer. */
Ovoid.Drawer._rpcolor = new Uint8Array(256);


/** Picking readed pixel depth. */
Ovoid.Drawer._rpdepth = new Float32Array(1);


/** Level of performance for geometry drawing. */
Ovoid.Drawer._lop = 2;


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
Ovoid.Drawer.init = function() {

  Ovoid.log(3, 'Ovoid.Drawer', 'initialization');
  
  Ovoid._clearGlerror();
  
  /* performance counter */
  var t = (new Date().getTime());
  
  /* recupere les informations du renderer */
  Ovoid.Drawer.glInfo.VENDOR = Ovoid.gl.getParameter(Ovoid.gl.VENDOR);
  Ovoid.log(3, 'Ovoid.Drawer', 'VENDOR : ' + Ovoid.Drawer.glInfo.VENDOR);
  Ovoid.Drawer.glInfo.VERSION = Ovoid.gl.getParameter(Ovoid.gl.VERSION);
  Ovoid.log(3, 'Ovoid.Drawer', 'VERSION : ' + Ovoid.Drawer.glInfo.VERSION);
  Ovoid.Drawer.glInfo.SHADING_LANGUAGE_VERSION = Ovoid.gl.getParameter(Ovoid.gl.SHADING_LANGUAGE_VERSION);
  Ovoid.log(3, 'Ovoid.Drawer', 'SHADING_LANGUAGE_VERSION : ' + Ovoid.Drawer.glInfo.SHADING_LANGUAGE_VERSION);
  Ovoid.Drawer.glInfo.MAX_TEXTURE_IMAGE_UNITS = Ovoid.gl.getParameter(Ovoid.gl.MAX_TEXTURE_IMAGE_UNITS);
  Ovoid.log(3, 'Ovoid.Drawer', 'MAX_TEXTURE_IMAGE_UNITS : ' + Ovoid.Drawer.glInfo.MAX_TEXTURE_IMAGE_UNITS);
  Ovoid.Drawer.glInfo.MAX_COMBINED_TEXTURE_IMAGE_UNITS = Ovoid.gl.getParameter(Ovoid.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  Ovoid.log(3, 'Ovoid.Drawer', 'MAX_COMBINED_TEXTURE_IMAGE_UNITS : ' + Ovoid.Drawer.glInfo.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  Ovoid.Drawer.glInfo.MAX_VARYING_VECTORS = Ovoid.gl.getParameter(Ovoid.gl.MAX_VARYING_VECTORS);
  Ovoid.log(3, 'Ovoid.Drawer', 'MAX_VARYING_VECTORS : ' + Ovoid.Drawer.glInfo.MAX_VARYING_VECTORS);
  Ovoid.Drawer.glInfo.MAX_VERTEX_ATTRIBS = Ovoid.gl.getParameter(Ovoid.gl.MAX_VERTEX_ATTRIBS);
  Ovoid.log(3, 'Ovoid.Drawer', 'MAX_VERTEX_ATTRIBS : ' + Ovoid.Drawer.glInfo.MAX_VERTEX_ATTRIBS);
  Ovoid.Drawer.glInfo.MAX_VERTEX_UNIFORM_VECTORS = Ovoid.gl.getParameter(Ovoid.gl.MAX_VERTEX_UNIFORM_VECTORS);
  Ovoid.log(3, 'Ovoid.Drawer', 'MAX_VERTEX_UNIFORM_VECTORS : ' + Ovoid.Drawer.glInfo.MAX_VERTEX_UNIFORM_VECTORS);
  Ovoid.Drawer.glInfo.MAX_FRAGMENT_UNIFORM_VECTORS = Ovoid.gl.getParameter(Ovoid.gl.MAX_FRAGMENT_UNIFORM_VECTORS);
  Ovoid.log(3, 'Ovoid.Drawer', 'MAX_FRAGMENT_UNIFORM_VECTORS : ' + Ovoid.Drawer.glInfo.MAX_FRAGMENT_UNIFORM_VECTORS);
  Ovoid.Drawer.glInfo.MAX_VERTEX_TEXTURE_IMAGE_UNITS = Ovoid.gl.getParameter(Ovoid.gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  Ovoid.log(3, 'Ovoid.Drawer', 'MAX_VERTEX_TEXTURE_IMAGE_UNITS : ' + Ovoid.Drawer.glInfo.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  
  /* toutes les textures flip en Y */
  Ovoid.gl.pixelStorei(Ovoid.gl.UNPACK_FLIP_Y_WEBGL, true);
  
  /* Nouvelle texture blank */
  Ovoid.Drawer._tblank = new Ovoid.Texture("blank");
  var px = new Uint8Array(256); /* (8 * 8 * RGBA) */
  for (var i = 0; i < 256; i++) px[i] = 255;
  Ovoid.Drawer._tblank.create2d(Ovoid.gl.RGBA, 8, 8, px);
  Ovoid.Drawer._tblank.setFilter(false);
  
  if (Ovoid._logGlerror('Ovoid.Drawer.init:: Blank texture creation'))
    return false;
    
  /* fontmap par defaut */
  Ovoid.Drawer._tfontm = new Ovoid.Texture("fontm");
  Ovoid.Drawer._tfontm.loadSource(Ovoid.opt_defaultFontmapUrl,
                          Ovoid.opt_defaultFontmapFilter,true);
  
  if (Ovoid._logGlerror('Ovoid.Drawer.init:: Font map creation'))
    return false;
  
  /* material blank */
  Ovoid.Drawer._mblank = new Ovoid.Material();

  /* Cree les buffers de primitives */
  var buffdata;
  Ovoid.Drawer._bprimitive = new Array(6);
  
  /* Sprite triangle */ 
  buffdata = [0.0,0.0,0.0,1.0,0.0,1.0,0.0, 0.0,1.0,0.0,1.0,0.0,0.0,0.0,
            1.0,1.0,0.0,1.0,1.0,0.0,0.0, 0.0,0.0,0.0,1.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,1.0,0.0,0.0, 1.0,0.0,0.0,1.0,1.0,1.0,0.0];
            
  Ovoid.Drawer._bprimitive[0] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[0]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
  
  /* Billboard (triangle-strip) */ 
  buffdata = [-0.5,-0.5,0.0,0.0,0.0,1.0,0.0, -0.5,0.5,0.0,0.0,0.0,0.0,0.0,
            0.5,-0.5,0.0,0.0,1.0,1.0,0.0, 0.5,0.5,0.0,0.0,1.0,0.0,0.0];
            
  Ovoid.Drawer._bprimitive[6] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[6]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
  
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
    
  Ovoid.Drawer._bprimitive[1] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[1]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
  
  /* Symbolic sphere */
  buffdata = Ovoid.Vertex.newArray(24 * 3 * 2);

  var sd = 24.0;
  var sinI, cosI, sinII, cosII;

  var ix, iy, iz;

  var j = 0;
  for (var i = 0; i < 24 * 2; i += 2)
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
  
  Ovoid.Drawer._bprimitive[2] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[2]);
  Ovoid.gl.bufferData(0x8892,
      Ovoid.Vertex.bufferize(Ovoid.VERTEX_VEC4_P|Ovoid.VERTEX_VEC4_C,buffdata),
      0x88E4);
  
  /* Tricolor axis */
  buffdata = [0.0,0.0,0.0,1.0,1.0,0.0,0.0,1.0, 0.25,0.0,0.0,1.0,1.0,0.0,0.0,1.0, 
     0.0,0.0,0.0,1.0,0.0,1.0,0.0,1.0, 0.0,0.25,0.0,1.0,0.0,1.0,0.0,1.0, 
     0.0,0.0,0.0,1.0,0.0,0.0,1.0,1.0, 0.0,0.0,0.25,1.0,0.0,0.0,1.0,1.0];
  
  Ovoid.Drawer._bprimitive[3] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[3]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);

  /* Symbolic pyramid */
  buffdata = [0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, 0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, -0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0, 0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, -0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    -0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0, -0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    -0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 
    0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0, 0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0];
  
  Ovoid.Drawer._bprimitive[4] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[4]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
    
  /* Symbolic star */
  buffdata = [0.25,0.0,0.0,1.0,1.0,1.0,1.0,1.0, -0.25,0.0,0.0,1.0,1.0,1.0,1.0,1.0, 
  0.0,0.25,0.0,1.0,1.0,1.0,1.0,1.0, 0.0,-0.25,0.0,1.0,1.0,1.0,1.0,1.0, 
  0.0,0.0,0.25,1.0,1.0,1.0,1.0,1.0, 0.0,0.0,-1.0,1.0,1.0,1.0,1.0,1.0, 
  0.125,0.125,0.125,1.0,1.0,1.0,1.0,1.0, -0.125,-0.125,-0.125,1.0,1.0,1.0,1.0,1.0, 
  -0.125,0.125,0.125,1.0,1.0,1.0,1.0,1.0, 0.125,-0.125,-0.125,1.0,1.0,1.0,1.0,1.0];
  
  Ovoid.Drawer._bprimitive[5] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[5]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);

  if (Ovoid._logGlerror('Ovoid.Drawer.init:: Primitive buffer creation'))
    return false;
    
  /* Cree le buffer dynamique temporaire */  
  Ovoid.Drawer._bdynamic = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bdynamic);
  Ovoid.gl.bufferData(0x8892,new Float32Array(9),0x88E8);
  
  if (Ovoid._logGlerror('Ovoid.Drawer.init:: Dynamic buffer creation'))
    return false;
    
  /* unbind les buffers */
  Ovoid.gl.bindBuffer(0x8892, null);
  Ovoid.gl.bindBuffer(0x8893, null);
  
  /* Creation du frame buffer pour le picking */
  
  /* Frame buffer render texture */
  var x = Ovoid.PICKING_OFFSCREEN_FRAME_X;
  var y = Ovoid.PICKING_OFFSCREEN_FRAME_Y;
  var rdrtex = Ovoid.gl.createTexture();
  Ovoid.gl.bindTexture(0x0DE1, rdrtex);
  Ovoid.gl.texImage2D(0x0DE1,0,0x1908,x,y,0,0x1908,0x1401,null);
  
  Ovoid.gl.bindTexture(0x0DE1, null);
  
  /* Frame buffer render buffer */
  var rdrbuf = Ovoid.gl.createRenderbuffer();
  Ovoid.gl.bindRenderbuffer(0x8D41, rdrbuf);
  Ovoid.gl.renderbufferStorage(0x8D41,0x81A5,x,y);
      
  Ovoid.gl.bindRenderbuffer(0x8D41, null);
  
  /* Frame buffer */
  Ovoid.Drawer._fbrpixel = Ovoid.gl.createFramebuffer();
  Ovoid.gl.bindFramebuffer(0x8D40, Ovoid.Drawer._fbrpixel);
  Ovoid.gl.framebufferTexture2D(0x8D40,0x8CE0,0x0DE1,rdrtex,0);
  Ovoid.gl.framebufferRenderbuffer(0x8D40,0x8D00,0x8D41,rdrbuf);
      
  Ovoid.gl.bindFramebuffer(0x8D40, null);

  if (Ovoid._logGlerror('Ovoid.Drawer.init:: RP Frame buffer creation'))
    return false;

  /* Construit le tableau de pipeline */
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    Ovoid.Drawer._sppipe[i] = new Array();
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
  */

  sp = new Ovoid.Shader("PIPE_L2_GEOMETRY_LP");
  sp.setSources(Ovoid.GLSL_PNUIW_HYBRID_VS, Ovoid.GLSL_AERDS_FULLTEX_LP_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_L2_GEOMETRY_LP pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(0,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_L2_GEOMETRY_1P");
  sp.setSources(Ovoid.GLSL_PNUIW_HYBRID_VS, Ovoid.GLSL_AERDS_FULLTEX_1P_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_L2_GEOMETRY_1P pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(1,-1,Ovoid.Drawer.addShader(sp));

  sp = new Ovoid.Shader("PIPE_L1_GEOMETRY_LP");
  sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_LP_VS, Ovoid.GLSL_VL_AERDS_FULLTEX_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_L1_GEOMETRY_LP pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(10,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_L1_GEOMETRY_1P");
  sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_1P_VS, Ovoid.GLSL_VL_AERDS_FULLTEX_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_L1_GEOMETRY_1P pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(11,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_L0_GEOMETRY_LP");
  sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_LP_VS, Ovoid.GLSL_VL_ADS_1TEX_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_L0_GEOMETRY_LP pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(13,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_L0_GEOMETRY_1P");
  sp.setSources(Ovoid.GLSL_VL_PNUIW_HYBRID_1P_VS, Ovoid.GLSL_VL_ADS_1TEX_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_L0_GEOMETRY_1P pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(14,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_PARTICLE");
  sp.setSources(Ovoid.GLSL_PUC_PARTICLE_VS, Ovoid.GLSL_VC_TEX_PARTICLE_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_PARTICLE pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(2,-1,Ovoid.Drawer.addShader(sp));

  sp = new Ovoid.Shader("PIPE_LAYER");
  sp.setSources(Ovoid.GLSL_PU_VS, Ovoid.GLSL_C_TEX_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_LAYER pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(3,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_STRING");
  sp.setSources(Ovoid.GLSL_P_ZWSRING_VS, Ovoid.GLSL_C_TEX_STRING_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_STRING pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(4,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_HELPER");
  sp.setSources(Ovoid.GLSL_PC_VS, Ovoid.GLSL_VCC_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_HELPER pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(5,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_SHADOW_VOLUME");
  sp.setSources(Ovoid.GLSL_P_VS, Ovoid.GLSL_BLACK_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_SHADOW_VOLUME pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(6,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_BILLBOARD");
  sp.setSources(Ovoid.GLSL_PU_BILLBOARD_VS, Ovoid.GLSL_C_TEX_BILLBOARD_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_BILLBOARD pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(7,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_RP_GEOMETRY");
  sp.setSources(Ovoid.GLSL_PIW_HYBRID_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_RP_GEOMETRY pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(20,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_RP_PARTICLE");
  sp.setSources(Ovoid.GLSL_PU_PARTICLE_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_RP_PARTICLE pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(22,-1,Ovoid.Drawer.addShader(sp));
 
  sp = new Ovoid.Shader("PIPE_RP_LAYER");
  sp.setSources(Ovoid.GLSL_P_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_RP_LAYER pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(23,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_RP_STRING");
  sp.setSources(Ovoid.GLSL_P_ZSRING_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_RP_STRING pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(24,-1,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("PIPE_RP_BILLBOARD");
  sp.setSources(Ovoid.GLSL_PU_BILLBOARD_VS, Ovoid.GLSL_C_ADEPTH_FS, Ovoid.GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default PIPE_RP_BILLBOARD pipeline shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(27,-1,Ovoid.Drawer.addShader(sp));
  
  if (Ovoid._logGlerror('Ovoid.Drawer.init:: Shader program creation.'))
    return false;
    
  /* Initialization des parameteres WebGL par defaut */
  Ovoid.gl.viewport(0, 0, Ovoid.Frame.size.v[0], Ovoid.Frame.size.v[1]);
  Ovoid.gl.clear(0x4000|0x100); /* COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT*/
  
  // Blend soustractif 
  Ovoid.gl.enable(0x0BE2); // BLEND
  Ovoid.gl.blendFunc(0x0302, 0x0303); // SRC_ALPHA, ONE_MINUS_SRC_ALPHA
  /* geometrie */
  Ovoid.gl.lineWidth(1.0);
  /* face culling par defaut */
  Ovoid.gl.disable(0x0B44); // CULL_FACE
  Ovoid.gl.cullFace(0x0405); // BACK
  /* Cconfiguration depth par defaut */
  Ovoid.gl.depthMask(1);
  Ovoid.gl.enable(0x0B71); // DEPTH_TEST
  Ovoid.gl.depthFunc(0x0201); // LESS
  /* configuration du stencil */
  Ovoid.gl.disable(0x0B90); /* STENCIL_TEST */ 
  
  if (Ovoid._logGlerror('Ovoid.Drawer.init:: Default settings'))
    return false;
  
  Ovoid.log(3, 'Ovoid.Drawer', 'initialized in: ' + 
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
Ovoid.Drawer.addShader = function(sp) {
  
  if ( !sp.linkStatus ) {
    Ovoid.log(2, 'Ovoid.Drawer', "Adding shader '" + 
      sp.name + "' fail, shader is not linked");
    return -1;
  }
  var i = Ovoid.Drawer._splib.length;
  Ovoid.Drawer._splib.push(sp);
  Ovoid.log(3, 'Ovoid.Drawer', "Adding shader '" + 
     sp.name + "' in stock with id:" + i);
  return i;
};


/**
 * Plug a shader to drawing pipeline.<br><br>
 * 
 * Plugs the specified shader index to the desired drawing pipeline slot. Index
 * must corresponds to an existing shader in the stock.
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
 * @param {int|string} id Shader index or shader name.
 * 
 * @return {bool} True if plug succeeds, false if id is not a valid index.
 */
Ovoid.Drawer.plugShader = function(pipe, layer, id) {
  
  if(layer > Ovoid.MAX_RENDER_LAYER) {
    Ovoid.log(2, "Ovoid.Drawer", "Invalid layer index");
    return false;
  }
  if(typeof(id) == "number") {
    if(!Ovoid.Drawer._splib[id]) {
      Ovoid.log(2, "Ovoid.Drawer", "No such shader with id " + id);
      return false;
    }
  } else if (typeof(id) == 'string') {
    var f = -1;
    for(var i = 0; i < Ovoid.Drawer._splib.length; i++) {
      if(Ovoid.Drawer._splib[i].name == id) {
        f = i;
        break;
      }
    }
    if(f < 0.0) {
      Ovoid.log(2, "Ovoid.Drawer", "No such shader with name " + id);
      return false;
    }
    id = f;
  }
  
  if(layer == -1) {
    Ovoid.log(3, "Ovoid.Drawer", 
        "Plug shader "+id+" to pipe "+pipe+" for all layers");
    for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
      Ovoid.Drawer._sppipe[i][pipe] = id;
    }
  } else {
    Ovoid.log(3, "Ovoid.Drawer", 
        "Plug shader "+id+" to pipe "+pipe+" for layer "+layer);
    Ovoid.Drawer._sppipe[layer][pipe] = id;
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
Ovoid.Drawer.switchSp = function(id) {

  Ovoid.Drawer._swshader[0] = Ovoid.Drawer._swshader[1];
  Ovoid.Drawer._swshader[1] = id;
  Ovoid.Drawer.sp = Ovoid.Drawer._splib[id];
  Ovoid.Drawer.sp.use();
};


/**
 * Restore shader program.<br><br>
 * 
 * Restores the last previous used shader program.
 */
Ovoid.Drawer.restorSp = function() {
  
  Ovoid.Drawer.switchSp(Ovoid.Drawer._swshader[0]);
};


/**
 * Switch drawing pipeline.<br><br>
 * 
 * Switch the current drawing pipeline to the specified one.
 * 
 * @param {int} id Pipeline id to switch.
 * @param {int} layer Render layer index to switch.
 */
Ovoid.Drawer.switchPipe = function(id, layer) {

  Ovoid.Drawer._swpipe[0] = Ovoid.Drawer._swpipe[1];
  Ovoid.Drawer._swpipe[1] = id;
  Ovoid.Drawer._swlayer[0] = Ovoid.Drawer._swlayer[1];
  Ovoid.Drawer._swlayer[1] = layer;
  
  Ovoid.Drawer.sp = Ovoid.Drawer._splib[Ovoid.Drawer._sppipe[layer][id]];
  Ovoid.Drawer.sp.use();
};


/**
 * Restore drawing pipeline.<br><br>
 * 
 * Restores the last previous used drawing pipeline.
 */
Ovoid.Drawer.restorePipe = function() {
  
  Ovoid.Drawer.switchPipe(Ovoid.Drawer._swpipe[0], Ovoid.Drawer._swlayer[0]);
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
Ovoid.Drawer.switchBlend = function(id) {

  Ovoid.Drawer._swblend[0] = Ovoid.Drawer._swblend[1];
  Ovoid.Drawer._swblend[1] = id;
  switch(id)
  {
    case 0: 
      Ovoid.gl.disable(0x0BE2);
    return;
    case 1:
      // Blend alpha additif
      Ovoid.gl.enable(0x0BE2);
      Ovoid.gl.blendFunc(0x0302, 1);
    return;
    case 2:
      // Blend couleur additive
      Ovoid.gl.enable(0x0BE2);
      Ovoid.gl.blendFunc(1, 1);
    return;
    default:
      // Blend soustractif 
      Ovoid.gl.enable(0x0BE2);
      Ovoid.gl.blendFunc(0x0302, 0x0303);
    return;
  }
};


/**
 * Restore blend parameters.<br><br>
 * 
 * Restores the last previous used blend parameters.
 */
Ovoid.Drawer.restoreBlend = function() {
  
  Ovoid.Drawer.switchBlend(Ovoid.Drawer._swblend[0]);
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
Ovoid.Drawer.switchDepth = function(id) {

  Ovoid.Drawer._swdepth[0] = Ovoid.Drawer._swdepth[1];
  Ovoid.Drawer._swdepth[1] = id;
  switch(id)
  {
    case 0: 
      Ovoid.gl.depthMask(0);
      Ovoid.gl.disable(0x0B71);
    return;
    case 1:
      Ovoid.gl.depthMask(1);
      Ovoid.gl.enable(0x0B71);
      Ovoid.gl.depthFunc(0x0201);
    return;
    case 2:
      Ovoid.gl.depthMask(0);
      Ovoid.gl.enable(0x0B71);
      Ovoid.gl.depthFunc(0x0201);
    return;
    case 4:
      Ovoid.gl.depthMask(0);
      Ovoid.gl.enable(0x0B71);
      Ovoid.gl.depthFunc(0x0202);
    return;
    default:
      Ovoid.gl.depthMask(0);
      Ovoid.gl.enable(0x0B71);
      Ovoid.gl.depthFunc(0x0203);
    return;
  }
};


/**
 * Restore depth parameters.<br><br>
 * 
 * Restores the last previous used depth parameters.
 */
Ovoid.Drawer.restoreDepth = function() {
  
  Ovoid.Drawer.switchDepth(Ovoid.Drawer._swdepth[0]);
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
Ovoid.Drawer.setCull = function(id) {

  Ovoid.Drawer._swdepth[0] = Ovoid.Drawer._swdepth[1];
  Ovoid.Drawer._swdepth[1] = id;
  switch(id)
  {
    case 0: 
      Ovoid.gl.disable(0x0B44); // CULL_FACE
    return;
    case 2:
      Ovoid.gl.enable(0x0B44); // CULL_FACE
      Ovoid.gl.cullFace(0x0404); // FRONT
    return;
    default:
      Ovoid.gl.enable(0x0B44); // CULL_FACE
      Ovoid.gl.cullFace(0x0405); // BACK
    return;
  }
};


/**
 * Begin draw session.<br><br>
 * 
 * Initializes for a new drawing session.
 */
Ovoid.Drawer.beginDraw = function() {
  
  /* performance counter */
  Ovoid.Drawer._pc = (new Date().getTime());
  
  if (Ovoid.Frame.changed) {
    Ovoid.gl.viewport(0,0,Ovoid.Frame.size.v[0],Ovoid.Frame.size.v[1]);
  }
  
  /* ambient color par defaut */
  var c;
  c = Ovoid.Drawer.opt_ambientColor;
  Ovoid.Drawer._abcolor[0] = c[0];
  Ovoid.Drawer._abcolor[1] = c[1];
  Ovoid.Drawer._abcolor[2] = c[2];
  Ovoid.Drawer._abcolor[3] = c[3];
  /* fog color si necessaire */
  if(Ovoid.Drawer.opt_fogDensity > 0.0) {
    c = Ovoid.Drawer.opt_fogColor;
    Ovoid.Drawer._fogcolor[0] = c[0];
    Ovoid.Drawer._fogcolor[1] = c[1];
    Ovoid.Drawer._fogcolor[2] = c[2];
    Ovoid.Drawer._fogcolor[3] = c[3];
  }

  c = Ovoid.Drawer.opt_clearColor;
  Ovoid.gl.clearColor(c[0],c[1],c[2],c[3]);
  
  Ovoid.gl.depthMask(1);
  Ovoid.gl.clear(0x4000|0x100); /* COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT*/
  
  Ovoid.Drawer._drawnpolyset = 0;
  Ovoid.Drawer._drawnparticle = 0;
  Ovoid.Drawer._renderpasses = 0;
  Ovoid.Drawer._drawndynamic = 0;
  Ovoid.Drawer._drawnsprite = 0;
  Ovoid.Drawer._drawnsymbolic = 0;
  Ovoid.Drawer._drawnchar = 0;
  Ovoid.Drawer._drawnshadow = 0;
  
  // setup le level of performance
  if (Ovoid.Drawer.opt_adaptativeLop) {
    if (Ovoid.Timer._lopfps < Ovoid.Drawer.opt_adaptiveLopThreshold) {
      Ovoid.Drawer._lop--;
      Ovoid.Timer._lopfps = Ovoid.Drawer.opt_adaptiveLopThreshold;
    }
    if (Ovoid.Timer._lopfps >= 59)
      Ovoid.Drawer._lop++;
    if (Ovoid.Drawer._lop > Ovoid.Drawer.opt_lopLevel) 
      Ovoid.Drawer._lop = Ovoid.Drawer.opt_lopLevel;
    if (Ovoid.Drawer._lop < 0) 
      Ovoid.Drawer._lop = 0;
  } else {
    Ovoid.Drawer._lop = Ovoid.Drawer.opt_lopLevel;
  }
};


/**
 * End draw session.<br><br>
 * 
 * Conclude the current drawing session.
 */
Ovoid.Drawer.endDraw = function() {

  /* Sais pas si c'est très utile... */
  Ovoid.gl.flush();
};


/**
 * Begin readPixels draw session.<br><br>
 * 
 * Initializes for a new readPixels drawing sub-session.
 */
Ovoid.Drawer.beginRpDraw = function() {
  
  Ovoid.gl.bindFramebuffer(0x8D40, Ovoid.Drawer._fbrpixel); /* FRAMEBUFFER */
  /* clear avec un fond noir */
  Ovoid.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  Ovoid.gl.clear(0x4000|0x100); /* COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT*/
}

/**
 * End readPixels draw session.<br><br>
 * 
 * Conclude the current readPixels drawing sub-session.
 */
Ovoid.Drawer.endRpDraw = function() {
    
    /* Read pixel a la position du pointeur actuel */
    Ovoid.gl.readPixels(Ovoid.Input.mousePosition.v[0],
        (Ovoid.Frame.size.v[1] - Ovoid.Input.mousePosition.v[1]),
        1,1,0x1908,0x1401,/* RGBA, UNSIGNED_BYTE */
        Ovoid.Drawer._rpcolor);
        
    Ovoid.gl.bindFramebuffer(0x8D40, null); /* FRAMEBUFFER */
    
    Ovoid.Input.mouseLeaveUid = Ovoid.Input.mouseOverUid;
    
    /* convertis RGB en entier */
    Ovoid.Input.mouseOverUid = 0x000000 |
        ((Ovoid.Drawer._rpcolor[0]) << 16) |
        ((Ovoid.Drawer._rpcolor[1]) << 8) |
        ((Ovoid.Drawer._rpcolor[2]));
    
    Ovoid.Drawer._rpdepth[0] = (Ovoid.Drawer._rpcolor[3] / 255);
    
    /* calcule l'unproject */
    Ovoid.Queuer._rcamera.unproject(Ovoid.Input.mousePosition.v[0],
        (Ovoid.Frame.size.v[1] - Ovoid.Input.mousePosition.v[1]),
        Ovoid.Drawer._rpdepth[0],
        Ovoid.Input.mouseCursor);
        
    if(Ovoid.Input.mouseLeaveUid != Ovoid.Input.mouseOverUid) {
      Ovoid.Input.mouseEnterUid = Ovoid.Input.mouseOverUid;
    } else {
      Ovoid.Input.mouseEnterUid = Ovoid.Input.mouseLeaveUid = 0;
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
Ovoid.Drawer.light = function(light) {
  
  if (light.count) { /* stack ? */
    var c = Ovoid.MAX_LIGHT_BY_DRAW;
    /* A priori recréer les array à chaque frame a un impact negligable
     * sur les performances, surtout vu la taille des arrays */
    var lp = new Float32Array(4*c);
    var ld = new Float32Array(3*c);
    var lc = new Float32Array(4*c);
    var li = new Float32Array(c);
    var lr = new Float32Array(c);
    var lf = new Float32Array(c);
    var la = new Float32Array(c);
    var le = new Int32Array(c);
    
    for (var i = 0; i < Ovoid.MAX_LIGHT_BY_DRAW; i++) {
      if (i < light.count) {
        lp.set(light[i].worldPosition.v, i*4);
        ld.set(light[i].worldDirection.v, i*3); 
        lc.set(light[i].color.v, i*4);
        li[i] = light[i].intensity;
        lr[i] = light[i].range;
        lf[i] = light[i].falloff;
        la[i] = light[i].spotAngle;
        le[i] = 1; /*enabled*/
      } else {
        le[i] = 0; /*enabled*/
      }
    }
    
    Ovoid.Drawer.sp.setUniform4fv(20, lp); /*position*/
    Ovoid.Drawer.sp.setUniform3fv(21, ld); /*direction*/
    Ovoid.Drawer.sp.setUniform4fv(22, lc); /*color*/
    Ovoid.Drawer.sp.setUniform1fv(23, li); /*intensity*/
    Ovoid.Drawer.sp.setUniform1fv(24, lr); /*range*/
    Ovoid.Drawer.sp.setUniform1fv(25, lf); /*falloff*/
    Ovoid.Drawer.sp.setUniform1fv(26, la); /*spotangle*/
    Ovoid.Drawer.sp.setUniform1iv(28, le); /*enabled*/
    
  } else {
    if (light.type) {
      Ovoid.Drawer.sp.setUniform4fv(20, light.worldPosition.v);
      Ovoid.Drawer.sp.setUniform3fv(21, light.worldDirection.v);
      Ovoid.Drawer.sp.setUniform4fv(22, light.color.v);
      Ovoid.Drawer.sp.setUniform1f(23, light.intensity);
      Ovoid.Drawer.sp.setUniform1f(24, light.range);
      Ovoid.Drawer.sp.setUniform1f(25, light.falloff);
      Ovoid.Drawer.sp.setUniform1f(26, light.spotAngle);
    }
  }
};


/**
 * Set ambient and fog parameters.<br><br>
 * 
 * Setup ambient lighting color and fog parameters for the current used shader.
 */
Ovoid.Drawer.ambient = function() {
  
  Ovoid.Drawer.sp.setUniform4fv(40, Ovoid.Drawer._abcolor);
  if(Ovoid.Drawer.opt_fogDensity > 0.0) {
    Ovoid.Drawer.sp.setUniform4fv(44, Ovoid.Drawer._fogcolor);
    Ovoid.Drawer.sp.setUniform1f(45, Ovoid.Drawer.opt_fogDensity);
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
Ovoid.Drawer.persp = function(camera) {

  Ovoid.Drawer.sp.setUniformMatrix4fv(3, camera.eyeview.m);
  Ovoid.Drawer.sp.setUniformMatrix4fv(4, camera.perspective.m);
  Ovoid.Drawer.sp.setUniformMatrix4fv(5, camera.lookat.m);
  Ovoid.Drawer.sp.setUniform4fv(30, camera.worldPosition.v);
};


/**
 * Set orthographic.<br><br>
 * 
 * Setup view orthographic matrix of the specified camera for the current 
 * used shader.
 * 
 * @param {Camera} camera Camera node.
 */
Ovoid.Drawer.ortho = function(camera) {

  Ovoid.Drawer.sp.setUniformMatrix4fv(3, camera.orthographic.m);
};


/**
 * Set screen.<br><br>
 * 
 * Setup screen view orthographic matrix for the current used shader.
 * 
 * @param {Matrix4} matrix Screen orthographic matrix.
 */
Ovoid.Drawer.screen = function(matrix) {

  Ovoid.Drawer.sp.setUniformMatrix4fv(3, matrix.m);
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
Ovoid.Drawer.model = function(tmatrix, nmatrix) {

  Ovoid.Drawer.sp.setUniformMatrix4fv(0,tmatrix);
  if (nmatrix)
    Ovoid.Drawer.sp.setUniformMatrix3fv(1,nmatrix);
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
Ovoid.Drawer.enable = function(u) {

  Ovoid.Drawer.sp.setUniform1i(u, 1);
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
Ovoid.Drawer.disable = function(u) {

  Ovoid.Drawer.sp.setUniform1i(u, 0);
};


/* *********************** DRAWING PRIMITIVES METHODS *********************** */
/**
 * Draw sprite.<br><br>
 * 
 * Draws a sprite transformed according to the specified transformation matrix.
 */
Ovoid.Drawer.sprite = function() {
  
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[0]);
  Ovoid.Drawer.sp.setVertexAttribPointers(5,28); /* VEC4_P|VEC3_U == 5 */
  Ovoid.gl.drawArrays(4,0,6);
  Ovoid.Drawer._drawnsprite++;
};


/**
 * Draw symbolic box.<br><br>
 * 
 * Draws a symbolic box.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.symBox = function(color) {
  
  Ovoid.Drawer.sp.setUniform4fv(9, color.v);
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[1]);
  Ovoid.Drawer.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  Ovoid.gl.drawArrays(1,0,24);
  Ovoid.Drawer._drawnsymbolic++;
};


/**
 * Draw symbolic sphere.<br><br>
 * 
 * Draws a symbolic sphere.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.symSphere = function(color) {
  
  Ovoid.Drawer.sp.setUniform4fv(9, color.v);
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[2]);
  Ovoid.Drawer.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  Ovoid.gl.drawArrays(1,0,144);
  Ovoid.Drawer._drawnsymbolic++;
};


/**
 * Draw symbolic axis.<br><br>
 * 
 * Draws a symbolic axis.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.symAxis = function(color) {
  
  Ovoid.Drawer.sp.setUniform4fv(9, color.v);
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[3]);
  Ovoid.Drawer.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  Ovoid.gl.drawArrays(1,0,6);
  Ovoid.Drawer._drawnsymbolic++;
};


/**
 * Draw symbolic pyramid.<br><br>
 * 
 * Draws a symbolic pyramid.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.symPyramid = function(color) {
  
  Ovoid.Drawer.sp.setUniform4fv(9, color.v);
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[4]);
  Ovoid.Drawer.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  Ovoid.gl.drawArrays(1,0,16);
  Ovoid.Drawer._drawnsymbolic++;
};


/**
 * Draw symbolic star.<br><br>
 * 
 * Draws a symbolic star.
 * 
 * @param {Color} color Drawing color.
 */
Ovoid.Drawer.symStar = function(color) {
  
  Ovoid.Drawer.sp.setUniform4fv(9, color.v);
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[5]);
  Ovoid.Drawer.sp.setVertexAttribPointers(33,32); /* VEC4_P|VEC4_C == 33 */
  Ovoid.gl.drawArrays(1,0,10);
  Ovoid.Drawer._drawnsymbolic++;
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
Ovoid.Drawer.string = function(w, r, s, string) {
  
  var data = new Float32Array(string.length*4);
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
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bdynamic);
  Ovoid.gl.bufferData(0x8892,data,0x88E8);
  Ovoid.Drawer.sp.setVertexAttribPointers(1,16); /* VEC4_P == 1 */
  Ovoid.gl.drawArrays(0,0,v/4);
  Ovoid.Drawer._drawnchar+=v/4;
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
Ovoid.Drawer.raw = function(format, stride, type, count, data) {
  
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bdynamic);
  Ovoid.gl.bufferData(0x8892,data,0x88E8);
  Ovoid.Drawer.sp.setVertexAttribPointers(format,stride);
  Ovoid.gl.drawArrays(type,0,count);
  Ovoid.Drawer._drawndynamic++;
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
Ovoid.Drawer.layer = function(layer, color) {
  
  //Ovoid.Drawer.sp.setUniform3fv(42, layer.size.v); /* layer size */
  Ovoid.gl.activeTexture(0x84C1); /* TEXTURE1 */
  if (color) {
    Ovoid.Drawer.sp.setUniform4fv(9, color.v); /* set color */
    /* change texture */
    Ovoid.Drawer._tblank.bind();
  } else {
    Ovoid.Drawer.sp.setUniform4fv(9, layer.bgColor.v); /* set color */
    /* change texture */
    (layer.bgTexture)?layer.bgTexture.bind():Ovoid.Drawer._tblank.bind();
  }
  Ovoid.Drawer.sp.setUniformSampler(1,1);
  /* Draw a sprite */
  Ovoid.Drawer.sprite();
};


/**
 * Draw Text.<br><br>
 * 
 * Draws a Text node with the current used shader.
 * 
 * @param {Text} text Text node to be drawn.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.text = function(text, color) {

  Ovoid.gl.activeTexture(0x84C1); /* TEXTURE1 */
  if (color) {
    Ovoid.Drawer.sp.setUniform4fv(9, color.v); /* set color */
    /* change texture */
    Ovoid.Drawer._tblank.bind();
  } else {
    Ovoid.Drawer.sp.setUniform4fv(9, text.fgColor.v); /* set color */
    /* change texture */
    (text.fontmap)?text.fontmap.bind():Ovoid.Drawer._tfontm.bind();
  }
  Ovoid.Drawer.sp.setUniformSampler(1,1);
  /* Draw a string */
  Ovoid.Drawer.string(text.param.v[1],text.param.v[2],text.param.v[0],text.string);
};


/**
 * Draw Mesh.<br><br>
 * 
 * Draws a Mesh node with the current used shader.
 * 
 * @param {Mesh} mesh Mesh node to be drawn.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.mesh = function(mesh, color) {

  var l, j, k, s, m;
  l = 0; /* TODO: implementation du Lod si besoin */
  Ovoid.gl.bindBuffer(0x8892, mesh._vbuffer[l]);
  Ovoid.gl.bindBuffer(0x8893, mesh._ibuffer[l]);
  Ovoid.Drawer.sp.setVertexAttribPointers(mesh._vformat, mesh._vfbytes);
  j = mesh.polyset[l].length;
  if (color) {
    Ovoid.Drawer.sp.setUniform4fv(9, color.v); /* set color */   
    while (j--) {
      s = mesh.polyset[l][j];
      /* TRIANGLES, count, UNSIGNED_SHORT, offset */
      Ovoid.gl.drawElements(4,s.icount,0x1403,s.ioffset); 
      Ovoid.Drawer._drawnpolyset++;
    }
  } else {
    /* parcour des polysets */  
    while (j--) {
      s = mesh.polyset[l][j];
      s.material?m=s.material:m=Ovoid.Drawer._mblank;
      /* set material  */
      Ovoid.Drawer.sp.setUniform4fv(10,m.color[0].v);
      Ovoid.Drawer.sp.setUniform4fv(11,m.color[1].v);
      Ovoid.Drawer.sp.setUniform4fv(12,m.color[2].v);
      Ovoid.Drawer.sp.setUniform4fv(13,m.color[3].v);
      Ovoid.Drawer.sp.setUniform4fv(14,m.color[4].v);
      Ovoid.Drawer.sp.setUniform1f(15,m.shininess);
      Ovoid.Drawer.sp.setUniform1f(16,m.opacity);
      Ovoid.Drawer.sp.setUniform1f(17,m.reflectivity);
      /* bind texture */
      for (k = 0; k < 6; k++) {
        if(Ovoid.Drawer.sp.uniformSampler[k] != -1) {
          Ovoid.gl.activeTexture(0x84C0+k); /* TEXTURE0+k */
          (m.texture[k])?m.texture[k].bind():Ovoid.Drawer._tblank.bind();
          Ovoid.gl.uniform1i(Ovoid.Drawer.sp.uniformSampler[k], k);
        }
      }
      /* TRIANGLES, count, UNSIGNED_SHORT, offset */
      Ovoid.gl.drawElements(4,s.icount,0x1403,s.ioffset);
      Ovoid.Drawer._drawnpolyset++;
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
Ovoid.Drawer.emitter = function(emitter, layer, color) {
  
  if (color) {
    if(emitter.billboard) {
      Ovoid.Drawer.switchPipe(27,layer); // PIPE_RP_BILLBOARD
    } else {
      Ovoid.Drawer.switchPipe(22,layer); // PIPE_RP_PARTICLE
    }
    Ovoid.Drawer.sp.setUniform4fv(9, color.v); // set color
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera); // mise à jour de la perspective
    Ovoid.gl.activeTexture(0x84C1); // TEXTURE1
    Ovoid.Drawer._tblank.bind();
    Ovoid.Drawer.sp.setUniformSampler(1,1);
    Ovoid.Drawer.switchBlend(0); // substractive alpha. SRC_ALPHA, ONE_MINUS_SRC_ALPHA 
    Ovoid.Drawer.switchDepth(2); // Disable depth mask
    
    if(emitter.billboard) {
      Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[6]); // Buffer spirte billboard
      Ovoid.Drawer.sp.setVertexAttribPointers(5,28); // VEC4_P|VEC3_U == 5 
      var m, s, i;
      m = new Float32Array(16); // Matrice temporaire
      i = emitter._particles.length;
      while(i--) {
        s = emitter._particles[i];
        if(s.l > 0.0) {
          m[0] = s.u.v[2]; // Taille du sprite 
          m[12] = s.p.v[0]; m[13] = s.p.v[1]; m[14] = s.p.v[2]; m[15] = 1.0; // Translations
          Ovoid.Drawer.model(m);
          Ovoid.gl.drawArrays(5,0,4); // TRIANGLES_STRIP
          Ovoid.Drawer._drawnsprite++;
        }
      }
    } else {
      // Ovoid.VERTEX_PARTICLE, stride, gl.POINTS,
      Ovoid.Drawer.raw(Ovoid.VERTEX_PARTICLE, 44, 0, emitter._alives, emitter._fbuffer);
      Ovoid.Drawer._drawnparticle+=emitter._alives;
    }
  } else {
    // model de rendu pour les particules 
    switch(emitter.model) 
    {
      case 3: // Ovoid.EMISSIVE
        Ovoid.Drawer.switchBlend(1); // additive alpha. SRC_ALPHA, ONE
        break;
      default: // Ovoid.DIFFUSE
        Ovoid.Drawer.switchBlend(3); // substractive alpha. SRC_ALPHA, ONE_MINUS_SRC_ALPHA
        break;
    }
    if(emitter.billboard) {
      Ovoid.Drawer.switchPipe(7,layer); // PIPE_BILLBOARD
    } else {
      Ovoid.Drawer.switchPipe(2,layer); // PIPE_PARTICLE
    }

    
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera); // Force la mise à jour de la perspective 
    Ovoid.gl.activeTexture(0x84C1); /* TEXTURE1 */
    (emitter.texture)?emitter.texture.bind():Ovoid.Drawer._tblank.bind();
    Ovoid.Drawer.sp.setUniformSampler(1,1);
    Ovoid.Drawer.switchDepth(2); // Disable depth mask
      
    if(emitter.billboard) {
      Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bprimitive[6]); // Buffer spirte billboard
      Ovoid.Drawer.sp.setVertexAttribPointers(5,28); // VEC4_P|VEC3_U == 5
      var m, s, i;
      m = new Float32Array(16);
      i = emitter._particles.length;
      while(i--) {
        s = emitter._particles[i];
        if(s.l > 0.0) {
          m[0] = s.u.v[2]; // Taille du sprite 
          m[12] = s.p.v[0]; m[13] = s.p.v[1]; m[14] = s.p.v[2]; m[15] = 1.0; // Translations
          Ovoid.Drawer.sp.setUniform4fv(9, s.c.v); // set color
          Ovoid.Drawer.model(m);
          Ovoid.gl.drawArrays(5,0,4);
          Ovoid.Drawer._drawnsprite++;
        }
      }
    } else {
      // Ovoid.VERTEX_PARTICLE, stride, gl.POINTS,
      Ovoid.Drawer.raw(Ovoid.VERTEX_PARTICLE, 44, 0, emitter._alives, emitter._fbuffer);
      Ovoid.Drawer._drawnparticle+=emitter._alives;
    }
  }
  // restore depth, blend et pipe
  Ovoid.Drawer.restoreBlend();
  Ovoid.Drawer.restoreDepth();
  Ovoid.Drawer.restorePipe();
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
Ovoid.Drawer.shadow = function(light, body) {
  
  var shape;
  if (body.shape.type & Ovoid.MESH) {
    Ovoid.Drawer.model(body.worldMatrix.m);
    shape = body.shape;
  }
  if (body.shape.type & Ovoid.SKIN) {
    if (body.shape.mesh) {
      // tentative d'implémentation des shadow volume pour les skin
      if (!Ovoid.opt_localSkinData)
        return;
      /* les vertices sont déja transformmé en coordonnée monde, pas besoin
       * de transformer le modelview */
      Ovoid.Drawer.model(new Ovoid.Matrix4().m);
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
  var LD = new Ovoid.Vector();
  // 4 float par vertex, 3 vertex par face, le double de face = 24
  var V = new Float32Array(c*32);

  // position de la lumiere en coordonnée locale à l'objet 
  if(light.model == Ovoid.LIGHT_DIRECTIONAL) {
    LD.copy(light.worldDirection);
    /* les vertices sont déja transformmé en coordonnée monde, pas besoin
       * de transformer le modelview pour le skin */
    if (body.shape.type & Ovoid.MESH) LD.transform4Inverse(body.worldMatrix);
    LP.copy(LD);
    LP.scaleBy(-1.0);
  } else {
    LP.copy(light.worldPosition);
    /* les vertices sont déja transformmé en coordonnée monde, pas besoin
       * de transformer le modelview pour le skin */
    if (body.shape.type & Ovoid.MESH) LP.transform4Inverse(body.worldMatrix);
  }
  
  // on parcour la liste de triangles pour creer le vertex buffer du shadow volum
  var n = 0;
  for (var i = 0; i < c; i++)
  {
    if(light.model != Ovoid.LIGHT_DIRECTIONAL)
      LD.subOf(LP, body.shape.triangles[l][i].center);
      
    if (LD.dot(body.shape.triangles[l][i].normal) > 0.0)
    {
      // triangles face lumiere 
      P[0] = body.shape.vertices[l][body.shape.triangles[l][i].index[0]].p;
      P[1] = body.shape.vertices[l][body.shape.triangles[l][i].index[1]].p;
      P[2] = body.shape.vertices[l][body.shape.triangles[l][i].index[2]].p;
      // triangle extrudé à l'infini lumiere 
      
      if(light.model == Ovoid.LIGHT_DIRECTIONAL) {
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
          if(light.model != Ovoid.LIGHT_DIRECTIONAL)
            LD.subOf(LP, body.shape.triangles[l][a].center);
            
          if (LD.dot(body.shape.triangles[l][a].normal) <= 0.0)
          {
            /* le premier triangle du "ring", l'index des vertices
             * est trouvé car l'ordre des edges est 01-12-20 le second
             * peut donc être trouvé grace à un modulo :
             * (0+1)%3 = 1, (1+1)%3 = 2, (1+2)%3 = 0*/
            k = (j + 1) % 3;
            if(light.model == Ovoid.LIGHT_DIRECTIONAL) {
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
          
          if(light.model == Ovoid.LIGHT_DIRECTIONAL) {
            P[3].copy(LP);
            P[4].copy(LP);
          } else {
            P[3].subOf(P[j], LP);
            P[4].subOf(P[k], LP);
          }

          V[n] = P[j].v[0]; n++;V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
          V[n] = P[4].v[0]; n++; V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
          V[n] = P[k].v[0]; n++; V[n] = P[k].v[1]; n++;V[n] = P[k].v[2]; n++;V[n] = 1.0; n++;
          
          V[n] = P[j].v[0]; n++;V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
          V[n] = P[3].v[0]; n++;V[n] = P[3].v[1]; n++;V[n] = P[3].v[2]; n++;V[n] = 0.0; n++;
          V[n] = P[4].v[0]; n++;V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
        }
      }
    }
  }
  
  // buffer dynamique
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bdynamic);
  Ovoid.gl.bufferData(0x8892,V,0x88E8);
  Ovoid.Drawer.sp.setVertexAttribPointers(1,16);

  // dessins des faces arrieres, incremente le stencil 
  Ovoid.gl.cullFace(0x0404); // FRONT
  Ovoid.gl.stencilOp(0x1E00, 0x1E02, 0x1E00); // KEEP, INCR, KEEP
  Ovoid.gl.drawArrays(4, 0, n/4);
  Ovoid.Drawer._drawndynamic++;

  // dessins des faces avant, decremente le stencil 
  Ovoid.gl.cullFace(0x0405); // BACK
  Ovoid.gl.stencilOp(0x1E00, 0x1E03, 0x1E00); // KEEP, DECR, KEEP
  Ovoid.gl.drawArrays(4, 0, n/4);
  Ovoid.Drawer._drawndynamic++;

  Ovoid.Drawer._drawnshadow++;
};


/**
 * Draw faces normals.<br><br>
 * 
 * Draws shape's faces normals of the given Body node.
 * 
 * @param {Body} body Body node.
 * @param {float} scale Normal scale.
 */
Ovoid.Drawer.normals = function(body, scale) {
  
  var l = 0; // Lod
  
  if(!body.shape.triangles)
    return;
  
  Ovoid.Drawer.model(body.worldMatrix.m);
  triangles = body.shape.triangles[l];

  var V = new Float32Array(triangles.length*2*8);
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
  
  Ovoid.Drawer.sp.setUniform4fv(9, Ovoid.Drawer._tcolor[10].v);
  Ovoid.Drawer.raw(33, 32, 1, n/8, V);
};


/**
 * Draw helpers.<br><br>
 * 
 * Draws helpers and symbols for the given Transform node.
 * 
 * @param {Transform} tform Transform node.
 */
Ovoid.Drawer.helpers = function(tform) {
  
  Ovoid.Drawer.model(tform.worldMatrix.m);
  if (Ovoid.Drawer.opt_drawAxis) {
    Ovoid.Drawer.symAxis(Ovoid.Drawer._tcolor[0]);
  }
  
  if ((tform.type & Ovoid.CAMERA) && Ovoid.Drawer.opt_drawCameras) {
    Ovoid.Drawer.symPyramid(Ovoid.Drawer._tcolor[1]);
  }
  
  if ((tform.type & Ovoid.LIGHT) && Ovoid.Drawer.opt_drawLights) {
    Ovoid.Drawer.symStar(Ovoid.Drawer._tcolor[4]);
  }
  
  if ((tform.type & Ovoid.JOINT) && Ovoid.Drawer.opt_drawJointBones) {
    var m = new Float32Array(tform.worldMatrix.m);
    var s = Ovoid.Drawer.opt_jointSize * tform.size;
    m[0] *= s; m[1] *= s; m[2] *= s;
    m[4] *= s; m[5] *= s; m[6] *= s;
    m[8] *= s; m[9] *= s; m[10] *= s;
    Ovoid.Drawer.model(m);
    Ovoid.Drawer.symSphere(Ovoid.Drawer._tcolor[2]);
  }
  
  if(tform.type & Ovoid.BODY) {
    
    if (Ovoid.Drawer.opt_drawBoundingBox) {
      var m = new Float32Array(tform.worldMatrix.m);
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
      Ovoid.Drawer.model(m);
      Ovoid.Drawer.symBox(Ovoid.Drawer._tcolor[8]);
                        
    }
    if (Ovoid.Drawer.opt_drawBoundingSphere) {
      var m = new Float32Array(tform.worldMatrix.m);
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
      Ovoid.Drawer.model(m);
      Ovoid.Drawer.symSphere(Ovoid.Drawer._tcolor[6]);
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
 */
Ovoid.Drawer.body = function(body, layer, color) {
  
  if (body.shape.type & Ovoid.MESH) {
    Ovoid.Drawer.model(body.worldMatrix.m, body.normalMatrix.m);
    Ovoid.Drawer.mesh(body.shape, color);
    body.addCach(Ovoid.CACH_WORLD);
    return;
  }
  if (body.shape.type & Ovoid.SKIN) {
    if (body.shape.mesh) {
      Ovoid.Drawer.model(body.shape.infMxfArray, body.shape.infMnrArray);
      Ovoid.Drawer.enable(6);
      Ovoid.Drawer.mesh(body.shape.mesh, color);
      Ovoid.Drawer.disable(6);
    }
    body.addCach(Ovoid.CACH_WORLD);
    return;
  }
  if (body.shape.type & Ovoid.EMITTER) {
    Ovoid.Drawer.model(body.worldMatrix.m);
    Ovoid.Drawer.emitter(body.shape, layer, color);
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
 */
Ovoid.Drawer.bodyStack = function(stack, layer, rp) {
  
  var i = stack.count;
  if (rp) {
    var color = new Ovoid.Color();
    while(i--) {
      if(stack[i].pickable || Ovoid.opt_debugMode) {
        color.fromInt(stack[i].uid);
        Ovoid.Drawer.body(stack[i], layer, color);
      }
    }
  } else {
    while(i--) {
      Ovoid.Drawer.body(stack[i], layer);
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
Ovoid.Drawer.layerStack = function(stack, rp) {

  var c = stack.count;
  if (rp) {
    var color = new Ovoid.Color();
    for (var i = 0; i < c; i++) {
      if(stack[i].pickable || Ovoid.opt_debugMode) {
        color.fromInt(stack[i].uid);
        Ovoid.Drawer.model(stack[i].layerMatrix.m);
        Ovoid.Drawer.layer(stack[i], color);
        stack[i].addCach(Ovoid.CACH_WORLD);
      }
    }
  } else {
    for (var i = 0; i < c; i++) {
      Ovoid.Drawer.model(stack[i].layerMatrix.m);
      Ovoid.Drawer.layer(stack[i], color);
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
Ovoid.Drawer.textStack = function(stack, rp) {

  var c = stack.count;
  if (rp) {
    var color = new Ovoid.Color();
    for (i = 0; i < c; i++) {
      if(stack[i].pickable || Ovoid.opt_debugMode) {
        color.fromInt(stack[i].uid);
        Ovoid.Drawer.model(stack[i].layerMatrix.m);
        Ovoid.Drawer.text(stack[i], color);
        stack[i].addCach(Ovoid.CACH_WORLD);
      }
    }
  } else {
    for (i = 0; i < c; i++) {
      Ovoid.Drawer.model(stack[i].layerMatrix.m);
      Ovoid.Drawer.text(stack[i], color);
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
Ovoid.Drawer.helpersStack = function(stack) {

  var i = stack.count;
  while(i--) {
    Ovoid.Drawer.helpers(stack[i]);
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
Ovoid.Drawer.normalsStack = function(stack) {

  var i = stack.count;
  while(i--) {
    Ovoid.Drawer.normals(stack[i], Ovoid.Drawer.opt_normalScale);
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
Ovoid.Drawer.zfailStack = function(light, stack) {

  Ovoid.gl.enable(0x0B90); // STENCIL_TEST
  Ovoid.gl.clear(0x00000400); // STENCIL_BUFFER_BIT
  Ovoid.gl.colorMask(0,0,0,0); 
  Ovoid.gl.stencilFunc(0x0207,0,0); // ALWAYS,0,0
  var i = stack.count;
  while(i--) {
    if(stack[i].shadowCasting)
      Ovoid.Drawer.shadow(light, stack[i]);
  }
  Ovoid.gl.stencilFunc(0x0202,0,-1); // EQUAL
  Ovoid.gl.stencilOp(0x1E00,0x1E00,0x1E00); // KEEP,KEEP,KEEP
  Ovoid.gl.colorMask(1,1,1,1);
};


/* *************************** GLOBAL METHODS ******************************* */

/**
 * Draw current queue subfunction for Read Pixels frame.<br><br>
 * 
 * Draws all the current queue available in <code>Ovoid.Queuer</code>. 
 * This method does not takes argument because it get data directly from the 
 * <code>Ovoid.Queuer</code> global class. 
 */
Ovoid.Drawer.drawQueueRP = function() {
  // Picking frame
  if (Ovoid.Drawer.opt_pickingMode) { 
    Ovoid.Drawer.beginRpDraw();
    Ovoid.Drawer.switchBlend(0); // blend off
    Ovoid.Drawer.switchDepth(1); // depth mask on, test less
    if(Ovoid.Drawer.opt_pickingMode & Ovoid.RP_WORLD) {
      for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
        Ovoid.Drawer.switchPipe(20,0); //PIPE_RP_GEOMETRY
        Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
        Ovoid.Drawer.setCull(1); // cull back
        Ovoid.Drawer.bodyStack(Ovoid.Queuer.qsolid[i], 0, true);
        Ovoid.Drawer.setCull(0); // no cull
        Ovoid.Drawer.bodyStack(Ovoid.Queuer.qalpha[i], 0, true);
      }
    }
    if (Ovoid.Drawer.opt_drawLayers && (Ovoid.Drawer.opt_pickingMode & Ovoid.RP_OVERLAY)) {
      Ovoid.Drawer.switchDepth(0); // depth all disable
      //Ovoid.Drawer.setCull(1); // cull back
      Ovoid.Drawer.switchPipe(23,0); //PIPE_RP_LAYER
      Ovoid.Drawer.screen(Ovoid.Frame.matrix);
      Ovoid.Drawer.layerStack(Ovoid.Queuer.qlayer, true);
      Ovoid.Drawer.switchPipe(24,0); //PIPE_RP_STRING
      Ovoid.Drawer.screen(Ovoid.Frame.matrix);
      Ovoid.Drawer.textStack(Ovoid.Queuer.qtext, true);
    }
    Ovoid.Drawer.endRpDraw();
    Ovoid.Drawer._renderpasses++;
  }
}

/**
 * Draw current queue subfunction for Helpers and layers.<br><br>
 * 
 * Draws all the current queue available in <code>Ovoid.Queuer</code>. 
 * This method does not takes argument because it get data directly from the 
 * <code>Ovoid.Queuer</code> global class. 
 */
Ovoid.Drawer.drawQueueHL = function() {
 
  Ovoid.Drawer.switchDepth(0); // depth all disable
  // Helpers 
  if (Ovoid.Drawer.opt_drawHelpers) {
    Ovoid.Drawer.switchPipe(5,0); // PIPE_HELPER
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    if (Ovoid.Drawer.opt_drawNormals) {
      for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
        Ovoid.Drawer.normalsStack(Ovoid.Queuer.qsolid[i]);
      }
    }
    Ovoid.Drawer.helpersStack(Ovoid.Queuer.qtform);
    
    // Dessin du curseur
    Ovoid.Drawer.model(Ovoid.Input.mouseCursor.m);
    Ovoid.Drawer.symSphere(Ovoid.Drawer._tcolor[1]);
    
  }
  // Layers & text
  if (Ovoid.Drawer.opt_drawLayers) {
    Ovoid.Drawer.switchBlend(3); // blend substracting alpha
    if(Ovoid.Queuer.qlayer.count) {
      Ovoid.Drawer.switchPipe(3,0); //PIPE_LAYER
      Ovoid.Drawer.screen(Ovoid.Frame.matrix);
      Ovoid.Drawer.layerStack(Ovoid.Queuer.qlayer, false);
    }
    if(Ovoid.Queuer.qtext.count) {
      Ovoid.Drawer.switchPipe(4,0); //PIPE_STRING
      Ovoid.Drawer.screen(Ovoid.Frame.matrix);
      Ovoid.Drawer.textStack(Ovoid.Queuer.qtext, false);
    }
  }
}

/**
 * Draw current queue subfunction for per-light Passes.<br><br>
 * 
 * Draws all the current queue available in <code>Ovoid.Queuer</code>. 
 * This method does not takes argument because it get data directly from the 
 * <code>Ovoid.Queuer</code> global class. 
 */
Ovoid.Drawer.drawQueueLP = function(pipe) {

  Ovoid.Drawer.setCull(1); // cull back
  Ovoid.Drawer.switchBlend(3); // blending substracting alpha
  Ovoid.Drawer.switchDepth(1); // depth mask on, test less
  
  // initialize projection pour les shadow volume
  Ovoid.Drawer.switchPipe(6,0); // PIPE_SHADOW_VOLUME
  Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    if(!Ovoid.Queuer.qsolid[i].count) continue;
    Ovoid.Drawer.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_LP
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    Ovoid.Drawer.ambient();  // set scene ambiant parameters
    Ovoid.Drawer.disable(0); // disable diffuse; ENd 
    Ovoid.Drawer.enable(1);  // enable ambient; ENa 
    Ovoid.Drawer.bodyStack(Ovoid.Queuer.qsolid[i], i, false);
  }
  Ovoid.Drawer._renderpasses++;
  Ovoid.Drawer.switchBlend(2); // blend additive color
  Ovoid.Drawer.switchDepth(3); // depth mask off, test lessequal
  var l = Ovoid.Queuer.qlight.count
  while (l--) {
    if (Ovoid.Queuer.qlight[l].shadowCasting && Ovoid.Drawer.opt_shadowCasting) {
      
      Ovoid.Drawer.switchPipe(6,0); // PIPE_SHADOW_VOLUME
      Ovoid.Drawer.switchBlend(0); // blend off
      Ovoid.Drawer.switchDepth(2); // mask off, test less
      for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
        if(!Ovoid.Queuer.qsolid[i].count) continue;
        Ovoid.Drawer.zfailStack(Ovoid.Queuer.qlight[l], Ovoid.Queuer.qsolid[i]);
      }
      Ovoid.Drawer.restoreBlend(); // one, one
      Ovoid.Drawer.restoreDepth(); 
    }
    
    for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
      if(!Ovoid.Queuer.qsolid[i].count) continue;
      Ovoid.Drawer.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_LP
      Ovoid.Drawer.ambient(); // set scene ambiant parameters
      Ovoid.Drawer.enable(0); // enable diffuse
      Ovoid.Drawer.disable(1); // disable ambient
      Ovoid.Drawer.light(Ovoid.Queuer.qlight[l]);
      Ovoid.Drawer.bodyStack(Ovoid.Queuer.qsolid[i], i, false);
    }
    
    Ovoid.Drawer._renderpasses++;
  }
  Ovoid.gl.disable(0x0B90); // STENCIL_TEST 
}

/**
 * Draw current queue subfunction for one Passe.<br><br>
 * 
 * Draws all the current queue available in <code>Ovoid.Queuer</code>. 
 * This method does not takes argument because it get data directly from the 
 * <code>Ovoid.Queuer</code> global class. 
 */
Ovoid.Drawer.drawQueue1P = function(pipe) {

  Ovoid.Drawer.setCull(1); // cull back
  Ovoid.Drawer.switchBlend(3); // blending disabled
  Ovoid.Drawer.switchDepth(1); // depth mask on, test less
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    if(!Ovoid.Queuer.qsolid[i].count) continue;
    Ovoid.Drawer.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_1P
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    Ovoid.Drawer.ambient(); // set scene ambiant parameters
    Ovoid.Drawer.enable(0); // enable diffuse; ENd 
    Ovoid.Drawer.enable(1); // enable ambient; ENa 
    Ovoid.Drawer.light(Ovoid.Queuer.qlight);
    Ovoid.Drawer.bodyStack( Ovoid.Queuer.qsolid[i], i, false);
  }
  Ovoid.Drawer._renderpasses++;
}

/**
 * Draw current queue subfunction for one Passe aplha/FX objects.<br><br>
 * 
 * Draws all the current queue available in <code>Ovoid.Queuer</code>. 
 * This method does not takes argument because it get data directly from the 
 * <code>Ovoid.Queuer</code> global class. 
 */
Ovoid.Drawer.drawQueueFX = function(pipe) {

  Ovoid.Drawer.setCull(0); // disable face culling
  Ovoid.Drawer.switchBlend(3); // blend substractive alpha
  Ovoid.Drawer.switchDepth(2); // depthMask off, depth test less
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    if(!Ovoid.Queuer.qalpha[i].count) continue;
    Ovoid.Drawer.switchPipe(pipe,i); // [VL_,LE_]PIPE_L2_GEOMETRY_1P
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    Ovoid.Drawer.ambient();   // set scene ambiant parameters
    Ovoid.Drawer.light(Ovoid.Queuer.qlight);
    Ovoid.Drawer.bodyStack( Ovoid.Queuer.qalpha[i], i, false);
  }
  Ovoid.Drawer._renderpasses++;
}


/**
 * Draw current queue.<br><br>
 * 
 * Draws all the current queue available in <code>Ovoid.Queuer</code>. 
 * This method does not takes argument because it get data directly from the 
 * <code>Ovoid.Queuer</code> global class. 
 */
Ovoid.Drawer.drawQueue = function() {
  
  Ovoid.Drawer.beginDraw();
  
  // pipeline geometrie selon level of performance
  var G_LP, G_1P;
  switch(Ovoid.Drawer._lop)
  {
	case 0:
	  G_LP = 13;
	  G_1P = 14;
	break;
	case 1:
	  G_LP = 10;
	  G_1P = 11;
	break;
	default:
	  G_LP = 0;
	  G_1P = 1;
	break;
  }
  
  var i;
  
  if (Ovoid.Drawer.opt_perLightPass) {
    Ovoid.Drawer.drawQueueLP(G_LP);
  } else {
    Ovoid.Drawer.drawQueue1P(G_1P);
  }
  Ovoid.Drawer.drawQueueFX(G_1P);
  Ovoid.Drawer.drawQueueHL();
  Ovoid.Drawer.drawQueueRP();
  Ovoid.Drawer.endDraw();
};
