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
 * Frame global static class.
 *
 * @namespace Frame global class.
 * <br>
 * <br>
 * This class is a global static one, that means that it has no constructor and 
 * has only one instance. In the OvoiD.JS Library, global classes implements 
 * features for specific range of tasks. Global classes can be seen as several 
 * worker that accomplish their own job.
 * <br>
 * <br>
 * The Frame global class is the main OvoiD.JS Library's canvas frame manager. It 
 * provides all the methods that are directly related to the WebGL's canvas and
 * browser client area and screen.
 * <br>
 * <br>
 * <b>Frame modes</b>
 * <br>
 * Frame class allows to override and modify the HTML defined canvas's size and 
 * behaviour. Here is the current implemented frame modes:
 * <ul>
 * <li>FRAME_FIXED_SIZE</li>
 * Fixed size canvas. This frame mode defines a fixed size canvas. This is the 
 * standad default  canvas behaviour.
 * <br>
 * <br>
 * <li>FRAME_FULL_CLIENT</li>
 * Full client size canvas. This frame mode defines a variable size canvas 
 * according to the full browser's client area size.
 * <br>
 * <br>
 * <li>FRAME_FULL_SCREEN (Not yet implemented)</li>
 * Full screen size. This frame mode defines a fixed canvas size according to
 * the full screen size. NOTE: This frame mode is not yet implemented.
 * <br>
 * <br>
 * </ul>
 */
Ovoid.Frame = {};


/** frame option. Default starting frame mode. */
Ovoid.Frame.opt_frameMode = 0;


/** Canvas handle. */
Ovoid.Frame.canvas = null;


/** Client area handle. */
Ovoid.Frame.page = null;


/** Tnitial frame fixed size. */
Ovoid.Frame.fixed = new Ovoid.Coord(0.0, 0.0, 0.0);


/** Frame position relative to the screen. */
Ovoid.Frame.position = new Ovoid.Coord(0.0, 0.0, 0.0);


/** Current frame size. */
Ovoid.Frame.size = new Ovoid.Coord(0.0, 0.0, 0.0);


/** Current frame scroll position. */
Ovoid.Frame.scroll = new Ovoid.Coord(0.0, 0.0, 0.0);


/** Frame modification flag. */
Ovoid.Frame.changed = false;


/** Current frame mode. */
Ovoid.Frame.mode = 0;


/**
 * Handle window resizing.
 * This function is typically used as class's private member and should not be 
 * called independently.
 */
Ovoid.Frame._handleResize = function() {

  if (Ovoid.Frame.mode == 1) { /* Ovoid.FRAME_FULL_CLIENT */
    Ovoid.Frame.canvas.width = Ovoid.Frame.page.clientWidth;
    Ovoid.Frame.canvas.height = Ovoid.Frame.page.clientHeight;
    Ovoid.Frame.size.set(Ovoid.Frame.page.clientWidth, 
        Ovoid.Frame.page.clientHeight, 0.0);
    Ovoid.Frame.changed = true;
  }
};


/**
 * Handle window scrolling.
 * This function is typically used as class's private member and should not be 
 * called independently.
 */
Ovoid.Frame._handleScroll = function() {

  var o = Ovoid.Frame.canvas;
  Ovoid.Frame.position.set(0.0, 0.0, 0.0);
  while (o.tagName != 'BODY') {
    Ovoid.Frame.position.v[1] += o.offsetTop;
    Ovoid.Frame.position.v[0] += o.offsetLeft;
    o = o.offsetParent;
  }

  Ovoid.Frame.scroll.set(window.pageXOffset, window.pageYOffset, 0.0);

  Ovoid.Frame.changed = true;
};


