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
 * The Drawer use several drawing pipelines depending on what is drawn. For 
 * example you don't draw particles like you draw common objects. This is why 
 * OvoiD.JS use several shaders. The currently implemented drawing pipelines
 * are the following ones:<br><br>
 * 
 * <ul>
 * <li><b>ReadPixel Picking pipeline</b> Ovoid.DRAWER_SP_COLOR<br><br>
 * 
 * Flat color. Draws objets without shading nor lighting and only with a flat 
 * colours. The color is specified by an uniform. This drawing mode is used to 
 * draw the scene for the mouse Picking mecanism.</li><br>
 * 
 * <li><b>Symbolic shapes pipeline</b> Ovoid.DRAWER_SP_VERTEX_COLOR<br><br>
 * 
 * Flat vertex color. Draws object without shading nor lighting and only with flat
 * colours using the vertices's color attribute. This drawing pipeline is used to
 * draw the symbolic shapes and object's helpers.</li><br>
 * 
 * <li><b>Z-Fail shadow casting pipeline</b> Ovoid.DRAWER_SP_1LIGHT<br><br>
 * 
 * Shading per-light passes. Draws objet with full shading and 
 * textures but with per-light drawing passes. This drawing pipeline is used to 
 * draw the scene for the Z-fail shadow casting which require a multi-passes 
 * drawing (one pass per light).</li><br>
 * 
 * <li><b>Standard shading pipeline</b> Ovoid.DRAWER_SP_NLIGHT<br><br>
 * 
 * Shading N lights. Draws objet with full shading, textures and several light 
 * sources in one pass. This is the common and standard drawing pipeline.
 * (The built-in shader support up to eight light sources)</li><br>
 * 
 * <li><b>Text dedicated pipeline</b> Ovoid.DRAWER_SP_TEXT<br><br>
 * 
 * Special text. Draws vertices in point-sprites mode according to a specific 
 * data storing to display texture mapped font text.</li><br>
 * 
 * <li><b>Layer dedicated pipeline</b> Ovoid.DRAWER_SP_LAYER<br><br>
 * 
 * Special layer. Draws a colored and/or textured sprite according to a specific
 * data storing to display overlays layers.</li><br>
 * 
 * <li><b>Particles pipeline</b> Ovoid.DRAWER_SP_PARTICLES<br><br>
 * 
 * Particles. Draws vertices in point-sprites mode with color and texture. This
 * drawing pipeline is used to draw particles.</li><br>
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
 * <blockcode>
 * var snow = Ovoid.Drawer.addShader("snow.vs", "snow.fs", "snow.wm");<br>
 * if( snow == -1) {<br>
 * &nbsp;&nbsp;<codecomment>// error</codecomment><br>
 * }<br>
 * Ovoid.Drawer.plugShader(Ovoid.DRAWER_SP_PARTICLES, snow);<br>
 * </blockcode><br><br>
 * 
 * For more informations about shaders link and wrapping see the 
 * <code>Ovoid.Shader</code> object documentation page.
 * 
 */
Ovoid.Drawer = {};


/** Clearing buffer color */
Ovoid.Drawer.opt_clearColor = [1.0, 1.0, 1.0, 1.0];


/** Global ambient lighting color */
Ovoid.Drawer.opt_ambientColor = [0.2, 0.2, 0.2, 1.0];


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


/** Joint helpers's size */
Ovoid.Drawer.opt_jointSize = 2.0;


/** Private class member for drawing shader set stock. */
Ovoid.Drawer._splib = new Array();


/** Private class member for drawing shader set stock. */
Ovoid.Drawer._spslot = new Array(9);


/** Private class member for current used shader for drawing. */
Ovoid.Drawer._sp;


/** Private class member for blend mode slot. */
Ovoid.Drawer._blswap = new Array(2);


/** Drawn layer count during the last queue drawing. */
Ovoid.Drawer._drawnlayer = 0;


/** Drawn helper count during the last queue drawing. */
Ovoid.Drawer._drawnhelper = 0;


/** Drawn mesh count during the last queue drawing. */
Ovoid.Drawer._drawnmesh = 0;


/** Drawn mesh polyset count during the last queue drawing. */
Ovoid.Drawer._drawnpolyset = 0;


/** Drawn shadow volum count during the last queue drawing. */
Ovoid.Drawer._drawnshadow = 0;


/** Drawn particle count during the last queue drawing. */
Ovoid.Drawer._drawnparticle = 0;


/** Render passes count during the last queue drawing. */
Ovoid.Drawer._renderpasses = 0;


/** Private class member for picking render texture handle. */
Ovoid.Drawer._rprendrtex = null;


/** Private class member for picking render buffer handle. */
Ovoid.Drawer._rprendrbuf = null;


/** Private class member for picking frame buffer handle. */
Ovoid.Drawer._rpframebuf = null;


/** Private class member for picking readed pixel buffer. */
Ovoid.Drawer._rpcolbytes = new Uint8Array(4);


/** Prvate class member for internal Vertex Buffer Objects */
Ovoid.Drawer._bostock = new Array(12);


/** Private class member for bounding box color. */
Ovoid.Drawer._colorbbox = new Ovoid.Color(0.0, 0.7, 1.0, 1.0);


/** Private class member for bounding sphere color. */
Ovoid.Drawer._colorbsph = new Ovoid.Color(0.0, 1.0, 0.7, 1.0);


/** Private class member for axis color. */
Ovoid.Drawer._coloraxis = new Ovoid.Color(1.0, 1.0, 1.0, 1.0);


/** Private class member for bones color. */
Ovoid.Drawer._colorbone = new Ovoid.Color(0.5, 0.5, 0.5, 1.0);


/** Private class member for light symbol color. */
Ovoid.Drawer._colorligh = new Ovoid.Color(1.0, 0.7, 0.0, 1.0);


/** Private class member for camera symbol color. */
Ovoid.Drawer._colorcame = new Ovoid.Color(0.0, 0.2, 1.0, 1.0);


/** Private class member for shadow volum color. */
Ovoid.Drawer._colorshdw = new Ovoid.Color(0.0, 0.0, 0.0, 1.0);


/** Private class member for blank texture handle. */
Ovoid.Drawer._blanktexture = null;


/** Private class member for default fontmap texture handle. */
Ovoid.Drawer._fontmap = null;


/** temporary transformation matrix */
Ovoid.Drawer._f32arymxf = new Float32Array(16);


/** temporary orthographic projection matrix */
Ovoid.Drawer._f32arymor = new Float32Array(16);


/** temporary light point array */
Ovoid.Drawer._f32arylp = new Float32Array(4 * Ovoid.MAX_LIGHT_BY_DRAW);


/** temporary direction vector array */
Ovoid.Drawer._f32aryld = new Float32Array(3 * Ovoid.MAX_LIGHT_BY_DRAW);


/** temporary color array */
Ovoid.Drawer._f32arylc = new Float32Array(4 * Ovoid.MAX_LIGHT_BY_DRAW);


/** temporary light intensity array */
Ovoid.Drawer._f32aryli = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);


/** temporary light range array */
Ovoid.Drawer._f32arylr = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);


/** temporary light falloff array */
Ovoid.Drawer._f32arylf = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);


/** temporary light spot-angle array */
Ovoid.Drawer._f32aryla = new Float32Array(Ovoid.MAX_LIGHT_BY_DRAW);


/** temporary light enabled array */
Ovoid.Drawer._f32aryle = new Int32Array(Ovoid.MAX_LIGHT_BY_DRAW);


