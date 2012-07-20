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
 * Loader global static class.
 *
 * @namespace Loader global class.<br><br>
 * 
 * The Input class implements external data loading and wait screen. It is a 
 * global static (namespace) class. The Input class is typically used to 
 * load external data an display a wait screen during library initialization. 
 * The wait screen display is optionnal.<br><br>
 * 
 * <blockcode> <codecomment>// Create a new scene in global scope </codecomment><br>
 * var myScene = new Ovoid.Scene("hello");<br>
 * <codecomment>// The main() function will be launched at page loading </codecomment><br>
 * function main() {<br>
 * &nbsp;&nbsp;&nbsp; <codecomment>// Adds a DAE scene to the preloading stack</codecomment><br>
 * &nbsp;&nbsp;&nbsp; Ovoid.Loader.includeCollada("myScene.dae", Ovoid.DAE_ALL_NODES, myScene, null, null);<br>
 * &nbsp;&nbsp;&nbsp; <codecomment>// Initialize the library</codecomment><br>
 * &nbsp;&nbsp;&nbsp; Ovoid.init("canvas");<br>
 * } 
 * </blockcode><br><br>
 * 
 * You are not forced to use the Loader class. All external data can be 
 * manualy and selectively loaded at any time using the <code>loadSource</code>
 * method of the concerned nodes or objects.<br><br>
 * 
 * <b>Why preloading</b><br><br>
 * 
 * Preloading data with a wait screen may appear heretic when all efforts (like 
 * asynchronous loading) are made to avoid this annoying wait screen. There is 
 * some answers:<br><br>
 * <ul>
 * <li>
 * <b>Asynchronous loading don't solves everything</b>. Suppose you have to load 
 * a scene, you HAVE to wait until load finished before displaying 
 * something, asynchronously or not.
 * </li>
 * <li>
 * <b>Asynchronous loading causes unaesthetic side effects</b>. For example 
 * until textures are fully loaded, your textured objects appears with a defaut 
 * black color and progressively show its textures.
 * </li>
 * <li>
 * <b>The wait screen is optionnal</b>. The wait screen can be disabled by 
 * setting the <code>Ovoid.Loader.opt_drawWaitScreen</code> option to false.
 * </li>
 * </ul>
 * 
 * <b>Preloading stacks</b><br><br>
 * 
 * The Loader use a stacks mecanism to store loading requests and load the 
 * requested external data. Once a loading request is added to the preloading 
 * stack, loading does not begin until the main library initialize. This 
 * behaviours also imply that loading requests must occur before the library 
 * initialization (<code>Ovoid.init</code>).<br><br>
 * 
 * <b>Wait screen customization</b><br><br>
 * 
 * The wait screen is pretty simple and spartan. However you can customize it 
 * by changing (or removing) images, some texts, colours, or by adding a
 * background image. You can edit these parameters by modifying the 
 * Loader's global options variables, also in the <code>config.js</code> file.
 */
Ovoid.Loader = {};

/** Draw the Wait screen or let blank during loading process */
Ovoid.Loader.opt_drawWaitScreen = true;


/** Wait screen foreground (text) color */
Ovoid.Loader.opt_foregroundColor = [0.0, 0.0, 0.0, 0.6];


/** Wait screen background color */
Ovoid.Loader.opt_backgroundColor = [1.0, 1.0, 1.0, 1.0];


/** Wait screen alternative fontmap source image URL */
Ovoid.Loader.opt_fontmapSrc = '';


/** Wait screen background source image file */
Ovoid.Loader.opt_backgroundSrc = '';


/** Wait screen icons color */
Ovoid.Loader.opt_iconsColor = [1.0, 1.0, 1.0, 0.6];


/** Wait screen icons size */
Ovoid.Loader.opt_iconsSize = [32, 32];


/** Wait screen icon scenes source image file */
Ovoid.Loader.opt_iconscenesSrc = '';


/** Wait screen icon scenes X and Y position */
Ovoid.Loader.opt_iconscenesPos = [330, 270];


/** Wait screen icon textures source image file */
Ovoid.Loader.opt_icontexturesSrc = '';


/** Wait screen icon textures X and Y position */
Ovoid.Loader.opt_icontexturesPos = [370, 270];


/** Wait screen icon audios source image file */
Ovoid.Loader.opt_iconaudiosSrc = '';


/** Wait screen icon audios X and Y position */
Ovoid.Loader.opt_iconaudiosPos = [405, 270];


/** Wait screen icon config source image file */
Ovoid.Loader.opt_iconconfigSrc = '';


/** Wait screen icon config X and Y position */
Ovoid.Loader.opt_iconconfigPos = [436, 270];


/** Wait screen loading cycle color */
Ovoid.Loader.opt_loadcircleColor = [1.0, 1.0, 1.0, 0.5];


/** Wait screen loading circle source image file */
Ovoid.Loader.opt_loadcircleSrc = '';


