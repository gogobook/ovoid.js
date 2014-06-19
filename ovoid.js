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
 * along with this program.  If not, see <link url="http://www.gnu.org/licenses/">.
 */

"use strict";
/** Ovoid.JS root namespace.
 * 
 * @namespace Ovoid.JS global methods and members.
 * 
 * Ovoid.JS provides some global functions for essential tasks, they are
 * members or the main namespace.<br><br>
 * 
 * <b>Instance creation</b><br><br>
 * 
 * In order to do something in Ovoid.JS you have to create an  
 * application Instance. The Instance object is the main class that 
 * provides the main entries to the Ovoid.JS API. The Instance object 
 * is NOT a singleton, it is more like a thread, you can create as many 
 * Instance as you want. However, an Instance object must be registered 
 * to the main API thread, this is why there is a dedicated method to 
 * Instance creation. To create a new instance you should use the 
 * <c>Ovoid.newInstance()</c> method.<br><br>
 * 
 * An Instance has many options, the most of them can be modified after 
 * the Instance's initialization by simply change the appropriate member 
 * of the instance. However, some options must be passed before the 
 * initialization to take effect, and other should be defined before 
 * by convenience. This is why there is an Ovoid.Config class that 
 * provides a copy of all Instance options. You can use this object to 
 * make some presets and pass it for the Instance creation. After the
 * Instance's creation, the Config object can be reused for a new
 * Instance creation or deleted.<br><br>
 * 
 * <blockcode>
 * <cc>// Create a new config object and sets some options</cc><br>
 * var myConf = Ovoid.newConfig();
 * myConf.opt_GLalpha = true;<cc>// WebGL context option, must be defined at initialization to override the default Ovoid.JS setting</cc><br>
 * myConf.opt_logLevel = 3;<br>
 * myConf.opt_debugMode = true;<br>
 * myConf.opt_renderClearColor = [0.5, 0.5, 0.5, 1.0];<br>
 * <cc>// Create a new instance</cc><br>
 * var Instance = Ovoid.newInstance("myOvoid", "myCanvas", myConf);<br>
 * <cc>// The Config object is now useless</cc><br>
 * delete myConf;<br>
 * <cc>// Creation successfull ? </cc><br>
 * if(Instance) {<br>
 * &nbsp;&nbsp; <cc>// Continue to define your app here </cc>
 * &nbsp;&nbsp; <cc>// ... </cc>
 * &nbsp;&nbsp; <cc>// Finaly, start the Instance </cc>
 * &nbsp;&nbsp;Instance.start();<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * For more details and documentations about Ovoid.JS Instance, see the 
 * <a href="Ovoid.Instance.html">Ovoid.Instance</a> 
 * class reference documentation.<br><br>
 * 
 * <b>Utilities methods</b><br><br>
 * 
 * Ovoid.JS provides some small utility methods. You can use these 
 * methods at you convenience.<br><br>
 * 
 * <ul>
 * <li><c>Ovoid.deg2Rad()</c> Converts degrees to radians.</li>
 * <li><c>Ovoid.rad2Deg()</c> Converts radians to degrees.</li>
 * <li><c>Ovoid.isPowerOfTwo()</c> Checks if a number is a power of two.</li>
 * <li><c>Ovoid.noise()</c> Generates perlin noise random value.</li>
 * <li><c>Ovoid.randInt()</c> Generates random integer value.</li>
 * <li><c>Ovoid.randFloat()</c> Generates random float value.</li>
 * <li><c>Ovoid.frnd()</c> Rounds a number at its fourth decimal.</li>
 * <li><c>Ovoid.genFontmap()</c> Generates font mapping image.</li>
 * <li><c>Ovoid.extractName()</c> Extracts name component of a filename.</li>
 * <li><c>Ovoid.extractExt()</c> Extracts extention component of a filename.</li>
 * </ul><br><br>
 * 
 */
var Ovoid = {};

/** Ovoid.JS Instance objects array. */
Ovoid._inst = new Array();


/** Request Animation Frame function alias */
Ovoid._curBrower = "null";