/** Private class member for ambient color. */
Ovoid.Drawer._f32aryac = new Float32Array(4);



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

  /* performance counter */
  var t = (new Date().getTime());

  /* toutes les textures flip en Y */
  Ovoid.gl.pixelStorei(Ovoid.gl.UNPACK_FLIP_Y_WEBGL, true);
  
  /* chargement de la texture blank par defaut */
  Ovoid.Drawer._blanktexture = Ovoid.gl.createTexture();

  var px = new Uint8Array(256); /* (8 * 8 * RGBA) */

  for (var i = 0; i < 256; i++)  /* (8 * 8 * RGBA) */
    px[i] = 255;

  Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D, Ovoid.Drawer._blanktexture);

  Ovoid.gl.texImage2D(Ovoid.gl.TEXTURE_2D,
                      0, Ovoid.gl.RGBA,
                      8, 8, 0,
                      Ovoid.gl.RGBA,
                      Ovoid.gl.UNSIGNED_BYTE, px);

  Ovoid.gl.texParameteri(Ovoid.gl.TEXTURE_2D,
                          Ovoid.gl.TEXTURE_MAG_FILTER,
                          Ovoid.gl.NEAREST);

  Ovoid.gl.texParameteri(Ovoid.gl.TEXTURE_2D,
                          Ovoid.gl.TEXTURE_MIN_FILTER,
                          Ovoid.gl.NEAREST);
                          
  Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D, null);
  
  Ovoid.Drawer._fontmap = new Ovoid.Texture();

  

  Ovoid.Drawer._fontmap.loadSource(Ovoid.opt_defaultFontmapUrl,
                          Ovoid.opt_defaultFontmapFilter,true);

  /* buffer layer pour afficher les images */
  var layerbuf = [
    0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0,
    0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0,
    1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0,
    1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0];

  Ovoid.Drawer._bostock[6] = Ovoid.gl.createBuffer();

  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[6]);

  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
                      new Float32Array(layerbuf),
                      Ovoid.gl.STATIC_DRAW);
  
  /* les deux shaders text et layer de base */
  var sp;

  sp = new Ovoid.Shader("sp_text");
  sp.setSources(Ovoid.DEFAULT_GLSL_TEXT_VS, Ovoid.DEFAULT_GLSL_TEXT_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_text shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(6,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_layer");
  sp.setSources(Ovoid.DEFAULT_GLSL_LAYER_VS, Ovoid.DEFAULT_GLSL_LAYER_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_layer shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(7,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_flat_color");
  sp.setSources(Ovoid.DEFAULT_GLSL_PNUTBCIW_VS, Ovoid.DEFAULT_GLSL_FCOLOR_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_flat_color shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(2,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_vertex_color");
  sp.setSources(Ovoid.DEFAULT_GLSL_PNUTBCIW_VS, Ovoid.DEFAULT_GLSL_VCOLOR_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_vertex_color shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(3,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_shading_1l");
  sp.setSources(Ovoid.DEFAULT_GLSL_PNUTBCIW_VS, Ovoid.DEFAULT_GLSL_S1LIGHT_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_shading_1l shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(4,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_shading_nl");
  sp.setSources(Ovoid.DEFAULT_GLSL_PNUTBCIW_VS, Ovoid.DEFAULT_GLSL_SNLIGHT_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_shading_nl shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(5,Ovoid.Drawer.addShader(sp));

  sp = new Ovoid.Shader("sp_particle");
  sp.setSources(Ovoid.DEFAULT_GLSL_PARTICLE_VS, Ovoid.DEFAULT_GLSL_PARTICLE_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_particle shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(8,Ovoid.Drawer.addShader(sp));
  
  /* buffer de rendu a la volée */
  Ovoid.Drawer._bostock[7] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[7]);
  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
                      new Float32Array(5),
                      Ovoid.gl.DYNAMIC_DRAW);

  Ovoid.Drawer._bostock[8] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(Ovoid.gl.ELEMENT_ARRAY_BUFFER, Ovoid.Drawer._bostock[8]);
  Ovoid.gl.bufferData(Ovoid.gl.ELEMENT_ARRAY_BUFFER,
                      new Float32Array(5),
                      Ovoid.gl.DYNAMIC_DRAW);
                      
  Ovoid.gl.viewport(0, 0, Ovoid.Frame.size.v[0], Ovoid.Frame.size.v[1]);

  Ovoid.gl.clearColor(Ovoid.Drawer.opt_clearColor[0],
      Ovoid.Drawer.opt_clearColor[1],
      Ovoid.Drawer.opt_clearColor[2],
      Ovoid.Drawer.opt_clearColor[3]);

  Ovoid.gl.clear(Ovoid.gl.COLOR_BUFFER_BIT | Ovoid.gl.DEPTH_BUFFER_BIT);
  
  /* blending */
  Ovoid.gl.enable(Ovoid.gl.BLEND);
  Ovoid.gl.blendFunc(Ovoid.gl.SRC_ALPHA, Ovoid.gl.ONE_MINUS_SRC_ALPHA);
  /* geometrie */
  Ovoid.gl.lineWidth(1.0);
  /* genere INVALID_ENUM */
  //Ovoid.gl.enable(Ovoid.gl.VERTEX_PROGRAM_POINT_SIZE);
  /* face culling par defaut */
  Ovoid.gl.disable(Ovoid.gl.CULL_FACE);
  Ovoid.gl.cullFace(Ovoid.gl.BACK);
  Ovoid.gl.enable(Ovoid.gl.DEPTH_TEST);
  /* configuration depth par defaut */
  Ovoid.gl.depthMask(true);
  Ovoid.gl.depthFunc(Ovoid.gl.LESS);
  /* configuration du stencil */
  Ovoid.gl.disable(Ovoid.gl.STENCIL_TEST);

  Ovoid.Drawer.updateViewport();

  if (Ovoid._logGlerror('Ovoid.Drawer.init:base'))
    return false;

  /* Performance counter */
  var t = (new Date().getTime());
  
  /* ambient color par defaut */
  Ovoid.Drawer._f32aryac[0] = Ovoid.Drawer.opt_ambientColor[0];
  Ovoid.Drawer._f32aryac[1] = Ovoid.Drawer.opt_ambientColor[1];
  Ovoid.Drawer._f32aryac[2] = Ovoid.Drawer.opt_ambientColor[2];
  Ovoid.Drawer._f32aryac[3] = Ovoid.Drawer.opt_ambientColor[3];

  /* creation du mesh wire box par defaut */
  var boxbuf = [
    0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, -0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, -0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, -0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, -0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, -0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, -0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, -0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, -0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, -0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, -0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.5, -0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.5, -0.5, -0.5, 1.0, 1.0, 1.0, 1.0, 1.0];

  Ovoid.Drawer._bostock[0] = Ovoid.gl.createBuffer();

  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[0]);

  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
                      new Float32Array(boxbuf),
                      Ovoid.gl.STATIC_DRAW);


  /* creation du mesh wire _sphere par defaut */
  var spherebuf = Ovoid.Vertex.newArray(24 * 3 * 2);

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

    spherebuf[ix].p.set(cosI, 0.0, sinI, 1.0);
    spherebuf[ix + 1].p.set(cosII, 0.0, sinII, 1.0);
    spherebuf[iy].p.set(cosI, sinI, 0.0, 1.0);
    spherebuf[iy + 1].p.set(cosII, sinII, 0.0, 1.0);
    spherebuf[iz].p.set(0.0, cosI, sinI, 1.0);
    spherebuf[iz + 1].p.set(0.0, cosII, sinII, 1.0);

    spherebuf[ix].c.set(1.0, 1.0, 1.0, 1.0);
    spherebuf[ix + 1].c.set(1.0, 1.0, 1.0, 1.0);
    spherebuf[iy].c.set(1.0, 1.0, 1.0, 1.0);
    spherebuf[iy + 1].c.set(1.0, 1.0, 1.0, 1.0);
    spherebuf[iz].c.set(1.0, 1.0, 1.0, 1.0);
    spherebuf[iz + 1].c.set(1.0, 1.0, 1.0, 1.0);

    j++;
  }

  Ovoid.Drawer._bostock[1] = Ovoid.gl.createBuffer();

  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[1]);

  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
                      Ovoid.Vertex.arrayAsVbo(Ovoid.VERTEX_VEC4_P |
                                              Ovoid.VERTEX_VEC4_C,
                                              spherebuf),
                      Ovoid.gl.STATIC_DRAW);
  
  /* creation du mesh axis par defaut */
  var axisbuf = [
    0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
    0.25, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
    0.0, 0.25, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 0.25, 1.0, 0.0, 0.0, 1.0, 1.0];

  Ovoid.Drawer._bostock[2] = Ovoid.gl.createBuffer();

  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[2]);

  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
                      new Float32Array(axisbuf),
                      Ovoid.gl.STATIC_DRAW);


  /* creation du mesh joint-bone par defaut */
  var jointbuf = Ovoid.Vertex.newArray(12 * 3 * 2);

  /* d'abord la _sphere Joint : 72 vertices */
  sd = 12.0;
  var j = 0;
  for (var i = 0; i < 12 * 2; i += 2)
  {
    sinI = Math.sin((Ovoid._2PI) * (j / sd)) * 0.07;
    cosI = Math.cos((Ovoid._2PI) * (j / sd)) * 0.07;
    sinII = Math.sin((Ovoid._2PI) * ((j + 1) / sd)) * 0.07;
    cosII = Math.cos((Ovoid._2PI) * ((j + 1) / sd)) * 0.07;

    ix = i;
    iy = ix + (12 * 2);
    iz = iy + (12 * 2);

    jointbuf[ix].p.set(cosI, 0.0, sinI, 1.0);
    jointbuf[ix + 1].p.set(cosII, 0.0, sinII, 1.0);
    jointbuf[iy].p.set(cosI, sinI, 0.0, 1.0);
    jointbuf[iy + 1].p.set(cosII, sinII, 0.0, 1.0);
    jointbuf[iz].p.set(0.0, cosI, sinI, 1.0);
    jointbuf[iz + 1].p.set(0.0, cosII, sinII, 1.0);

    jointbuf[ix].c.set(1.0, 1.0, 1.0, 1.0);
    jointbuf[ix + 1].c.set(1.0, 1.0, 1.0, 1.0);
    jointbuf[iy].c.set(1.0, 1.0, 1.0, 1.0);
    jointbuf[iy + 1].c.set(1.0, 1.0, 1.0, 1.0);
    jointbuf[iz].c.set(1.0, 1.0, 1.0, 1.0);
    jointbuf[iz + 1].c.set(1.0, 1.0, 1.0, 1.0);

    j++;
  }
  Ovoid.Drawer._bostock[3] = Ovoid.gl.createBuffer();

  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[3]);

  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
                      Ovoid.Vertex.arrayAsVbo(Ovoid.VERTEX_VEC4_P |
                                                  Ovoid.VERTEX_VEC4_C,
                                                  jointbuf),
                      Ovoid.gl.STATIC_DRAW);

  /* creation du mesh light par defaut */
  var coneBuf = [
    0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.25, 0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.25, 0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.25, -0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.25, -0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.25, 0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.25, 0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.25, 0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.25, -0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    -0.25, -0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.25, -0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.25, -0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    0.25, 0.25, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

  Ovoid.Drawer._bostock[5] = Ovoid.gl.createBuffer();

  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER,
                      Ovoid.Drawer._bostock[5]);

  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,
                      new Float32Array(coneBuf),
                      Ovoid.gl.STATIC_DRAW);
  
  /* unbind tous les buffers */
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, null);
  Ovoid.gl.bindBuffer(Ovoid.gl.ELEMENT_ARRAY_BUFFER, null);
  
  /* creation du frame buffer object pour le picking */
  Ovoid.Drawer._rprendrtex = Ovoid.gl.createTexture();

  Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D,
      Ovoid.Drawer._rprendrtex);

  Ovoid.gl.texImage2D(Ovoid.gl.TEXTURE_2D,
      0, Ovoid.gl.RGBA,
      Ovoid.PICKING_OFFSCREEN_FRAME_X,
      Ovoid.PICKING_OFFSCREEN_FRAME_Y,
      0, Ovoid.gl.RGBA,
      Ovoid.gl.UNSIGNED_BYTE, null);

  /* unbind la texture, c'est TRES important */
  Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D, null);

  Ovoid.Drawer._rprendrbuf = Ovoid.gl.createRenderbuffer();

  Ovoid.gl.bindRenderbuffer(Ovoid.gl.RENDERBUFFER,
      Ovoid.Drawer._rprendrbuf);

  Ovoid.gl.renderbufferStorage(Ovoid.gl.RENDERBUFFER,
      Ovoid.gl.DEPTH_COMPONENT16,
      Ovoid.PICKING_OFFSCREEN_FRAME_X,
      Ovoid.PICKING_OFFSCREEN_FRAME_Y);

  Ovoid.Drawer._rpframebuf = Ovoid.gl.createFramebuffer();

  Ovoid.gl.bindFramebuffer(Ovoid.gl.FRAMEBUFFER, Ovoid.Drawer._rpframebuf);

  Ovoid.gl.framebufferTexture2D(Ovoid.gl.FRAMEBUFFER,
                                Ovoid.gl.COLOR_ATTACHMENT0,
                                Ovoid.gl.TEXTURE_2D,
                                Ovoid.Drawer._rprendrtex, 0);

  Ovoid.gl.framebufferRenderbuffer(Ovoid.gl.FRAMEBUFFER,
      Ovoid.gl.DEPTH_ATTACHMENT,
      Ovoid.gl.RENDERBUFFER,
      Ovoid.Drawer._rprendrbuf);
  
  /* unbind tous les buffers */
  Ovoid.gl.bindFramebuffer(Ovoid.gl.FRAMEBUFFER, null);
  Ovoid.gl.bindRenderbuffer(Ovoid.gl.RENDERBUFFER, null);
  
  if (Ovoid._logGlerror('Ovoid.Drawer.init:config'))
    return false;

  Ovoid.log(3, 'Ovoid.Drawer', 'initialized in: ' + 
      ((new Date().getTime() - t) * 0.001) + 's');

  return true;
};


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
 * @param {int} slot Symbolic constant for drawing pipeline. Can be one of the 
 * following ones:
 * Ovoid.DRAWER_SP_COLOR,<br>
 * Ovoid.DRAWER_SP_VERTEX_COLOR,<br>
 * Ovoid.DRAWER_SP_1LIGHT,<br>
 * Ovoid.DRAWER_SP_NLIGHT,<br>
 * Ovoid.DRAWER_SP_TEXT,<br>
 * Ovoid.DRAWER_SP_LAYER,<br>
 * Ovoid.DRAWER_SP_PARTICLES<br><br>
 * 
 * @param {int} id Shader index.
 * 
 * @return {bool} True if plug succeeds, false if id is not a valid index.
 */
