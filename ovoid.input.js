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
 * Input global static class.
 *
 * @namespace Input global class.
 * <br>
 * <br>
 * This class is a global static one, that means that it has no constructor and 
 * has only one instance. In the OvoiD.JS Library, global classes implements 
 * features for specific range of tasks. Global classes can be seen as several 
 * worker that accomplish their own job.
 * <br>
 * <br>
 * The Input global class is the main OvoiD.JS Library's inputs manager. It 
 * provides all the methods that are directly related to the mouse and
 * keyboard inputs events.
 * <br>
 */
Ovoid.Input = {};


/** Input signal mouse wheel Detla */
Ovoid.Input.mouseWheel = new Array(3);


/** Current mouse wheel Position */
Ovoid.Input.mouseWheelDelta = 0;


/** Current mouse position */
Ovoid.Input.mousePosition = new Ovoid.Coord(0.0, 0.0, 0.0);


/** Current mouse velocity */
Ovoid.Input.mouseVelocity = new Ovoid.Vector(0.0, 0.0, 0.0);


/** Current grabbed node */
Ovoid.Input.grabbedNode = null;


/** Current UID of the node who is under the mouse pointer */
Ovoid.Input.mouseOverUid = 0;


/** Current UID of the node who the mouse pointer enter */
Ovoid.Input.mouseEnterUid = 0;


/** Current UID of the node who the mouse pointer leave */
Ovoid.Input.mouseLeaveUid = 0;


/** Current node who is under the mouse pointer */
Ovoid.Input.mouseOverNode = null;


/** Input signal Key/button Down array */
Ovoid.Input.intDn = new Uint8Array(256);


/** Input signal Key/button Up array */
Ovoid.Input.intUp = new Uint8Array(256);


/** Input signal Key/button Held array */
Ovoid.Input.intHl = new Uint8Array(256);


/** Input On Key/button triggers array */
Ovoid.Input.onInt = [new Array(), new Array(), new Array()];


/** Input On Control-Key/button triggers array */
Ovoid.Input.onCTRInt = [new Array(), new Array(), new Array()];


/** Input On Alt-Key/button triggers array */
Ovoid.Input.onALTInt = [new Array(), new Array(), new Array()];


/** Input On Shift-Key/button triggers array */
Ovoid.Input.onSHFInt = [new Array(), new Array(), new Array()];


/** Input On Left Super-Key/button triggers array */
Ovoid.Input.onLSUInt = [new Array(), new Array(), new Array()];


/** Input On Right Super-Key/button triggers array */
Ovoid.Input.onRSUInt = [new Array(), new Array(), new Array()];


/**
 * Handle Mouse button down.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventMouseDn = function(e) {

  Ovoid.Input.intDn[e.button] = true;
  Ovoid.Input.intUp[e.button] = false;
  Ovoid.Input.intHl[e.button] = true;

};


/**
 * Handle Mouse button up.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventMouseUp = function(e) {

  Ovoid.Input.intDn[e.button] = false;
  Ovoid.Input.intUp[e.button] = true;
  Ovoid.Input.intHl[e.button] = false;
};


/**
 * Handle Mouse move.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventMouseMove = function(e) {

  /* calcul de la position relative de la souris */
  var x = e.clientX - Ovoid.Frame.position.v[0] + Ovoid.Frame.scroll.v[0];
  var y = e.clientY - Ovoid.Frame.position.v[1] + Ovoid.Frame.scroll.v[1];

  Ovoid.Input.mouseVelocity.set(Ovoid.Input.mousePosition.v[0] - x, 
      Ovoid.Input.mousePosition.v[1] - y,
      0.0);
      
  Ovoid.Input.mousePosition.set(x, y, 0.0);
};


/**
 * Handle Mouse wheel.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventMouseWheel = function(e) {

  if (!e) /* IE */
    e = window.event;
  
  var w;
  if (e.wheelDelta) { /* IE/Opera */
    w = e.wheelDelta/120;
  } else if (e.detail) { /* Mozilla */
    w = -e.detail/3;
  }

  if (w > 0) {
    Ovoid.Input.intUp[7] = true;
  } else if (w < 0) {
    Ovoid.Input.intDn[7] = true;
  }
  Ovoid.Input.mouseWheelDelta = w;
}


