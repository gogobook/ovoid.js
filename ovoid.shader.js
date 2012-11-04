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
 * Create a Shader object.
 * 
 * @class Shader program object.<br><br>
 * 
 * The Shader object is a wrapper interface class for accessing and interact
 * with GLSL shaders. It is used to load GLSL shader sources then compile, 
 * link and wrap.<br><br>
 * 
 * <blockcode>
 * var phong = new Ovoid.Shader();<br>
 * phong.loadSource("phong.vs", "phong.fs", "custom.xml")<br>
 * phong.linkWrap();<br>
 * </blockcode><br><br>
 * 
 * <b>Why Wrapping Shader Programs</b><br><br>
 * 
 * Work with shaders by interacting with uniforms or attributes using the WebGL 
 * built-in functions quickly becomes confusing depending on the shader's 
 * complexity. The usual way consist on hard-coding the variables assignation 
 * which creates a rigid program where shaders must always have the same 
 * variables names to fit with the hard-coded assignation. Wrapping shader 
 * allow an unified access to the variables of any custom shader without 
 * rewriting the core rendering process.<br><br>
 * 
 * <b>Wrap Map Concept</b><br><br>
 * 
 * The wrap map is an XML or JSON file that indicate to which slot/role the 
 * shader's variables are assigned. OvoiD.JS provide an hard-coded wrap map 
 * for default mapping, but  allows to use custom wrap maps.<br><br>
 * 
 * In GLSL, the shader's variables and attributes can be retrieved by their 
 * names. The wrapper must know which variable or attribute's name corresponds 
 * to which role in the rendering pipeline. For example if you have an uniform 
 * matrix called "MvMtx", the wrapper must know that this uniform "MvMtx" is 
 * dedicated to be the main Modelview matrix to fill and update its data during 
 * the rendering process. The wrap map provides a mecanism to automatize this 
 * translation between the shader's variable names and the OvoiD.JS Drawing 
 * process.<br><br>
 * 
 * The XML or JSON wrap map file simply consists of a list of translation 
 * parameters. Here is an XML sample:<br><br>
 * 
 * <blockcode>
 * &lt;uniformMatrix&gt;<br>
 * &nbsp;&nbsp;&lt;s symbol="UNIFORM_MATRIX_TRANSFORM_MAT4" id="0"&gt;MXF&lt;/s&gt;<br>
 * &nbsp;&nbsp;&lt;s symbol="UNIFORM_MATRIX_NORMAL_MAT3" id="1"&gt;MNR&lt;/s&gt;<br>
 * </blockcode><br><br>
 * 
 * In the above sample, we can identify "symbol" and "id" attributes which are 
 * the internal OvoiD.JS symbolic constants and their integer values. These XML 
 * attributes must not be modified (note: the "symbol" attribute is here for 
 * readibility, the wrapping process ignores this attribute, which can 
 * in fact stay empty). The "MXF" and "MNR" are the uniformMatrix variables's 
 * names in the shader which should be assigned to the corresponding slot/id. 
 * Here, the "MXF" uniform is plugged to the "UNIFORM_MATRIX_TRANSFORM_MAT4" 
 * role/slot and the "MNR" uniform is plugged to the 
 * "UNIFORM_MATRIX_NORMAL_MAT3" role/slot.<br><br>
 * 
 * The shader must not necessarly use ALL the available wrap slots. The 
 * unfound shader's variables are simply ignored and not wrapped.<br><br>
 * 
 * Full filled XML and JSON wrap map examples are provided in OvoiD.JS source
 * packages.<br><br>
 * 
 * <b>The Vertex Format</b><br><br>
 * 
 * The Vertex Format describes of which properties vertices of a list are 
 * composed and how the vertices's data should be arranged in Vertex Buffer
 * Objets (VBO).  The simplest vertex has only one property: its position in 
 * space defined by a point. But a vertices can have other properties such as 
 * normal, texture coordinates, color, etc...<br><br>
 * 
 * In the OvoiD.JS Library, the Vertex Format is defined using an bitmask 
 * integer value that can be defined with symbolic constants:<br><br>
 * 
 * <blockcode>
 * var format = Ovoid.Ovoid.VERTEX_VEC4_P | Ovoid.VERTEX_VEC3_N | Ovoid.VERTEX_VEC4_C;
 * </blockcode><br><br>
 * 
 * In the above example, the resulting vertices of the specified format will 
 * include four float values for position in space, three float values for 
 * normal vector and four float values for color that give an eleven 32 
 * bits floats vertex.<br><br>
 * 
 * The available vertex format components are the following ones: <br><br>
 * 
 * <ul>
 * <li><code>Ovoid.VERTEX_VEC4_P</code></li>
 * Four 32 bits float (x,y,z,w) for position point in space.<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_N</code></li>
 * Three 32 bits float (x,y,z) for normal vector.<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_U</code></li>
 * Three 32 bits float (u,v,w) for Uv texture coordinate.<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_T</code></li>
 * Three 32 bits float (u,v,w) for Tangent space coordinate. (normal mapping)<br><br>
 * <li><code>Ovoid.VERTEX_VEC3_B</code></li>
 * Three 32 bits float (u,v,w) for binormal vector. (normal mapping)<br><br>
 * <li><code>Ovoid.VERTEX_VEC4_C</code></li>
 * Four 32 bits float (r,g,b,a) for vertex color.<br><br>
 * <li><code>Ovoid.VERTEX_VEC4_I</code></li>
 * Four 32 bits float (i,i,i,i) for influence matrix index. (skin deform)<br><br>
 * <li><code>Ovoid.VERTEX_VEC4_W</code></li>
 * Four 32 bits float (w,w,w,w) for influence wheight. (skin deform)<br><br>
 * </ul><br><br>
 * 
 * As object, <code>Ovoid.Vertex</code> class contains 
 * all these components that can be filled at your convenience and usage. 
 * The vertex format is used to build and arrange data in Vertex Buffer Objets 
 * (VBO) and describe the GLSL vertex attributes in shaders.<br><br>
 * 
 * The Shader object use the vertex format to automaticaly bind shader 
 * attributes and enable or disable the suitable vertex attribs arrays.
 * 
 * @param {string} name Indicative name for this shader.
 */
