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
 * Timer global static class.
 *
 * @namespace Timer global class.<br><br>
 * 
 * The Timer class implements a global time/timing manager. It is a global 
 * static (namespace) class. The Timer class provides the common clock and times 
 * parameter calculated over each frame's refresh.<br><br>
 * 
 * <blockcode>
 * <codecomment>// Get the elapsed time since the last frame in seconds</codecomment>
 * var qt = Ovoid.Timer.quantum;<br>
 * <codecomment>// Get current framerate</codecomment>
 * var fps = Ovoid.Timer.framerate;<br>
 * <codecomment>// Get current global clock</codecomment>
 * var clock = Ovoid.Timer.clock;<br>
 * </blockcode>
 */
Ovoid.Timer = {};


/** Current time. */
Ovoid.Timer.clock = 0;


/** Time delta since the last update. */
Ovoid.Timer.quantum = 0;

/** Average pre-seconds timer's update. */
Ovoid.Timer.framerate = 0;


/** Current time. */
Ovoid.Timer._timecurr = 0;


/** Time of the last update. */
Ovoid.Timer._timelast = 0;


/** Time of the last update. */
Ovoid.Timer._timeq = 0;


/** Frame counter for framerate. */
Ovoid.Timer._fcount = 0;


/** Time cumulator for framerate. */
Ovoid.Timer._fcumul = 0.0;


/** Level of performance fps counter. */
Ovoid.Timer._lopfps = 0;


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
Ovoid.Timer.init = function() {

  Ovoid.log(3, 'Ovoid.Timer', 'initialization');
  Ovoid.Timer._timecurr = Ovoid.Timer._timelast = new Date().getTime();
  return true;
};


/**
 * Timer update.<br><br>
 * 
 * Global class update. This method is automaticaly called each
 * frame during the library main loop and is dedicated to refresh internal data. 
 * It shouldn't be called manually.
 */
Ovoid.Timer.update = function() {

  Ovoid.Timer.clock = new Date().getTime();
  
  Ovoid.Timer._timecurr = Ovoid.Timer.clock;
  Ovoid.Timer._timeq = (Ovoid.Timer._timecurr - Ovoid.Timer._timelast) * 0.001;
  Ovoid.Timer._timelast = Ovoid.Timer.clock;

  if(Ovoid.Timer._timeq > 0.1) Ovoid.Timer._timeq = 0.01;
  
  Ovoid.Timer._fcount++;
  Ovoid.Timer._fcumul+=Ovoid.Timer._timeq;
  
  if(Ovoid.Timer._fcumul > 0.5) {
    Ovoid.Timer.framerate = Math.floor(Ovoid.Timer._fcount / Ovoid.Timer._fcumul);
    Ovoid.Timer.quantum = Ovoid.Timer._fcumul / Ovoid.Timer._fcount;
    Ovoid.Timer._lopfps = Ovoid.Timer.framerate;
    Ovoid.Timer._fcount = 0;
    Ovoid.Timer._fcumul = 0.0;
  }
};


/**
 * Wait a moment.<br><br>
 * 
 * Waits according the the specified duration. This freezes the global 
 * execution.
 *
 * @param {float} s Duration in seconds.
 */
Ovoid.Timer.wait = function(s) {

  var a = 0.0;
  var t = new Date().getTime();
  var l = t;

  while (a < s) {
    t = new Date().getTime();
    a += (t - l) * 0.001;
    l = t;
  }
};