/** Wait screen loading circle image size */
Ovoid.Loader.opt_loadcircleSize = [64, 64];


/** Wait screen loading circle X and Y position */
Ovoid.Loader.opt_loadcirclePos = [400, 230];


/** Wait screen show or hide percentage */
Ovoid.Loader.opt_showPercentage = true;


/** Wait screen percentage X, Y position and font size */
Ovoid.Loader.opt_percentageXys = [387, 224, 16];


/** Wait screen show or hide title */
Ovoid.Loader.opt_showTitle = true;


/** Wait screen title X, Y position and font size */
Ovoid.Loader.opt_titleXys = [387, 224, 16];


/** Wait screen title string */
Ovoid.Loader.opt_titleStr = 'Loading please wait...';


/** Wait screen show or hide details */
Ovoid.Loader.opt_showDetails = true;


/** Wait screen details X, Y position and font size */
Ovoid.Loader.opt_detailsXys = [387, 224, 16];


/** Wait screen detail string */
Ovoid.Loader._detailsStr = '';


/** Background layer*/
Ovoid.Loader._bg = new Ovoid.Layer();


/** Icon geometry layer*/
Ovoid.Loader._iconscn = new Ovoid.Layer();


/** Icon texture layer*/
Ovoid.Loader._icontex = new Ovoid.Layer();


/** Icon sound layer*/
Ovoid.Loader._iconaud = new Ovoid.Layer();


/** Icon glsl layer */
Ovoid.Loader._iconcgf = new Ovoid.Layer();


/** Load circle image layer */
Ovoid.Loader._lcirclei = new Ovoid.Layer();


/** Load circle rotate layer */
Ovoid.Loader._lcirclea = new Ovoid.Layer();


/** Percent text */
Ovoid.Loader._percent = new Ovoid.Text();


/** Title text */
Ovoid.Loader._title = new Ovoid.Text();


/** Current-loading-URL text */
Ovoid.Loader._details = new Ovoid.Text();


/** Fontmap texture for texts */
Ovoid.Loader._fontmap = null;


/** Loading stages flags */
Ovoid.Loader._loadstage = [true,false,false,false];


/** Loading remains count */
Ovoid.Loader._remains = [0,0,0,0];


/** Items total count */
Ovoid.Loader._ntotal = 0;


/** Items loaded count */
Ovoid.Loader._ndone = 0.0;


/** loading ratio (%) */
Ovoid.Loader._nratio = 0.0;


/** DAE loading stack */
Ovoid.Loader._stackscn = new Array();


/** Texture loading stack */
Ovoid.Loader._stacktex = new Array();


/** Sound loading stack */
Ovoid.Loader._stackaud = new Array();


/** Shader loading stack */
Ovoid.Loader._stackgls = new Array();


/** Current loading sound */
Ovoid.Loader._obj = null;


/** Current stack poped */
Ovoid.Loader._item = null;


/** Performance counter */
Ovoid.Loader._tcnt;