/** Current browser's user-agent. */
Ovoid._ua = navigator.userAgent.toLowerCase();


/** Display a global error.<br><br>
 * 
 * Stops the library process and display a general error message.
 * 
 * @param {int} code Error code. The error codes are the following ones:<br>
 * 0: general error, <br>
 * 1: instance WebGL context error, <br>
 * 2: instance init error,<br>
 * 3: instance preload error,<br>
 * 4: instance onload error,<br>
 * 5: instance runtime error,<br>
 * 6: instance aborted<br>
 * 
 * @param {object} instance Ovoid.JS instance object.
 * 
 * @param {string} message The error message string.
*/
Ovoid._err = function(code, instance, message) {

  var stderr = null; // string erreur standard
  var csterr = null; // string erreur custom
  
  if (instance) {
    csterr = instance.opt_customErrContent;
    if (instance.opt_debugMode || !csterr) {
       stderr = "Ovoid.JS '" + instance.name + "' Instance ";
    }
  } else {
    stderr = "Ovoid.JS Global ";
  }

  if(stderr) {
    switch(code)
    {
      case 1:
        stderr += "WebGL context error";
        break;
      case 2:
        stderr += "init error";
        break;
      case 3:
        stderr += "preload error";
        break;
      case 4:
        stderr += "onload error";
        break;
      case 5:
        stderr += "runtime error";
        break;
      case 6:
        stderr += "aborted";
        break;
      case 7:
        stderr += "browser error";
        break;
      default: /* 0 */
        stderr += "general error";
        break;
    }
    stderr += " :: " + message + "<br><br>";
  }
  
  if(code < 3 || code > 5) {
    
    /* desinitialise l'instance */
    instance._runstat = 3;
    
    /* Retrouve le parent du canvas pour ecrir l'erreur */
    var DOMnode
    if(instance.Frame.canvas) {
      DOMnode = instance.Frame.canvas.parentNode;
    } else {
      DOMnode = document.getElementsByTagName('BODY')[0];
    }

    /* Affiche l'erreur standard ou custom selon cas */
    if(stderr) {
      if(instance) {
         var logs = instance._log;
        logs = logs.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        logs = logs.replace(/</g, '&lt;');
        logs = logs.replace(/>/g, '&gt;');
        logs = logs.replace(/\n/g, '<br>');
        DOMnode.innerHTML = stderr + "Logs backtrace:<br>" + logs;
      } else {
        DOMnode.innerHTML = stderr;
      }
    }
  } else {
    console.log(stderr);
  }
};


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
 * @param {object} instance Ovoid.JS instance object.
 * 
 * @param {string} scope Log scope. Usually the class or function from 
 * where the log is written.
 *
 * @param {string} message Details of the log message.
*/
Ovoid._log = function(level, instance, scope, message) {

  if (message) {
    if(instance) {
      if (level > instance.opt_logLevel)
        return;
    }
    /* variables pour construir le log */
    var root, type, tstm, log;
    /* timestamp */
    tstm = '['+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+']';
    /* scope racine */
    (instance)?root=instance.name:root="Ovoid";
    /* type de log */
    switch (level)
    {
      case 0:
        type='FATAL:';
        if(instance) instance._nerror++;
        break;
      case 1:
        type='ERROR:';
        if(instance) instance._nerror++;
        break;
      case 2:
        type='WARNING:';
        break;
      case 3:
        type='NOTICE:';
        break;
    }
    
    /* assemblage */
    log = tstm+' '+type+' @'+root+scope+'::'+message;
    /* on balance sur la console */
    console.log(log);
    /* ajoute aux logs instance */
    if(instance) {
      instance._log = log + instance._log;
      /* control de flux d'erreur */
      if (instance._nerror > 10) {
        Ovoid._err(6, instance, "Too many errors");
      }
    }
  }
};


/**
 * Main library start and loop function.<br><br>
 */