Ovoid.Drawer.plugShader = function(slot, id) {
  
  if(!Ovoid.Drawer._splib[id])
    return false;

  Ovoid.Drawer._spslot[slot] = id;
  return true;
};


/**
 * Switch shader program.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {int} id Shader id to swith.
 */
Ovoid.Drawer._switchSp = function(id) {

  Ovoid.Drawer._sp = Ovoid.Drawer._splib[Ovoid.Drawer._spslot[id]];
  Ovoid.Drawer._spslot[0] = Ovoid.Drawer._spslot[1];
  Ovoid.Drawer._spslot[1] = Ovoid.Drawer._spslot[id];
  Ovoid.gl.useProgram(Ovoid.Drawer._sp.proghandle);
};


/**
 * Restore the preview used shader.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 */
Ovoid.Drawer._restorSp = function() {
  
  Ovoid.Drawer._sp = Ovoid.Drawer._splib[Ovoid.Drawer._spslot[0]];
  Ovoid.Drawer._spslot[1] = Ovoid.Drawer._spslot[0];
  Ovoid.gl.useProgram(Ovoid.Drawer._sp.proghandle);
};


Ovoid.Drawer._switchBlend = function(id) {

  Ovoid.Drawer._blswap[0] = Ovoid.Drawer._blswap[1];
  Ovoid.Drawer._blswap[1] = id;
  switch(id)
  {
    case 1:
      // Blend alpha additif
      Ovoid.gl.blendFunc(Ovoid.gl.SRC_ALPHA, Ovoid.gl.ONE);
    break;
    case 2:
      // Blend couleur additive
      Ovoid.gl.blendFunc(Ovoid.gl.ONE, Ovoid.gl.ONE);
    break;
    default:
      // Blend soustractif 
      Ovoid.gl.blendFunc(Ovoid.gl.SRC_ALPHA, Ovoid.gl.ONE_MINUS_SRC_ALPHA);
    break;
  }
};

Ovoid.Drawer._restoreBlend = function() {
  
  Ovoid.Drawer._switchBlend(Ovoid.Drawer._blswap[0]);
};

/**
 * Draw the rendering queue.
 * <br>
 * <br>
 * Draw the current render queue according drawing options.
 * This function take no argument because it work directly with Ovoid.Queuer's
 * node stacks to draw the scene. This function should be called after an
 * <code>Ovoid.Queuer.QueueScene()</code> call. 
 * <br>
 * <br>
 * This methode is automaticaly called at each main loop. 
 * It shoulds not be called manually.
 * 
 * @see Ovoid.Queuer
 */
Ovoid.Drawer.drawQueue = function() {
  
  if (Ovoid.Frame.changed) {
    Ovoid.Drawer.updateViewport();
  }

  Ovoid.gl.clear(Ovoid.gl.COLOR_BUFFER_BIT | Ovoid.gl.DEPTH_BUFFER_BIT);

  Ovoid.Drawer._drawnpolyset = 0;
  Ovoid.Drawer._drawnlayer = 0;
  Ovoid.Drawer._drawnhelper = 0;
  Ovoid.Drawer._drawnmesh = 0;
  Ovoid.Drawer._drawnparticle = 0;
  Ovoid.Drawer._renderpasses = 0;

  /* dessin de la scene en mode coleur plate pour le picking */
  if (Ovoid.opt_enablePicking) {
    Ovoid.Drawer.drawStacksRPixel(Ovoid.Queuer._rcamera, 
          Ovoid.Queuer._qbody, Ovoid.Queuer._qlayer);
  }

  /* dessins des body de la scene */
  if (Ovoid.Drawer.opt_shadowCasting) {
    Ovoid.Drawer._drawnshadow = 0;
    /* Dessin en mode per-light pass Z-fail cast shadow */
    Ovoid.Drawer.drawStackWorldZfail(Ovoid.Queuer._rcamera, 
          Ovoid.Queuer._qlight, 
          Ovoid.Queuer._qbody);
  } else {
    /* Dessin en mode normal une passe N lights */
    Ovoid.Drawer.drawStackWorld(Ovoid.Queuer._rcamera, 
          Ovoid.Queuer._qlight, 
          Ovoid.Queuer._qbody);
  }

  /* dessin des helpers */
  if (Ovoid.Drawer.opt_drawHelpers) {
    Ovoid.Drawer.drawStackHelper(Ovoid.Queuer._rcamera, 
        Ovoid.Queuer._qtform);
  }

  /* dessin des layers textes et images */
  if (Ovoid.Drawer.opt_drawLayers) {
    Ovoid.Drawer.drawStackLayer(Ovoid.Queuer._qlayer);
  }
  
  /* Sais pas si c'est très utile... */
  Ovoid.gl.flush();
};


/**
 * Draw world stack for readPixels.
 * <br>
 * <br>
 * Draw scene from the given camera, body and light stacks in flat color way 
 * for picking frame.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Camera} reye Camera Object to use as point of view.
 * @param {Stack} bodyq Stack of Body Objects to draw.
 * @param {Stack} layerq Stack of Layer Objects to draw.
 * 
 * @see Ovoid.Stack
 * @see Ovoid.Camera
 * @see Ovoid.Body
 */
