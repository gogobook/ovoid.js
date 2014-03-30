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
 * Debug namespace.
 *
 * @namespace Debug namespace
 * <br>
 * <br>
 * Namespace dedicated to debug methods. The Debug's methods are used to 
 * extract objects's pertinent data in readable text.
 */
Ovoid.Debug = {};
  
/**
 * Matrix4 Float debug.
 * <br><br>Returns object debuging informations in text format.
 * 
 * @param {Array} m Matrix4 Float object.
 * @param {string} t Tabulation string.
 * 
 * @return {string} Object debuging infos.
 */
Ovoid.Debug.Float16v = function(m, t) {
  
  if (!t) t = '';
  var d = '';
  d += t+Ovoid.frnd(m[0])+'\t'+Ovoid.frnd(m[1])+'\t'
        +Ovoid.frnd(m[2])+'\t'+Ovoid.frnd(m[3])+'\n';
  d += t+Ovoid.frnd(m[4])+'\t'+Ovoid.frnd(m[5])+'\t'
        +Ovoid.frnd(m[6])+'\t'+Ovoid.frnd(m[7])+'\n';
  d += t+Ovoid.frnd(m[8])+'\t'+Ovoid.frnd(m[9])+'\t'
        +Ovoid.frnd(m[10])+'\t'+Ovoid.frnd(m[11])+'\n';
  d += t+Ovoid.frnd(m[12])+'\t'+Ovoid.frnd(m[13])+'\t'
        +Ovoid.frnd(m[14])+'\t'+Ovoid.frnd(m[15]);
  return d;
};


/**
 * Matrix3 Float debug.
 * <br><br>Returns object debuging informations in text format.
 * 
 * @param {Array} m Matrix3 Float object.
 * @param {string} t Tabulation string.
 * 
 * @return {string} Object debuging infos.
 */
Ovoid.Debug.Float9v = function(m, t) {
  
  if (!t) t = '';
  var d = '';
  d += t+Ovoid.frnd(m[0])+'\t'+Ovoid.frnd(m[1])+'\t'+Ovoid.frnd(m[2])+'\n';
  d += t+Ovoid.frnd(m[3])+'\t'+Ovoid.frnd(m[4])+'\t'+Ovoid.frnd(m[5])+'\n';
  d += t+Ovoid.frnd(m[6])+'\t'+Ovoid.frnd(m[7])+'\t'+Ovoid.frnd(m[8]);
  return d;
};


/**
 * 3 Float object debug.
 * <br><br>Returns object debuging informations in text format.
 * 
 * @param {Array} f Float array object.
 * @param {string} t Tabulation string.
 * 
 * @return {string} Object debuging infos.
 */
Ovoid.Debug.Float3v = function(f, t) {
  
  if (!t) t = '';
  var d = '';
  d += t+Ovoid.frnd(f[0])+', '+Ovoid.frnd(f[1])+', '+Ovoid.frnd(f[2]);
  return d;
};


/**
 * 4 Float object debug.
 * <br><br>Returns object debuging informations in text format.
 * 
 * @param {Array} f Float array object.
 * @param {string} t Tabulation string.
 * 
 * @return {string} Object debuging infos.
 */
Ovoid.Debug.Float4v = function(f, t) {
  
  if (!t) t = '';
  var d = '';
  d += t+Ovoid.frnd(f[0])+', '+Ovoid.frnd(f[1])+', '
        +Ovoid.frnd(f[2])+', '+Ovoid.frnd(f[3]);
  return d;
};


/**
 * Vertex object debug.
 * <br><br>Returns object debuging informations in text format.
 * 
 * @param {Array} f Float array object.
 * @param {string} t Tabulation string.
 * 
 * @return {string} Object debuging infos.
 */
Ovoid.Debug.Vertex = function(v, t) {
  if (!t) t = '';
  var d = '';
  d += t + '[p:' + Ovoid.Debug.Float4v(v.p.v, '')+']';
  d += '[n:' + Ovoid.Debug.Float3v(v.n.v, '')+']';
  d += '[u:' + Ovoid.Debug.Float3v(v.u.v, '')+']';
  return d;
};


