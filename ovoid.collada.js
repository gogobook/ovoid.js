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
 * COLLADA scene importer constructor.
 *
 * @class COLLADA scene importer object.<br><br>
 * 
 * The Collada object implements a COLLADA/DAE scene file importer. It is used 
 * to load DAE source files, then parse XML and extract COLLADA scene data. 
 * One Collada object should represents one COLLADA file.<br><br>
 * 
 * <b>The COLLADA File Format</b><br><br>
 * 
 * COLLADA defines an open standard XML schema for exchanging digital assets 
 * among various graphics software applications that might otherwise store 
 * their assets in incompatible file formats. COLLADA documents that describe 
 * digital assets are XML files, usually identified with a .dae (digital asset 
 * exchange) filename extension.
 * 
 * <b>Supported Data</b><br><br>
 * 
 * The Collada object currently knows and imports the following nodes and 
 * features:<br><br>
 * 
 * <ul>
 * <li>
 * <b>Materials</b><br>
 * Materials are imported with the common available attributes: Color and 
 * assigned textures for Ambient, Diffuse, Emissive and Reflective channels; 
 * global opacity/transparency; shininess value.
 * </li>
 * <li><b>Textures</b><br>
 * Textures are imported without image data (which is not included in 
 * the COLLADA file). The source image filename is
 * stored in the <code>url</code> field of the Texture node.
 * </li>
 * <li><b>Lights</b><br>
 * Lights are imported with the common available attributes: Color; 
 * Attenuation model; spot angle and falloff; intensity;
 * </li>
 * <li><b>Cameras</b><br>
 * Cameras are imported with the common available attribute: Fov; Near and far
 * clip planes values.
 * </li>
 * <li><b>Transforms</b><br>
 * Transforms are imported as simple Transform, Body or Joint node with commons 
 * transformations: Translation, rotation, scale, including joint orientation.
 * </li>
 * <li><b>Meshs</b><br>
 * Meshs are imported with common available data: Vertices position, normal,
 * texture coordinates; Polygons sets with assigned material and vertices 
 * indinces. <b>Only triangulated meshs are supported</b></li>
 * <li><b>Animations</b><br>
 * Animation are imported with common translation, rotation and
 * scale channel with Bezier, Hermit and linear interpolation data.
 * </li>
 * <li><b>Skinning</b><br>
 * Mesh skin controller is imported as Skin node with all available data with
 * up to four influences/weights per vertex.
 * </li>
 * </ul><br><br>
 * 
 * <blockcode>
 * var collada = new Ovoid.Collada();<br>
 * collada.loadSource("homework.dae");<br>
 * var options = Ovoid.DAE_ALL_NODES|Ovoid.DAE_OPTIMIZE_ALL|Ovoid.DAE_CREATE_TRACK|Ovoid.DAE_FORCE_CSPLINE;<br>
 * collada.importDae(options, scene);<br>
 * </blockcode><br><br>
 * 
 * <b>Importation Options</b><br><br>
 * 
 * Importation process behaviour can be modified with several options. These 
 * options are commonly used to do some little jobs and/or to filter the 
 * nodes importation. Options are passed as a bitmask parameter:<br><br>
 * 
 * <ul>
 * <li>Ovoid.DAE_ALL_NODES<br>
 * Importation includes all supported nodes.</li>
 * <li>Ovoid.DAE_WORLD_NODES<br>
 * Importation includes all world nodes (Transform, Body, Light, Camera, Joint).</li>
 * <li>Ovoid.DAE_DEPENDENCY_NODES<br>
 * Importation includes all dependency nodes (Texture, Material, Animation, Mesh, Skin).</li>
 * <li>Ovoid.DAE_TRANSFORMS<br>
 * Importation includes Transform nodes.</li>
 * <li>Ovoid.DAE_MESHS<br>
 * Importation includes Mesh nodes.</li>
 * <li>Ovoid.DAE_LIGHTS<br>
 * Importation includes Light nodes.</li>
 * <li>Ovoid.DAE_CAMERAS<br>
 * Importation includes Camera nodes.</li>
 * <li>Ovoid.DAE_JOINTS<br>
 * Importation includes Joint nodes.</li>
 * <li>Ovoid.DAE_ANIMATIONS<br>
 * Importation includes Animation nodes.</li>
 * <li>Ovoid.DAE_MATERIALS<br>
 * Importation includes Material nodes.</li>
 * <li>Ovoid.DAE_CONTROLLERS<br>
 * Importation includes Skin nodes.</li>
 * <li>Ovoid.DAE_FORCE_CSPLINE<br>
 * Ignore animations's Bezier and Hermit interpolation data and only extract the 
 * keytime-keyvalue pair as linear interpolation curve.</li>
 * <li>Ovoid.DAE_OPTIMIZE_MESH_VERTICES<br>
 * Optimizes mesh's vertices once imported.
 * This operation may take long time depending on the mesh's complexity. It is 
 * recommanded to import and optimize once then export the optimized mesh in 
 * OvoiD JSON format.</li>
 * <li>Ovoid.DAE_OPTIMIZE_MESH_TRIANGLES<br>
 * Optimizes mesh's triangles once imported. 
 * This operation may take long time depending on the mesh's complexity. It is 
 * recommanded to import and optimize once then export the optimized mesh in 
 * OvoiD JSON format.</li>
 * <li>Ovoid.DAE_OPTIMIZE_ALL<br>
 * Optimizes both mesh's vertices and triangles once imported.
 * This operation may take long time depending on the mesh's complexity. It is 
 * recommanded to import and optimize once then export the optimized mesh in 
 * OvoiD JSON format.</li>
 * <li>Ovoid.DAE_MAYA_FIXS<br>
 * Fix some specific side effets of Maya exported COLLADA. (Typically: Joints 
 * orientations and matrices implementation).</li>
 * <li>Ovoid.DAE_BLENDER_FIXS<br>
 * Fix some specific side effets of Blender exported COLLADA. (This option has 
 * currently no effet).</li>
 * <li>Ovoid.DAE_REPARENT_SKIN<br></li>
 * Parent the root Joint/bon of the rig structure to the Body which owns the 
 * skin deformed Mesh.</li>
 * <li>Ovoid.DAE_MERGE_DEPENDENCIES<br>
 * Always try to use and link the already existing (imported) nodes (according 
 * to the nodes name) with the currently imported nodes instead of creating 
 * doubled nodes.</li>
 * <li>Ovoid.DAE_CREATE_TRACK<br>
 * Create a Track node which contains all imported Animation nodes of the 
 * current importation process.</li>
 * </ul><br><br>
 * 
 * <b>Naming conventions</b><br><br>
 * 
 * Except for some node's type, imported nodes are nammed as they are in 
 * the COLLADA file.
 * 
 * <ul>
 * <li>Animation nodes<br>
 * OvoiD.JS uses one animation node per transformable (Body, Joint) node. 
 * COLLADA does not store animations as node objects. Animation nodes are 
 * created according to the target node's name ended by "Animation". For example
 * the created Animation node who has a target named "head" will be named 
 * "headAnimation".</li>
 * <li>Track nodes<br>
 * COLLADA does not implements an equivalent of the Track node. One Track node 
 * is created by importation process. The Track node is named according to the 
 * DAE file name ended by "Track". For example, a file named "mybox.dae" will 
 * produce a track named "myboxTrack".
 * </li>
 * </ul>
 * 
 * <b>Renaming rules using Prefix and Suffix</b><br><br>
 * 
 * The Collada object implements a renaming mecanism which allows to creates 
 * basic renaming rules using prefix and suffis during the importation process.
 * Nodes are renamed according to the prefix and suffix as follow:<br><br>
 * 
 * <code>prefix.nodeName.suffix</code><br><br>
 * 
 * Renaming rules is implemented to allow to organize complex scenes filled by 
 * successive COLLADA importations which can cause name collision or simply 
 * confusing scene. This notably allows to use the searchMatches method of the 
 * Scene object to retrieve all nodes who contains the specified prefix or 
 * suffix in their name.
 * 
 * <blockcode>
 * var group1 = scene.searchMatches("group1.");<br>
 * var group2 = scene.searchMatches(".group2");<br>
 * </blockcode><br><br>
 * 
 * <b>Scene merging and animations</b><br><br>
 * 
 * Renames nodes is typically usefull to import several animations set of the 
 * same object/character. To import several animations for the same object, you 
 * have to preliminary import the base COLLADA file who contains the object. 
 * Once done, you have to successively import COLLADA file who contains the 
 * object and the special animations set.<br><br>
 * 
 * <blockcode>
 * var collada = new Ovoid.Collada();<br>
 * collada.loadSource("characterBase.dae");<br>
 * collada.importDae(Ovoid.DAE_ALL_NODES|Ovoid.DAE_OPTIMIZE_ALL, scene, 'guybrush', null);<br>
 * <br>
 * collada.loadSource("characterWalk.dae");<br>
 * collada.importDae(Ovoid.DAE_ANIMATIONS|Ovoid.DAE_MERGE_DEPENDENCIES, scene, 'guybrush', 'walk');<br>
 * <br>
 * collada.loadSource("characterJump.dae");<br>
 * collada.importDae(Ovoid.DAE_ANIMATIONS|Ovoid.DAE_MERGE_DEPENDENCIES, scene, 'guybrush', 'jump');<br>
 * </blockcode><br><br>
 * 
 * Since Animation nodes are named according to the target's name, and the 
 * target name will not change, the successive importation will produce name 
 * collision. Using prefix or suffix prevents this side effect. (Name collisions 
 * produces automatic renaming according to the node name ended with 
 * "#<number>").<br><br>
 * 
 * In the above example, the imported node will be renamed as follows (supposed 
 * the scene includes one body, one mesh and several animations):<br><br>
 * 
 * <ul>
 * <li>"Character" => "guybrush.Character"</li>
 * <li>"CharacterShape" => "guybrush.CharacterShape"</li>
 * <li>"N/A" => "guybrush.CharacterAnimation.walk"</li>
 * <li>"N/A" => "guybrush.CharacterAnimation.jump"</li>
 * </ul><br><br>
 * 
 * The dependencies merging ensures the correct linking and correlation between 
 * world objects and animations during the importation process, according to the 
 * renaming rules and COLLADA legacy names.<br><br>
 * 
 * <b>The Compatibility Issue</b><br><br>
 * 
 * In theory, the COLLADA format was designed to be compatible between all 
 * softwares. Unfortunately,this is not as simple. The COLLADA's specifications 
 * defines many ways to do the same thing and most softwares use their own 
 * way to export data with some subtle differences. Exportation 
 * tests from several common softwares demonstrates there are some 
 * differences between softwares and even each versions of the SAME software.<br><br>
 * 
 * The Collada class does not include all specifications, but implements the 
 * most common and usual design. Because of that there is no guarantee your 
 * exported COLLADA will be perfectly imported. However, in the most of cases, 
 * it would.<br><br>
 * 
 * There is well known issues about some softwares's COLLADA exportations. 
 * COLLADA files created using the Autodesk FBX Converter software are rather 
 * well supported. When software's COLLADA exportation causes issues, exporting 
 * in FBX, then converting FBX to COLLADA using Autodesk FBX Converter may be 
 * a good deal.<br><br>
 * 
 * <b>Best Practices and Known issues</b><br><br>
 * 
 * <b>General</b><br><br>
 * <ul>
 * <li>Meshs must be triangulated. OvoiD.JS does not support quad or arbitrary 
 * polygones.</li>
 * <li>Up-Axis is ignored. OvoiD.JS is Y-Up and -Z-Forward, transformation and 
 * geometry data are not converted according to the Up-Axis.</li>
 * </ul><br><br>
 * 
 * <b>Blender</b><br><br>
 * 
 * Blender's COLLADA exportation work pretty well.<br><br>
 * 
 * <ul>
 * <li>Blender is in Z-up, OvoiD.JS usually work in Y-up.</li>
 * <li>Material opacity/transparency value is reversed.</li>
 * <li>It is highly recommanded to recalculate bones's roll before animating your
 * characters. Not recalculated bones can produce some unpredictable rotation's 
 * artifacts once exported in COLLADA.</li>
 * <li>You must bake your rig animations. <a href="http://wiki.blender.org/index.php/User:Phabtar/Full_COLLADA_Animation_Support_for_Blender">
 * You can read some best practices here.</a></li>
 * <li>Textures are linked to materials only if they are in "UV" mapping.</li>
 * <li>Blender uses a Gamma corrections which deceives the RGB values's visual 
 * perception, so, the exported material's colours seems darker than in 
 * Blender.</li>
 * </ul><br><br>
 * 
 * 
 * <b>Maya</b><br><br>
 * 
 * Maya's exported COLLADA is version depend and may be corrupted.<br><br>
 * 
 * <li>Some tests revealed incorrect indices data exportation when mesh 
 * has more than one material assigned (multple polysets). You should export in 
 * FBX then convert into COLLADA using FBX Converter. Best practices/issues for 
 * FBX export from Maya:<br><br>
 * 
 * <ul>
 * <li>To correctly export rig/skeleton animation you must enable Bake 
 * Animation and Resample all options and disable Constraints, Character 
 * Definition options.</li>
 * <li>Bake animation with an other step value than 1 seem create blank 
 * animation extra data that does not make sens.</li>
 * </ul><br><br>
 * 
 * <b>XSI</b><br><br>
 * 
 * Not tested.
 * 
 * <b>3dsMax</b><br><br>
 * 
 * Not tested.
 * 
 * </ul>
 */
Ovoid.Collada = function() {

  /** Instance name. 
   * @type string */
  this.name = '';
  /** DAE source file name.
   * Keep in mind that the <code>Ovoid.opt_daePath</code> option will be used 
   * to retrieve the file.
   * @type string */
  this.url = '';
  /** DAE source file loading status.
   * This variable describe the current loading status of the source file. A 
   * value of 0 means that the file is not loaded, a value of 1 means that the 
   * file was successfully loaded, and a value of -1 means that the file loading 
   * has failed.
   * @type int */
  this.loadStatus = 0;
  /** DAE file up_axis. */
  this._upaxis = -1;
  /** DAE object structure */
  this._dae = null;
  /** Importation option mask */
  this._mask = 0;
  /** Importation naming prefix */
  this._pfix = '';
  /** Importation naming sufix */
  this._sfix = '';
  /** Importation destination scene */
  this._dstsc = null;
};


/**
 * Get concatenated childs text data from DOM node's childs.
 * 
 * @param {DOM_text[]} n DOM_text object array to extract data from.
 *
 * @return {string} Concatenated data.
 */
Ovoid.Collada.prototype._gTxtData = function(n) {

  var b = '';
  var c = n.length;
  for (var i = 0; i < c; i++)
    b += n[i].data;
  return b;
};


/**
 * Get concatenated childs text data from DOM node's childs splited
 * by common sperators.
 * 
 * @param {DOM_text[]} child DOM_text object array to extract data from.
 *
 * @return {string[]} Array of the concatenated data splited.
 */
Ovoid.Collada.prototype._gTxtDataSplit = function(child) {

  var buffer = '';
  var c = child.length;
  for (var i = 0; i < c; i++)
    buffer += child[i].data;
  /* il arrive qu'un espace soit present en debut de buffer (typique Maya). on 
   * le supprime car ca perturbe le split et genere une valeur '0' en trop */
  if(buffer.charCodeAt(0) == 0x20) {
    buffer = buffer.slice(1);
  }
  return buffer.split(/\s+/);
};


