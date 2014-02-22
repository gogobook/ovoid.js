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
 * along with this program.  If not, see <link url="http://www.gnu.org/licenses/">.
 */


/** OvoiD.JS main namespace.
 * 
 * @namespace OvoiD.JS main namespace.<br><br>
 * 
 * The Ovoid namespace gathers all the global and top level options and methods.<br><br>
 * 
 * <b>Global Methods</b><br><br>
 * 
 * Global methods provides library's fundamental features:
 * 
 * <ul>
 * <li><a href="#.init"><code>Ovoid.init</code></a> (Library main initialization)</li>
 * <li><a href="#.onload"><code>Ovoid.onload</code></a> (Overridable onload method)</li>
 * <li><a href="#.onloop"><code>Ovoid.onloop</code></a> (Overridable onloop method)</li>
 * <li><a href="#.error"><code>Ovoid.error</code></a> (Display error)</li>
 * <li><a href="#.log"><code>Ovoid.log</code></a> (Log message and write console)</li>
 * <li><a href="#.getLog"><code>Ovoid.getLog</code></a> (Get the log string)</li>
 * </ul>
 * 
 * <b>Utility Methods</b><br><br>
 * 
 * Utility methods are some small functions for common i/o or mathematical tasks:
 * 
 * <ul>
 * <li><a href="#.deg2Rad"><code>Ovoid.deg2Rad</code></a> (Degrees to radians conversion)</li>
 * <li><a href="#.rad2Deg"><code>Ovoid.rad2Deg</code></a> (Radians to degrees conversion)</li>
 * <li><a href="#.isPowerOfTwo"><code>Ovoid.isPowerOfTwo</code></a> (Is power of two test)</li>
 * <li><a href="#.noise"><code>Ovoid.noise</code></a> (Perlin noise value generator)</li>
 * <li><a href="#.randInt"><code>Ovoid.randInt</code></a> (Get random integer)</li>
 * <li><a href="#.randFloat"><code>Ovoid.randFloat</code></a> (Get random float)</li>
 * <li><a href="#.getContent"><code>Ovoid.getContent</code></a> (Get file content)</li>
 * <li><a href="#.getXml"><code>Ovoid.getXml</code></a> (Get file parsed XML content)</li>
 * <li><a href="#.getJson"><code>Ovoid.getJson</code></a> (Get file parsed JSON content)</li>
 * <li><a href="#.getBinary"><code>Ovoid.getBinary</code></a> (Get file binary content)</li>
 * <li><a href="#.extractName"><code>Ovoid.extractName</code></a> (Exctract file name from url)</li>
 * <li><a href="#.extractExt"><code>Ovoid.extractExt</code></a> (Exctract file extention from url)</li>
 * <li><a href="#.frnd"><code>Ovoid.frnd</code></a> (Decimal round)</li>
 * </ul>
 * 
 * <b>Top-Level Prealoading Methods</b><br><br>
 * 
 * Preloading methods are top-level shortcuts methods to facilitate external 
 * content preloading. These methods mainly refere to the 
 * <code>Ovoid.Loader</code> global class.
 * 
 * <ul>
 * <li><a href="#.includeShader"><code>Ovoid.includeShader</code></a> (Include GLSL shader)</li>
 * <li><a href="#.includeTexture"><code>Ovoid.includeTexture</code></a> (Include texture)</li>
 * <li><a href="#.includeAudio"><code>Ovoid.includeAudio</code></a> (Include audio)</li>
 * <li><a href="#.includeDaeMesh"><code>Ovoid.includeDaeMesh</code></a> (Include meshs from DAE scene)</li>
 * <li><a href="#.includeDaeAnimation"><code>Ovoid.includeDaeAnimation</code></a> (Include animations from DAE scene)</li>
 * <li><a href="#.includeDaeScene"><code>Ovoid.includeDaeScene</code></a> (Include DAE scene)</li>
 * <li><a href="#.includeOjsScene"><code>Ovoid.includeOjsScene</code></a> (Include OJSON scene)</li>
 * </ul>
 * 
 * <b>Top-Level Interface methods</b><br><br>
 * 
 * Interface methods are top-level shortcuts methods to facilitate the most 
 * common tasks.
 * 
 * <ul>
 * <li><a href="#.useScene"><code>Ovoid.useScene</code></a> (Set active scene)</li>
 * <li><a href="#.useCamera"><code>Ovoid.useCamera</code></a> (Set active camera)</li>
 * <li><a href="#.search"><code>Ovoid.search</code></a> (Search node)</li>
 * <li><a href="#.searchMatches"><code>Ovoid.searchMatches</code></a> (Search nodes by matches)</li>
 * <li><a href="#.cameraYaw"><code>Ovoid.cameraYaw</code></a> (Adjust active camera yaw)</li>
 * <li><a href="#.cameraPitch"><code>Ovoid.cameraPitch</code></a> (Adjust active camera pitch)</li>
 * <li><a href="#.cameraRoll"><code>Ovoid.cameraRoll</code></a> (Adjust active camera roll)</li>
 * <li><a href="#.cameraDolly"><code>Ovoid.cameraDolly</code></a> (Adjust active camera dolly)</li>
 * <li><a href="#.move"><code>Ovoid.move</code></a> (Move a Transform node)</li>
 * <li><a href="#.rotate"><code>Ovoid.rotate</code></a> (Rotate a Transform node)</li>
 * <li><a href="#.scale"><code>Ovoid.scale</code></a> (Scale a Transform node)</li>
 * <li><a href="#.trackRewind"><code>Ovoid.trackRewind</code></a> (Rewind a Track node)</li>
 * <li><a href="#.trackPlay"><code>Ovoid.trackPlay</code></a> (Play a Track node)</li>
 * <li><a href="#.trackPause"><code>Ovoid.trackPause</code></a> (Pause a Track node)</li>
 * <li><a href="#.soundRewind"><code>Ovoid.soundRewind</code></a> (Rewind a Sound node)</li>
 * <li><a href="#.soundPlay"><code>Ovoid.soundPlay</code></a> (Play a Sound node)</li>
 * <li><a href="#.soundPause"><code>Ovoid.soundPause</code></a> (Pause a Sound node)</li>
 * <li><a href="#.inputTrigger"><code>Ovoid.inputTrigger</code></a> (Set or modify an input trigger)</li>
 * <li><a href="#.setAction"><code>Ovoid.setAction</code></a> (Assign an Action node to one or several pickable nodes)</li>
 * <li><a href="#.setConstraint"><code>Ovoid.setConstraint</code></a> (Assign Constraint nodes to one or several Transform nodes)</li>
 * <li><a href="#.grabNode"><code>Ovoid.grabNode</code></a> (Grab node)</li>
 * <li><a href="#.grabRelease"><code>Ovoid.grabRelease</code></a> (Release grab)</li>
 * </ul>
 * 
 */