/**
 * Node debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Node} o Node node.
 * @param {bool} s Sumarize.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Node = function(o, s) {
  
  var d = 'Ovoid.Node "' + o.name + '" infos\n{\n';
  d += '  visible: ' + o.visible + '\n';
  d += '  uid:     ' + o.uid + '\n';
  d += '  parent:  ';
  d += o.parent?o.parent.name:'null';
  d += '\n';
  d += '  child: ';
  for ( var i = 0; i < o.child.length; i++) 
    d += '\n   > ' + o.child[i].name; 
  d += '\n'
  d += '  link: ';
  for ( var i = 0; i < o.link.length; i++) 
    d += '\n   > ' + o.link[i].name; 
  d += '\n'
  d += '  depend: ';
  for ( var i = 0; i < o.depend.length; i++) 
    d += '\n   > ' + o.depend[i].name; 
  d += '\n'
  d += '}';
  return d;
};


/**
 * Mesh debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Mesh} o Mesh node.
 * @param {bool} s Sumarize.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Mesh = function(o, s) {
  
  var ml = Ovoid.MAX_MESH_LOD;
  if (s) ml = 1;
  var d = 'Ovoid.Mesh "' + o.name + '" infos\n{\n';
  
  for (var l = 0; l < ml; l++) {
    if (!s) d += ' LOD#' + l + ' {\n';
    
    for (var p = 0; p < o.polyset[l].length; p++) {
      d += '  polyset#' + p + ' {';
      d += ' ' + o.polyset[l][p].ioffset;
      d += ', ' + o.polyset[l][p].icount;
      d += ', ';
      if(o.polyset[l][p].material) {
        d += o.polyset[l][p].material.name;
      } else {
        d += 'null';
      }
      d += ' }\n';
    }
    d += '  vertices: ' + o.vertices[l].length;
    if (!s) {
      d += ' {\n';
      for (var v = 0; v < o.vertices[l].length; v++) {
        d += Ovoid.Debug.Vertex(o.vertices[l][v], '      ') + '\n';
      }
      d += '\n }';
    }
    d += '\n';
    d += '  triangles: ' + o.triangles[l].length;
    if (!s) {
      d += ' {\n';
      d += '      indices: {';
      for (var t = 0; t < o.triangles[l].length; t++) {
        d += '[' + o.triangles[l][t].index[0] + ',' 
            + o.triangles[l][t].index[1] + ','
            + o.triangles[l][t].index[2] + ']';
      }
      d += '\n   }\n';
      d += '\n }\n';
    }
    d += '\n';
  }
  d += '}';
  return d;
}

/**
 * Material debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Material} o Material node.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Material = function(o, s) {

  var d = 'Ovoid.Material "' + o.name + '" infos\n{\n';
  d += '  ambient: ' + Ovoid.Debug.Float4v(o.color[0].v, '  ') + '\n';
  if(o.texture[0]) 
    d += '    texture: ' + o.texture[0].name + '\n';
  d += '  diffuse: ' + Ovoid.Debug.Float4v(o.color[1].v, '  ') + '\n';
  if(o.texture[1]) 
    d += '    texture: ' + o.texture[1].name + '\n';
  d += '  specular: ' + Ovoid.Debug.Float4v(o.color[2].v, '  ') + '\n';
  if(o.texture[2])
    d += '    texture: ' + o.texture[2].name + '\n';
  d += '  emissive: ' + Ovoid.Debug.Float4v(o.color[3].v, '  ') + '\n';
  if(o.texture[3])
    d += '    texture: ' + o.texture[3].name + '\n';
  d += '  reflect: ' + Ovoid.Debug.Float4v(o.color[4].v, '  ') + '\n';
  if(o.texture[4])
    d += '    texture: ' + o.texture[4].name + '\n';
  if(o.texture[5])
    d += '  normal map: ' + o.texture[5].name + '\n';
  d += '  shininess: ' + o.shininess + '\n';
  d += '  reflectivity: ' + o.reflectivity + '\n';
  d += '  opacity: ' + o.opacity + '\n';
  d += '}';
  return d;
};


/**
 * Transform debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Transform} o Transform node.
 * @param {bool} s Sumarize.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Transform = function(o, s) {
  
  var d = 'Ovoid.Transform "' + o.name + '" infos\n{\n';
  d += '  scaling:     ' + Ovoid.Debug.Float3v(o.scaling.v, '') + '\n';
  d += '  translation: ' + Ovoid.Debug.Float3v(o.translation.v, '') + '\n';
  d += '  rotation:    ' + Ovoid.Debug.Float4v(o.rotation.v, '') + '\n';
  d += '  orientation: ' + Ovoid.Debug.Float4v(o.orientation.v, '') + '\n';
  if (!s) {
    d += '\n';
    d += '  matrix {\n';
    d += Ovoid.Debug.Float16v(o.matrix.m, '    ') + '\n';
    d += '  }\n';
    d += '  worldMatrix {\n';
    d += Ovoid.Debug.Float16v(o.worldMatrix.m, '    ') + '\n';
    d += '  }\n';
    d += '  normalMatrix {\n';
    d += Ovoid.Debug.Float9v(o.normalMatrix.m, '    ') + '\n';
    d += '  }\n';
  }
  d += '  worldDirection: '+Ovoid.Debug.Float3v(o.worldDirection.v, '')+'\n';
  d += '  worldPosition:  '+Ovoid.Debug.Float3v(o.worldPosition.v, '')+'\n';
  d += '}';
  return d;
};


/**
 * Body debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Body} o Body node.
 * @param {bool} s Sumarize.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Body = function(o, s) {
  
  var d = 'Ovoid.Body "' + o.name + '" infos\n{\n';
  d += '  shape: ';
    o.shape?d+=o.shape.name:d+='null';
  d += '\n';
  d += '  intersect: ';
  for ( var i = 0; i < o.intersect.count; i++) 
    d += '\n   > ' + o.intersect[i].name; 
  d += '\n'
  d += '  enter: ';
  for ( var i = 0; i < o.enter.count; i++) 
    d += '\n   > ' + o.enter[i].name; 
  d += '\n'
  d += '  leave: ';
  for ( var i = 0; i < o.leave.count; i++) 
    d += '\n   > ' + o.leave[i].name; 
  d += '\n'
  d += '}';
  return d;
};


/**
 * Light debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Light} o Light node.
 * @param {bool} s Sumarize.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Light = function(o, s) {
  
  var d = 'Ovoid.Light "' + o.name + '" infos\n{\n';
  d += '  model: ' + o.model + '\n';
  d += '  Color: ' + Ovoid.Debug.Float4v(o.color.v, '') + '\n';
  d += '  intensity: ' + o.intensity + '\n';
  d += '  Constant Att: ' + o.attenuationC + '\n';
  d += '  Linear Att: ' + o.attenuationL + '\n';
  d += '  Quadratic Att: ' + o.attenuationQ + '\n';
  d += '  Range: ' + o.range + '\n\n';
  d += '  Falloff: ' + o.falloff + '\n\n';
  d += '  Spot angle: ' + o.spotAngle + '\n\n';
  d += '  Cast shadows: ' + o.shadowCasting + '\n\n';
  d += '}';
  return d;
};


/**
 * Camera debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Camera} o Camera node.
 * @param {bool} s Sumarize.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Camera = function(o, s) {

  var d = 'Ovoid.Camera "' + o.name + '" infos\n{\n';
  d += '  viewX:    ' + o.viewX + '\n';
  d += '  viewY:    ' + o.viewY + '\n';
  d += '  fov:      ' + o.fov + '\n';
  d += '  aspect:   ' + o.aspect + '\n';
  d += '  clipNear: ' + o.clipNear + '\n';
  d += '  clipFar:  ' + o.clipFar + '\n\n';
  if(!s) {
    d += '  perspective {\n';
    d += Ovoid.Debug.Float16v(o.perspective.m, '    ') + '\n';
    d += '  }\n\n';
    d += '  lookat {\n';
    d += Ovoid.Debug.Float16v(o.lookat.m, '    ') + '\n';
    d += '  }\n\n';
    d += '  orthographic {\n';
    d += Ovoid.Debug.Float16v(o.orthographic.m, '    ') + '\n';
    d += '  }\n\n';
    d += '  eyeview {\n';
    d += Ovoid.Debug.Float16v(o.eyeview.m, '    ') + '\n';
    d += '  }\n\n';
  }
  d += '}';
  return d;
};


/**
 * Layer debug.
 * <br>
 * <br>
 * Returns node debuging informations in text format.
 * 
 * @param {Layer} o Layer node.
 * @param {bool} s Sumarize.
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.Layer = function(o, s) {

  var d = 'Ovoid.Layer "' + o.name + '" infos\n{\n';
  d += '  size:      ' + Ovoid.Debug.Float3v(o.size.v, '') + '\n';
  d += '  fgColor:   ' + Ovoid.Debug.Float4v(o.fgColor.v, '') + '\n';
  d += '  bgColor:   ' + Ovoid.Debug.Float4v(o.bgColor.v, '') + '\n';
  d += '  bgTexture: ';
  (o.bgTexture)?d+=o.bgTexture.name+'\n':d+='null\n';
  if(!s) {
    d += '  layerMatrix {\n';
    d += Ovoid.Debug.Float16v(o.layerMatrix.m, '    ') + '\n';
    d += '  }\n';
  }
  d += '}';
  return d;
};

/**
 * Scene node list debug.
 * <br>
 * <br>
 * Returns Scene debuging informations in text format.
 * 
 * @param {Scene} o Scene object.
 * 
 * @return {string} Scene debuging infos.
 */