/**
 * Find a DOM node by tagname with a particular tagname and ID or
 * SID attribute value.
 * 
 * @param {string} t Tagname of the DOM element to find.
 * @param {string} i ID or SID attribute value of the DOM node
 * to search for.
 *
 * @return {Object} The DOM node with the specified tagname
 * and ID/SID or NULL.
 */
Ovoid.Collada.prototype._getById = function(t, i) {

  var a = this._dae.getElementsByTagName(t);
  var c = a.length;
  for (var j = 0; j < c; j++) {
    if (a[j].getAttribute('id') == i ||
        a[j].getAttribute('sid') == i)
      return a[j];
  }
  return null;
};


/**
 * Get the NAME attribute value of a DOM node with a particular
 * tagname and ID or SID attribute value.
 * 
 * @param {string} t Tagname of the DOM element to find.
 * @param {string} i ID or SID attribute value of the DOM node
 * to search for.
 *
 * @return {string} The NAME value of the DOM node with the specified
 * tagname and ID/SID or NULL.
 */
Ovoid.Collada.prototype._getNameById = function(t, i) {

  var a = this._dae.getElementsByTagName(t);
  var c = a.length;
  for (var j = 0; j < c; j++) {
    if (a[j].getAttribute('id') == i ||
        a[j].getAttribute('sid') == i)
      return a[j].getAttribute('name');
  }
  return null;
};


/**
 * Get all childs of a DOM node with a particular tagname.
 * 
 * @param {string} n DOM node to search childs in.
 * @param {string} t Tagname of the childs to search for.
 *
 * @return {Object[]} Array of the childs DOM nodes with
 * the specified tagname.
 */
Ovoid.Collada.prototype._getChildByTag = function(n, t) {

  var r = new Array();
  var c = n.childNodes.length;
  for (var i = 0; i < c; i++) {
    if (n.childNodes[i].tagName == t)
      r.push(n.childNodes[i]);
  }
  return r;
};


/**
 * Get the child of a DOM node with a particular ID or SID attribute
 * value.
 * 
 * @param {string} n DOM node to search childs in.
 * @param {string} i ID or SID attribute value of the child to
 * search for.
 *
 * @return {Object} Child DOM node with the specified ID or
 * SID attribute value.
 */
Ovoid.Collada.prototype._getChildById = function(n, i) {

  var c = n.childNodes.length;
  for (var j = 0; j < c; j++) {
    if (n.childNodes[j].nodeType == 1) {
      if (n.childNodes[j].getAttribute('id') == i ||
          n.childNodes[j].getAttribute('sid') == i)
        return n.childNodes[j];
    }
  }
  return null;
};


/**
 * Verify if a DOM node have one or more childs with a
 * particular tagname.
 * 
 * @param {Object} n DOM node to search childs in.
 * @param {string} t Tagname of the childs to search for.
 *
 * @return {bool} True if the DOM node have a child with the specified
 * tagname, otherwise return false.
 */
Ovoid.Collada.prototype._hasChildByTag = function(n, t) {

  var c = n.childNodes.length;
  for (var i = 0; i < c; i++) {
    if (n.childNodes[i].tagName == t)
      return true;
  }
  return false;
};


/**
 * Retrieve a node according its name, prefix or extention according 
 * importation impotions.
 * 
 * @param {string} name Node base name.
 *
 * @return {Object} Node Object or NULL if not found.
 */
Ovoid.Collada.prototype._retrieveNode = function(name) {
  
  var node = null;
  /* Si en mode merge on essaye en priority */
  if (this._mask & Ovoid.DAE_MERGE_DEPENDENCIES) {

    name = this._pfix + name;
    node = this._dstsc.search(name);
    if (node) 
      return node;
    
    /* On essaye avec l'extention */  
    name = name + this._sfix;
  } else {
    name = this._pfix + name + this._sfix;
  }
  node = this._dstsc.search(name);
  return node;
};


/**
 * Convert and correct vertex according to the up axis.
 * 
 * @param {Matrix4} m Matrix4 to convert.
 * @param {bool} i inverse.
 */
Ovoid.Collada.prototype._procVect = function(v, i) {
  
  switch (this._upaxis)
  {
    case 2: /* Z up */
      var tmp;
      tmp = v.v[1];
      v.v[1] = -v.v[2];
      v.v[2] = tmp;
    break;
    case 0: /* X up */
    break;
  }
};


/**
 * Proceed to creation and setting of a new camera node from a
 * DOM node of a DAE <camera> descriptor.
 * 
 * @param {Object} dae DOM node of the DAE camera descriptor.
 *
 * @return {Camera} Camera Object or NULL if import fail.
 * 
 * @see Ovoid.Camera
 */
Ovoid.Collada.prototype._procCam = function(dae) {

  /* confection du nom de notre future node */
  var name = this._pfix + dae.getAttribute('id') + this._sfix;
  /* creation de la node */
  var node = new Ovoid.Camera(name);
  /* message de log optionnel */
  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
      "Camera '" + node.name + "' : created");

  /* l'élément <technique_common> du <camera> */
  var tc = dae.getElementsByTagName('technique_common');
  if (tc.length)
  {
    /* Un élément <yfov> est trouvé ? */
    var f = tc[0].getElementsByTagName('yfov');
    if (f.length) {
      /* ce devrait etre un float */
      node.fov = parseFloat(f[0].childNodes[0].data);
    } else {
      /* Un élément <xfov> peut-être ? */
      f = tc[0].getElementsByTagName('xfov');
      if (f.length) {
        /* ce devrait etre un float */
        node.fov = parseFloat(f[0].childNodes[0].data);
      }
    }
    /* Un élément <znear> est trouvé ? */
    f = tc[0].getElementsByTagName('znear');
    if (f.length) {
      /* ce devrait etre un float */
      node.clipNear = parseFloat(f[0].childNodes[0].data);
    }
    /* Un élément <zfar> est trouvé ? */
    f = tc[0].getElementsByTagName('zfar');
    if (f.length) {
      /* ce devrait etre un float */
      node.clipFar = parseFloat(f[0].childNodes[0].data);
    }
  } else {
    /* pas de <technique_common> dans <camera> ? anormal */
    Ovoid.log(2, 'Ovoid.Collada ' + this.name,
        "Camera '" + node.name +
        "' missing <technique_common>: Camera data not found.");
    return null;
  }

  /* retourne la node configurée */
  return node;
};


/**
 * Proceed to creation and setting of a new light node from a
 * DOM node of a DAE <light> descriptor.
 * 
 * @param {DOM_Object} dae DOM node of the DAE light descriptor.
 *
 * @return {Light} Light Object or NULL if import fail.
 * 
 * @see Ovoid.Light
 */
Ovoid.Collada.prototype._procLig = function(dae) {

  /* confection du nom de notre future node */
  var name = this._pfix + dae.getAttribute('id') + this._sfix;
  /* creation de la node */
  var node = new Ovoid.Light(name);
  /* message de log optionnel */
  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
      "Light '" + node.name +
      "' : created");

  /* l'élément <technique_common> du <light> */
  var tc = dae.getElementsByTagName('technique_common');
  if (tc.length)
  {
    var c, f, d;
    /* l'élément <color> du <light> */
    c = tc[0].getElementsByTagName('color');
    if (c.length) {
      /* devrait être 4 floats */
      d = this._gTxtDataSplit(c[0].childNodes);

      node.setColor(parseFloat(d[0]),
          parseFloat(d[1]),
          parseFloat(d[2]),
          1.0);
    } else {
      /* pas d'élement <color> ? bizarre */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Light '" + node.name +
          "' : missing <color>: Light color data not found.");
    }

    /* l'élément <intensity> du <light> */
    f = tc[0].getElementsByTagName('intensity');
    if (f.length) {
      /* ceci devrait être un float */
      node.intensity = parseFloat(f[0].childNodes[0].data);
    }

    /* on recherche le type <ambient>, <point> etc... */
    node.kind = -1;
    if (tc[0].getElementsByTagName('ambient').length) {
      node.kind = Ovoid.LIGHT_AMBIENT;
    }
    if (tc[0].getElementsByTagName('point').length) {
      node.kind = Ovoid.LIGHT_POINT;
    }
    if (tc[0].getElementsByTagName('directional').length) {
      node.kind = Ovoid.LIGHT_DIRECTIONAL;
    }
    if (tc[0].getElementsByTagName('spot').length)
    {
      /* si c'est un <spot> on recupere des infos
       * supplémentaires */
      node.kind = Ovoid.LIGHT_SPOT;
      /* le <falloff_angle> du <spot> */
      if (tc[0].getElementsByTagName('falloff_angle').length) {
        node.spotAngle = 0.5 * Ovoid.deg2Rad(parseFloat(tc[0].getElementsByTagName('falloff_angle')[0].childNodes[0].data));
      } else {
        /* pas de <falloff_angle> ? est-ce bien un spot ? */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name, "Light '" +
            node.name + "' : missing <spot>/<falloff_angle>: Light data not found.");
      }
      /* le <falloff_exponent> du <spot> */
      if (tc[0].getElementsByTagName('falloff_exponent').length) {
        node.falloff = 0.1 * parseFloat(tc[0].getElementsByTagName('falloff_exponent')[0].childNodes[0].data);
      }
    }

    if (node.kind == -1) {
      /* pas trouvé le type de lumiere ? étrange */
      Ovoid.log(2, 'Ovoid.Collada ' +
          this.name, "Light '" + node.name +
          "' : missing <ambient>|<point>|<directional>|<spot>: Light data not found.");
    }
    /* si ce n'est pas une directional */
    if (node.kind != Ovoid.LIGHT_AMBIENT &&
        node.kind != Ovoid.LIGHT_DIRECTIONAL) {
      /* récuperation des atténuations si on en trouve */
      var C, L, Q; /* Constant, Linera, Quadratic */
      /* l'élément <constant_attenuation> du <light> */
      f = tc[0].getElementsByTagName('constant_attenuation');
      if (f.length) {
        /* ce devrait être un float */
        C = parseFloat(f[0].childNodes[0].data);
      }
      /* l'élément <linear_attenuation> du <light> */
      f = tc[0].getElementsByTagName('linear_attenuation');
      if (f.length) {
        /* ce devrait être un float */
        L = parseFloat(f[0].childNodes[0].data);
      }
      /* l'élément <quadratic_attenuation> du <light> */
      f = tc[0].getElementsByTagName('quadratic_attenuation');
      if (f.length) {
        /* ce devrait être un float */
        Q = parseFloat(f[0].childNodes[0].data);
      }
      /* on applique les parametres */
      if (C != undefined && L != undefined && Q != undefined) {
        node.setAttenuation(C, L, Q);
      }
    }
  } else {
    /* pas de <technique_common> dans <light> ? anormal */
    Ovoid.log(2, 'Ovoid.Collada ' + this.name,
        "Light '" + node.name +
        "' : missing <technique_common>: Light data not found.");
    return null;
  }
  
  /* retourne la node configurée */
  return node;
};


/**
 * Proceed to creation and setting of a new texture node from a
 * DOM node of a DAE <image> descriptor.
 * 
 * @param {Object} dae DOM node of the DAE image descriptor.
 *
 * @return {Texture} Texture Object or NULL if import fail.
 * 
 * @see Ovoid.Texture
 */
Ovoid.Collada.prototype._procImg = function(dae) {

  /* confection du nom de notre future node */
  var name = this._pfix + dae.getAttribute('name') + this._sfix;
  /* creation de la node */
  var node = new Ovoid.Texture(name);
  /* message de log optionnel */
  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
      "Texture '" + node.name + "' : created");

  /* l'élément <init_from> du <image> */
  var it = dae.getElementsByTagName('init_from');
  if (it.length) {
    /* ceci devrait être notre nom/url d'image (ex. toto.png) */
    var d = it[0].childNodes[0].data;

    /* si il s'agit d'une uri absolu (ex. file:///... ) on
     * extrait le nom du fichier seul */
    d = d.split('/');
    var t = d[d.length - 1];
    /* le nom du fichier est cohérent ? (ex. toto.xyz) */
    t = t.split('.');
    if (t.length > 1) {
      /* on configure l'url, l'image sera chargé plus tard */
      node.url = d[d.length - 1];
    } else {
      /* ce nom d'image parrait invalide */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Texture '" + node.name +
          "' : invalid URI.");
      return null;
    }
  } else {
    /* pas de <init_from> ? inquiétant */
    Ovoid.log(2, 'Ovoid.Collada ' + this.name,
        "Texture '" + node.name +
        "' : missing <init_from>: Image data not found.");
    return null;
  }

  /* retourne la node configurée */
  return node;
};


/**
 * Proceed to setting a particular material node component
 * (ex. emissive, diffuse, etc...) from a DOM node of
 * a DAE <effect> descriptor.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Node} node Object to apply settings to.
 * @param {Object} dae DOM node of the DAE effect descriptor.
 * @param {string} di Tagname of the DAE effect component to get
 * settings from.
 * @param {string} mi Id of the material component to apply setting.
 * 
 * @see Ovoid.Node
 */
Ovoid.Collada.prototype._procEfxComp = function(node, dae, di, mi) {

  /* on retrouve l'élément du <effect> (ex. <emissive>, <diffuse> )*/
  var dc = dae.getElementsByTagName(di);
  if(dc.length) {
    /* on essaye de trouver un element <color> */
    var ct = dc[0].getElementsByTagName('color');
    if (ct.length) {
      /* on récupere les données du <color> (4 floats) */
      var d = this._gTxtDataSplit(ct[0].childNodes);

      node.setColor(mi, parseFloat(d[0]),
          parseFloat(d[1]),
          parseFloat(d[2]),
          parseFloat(d[3]));
    }
    else /* si non on essaye de trouver un élément <texture> */
    {
      var tt = dc[0].getElementsByTagName('texture');
      if (tt.length)
      {
        var ti = null; /* notre future élément <image> */

        /* Certaines implémentations Collada encapsulent
         * les textures dans des <newparam> Sampler2D eux
         * même encapsulés dans des <newparam> Surface. */

        /* on cherche le <newparam> (Surface) référencé
         * par <texture> */
        var ds = this._getById('newparam',
            tt[0].getAttribute('texture'));
        if (ds) {
          /* on retrouve le <source> du <newparam> (Surface)*/
          if (ds.getElementsByTagName('source').length) {
            ds = this._getById('newparam',
                ds.getElementsByTagName('source')[0].childNodes[0].data);
            /* on retrouve le <newparam> (Sampler) du
             * <newparam> (Surface) */
            if (ds.getElementsByTagName('init_from').length) {
              /* on retrouve le <init_from> du <newparam> (Sampler) */
              ti = this._getById('image',
                  ds.getElementsByTagName('init_from')[0].childNodes[0].data);
            }
          }
        } else {
          /* plus simplement le <texture> référence directement
           * un element <image> */
          ti = this._getById('image', tt[0].getAttribute('texture'));
        }

        if (ti) { /* avons nous trouvé un <image> ? */
          /* la node texture devrait se trouver dans la liste */
          var tn = this._retrieveNode(ti.getAttribute('name'));
          /* si on l'a trouvé on applique les parametres */
          if (tn) {
            /* couleur blanche et texture sur ce composant */
            node.setColor(mi, 1.0, 1.0, 1.0, 1.0);
            node.setTexture(mi, tn);
          } else { /* texture non trouvé ? */
            /* couleur noir */
            node.setColor(mi, 0.0, 0.0, 0.0, 1.0);
          }
        } else {
          /* si on a pas trouvé de <image> c'est inquiétant */
          Ovoid.log(2, 'Ovoid.Collada ' + this.name,
              "Material '" + node.name +
              "' : missing <" + di + '>/<texture>/<image>: Material/Texture data not found.');
        }
      } else {
        /* pas de <color> ni de <texture> ? qu'est-ce que ça peut
         * bien être... */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Material '" + node.name +
            "' : missing <" + di + '>/<color>|<texture>: Material/Texture data not found.');
      }
    }
  } else {
    /* le composant visé (ex. <diffuse>, <emissive>, etc.. )
     * n'est pas trouvé ? on applique la couleur noir */
    node.setColor(mi, 0.0, 0.0, 0.0, 1.0);
  }
};