/**
 * Loader initialization.<br><br>
 * 
 * Global initialization method. This methode is called once during the library 
 * main initalization. It shouldn't be called a second time.
 * 
 * @see Ovoid.init
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Loader.init = function() {

  Ovoid.log(3, 'Ovoid.Loader', 'initialization');
  
  if(Ovoid.Loader._ntotal == 0) {
    Ovoid.log(3, 'Ovoid.Loader', 'nothing to preload, skip initialization');
    return true;
  }
  
  if (!Ovoid.Loader.opt_drawWaitScreen)
    return true;
  
  var dp = Ovoid.opt_libPath + 'lib/maps/';
  
  var iconSize = new Ovoid.Coord(Ovoid.Loader.opt_iconsSize);

  if (Ovoid.Loader.opt_fontmapSrc.length > 1)
  {
    Ovoid.Loader._fontmap = new Ovoid.Texture();
    Ovoid.Loader._fontmap.loadSource(dp+Ovoid.Loader.opt_fontmapSrc, 0, true);

    Ovoid.Loader._percent.fontmapTexture = Ovoid.Loader._fontmap;
    Ovoid.Loader._title.fontmapTexture = Ovoid.Loader._fontmap;
  }
  
  if (Ovoid.Loader.opt_loadcircleSrc.length > 1) {
    
    Ovoid.Loader._lcirclei.bgTexture = new Ovoid.Texture();
    Ovoid.Loader._lcirclei.bgTexture.loadSource(dp+Ovoid.Loader.opt_loadcircleSrc, 1, true);
    Ovoid.Loader._lcirclei.setSize(Ovoid.Loader.opt_loadcircleSize[0],Ovoid.Loader.opt_loadcircleSize[1]);
    Ovoid.Loader._lcirclei.bgColor.setv(Ovoid.Loader.opt_loadcircleColor);
    
    Ovoid.Loader._lcirclei.moveXyz(Ovoid.Loader.opt_loadcircleSize[0]*-0.5,Ovoid.Loader.opt_loadcircleSize[1]*-0.5,0);
    Ovoid.Loader._lcirclei.cachTransform();
    Ovoid.Loader._lcirclei.setParent(Ovoid.Loader._lcirclea);
    
    Ovoid.Loader._lcirclea.moveXyz(Ovoid.Loader.opt_loadcirclePos[0],Ovoid.Loader.opt_loadcirclePos[1],0);
    Ovoid.Loader._lcirclea.cachTransform();
    Ovoid.Loader._lcirclea.cachLayer();
  }

  if (Ovoid.Loader.opt_backgroundSrc.length > 1)
  {
    Ovoid.Loader._bg.bgTexture = new Ovoid.Texture();
    Ovoid.Loader._bg.bgTexture.loadSource(dp+Ovoid.Loader.opt_backgroundSrc, 0, true);
  }
  Ovoid.Loader._bg.bgColor.setv(Ovoid.Loader.opt_backgroundColor);
  Ovoid.Loader._bg.moveXyz(0.0, 0.0, 0.0);
  Ovoid.Loader._bg.size.set(Ovoid.Frame.size.v[0], Ovoid.Frame.size.v[1], 0.0);
  Ovoid.Loader._bg.cachTransform();
  Ovoid.Loader._bg.cachLayer();
    
  if (Ovoid.Loader.opt_iconscenesSrc.length > 1) {
    
    Ovoid.Loader._iconscn.bgTexture = new Ovoid.Texture();
    Ovoid.Loader._iconscn.bgTexture.loadSource(dp+Ovoid.Loader.opt_iconscenesSrc,1, true);
    Ovoid.Loader._iconscn.bgColor.setv(Ovoid.Loader.opt_iconsColor);
    Ovoid.Loader._iconscn.moveXyz(Ovoid.Loader.opt_iconscenesPos[0],Ovoid.Loader.opt_iconscenesPos[1],0.0);
    Ovoid.Loader._iconscn.setSize(Ovoid.Loader.opt_iconsSize[0],Ovoid.Loader.opt_iconsSize[1]);
    Ovoid.Loader._iconscn.cachTransform();
    Ovoid.Loader._iconscn.cachLayer();
  }

  if (Ovoid.Loader.opt_icontexturesSrc.length > 1) {
    
    Ovoid.Loader._icontex.bgTexture = new Ovoid.Texture();
    Ovoid.Loader._icontex.bgTexture.loadSource(dp+Ovoid.Loader.opt_icontexturesSrc,1, true);
    Ovoid.Loader._icontex.bgColor.setv(Ovoid.Loader.opt_iconsColor);
    Ovoid.Loader._icontex.moveXyz(Ovoid.Loader.opt_icontexturesPos[0],Ovoid.Loader.opt_icontexturesPos[1],0.0);
    Ovoid.Loader._icontex.setSize(Ovoid.Loader.opt_iconsSize[0],Ovoid.Loader.opt_iconsSize[1]);
    Ovoid.Loader._icontex.cachTransform();
    Ovoid.Loader._icontex.cachLayer();
  }

  if (Ovoid.Loader.opt_iconaudiosSrc.length > 1)
  {
    Ovoid.Loader._iconaud.bgTexture = new Ovoid.Texture();
    Ovoid.Loader._iconaud.bgTexture.loadSource(dp+Ovoid.Loader.opt_iconaudiosSrc,1, true);
    Ovoid.Loader._iconaud.bgColor.setv(Ovoid.Loader.opt_iconsColor);
    Ovoid.Loader._iconaud.moveXyz(Ovoid.Loader.opt_iconaudiosPos[0],Ovoid.Loader.opt_iconaudiosPos[1],0.0);
    Ovoid.Loader._iconaud.setSize(Ovoid.Loader.opt_iconsSize[0], Ovoid.Loader.opt_iconsSize[1]);
    Ovoid.Loader._iconaud.cachTransform();
    Ovoid.Loader._iconaud.cachLayer();
  }

  if (Ovoid.Loader.opt_iconconfigSrc.length > 1)
  {
    Ovoid.Loader._iconcgf.bgTexture = new Ovoid.Texture();
    Ovoid.Loader._iconcgf.bgTexture.loadSource(dp+Ovoid.Loader.opt_iconconfigSrc, 1, true);
    Ovoid.Loader._iconcgf.bgColor.setv(Ovoid.Loader.opt_iconsColor);
    Ovoid.Loader._iconcgf.moveXyz(Ovoid.Loader.opt_iconconfigPos[0],Ovoid.Loader.opt_iconconfigPos[1],0.0);
    Ovoid.Loader._iconcgf.setSize(Ovoid.Loader.opt_iconsSize[0], Ovoid.Loader.opt_iconsSize[1]);
    Ovoid.Loader._iconcgf.cachTransform();
    Ovoid.Loader._iconcgf.cachLayer();
  }

  Ovoid.Loader._percent.setFormat(Ovoid.Loader.opt_percentageXys[2],0.5,1.0);
  Ovoid.Loader._percent.fgColor.setv(Ovoid.Loader.opt_foregroundColor);
  Ovoid.Loader._percent.moveXyz(Ovoid.Loader.opt_percentageXys[0]-(Ovoid.Loader._percent.getWidth()*0.5),Ovoid.Loader.opt_percentageXys[1],0.0);
  Ovoid.Loader._percent.cachTransform();
  Ovoid.Loader._percent.cachLayer();

  Ovoid.Loader._title.string = Ovoid.Loader.opt_titleStr;
  Ovoid.Loader._title.setFormat(Ovoid.Loader.opt_titleXys[2],0.5,1.0);
  Ovoid.Loader._title.fgColor.setv(Ovoid.Loader.opt_foregroundColor);
  Ovoid.Loader._title.moveXyz(Ovoid.Loader.opt_titleXys[0]-(Ovoid.Loader._title.getWidth()*0.5), Ovoid.Loader.opt_titleXys[1], 0.0);
  Ovoid.Loader._title.cachTransform();
  Ovoid.Loader._title.cachLayer();

  Ovoid.Loader._details.string = 'Scenes...';
  Ovoid.Loader._details.setFormat(Ovoid.Loader.opt_detailsXys[2],0.5,1.0);
  Ovoid.Loader._details.fgColor.setv(Ovoid.Loader.opt_foregroundColor);
  Ovoid.Loader._details.moveXyz(Ovoid.Loader.opt_detailsXys[0]-(Ovoid.Loader._details.getWidth()*0.5),Ovoid.Loader.opt_detailsXys[1],0.0);
  Ovoid.Loader._details.cachTransform();
  Ovoid.Loader._details.cachLayer();

  if (Ovoid._logGlerror('Ovoid.Loader.init'))
    return false;

  return true;
};


/**
 * Drawing step loader function.
 */