Ovoid.Drawer.drawStacksRPixel = function(reye, bodyq, layerq) {
  
  /* active le depth test */
  Ovoid.gl.enable(Ovoid.gl.DEPTH_TEST);

  var color = new Ovoid.Color();
  
  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_COLOR);
  /* eyeview matrix; MEV */
  Ovoid.Drawer._sp.setUniformMatrix4fv(3, reye.eyeview.m);

  Ovoid.gl.bindFramebuffer(Ovoid.gl.FRAMEBUFFER, Ovoid.Drawer._rpframebuf);
  /* clear avec un fond noir */
  Ovoid.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  Ovoid.gl.clear(Ovoid.gl.COLOR_BUFFER_BIT | Ovoid.gl.DEPTH_BUFFER_BIT);

  /* -- Dessin du monde -- */
  var i = bodyq.count;
  while (i--)
  {
    /* ne dessinge que les nodes pickable (linked a un Action) sauf si 
     * en mode debug */
    if(!bodyq[i].pickable && !Ovoid.opt_debugMode)
      continue;
      
    color.fromInt(bodyq[i].uid);
    /* set color C */
    Ovoid.Drawer._sp.setUniform4fv(9, color.v);
    
    if (bodyq[i].shape.type & Ovoid.MESH) {
      /* transform matrix; MXF */
      Ovoid.Drawer._sp.setUniformMatrix4fv(0, bodyq[i].worldMatrix.m);
      /* draw mesh */
      Ovoid.Drawer.drawMeshRPixel(bodyq[i].shape);
      continue;
    }

    if (bodyq[i].shape.type & Ovoid.SKIN)  {
      if (bodyq[i].shape.mesh) {
        /* enable vertex weight; ENw */
        Ovoid.Drawer._sp.setUniform1i(6, 1);
        /* set transform matrix; MXF Array */
        Ovoid.Drawer._sp.setUniformMatrix4fv(0, bodyq[i].shape.infMxfArray);
        /* draw mesh */
        Ovoid.Drawer.drawMeshRPixel(bodyq[i].shape.mesh);
        /* disable vertex weight; ENw */
        Ovoid.Drawer._sp.setUniform1i(6, 0);
      }
    }
  }
  
  /* -- Dessin des overlays -- */
  /* desactive le depth test */
  Ovoid.gl.disable(Ovoid.gl.DEPTH_TEST);
  /* blending de tran_sparence soustraction standard */
  Ovoid.Drawer._switchBlend(0);
  /* les overlay sont dessiné dans l'ordre pour respecté la mise en
   * avant plan selon le parentage */
  var c = layerq.count;
  for (var i = 0; i < c; i++) {
    if (layerq[i].type & Ovoid.LAYER) {
      
      color.fromInt(layerq[i].uid);

      Ovoid.Drawer.drawLayerRPixel(layerq[i], color);
    }
  }
  
  /* Read pixel a la position du pointeur actuel */
  Ovoid.gl.readPixels(Ovoid.Input.mousePosition.v[0],
                      (Ovoid.Frame.size.v[1] - Ovoid.Input.mousePosition.v[1]),
                      1,
                      1,
                      Ovoid.gl.RGBA,
                      Ovoid.gl.UNSIGNED_BYTE,
                      Ovoid.Drawer._rpcolbytes);

  Ovoid.gl.bindFramebuffer(Ovoid.gl.FRAMEBUFFER, null);

  Ovoid.Input.mouseLeaveUid = Ovoid.Input.mouseOverUid;
  
  /* convertis RGB en entier */
  Ovoid.Input.mouseOverUid = 0x000000 |
      ((Ovoid.Drawer._rpcolbytes[0]) << 16) |
      ((Ovoid.Drawer._rpcolbytes[1]) << 8) |
      ((Ovoid.Drawer._rpcolbytes[2]));
  
  if(Ovoid.Input.mouseLeaveUid != Ovoid.Input.mouseOverUid) {
    Ovoid.Input.mouseEnterUid = Ovoid.Input.mouseOverUid;
  } else {
    Ovoid.Input.mouseEnterUid = Ovoid.Input.mouseLeaveUid = 0;
  }

  /* replace le clear color original */
  Ovoid.gl.clearColor(Ovoid.Drawer.opt_clearColor[0],
                      Ovoid.Drawer.opt_clearColor[1],
                      Ovoid.Drawer.opt_clearColor[2],
                      Ovoid.Drawer.opt_clearColor[3]);
  
  Ovoid.Drawer._renderpasses++;
};


/**
 * Draw body stack.
 * <br>
 * <br>
 * Draw all bodys of the given stack.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Stack} bodyq Stack of Body Objects to draw.
 * 
 * @see Ovoid.Stack
 * @see Ovoid.Body
 */
Ovoid.Drawer.drawBodyStack = function(bodyq) {
  
  var i = bodyq.count;
  while (i--) {
    if (bodyq[i].shape.type & Ovoid.MESH) {
      /*  transform matrix MXF */
      Ovoid.Drawer._sp.setUniformMatrix4fv(0,bodyq[i].worldMatrix.m);
      /* normal matrix MNR */
      Ovoid.Drawer._sp.setUniformMatrix3fv(1,bodyq[i].normalMatrix.m);
      /* draw mesh */
      Ovoid.Drawer.drawMesh(bodyq[i].shape);
      /* les body sont world-cach si ils sont dessinés */
      bodyq[i].addCach(Ovoid.CACH_WORLD);
      continue;
    }
    if (bodyq[i].shape.type & Ovoid.SKIN) {
      if (bodyq[i].shape.mesh) {
        /* enable vertex weight; ENw */
        Ovoid.Drawer._sp.setUniform1i(6, 1);
        /* transform matrix; MXF Array */
        Ovoid.Drawer._sp.setUniformMatrix4fv(0,bodyq[i].shape.infMxfArray);
        /* normal matrix; MNR Array */
        Ovoid.Drawer._sp.setUniformMatrix3fv(1,bodyq[i].shape.infMnrArray);
        /* draw mesh */
        Ovoid.Drawer.drawMesh(bodyq[i].shape.mesh);
        /* disable vertex weight ENw */
        Ovoid.Drawer._sp.setUniform1i(6, 0);
        /* les skin sont world-cach si ils sont dessinés */
        bodyq[i].addCach(Ovoid.CACH_WORLD);
      }
      continue;
    }
    if (bodyq[i].shape.type & Ovoid.EMITTER) {
      /*  transform matrix MXF */
      Ovoid.Drawer._sp.setUniformMatrix4fv(0,bodyq[i].worldMatrix.m);
      /* draw particles */
      Ovoid.Drawer.drawParticles(bodyq[i].shape);
      /* les body sont world-cach si ils sont dessinés */
      bodyq[i].addCach(Ovoid.CACH_WORLD);
    }
  }
  
  Ovoid.Drawer._renderpasses++;
};


/**
 * Draw world stack.
 * <br>
 * <br>
 * Draw scene from the given camera, body and light stacks in shading way with 
 * multiple lights in one render pass.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Camera} reye Camera Object to use as point of view.
 * @param {Stack} lightq Stack of Light Objects to use for scene lighting.
 * @param {Stack} bodyq Stack of Body Objects to draw.
 * 
 * @see Ovoid.Stack
 * @see Ovoid.Camera
 * @see Ovoid.Light
 * @see Ovoid.Body
 */
Ovoid.Drawer.drawStackWorld = function(reye, lightq, bodyq) {
  
  var i;
  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_NLIGHT);
  /* eyeview matrix; MEV */
  Ovoid.Drawer._sp.setUniformMatrix4fv(3, reye.eyeview.m);
  /* eye position; Ep */
  Ovoid.Drawer._sp.setUniform4fv(30, reye.worldPosition.v);
  /* ambient color; Ac */
  Ovoid.Drawer._sp.setUniform4fv(40, Ovoid.Drawer._f32aryac);

  /* blending de tran_sparence soustraction standard */
  Ovoid.gl.enable(Ovoid.gl.BLEND);
  Ovoid.Drawer._switchBlend(0);
  /* Depth testing */
  Ovoid.gl.enable(Ovoid.gl.DEPTH_TEST);
  Ovoid.gl.depthFunc(Ovoid.gl.LESS);

  /* light attribs ; Le, Lp, Ld, Lc, Li, Lr, Lf, La */
  /* Construction du tableau */
  var lc = lightq.count;
  for (i = 0; i < Ovoid.MAX_LIGHT_BY_DRAW; i++) {
    if (i < lc) {
      Ovoid.Drawer._f32aryle[i] = 1;
      Ovoid.Drawer._f32arylp.set(lightq[i].worldPosition.v, i * 4);
      Ovoid.Drawer._f32aryld.set(lightq[i].worldDirection.v, i * 3);
      Ovoid.Drawer._f32arylc.set(lightq[i].color.v, i * 4);
      Ovoid.Drawer._f32aryli[i] = lightq[i].intensity;
      Ovoid.Drawer._f32arylr[i] = lightq[i].range;
      Ovoid.Drawer._f32arylf[i] = lightq[i].falloff;
      Ovoid.Drawer._f32aryla[i] = lightq[i].spotAngle;
    } else {
      Ovoid.Drawer._f32aryle[i] = 0;
    }
  }
  /* Passe le tableau au shader */
  Ovoid.Drawer._sp.setUniform1iv(28, Ovoid.Drawer._f32aryle);
  Ovoid.Drawer._sp.setUniform4fv(20, Ovoid.Drawer._f32arylp);
  Ovoid.Drawer._sp.setUniform3fv(21, Ovoid.Drawer._f32aryld);
  Ovoid.Drawer._sp.setUniform4fv(22, Ovoid.Drawer._f32arylc);
  Ovoid.Drawer._sp.setUniform1fv(23, Ovoid.Drawer._f32aryli);
  Ovoid.Drawer._sp.setUniform1fv(24, Ovoid.Drawer._f32arylr);
  Ovoid.Drawer._sp.setUniform1fv(25, Ovoid.Drawer._f32arylf);
  Ovoid.Drawer._sp.setUniform1fv(26, Ovoid.Drawer._f32aryla);

  Ovoid.Drawer._sp.setUniform1i(0, 1);    /* enable diffuse; ENd */
  Ovoid.Drawer._sp.setUniform1i(1, 1);    /* enable ambient; ENa */

  /* Dessins des bodys */
  Ovoid.Drawer.drawBodyStack(bodyq);
};