/**
 * Proceed to creation and setting of a new material node from a
 * DOM node of a DAE <material> descriptor.
 * 
 * @param {Object} dae DOM node of the DAE material descriptor.
 *
 * @return {Material} Material Object or NULL if import fail.
 * 
 * @see Ovoid.Material
 */
Ovoid.Collada.prototype._procMat = function(dae) {

  /* confection du nom de notre future node */
  var name = this._pfix + dae.getAttribute('name') + this._sfix;
  /* creation de la node */
  var node = new Ovoid.Material(name);
  /* message de log optionnel */
  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
      "Material '" + node.name +
      "' : created");

  /* on retrouve l'élément <effect> référencé par ce <material> */
  var e = this._getById('effect',
      dae.getElementsByTagName('instance_effect')[0].getAttribute('url').substring(1));

  /* on traite les <color> ou <texture> du <effect> avec
   * une fonction dédié */
  this._procEfxComp(node, e, 'ambient', 0);
  this._procEfxComp(node, e, 'diffuse', 1);
  this._procEfxComp(node, e, 'specular', 2);
  this._procEfxComp(node, e, 'emission', 3);
  this._procEfxComp(node, e, 'reflective', 4);

  var c, f, d;

  /* on traite l'element <shininess> (simple float) */
  c = e.getElementsByTagName('shininess');
  if (c.length) {
    /* l'élément <float> du <shininess> */
    f = c[0].getElementsByTagName('float');
    /* la valeur du <float> */
    d = parseFloat(f[0].childNodes[0].data);
    node.shininess = d;
  } else {
    /* si pas d'élement <shininess> on met la valeur par défaut */
    node.shininess = 1;
  }

  /* on traite l'element <reflectivity> (simple float) */
  c = e.getElementsByTagName('reflectivity');
  if (c.length) {
    /* l'élément <float> du <reflectivity> */
    f = c[0].getElementsByTagName('float');
    /* la valeur du <float> */
    d = parseFloat(f[0].childNodes[0].data);
    node.reflectivity = d;
  }

  /* on traite l'element <transparency> (simple float) */
  c = e.getElementsByTagName('transparency');
  if (c.length) {
    /* l'élément <float> du <transparency> */
    f = c[0].getElementsByTagName('float');
    /* la valeur du <float> */
    d = parseFloat(f[0].childNodes[0].data);
    /* tres amusant, maya exporte en transparency 1.0 et blender en 
     * transparency 0.0... combien de blague comment ça encore ? */
    if (d == 0.0) {
      node.opacity = 1.0;
    } else {
      node.opacity = d;
    }
  }

  /* retourne la node configurée */
  return node;
};


/**
 * Proceed to creation and setting of a new mesh node from a
 * DOM node of a DAE <geometry> descriptor.
 * 
 * @param {Object} dae DOM node of the DAE geometry descriptor.
 *
 * @return {Mesh} Mesh Object or NULL if import fail.
 * 
 * @see Ovoid.Mesh
 */
Ovoid.Collada.prototype._procGeo = function(dae) {

  /* confection du nom de notre future node */
  var name = this._pfix + dae.getAttribute('id') + this._sfix;
  /* creation de la node */
  var node = new Ovoid.Mesh(name);
  /* message de log optionnel */
  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
      "Mesh '" + node.name + "' : created");

  /* recuperation de toutes les sources (position, normal, etc...) avec
   * les informations d'acces (stride, count, etc...)

  /* Le tableau des sources, nous serviera plus tard */
  var GS = new Object();

  GS['id'] = new Array();        /* l'attribut Id de la source */
  GS['count'] = new Array();     /* le nombre d'elements */
  GS['stride'] = new Array();    /* le stride des elements */
  GS['data'] = new Array();      /* les donnnées*/

  /* parcour de la liste des éléments <source> du <geometry> */
  var s = dae.getElementsByTagName('source');

  var sa, fa, sd;
  var i = s.length;
  while (i--) {
    /* <source id= */
    GS['id'].push(s[i].getAttribute('id'));
    /* élément <accessor> du <source> */
    sa = s[i].getElementsByTagName('accessor');
    /* <accessor count="..  stride=".. > */
    GS['stride'].push(parseInt(sa[0].getAttribute('stride')));
    GS['count'].push(parseInt(sa[0].getAttribute('count')));
    /* élement <float_array > du <source> */
    fa = s[i].getElementsByTagName('float_array');
    /* on recupere la liste des floats */
    var d = this._gTxtDataSplit(fa[0].childNodes);
    /* notre nouvel array de taille <float_array count=" */
    sd = new Float32Array(parseInt(fa[0].getAttribute('count')));
    /* de la liste brute (string) aux données float */
    var c = d.length; var u = 0;
    for (var k = 0; k < c; k++) {
      sd[u] = parseFloat(d[k]);
      /* on passe au suivant seulement si la valeur n'est
       * pas NaN. */
      if (!isNaN(sd[u])) u++;
    }
    /* on ajoute nos data a l'array des sources */
    GS['data'].push(sd);
  }

  /* On procède maintenant à l'extraction des listes de triangles du
   * descripteur <geometry> avec leur configuration */
  var pl;
  /* il existe trois types de descripteur pour les listes de polygons */
  /* s'agit-il de <polylist> ? */
  pl = dae.getElementsByTagName('polylist');
  if (pl.length == 0)
  { /* s'agit-il de <polygons> */
    pl = dae.getElementsByTagName('polygons');
    if (pl.length == 0)
    { /* s'agit-il de <triangles> */
      pl = dae.getElementsByTagName('triangles');
      if (pl.length == 0) {
        /* si aucun n'a été trouvé inutile de continuer */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name +
            "' : missing polyset <polylist>|<polygons>|<triangles>: Mesh data not found.");
        return null;
      }
    }
  }

  /* parcour de la liste des polyset (<polylist>, <polygons>
   * ou <trianges>) */
  var i = pl.length;
  while (i--)
  {
    /* le format de vertex pour le future polyset */
    var svf = 0;

    /* le nombre de vertices et triangles pour ce polyset */
    var stc = pl[i].getAttribute('count');
    var svc = stc * 3;

    /* recupere le nom symbolique du materiel pour ce polyset */
    var sms = pl[i].getAttribute('material');
    if (!sms) { /* pas de <material> trouvé ? */
      sms = 'null';
      /* on prévient qu'aucun material n'est assigné */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Geometry '" + node.name + '/polyset ' + i +
          "' : missing material symbol.");
    }

    /* On verifie la triangulation du mesh. si il s'agit
     * de <polylist>, un élément <vcount> devrait être présent */
    var vct = pl[i].getElementsByTagName('vcount');
    if (vct.length) { /* l'élément <vcount> a été trouvé ? */
      var d = vct[0].childNodes[0].data;
      /* on verifie brievement qu'il n'y a pas autre chose que des 3 */
      if (d.indexOf('4', 0) != -1 ||
          d.indexOf('5', 0) != -1 ||
          d.indexOf('6', 0) != -1 ||
          d.indexOf('7', 0) != -1 ||
          d.indexOf('8', 0) != -1)
      {
        /* dans le cas contraire on ne peut pas aller plus loin */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + '/' + sms +
            "' : bad mesh triangulation: mesh ingnored.");
        return null;
      }
    }

    /* On constitue un tableau des input de ce polyset qui référencent
     * les sources utilisé pour ce polyset et leur arrangement */
    var PI = new Object();
    PI['enable'] = new Object();
    PI['source'] = new Object();
    PI['offset'] = new Object();

    /* parcour la liste des éléments <input> du polyset */
    var pli = pl[i].getElementsByTagName('input');

    var sid, l, c;
    var j = pli.length;
    while (j--)
    {
      /* L'attribut 'semantic' de cet <input> est-il "VERTEX" ? */
      if (pli[j].getAttribute('semantic') == 'VERTEX') {

        /* Retrouve la source pour cet input, il s'agit d'un
         * élément <vertices> dans lequel il y'a d'autres
         * <input> */
        var vi = this._getById('vertices', pli[j].getAttribute('source').substring(1)).getElementsByTagName('input');
        /* Parcours des <input> du <vertices> */
        var k = vi.length;
        while (k--)
        {
          /* L'attribut 'semantic' de cet <input>
           * est-il "POSITION" ? */
          if (vi[k].getAttribute('semantic') == 'POSITION')
          {
            /* Voilà le nom de la source de nos positions de
             * vertices */
            sid = vi[k].getAttribute('source').substring(1);
            l = GS['id'].length;
            /* on la retrouve dans notre liste précédemment
             * confectionné */
            while (l--) {
              if (GS['id'][l] == sid) {
                PI['source']['p'] = l;
                /* cette source est activé */
                PI['enable']['p'] = true;
                /* on note l'offset du <input> 'VERTEX' */
                PI['offset']['p'] = parseInt(pli[j].getAttribute('offset'));
                /* on ajoute le format VEC4_P au format de vertex */
                svf |= Ovoid.VERTEX_VEC4_P;
              }
            }
          }
          /* parfois l'input des normals se trouve dans
           * l'élément <vertices> alors qu'il est traditionnellement
           * directement dans l'élément <polygons> */

          /* L'attribut 'semantic' de cet <input>
           * est-il "NORMAL" ? */
          if (vi[k].getAttribute('semantic') == 'NORMAL')
          {
            /* Voilà le nom de la source de nos normals de vertices */
            sid = vi[k].getAttribute('source').substring(1);
            l = GS['id'].length;
            while (l--) {
              if (GS['id'][l] == sid) {
                PI['source']['n'] = l;
                PI['enable']['n'] = true;
                PI['offset']['n'] = parseInt(pli[j].getAttribute('offset'));
                svf |= Ovoid.VERTEX_VEC3_N;
              }
            }
          }
        }

        if (PI['source']['p'] == -1) {
          /* pas de positions pour ce mehs ? est-ce une blague ? */
          Ovoid.log(2, 'Ovoid.Collada ' + this.name,
              "Geometry '" + node.name + '/' + sms +
              "' : missing vertices POSITION source: polyset ignored.");
          continue;
        }
      }

      /* L'attribut 'semantic' de cet <input> est-il "NORMAL" ? */
      if (pli[j].getAttribute('semantic') == 'NORMAL') {
        sid = pli[j].getAttribute('source').substring(1);
        l = GS['id'].length;
        while (l--) {
          if (GS['id'][l] == sid) {
            PI['source']['n'] = l;
            PI['enable']['n'] = true;
            PI['offset']['n'] = parseInt(pli[j].getAttribute('offset'));
            svf |= Ovoid.VERTEX_VEC3_N;
          }
        }
      }
      /* L'attribut 'semantic' de cet <input> est-il "TEXCOORD" ? */
      if (pli[j].getAttribute('semantic') == 'TEXCOORD') {
        sid = pli[j].getAttribute('source').substring(1);
        l = GS['id'].length;
        while (l--) {
          if (GS['id'][l] == sid) {
            PI['source']['u'] = l;
            PI['enable']['u'] = true;
            PI['offset']['u'] = parseInt(pli[j].getAttribute('offset'));
            svf |= Ovoid.VERTEX_VEC3_U;
          }
        }
      }
    }

    /* récuperation de la liste des indices pour ce polyset */
    /* les elements <p> du polyset */
    var p = pl[i].getElementsByTagName('p');
    /* la future liste d'indices unsigned short */
    var indices = new Uint16Array((stc * 3) * pli.length);

    l = 0; c = p.length;
    /* pour chaque <p> d'indice (dans l'ordre) */
    for (var j = 0; j < c; j++) {
      /* la liste des indices de <p> splités */
      var d = this._gTxtDataSplit(p[j].childNodes);
      var b = d.length;
      /* on a joute à la liste d'indice générale */
      for (var k = 0; k < b; k++) {
        indices[l] = parseInt(d[k]);
        if (!isNaN(indices[l])) l++;
      }
    }
    
    /* Ce n'est jamais arrivé mais on sait jamais... */
    if ( indices.length != l ) {
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + '/' + sms +
            "' found indices mismatch triangles count (" + l 
            + "/" + indices.length + ")");
    }

    /* notre future liste de vertices pour ce polyset */
    var vertices = Ovoid.Vertex.newArray(svc);

    /* les indices dans le fichier collada sont disposé tel que:
     *
     * [        Triangle1        ][        triangle2        ][etc.
     * [vertex1][vertex2][vertex3][vertex1][vertex2][vertex3][etc.
     * [p][n][u][p][n][u][p][n][u][p][n][u][p][n][u][p][n][u][etc.
     *  0  0  0  1  2  1  2  2  3  2  5  2  1  2  3  3  7  4  4

    /* les quelque variables utiles */
    var r, t, y, u, d, v;
    /* nombre d'input de ce polyset, donne un stride pour parcourir
     * la liste d'indices */
    u = pli.length;
    /* remplissage des positions */
    if (PI['enable']['p']) {
      r = PI['source']['p'];  /* l'index de notre source */
      t = PI['offset']['p'];  /* l'offset des indices */
      y = GS['stride'][r];  /* nombre de composant par indice */
      d = GS['data'][r];    /* notre liste de composants */
      for (var j = 0; j < svc; j++) {
        /* l'indice de l'élément dans la source */
        v = indices[(j * u) + t] * y;
        /* on applique à notre liste de vertices */
        vertices[j].p.set(d[v + 0], d[v + 1], d[v + 2], 1.0);
      }
    }
    /* idem pour les normales si elles existent */
    if (PI['enable']['n']) {
      r = PI['source']['n'];
      t = PI['offset']['n'];
      y = GS['stride'][r];
      d = GS['data'][r];
      for (var j = 0; j < svc; j++) {
        v = indices[(j * u) + t] * y;
        vertices[j].n.set(d[v + 0], d[v + 1], d[v + 2]);
      }
    }
    /* idem pour les texcoord si elles existent */
    if (PI['enable']['u']) {
      r = PI['source']['u'];
      t = PI['offset']['u'];
      y = GS['stride'][r];
      d = GS['data'][r];
      for (var j = 0; j < svc; j++) {
        v = indices[(j * u) + t] * y;
        vertices[j].u.set(d[v + 0], d[v + 1], 0.0);
      }
    }
    /* On retrouve le material correspondant à ce polyset. La référence
     * se trouve dans les instances du node, dans <visual_scene> */

    /* notre futur material, null par defaut */
    var material = null;
    /* avons nous trouvé un symbole de material pour ce polyset ? */
    if (sms != 'null') {
      /* Les éléments <instance_material> du fichier entier */
      var im = this._dae.getElementsByTagName('instance_material');
      /* on parcour la liste des  <instance_material> */
      var j = im.length;
      while (j--) {
        /* L'attribut 'symbol' du <instance_material>
         * correspond au 'symbol' du polyset ? */
        if (im[j].getAttribute('symbol') == sms) {
          /* On retrouve la node material par son nom */
          material = this._retrieveNode(this._getNameById('material',
                  im[j].getAttribute('target').substring(1)));
          break;
        }
      }
      /* avons nous trouvé une node material ? */
      if (!material) {
        /* Si ce n'est pas le cas, on en crée un nouveau par defaut */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + '/' + sms +
            "' : material not found");

        material = new Ovoid.Material('null_material#' +
                                      this._dstsc.material.length);
                                      
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Geometry '" + node.name + '/polyset ' + i +
          "' : assign new material node " + material.name);
          
        this._dstsc.insert(material);
      }
    } else {
      /* pas de 'symbol' ? on crée un material par défaut */
      material = new Ovoid.Material('null_material#' +
                                    this._dstsc.material.length);
                                    
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Geometry '" + node.name + '/polyset ' + i +
          "' : assign new material node " + material.name);
          
      this._dstsc.insert(material);
    }

    /* On ajoute ce polyset a la node mesh */
    Ovoid.log(3, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + "' polyset#" + i  + ": " + vertices.length + " vertices.");
    node.addPolyset(0, vertices, material);
  }

  /* sur mension explicite dans le mask d'import uniquement
   * (car ça peut être TRES long) on applique les optimisations
   * du mesh */

  /* optimise la liste des vertices en double dans le mesh */
  if (this._mask & Ovoid.DAE_OPTIMIZE_MESH_VERTICES) {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + "' Optimize vertices.");
            
    if(node.vertices[0].length > 5000) {
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + "' Vertices optimization with more than 5000 triangles: May take long time.");
      if (!Ovoid.opt_disableAlerts) {
        alert( "OvoiD.JS - COLLADA importation alert.\n\n" 
        + "DAE_OPTIMIZE_MESH_VERTICES option is enabled and the current mesh has more than 5000 vertices (" +  node.vertices[0].length + "). "
        + "The operation can take long time and the browser may prompt a 'script not responding' error. "
        + "You can ignore the browser alert by choosing 'Continue'\n\n"
        + "Note: You should use OJSON import/export for the next stage. See the Ovoid.Ojson() class documentation at OvoiD.JS documentation's home page.\nhttp://doc.ovoid.org"
        + "\n\nTo avoid this alert, set the Ovoid.opt_disableAlerts option to true in the config.js file.");
      }
    }
    node.optimizeVertices();
  }

  /* prepare et optimise les polygones. Opération très couteuse en
   * temps de calcul, n'est utile surtout pour les shadow volums */
  if (this._mask & Ovoid.DAE_OPTIMIZE_MESH_TRIANGLES) {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + "' Optimize triangles.");
    if(node.triangles[0].length > 1000) {
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Geometry '" + node.name + "' Triangles optimization with more than 1000 triangles: May take VERY LONG time.");
      if (!Ovoid.opt_disableAlerts) {
        alert( "OvoiD.JS - COLLADA importation alert.\n\n" 
        + "DAE_OPTIMIZE_MESH_TRIANGLES option is enabled and the current mesh has more than 1000 triangles (" +  node.triangles[0].length + "). "
        + "The operation can take a VERY long time and the browser may prompt a 'script not responding' error. "
        + "You can ignore the browser alert by choosing 'Continue'\n\n"
        + "Note: You should use OJSON import/export for the next stage. See the Ovoid.Ojson() class documentation at OvoiD.JS documentation's home page.\nhttp://doc.ovoid.org"
        + "\n\nTo avoid this alert, set the Ovoid.opt_disableAlerts option to true in the config.js file.");
      }
    }
    node.optimizeTriangles();
  }

  /* On crée les VBO pour ce mesh */
  node.createBuffers(svf, Ovoid.BUFFER_STATIC);

  /* retourne la node configurée */
  return node;
};