/**
 * Frame initialization.
 * <br>
 * <br>
 * Global initialization method. This methode is called once during the Ovoid 
 * library's main initalization. It should not be called a second time.
 * 
 * @see Ovoid.init
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Frame.init = function(canvas) {

  Ovoid.log(3, 'Ovoid.Frame', 'initialization');

  Ovoid.Frame.canvas = document.getElementById(canvas);
  if (Ovoid.Frame.canvas == null)
  {
    Ovoid.log(1, 'Ovoid.Frame', "Undable to found canvas '" +
        canvas + "' in document.");
    return false;
  }
  
  Ovoid.Frame.page = document.getElementsByTagName('BODY')[0];

  Ovoid.Frame.mode = Ovoid.Frame.opt_frameMode;

  window.onresize = Ovoid.Frame._handleResize;
  window.onscroll = Ovoid.Frame._handleScroll;
  
  /* on garde la taille d'origine */
  Ovoid.Frame.fixed.set(Ovoid.Frame.canvas.width, 
      Ovoid.Frame.canvas.height, 0.0);

  if (Ovoid.Frame.mode == 0) /* Ovoid.FRAME_FIXED_SIZE */
  {
    Ovoid.Frame.size.set(Ovoid.Frame.canvas.width, 
        Ovoid.Frame.canvas.height, 0.0);
  }
  else
  {
    if (Ovoid.Frame.mode == 1) /* Ovoid.FRAME_FULL_CLIENT */
    {
      Ovoid.Frame.canvas.width = Ovoid.Frame.page.clientWidth;
      Ovoid.Frame.canvas.height = Ovoid.Frame.page.clientHeight;
      Ovoid.Frame.size.set(Ovoid.Frame.page.clientWidth, 
          Ovoid.Frame.page.clientHeight, 0.0);
    }
  }

  Ovoid.Frame.changed = true;

  return true;
};


/**
 * Frame update.
 * <br>
 * <br>
 * Global class's update method. This methode is automaticaly called at each
 * main loop and is dedicated to refresh class's internal data.
 * It shoulds not be called manually.
 */
Ovoid.Frame.update = function() {

  Ovoid.Frame.changed = false;
};


/**
 * Set frame mode.
 * <br>
 * <br>
 * Sets or changes the current canvas frame mode according to the specified one.
 * The modification take effect immediately.
 *
 * @param {int} mode Frame mode. Can be one of the following symbolic constants:
 * <br>
 * Ovoid.FRAME_FIXED_SIZE,<br>
 * Ovoid.FRAME_FULL_CLIENT,<br>
 * Ovoid.FRAME_FULL_SCREEN (Not yet implemented)<br>
 */
Ovoid.Frame.setMode = function(mode) {

  Ovoid.Frame.mode = mode;
  if (Ovoid.Frame.mode == 0) {
    
    Ovoid.Frame.resize(Ovoid.Frame.fixed.v[0], Ovoid.Frame.fixed.v[1]);
  } else {
    if (Ovoid.Frame.mode == 1) {
      Ovoid.Frame.canvas.width = Ovoid.Frame.page.clientWidth;
      Ovoid.Frame.canvas.height = Ovoid.Frame.page.clientHeight;
      Ovoid.Frame.size.set(Ovoid.Frame.page.clientWidth, 
          Ovoid.Frame.page.clientHeight, 0.0);
      /* Pour une raison etrange il faut le faire deux fois pour eviter 
       * d'avoir des marges à gauche et à droite */
      Ovoid.Frame.canvas.width = Ovoid.Frame.page.clientWidth;
      Ovoid.Frame.canvas.height = Ovoid.Frame.page.clientHeight;
    }
  }
  
  Ovoid.Frame.changed = true;
  
};


/**
 * Resize frame.
 * <br>
 * <br>
 * Resize the frame's canvas according to the given value. This method take only
 * effect in the fixed size frame mode.
 * 
 * @param {int} width Frame width.
 * @param {int} height Frame height.
 */
Ovoid.Frame.resize = function(width, height) {

    Ovoid.Frame.canvas.width = width;
    Ovoid.Frame.canvas.height = height;
    Ovoid.Frame.size.set(width, height, 0.0);
    Ovoid.Frame.changed = true;
};