/**
 * Draw world stack in Z-fail.
 * <br>
 * <br>
 * Draw scene from the given camera, body and light stacks in shading way with 
 * multiple lights in z-fail cast shadow per-light render pass.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Camera} reye Camera Object to use as point of view.
 * @param {Stack} lightq Stack of Light Objects to use for scene lighting.
 * @param {Stack} bodyq Stack of Body Objects to draw.
 * 
 * @see Ovoid.Stack
 * @see Ovoid.Camera
 * @see Ovoid.Light
 * @see Ovoid.Body
 */
Ovoid.Drawer.drawStackWorldZfail = function(reye, lightq, bodyq) {
  
  /* On force le face culling */    
  Ovoid.gl.enable(Ovoid.gl.CULL_FACE);
  
  Ovoid.gl.enable(Ovoid.gl.BLEND);
  /* Premiere passe : dessin de la scene lumiere & effets ambients */

  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_1LIGHT);
  /* eyeview matrix; MEV */
  Ovoid.Drawer._sp.setUniformMatrix4fv(3, reye.eyeview.m);
  /* eye position; Ep */
  Ovoid.Drawer._sp.setUniform4fv(30, reye.worldPosition.v);
  /* ambient color; Ac */
  Ovoid.Drawer._sp.setUniform4fv(40, Ovoid.Drawer._f32aryac);

  Ovoid.Drawer._sp.setUniform1i(0, 0);    /* disable diffuse; ENd */
  Ovoid.Drawer._sp.setUniform1i(1, 1);    /* enable ambient; ENa */

  Ovoid.gl.enable(Ovoid.gl.DEPTH_TEST);
  Ovoid.gl.depthFunc(Ovoid.gl.LESS);

  /* Blend func standard */
  Ovoid.Drawer._switchBlend(0);
  /* Dessins des bodys */
  Ovoid.Drawer.drawBodyStack(bodyq);

  /* ecriture du depth buffer desactivé */
  Ovoid.gl.depthMask(0);
  /* blending additif pour les passes by-light */
  Ovoid.Drawer._switchBlend(2);
  /* Passe de dessin par-lumière */
  var l = lightq.count;
  while (l--)
  {
    /* si la lumiere projette des ombres */
    if (lightq[l].shadowCasting)
    {
      /* Dessin des shadow volums */
      
      /* disable ambient; ENa */
      Ovoid.Drawer._sp.setUniform1i(1, 0);
      Ovoid.gl.depthFunc(Ovoid.gl.LESS);
      /* enable le stencil test */
      Ovoid.gl.enable(Ovoid.gl.STENCIL_TEST);
      /* on efface le stencil buffer */
      Ovoid.gl.clear(Ovoid.gl.STENCIL_BUFFER_BIT);
      /* desactive l'ecriture du buffer RGBA */
      Ovoid.gl.colorMask(0, 0, 0, 0);
      /* stencil func en passe toujours */
      Ovoid.gl.stencilFunc(Ovoid.gl.ALWAYS, 0, 0);

      var i = bodyq.count;
      while (i--) {
        if (bodyq[i].shape.type & Ovoid.MESH) {
          /* transform matrix; MXF */
          Ovoid.Drawer._sp.setUniformMatrix4fv(0, bodyq[i].worldMatrix.m);
          /* draw shadow volum */
          Ovoid.Drawer.drawShadowVolum(bodyq[i], lightq[l]);
        }

        if (bodyq[i].shape.type & Ovoid.SKIN) {
          if (bodyq[i].shape.mesh) {
            /* transform matrix; MXF */
            Ovoid.Drawer._sp.setUniformMatrix4fv(0, bodyq[i].worldMatrix.m);
            /* draw shadow volum */
            /* Le dessins des shadow volum pour les skin n'est pas
             * encore implémenté. Ne le sera peut-être jamais, vu que
             * l'opération s'avèrerait très gourmande en calculs */
            /* MAJ : tentative d'implémentation des shadow volum pour les skin */
            if (Ovoid.opt_localSkinData) {
                Ovoid.Drawer.drawShadowVolum(bodyq[i], lightq[l]);
            }
          }
        }
      }

      /* configuration stencil _speciale z-fail */
      Ovoid.gl.stencilFunc(Ovoid.gl.EQUAL, 0, -1);
      Ovoid.gl.stencilOp(Ovoid.gl.KEEP, Ovoid.gl.KEEP, Ovoid.gl.KEEP);
      /* reactive l'ecriture du buffer RGBA */
      Ovoid.gl.colorMask(1, 1, 1, 1);
    }

    /* Dessins de la scenne en blend additif pour ajouter l'éclairage
     * diffus */
  
    /* enable diffuse ENd */
    Ovoid.Drawer._sp.setUniform1i(0, 1);
    /* changement du depth func */
    Ovoid.gl.depthFunc(Ovoid.gl.EQUAL);

    /* light attribs ; Le, Lp, Ld, Lc, Li, Lr, Lf, La */
    Ovoid.Drawer._sp.setUniform4fv(20, lightq[l].worldPosition.v);
    Ovoid.Drawer._sp.setUniform3fv(21, lightq[l].worldDirection.v);
    Ovoid.Drawer._sp.setUniform4fv(22, lightq[l].color.v);
    Ovoid.Drawer._sp.setUniform1f(23, lightq[l].intensity);
    Ovoid.Drawer._sp.setUniform1f(24, lightq[l].range);
    Ovoid.Drawer._sp.setUniform1f(25, lightq[l].falloff);
    Ovoid.Drawer._sp.setUniform1f(26, lightq[l].spotAngle);

    /* Dessins des bodys */
    Ovoid.Drawer.drawBodyStack(bodyq);
  }
  /* activation de l'ecriture du depth buffer */
  Ovoid.gl.depthMask(1);
  Ovoid.gl.depthFunc(Ovoid.gl.LESS);
  /* disable le stencil test */
  Ovoid.gl.disable(Ovoid.gl.STENCIL_TEST);
  /* blending de transparence soustraction standard */
  Ovoid.Drawer._switchBlend(0);
};


/**
 * Draw helper stack.
 * <br>
 * <br>
 * Draw helpers and dummy of the given transform's inherited stack.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Camera} reye Camera Object to use as point of view.
 * @param {Stack} transformq Stack of Transform's inherited Object to draw 
 * helpers.
 * 
 * @see Ovoid.Stack
 * @see Ovoid.Camera
 * @see Ovoid.Transform
 */
Ovoid.Drawer.drawStackHelper = function(reye, transformq) {

  /* Dessins des elements symboliques et helpers */
  /* desactive le depth test */
  Ovoid.gl.disable(Ovoid.gl.DEPTH_TEST);
  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_VERTEX_COLOR);
  /* eyeview matrix; MEV */
  Ovoid.Drawer._sp.setUniformMatrix4fv(3, reye.eyeview.m);
  var i = transformq.count;
  while (i--) {
    Ovoid.Drawer.drawSymbolic(transformq[i]);
  }
};


/**
 * Draw layer stack.
 * <br>
 * <br>
 * Draw layers from the given stack.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Stack} layerq Stack of Layer Objects to draw.
 * 
 * @see Ovoid.Stack
 * @see Ovoid.Layer
 */
Ovoid.Drawer.drawStackLayer = function(layerq) {
  
  /* desactive le depth test */
  Ovoid.gl.disable(Ovoid.gl.DEPTH_TEST);
  /* blending de tran_sparence soustraction standard */
  Ovoid.Drawer._switchBlend(0);
  /* les overlay sont dessiné dans l'ordre pour re_specté la mise en
   * avant plan selon le parentage */
  var c = layerq.count;
  for (var i = 0; i < c; i++) {
    if (layerq[i].type & Ovoid.TEXT) {
      Ovoid.Drawer.drawText(layerq[i]);
      continue;
    }
    if (layerq[i].type & Ovoid.LAYER) {
      Ovoid.Drawer.drawLayer(layerq[i]);
    }
  }
};


/**
 * Draw layer overlay.
 * <br>
 * <br>
 * Draw a Layer Object.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Layer} layer Layer Object to draw.
 * 
 * @see Ovoid.Layer
 */
Ovoid.Drawer.drawLayer = function(layer) {

  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_LAYER);
  /* transform matrix; MXF */
  Ovoid.Drawer._sp.setUniformMatrix4fv(0, layer.worldMatrix.m);
  /* layer size */
  Ovoid.Drawer._sp.setUniform3fv(42, layer.size.v);
  /* color; C */
  Ovoid.Drawer._sp.setUniform4fv(9, layer.bgColor.v);
  Ovoid.gl.activeTexture(Ovoid.gl.TEXTURE0 + 1);
  
  (layer.bgTexture != null)?
      layer.bgTexture.bind():
      Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D, Ovoid.Drawer._blanktexture);
      
  /* texture sampler diffuse; Sd */
  Ovoid.Drawer._sp.setUniformSampler(1, 1);
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[6]);
  Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
                                            Ovoid.VERTEX_VEC3_U,
                                            28);
  Ovoid.gl.drawArrays(Ovoid.gl.TRIANGLES, 0, 6);
  Ovoid.Drawer._drawnlayer++;
};


/**
 * Draw layer overlay for readPixels.
 * <br>
 * <br>
 * Draw a Layer Object.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Layer} layer Layer Object to draw.
 * @param {Color} color Symbolic color for this layer.
 * 
 * @see Ovoid.Layer
 */