/**
 * Proceed to creation and setting of a new skin/morph node from a
 * DOM node of a DAE <controller> descriptor.
 * 
 * @param {Object} dae DOM node of the DAE controller descriptor.
 *
 * @return {Object} Skin|morph Object or NULL if import fail.
 * 
 * @see Ovoid.Skin
 */
Ovoid.Collada.prototype._procCtr = function(dae) {

  /* confection du nom de la node */
  var name = dae.getAttribute('id');

  /* note: Les nodes skin sont dépendantes de bones/joints, qui sont
   * des transforms. Ces transforms ne sont crées qu'a l'occasion de l'extraction
   * du graph de scene ( this._procNod ). C'est pourquoi on doit
   * configurer les controllers APRES l'extraction du graph. Et ceci
   * implique que Le shape doit être crée et assigné a l'avance à la
   * node qui a l'instance du controller, car le controller n'existe
   * pas encore lors de l'extraction du graph (contrairement aux mesh
   * light et camera crées à l'avance, pouvant être assigné durant le
   * parcour du graph).
   *
   * C'est pourquoi la node skin n'est pas crée dans cette function,
   * mais est seulement retrouvé dans la liste via déduction de son nom
   * Si la node skin n'est pas créé lors de l'extraction du graph et
   * existe pourtant bien dans le fichier, c'est qu'il n'est pas
   * instancé par une quelconque node du graph */

  /* pour ranger notre node */
  var node;

  /* On verifie la présence d'un élément <skin> dans le <controller> */
  if (this._hasChildByTag(dae, 'skin'))
  {
    /* on retrouve notre node skin dans la liste */
    node = this._retrieveNode(name);
    if (node == null) {
      /* la node n'est pas trouvé ? soit elle n'est pas instanciée
       * dans le graph de node, soit le mask d'import a ommit
       * l'extraction du graph tout en demandant l'extraction des
       * controllers, et ceci NE FONCTIONNE PAS car le skin est
       * dépendants des bones/joints qui SONT DANS le graph et
       * pas ailleurs */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Skin '" + name + "' not found as instanced: Ignored. ");
          
      return null;
    }

    /* notre future liste d'indice de bones pour les vertices * /
          var ijointa;
          /* notre future liste de poids pour les vertices */
    var weighta;
    /* notre future liste de positions de vertices de référence */
    var refposa;
    /* notre future matrice bind pose du shape */
    var bsmatrix;
    /* nos futures matrices bind pose des bones */
    var bimatrix;
    /* notre liste de bones associés au skin */
    var bonesa;

    /* L'élément <skin> du <controller> */
    var sk = dae.getElementsByTagName('skin')[0];
    /* on récuper la liste des éléments poids, joints et autres pour
     * le skinning */

    /* on constitue un tableau pour nos sources */
    var VWS = new Object();
    VWS['weight'] = new Object();
    VWS['weight']['offset'] = -1;
    VWS['weight']['data'] = null;
    VWS['bonesi'] = new Object();
    VWS['bonesi']['offset'] = -1;
    VWS['bonesi']['data'] = null;

    /* L'élément <vertex_weights> du <skin> */
    var vw = sk.getElementsByTagName('vertex_weights');
    /* les elements <input> du <vertex_weights> */
    var wi = vw[0].getElementsByTagName('input');
    
    var i = wi.length;
    /* parcours de la liste des <input> */
    while (i--) {
      /* L'attribut 'semantic' du <input> est-il WEIGHT ? */
      if (wi[i].getAttribute('semantic') == 'WEIGHT')
      {
        /* on note l'offset d'indice pour les weight */
        VWS['weight']['offset'] = parseInt(wi[i].getAttribute('offset'));
        /* on retrouve l'élément <source> de cet <input> */
        var s = this._getChildById(sk, wi[i].getAttribute('source').substring(1));

        /* on retrouve l'élément <float_array> du <source> */
        var f = s.getElementsByTagName('float_array')[0];
        var d = this._gTxtDataSplit(f.childNodes);
        var array = new Float32Array(parseInt(f.getAttribute('count')));
        var c = d.length;
        var u = 0;
        for (var k = 0; k < c; k++) {
          array[u] = parseFloat(d[k]);
          if (!isNaN(array[u])) u++;
        }
        /* on range nos data pour les weights */
        VWS['weight']['data'] = array;
      }

      /* L'attribut 'semantic' du <input> est-il JOINT ? */
      if (wi[i].getAttribute('semantic') == 'JOINT')
      {
        /* on note l'offset d'indice pour les indices de bones */
        VWS['bonesi']['offset'] = parseInt(wi[i].getAttribute('offset'));
        /* on retrouve l'élément <source> de cet <input> */
        var s = this._getChildById(sk, wi[i].getAttribute('source').substring(1));
        /* on retrouve l'élément <Name_array> du <source> */
        var a = s.getElementsByTagName('Name_array')[0];
        var d = this._gTxtDataSplit(a.childNodes);
        var array = new Array();
        var c = d.length;
        for (var k = 0; k < c; k++) {
          if (d[k].length > 1)
            array.push(d[k]);
        }
        /* on range nos data pour les bones id (en fait, une
         * liste de noms) */
        VWS['bonesi']['data'] = array;
      }
    }

    /* Avons nous les données nécéssaires pour continuer ? */
    if (VWS['weight']['offset'] == -1 ||
        VWS['bonesi']['offset'] == -1 ||
        VWS['weight']['data'] == null ||
        VWS['bonesi']['data'] == null)
    {
      /* il manque l'essentiel */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Skin '" + node.name +
          "' missing <input> informations: Aborting.");
      return null;
    }

    var k, u, c, i, j, w, d; /* quelques variables réutilisables */

    /* creation de la liste des weights et des indices de bones
     * selon la liste d'indice du <skin>. Partie un peu complexe
     * où il n'est pas mauvais de détailler */

    /* le nombre de vertex du skin, doit correspondre exactement
     * au nombre de vertice du shape skinné */
    var wc = parseInt(vw[0].getAttribute('count'));
    if (wc == 0) {
      /* 0 poids ? est-ce une blague (ça arrive, he oui) */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Skin '" + node.name +
          "' no weights data found: Aborting.");
      return null;
    }


    /* Pour chaque vertex visé, il y'a un liste d'influences (bones)
     * et une liste de poids correspondant à cette unfluence. Ce
     * nombre n'est pas constant car tous les vertices ne sont pas
     * nécéssairement influencé par le même nombre d'influences. Les
     * indices de poids et influences du Collada sont disposés
     * tel que :
     *
     * [ vertex 1 ][       vertex 2       ][ vertex 3 ][etc..
     * [ vcount=2 ][       vcount=4       ][ vcount=2 ][etc..
     * [i][w][i][w][i][w][i][w][i][w][i][w][i][w][i][w][etc..
     *
     * pour
     * i = indice de bone/joint
     * w = indice du poids
     *
     * */

    /* notre future nombre total d'indice à traiter */
    var ic = 0;
    /* L'élément vcount nous fourni le nombre d'influence pour
     * chaque vertex */
    d = this._gTxtDataSplit(
        vw[0].getElementsByTagName('vcount')[0].childNodes);
    var vcount = new Uint16Array(wc);
    c = d.length;
    u = 0;
    for (k = 0; k < c; k++) {
      vcount[u] = parseInt(d[k]);
      if (!isNaN(vcount[u])) {
        ic += (vcount[u] * 2); u++;
      }
    }

    /* l'element <v> nous fournie la liste entrelacée d'indice de bones
     * et d'indice de poids modulé par vcount */
    d = this._gTxtDataSplit(
        vw[0].getElementsByTagName('v')[0].childNodes);
    var indices = new Uint16Array(ic);
    c = d.length;
    u = 0;
    for (k = 0; k < c; k++) {
      indices[u] = parseFloat(d[k]);
      if (!isNaN(indices[u])) u++;
    }

    /* on reconstitue deux listes séparés avec les indices de
     * bones d'un coté et les poids de l'autre */
    /* notre liste d'indice de bone par vertex pour la node skin
     * 4 indice par vertex maximum */
    ijointa = new Float32Array(4 * wc);
    /* notre liste de poids par vertex pour la node skin 4 poids
     * par vertex maximum */
    weighta = new Float32Array(4 * wc);

    /* on initialise le tableau d'indice à -1.0 */
    for (i = 0; i < (wc * 4); i++)
      ijointa[i] = -1.0;

    /* on désentrelace les indices pour constituer les deux
     * listes */
    w = 0; k = 0;
    /* offset des poids (à priori toujours 0) */
    var wo = VWS['weight']['offset'];
    /* offset des joints (à priori toujours 1) */
    var jo = VWS['bonesi']['offset'];
    /* pour tous les vertex du skin */
    for (i = 0; i < wc; i++) {
      w = vcount[i];
      /* pour le nombre d'influence de ce vertex */
      for (j = 0; j < w; j++) {
        /* les indices de bones */
        ijointa[(i * 4) + j] = indices[k + (j * 2) + jo];
        /* les poids correspondants */
        weighta[(i * 4) + j] =
            VWS['weight']['data'][indices[k + (j * 2) + wo]];
      }
      /* on avance dans les indices du nombre d'influence
       * par vertex fois 2: vcount * ([i][w]) */
      k += w * 2;
    }



    /* Récupération des positions de vertex du mesh ciblé par le
     * skin.
     *
     * Le mesh étant généralement découpé en polyset, puis réoptimisé
     * selon notre cuisine interne, la seule garantie que nous avons
     * de faire correspondre les informations de poids/bones aux
     * bons vertices est de comparer les positions des vertices.(NB:
     * seul la position des vertices est déterminente pour le skin
     * donc même si certains poids/vertex sont dupliqués, seule la
     * position est indispensable a testé).
     *
     * Pour s'assurer que les poids correspondront aux vertex de la
     * node mesh, on récupère la liste des positions de vertex tel
     * qu'elle est arrangé dans le descripteur <geometry> du collada
     * assumant qu'elle correspond exactement avec l'arrangement des
     * vertex-poids du présent skin (ça DEVRAIT être le cas, si non
     * c'est l'export Collada qui est en cause)
     *
     * Cette liste de positions de référence sera soumis a la node
     * skin en même temps que les liste de poids et de bonid, et
     * la fonction de bind fera la correspondance à ce moment là pour
     * mapper les poids et les indices sur les vertex du mesh.
     *
     * Ces positions de référence n'auront plus aucune utilité après
     * le mappage des poids et indices de bone.
     *
     * */

    /* Retrouve l'élément <geometry> source du <skin> */
    var g = this._getById('geometry', sk.getAttribute('source').substring(1));
    /* L'élement <vertices> du <geometry> */
    var v = g.getElementsByTagName('vertices')[0];
    /* Les éléments <input> du <vertices> */
    var vi = v.getElementsByTagName('input');
    var i = vi.length;
    /* parcours de la liste des <input> */
    while (i--) {
      /* on retrouve le <input> qui concerne les POSITION */
      if (vi[i].getAttribute('semantic') == 'POSITION') {
        /* voilà notre <source> correspondant aux positions
         * de vertex du <geometry> */
        var vp = this._getChildById(g.getElementsByTagName('mesh')[0], vi[i].getAttribute('source').substring(1));
        /* on reconstitue la liste des positions de référence */
        /* L'élément <float_array> de la <source> */
        var f = vp.getElementsByTagName('float_array')[0];
        var d = this._gTxtDataSplit(f.childNodes);
        refposa = new Float32Array(parseInt(f.getAttribute('count')));
        var c = d.length;
        var u = 0;
        for (k = 0; k < c; k++) {
          refposa[u] = parseFloat(d[k]);
          if (!isNaN(refposa[u])) u++;
        }
      }
    }

    /* On compare le nombre de vertex-poids avec le nombre de
     * position du <geometry> de référence, si ce n'est pas
     * exactement le même, c'est qu'il y'a un GROS problème */
    if ((refposa.length / 3) != wc) {
      /* pas le même nombre de vertex-poids et de positions ?
       * on abandonne */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Skin '" + node.name +
          "' positions/wheights count mismatch (" +
          (refposa.length / 3) + '/' + wc +
          '): Aborting.');
      return null;
    }

    /* On s'occupe maintenant des bones associés au skin et de leur
     * matrice de bind pose inversé
     *
     * chaque bone a normalement une matrice inverse correspondant à
     * sa pose au moment de la liaison entre les bones et le mesh
     * qu'ils influencent.
     *
     * Ces matrices permettent de créer un 'instantané' de référence
     * pour la transformation des vertices */

    /* notre future liste de bones pour le skin */
    var bonesa = new Array();

    /* nous avons déja récupéré le noms des bones précédemment */
    c = VWS['bonesi']['data'].length;
    var n; /* reference à notre node joint */
    for (i = 0; i < c; i++) {
      /* on recherche le node transform du bone via son nom */
      var n = this._retrieveNode(VWS['bonesi']['data'][i]);
      /* on ajoute la node à la liste */
      bonesa.push(n);
      /* Mention optionelle dans les logs */
      Ovoid.log(3, 'Ovoid.Collada ' + this.name,
          "Skin '" + node.name +
          "' has influence joint '" + n.name + "'");
    }

    /* notre futur liste de bind pose matrice inverse des bones */
    var bimatrix = new Array();
    
    /* L'élément <joints> du <skin> */
    var sj = sk.getElementsByTagName('joints');
    /* Les éléments <input> de <joints> */
    var ji = sj[0].getElementsByTagName('input');
    var i = ji.length;
    /* Parcours de la liste des <input> */
    while (i--) {
      /* L'attribut 'semantic' du <input> est-il
       * INV_BIND_MATRIX ? */
      if (ji[i].getAttribute('semantic') == 'INV_BIND_MATRIX') {
        /* Retrouve la <source> pour cet <input> */
        var ms = this._getChildById(sk, ji[i].getAttribute('source').substring(1));
        /* L'élément <float_array> de la source */
        var f = ms.getElementsByTagName('float_array')[0];
        var d = this._gTxtDataSplit(f.childNodes);
        var array = new Float32Array(16); /* float 4x4 */
        var c = d.length;
        var u = 0;
        var matrix; /* notre matrice temporaire */
        for (var k = 0; k < c; k++) {
          array[u] = parseFloat(d[k]);
          if (!isNaN(array[u])) u++;
          /* lorsque nous avons traité 16 floats, on ajoute
           * la matrice à la liste */
          if (u > 15) {
            /* Cree une nouvelle matrice */
            mat = new Ovoid.Matrix4(array);
            /* Column-major vers Row-major */
            mat.toTranspose();
            /* on ajoute */
            bimatrix.push(mat);
            u = 0;
          }
        }
        break; /* on arrête le parcour de la liste */
      }
    }


    /* On verifie qu'on a bien une matrice bind pose pour chaque
     * bone, si ce n'est pas le cas, c'est problématique. */
    if (bimatrix.length != bonesa.length) {
      /* il manque des matrices bind pose ? on abandonne */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Skin '" + node.name +
          "' joints list / bind matrices count mismatch. Aborting.");
      return null;
    }

    /* On recupère la matrice bind pose du shape.
     *
     * cette matrice représente l'instanté de la position du mesh
     * lorsque le skinning est appliqué. Comme pour les matrices
     * inverse des bones, cette matrice sert pour la transformation
     * des vertices */

    /* On récupere la matrice bind pose du shape/mesh */
    bsmatrix = new Ovoid.Matrix4(); /* on crée une matrice 4x4 */

    /* L'élément <bind_shape_matrix> du <skin> */
    var sm = sk.getElementsByTagName('bind_shape_matrix');
    
    var d = this._gTxtDataSplit(sm[0].childNodes);
    c = d.length;
    u = 0;
    for (k = 0; k < c; k++) {
      bsmatrix.m[u] = parseFloat(d[k]);
      if (!isNaN(bsmatrix.m[u])) u++;
    }
    /* Column-major vers Row-major */
    bsmatrix.toTranspose();

    /* On retrouve finalement la node mesh cible de ce skin */

    /* on recherche la node dans la liste via deduction de son nom */
    var mesh = this._retrieveNode(sk.getAttribute('source').substring(1));
    if (mesh) {
      /* Mention optionelle dans les logs */
      Ovoid.log(3, 'Ovoid.Collada ' + this.name,
          "Skin '" + node.name +
          "' has binded mesh '" + mesh.name + "'");
    } else {
      /* on a pas trouvé le mesh ? inutile de continuer */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Skin '" + node.name +
          "' binded mesh '" +
          this._pfix + sk.getAttribute('source').substring(1) +
          "' not found. Aborting.");
      return null;
    }

    /* Nous y voilà, les informations rassemblé on configure le
     * skin pour de bon */
    /* Ajout des bones dans le skin (dans l'ordre) */
    var c = bonesa.length;
    for (var i = 0; i < c; i++) {
      node.linkJoint(bonesa[i]);
    }

    /* On procède au bind skin */
    node.bindSkin(mesh, bsmatrix, bimatrix, refposa, ijointa, weighta);

    /* Sur demande on reparent le joint root au skin */
    if (this._mask & Ovoid.DAE_REPARENT_SKIN) {
      bonesa[0].setParent(node.link[0]);
    }
    return node;
  }

  /* Recherche un <morph> dans le <controller> */
  if (this._hasChildByTag(daeController, 'morph')) {
    /* le morph n'est pas implémenté */
    Ovoid.log(2, 'Ovoid.Collada ' + this.name,
        "controller '" + name +
        "' <morph> controller not yet supported");
    return null;
  } else {
    /* Ni un <skin> ni un <morph> ? Kesako ? */
    Ovoid.log(2, 'Ovoid.Collada ' + this.name,
        "controller '" + name +
        "' unknow controller type");
    return null;
  }
};