Ovoid.Debug.NodeList = function(o) {
  
  var t = '';
  var d = 'Ovoid.Scene "' + o.name + '" node list\n{\n';
  var n;
  if(o.audio.length) {
    d += t + " Audios:\n";
    for (var i = 0; i < o.audio.length; i++) {
      n = o.audio[i];
      d += t + '  ' + n.name + '\n';
    }
  }
  if(o.texture.length) {
    d += t + " Textures:\n";
    for (var i = 0; i < o.texture.length; i++) {
      n = o.texture[i];
      d += t + ' ' + n.name + '\n';
    }
  }
  if(o.material.length) {
    d += t + " Materials:\n";
    for (var i = 0; i < o.material.length; i++) {
      n = o.material[i];
      d += t + '  ' + n.name + '\n';
    }
  }
  if(o.shape.length) {
    d += t + " Shapes:\n";
    for (var i = 0; i < o.shape.length; i++) {
      n = o.shape[i];
      d += t + '  ' + n.name + '\n';
    }
  }
  if(o.transform.length) {
    d += t + " Transforms:\n";
  }
  if(o.sound.length) {
    d += t + "   Sounds:\n";
    for (var i = 0; i < o.sound.length; i++) {
      n = o.sound[i];
      d += t + '    ' + n.name + '\n';
    }
  }
  if(o.light.length) {
    d += t + "   Lights:\n";
    for (var i = 0; i < o.light.length; i++) {
      n = o.light[i];
      d += t + '    ' + n.name + '\n';
    }
  }
  if(o.camera.length) {
    d += t + "   Cameras:\n";
    for (var i = 0; i < o.camera.length; i++) {
      n = o.camera[i];
      d += t + '    ' + n.name + '\n';
    }
  }
  if(o.transform.length) {
    d += t + "   Commons:\n";
    for (var i = 0; i < o.transform.length; i++) {
      n = o.transform[i];
      if ((n.type & Ovoid.LIGHT) 
            || (n.type & Ovoid.CAMERA) 
            || (n.type & Ovoid.SOUND)) {
        continue;
      }
      d += t + '    ' + n.name + '\n';
    }
  }
  if(o.layer.length) {
    d += t + " Layer:\n";
    for (var i = 0; i < o.layer.length; i++) {
      n = o.layer[i];
      d += t + ' ' + n.name + '\n';
    }
  }
  if(o.animation.length) {
    d += t + " Animation:\n";
    for (var i = 0; i < o.animation.length; i++) {
      n = o.animation[i];
      d += t + '  ' + n.name + '\n';
    }
  }
  if(o.physics.length) {
    d += t + " Physics:\n";
    for (var i = 0; i < o.physics.length; i++) {
      n = o.physics[i];
      d += t + '  ' + n.name + '\n';
    }
  }
  if(o.action.length) {
    d += t + " Actions:\n";
    for (var i = 0; i < o.action.length; i++) {
      n = o.action[i];
      d += t + '  ' + n.name + '\n';
    }
  }
  if(o.track.length) {
    d += t + " Track:\n";
    for (var i = 0; i < o.track.length; i++) {
      n = o.track[i];
      d += t + '  ' + n.name + '\n';
    }
  }
  d += '}';
  return d;
};


