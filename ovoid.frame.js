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
 * @class Frame Module Class.<br><br>
 * 
 * The Frame class implements a global frame/canvas manager. This is what
 * is called a Module class because used as core module for the 
 * Ovoid.Instance class. A Module class is a part of Instance class and 
 * can be used only within the Instance class.<br><br>
 * 
 * The Frame class is used to define or retrieve render frame's 
 * attributes and behaviour according the HTML Canvas and browser 
 * client area.<br><br>
 * 
 * <blockcode>
 * <cc>// Overrides canvas style for manuel resize</cc>
 * Instance.Frame.setMode(Ovoid.FRAME_MANUAL_SIZE); <br>
 * <cc>// Resize the canvas/render frame</cc>
 * Instance.Frame.resize(800,600);
 * <cc>// Get the horizontal center of the frame in pixels</cc>
 * var ScreenX = Instance.Frame.size.v[0];<br>
 * var ScreenCenterX = Instance.Frame.center.v[0];<br>
 * </blockcode><br><br>
 * 
 * <b>Frame modes</b><br><br>
 * 
 * Frame class allows to override and modify the HTML defined canvas's 
 * size and behaviour by setting its mode. You can set the canvas frame
 * mode with the Frame.setMode() function. The available modes are the 
 * following:<br><br>
 * 
 * <ul>
 * <li><b>FRAME_MANUAL_SIZE</b><br>
 * Manual size canvas. This frame mode overrides canvas style and allow 
 * to manually define the canvas size.</li>
 * 
 * <li><b>FRAME_CLIENT_SIZE</b><br>
 * Client size canvas. This frame mode allow HTML style and integration 
 * defining the canvas size.</li>
 * 
 * <li><b>FRAME_STRETCHED</b><br>
 * Stretched render buffer. This frame mode allow HTML style and integration 
 * defining the canvas size but the render buffer size is override and
 * stretched to fit the canvas size.</li>
 * 
 * <li><b>FRAME_FULL_SCREEN</b> (Not yet implemented)<br>
 * Full screen size. This frame mode defines a fixed canvas size according to
 * the full screen size. NOTE: This frame mode is not yet implemented.</li>
 * </ul>
 * 
 * @param {object} i Instance object to register object to.
 * 
 */
Ovoid.Frame = function(i) {

  /** Instance parent */
  this._i = i;


  /** Current frame mode. */
  this.mode = 0;
  
  
  /** Canvas handle. */
  this.canvas = null;


  /** Client area handle. */
  this.page = null;


  /** Tnitial frame fixed size. */
  this.fixed = new Ovoid.Coord(0.0, 0.0, 0.0);


  /** Frame position relative to the screen. */
  this.position = new Ovoid.Coord(0.0, 0.0, 0.0);


  /** Current frame size. */
  this.size = new Ovoid.Coord(0.0, 0.0, 0.0);


  /** Current frame scroll position. */
  this.scroll = new Ovoid.Coord(0.0, 0.0, 0.0);
  
  
  /** Current frame center. */
  this.center = new Ovoid.Coord(0.0, 0.0, 0.0);


  /** Current frame screen orthographic projection matrix. */
  this.matrix = new Ovoid.Matrix4();


  /** Frame modification flag. */
  this.changed = false;
  
  
  /** Frame canvas style X padding + border + margin */
  this._offsetx = 0.0;

  
  /** Frame canvas style Y padding + border + margin */
  this._offsety = 0.0;

};


/**
 * Frame initialization.<br><br>
 * 
 * Global initialization method. This methode is called once during the library 
 * main initalization. It shouldn't be called a second time.
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Frame.prototype._init = function(canvas) {

  this.canvas = canvas;

  this.page = document.getElementsByTagName('BODY')[0];

  this.mode = this._i.opt_frameMode;
  
  switch(this.mode)
  {
    case 0: // FRAME_MANUAL_SIZE
      this.fixed.set(this._i.opt_frameWidth,this._i.opt_frameHeight,0.0);
    break;
    case 1: // FRAME_CLIENT_SIZE
      /* on garde la taille d'origine */
      this.fixed.set(this.canvas.clientWidth,this.canvas.clientHeight,0.0);
    break;
    case 2: // FRAME_FULL_SCREEN
    break;
    case 3: // FRAME_STRETCHED
      this.fixed.set(this._i.opt_frameWidth,this._i.opt_frameHeight,0.0);
    break;
  }
  
  /* definit la partie fixe de la matrice */
  this.matrix.m[10] = 1.0;
  this.matrix.m[3] = 0.0;
  this.matrix.m[7] = 0.0;
  this.matrix.m[11] = 0.0;
  this.matrix.m[12] = -1.0;
  this.matrix.m[13] = 1.0;
  this.matrix.m[14] = 0.0;
  this.matrix.m[15] = 1.0;
    
  /* mise à jour de la taille selon les parametres du mode */
  this._updatesize();
  
  /* Trouve les marges et padding du canvas */
  this._offsetx += document.body.parentNode.offsetLeft;
  this._offsetx += parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
  this._offsetx += parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
  this._offsety += document.body.parentNode.offsetTop;
  this._offsety += parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
  this._offsety += parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  
  /* mise à jour de la position selon les parametres du mode */
  this._updatepos();
  
  Ovoid._log(3, this._i, '.Frame._init', ' done');

  return true;
};