Ovoid.Drawer.drawLayerRPixel = function(layer, color) {

  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_LAYER);
  /* transform matrix; MXF */
  Ovoid.Drawer._sp.setUniformMatrix4fv(0, layer.worldMatrix.m);
  /* layer size */
  Ovoid.Drawer._sp.setUniform3fv(42, layer.size.v);
  /* color; C */
  Ovoid.Drawer._sp.setUniform4fv(9, color.v);
  Ovoid.gl.activeTexture(Ovoid.gl.TEXTURE0 + 1);
  
  Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D, Ovoid.Drawer._blanktexture);
      
  /* texture sampler diffuse; Sd */
  Ovoid.Drawer._sp.setUniformSampler(1, 1);
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[6]);
  Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
                                            Ovoid.VERTEX_VEC3_U,
                                            28);
  Ovoid.gl.drawArrays(Ovoid.gl.TRIANGLES, 0, 6);
  Ovoid.Drawer._drawnlayer++;
};


/**
 * Draw text overlay.
 * <br>
 * <br>
 * Draw a Text Object. 
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Text} text Text Object to draw.
 * 
 * @see Ovoid.Text
 */
Ovoid.Drawer.drawText = function(text) {
  
  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_TEXT);

  var c = 0;
  var u = 0;
  var l = 0;
  var a;
  var b;
  var x = (text.size.v[0] * text.size.v[1]);
  var y = (text.size.v[0] * text.size.v[2]);
  var z = text.size.v[0];

  var n = text.string.length;
  var V = new Float32Array(n*4);
  
  for (var i = 0; i < n; i++)
  {
    b = a; /* old a == charCodeAt(i - 1) */
    a = text.string.charCodeAt(i);
    if (a == 0x0A) { /* \n */
      l++; u = 0; continue;
    }
    if (a == 0x09) { /* \t */
      u += 4; continue;
    }
    if (a == 0xC2 || a == 0xC3) { /* unicod premier octect */
      continue;
    }
    if (b == 0xC3) { /* unicod correction d'index */
      a += 64;
    }
    V[c] = x + (u * x);
    V[c + 1] = (y * 0.5) + (l * y);
    V[c + 2] = z;
    V[c + 3] = a - 32;
    c += 4; u++;
  }
  /* transform matrix; MXF */
  Ovoid.Drawer._sp.setUniformMatrix4fv(0, text.worldMatrix.m);
  /* color; C */
  Ovoid.Drawer._sp.setUniform4fv(9, text.fgColor.v);
  Ovoid.gl.activeTexture(Ovoid.gl.TEXTURE0 + 1);

  (text.fontmapTexture != null) ?
      text.fontmapTexture.bind() :
      Ovoid.Drawer._fontmap.bind();

  /* texture sampler diffuse; Sd */
  Ovoid.Drawer._sp.setUniformSampler(1, 1);
  
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[7]);
  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER,V,Ovoid.gl.DYNAMIC_DRAW);
  Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P, 16);
  Ovoid.gl.drawArrays(Ovoid.gl.POINTS, 0, c*0.25);
  
  Ovoid.Drawer._drawnlayer++;
};


/**
 * Draw pseudo-box shape.
 * <br>
 * <br>
 * Draw symbolic pseudo box.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Matrix4} matrix Transformation matrix.
 * @param {Vector} scale Vector for box's X, Y and Z size.
 * @param {Color} color Box color.
 * 
 * @see Ovoid.Matrix4
 * @see Ovoid.Vector
 * @see Ovoid.Color
 */
Ovoid.Drawer.drawPseudoBox = function(matrix, scale, color) {
  
  Ovoid.Drawer._f32arymxf.set(matrix.m);
  Ovoid.Drawer._f32arymxf[0] *= scale.v[0];
  Ovoid.Drawer._f32arymxf[1] *= scale.v[1];
  Ovoid.Drawer._f32arymxf[2] *= scale.v[2];
  Ovoid.Drawer._f32arymxf[4] *= scale.v[0];
  Ovoid.Drawer._f32arymxf[5] *= scale.v[1];
  Ovoid.Drawer._f32arymxf[6] *= scale.v[2];
  Ovoid.Drawer._f32arymxf[8] *= scale.v[0];
  Ovoid.Drawer._f32arymxf[9] *= scale.v[1];
  Ovoid.Drawer._f32arymxf[10] *= scale.v[2];
  /* color; C */
  Ovoid.Drawer._sp.setUniform4fv(9, color.v);
  /* transform matrix; MXF */
  Ovoid.Drawer._sp.setUniformMatrix4fv(0, Ovoid.Drawer._f32arymxf);
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[0]);
  Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
      Ovoid.VERTEX_VEC4_C,
      32);
  Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 24);
  Ovoid.Drawer._drawnhelper++;
};


/**
 * Draw pseudo-sphere shape.
 * <br>
 * <br>
 * Draw a symbolic pseudo sphere.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Matrix4} matrix Transformation matrix.
 * @param {Vector} scale Vector for sphere's X, Y and Z size.
 * @param {Color} color Sphere color.
 * 
 * @see Ovoid.Matrix4
 * @see Ovoid.Vector
 * @see Ovoid.Color
 */
Ovoid.Drawer.drawPseudoSphere = function(matrix, scale, color) {
  
  Ovoid.Drawer._f32arymxf.set(matrix.m);
  Ovoid.Drawer._f32arymxf[0] *= scale.v[0];
  Ovoid.Drawer._f32arymxf[1] *= scale.v[1];
  Ovoid.Drawer._f32arymxf[2] *= scale.v[2];
  Ovoid.Drawer._f32arymxf[4] *= scale.v[0];
  Ovoid.Drawer._f32arymxf[5] *= scale.v[1];
  Ovoid.Drawer._f32arymxf[6] *= scale.v[2];
  Ovoid.Drawer._f32arymxf[8] *= scale.v[0];
  Ovoid.Drawer._f32arymxf[9] *= scale.v[1];
  Ovoid.Drawer._f32arymxf[10] *= scale.v[2];
  /* color; C */
  Ovoid.Drawer._sp.setUniform4fv(9, color.v);
  /* transform matrix; MXF */
  Ovoid.Drawer._sp.setUniformMatrix4fv(0, Ovoid.Drawer._f32arymxf);
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[1]);
  Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
                                    Ovoid.VERTEX_VEC4_C,
                                    32);
  Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 24);
  Ovoid.Drawer._drawnhelper++;
};

/**
 * Draw symbolic shape.
 * <br>
 * <br>
 * Draw, if exist, the given transform object's symbolic form.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Transform} transform Transform inherited object to draw as symbolic form.
 * 
 * @see Ovoid.Transform
 */
