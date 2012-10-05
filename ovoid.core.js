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

/** Default OvoiD.JS library path. */
Ovoid.opt_libPath = 'ovoid.js/';


/** WebGL context option to enable or disable alpha canvas, which allow canvas to be transparent.*/
Ovoid.opt_alpha = false;


/** WebGL context option to enable or disable Preserve Drawing Buffer. (required for mouse picking mecanism) */
Ovoid.opt_preserveDrawingBuffer = true;


/** WebGL context option to enable or disable anti-aliasing. */
Ovoid.opt_antialias = true;


/** WebGL context option to enable or disable the stencil buffer. */
Ovoid.opt_stencil = true;


/** WebGL context option to enable or disable premultiplied alpha channel. */
Ovoid.opt_premultipliedAlpha = true;


/** Avoids browser's cache and force all nodes as pickable. */
Ovoid.opt_debugMode = false;


/** Default path for Textures's images source files. */
Ovoid.opt_texturePath = 'data/map/';


/** Default path for Scenes's DAE/Collada source files. */
Ovoid.opt_daePath = 'data/dae/';


/** Default path for Scenes's OJSON source files. */
Ovoid.opt_ojsonPath = 'data/ojsn/';


/** Default path for Audio's sound source files. */
Ovoid.opt_audioPath = 'data/snd/';


/** Default path for Shaders's GLSL source files. */
Ovoid.opt_shadersPath = 'data/glsl/';


/** Default source image filename for font texture map. */
Ovoid.opt_defaultFontmapUrl = 'font_CPMonoPlain.png';


/** Default filter level for font texture map. */
Ovoid.opt_defaultFontmapFilter = 0;


/** Enable mouse interacive picking. */
Ovoid.opt_enablePicking = true;


/** Disable alert messages. */
Ovoid.opt_disableAlerts = false;


/** Show head-up display. */
Ovoid.opt_showHud = true;


/** Show debug screen.<br><br> */
Ovoid.opt_showDebug = false;


/** Global gravity vector for particles and solver.*/
Ovoid.opt_gravity = [0.0,-0.98,0.0];


/** Current active scene reference.
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


/** Global WebGL Context handle. */
Ovoid.gl = null;


/** Global Audio API Context handle. */
Ovoid.al = null;
  

/** Add-on modules array */
Ovoid._modules = new Array();

/**
 * Main initialization function.<br><br>
 * 
 * Initializes the whole library including global classes and 
 * preloading external data, and create a WebGL context on the specified 
 * HTML canvas.<br><br>

 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;<codecomment>// Start OvoiD.JS Library on the given canvas.</codecomment><br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * &lt;/script&gt;<br>
 * <br>
 * &lt;body style="margin:0px;" <b>onload="main();"</b>&gt;<br>
 * </blockcode>
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
                Ovoid._dbg[0].cachLayer();
                Ovoid._dbg[1].cachTransform();
                Ovoid._dbg[1].cachLayer();
                Ovoid._dbg[2].cachTransform();
                Ovoid._dbg[2].cachLayer();
                Ovoid._dbg[3].cachTransform();
                Ovoid._dbg[3].cachLayer();
                Ovoid._dbg[4].cachTransform();
                Ovoid._dbg[4].cachLayer();
                Ovoid._dbg[5].cachTransform();
                Ovoid._dbg[5].cachLayer();
                Ovoid._dbg[6].cachTransform();
                Ovoid._dbg[6].cachLayer();
      
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


/** Global overidable Onload function.<br><br>
 *
 * This function is dedicated to be user defined.<br><br>
 * 
 * The <code>Ovoid.onload</code> function is called ONLY ONCE after the main 
 * initialization, and after the preloading process. The purpose of this 
 * function is to provide a space between the main initialization and the main 
 * loop. This is where you can setup your application's behaviours, create some 
 * nodes, and do some job that must be done before entering the main loop.<br><br>
 * 
 * For more informations about <code>Ovoid.onload</code> and 
 * <code>Ovoid.onloop</code> method see the 
 * <a href="http://www.ovoid.org/js/doc/#onloadonloop">"The Onload And Onloop 
 * Methods" General documentation chapter</a>
 */
Ovoid.onload = function () {};


