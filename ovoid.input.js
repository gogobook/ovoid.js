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
 * @class Input Module Class..<br><br>
 * 
 * The Input class implements a global user inputs manager. This is what
 * is called a Module class because used as core module for the 
 * Ovoid.Instance class. A Module class is a part of Instance class and 
 * can be used only within the Instance class.<br><br>
 * 
 * The Timer class is used to provide a global user inputs data and 
 * tools for the whole Instance.<br><br>
 * 
 * <blockcode> <cc>// Check whether the keycode 14 is held</cc><br>
 * if(Instance.Input.intHl[14]) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp; <cc>// Do something</cc><br>
 * }<br>
 * <cc>// Creates some key-binding </cc><br>
 * <cc>// A function to rotate our camera in -X</cc><br>
 * function lookright() {<br>
 * &nbsp;&nbsp;Instance.Scene.activeCamera.rotateXyz(-0.1,0.0,0.0,Ovoid.LOCAL);<br>
 * };<br><br>
 * 
 * <cc>// A function to rotate our camera in X</cc><br>
 * function lookleft() {<br>
 * &nbsp;&nbsp;Instance.Scene.activeCamera.rotateXyz(0.1,0.0,0.0,Ovoid.LOCAL);<br>
 * };<br><br>
 * 
 * <cc>// Define the input trigger to call lookright and lookleft functions</cc><br>
 * Instance.Input.setTrigger(Ovoid.CTR_HELD, 39, Ovoid.HELD, lookright);<br>
 * Instance.Input.setTrigger(Ovoid.CTR_HELD, Ovoid.KB_LARROW, Ovoid.HELD, lookleft);<br>
 * </blockcode><br><br>
 * 
 * <b>Keyboard events</b><br><br>
 * 
 * Keyboard events are collected and stored in three arrays of 256 
 * integers who describes pressed, released or helded state of the keys.
 * <c>intDn</c> collect all the key-down (pressed) events, 
 * <c>intUp</c> collect all the key-up (released) events and
 * <c>intHl</c> collect all the key-held events. A value of 1 at 
 * the index array matching the key code number means that the 
 * event is detected for this key.<br><br>
 * 
 * <b>Mouse behaviours and 3D cursor</b><br><br>
 * 
 * All the mouse behaviours and cursor screen position are stored in the 
 * <c>mouseWheelDelta</c>, <c>mousePosition</c> and 
 * <c>mouseVelocity</c> members. These members describes the standard 
 * mouse parameters collected through the browser.<br><br>
 * 
 * The <c>mouseCursor</c>
 * member is a 4x4 transformation matrix (Ovoid.Matrix4) who describes the mouse
 * cursor position in 3D space in the current 3D world through an unprojection 
 * mechanism. This parameter is valid ONLY if the mouse picking system is 
 * enabled.<br><br>
 * 
 * For more information about Picking mode you should refer to the
 * <a href="Ovoid.Drawer.php"><c>Ovoid.Drawer</c></a> Module class  
 * documentation.<br><br>
 * 
 * <b>Input triggers</b><br><br>
 * 
 * Input class provide mecanism to bind key or mouse buttons combots to 
 * any user defined function. When the defined key or mouse buttons 
 * combots is detected Input class will automaticaly call the 
 * user defined function. This mecanism is called an input trigger and 
 * can be defined via the <c>setTrigger()</c> method.<br><br>
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
 * The node grabbing dedicated functions are <c>grabNode</c> 
 * and <c>grabRelease</c>.<br><br>
 * 
 * For more information about node-grabbing usage, see the 
 * <a href="Ovoid.Action.php>Ovoid.Action</a> node documentation page.
 * 
 * @param {object} i Instance object to register object to.
 * 
 */