var Ovoid = {};


/** full log string */
Ovoid._log = '';


/** log error count. */
Ovoid._lerror = 0;


/** log fatal. */
Ovoid._lfatal = false;


/** log warning count. */
Ovoid._lwarning = 0;


/** The latest WebGL error code */
Ovoid._glerror = 0;


/** 
 * Log verbosity level.<br><br>
 * 
 * Verbosity level correspond to log severity level, and are the following:<br><br>
 * 0:Fatal error,<br>
 * 1:Error,<br>
 * 2:Warning,<br>
 * 3:Comment<br>
 */
Ovoid.opt_logLevel = 2;


/** Display a global error.<br><br>
 * 
 * Stops the library process and display a general error message.
 *
 * @param {int} code Error code. The error codes are the following ones:<br> 
 * 1: Non-compatible Web Browser, <br>
 * 2: WebGL Context Exception,<br>
 * 3: WebGL Context Not Found,<br>
 * 4: Initialization Failled,<br>
 * 5: Preloading Error,<br>
 * 6: Errors Flood,<br>
 * 7: On loop runtime error,<br>
 * 8: On load runtime error<br>
 * 
 * @param {string} message The error message string.
*/
Ovoid.error = function(code, message) {

  /* Delete WebGL Context */
  Ovoid.gl = null;
  /* Delete Audio Context */
  Ovoid.al = null;
  
  /* ne rien faire si pas en debug-mode */
  if(!Ovoid.opt_debugMode)
    return;
    
  var canvas;
  /* Retrouve le canvas pour le reduire a taille minimum */
  var canvas_list = document.getElementsByTagName('canvas');
  if (canvas_list.length) {
    var canvas = canvas_list[0];
    canvas.style.width = "1px";
    canvas.style.height = "1px";
    canvas.width = 1;
    canvas.height = 1;
  }
  
  var content = "Ovoid.JS error code";
  switch(code)
  {
    case 1:
      content += "#1 (webGL context failled)";
      break;
    case 2:
      content += "#2 (webGL context exception)";
      break;
    case 3:
      content += "#3 (webGL context not found)";
      break;
    case 4:
      content += "#4 (library init failled)";
      break;
    case 5:
      content += "#5 (runtime on-preload error.";
      break;
    case 6:
      content += "#6 (too much errors - self abort)";
      break;
    case 7:
      content += "#7 (runtime on-loop error)";
    case 8:
      content += "#8 (runtime on-load error)";
      break;
    default:
      content += code + "#U (unregistered error)";
      break;
  }
  content += " :: " + message + "<br><br>";
  var logs = Ovoid._log;
  logs = logs.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  logs = logs.replace(/</g, '&lt;');
  logs = logs.replace(/>/g, '&gt;');
  logs = logs.replace(/\n/g, '<br>');
  content += "log backtrace:<br>" + logs;
  document.write(content);

};