Ovoid.Shader = function(name) {

  /** Shader indicative name 
   * @type string */
  this.name = name;
  /** Vertex program url.
   * @type string */
  this.verturl = '';
  /** Fragment program url.
   * @type string */
  this.fragurl = '';
  /** Wrap map url.
   * @type string */
  this.wrapurl = '';
  /** Vertex program source.
   * @type string */
  this.vertsource = '';
  /** Fragment program source.
   * @type string */
  this.fragsource = '';
  /** wrap map XML or JSON source.
   * @type string */
  this.wrapsource = '';
  /** Vertex program compilation status.
   * @type string */
  this.vertstat = '';
  /** Fragment program compilation status.
   * @type string */
  this.fragstat = '';
  /** Shader program link status.
   * @type string */
  this.progstat = '';
  /** Vertex program Gl handle.
   * @type int */
  this.verthandle = -1;
  /** Fragment program Gl handle.
   * @type int */
  this.fraghandle = -1;
  /** Shader program Gl handle.
   * @type int*/
  this.proghandle = -1;

  /** LinkWrap shader status.
   * @type bool*/
  this.linkStatus = false;
  
  /** Vertex attribute slots list.
   * @type int[] */
  this.attribute = new Array(Ovoid.MAX_VERTEX_ATTRIB);
  for (var i = 0; i < Ovoid.MAX_VERTEX_ATTRIB; i++)
    this.attribute[i] = -1;

  this.attrsize = new Uint16Array(Ovoid.MAX_VERTEX_ATTRIB);

  /** Uniform slots list.
   * @type int[] */
  this.uniform = new Array(Ovoid.MAX_UNIFORM);
  for (var i = 0; i < Ovoid.MAX_UNIFORM; i++)
    this.uniform[i] = -1;

  /** Uniform Matrix slots list.
   * @type int[] */
  this.uniformMatrix = new Array(Ovoid.MAX_UNIFORM_MATRIX);
  for (var i = 0; i < Ovoid.MAX_UNIFORM_MATRIX; i++)
    this.uniformMatrix[i] = -1;

  /** Uniform Sampler slots list.
   * @type int[] */
  this.uniformSampler = new Array(Ovoid.MAX_UNIFORM_SAMPLER);
  for (var i = 0; i < Ovoid.MAX_UNIFORM_SAMPLER; i++)
    this.uniformSampler[i] = -1;

  this.outFragment = new Array(Ovoid.MAX_OUT_FRAGMENT);
  for (var i = 0; i < Ovoid.MAX_OUT_FRAGMENT; i++)
    this.outFragment[i] = -1;

  /** Sahder source files loading status.<br><br>
   * A value of 0 means that one or more file is not yet loaded, a value of 1 
   * means that all the sources was successfully loaded, and a value of -1 means 
   * the loading failed.
   * @type int */
  this.loadStatus = 0;
  
  /** vertex source load status */
  this._vslstatus = 0;
  /** fragment source load status */
  this._fslstatus = 0;
  /** wrapmap source load status */
  this._wmlstatus = 0;
  
};

