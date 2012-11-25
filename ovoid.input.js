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
 * @namespace Input global class.<br><br>
 * 
 * The Input class implements a global user inputs manager. It is a global 
 * static (namespace) class. The Input class is typically both used to query 
 * user input data and bind keys or buttons event to custom functions.<br><br>
 * 
 * <blockcode> <codecomment>// Check whether the keycode 14 is held</codecomment><br>
 * if(Ovoid.Input.intHl[14]) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp; <codecomment>// Do something</codecomment><br>
 * }<br>
 * <codecomment>// Creates some key-binding </codecomment><br>
 * <codecomment>// A function to rotate our camera in -X</codecomment><br>
 * function lookright() {<br>
 * &nbsp;&nbsp;Ovoid.Node("camera").rotateXyz(0.0, -0.05, 0.0);<br>
 * };<br><br>
 * 
 * <codecomment>// A function to rotate our camera in X</codecomment><br>
 * function lookleft() {<br>
 * &nbsp;&nbsp;Ovoid.Node("camera").rotateXyz(0.0, 0.05, 0.0);<br>
 * };<br><br>
 * 
 * <codecomment>// Define the input trigger to call lookright and lookleft functions</codecomment><br>
 * Ovoid.Input.trigger(Ovoid.CTR_HELD, 39, Ovoid.HELD, lookright);<br>
 * Ovoid.Input.trigger(Ovoid.CTR_HELD, Ovoid.KB_LARROW, Ovoid.HELD, lookleft);<br>
 * </blockcode><br>
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
 * The node grabbing dedicated functions are <code>grabNode</code> 
 * and <code>grabRelease</code>.<br><br>
 * 
 * For more information about node-grabbing usage, see the 
 * <code>Ovoid.Action</code> node documentation page.
 * 
 * <b>Mouse behaviours and 3D cursor</b><br><br>
 * 
 * All the mouse behaviours and cursor screen position are stored in the 
 * <code>mouseWheelDelta</code>, <code>mousePosition</code> and 
 * <code>mouseVelocity</code> members. These members describes the standard 
 * mouse parameters collected through the browser.<br><br>
 * 
 * The <code>mouseCursor</code>
 * member is a 4x4 transformation matrix (Ovoid.Matrix4) who describes the mouse
 * cursor position in 3D space in the current 3D world through an unprojection 
 * mechanism. This parameter is valid ONLY if the mouse picking system is 
 * enabled.
 * 
 * For more information about Picking mode you should refer to the
 * <a href="Ovoid.Drawer.php"><code>Ovoid.Drawer</code></a> global class  
 * documentation.<br><br>
 * 
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


/** Current mouse unprojected cursor world matrix */
Ovoid.Input.mouseCursor = new Ovoid.Matrix4();


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


/** Input GamePad axis */
Ovoid.Input.gpAxis = new Ovoid.Point(0.0, 0.0, 0.0, 0.0);


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
 * Handle GamePad Axis.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventGpAxis = function(e) {

 // Ne fonctionne pas pour le moment
 
};

/**
 * Handle GamePad Connect.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid.Input._eventGpConnect = function(e) {

 // Ne fonctionne pas pour le moment
 
};


/**
 * Input initialization.<br><br>
 * 
 * Global initialization method. This methode is called once during the library 
 * main initalization. It shouldn't be called a second time.
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

  // Inutiles, aucun browser standard compatible pour le moment
  window.addEventListener("MozGamepadConnected", Ovoid.Input._eventGpConnect, false);
  window.addEventListener("MozGamepadAxisMove", Ovoid.Input._eventGpAxis, false);

  return true;
};


/**
 * Input update.<br><br>
 * 
 * Global class update. This method is automaticaly called each
 * frame during the library main loop and is dedicated to refresh internal data. 
 * It shouldn't be called manually.
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
 * Set or modify an input trigger.<br><br>
 * 
 * Sets or modifies an input combinaison who trigger a custom function. The 
 * specified function will be called each time the input combinaison occur.
 * 
 * @param {enum} m Special Held key modifier, can be null or one of the 
 * following symbolic constants:<br>
 * Ovoid.CTR_HELD,<br>
 * Ovoid.ALT_HELD,<br>
 * Ovoid.SHF_HELD,<br>
 * Ovoid.LSU_HELD,<br>
 * Ovoid.RSU_HELD<br>
 * 
 * @param {int} k Key/Mouse button numeric code, or one of the corresponding 
 * symbolic constants. The whole symbolic constants list is available in the
 * _global_ documentation page.
 * 
 * @param {enum} s Key or button status, can be one of the following symbolic 
 * constants:<br>
 * Ovoid.UP (released),<br>
 * Ovoid.DOWN (pressed),<br>
 * Ovoid.HELD <br>
 * 
 * @param {Function} f Trigger function.
 * 
 * @see Ovoid.Input
 * @see _global_
 */
Ovoid.Input.trigger = function(m, s, k, f) {

  if (s > 2) {
    Ovoid.log(2, "Ovoid.Input.trigger", "Invalid key status code.");
    return;
  }
  
  if (k > 255) {
    Ovoid.log(2, "Ovoid.Input.trigger", "Invalid key code.");
    return;
  }
  
  if (!(f instanceof Function)) {
    Ovoid.log(2, "Ovoid.Input.trigger", "Non-Function instance given as trigger function");
    return;
  }

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
Ovoid.Input.grabNode = function(node) {
  
  Ovoid.Input.grabbedNode = node;
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
Ovoid.Input.grabRelease = function() {

  Ovoid.Input.grabbedNode = null;
};