Ovoid.Loader._drawStep = function() {

  Ovoid.gl.clear(Ovoid.gl.COLOR_BUFFER_BIT|Ovoid.gl.DEPTH_BUFFER_BIT);
  
  Ovoid.Drawer.switchSp(7); /* SP_LAYER */
  /* background */
  Ovoid.Drawer.model(Ovoid.Loader._bg.layerMatrix);
  Ovoid.Drawer.layer(Ovoid.Loader._bg);
  
  Ovoid.Loader._iconscn.bgColor.setv(Ovoid.Loader.opt_iconsColor);
  if (!Ovoid.Loader._loadstage[0])
    Ovoid.Loader._iconscn.bgColor.v[3] = 0.1;
  
  Ovoid.Drawer.model(Ovoid.Loader._iconscn.layerMatrix);
  Ovoid.Drawer.layer(Ovoid.Loader._iconscn);

  Ovoid.Loader._icontex.bgColor.setv(Ovoid.Loader.opt_iconsColor);
  if (!Ovoid.Loader._loadstage[1])
    Ovoid.Loader._icontex.bgColor.v[3] = 0.1;
  
  Ovoid.Drawer.model(Ovoid.Loader._icontex.layerMatrix);
  Ovoid.Drawer.layer(Ovoid.Loader._icontex);

  Ovoid.Loader._iconaud.bgColor.setv(Ovoid.Loader.opt_iconsColor);
  if (!Ovoid.Loader._loadstage[2])
    Ovoid.Loader._iconaud.bgColor.v[3] = 0.1;
  
  Ovoid.Drawer.model(Ovoid.Loader._iconaud.layerMatrix);
  Ovoid.Drawer.layer(Ovoid.Loader._iconaud);
  
  Ovoid.Loader._iconcgf.bgColor.setv(Ovoid.Loader.opt_iconsColor);
  if (!Ovoid.Loader._loadstage[3])
    Ovoid.Loader._iconcgf.bgColor.v[3] = 0.1;
  
  Ovoid.Drawer.model(Ovoid.Loader._iconcgf.layerMatrix);
  Ovoid.Drawer.layer(Ovoid.Loader._iconcgf);

  if(Ovoid.Loader._lcirclei.bgTexture) {
    Ovoid.Loader._lcirclea.rotateXyz(0.0, 0.0, 0.2, Ovoid.WORLD, Ovoid.RELATIVE);
    Ovoid.Loader._lcirclea.cachTransform();
    Ovoid.Loader._lcirclei.cachTransform();
    Ovoid.Loader._lcirclei.cachLayer();
    Ovoid.Drawer.model(Ovoid.Loader._lcirclei.layerMatrix);
    Ovoid.Drawer.layer(Ovoid.Loader._lcirclei);
  }
  
  Ovoid.Drawer.switchSp(6); /* SP_TEXT */
  
  if (Ovoid.Loader.opt_showPercentage) {
    Ovoid.Loader._percent.string = Math.floor(Ovoid.Loader._nratio).toString() + '%';
    Ovoid.Loader._percent.moveXyz(Ovoid.Loader.opt_percentageXys[0]-(Ovoid.Loader._percent.getWidth()*0.5),Ovoid.Loader.opt_percentageXys[1],0.0,0,1);
    Ovoid.Loader._percent.cachTransform();
    Ovoid.Drawer.model(Ovoid.Loader._percent.layerMatrix);
    Ovoid.Drawer.text(Ovoid.Loader._percent);
  }

  if (Ovoid.Loader.opt_showTitle) {
    Ovoid.Drawer.drawText(Ovoid.Loader._title);
    Ovoid.Drawer.model(Ovoid.Loader._title.layerMatrix);
    Ovoid.Drawer.text(Ovoid.Loader._title);
  }

  if (Ovoid.Loader.opt_showDetails) {
    Ovoid.Loader._details.string = Ovoid.Loader._detailsStr;
    Ovoid.Loader._details.moveXyz(Ovoid.Loader.opt_detailsXys[0]-(Ovoid.Loader._details.getWidth()*0.5),Ovoid.Loader.opt_detailsXys[1],0.0,0,1);
    Ovoid.Loader._details.cachTransform();
    Ovoid.Drawer.model(Ovoid.Loader._details.layerMatrix);
    Ovoid.Drawer.text(Ovoid.Loader._details);
  }
  
  /* vide le cach error */
  Ovoid._logGlerror('Ovoid.Loader._drawStep');
};