/** Global overidable Onloop function.<br><br> 
 * 
 * This function is dedicated to be user defined.<br><br>
 * 
 * The <code>Ovoid.onloop</code> function is called at each frame's refresh. 
 * Which means, between each application global refresh. It si where you can put 
 * all your real-time interactive process like hooking user's inputs, changing 
 * some world component, etc...
 * You should also keep in mind that this function is critical, and it is 
 * recomended to include code carefully to prevent performance issues or 
 * strange behaviors. For stupid exemple, don't create new nodes in this 
 * function without conditions: this would (depending the frame rate) create 
 * more or less 60 new nodes per seconds.<br><br>
 * 
 * For more informations about <code>Ovoid.onload</code> and 
 * <code>Ovoid.onloop</code> method see the 
 * <a href="http://www.ovoid.org/js/doc/#onloadonloop">"The Onload And Onloop 
 * Methods" General documentation chapter</a>
 */
Ovoid.onloop = function () {};


/** Global overidable Ondraw function.<br><br> 
 * 
 * This function can be user defined.<br><br>
 * 
 * The <code>Ovoid.ondraw</code> function is called at each frame's refresh. 
 * Which means, between each application global refresh. It is the drawing 
 * process method where you can create your own rendering pipelines. The default 
 * value of this method is the <code>drawQueue</code> method from the 
 * <code>Ovoid.Drawer</code> global class. By overriding this method you empty 
 * the drawing process. You can create a new rendering pipeline using the 
 * <code>Ovoid.Drawer</code> methods or at low-level WebGL.<br><br>
 * 
 * For more informations about <code>Ovoid.onload</code> and 
 * <code>Ovoid.onloop</code> method see the 
 * <a href="http://www.ovoid.org/js/doc/#onloadonloop">"The Onload And Onloop 
 * Methods" General documentation chapter</a>
 */
Ovoid.ondraw = Ovoid.Drawer.drawQueue;


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
 * Get the log string.<br><br>
 * 
 * Returns the current log string.
 *
 * @return {string} Current log string.
*/
Ovoid.getLog = function() {

  return Ovoid._log;
};


/**
 * Clear WebGL error if there is any.
*/
Ovoid._clearGlerror = function() {

  Ovoid.gl.getError();
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
    Ovoid.log(1, scope, ' Erreur WebGL: ' + Ovoid._getGlerror());
    return true;
  }
  return false;
};
  

/**
 * Main onload function
 */
Ovoid._mainload = function() {
  
  /* performance counter */
  var t = (new Date().getTime());
  
  try {
    /* USER CUSTOM ONLOAD FUNC */
    Ovoid.onload();
  } 
  catch(e) {
    Ovoid.log(0, 'Ovoid.onload', '(Exception) ' + e.stack);
    Ovoid.error(8, 'Main onload Exception thrown');
    return false;
  }
  
  Ovoid.log(3, 'Ovoid.onload', 'executed in: ' + 
      ((new Date().getTime() - t) * 0.001) + 's');

  return true;
};

/**
 * Main loop function
 */