Ovoid.Drawer.drawSymbolic = function(transform) {

  /* transform matrix; MXF */
  Ovoid.Drawer._sp.setUniformMatrix4fv(0, transform.worldMatrix.m);
  
  if (Ovoid.Drawer.opt_drawAxis) {
    /* color; C */
    Ovoid.Drawer._sp.setUniform4fv(9, Ovoid.Drawer._coloraxis.v);
    Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[2]);
    Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
        Ovoid.VERTEX_VEC4_C,
        32);
    Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 6);
    Ovoid.Drawer._drawnhelper++;
  }
  
  if ((transform.type & Ovoid.CAMERA) && Ovoid.Drawer.opt_drawCameras) {
    /* color; C */
    Ovoid.Drawer._sp.setUniform4fv(9, Ovoid.Drawer._colorcame.v);
    Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[5]);
    Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
                                      Ovoid.VERTEX_VEC4_C,
                                      32);
    Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 16);
    Ovoid.Drawer._drawnhelper++;
    return;
  }
  
  if ((transform.type & Ovoid.LIGHT) && Ovoid.Drawer.opt_drawLights) {
    /* color; C */
    Ovoid.Drawer._sp.setUniform4fv(9, Ovoid.Drawer._colorligh.v);
    Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[5]);
    Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
        Ovoid.VERTEX_VEC4_C,
        32);
    Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 16);
    Ovoid.Drawer._drawnhelper++;
    return;
  }
  
  if ((transform.type & Ovoid.JOINT) && Ovoid.Drawer.opt_drawJointBones) {

    Ovoid.Drawer._f32arymxf.set(transform.worldMatrix.m);
    var S = Ovoid.Drawer.opt_jointSize * transform.size;
    Ovoid.Drawer._f32arymxf[0] *= S; 
    Ovoid.Drawer._f32arymxf[1] *= S; 
    Ovoid.Drawer._f32arymxf[2] *= S;
    Ovoid.Drawer._f32arymxf[4] *= S; 
    Ovoid.Drawer._f32arymxf[5] *= S; 
    Ovoid.Drawer._f32arymxf[6] *= S;
    Ovoid.Drawer._f32arymxf[8] *= S; 
    Ovoid.Drawer._f32arymxf[9] *= S; 
    Ovoid.Drawer._f32arymxf[10] *= S;
    /* transform matrix; MXF */
    Ovoid.Drawer._sp.setUniformMatrix4fv(0, Ovoid.Drawer._f32arymxf);
    /* color; C */
    Ovoid.Drawer._sp.setUniform4fv(9, Ovoid.Drawer._colorbone.v);
    Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[3]);
    Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
        Ovoid.VERTEX_VEC4_C,
        32);
    Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 72);

    Ovoid.Drawer._drawnhelper++;
    return;
  }
  
  if(transform.type & Ovoid.BODY) {
    
    if (Ovoid.Drawer.opt_drawBoundingBox) {
      var box = transform.boundingBox;
      
      Ovoid.Drawer._f32arymxf.set(transform.worldMatrix.m);
      Ovoid.Drawer._f32arymxf[0] *= box.hsize.v[0] * 2.0;
      Ovoid.Drawer._f32arymxf[1] *= box.hsize.v[0] * 2.0;
      Ovoid.Drawer._f32arymxf[2] *= box.hsize.v[0] * 2.0;
      Ovoid.Drawer._f32arymxf[4] *= box.hsize.v[1] * 2.0;
      Ovoid.Drawer._f32arymxf[5] *= box.hsize.v[1] * 2.0;
      Ovoid.Drawer._f32arymxf[6] *= box.hsize.v[1] * 2.0;
      Ovoid.Drawer._f32arymxf[8] *= box.hsize.v[2] * 2.0;
      Ovoid.Drawer._f32arymxf[9] *= box.hsize.v[2] * 2.0;
      Ovoid.Drawer._f32arymxf[10] *= box.hsize.v[2] * 2.0;

      Ovoid.Drawer._f32arymxf[12] += box.center.v[0] * transform.worldMatrix.m[0] +
                        box.center.v[1] * transform.worldMatrix.m[4] +
                        box.center.v[2] * transform.worldMatrix.m[8];
      Ovoid.Drawer._f32arymxf[13] += box.center.v[0] * transform.worldMatrix.m[1] +
                        box.center.v[1] * transform.worldMatrix.m[5] +
                        box.center.v[2] * transform.worldMatrix.m[9];
      Ovoid.Drawer._f32arymxf[14] += box.center.v[0] * transform.worldMatrix.m[2] +
                        box.center.v[1] * transform.worldMatrix.m[6] +
                        box.center.v[2] * transform.worldMatrix.m[10];

      /* color; C */
      Ovoid.Drawer._sp.setUniform4fv(9, Ovoid.Drawer._colorbbox.v);
      /* transform matrix; MXF */
      Ovoid.Drawer._sp.setUniformMatrix4fv(0, Ovoid.Drawer._f32arymxf);
      Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[0]);
      Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
          Ovoid.VERTEX_VEC4_C,
          32);
      Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 24);
      Ovoid.Drawer._drawnhelper++;
    }
    
    if (Ovoid.Drawer.opt_drawBoundingSphere) {
      var sph = transform.boundingSphere;
      Ovoid.Drawer._f32arymxf.set(transform.worldMatrix.m);
      Ovoid.Drawer._f32arymxf[0] *= sph.radius;
      Ovoid.Drawer._f32arymxf[1] *= sph.radius;
      Ovoid.Drawer._f32arymxf[2] *= sph.radius;
      Ovoid.Drawer._f32arymxf[4] *= sph.radius;
      Ovoid.Drawer._f32arymxf[5] *= sph.radius;
      Ovoid.Drawer._f32arymxf[6] *= sph.radius;
      Ovoid.Drawer._f32arymxf[8] *= sph.radius;
      Ovoid.Drawer._f32arymxf[9] *= sph.radius;
      Ovoid.Drawer._f32arymxf[10] *= sph.radius;

      Ovoid.Drawer._f32arymxf[12] += sph.center.v[0] * transform.worldMatrix.m[0] +
                        sph.center.v[1] * transform.worldMatrix.m[4] +
                        sph.center.v[2] * transform.worldMatrix.m[8];
      Ovoid.Drawer._f32arymxf[13] += sph.center.v[0] * transform.worldMatrix.m[1] +
                        sph.center.v[1] * transform.worldMatrix.m[5] +
                        sph.center.v[2] * transform.worldMatrix.m[9];
      Ovoid.Drawer._f32arymxf[14] += sph.center.v[0] * transform.worldMatrix.m[2] +
                        sph.center.v[1] * transform.worldMatrix.m[6] +
                        sph.center.v[2] * transform.worldMatrix.m[10];
      /* color; C */
      Ovoid.Drawer._sp.setUniform4fv(9, Ovoid.Drawer._colorbsph.v);
      /* transform matrix; MXF */
      Ovoid.Drawer._sp.setUniformMatrix4fv(0, Ovoid.Drawer._f32arymxf);
      Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[1]);
      Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P |
          Ovoid.VERTEX_VEC4_C,
          32);
      Ovoid.gl.drawArrays(Ovoid.gl.LINES, 0, 144);
      Ovoid.Drawer._drawnhelper++;
    }
  }
}

/**
 * Draw shadow volum.
 * <br>
 * <br>
 * Draw the given body's shadow volum projected by the given light.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Body} body Body Object to use as light occluder.
 * @param {Light} light Light Object to project shadow volum from.
 * 
 * @see Ovoid.Body
 * @see Ovoid.Light
 */
Ovoid.Drawer.drawShadowVolum = function(body, light) {

  if (((body.boundingBox.hsize.v[0] + body.boundingBox.hsize.v[1] + body.boundingBox.hsize.v[2])) < Ovoid.Drawer.opt_shadowCastingExclusion)
    return;

  var polyset, l, j, k, i, a, n, c;
  
  l = 0; /* TODO: implementation du Lod si besoin */
  c = body.shape.triangles[l].length;
  
  var P = new Array(6);
  P[3] = new Ovoid.Point();
  P[4] = new Ovoid.Point();
  P[5] = new Ovoid.Point();
  var LP = new Ovoid.Point();
  var LD = new Ovoid.Vector();
  // 4 float par vertex, 3 vertex par face, le double de face = 24
  var V = new Float32Array(c*24);

  // position de la lumiere en coordonnée locale à l'objet 
  LP.copy(light.worldPosition);
  LP.transform4Inverse(body.worldMatrix);

  // on parcour la liste de triangles pour creer le vertex buffer du shadow volum
  n = 0;
  for (i = 0; i < c; i++)
  {
    LD.subOf(LP, body.shape.triangles[l][i].center);
    if (LD.dot(body.shape.triangles[l][i].normal) > 0.0)
    {
      /* triangles face lumiere */
      P[0] = body.shape.vertices[l][body.shape.triangles[l][i].index[0]].p;
      P[1] = body.shape.vertices[l][body.shape.triangles[l][i].index[1]].p;
      P[2] = body.shape.vertices[l][body.shape.triangles[l][i].index[2]].p;
      
      /* triangle extrudé à l'infini lumiere */
      P[3].subOf(P[0], LP);
      P[4].subOf(P[1], LP);
      P[5].subOf(P[2], LP);

      // ( La methode d'assignation est bête et brute, mais c'est la plus rapide )
      V[n] = P[0].v[0]; n++; V[n] = P[0].v[1]; n++; V[n] = P[0].v[2]; n++; V[n] = 1.0; n++;
      V[n] = P[1].v[0]; n++; V[n] = P[1].v[1]; n++; V[n] = P[1].v[2]; n++; V[n] = 1.0; n++;
      V[n] = P[2].v[0]; n++; V[n] = P[2].v[1]; n++; V[n] = P[2].v[2]; n++; V[n] = 1.0; n++;
      
      // doivent être dessiné a l'envers pour le face-culling Front/Back 
      V[n] = P[3].v[0]; n++; V[n] = P[3].v[1]; n++; V[n] = P[3].v[2]; n++; V[n] = 0.0; n++;
      V[n] = P[5].v[0]; n++; V[n] = P[5].v[1]; n++; V[n] = P[5].v[2]; n++; V[n] = 0.0; n++;
      V[n] = P[4].v[0]; n++; V[n] = P[4].v[1]; n++; V[n] = P[4].v[2]; n++; V[n] = 0.0; n++;
      
      /* on verifie les adjacents */
      for (j = 0; j < 3; j++)
      {
        /* a-t-il une face adjacente ? */
        a = body.shape.triangles[l][i].adjacent[j];
        if (a != -1.0)
        {
          LD.subOf(LP, body.shape.triangles[l][a].center);
          if (LD.dot(body.shape.triangles[l][a].normal) <= 0.0)
          {
            /* le premier triangle du "ring", l'index des vertices
             * est trouvé car l'ordre des edges est 01-12-20 le second
             * peut donc être trouvé grace à un modulo :
             * (0+1)%3 = 1, (1+1)%3 = 2, (1+2)%3 = 0*/
            
            k = (j + 1) % 3;
            P[3].subOf(P[j], LP);
            P[4].subOf(P[k], LP);

            V[n] = P[j].v[0]; n++;V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
            V[n] = P[4].v[0]; n++;V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
            V[n] = P[k].v[0]; n++;V[n] = P[k].v[1]; n++;V[n] = P[k].v[2]; n++;V[n] = 1.0; n++;
            
            V[n] = P[j].v[0]; n++;V[n] = P[j].v[1]; n++;V[n] = P[j].v[2]; n++;V[n] = 1.0; n++;
            V[n] = P[3].v[0]; n++;V[n] = P[3].v[1]; n++;V[n] = P[3].v[2]; n++;V[n] = 0.0; n++;
            V[n] = P[4].v[0]; n++;V[n] = P[4].v[1]; n++;V[n] = P[4].v[2]; n++;V[n] = 0.0; n++;
            
          }
        } else {

          /* si pas de face adjacente c'est un face de bordure
             on extrude les bords */
          
          k = (j + 1) % 3;
          P[3].subOf(P[j], LP);
          P[4].subOf(P[k], LP);

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
  
  /* bind les buffers */
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[7]);
  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER, V, Ovoid.gl.DYNAMIC_DRAW);
  Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_VEC4_P, 16);

  /* dessins des faces arrieres, incremente le stencil */
  Ovoid.gl.cullFace(Ovoid.gl.FRONT);
  Ovoid.gl.stencilOp(Ovoid.gl.KEEP, Ovoid.gl.INCR, Ovoid.gl.KEEP);
  Ovoid.gl.drawArrays(Ovoid.gl.TRIANGLES, 0, n*0.25);

  /* dessins des faces avant, decremente le stencil */
  Ovoid.gl.cullFace(Ovoid.gl.BACK);
  Ovoid.gl.stencilOp(Ovoid.gl.KEEP, Ovoid.gl.DECR, Ovoid.gl.KEEP);
  Ovoid.gl.drawArrays(Ovoid.gl.TRIANGLES, 0, n*0.25);

  Ovoid.Drawer._drawnshadow++;
};


/**
 * Draw particles.
 * <br>
 * <br>
 * Draw emitter's particles.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Emitter} emitter Emitter Object to draw particles.
 * 
 * @see Ovoid.Emitter
 */
Ovoid.Drawer.drawParticles = function(emitter) {

  /* switch sur le shader */
  Ovoid.Drawer._switchSp(Ovoid.DRAWER_SP_PARTICLES);
  /* eyeview matrix; MEV */
  Ovoid.Drawer._sp.setUniformMatrix4fv(3, 
      Ovoid.Queuer._rcamera.eyeview.m);
  /* eye position */
  Ovoid.Drawer._sp.setUniform4fv(30, 
      Ovoid.Queuer._rcamera.worldPosition.v);
      
  /* model de rendu pour les particules */
  if(emitter.model == Ovoid.EMISSIVE)
    Ovoid.Drawer._switchBlend(1);
    
  /* desactive le depth mask*/
  Ovoid.gl.disable(Ovoid.gl.DEPTH_TEST);
  Ovoid.gl.depthMask(0);
  
  /* bind texture */
  Ovoid.gl.activeTexture(Ovoid.gl.TEXTURE0 + 1);
  (emitter.texture != null) ?
      Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D,emitter.texture.handle) :
      Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D,Ovoid.Drawer._blanktexture);
  /* texture sampler diffuse; Sd */
  if (-1 != Ovoid.Drawer._sp.uniformSampler[1])
    Ovoid.Drawer._sp.setUniformSampler(1, 1);
  
  /* bind buffers */
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, Ovoid.Drawer._bostock[7]);
  Ovoid.gl.bufferData(Ovoid.gl.ARRAY_BUFFER, emitter._fbuffer, 
      Ovoid.gl.DYNAMIC_DRAW);

  Ovoid.Drawer._sp.setVertexAttribPointers(Ovoid.VERTEX_PARTICLE, 44);  
  /* draw */
  Ovoid.gl.drawArrays(Ovoid.gl.POINTS, 0, emitter._alives);
  
  Ovoid.Drawer._drawnparticle += emitter._alives;

  /* reprend le shader précédepent utilisé pour dessiner la scene */
  Ovoid.Drawer._restorSp();
  
  /* model de rendu normal */
  if(emitter.model == Ovoid.EMISSIVE)
    Ovoid.Drawer._restoreBlend();
    
  /* reactive le depth mask*/
  Ovoid.gl.depthMask(1);
  Ovoid.gl.enable(Ovoid.gl.DEPTH_TEST);

};



