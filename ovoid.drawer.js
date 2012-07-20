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


/** Enable per-light pass rendering (required for shadow casting) */
Ovoid.Drawer.opt_perLightPass = false;


/** Enable Z-fail shadow casting rendering */
Ovoid.Drawer.opt_shadowCasting = false;


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


/** Shader program slots **/
Ovoid.Drawer._spslot = new Array();


/** Current used shader program **/
Ovoid.Drawer.sp = null;


/** Blend swapper **/
Ovoid.Drawer._swblend = new Array(2);


/** Depth swapper **/
Ovoid.Drawer._swdepth = new Array(2);


/** Internal ambiant color **/
Ovoid.Drawer._abcolor = new Float32Array(4);


/** Picking readed pixel buffer. */
Ovoid.Drawer._rpcolor = new Uint8Array(256);


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
  
  /* Cree les buffers de primitives */
  var buffdata;
  Ovoid.Drawer._bprimitive = new Array(6);
  
  /* Sprite rectangle */ 
  buffdata = [0.0,0.0,0.0,1.0,0.0,1.0,0.0,/**/0.0,1.0,0.0,1.0,0.0,0.0,0.0,/**/
            1.0,1.0,0.0,1.0,1.0,0.0,0.0,/**/0.0,0.0,0.0,1.0,0.0,1.0,0.0,/**/
            1.0,1.0,0.0,1.0,1.0,0.0,0.0,/**/1.0,0.0,0.0,1.0,1.0,1.0,0.0];
            
  Ovoid.Drawer._bprimitive[0] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[0]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
  
  /* Symoblic box */
  buffdata = [0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/
    -0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/
    0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/
    0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/
     0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/
    -0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/
     0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/
     0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/
     0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/
     -0.5,0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,-0.5,0.5,1.0,1.0,1.0,1.0,1.0,/**/
     0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/
    -0.5,0.5,-0.5,1.0,1.0,1.0,1.0,1.0,/**/-0.5,-0.5,-0.5,1.0,1.0,1.0,1.0,1.0];
    
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
      Ovoid.Vertex.arrayAsVbo(Ovoid.VERTEX_VEC4_P|Ovoid.VERTEX_VEC4_C,buffdata),
      0x88E4);
  
  /* Tricolor axis */
  buffdata = [0.0,0.0,0.0,1.0,1.0,0.0,0.0,1.0,/**/0.25,0.0,0.0,1.0,1.0,0.0,0.0,1.0,/**/
     0.0,0.0,0.0,1.0,0.0,1.0,0.0,1.0,/**/0.0,0.25,0.0,1.0,0.0,1.0,0.0,1.0,/**/
     0.0,0.0,0.0,1.0,0.0,0.0,1.0,1.0,/**/0.0,0.0,0.25,1.0,0.0,0.0,1.0,1.0];
  
  Ovoid.Drawer._bprimitive[3] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[3]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);

  /* Symbolic pyramid */
  buffdata = [0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,/**/0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,/**/-0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,/**/-0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
    0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,/**/0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
    0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/-0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
    -0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/-0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
    -0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
    0.5,-0.5,-1.0,1.0,1.0,1.0,1.0,1.0,/**/0.5,0.5,-1.0,1.0,1.0,1.0,1.0,1.0];
  
  Ovoid.Drawer._bprimitive[4] = Ovoid.gl.createBuffer();
  Ovoid.gl.bindBuffer(0x8892, Ovoid.Drawer._bprimitive[4]);
  Ovoid.gl.bufferData(0x8892,new Float32Array(buffdata),0x88E4);
    
  /* Symbolic star */
  buffdata = [0.25,0.0,0.0,1.0,1.0,1.0,1.0,1.0,/**/-0.25,0.0,0.0,1.0,1.0,1.0,1.0,1.0,/**/
  0.0,0.25,0.0,1.0,1.0,1.0,1.0,1.0,/**/0.0,-0.25,0.0,1.0,1.0,1.0,1.0,1.0,/**/
  0.0,0.0,0.25,1.0,1.0,1.0,1.0,1.0,/**/0.0,0.0,-1.0,1.0,1.0,1.0,1.0,1.0,/**/
  0.125,0.125,0.125,1.0,1.0,1.0,1.0,1.0,/**/-0.125,-0.125,-0.125,1.0,1.0,1.0,1.0,1.0,/**/
  -0.125,0.125,0.125,1.0,1.0,1.0,1.0,1.0,/**/0.125,-0.125,-0.125,1.0,1.0,1.0,1.0,1.0];
  
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

 /* Ajout des shaders par défaut */
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
  sp.setSources(Ovoid.DEFAULT_GLSL_PNUIW_HYBRID_VS, Ovoid.DEFAULT_GLSL_FCOLOR_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_flat_color shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(2,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_vertex_color");
  sp.setSources(Ovoid.DEFAULT_GLSL_PC_VS, Ovoid.DEFAULT_GLSL_VCOLOR_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_vertex_color shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(3,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_shading_1l");
  sp.setSources(Ovoid.DEFAULT_GLSL_PNUIW_HYBRID_VS, Ovoid.DEFAULT_GLSL_AERDS_1L_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  if(!sp.linkWrap()) {
    Ovoid.log(1, 'Ovoid.Drawer', "error wrapping default sp_shading_1l shader program.");
    return false;
  }
  Ovoid.Drawer.plugShader(4,Ovoid.Drawer.addShader(sp));
  
  sp = new Ovoid.Shader("sp_shading_nl");
  sp.setSources(Ovoid.DEFAULT_GLSL_PNUIW_HYBRID_VS, Ovoid.DEFAULT_GLSL_BASIC_Nl_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
  //sp.setSources(Ovoid.DEFAULT_GLSL_PNUIW_HYBRID_VS, Ovoid.DEFAULT_GLSL_SNLIGHT_FS, Ovoid.DEFAULT_GLSL_WRAPMAP);
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

/* ****************** DRAWING CONTEXT PARAMETERS METHODS ******************** */
/**
 * Switch shader program.<br><br>
 * 
 * Switch the current shader program to the specified one.
 * 
 * @param {int} id Shader id to swith.
 */
Ovoid.Drawer.switchSp = function(id) {

  Ovoid.Drawer.sp = Ovoid.Drawer._splib[Ovoid.Drawer._spslot[id]];
  Ovoid.Drawer._spslot[0] = Ovoid.Drawer._spslot[1];
  Ovoid.Drawer._spslot[1] = Ovoid.Drawer._spslot[id];
  Ovoid.Drawer.sp.use();
};


/**
 * Restore shader program.<br><br>
 * 
 * Restores the last used shader program before the current one.
 */
Ovoid.Drawer.restorSp = function() {
  
  Ovoid.Drawer.sp = Ovoid.Drawer._splib[Ovoid.Drawer._spslot[0]];
  Ovoid.Drawer._spslot[1] = Ovoid.Drawer._spslot[0];
  Ovoid.Drawer.sp.use();
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
  
  Ovoid.Drawer.switchBlend(Ovoid.Drawer._blswap[0]);
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
  
  Ovoid.Drawer.switchBlend(Ovoid.Drawer._blswap[0]);
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
 * Restore depth parameters.<br><br>
 * 
 * Restores the last previous used depth parameters.
 */
Ovoid.Drawer.restoreDepth = function() {
  
  Ovoid.Drawer.switchBlend(Ovoid.Drawer._swdepth[0]);
};


/**
 * Begin draw session.<br><br>
 * 
 * Initializes for a new drawing session.
 */
Ovoid.Drawer.beginDraw = function() {
  
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

  c = Ovoid.Drawer.opt_clearColor;
  Ovoid.gl.clearColor(c[0],c[1],c[2],c[3]);
  
  Ovoid.gl.depthMask(1);
  Ovoid.gl.clear(0x4000|0x100); /* COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT*/
  
  Ovoid.Drawer._drawnpolyset = 0;
  Ovoid.Drawer._drawnlayer = 0;
  Ovoid.Drawer._drawnhelper = 0;
  Ovoid.Drawer._drawnmesh = 0;
  Ovoid.Drawer._drawnparticle = 0;
  Ovoid.Drawer._renderpasses = 0;
  
  Ovoid._logGlerror('Ovoid.Drawer.beginDraw::');
};


/**
 * End draw session.<br><br>
 * 
 * Conclude the current drawing session.
 */
Ovoid.Drawer.endDraw = function() {
  /* Sais pas si c'est très utile... */
  Ovoid.gl.flush();
  Ovoid._logGlerror('Ovoid.Drawer.endDraw::');
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
  Ovoid._logGlerror('Ovoid.Drawer.beginRpDraw::');
}

/**
 * End readPixels draw session.<br><br>
 * 
 * Conclude the current readPixels drawing sub-session.
 */
Ovoid.Drawer.endRpDraw = function() {
  
  /* Read pixel a la position du pointeur actuel */
  Ovoid.gl.readPixels(Ovoid.Input.mousePosition.v[0],(Ovoid.Frame.size.v[1] - Ovoid.Input.mousePosition.v[1]),1,1,0x1908,0x1401,/* RGBA, UNSIGNED_BYTE */Ovoid.Drawer._rpcolor);
  
  Ovoid.gl.bindFramebuffer(0x8D40, null); /* FRAMEBUFFER */
  
  Ovoid.Input.mouseLeaveUid = Ovoid.Input.mouseOverUid;
  
  /* convertis RGB en entier */
  Ovoid.Input.mouseOverUid = 0x000000 |
      ((Ovoid.Drawer._rpcolor[0]) << 16) |
      ((Ovoid.Drawer._rpcolor[1]) << 8) |
      ((Ovoid.Drawer._rpcolor[2]));
  
  if(Ovoid.Input.mouseLeaveUid != Ovoid.Input.mouseOverUid) {
    Ovoid.Input.mouseEnterUid = Ovoid.Input.mouseOverUid;
  } else {
    Ovoid.Input.mouseEnterUid = Ovoid.Input.mouseLeaveUid = 0;
  }
  Ovoid._logGlerror('Ovoid.Drawer.endRpDraw::');
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
    
    Ovoid.Drawer.sp.setUniform4fv(20, light.worldPosition.v);
    Ovoid.Drawer.sp.setUniform3fv(21, light.worldDirection.v);
    Ovoid.Drawer.sp.setUniform4fv(22, light.color.v);
    Ovoid.Drawer.sp.setUniform1f(23, light.intensity);
    Ovoid.Drawer.sp.setUniform1f(24, light.range);
    Ovoid.Drawer.sp.setUniform1f(25, light.falloff);
    Ovoid.Drawer.sp.setUniform1f(26, light.spotAngle);
  }
  Ovoid._logGlerror('Ovoid.Drawer.light::');
};


/**
 * Set ambient.<br><br>
 * 
 * Setup ambient lighting color for the current used shader.
 */
Ovoid.Drawer.ambient = function() {
  
  Ovoid.Drawer.sp.setUniform4fv(40, Ovoid.Drawer._abcolor);
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
 * Set camera.<br><br>
 * 
 * Setup transform and normal matrices matrices for the current 
 * used shader.
 * 
 * @param {Matrix4} tmatrix Transformation matrix.
 * @param {Matrix3} [nmatrix] Normal matrix.
 */
Ovoid.Drawer.model = function(tmatrix, nmatrix) {

    if (tmatrix.m) {
      Ovoid.Drawer.sp.setUniformMatrix4fv(0,tmatrix.m);
      if (nmatrix)
        Ovoid.Drawer.sp.setUniformMatrix3fv(1,nmatrix.m);
    } else {
      Ovoid.Drawer.sp.setUniformMatrix4fv(0,tmatrix);
      if (nmatrix)
        Ovoid.Drawer.sp.setUniformMatrix3fv(1,nmatrix);
    }
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
};


/**
 * Draw point sprite string.<br><br>
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
    (text.fontmapTexture)?text.fontmapTexture.bind():Ovoid.Drawer._tfontm.bind();
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

  var l, j, k, s;
  l = 0; /* TODO: implementation du Lod si besoin */
  Ovoid.gl.bindBuffer(0x8892, mesh._vbuffer[l]);
  Ovoid.gl.bindBuffer(0x8893, mesh._ibuffer[l]);
  Ovoid.Drawer.sp.setVertexAttribPointers(mesh._vformat, mesh._vfbytes);
  if (color) {
    Ovoid.Drawer.sp.setUniform4fv(9, color.v); /* set color */
    while (j--) {
      s = mesh.polyset[l][j];
      /* TRIANGLES, count, UNSIGNED_SHORT, offset */
      Ovoid.gl.drawElements(4,s.icount,0x1403,s.ioffset); 
    }
  } else {
    /* parcour des polysets */
    j = mesh.polyset[l].length;
    while (j--) {
      s = mesh.polyset[l][j];
      /* set material  */
      Ovoid.Drawer.sp.setUniform4fv(10,s.material.color[0].v);
      Ovoid.Drawer.sp.setUniform4fv(11,s.material.color[1].v);
      Ovoid.Drawer.sp.setUniform4fv(12,s.material.color[2].v);
      Ovoid.Drawer.sp.setUniform4fv(13,s.material.color[3].v);
      Ovoid.Drawer.sp.setUniform4fv(14,s.material.color[4].v);
      Ovoid.Drawer.sp.setUniform1f(15,s.material.shininess);
      Ovoid.Drawer.sp.setUniform1f(16,s.material.opacity);
      Ovoid.Drawer.sp.setUniform1f(17,s.material.reflectivity);
      /* bind texture */
      for (k = 0; k < 6; k++) {
        if(Ovoid.Drawer.sp.uniformSampler[k] != -1) {
          Ovoid.gl.activeTexture(0x84C0+k); /* TEXTURE0+k */
          (s.material.texture[k])?s.material.texture[k].bind():Ovoid.Drawer._tblank.bind();
          Ovoid.gl.uniform1i(Ovoid.Drawer.sp.uniformSampler[k], k);
        }
      }
      /* TRIANGLES, count, UNSIGNED_SHORT, offset */
      Ovoid.gl.drawElements(4,s.icount,0x1403,s.ioffset); 
    }
  }
};


/**
 * Draw Emitter.<br><br>
 * 
 * Draws a Emitter node's particles with the current used shader.
 * 
 * @param {Emitter} emitter Emitter node to be drawn.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.emitter = function(emitter, color) {
  
  if (color) {
    Ovoid.Drawer.sp.setUniform4fv(9, color.v); /* set color */
    /* change texture */
    Ovoid.gl.activeTexture(0x84C1); /* TEXTURE1 */
    Ovoid.Drawer._tblank.bind();
    Ovoid.Drawer.sp.setUniformSampler(1,1);
    Ovoid.Drawer.switchBlend(3); /* substractive alpha. SRC_ALPHA, ONE_MINUS_SRC_ALPHA */
  } else {
    /* model de rendu pour les particules */
    switch(emitter.model) 
    {
      case 3: /* Ovoid.EMISSIVE */
        Ovoid.Drawer.switchBlend(1); /* additive alpha. SRC_ALPHA, ONE */
        break;
      default: /* Ovoid.DIFFUSE */
        Ovoid.Drawer.switchBlend(3); /* substractive alpha. SRC_ALPHA, ONE_MINUS_SRC_ALPHA */
        break;
    }
    /* change texture */
    Ovoid.gl.activeTexture(0x84C1); /* TEXTURE1 */
    (emitter.texture)?emitter.texture.bind():Ovoid.Drawer._tblank.bind();
    Ovoid.Drawer.sp.setUniformSampler(1,1);
  }
  /* disable depth */
  Ovoid.Drawer.switchDepth(0);
  /* Ovoid.VERTEX_PARTICLE, stride, gl.POINTS, */
  Ovoid.Drawer.raw(37, 44, 0, emitter._alives, emitter._fbuffer);
  /* restore depth et blend */
  Ovoid.Drawer.restoreBlend();
  Ovoid.Drawer.restoreDepth();
  
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
    Ovoid.Drawer.model(body.worldMatrix);
    shape = body.shape;
  }
  if (body.shape.type & Ovoid.SKIN) {
    if (body.shape.mesh) {
      /* tentative d'implémentation des shadow volume pour les skin */
      if (!Ovoid.opt_localSkinData)
        return;
      Ovoid.Drawer.model(body.worldMatrix);
      shape = body.shape.mesh;
    }
  }
  
  var l = 0; /* TODO: implementation du Lod si besoin */
  var c = shape.triangles[l].length;
  
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
  var n = 0;
  for (var i = 0; i < c; i++)
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
  
  /* buffer dynamique */
  Ovoid.gl.bindBuffer(0x8892,Ovoid.Drawer._bdynamic);
  Ovoid.gl.bufferData(0x8892,V,0x88E8);
  Ovoid.Drawer.sp.setVertexAttribPointers(1,16);
  
  /* dessins des faces arrieres, incremente le stencil */
  Ovoid.gl.cullFace(0x0404); /* FRONT */
  Ovoid.gl.stencilOp(0x1E00, 0x1E02, 0x1E00); /* KEEP, INCR, KEEP */
  Ovoid.gl.drawArrays(4, 0, n/4);

  /* dessins des faces avant, decremente le stencil */
  Ovoid.gl.cullFace(0x0405); /* BACK */
  Ovoid.gl.stencilOp(0x1E00, 0x1E03, 0x1E00); /* KEEP, DECR, KEEP */
  Ovoid.gl.drawArrays(4, 0, n/4);
};


/* ************************ DRAWING STACK METHODS *************************** */

/**
 * Draw Body shape.<br><br>
 * 
 * Draws Body's shape using the current used shader.
 * 
 * @param {Body} body Body node.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.body = function(body, color) {
  
  if (body.shape.type & Ovoid.MESH) {
    Ovoid.Drawer.model(body.worldMatrix, body.normalMatrix);
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
    Ovoid.Drawer.model(body.worldMatrix, body.normalMatrix);
    Ovoid.Drawer.emitter(body.shape, color);
    body.addCach(Ovoid.CACH_WORLD);
  }
};


/**
 * Draw overlay.<br><br>
 * 
 * Draws Layer or Text node overlay using the current used shader.
 * 
 * @param {Layer|Text} overlay Layer or Text node.
 * @param {Color} [color] Optionnal flat color.
 */
Ovoid.Drawer.overlay = function(overlay, color) {
  
  if(overlay.type & Ovoid.LAYER) {
    if(overlay.type & Ovoid.TEXT) {
      Ovoid.Drawer.switchSp(6);
      Ovoid.Drawer.model(overlay.layerMatrix);
      Ovoid.Drawer.text(overlay, color);
      overlay.addCach(Ovoid.CACH_WORLD);
      return;
    }
    Ovoid.Drawer.switchSp(7);
    Ovoid.Drawer.model(overlay.layerMatrix);
    Ovoid.Drawer.layer(overlay, color);
    overlay.addCach(Ovoid.CACH_WORLD);
  }
};


/**
 * Draw helpers.<br><br>
 * 
 * Draws helpers and symbols for the given Transform node.
 * 
 * @param {Transform} tform Transform node.
 */
Ovoid.Drawer.helpers = function(tform) {
  
  Ovoid.Drawer.model(tform.worldMatrix);
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


/**
 * Draw faces normals.<br><br>
 * 
 * Draws shape's faces normals of the given Body node.
 * 
 * @param {Body} body Body node.
 * @param {float} scale Normal scale.
 */
Ovoid.Drawer.normals = function(body, scale) {
  
  var l = 0; /* Lod */
  
  Ovoid.Drawer.model(body.worldMatrix);
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

/* *************************** GLOBAL METHODS ******************************* */
Ovoid.Drawer.drawQueue = function() {
  
  Ovoid.Drawer.beginDraw();
  
  var i;
  
  // initialize la projection pour les shader text et layer
  
  Ovoid.Drawer.switchSp(6);
  Ovoid.Drawer.screen(Ovoid.Frame.matrix);
  Ovoid.Drawer.switchSp(7);
  Ovoid.Drawer.screen(Ovoid.Frame.matrix);
  
  Ovoid.Drawer.setCull(1);
  
  // Picking frame
  if (Ovoid.opt_enablePicking) { 
    
    Ovoid.Drawer.switchBlend(0);
    Ovoid.Drawer.switchSp(2);
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    Ovoid.Drawer.beginRpDraw();
    Ovoid.Drawer.switchDepth(1);
    var color = new Ovoid.Color();
    i = Ovoid.Queuer._qbody.count;
    while(i--) {
      if(Ovoid.Queuer._qbody[i].pickable && Ovoid.opt_debugMode) {
        color.fromInt(Ovoid.Queuer._qbody[i].uid);
        Ovoid.Drawer.body(Ovoid.Queuer._qbody[i], color);
      }
    }
    if (Ovoid.Drawer.opt_drawLayers) {
      Ovoid.Drawer.switchDepth(0);
      for (i = 0; i < Ovoid.Queuer._qlayer.count; i++) {
        if(Ovoid.Queuer._qlayer[i].pickable && Ovoid.opt_debugMode) {
          color.fromInt(Ovoid.Queuer._qlayer[i].uid);
          Ovoid.Drawer.overlay(Ovoid.Queuer._qlayer[i], color);
        }
      }
    }
    Ovoid.Drawer.endRpDraw();
  }
  
  Ovoid.Drawer.switchBlend(3);
  Ovoid.Drawer.switchDepth(1);
  if (Ovoid.Drawer.opt_perLightPass) {
    // Shading 1light
    Ovoid.Drawer.switchSp(4);
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    Ovoid.Drawer.ambient();
    Ovoid.Drawer.disable(0);   /* disable diffuse; ENd */
    Ovoid.Drawer.enable(1);    /* enable ambient; ENa */
    i = Ovoid.Queuer._qbody.count;
    while(i--) {
      Ovoid.Drawer.body(Ovoid.Queuer._qbody[i]);
    }
    // Per-light passes
    Ovoid.Drawer.switchBlend(2); /* one, one */
    Ovoid.Drawer.switchDepth(3); /* mask off, test equal */
    var l = Ovoid.Queuer._qlight.count
    Ovoid.Drawer.enable(0);   /* enable diffuse */
    Ovoid.Drawer.disable(1);  /* disable ambient */
    while (l--) {
      if (Ovoid.Queuer._qlight[l].shadowCasting && 
            Ovoid.Drawer.opt_shadowCasting) {
              
        Ovoid.Drawer.switchBlend(0);
        Ovoid.Drawer.disable(0);
        Ovoid.Drawer.switchDepth(2); /* mask off, test less */
        Ovoid.gl.enable(0x0B90); /* STENCIL_TEST */
        Ovoid.gl.clear(0x00000400); /* STENCIL_BUFFER_BIT */
        Ovoid.gl.colorMask(0,0,0,0); 
        Ovoid.gl.stencilFunc(0x0207,0,0); /* ALWAYS,0,0 */
        i = Ovoid.Queuer._qbody.count;
        while(i--) {
          Ovoid.Drawer.shadow(Ovoid.Queuer._qlight[l],Ovoid.Queuer._qbody[i]);
        }
        Ovoid.gl.stencilFunc(0x0202,0,-1); /* EQUAL */
        Ovoid.gl.stencilOp(0x1E00,0x1E00,0x1E00); /* KEEP,KEEP,KEEP */
        Ovoid.gl.colorMask(1,1,1,1);
        Ovoid.Drawer.enable(0); 
        Ovoid.Drawer.switchDepth(3); /* mask off, test less equal */
      }

      Ovoid.Drawer.light(Ovoid.Queuer._qlight[l]);
      i = Ovoid.Queuer._qbody.count;
      while(i--) {
        Ovoid.Drawer.body(Ovoid.Queuer._qbody[i]);
      }
    }
    Ovoid.gl.disable(0x0B90); /* STENCIL_TEST */
    Ovoid.Drawer.switchBlend(3);
  } else {
    // Shading Nlights 
    Ovoid.Drawer.switchSp(5);
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    Ovoid.Drawer.ambient();
    Ovoid.Drawer.light(Ovoid.Queuer._qlight);
    i = Ovoid.Queuer._qbody.count;
    while(i--) {
      Ovoid.Drawer.body(Ovoid.Queuer._qbody[i]);
    }
  }
  
  // Desactive de depth
  Ovoid.Drawer.switchDepth(0);
  
  // Helpers 
  if (Ovoid.Drawer.opt_drawHelpers) {
    Ovoid.Drawer.switchSp(3);
    Ovoid.Drawer.persp(Ovoid.Queuer._rcamera);
    if (Ovoid.Drawer.opt_drawNormals) {
      i = Ovoid.Queuer._qbody.count;
      while(i--) {
        Ovoid.Drawer.normals(Ovoid.Queuer._qbody[i], Ovoid.Drawer.opt_normalScale);
      }
    }
    i = Ovoid.Queuer._qtform.count;
    while(i--) {
      Ovoid.Drawer.helpers(Ovoid.Queuer._qtform[i]);
    }
  }
  
  // Layers
  if (Ovoid.Drawer.opt_drawLayers) {
    for (i = 0; i < Ovoid.Queuer._qlayer.count; i++) {
      Ovoid.Drawer.overlay(Ovoid.Queuer._qlayer[i]);
    }
  }
  
  Ovoid.Drawer.endDraw();
  
}
