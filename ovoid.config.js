/* --------------------- OvoiD.JS Library Global Options ----------------------- */

/* ----------------------------- MAIN OPTIONS ------------------------------- */
/* Environment: Default library path. */
Ovoid.opt_libPath = 'ovoid.js/'
/* Environment: Log verbose level */
Ovoid.opt_logLevel = 2; // 0: disabled, 1: errors only, 2: errors+warinings, 3: all.
/* Environment: Avoid browser cache (force (re)load source files) and force Body/Layer pickability */
Ovoid.opt_debugMode = true;
/* Environment: Dsiable alert messages */
Ovoid.opt_disableAlerts = true;
/* Environment: Enable or disable mouse picking system */
Ovoid.opt_enablePicking = true;
/* Environment: Enable local wheighted vertices data (perforance hit) */
Ovoid.opt_localSkinData = true;
/* Display: Show or hide Head-Up Display */
Ovoid.opt_showHud = true;
/* Display: Show or hide debug frame */
Ovoid.opt_showDebug = true;
/* WebGL Context option: Enable or disable transparent canvas */
Ovoid.opt_alpha = false;
/* WebGL Context option: Enable or disable preserve Drawing buffer (needed for picking) */
Ovoid.opt_preserveDrawingBuffer = true;
/* WebGL Context option: Enable or disable anti-aliasing */
Ovoid.opt_antialias = true;
/* WebGL Context option: Enable or disable stencil buffer */
Ovoid.opt_stencil = true;
/* WebGL Context option: Enable or disable premultiplied alpha */
Ovoid.opt_premultipliedAlpha = true;
/* Environment: Textures source files search path */
Ovoid.opt_texturePath = '';
/* Environment: COLLADA/DE source files search path */
Ovoid.opt_daePath = '';
/* Environment: OJSON source files search path */
Ovoid.opt_ojsonPath = '';
/* Environment: Audio source files search path */
Ovoid.opt_audioPath = '';
/* Environment: GLSL sahders source files search path */
Ovoid.opt_shadersPath = Ovoid.opt_libPath + "lib/glsl/";
/* Environment: Default fontmap Texture source image URL */
Ovoid.opt_defaultFontmapUrl = Ovoid.opt_libPath + "lib/maps/font_monofonto.png";
//Ovoid.opt_defaultFontmapUrl = Ovoid.opt_libPath + "lib/maps/font_DroidSansMono.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_UbuntuMono.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_texgyrecursor.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_OxygenMono.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_NotCourierSans.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_DejaVuSansMono.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_AurulentSansMono.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_Anonymous.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_VeraMono.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_CPMonoPlain.png";
//Ovoid.opt_defaultFontmapUrl = "ovoid.js/lib/maps/font_saxmono.png";
/* Environment: Default fontmap Texture filtering */
Ovoid.opt_defaultFontmapFilter = true;
/* Global gravity vector */
Ovoid.opt_gravity = [0.0,-0.98,0.0];

/* --------------------------- FRAME OPTIONS -------------------------------- */
/* Frame mode */
Ovoid.Frame.opt_frameMode = Ovoid.FRAME_FULL_CLIENT;


/* --------------------------- QUEUER OPTIONS ------------------------------- */
/* Enable or disable view culling */
Ovoid.Queuer.opt_viewcull = true; 
/* Enable or disable light culling */
Ovoid.Queuer.opt_lightcull = true;
/* Default camera position */
Ovoid.Queuer.opt_defaultCameraPos = [0.0, 0.0, 5.0];
/* Default camera rotation */
Ovoid.Queuer.opt_defaultCameraRot = [0.0, 0.0, 0.0];

/* --------------------------- DRAWER OPTIONS ------------------------------- */
/* Canvas clearing color */
Ovoid.Drawer.opt_clearColor = [1.0, 1.0, 1.0, 1.0];
/* Global ambient lighting color */
Ovoid.Drawer.opt_ambientColor = [0.2, 0.2, 0.2, 1.0];
/* Enable or disable per-vertex lighting */
Ovoid.Drawer.opt_vertexLight = false;
/* Enable or disable per-light pass render */
Ovoid.Drawer.opt_perLightPass = false;
/* Enable or disable Z-fail shadow casting */
Ovoid.Drawer.opt_shadowCasting = false; 
/* Z-fail shadow casting object exclusion tolerence (object minimum size) */
Ovoid.Drawer.opt_shadowCastingExclusion = 0.8; 

