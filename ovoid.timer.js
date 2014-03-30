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
 * @class Timer Module Class.<br><br>
 * 
 * The Timer class implements a global time/timing manager. This is what
 * is called a Module class because used as core module for the 
 * Ovoid.Instance class. A Module class is a part of Instance class and 
 * can be used only within the Instance class.<br><br>
 * 
 * The Timer class is used to provide a global time reference and tools 
 * for the whole Instance.<br><br>
 * 
 * <blockcode>
 * <cc>// Get the elapsed time since the last frame in seconds</cc>
 * var qt = Instance.Timer.quantum;<br>
 * <cc>// Get current framerate</cc>
 * var fps = Instance.Timer.framerate;<br>
 * <cc>// Get current global clock</cc>
 * var clock = Instance.Timer.clock;<br>
 * </blockcode>
 * 
 * @param {object} i Instance object to register object to.
 * 
 */
Ovoid.Timer = function(i) {

  /** Instance parent */
  this._i = i;


  /** Current time. */
  this.clock = 0;


  /** Time delta since the last update. */
  this.quantum = 0;
  

  /** Average pre-seconds timer's update. */
  this.framerate = 0;

  
  /** Time counter array */
  this._ttime = [0.0, 0.0];
  
  
  /** Frame rate clock */
  this._fclock = 0.0;
  
  
  /** Frame rate counter */
  this._fcount = 0;

};

/**
 * Timer initialization.<br><br>
 * 
 * Global initialization method. This methode is called once during the library 
 * main initalization. It shouldn't be called a second time.
 * 
 * @see Ovoid.init
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Timer.prototype._init = function() {

  this._reset();
  Ovoid._log(3, this._i, '.Timer._init', ' done');
  return true;
};


/**
 * Timer update.<br><br>
 * 
 * Global class update. This method is automaticaly called each
 * frame during the library main loop and is dedicated to refresh internal data. 
 * It shouldn't be called manually.
 */
Ovoid.Timer.prototype._update = function() {

  this._ttime[0] = new Date().getTime();
  this.quantum = (this._ttime[0] - this._ttime[1]) * 0.001;
  this._ttime[1] = this._ttime[0];
  this.clock += this.quantum;
  
  /* calcul le framerate tous les 0.1 secondes */
  this._fclock+=this.quantum;
  if(this._fclock > 0.1) {
    this.framerate = Math.floor(this._fcount / this._fclock);
    this._fcount = 0;
    this._fclock = 0.0;
  }
  this._fcount++;
};


/**
 * Timer reset.<br><br>
 * 
 * Reset timer.
 */
Ovoid.Timer.prototype._reset = function() {

  this._ttime[0] = this._ttime[1] = new Date().getTime();
  this.quantum = 0.010;
  this.clock = 0;
};