/**
 * Scene world graph debug.
 * <br>
 * <br>
 * Returns Scene debuging informations in text format.
 * 
 * @param {Scene} o Scene object.
 * 
 * @return {string} Scene debuging infos.
 */
Ovoid.Debug.WorldGraph = function(o) {
  
  var t = '';
  var d = 'Ovoid.Scene "' + o.name + '" world graph\n{\n';
  d += t + ' ¤ World\n';
  var n;
  var itdag = new Ovoid.WgIterator();
  
  itdag.init(o.world);
  while (itdag.explore()) {
    n = itdag.current;
    d += t;
    for (var i = 0; i < itdag.depth; i++) d += '  ';
    d += ' > ' + n.name + '\n';
  }
  d += '\n' + t + ' ¤ Overlay\n';
  itdag.init(o.overlay);
  while (itdag.explore()) {
    n = itdag.current;
    d += t;
    for (var i = 0; i < itdag.depth; i++) d += '  ';
    d += ' > ' + n.name + '\n';
  }
  d += '}';
  return d;
};


/**
 * Scene dependency graph debug.
 * <br>
 * <br>
 * Returns Scene debuging informations in text format.
 * 
 * @param {Scene} o Scene object.
 * 
 * @return {string} Scene debuging infos.
 */
Ovoid.Debug.DependGraph = function(o) {
  
  var t = '';
  var d = 'Ovoid.Scene "' + o.name + '" dependency graph\n{\n';
  var n;
  var itdg = new Ovoid.DgIterator();

  for (var i = 0; i < o.transform.length; i++) {
    
    d += t + ' ¤ ' + o.transform[i].name + '\n';
    
    itdg.init(o.transform[i]);
    while (itdg.exploreDepend()) {
      
      n = itdg.current;
      d += t;
      for (var j = 0; j < itdg.depth; j++) d += '  ';
      d += ' > ' + n.name + '\n';
      if(n.type & Ovoid.TRANSFORM) itdg.jumpDepend();
    }
  }
  d += '}';
  return d;
};