/**
 * Loading step loader function.
 */
Ovoid.Loader._loadStep = function() {
  
  /* configuration drawer */
  if (Ovoid.Loader._loadstage[3]) {
    if (Ovoid.Loader._remains[3] != 0) {
      if (Ovoid.Loader._obj != null) {
        if (Ovoid.Loader._obj.loadStatus != 0) {
          if (Ovoid.Loader._obj.loadStatus == 1) {
            if(Ovoid.Loader._obj.linkWrap()) {
              var spid = Ovoid.Drawer.addShader(Ovoid.Loader._obj);
              if(Ovoid.Loader._item[0] != -1) {
                Ovoid.Drawer.plugShader(Ovoid.Loader._item[0], spid);
              }
            }
          }
          Ovoid.Loader._ndone++;
          Ovoid.Loader._obj = null;
          Ovoid.Loader._remains[3]--;
        }
      } else { // if (Ovoid.Loader._obj != null)
        if (Ovoid.Loader._stackgls.length > 0) {
          Ovoid.Loader._item = Ovoid.Loader._stackgls.pop();
          Ovoid.Loader._obj = new Ovoid.Shader(Ovoid.Loader._item[4]);
          Ovoid.Loader._obj.loadSource(Ovoid.Loader._item[1],
              Ovoid.Loader._item[2],
              Ovoid.Loader._item[3], true);
        }
      }
    }
  }

  /* chargement audios */
  if (Ovoid.Loader._loadstage[2]) {
    if (Ovoid.Loader._remains[2] != 0) {
      if (Ovoid.Loader._obj != null) {
        if (Ovoid.Loader._obj.loadStatus != 0) {
          if (Ovoid.Loader._obj.loadStatus == 1) {
            // ...
          }
          Ovoid.Loader._ndone++;
          Ovoid.Loader._obj = null;
          Ovoid.Loader._remains[2]--;
        }
      } else { // if (Ovoid.Loader._obj != null)

        if (Ovoid.Loader._stackaud.length > 0) {
          var poped = Ovoid.Loader._stackaud.pop();
          Ovoid.Loader._obj = poped[0];
          Ovoid.Loader._obj.loadSource(Ovoid.Loader._obj.url);
          Ovoid.Loader._detailsStr = 'Audio...('+Ovoid.Loader._obj.url+')';
        }
      }

    } else { // if (Ovoid.Loader._remains[2] != 0)
      if (!Ovoid.Loader._loadstage[3]) {
        Ovoid.Loader._loadstage[3] = true;
        Ovoid.Loader._detailsStr = 'Shaders...';
      }
    }
  }

  /* chargement textures */
  if (Ovoid.Loader._loadstage[1]) {
    if (Ovoid.Loader._remains[1] != 0) {
      if (Ovoid.Loader._obj != null) {
        if (Ovoid.Loader._obj.loadStatus != 0) {
          if (Ovoid.Loader._obj.loadStatus == 1) {
            // ...
          }
          Ovoid.Loader._ndone++;
          Ovoid.Loader._obj = null;
          Ovoid.Loader._remains[1]--;
        }
      } else { // if (Ovoid.Loader._obj != null)
        if (Ovoid.Loader._stacktex.length > 0) {
          var poped = Ovoid.Loader._stacktex.pop();
          Ovoid.Loader._obj = poped[0];
          Ovoid.Loader._obj.loadSource(Ovoid.Loader._obj.url, poped[1]);
          Ovoid.Loader._detailsStr = 'Texture..('+Ovoid.Loader._obj.url+')';
        }
      }
    } else { // if (Ovoid.Loader._remains[1] != 0)
      if (!Ovoid.Loader._loadstage[2]) {
        Ovoid.Loader._loadstage[2] = true;
        Ovoid.Loader._detailsStr = 'Sounds...';
      }
    }
  }

  /* chargement scenes */
  if (Ovoid.Loader._remains[0] != 0) {
    if (Ovoid.Loader._obj != null) {
      if (Ovoid.Loader._obj.loadStatus != 0) {
        if (Ovoid.Loader._obj.loadStatus == 1) {
          /* Import de la scene */
          switch (Ovoid.Loader._item[0])
          {
            case Ovoid.OJSON:
              /* import ojson */
              Ovoid.Loader._obj.importScene(Ovoid.Loader._item[3]);
              break;
            default:
              /* import collada */
              Ovoid.Loader._obj.importDae(Ovoid.Loader._item[2],
                    Ovoid.Loader._item[3],
                    Ovoid.Loader._item[4],
                    Ovoid.Loader._item[5]);
              break;
          }
          /* on insert les textures pour leur chargement ulterieur */
          var i = Ovoid.Loader._item[3].texture.length;
          while (i--) {
            Ovoid.Loader.includeTexture(Ovoid.Loader._item[3].texture[i], 1);
          }
          /* on insert les audios pour leur chargement ulterieur */
          var i = Ovoid.Loader._item[3].audio.length;
          while (i--) {
            Ovoid.Loader.includeAudio(Ovoid.Loader._item[3].audio[i]);
          }
        }
        Ovoid.Loader._ndone++;
        Ovoid.Loader._obj = null;
        Ovoid.Loader._remains[0]--;
      }
    } else { // if (Ovoid.Loader._obj != null)
      if (Ovoid.Loader._stackscn.length > 0) {
        Ovoid.Loader._item = Ovoid.Loader._stackscn.pop();
        switch (Ovoid.Loader._item[0])
        {
          case Ovoid.OJSON:
            Ovoid.Loader._obj = new Ovoid.Ojson();
            break;
          default:
            Ovoid.Loader._obj = new Ovoid.Collada();
            break;
        }
        Ovoid.Loader._obj.loadSource(Ovoid.Loader._item[1], true);
        Ovoid.Loader._detailsStr = 'Scene...('+Ovoid.Loader._obj.url+')';
      }
    }
  } else { // if (Ovoid.Loader._remains[0] != 0)
    if (!Ovoid.Loader._loadstage[1]) {
      Ovoid.Loader._loadstage[1] = true;
      Ovoid.Loader._detailsStr = 'Textures...';
    }
  }

  Ovoid.Loader._nratio = ((Ovoid.Loader._ndone) / Ovoid.Loader._ntotal) * 100;

  if (Ovoid._logGlerror('Ovoid.Loader._loadStep')) {
    Ovoid.error(4, 'Loading loop encounter WebGL error');
  }

  if (Ovoid.Loader._ndone < Ovoid.Loader._ntotal) {
      window.requestAnimFrame(Ovoid.Loader._loadingLoop);
  } else {
    Ovoid.log(3, 'Ovoid.Loader', 'loading done');
    Ovoid.Loader._loadingDone();
  }
};