/**
 * Handle sound loading.
 *
 * @return {bool} True if successfull sound loading, false otherwise.
 */
Ovoid.Shader.prototype._handleLoad = function(event) {
  
  if (Ovoid.al) {
    if(this.response.byteLength > 311) {
      this.owner._albuffer = Ovoid.al.createBuffer(this.response, false);
      this.owner.loadStatus = 1;
    } else {
      Ovoid.log(2, 'Ovoid.Shader', "'" + this.owner.name +
        "' unable to load '" + this.owner.src + "'");
      /* buffer vide par defaut */
      this.owner._albuffer = Ovoid.al.createBuffer(1, 1, 22050);
      this.owner.loadStatus = -1;
    }
  } else {
    this.owner.loadStatus = 1;
  }
    
};


/**
 * Handle sound loading error.
 */
Ovoid.Shader.prototype._handleError = function() {

  Ovoid.log(2, 'Ovoid.Shader', "'" + this.owner.name +
      "' unable to load '" + this.owner.src + "'");
  this.owner.loadStatus = -1;
};


/**
 * Load the specified source files for this instance.<br><br>
 * 
 * Loads the specified external source files and store the 
 * loaded data. If not specified, the loading is made in the asynchronous way.<br><br>
 *  
 * The <code>loadSatus</code> member indicates the loading status through an 
 * integer value of 0, 1 or -1. A value of 0 means that one or more file is not 
 * yet loaded, a value of 1 means that all the sources was successfully loaded, 
 * and a value of -1 means the loading failed.<br><br>
 *
 * @param {string} vs Vertex program shader source file url. 
 * 
 * @param {string} fs Fragment program shader source file url.
 * 
 * @param {string} wm XML or JSON wrap map file url.
 * 
 * @param {bool} async Optionnal asynchronous loading flag. If true or not null
 * the source is loaded in asynchronous way.
 * 
 */
Ovoid.Shader.prototype.loadSource = function(vs, fs, wm, async) {

  this.verturl = vs;
  this.fragurl = fs;
  this.wrapurl = wm;
  
  var fsrc, vsrc, wsrc;
  
  var fsrc = fs;
  if (Ovoid.opt_debugMode) 
    fsrc += '?' + Math.random();
  
  var vsrc = vs;
  if (Ovoid.opt_debugMode) 
    vsrc += '?' + Math.random();
    
  var wsrc = wm;
  if (Ovoid.opt_debugMode) 
    wsrc += '?' + Math.random();
    
  var vxhr = new XMLHttpRequest();
  vxhr.id = 0;
  vxhr.owner = this;
  
  var fxhr = new XMLHttpRequest();
  fxhr.id = 1;
  fxhr.owner = this;
  
  var wxhr = new XMLHttpRequest();
  wxhr.id = 2;
  wxhr.owner = this;
  
  /* La définition de onreadystatechange n'est utile qu'en
   * mode asynchrone */
  if (async) {
    var hthndfunc =  function()
    {
      if (this.readyState == 4) {
        if (this.status == 200 || this.status == 304) {
          switch(this.id)
          {
            case 0:
              this.owner.vertsource = this.responseText;
                this.owner._vslstatus = 1;
            break;
            case 1:
              this.owner.fragsource = this.responseText;
                this.owner._fslstatus = 1;
            break;
            case 2:
              this.owner.wrapsource = this.responseText;
                this.owner._wmlstatus = 1;
            break;
          }
          
          if( (this.owner._vslstatus + this.owner._fslstatus + this.owner._wmlstatus) == 3)
            this.owner.loadStatus = 1;
          
        } else {
          switch(this.id)
          {
            case 0:
              Ovoid.log(2, 'Ovoid.Shader ' + this.owner.name,
                "unable to load source '" +
                this.owner.verturl + "'");
                this.owner._vslstatus = -1;
                this.owner.loadStatus = -1;
            break;
            case 1:
              Ovoid.log(2, 'Ovoid.Shader ' + this.owner.name,
                "unable to load source '" +
                this.owner.fragurl + "'");
                this.owner._fslstatus = -1;
                this.owner.loadStatus = -1;
            break;
            case 2:
              Ovoid.log(2, 'Ovoid.Shader ' + this.owner.name,
                "unable to load source '" +
                this.owner.wrapurl + "'");
                this.owner._wmlstatus = -1;
                this.owner.loadStatus = -1;
            break;
          }
        }
      }
    }
    vxhr.onreadystatechange = hthndfunc;
    fxhr.onreadystatechange = hthndfunc;
    wxhr.onreadystatechange = hthndfunc;
  }

  wxhr.open("GET", wsrc, async);
  wxhr.send();
  fxhr.open("GET", fsrc, async);
  fxhr.send();
  vxhr.open("GET", vsrc, async);
  vxhr.send();
  
  // Si nous sommes en mode synchrone
  if (!async) {
    if (wxhr.status == 200 || wxhr.status == 304) {
      this.wrapsource = wxhr.responseText;
      this._wmlstatus = 1;
    } else {
      this._wmlstatus = -1;
      this.loadStatus = -1;
      Ovoid.log(2, 'Ovoid.Shader ' + this.name,
          "unable to load source '" +
          this.wrapurl + "'");
    }
    if (fxhr.status == 200 || fxhr.status == 304) {
      this.fragsource = fxhr.responseText;
      this._fslstatus = 1;
    } else {
      this._fslstatus = -1;
      this.loadStatus = -1;
      Ovoid.log(2, 'Ovoid.Shader ' + this.name,
          "unable to load source '" +
          this.fragurl + "'");
    }
    if (vxhr.status == 200 || vxhr.status == 304) {
      this.vertsource = vxhr.responseText;
      this._vslstatus = 1;
    } else {
      this._vslstatus = -1;
      this.loadStatus = -1;
      Ovoid.log(2, 'Ovoid.Shader ' + this.name,
          "unable to load source '" +
          this.verturl + "'");
    }
    if( (this._vslstatus + this._fslstatus + this._wmlstatus) == 3)
        this.loadStatus = 1;
  }
};