/**
 * Draw a mesh for readPixels.
 * <br>
 * <br>
 * Draw a mesh in flat color way for picking frame.
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Mesh} mesh Mesh Object to draw.
 * 
 * @see Ovoid.Mesh
 */
Ovoid.Drawer.drawMeshRPixel = function(mesh) {
  var l, j;
  l = 0; /* TODO: implementation du Lod si besoin */

  /* bind buffers */
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, mesh._vbuffer[l]);
  Ovoid.gl.bindBuffer(Ovoid.gl.ELEMENT_ARRAY_BUFFER, mesh._ibuffer[l]);
  Ovoid.Drawer._sp.setVertexAttribPointers(mesh._vformat, mesh._vfbytes);
  
  /* draw */
  j = mesh.polyset[l].length;
  while (j--) {
    Ovoid.gl.drawElements(Ovoid.gl.TRIANGLES,
                          mesh.polyset[l][j].icount,
                          Ovoid.gl.UNSIGNED_SHORT,
                          mesh.polyset[l][j].ioffset);
                          
    Ovoid.Drawer._drawnpolyset++;
  }
  Ovoid.Drawer._drawnmesh++;
};


/**
 * Draw a mesh.
 * <br>
 * <br>
 * This function is typically used as class's private member but can be called
 * independently for custom render flow.
 * 
 * @param {Mesh} mesh Mesh Object to draw.
 * 
 * @see Ovoid.Mesh
 */
Ovoid.Drawer.drawMesh = function(mesh) {

  var l, j, k;
  l = 0; /* TODO: implementation du Lod si besoin */

  /* bind les buffers */
  Ovoid.gl.bindBuffer(Ovoid.gl.ARRAY_BUFFER, mesh._vbuffer[l]);
  Ovoid.gl.bindBuffer(Ovoid.gl.ELEMENT_ARRAY_BUFFER, mesh._ibuffer[l]);
  Ovoid.Drawer._sp.setVertexAttribPointers(mesh._vformat, mesh._vfbytes);

  j = mesh.polyset[l].length;
  while (j--) {
    /* set material uniforms Md, Ma, Ms, Me, Mr, Mi, Mo, My*/
    if (-1 != Ovoid.Drawer._sp.uniform[10])
      Ovoid.gl.uniform4fv(Ovoid.Drawer._sp.uniform[10],
                          mesh.polyset[l][j].material.color[0].v);
    if (-1 != Ovoid.Drawer._sp.uniform[13])
      Ovoid.gl.uniform4fv(Ovoid.Drawer._sp.uniform[13],
                          mesh.polyset[l][j].material.color[3].v);
    if (-1 != Ovoid.Drawer._sp.uniform[14])
      Ovoid.gl.uniform4fv(Ovoid.Drawer._sp.uniform[14],
                          mesh.polyset[l][j].material.color[4].v);
    if (-1 != Ovoid.Drawer._sp.uniform[11])
      Ovoid.gl.uniform4fv(Ovoid.Drawer._sp.uniform[11],
                          mesh.polyset[l][j].material.color[1].v);
    if (-1 != Ovoid.Drawer._sp.uniform[12])
      Ovoid.gl.uniform4fv(Ovoid.Drawer._sp.uniform[12],
                          mesh.polyset[l][j].material.color[2].v);
    if (-1 != Ovoid.Drawer._sp.uniform[15])
      Ovoid.gl.uniform1f(Ovoid.Drawer._sp.uniform[15],
          mesh.polyset[l][j].material.shininess);
    if (-1 != Ovoid.Drawer._sp.uniform[16])
      Ovoid.gl.uniform1f(Ovoid.Drawer._sp.uniform[16],
          mesh.polyset[l][j].material.opacity);
    if (-1 != Ovoid.Drawer._sp.uniform[17])
      Ovoid.gl.uniform1f(Ovoid.Drawer._sp.uniform[17],
          mesh.polyset[l][j].material.reflectivity);

    /* bind texture & set texture samplers Sd, Se, Ss, Sa */
    for (var k = 0; k < 6; k++)
    {
      Ovoid.gl.activeTexture(Ovoid.gl.TEXTURE0 + k);
      (mesh.polyset[l][j].material.texture[k] != null) ?
          Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D,
              mesh.polyset[l][j].material.texture[k].handle) :
          Ovoid.gl.bindTexture(Ovoid.gl.TEXTURE_2D, 
              Ovoid.Drawer._blanktexture);
      /* set texture sampler S* */
      if (-1 != Ovoid.Drawer._sp.uniformSampler[k])
        Ovoid.gl.uniform1i(Ovoid.Drawer._sp.uniformSampler[k], k);
    }
    
    Ovoid.gl.drawElements(Ovoid.gl.TRIANGLES,
                          mesh.polyset[l][j].icount,
                          Ovoid.gl.UNSIGNED_SHORT,
                          mesh.polyset[l][j].ioffset);

    Ovoid.Drawer._drawnpolyset++;
  }
  Ovoid.Drawer._drawnmesh++;
};




/**
 * Update viewport.
 * <br>
 * <br>
 * Force update GL viewport and orthographic matrix.
 */
Ovoid.Drawer.updateViewport = function() {
  
  /* Creation de la matrice orthographique pour le dessins 
   * des layers et des texts en overlay */
  Ovoid.Drawer._f32arymor[0] = 2.0 / Ovoid.Frame.size.v[0];
  Ovoid.Drawer._f32arymor[5] = 2.0 / -Ovoid.Frame.size.v[1];
  Ovoid.Drawer._f32arymor[10] = 1.0;

  Ovoid.Drawer._f32arymor[3] = 0.0;
  Ovoid.Drawer._f32arymor[7] = 0.0;
  Ovoid.Drawer._f32arymor[11] = 0.0;

  Ovoid.Drawer._f32arymor[12] = -1.0;
  Ovoid.Drawer._f32arymor[13] = 1.0;
  Ovoid.Drawer._f32arymor[14] = 0.0;
  Ovoid.Drawer._f32arymor[15] = 1.0;

  /* On ajuste la matrice orthographiques dans les shaders text et layer */
  /* switch DRAWER_SP_LAYER */
  Ovoid.Drawer._splib[Ovoid.Drawer._spslot[7]].use();
  /* eyeview matrix; MEV */
  Ovoid.Drawer._splib[Ovoid.Drawer._spslot[7]].setUniformMatrix4fv(3, 
        Ovoid.Drawer._f32arymor);
  /* switch DRAWER_SP_TEXT */
  Ovoid.Drawer._splib[Ovoid.Drawer._spslot[6]].use();
  /* eyeview matrix; MEV */
  Ovoid.Drawer._splib[Ovoid.Drawer._spslot[6]].setUniformMatrix4fv(3, 
        Ovoid.Drawer._f32arymor);

  /* Update du viewport GL */
  Ovoid.gl.viewport(0, 0, Ovoid.Frame.size.v[0],
      Ovoid.Frame.size.v[1]);
}