/* Les très TRES vielles versions ne connaissant pas l'objet console... */
if(typeof(console) == "undefined") {

  Ovoid.error(1, "console object unavailable (update your browser !)");
}

/**
 * Write a message in log string.<br><br>
 * 
 * Append a message in the library global log string and output to the browser
 * javascript console.<br><br>
 * 
 * The written line is formated as follow:<br><br>
 * 
 * <blockcode>
 * [hh:mm:ss] LEVEL: scope :: message. <br>
 * </blockcode><br><br>
 * 
 * @see Ovoid.getLog
 * @see Ovoid.opt_logLevel
 * 
 * @param {int} level Log severity/verbosity level. Log levels are the following 
 * ones:<br>
 * 0: FATAL,<br>
 * 1: ERROR,<br>
 * 2: WARNING,<br>
 * 3: NOTICE<br>
 * 
 * @param {string} scope Log scope. Usually the class or function from 
 * where the log is written.
 *
 * @param {string} message Details of the log message.
*/
Ovoid.log = function(level, scope, message) {

  if (message)
  {
    if (level <= Ovoid.opt_logLevel)
    {
      var log;
      var time = new Date();
      var timestamp = '[' + time.getHours() +
              ':' + time.getMinutes() +
              ':' + time.getSeconds() + '] ';

      switch (level)
      {
        case 0:
          log = timestamp + 'FATAL: ' + scope +
                  ':: ' + message + '\n';

          Ovoid._lerror++;
          Ovoid._lfatal = true;
          break;
        case 1:
          log = timestamp + 'ERROR: ' + scope +
                  ':: ' + message + '\n';

          this._lerror++;
          break;
        case 2:
          log = timestamp + 'WARNING: ' + scope +
                  ':: ' + message + '\n';

          Ovoid._lwarning++;
          break;
        case 3:
          log = timestamp + 'NOTICE: ' + scope +
                  ':: ' + message + '\n';
          break;
      }
      
      Ovoid._log = log + Ovoid._log;
      console.log(log);
      if (Ovoid._lerror > 10) {
        Ovoid.error(6, "No more, 10 errors, it's enought !");
      }

    }
  }
};


/* Preliminary incompatible browser detection */
if (typeof(Float32Array) == "undefined" || typeof(Uint16Array) == "undefined") {
  Ovoid.log(0, "Ovoid", 'Undefined Float32Array/Uint16Array objects.');
  Ovoid.error(1, "ArrayBuffer objects unavailable");
}