/**
 * Proceed to creation and/or setting (transform) of new or allready
 * created transform (camera, light) or bone node from a DOM node of a DAE
 * <node> descriptor.
 * 
 * @param {Object} dae DOM node of the DAE node descriptor.
 *
 * @return {Object} Transform|Body|Camera|Light Object or NULL if import fail.
 * 
 * @see Ovoid.Transform
 * @see Ovoid.Body
 * @see Ovoid.Camera
 * @see Ovoid.Light
 */
Ovoid.Collada.prototype._procNod = function(dae) {

  /* confection du nom de la node */
  var name = this._pfix + dae.getAttribute('id')  + this._sfix;
  /* pour ranger notre future node */
  var node = null;

  /* On commence par rechercher les instances presentes dans le
   * descripteur <node>. Différents cas de figure selon le type
   * d'instance.
   *
   * Pour les camera et les lumieres, les nodes du moteur étant
   * déja hérité des transform, on se contente de les retrouver et de
   * leur appliquer les transformations voulues.
   *
   * Pour les mesh on retrouve la node mesh précédemment crée et
   * on en fait le shape d'une nouvelle node de type body. On applique
   * finalement les transformations au body.
   *
   * Pour les controllers (skin) on crée à la fois une nouvelle node
   * skin dont on fait le shape d'une nouvelle node de type body. Si
   * il y'en a on applique finalement les transformations.
   *
   * Si aucune instance n'est présente, il s'agit en général d'un NULL
   * ou d'un groupe sans shape, ou alors qu'un JOINT (bone). Selon cas
   * on crée une nouvelle node bone ou un Transform sans shape.
   *
   *  */

  /* Le <node> a-t-il un element <instance_camera> ? */
  if (this._hasChildByTag(dae, 'instance_camera'))
  {
    /* L'élément <instance_camera> du <node> */
    var di = this._getChildByTag(dae, 'instance_camera');
    /* récupère le nom de la node, déduit de l'instance <camera>
     * retrouvé via l'attribut url */
    var dn = di[0].getAttribute('url').substring(1);
    /* on retrouve la node camera d'après son nom de 'shape' */
    node = this._retrieveNode(dn);
    /* a-t-on retrouvé la camera ? */
    if (node) {
      /* On renome la camera d'après nom de la node plutot
       * que de celui du 'shape' */
      Ovoid.log(3, 'Ovoid.Collada ' + this.name,
          "'" + node.name + "' is instance camera '" +
          name + "'");
      node.name = name;
    } else {
      /* on a pas retrouvé la camera ? inutile de continuer */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "'" + dn + "' instance camera not found '" +
          name + "'");
      return null;
    }
  }
  /* Le <node> a-t-il un element <instance_light> ? */
  if (this._hasChildByTag(dae, 'instance_light'))
  {
    /* L'élément <instance_light> du <node> */
    var di = this._getChildByTag(dae, 'instance_light');
    /* récupère le nom de la node, déduit de l'instance <light>
     * retrouvé via l'attribut url */
    var dn = di[0].getAttribute('url').substring(1);
    /* on retrouve la node camera d'après son nom de 'shape' */
    node = this._retrieveNode(dn);
    /* a-t-on retrouvé la light ? */
    if (node) {
      /* On renome la light d'après nom de la node plutot
       * que de celui du 'shape' */
      Ovoid.log(3, 'Ovoid.Collada ' + this.name,
          "'" + node.name + "' is instance light '" +
          name + "'");
      node.name = name;
    } else {
      /* on a pas retrouvé la light ? inutile de continuer */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "'" + dn + "' instance light not found '" +
          name + "'");
      return null;
    }
  }
  /* Le <node> a-t-il un element <instance_geometry> ? */
  if (this._hasChildByTag(dae, 'instance_geometry'))
  {
    /* on crée une nouvelle node body */
    node = new Ovoid.Body(name);
    /* message de log optionnel */
    Ovoid.log(3, 'Ovoid.Collada ' + this.name,
        "Body '" + node.name + "' : created");
    /* L'élément <instance_geometry> du <node> */
    var di = this._getChildByTag(dae, 'instance_geometry');
    /* récupère le nom de la node, déduit de l'instance <geometry>
     * retrouvé via l'attribut url */
    var dn = di[0].getAttribute('url').substring(1);
    /* on retrouve la node mesh d'après son nom de 'shape' */
    var shape = this._retrieveNode(dn);
    /* a-t-on retrouvé le shape ? */
    if (shape) {
      /* on configure le mesh en tant que shape de ce body */
      node.setShape(shape);
      Ovoid.log(3, 'Ovoid.Collada ' + this.name,
          "'" + node.name + "' has geometry shape '" +
          shape.name + "'");
    } else {
      /* on a pas retrouvé la camera ? ça fera un null body */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "'" + node.name +
          "' geometry shape not found '" + dn + "'");
    }
  }
  /* Le <node> a-t-il un element <instance_controller> ? */
  if (this._hasChildByTag(dae, 'instance_controller'))
  {
    /* on crée une nouvelle node body */
    node = new Ovoid.Body(name);
    /* message de log optionnel */
    Ovoid.log(3, 'Ovoid.Collada ' + this.name,
        "Body '" + node.name + "' : created");

    /* L'élément <instance_controller> du <node> */
    var di = this._getChildByTag(dae, 'instance_controller');
    /* on retrouve le descripteur <controller> désigné par l'url
     * de l'instance */
    var cl = this._getById('controller',
        di[0].getAttribute('url').substring(1));
    /* Le descripteur <controller> a-t-il été trouvé ? */
    if (cl) {
      /* Le descripteur <controller> a-t-il un element <skin> ? */
      if (this._hasChildByTag(cl, 'skin')) {
        /* récupère le nom de la node, déduit de l'instance <controller>
         * retrouvé via l'attribut url */
        var dn = this._pfix + di[0].getAttribute('url').substring(1) + this._sfix;
        /* On crée une nouvel node skin qui sera traité plus tard */
        var shape = new Ovoid.Skin(dn);
        /* on configure le skin d'avance en tant que shape de ce body */
        node.setShape(shape);
        /* on ajoute la node skin à la liste pour que le _procCtr puisse
         *  le retrouver */
        this._dstsc.insert(shape);
        Ovoid.log(3, 'Ovoid.Collada ' + this.name,
            "'" + node.name + "' has shape '" +
            shape.name + "'");
      } else {
        /* Si il n'y a pas d'element <skin>, c'est un <morph> ou
          * inconnu, et c'est non pris en chage */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "'" + dn + "' unsuported controller type'");
      }
    } else {
      /* Le descripteur <controller> n'a pas été trouvé ? ça fera un
       * null body */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "'" + dn +
          "' <controller> instance not found.'");
    }
  }

  /* On verifie si le <node> a un attribut 'type' */
  if (dae.getAttribute('type')) {
    /* Est-ce que le type est JOINT ?*/
    if (dae.getAttribute('type') == 'JOINT') {
      /* on crée une nouvelle node joint/bone */
      node = new Ovoid.Joint(name);
      /* message de log optionnel */
      Ovoid.log(3, 'Ovoid.Collada ' + this.name,
          "Joint '" + node.name + "' : created");
    }
  }

  /* A cette étape si la node est NULL c'est qu'aucune instance n'y
   * est associé et qu'il ne s'agit pas non plus d'un type connu
   * on crée donc un Null transform */
  if (!node) {
    /* On crée une nouvelle node transform */
    node = new Ovoid.Transform(name);
    /* message de log optionnel */
    Ovoid.log(3, 'Ovoid.Collada ' + this.name,
        "Transform (NULL) '" + node.name + "' : created");
  }

  /* Retrouve et applique les transformations a la node */
  /* Elément <matrix> du <node> */
  var dm = this._getChildByTag(dae, 'matrix');
  /* Elément <translate> du <node> */
  var dt = this._getChildByTag(dae, 'translate');
  /* Elément <rotate> du <node> */
  var dr = this._getChildByTag(dae, 'rotate');
  /* Elément <scale> du <node> */
  var ds = this._getChildByTag(dae, 'scale');

  /* Les futures valeurs de transformation */
  var t = new Float32Array([0.0, 0.0, 0.0]);
  var r = new Float32Array([0.0, 0.0, 0.0]);
  var s = new Float32Array([1.0, 1.0, 1.0]);
  var o = new Float32Array([0.0, 0.0, 0.0]);

  /* a-t-on trouvé un élements <matrix> dans le <node> ? */
  if (dm.length) {
    /* on décompose la matrice pour extraire les translations
     * et rotations du node */

    /* ce devrait être une liste de float */
    var d = this._gTxtDataSplit(dm[0].childNodes);
    /* Une nouvelle matrice */
    var mat = new Ovoid.Matrix4(d);
    /* Column-major vers Row-major */
    mat.toTranspose();

    /* Recuperation des composants de translation */
    t[0] = mat.m[12]; t[1] = mat.m[13]; t[2] = mat.m[14];

    /* Recuperation des composants de rotation */
    var cy = Math.sqrt(mat.m[0] * mat.m[0] + mat.m[1] * mat.m[1]);
    if (cy > 0.001) {
      r[0] = Math.atan2(mat.m[6], mat.m[10]);
      r[1] = Math.atan2(-mat.m[2], cy);
      r[2] = Math.atan2(mat.m[1], mat.m[0]);
    } else {
      r[0] = Math.atan2(-mat.m[9], mat.m[5]);
      r[1] = Math.atan2(-mat.m[2], cy);
      r[2] = 0;
    }
  }

  /* a-t-on trouvé un élements <translate> dans le <node> ? */
  if (dt.length) {
    /* une liste de float */
    var data = this._gTxtDataSplit(dt[0].childNodes);
    t[0] = parseFloat(data[0]);
    t[1] = parseFloat(data[1]);
    t[2] = parseFloat(data[2]);
  }

  /* a-t-on trouvé des élements <rotate> dans le <node> ? */
  if (dr.length) {
    var i = dr.length;
    /* parcours des elements <rotate> (en généralement un par axe) */
    while (i--) {
      /* retrouve le composant Axis-Aangle du <rotate> : 4 floats */
      var aa = this._gTxtDataSplit(dr[i].childNodes);
      /* On verifie l'attribue sid de l'élément <rotate>, si on
       * trouve le terme 'Orient', il s'agit probablement d'un
       * jointOrient typique de maya. On le traitera donc comme
       * un orientation */
      if (dr[i].getAttribute('sid').indexOf('Orient', 0) != -1) {
        /* Reconstitution de l'orientation à partir des Axis-Angles */
        /* Les valeurs d'entrée sont en Degrés, on les passe en radians */
        o[0] += parseFloat(aa[0]) * Ovoid.deg2Rad(parseFloat(aa[3]));
        o[1] += parseFloat(aa[1]) * Ovoid.deg2Rad(parseFloat(aa[3]));
        o[2] += parseFloat(aa[2]) * Ovoid.deg2Rad(parseFloat(aa[3]));
      } else {
        /* Reconstitution de la rotation à partir des Axis-Angles */
        /* Les valeurs d'entrée sont en Degrés, on les passe en radians */
        r[0] += parseFloat(aa[0]) * Ovoid.deg2Rad(parseFloat(aa[3]));
        r[1] += parseFloat(aa[1]) * Ovoid.deg2Rad(parseFloat(aa[3]));
        r[2] += parseFloat(aa[2]) * Ovoid.deg2Rad(parseFloat(aa[3]));
      }
    }
  }
  /* a-t-on trouvé des élements <scale> dans le <node> ? */
  if (ds.length) {
    /* une liste de float */
    var d = this._gTxtDataSplit(ds[0].childNodes);
    s[0] = parseFloat(d[0]);
    s[1] = parseFloat(d[1]);
    s[2] = parseFloat(d[2]);
  }

  /* On applique les transformation au node d'après les éléments
   * extrait précédemment */
  node.moveXyz(t[0], t[1], t[2], Ovoid.WORLD, Ovoid.ABSOLUTE);
  node.rotateXyz(r[0], r[1], r[2], Ovoid.LOCAL, Ovoid.RELATIVE);
  node.orientXyz(o[0], o[1], o[2], Ovoid.LOCAL, Ovoid.RELATIVE);
  node.scaleXyz(s[0], s[1], s[2], Ovoid.ABSOLUTE);

  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
        "Transform '" + node.name + "' move:" 
        + t[0] + ', ' + t[1] + ', ' + t[2]);
       
  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
        "Transform '" + node.name + "' rotate:" 
        + r[0] + ', ' + r[1] + ', ' + r[2]);
        
  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
        "Transform '" + node.name + "' orient:" 
        + o[0] + ', ' + o[1] + ', ' + o[2]);

  Ovoid.log(3, 'Ovoid.Collada ' + this.name,
        "Transform '" + node.name + "' scale:" 
        + s[0] + ', ' + s[1] + ', ' + s[2]);
        
  /* retourne la node transformée */
  return node;
};