/**
 * Set shader's sources.<br><br>
 * 
 * Sets the sahder's vertex program, fragment program and wrap map source 
 * strings. 
 *
 * @param {string} vs Vertex program shader source string.
 * 
 * @param {string} fs Fragment program shader source string.
 * 
 * @param {string} wm XML or JSON wrap map string.
 */
Ovoid.Shader.prototype.setSources = function(vs, fs, wm) {
  
  this.wrapsource = wm;
  this.fragsource = fs;
  this.vertsource = vs;
  this.loadStatus = 1;
}

/**
 * Link & wrap shader sources.<br><br>
 * 
 * Compiles, links and then wraps the current shader's sources. Source strings 
 * must be loaded or defined using the <code>loadSource</code> or 
 * <code>setSources</code> method.
 * 
 * @return {bool} True if operations suceeds, false otherwise.
 */
Ovoid.Shader.prototype.linkWrap = function() {

  if (this.loadStatus != 1) {
    Ovoid.log(2, "Ovoid.Shader", this.name + 
        " link/compil error, sources not loaded.");
    return false;
  }

  this.verthandle = Ovoid.gl.createShader(Ovoid.gl.VERTEX_SHADER);
  this.fraghandle = Ovoid.gl.createShader(Ovoid.gl.FRAGMENT_SHADER);

  Ovoid.gl.shaderSource(this.verthandle, this.vertsource);
  Ovoid.gl.compileShader(this.verthandle);
  this.vertstat = Ovoid.gl.getShaderInfoLog(this.verthandle);

  if (! Ovoid.gl.getShaderParameter(this.verthandle,
      Ovoid.gl.COMPILE_STATUS))
  {
    this.clear();
    Ovoid.log(2, 'Ovoid.Shader', 
        this.name +  " '" + this.verturl + "' compil error: " + this.vertstat);
    return false;
  }

  Ovoid.gl.shaderSource(this.fraghandle, this.fragsource);
  Ovoid.gl.compileShader(this.fraghandle);
  this.fragstat = Ovoid.gl.getShaderInfoLog(this.fraghandle);

  if (!Ovoid.gl.getShaderParameter(this.fraghandle,
      Ovoid.gl.COMPILE_STATUS))
  {
    this.clear();
    Ovoid.log(2, 'Ovoid.Shader', 
        this.name +  " '" + this.fragurl + "' compil error: " + this.fragstat);
    return false;
  }

  this.proghandle = Ovoid.gl.createProgram();
  Ovoid.gl.attachShader(this.proghandle, this.verthandle);
  Ovoid.gl.attachShader(this.proghandle, this.fraghandle);
  Ovoid.gl.linkProgram(this.proghandle);

  this.progstat = Ovoid.gl.getProgramInfoLog(this.proghandle);

  if (!Ovoid.gl.getProgramParameter(this.proghandle,
      Ovoid.gl.LINK_STATUS))
  {
    this.clear();
    Ovoid.log(2, 'Ovoid.Shader', 
        this.name + " link error: " + this.progstat);
    return false;
  }
  
  Ovoid._logGlerror('Ovoid.Shader.linkWrap :: ' + this.name);

  /* retrouve le type de fichier */
  var ext = Ovoid.extractExt(this.wrapurl).toUpperCase();
  if (ext == "XML") {
    if (!this._wrapXml()) {
      Ovoid.log(2, 'Ovoid.Shader', "program wrap error.");
      return false;
    }
  } else {
    if (!this._wrapJson()) {
      Ovoid.log(2, 'Ovoid.Shader', "program wrap error.");
      return false;
    }
  }
  
  this.linkStatus = true;
  
  return true;
};