Ovoid.Input = function(i) {
  
    /** Instance parent */
  this._i = i;


  /** Input signal mouse wheel Detla */
  this.mouseWheel = new Array(3);


  /** Current mouse wheel Position */
  this.mouseWheelDelta = 0;


  /** Current mouse position */
  this.mousePosition = new Ovoid.Coord(0.0, 0.0, 0.0);


  /** Current mouse velocity */
  this.mouseVelocity = new Ovoid.Vector(0.0, 0.0, 0.0);


  /** Current mouse unprojected cursor world matrix */
  this.mouseCursor = new Ovoid.Matrix4();


  /** Current grabbed node */
  this.grabbedNode = null;


  /** Current UID of the node who is under the mouse pointer */
  this.mouseOverUid = 0;


  /** Current UID of the node who the mouse pointer enter */
  this.mouseEnterUid = 0;


  /** Current UID of the node who the mouse pointer leave */
  this.mouseLeaveUid = 0;


  /** Current node who is under the mouse pointer */
  this.mouseOverNode = null;


  /** Input signal Key/button Down array */
  this.intDn = new Uint8Array(256);


  /** Input signal Key/button Up array */
  this.intUp = new Uint8Array(256);


  /** Input signal Key/button Held array */
  this.intHl = new Uint8Array(256);


  /** Input GamePad axis */
  this.gpAxis = new Ovoid.Point(0.0, 0.0, 0.0, 0.0);


  /** Input On Key/button triggers array */
  this._onInt = [new Array(), new Array(), new Array()];


  /** Input On Control-Key/button triggers array */
  this._onCTRInt = [new Array(), new Array(), new Array()];


  /** Input On Alt-Key/button triggers array */
  this._onALTInt = [new Array(), new Array(), new Array()];


  /** Input On Shift-Key/button triggers array */
  this._onSHFInt = [new Array(), new Array(), new Array()];


  /** Input On Left Super-Key/button triggers array */
  this._onLSUInt = [new Array(), new Array(), new Array()];


  /** Input On Right Super-Key/button triggers array */
  this._onRSUInt = [new Array(), new Array(), new Array()];

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
Ovoid.Input.prototype._init = function() {

/* Ici tout a été déménagé en zone globale, voir ovoid.js */
  Ovoid._log(3, this._i, '.Input._init', ' done');
  return true;
};


/**
 * Input update.<br><br>
 * 
 * Global class update. This method is automaticaly called each
 * frame during the library main loop and is dedicated to refresh internal data. 
 * It shouldn't be called manually.
 */
Ovoid.Input.prototype._update = function() {

  /* target array */
  var tary = this._onInt;
  
  /* Shift held */
  if (this.intHl[16])
    tary = this._onSHFInt;
  /* Ctrl held */
  if (this.intHl[17])
    tary = this._onCTRInt;
  /* Alt held */
  if (this.intHl[18])
    tary = this._onALTInt;
  /* Left super */
  if (this.intHl[91])
    tary = this._onLSUInt;
  /* Right super */
  if (this.intHl[92])
    tary = this._onRSUInt;
    
  try { /* handle exceptions car des fonctions sont custom */
      
    var j;
    /* Triggers key up */
    j = tary[0].length;
    while (j--) {
     if (this.intUp[tary[0][j][0]])
        tary[0][j][1]();
    }
    /* Triggers key down */
    j = tary[1].length;
    while (j--) {
     if (this.intDn[tary[1][j][0]])
        tary[1][j][1]();
    }
    /* Triggers key held */
    j = tary[2].length;
    while (j--) {
     if (this.intHl[tary[2][j][0]])
        tary[2][j][1]();
    }
  } catch(e) {
    Ovoid._log(0, this._i, '.Input._update',
          ' custom trigger function exception thrown:\n' + e.stack);
  }
  this.mouseVelocity.set(0.0, 0.0, 0.0);
  this.mouseWheelDelta = 0;
  
  for (var i = 0; i < 255; i++) {
    this.intDn[i] = false;
    this.intUp[i] = false;
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
 * &nbsp;&nbsp;myObject.rotateXyz(0.0, -0.05, 0.0);<br>
 * };<br>
 * <br>
 * function lookleft() {<br>
 * &nbsp;&nbsp;myObject.rotateXyz(0.0, 0.05, 0.0);<br>
 * };<br>
 * <br>
 * myOvoid.Input.setTrigger(Ovoid.CTR_HELD, 39, Ovoid.HELD, lookright);<br>
 * myOvoid.Input.setTrigger(Ovoid.CTR_HELD, Ovoid.KB_LARROW, Ovoid.HELD, lookleft);<br>
 * </blockcode><br><br>
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
Ovoid.Input.prototype.setTrigger = function(m, k, s, f) {

  if (s > 2) {
    Ovoid._log(2, this._i, ".Input.setTrigger", " invalid key status code.");
    return;
  }
  
  if (k > 255) {
    Ovoid._log(2, this._i, ".Input.setTrigger", " invalid key code.");
    return;
  }
  
  if (!(f instanceof Function)) {
    Ovoid._log(2, this._i, ".Input.setTrigger", " non-Function instance given as trigger function");
    return;
  }

  var trigger = new Array(2);
  trigger[0] = k;
  trigger[1] = f;
  
  /* Pour chaque modifeur CTR, ALT SHF ou autre :
   * 
   * Trigger Array = Keystate [u] ->  [nT] -> [key] 
   *                                       -> [fonction]
   *                          [h] ->  [nT] -> [key] 
   *                                       -> [fonction]
   *                          [d] ->  [nT] -> [key] 
   *                                       -> [fonction]
   * 
   * */
  
  /* target array */
  var tary;
  
  switch (m)
  {
    case 1: /* CTR_HELD */
      tary = this._onCTRInt
    break;
    case 2: /* ALT_HELD */
      tary = this._onALTInt
    break;
    case 3: /* SHF_HELD */
      tary = this._onSHFInt
    break;
    case 4: /* LSU_HELD */
      tary = this._onLSUInt
    break;
    case 5: /* RSU_HELD */
      tary = this._onRSUInt
    break;
    default: /* No modifier */
      tary = this._onInt
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
 * <c>Ovoid.Action</c> node documentation page.
 * 
 * @param {Node} node Node object to be grabbed.
*/
Ovoid.Input.prototype.grabNode = function(node) {
  
  this.grabbedNode = node;
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
 * <c>Ovoid.Action</c> node documentation page.
 */
Ovoid.Input.prototype.grabRelease = function() {

  this.grabbedNode = null;
};