Ovoid._run = function() {

  var i = Ovoid._inst.length;
  while(i--) {
    switch(Ovoid._inst[i]._runstat)
    {
      case 3: // instance en pause
      break;
      case 2: // instance en runtime
        Ovoid._inst[i]._mainloop();
      break;
      case 1: // instance en preload
        Ovoid._inst[i]._loadstep();
      break;
      case 0: // instance non démarré
        Ovoid._inst[i]._loadstart();
      break;
      case -1: // instance en creation
      break;
      default: // a priori impossible
        /* on note l'instance */
        var inst = Ovoid._inst[i];
        /* Delete WebGL Context */
        inst.gl = null;
        /* Delete Audio Context */
        inst.al = null;
        /* on enlève l'instance de la liste */
        Ovoid._inst.splice(i, 1);
        /* on delete l'instance */
        inst = null;
      break;
    }
  }
  // Le plus rapide, mais moins stable..
  //window.setTimeout(Ovoid._run,0);
  // Moins rapide mais plus stable...
  window.requestAnimationFrame(Ovoid._run);
};


/**
 * Create Ovoid.JS Config.<br><br>
 * 
 * Create a new Ovoid.JS instance Config object.<br><br>
 * 
 * @return {object} New Ovoid.JS Config object.
 */
Ovoid.newConfig = function() {
  
  return new Ovoid.Config();
};


/**
 * Create a new Ovoid.JS Instance.<br><br>
 * 
 * Create and initialize a new Ovoid.JS Instance.<br><br>
 * 
 * For more details about Ovoid.JS Instance see the 
 * <a href="Ovoid.Instance.html">Ovoid.Instance</a> class 
 * documentation reference.
 * 
 * @param {string} name Indicative name of the new Instance.
 * @param {string} canvas HTML canvas name to initialize the Instance to.
 * @param {object} [options] Options object to copy options.
 * 
 * @return {object} New Ovoid.JS Insance object.
 */
Ovoid.newInstance = function(name, canvas, options) {
  
  var c = document.getElementById(canvas);
  if(c) {
    if(c.tagName.toUpperCase() == "CANVAS") {
      var i = new Ovoid.Instance(name);
      Ovoid._log(3,null,""," new instance '"+name+"' on canvas '"+canvas+"'");
      if(options instanceof Ovoid.Config) {
        i._setoptions(options);
      }
      if(i._init(c)) {
        Ovoid._inst.push(i);
        Ovoid._log(3,null,""," instance '"+name+"' added in stack.");
      } else {
        i = null;
      }
      return i;
    } else {
      Ovoid._log(3,null,""," '"+canvas+"' is not a CANVAS.");
      return null;
    }
  } else {
    Ovoid._log(3,null,""," DOM object '"+canvas+"' not found.");
    return null;
  }
};


/**
 * Degrees to radians conversion.<br><br>
 * 
 * Converts the specified value from degrees to radians.
 *
 * @param {float} degrees Degrees value.
 *
 * @return {float} Radians value.
 */
Ovoid.deg2Rad = function(degrees) {

  /* radians = degrees * PI / 180 */
  return degrees * 0.017453293;
  /* / 180 = * 0.00555 ; PI * 0.00555 = 0.017453293 */
};


/**
 * Radians to degrees conversion.<br><br>
 * 
 * Converts the specified value from radians to degrees.
 *
 * @param {float} radians Radians value.
 *
 * @return {float} Degrees value.
 */
Ovoid.rad2Deg = function(radians) {

  /* degres = radians / PI * 180 */
  return radians * 57.295779513;
  /* / 3.14159... = * 0.31830; 0.31830 * 180 = 57.295779513 */
};


/**
 * Power of two number.<br><br>
 * 
 * Checks whether a number is a power of two.
 *
 * @param {int} val Number to check.
 *
 * @return {bool} True if the specified number is power of two,
 * false otherwise.
 */
Ovoid.isPowerOfTwo = function(val) {

  return (val & (val - 1)) == 0;
};


/**
 * Get perlin noise.<br><br>
 * 
 * Returns a perlin noise value according to the specified seed.
 *
 * @param {int} f Perlin noise seed.
 *
 * @return {bool} Perlin noise value.
 */
