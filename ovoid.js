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


/** Main namespace.
 * 
 * @namespace Main namespace.
 * 
 * This si the main OvoiD.JS namespace. You'll find here all the top-level methods.
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


/** Environment option.
 * Log verbosity level.
 * 
 * <br><br>Verbosity level correspond to log severity level, and are the following:
 * 0:Fatal error,
 * 1:Error,
 * 2:Warning,
 * 3:Comment 
 * 
 * <br><br>For example a value of 0 will log fatal errors only and a value of 3 will
 * log all of fatal errors, errors, warnings and comments. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_logLevel = 2;


/** Display a global error.
 * <br>
 * <br>
 * This function stop the main application loop and display an anxiogenic 
 * error message on the window. This function is used to display internal 
 * library's errors and can be used to display custom error with the 
 * appropriate error code.
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
  
  /* compose le contenu html */
  var content = '<div style="text-align:center;font-family:sans-serif;margin:20px;border-radius:16px;background-color:#343434;color:#fa0;padding:20px;">';
  content += '<h1><b><big>OvoiD.JS Error X(</big></b></h1><span style="color:#ddd;">';

  var comment = "<p>Sorry, the page you requested uses the <i>OvoiD.JS's WebGL Wrapper</i> and the library's script has stopped ";
  var browser = '</p><p>We recommands you to use the latest version of one of the followings:</p><table cellpadding=10px style="border:0;margin:auto;text-align:center;"><tr><td><a style="color:#fa0;" href="http://www.google.com/chrome/">Chrome<a></td><td><a style="color:#fa0;" href="http://www.mozilla.org/firefox/">Firefox<a></div></td></tr><tr><td><a style="color:#fa0;" href="http://www.opera.com/browser/">Opera</a></td><td><a style="color:#fa0;" href="http://www.apple.com/safari/">Safari<a></td></tr></table>';
  var dcode = '';
  
  switch(code)
  {
    case 1:
      dcode += "01 - Non-compatible Web Browser";
      comment += 'because your browser seems to be outdated or rudimentary and does not provide some essentials fonctionnalities.';
      comment += browser;
      break;
    case 2:
      dcode += "02 - WebGL Context Exception";
      comment += 'because an exception occured during the <b><a style="color:#fa0;" href="http://www.khronos.org/webgl/">WebGL<a></b> context creation. This error may be caused by not properly installed or outdated graphic drivers.';
      break;
    case 3:
      dcode += "03 - WebGL Context Not Found";
      comment += 'because no suitable <b><a style="color:#fa0;" href="http://www.khronos.org/webgl/">WebGL<a></b> implementation was found. You probably use an incompatible or outdated browser.';
      comment += browser;
      break;
    case 4:
      dcode += "04 - Initialization Failled";
      comment += "because it failed to initialize its own base components. This error may be caused by one or more global classes which encountered errors.";
      break;
    case 5:
      dcode += "05 - Preloading Error";
      comment += "because an error occurend during the data preloading process. This error may be caused by corruped loaded data or importation classes's exceptions.";
      break;
    case 6:
      dcode += "06 - Errors Flood";
      comment += "because of too many errors was reported. This error is raised when too many errors was encountered, this generaly means that something goes really wrong.";
      break;
    case 7:
      dcode += "07 - On Loop Runtime Error";
      comment += "because an exception occured during the main runtime onloop process. This error may be caused by an exception thrown within the main client program loop method (Ovoid.onloop()).";
      break;
    case 8:
      dcode += "08 - On Load Runtime Error";
      comment += "because an exception occured during the main runtime onload process. This error may be caused by an exception thrown within the main client program load method (Ovoid.onload()).";
      break;
    default:
      dcode += code + " - Unknown or custom Error";
      comment += "Unknown or custom exception thrown.";
      break;
  }

  content += "<h2><b>" + dcode + "</b></h2>";
  content += comment + '<hr>';
  content += "</p><small>If you currently are developing an application using <i>OvoiD.JS's WebGL Wrapper</i> and think this error should not occur and/or is a library's issue, you can send a bug repport with the bellow error message and comments at:<br> <b>root (@) ovoid.org</b><br><br>";
  content += 'You also can consult the OvoiD.JS reference documentation at: <br> <a style="color:#fa0;" href="http://www.ovoid.org/js/doc/">http://www.ovoid.org/js/doc/</a></small><p>';
  content += '<div style="text-align:left;padding:10px;border-radius:8px;background-color:#eee;color:#000;font-family:courier,monospace;font-size:10pt;margin:0px;">';
  content += '- Message - <br><span style="color:#a00">' + dcode + " :: " + message + '</span><br>';
  content += '- last log/backtrace -<br>';
  var logs = Ovoid._log.replace(/\n/g, '<br>');
  logs = logs.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  content += '<span style="color:#00a">' + logs;
  content += '</div></div>';
  document.write(content);

};

/* Les très TRES vielles versions ne connaissant pas l'objet console... */
if(typeof(console) == "undefined") {

  Ovoid.error(1, "console object unavailable (update your browser !)");
}

/**
 * Write a message in log string.
 * <br>
 * <br>
 * This function allow to write a preformated error, warning or information 
 * message in the log string and the javascript's console. This function is 
 * used to write library's internal log messages and can be used to write 
 * custom logs. The submited message can be effectively written or not 
 * depending on the current log level setting. For more informations see 
 * the <code>Ovoid.opt_logLevel</code> option details.
 * <br>
 * <br>
 * The written line is preformated as follow:
 * <br>
 * <br>
 * <blockcode>
 * [hh:mm:ss] LEVEL: scope :: message. <br>
 * </blockcode>
 * <br>
 * <br>
 * Note that log isn't  written in a file, but in string. You can get the log 
 * string content at any time using the <code>Ovoid.getLog</code> function.
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
 * @param {string} scope Log scope. commonly the class or function from 
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