/**
 * Frame update.<br><br>
 * 
 * Global class update. This method is automaticaly called each
 * frame during the library main loop and is dedicated to refresh internal data. 
 * It shouldn't be called manually.
 */
Ovoid.Frame.prototype._update = function() {

  this.changed = false;
};


/**
 * Set frame mode.<br><br>
 * 
 * Sets or changes the current canvas frame mode according to the specified<br>
 * symbolic constant. This takes effect immediately.
 *
 * @param {int} mode Frame mode. Can be one of the following symbolic constants:
 * <br>
 * Ovoid.FRAME_MANUAL_SIZE,<br>
 * Ovoid.FRAME_CLIENT_SIZE,<br>
 * Ovoid.FRAME_FULL_SCREEN (Not yet implemented)<br>
 */
Ovoid.Frame.prototype.setMode = function(mode) {

  this.mode = mode;
  if (this.mode == 0 || this.mode == 0) {
    this.resize(this.fixed.v[0], this.fixed.v[1]);
  }

  this._updatepos();
  this._updatesize();
  
  this.changed = true;
};


/**
 * Resize frame.<br><br>
 * 
 * Resize the canvas according to the specified width and height values. This 
 * only takes effect in the fixed size frame mode.
 * 
 * @param {int} width Frame width.
 * @param {int} height Frame height.
 */
Ovoid.Frame.prototype.resize = function(width, height) {

  switch(this.mode)
  {
    case 0: // FRAME_MANUAL_SIZE
      this.fixed.set(width, height, 0.0);
    break;
    case 1: // FRAME_CLIENT_SIZE
      Ovoid._log(3, this._i, '.Frame.resize', ' resizing frame in FRAME_CLIENT_SIZE has no effect');
    break;
    case 2: // FRAME_FULL_SCREEN
    break;
    case 3: // FRAME_STRETCHED
      this.fixed.set(width, height, 0.0);
    break;
  }
  this._updatesize();
};


/**
 * Updating canvas frame position.<br><br>
 */
Ovoid.Frame.prototype._updatepos = function() {
  
  this.position.set(0.0, 0.0, 0.0);
  
  var o = this.canvas;
  while (o.tagName != 'BODY') {
    this.position.v[1] += o.offsetTop;
    this.position.v[0] += o.offsetLeft;
    o = o.offsetParent;
  }
  this.position.v[1] += this._offsety;
  this.position.v[0] += this._offsetx;
      
  this.scroll.set(window.pageXOffset, window.pageYOffset, 0.0);
  
  this.changed = true;
};


/**
 * Updating canvas frame size.<br><br>
 */
Ovoid.Frame.prototype._updatesize = function() {
  
  switch(this.mode)
  {
    case 0: // FRAME_MANUAL_SIZE
      this.canvas.width = this.fixed.v[0];
      this.canvas.height = this.fixed.v[1];
    break;
    case 1: // FRAME_CLIENT_SIZE
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    break;
    case 2: // FRAME_FULL_SCREEN
    break;
    case 3: // FRAME_STRETCHED
      var ox = this.canvas.width;
      var oy = this.canvas.height;
      this.canvas.width = this.fixed.v[0];
      this.canvas.height = this.fixed.v[1];
      this.canvas.clientWidth = ox;
      this.canvas.clientHeight = oy;
    break;
  }

  this.size.set(this.canvas.width,this.canvas.height,0.0);
  this.center.set(this.size.v[0]*0.5,this.size.v[1]*0.5,0.0);
  
  this.matrix.m[0] = 2.0 / this.size.v[0];
  this.matrix.m[5] = 2.0 / -this.size.v[1];
  
  this.changed = true;
  
};


/**
 * Resizing hack for firefox.<br><br>
 */
Ovoid.Frame.prototype._ffhack = function() {
  
  this.canvas.width = 2;
  this.canvas.height = 2;

  switch(this.mode)
  {
    case 0: // FRAME_MANUAL_SIZE
      this.canvas.width = this.fixed.v[0];
      this.canvas.height = this.fixed.v[1];
    break;
    case 1: // FRAME_CLIENT_SIZE
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    break;
    case 2: // FRAME_FULL_SCREEN
    break;
    case 3: // FRAME_STRETCHED
      this.canvas.width = this.fixed.v[0];
      this.canvas.height = this.fixed.v[1];
    break;
  }
}
