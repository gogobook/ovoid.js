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
 * @class Config object.<br><br>
 * 
 * Config object is used to pass options for Ovoid.JS's Instance
 * creation. An Config object can be used for one or more Instance and
 * is only used in the creation process.<br><br>
 * 
 * <blockcode>
 * <cc>// Create a new Config object</cc><br>
 * var MyCfg = new Ovoid.Config()<br>
 * <br>
 * <cc>// Change some options</cc><br>
 * MyCfg.opt_debugMode = true;<br>
 * MyCfg.opt_logLevel = 3;<br>
 * MyCfg.opt_frameMode = Ovoid.FRAME_FULL_CLIENT;
 * MyCfg.opt_preloadStyle = 2;<br>
 * MyCfg.opt_renderClearColor = [1.0, 0.0, 0.5, 1.0];<br>
 * <br>
 * <cc>// Create a new Ovoid.JS instance with custum config</cc><br>
 * var MyOvoid = Ovoid.newInstance("MyOvoid", "MyCanvas", MyCfg);<br>
 * <br>
 * <cc>// We don't need the Config object any more</cc><br>
 * delete MyCfg;<br>
 * </blockcode><br><br>
 * 
 */
Ovoid.Config = function() {

  /* Options GL ------------------------------------------------------*/
  /** WebGL context option to enable or disable alpha canvas.<br><br>
   *  
   * Allow canvas to be transparent. Default value is <c>false</c>.
   * 
   * @type bool*/
  this.opt_GLalpha = false;


  /** WebGL context option to enable or disable Preserve Drawing Buffer.<br><br>
   *  
   * (required for mouse picking mecanism). Default value si <c>true</c>.
   * 
   * @type bool */
  this.opt_GLpreserveDrawingBuffer = true;


  /** WebGL context option to enable or disable anti-aliasing.<br><br>
   * 
   * Default value si <c>true</c>. 
   * 
   * @type bool */
  this.opt_GLantialias = true;


  /** WebGL context option to enable or disable the stencil buffer.<br><br>
   * 
   * Default value si <c>true</c>.
   * 
   * @type bool */
  this.opt_GLstencil = true;


  /** WebGL context option to enable or disable premultiplied alpha channel.<br><br>
   * 
   * Default value si <c>true</c>.
   * 
   * @type bool */
  this.opt_GLpremultipliedAlpha = true;


  /* Options générales -----------------------------------------------*/
  /** Enable or disable debug mode.<br><br>
   * 
   * Debug mode affect the instance's behavior in various way. It 
   * avoid the browser cache to force reload contents, it
   * force all nodes as pickable to show debug infos and finaly display
   * full error message instead of the custom error content (defined in
   * <c>opt_customErrContent</c>) when instance encounter a 
   * critical error. Default value is <c>false</c>.
   * 
   * @type bool */
  this.opt_debugMode = false;


  /** Enable or disable alert messages.<br><br>
   * 
   * If enabled some dialog boxes popup to alert about critical 
   * issues. Default value is <c>true</c>
   * 
   * @type bool */
  this.opt_enableAlerts = true;

  /** 
   * Log verbosity level.<br><br>
   * 
   * Verbosity level correspond to log severity level, and are the following:<br><br>
   * 0:Fatal error,<br>
   * 1:Error,<br>
   * 2:Warning,<br>
   * 3:Comment<br>
   */
  this.opt_logLevel = 0;

  /** 
   * Custom error HTML content.<br><br>
   * 
   * String used to display a custom HTML content if application fail in
   * non-debug mode. You can define it with a string of HTML code which 
   * will be displayed alternatively in case of WebGL faillure or another
   * errors when the debug mode is disabled.<br><br>
   * 
   * If the option is defined as <c>null</c> the standard debug
   * error is displayed whatever. Default value is <c>null</c>
   * 
   * @type string
   */
  this.opt_customErrContent = null;
  

  /** Show head-up display.<br><br>
   * 
   * The head-up display is a small frame on the top of screen which 
   * display some degug informations. Default value is <c>true</c>
   * 
   * @type bool
   * */
  this.opt_showHud = true;


  /** Show debug frame.<br><br>
   * 
   * The debug frame is an overlayed frame displayed on screen which 
   * display detailed debug informations. Default value is <c>false</c>
   * 
   * @type bool
   * */
  this.opt_showDebug = false;


  /** Global gravity vector.<br><br>
   * 
   * The global gravity vector is used to comput Physics and particles
   * motions. Default value is <c>[0.0,-9.8,0.0]</c>
   * 
   * @type float[3]
   * */
  this.opt_gravity = [0.0,-9.8,0.0];


  /* Options preload -------------------------------------------------*/
  /** Preloading wait frame style.<br><br>
   * 
   * If items was included for preloading the instance can show a wait 
   * animation frame during external content loading. This option define
   * the wait animation type or disable it. Possible values are one of
   * the following:<br>
   * <c>0</c> : no wait animation frame. (loading synchnously)<br>
   * <c>1</c> : simple rotating circle.<br>
   * <c>2</c> : full progress bar with loading details.<br><br>
   * 
   * Default value is <c>1</c>.
   * 
   * @type int */
  this.opt_preloadStyle = 1;
  
  
  /** Preloading wait frame background color.<br><br>
   * 
   * Defines the background color of the wait frame. Default value is
   * <c>[0.95, 0.95, 0.95, 1.0]</c>
   * 
   * @type float[4]
   * */
  this.opt_preloadBgColor = [0.95, 0.95, 0.95, 1.0];
  
  
  /** Preloading wait frame text and elements color.<br><br>
   * 
   * Defines the text and elements color of the wait frame. Default 
   * value is <c>[0.5, 0.5, 0.5, 1.0]</c>
   * 
   * @type float[4]
   * */
  this.opt_preloadFgColor = [0.5, 0.5, 0.5, 1.0];
  
  
  /** Preloading wait frame active element color.<br><br>
   * 
   * Defines the active/animated elements color of the wait frame. 
   * Default value is <c>[0.0, 0.0, 0.0, 0.5]</c>
   * 
   * @type float[4]
   *  */
  this.opt_preloadAcColor = [0.0, 0.0, 0.0, 0.5];
  

  /* Options frame ---------------------------------------------------*/
  /** Default starting frame mode.<br><br>
   * 
   * Defines the default frame behaviour for this instance. Value can be 
   * one the following symbolic constants:<br><br>
   * 
   * <c>Ovoid.FRAME_MANUAL_SIZE</c> : Manual sizing.<br>
   * <c>Ovoid.FRAME_CLIENT_SIZE</c> : Canvas style sizing.<br>
   * <c>Ovoid.FRAME_FULL_SCREEN</c> : Full screen size. (Not yet implemented)<br>
   * 
   * Default value is <c>Ovoid.FRAME_CLIENT_SIZE</c>
   * 
   * @type int
   *  */
  this.opt_frameMode = Ovoid.FRAME_CLIENT_SIZE;
  
  
  /* Options timer ---------------------------------------------------*/
  
  /* Options input ---------------------------------------------------*/
  
  /* Options drawer --------------------------------------------------*/
  /** Render clearing buffer color.<br><br>
   * 
   * Defines the clear color for the rendering WebGL buffer. Default 
   * value is <c>[0.0, 1.0, 0.0, 1.0]</c>
   * 
   * @type float[4]
   *  */
  this.opt_renderClearColor = [0.0, 1.0, 0.0, 1.0];


  /** Render global ambient lighting color.<br><br>
   * 
   * Defines the global ambient lighting color for render. Default value
   * is <c>[0.2, 0.2, 0.2, 1.0]</c>.
   * 
   * @type float[4]
   * */
  this.opt_renderAmbientColor = [0.2, 0.2, 0.2, 1.0];


  /** Render global fog/atmosphere color.<br><br>
   * 
   * Defines the global fog or atmosphere color for render. Default value
   * is <c>[1.0, 1.0, 1.0, 1.0]</c>.
   * 
   * @type float[4]
   * */
  this.opt_renderFogColor = [1.0, 1.0, 1.0, 1.0];


  /** Render global fog/atmosphere density.<br><br>
   * 
   * Defines the global fog or atmosphere density factor for render.
   * Default value is <c>0.0</c> (disabled).
   * 
   * @type float
   *  */
  this.opt_renderFogDensity = 0.0;


  /** Render picking mode.<br><br>
   * 
   * Defines the behavior of the render process for picking. Value 
   * can be <c>0</c> to disable picking rendering mode or a combination of one of the
   * following constants:<br><br>
   * 
   * <c>Ovoid.RP_WORLD</c> : draw picking frame for world objests (allow picking for these objects)<br>
   * <c>Ovoid.RP_OVERLAY</c> : draw picking frame for overlay objects (allow picking for these objects)<br>
   * 
   * Default value is <c>Ovoid.RP_WORLD|Ovoid.RP_OVERLAY</c><br><br>
   * 
   * Note: drawing picking frames can impact the global render 
   * performance in complex scenes, you should disable it if you dont
   * use it.
   * 
   * @type bitmask
   * 
   * */
  this.opt_renderPickingMode = Ovoid.RP_WORLD|Ovoid.RP_OVERLAY;


  /** Default face culling.<br><br>
   * 
   * Defines the default face culling parameter to render geometry.
   * can be:<br>
   * <c>0</c> : Disable face culling.<br>
   * <c>1</c> : Back face culling.<br>
   * <c>2</c> : Front face culling.<br>
   * <br><br>
   * 
   * Default value is <c>1</c> for back-face culling
   * 
   * @type bool
   *  */
  this.opt_renderCullFace = 1;
  
  
  /** Render level of performance.<br><br>
   * 
   * Defines the render level of performance. The level of performance 
   * is typically a graphic quality level option. There is up to three 
   * level of performance with dedicated drawing pipeline. Value can be 
   * one of the following:<br><br>
   * 
   * <c>0</c> : per-vertex lighting, monotexture, basic shading. (best performance)<br>
   * <c>1</c> : per-vertex lighting, multitexture, enhanced shading. (medium quality)<br>
   * <c>2</c> : per-pixel lighting, multitexure, enhanced shading. (full quality)<br><br>
   * 
   * Note: Shaders can be replaced customly, it mean that the previous 
   * description is relative to the default embedded shaders set.
   * 
   * Default value is <c>2</c>.
   * 
   * @type int
   *  */
  this.opt_renderLopLevel = 2;


  /** Enable adaptative render level of performance.<br><br>
   * 
   * When enabled, the level of performance is dynamically adjusted by 
   * the render process to keep balancing between quality and 
   * performances according the frame rate.<br><br>
   * 
   * Default value is <c>false</c>
   * 
   * @type bool
   *  */
  this.opt_renderAdaptLop = false;


  /** Adaptative level of performance threshold.<br><br>
   * 
   * Defines the frame rate threshold to adjust the level of performance.
   * Default value is <c>45</c>
   * 
   * @type int
   *  */
  this.opt_renderAdaptLopThreshold = 45;


  /** Enable per-light pass rendering (required for shadow casting).<br><br>
   * 
   * When enabled the scene is rendered with several passes for one pass 
   * per light.This option is required for shadow casting. Default value
   * is <c>true</c>
   * 
   * @type bool
   *  */
  this.opt_renderPerLightPass = true;


  /** Enable Z-fail shadow casting rendering.<br><br>
   * 
   * When enabled the scene is rendered with shadow casting using the
   * Z-Fail shadow volums method. Default value is <c>false</c>.
   * 
   * @type bool
   * */
  this.opt_renderShadowCasting = false;


  /** Minimum average size to build shadow volum for.<br><br>
   * 
   * Defines the minimum "medium size" for an object to cast shadow. 
   * Below this limit, the object does not produce shadow.
   * Default value is <c>2.0</c>.
   * 
   * @type float
   *  */
  this.opt_renderShadowCastingExclusion = 2.0;


  /** Enable layers drawing.<br><br>
   * 
   * When enabled overlay layers objects are rendered. Default value is
   * <c>true</c>
   * 
   * @type bool
   *  */
  this.opt_renderDrawLayers = true;


  /** Enable helpers drawing.<br><br>
   * 
   * When enabled helpers (locators, bounding boxes, symbols, 
   * ect.) are rendered. Default value is <c>false</c>
   * 
   * @type bool
   * */
  this.opt_renderDrawHelpers = false;


  /** Enable axis drawing.<br><br>
   * 
   * When enabled and whene drawing helpers is enabled, 
   * Transform nodes's axis locator are renderd. Default value is 
   * <c>true</c>
   * 
   * @type bool
   *  */
  this.opt_renderDrawAxis = true;


  /** Enable bounding box drawing.<br><br>
   * 
   * When enabled and whene drawing helpers is enabled, 
   * Body nodes's bounding box are renderd. Default value is 
   * <c>true</c>
   * 
   * @type bool*/
  this.opt_renderDrawBoundingBox = true;


  /** Enable bounding _sphere drawing.<br><br>
   * 
   * When enabled and whene drawing helpers is enabled, 
   * Body nodes's bounding sphere are renderd. Default value is 
   * <c>true</c>
   * 
   * @type bool*/
  this.opt_renderDrawBoundingSphere = true;


  /** Enable joint helpers drawing.<br><br>
   * 
   * When enabled and whene drawing helpers is enabled, Joint nodes
   * are renderd. Default value is <c>true</c>
   * 
   * @type bool*/
  this.opt_renderDrawJoints = true;


  /** Enable light helpers drawing.<br><br>
   * 
   * When enabled and whene drawing helpers is enabled, Light nodes's 
   * locator are renderd. Default value is <c>true</c>
   * 
   * @type bool*/
  this.opt_renderDrawLights = true;


  /** Enable camera helpers drawing.<br><br>
   * 
   * When enabled and whene drawing helpers is enabled, Camera nodes's
   * locator are renderd. Default value is <c>true</c>
   * 
   * @type bool*/
  this.opt_renderDrawCameras = true;


  /** Enable face normal drawing.<br><br>
   * 
   * When enabled and whene drawing helpers is enabled, Meshs's normals
   * are renderd. Default value is <c>false</c>
   * 
   * @type bool*/
  this.opt_renderDrawNormals = false;


  /** Joint helpers's size.<br><br>
   * 
   * Defines the Joint nodes's helpers drawing size. Default value is
   * <c>0.25</c>
   * 
   * @type float*/
  this.opt_renderJointSize = 0.25;


  /** Normals scale.<br><br>
   * 
   * Defines the meshs's normals drawing size. Default value is
   * <c>0.25</c>
   * 
   * @type float */
  this.opt_renderNormalScale = 0.25;
  
  
  /* Options queuer --------------------------------------------------*/
  /** Enable or disable view culling.<br><br>
   * 
   * When enabled the scene computation process performs node 
   * preselection (culling) to pass to the render pipeline according 
   * to view frustum. The default value is <c>true</c>
   * 
   * @type bool */
  this.opt_sceneViewcull = true;


  /** Enable or disable light culling.<br><br>
   * 
   * When enabled the scene computation process performs light 
   * preselection (culling) to pass to the render pipeline according 
   * to nodes's lighting and view frustum. The default value is 
   * <c>true</c>
   * 
   * @type bool */
  this.opt_sceneLightcull = true;


  /** Enable or disable intersection detection.<br><br>
   * 
   * When enabled the scene computation process proceeds to nodes's 
   * intersections detection and report. Default value is 
   * <c>true</c>
   * 
   * @type bool */
  this.opt_sceneIntersectDetect = true;


  /** Default camera position.<br><br>
   * 
   * Defines the position of the default rendering camera. Default value 
   * is <c>[0.0, 0.0, 5.0]</c>
   * 
   * @type float[3] */
  this.opt_sceneDefaultViewPosition = [0.0, 0.0, 5.0];


  /** Default camera rotation.<br><br>
   * 
   * Defines the rotation of the default rendering camera. Default value 
   * is <c>[0.0, 0.0, 0.0]</c>
   * 
   * @type float[3] */
  this.opt_sceneDefaultViewRotation = [0.0, 0.0, 0.0];
  
  
  /* Options solver --------------------------------------------------*/

  /** Enable or disable the iterative contact solving.<br><br>
   * 
   * When enabled Physics nodes's collision detection and responses is 
   * computed by iteration process to compensate the collision 
   * overlapping. Default value is <c>true</c>.
   * 
   * @type bool */
  this.opt_physicsIterativeSolver = true;

  /** Maximim iteration for iterative contact solving.<br><br>
   * 
   * Defines the maximum interation count for the interative contact
   * solving. Default value is <c>4</c>.
   * 
   * @type int */
  this.opt_physicsContactItFactor = 4;
  
  /* Options audio ---------------------------------------------------*/
  
  /** Audio Listener Doppler Factor.<br><br>
   * 
   * Defines the Web Audio API Listener Doppler Factor.
   * Default value is <c>1.0</c>.
   * 
   * @type float */
  this.opt_audioDopplerFactor = 1.0;
  
  
  /* Options divers --------------------------------------------------*/
  
  /** Enable or disable skin local deformed value computation.<br><br>
   * 
   * When enabled, weighted vertices's deformations are locally computed 
   * and stored in real time. This notably allow accurate shadows 
   * casting for Skin deformed Meshs. This may hit global performances.
   * Default value is <c>false</c>
   * 
   * @type float */
  this.opt_skinLocalComput = false;

};