/**
 * On loaded step loader function.
 */
Ovoid.Loader._loadingDone = function() {

  if (Ovoid._hasError()) {
    Ovoid.error(5, 'Loader has encountered errors');
  } else {
    /* performance counter */
    Ovoid.log(3, 'Ovoid.Loader', 'loading loop duration: ' + 
      ((new Date().getTime() - Ovoid.Loader._tcnt) * 0.001) + 's');
    /* frame mode en mode demandé */
    Ovoid.Frame.setMode(Ovoid.Frame.opt_frameMode);
    /* update viewport drawer */
    Ovoid.gl.viewport(0,0,Ovoid.Frame.size.v[0],Ovoid.Frame.size.v[1]);
    Ovoid.log(3, 'Ovoid.Loader', 'run onload()');
    /* appelle la function onload */
    if (Ovoid._mainload()) {
      Ovoid.log(3, 'Ovoid.Loader', 'jump to main loop');
      /* Entre en boucle de rendu */
      Ovoid._mainloop();
    }
  }
};


/**
 * Main loading loop function.
 */
Ovoid.Loader._loadingLoop = function() {

  Ovoid.Loader._drawStep();
  Ovoid.Loader._loadStep();
};


/**
 * Start loading process.
 */
Ovoid.Loader._launch = function() {

  Ovoid.Loader._tcnt = new Date().getTime();

  if(!Ovoid.Loader._ntotal) {
    Ovoid.log(3, 'Ovoid.Loader', 'nothing to preload, skip loading loop');
    Ovoid.Loader._loadingDone();
    return;
  }
  Ovoid.log(3, 'Ovoid.Loader', 'entering loading loop');
  /* Rentre dans la boucle de chargement */
  if (Ovoid.Loader.opt_drawWaitScreen) {
    /* frame mode en mode fix */
    Ovoid.Frame.setMode(0);
    
    /* Initialize pour dessiner le wait screen */
    Ovoid.gl.viewport(0,0,Ovoid.Frame.size.v[0],Ovoid.Frame.size.v[1]);
    Ovoid.Drawer.switchSp(6); /* SP_TEXT */
    Ovoid.Drawer.screen(Ovoid.Frame.matrix);
    Ovoid.Drawer.switchSp(7); /* SP_LAYER */
    Ovoid.Drawer.screen(Ovoid.Frame.matrix);
    Ovoid.Drawer.switchDepth(0);
    Ovoid.Drawer.switchBlend(3);
    
    Ovoid.Loader._loadingLoop();
  } else {
    /* chargement brute de décofrage synchronisé pour les scenes */
    for(var i = 0; i < Ovoid.Loader._stackscn.length; i++) {
      Ovoid.Loader._item = Ovoid.Loader._stackscn[i];
      switch (Ovoid.Loader._item[0])
      {
        case Ovoid.OJSON:
          Ovoid.Loader._obj = new Ovoid.Ojson();
          Ovoid.Loader._obj.loadSource(Ovoid.Loader._item[1], false);
          Ovoid.Loader._obj.importScene(Ovoid.Loader._item[3]);
          break;
        default:
          Ovoid.Loader._obj = new Ovoid.Collada();
          Ovoid.Loader._obj.loadSource(Ovoid.Loader._item[1], false);
          Ovoid.Loader._obj.importDae(Ovoid.Loader._item[2],
                  Ovoid.Loader._item[3],
                  Ovoid.Loader._item[4],
                  Ovoid.Loader._item[5]);
          break;
      }
      /* on insert les textures pour leur chargement ulterieur */
      var j = Ovoid.Loader._item[3].texture.length;
      while (j--) {
        Ovoid.Loader.includeTexture(Ovoid.Loader._item[3].texture[j], 1);
      }
      /* on insert les audios pour leur chargement ulterieur */
      var j = Ovoid.Loader._item[3].audio.length;
      while (j--) {
        Ovoid.Loader.includeAudio(Ovoid.Loader._item[3].audio[j]);
      }
    }
    /* chargement asynchrone pour les sons et texture */
    for(var i = 0; i < Ovoid.Loader._stacktex.length; i++) {
      Ovoid.Loader._stacktex[i][0].loadSource(Ovoid.Loader._stacktex[i][0].url,
          Ovoid.Loader._stacktex[i][1]);
    }
    for(var i = 0; i < Ovoid.Loader._stackaud.length; i++) {
      Ovoid.Loader._stackaud[i][0].loadSource(Ovoid.Loader._stackaud[i][0].url);
    }
    /* chargement brute de décofrage synchronisé pour les shaders */
    for(var i = 0; i < Ovoid.Loader._stackgls.length; i++) {
      Ovoid.Loader._item = Ovoid.Loader._stackgls[i];
      Ovoid.Loader._obj = new Ovoid.Shader(Ovoid.Loader._item[4]);
      Ovoid.Loader._obj.loadSource(Ovoid.Loader._item[1],
          Ovoid.Loader._item[2],
          Ovoid.Loader._item[3], false);
      
      if(Ovoid.Loader._obj.linkWrap()) {
        var spid = Ovoid.Drawer.addShader(Ovoid.Loader._obj);
        if(Ovoid.Loader._item[0] != -1) {
          Ovoid.Drawer.plugShader(Ovoid.Loader._item[0], spid);
        }
      }
    }
    Ovoid.Loader._loadingDone();
  }
};