/**
 * Node dependency tree debug.
 * <br>
 * <br>
 * Returns Scene debuging informations in text format.
 * 
 * @param {Node} o Node object.
 * 
 * @return {string} Node debuging infos.
 */
Ovoid.Debug.DependTree = function(o) {
  
  var t = '';
  var d = 'Ovoid.Node "' + o.name + '" dependency tree\n{\n';
  var n;
  var itdg = new Ovoid.DgIterator();
  d += t + ' ¤ ' + o.name + '\n';
  itdg.init(o);
  while (itdg.exploreDepend()) {
    
    n = itdg.current;
    d += t;
    for (var j = 0; j < itdg.depth; j++) d += '  ';
    d += ' > ' + n.name + '\n';
  }
  d += '}';
  return d;
};


/**
 * Queuer debug.
 * <br>
 * <br>
 * Returns Queuer debuging informations in text format.
 * 
 * @param {Object} inst Ovoid.JS Instance object.
 * 
 * @return {string} Queuer debuging infos.
 */
Ovoid.Debug.Queuer = function(inst) {
  
  var d = 'Ovoid.Queuer status\n{\n';
  var c;
  d += '  rcamera:   ' + inst.Queuer._rcamera.name + '\n';
  d += '  viewcull:  ';
  inst.Queuer.opt_viewcull?d += 'on\n':d += 'off\n';
  d += '  lightcull: ';
  inst.Queuer.opt_lightcull?d += 'on\n':d += 'off\n';
  c = inst.Queuer.qlight.count;
  d += '  qlight: ' + c + ' node(s)\n';
  c = 0;
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++)
    c +=  inst.Queuer.qsolid[i].count;
  d += '  qsolid: ' + c + ' node(s)\n';
  c = 0;
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++)
    c +=  inst.Queuer.qalpha[i].count;
  d += '  qalpha: ' + c + ' node(s)\n';
  c = inst.Queuer.qphycs.count;
  d += '  qphycs: ' + c + ' node(s)\n';
  c = inst.Queuer.qlayer.count;
  d += '  qlayer: ' + c + ' node(s)\n';
  c = inst.Queuer.qtext.count;
  d += '  qtext:  ' + c + ' node(s)\n';
  d += '}';
  return d;
};