Ovoid.noise = function(f) {
  //f = (f << 13) ^ f;
  return ( 1.0 - ( (f * (f * f * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
};


/**
 * Get random integer.<br><br>
 * 
 * Returns a random integer between the specified values.
 *
 * @param {int} min Range min interger value.
 * @param {int} max Range max interger value.
 *
 * @return {bool} Random integer between min and max.
 */
Ovoid.randInt = function(min, max) {

		return min + Math.round((Math.random() * (max - min)));
};


/**
 * Get random float.<br><br>
 * 
 * Returns a random float between the specified values.
 *
 * @param {int} min Range min float value.
 * @param {int} max Range max float value.
 *
 * @return {bool} Random float between min and max.
 */
Ovoid.randFloat = function(min, max) {

		return min + (Math.random() * (max - min));
};


/**
 * Decimal round.<br><br>
 * 
 * Rounds a number at its fourth decimal.
 *
 * @param {float} f Float value to be rounded.
 *
 * @return {string} Rounded float.
 */
Ovoid.frnd = function(f) {

  return (Math.round(f*1000) / 1000);
};


/**
 * Generate fontmap image.<br><br>
 * 
 * Generates a fontmap image on HTML canvas with the given parameters.
 *
 * @param {int} msize Map size in pixel.
 * @param {int} csize Cell size in pixel.
 * @param {int} sx X shift to draw char.
 * @param {int} sy Y shift to draw char.
 * @param {string} font Y Font format description.
 *
 * @return {object} HTML canvas object of the generated fontmap.
 */
Ovoid.genFontmap = function(msize, csize, sx, sy, font) {

  /* generation de la fontmap par defaut */
  var cv = document.createElement('canvas');
  cv.width = msize;
  cv.height = msize;
  var ct = cv.getContext('2d');
  ct.font = font;
  ct.fillStyle = 'rgba(255,255,255,255)';
  ct.textAlign = 'center';
  ct.textBaseline = 'middle';

  /* la fontmap est divisée en celules de même taille */
  // <----map---->
  // +---+---+---+
  // | A | B | C | <-- celule (L = 0)
  // +---+---+---+
  // | a | b | c | (L = 1)
  // +---+---+---+
  // | 1 | 2 | 3 | (L = 2)
  // +---+---+---+

  var c, n;     // char code ASCII, nombre de char
  var M = ((msize/csize)*(msize/csize)); // nombre max de char dans la map
  var C;        // numero de colone de celule
  var L;        // numero de linge de celule
  
  for(c = 32, n = 0; n < M; c++, n++ ) {
    
    C = Math.floor(n % (msize / csize));
    L = Math.floor(n / (msize / csize));
    
    ct.fillText(String.fromCharCode(c),((C*csize)+sx),((L*csize)+sy));
  }
  
  /* A cause de Firefox (encore lui, décidément), il faut manipuler les
  pixels RGB pour les rendre "blancs" car le canvas par defaut n'est pas
  netoyé, et fillrect ou clearrect n'y fait rien. */
  
  var px = ct.getImageData(0,0,msize,msize);
  for(var i = 0, s = px.data.length; i < s; i+=4){
    px.data[i] = 255;   // R
    px.data[i+1] = 255; // G
    px.data[i+2] = 255; // B
  }
  
  return px;
};


/**
 * Exctract file name.<br><br>
 * 
 * Extrats the file name from the specified full URL string.
 *
 * @param {string} url URL string to extract name.
 * @param {bool} ext Keep the file extention.
 *
 * @return {string} Extracted file name.
 */
Ovoid.extractName = function(url, ext) {

  var name = url.split('/');
  name = name[name.length-1];
  if(!ext) {
    name = name.split('.');
    name = name[name.length-2]
  }
  return name;
};


/**
 * Exctract file extention.<br><br>
 * 
 * Extrats the file extention from the specified full URL string.
 *
 * @param {string} url URL string to extract extention.
 *
 * @return {string} Extracted file extention.
 */
Ovoid.extractExt = function(url) {

  var ext = url.split('/');
  ext = ext[ext.length-1];
  ext = ext.split('.');
  return ext[ext.length-1];
};


/**
 * Compact string according Javascript syntax.<br><br>
 * 
 * Deletes useless spaces, comments and cariage returns of an string 
 * according the javascript syntax.
 *
 * @param {string} str String to compact.
 *
 * @return {string} Compacted string.
 */
Ovoid.compact = function(str) {
  
  var s = new String(str);
  /* remplace certains espaces par un caractere '`' pour certains
   * mots clefs, pour éviter de réduire ces espaces lors du compactage,
   * c'est pas très fin, mais ça marche. */
  s = s.replace(/ in /g,"`in`");
  s = s.replace(/var /g,"var`");
  s = s.replace(/new /g,"new`");
  s = s.replace(/const /g,"const`");
  s = s.replace(/delete /g,"delete`");
  s = s.replace(/ typeof /g,"`typeof`");
  s = s.replace(/ instanceof /g,"`instanceof`");
  // finalement on split
  s = s.split('');
  var o = '';
  var l = s.length;
  var i = 0;
  while(i < l) {
    // Strings ""
    if(s[i] == "\"") {
      o += s[i++];
      while(s[i] != "\"") o += s[i++];
    }
    // Strings ''
    if(s[i] == "'") {
      o += s[i++];
      while(s[i] != "'") o += s[i++];
    }
    // Commentaires //
    if(s[i] == "/" && s[i+1] == "/") {
      while(s[i] != "\n") i++;
    }
    // Commentaires /**/
    if(s[i] == "/" && s[i+1] == "*") {
      while(!(s[i] == "*" && s[i+1] == "/")) i++;
      i+=2;
    }
    // espaces, retour chariots etc...
    if(s[i] == "\n" || s[i] == "\r" || s[i] == " " || s[i] == "\t") {
      i++; 
    } else {
      o += s[i++];
    }
  }
  // remplace le carctere '`' par des espaces.
  o = o.replace(/`in`/g," in ");
  o = o.replace(/var`/g,"var ");
  o = o.replace(/new`/g,"new ");
  o = o.replace(/const`/g,"const ");
  o = o.replace(/delete`/g,"delete ");
  o = o.replace(/`typeof`/g," typeof ");
  o = o.replace(/`instanceof`/g," instanceof ");
  
  return o;
}


/**
 * Handle Mouse button down.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventMouseDn = function(e) {

  var i = Ovoid._inst.length;
  while(i--) {
    Ovoid._inst[i].Input.intDn[e.button] = true;
    Ovoid._inst[i].Input.intUp[e.button] = false;
    Ovoid._inst[i].Input.intHl[e.button] = true;
  }
};


/**
 * Handle Mouse button up.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventMouseUp = function(e) {

  var i = Ovoid._inst.length;
  while(i--) {
    Ovoid._inst[i].Input.intDn[e.button] = false;
    Ovoid._inst[i].Input.intUp[e.button] = true;
    Ovoid._inst[i].Input.intHl[e.button] = false;
  }
};


/**
 * Handle Mouse move.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventMouseMove = function(e) {

  var i = Ovoid._inst.length;
  while(i--) {
    /* calcul de la position relative de la souris */
    var x = e.clientX - Ovoid._inst[i].Frame.position.v[0] + Ovoid._inst[i].Frame.scroll.v[0];
    var y = e.clientY - Ovoid._inst[i].Frame.position.v[1] + Ovoid._inst[i].Frame.scroll.v[1];

    Ovoid._inst[i].Input.mouseVelocity.set(
        Ovoid._inst[i].Input.mousePosition.v[0] - x, 
        Ovoid._inst[i].Input.mousePosition.v[1] - y,
        0.0);
        
    Ovoid._inst[i].Input.mousePosition.set(x, y, 0.0);
  }
};


/**
 * Handle Mouse wheel.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventMouseWheel = function(e) {

  var i = Ovoid._inst.length;
  while(i--) {
    if (!e) /* IE */
      e = window.event;
    
    var w;
    if (e.wheelDelta) { /* IE/Opera */
      w = e.wheelDelta/120;
    } else if (e.detail) { /* Mozilla */
      w = -e.detail/3;
    }

    if (w > 0) {
      Ovoid._inst[i].Input.intUp[7] = true;
    } else if (w < 0) {
      Ovoid._inst[i].Input.intDn[7] = true;
    }
    Ovoid._inst[i].Input.mouseWheelDelta = w;
  }
}