/**
 * Wrap shader.
 * 
 * <br><br>Wraps the current shader with the current loaded wrap map source 
 * parsed as OJSON.
 * 
 * @return {bool} True if wrap suceeds, false otherwise.
 */
Ovoid.Shader.prototype._wrapJson = function() {
  
  var ojson = JSON.parse(this.wrapsource);
      
  if (ojson == null) {
    Ovoid.log(2, 'Ovoid.Shader',
        "unable to load Json wrap map '" + wm + "'");
    return false;
  }
  
  /* Verifie le format JSON */
  if(!ojson.OJSON) {
    Ovoid.log(2, "Ovoid.Shader '" + wm,
          "' is not a valid Ovoid JSON format");
    return false;
  }
  
  if(ojson.type != "glslmap") {
    Ovoid.log(2, "Ovoid.Shader '" + wm,
          "' is not a valid Ovoid JSON glslmap");
    return false;
  }
  
  if(!ojson.wrapmap) {
    Ovoid.log(2, "Ovoid.Shader '" + wm,
          "' no wrapmap object found in Ovoid JSON");
    return false;
  }
  
  var map = ojson.wrapmap;
  
  if (map.attribute) {
    if (map.attribute.length > 0) {
      i = map.attribute.length;
      while (i--) {
        this.plugVertexAttrib(map.attribute[i].id, map.attribute[i].name);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no attribute slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing attribute map.");
    return false;
  }
  
  if (map.uniform) {
    if (map.uniform.length > 0) {
      i = map.uniform.length;
      while (i--) {
        this.plugUniform(map.uniform[i].id, map.uniform[i].name);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no uniform slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing uniform map.");
    return false;
  }
  
  if (map.uniformMatrix) {
    if (map.uniformMatrix.length > 0) {
      i = map.uniformMatrix.length;
      while (i--) {
        this.plugUniformMatrix(map.uniformMatrix[i].id, map.uniformMatrix[i].name);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no uniformMatrix slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing uniformMatrix map.");
    return false;
  }
  
  if (map.uniformSampler) {
    if (map.uniformSampler.length > 0) {
      i = map.uniformSampler.length;
      while (i--) {
        this.plugUniformSampler(map.uniformSampler[i].id, map.uniformSampler[i].name);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no uniformSampler slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing uniformSampler map.");
    return false;
  }

  return true;
}

/**
 * Wrap shader.
 * 
 * <br><br>Wraps the current shader with the current loaded wrap map source 
 * parsed as XML.
 * 
 * @return {bool} True if wrap suceeds, false otherwise.
 */
Ovoid.Shader.prototype._wrapXml = function() {

  var parser = new DOMParser();
  var xmlWrapmap = parser.parseFromString(this.wrapsource,'text/xml');

  if (xmlWrapmap == null) {
    Ovoid.log(2, 'Ovoid.Shader',
        "unable to load Xml wrap map '" + wm + "'");
    return false;
  }

  var xmlAttribute = xmlWrapmap.getElementsByTagName('attribute')[0];
  var xmlUniform = xmlWrapmap.getElementsByTagName('uniform')[0];
  var xmlUniformMatrix = xmlWrapmap.getElementsByTagName('uniformMatrix')[0];
  var xmlUniformSampler = xmlWrapmap.getElementsByTagName('uniformSampler')[0];

  var xmlSlot, name, id, map, i;
  if (xmlAttribute != null) {

    xmlSlot = xmlAttribute.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugVertexAttrib(id, map);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no attribute slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing attribute map.");
    return false;
  }

  if (xmlUniform != null) {

    xmlSlot = xmlUniform.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugUniform(id, map);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no uniform slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing uniform map.");
    return false;
  }

  if (xmlUniformMatrix != null) {

    xmlSlot = xmlUniformMatrix.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugUniformMatrix(id, map);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no uniformMatrix slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing uniformMatrix map.");
    return false;
  }

  if (xmlUniformSampler != null) {

    xmlSlot = xmlUniformSampler.getElementsByTagName('s');

    if (xmlSlot.length > 0) {

      i = xmlSlot.length;

      while (i--) {
        id = parseInt(xmlSlot[i].getAttribute('id'));
        map = xmlSlot[i].childNodes[0].data;
        this.plugUniformSampler(id, map);
      }
    } else {
      Ovoid.log(2, 'Ovoid.Shader',
          "'" + wm +
          "' wrap : no uniformSampler slot.");
    }
  } else {
    Ovoid.log(2, 'Ovoid.Shader',
        "'" + wm +
        "' wrap : missing uniformSampler map.");
    return false;
  }
  
  return true;
};


/**
 * Use shader.
 * 
 * <br><br>Tells to GL API to uses this shader for rendering pipeline. This is 
 * a shurtcut for <code>gl.useProgram()</code> funtion.
 * 
 */
Ovoid.Shader.prototype.use = function() {

  Ovoid.gl.useProgram(this.proghandle);
};


/**
 * Plug vertex attribute.<br><br>
 * 
 * Plugs the given vertex attribute to the specified slot.
 *
 * @param {enum} slot Vertex attribute slot identifier. Can be one of the 
 * following symbolic constants:<br>
 * Ovoid.VERTEX_VEC4_P,<br>
 * Ovoid.VERTEX_VEC3_N,<br>
 * Ovoid.VERTEX_VEC3_U,<br>
 * Ovoid.VERTEX_VEC3_T,<br>
 * Ovoid.VERTEX_VEC3_B,<br>
 * Ovoid.VERTEX_VEC4_C,<br>
 * Ovoid.VERTEX_VEC4_I,<br>
 * Ovoid.VERTEX_VEC4_W<br><br>
 * 
 * @param {string} attr Shaders's vertex attribute name to be plugged.
 *
 * @return {int} The vertex attribute location or -1 if attribute is not found.
 */
Ovoid.Shader.prototype.plugVertexAttrib = function(slot, attr) {

  var id = Ovoid.gl.getAttribLocation(this.proghandle, attr);
  switch (slot)
  {
    case Ovoid.VERTEX_VEC4_P:
      this.attribute[0] = id;
      this.attrsize[0] = 4;
      return id;
    case Ovoid.VERTEX_VEC3_N:
      this.attribute[1] = id;
      this.attrsize[1] = 3;
      return id;
    case Ovoid.VERTEX_VEC3_U:
      this.attribute[2] = id;
      this.attrsize[2] = 3;
      return id;
    case Ovoid.VERTEX_VEC3_T:
      this.attribute[3] = id;
      this.attrsize[3] = 3;
      return id;
    case Ovoid.VERTEX_VEC3_B:
      this.attribute[4] = id;
      this.attrsize[4] = 3;
      return id;
    case Ovoid.VERTEX_VEC4_C:
      this.attribute[5] = id;
      this.attrsize[5] = 4;
      return id;
    case Ovoid.VERTEX_VEC4_I:
      this.attribute[6] = id;
      this.attrsize[6] = 4;
      return id;
    case Ovoid.VERTEX_VEC4_W:
      this.attribute[7] = id;
      this.attrsize[7] = 4;
      return id;
    default:
      return -1;
  }
};


/**
 * Plug uniform.<br><br>
 * 
 * Plugs the given uniform to the specified slot.
 *
 * @param {enum} slot Uniform slot identifier. Can be one of the 
 * following symbolic constants:<br><br>
 * 	Ovoid.UNIFORM_ENABLE_DIFFUSE_LIGHTING_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_AMBIENT_LIGHTING_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_SPECULAR_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_REFLECT_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_PARALAX_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_MATERIAL_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_VERTEX_WEIGHT_BOOL,<br>
		Ovoid.UNIFORM_ENABLE_COMPUT_TANGENT_BOOL,<br>
		Ovoid.UNIFORM_ZOFFSET_FLOAT,<br>
		Ovoid.UNIFORM_COLOR_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_AMBIENT_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_DIFFUSE_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_SPECULAR_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_EMISSIVE_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_REFLECT_VEC4,<br>
		Ovoid.UNIFORM_MATERIAL_SHININESS_FLOAT,<br>
		Ovoid.UNIFORM_MATERIAL_OPACITY_FLOAT,<br>
		Ovoid.UNIFORM_MATERIAL_REFLECTIVITY_FLOAT,<br>
		Ovoid.UNIFORM_MATERIAL_BUMPINESS_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_POSITION_VEC4,<br>
		Ovoid.UNIFORM_LIGHT_DIRECTION_VEC3,<br>
		Ovoid.UNIFORM_LIGHT_COLOR_VEC4,<br>
		Ovoid.UNIFORM_LIGHT_INTENSITY_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_CONSTANT_ATTENUATION_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_RANGE_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_FALLOFF_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_SPOTANGLE_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_LINEAR_ATTENUATION_FLOAT,<br>
		Ovoid.UNIFORM_LIGHT_ENABLED_BOOL,<br>
		Ovoid.UNIFORM_LIGHT_QUADRIC_ATTENUATION_FLOAT,<br>
		Ovoid.UNIFORM_EYE_POSITION_VEC4,<br>
		Ovoid.UNIFORM_EYE_DIRECTION_VEC4,<br>
		Ovoid.UNIFORM_EYE_VIEWSIZE_VEC3,<br>
		Ovoid.UNIFORM_LAYER_SIZE_VEC3,<br><br>
    * 
 * @param {string} name Shaders's uniform name to be plugged.
 *
 * @return {int} The uniform location or -1 if uniform is not found.
 */
Ovoid.Shader.prototype.plugUniform = function(slot, name) {

  var id = Ovoid.gl.getUniformLocation(this.proghandle, name);
  if (id) {
    this.uniform[slot] = id; return id;
  } else {
    return -1;
  }
};


/**
 * Plug matrix uniform.<br><br>
 *
 * Plugs the given matrix uniform to the specified slot.
 * 
 * @param {enum} slot Matrix uniform slot identifier. Can be one of the 
 * following symbolic constants:<br><br>
 * Ovoid.UNIFORM_MATRIX_TRANSFORM_MAT4,<br>
   Ovoid.UNIFORM_MATRIX_NORMAL_MAT3,<br>
	 Ovoid.UNIFORM_MATRIX_MODELVIEW_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_EYEVIEW_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_PROJECTION_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_LOOKAT_MAT4,<br>
	 Ovoid.UNIFORM_MATRIX_JOINTS_MAT4,<br><br>
 * 
 * @param {string} name Shaders's matrix uniform name to be plugged.
 *
 * @return {int} The matrix uniform location or -1 if matrix uniform is not found.
 */
Ovoid.Shader.prototype.plugUniformMatrix = function(slot, name) {

  var id = Ovoid.gl.getUniformLocation(this.proghandle, name);
  if (id) {
    this.uniformMatrix[slot] = id; return id;
  } else {
    return -1;
  }
};


/**
 * Plug sampler uniform.<br><br>
 *
 * Plugs the given sampler uniform to the specified slot.
 * 
 * @param {enum} slot Sampler uniform slot identifier. Can be one of the 
 * following symbolic constants:<br><br>
		Ovoid.SAMPLER_DEFAULT,<br>
		Ovoid.SAMPLER_AMBIENT,<br>
		Ovoid.SAMPLER_DIFFUSE,<br>
		Ovoid.SAMPLER_SPECULAR,<br>
		Ovoid.SAMPLER_EMISSIVE,<br>
		Ovoid.SAMPLER_REFLECT,<br>
		Ovoid.SAMPLER_NORMAL,<br><br>
 * 
 * @param {string} name Shaders's sampler uniform name to be plugged.
 *
 * @return {int} The sampler uniform location or -1 if matrix uniform is not found.
 */
Ovoid.Shader.prototype.plugUniformSampler = function(slot, name) {

  var id = Ovoid.gl.getUniformLocation(this.proghandle, name);
  if (id) {
    this.uniformSampler[slot] = id; return id;
  } else {
    return -1;
  }
};


/**
 * 1 float uniform value assignment.
 * 
 * @param {enum} s Uniform slot identifier.
 * @param {float} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1f = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform1f(this.uniform[s], v);
};


/**
 * 1 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1fv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform1fv(this.uniform[s], v);
};


/**
 * 2 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform2fv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform2fv(this.uniform[s], v);
};


/**
 * 3 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform3fv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform3fv(this.uniform[s], v);
};


/**
 * 4 float array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform4fv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform4fv(this.uniform[s], v);
};


/**
 * 1 int uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {int} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1i = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform1i(this.uniform[s], v);
};


/**
 * 1 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform1iv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform1iv(this.uniform[s], v);
};


/**
 * 2 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform2iv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform2iv(this.uniform[s], v);
};


/**
 * 3 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform3iv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform3iv(this.uniform[s], v);
};


/**
 * 4 int array uniform value assignment.
 *
 * @param {enum} s Uniform slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniform4iv = function(s, v) {

  if (this.uniform[s] != -1) Ovoid.gl.uniform4iv(this.uniform[s], v);
};


/**
 * 3x3 matrix array uniform value assignment.
 *
 * @param {enum} s Uniform matrix slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniformMatrix3fv = function(s, v) {

  if (this.uniformMatrix[s] != -1)
    Ovoid.gl.uniformMatrix3fv(this.uniformMatrix[s], 0, v);
};


/**
 * 4x4 matrix array uniform value assignment.
 *
 * @param {enum} s Uniform matrix slot identifier.
 * @param {TypedArray} v Value to set uniform with.
 */
Ovoid.Shader.prototype.setUniformMatrix4fv = function(s, v) {

  if (this.uniformMatrix[s] != -1)
    Ovoid.gl.uniformMatrix4fv(this.uniformMatrix[s], 0, v);
};


/**
 * Enable sampler uniform.
 *
 * @param {enum} s Uniform sampler slot identifier.
 */
Ovoid.Shader.prototype.setUniformSampler = function(s) {

  if (this.uniformSampler[s] != -1)
    Ovoid.gl.uniform1i(this.uniformSampler[s], s);
};


/** Set attributes pointers.<br><br>
 * 
 * Enables and/or disables WebGL vertex attributes pointers and arrays 
 * according to the given Vertex format and vertex size.
 *
 * @param {bitmask} vformat Vertex format.
 * @param {int} vfbytes Vertex size in bytes.
 */
Ovoid.Shader.prototype.setVertexAttribPointers = function(vformat, vfbytes) {

  for (var i = 0, b = 0x1, P = 0;
      i < Ovoid.MAX_VERTEX_ATTRIB;
      i++, b <<= 1)
  {
    if (vformat & b) { /* enable vertex attrib */

      if (-1 != this.attribute[i]) {

        Ovoid.gl.vertexAttribPointer(this.attribute[i],
            this.attrsize[i],
            Ovoid.gl.FLOAT,
            false,
            vfbytes,
            P);

        Ovoid.gl.enableVertexAttribArray(this.attribute[i]);
      }

      P += (this.attrsize[i] * 4);

    } else { /* disable vertex attrib */

      if (-1 != this.attribute[i])
        Ovoid.gl.disableVertexAttribArray(this.attribute[i]);
    }
  }
};


/**
 * Clear out fragment.<br><br>
 * 
 * Clears all wrapped output fragments. (not yet implemented).
 */
Ovoid.Shader.prototype.clearOutFragment = function() {

  for (var i = 0; i < Ovoid.MAX_OUT_FRAGMENT; i++)
    this.outFragment[i] = -1;
};


/**
 * Clear attributes.<br><br>
 * 
 * Clears all wrapped vertex attributes.
 */
Ovoid.Shader.prototype.clearVertexAttribs = function() {

  for (var i = 0; i < Ovoid.MAX_VERTEX_ATTRIB; i++)
    this.attribute[i] = -1;
};


/**
 * Clear uniforms.<br><br>
 * 
 * Clears all wrapped uniforms.
 */
Ovoid.Shader.prototype.clearUniforms = function() {

  for (var i = 0; i < Ovoid.MAX_UNIFORM; i++)
    this.uniform[i] = -1;
};


/**
 * Clear matrix uniforms.<br><br>
 * 
 * Clears all wrapped matrix uniforms.
 */
Ovoid.Shader.prototype.clearUniformMatrices = function() {

  for (var i = 0; i < Ovoid.MAX_UNIFORM_MATRIX; i++)
    this.uniformMatrix[i] = -1;
};


/**
 * Clear sampler uniforms.<br><br>
 * 
 * Clears all wrapped sampler uniforms.
 */
Ovoid.Shader.prototype.clearUniformSamplers = function() {

  for (var i = 0; i < Ovoid.MAX_UNIFORM_SAMPLER; i++)
    this.uniformSampler[i] = -1;
};


/**
 * Clear shader.<br><br>
 * 
 * Clears and resets this instance.
 */
Ovoid.Shader.prototype.clear = function() {

  if (this.verthandle != -1)
  {
    Ovoid.gl.deleteShader(this.verthandle);
    this.verthandle = -1;
  }

  if (this.fraghandle != -1)
  {
    Ovoid.gl.deleteShader(this.fraghandle);
    this.fraghandle = -1;
  }

  if (this.proghandle != -1)
  {
    //Ovoid.gl.deletePogram(this.proghandle);
    this.proghandle = -1;
  }

  this.clearVertexAttribs();
  this.clearUniforms();
  this.clearUniformMatrices();
  this.clearUniformSamplers();
};