/**
 * Input debug.
 * <br>
 * <br>
 * Returns Input debuging informations in text format.
 * 
 * @param {Object} inst Ovoid.JS Instance object.
 * 
 * @return {string} Input debuging infos.
 */
Ovoid.Debug.Input = function(inst) {
  
  var d = 'Ovoid.Input status\n{\n';
  d += '   intDn: [';
  for (var i = 0; i < 256; i++) if(inst.Input.intDn[i]) d += i + ' ';
  d += ']\n';
  d += '   intUp: [';
  for (var i = 0; i < 256; i++) if(inst.Input.intUp[i]) d += i + ' ';
  d += ']\n';
  d += '   intHl: [';
  for (var i = 0; i < 256; i++) if(inst.Input.intHl[i]) d += i + ' ';
  d += ']\n';
  d += '   mousePosition: ' + inst.Input.mousePosition.v[0] + ', ' 
      + inst.Input.mousePosition.v[1] +'\n';
  d += '   mouseVelocity: ' + inst.Input.mouseVelocity.v[0] + ', ' 
      + inst.Input.mouseVelocity.v[1] +'\n';
  d += '   mouseOverUid:  ' + inst.Input.mouseOverUid + '\n';
  d += '   mouseEnterUid: ' + inst.Input.mouseEnterUid + '\n';
  d += '   mouseLeaveUid: ' + inst.Input.mouseLeaveUid + '\n';
  d += '   mouseCursor: ' 
  d += Ovoid.frnd(inst.Input.mouseCursor.m[12]) + ', ';
  d += Ovoid.frnd(inst.Input.mouseCursor.m[13]) + ', ';
  d += Ovoid.frnd(inst.Input.mouseCursor.m[14]);
  d += '\n';
  d += '}';
  return d;
};


/**
 * Drawer debug.
 * <br>
 * <br>
 * Returns Drawer debuging informations in text format.
 * 
 * @param {Object} inst Ovoid.JS Instance object.
 * 
 * @return {string} Drawer debuging infos.
 */
Ovoid.Debug.Drawer = function(inst) {
    
  var d = 'Ovoid.Drawer status\n{\n';
  d += '   rp:' + inst.Drawer.opt_pickingMode;
  d += ' lp:';
  inst.Drawer.opt_perLightPass?d += 'yes':d += 'no';
  d += ' zf:';
  inst.Drawer.opt_shadowCasting?d += 'yes\n':d += 'no\n';
  d += '   renderpasses:  ' + inst.Drawer._renderpasses + ' call(s)\n';
  d += '   drawndynamic:  ' + inst.Drawer._drawndynamic + ' call(s)\n';
  d += '   drawnsprite:   ' + inst.Drawer._drawnsprite + ' call(s)\n';
  d += '   drawnchar:     ' + inst.Drawer._drawnchar + ' point(s)\n';
  d += '   drawnsymbolic: ' + inst.Drawer._drawnsymbolic + ' call(s)\n';
  d += '   drawnpolyset:  ' + inst.Drawer._drawnpolyset + ' call(s)\n';
  d += '   drawnparticle: ' + inst.Drawer._drawnparticle + ' point(s)\n';
  d += '   drawnshadow:   ' + inst.Drawer._drawnshadow + ' call(s)\n';
  d += '}';
  return d;
};


/**
 * Timer debug.
 * <br>
 * <br>
 * Returns Timer debuging informations in text format.
 * 
 * @param {Object} inst Ovoid.JS Instance object.
 * 
 * @return {string} Timer debuging infos.
 */
Ovoid.Debug.Timer = function(inst) {
  
  var d = 'Ovoid.Timer status\n{\n';
  d += '   quantum:   ' + (Math.round(inst.Timer.quantum*10000) / 10000) + '\n';
  d += '   framerate: ' + inst.Timer.framerate + '\n';
  d += '}';
  return d;
};