/* Enable or disable layers draws */
Ovoid.Drawer.opt_drawLayers = true;
/* Enable or disable helpers draws */
Ovoid.Drawer.opt_drawHelpers = true; 
/* Enable or disable (helpers) axis draws */
Ovoid.Drawer.opt_drawAxis = true; 
/* Enable or disable (helpers) bounding boxes draws */
Ovoid.Drawer.opt_drawBoundingBox = true;
/* Enable or disable (helpers) bounding sphere draws */
Ovoid.Drawer.opt_drawBoundingSphere = true; 
/* Enable or disable (helpers) joints and bones draws */
Ovoid.Drawer.opt_drawJointBones = true; 
/* Enable or disable (helpers) light draws */
Ovoid.Drawer.opt_drawLights = true;
/* Enable or disable (helpers) camera draws */
Ovoid.Drawer.opt_drawCameras = true; 
/* Enable or disable (helpers) face normal draws */
Ovoid.Drawer.opt_drawNormals = false;
/* Joint helpers's size */
Ovoid.Drawer.opt_jointSize = 2.0;
/* Normals scale */
Ovoid.Drawer.opt_normalScale = 0.7;

/* --------------------------- LOADER OPTIONS ------------------------------- */
/* Draw the Wait screen or let blank during loading process */
Ovoid.Loader.opt_drawWaitScreen = true;
/* Wait screen foreground color */
Ovoid.Loader.opt_foregroundColor = [0.0, 0.0, 0.0, 0.2];
/* Wait screen background color */
Ovoid.Loader.opt_backgroundColor = [1.0, 1.0, 1.0, 1.0];
/* Wait screen background source image file */
Ovoid.Loader.opt_backgroundSrc = '';
/* Wait screen custom fontmap texture source image file */
Ovoid.Loader.opt_fontmapSrc = '';
/* Wait screen icons color */
Ovoid.Loader.opt_iconsColor = [1.0, 1.0, 1.0, 0.8];
/* Wait screen icons size */
Ovoid.Loader.opt_iconsSize = [32, 32];
/* Wait screen icon scenes source image file */
Ovoid.Loader.opt_iconscenesSrc = "loader-geo.png";
/* Wait screen icon scenes X and Y position*/
Ovoid.Loader.opt_iconscenesPos = [330, 270];
/* Wait screen icon textures source image file */
Ovoid.Loader.opt_icontexturesSrc = "loader-tex.png";
/* Wait screen icon textures X and Y position */
Ovoid.Loader.opt_icontexturesPos = [370, 270];
/* Wait screen icon audios source image file */
Ovoid.Loader.opt_iconaudiosSrc = "loader-aud.png";
/* Wait screen icon audios X and Y position */
Ovoid.Loader.opt_iconaudiosPos = [405, 270];
/* Wait screen icon config source image file */
Ovoid.Loader.opt_iconconfigSrc = "loader-drw.png";
/* Wait screen icon config X and Y position */
Ovoid.Loader.opt_iconconfigPos = [436, 270];
/* Wait screen loading circle color */
Ovoid.Loader.opt_loadcircleColor = [1.0, 1.0, 1.0, 0.5];
/* Wait screen loading circle source image file */
Ovoid.Loader.opt_loadcircleSrc = 'loader-lp.png';
/* Wait screen loading circle size */
Ovoid.Loader.opt_loadcircleSize = [64, 64];
/* Wait screen loading circle X and Y position */
Ovoid.Loader.opt_loadcirclePos = [400, 230];
/* Wait screen show or hide percentage */
Ovoid.Loader.opt_showPercentage = false;
/* Wait screen show or hide percentage X, Y position and font size */
Ovoid.Loader.opt_percentageXys = [400, 224, 16];
/* Wait screen show or hide title */
Ovoid.Loader.opt_showTitle = false;
/* Wait screen title X, Y position and font size */
Ovoid.Loader.opt_titleXys = [400, 180, 16];
/* Wait screen show or hide details */
Ovoid.Loader.opt_titleStr = "Loading Please Wait";
/* Enable or disable current loading url text */
Ovoid.Loader.opt_showDetails = false;
/* Wait screen details X, Y position and font size */
Ovoid.Loader.opt_detailsXys = [400, 310, 16];


/* --------------------------- SOLVER OPTIONS ------------------------------- */
if ( Ovoid.Solver ) {
/* Enable or disable the friction for landscape collisions */
Ovoid.Solver.opt_landscapeFriction = false;
/* Enable or disable the iterative contact solving */
Ovoid.Solver.opt_iterativeSolver = false;
/* Maximim iteration for iterative contact solving */
Ovoid.Solver.opt_contactItFactor = 4;
}