Ovoid._mainloop = function() {
  
  try {
    /* BEGIN FRAME */    
    /* USER CUSTOM LOOP FUNC */
    Ovoid.onloop();
    
    /* Reset render queue */
    Ovoid.Queuer.reset();
    
    /* QUEUE STACK */
    Ovoid.Queuer.queueScene(Ovoid.rscene);
    
    /* SOLVE PHYSICS QUEUE */
    if(Ovoid.Solver != undefined)   
      Ovoid.Solver.solveQueue();
    
    /* DRAW QUEUE */
    Ovoid.ondraw();

    /* DRAW HUD */
    if (Ovoid.opt_showHud) {

      Ovoid.Drawer.switchPipe(4,0); /* SP_TEXT */
      Ovoid.Drawer.screen(Ovoid.Frame.matrix);
      Ovoid.Drawer.switchPipe(3,0); /* SP_LAYER */
      Ovoid.Drawer.screen(Ovoid.Frame.matrix);
      Ovoid.Drawer.switchDepth(0);
      Ovoid.Drawer.switchBlend(3);
    
      Ovoid._hudbg.setSize(Ovoid.Frame.size.v[0], 17.0, 1.0);
                  
      Ovoid._dbg[7].string = Ovoid.Debug.Sumary();
      
      Ovoid._hudbg.cachTransform();
      Ovoid._hudbg.cachLayer();

      Ovoid.Drawer.model(Ovoid._hudbg.layerMatrix.m);
      Ovoid.Drawer.layer(Ovoid._hudbg);
  
      Ovoid.Drawer.switchPipe(4,0); /* SP_TEXT */
      Ovoid.Drawer.model(Ovoid._dbg[7].layerMatrix.m);
      Ovoid.Drawer.text(Ovoid._dbg[7]);

      if (Ovoid.opt_showDebug) {
        
        Ovoid._dbgbg.setSize(Ovoid.Frame.size.v[0], 
                  Ovoid.Frame.size.v[1]-17.0, 1.0);
        Ovoid._dbgbg.cachTransform();
        Ovoid._dbgbg.cachLayer();
                  
        if (Ovoid.Input.mouseOverUid) {
          var n = Ovoid.rscene.search(Ovoid.Input.mouseOverUid);
          if (n) {
            Ovoid._dbg[5].string = Ovoid.Debug.Node(n) + '\n';
            Ovoid._dbg[5].string += Ovoid.Debug.Transform(n, true) + '\n';
            if(n.shape) {
              Ovoid._dbg[5].string += Ovoid.Debug.Body(n) + '\n';
              if (n.shape.type & Ovoid.MESH) {
                Ovoid._dbg[5].string += Ovoid.Debug.Mesh(n.shape, true);
              }
              if(n.shape.type & Ovoid.SKIN) {
                if (n.shape.mesh)
                  Ovoid._dbg[5].string += Ovoid.Debug.Mesh(n.shape.mesh, true);
              }
            }
            if(n.type & Ovoid.LAYER) {
              Ovoid._dbg[5].string += Ovoid.Debug.Layer(n, false);
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
        
        Ovoid.Drawer.switchPipe(3,0); /* SP_LAYER */
        Ovoid.Drawer.model(Ovoid._dbgbg.layerMatrix.m);
        Ovoid.Drawer.layer(Ovoid._dbgbg);
        
        Ovoid.Drawer.switchPipe(4,0); /* SP_TEXT */
        for ( var i = 0; i < 7; i++) {
          Ovoid.Drawer.model(Ovoid._dbg[i].layerMatrix.m);
          Ovoid.Drawer.text(Ovoid._dbg[i]);
        }
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
 * Include OJSON scene.<br><br>
 * 
 * Includes an OJSON scene file to the preloading stacks. 
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeOjsScene("helloworld.ojsn", myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * For more information about OvoiD.JSON importation see the
 * <code>Ovoid.Ojson</code> class reference documentation.
 * 
 * @see Ovoid.Ojson
 * 
 * @param {string} url OJSON source file url.
 * <code>Ovoid.opt_ojsonPath</code> is used as base path.
 * 
 * @param {Object} scene Recipient Scene object.
 */
Ovoid.includeOjsScene = function(url, scene) {
  
  Ovoid.Loader.includeOjson(url, scene);
};


/**
 * Include DAE scene.<br><br>
 * 
 * Includes an COLLADA/DAE scene file to the preloading stacks. 
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeDaeScene("helloworld.dae", myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * The default mask used to import the DAE scene is defined as follow:<br>
 * <code>Ovoid.DAE_ALLSNODES|Ovoid.DAE_CREATE_TRACK|Ovoid.DAE_FORCE_CSPLINE|
 * Ovoid.DAE_MERGE_DEPENDENCIES|Ovoid.DAE_OPTIMIZE_ALL|Ovoid.DAE_CONVERT_UPAXIS</code>
 * 
 * For more information about Collada/DAE importation see the
 * <code>Ovoid.Collada</code> class reference documentation.
 * 
 * @see Ovoid.Collada
 * 
 * @param {string} url DAE/COLLADA source file url.
 * <code>Ovoid.opt_daePath</code> is used as base path.
 * 
 * @param {bitmask} options Importation options bitmask or null to use default 
 * settings.
 * 
 * @param {Scene} scene Recipient Scene object.
 * 
 * @param {string} prefix Prefix used to name imported nodes or null.
 * 
 * @param {string} suffix Suffix used to name imported nodes or null.
 */
Ovoid.includeDaeScene = function(url, mask, scene, prefix, suffix) {
  
  if(!mask) {
    mask = Ovoid.DAE_ALL_NODES|
            Ovoid.DAE_CREATE_TRACK|
            Ovoid.DAE_FORCE_CSPLINE|
            Ovoid.DAE_MERGE_DEPENDENCIES|
            Ovoid.DAE_OPTIMIZE_ALL|
            Ovoid.DAE_CONVERT_UPAXIS;
    Ovoid.log(3, 'Ovoid.includeDaeScene', 'null options, use default.');
  }
  Ovoid.Loader.includeCollada(url, mask, scene, prefix, suffix);
};

/**
 * Include animations from DAE scene.<br><br>
 * 
 * Includes an COLLADA/DAE scene file to the preloading stacks with options mask 
 * preset to only import animations and create Track node.
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeDaeAnimation("guywalk.ojsn", myScene, "", "walk");<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * The preset mask used to import the DAE scene is defined as follow:<br>
 * <code>Ovoid.DAE_ANIMATIONS|Ovoid.DAE_CREATE_TRACK|
 * Ovoid.DAE_MERGE_DEPENDENCIES|Ovoid.DAE_FORCE_CSPLINE|Ovoid.DAE_CONVERT_UPAXIS</code><br><br>
 * 
 * For more information about Collada/DAE importation see the
 * <code>Ovoid.Collada</code> class reference documentation.
 * 
 * @see Ovoid.Collada
 * @see Ovoid.Animation
 * @see Ovoid.Track
 * 
 * @param {string} url DAE/COLLADA source file url.
 * <code>Ovoid.opt_daePath</code> is used as base path.
 * 
 * @param {Scene} scene Recipient Scene object.
 * 
 * @param {string} prefix Prefix used to name imported nodes or null.
 * 
 * @param {string} suffix Suffix used to name imported nodes or null.
 */
Ovoid.includeDaeAnimation = function(url, scene, prefix, suffix) {
  
  var mask = Ovoid.DAE_ANIMATIONS |
            Ovoid.DAE_CREATE_TRACK |
            Ovoid.DAE_MERGE_DEPENDENCIES |
            Ovoid.DAE_FORCE_CSPLINE |
            Ovoid.DAE_CONVERT_UPAXIS;

  Ovoid.Loader.includeCollada(url, mask, scene, prefix, suffix);
};


/**
 * Include meshs from DAE scene.<br><br>
 * 
 * Includes an COLLADA/DAE scene file to the preloading stacks with options mask 
 * preset to only import meshs.
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeDaeMesh("guybrush.dae", myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * The preset mask used to import the DAE scene is defined as follow:<br>
 * <code>Ovoid.DAE_MESHS|Ovoid.DAE_MATERIALS|
 * Ovoid.DAE_MERGE_DEPENDENCIES|Ovoid.DAE_OPTIMIZE_ALL|Ovoid.DAE_CONVERT_UPAXIS</code><br><br>
 * 
 * For more information about Collada/DAE importation see the
 * <code>Ovoid.Collada</code> class reference documentation.
 * 
 * @see Ovoid.Collada
 * @see Ovoid.Mesh
 * 
 * @param {string} url DAE/COLLADA source file url.
 * <code>Ovoid.opt_daePath</code> is used as base path.
 * 
 * @param {Scene} scene Recipient Scene object.
 * 
 * @param {string} prefix Prefix used to name imported nodes or null.
 * 
 * @param {string} suffix Suffix used to name imported nodes or null.
 * 
 */
Ovoid.includeDaeMesh = function(url, scene, prefix, suffix) {
  
  var mask = Ovoid.DAE_MESHS | 
            Ovoid.DAE_MATERIALS |
            Ovoid.DAE_MERGE_DEPENDENCIES |
            Ovoid.DAE_OPTIMIZE_ALL |
            Ovoid.DAE_CONVERT_UPAXIS;

  Ovoid.Loader.includeCollada(url, mask, scene, prefix, suffix);
};


/**
 * Include audio.<br><br>
 * 
 * Includes an audio file (Audio object) to the preloading stacks.  
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * <br><br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeAudio("boom.mp3", myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * @see Ovoid.Audio
 * 
 * @param {string} url Audio file source url.
 * <code>Ovoid.opt_audioPath</code> is used as base path.
 * @param {Scene} scene Scene object to insert Audio node in.
 */
Ovoid.includeAudio = function(url, scene) {

  var name = Ovoid.extractName(url, false);
  var audio = scene.create(Ovoid.AUDIO, name, null);
  audio.url = url;
  Ovoid.Loader.includeAudio(audio);
};


/**
 * Include texture.<br><br>
 * 
 * Includes an image file (Texture object) to the preloading stacks.  
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * <br><br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeTexture("myimage.png", 1, myScene);<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * @see Ovoid.Texture
 * 
 * @param {string} url Image file source url.
 * <code>Ovoid.opt_texturePath</code> is used as base path.
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
 * Include GLSL shader.<br><br>
 * 
 * Includes an GLSL shader program (Shader object) to the preloading stacks.
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * <br><br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.includeShader(-1, "snow.vs", "snow.fs", "wrapmap.xml");<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode><br><br>
 * 
 * @see Ovoid.Shader
 * @see Ovoid.Loader
 * 
 * @param {int} slot Symbolic constant for drawing pipeline. Can be -1 to
 * keep the sahder in the Drawer's stock without pluging it, or one of the 
 * following symbolic constants:
 * Ovoid.DRAWER_SP_COLOR,<br>
 * Ovoid.DRAWER_SP_VERTEX_COLOR,<br>
 * Ovoid.DRAWER_SP_LPIGHT,<br>
 * Ovoid.DRAWER_SP_1PIGHT,<br>
 * Ovoid.DRAWER_SP_TEXT,<br>
 * Ovoid.DRAWER_SP_LAYER,<br>
 * Ovoid.DRAWER_SP_PARTICLES<br><br>
 * 
 * @param {int} layer Render/Drawing layer to assing the shader to. Can be an
 * integer up to Ovoid.MAX_RENDER_LAYER or -1 to assing to all available 
 * layers. 
 * 
 * @param {string} vs Vertex program shader source file name. 
 * <code>Ovoid.opt_shadersPath</code> is used as base path.
 * 
 * @param {string} fs Fragment program shader source file name. 
 * <code>Ovoid.opt_shadersPath</code> is used as base path.
 * 
 * @param {string} wm XML or JSON wrap map file name. 
 * <code>Ovoid.opt_shadersPath</code> is used as base path.
 * 
 * @param {string} name Optionnal shader name.
 */
Ovoid.includeShader = function(slot, layer, vs, fs, wm, name) {

  Ovoid.Loader.includeShader(slot, layer, vs, fs, wm, name);
};


/**
 * Set active scene.<br><br>
 * 
 * In OvoiD.JS, a scene must be assigned to the global pipeline as active one in 
 * order to be treated by the Library mecanism.<br><br>
 * 
 * <blockcode>
 * var scene = new Ovoid.Scene("Hello");<br>
 * Ovoid.useScene(scene);<br>
 * </blockcode><br><br>
 * 
 * Once a scene is used as active, its graph (nodes) are updated, treated and
 * may be drawn each frames. Several scenes can be created and set as active at 
 * desired time until an other is set as active one. While a scene is not 
 * active, it is left without any change or update.<br><br>
 * 
 * @see Ovoid.Scene
 *
 * @param {Scene} scene Scene object to set as active scene.
*/
Ovoid.useScene = function(scene) {

  Ovoid.rscene = scene;
};

/**
 * Set active camera.<br><br>
 * 
 * Sets the specified Camera node as active camera. It must be 
 * in the current active scene.<br><br>
 * 
 * Scene active camera is the one used as point of view to draw the scene. It 
 * must be in the scene graph.<br><br>
 * 
 * <blockcode>
 * scene.create(Ovoid.CAMERA, "Camera1");<br>
 * scene.useCamera("Camera1");<br>
 * </blockcode><br><br>
 * 
 * If no active camera is declared, an built-in camera is used. A scene can have 
 * several cameras which can be set as active at desired time until an other is 
 * set as active one.
 *
 * @param {Camera|string|int} node Camera object, name or UID to be active.
 */
Ovoid.useCamera = function(node) {

  Ovoid.rscene.useCamera(node);
};


/**
 * Adjust active camera yaw.<br><br>
 * 
 * Rotate the current active camera by the specified value in yaw axis.
 * 
 * @param {float} y Yaw value.
 */
Ovoid.cameraYaw = function(y) {

  Ovoid.Queuer._rcamera.rotateXyz(0.0, y, 0.0, Ovoid.WORLD, Ovoid.RELATIVE);
};


/**
 * Adjust active camera pitch.<br><br>
 * 
 * Rotate the current active camera by the specified value in pitch axis.
 * 
 * @param {float} x Pitch value.
 */
Ovoid.cameraPitch = function(x) {

  Ovoid.Queuer._rcamera.rotateXyz(x, 0.0, 0.0, Ovoid.LOCAL, Ovoid.RELATIVE);
};


/**
 * Adjust active camera roll.<br><br>
 * 
 * Rotate the current active camera by the specified value in roll axis.
 * 
 * @param {float} z Roll value.
 */
Ovoid.cameraRoll = function(z) {

  Ovoid.Queuer._rcamera.rotateXyz(0.0, 0.0, z, Ovoid.LOCAL, Ovoid.RELATIVE);
};


/**
 * Adjust active camera dolly.<br><br>
 * 
 * Move the current active camera by the specified value in dolly axis.
 * 
 * @param {float} z Pitch value.
 */
Ovoid.cameraDolly = function(z) {

  Ovoid.Queuer._rcamera.moveXyz(0.0, 0.0, z, Ovoid.LOCAL, Ovoid.RELATIVE);
};


/**
 * Search node.<br><br>
 * 
 * Search and returns the node from the current active scene with the specified 
 * name or UID.
 *
 * @param {string|int} item Name or UID of the Node to search.
 *
 * @return {Node} The found node, or null if none is found.
 */
Ovoid.search = function(name) {
  
  return Ovoid.rscene.search(name);
};



/**
 * Search nodes by matches.<br><br>
 * 
 * Search and returns one or more nodes from the current active scene whose name 
 * contains the specified string, or nodes whose type matches with the specified
 * bitmask.
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
 * Move a Transform node.<br><br>
 * 
 * Search Transform node with the specified name in the current active scene and 
 * apply the specified translation.
 *
 * @param {string} name Name of the Transform to translate.
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
 * Rotate a Transform node.<br><br>
 * 
 * Search Transform node with the specified name in the current active scene and 
 * apply the specified rotation.
 * 
 * @param {string} name Name of the Transform to rotate.
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
 * Scale a Transform node.<br><br>
 * 
 * Search Transform node with the specified name in the current active scene and 
 * apply the specified scale.
 * 
 * @param {string} name Name of the Transform to scale.
 * @param {float} x X scaling value.
 * @param {float} y Y scaling value.
 * @param {float} z Z scaling value.
 * @param {enum} m Transformation mode. Can be Ovoid.RELATIVE or Ovoid.ABSOLUTE.
 * If not specified or null, Ovoid.RELATIVE is applyed by default.
 * 
 * @see Ovoid.Transform
 */
Ovoid.scale = function(name, x, y, z, m) {
  
  var i = Ovoid.rscene.transform.length;
  while (i--) {
    if (name == Ovoid.rscene.transform[i].name) {
      Ovoid.rscene.transform[i].scaleXyz(x, y, z, m);
      break;
    }
  }
};


/**
 * Rewind a Track node.<br><br>
 *
 * Search Track node with the specified name in the current active scene and 
 * rewind it.
 * 
 * @param {string} name The name of Track node to rewind.
 * @param {float} f Pitch time factor.
 * A positive value will set the track at its begining, a negative value 
 * will set the track at its end.
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
 * Play a Track node.<br><br>
 *
 * Search Track node with the specified name in the current active scene and 
 * play it.
 * 
 * @param {string} name The name of Track node to play.
 * @param {float} f Pitch time factor.
 * The factor can be positive to increase the animation pitch or negative to 
 * play the animation backward. For example a value of -2.0 will play the 
 * animation backward twice the normal speed.
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
 * Pause a Track node.<br><br>
 *
 * Search Track node with the specified name in the current active scene and 
 * pause it.
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
 * Rewind a Sound node.<br><br>
 *
 * Search Sound node with the specified name in the current active scene and 
 * rewind it.
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
 * Play a Sound node.<br><br>
 *
 * Search Sound node with the specified name in the current active scene and 
 * play it.
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
 * Pause a Sound node.<br><br>
 *
 * Search Sound node with the specified name in the current active scene and 
 * pause it.
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
 * Set or modify an input trigger.<br><br>
 * 
 * Sets or modifies an input combinaison who trigger a custom function. The 
 * specified function will be called each time the input combinaison occur.<br><br>
 * 
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
 * </blockcode><br><br>
 * 
 * This method is a shortcut for the <code>setTrigger</code> method of
 * <code>Ovoid.Input</code> global class.
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
 * Assign an Action node to one or several pickable nodes.<br><br>
 * 
 * Assigns an Action nodes to one or several pickable nodes (Body, Layer). 
 * Target can be a Transform node instance or a string to retrieve one or 
 * several nodes whose name matches with.<br><br>
 * 
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
 * </blockcode><br><br>
 * 
 * For more information about how Action node, see the 
 * <code>Ovoid.Action</code> class documentation reference.
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
 * @return {Action} The created Action node reference.
 */
Ovoid.setAction = function(e, target, f, item) {
  
  if (e > 16) {
    Ovoid.log(2, 'Ovoid.setAction', "Unknown event (" + e + ").");
    return;
  }
  
  if (!(f instanceof Function)) {
    Ovoid.log(2, 'Ovoid.setAction', "Not valid Function ("+ f +").");
    return;
  }
  
  /* verifie la validité de l'item, si on peu retrouver quelque chose */
  var items = null;
  if (item) {
    if (typeof(item) == "string") {
      var nodes = Ovoid.rscene.searchMatches(item);
      if (nodes.length == 0) {
        Ovoid.log(2, 'Ovoid.setAction', "no node found with matching name '"
          +item+"' in the current active scene '" + Ovoid.rscene.name + "'.");
        return;
      }
      items = nodes;
    } else {
      if(item.type & Ovoid.BODY) {
        items = new Array();
        items.push(item);
      } else {
        Ovoid.log(2, 'Ovoid.setAction', 'node ' 
          +item.name+' is not a Body instance.');
        return;
      }
    }
  }
  
  var newaction;
  
  /* retrouve la node si c'est un string */
  var nodes;
  if (typeof(target) == "string") {
    nodes = Ovoid.rscene.searchMatches(target);
    if (nodes.length == 0) {
      Ovoid.log(2, 'Ovoid.setAction', "no node found with matching name '"
        +target+"' in the current active scene '" + Ovoid.rscene.name + "'.");
      return;
    }
    /* par défaut on crée une nouvelle action */
    newaction = new Ovoid.Action(target + "Action");
  } else {
    if(target.type & Ovoid.BODY || target.type & Ovoid.LAYER) {
      nodes = new Array();
      nodes.push(target);
      /* par défaut on crée une nouvelle action */
      newaction = new Ovoid.Action(target.name + "Action");
    } else {
      Ovoid.log(2, 'Ovoid.setAction', 'node ' 
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
 * @param {int} type Constraint node type. Can be Ovoid.PHYSICS, 
 * Ovoid.ANIMATION or Ovoid.EXPRESSION.
 * 
 * @param {string|Node} target Node object, or a string to retrieve one or 
 * several nodes whose name matches with.
 * 
 * @return {Array} Array containing references of the created Constraint nodes.
 */
Ovoid.setConstraint = function(type, target) {
  
  /* retrouve la node si c'est un string */
  var nodes;
  if ( typeof(target) == "string" ) {
    nodes = Ovoid.rscene.searchMatches(target);
    
    if (nodes.length == 0) {
      Ovoid.log(2, 'Ovoid.setConstraint', "no node found with matching name '"
        +target+"' in the current active scene '" + Ovoid.rscene.name + "'.");
      return;
    }
  } else {
    if(target.type & Ovoid.TRANSFORM) {
      nodes = new Array();
      nodes.push(target);
    } else {
      Ovoid.log(2, 'Ovoid.setConstraint', 'node ' 
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
      Ovoid.log(2, 'Ovoid.setConstraint', 'node ' 
          + nodes[i].name + ' is not a Transform instance.');
      continue;
    }

    /* parcour le type de constraint */
    switch (type)
    {
      case Ovoid.PHYSICS:
        constraint = Ovoid.rscene.create(type, nodes[i].name + "Physics", null);
        Ovoid.log(3, 'Ovoid.setConstraint', 'creating Physics node ' 
          + constraint.name + ' in active scene');
        break;
      case Ovoid.ANIMATION:
        constraint = Ovoid.rscene.create(type, nodes[i].name + "Animation", null);
        Ovoid.log(3, 'Ovoid.setConstraint', 'creating Animation node ' 
          + constraint.name + ' in active scene');
        break;
      case Ovoid.EXPRESSION:
        constraint = Ovoid.rscene.create(type, nodes[i].name + "Animation", null);
        Ovoid.log(3, 'Ovoid.setConstraint', 'creating Animation node ' 
          + constraint.name + ' in active scene');
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
 * Assign Physics nodes to one or several Transform nodes.<br><br>
 * 
 * Assigns Physics nodes of the specified type to one or several Transform 
 * nodes. Target can be a Transform node instance or a string to retrieve one or 
 * several nodes whose name matches with. This method creates one new Physics
 * node per target nodes.<br><br>
 * 
 * <blockcode>
 * var physics = Ovoid.setPhysics("box")<br>
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
Ovoid.setPhysics = function(target) {
  
  /* retrouve la node si c'est un string */
  var nodes;
  if ( typeof(target) == "string" ) {
    nodes = Ovoid.rscene.searchMatches(target);
    
    if (nodes.length == 0) {
      Ovoid.log(2, 'Ovoid.setPhysics', "no node found with matching name '"
        +target+"' in the current active scene '" + Ovoid.rscene.name + "'.");
      return;
    }
  } else {
    if(target.type & Ovoid.TRANSFORM) {
      nodes = new Array();
      nodes.push(target);
    } else {
      Ovoid.log(2, 'Ovoid.setPhysics', 'node ' 
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
      Ovoid.log(2, 'Ovoid.setPhysics', 'node ' 
          + nodes[i].name + ' is not a Transform instance.');
      continue;
    }
    constraint = Ovoid.rscene.create(Ovoid.PHYSICS, nodes[i].name + "Physics", null);
    Ovoid.log(3, 'Ovoid.setPhysics', 'creating Physics node ' 
      + constraint.name + ' in active scene');
    Ovoid.log(3, 'Ovoid.setPhysics', 'adding constraint ' 
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
 * var expression = Ovoid.setExpression("box", exprfunc)<br>
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
 * <code>var expr = function(node, timeq, timel) {};</code>
 * 
 * @return {Expression} Created Expression node.
 */
Ovoid.setExpression = function(target, f) {
  
  if (!(f instanceof Function)) {
    Ovoid.log(2, 'Ovoid.setExpression', "Not valid Function ("+ f +").");
    return;
  }
  
  /* retrouve la node si c'est un string */
  var exprname;
  var nodes;
  if ( typeof(target) == "string" ) {
    exprname = target;
    nodes = Ovoid.rscene.searchMatches(target);
    if (nodes.length == 0) {
      Ovoid.log(2, 'Ovoid.setExpression', "no node found with matching name '"
        +target+"' in the current active scene '" + Ovoid.rscene.name + "'.");
      return;
    }
  } else {
    if(target.type & Ovoid.TRANSFORM || target.type & Ovoid.MATERIAL) {
      exprname = target.name;
      nodes = new Array();
      nodes.push(target);
    } else {
      Ovoid.log(2, 'Ovoid.setExpression', 'node ' 
          + target.name + ' is not a valide node type instance.');
      return;
    }
  }

  /* Cree la nouvelle expression */
  var expr = Ovoid.rscene.create(Ovoid.EXPRESSION, exprname + "Expression");
  Ovoid.log(3, 'Ovoid.setExpression', 'creating Expression node ' 
          + expr.name + ' in active scene');
  expr.addExpression(f);
  
  var i = nodes.length;
  while(i--) {
    /* Si ce n'est pas un body, cancel */
    if (!(nodes[i].type & Ovoid.TRANSFORM || nodes[i].type & Ovoid.MATERIAL)) {
      Ovoid.log(2, 'Ovoid.setExpression', 'node ' 
          + nodes[i].name + ' is not a valide node type instance.');
      continue;
    }

    Ovoid.log(3, 'Ovoid.setExpression', 'adding expression ' 
          + expr.name + ' to ' + nodes[i].name);
    expr.setTarget(nodes[i]);
  }
  return expr;
  
};


/**
 * Grab node.<br><br>
 * 
 * Grabs the specified node.<br><br>
 * 
 * <b>Node Grabbing</b><br><br>
 * 
 * Node-grabbing consists in focusing on a node while ignoring events of 
 * other nodes.<br><br>
 * 
 * Suppose you want to rotate a node by moving the mouse while you maintain the 
 * left button pressed. While you move your mouse pointer to rotate the object, 
 * the pointer should leave the node's region, resulting that the trigger 
 * function stops, since the mouse now rolls over another node (or the 
 * background).<br><br>
 * 
 * The "node-grabbing" prevents this kind of side effects by forcing to focus on 
 * the grabbed node while ignoring the others. You also must release the grabbed 
 * node to return in the normal interaction behaviour.<br><br>
 * 
 * For more information about node-grabbing usage, see the 
 * <code>Ovoid.Action</code> node documentation page.
 * 
 * @param {Node} node Node object to be grabbed.
*/
Ovoid.grabNode = function(node) {

  Ovoid.Input.grabNode(node);
};


/**
 * Release grab.<br><br>
 * 
 * Releases the current grabbed node and restores the normal event dispatching.<br><br>
 * 
 * <b>Node Grabbing</b><br><br>
 * 
 * Node-grabbing consists in focusing on a node while ignoring events of 
 * other nodes.<br><br>
 * 
 * Suppose you want to rotate a node by moving the mouse while you maintain the 
 * left button pressed. While you move your mouse pointer to rotate the object, 
 * the pointer should leave the node's region, resulting that the trigger 
 * function stops, since the mouse now rolls over another node (or the 
 * background).<br><br>
 * 
 * The "node-grabbing" prevents this kind of side effects by forcing to focus on 
 * the grabbed node while ignoring the others. You also must release the grabbed 
 * node to return in the normal interaction behaviour.<br><br>
 * 
 * For more information about node-grabbing usage, see the 
 * <code>Ovoid.Action</code> node documentation page.
 */
Ovoid.grabRelease = function() {

  Ovoid.Input.grabRelease();
};