/**
 * Proceed to creation and setting  of new animation node from a DOM
 * node of a DAE <animation> descriptor.
 * 
 * @param {Object} dae DOM node of the DAE node descriptor.
 *
 * @return {Animation} Animation object or NULL if import fail.
 * 
 * @see Ovoid.Animation
 */
Ovoid.Collada.prototype._procAni = function(dae) {

  /* L'export Collada d'animation, lorsque correctement effectué doit
   * comporter des éléments <animation> généraux pour chaque node
   * ciblé (une animation générale par node) contenant d'autres
   * éléments <animation> imbriqués détaillant chaque cannal
   * correspondant à un courbe donnée (translate, rotate, etc.).
   *
   * néanmoins, certains exports crée une animation générale
   * pour chaque canal, ce qui logiquement aboutierais à la création
   * d'une node animation par canal, ce qui manque d'optimisation
   *
   * Pour cette raison, il est préférable de traité chaque animation
   * comme un cas particulier pour en refaire un cas général, la node
   * animation est donc crée si elle n'existe pas, ou retrouvé si elle
   * existe déja */

  /* on récupère le sid de l'animation pour les logs */
  var aid = dae.getAttribute('id');

  /* On recupère d'abord les sources de l'animation */

  /* Future tableau contenant les sources de l'animation */
  var ASL = new Object(); /* Animation Sources List */

  ASL['id'] = new Array();
  ASL['count'] = new Array();
  ASL['stride'] = new Array();
  ASL['data'] = new Array();
  ASL['type'] = new Array();

  /* Les éléments <source> de l'animation */
  var as = dae.getElementsByTagName('source');

  var i = as.length;
  /* Parcours des <source> */
  while (i--) {
    /* l'élément source comporte-t-il un élément <float_array> ? */
    if (as[i].getElementsByTagName('float_array').length) {
      /* Recupère l'id de la <source> */
      ASL['id'].push(as[i].getAttribute('id'));
      /* on recupère les attributs 'count' et 'stride' du <accessor> */
      ASL['count'].push(parseInt(as[i].getElementsByTagName('accessor')[0].getAttribute('count')));
      ASL['stride'].push(parseInt(as[i].getElementsByTagName('accessor')[0].getAttribute('stride')));
      /* récupère l'élément <param>, normalement dans le <accessor> */
      /* on récupère le type de données du <source> */
      ASL['type'].push(as[i].getElementsByTagName('param')[0].getAttribute('type'));
      /* On récupère les données brute du <float_array> */
      var f = as[i].getElementsByTagName('float_array')[0];
      var d = this._gTxtDataSplit(f.childNodes);
      var array = new Float32Array(parseInt(f.getAttribute('count')));
      var c = d.length;
      var u = 0;
      for (var k = 0; k < c; k++) {
        array[u] = parseFloat(d[k]);
        if (!isNaN(array[u])) u++;
      }
      /* on ajoute les données au tableau */
      ASL['data'].push(array);

    }
    /* l'élément source comporte-t-il un élément <Name_array> ? */
    if (as[i].getElementsByTagName('Name_array').length) {
      /* Recupère l'id de la <source> */
      ASL['id'].push(as[i].getAttribute('id'));
      /* on recupère les attributs 'count' et 'stride'
       * du <accessor> */
      ASL['count'].push(parseInt(as[i].getElementsByTagName('accessor')[0].getAttribute('count')));
      ASL['stride'].push(parseInt(as[i].getElementsByTagName('accessor')[0].getAttribute('stride')));
      /* récupère l'élément <param>, normalement dans le <accessor> */
      /* on récupère le type de données du <source> */
      ASL['type'].push(as[i].getElementsByTagName('param')[0].getAttribute('type'));
      /* On récupère les données brute du <Name_array> */
      var f = as[i].getElementsByTagName('Name_array')[0];
      var d = this._gTxtDataSplit(f.childNodes);
      var array = new Array(parseInt(f.getAttribute('count')));
      var c = d.length;
      var u = 0;
      for (var k = 0; k < c; k++) {
        array[u] = d[k];
      }
      /* on ajoute les données au tableau */
      ASL['data'].push(array);
    }
  }

  /* On récupère désormais l'élément <channel> de l'animation */

  /* un nouveau tableau pour stoquer nos données */
  var ACD = new Object(); /* Animation Channel Data */

  ACD['name'] = new Array();    /* name */
  ACD['tname'] = new Array();   /* target name */
  ACD['ttsid'] = new Array();   /* target transform sid */
  ACD['ttaxis'] = new Array();  /* target transform axis */
  ACD['xdata'] = new Array();   /* valeurs courbe X */
  ACD['ydata'] = new Array();   /* valeurs courbe Y */
  ACD['ytype'] = new Array();   /* type de donnée Y */
  ACD['idata'] = new Array();   /* valeurs tangent In */
  ACD['odata'] = new Array();   /* valeurs tangent Out */
  ACD['xerp'] = new Array();    /* type d'interpolation */

  /* Les éléments <channel> de <animation> */
  var ac = dae.getElementsByTagName('channel');
  var i = ac.length;
  /* Parcours de la liste des <channel> */
  while (i--) {

    /* On décompose les informations 'target' du channel pour en
     * extraire trois choses indispensables:
     *
     * - Le nom de la node qui est l'objet de l'animation
     * - Le Sid de la transformation qui est l'objet de l'animation
     * - L'axe, si il y'en a un, de la transformation
     *
     * Les information target ont heureusement une syntaxe
     * facilement parsable :
     *
     * => chaine                  [0]    [1][0]       [1][1]
     * 'cube1/location.X'     => cube1  location     X
     * 'cube1/rotateX.ANGLE'  => cube1  rotateX      ANGLE
     *
     * Le nom de la node objet de l'animation servira également a
     * confectionner le nom de l'animation, permettant de retrouver
     * l'animation par son nom dans le cas ou plusieurs descripteurs
     * <animation> existerait la même node ciblé, évitant de créer
     * une nouvelle animation à chaque fois.
     *
     */

    /* Recupere l'attribut 'target' du <channel> puis on
     * split entre le nom de la node et la partie droite */
    var split = ac[i].getAttribute('target').split('/');
    /* le premier element est notre nom de node */
    ACD['tname'].push(split[0]);
    /* on confection le nom de l'animation avec également */
    ACD['name'].push(split[0] + 'Animation');
    /* on split la partie de droite une fois encore */
    split = split[1].split('.');
    /* On retrouve le Sid du transform et l'axe */
    ACD['ttsid'].push(split[0]);
    ACD['ttaxis'].push(split[1]);

    /* L'élément <sampler> dont l'id est donnée par l'arribut
     * 'source' du <channel> */
    var as = this._getById('sampler', ac[i].getAttribute('source').substring(1));
    /* Les éléments <input> du sampler */
    si = as.getElementsByTagName('input');
    /* Parcours des <input> pour faire correspondre les <source>
     * précédemment récupérés */
    var j = si.length;
    while (j--) {
      /* l'attribut 'semantic' du <input> est INPUT ? */
      if (si[j].getAttribute('semantic') == 'INPUT') {
        /* on récuper l'id de la <source> correspondante */
        var id = si[j].getAttribute('source').substring(1);
        var k = ASL['id'].length;
        /* parcours de la liste de source pour retrouver
         * celle qui correspond */
        while (k--) {
          if (ASL['id'][k] == id) {
            /* voilà nos valeurs temporelles */
            ACD['xdata'].push(ASL['data'][k]);
          }
        }
      }
      /* l'attribut 'semantic' du <input> est OUTPUT ? */
      if (si[j].getAttribute('semantic') == 'OUTPUT') {
        /* on récuper l'id de la <source> correspondante */
        var id = si[j].getAttribute('source').substring(1);
        var k = ASL['id'].length;
        /* parcours de la liste de source */
        while (k--) {
          if (ASL['id'][k] == id) {
            /* nos valeurs d'animation */
            ACD['ydata'].push(ASL['data'][k]);
            /* le format de données */
            ACD['ytype'].push(ASL['type'][k]);
          }
        }
      }
      /* l'attribut 'semantic' du <input> est IN_TANGENT ? */
      if (si[j].getAttribute('semantic') == 'IN_TANGENT') {
        /* on récuper l'id de la <source> correspondante */
        var id = si[j].getAttribute('source').substring(1);
        var k = ASL['id'].length;
        /* parcours de la liste de source */
        while (k--) {
          if (ASL['id'][k] == id) {
            /* nos valeurs tangant In */
            ACD['idata'].push(ASL['data'][k]);
          }
        }
      }
      /* l'attribut 'semantic' du <input> est OUT_TANGENT ? */
      if (si[j].getAttribute('semantic') == 'OUT_TANGENT') {
        /* on récuper l'id de la <source> correspondante */
        var id = si[j].getAttribute('source').substring(1);
        var k = ASL['id'].length;
        /* parcours de la liste de source */
        while (k--) {
          if (ASL['id'][k] == id) {
            /* nos valeurs tangant Out */
            ACD['odata'].push(ASL['data'][k]);
          }
        }
      }
      /* l'attribut 'semantic' du <input> est OUT_TANGENT ? */
      if (si[j].getAttribute('semantic') == 'INTERPOLATION') {
        /* on récuper l'id de la <source> correspondante */
        var id = si[j].getAttribute('source').substring(1);
        var k = ASL['id'].length;
        /* parcours de la liste de source */
        while (k--) {
          if (ASL['id'][k] == id) {
            /* le type d'interpolation */
            ACD['xerp'].push(ASL['data'][k]);
          }
        }
      }
    } // while (j--)
  } // parcours des <animation>/<channel>

  /* les données receuillis on reconstitue l'animation */

  /* pour le nombre de <channel> trouvé */
  var i = ACD['name'].length;
  /* on parcours la liste */
  while (i--)
  {
    /* On verifie qu'il y'a plus d'une clé pour la courbe sans quoi
     * le moteur ne gère pas l'animation, qui n'aurait par ailleurs
     * aucun intéret */
    if (ACD['xdata'][i].length < 2) {
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "Animation '" + aid +
          "' has only one keyframe: ignored.");
      continue; /* on passe au cannal suivant */
    }

    /* no futurs tableaux de données pour l'animation */
    var channel = -1;
    var xarray;
    var yarray;
    /* selon le type d'interpolation, les tablaux utilisés ne
     * seront pas les mêmes */
    /* pour le bezier */
    var bxarray;
    var byarray;
    /* pour le hermit */
    var tvarray;

    /* Retrouve le type d'interpolation et traite les données de
     * tangant in / out
     *
     * En l'état, la manière dont le Collada fournie les données
     * tangent in/out est pratique pour l'extraction, mais pas pour
     * l'utilisation concrete en animation. Les données doivent donc
     * être réarangés.
     *
     * En l'occurence, le moteur sépare les données X et Y des
     * control-points dans des tableaux différents, mais entrelace
     * les données IN et OUT dans un même tableau. Tel que :
     *
     * Le Collada présente ceci :
     *
     * Tangent IN : [X,Y][X,Y][X,Y][X,Y][X,Y][...
     * Tangent OUT: [X,Y][X,Y][X,Y][X,Y][X,Y][...
     *
     * Le moteur aime cela :
     *
     * Tangent X : [IN](OUT][IN](OUT][IN](OUT][...
     * Tangent Y : [IN](OUT][IN](OUT][IN](OUT][...
     *
     * Ceci pour une raison simple: l'interpolation se fait
     * toujours entre deux clés, la clé de départ avec un tangent
     * OUT et la clé d'arrivé avec un tangent IN
     *
     * L'alignement des tableaux est donc plus simple, puisque
     * (schématiquement) :
     *
     * Index    :    i                     i+1
     * Clés X   : pA.X ---------------> pB.X
     * Clés Y   : pA.Y ---------------> pB.Y
     * Tangent X: tO.X ---------------> tI.X
     * Tangent Y: tO.Y ---------------> tI.Y
     *                 -Interpolation->
     *
     *  pA = clé de départ, pB = clé d'arrivée
     *  tI = Tangent IN, tO = Tangent OUT
     *
     * */

    /* Si le mask d'import impose de forcer en CSPLINE on ne va pas
     * plus loin pour cette partie */
    if (this._mask & Ovoid.DAE_FORCE_CSPLINE) {
      /* on écrase le tableau d'origine par une simple constante */
      ACD['xerp'][i] = Ovoid.INTERPOLATION_CSPLINE;
    } else {
      /* Le collada précise un type d'interpolation par clé. En
       * pratique, c'est la même pour toutes les clés d'un canal
       * donné, on ne teste donc que la première occurence */

      /* S'agit-il d'une interpolation BEZIER ?*/
      if (ACD['xerp'][i][0] == 'BEZIER') {
        /* on écrase le tableau d'origine par une simple constante */
        ACD['xerp'][i] = Ovoid.INTERPOLATION_BSPLINE;

        /* Il faut tester le nombre de valeur de tangant par
         * clé. Si on en trouve le double, ce sont des control-points
         * en 2 dimensions. Si non, c'est du temps linéaire */

        if (ACD['idata'][i].length == (ACD['xdata'][i].length * 2)) {
          /* ce sont des control-point 2D */
          var c = ACD['xdata'][i].length;
          /* on crée les deux tableaux pour stoquer les
           * control-points */
          bxarray = new Float32Array(c * 2);
          byarray = new Float32Array(c * 2);
          var t = 0;
          for (var k = 0; k < c; k++) {
            bxarray[t] = ACD['idata'][i][(k * 2)];    /* in X (time) */
            byarray[t] = ACD['idata'][i][(k * 2) + 1];  /* in Y (val) */
            t++;
            bxarray[t] = ACD['odata'][i][(k * 2)];    /* out X (time) */
            byarray[t] = ACD['odata'][i][(k * 2) + 1];  /* out y (val) */
            t++;
          }
        } else {
          if (ACD['idata'][i].length == ACD['xdata'][i].length) {
            /* ce sont des control-point 1D */
            var c = ACD['xdata'][i].length;
            /* on crée les deux tableaux pour stocker les
             * control-points */
            bxarray = new Float32Array(c * 2);
            byarray = new Float32Array(c * 2);
            var t = 0;
            for (var k = 0; k < c; k++) {
              /* les valeurs X temporelle des control-points est
               * recrée à partir des données temporelles pour une
               * interpolation temporelle linéaire */
              bxarray[t] = ACD['xdata'][i][k - 1] + ((ACD['xdata'][i][k] -
                  ACD['xdata'][i][k - 1]) * 0.9);

              byarray[t] = ACD['idata'][i][(k * 2) + 1];  /* in Y (val) */
              t++;
              bxarray[t] = ACD['xdata'][i][k] + ((ACD['xdata'][i][k + 1] -
                  ACD['xdata'][i][k]) * 0.1);

              byarray[t] = ACD['odata'][i][(k * 2) + 1];  /* out y (val) */
              t++;
            }
          } else {
            /* Le rapport de nombre de tangent et de clé
             * est incohérent ? */
            Ovoid.log(3, 'Ovoid.Collada ' + this.name,
                "Animation '" + aid +
                "' inconsistant tangent/keyframe count ratio");
            /* on ignore l'interpolation, on passe en CSPLINE */
            ACD['xerp'][i] = Ovoid.INTERPOLATION_CSPLINE;
          }
        }
      } else {
        /* S'agit-il d'une interpolation BEZIER ?*/
        if (ACD['xerp'][i][0] == 'HERMITE') {
          /* on doit trouver un ratio de tangent par clé de 1 */
          if (ACD['idata'][i].length == ACD['xdata'][i].length) {
            ACD['xerp'][i] = Ovoid.INTERPOLATION_HSPLINE;

            var c = ACD['xdata'][i].length;
            /* on crée le tableaux pour stocker les tangent vector */
            tvarray = new Float32Array(c * 2);
            var t = 0;
            for (var k = 0; k < c; k++) {
              tvarray[t] = ACD['idata'][i][k]; /* in V */
              t++;
              tvarray[t] = ACD['odata'][i][k]; /* out V */
              t++;
            }
          } else {
            /* Le rapport de nombre de tangent et de clé est
             * incohérent ? */
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                "Animation '" + aid +
                "' wrong tangent/keyframe count ratio");
            /* on ignore l'interpolation, on passe en CSPLINE */
            ACD['xerp'][i] = Ovoid.INTERPOLATION_CSPLINE;
          }
        } else {
          /* Si non c'est une interpolation LINEAR ou inconnue */
          ACD['xerp'][i] = Ovoid.INTERPOLATION_CSPLINE;
        }
      }
    }

    /* Si une animation avec ce nom existe on la retrouve */
    var node = this._retrieveNode(ACD['name'][i]);
    /* Si non on en crée une et on assigne le target */
    if (!node) {
      /* on crée une node animation */
      node = new Ovoid.Animation(this._pfix + ACD['name'][i] + this._sfix);
      /* il faut insérer la node tout de suite */
      this._dstsc.insert(node);
      /* message de log optionnel */
      Ovoid.log(3, 'Ovoid.Collada ' + this.name, 
          "Animation '"+node.name+"' : created");
      /* on retrouve la cible de l'animation */
      var target = this._retrieveNode(ACD['tname'][i]);
      /* Avons nous trouvé la node cible ? */
      if (target) {
        node.setTarget(target);
        Ovoid.log(3, 'Ovoid.Collada ' + this.name,
            "Animation '"+node.name+"' has target '"+target.name+"'");
      } else {
        /* Si on a pas trouvé la node cible, inutile de traiter ce cannal */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Animation '"+node.name+"' target '"+ACD['tname'][i]+"' not found");
        continue;
      }
    }

    /* Il faut déterminer la transformation et l'axe qui fait l'objet
     * de cette animation. Pour cela on va se référer aux Sid des
     * transformations des descripteurs <node>. Ce sont ceux-ci qui
     * sont mentionnés dans les informations 'target' du canal.
     *
     * On commence donc par récuperer les Sid des transformations des
     * <node> qu'on va ensuite comparer avec l'élement extrait des
     * informations 'target' du canal.
     */

    /* on retrouve les axes de rotation selon les sid */



    /* On verifie qu'il y'a un élément <visual_scene> On peut se
     * poser la question de la pertinence de ce test, he bien, il
     * se trouve que c'est déja arrivé qu'il n'y en ai pas... */

    if (this._dae.getElementsByTagName('visual_scene').length == 0) {
      /* Pas d'élément <visual_scene> ? houla ! */
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          'Animation : <visual_scene> not found (Is DAE source corrupted ?).');
      return null;
    }

    /* On retrouve les Sid pour chaque type de transformation */
    /* le Sid pour les matrices */
    var sidm;
    if (this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('matrix').length)
      sidm = this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('matrix')[0].getAttribute('sid');

    /* On compare maintenant avec l'extrait du 'target' */
    /* Est-ce la matrice entière ? */
    if (ACD['ttsid'][i] == sidm)
    {
      /* On verifie qu'il s'agit bien de float4x4 */
      if (ACD['ytype'][i] == 'float4x4') {
        /* Pour les matrices on décompose et extrait les
         * transformations translate et rotate, on ne fait pas
         * d'interpolation de matrice */

        /* il s'agit d'une list de float, on divise par 16
         * pour des matrices 4x4 */
        var n = ACD['ydata'][i].length / 16;
        var mat = new Ovoid.Matrix4();

        /* nos listes de transformation */
        var tx = new Float32Array(n);
        var ty = new Float32Array(n);
        var tz = new Float32Array(n);
        var rx = new Float32Array(n);
        var ry = new Float32Array(n);
        var rz = new Float32Array(n);

        var c;
        for (var k = 0; k < n; k++)
        {
          mat.setv(ACD['ydata'][i].subarray((k * 16), (k * 16) + 16));
          /* Column-major vers Row-major */
          mat.toTranspose();

          /* recuperation des translations */
          tx[k] = mat.m[12]; ty[k] = mat.m[13]; tz[k] = mat.m[14];
          /* recuperation des rotations */
          
          /* Recuperation de la rotation a partir de la matrice.
           * 
           * Cette méthode est inspirée du code source de Blender, mais, 
           * contrairement à la methode de blender, exclu le choix "du meilleur"
           * entre deux eulers, qui en fait, crée plus de problème qu'il n'en 
           * résoud. Occam avait raison... */
          var cy = Math.sqrt(mat.m[0] * mat.m[0] + mat.m[1] * mat.m[1]);
          if (cy > 0.001) {
            rx[k] = Math.atan2(mat.m[6], mat.m[10]);
            ry[k] = Math.atan2(-mat.m[2], cy);
            rz[k] = Math.atan2(mat.m[1], mat.m[0]);
          } else {
            rx[k] = Math.atan2(-mat.m[9], mat.m[5]);
            ry[k] = Math.atan2(-mat.m[2], cy);
            rz[k] = 0;
          }
        }

        /* On ajoute les courbes à l'animation, ici, plusieurs à la fois
         * puisque la matrice nous fournie toutes les transformations
         * d'un seul coup */
        switch (ACD['xerp'][i])
        {
          case Ovoid.INTERPOLATION_BSPLINE:
            node.setBspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_X,
                ACD['xdata'][i], tx, bxarray, byarray);

            node.setBspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y,
                ACD['xdata'][i], ty, bxarray, byarray);

            node.setBspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z,
                ACD['xdata'][i], tz, bxarray, byarray);

            node.setBspline(Ovoid.ANIMATION_CHANNEL_ROTATE_X,
                ACD['xdata'][i], rx, bxarray, byarray);

            node.setBspline(Ovoid.ANIMATION_CHANNEL_ROTATE_Y,
                ACD['xdata'][i], ry, bxarray, byarray);

            node.setBspline(Ovoid.ANIMATION_CHANNEL_ROTATE_Z,
                ACD['xdata'][i], rz, bxarray, byarray);
            break;
          case Ovoid.INTERPOLATION_HSPLINE:
            node.setHspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_X,
                ACD['xdata'][i], tx, tvarray);

            node.setHspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y,
                ACD['xdata'][i], ty, tvarray);

            node.setHspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z,
                ACD['xdata'][i], tz, tvarray);

            node.setHspline(Ovoid.ANIMATION_CHANNEL_ROTATE_X,
                ACD['xdata'][i], rx, tvarray);

            node.setHspline(Ovoid.ANIMATION_CHANNEL_ROTATE_Y,
                ACD['xdata'][i], ry, tvarray);

            node.setHspline(Ovoid.ANIMATION_CHANNEL_ROTATE_Z,
                ACD['xdata'][i], rz, tvarray);
            break;
          default:
            node.setCspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_X,
                ACD['xdata'][i], tx);

            node.setCspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y,
                ACD['xdata'][i], ty);

            node.setCspline(Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z,
                ACD['xdata'][i], tz);

            node.setCspline(Ovoid.ANIMATION_CHANNEL_ROTATE_X,
                ACD['xdata'][i], rx);

            node.setCspline(Ovoid.ANIMATION_CHANNEL_ROTATE_Y,
                ACD['xdata'][i], ry);

            node.setCspline(Ovoid.ANIMATION_CHANNEL_ROTATE_Z,
                ACD['xdata'][i], rz);
            break;
        }

        Ovoid.log(3, 'Ovoid.Collada ' + this.name,
            "'" + node.name + "' add curve channels from matrix");
            
      } else {
        /* le type de donnée n'est pas float4x4 ? on ne connait pas */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Animation '" + node.name +
            "' unsuported matrix data type '" +
            ACD['ytype'][i] + "': Aborting.");
        continue;
      }
    } else {
      /* Si ce n'est pas une matrice il faut déterminer précisément
       * la transformation ciblé */

      /* On retrouve les Sid pour chaque type de transformation */
      var sidt, sidr, sids;
      /* le Sid pour les translate */
      if (this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('translate').length)
        sidt = this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('translate')[0].getAttribute('sid');
      /* LES Sid pour les rotates (au moins trois pour X, Y et Z ) */
      if (this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('rotate').length) {
        var c = this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('rotate').length;
        sidr = new Array(c);
        for (var k = 0; k < c; k++) {
          sidr[k] = this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('rotate')[k].getAttribute('sid');
        }
      }
      /* le Sid pour le scale */
      if (this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('scale').length)
        sids = this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('scale')[0].getAttribute('sid');

      /* repasse le channel en invalide */
      channel = -1;
      
      /* est-ce un translate ? */
      if (ACD['ttsid'][i] == sidt)
        channel = Ovoid.ANIMATION_CHANNEL_TRANSLATE;

      /* est-ce un scale ?*/
      if (ACD['ttsid'][i] == sids)
        channel = Ovoid.ANIMATION_CHANNEL_SCALE;

      /* Avons nous bien des Sid de rotations à tester ? */
      if (sidr) {
        var k = sidr.length;
        while (k--)
        {
          
          /* est-ce un rotate ? */
          if (ACD['ttsid'][i] == sidr[k])
          {
            /* On détermine l'axe de rotation par la partie axe
             * du axis-angle décrit pour l'animation :
             * 1,0,0 = X; 0,1,0 = Y, 0,0,1 = Z */
            var v = this._gTxtDataSplit(this._dae.getElementsByTagName('visual_scene')[0].getElementsByTagName('rotate')[k].childNodes);
            if (parseFloat(v[0]) == 1.0) {
              channel = Ovoid.ANIMATION_CHANNEL_ROTATE_X;
            }
            if (parseFloat(v[1]) == 1.0) {
              channel = Ovoid.ANIMATION_CHANNEL_ROTATE_Y;
            }
            if (parseFloat(v[2]) == 1.0) {
              channel = Ovoid.ANIMATION_CHANNEL_ROTATE_Z;
            }
            break;
          }
        }
      }

      /* Il faut maintenant préciser les axes (scale et translate)
       * et faire les ultimes arrangements */

      /* S'agit-il d'une translation ? on retrouve l'axe */
      if (channel == Ovoid.ANIMATION_CHANNEL_TRANSLATE) {
        if (ACD['ttaxis'][i] == 'X') channel = Ovoid.ANIMATION_CHANNEL_TRANSLATE_X;
        if (ACD['ttaxis'][i] == 'Y') channel = Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y;
        if (ACD['ttaxis'][i] == 'Z') channel = Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z;
      }
      /* Si il s'agit de rotation il faut convertir les valeurs
       * d'entrée degrés en radians */
      if (channel == Ovoid.ANIMATION_CHANNEL_ROTATE_X) {
        var k = ACD['ydata'][i].length;
        while (k--)
          ACD['ydata'][i][k] = Ovoid.deg2Rad(ACD['ydata'][i][k]);
        if (ACD['xerp'][i] == Ovoid.INTERPOLATION_BSPLINE) {
          k = byarray.length;
          while (k--) {
            byarray[k] = Ovoid.deg2Rad(byarray[k]);
          }
        }
      }
      if (channel == Ovoid.ANIMATION_CHANNEL_ROTATE_Y) {
        /* conversion deg to rad */
        var k = ACD['ydata'][i].length;
        while (k--)
          ACD['ydata'][i][k] = Ovoid.deg2Rad(ACD['ydata'][i][k]);
        if (ACD['xerp'][i] == Ovoid.INTERPOLATION_BSPLINE) {
          k = byarray.length;
          while (k--) {
            byarray[k] = Ovoid.deg2Rad(byarray[k]);
          }
        }
      }
      if (channel == Ovoid.ANIMATION_CHANNEL_ROTATE_Z) {
        /* conversion deg to rad */
        var k = ACD['ydata'][i].length;
        while (k--)
          ACD['ydata'][i][k] = Ovoid.deg2Rad(ACD['ydata'][i][k]);
        if (ACD['xerp'][i] == Ovoid.INTERPOLATION_BSPLINE) {
          k = byarray.length;
          while (k--) {
            byarray[k] = Ovoid.deg2Rad(byarray[k]);
          }
        }
      }
      /* S'agit-il d'un scale ? on retrouve l'axe */
      if (channel == Ovoid.ANIMATION_CHANNEL_SCALE) {
        if (ACD['ttaxis'][i] == 'X') channel = Ovoid.ANIMATION_CHANNEL_SCALE_X;
        if (ACD['ttaxis'][i] == 'Y') channel = Ovoid.ANIMATION_CHANNEL_SCALE_Y;
        if (ACD['ttaxis'][i] == 'Z') channel = Ovoid.ANIMATION_CHANNEL_SCALE_Z;
      }

      /* Si on a bien trouvé un cannal on ajoute la courbe à
       * l'animation */
      if (channel != -1) {
        switch (ACD['xerp'][i])
        {
          case Ovoid.INTERPOLATION_BSPLINE:
            node.setBspline(channel,
                ACD['xdata'][i],
                ACD['ydata'][i],
                bxarray,
                byarray);
            break;
          case Ovoid.INTERPOLATION_HSPLINE:
            node.setHspline(channel,
                ACD['xdata'][i],
                ACD['ydata'][i],
                tvarray);
            break;
          default:
            node.setCspline(channel,
                ACD['xdata'][i],
                ACD['ydata'][i]);
            break;
        }

        Ovoid.log(3, 'Ovoid.Collada ' + this.name,
            "'" + node.name + "' add curve channel " +
            ACD['ttsid'][i] + '.' + ACD['ttaxis'][i]);

      } else {
        /* Pas de cannal trouvé ? c'est qu'on ne le gère
         * pas (pas encore) */
        Ovoid.log(2, 'Ovoid.Collada ' + this.name,
            "Animation '" + node.name +
            "' unsuported channel '" +
            ACD['ttsid'][i] + "'");
        continue;
      }
    }
  }

  return node;
};