/**
 * Frame debug.
 * <br>
 * <br>
 * Returns Frame debuging informations in text format.
 * 
 * @param {Object} inst Ovoid.JS Instance object.
 * 
 * @return {string} Frame debuging infos.
 */
Ovoid.Debug.Frame = function(inst) {
  
  var d = 'Ovoid.Frame status\n{\n';
  d += '   position: ' + inst.Frame.position.v[0] + ', ' + inst.Frame.position.v[1] + '\n';
  d += '   size:     ' + inst.Frame.size.v[0] + ', ' + inst.Frame.size.v[1] + '\n';
  d += '   scroll:   ' + inst.Frame.scroll.v[0] + ', ' + inst.Frame.scroll.v[1] + '\n';
  d += '}';
  return d;
};


/**
 * Shader debug.
 * <br>
 * <br>
 * Returns Shader debuging informations in text format.
 * 
 * @param {Shader} o Shader object.
 * @return {string} Shader debuging infos.
 */
Ovoid.Debug.Shader = function(o) {

  var a = new Array(
    'VERTEX_VEC4_P', // position
    'VERTEX_VEC3_N', // normal
    'VERTEX_VEC3_U', // uv
    'VERTEX_VEC3_T', // tangent
    'VERTEX_VEC3_B', // binormal
    'VERTEX_VEC4_C', // color
    'VERTEX_VEC4_I', // bones indices
    'VERTEX_VEC4_W'); // bones weights

  var um = new Array(
    'UNIFORM_MATRIX_TRANSFORM_MAT4',
    'UNIFORM_MATRIX_NORMAL_MAT3',
    'UNIFORM_MATRIX_MODELVIEW_MAT4',
    'UNIFORM_MATRIX_EYEVIEW_MAT4',
    'UNIFORM_MATRIX_PROJECTION_MAT4',
    'UNIFORM_MATRIX_LOOKAT_MAT4',
    'UNIFORM_MATRIX_BONES_MAT4');

  var u = new Array(
    'UNIFORM_ENABLE_DIFFUSE_LIGHTING_BOOL',
    'UNIFORM_ENABLE_AMBIENT_LIGHTING_BOOL',
    'UNIFORM_ENABLE_SPECULAR_BOOL',
    'UNIFORM_ENABLE_REFLECT_BOOL',
    'UNIFORM_ENABLE_PARALAX_BOOL',
    'UNIFORM_ENABLE_MATERIAL_BOOL',
    'UNIFORM_ENABLE_VERTEX_WEIGHT_BOOL',
    'UNIFORM_ENABLE_COMPUT_TANGENT_BOOL',
    'UNIFORM_ZOFFSET_FLOAT',
    'UNIFORM_COLOR_VEC4',
    'UNIFORM_MATERIAL_AMBIENT_VEC4',
    'UNIFORM_MATERIAL_DIFFUSE_VEC4',
    'UNIFORM_MATERIAL_SPECULAR_VEC4',
    'UNIFORM_MATERIAL_EMISSIVE_VEC4',
    'UNIFORM_MATERIAL_REFLECT_VEC4',
    'UNIFORM_MATERIAL_SHININESS_FLOAT',
    'UNIFORM_MATERIAL_OPACITY_FLOAT',
    'UNIFORM_MATERIAL_REFLECTIVITY_FLOAT',
    'UNIFORM_MATERIAL_BUMPINESS_FLOAT', //18
    '',
    'UNIFORM_LIGHT_POSITION_VEC4', // 20
    'UNIFORM_LIGHT_DIRECTION_VEC3',
    'UNIFORM_LIGHT_COLOR_VEC4',
    'UNIFORM_LIGHT_CONSTANT_ATTENUATION_FLOAT',
    'UNIFORM_LIGHT_RANGE_FLOAT',
    'UNIFORM_LIGHT_FALLOFF_FLOAT',
    'UNIFORM_LIGHT_SPOTANGLE_FLOAT',
    'UNIFORM_LIGHT_LINEAR_ATTENUATION_FLOAT',
    'UNIFORM_LIGHT_ENABLED_BOOL',
    'UNIFORM_LIGHT_QUADRIC_ATTENUATION_FLOAT',
    'UNIFORM_EYE_POSITION_VEC4',
    'UNIFORM_EYE_DIRECTION_VEC4',
    'UNIFORM_EYE_VIEWSIZE_VEC3', // 32
    'Unassigned Slot #33',
    'Unassigned Slot #34',
    'Unassigned Slot #35',
    'Unassigned Slot #36', 
    'Unassigned Slot #37', 
    'Unassigned Slot #38', 
    'Unassigned Slot #39',
    'UNIFORM_AMBIENT_COLOR_VEC4', //40
    '#41',
    'UNIFORM_LAYER_SIZE_VEC3'); //42

  var us = new Array(
    'SAMPLER_AMBIENT',
    'SAMPLER_DIFFUSE',
    'SAMPLER_SPECULAR',
    'SAMPLER_EMISSIVE',
    'SAMPLER_REFLECT',
    'SAMPLER_NORMAL');


  var d = 'Ovoid.Shader [] debug\n{\n';
  d += '\tvertex attribs {\n';
  for (var i = 0; i < Ovoid.MAX_VERTEX_ATTRIB; i++) {
    if (o.attribute[i] != -1)
      d += '\t\t' + a[i] + ' \n';
  }
  d += '\t}\n';
  d += '\tuniforms {\n';
  for (var i = 0; i < Ovoid.MAX_UNIFORM; i++) {
    if (o.uniform[i] != -1)
      d += '\t\t' + u[i] + ' \n';
  }
  d += '\t}\n';
  d += '\tuniforms matrices {\n';
  for (var i = 0; i < Ovoid.MAX_UNIFORM_MATRIX; i++) {
    if (o.uniformMatrix[i] != -1)
      d += '\t\t' + um[i] + ' \n';
  }
  d += '\t}\n';
  d += '\tuniforms samplers {\n';
  for (var i = 0; i < Ovoid.MAX_UNIFORM_SAMPLER; i++) {
    if (o.uniformSampler[i] != -1)
      d += '\t\t #' + i + ' ' + us[i] + ' \n';
  }
  d += '\t}\n';
  d += '}\n';
  return d;
};