/**
 * Include OJSON scene.<br><br>
 * 
 * Includes an OJSON scene file to the preloading stacks. 
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 * 
 * @see Ovoid.Ojson
 *
 * @param {string} url Source file url to load.
 * <code>Ovoid.opt_ojsonPath</code> is used as base path.
 * 
 * @param {Scene} scene Importation recipient Scene object.
 */
Ovoid.Loader.includeOjson = function(url, scene) {

  if (Ovoid.Ojson != undefined) {
    Ovoid.Loader._stackscn.unshift(new Array(6))
    Ovoid.Loader._stackscn[0][0] = Ovoid.OJSON;
    Ovoid.Loader._stackscn[0][1] = url;
    Ovoid.Loader._stackscn[0][3] = scene;
    
    Ovoid.Loader._ntotal++;
    Ovoid.Loader._remains[0]++;
  } else {
    if (!Ovoid.opt_disableAlerts) {
      alert( "OvoiD.JS - Loader alert.\n\n" 
      + "Included '" + url + "' scene file will not be imported. The OJSON importation module is not loaded."
      + "\n\nYou should load the OvoiD's OJSON importation module (ojson.js) before including COLLADA contents."
      + "\n\nTo avoid this alert, set the Ovoid.opt_disableAlerts option to true in the config.js file.");
    }
  }
};


