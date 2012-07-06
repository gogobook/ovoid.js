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

/** Environment option.
 * Default OvoiD.JS library path.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_libPath = 'ovoid.js/';

/** WebGL context option. 
 * Enable or disable alpha canvas. This option allow canvas to be transparent.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_alpha = false;


/** WebGL context option. 
 * Enable or disable Preserve Drawing Buffer. This option must be enabled to
 * use Picking. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_preserveDrawingBuffer = true;


/** WebGL context option. 
 * Enable or disable anti-aliasing.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_antialias = true;


/** WebGL context option. 
 * Enable or disable the stencil buffer 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_stencil = true;


/** WebGL context option. 
 * Enable or disable premultiplied alpha channel. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_premultipliedAlpha = true;


/** Environment option.
 * Avoids browser's cache and force to (re)load external sources files. 
 * 
 * <br><br>This function is usefull during development time to ensure that you 
 * allways work with the latest modified external sources.
 * 
 * <br><br>Note: Except for debugging purpose this option should stay disabled.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_debugMode = false;


/** Environment option.
 * Default path for Textures's images source files.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_texturePath = 'data/map/';


/** Environment option.
 * Default path for Scenes's DAE/Collada source files.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_daePath = 'data/dae/';


/** Environment option.
 * Default path for Scenes's OJSON source files.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_ojsonPath = 'data/ojsn/';


/** Environment option.
 * Default path for Audio's sound source files.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_audioPath = 'data/snd/';


/** Environment option.
 * Default path for Shaders's GLSL source files.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_shadersPath = 'data/glsl/';


/** Environment option. 
 * Default source image filename for font texture map. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_defaultFontmapUrl = 'font_CPMonoPlain.png';


/** Environment option. 
 * Default filter level for font texture map. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_defaultFontmapFilter = 0;


/** Environment option. 
 * <br><br>Enable mouse interacive picking.
 * 
 * <br><br>The picking allow interactions between the drawn scene and
 * the mouse pointer by allowing to know wich object the 
 * mouse pointer is rolling over.
 * 
 * <br><br>Note: Picking involve rendering's methods that can hit framerate. In 
 * details, the picking need to draw the scene a second time in a separate frame 
 * buffer and use the gl.ReadPixels() function. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_enablePicking = true;


/** Environment option. 
 * Disable alert messages. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_disableAlerts = false;


/** Display option. 
 * Show head-up display. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_showHud = true;


/** Display option. 
 * Show debug screen.
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_showDebug = false;


/** Environment option. 
 * Global gravity vector for particles and solver
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * 
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_gravity = [0.0,-0.98,0.0];


/** Current active scene.
 * <br>
 * <br>
 * Current active scene reference. To change the current active scene you
 * can modify this variable or use the <code>Ovoid.useScene()</code> method.
 * @type {Scene} */
Ovoid.rscene = new Ovoid.Scene("null");


/** HUD header layer */
Ovoid._hudbg = new Ovoid.Layer();


/** HUD Body layer */
Ovoid._dbgbg = new Ovoid.Layer();


/** Debug frame's layer text */
Ovoid._dbg = new Array();
for (var i = 0; i < 8; i++) 
  Ovoid._dbg[i] = new Ovoid.Text();


/** Global WebGL Context handle. 
 * 
 * <br><br>This is the global WeGL context object. You can use it for your own WebGL
 * function calls. */
Ovoid.gl = null;


/** Global Audio API Context handle.
 * 
 * <br><br>This is the global Web Audio API context object. You can use it for your
 * own Web Audio API function calls. Note that Chrome browser is the only one 
 * that currently support Web Audio API. */
Ovoid.al = null;
  

/** Add-on modules array */
Ovoid._modules = new Array();