/**
 * Handle key down.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventKeyDn = function(e) {
  var i = Ovoid._inst.length;
  while(i--) {
    Ovoid._inst[i].Input.intDn[e.keyCode] = true;
    Ovoid._inst[i].Input.intHl[e.keyCode] = true;
  }
};


/**
 * Handle key up.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventKeyUp = function(e) {

  var i = Ovoid._inst.length;
  while(i--) {
    Ovoid._inst[i].Input.intUp[e.keyCode] = true;
    Ovoid._inst[i].Input.intHl[e.keyCode] = false;
  }
};


/**
 * Handle GamePad Axis.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventGpAxis = function(e) {

 // Ne fonctionne pas pour le moment
 
};

/**
 * Handle GamePad Connect.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Object} e DOM Event object.
 */
Ovoid._eventGpConnect = function(e) {

 // Ne fonctionne pas pour le moment
 
};

/**
 * Handle window resizing.
 * This function is typically used as class's private member and should not be 
 * called independently.
 */
Ovoid._handleResize = function() {

  var i = Ovoid._inst.length;
  while(i--) {
    switch(Ovoid._inst[i].Frame.mode) 
    {
      case 0: // FRAME_MANUAL_SIZE
        Ovoid._inst[i].Frame._updatepos();
      break;
      case 1: // FRAME_CLIENT_SIZE
        Ovoid._inst[i].Frame._updatesize();
        Ovoid._inst[i].Frame._updatepos();
      break;
      case 2: // FRAME_FULL_SCREEN
      break;
    }
  }
  
};


