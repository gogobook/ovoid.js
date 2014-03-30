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
 * @param {string} name Indicative name of the instance.
 * 
 * 
 * @class Ovoid.JS Instance object.<br><br>
 * 
 * The Instance class implements a main Ovoid.JS application instance.<br><br> 
 * 
 * <b>What is an Ovoid.JS Instance ?</b><br><br>
 * 
 * The Ovoid.JS Instance is the main interface to run and manage an 
 * Ovoid.JS application. Almost all what you create in Ovoid.JS, you 
 * have to create it via an Instance. Creating a new Instance is 
 * creating a new whole application with its own WebGL context, own 
 * process, own configuration, etc. Since one Instance use its own WebGL 
 * context, it also use one (and only one) HTML canvas. You can create 
 * one Instance for each HTML canvas of your web page.<br><br>
 * 
 * <b>How we use it ?</b><br><br>
 * 
 * First of all, you should not create an Instance ex-nihilo, which 
 * simply results of an not registered Instance object which will never 
 * starts. you should use the global <c><a href="Ovoid.php#.newInstance">Ovoid.newInstance()</a></c> 
 * function to create a new Ovoid.JS Instance, check if creation and 
 * registration does not failed, and then define and do what you have to 
 * do before starting the instance via the <c><a href="#start">start()</a></c> 
 * method.<br>
 * <br>
 * 
 * An Instance has many options, the most of them can be modified after 
 * the Instance's initialization by simply change the appropriate member 
 * of the instance. However, some options must be passed before the 
 * initialization to take effect, and other should be defined before 
 * by convenience. This is why there is an Ovoid.Config class that 
 * provides a copy of all Instance options. You can use this object to 
 * make some presets and pass it for the Instance creation. After the
 * Instance's creation, the Config object can be reused for a new
 * Instance creation or deleted.<br><br>
 * 
 * <blockcode>
 * <cc>// Our application entry, called via 'onload="main()"' in our HTML code</cc><br>
 * function main() {<br>
 * &nbsp;&nbsp;<cc>// Create a Config object, this object is used to pass </cc><br>
 * &nbsp;&nbsp;<cc>// our custom default options for the new instance.</cc><br>
 * &nbsp;&nbsp;<cc>// Note: This object is used only once at the Instance creation,</cc><br>
 * &nbsp;&nbsp;<cc>// options can be modified later via the Instance object</cc><br>
 * &nbsp;&nbsp;var myConf = Ovoid.newConfig();<br>
 * &nbsp;&nbsp;<cc>// Adjust some options</cc><br>
 * &nbsp;&nbsp;myConf.opt_logLevel = 3;<br>
 * &nbsp;&nbsp;myConf.opt_debugMode = true;<br>
 * &nbsp;&nbsp;myConf.opt_renderClearColor = [0.5, 0.5, 0.5, 1.0];<br>
 * &nbsp;&nbsp;<cc>// Create a new instance</cc><br>
 * &nbsp;&nbsp;var Instance = Ovoid.newInstance("myOvoid", "myCanvas", myConf);<br>
 * &nbsp;&nbsp;<cc>// The Config object is now useless</cc><br>
 * &nbsp;&nbsp;delete myConf;<br>
 * &nbsp;&nbsp;<cc>// Creation successfull ? </cc><br>
 * &nbsp;&nbsp;if(Instance) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Adjust some other options directly via the Instance</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.opt_renderPickingMode = 0;<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.opt_renderPerLightPass = false;<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Here you can now setup some stuff to preload</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.includeDaeScene("mySceneToImport.dae");<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Then define the onload() function</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.onload = function() {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// ...</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;}<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// And define the onloop() function</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.onloop = function() {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// ...</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;}<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// All is ready now, we can start the Instance</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.start();<br>
 * &nbsp;&nbsp;}<br>
 * }<br>
 * </blockcode>
 * <br><br>
 * 
 * <b>What to do with that ?</b><br><br>
 * 
 * Almost everything. From the Instance you can creates Nodes, Scenes 
 * and control your application. The instance class provides methods to 
 * create and manages nodes and majors objects, Modules classes to 
 * access and manages core application data and usefull methods to make 
 * things easy to do. The Instance class is the  back-end access 
 * interface for your application.<br><br>
 * 
 * <b>Modules classes</b><br><br>
 * 
 * The Instance class is made of some Modules classes who provides 
 * access and control to some critical aspect of your application. To 
 * be short, each Modules classes match with any particular and 
 * specialised task of the application. For example, you have a Module
 * class for the rendering engine, another for all what is related to 
 * user inputs, another for the canvas/frame control, etc. Each Modules 
 * classes provides data access and some methods to control its 
 * particular domain.<br><br>
 * 
 * Modules classes are simply Instance class's members, then accessed 
 * via their member names:
 * <blockcode>
 * <cc>// Instance's Frame Module class</cc><br>
 * Instance.Frame.setMode(Ovoid.FRAME_FULL_CLIENT);<br>
 * <cc>// Instance's Timer Module class</cc><br>
 * var clock = Instance.Timer.clock;<br>
 * <cc>// Instance's Input Module class</cc><br>
 * Instance.Input.setTrigger(Ovoid.CTR_HELD, Ovoid.KB_LARROW, Ovoid.HELD, lookleft);<br>
 * <cc>// Instance's Queuer Module class</cc><br>
 * var transformList = Instance.Queuer.qtform;
 * <cc>// Instance's Drawer Module class</cc><br>
 * var id = Instance.Drawer.addShader("land.vs", "land.fs", null);<br>
 * </blockcode><br><br>
 * 
 * Here is the list of Modules classes:<br>
 * <ul>
 * <li><a href="Ovoid.Frame.php"><c>Ovoid.Frame</c></a> (Frame and Canvas management Module)</li>
 * <li><a href="Ovoid.Timer.php"><c>Ovoid.Timer</c></a> (Time management Module)</li>
 * <li><a href="Ovoid.Input.php"><c>Ovoid.Input</c></a> (User inputs management Module)</li>
 * <li><a href="Ovoid.Queuer.php"><c>Ovoid.Queuer</c></a> (Nodes's dispatcher and interactive data controler Module)</li>
 * <li><a href="Ovoid.Drawer.php"><c>Ovoid.Drawer</c></a> (Rendering engine Module)</li>
 * <li><a href="Ovoid.Solver.php"><c>Ovoid.Solver</c></a> (Physics engine Module)</li>
 * </ul><br><br>
 * 
 * <b>Instance's active Scene</b><br><br>
 * 
 * An Instance manages only one Scene. As a Scene contain all what is 
 * rendered to the screen and contains interactive nodes, manage several 
 * Scenes does not realy make sens and would be horribly complex. 
 * HOWEVER, you can create several Scenes and switch between them 
 * when you want during the runtime. This is why we speak about the 
 * ACTIVE Scene, because an Instance can use several Scenes, and the 
 * active Scene is the one currently used by the Instance.<br><br>
 * 
 * The active Scene's reference can be accessed via the 
 * <c><a href="#Scene">Scene</a></c> member. The Instance is created with a 
 * default empty scene, this  Scene is the active one by 
 * default.<br><br>
 * 
 * To properly work a Scene must be registered to an Instance. You can 
 * create a new Scene using the <c><a href="#newScene">newScene()</a></c> method 
 * who returns a new Scene Class instance properly registered to this 
 * Instance. Once created, you can do what you want with, then set 
 * it to the active using the <c><a href="#useScene">useScene()</a></c> 
 * method.<br><br>
 * 
 * For more details about Scene, see the 
 * <a href="Ovoid.Scene.php">Ovoid.Scene</a>
 * class reference documentation.<br><br>
 * 
 * <b>User defined contextual functions</b><br><br>
 * 
 * The Ovoid.JS Instance provides user definable methods to create 
 * custom application, this is a key point of the Ovoid.JS Instance 
 * object.<br><br>
 * 
 * To well understand these methods you have to understand the 
 * Instance's runstate sequence. Once an Instance is created, it pass 
 * through several stages, they are followings:<br><br>
 * 
 * <ul>
 * <li><b>1. Initialized</b></li> 
 * This the initial stage of the Instance when it is just created and 
 * until it is started by calling the <c><a href="#start">start()</a></c> 
 * method.<br><br>
 * <li><b>2. Loading</b></li> 
 * Once you started the Instance using the <c><a href="#start">start()</a></c> 
 * method, it enters in this stage which is the loading data stage. This 
 * is the stage where the Instance show a wait/loading screen and loads 
 * elements of the loading stacks.<br><br>
 * <li><b>3. Runtime</b></li> 
 * Once all data is loaded, the wait/loading screen disapear to show the 
 * whole real scene. This is where the Instance enters in its runtime 
 * stage, which is the infinite loop of the application.<br><br>
 * <li><b>4. Paused</b></li> 
 * This is the stage where the Instance enters if you use the 
 * <c><a href="#pause">pause()</a></c> method. This stage simply suspends all 
 * operations of the Instance (including frame rendering) until you call 
 * again the <c><a href="#start">start()</a></c> method.<br><br>
 * <li><b>5. Crashed</b></li> 
 * You hope the Instance will never be at this stage.
 * </ul><br><br>
 * 
 * There are four main methods who are automatically called by the 
 * Instance at some particular execution stages, they are the following:
 * <br><br>
 * 
 * The <b><c><a href="#onload">onload()</a></c></b> method is automatically 
 * called just after the Load stage and juste before the Runtime stage. 
 * This method is typically dedicated to allow user defined operations 
 * and adjustements with the newly loaded data before entering the 
 * runtime loop. This method is called each time the Instance quits 
 * the Loading stage and can be redefined at any time.<br><br>
 * 
 * The <b><c><a href="#onloop">onloop()</a></c></b> method is automatically 
 * called within the Runtime infinite loop. That means this method is 
 * repeatedly called, every time, each loop. To be precise, this method 
 * is called just before the Scene rendering and after the Scene update 
 * within the Instance loop. This is typically the method where you 
 * define all operations that will be done each frame.<br><br>
 * 
 * The <b><c><a href="#waitdraw">waitdraw()</a></c></b> method is automatically 
 * called each loop during the Loading stage. This method can be used 
 * to define a custom wait/loading screen rendering method using the 
 * Instance's Drawer Module class methods and custom data. This is 
 * obviously a method dedicated to experienced and patient developpers 
 * who want to create a fully custom loading screen.<br><br>
 * 
 * The <b><c><a href="#ondraw">ondraw()</a></c></b> method is automatically 
 * called each loop during the Runtime stage. This method can be used 
 * to define a custom  rendering method using the Instance's Drawer 
 * Module class methods to override the default one. This is obviously 
 * a method dedicated to experienced and patient developpers who want 
 * to create a fully custom rendering process.<br><br>
 * 
 * <b>Including data to load</b><br><br>
 * 
 * The Instance implements a mecanism to load and import external data 
 * like images for textures or DAE/Collada scene files.  This mecanism 
 * occur during the loading stage of the Instance, in fact, THIS IS the 
 * Loading stage. During this stage, the Instance will check its 
 * loading stacks, if there is something to load, it will launch the 
 * loading process (draw a wait screen while loading and importing 
 * data). When all data is loaded and imported (empty loading stacks), 
 * the Instance calls the <c><a href="#onload">onload()</a></c> method then 
 * goes or comes back to the runtime loop. (Note: if the Intance enters 
 * the loading stage with nothing to load, the Instance will simply 
 * calls the <c><a href="#onload">onload()</a></c> method and goes to the 
 * runtime loop).<br><br>
 * 
 * To fill the loading stack, you should use dedicated methods for this 
 * operation. Dedicated including methods are the followings:
 * <ul>
 * <li><c><a href="#includeOjson">includeOjson()</a></c></li>
 * Adds an Ojson scene file to import in the loading stack.
 * <li><c><a href="#includeDaeScene">includeDaeScene()</a></c></li>
 * Adds an DAE/COLLADA scene file to import in the loading stack.
 * <li><c><a href="#includeDaeAnimation">includeDaeAnimation()</a></c></li>
 * Adds an DAE/COLLADA scene file to import (with importation filter to import only Animation Nodes) in the loading stack.
 * <li><c><a href="#includeDaeMesh">includeDaeMesh()</a></c></li>
 * Adds an DAE/COLLADA scene file to import (with importation filter to import only Mesh Nodes and geometry) in the loading stack.
 * <li><c><a href="#includeTexture">includeTexture()</a></c></li>
 * Adds an image file to import as Texture Node in the loading stack.
 * <li><c><a href="#includeAudio">includeAudio()</a></c></li>
 * Adds an audio file to import as Audio Node in the loading stack.
 * <li><c><a href="#includeShader">includeShader()</a></c></li>
 * Adds shader source files to import as Shader object in the loading stack.
 * </ul><br><br>
 * 
 * These methods are typically used to fill the loading 
 * stacks before calling the <c><a href="#start">start()</a></c> method to 
 * pre-load external data. For example, suppose you have to load 
 * several external image to use them as texture. You can fill the 
 * loading stack with textures to load,  then define a custom 
 * <c><a href="#onload">onload()</a></c> method where the loaded textures 
 * are managed as your conveniance before the Instance goes to the 
 * runtime loop.<br><br>
 * 
 * <blockcode>
 * <cc>// Our application entry, called via '<body onload="main()">' in our HTML code</cc><br>
 * function main() {
 * <cc>// Creating a new Ovoid.JS instance </cc><br>
 * &nbsp;&nbsp;var myConf = Ovoid.newConfig();<br>
 * &nbsp;&nbsp;var Instance = Ovoid.newInstance("myOvoid", "myCanvas", myConf);<br>
 * &nbsp;&nbsp;if(Instance) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Including textures to load at startup</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.includeTexture("myTex1", "toto.png", true);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.includeTexture("myTex2", "titi.png", true);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.includeTexture("myTex3", "bubu.png", true);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Defining the onload() method who will be called once loading done</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.onload = function() {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// Retrieves our loaded textures</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var t1 = this.Scene.findNode("myTex1");<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var t2 = this.Scene.findNode("myTex2");<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var t3 = this.Scene.findNode("myTex3");<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// Creating a new Material Node</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var mat = this.Scene.newNode(Ovoid.MATERIAL, "myMaterial");<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<cc>// Assing textures Material compoments</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mat.setTexture(Ovoid.DIFFUSE, t1);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mat.setTexture(Ovoid.AMBIENT, t2);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mat.setTexture(Ovoid.EMISSIVE, t3);<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;}<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// All is ready, start the Instance</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.start();<br>
 * &nbsp;&nbsp;}<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * You also can fill or refill the loading stacks during the runtime. 
 * This will automatically turn the Instance into the loading stage to 
 * load new data. The <c><a href="#onload">onload()</a></c> method will be 
 * called again before entering in the runtime loop again. (Note that 
 * you equally can redefine the <c><a href="#onload">onload()</a></c> method during 
 * runtime). You can repeat the operation as many time as you 
 * want.<br><br>
 * 
 * <b>Instance starting</b><br><br>
 * 
 * Once an Instance is created it still inactive until started. To start
 * the Instance you have to call the <c><a href="#start">start()</a></c> 
 * method. Once started, the Instance can be paused using the 
 * <c><a href="#pause">pause()</a></c> method. Note that an paused Instance 
 * stop all its process, even the rendering process, so an Instance 
 * should not be paused exept for advanced programming purpose.
 * 
 * <b>Non-Node registerd classes</b><br><br>
 * 
 * If all Nodes objects must be registered to an Instance, most non-node 
 * objects can be created without registration and are free to be used 
 * without impact regarding the Instance where it is used. However, 
 * there are non-node objects that must be registered to work properly, 
 * because they use the internal context of the Instance. They are only 
 * two, but they are major complex objects:<br>
 * <ul>
 * <li><a href="Ovoid.Scene.php">Ovoid.Scene</a></li>
 * <li><a href="Ovoid.Shader.php">Ovoid.Shader</a></li>
 * </ul>
 * 
 * Because these classes must be registered, the Insance provides 
 * methods to create them, you should use these methods:<br>
 * <ul>
 * <li><a href="#newScene">newScene()</a></li>
 * <li><a href="#newShader">newShader()</a></li>
 * </ul><br><br>
 * 
 * <b>"Macro" methods</b><br><br>
 * 
 * The Instance provides some methods to execute an usual task which 
 * would generate several lines if written in literal way. They are 
 * kind of shortcut or "macro" methods to make the life easier.<br><br>
 * 
 * The <b><c>setAction()</cc></b> method is used to create and 
 * link a new Action Node to one or several others. For more information
 * about the Action Node, see the 
 * <a href="Ovoid.Action.php">Ovoid.Action</a> 
 * Node reference documentation.
 * 
 * The <b><c>setConstraint()</cc></b> method is used to create 
 * and link a new Constraint Node to one or several others. For more 
 * information about the Constraints Node, see the 
 * <a href="Ovoid.Constraints.php">Ovoid.Constraints</a> 
 * Node reference documentation.
 * 
 * The <b><c>setPhysics()</cc></b> method is used to create and 
 * link a new Physics Node to one or several others. For more 
 * information about the Physics Node, see the 
 * <a href="Ovoid.Physics.php">Ovoid.Physics</a> 
 * Node reference documentation.
 * 
 * The <b><c>setExpression()</cc></b> method is used to create 
 * and link a new Expression Node to one or several others. For more 
 * information about the Expression Node, see the 
 * <a href="Ovoid.Expression.php">Ovoid.Expression</a> 
 * Node reference documentation.
 */
Ovoid.Instance = function(name) {
  
  /** Instance name */
  this.name = name;
  
  /* -------------------------- OPTIONS ------------------------------*/
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
   * 
   * @type int */
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
   * display some degug informations. Default value is <c>false</c>
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
   * <c>3</c> : custom, use onpreload() function.<br><br>
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
   * @type bitwize
   * 
   * */
  this.opt_renderPickingMode = Ovoid.RP_WORLD|Ovoid.RP_OVERLAY;


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
   * <c>1.0</c>
   * 
   * @type float*/
  this.opt_renderJointSize = 1.0;


  /** Normals scale.<br><br>
   * 
   * Defines the meshs's normals drawing size. Default value is
   * <c>0.7</c>
   * 
   * @type float */
  this.opt_renderNormalScale = 0.7;
  
  
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


  /* Variables generales ---------------------------------------------*/
  /** Global WebGL Context handle.
   * @type WebGL Context */
  this.gl = null;


  /** Global Audio API Context handle.
   * @type Audio Context */
  this.al = null;
    

  /** Instance Frame Module
   * @type Ovoid.Frame */
  this.Frame = new Ovoid.Frame(this);
  
  
  /** Instance Timer Module
   * @type Ovoid.Time */
  this.Timer = new Ovoid.Timer(this);
  
  
  /** Instance Input Module
   * @type Ovoid.Input */
  this.Input = new Ovoid.Input(this);
  
  
  /** Instance Drawer Module
   * @type Ovoid.Drawer */
  this.Drawer = new Ovoid.Drawer(this);
  
  
  /** Instance Queuer Module
   * @type Ovoid.Queuer */
  this.Queuer = new Ovoid.Queuer(this);
  
  
  /** Instance Solver Module
   * @type Ovoid.Solver */
  this.Solver = new Ovoid.Solver(this);
  
  
  /** Default instance's Scene.
   * @type Ovoid.Scene */
  this._dScene = new Ovoid.Scene(name+'Scene', this);
  
  
  /** Current active scene reference.
   * @type Ovoid.Scene */
  this.Scene = this._dScene;
  
  
  /** User definable wait screen draw function.<br><br>
   *
   * This function can be user defined.<br><br>
   * 
   * This method is automatically called each loop during the Loading stage. 
   * This method can be used to define a custom wait/loading screen 
   * rendering method using the Instance's Drawer Module class methods 
   * and custom data. This is obviously a method dedicated to 
   * experienced and patient developpers who want to create a fully 
   * custom loading screen.<br><br>
   * 
   */
  this.waitdraw = function () {};
  

  /** User definable pre-runtime function.<br><br>
   *
   * This function is dedicated to be user defined.<br><br>
   * 
   * This method is automatically 
   * called just after the Load stage and juste before the Runtime 
   * stage. This method is typically dedicated to allow user defined 
   * operations and adjustements with the newly loaded data before 
   * entering the runtime loop. This method is called each time the 
   * Instance quits the Loading stage and can be redefined at any time.
   */
  this.onload = function () {};


  /** User definable runtime function.<br><br> 
   * 
   * This function is dedicated to be user defined.<br><br>
   * 
   * This method is automatically 
   * called within the Runtime infinite loop. That means this method is 
   * repeatedly called, every time, each loop. To be precise, this 
   * method is called just before the Scene rendering and after the 
   * Scene update within the Instance loop. This is typically the method
   * where you define all operations that will be done each frame.
   */
  this.onloop = function () {};


  /** User definable rendering function.<br><br> 
   * 
   * This function can be user defined.<br><br>
   * 
   * This method is automatically 
   * called each loop during the Runtime stage. This method can be used 
   * to define a custom  rendering method using the Instance's Drawer 
   * Module class methods to override the default one. This is obviously 
   * a method dedicated to experienced and patient developpers who want 
   * to create a fully custom rendering process.
   */
  this.ondraw = function() {this.Drawer.drawQueue();};
  
  
  /* Privates generales ----------------------------------------------*/
  /** full log string */
  this._log = '';


  /** log error count. */
  this._nerror = 0;


  /** The latest WebGL error code */
  this._glerror = 0;


  /** Instance loaded status */
  this._runstat = -1;
  
  
  /* Privates preloader ----------------------------------------------*/
  /** Loading stages flags */
  this._loadstage = [true,false,false,false];


  /** Loading remains count */
  this._loadremains = [0,0,0,0];


  /** Items total count */
  this._loadtotal = 0;


  /** Items loaded count */
  this._loadloaded = 0;


  /** loading ratio (%).<br><br>
   * 
   * This variable can be used to create custom preloading wait frame.
   * 
   * @type float */
  this.preloadRatio = 0.0;


  /** DAE loading stack */
  this._loadstkscn = new Array();


  /** Texture loading stack */
  this._loadstktex = new Array();


  /** Sound loading stack */
  this._loadstkaud = new Array();


  /** Shader loading stack */
  this._loadstkgls = new Array();


  /** Current loading sound */
  this._loadobj = null;


  /** Current stack poped */
  this._loaditem = null;


  /** Performance counter */
  this._loadtcnt;
  
  
  /** loading timer.<br><br>
   * 
   * This variable can be used to create custom preloading wait frame.
   * 
   * @type float */
  this.preloadTimer = 0.0;
  
  
  /** Preload screen elements */
  this._loadel = new Array();
  
  
  /* Privates Hud & Debug --------------------------------------------*/
  /** HUD header layer */
  this._hudbg = new Ovoid.Layer();


  /** HUD Body layer */
  this._dbgbg = new Ovoid.Layer();


  /** Debug frame's layer text */
  this._dbg = new Array();
  for (var i = 0; i < 8; i++) 
    this._dbg[i] = new Ovoid.Text();
    
  
};


/**
 * Set Instance options from object.<br><br>
 * 
 * @param {object} opt Object with options set to copy.
*/
Ovoid.Instance.prototype._setoptions = function(opt) {
  
  /* Options GL context */
  this.opt_GLalpha = opt.opt_GLalpha;
  this.opt_GLpreserveDrawingBuffer = opt.opt_GLpreserveDrawingBuffer;
  this.opt_GLantialias = opt.opt_GLantialias;
  this.opt_GLstencil = opt.opt_GLstencil;
  this.opt_GLpremultipliedAlpha = opt.opt_GLpremultipliedAlpha;
  /* Options generales */
  this.opt_debugMode = opt.opt_debugMode;
  this.opt_enableAlerts = opt.opt_enableAlerts;
  this.opt_logLevel = opt.opt_logLevel;
  this.opt_customErrContent = opt.opt_customErrContent;
  this.opt_showHud = opt.opt_showHud;
  this.opt_showDebug = opt.opt_showDebug;
  this.opt_gravity = opt.opt_gravity;
  /* Options de preload */
  this.opt_preloadStyle = opt.opt_preloadStyle;
  this.opt_preloadBgColor = opt.opt_preloadBgColor;
  this.opt_preloadFgColor = opt.opt_preloadFgColor;
  this.opt_preloadAcColor = opt.opt_preloadAcColor;
  /* Options de frame */
  this.opt_frameMode = opt.opt_frameMode;
  /* Options du drawer */
  this.opt_renderClearColor = opt.opt_renderClearColor;
  this.opt_renderAmbientColor = opt.opt_renderAmbientColor;
  this.opt_renderFogColor = opt.opt_renderFogColor;
  this.opt_renderFogDensity = opt.opt_renderFogDensity;
  this.opt_renderPickingMode = opt.opt_renderPickingMode;
  this.opt_renderLopLevel = opt.opt_renderLopLevel;
  this.opt_renderAdaptLop = opt.opt_renderAdaptLop;
  this.opt_renderAdaptLopThreshold = opt.opt_renderAdaptLopThreshold;
  this.opt_renderPerLightPass = opt.opt_renderPerLightPass;
  this.opt_renderShadowCasting = opt.opt_renderShadowCasting;
  this.opt_renderShadowCastingExclusion = opt.opt_renderShadowCastingExclusion;
  this.opt_renderDrawLayers = opt.opt_renderDrawLayers;
  this.opt_renderDrawHelpers = opt.opt_renderDrawHelpers;
  this.opt_renderDrawAxis = opt.opt_renderDrawAxis;
  this.opt_renderDrawBoundingBox = opt.opt_renderDrawBoundingBox;
  this.opt_renderDrawBoundingSphere = opt.opt_renderDrawBoundingSphere;
  this.opt_renderDrawJoints = opt.opt_renderDrawJoints;
  this.opt_renderDrawLights = opt.opt_renderDrawLights;
  this.opt_renderDrawCameras = opt.opt_renderDrawCameras;
  this.opt_renderDrawNormals = opt.opt_renderDrawNormals;
  this.opt_renderJointSize = opt.opt_renderJointSize;
  this.opt_renderNormalScale = opt.opt_renderNormalScale;
  /* Options du queuer */
  this.opt_sceneViewcull = opt.opt_sceneViewcull;
  this.opt_sceneLightcull = opt.opt_sceneLightcull;
  this.opt_sceneIntersectDetect = opt.opt_sceneIntersectDetect;
  this.opt_sceneDefaultViewPosition = opt.opt_sceneDefaultViewPosition;
  this.opt_sceneDefaultViewRotation = opt.opt_sceneDefaultViewRotation;
  /* Options du solver */
  this.opt_physicsIterativeSolver = opt.opt_physicsIterativeSolver;
  this.opt_physicsContactItFactor = opt.opt_physicsContactItFactor;
  
  Ovoid._log(3, this, '._setoptions', ' done');
};


/**
 * Main initialization function.<br><br>
 * 
 * Initializes the whole library including global classes and 
 * preloading external data, and create a WebGL context on the specified 
 * HTML canvas.<br><br>

 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;<cc>// Start OvoiD.JS Library on the given canvas.</cc><br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * &lt;/script&gt;<br>
 * <br>
 * &lt;body style="margin:0px;" <b>onload="main();"</b>&gt;<br>
 * </blockcode>
 * 
 * @param {string} canvas HTML5 Canvas object to init frame and WebGL context.
*/
Ovoid.Instance.prototype._init = function(canvas) {

  Ovoid._log(3, this, '._init', ' start');

  /* performance counter */
  var t = (new Date().getTime());
  
  /* alerte debug mode */
  if (this.opt_debugMode) {
    Ovoid._log(2, this, '._init',
        " debug mode is enabled, external contents will be redownloaded.");
  }
  
  /* le browser connait-il webgl ? */
  if (!window.WebGLRenderingContext) {

    Ovoid._log(0, this, '._init',
        ' window.WebGLRenderingContext is null');
    Ovoid._err(7, this, 'browser does not support WebGL');
    return false;
  }
  
  Ovoid._log(3, this, '._init', " using '"+canvas.id+"' as render canvas");
  
  /* options de contexte WebGL */
  var options = {
    alpha: this.opt_GLalpha,
    preserveDrawingBuffer: this.opt_GLpreserveDrawingBuffer,
    antialias: this.opt_GLantialias,
    stencil: this.opt_GLstencil,
    premultipliedAlpha: this.opt_GLpremultipliedAlpha
  };
  
  /* Differents identifiants de context WebGL */
  var ctxid = [
      'webgl',
      'experimental-webgl',
      'webkit-3d',
      'moz-webgl'
      ];

  Ovoid._log(3, this, '._init', ' search for WebGL context...');

  var ctxn;
  for (var i = 0; i < ctxid.length; i++) {
    /* trouve un context webgl */
    try {
      this.gl = canvas.getContext(ctxid[i], options);
      if (this.gl) {
        ctxn = ctxid[i];
        break;
      }
    }
    catch (e) {
      Ovoid._log(1, this, '._init', " getContext 'webgl' error : " + e);
      Ovoid._err(1, this, "WebGL context creation exception");
      return false;
    }
  }

  if (!this.gl) {
    Ovoid._log(0, this, '._init', ' no suitable WebGL context found');
    Ovoid._err(7, this, 'unable to find a suitable WebGL context');
    return false;
  }

  Ovoid._log(3, this, '._init', " WebGL '"+ctxn+"' context created in: " + 
      ((new Date().getTime() - t) * 0.001) + 's');

  Ovoid._log(3, this, '._init', ' search for Web Audio API context...');
  /* Recherche d'une Audio API */
  if(window.AudioContext) {
    try {
      Ovoid._log(3, this, '._init', ' found Web Audio API.');
      this.al = new AudioContext();
    } 
    catch (e) {
      Ovoid._log(2, this, '._init', " new AudioContext() error : " + e);
    }
  } else {
    if(window.webkitAudioContext) {
      try {
        Ovoid._log(3, this, '._init', ' found Webkit Audio API.');
        this.al = new webkitAudioContext();
      } 
      catch (e) {
        Ovoid._log(2, this, '._init', " new webkitAudioContext() error : " + e);
      }
    } else {
      this.al = null;
      Ovoid._log(2, this, '._init', ' no suitable Web Audio API found.');
    }
  }

  Ovoid._log(3, this, '._init', ' initilizing classes');
  try {
    if (this.Frame._init(canvas)) {
      if (this.Drawer._init()) {
        if (this.Input._init()) {
          if (this.Timer._init()) {
            if (this.Queuer._init()) {

              /* Si le module solver est présent/chargé on l'init */
              if(this.Solver != undefined) {
                if (!this.Solver._init()) {
                  Ovoid._log(0, this, '._init',
                    ' solver class initialization error');
                  Ovoid._err(4, this, 'solver class initialization error');
                  return false;
                }
              }
              
              /* init HUD */
              this._hudbg.setBgColor(0.6,0.6,0.6,1.0);
              this._hudbg.setSize(this.Frame.size.v[0], 17.0, 1.0);
              this._dbg[7].setFormat(16.0, 0.5, 1.0);
              this._dbg[7].moveXyz(4.0, 0.0, 0.0);
              this._dbg[7].setFgColor(1.0,1.0,1.0,0.6);
              
              this._dbgbg.setBgColor(0.0,0.0,0.0,0.5);
              this._dbgbg.setSize(this.Frame.size.v[0], 
                                  this.Frame.size.v[1]-17.0, 1.0);
              this._dbgbg.moveXyz(0.0, 16.0, 0.0);
              
              this._dbg[0].setFormat(16.0, 0.5, 1.0);
              this._dbg[0].moveXyz(1.0, 20.0, 0.0);
              this._dbg[0].setFgColor(1.0,1.0,1.0,1.0);
              
              this._dbg[1].setFormat(16.0, 0.5, 1.0);
              this._dbg[1].moveXyz(250, 20.0, 0.0);
              this._dbg[1].setFgColor(1.0,1.0,1.0,1.0);
              
              this._dbg[2].setFormat(16.0, 0.5, 1.0);
              this._dbg[2].moveXyz(470.0, 20.0, 0.0);
              this._dbg[2].setFgColor(1.0,1.0,1.0,1.0);
              
              this._dbg[3].setFormat(16.0, 0.5, 1.0);
              this._dbg[3].moveXyz(720, 20.0, 0.0);
              this._dbg[3].setFgColor(1.0,1.0,1.0,1.0);
              
              this._dbg[4].setFormat(16.0, 0.5, 1.0);
              this._dbg[4].moveXyz(1.0, 216.0, 0.0);
              this._dbg[4].setFgColor(1.0,1.0,1.0,1.0);

              this._dbg[5].setFormat(16.0, 0.5, 1.0);
              this._dbg[5].moveXyz(300.0, 216.0, 0.0);
              this._dbg[5].setFgColor(1.0,1.0,1.0,1.0);
              
              this._dbg[6].setFormat(16.0, 0.5, 1.0);
              this._dbg[6].moveXyz(600.0, 216.0, 0.0);
              this._dbg[6].setFgColor(1.0,1.0,1.0,1.0);
              
              this._dbg[0].cachTransform();
              this._dbg[0].cachLayer();
              this._dbg[1].cachTransform();
              this._dbg[1].cachLayer();
              this._dbg[2].cachTransform();
              this._dbg[2].cachLayer();
              this._dbg[3].cachTransform();
              this._dbg[3].cachLayer();
              this._dbg[4].cachTransform();
              this._dbg[4].cachLayer();
              this._dbg[5].cachTransform();
              this._dbg[5].cachLayer();
              this._dbg[6].cachTransform();
              this._dbg[6].cachLayer();
              
            } else {
              Ovoid._log(0, this, '._init',
                  ' queuer class initialization error');
              Ovoid._err(2, this, 'queuer class initialization error');
              return false;
            }
          } else {
            Ovoid._log(0, this, '._init',
                ' timer class initialization error');
            Ovoid._err(2, this, 'timer class initialization error');
            return false;
          }
        } else {
          Ovoid._log(0, this, '._init',
              ' input class initialization error');
          Ovoid._err(2, this, 'input class initialization error');
          return false;
        }
      } else {
        Ovoid._log(0, this, '._init',
            ' drawer class initialization error');
        Ovoid._err(2, this, 'drawer class initialization error');
        return false;
      }
    } else {
      Ovoid._log(0, this, '._init', 
          ' frame class initialization error');
      Ovoid._err(2, this, 'frame class initialization error');
      return false;
    }
  }
  catch (e) {
    Ovoid._log(0, this, '._init', ' (Exception) ' + e.stack);
    Ovoid._err(2, this, 'initialization Exception thrown');
    return false;
  }

  Ovoid._log(3, this, '._init', ' done in: ' + 
        ((new Date().getTime() - t) * 0.001) + 's');
  return true;
};


/**
 * Check whether error(s) was logged.
 *
 * @return {bool} True if any error was encoutered, false otherwise.
*/
Ovoid.Instance.prototype._hasError = function() {

  return this._nerror != 0;
};


/**
 * Get the log string.<br><br>
 * 
 * Returns the current log string.
 *
 * @return {string} Current log string.
*/
Ovoid.Instance.prototype.getLog = function() {

  return this._log;
};


/**
 * Clear WebGL error if there is any.
*/
Ovoid.Instance.prototype._clearGlerror = function() {

  this.gl.getError();
};


/**
 * Get WebGL error if there is any.
 *
 * @return {bool} True if a WebGL error was found, false otherwise.
*/
Ovoid.Instance.prototype._hasGlerror = function() {

  this._glerror = this.gl.getError();

  if (this._glerror)
    return true;
  else
    return false;
};


/**
 * Get WeGL error string from the current thrown error code.
 *
 * @return {string} Error string.
*/
Ovoid.Instance.prototype._getGlerror = function() {

  switch (this._glerror)
  {
    case 0:
      return null;
      break;
    case 0x0500:
      return 'GL_INVALID_ENUM';
      break;
    case 0x0501:
      return 'GL_INVALID_VALUE';
      break;
    case 0x0502:
      return 'GL_INVALID_OPERATION';
      break;
    case 0x0503:
      return 'GL_STACK_OVERFLOW';
      break;
    case 0x0504:
      return 'GL_STACK_UNDERFLOW';
      break;
    case 0x0505:
      return 'GL_OUT_OF_MEMORY';
      break;
  }
};


/**
 * Log WebGL error if there is any.
 *
 * @param {string} scope Scope, class or function from where the log is writen.
 * @return {bool} True if a WebGL error was found, false otherwise.
*/
Ovoid.Instance.prototype._logGlerror = function(scope) {

  if (this._hasGlerror()) {
    Ovoid._log(1, this, scope, ' WebGL error: ' + this._getGlerror());
    return true;
  }
  return false;
};
  

/**
 * Main loop function
 */
Ovoid.Instance.prototype._mainloop = function() {
  
  try {
    /* BEGIN FRAME */    
    
    /* Reset render queue */
    this.Queuer._reset();
    
    /* QUEUE STACK */
    this.Queuer._queueScene(this.Scene);
    
    /* SOLVE PHYSICS QUEUE */
    if(this.Solver != undefined)   
      this.Solver._solveQueue();
    
    /* USER CUSTOM LOOP FUNC */
    try {
      this.onloop();
    } catch(e) {
      Ovoid._log(0, this, '.onloop', ' (Exception)\n' + e.stack);
      Ovoid._err(5, this, '.onloop() Exception thrown');
    }
    
    /* DRAW QUEUE */
    this.ondraw();

    /* DRAW HUD */
    if (this.opt_showHud) {

      this.Drawer.switchPipe(4,0); /* SP_TEXT */
      this.Drawer.screen(this.Frame.matrix);
      this.Drawer.switchPipe(3,0); /* SP_LAYER */
      this.Drawer.screen(this.Frame.matrix);
      this.Drawer.switchDepth(0);
      this.Drawer.switchBlend(3);
    
      this._hudbg.setSize(this.Frame.size.v[0], 17.0, 1.0);
                  
      this._dbg[7].string = Ovoid.Debug.Sumary(this);
      
      this._hudbg.cachTransform();
      this._hudbg.cachLayer();

      this.Drawer.model(this._hudbg.layerMatrix.m);
      this.Drawer.layer(this._hudbg);
  
      this.Drawer.switchPipe(4,0); /* SP_TEXT */
      this.Drawer.model(this._dbg[7].layerMatrix.m);
      this.Drawer.text(this._dbg[7]);

      if (this.opt_showDebug) {
        
        this._dbgbg.setSize(this.Frame.size.v[0], 
                            this.Frame.size.v[1]-17.0, 1.0);
        this._dbgbg.cachTransform();
        this._dbgbg.cachLayer();
                  
        if (this.Input.mouseOverUid) {
          var n = this.Scene.findNode(this.Input.mouseOverUid);
          if (n) {
            this._dbg[5].string = Ovoid.Debug.Node(n) + '\n';
            this._dbg[5].string += Ovoid.Debug.Transform(n, true) + '\n';
            if(n.shape) {
              this._dbg[5].string += Ovoid.Debug.Body(n) + '\n';
              if (n.shape.type & Ovoid.MESH) {
                this._dbg[5].string += Ovoid.Debug.Mesh(n.shape, true);
              }
              if(n.shape.type & Ovoid.SKIN) {
                if (n.shape.mesh)
                  this._dbg[5].string += Ovoid.Debug.Mesh(n.shape.mesh, true);
              }
            }
            if(n.type & Ovoid.LAYER) {
              this._dbg[5].string += Ovoid.Debug.Layer(n, false);
            }
            this._dbg[6].string = Ovoid.Debug.DependTree(n);
          }
        } else {
          this._dbg[5].string = '';
          this._dbg[6].string = '';
        }
        
        this._dbg[0].string = Ovoid.Debug.Drawer(this);
        this._dbg[1].string = Ovoid.Debug.Queuer(this);
        this._dbg[2].string = Ovoid.Debug.Input(this);
        this._dbg[3].string = Ovoid.Debug.Timer(this)+'\n'; 
        this._dbg[3].string += Ovoid.Debug.Frame(this);
        this._dbg[4].string = Ovoid.Debug.WorldGraph(this.Scene);
        
        this.Drawer.switchPipe(3,0); /* SP_LAYER */
        this.Drawer.model(this._dbgbg.layerMatrix.m);
        this.Drawer.layer(this._dbgbg);
        
        this.Drawer.switchPipe(4,0); /* SP_TEXT */
        for ( var i = 0; i < 7; i++) {
          this.Drawer.model(this._dbg[i].layerMatrix.m);
          this.Drawer.text(this._dbg[i]);
        }
      }
    }
    
    /* END FRAME */
    this.Input._update();
    this.Frame._update();
    this.Timer._update();
  } 
  catch(e) {
    Ovoid._log(0, this, '._mainloop', ' (Exception)\n' + e.stack);
    Ovoid._err(5, this, '._mainloop() Exception thrown');
  }
};



/**
 * Start loading process.
 */
Ovoid.Instance.prototype._loadstart = function() {

  /* Preloading time counter */
  this._loadtcnt = new Date().getTime();

  if(!this._loadtotal) {
    Ovoid._log(3, this, '._loadstart', ' nothing to preload, skip loading loop');
    this._loaddone();
    return;
  }
  Ovoid._log(3, this, '._loadstart', ' entering loading loop');
  /* Passe en runstat 1 pour la boucle de chargement */
  this._runstat = 1;

  if (this.opt_preloadStyle) {

    var bg = this.opt_preloadBgColor;
    var fg = this.opt_preloadFgColor;
    var ac = this.opt_preloadAcColor;
    
    /* Initialisation des elements pour le preload */
    this._loadel[0] = new Ovoid.Layer(); // fond d'ecran
    this._loadel[1] = new Ovoid.Layer(); // parent principal
    this._loadel[56] = new Ovoid.Text(); // texte de titre
    this._loadel[57] = new Ovoid.Text(); // texte de details
    /* background */
    this._loadel[0].setBgColor(bg[0],bg[1],bg[2],bg[3]);
    this._loadel[0].setSize(this.Frame.size.v[0],this.Frame.size.v[1],1.0);
    this._loadel[0].cachTransform();
    this._loadel[0].cachLayer();
    
    switch(this.opt_preloadStyle)
    {
      case 1: /* Rosasse de chargement */
        for (var i = 2; i < 52; i+=2) {
          this._loadel[i] = new Ovoid.Layer();
          this._loadel[i+1] = new Ovoid.Transform();
        }
        var n = 50;
        var sx = 2;
        var sy = 4;
        var r = 4;
        for(var i = 2; i < n+2; i+=2) {
          
          this._loadel[i].setBgColor(ac[0],ac[1],ac[2],ac[3]*0.25);
          this._loadel[i].setSize(1.0,1.0,1.0);
          this._loadel[i].setParent(this._loadel[i+1]);
          this._loadel[i].moveXyz(0.0,r,0.0);
          this._loadel[i].cachTransform();
          this._loadel[i].cachLayer();
          
          this._loadel[i+1].scaleXyz(sx,sy,1.0,1);
          this._loadel[i+1].rotateXyz(0.0,0.0,(i/n)*Math.PI*2.0);
          this._loadel[i+1].setParent(this._loadel[1]);
          this._loadel[i+1].cachTransform();
        }
        break;
      case 2: /* Barre de chargement */
        this._loadel[54] = new Ovoid.Layer(); // cadre de la barre
        this._loadel[55] = new Ovoid.Layer(); // fond du cadre
        
        for (var i = 2; i < 52; i++) {
          this._loadel[i] = new Ovoid.Layer();
        }
        var n = 50;
        var sx = 6.0;
        var sy = 8.0;
        var px = 0.0;
        var tx = n*(sx+px);
        var dx = -(tx*0.5);
        var py = 10.0;
        for(var i = 0; i < n; i++) {
          this._loadel[i+2].setBgColor(ac[0],ac[1],ac[2],ac[3]*0.25);
          this._loadel[i+2].setSize(sx, sy, 1.0);
          this._loadel[i+2].setParent(this._loadel[1]);
          this._loadel[i+2].moveXyz(dx+(i*(sx+px)),py,0.0);
          this._loadel[i+2].cachTransform();
          this._loadel[i+2].cachLayer();
        }
        /* cadre de la barre */
        this._loadel[54].setBgColor(fg[0],fg[1],fg[2],fg[3]);
        this._loadel[54].setSize(tx+2, sy+2, 1.0);
        this._loadel[54].setParent(this._loadel[1]);
        this._loadel[54].moveXyz(dx-1,py-1,0.0);
        this._loadel[54].cachTransform();
        this._loadel[54].cachLayer();
        
        /* fond du cadre */
        this._loadel[55].setBgColor(bg[0],bg[1],bg[2],bg[3]);
        this._loadel[55].setSize(tx, sy, 1.0);
        this._loadel[55].setParent(this._loadel[1]);
        this._loadel[55].moveXyz(dx,py,0.0);
        this._loadel[55].cachTransform();
        this._loadel[55].cachLayer();
        
        /* Cree une fontmap speciale */
        var cv = Ovoid.genFontmap(256,16,7,8,"normal 6pt arial");
        var fontmap = new Ovoid.Texture("Preload_fontmap", this);
        if(!fontmap.create2dFromImg(this.gl.RGBA, cv)) {
          Ovoid._log(1, this, '._loadstart', ' Preload fontmap texture creation failled');
        }
        /* texte de titre */
        this._loadel[56].setFontmap(fontmap);
        this._loadel[56].string = "LOADING";
        this._loadel[56].setFormat(16.0, 0.5, 1.0);
        var tsx = this._loadel[56].getWidth();
        this._loadel[56].setParent(this._loadel[1]);
        this._loadel[56].moveXyz(tsx*-0.5,-10.0,0.0);
        this._loadel[56].setFgColor(fg[0],fg[1],fg[2],fg[3]);
        this._loadel[56].cachTransform();
        this._loadel[56].cachLayer();
        
        /* texte de details */
        this._loadel[57].setFontmap(fontmap);
        this._loadel[57].string = "...";
        this._loadel[57].setFormat(16.0, 0.5, 1.0);
        var tsx = this._loadel[57].getWidth();
        this._loadel[57].setParent(this._loadel[1]);
        this._loadel[57].moveXyz(tsx*-0.5,10.0,0.0);
        this._loadel[57].setFgColor(fg[0],fg[1],fg[2],fg[3]);
        this._loadel[57].cachTransform();
        this._loadel[57].cachLayer();
        break;
    } 
    
    /* parent principal, au centre de l'écran */
    this._loadel[1].setBgColor(1.0,1.0,1.0,0.0);
    this._loadel[1].setSize(1.0,1.0,1.0);
    this._loadel[1].moveXyz(this.Frame.center.v[0],this.Frame.center.v[1],0.0);
    this._loadel[1].cachTransform();
    this._loadel[1].cachLayer();
    
  } else { /* si pas d'ecran de chargement, chargement sans boucle */
    /* chargement brute de décofrage synchronisé pour les scenes */
    for(var i = 0; i < this._loadstkscn.length; i++) {
      this._loaditem = this._loadstkscn[i];
      switch (this._loaditem[0])
      {
        case Ovoid.OJSON:
          this._loadobj = new Ovoid.Ojson(this);
          this._loadobj.loadSource(this._loaditem[1], false);
          this._loadobj.importScene(this._loaditem[3]);
          break;
        default:
          this._loadobj = new Ovoid.Collada(this);
          this._loadobj.loadSource(this._loaditem[1], false);
          this._loadobj.importDae(this._loaditem[2],
                  this._loaditem[3],
                  this._loaditem[4],
                  this._loaditem[5]);
          break;
      }
      /* on insert les textures pour leur chargement ulterieur */
      var j = this._loaditem[3].texture.length;
      while (j--) {
        this.includeTexture(this._loaditem[3].texture[j], 1);
      }
      /* on insert les audios pour leur chargement ulterieur */
      var j = this._loaditem[3].audio.length;
      while (j--) {
        this.includeAudio(this._loaditem[3].audio[j]);
      }
    }
    /* chargement asynchrone pour les sons et texture */
    for(var i = 0; i < this._loadstktex.length; i++) {
      this._loadstktex[i][0].loadSource(this._loadstktex[i][0].url,
          this._loadstktex[i][1]);
    }
    for(var i = 0; i < this._loadstkaud.length; i++) {
      this._loadstkaud[i][0].loadSource(this._loadstkaud[i][0].url);
    }
    /* chargement brute de décofrage synchronisé pour les shaders */
    for(var i = 0; i < this._loadstkgls.length; i++) {
      this._loaditem = this._loadstkgls[i];
      this._loadobj = new Ovoid.Shader(this._loaditem[4], this);
      this._loadobj.loadSource(this._loaditem[1],
          this._loaditem[2],
          this._loaditem[3], false);
      
      if(this._loadobj.linkWrap()) {
        var spid = this._i.Drawer.addShader(this._loadobj);
        if(this._loaditem[0] != -1) {
          this.Drawer.plugShader(this._loaditem[0], spid);
        }
      }
    }
    /* chargement sans boucle terminé */
    this._loaddone();
  }
};


/**
 * Start loading loop step.
 */
Ovoid.Instance.prototype._loadstep = function() {

  // Avance l'horloge pour un increment temporel
  this.preloadTimer = new Date().getTime() - this._loadtcnt;
  
  /* ------ LOADING PASSAGE POUR LE DESSIN DE LA FRAME ------- */
  this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
  
  /* Initialize pour dessiner l'ecran de chargement */
  this.gl.viewport(0,0,this.Frame.size.v[0],this.Frame.size.v[1]);
  this.Drawer.switchPipe(4,0); /* SP_TEXT */
  this.Drawer.screen(this.Frame.matrix);
  this.Drawer.switchPipe(3,0); /* SP_LAYER */
  this.Drawer.screen(this.Frame.matrix);
  this.Drawer.switchDepth(0);
  this.Drawer.switchBlend(3);
    
  this.Drawer.switchPipe(3,0); /* SP_LAYER */
  /* background */
  this.Drawer.model(this._loadel[0].layerMatrix.m);
  this.Drawer.layer(this._loadel[0]);
  
  /* parent principal */
  this._loadel[1].moveXyz(this.Frame.center.v[0],this.Frame.center.v[1],1.0,0,1);
  this._loadel[1].cachTransform();
  this._loadel[1].cachLayer();
  
  /* active lement color */
  var ac = this.opt_preloadAcColor;
  
  /* Selon type de chargement */
  switch(this.opt_preloadStyle)
  {
    case 1:
      /* Rosasse de chargement */
      for(var i = 2; i < 52; i+=2) {
        
        this._loadel[i+1].cachTransform();

        var lphas = (this.preloadTimer*0.01);
        var lfreq = (i*0.12);
        var t = ((1.0+Math.sin(lphas-lfreq))*0.5)*0.5;
        this._loadel[i].setBgColor(ac[0],ac[1],ac[2],ac[3]*t);
        this._loadel[i].cachTransform();
        this._loadel[i].cachLayer();
        this.Drawer.model(this._loadel[i].layerMatrix.m);
        this.Drawer.layer(this._loadel[i]);
      }
      break;
    case 2: /* Barre de chargement */
      /* cadre de la barre */
      this._loadel[54].cachTransform();
      this._loadel[54].cachLayer();
      this.Drawer.model(this._loadel[54].layerMatrix.m);
      this.Drawer.layer(this._loadel[54]);
      
      /* fond du cadre */
      this._loadel[55].cachTransform();
      this._loadel[55].cachLayer();
      this.Drawer.model(this._loadel[55].layerMatrix.m);
      this.Drawer.layer(this._loadel[55]);
      
      /* barre */
      for(var i = 2; i < 52; i++) {
        var c = 0.0;
        if(this.preloadRatio > i*2.0) c = 0.75;
        var lphas = (this.preloadTimer*0.01);
        var lfreq = (i*0.1);
        var t = ((1.0+Math.sin(lphas-lfreq))*0.5)*0.25;
        this._loadel[i].setBgColor(ac[0],ac[1],ac[2],(ac[3]*c)+t);
        this._loadel[i].cachTransform();
        this._loadel[i].cachLayer();
        this.Drawer.model(this._loadel[i].layerMatrix.m);
        this.Drawer.layer(this._loadel[i]);
      }
      this.Drawer.switchPipe(4,0); /* SP_TEXT */

      /* Texte de titre "LOADING" */
      this._loadel[56].cachTransform();
      this._loadel[56].cachLayer();
      this.Drawer.model(this._loadel[56].layerMatrix.m);
      this.Drawer.text(this._loadel[56]);
      
      /* Texte de details fichier */
      this._loadel[57].moveXyz(this._loadel[57].getWidth()*-0.5,20.0,0.0,0,1);
      this._loadel[57].cachTransform();
      this._loadel[57].cachLayer();
      this.Drawer.model(this._loadel[57].layerMatrix.m);
      this.Drawer.text(this._loadel[57]);
      break;
  }
  
  this.waitdraw();
  
  this.Frame._update();
  
  /* ------ LOADING PASSAGE POUR LE CHARMENT DES ELEMENTS ------- */
  
  /* chargement des shaders */
  if (this._loadstage[3]) {
    if (this._loadremains[3] != 0) {
      if (this._loadobj != null) {
        if (this._loadobj.loadStatus != 0) {
          if (this._loadobj.loadStatus == 1) {
            var id = this.Drawer.addShader(this._loadobj);
            if(this._loaditem.p > -1) {
              this.Drawer.plugShader(id,this._loaditem.p,this._loaditem.l);
            }
          }
          this._loadloaded++;
          this._loadobj = null;
          this._loadremains[3]--;
        }
      } else { // if (Ovoid.Loader._obj != null)
        if (this._loadstkgls.length > 0) {
          this._loaditem = this._loadstkgls.pop();
          this._loadobj = new Ovoid.Shader(this._loaditem.n, this);
          this._loadobj.loadSource(this._loaditem.v,
              this._loaditem.f,
              this._loaditem.w, true);
              
          this._loadel[57].string = Ovoid.extractName(this._loadobj.url, true).toUpperCase();
          Ovoid._log(3, this, '._loadstep', " start loading Shader '"+this._loadobj.url+"'");
        }
      }
    }
  }

  /* chargement audios */
  if (this._loadstage[2]) {
    if (this._loadremains[2] != 0) {
      if (this._loadobj != null) {
        if (this._loadobj.loadStatus != 0) {
          this._loadloaded++;
          this._loadobj = null;
          this._loadremains[2]--;
        }
      } else { // if (Ovoid.Loader._obj != null)

        if (this._loadstkaud.length > 0) {
          this._loaditem = this._loadstkaud.pop();
          this._loadobj = this._loaditem.o;
          this._loadobj.loadSource(this._loaditem.u);
          this._loadel[57].string = Ovoid.extractName(this._loadobj.url, true).toUpperCase();
          Ovoid._log(3, this, '._loadstep', " start loading Audio '"+this._loadobj.url+"'");
        }
      }

    } else { // if (Ovoid.Loader._remains[2] != 0)
      if (!this._loadstage[3]) {
        this._loadstage[3] = true;
        //this._detailsStr = 'Shaders...';
      }
    }
  }

  /* chargement textures */
  if (this._loadstage[1]) {
    if (this._loadremains[1] != 0) {
      if (this._loadobj != null) {
        if (this._loadobj.loadStatus != 0) {
          this._loadloaded++;
          this._loadobj = null;
          this._loadremains[1]--;
        }
      } else { // if (Ovoid.Loader._obj != null)
        if (this._loadstktex.length > 0) {
          this._loaditem = this._loadstktex.pop();
          this._loadobj = this._loaditem.o;
          this._loadobj.loadSource(this._loaditem.u, this._loaditem.f);
          this._loadel[57].string = Ovoid.extractName(this._loadobj.url, true).toUpperCase();
          Ovoid._log(3, this, '._loadstep', " start loading Texture '"+this._loadobj.url+"'");
        }
      }
    } else { // if (Ovoid.Loader._remains[1] != 0)
      if (!this._loadstage[2]) {
        this._loadstage[2] = true;
        //this._detailsStr = 'Sounds...';
      }
    }
  }

  /* chargement scenes */
  if (this._loadremains[0] != 0) {
    if (this._loadobj != null) {
      if (this._loadobj.loadStatus != 0) {
        if (this._loadobj.loadStatus == 1) {
          /* on insert les textures pour leur chargement ulterieur */
          var i = this._loaditem.d.texture.length;
          while (i--) {
            if(this._loaditem.d.texture[i].loadStatus == 0) {
              this._loadstktex.unshift(new Object);
              this._loadstktex[0].o = this._loaditem.d.texture[i];
              this._loadstktex[0].u = this._loaditem.d.texture[i].url;
              this._loadstktex[0].f = this._loaditem.d.texture[i].filter;
              this._loadtotal++;
              this._loadremains[1]++;
            }
          }
          /* on insert les audios pour leur chargement ulterieur */
          var i = this._loaditem.d.audio.length;
          while (i--) {
            if(this._loaditem.d.audio[i].loadStatus == 0) {
              this._loadstkaud.unshift(new Object);
              this._loadstkaud[0].o = this._loaditem.d.audio[i];
              this._loadstkaud[0].u = this._loaditem.d.audio[i].url;
              this._loadtotal++;
              this._loadremains[2]++;
            }
          }
        }
        this._loadloaded++;
        this._loadobj = null;
        this._loadremains[0]--;
      }
    } else { // if (Ovoid.Loader._obj != null)
      if (this._loadstkscn.length > 0) {
        this._loaditem = this._loadstkscn.pop();
        switch (this._loaditem.o)
        {
          case Ovoid.OJSON:
            this._loadobj = new Ovoid.Ojson(this);
            if(Ovoid.extractExt(this._loaditem.u).toUpperCase() == "OJS") {
              this._loadobj.loadSource(this._loaditem.u,
                    this._loaditem.d, true); 
            } else {
              this._loadobj.loadSource(this._loaditem.u,
                    this, true); 
            }
            break;
          default:
            this._loadobj = new Ovoid.Collada(this);
            this._loadobj.loadSource(this._loaditem.u,
                  this._loaditem.d,
                  this._loaditem.m,
                  this._loaditem.p,
                  this._loaditem.s, true);
            break;
        }
        this._loadel[57].string = Ovoid.extractName(this._loadobj.url, true).toUpperCase();
        Ovoid._log(3, this, '._loadstep', " start loading Scene '"+this._loadobj.url+"'");
      }
    }
  } else { // if (Ovoid.Loader._remains[0] != 0)
    if (!this._loadstage[1]) {
      this._loadstage[1] = true;
      //this._detailsStr = 'Textures...';
    }
  }

  this.preloadRatio = ((this._loadloaded) / this._loadtotal) * 100;

  if (this._logGlerror('._loadstep')) {
    Ovoid._err(3, this, '._loadstep() WebGL error');
  }

  if (!(this._loadloaded < this._loadtotal)) {
    Ovoid._log(3, this, '._loadstep', ' loading done in: ' + 
        ((new Date().getTime() - this._loadtcnt) * 0.001) + 's');
    this._loaddone();
  }
}


/**
 * On loaded step loader function.
 */
Ovoid.Instance.prototype._loaddone = function() {

  /* reset tous les elements de chargement */
  this._loadstage = [true,false,false,false];
  this._loadremains = [0,0,0,0];
  this._loadtotal = 0;
  this._loadloaded = 0;
  this.preloadRatio = 0.0;
  this._loadstkscn = new Array();
  this._loadstktex = new Array();
  this._loadstkaud = new Array();
  this._loadstkgls = new Array();
  this._loadobj = null;
  this._loaditem = null;
  this._loadel = new Array();

  Ovoid._log(3, this, '._loaddone', ' run onload()');
  /* appelle la function onload */

  /* performance counter */
  var t = (new Date().getTime());
  
  try {
    /* USER CUSTOM ONLOAD FUNC */
    this.onload();
  } 
  catch(e) {
    Ovoid._log(0, this, '.onload', ' (Exception)\n' + e.stack);
    Ovoid._err(4, this, 'onload() Exception thrown');
  }
  
  Ovoid._log(3, this, '.onload', ' executed in: ' + 
      ((new Date().getTime() - t) * 0.001) + 's');
  
  // On calibre le timer
  this.Timer._reset();
  // Pour updater les viewports et les cameras dès la premiere frame
  this.Frame._changed = true;
  
  Ovoid._log(3, this, '._loaddone', ' instance jump to main loop...now!');
  /* Entre en boucle de rendu */
  this._runstat = 2;
};


/**
 * Start instance.<br><br>
 * 
 * Start or restart the Instance. If Instance is just created this 
 * method enable the Instance to load data (if needed) and enter render loop. 
 * If Instance is paused, this method restart it.<br><br>
 * 
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;var Instance = Ovoid.newInstance("myOvoid", "myCanvas", cfg);<br>
 * &nbsp;&nbsp;<cc>// Add some stuff to load...</cc><br>
 * &nbsp;&nbsp;<cc>// Define onload()...</cc><br>
 * &nbsp;&nbsp;<cc>// Define onloop()...</cc><br>
 * &nbsp;&nbsp;Instance.start();<br>
 * };<br>
 * </blockcode><br><br>
 * 
 */
Ovoid.Instance.prototype.start = function() {
  
  if(this._runstat == -1) this._runstat = 0;
  if(this._runstat == 3) this._runstat = 2;
}


/**
 * Pause instance.<br><br>
 * 
 * Pause the instance. If Instance is on runtime, this method will pause
 * this Instance, excluding it from the main library process (including
 * rendering).<br><br>
 * 
 */
Ovoid.Instance.prototype.pause = function() {
  
  if(this._runstat == 2) this._runstat = 3;
}


/**
 * Include OJSON scene.<br><br>
 * 
 * Add an OJSON scene file to the loading stacks.<br><br>
 * 
 * <blockcode>
 * &nbsp;&nbsp;Instance.includeOjson("helloworld.ojs");<br>
 * </blockcode><br><br>
 * 
 * For more information about OvoiD.JSON importation see the
 * <a href="Ovoid.Ojson.php">Ovoid.Ojson</a> class reference documentation.
 * 
 * @see Ovoid.Ojson
 * 
 * @param {string} url OJSON source file url.
 * 
 * @param {Object} [scene] Optional alternative recipient Scene object, 
 * if null the current active Scene is used as recipient.
 * 
 */
Ovoid.Instance.prototype.includeOjson= function(url, scene) {
  
  if(!scene) scene = this.Scene;
  
  this._loadstkscn.unshift(new Array(6))
  this._loadstkscn[0].o = Ovoid.OJSON;
  this._loadstkscn[0].u = url;
  this._loadstkscn[0].d = scene;
  
  this._loadtotal++;
  this._loadremains[0]++;
  
  /* repart en loading */
  this._runstat = 0;
};


/**
 * Include DAE scene.<br><br>
 * 
 * Adds a Collada/DAE scene file to the loading stacks. If <c>scene</c> 
 * argument is null or not specified the imported Nodes are inserted 
 * in the current Instance's active Scene.<br><br>
 * 
 * <blockcode>
 * &nbsp;&nbsp;Instance.includeDaeScene("helloworld.dae");<br>
 * </blockcode><br><br>
 * 
 * This method allows specify a Collada options importation bitmask and 
 * renaming prefix and/or suffix for the imported Nodes. 
 * For more information about Collada/DAE importation see the 
 * <a href="Ovoid.Collad.php">Ovoid.Collada</a> 
 * class reference documentation.<br><br>
 * 
 * Note: If the mask argument is not specified or null, a default 
 * options importation bitmask is used, and is defined as follow:<br>
 * <c>Ovoid.DAE_ALLSNODES|<br>
 * Ovoid.DAE_CREATE_TRACK|<br>
 * Ovoid.DAE_FORCE_CSPLINE|<br>
 * Ovoid.DAE_MERGE_DEPENDENCIES|<br>
 * Ovoid.DAE_OPTIMIZE_ALL|<br>
 * Ovoid.DAE_CONVERT_UPAXIS</c>
 * 
 * @see Ovoid.Collada
 * 
 * @param {string} url DAE/COLLADA file url.
 * 
 * @param {bitmask} options Optional Importation options bitmask or null to use default settings.
 * 
 * @param {string} [prefix] Optional prefix used to name imported nodes or null.
 * 
 * @param {string} [suffix] Optional suffix used to name imported nodes or null.
 * 
 * @param {Object} [scene] Optional recipient Scene object or null to use the Instance's current active Scene.
 * 
 */
Ovoid.Instance.prototype.includeDaeScene = function(url, mask, prefix, suffix, scene) {
  
  if(!scene) scene = this.Scene;
  
  if(!mask) {
    mask = Ovoid.DAE_ALL_NODES|
            Ovoid.DAE_CREATE_TRACK|
            Ovoid.DAE_FORCE_CSPLINE|
            Ovoid.DAE_MERGE_DEPENDENCIES|
            Ovoid.DAE_OPTIMIZE_ALL|
            Ovoid.DAE_CONVERT_UPAXIS;
    Ovoid._log(3, this, '.includeDaeScene', ' null options, use default.');
  }
  
  this._loadstkscn.unshift(new Object)
  this._loadstkscn[0].o = Ovoid.COLLADA;
  this._loadstkscn[0].u = url;
  this._loadstkscn[0].m = mask;
  this._loadstkscn[0].p = prefix;
  this._loadstkscn[0].s = suffix;
  this._loadstkscn[0].d = scene;
  
  this._loadtotal++;
  this._loadremains[0]++;

  /* repart en loading */
  this._runstat = 0;
};

/**
 * Include DAE scene's animations.<br><br>
 * 
 * Adds a Collada/DAE scene file to the loading stacks with predefined 
 * importation option bitmask to import only Animation and Track Nodes.
 * If <c>scene</c> argument is null or not specified the imported Nodes 
 * are inserted in the current Instance's active Scene.
 * 
 * <blockcode>
 * &nbsp;&nbsp;Instance.includeDaeAnimation("guywalk.ojsn", null, "walk");<br>
 * </blockcode><br><br>
 * 
 * This method allows specify 
 * renaming prefix and/or suffix for the imported Nodes. 
 * For more information about Collada/DAE importation see the 
 * <a href="Ovoid.Collad.php">Ovoid.Collada</a> 
 * class reference documentation.<br><br>
 * 
 * Note: The predefined importation option bitmask used is defined as 
 * follow:<br>
 * <c>Ovoid.DAE_ANIMATIONS|<br>
 * Ovoid.DAE_CREATE_TRACK|<br>
 * Ovoid.DAE_MERGE_DEPENDENCIES|<br>
 * Ovoid.DAE_FORCE_CSPLINE|<br>
 * Ovoid.DAE_CONVERT_UPAXIS</c><br><br>
 * 
 * For more information about Animation and Track see the 
 * <a href="Ovoid.Animation.php">Ovoid.Animation</a> 
 * and
 * <a href="Ovoid.Track.php">Ovoid.Track</a> 
 * classes reference documentation.<br><br>
 * 
 * @param {string} url DAE/COLLADA file url.
 * 
 * @param {string} [prefix] Optional prefix used to name imported nodes or null.
 * 
 * @param {string} [suffix] Optional suffix used to name imported nodes or null.
 * 
 * @param {Object} [scene] Optional recipient Scene object or null to use the Instance's current active Scene.
 */
Ovoid.Instance.prototype.includeDaeAnimation = function(url, prefix, suffix, scene) {
  
  if(!scene) scene = this.Scene;
  
  var mask = Ovoid.DAE_ANIMATIONS |
            Ovoid.DAE_CREATE_TRACK |
            Ovoid.DAE_MERGE_DEPENDENCIES |
            Ovoid.DAE_FORCE_CSPLINE |
            Ovoid.DAE_CONVERT_UPAXIS;

  this.includeDaeScene(url, mask, prefix, suffix, scene); 

  /* repart en loading */
  this._runstat = 0;
};


/**
 * Include DAE scene's meshs.<br><br>
 * 
 * Adds a Collada/DAE scene file to the loading stacks with predefined 
 * importation option bitmask to import only Mesh Nodes (geometry data).
 * If <c>scene</c> argument is null or not specified the imported Nodes 
 * are inserted in the current Instance's active Scene.
 * 
 * 
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Instance.includeDaeMesh("guybrush.dae");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * This method allows specify 
 * renaming prefix and/or suffix for the imported Nodes. 
 * For more information about Collada/DAE importation see the 
 * <a href="Ovoid.Collad.php">Ovoid.Collada</a> 
 * class reference documentation.<br><br>
 * 
 * Note: The predefined importation option bitmask used is defined as 
 * follow:<br>
 * <c>Ovoid.DAE_MESHS|<br>
 * Ovoid.DAE_MATERIALS|<br>
 * Ovoid.DAE_MERGE_DEPENDENCIES|<br>
 * Ovoid.DAE_OPTIMIZE_ALL|<br>
 * Ovoid.DAE_CONVERT_UPAXIS</c><br><br>
 * 
 * For more information about Mesh and geometry data see the 
 * <a href="Ovoid.Mesh.php">Ovoid.Mesh</a> 
 * classes reference documentation.<br><br>
 * 
 * @see Ovoid.Collada
 * @see Ovoid.Mesh
 * 
 * @param {string} url DAE/COLLADA file url.
 * 
 * @param {string} [prefix] Optional prefix used to name imported nodes or null.
 * 
 * @param {string} [suffix] Optional suffix used to name imported nodes or null.
 * 
 * @param {Object} [scene] Optional recipient Scene object or null to use the Instance's current active Scene.
 */
Ovoid.Instance.prototype.includeDaeMesh = function(url, prefix, suffix, scene) {
  
  if(!scene) scene = this.Scene;

  var mask = Ovoid.DAE_MESHS | 
            Ovoid.DAE_MATERIALS |
            Ovoid.DAE_MERGE_DEPENDENCIES |
            Ovoid.DAE_OPTIMIZE_ALL |
            Ovoid.DAE_CONVERT_UPAXIS;
  
  this.includeDaeScene(url, mask, prefix, suffix, scene);

  /* repart en loading */
  this._runstat = 0;
};


/**
 * Include image file as Texture.<br><br>
 * 
 * Adds an image file to the loading stacks and stores it as a
 * Texture Node. 
 * If <c>scene</c> 
 * argument is null or not specified the imported Nodes are inserted 
 * in the current Instance's active Scene.<br><br>
 * 
 * For more information about Texture see the 
 * <a href="Ovoid.Texture.php">Ovoid.Texture</a> 
 * classes reference documentation.<br><br>
 *
 * @param {string} name Texture name.
 * 
 * @param {string} url Image file url.
 * 
 * @param {bool} filter Texture filtering.
 * 
 * @param {Object} [scene] Optional recipient Scene object or null to use the Instance's current active Scene.
 */
Ovoid.Instance.prototype.includeTexture = function(name, url, filter, scene) {

  if(!scene) scene = this.Scene;
  
  this._loadstktex.unshift(new Object);
  this._loadstktex[0].o = scene.newNode(Ovoid.TEXTURE, name);
  this._loadstktex[0].u = url;
  this._loadstktex[0].f = filter;
  
  this._loadtotal++;
  this._loadremains[1]++;

  /* repart en loading */
  this._runstat = 0;
};


/**
 * Include audio file as Audio.<br><br>
 * 
 * Adds an audio file to the loading stacks and stores it as an
 * Audio Node. 
 * If <c>scene</c> 
 * argument is null or not specified the imported Nodes are inserted 
 * in the current Instance's active Scene.<br><br>
 * 
 * For more information about Audio see the 
 * <a href="Ovoid.Audio.php">Ovoid.Audio</a> 
 * classes reference documentation.<br><br>
 *
 * @param {string} name Audio name.
 * 
 * @param {string} url Audio file url.
 * 
 * @param {Object} [scene] Optional recipient Scene object or null to use the Instance's current active Scene.
 */
Ovoid.Instance.prototype.includeAudio = function(name, url, scene) {

  if(!scene) scene = this.Scene;
  
  this._loadstkaud.unshift(new Object);
  this._loadstktex[0].o = scene.newNode(Ovoid.AUDIO, name);
  this._loadstktex[0].u = url;
  
  this._loadtotal++;
  this._loadremains[2]++;

  /* repart en loading */
  this._runstat = 0;
};


/**
 * Include GLSL sources files as Shader.<br><br>
 * 
 * Adds a GLSL shader program's source files to the loading stacks, 
 * compile and link the program then plug it as a Shader object in the 
 * Instance's Drawer Module class's specified pipeline and layer.<br><br>
 *  
 * <blockcode>
 * &nbsp;&nbsp;Instance.includeShader("myCustom_Snow_Shader", "snow.vs", "snow.fs", "wrapmap.xml", Ovoid.PIPE_RP_PARTICLE, -1);<br>
 * </blockcode><br><br>
 * 
 * @param {string} name Symbolic name for the Shader object.
 * 
 * @param {string} vs Vertex program shader source file url. 
 * 
 * @param {string} fs Fragment program shader source file url. 
 * 
 * @param {string} wm XML or JSON wrapping map file url or null to use 
 * the Ovoid.JS's default wrapping map.
 * 
 * @param {int} p Drawing pipeline the shader will be pluged to. Can be 
 * <c>-1</c> to keep the sahder in the Drawer's stock without pluging it or one 
 * of the followings symbolic constants (or matching number):<br>
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
 * @param {int} l Render layer id to assing the Shader to. Can be an
 * integer up to Ovoid.MAX_RENDER_LAYER or <c>-1</c> to assing to all 
 * layers.
 */
Ovoid.Instance.prototype.includeShader = function(name, vs, fs, wm, p, l) {

  this._loadstkgls.unshift(new Object);
  this._loadstkgls[0].n = name;
  this._loadstkgls[0].v = vs;
  this._loadstkgls[0].f = fs;
  this._loadstkgls[0].w = wm;
  this._loadstkgls[0].p = p;
  this._loadstkgls[0].l = l;
  
  this._loadtotal++;
  this._loadremains[3]++;
    
  /* repart en loading */
  this._runstat = 0;
};


/**
 * Use a Scene.<br><br>
 * 
 * Set the given scene as the active one.<br><br>
 * 
 * The Scene object must be registered to this Instance. If null is 
 * passed as argument, the Instance's default scene is set as 
 * active.<br><br>
 * 
 * To properly create a new registered Scene, use the 
 * <c>Instance.newScene()</c> method.<br><br>
 * 
 * <blockcode>
 * var scene = Instance.newScene("Hello");<br>
 * Instance.useScene(scene);<br>
 * </blockcode><br><br>
 * 
 * @see Ovoid.Scene
 *
 * @param {Scene} scene Scene object to set as active one or null
 * to set the default Scene as active one.
 * 
*/
Ovoid.Instance.prototype.useScene = function(scene) {

  if(scene) {
    if(scene._i === this) this.Scene = scene;
  } else {
    this.Scene = this._dScene;
  };
};


/**
 * Create scene.<br><br>
 * 
 * Creates a new Scene object with the given name registered to this 
 * Instance.<br><br>
 * 
 * <blockcode>
 * var scene = Instance.newScene("Hello");<br>
 * Instance.useScene(scene);<br>
 * </blockcode><br><br>
 * 
 * @see Ovoid.Scene
 *
 * @param {string} name New Scene name.
 * 
 * @return {Node} The new Scene object attached to this Instance object.
*/
Ovoid.Instance.prototype.newScene = function(name) {

  return new Ovoid.Scene(name, this);
};


/**
 * Create Shader object.<br><br>
 * 
 * Creates a new Shader object registered to this 
 * Instance.<br><br>
 * 
 * @param {object} name Name of the new Shader object.
 *
 * @return {object} The new created Shader object.
 */
Ovoid.Instance.prototype.newShader = function(name) {
  
  return new Ovoid.Shader(name, this);
};


/**
 * Assign an Action node to one or several pickable nodes.<br><br>
 * 
 * Assigns an Action nodes to one or several pickable nodes (Body, Layer). 
 * Target can be a Transform node instance or a string to retrieve one or 
 * several nodes whose name matches with.<br><br>
 * 
 * <blockcode>
 * function grabnode(node) {<br>
 * &nbsp;&nbsp;Instance.Input.grabNode(node)<br>
 * };<br>
 * <br>
 * function rotate(node) {<br>
 * &nbsp;&nbsp;<cc>// Instance.Input.intUp is an array of "key-up" input signals</cc><br>
 * &nbsp;&nbsp;if (Instance.Input.intUp[Ovoid.MB_LEFT]) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Instance.Input.grabRelease();<br>
 * &nbsp;&nbsp;} else {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// Instance.Input.mouseVelocity is a Vector object</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;node.rotate(Instance.Input.mouseVelocity);<br>
 * &nbsp;&nbsp;}<br>
 * };<br>
 * <br>
 * Ovoid.setAction(Ovoid.MOUSE_OVER_LEFT_DOWN, "mybox", grabnode);<br>
 * Ovoid.setAction(Ovoid.ON_GRABBED, "mybox", rotate);<br>
 * </blockcode><br><br>
 * 
 * For more information about how Action node, see the 
 * <c>Ovoid.Action</c> class documentation reference.
 * 
 * @see Ovoid.Action
 *
 * @param {enum} e Event to catch. Can be one of 
 * the following symbolic constants: <br>
 * Ovoid.MOUSE_ENTER, <br>
 * Ovoid.MOUSE_LEAVE, <br>
 * Ovoid.MOUSE_OVER, <br>
 * Ovoid.MOUSE_OVER_LEFT_DOWN, <br>
 * Ovoid.MOUSE_OVER_LEFT_UP, <br>
 * Ovoid.MOUSE_OVER_LEFT_HELD, <br>
 * Ovoid.MOUSE_OVER_MIDDLE_DOWN, <br>
 * Ovoid.MOUSE_OVER_MIDDLE_UP, <br>
 * Ovoid.MOUSE_OVER_MIDDLE_HELD, <br>
 * Ovoid.MOUSE_OVER_RIGHT_DOWN, <br>
 * Ovoid.MOUSE_OVER_RIGHT_UP, <br>
 * Ovoid.MOUSE_OVER_RIGHT_HELD, <br>
 * Ovoid.ON_GRABBED,<br>
 * Ovoid.ON_UNGRABBED,<br>
 * Ovoid.ON_INTERSECT,<br>
 * Ovoid.ON_INTERSECT_ENTER,<br>
 * Ovoid.ON_INTERSECT_LEAVE
 * 
 * @param {string|Node} target Node object, or a string to retrieve one or 
 * several nodes whose name matches with.
 * 
 * @param {Function} f The trigger function to call for this event.
 * 
 * @param {string|Node} [item] Additionnal trigger argument. Can be a node to 
 * define an intersection trigger.
 * 
 * @return {Action} The created Action node reference.
 */
Ovoid.Instance.prototype.setAction = function(e, target, f, item) {
  
  if (e > 16) {
    Ovoid._log(2, this, '.setAction', " unknown event (" + e + ").");
    return;
  }
  
  if (!(f instanceof Function)) {
    Ovoid._log(2, this, '.setAction', " not valid Function ("+ f +").");
    return;
  }
  
  /* verifie la validité de l'item, si on peu retrouver quelque chose */
  var items = null;
  if (item) {
    if (typeof(item) == "string") {
      var nodes = this.Scene.findMatches(item);
      if (nodes.length == 0) {
        Ovoid._log(2, this, '.setAction', " no node found with matching name '"
          +item+"' in the current active scene '" + this.Scene.name + "'.");
        return;
      }
      items = nodes;
    } else {
      if(item.type & Ovoid.BODY) {
        items = new Array();
        items.push(item);
      } else {
        Ovoid._log(2, this, '.setAction', ' node ' 
          +item.name+' is not a Body instance.');
        return;
      }
    }
  }
  
  var newaction;
  
  /* retrouve la node si c'est un string */
  var nodes;
  if (typeof(target) == "string") {
    nodes = this.Scene.findMatches(target);
    if (nodes.length == 0) {
      Ovoid._log(2, this, '.setAction', " no node found with matching name '"
        +target+"' in the current active scene '" + this.Scene.name + "'.");
      return;
    }
    /* par défaut on crée une nouvelle action */
    newaction = new Ovoid.Action(target + "Action", this);
  } else {
    if(target.type & Ovoid.BODY || target.type & Ovoid.LAYER) {
      nodes = new Array();
      nodes.push(target);
      /* par défaut on crée une nouvelle action */
      newaction = new Ovoid.Action(target.name + "Action", this);
    } else {
      Ovoid._log(2, this, '.setAction', ' node ' 
          +target.name+' is not a Body or Layer instance.');
      return;
    }
  }
  
  
  /* témoins pour savoir si la nouvelle action a déja été configuré */
  var newactiondone = false;
  var action;
  var once = false;
  var i = nodes.length;
  while(i--) {
    /* Si ce n'est pas un body, cancel */
    if (!(nodes[i].type & Ovoid.BODY || nodes[i].type & Ovoid.LAYER)) {
      Ovoid._log(2, this, '.setAction', ' node ' 
          + nodes[i].name + ' is not a Body or Layer instance.');
      continue;
    }
    action = null;
    /* Parcour des Action linkés à la node. Si on en trouve, on ne réutilise la 
     * même action que si le nom est identique, signifiant que le ciblage de 
     * node n'a pas changé. Sans quoi on crée une nouvelle action comme un 
     * cas particulier. Ceci pour éviter qu'une node Action qui concerne 
     * plusieures cibles, ne soit "écrasé" par une action qui est censé ne 
     * concerner qu'une seul cible. Le cas particulier écrase donc le cas 
     * général. */
    var j = nodes[i].depend.length;
    while(j--) {
      if (nodes[i].depend[j].type & Ovoid.ACTION) {
        if (nodes[i].depend[j].name == newaction.name) {
          action = nodes[i].depend[j];
          break;
        }
      }
    }
    if (!action) {
      /* On utilise l'action nouvelement créée */
      action = newaction;
      action.linkNode(nodes[i]);
      Ovoid._log(3, this, '.setAction', ' linking action ' 
          + action.name + ' to ' + nodes[i].name);
      /* Si l'Action n'a pas encore été traité */
      if( !newactiondone ) {
        /* insert la nouvelle action en scene */
        Ovoid._log(3, this, '.setAction', ' adding action node ' 
          + action.name + ' to active scene');

        this.Scene.insNode(action);
        newactiondone = true;
      } else {
        /* inutile de reconfigurer l'Action */
        continue;
      }
    } else {
        once = true;
        Ovoid._log(3, this, '.setAction', ' updating action ' + action.name);
    }
    if(items) {
      j = items.length;
      while (j--) action.setTrigger(e, f, items[j]);
    } else {
      action.setTrigger(e, f);
    }
    if (once) return action;
  }
  return action;
};


/**
 * Assign Constraint nodes to one or several Transform nodes.<br><br>
 * 
 * Assigns Constraint nodes of the specified type to one or several Transform 
 * nodes. Target can be a Transform node instance or a string to retrieve one or 
 * several nodes whose name matches with. This method creates one new Constraint
 * node per target node.<br><br>
 * 
 * <blockcode>
 * var constraints = Instance.setConstraint(Ovoid.PHYSICS, "box")<br>
 * for (var i = 0; i < constraints.length; i++) {<br>
 * &nbsp;&nbsp;constraints[i].model = Ovoid.RIGID_MASSIVE_BOX;<br>
 * &nbsp;&nbsp;constraints[i].setMass(2.0);<br>
 * }<br>
 * </blockcode>
 * 
 * @see Ovoid.Animation
 * @see Ovoid.Physics
 * 
 * @param {int} type Constraint node type. Can be Ovoid.PHYSICS, 
 * Ovoid.ANIMATION or Ovoid.EXPRESSION.
 * 
 * @param {string|Node} target Node object, or a string to retrieve one or 
 * several nodes whose name matches with.
 * 
 * @return {Array} Array containing references of the created Constraint nodes.
 */
Ovoid.Instance.prototype.setConstraint = function(type, target) {
  
  /* retrouve la node si c'est un string */
  var nodes;
  if ( typeof(target) == "string" ) {
    nodes = this.Scene.findMatches(target);
    
    if (nodes.length == 0) {
      Ovoid._log(2, this, '.setConstraint', " no node found with matching name '"
        +target+"' in the current active scene '" + this.Scene.name + "'.");
      return;
    }
  } else {
    if(target.type & Ovoid.TRANSFORM) {
      nodes = new Array();
      nodes.push(target);
    } else {
      Ovoid._log(2, this, '.setConstraint', ' node ' 
          + target.name + ' is not a Transform instance.');
      return;
    }
  }
  
  var constraints = new Array();
  
  var constraint;
  var i = nodes.length;
  while(i--) {
    /* Si ce n'est pas un body, cancel */
    if (!(nodes[i].type & Ovoid.TRANSFORM)) {
      Ovoid._log(2, this, '.setConstraint', ' node ' 
          + nodes[i].name + ' is not a Transform instance.');
      continue;
    }

    /* parcour le type de constraint */
    switch (type)
    {
      case Ovoid.PHYSICS:
        constraint = this.Scene.newNode(type, nodes[i].name + "Physics", null);
        Ovoid._log(3, this, '.setConstraint', ' creating Physics node ' 
          + constraint.name + ' in active scene');
        break;
      case Ovoid.ANIMATION:
        constraint = this.Scene.newNode(type, nodes[i].name + "Animation", null);
        Ovoid._log(3, this, '.setConstraint', ' creating Animation node ' 
          + constraint.name + ' in active scene');
        break;
      case Ovoid.EXPRESSION:
        constraint = this.Scene.newNode(type, nodes[i].name + "Animation", null);
        Ovoid._log(3, this, '.setConstraint', ' creating Animation node ' 
          + constraint.name + ' in active scene');
        break;
      default:
        Ovoid._log(2, this, '.setConstraint', ' invalid Constraint type.');
        return;
    }
    Ovoid._log(3, this, '.setConstraint', ' adding constraint ' 
          + constraint.name + ' to ' + nodes[i].name);
    constraint.setTarget(nodes[i]);
    constraints.push(constraint);
  }
  return constraints;
};


/**
 * Assign Physics nodes to one or several Transform nodes.<br><br>
 * 
 * Assigns Physics nodes of the specified type to one or several Transform 
 * nodes. Target can be a Transform node instance or a string to retrieve one or 
 * several nodes whose name matches with. This method creates one new Physics
 * node per target nodes.<br><br>
 * 
 * <blockcode>
 * var physics = Instance.setPhysics("box")<br>
 * for (var i = 0; i < physics.length; i++) {<br>
 * &nbsp;&nbsp;physics[i].model = Ovoid.RIGID_MASSIVE_BOX;<br>
 * &nbsp;&nbsp;physics[i].setMass(2.0);<br>
 * }<br>
 * </blockcode>
 * 
 * @see Ovoid.Physics
 * 
 * @param {string|Node} target Node object, or a string to retrieve one or 
 * several nodes whose name matches with.
 * 
 * @return {Array} Array containing references of the created Physics nodes.
 */
Ovoid.Instance.prototype.setPhysics = function(target) {
  
  /* retrouve la node si c'est un string */
  var nodes;
  if ( typeof(target) == "string" ) {
    nodes = this.Scene.findMatches(target);
    
    if (nodes.length == 0) {
      Ovoid._log(2, this, '.setPhysics', " no node found with matching name '"
        +target+"' in the current active scene '" + this.Scene.name + "'.");
      return;
    }
  } else {
    if(target.type & Ovoid.TRANSFORM) {
      nodes = new Array();
      nodes.push(target);
    } else {
      Ovoid._log(2, this, '.setPhysics', ' node ' 
          + target.name + ' is not a Transform instance.');
      return;
    }
  }
  
  var constraints = new Array();
  
  var constraint;
  var i = nodes.length;
  while(i--) {
    /* Si ce n'est pas un body, cancel */
    if (!(nodes[i].type & Ovoid.TRANSFORM)) {
      Ovoid._log(2, this, '.setPhysics', ' node ' 
          + nodes[i].name + ' is not a Transform instance.');
      continue;
    }
    constraint = this.Scene.newNode(Ovoid.PHYSICS, nodes[i].name + "Physics", null);
    Ovoid._log(3, this, '.setPhysics', ' creating Physics node ' 
      + constraint.name + ' in active scene');
    Ovoid._log(3, this, '.setPhysics', ' adding constraint ' 
          + constraint.name + ' to ' + nodes[i].name);
    constraint.setTarget(nodes[i]);
    constraints.push(constraint);
  }
  return constraints;
};


/**
 * Assign Expression nodesto one or several nodes.<br><br>
 * 
 * Assigns Expression node with the specified expression function to one or 
 * several nodes. Target can be a Transform node instance or a string to 
 * retrieve one or several nodes whose name matches with. This method creates 
 * one Expression node for all target nodes.<br><br>
 * 
 * <blockcode>
 * var exprfunc = function(node, t, l) {<br>
 * &nbsp;&nbsp;node.rotateXyz(0.0, t*0.1, 0.0);<br>
 * &nbsp;&nbsp;node.moveXyz(0.0, Math.cos(l)*0.02, 0.0);<br>
 * }<br>
 * <br>
 * var expression = Instance.setExpression("box", exprfunc)<br>
 * expression.play(0.8);<br>
 * </blockcode>
 * 
 * @see Ovoid.Expression
 * 
 * @param {string|Node} target Node object, or a string to retrieve one or 
 * several nodes whose name matches with.
 * 
 * @param {Function} f Expression function. The expression function should 
 * takes three arguments where first is the target node and second the time 
 * quantum value and third the time line value:<br>
 * <c>var expr = function(node, timeq, timel) {};</c>
 * 
 * @return {Expression} Created Expression node.
 */
Ovoid.Instance.prototype.setExpression = function(target, f) {
  
  if (!(f instanceof Function)) {
    Ovoid._log(2, this, '.setExpression', " not valid Function ("+ f +").");
    return;
  }
  
  /* retrouve la node si c'est un string */
  var exprname;
  var nodes;
  if ( typeof(target) == "string" ) {
    exprname = target;
    nodes = this.Scene.findMatches(target);
    if (nodes.length == 0) {
      Ovoid._log(2, this, '.setExpression', " no node found with matching name '"
        +target+"' in the current active scene '" + this.Scene.name + "'.");
      return;
    }
  } else {
    if(target.type & Ovoid.TRANSFORM || target.type & Ovoid.MATERIAL) {
      exprname = target.name;
      nodes = new Array();
      nodes.push(target);
    } else {
      Ovoid._log(2, this, '.setExpression', ' node ' 
          + target.name + ' is not a valide node type instance.');
      return;
    }
  }

  /* Cree la nouvelle expression */
  var expr = this.Scene.newNode(Ovoid.EXPRESSION, exprname + "Expression");
  Ovoid._log(3, this, '.setExpression', ' creating Expression node ' 
          + expr.name + ' in active scene');
  expr.addExpression(f);
  
  var i = nodes.length;
  while(i--) {
    /* Si ce n'est pas un body, cancel */
    if (!(nodes[i].type & Ovoid.TRANSFORM || nodes[i].type & Ovoid.MATERIAL)) {
      Ovoid._log(2, this, '.setExpression', ' node ' 
          + nodes[i].name + ' is not a valide node type instance.');
      continue;
    }

    Ovoid._log(3, this, '.setExpression', ' adding expression ' 
          + expr.name + ' to ' + nodes[i].name);
    expr.setTarget(nodes[i]);
  }
  return expr;
  
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
Ovoid.Instance.prototype.toJSON = function() {
  
  var o = new Object();
  /* Ovoid.Node */
  o['n'] = this.name;
  /* Recuperation des triggers input */
  o['oi'] = [new Array(), new Array(), new Array()];
  o['oci'] = [new Array(), new Array(), new Array()];
  o['oai'] = [new Array(), new Array(), new Array()];
  o['osi'] = [new Array(), new Array(), new Array()];
  o['olsi'] = [new Array(), new Array(), new Array()];
  o['orsi'] = [new Array(), new Array(), new Array()];
  var s, c, t, i;
  for(s = 0; s < 3; s++) {
    c = this.Input._onInt[s].length;
    o['oi'][s] = new Array(c);
    for(t = 0; t < c; t++) {
      o['oi'][s][t] = new Array(2);
      o['oi'][s][t][0] = this.Input._onInt[s][t][0]; // key
      o['oi'][s][t][1] = Ovoid.compact(this.Input._onInt[s][t][1]); // func
    }
    c = this.Input._onCTRInt[s].length;
    o['oci'][s] = new Array(c);
    for(t = 0; t < c; t++) {
      o['oci'][s][t] = new Array(2);
      o['oci'][s][t][0] = this.Input._onCTRInt[s][t][0]; // key
      o['oci'][s][t][1] = Ovoid.compact(this.Input._onCTRInt[s][t][1]); // func
    }
    c = this.Input._onALTInt[s].length;
    o['oai'][s] = new Array(c);
    for(t = 0; t < c; t++) {
      o['oai'][s][t] = new Array(2);
      o['oai'][s][t][0] = this.Input._onALTInt[s][t][0]; // key
      o['oai'][s][t][1] = Ovoid.compact(this.Input._onALTInt[s][t][1]); // func
    }
    c = this.Input._onSHFInt[s].length;
    o['osi'][s] = new Array(c);
    for(t = 0; t < c; t++) {
      o['osi'][s][t] = new Array(2);
      o['osi'][s][t][0] = this.Input._onSHFInt[s][t][0]; // key
      o['osi'][s][t][1] = Ovoid.compact(this.Input._onSHFInt[s][t][1]); // func
    }
    c = this.Input._onLSUInt[s].length;
    o['olsi'][s] = new Array(c);
    for(t = 0; t < c; t++) {
      o['olsi'][s][t] = new Array(2);
      o['olsi'][s][t][0] = this.Input._onLSUInt[s][t][0]; // key
      o['olsi'][s][t][1] = Ovoid.compact(this.Input._onLSUInt[s][t][1]); // func
    }
    c = this.Input._onRSUInt[s].length;
    o['orsi'][s] = new Array(c);
    for(t = 0; t < c; t++) {
      o['orsi'][s][t] = new Array(2);
      o['orsi'][s][t][0] = this.Input._onRSUInt[s][t][0]; // key
      o['orsi'][s][t][1] = Ovoid.compact(this.Input._onRSUInt[s][t][1]); // func
    }
  }
  
  /* Recuperation des fonctions centrales */
  o['olp'] = Ovoid.compact(this.onloop);
  o['odw'] = Ovoid.compact(this.ondraw);
  o['wdw'] = Ovoid.compact(this.waitdraw);
  
  /* Recuperation des shaders */
  o['sl'] = new Array();
  c = this.Drawer._splib.length;
  for(i = 0; i < c; i++) {
    o['sl'][i] = this.Drawer._splib[i];
  }
  o['sp'] = new Array(Ovoid.MAX_RENDER_LAYER);
  c = this.Drawer._sppipe.length;
  for(i = 0; i < c; i++) {
    o['sp'][i] = this.Drawer._sppipe[i];
  }
  
  o['o'] = new Array();
  /* Options generales */
  o['o'][0] = this.opt_debugMode;
  o['o'][1] = this.opt_enableAlerts;
  o['o'][2] = this.opt_logLevel;
  o['o'][3] = this.opt_customErrContent;
  o['o'][4] = this.opt_showHud;
  o['o'][5] = this.opt_showDebug;
  o['o'][6] = this.opt_gravity;
  /* Options de preload */
  o['o'][7] = this.opt_preloadStyle;
  o['o'][8] = this.opt_preloadBgColor;
  o['o'][9] = this.opt_preloadFgColor;
  o['o'][10] = this.opt_preloadAcColor;
  /* Options de frame */
  o['o'][11] = this.opt_frameMode;
  /* Options du drawer */
  o['o'][12] = this.opt_renderClearColor;
  o['o'][13] = this.opt_renderAmbientColor;
  o['o'][14] = this.opt_renderFogColor;
  o['o'][15] = this.opt_renderFogDensity;
  o['o'][16] = this.opt_renderPickingMode;
  o['o'][17] = this.opt_renderLopLevel;
  o['o'][18] = this.opt_renderAdaptLop;
  o['o'][19] = this.opt_renderAdaptLopThreshold;
  o['o'][20] = this.opt_renderPerLightPass;
  o['o'][21] = this.opt_renderShadowCasting;
  o['o'][22] = this.opt_renderShadowCastingExclusion;
  o['o'][23] = this.opt_renderDrawLayers;
  o['o'][24] = this.opt_renderDrawHelpers;
  o['o'][25] = this.opt_renderDrawAxis;
  o['o'][26] = this.opt_renderDrawBoundingBox;
  o['o'][27] = this.opt_renderDrawBoundingSphere;
  o['o'][28] = this.opt_renderDrawJoints;
  o['o'][29] = this.opt_renderDrawLights;
  o['o'][30] = this.opt_renderDrawCameras;
  o['o'][31] = this.opt_renderDrawNormals;
  o['o'][32] = this.opt_renderJointSize;
  o['o'][33] = this.opt_renderNormalScale;
  /* Options du queuer */
  o['o'][34] = this.opt_sceneViewcull;
  o['o'][35] = this.opt_sceneLightcull;
  o['o'][36] = this.opt_sceneIntersectDetect;
  o['o'][37] = this.opt_sceneDefaultViewPosition;
  o['o'][38] = this.opt_sceneDefaultViewRotation;
  /* Options du solver */
  o['o'][39] = this.opt_physicsIterativeSolver;
  o['o'][40] = this.opt_physicsContactItFactor;
  
  return o;
};