/**
 * Main initialization function.
 * 
 * <br><br>Excepting the data/scenes's preloading, before doing something with 
 * the library, it must be initialized. OvoiD.JS Library is an WebGL wrapper and 
 * many of its classes refers to the WebGL context's core functions.  So, first 
 * of all, if WebGL is not properly initialized, most of OvoiD.JS's  classes 
 * simply won't work.
 * <br>
 * In a second stage, the main initialization will launch all globals classes's 
 * initialization. The main initialization will finally launch the preloading 
 * of external contents.
 * <br>
 * <br>
 * To learn more about preload process, see the <code>Ovoid.Loader</code>  
 * global class's documentation page.
 * <br>
 * <br>
 * The main initialization should be called at page loading. for example,  you 
 * can do it by calling initialisation in any function that is called  by an 
 * "onload"  trigger in the body tag of your HTML page:
 * <br>
 * <br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;<codecomment>// Start OvoiD.JS Library on the given canvas.</codecomment><br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * &lt;/script&gt;<br>
 * <br>
 * &lt;body style="margin:0px;" <b>onload="main();"</b>&gt;<br>
 * </blockcode>
 * <br>
 * <br>
 * 
 * @see Ovoid
 * 
 * @param {string} canvas HTML5 Canvas id to init frame and WebGL context.
*/
Ovoid.init = function(canvas) {

  /* return si une erreur fatale s'est produite */
  if(Ovoid._lfatal)
    return false;

  Ovoid.log(3, 'Ovoid.init', 'Application start');

  /* alerte debug mode */
  if (Ovoid.opt_debugMode) {
    Ovoid.log(2, 'Ovoid.init',
        "Debug mode is enabled, external contents will be redownloaded.");
  }
    
  if (!window.WebGLRenderingContext) {

    Ovoid.log(0, 'Ovoid.init',
        'Browser does not support OpenGL ES / WebGL');
    Ovoid.error(1, 'WebGLRenderingContext is null');

  } else {

    /* options de contexte WebGL */
    var options = {
      alpha: Ovoid.opt_alpha,
      preserveDrawingBuffer: Ovoid.opt_preserveDrawingBuffer,
      antialias: Ovoid.opt_antialias,
      stencil: Ovoid.opt_stencil,
      premultipliedAlpha: Ovoid.opt_premultipliedAlpha
    };

    /* performance counter */
    var t = (new Date().getTime());
    
    /* Differents identifiants de context WebGL */
    var ctxid = [
        'webgl',
        'experimental-webgl'
        ];

    if (Ovoid.Frame.init(canvas))
    {
      Ovoid.log(3, 'Ovoid.init', 'create WebGL context');

      for (var i = 0; i < ctxid.length; i++) {
        /* trouve un context webgl */
        try {
          Ovoid.gl = Ovoid.Frame.canvas.getContext(ctxid[i], options);
          if (Ovoid.gl) break;
        }
        catch (e) {
          Ovoid.log(1, 'Ovoid.init', "getContext 'webgl' error : " + e);
          Ovoid.error(2, "WebGL context 'webgl' creation exception");
          return;
        }
      }

      if (!Ovoid.gl) {
        Ovoid.log(0, 'Ovoid.init', 'WebGL context not found');
        Ovoid.error(3, 'Unable to find a suitable WebGL context');
        return;
      }
    }
    else {
      Ovoid.log(0, 'Ovoid.init', 'Ovoid.Frame initialization error');
      Ovoid.error(4, 'Frame class initialization error');
      return;
    }

    Ovoid.log(3, 'Ovoid.init', 'WebGL context created in: ' + 
        ((new Date().getTime() - t) * 0.001) + 's');
  
    Ovoid.log(3, 'Ovoid.init', 'Search for suitable Audio API.');
    /* Recherche d'une Audio API */
    if(window.AudioContext) {
      try {
        Ovoid.log(3, 'Ovoid.init', 'Using Webkit Audio API.');
        Ovoid.al = new AudioContext();
        Ovoid.al.type = Ovoid.WEBKIT_AUDIO_API;
      } 
      catch (e) {
        Ovoid.log(2, 'Ovoid.init', "new AudioContext error : " + e);
      }
    } else {
      if(window.webkitAudioContext) {
        try {
          Ovoid.log(3, 'Ovoid.init', 'Using Webkit Audio API.');
          Ovoid.al = new webkitAudioContext();
          Ovoid.al.type = Ovoid.WEBKIT_AUDIO_API;
        } 
        catch (e) {
          Ovoid.log(2, 'Ovoid.init', "new webkitAudioContext error : " + e);
        }
      } else {
        /* Simple objet Audio de test, il ne sera pas utile pour la suite
         * des evenement, on le garde pour que Ovoid.al ne soit pas null */
        Ovoid.al = new Audio();
        if (Ovoid.al) {
          if (Ovoid.al.mozWriteAudio != undefined) {
            /* Utilisation de la couche Moz audio data API */
            Ovoid.log(2, 'Ovoid.init', 'Using Moz Audio Data API: Spatial sound not available.');
            Ovoid.al.type = Ovoid.MOZ_AUDIO_API;
          } else {
            /* Utilisation de la couche audio HTML5 classique */
            Ovoid.log(2, 'Ovoid.init', 'Using HTML5 Audio Object: Spatial sound not available.');
            Ovoid.al.type = Ovoid.HTML5_AUDIO;
          }
        } else {
          Ovoid.al = {};
          Ovoid.al.type = 0;
          Ovoid.log(2, 'Ovoid.init', 'No suitable Audio API found.');
        }
      }
    }

    /* détection du browser */
    // TODO...

    Ovoid.log(3, 'Ovoid.init', 'initilizing classes');
    try {
      if (Ovoid.Drawer.init()) {
        if (Ovoid.Input.init()) {
          if (Ovoid.Timer.init()) {
            if (Ovoid.Queuer.init()) {
              if (Ovoid.Loader.init()) {

                /* Si le module solver est présent/chargé on l'init */
                if(Ovoid.Solver != undefined) {
                  if (!Ovoid.Solver.init()) {
                    Ovoid.log(0, 'Ovoid.init',
                      'Ovoid.Solver initialization error');
                    Ovoid.error(4, 'Solver class initialization error');
                    return;
                  }
                }
                
                /* init HUD */
                Ovoid._hudbg.setBgColor(0.6,0.6,0.6,1.0);
                Ovoid._hudbg.setSize(Ovoid.Frame.size.v[0], 17.0, 1.0);
                Ovoid._dbg[7].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[7].moveXyz(2.0, 0.0, 0.0);
                Ovoid._dbg[7].setFgColor(1.0,1.0,1.0,0.6);
                
                Ovoid._dbgbg.setBgColor(0.0,0.0,0.0,0.5);
                Ovoid._dbgbg.setSize(Ovoid.Frame.size.v[0], 
                  Ovoid.Frame.size.v[1]-17.0, 1.0);
                Ovoid._dbgbg.moveXyz(0.0, 16.0, 0.0);
                
                Ovoid._dbg[0].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[0].moveXyz(1.0, 20.0, 0.0);
                Ovoid._dbg[0].setFgColor(1.0,1.0,1.0,1.0);
                
                Ovoid._dbg[1].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[1].moveXyz(250, 20.0, 0.0);
                Ovoid._dbg[1].setFgColor(1.0,1.0,1.0,1.0);
                
                Ovoid._dbg[2].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[2].moveXyz(470.0, 20.0, 0.0);
                Ovoid._dbg[2].setFgColor(1.0,1.0,1.0,1.0);
                
                Ovoid._dbg[3].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[3].moveXyz(720, 20.0, 0.0);
                Ovoid._dbg[3].setFgColor(1.0,1.0,1.0,1.0);
                
                Ovoid._dbg[4].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[4].moveXyz(1.0, 216.0, 0.0);
                Ovoid._dbg[4].setFgColor(1.0,1.0,1.0,1.0);

                Ovoid._dbg[5].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[5].moveXyz(300.0, 216.0, 0.0);
                Ovoid._dbg[5].setFgColor(1.0,1.0,1.0,1.0);
                
                Ovoid._dbg[6].setFormat(16.0, 0.5, 1.0);
                Ovoid._dbg[6].moveXyz(600.0, 216.0, 0.0);
                Ovoid._dbg[6].setFgColor(1.0,1.0,1.0,1.0);
                
                Ovoid._dbg[0].cachTransform();
                Ovoid._dbg[1].cachTransform();
                Ovoid._dbg[2].cachTransform();
                Ovoid._dbg[3].cachTransform();
                Ovoid._dbg[4].cachTransform();
                Ovoid._dbg[5].cachTransform();
                Ovoid._dbg[6].cachTransform();

                /* Lance le chargement */
                Ovoid.Loader._launch();
              } else {
                Ovoid.log(0, 'Ovoid.init',
                    'Ovoid.Loader initialization error');
                Ovoid.error(4, 'Loader class initialization error');
                return;
              }
            } else {
              Ovoid.log(0, 'Ovoid.init',
                  'Ovoid.Queuer initialization error');
              Ovoid.error(4, 'Scener class initialization error');
              return;
            }
          } else {
            Ovoid.log(0, 'Ovoid.init',
                'Ovoid.Timer initialization error');
            Ovoid.error(4, 'Timer class initialization error');
            return;
          }
        } else {
          Ovoid.log(0, 'Ovoid.init',
              'Ovoid.Input initialization error');
          Ovoid.error(4, 'Input class initialization error');
          return;
        }
      } else {
        Ovoid.log(0, 'Ovoid.init',
            'Ovoid.Drawer initialization error');
        Ovoid.error(4, 'Drawer class initialization error');
        return;
      }
    }
    catch (e) {
      Ovoid.log(0, 'Ovoid.init', '(Exception) ' + e.stack);
      Ovoid.error(4, 'Initialization Exception thrown');
      return;
    }
  }
};


/** Global overidable application main loop function. 
 * <br>
 * <br>
 * Main function for the custom loop process. This function is dedicated to be 
 * overrided.
 * <br>
 * <br>
 * The <code>Ovoid.onloop</code> function is called at EACH frame's refresh. 
 * So it's recomended to include code carefully to prevent performance issues 
 * or strange behaviors. For stupid exemple, don't create a new node in this 
 * function without conditions: this would (depending the frame rate) create 
 * more or less 60 new nodes per seconds.
 * <br>
 * <br>
 * 
 * @see Ovoid
 */
Ovoid.onloop = function () {};


/** Global overidable application intialization function.
 * 
 * <br>
 * <br>
 * The main pre-loop function for the custom initializations. This function is 
 * dedicated to be overrided.
 * <br>
 * <br>
 * The <code>Ovoid.onload</code> function is called only once after the main 
 * initialization. the purpose of this function is to provide a space between 
 * the main initialization and the main loop. Since you can't do many things 
 * while WebGL is not initialized, you need to do it after the library's 
 * initialization, and you probably have to do some things before the program 
 * enters in the main loop.
 * <br>
 * <br>
 * 
 * @see Ovoid
 */
Ovoid.onload = function () {};


/**
 * Check whether error(s) was logged.
 *
 * @return {bool} True if any error was encoutered, false otherwise.
*/
Ovoid._hasError = function() {

  return Ovoid._lerror != 0;
};


/**
 * Check whether warning(s) was logged.
 *
 * @return {bool} True if any warning was encoutered, false otherwise.
*/
Ovoid._hasWarning = function() {

  return Ovoid._lwarning != 0;
};



/**
 * Get the log string.
 * 
 * <br><br>Returns the current whole log string.
 *
 * @return {string} Current log string.
*/
Ovoid.getLog = function() {

  return Ovoid._log;
};


/**
 * Get WebGL error if there is any.
 *
 * @return {bool} True if a WebGL error was found, false otherwise.
*/
Ovoid._hasGlerror = function() {

  Ovoid._glerror = Ovoid.gl.getError();

  if (Ovoid._glerror)
    return true;
  else
    return false;
};