/**
 * Handle window scrolling.
 * This function is typically used as class's private member and should not be 
 * called independently.
 */
Ovoid._handleScroll = function() {

  var i = Ovoid._inst.length;
  while(i--) {
    Ovoid._inst[i].Frame._updatepos();
  }
};


/* ----------------- Opération globales préliminaire ---------------- */

// Detection du navigateur
if(/opera/.test(Ovoid._ua))Ovoid._curBrower="opera";
if(/safari/.test(Ovoid._ua))Ovoid._curBrower="safari";
if(/chrome/.test(Ovoid._ua))Ovoid._curBrower="chrome";
if(/msie/.test(Ovoid._ua))Ovoid._curBrower="msie";
if(/firefox/.test(Ovoid._ua))Ovoid._curBrower="firefox";
Ovoid._log(3,null,""," user agent: "+Ovoid._ua+"");
Ovoid._log(3,null,""," browser '"+Ovoid._curBrower+"' detected");

// Attribution des fonctions d'evenements clavier/souris.
window.onmousedown = Ovoid._eventMouseDn;
window.onmouseup = Ovoid._eventMouseUp;
window.onmousemove = Ovoid._eventMouseMove;
window.onmousewheel = Ovoid._eventMouseWheel;

window.addEventListener('DOMMouseScroll', Ovoid._eventMouseWheel, false);

document.onkeydown = Ovoid._eventKeyDn;
document.onkeyup = Ovoid._eventKeyUp;

// Inutiles, aucun browser standard compatible pour le moment
window.addEventListener("MozGamepadConnected", Ovoid._eventGpConnect, false);
window.addEventListener("MozGamepadAxisMove", Ovoid._eventGpAxis, false);

// Attribution des fonction d'evenements fenetre client.
window.onresize = Ovoid._handleResize;
window.onscroll = Ovoid._handleScroll;

// On lance finalement l'API
Ovoid._run();
Ovoid._log(3,null,""," API is now running");