/**
 * Handle key down.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventKeyDn = function(e) {

  Ovoid.Input.intDn[e.keyCode] = true;
  Ovoid.Input.intHl[e.keyCode] = true;
};


/**
 * Handle key up.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventKeyUp = function(e) {

  Ovoid.Input.intUp[e.keyCode] = true;
  Ovoid.Input.intHl[e.keyCode] = false;
};


/**
 * Input initialization.
 * <br>
 * <br>
 * Global initialization method. This methode is called once during the Ovoid 
 * library's main initalization. It should not be called a second time.
 * 
 * @see Ovoid.init
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Input.init = function() {

  Ovoid.log(3, 'Ovoid.Input', 'initialization');

  window.onmousedown = Ovoid.Input._eventMouseDn;
  window.onmouseup = Ovoid.Input._eventMouseUp;
  window.onmousemove = Ovoid.Input._eventMouseMove;
  window.onmousewheel = Ovoid.Input._eventMouseWheel;
  
  window.addEventListener('DOMMouseScroll', 
      Ovoid.Input._eventMouseWheel, 
      false);
  
  document.onkeydown = Ovoid.Input._eventKeyDn;
  document.onkeyup = Ovoid.Input._eventKeyUp;

  return true;
};


/**
 * Input update.
 * <br>
 * <br>
 * Global class's update method. This methode is automaticaly called at each
 * main loop and is dedicated to refresh class's internal data.
 * It shoulds not be called manually.
 */
Ovoid.Input.update = function() {

  /* target array */
  var tary = Ovoid.Input.onInt;
  
  /* Shift held */
  if (Ovoid.Input.intHl[16])
    tary = Ovoid.Input.onSHFInt;
  /* Ctrl held */
  if (Ovoid.Input.intHl[17])
    tary = Ovoid.Input.onCTRInt;
  /* Alt held */
  if (Ovoid.Input.intHl[18])
    tary = Ovoid.Input.onALTInt;
  /* Left super */
  if (Ovoid.Input.intHl[91])
    tary = Ovoid.Input.onLSUInt;
  /* Right super */
  if (Ovoid.Input.intHl[92])
    tary = Ovoid.Input.onRSUInt;

  var j;
  /* Triggers key up */
  j = tary[0].length;
  while (j--) {
   if (Ovoid.Input.intUp[tary[0][j][0]])
      tary[0][j][1]();
  }
  /* Triggers key down */
  j = tary[1].length;
  while (j--) {
   if (Ovoid.Input.intDn[tary[1][j][0]])
      tary[1][j][1]();
  }
  /* Triggers key held */
  j = tary[2].length;
  while (j--) {
   if (Ovoid.Input.intHl[tary[2][j][0]])
      tary[2][j][1]();
  }

  Ovoid.Input.mouseVelocity.set(0.0, 0.0, 0.0);
  Ovoid.Input.mouseWheelDelta = 0;
  
  for (var i = 0; i < 255; i++) {
    Ovoid.Input.intDn[i] = false;
    Ovoid.Input.intUp[i] = false;
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
 * Ovoid.Input.trigger(Ovoid.CTR_HELD, 39, Ovoid.HELD, lookright);<br>
 * Ovoid.Input.trigger(Ovoid.CTR_HELD, Ovoid.KB_LARROW, Ovoid.HELD, lookleft);<br>
 * </blockcode>
 * <br>
 * <br>
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
Ovoid.Input.trigger = function(m, s, k, f) {

  if (s > 2) 
    return;
  
  if (k > 255)
    return;
  
  if (!(f instanceof Function))
    return;

  var trigger = new Array(2);
  trigger[0] = k;
  trigger[1] = f;
  
  /* target array */
  var tary;
  
  switch (m)
  {
    case 1: /* CTR_HELD */
      tary = Ovoid.Input.onCTRInt
    break;
    case 2: /* ALT_HELD */
      tary = Ovoid.Input.onALTInt
    break;
    case 3: /* SHF_HELD */
      tary = Ovoid.Input.onSHFInt
    break;
    case 4: /* LSU_HELD */
      tary = Ovoid.Input.onLSUInt
    break;
    case 5: /* RSU_HELD */
      tary = Ovoid.Input.onRSUInt
    break;
    default: /* No modifier */
      tary = Ovoid.Input.onInt
    break;
  }
  
  /* On verifie que le trigger n'est pas deja définie */
  var i = tary[s].length;
  while(i--) {
    if (tary[s][i][0] == k) {
      tary[s][i] = trigger;
      return;
    }
  }

  /* si non on ajoute */
  tary[s].push(trigger);

};