/**
 * Include DAE scene.<br><br>
 * 
 * Includes an COLLADA/DAE scene file to the preloading stacks. 
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 *
 * @see Ovoid.Collada
 *
 * @param {string} url @param {string} url Source file url to load. 
 * <code>Ovoid.opt_daePath</code> is used as base path.
 * 
 * @param {bitmask} mask Importation options bitmask.
 * 
 * @param {Scene} scene Recipient Scene object.
 * 
 * @param {string} prefix Prefix used to name imported nodes or null.
 * 
 * @param {string} suffix Suffix used to name imported nodes or null.
 */
Ovoid.Loader.includeCollada = function(url, mask, scene, namespace, extension) {

  if (Ovoid.Collada != undefined) {
    Ovoid.Loader._stackscn.unshift(new Array(6))
    Ovoid.Loader._stackscn[0][0] = Ovoid.COLLADA;
    Ovoid.Loader._stackscn[0][1] = url;
    Ovoid.Loader._stackscn[0][2] = mask;
    Ovoid.Loader._stackscn[0][3] = scene;
    Ovoid.Loader._stackscn[0][4] = namespace;
    Ovoid.Loader._stackscn[0][5] = extension;
    
    Ovoid.Loader._ntotal++;
    Ovoid.Loader._remains[0]++;
  } else {
    if (!Ovoid.opt_disableAlerts) {
      alert( "OvoiD.JS - Loader alert.\n\n" 
      + "Included '" + url + "' scene file will not be imported. The COLLADA importation module is not loaded."
      + "\n\nYou should load the OvoiD's COLLADA importation module (collada.js) before including COLLADA contents."
      + "\n\nTo avoid this alert, set the Ovoid.opt_disableAlerts option to true in the config.js file.");
    }
  }
};


/**
 * Include texture.<br><br>
 * 
 * Includes an image file (Texture object) to the preloading stacks.  
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 *
 * @see Ovoid.Texture
 *
 * @param {Texture} texture Texture object.
 * @param {bool} filter Texture filtering.
 */
Ovoid.Loader.includeTexture = function(texture, filter) {

  var i = Ovoid.Loader._stacktex.length;
  Ovoid.Loader._stacktex.push(new Array(2));
  Ovoid.Loader._stacktex[i][0] = texture;
  Ovoid.Loader._stacktex[i][2] = filter;
  Ovoid.Loader._ntotal++;
  Ovoid.Loader._remains[1]++;
};


/**
 * Include audio.<br><br>
 * 
 * Includes an audio file (Audio object) to the preloading stacks.  
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
 *
 * @see Ovoid.Audio
 * 
 * @param {Audio} audio Audio object.
 */
Ovoid.Loader.includeAudio = function(audio) {

  var i = Ovoid.Loader._stackaud.length;
  Ovoid.Loader._stackaud.push(new Array(2));
  Ovoid.Loader._stackaud[i][0] = audio;
  Ovoid.Loader._ntotal++;
  Ovoid.Loader._remains[2]++;
};


/**
 * Include GLSL shader.<br><br>
 * 
 * Includes an GLSL shader program (Shader object) to the preloading stacks.
 * This methode don't launch any loading at all: the loading occurs during the
 * main Library initialization.<br><br>
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
 * @param {string} vs Vertex program shader source file url. 
 * <code>Ovoid.opt_shadersPath</code> is used as base path.
 * 
 * @param {string} fs Fragment program shader source file url. 
 * <code>Ovoid.opt_shadersPath</code> is used as base path.
 * 
 * @param {string} wm XML or JSON wrap map file url. 
 * <code>Ovoid.opt_shadersPath</code> is used as base path.
 * 
 * @param {string} name Optionnal shader name.
 *
 * @see Ovoid.Shader
 */
Ovoid.Loader.includeShader = function(slot, vs, fs, wm, name) {

  var i = Ovoid.Loader._stackgls.length;
  Ovoid.Loader._stackgls.push(new Array(4));
  Ovoid.Loader._stackgls[i][0] = slot;
  Ovoid.Loader._stackgls[i][1] = vs;
  Ovoid.Loader._stackgls[i][2] = fs;
  Ovoid.Loader._stackgls[i][3] = wm;
  if( name == undefined ) {
    Ovoid.Loader._stackgls[i][4] = vs + "|" + fs;
  } else {
    Ovoid.Loader._stackgls[i][4] = name;
  }
  Ovoid.Loader._ntotal++;
  Ovoid.Loader._remains[3]++;
};