/**
 * Load the specified source file for this instance.<br><br>
 * 
 * Loads the specified external source file and extracts, decodes or parses the 
 * loaded data. If not specified, the loading is made in the asynchronous way.<br><br>
 *  
 * The <code>loadSatus</code> member indicates the loading status through an 
 * integer value of 0, 1 or -1. A value of 0 means that the file is not yet 
 * loaded, a value of 1 means that the source was successfully loaded, and a 
 * value of -1 means the loading failed.<br><br>
 *
 * @param {string} url Source file name to load.
 * <code>Ovoid.opt_daePath</code> is used as base path.
 * 
 * @param {bool} async Optionnal asynchronous loading flag. If true or not null
 * the source is loaded in asynchronous way.
 * 
 * @param {bool} nopath ignore the default search path 
 * (<code>Ovoid.opt_daePath</code>).
 */
Ovoid.Collada.prototype.loadSource = function(url, async, nopath) {

  this.url = url;

  this.loadStatus = 0;
  var htreq = new XMLHttpRequest();

  /* La définition de onreadystatechange n'est utile qu'en
   * mode asynchrone */
  if (async) {
    htreq.owner = this;

    htreq.onreadystatechange = function()
    {
      if (this.readyState == 4) {
        if (this.status == 200 || this.status == 304) {
          var parser = new DOMParser();
          this.owner._dae = parser.parseFromString(this.responseText,
              'text/xml');
          this.owner.loadStatus = 1;
        } else {
          this.owner.loadStatus = -1;
          Ovoid.log(2, 'Ovoid.Collada ' + this.name,
              "unable to load source '" +
              this.owner.url + "'");
        }
      }
    }
  }

  var src;
  nopath?src='':src=Ovoid.opt_daePath;
  src += this.url;
  if (Ovoid.opt_debugMode) 
    src += '?' + Math.random();
  
  htreq.open('GET', src, async);
  htreq.send(null);

  /* Si nous sommes en mode synchrone */
  if (!async) {
    if (htreq.status == 200 || htreq.status == 304) {
      var parser = new DOMParser();
      this._dae = parser.parseFromString(htreq.responseText,
          'text/xml');
      this.loadStatus = 1;
    } else {
      this.loadStatus = -1;
      Ovoid.log(2, 'Ovoid.Collada ' + this.name,
          "unable to load source '" +
          this.url + "'");
    }
  }
};