/**
 * Get WeGL error string from the current thrown error code.
 *
 * @return {string} Error string.
*/
Ovoid._getGlerror = function() {

  switch (Ovoid._glerror)
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
Ovoid._logGlerror = function(scope) {

  if (Ovoid._hasGlerror()) {
    Ovoid.log(2, scope, ' Erreur WebGL: ' + Ovoid._getGlerror());
    return true;
  }
  return false;
};
  

/**
 * Main onload function
 */
Ovoid._mainload = function() {
  
  try {
    /* USER CUSTOM ONLOAD FUNC */
    Ovoid.onload();
  } 
  catch(e) {
    Ovoid.log(0, 'Ovoid.onload', '(Exception) ' + e.stack);
    Ovoid.error(8, 'Main onload Exception thrown');
    return false;
  }
  return true;
};

/**
 * Main loop function
 */
Ovoid._mainloop = function() {
  
  try {
    /* BEGIN FRAME */
    /* Reset render queue */
    Ovoid.Queuer.reset();
    
    /* USER CUSTOM LOOP FUNC */
    Ovoid.onloop();
    
    /* QUEUE STACK */
    Ovoid.Queuer.queueScene(Ovoid.rscene);
    
    /* DRAW QUEUE */
    Ovoid.Drawer.drawQueue();
    
    /* SOLVE PHYSICS QUEUE */
    if(Ovoid.Solver != undefined)   
      Ovoid.Solver.solveQueue();

    /* DRAW HUD */
    if (Ovoid.opt_showHud) {

      Ovoid._hudbg.setSize(Ovoid.Frame.size.v[0], 17.0, 1.0);
                  
      Ovoid._dbg[7].string = Ovoid.Debug.Sumary();
      
      Ovoid._hudbg.cachTransform();
      Ovoid._dbg[7].cachTransform();

      Ovoid.Drawer.drawLayer(Ovoid._hudbg);
      Ovoid.Drawer.drawText(Ovoid._dbg[7]);

      if (Ovoid.opt_showDebug) {
        
        Ovoid._dbgbg.setSize(Ovoid.Frame.size.v[0], 
                  Ovoid.Frame.size.v[1]-17.0, 1.0);
        Ovoid._dbgbg.cachTransform();
                  
        if (Ovoid.Input.mouseOverUid) {
          var n = Ovoid.rscene.search(Ovoid.Input.mouseOverUid);
          if (n) {
            Ovoid._dbg[5].string = Ovoid.Debug.Node(n) + '\n';
            Ovoid._dbg[5].string += Ovoid.Debug.Transform(n, true) + '\n';
            if(n.shape) {
              if (n.shape.type & Ovoid.MESH) {
                Ovoid._dbg[5].string += Ovoid.Debug.Mesh(n.shape, true);
              }
              if(n.shape.type & Ovoid.SKIN) {
                if (n.shape.mesh)
                  Ovoid._dbg[5].string += Ovoid.Debug.Mesh(n.shape.mesh, true);
              }
            }
            Ovoid._dbg[6].string = Ovoid.Debug.DependTree(n);
          }
        } else {
          Ovoid._dbg[5].string = '';
          Ovoid._dbg[6].string = '';
        }
        
        Ovoid._dbg[0].string = Ovoid.Debug.Drawer();
        Ovoid._dbg[1].string = Ovoid.Debug.Queuer();
        Ovoid._dbg[2].string = Ovoid.Debug.Input();
        Ovoid._dbg[3].string = Ovoid.Debug.Timer()+'\n'; 
        Ovoid._dbg[3].string += Ovoid.Debug.Frame();
        Ovoid._dbg[4].string = Ovoid.Debug.WorldGraph(Ovoid.rscene);
        Ovoid.Drawer.drawLayer(Ovoid._dbgbg);
        
        for ( var i = 0; i < 7; i++)
          Ovoid.Drawer.drawText(Ovoid._dbg[i]);
      }
    }
    
    /* END FRAME */
    Ovoid.Input.update();
    Ovoid.Frame.update();
    Ovoid.Timer.update();
    window.requestAnimFrame(Ovoid._mainloop);
  } 
  catch(e) {
    Ovoid.log(0, 'Ovoid.onloop', '(Exception) ' + e.stack);
    Ovoid.error(7, 'Main loop Exception thrown');
    return;
  }
};


/**
 * Add a whole Ovoid JSON scene importation into the preloading's stack.
 * <br>
 * <br>
 * This function will add an OJSON file importation into the  
 * <code>Ovoid.Loader</code> global class's preloading's stack. This function 
 * imports the whole OJSON's content without restriction or filter in the 
 * specifed Scene object.
 * <br>
 * <br>
 * Because  the preloading of data arrives with the main library's 
 * initialization, <code>Ovoid.include*</code> functions are the only ones 
 * that MUST be called BEFORE the <code>Ovoid.init</code> function :
 * <br>
 * <br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeOjsScene("helloworld.ojsn", myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * <br>
 * <br>
 * The <code>Ovoid.include*</code> functions are more or less shortcuts of 
 * <code>Ovoid.Loader</code>  global class's methods.
 * <br>
 * <br>
 * For more information about OJSON importation and exportation see the
 * <code>Ovoid.Ojson</code> class documentation.
 * 
 * @see Ovoid.Ojson
 * 
 * @param {string} url OJSON source file name. Keep in mind that the 
 * <code>Ovoid.opt_ojsonPath</code> option will be used to retrieve the file.
 * 
 * @param {Object} scene Recipient Scene object.
 */
Ovoid.includeOjsScene = function(url, scene) {
  
  Ovoid.Loader.includeOjson(url, scene);
};


/**
 * Add a whole DAE/Collada scene importation into the preloading's stack.
 * <br>
 * <br>
 * This function will add an DAE/COLLADA file importation into the  
 * <code>Ovoid.Loader</code> global class's preloading's stack. This function 
 * imports the whole DAE's content without restriction or filter in the 
 * specifed Scene object.
 * <br>
 * <br>
 * Because  the preloading of data arrives with the main library's 
 * initialization, <code>Ovoid.include*</code> functions are the only ones 
 * that MUST be called BEFORE the <code>Ovoid.init</code> function :
 * <br>
 * <br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeOjsScene("helloworld.ojsn", myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * <br>
 * <br>
 * The <code>Ovoid.include*</code> functions are more or less shortcuts of 
 * <code>Ovoid.Loader</code>  global class's methods.
 * <br>
 * <br>
 * If set to null, the default options mask used is:<br>
 * <code>Ovoid.DAE_ALLSNODES|
 * Ovoid.DAE_REPARENT_SKIN|
 * Ovoid.DAE_FORCE_CSPLINE|
 * Ovoid.DAE_OPTIMIZE_ALL</code>
 * <br>
 * <br>
 * For more information about Collada/DAE importation see the
 * <code>Ovoid.Collada</code> class documentation.
 * 
 * @see Ovoid.Collada
 * 
 * @param {string} url DAE/COLLADA source file name. Keep in mind that the 
 * <code>Ovoid.opt_daePath</code> option will be used to retrieve the file.
 * 
 * @param {bitmask} options Importation options bitmask. If set to null, the 
 * default options mask used is:<br>
 * <code>Ovoid.DAE_ALLSNODES |<br>
 * Ovoid.DAE_REPARENT_SKIN |<br>
 * Ovoid.DAE_FORCE_CSPLINE |<br>
 * Ovoid.DAE_OPTIMIZE_ALL<br></code>
 * 
 * @param {Scene} scene Recipient Scene object. 
 * 
 * @param {string} prefix Prefix used to name imported nodes. For more 
 * informations about prefix and suffix usage, see the <code>Ovoid.Collada</code> 
 * documentation page.
 * 
 * @param {string} suffix Suffix used to name imported nodes. For more 
 * informations about prefix and suffix usage, see the <code>Ovoid.Collada</code> 
 * documentation page.
 * 
 */
Ovoid.includeDaeScene = function(url, mask, scene, prefix, suffix) {
  
  if(!mask) {
    mask = Ovoid.DAE_ALL_NODES|
            Ovoid.DAE_CREATE_TRACK|
            Ovoid.DAE_FORCE_CSPLINE|
            Ovoid.DAE_OPTIMIZE_ALL;
    Ovoid.log(3, 'Ovoid.includeDaeScene', 'null options, use default.');
  }
  Ovoid.Loader.includeCollada(url, mask, scene, prefix, suffix);
};

/**
 * Add a DAE/Collada Animation nodes importation into the preloading's stack.
 * <br>
 * <br>
 * This function will add an DAE/COLLADA file importation into the 
 * <code>Ovoid.Loader</code> global class's preloading's stack. This function 
 * only imports the DAE's animations's data. 
 * <ul>
 * <li><b>Scene merging</b></li>
 * The imported Animation nodes are, if possible, merged with the existing 
 * scene's node according to node names.
 * <br>
 * <br>
 * For example, if you allready have a Body node named "mybox" in your  scene, 
 * and if the imported Animation node should animate a node named "mybox", the 
 * importer will link automatically the imported Animation node to the object 
 * "mybox" of the given Scene object. 
 * <br>
 * This way, you can begin to import a scene without animations, and then, 
 * import several scenes with object's animations, without meshs, objects 
 * and scene data reimportation. 
 * <br>
 * <br>
 * <li><b>The suffix parameter</b></li>
 * <br>
 * You can use the 'suffix' parameter to rename the animation node, to avoid 
 * name collision and allow a more managable animations library. Look at the 
 * following example:
 * <br>
 * <br>
 * <blockcode>
 * &nbsp;&nbsp;Ovoid.includeDaeScene("mybox.dae", myScene);<br>
 * &nbsp;&nbsp;Ovoid.includeDaeAnimation("mybox-rotate.dae", myScene, "", "rotate");<br>
 * &nbsp;&nbsp;Ovoid.includeDaeAnimation("mybox-jump.dae", myScene, "", "jump");<br>
 * &nbsp;&nbsp;Ovoid.includeDaeAnimation("mybox-sayhello.dae", myScene, "", "sayhello");<br>
 * </blockcode>
 * <br>
 * <br>
 * The result of this exemple is that you will have the normal scene importation
 * with probably one Mesh and one Body node named "mybox" and the imported 
 * Animation nodes will be named "myboxAnimation.rotate", 
 * "myboxAnimation.jump" and "myboxAnimation.sayhello". Note that this require 
 * that object naming was carefully made during exportion from the 3D modeling 
 * software.
 * <br>
 * <br>
 * <li><b>The Track node</b></li>
 * <br>
 * This importation process also create a Track node. The Track node is a kind 
 * of Animamtion group. ONE Track node is created per importation process, so in
 * our above example, three Track nodes was created. The Track node allow you to
 * manipulate several animation with only one object. That is typically usefull
 * for complexes animations scene like skeletal/bones animation that generate
 * one animation per Joint node. For example, suppose the above exemple imply 
 * skeletal animation with many Animation nodes per importation, you only have 
 * to refer to the Track node to animate the whole thing at a time.
 * <br>
 * <br>
 * Note: The Track node is named according to the scene file name. If your scene 
 * file is called "mybox", the Track node will be named "myboxTrack".
 * </ul>
 * <br>
 * <br>
 * Because  the preloading of data arrives with the main library's 
 * initialization, <code>Ovoid.include*</code> functions are the only ones 
 * that MUST be called BEFORE the <code>Ovoid.init</code> function :
 * <br>
 * <br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeDaeAnimation("guywalk.ojsn", myScene, "", "walk");<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * <br>
 * <br>
 * The <code>Ovoid.include*</code> functions are more or less shortcuts of 
 * <code>Ovoid.Loader</code>  global class's methods.
 * <br>
 * <br>
 * The default import options mask used by this method is:<br>
 * <code>Ovoid.DAE_ANIMATIONS|Ovoid.DAE_CREATE_TRACK|
 * Ovoid.DAE_MERGE_DEPENDENCIES|Ovoid.DAE_FORCE_CSPLINE</code>
 * <br>
 * <br>
 * For more information about Collada/DAE importation see the
 * <code>Ovoid.Collada</code> class documentation.
 * 
 * @see Ovoid.Collada
 * @see Ovoid.Animation
 * @see Ovoid.Track
 * 
 * @param {string} url DAE/COLLADA source file name. Keep in mind that the 
 * <code>Ovoid.opt_daePath</code> option will be used to retrieve the file.
 * 
 * @param {Scene} scene Recipient Scene object.
 * 
 * @param {string} prefix Prefix used to name imported nodes. For more 
 * informations about prefix and suffix usage, see the <code>Ovoid.Collada</code> 
 * documentation page.
 * 
 * @param {string} suffix Suffix used to name imported nodes. For more 
 * informations about prefix and suffix usage, see the <code>Ovoid.Collada</code> 
 * documentation page.
 */
Ovoid.includeDaeAnimation = function(url, scene, prefix, suffix) {
  
  var mask = Ovoid.DAE_ANIMATIONS |
            Ovoid.DAE_CREATE_TRACK |
            Ovoid.DAE_MERGE_DEPENDENCIES |
            Ovoid.DAE_FORCE_CSPLINE;

  Ovoid.Loader.includeCollada(url, mask, scene, prefix, suffix);
};


/**
 * Add a DAE/Collada Mesh nodes importation into the preloading's stack.
 * <br>
 * <br>
 * This function will add an Collada/DAE file importation into the 
 * <code>Ovoid.Loader</code> global class's preload stack. This function will 
 * only import Mesh nodes from the scene's content. 
 * <br>
 * <br>
 * Because  the preloading of data arrives with the main library's 
 * initialization, <code>Ovoid.include*</code> functions are the only ones 
 * that MUST be called BEFORE the <code>Ovoid.init</code> function :
 * <br>
 * <br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeDaeMesh("guybrush.dae", myScene, "global");<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * <br>
 * <br>
 * The <code>Ovoid.include*</code> functions are more or less shortcuts of 
 * <code>Ovoid.Loader</code>  global class's methods.
 * <br>
 * <br>
 * The default import options mask used by this method is:<br>
 * <code>Ovoid.DAE_MESHS|Ovoid.DAE_MATERIALS|
 * Ovoid.DAE_MERGE_DEPENDENCIES|Ovoid.DAE_OPTIMIZE_ALL</code>
 * <br>
 * <br>
 * For more information about Collada/DAE importation see the
 * <code>Ovoid.Collada</code> class documentation.
 * 
 * @see Ovoid.Collada
 * @see Ovoid.Mesh
 * 
 * @param {string} url DAE/COLLADA source file name. Keep in mind that the 
 * <code>Ovoid.opt_daePath</code> option will be used to retrieve the file.
 * 
 * @param {Scene} scene Recipient Scene object.
 * 
 * @param {string} prefix Prefix used to name imported nodes. For more 
 * informations about prefix and suffix usage, see the <code>Ovoid.Collada</code> 
 * documentation page.
 * 
 * @param {string} suffix Suffix used to name imported nodes. For more 
 * informations about prefix and suffix usage, see the <code>Ovoid.Collada</code> 
 * documentation page.
 * 
 */
Ovoid.includeDaeMesh = function(url, scene, prefix, suffix) {
  
  var mask = Ovoid.DAE_MESHS | 
            Ovoid.DAE_MATERIALS |
            Ovoid.DAE_MERGE_DEPENDENCIES |
            Ovoid.DAE_OPTIMIZE_ALL;

  Ovoid.Loader.includeCollada(url, mask, scene, prefix, suffix);
};


/**
 * Add an audio source file loading as Audio node into the preloading's stack.
 * 
 * <br><br>This function will add an audio file (ogg, mp3, wav) loading into the 
 * <code>Ovoid.Loader</code> global class's preload stack as Audio node.
 * 
 * <br><br>Because the preloading of data come with global initialization, 
 * <code>Ovoid.include*</code> functions are the only ones that MUST be called
 * BEFORE the <code>Ovoid.init</code> main initialization function:
 * 
 * <br><br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeAudio("boom.mp3", myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * 
 * <br><br>These 
 * functions are more or less shortcuts of <code>Ovoid.Loader</code> global 
 * class's methods.
 * 
 * @see Ovoid.Audio
 * 
 * @param {string} url Audio file source URL.
 * @param {Scene} scene Scene object to insert Audio node in.
 */
Ovoid.includeAudio = function(url, scene) {

  var name = Ovoid.extractName(url, false);
  var audio = scene.create(Ovoid.AUDIO, name, null);
  audio.url = url;
  Ovoid.Loader.includeAudio(audio);
};


/**
 * Add an image source file loading as Texture node into the preloading's stack.
 * 
 * <br><br>This function will add an image file (jpg, png, gif) loading into the 
 * <code>Ovoid.Loader</code> global class's preload stack as Texture node.
 * 
 * <br><br>Because the preloading of data come with global initialization, 
 * <code>Ovoid.include*</code> functions are the only ones that MUST be called
 * BEFORE the <code>Ovoid.init</code> main initialization function:
 * 
 * <br><br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeTexture("myimage.png", 1, myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * 
 * <br><br>These 
 * functions are more or less shortcuts of <code>Ovoid.Loader</code> global 
 * class's methods.
 * 
 * @see Ovoid.Texture
 * 
 * @param {string} url Image file source URL.
 * @param {string} filter Default texture filtering.
 * @param {Object} scene Scene object to insert Texture node in.
 */
Ovoid.includeTexture = function(url, filter, scene) {

  var name = Ovoid.extractName(url, false);
  var texture = scene.create(Ovoid.TEXTURE, name, null);
  texture.url = url;
  
  Ovoid.Loader.includeTexture(texture, filter);
};


/**
 * Add an GLSL source files loading as Shader object into the preloading's stack.
 * 
 * <br><br>This function will add GLSL source files loading into the 
 * <code>Ovoid.Loader</code> global class's preload stack as Shader object and
 * plug it to the specified Drawer's pipeline.
 * 
 * <br><br>Because the preloading of data come with global initialization, 
 * <code>Ovoid.include*</code> functions are the only ones that MUST be called
 * BEFORE the <code>Ovoid.init</code> main initialization function:
 * 
 * <br><br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeShader(-1, "snow.vs", "snow.fs", "wrapmap.xml");<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * 
 * <br><br>These 
 * functions are more or less shortcuts of <code>Ovoid.Loader</code> global 
 * class's methods.
 * 
 * @see Ovoid.Shader
 * 
 * @param {int} slot Symbolic constant for drawing pipeline. Can be -1 to
 * keep the sahder in the Drawer's stock without pluging it, or one of the 
 * following symbolic constants:
 * Ovoid.DRAWER_SP_COLOR,<br>
 * Ovoid.DRAWER_SP_VERTEX_COLOR,<br>
 * Ovoid.DRAWER_SP_1LIGHT,<br>
 * Ovoid.DRAWER_SP_NLIGHT,<br>
 * Ovoid.DRAWER_SP_TEXT,<br>
 * Ovoid.DRAWER_SP_LAYER,<br>
 * Ovoid.DRAWER_SP_PARTICLES<br><br>
 * 
 * @param {string} vs Vertex program shader source file name. The 
 * specified source files are retrieved according to 
 * the <code>Ovoid.opt_shadersPath</code> global option.
 * 
 * @param {string} fs Fragment program shader source file name. The 
 * specified source files are retrieved according to 
 * the <code>Ovoid.opt_shadersPath</code> global option.
 * 
 * @param {string} wm XML or JSON wrap map file name. The 
 * specified source files are retrieved according to 
 * the <code>Ovoid.opt_shadersPath</code> global option.
 * 
 * @param {string} name Optionnal shader name.
 * 
 * For more information about Audio object and Audio loading see the 
 * <code>Ovoid.Shader</code> class documentation.
 */
Ovoid.includeShader = function(slot, vs, fs, wm, name) {

  Ovoid.Loader.includeShader(slot, vs, fs, wm, name);
};


/**
 * Use a Scene object to draw in canvas and interact with.
 * 
 * <br><br>You can build as many scenes as you want. The one you want to be used to 
 * be rendered in the canvas must be specified by this method. You can change 
 * the main scene at any time during the runtime. For example you can preload 
 * and preconfigure some scenes and switch between them at your convenience 
 * during the runtime and so switch between application's different contexts.
 * 
 * @see Ovoid.Scene
 *
 * @param {Scene} scene Scene object to set as active scene.
*/
Ovoid.useScene = function(scene) {

  Ovoid.rscene = scene;
};

/**
 * Use camera as active.
 * <br>
 * <br>
 * Sets the specified Camera node as active camera in the current active scene. 
 * The Camera node must be in the current active scene.
 * <br>
 * <br>
 * The active camera is the one that is used to calculate the rendering's point 
 * of view perspective. A scene can contain more than one camera, and so the 
 * active camera must be explicitely defined to tell to the render engine wich 
 * camera to use to render the scene. The active camera can be switched at 
 * any time.
 * <br>
 * <br>
 * This is a shortcut for the Scene object's <code>useCamera</code> 
 * method.
 * 
 * @see Ovoid.Scene
 * 
 * @param {Camera|string|int} node Camera object, name or UID to be active.
 *
 */
Ovoid.useCamera = function(node) {

  Ovoid.rscene.useCamera(node);
};


/**
 * Adjust active camera yaw.
 * <br>
 * <br>
 * Rotate the current active camera by the specified value in yaw axis.
 * 
 * @param {float} y Yaw value.
 */
Ovoid.cameraYaw = function(y) {

  Ovoid.Queuer._rcamera.rotateXyz(0.0, y, 0.0, Ovoid.WORLD, Ovoid.RELATIVE);
};


/**
 * Adjust active camera pitch.
 * <br>
 * <br>
 * Rotate the current active camera by the specified value in yaw axis.
 * 
 * @param {float} x Pitch value.
 */
Ovoid.cameraPitch = function(x) {

  Ovoid.Queuer._rcamera.rotateXyz(x, 0.0, 0.0, Ovoid.LOCAL, Ovoid.RELATIVE);
};


/**
 * Adjust active camera pitch.
 * <br>
 * <br>
 * Rotate the current active camera by the specified value in yaw axis.
 * 
 * @param {float} z Pitch value.
 */
Ovoid.cameraRoll = function(z) {

  Ovoid.Queuer._rcamera.rotateXyz(0.0, 0.0, z, Ovoid.LOCAL, Ovoid.RELATIVE);
};


/**
 * Adjust active camera dolly.
 * <br>
 * <br>
 * Move the current active camera by the specified value in dolly axis.
 * 
 * @param {float} z Pitch value.
 */
Ovoid.cameraDolly = function(z) {

  Ovoid.Queuer._rcamera.moveXyz(0.0, 0.0, z, Ovoid.LOCAL, Ovoid.RELATIVE);
};


/**
 * Search a node in the current active scene.
 * <br>
 * <br>
 * Retrieves and returns the current active scene's node of the with the 
 * specified name or UID from the.
 * <br>
 * <br>
 * This is a shortcut for the Scene object's <code>search</code> method. 
 * 
 * @see Ovoid.Scene
 * @see Ovoid.Node
 *
 * @param {string|int} item Name or UID of the Node to search.
 * 
 * @return {Node} The found node, or null if none is found.
 */
Ovoid.search = function(name) {
  
  return Ovoid.rscene.search(name);
};



/**
 * Search by matches.
 * <br>
 * <br>
 * Retrieves and returns one or more current active scene's nodes whose name 
 * is containing the specified string, or nodes whose type matches with the 
 * specified bitmask.
 * <br>
 * <br>
 * This is a shortcut for the Scene object's <code>searchMatches</code> method. 
 * 
 * @param {string|bitmask} item String that matches nodes's name or bitmask
 * that matches nodes's type.
 *
 * @return {Node[]} Array of found nodes, empty Array if none is found.
 */
Ovoid.searchMatches = function(item) {
  
  return Ovoid.rscene.searchMatches(item);
}


/**
 * Move an Transform node of the current active scene.
 * 
 * <br><br>This is a shortcut for the <code>moveXyz</code> method of Transform 
 * object applyed to the found node.
 *
 * @param {string} name Name of the Transform to scale.
 * @param {float} x X translation value.
 * @param {float} y Y translation value.
 * @param {float} z Z translation value.
 * @param {enum} c Space coordinate. Can be Ovoid.WORLD, Ovoid.LOCAL. If not
 * specified or null, Ovoid.WORLD is applyed by default.
 * @param {enum} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 * If not specified or null, Ovoid.RELATIVE is applyed by default.
 * 
 * @see Ovoid.Transform
 */
Ovoid.move = function(name, x, y, z, c, m) {
  
  var i = Ovoid.rscene.transform.length;
  while (i--) {
    if (name == Ovoid.rscene.transform[i].name) {
      Ovoid.rscene.transform[i].moveXyz(x, y, z, c, m);
      break;
    }
  }
};


/**
 * Rotate an Transform node of the current active scene.
 * 
 * <br><br>This is a shortcut for the <code>rotateXyz</code> method of Transform 
 * object applyed to the found node.
 * 
 * @param {string} name Name of the Transform to scale.
 * @param {float} x X rotation value.
 * @param {float} y Y rotation value.
 * @param {float} z Z rotation value.
 * @param {enum} c Space coordinate. Can be Ovoid.WORLD, Ovoid.LOCAL. If not
 * specified or null, Ovoid.WORLD is applyed by default.
 * @param {enum} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 * If not specified or null, Ovoid.RELATIVE is applyed by default.
 * 
 * @see Ovoid.Transform
 */
Ovoid.rotate = function(name, x, y, z, c, m) {
  
  var i = Ovoid.rscene.transform.length;
  while (i--) {
    if (name == Ovoid.rscene.transform[i].name) {
      Ovoid.rscene.transform[i].rotateXyz(x, y, z, c, m);
      break;
    }
  }
};


/**
 * Scale an Transform node of the current active scene.
 * 
 * <br><br>This is a shortcut for the <code>scaleXyz</code> method of Transform 
 * object applyed to the found node.
 * 
 * @param {string} name Name of the Transform to scale.
 * @param {float} x X scaling value.
 * @param {float} y Y scaling value.
 * @param {float} z Z scaling value.
 * @param {enum} c Space coordinate. Can be Ovoid.WORLD, Ovoid.LOCAL. If not
 * specified or null, Ovoid.WORLD is applyed by default.
 * @param {enum} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 * If not specified or null, Ovoid.RELATIVE is applyed by default.
 * 
 * @see Ovoid.Transform
 */
Ovoid.scale = function(name, x, y, z, c, m) {
  
  var i = Ovoid.rscene.transform.length;
  while (i--) {
    if (name == Ovoid.rscene.transform[i].name) {
      Ovoid.rscene.transform[i].scaleXyz(x, y, z, c, m);
      break;
    }
  }
};


/**
 * Rewind a Track node of the current active scene.
 *
 * <br><br>This is a shortcut for the <code>rewind</code> method of Track 
 * object applyed to the found one.
 * 
 * @param {string} name The name of Track node to rewind.
 * @param {float} f Playing factor. The playing factor determine the speed and 
 * direction (backward or forward) of the playing. For example a value of 1.0 
 * will play forward at normal speed and a value of -2.0 will play backward at 
 * twice the normal speed.
 * 
 * @see Ovoid.Track
 */
Ovoid.trackRewind = function(name, f) {
  
  var i = Ovoid.rscene.track.length;
  while (i--) {
    if (Ovoid.rscene.track[i].name == name) {
      if (!f) f = 1.0;
      Ovoid.rscene.track[i].rewind(f);
    }
  }
};


/**
 * Play a Track node of the current active scene.
 *
 * <br><br>This is a shortcut for the <code>play</code> method of Track 
 * object applyed to the found one.
 * 
 * @param {string} name The name of Track node to play.
 * @param {float} f Playing factor. The playing factor determine the speed and 
 * direction (backward or forward) of the playing. For example a value of 1.0 
 * will play forward at normal speed and a value of -2.0 will play backward at 
 * twice the normal speed.
 * @param {bool} l Enable or disable loop playing.
 * 
 * @see Ovoid.Track
 */
Ovoid.trackPlay = function(name, f, l) {
  
  var i = Ovoid.rscene.track.length;
  while (i--) {
    if (Ovoid.rscene.track[i].name == name) {
      if (f == null || f == undefined) f = 1.0;
      Ovoid.rscene.track[i].setLoop(l);
      Ovoid.rscene.track[i].play(f);
    }
  }
};


/**
 * Pause a Track node of the current active scene.
 *
 * <br><br>This is a shortcut for the <code>stop</code> method of Track 
 * object applyed to the found one.
 * 
 * @param {string} name The name of Track node to pause.
 * 
 * @see Ovoid.Track
 */
Ovoid.trackPause = function(name) {
  
  var i = Ovoid.rscene.track.length;
  while (i--) {
    if (Ovoid.rscene.track[i].name == name) {
      Ovoid.rscene.track[i].stop();
    }
  }
};


/**
 * Rewind a Sound node of the current active scene.
 *
 * <br><br>This is a shortcut for the <code>rewind</code> method of Sound 
 * object applyed to the found one.
 * 
 * @param {string} name The name of Sound node to rewind.
 * 
 * @see Ovoid.Sound
 */
Ovoid.soundRewind = function(name) {
  
  var i = Ovoid.rscene.sound.length;
  while (i--) {
    if (Ovoid.rscene.sound[i].name == name) {
      Ovoid.rscene.sound[i].rewind();
    }
  }
};


/**
 * Play a Sound node of the current active scene.
 *
 * <br><br>This is a shortcut for the <code>play</code> method of Sound 
 * object applyed to the found one.
 * 
 * @param {string} name The name of Sound node to play.
 * @param {bool} l Enable or disable loop playing.
 * 
 * @see Ovoid.Sound
 */
Ovoid.soundPlay = function(name, l) {
  
  var i = Ovoid.rscene.sound.length;
  while (i--) {
    if (Ovoid.rscene.sound[i].name == name) {
      Ovoid.rscene.sound[i].setLoop(l);
      Ovoid.rscene.sound[i].play();
    }
  }
}


/**
 * Pause a Sound node of the current active scene.
 *
 * <br><br>This is a shortcut for the <code>pause</code> method of Sound 
 * object applyed to the found one.
 * 
 * @param {string} name The name of Sound node to pause.
 * 
 * @see Ovoid.Sound
 */
Ovoid.soundPause = function(name) {
  
  var i = Ovoid.rscene.sound.length;
  while(i--) {
    if (Ovoid.rscene.sound[i].name == name) {
      Ovoid.rscene.sound[i].stop();
    }
  }
};


/**
 * Define or modify an input trigger.
 * <br>
 * <br>
 * You can bind a key and/or mouse button combination to a specific function, 
 * so when the specified key/mouse combination happens, the function is called.
 * <br>
 * <br>
 * The combination is described by a main key event (down, up or held) with 
 * an optional modifier key held such as Control, Shift, Alt, Right Super or
 * Left Super.
 * <br>
 * Here is some examples:
 * <br>
 * <br>
 * <blockcode>
 * function lookright() {<br>
 * &nbsp;&nbsp;Ovoid.Node("camera").rotateXyz(0.0, -0.05, 0.0);<br>
 * };<br>
 * <br>
 * function lookleft() {<br>
 * &nbsp;&nbsp;Ovoid.Node("camera").rotateXyz(0.0, 0.05, 0.0);<br>
 * };<br>
 * <br>
 * Ovoid.inputTrigger(Ovoid.CTR_HELD, 39, Ovoid.HELD, lookright);<br>
 * Ovoid.inputTrigger(Ovoid.CTR_HELD, Ovoid.KB_LARROW, Ovoid.HELD, lookleft);<br>
 * </blockcode>
 * <br>
 * <br>
 * This function is a shortcut for the <code>setTrigger</code> of
 * the <code>Ovoid.Input</code> global class.
 * 
 * @param {enum} m Held key modifier, can be null or one of the following 
 * symbolic constants:<br>
 * Ovoid.CTR_HELD,<br>
 * Ovoid.ALT_HELD,<br>
 * Ovoid.SHF_HELD,<br>
 * Ovoid.LSU_HELD,<br>
 * Ovoid.RSU_HELD<br>
 * 
 * @param {int} k Key/Mouse button numeric code, or one of the corresponding 
 * symbolic constants. The whole symbolic constants list is available in the
 * _global documentation page.
 * 
 * @param {enum} s Key or button state, can be one of the following symbolic 
 * constants:<br>
 * Ovoid.UP,<br>
 * Ovoid.DOWN,<br>
 * Ovoid.HELD<br>
 * 
 * @param {Function} f Trigger function.
 * 
 * @see Ovoid.Input
 * @see _global_
 */
Ovoid.inputTrigger = function(m, k, s, f) {
  
  Ovoid.Input.trigger(m, s, k, f);
};


/**
 * Add or modify an Action node to one or several nodes.
 * <br>
 * <br>
 * This function is a shortcut to create or modify an Action node, and if it 
 * is needed (if not allready linked), link it to one or several nodes. 
 * Indeed you can link ONE Action node to  several nodes at the same time. 
 * Linking one Action node to several nodes is particularly relevant when 
 * several nodes should have the same behaviour. 
 * <br>
 * <br>
 * The created Action node will be named according to the name parameter.
 * For example if you create an Action node for the node named "mybox", the 
 * resulting Action node name will be "myboxAction". If you create an Action 
 * node for all nodes whose name contains the string "box", the Action 
 * node will be named "boxAction".
 * <br>
 * <br>
 * The Action node is the main way to make your scene interactive. This node 
 * is an abstract dependency node and is not in the world. Action nodes are 
 * used to link some interactive events which call custom functions. Actually 
 * (at this developement stage) Action node principally acts with the mouse 
 * Picking system. It acts as an "Event detector" such as , for example, 
 * mouse over a node or mouse entering in a node, mouse click on a node, 
 * etc... once the specified event is catched, it call the corresponding 
 * trigger function.
 * <br>
 * <br>
 * For example, Action node allows you to make a function which will be called 
 * when the user clicks on an object (on the screen) with the left mouse button.
 * <br>
 * <br>
 * <blockcode>
 * function catastrophe(node) {<br>
 * &nbsp;&nbsp;<commentcode>// Do some funny stuff</commentcode><br>
 * };<br>
 * <br>
 * Ovoid.setAction(Ovoid.MOUSE_OVER_LEFT_DOWN, "mybox", catastrophe);<br>
 * </blockcode>
 * <br>
 * <br>
 * The Action node is presently composed of several overridables trigger methods
 *  corresponding to predefined events.
 * <br>
 * For example the <code>onEnter</code> method, is called when the mouse pointer
 * enters over the node and the <code>onOver</code>  method is constantly 
 * called as long as the mouse pointer rolls over the node. 
 * <br>
 * All Action node's methods take one argument that is the event's involved 
 * node.
 * <br>
 * <br>
 * <b>Grabbing node</b>
 * <br>
 * Action node also work with a node-grabbing system. The "node-grabbing" 
 * consists in focusing on a node while ignoring  events of others nodes. 
 * <br>
 * To understand, suppose you want to rotate a node by moving the mouse while
 * you maintain the left button pressed. While you move your mouse pointer to 
 * rotate the object, the pointer will leave the node's region, resulting the 
 * event stop, since the mouse now roll over another node. 
 * <br>
 * The "node-grabbing" prevents the side effects by forcing to focus on the 
 * grabbed node and to ignore the others. You also have to "release" the 
 * node when you want to restore the normal event dispatching.
 * <br>
 * <br>
 * <blockcode>
 * function grabnode(node) {<br>
 * &nbsp;&nbsp;Ovoid.Input.grabNode(node)<br>
 * };<br>
 * <br>
 * function rotate(node) {<br>
 * &nbsp;&nbsp;<codecomment>// Ovoid.Input.intUp is an array of "key-up" input signals</codecomment><br>
 * &nbsp;&nbsp;if (Ovoid.Input.intUp[Ovoid.MB_LEFT]) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Ovoid.Input.grabRelease();<br>
 * &nbsp;&nbsp;} else {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<codecomment>// Ovoid.Input.mouseVelocity is a Vector object</codecomment><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;node.rotate(Ovoid.Input.mouseVelocity);<br>
 * &nbsp;&nbsp;}<br>
 * };<br>
 * <br>
 * Ovoid.setAction(Ovoid.MOUSE_OVER_LEFT_DOWN, "mybox", grabnode);<br>
 * Ovoid.setAction(Ovoid.ON_GRABBED, "mybox", rotate);<br>
 * </blockcode>
 * <br>
 * <br>
 * There is also special methods <code>onUngrab</code> and <code>onGrab</code>. 
 * <code>onUngrab</code> is constantly called (without event) as long as the 
 * node is NOT grabbed (i.e. the normal node's status). on the other hand, the 
 * <code>onGrab</code> method is constantly called as long as the node IS 
 * grabbed.
 * <br>
 * <br>
 * <blockcode>
 * function grabnode(node) {<br>
 * &nbsp;&nbsp;Ovoid.Input.grabNode(node)<br>
 * };<br>
 * <br>
 * var action = scene.create(Ovoid.ACTION, "myaction");<br>
 * action.onLmbDn = grabnode;<br>
 * action.linkNode(mybox);<br>
 * </blockcode>
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
 * Ovoid.ON_UNGRABBED<br>
 * 
 * @param {string|Node} item Node object or the Node name to link the Action 
 * node to, or a string that is matching with name of several nodes to link 
 * more than one node.
 * 
 * @param {Function} f The trigger function to call for this event.
 * 
 * @return {Action} The created Action node's reference.
 */
Ovoid.setAction = function(e, item, f) {
  
  if (e > 13) 
    return;
  
  if (!(f instanceof Function))
    return;
  
  /* retrouve la node si c'est un string */
  if (typeof(item) == "string") {
    var nodes = Ovoid.rscene.searchMatches(name);
    
    if (nodes.length == 0) {
      Ovoid.log(2, 'Ovoid.setAction', "no node found with matching name '"
        +name+"' in the current active scene '" + Ovoid.rscene.name + "'.");
      return;
    }
  } else {
    if(item.type & Ovoid.BODY || item.type & Ovoid.LAYER) {
      nodes = new Array();
      nodes.push(item);
    } else {
      Ovoid.log(2, 'Ovoid.setAction', 'node ' 
          + nodes[i].name + ' is not a Body or Layer instance.');
    }
  }
  
  /* par défaut on crée une nouvelle action */
  var newaction = new Ovoid.Action(name + "Action");
  /* témoins pour savoir si la nouvelle action a déja été configuré */
  var newactiondone = false;
  var action;
  var once = false;
  var i = nodes.length;
  while(i--) {
    /* Si ce n'est pas un body, cancel */
    if (!(nodes[i].type & Ovoid.BODY || nodes[i].type & Ovoid.LAYER)) {
      Ovoid.log(2, 'Ovoid.setAction', 'node ' 
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
      Ovoid.log(3, 'Ovoid.setAction', 'linking action ' 
          + action.name + ' to ' + nodes[i].name);
      /* Si l'Action n'a pas encore été traité */
      if( !newactiondone ) {
        /* insert la nouvelle action en scene */
        Ovoid.log(3, 'Ovoid.setAction', 'adding action node ' 
          + action.name + ' to active scene');

        Ovoid.rscene.insert(action);
        newactiondone = true;
      } else {
        /* inutile de reconfigurer l'Action */
        continue;
      }
    } else {
        once = true;
        Ovoid.log(3, 'Ovoid.setAction', 'updating action ' + action.name);
    }
    /* parcour le type d'event */
    switch (e)
    {
      /* Ovoid.MOUSE_ENTER */
      case 0:
        action.onEnter = f;
        break;
      /* Ovoid.MOUSE_LEAVE */
      case 1:
        action.onLeave = f;
        break;
      /* Ovoid.MOUSE_OVER */
      case 2:
        action.onOver = f;
        break;
      /* Ovoid.MOUSE_LEFT_DOWN */
      case 3: 
        action.onLmbDn = f;
        break;
      /* Ovoid.MOUSE_LEFT_UP */
      case 4: 
        action.onLmbUp = f;
        break;
      /* Ovoid.MOUSE_LEFT_HELD */
      case 5:
        action.onLmbHl = f;
        break;
      /* Ovoid.MOUSE_MIDDLE_DOWN */
      case 6:
        action.onMmbDn = f;
        break;
      /* Ovoid.MOUSE_MIDDLE_UP */
      case 7:
        action.onMmbUp = f;
        break;
      /* Ovoid.MOUSE_MIDDLE_HELD */
      case 8:
        action.onMmbHl = f;
        break;
      /* Ovoid.MOUSE_RIGHT_DOWN */
      case 9:
        action.onRmbDn = f;
        break;
      /* Ovoid.MOUSE_RIGHT_UP */
      case 10:
        action.onRmbUp = f;
        break;
      /* Ovoid.MOUSE_RIGHT_HELD */
      case 11:
        action.onRmbHl = f;
        break;
      /* Ovoid.ON_GRABBED */
      case 12:
        action.onGrabd = f;
        break;
      /* Ovoid.ON_UNGRABBED */
      case 13: 
        action.onUgrabd = f;
        break;
    }
    if (once) return action;
  }
  return action;
};


/**
 * Create and link a Constraint node to one or several transformable nodes.
 * <br>
 * <br>
 * This function is a shortcut that creates specified Constraint node type and 
 * links it to a transformable (Transform's inherited) node. The function can 
 * do this operation for several nodes if the name parameter is a string that 
 * match with several nodes name. 
 * <br>
 * <br>
 * The created Constraint node will be named according to the found node's name 
 * and the Constraint node's type. For example if you create an Physics node 
 * for the node named "mybox", the resulting Physics node name will be 
 * "myboxPhysics". If you create Animation nodes for all nodes whose name 
 * is contains the string "box", the Animation nodes will be named with the 
 * corresponding target node's name, followed by "Animation" :  
 * "box1Animation", "box2Animation", "coolboxAnimation", etc...
 * <br>
 * <br>
 * At this stage of developement, it exists two types of Constraint node : 
 * Physics and Animation. Constraint nodes are abstract dependencies and are 
 * not in the world.
 * <br>
 * <br>
 * <blockcode>
 * var constraints = Ovoid.setConstraint(Ovoid.PHYSICS, "box")<br>
 * for (var i = 0; i < constraints.length; i++) {<br>
 * &nbsp;&nbsp;constraints[i].model = Ovoid.RIGID_MASSIVE_BOX;<br>
 * &nbsp;&nbsp;constraints[i].setMass(2.0);<br>
 * }<br>
 * </blockcode>
 * 
 * @see Ovoid.Animation
 * @see Ovoid.Physics
 * 
 * @param {int} type Constraint node type. Can be Ovoid.PHYSICS or 
 * Ovoid.ANIMATION.
 * 
 * @param {string|Node} item Node object, or the Node name to link a Constraint 
 * to, or a string that is matching with name of several nodes to link more 
 * than one node.
 * 
 * @return {Array} Array containing the created Constraint nodes's references.
 */
Ovoid.setConstraint = function(type, item) {
  
  /* retrouve la node si c'est un string */
  if ( typeof(item) == "string" ) {
    var nodes = Ovoid.rscene.searchMatches(name);
    
    if (nodes.length == 0) {
      Ovoid.log(2, 'Ovoid.setConstraint', "no node found with matching name '"
        +name+"' in the current active scene '" + Ovoid.rscene.name + "'.");
      return;
    }
  } else {
    if(item.type & Ovoid.TRANSFORM) {
      nodes = new Array();
      nodes.push(item);
    } else {
      Ovoid.log(2, 'Ovoid.setAction', 'node ' 
          + nodes[i].name + ' is not a Transform instance.');
    }
  }
  
  var constraints = new Array();
  
  var constraint;
  var i = nodes.length;
  while(i--) {
    /* Si ce n'est pas un body, cancel */
    if (!(nodes[i].type & Ovoid.TRANSFORM)) {
      Ovoid.log(2, 'Ovoid.setConstraint', 'node ' 
          + nodes[i].name + ' is not a Transform instance.');
      continue;
    }

    /* parcour le type de constraint */
    switch (type)
    {
      case Ovoid.PHYSICS:
        constraint = Ovoid.rscene.create(type, nodes[i].name + "Physics", null);
        break;
      case Ovoid.ANIMATION:
        constraint = Ovoid.rscene.create(type, nodes[i].name + "Animation", null);
        break;
      default:
        Ovoid.log(2, 'Ovoid.setConstraint', 'invalid Constraint type.');
        return;
    }
    Ovoid.log(3, 'Ovoid.setConstraint', 'adding constraint ' 
          + constraint.name + ' to ' + nodes[i].name);
    constraint.setTarget(nodes[i]);
    constraints.push(constraint);
  }
  return constraints;
};


/**
 * Grab node.
 * <br>
 * <br>
 * Grabs the specified node.
 * <br>
 * <br>
 * <b>Grabbing node</b>
 * <br>
 * The "node-grabbing" 
 * consists in focusing on a node while ignoring  events of others nodes. 
 * <br>
 * To understand, suppose you want to rotate a node by moving the mouse while
 * you maintain the left button pressed. While you move your mouse pointer to 
 * rotate the object, the pointer will leave the node's region, resulting the 
 * event stop, since the mouse now roll over another node. 
 * <br>
 * The "node-grabbing" prevents the side effects by forcing to focus on the 
 * grabbed node and to ignore the others. You also have to "release" the 
 * node when you want to restore the normal event dispatching.
 * <br>
 * <br>
 * For more information about node-grabbing usage, see the 
 * <code>Ovoid.Action</code> node documentation page.
 * 
 * 
 * @param {Node} node Node object to be grabbed.
 *
 * @param {Scene} scene Scene object to set as active scene.
*/
Ovoid.grabNode = function(node) {

  Ovoid.Input.grabbedNode = node;
};


/**
 * Release grab.
 * <br>
 * <br>
 * Releases the current grabbed node and restores the normal event dispatching.
 * <br>
 * <br>
 * <b>Grabbing node</b>
 * <br>
 * The "node-grabbing" 
 * consists in focusing on a node while ignoring  events of others nodes. 
 * <br>
 * To understand, suppose you want to rotate a node by moving the mouse while
 * you maintain the left button pressed. While you move your mouse pointer to 
 * rotate the object, the pointer will leave the node's region, resulting the 
 * event stop, since the mouse now roll over another node. 
 * <br>
 * The "node-grabbing" prevents the side effects by forcing to focus on the 
 * grabbed node and to ignore the others. You also have to "release" the 
 * node when you want to restore the normal event dispatching.
 * <br>
 * <br>
 * For more information about node-grabbing usage, see the 
 * <code>Ovoid.Action</code> node documentation page.
 * 
 * 
 * Release the current grabbed node.
 */
Ovoid.grabRelease = function() {

  Ovoid.Input.grabbedNode = null;
};