/**
 * Sumary hud debug.
 * <br><br>Returns debuging sumary informations in text format.
 * 
 * @param {Object} inst Ovoid.JS Instance object.
 * 
 * @return {string} Sumary debuging infos.
 */
Ovoid.Debug.Sumary = function(inst) {

  var d = '';
  d = 'Fps:[' + inst.Timer.framerate + ']';
  d += ' Drawer:[';
  d += 'mode:';
  if(inst.opt_renderPerLightPass) {
    d += 'LP/';
    switch(inst.Drawer._pipeLp) 
    {
      case 0:
        d += 'PS';
      break;
      case 10:
        d += 'VL';
      break;
      case 13:
        d += 'LE';
      break;
    } 
  } else {
    d += ' 1P/';
    switch(inst.Drawer._pipe1p) 
    {
      case 1:
        d += 'PS';
      break;
      case 11:
        d += 'VL';
      break;
      case 14:
        d += 'LE';
      break;
    } 
  }
  d += ' set:' + inst.Drawer._drawnpolyset;
  d += ' dyn:' + inst.Drawer._drawndynamic;
  d += ' spr:' + inst.Drawer._drawnsprite;
  d += ' sym:' + inst.Drawer._drawnsymbolic;
  d += ' prt:' + inst.Drawer._drawnparticle;
  d += ' sdw:' + inst.Drawer._drawnshadow;
  d += ']';
  d += ' Mouse:[x' + inst.Input.mousePosition.v[0];
  d += ' y' +  inst.Input.mousePosition.v[1] + ']';
  d += ' Picking:[';
  var pm = inst.opt_renderPickingMode;
  if(pm == 1) d += 'off';
  if(pm == 1) d += 'O';
  if(pm == 2) d += 'W';
  if(pm == 3) d += 'O+W';
  d += ']';
  d +=' Timer:[q:' + (Math.round(inst.Timer.quantum*1000) / 1000);
  d +=' c:' + (Math.round(inst.Timer.clock*100) / 100) + ']';
  return d;
};