/**
 * Import DAE data.<br><br>
 * 
 * Interprets the current parsed COLLADA source and import the result in the
 * given recipient scene according to the specified option bitmask and prefix /
 * suffix renaming rule.
 *
 * @param {bitmask} options Importation options bitmask.
 * @param {Scene} scene Recipient Scene object.
 * @param {string} prefix Prefix used to name imported nodes or null.
 * @param {string} suffix Suffix used to name imported nodes or null.
 *
 * @return {bool} True if import suceeds, false otherwise.
 * 
 * @see Ovoid.Scene
 */
Ovoid.Collada.prototype.importDae = function(options, scene,  
                              prefix, suffix) {

  /* Si le DOM object n'existe on ne peut rien faire */
  if (!this._dae) {
    Ovoid.log(2, 'Ovoid.Collada', 'no DAE data.');
    return false;
  }
  
  Ovoid.log(3, 'Ovoid.Collada', this.url + ' start.');
  
  /* Scene de destination */
  this._dstsc = scene;
  
  /* détermine le nom du collada d'apres l'url */
  this.name = Ovoid.extractName(this.url);
  
  /* définie le suffix */
  if (!suffix) {
    this._sfix = '';
  } else {
    this._sfix = '.' + suffix;
  }

  /* définie le prefix */
  if (!prefix) {
    this._pfix = '';
  } else {
    this._pfix = prefix + '.';
  }

  /* le mask d'importation */
  this._mask = options;

  /* Recupération de l'up-axis */
  var up_axis = this._dae.getElementsByTagName('up_axis')[0].childNodes[0].data;
  if (up_axis == 'Z_UP') {
      this._upaxis = 2;
      Ovoid.log(2, 'Ovoid.Collada ' + this.name, 
          "Z-Up axis, OvoiD.JS usually work in Right-Handed Y-Up.");
  }
  if (up_axis == 'Y_UP') {
     this._upaxis = 1;
  }
  if (up_axis == 'X_UP') {
    this._upaxis = 0;
    Ovoid.log(2, 'Ovoid.Collada ' + this.name, 
        "X-Up axis, OvoiD.JS usually work in Right-Handed Y-Up.");
  }

  /* Crée un track si demandé */
  if (this._mask & Ovoid.DAE_CREATE_TRACK) {
    var track = new Ovoid.Track(this.name + "Track");
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, " Track '" + track.name + "' : created");
  }

  var i, l, node;
  if (this._mask & Ovoid.DAE_MATERIALS) {
    
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' DAE_MATERIALS.');
    
    if (this._dae.getElementsByTagName('library_images').length)
    {
      l = this._dae.getElementsByTagName('library_images')[0].childNodes;
      i = l.length;
      while (i--)
      {
        if (l[i].nodeType == 1) {
          try {
            node = this._procImg(l[i]);
          } 
          catch (e) {
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                " _procImg exception: " + e.stack + ". (Is DAE source corrupted ?).");
          }
          
          if (node) {
            this._dstsc.insert(node);
          }
        }
      }
    }

    if (this._dae.getElementsByTagName('library_materials').length)
    {
      l = this._dae.getElementsByTagName('library_materials')[0].childNodes;
      i = l.length;
      while (i--)
      {
        if (l[i].nodeType == 1) {
          try {
            node = this._procMat(l[i]);
          } 
          catch (e) {
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                " _procMat exception: " + e.stack + ". (Is DAE source corrupted ?).");
          }
          
          if (node) {
            this._dstsc.insert(node);
          }
        }
      }
    }
  }

  if (this._mask & Ovoid.DAE_CAMERAS)
  {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' DAE_CAMERAS.');
    
    if (this._dae.getElementsByTagName('library_cameras').length)
    {
      l = this._dae.getElementsByTagName('library_cameras')[0].childNodes;
      i = l.length;
      while (i--)
      {
        if (l[i].nodeType == 1) {
          try {
            node = this._procCam(l[i]);
          } 
          catch (e) {
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                " _procCam exception: " + e.stack + ". (Is DAE source corrupted ?).");
          }
          
          if (node) {
            this._dstsc.insert(node);
          }
        }
      }
    }
  }

  if (this._mask & Ovoid.DAE_LIGHTS)
  {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' DAE_LIGHTS.');
    
    if (this._dae.getElementsByTagName('library_lights').length)
    {
      l = this._dae.getElementsByTagName('library_lights')[0].childNodes;
      i = l.length;
      while (i--)
      {
        if (l[i].nodeType == 1) {
          try {
            node = this._procLig(l[i]);
          } 
          catch (e) {
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                " _procLig exception: " + e.stack + ". (Is DAE source corrupted ?).");
          }
          
          if (node) {
            this._dstsc.insert(node);
          }
        }
      }
    }
  }

  if (this._mask & Ovoid.DAE_MESHS)
  {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' DAE_MESHS.');
    
    if (this._dae.getElementsByTagName('library_geometries').length)
    {
      l = this._dae.getElementsByTagName('library_geometries')[0].childNodes;
      i = l.length;
      while (i--)
      {
        if (l[i].nodeType == 1) {
          try {
            node = this._procGeo(l[i]);
          } 
          catch (e) {
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                " _procGeo exception: " + e.stack + ". (Is DAE source corrupted ?).");
          }

          if (node) {
            this._dstsc.insert(node);
          }
        }
      }
    }
  }

  if (this._mask & Ovoid.DAE_TRANSFORMS || this._mask & Ovoid.DAE_BONES)
  {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' DAE_TRANSFORMS.');
    
    if (this._dae.getElementsByTagName('library_visual_scenes').length)
    {
      /* On parcours le <visual_scene> en Depth-First pour reconstruire
       * la hierarchie */
      var dae = this._dae.getElementsByTagName('library_visual_scenes')[0].getElementsByTagName('visual_scene')[0];
      var queue = new Uint32Array(128);
      var depth = 0;
      var completed = false;

      while (!completed)
      {
        while (queue[depth] == this._getChildByTag(dae, 'node').length)
        {
          queue[depth] = 0;
          if (depth == 0) {
            completed = true;
            break;
          }
          depth--;
          dae = dae.parentNode;
        }

        if (completed)
          break;

        dae = this._getChildByTag(dae, 'node')[queue[depth]];
        queue[depth]++; depth++;
        /* On procède à l'analyse/import de ce <node> */
        try {
          node = this._procNod(dae);
        }
        catch (e) {
          Ovoid.log(2, 'Ovoid.Collada ' + this.name,
              " _procNod exception: " + e + ". (Is DAE source corrupted ?).");
        }
        /* Si la node n'est pas null on l'ajoute à la liste */
        if (node) {
          this._dstsc.insert(node);
          /* On retrouve la node parent de celle-ci via son nom
           * présumé */
          var parent = this._retrieveNode(dae.parentNode.getAttribute('id'));
          /* Si on trouve un parent on parente, si non, on parent au
           * root */
          if (!parent) {
            //node.setParent(this._nroot);
            Ovoid.log(3, 'Ovoid.Collada ' + this.name,
                "'" + node.name +
                "' in scene root");
          } else {
            node.setParent(parent);
            Ovoid.log(3, 'Ovoid.Collada ' + this.name,
                "'" + node.name + "' child of '" +
                parent.name + "'");
          }
        }
      }
    }
  }

  /* controllers et animations sont traités en toute fin car ils ont
   * des nodes et transforms en références */

  if (this._mask & Ovoid.DAE_CONTROLLERS)
  {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' DAE_CONTROLLERS.');
    
    if (this._dae.getElementsByTagName('library_controllers').length)
    {
      l = this._dae.getElementsByTagName('library_controllers')[0].childNodes;
      i = l.length;
      while (i--)
      {
        if (l[i].nodeType == 1) {
          /* le controller a normalement deja
           * été inséré lors de l'import des nodes
           * on ne le réinsert pas */
          try {
            this._procCtr(l[i]);
          }
          catch (e) {
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                " _procCtr exception: " + e.stack + ". (Is DAE source corrupted ?).");
          }
        }
      }
    }
  }

  if (this._mask & Ovoid.DAE_ANIMATIONS)
  {
    Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' DAE_ANIMATIONS.');
    
    if (this._dae.getElementsByTagName('library_animations').length)
    {
      l = this._dae.getElementsByTagName('library_animations')[0].childNodes;
      i = l.length;
      while (i--)
      {
        if (l[i].nodeType == 1) {
          try {
            node = this._procAni(l[i]);
          }
          catch (e) {
            Ovoid.log(2, 'Ovoid.Collada ' + this.name,
                " _procAni exception: " + e.stack + ". (Is DAE source corrupted ?).");
          }
          
          if (node) {
            /* la node est insere en scene durant le process */
            /* Ajoute l'animation au track si demandé */
            if (this._mask & Ovoid.DAE_CREATE_TRACK) {
              track.addAnimation(node);
            }
          }
        }
      }
    }
  }

  /* Ajoute le track à la scene des animations ont été importés */
  if (this._mask & Ovoid.DAE_CREATE_TRACK) {
    if (track.animation.length > 0) {
      this._dstsc.insert(track);
    }
  }
  
  /* c'est fini */
  Ovoid.log(3, 'Ovoid.Collada ' + this.name, ' end.');
  return true;
};
