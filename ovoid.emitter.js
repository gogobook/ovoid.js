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
 * @class Particle emitter node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Emitter node implements a point-sprite particles emitter. 
 * The Emitter node is a dependency node and does not takes place directly in 
 * the 3D world. The Emitter node is typically assigned to one Body node 
 * (multiple assignation is allowed but with unpredictable results).<br><br>
 * 
 * <blockcode>
 * emitter = myOvoid.Scene.newNode(Ovoid.EMITTER, "particles");<br>
 * body.setShape(emitter);<br>
 * emitter.setSprite(glowTexture);<br>
 * emitter.setSizes(5.0, 20.0);<br>
 * emitter.emits = true;
 * </blockcode><br><br>
 * 
 * <b>Body node and shape concept</b><br><br>
 * 
 * A Mesh node which is not assigned to a Body node will never be drawn. The 
 * Mesh node is what is called a "shape" and must be assigned to a 
 * world-transformable Body node to be included in the drawing pipeline.<br><br>
 * 
 * To make the concept more understandable, think that Body nodes are like 
 * invisible spirits without shape floating in the 3D world. To make a visible 
 * spirit, you have to give it a shape. You can assign the same shape node to 
 * several Body nodes in the same scene, then you obtain several identical 
 * shapes with different transformations (rotation, position, etc...).<br><br>
 * 
 * <b>Point-Sprite or Billboard</b><br><br>
 * 
 * By setting the <c>billboard</c> member variable to <c>true</c> or 
 * <c>false</c> you can choose the particle rendering technique. 
 * The Point-sprite technique use the hardware accelerated point-sprite which 
 * offer serious performance gain but has the inconvenience of some limitations 
 * and inconsistance depending the hardware, drivers and operating systems 
 * (Typically, the point-sprite size is limited to 64 under Windows system). 
 * The billboard technique use a generic quad-sprite geometry rendered as any 
 * other geometry, causes more performance issues but has no limitations and 
 * will be rendered the same way under all circumstances.
 * 
 * 
 * @see Ovoid.Body
 * 
 * @extends Ovoid.Node
 * 
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Emitter = function(name, i) {

  Ovoid.Node.call(this);
  /** Node type. */
  this.type |= Ovoid.EMITTER;
  /** Node name 
   * @type string */
  this.name = name;
  /** Particle model 
   * @type enum */
  this.model = 3;
  /** Particles Velocity damping.
   * @type float */
  this.mass = 1.0;
  /** Particles maximum life before dying (in seconds).
   * @type float */
  this.life = 1.0;
  /** Particles birth rate (born per seconds).
   * @type int */
  this.rate = 100;
  /** Velocity for new emitted particles.
   * @type float */
  this.velocity = 5.0;
  /** Velocity damping factor
   * @type float */
  this.damping = 0.1;
  /** Particles velocity random delta.
   * @type float */
  this.delta = 0.2;
  /** Particles scattering cone angle (in radians).
   * @type float */
  this.scattering = 3.14;
  /** Particles birth and death color.
   * @type Color[] */
  this.color = Ovoid.Color.newArray(2);

  this.color[0].set(1.0,1.0,1.0,1.0);
  this.color[1].set(1.0,1.0,1.0,0.0);
  
  /** Particles birth and death size.
   * @type float */
  this.size = new Array(2);
  
  this.size[0] = 1.0;
  this.size[1] = 10.0;
  
  /** Emitting flag. 
   * @type bool */
  this.emits = true;
  /** Particles texture. 
   * @type Texture */
  this.texture = null;
  /** Use billboard technic flag.
   * @type bool */
  this.billboard = true;
  /** Particle time before new born */
  this._ctdown = 0.0;
  /** Particle alive count */
  this._alives = 0;
  /** Born vector matrix */
  this._vmatrix = new Ovoid.Matrix3();
  /** Vertices list. */
  this._particles = Ovoid.Particle.newArray(Ovoid.MAX_EMITTER_PARTICLES);
  /** Vertices Float Array buffer list. */
  this._fbuffer = new Float32Array(Ovoid.MAX_EMITTER_PARTICLES * 11);
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
  
  this.addCach(Ovoid.CACH_GEOMETRY);
};
Ovoid.Emitter.prototype = new Ovoid.Node;
Ovoid.Emitter.prototype.constructor = Ovoid.Emitter;


/**
 * Set particles colours.<br><br>
 * 
 * Sets the particles birth and death colours with the specified color 
 * components. The birth and death colours are interpolated during the particle 
 * lifetime.
 * 
 * @param {float} br Particles birth color Red component.
 * @param {float} bg Particles birth color Green component.
 * @param {float} bb Particles birth color Blue component.
 * @param {float} ba Particles birth color Alpha component.
 * @param {float} dr Particles death color Red component.
 * @param {float} dg Particles death color Green component.
 * @param {float} db Particles death color Blue component.
 * @param {float} da Particles death color Alpha component.
 */
Ovoid.Emitter.prototype.setColoursRgba = function(br, bg, bb, ba, dr, dg, db, da) {
  
  this.color[0].set(br, bg, bb, ba);
  this.color[1].set(dr, dg, db, da);
};


/**
 * Set particles colours from Color objects.<br><br>
 * 
 * Sets the particles birth and death colours with the specified color 
 * components. The birth and death colours are interpolated during the particle 
 * lifetime.
 * 
 * @param {Color} b Particles birth color.
 * @param {Color} d Particles death color. 
 */
Ovoid.Emitter.prototype.setColours = function(b, d) {
  
  this.color[0].copy(b);
  this.color[1].copy(d);
};


/**
 * Set particles texture.<br><br>
 * 
 * Sets the particles's sprite texture with the specified Texture object.
 * 
 * @param {Texture} texture Texture object.
 */
Ovoid.Emitter.prototype.setSprite = function(texture) {
  
  if (this.texture != null)
    this.breakDepend(this.texture);

  this.texture = texture;
  if (texture != null)
    this.makeDepend(texture);

};


/**
 * Set particles sizes.<br><br>
 * 
 * Sets the particles birth and death sizes with the specified values. The birth 
 * and death sizes are interpolated during the particle lifetime.
 * 
 * @param {float} bsize Particles birth size.
 * @param {float} dsize Particles death size.
 */
Ovoid.Emitter.prototype.setSizes = function(bsize, dsize) {
  
  this.size[0] = bsize;
  this.size[1] = dsize;
};


/**
 * Set particles velocity.<br><br>
 * 
 * Sets the particles birth velocity, velocity damping and random velocity delta 
 * with the specified values. 
 * 
 * @param {float} velocity Particles birth velocity factor.
 * @param {float} delta Particles random velocity delta.
 * @param {float} damping Particles velocity damping factor.
 */
Ovoid.Emitter.prototype.setVelocity = function(velocity, delta, damping) {
  
  this.velocity = velocity;
  this.delta = delta;
  this.damping = damping;
};


/**
 * Set particles scattering.<br><br>
 * 
 * Sets the particles scattering cone angle in degrees with the 
 * specified value.
 * 
 * @param {float} angle Particles maximum scattering angle in degrees.
 */
Ovoid.Emitter.prototype.setScattering = function(angle) {
  
  this.scattering = Ovoid.deg2Rad(angle);
};


/**
 * Get alive particles count.<br><br>
 * 
 * Returns the current alive particles count for this instance.
 * 
 * @return {int} Alive particles count.
 */
Ovoid.Emitter.prototype.getAlives = function() {
  
  return this._alives;
};


/**
 * Node's caching function.
 *
 * <br><br>Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <c>Ovoid.Queuer</c> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Emitter.prototype.cachEmitter = function() {
  
  if(!this.link[0]) 
    return;
  
  var NB = 0;  /* Nombre de particule à faire naitre durant cette passe */
      
  if (this.emits) {

    /* Calcul du nombre de naissance */
    this._ctdown -= this._i.Timer.quantum;
    if(this._ctdown <= 0.0) {
      NB = Math.round(this.rate*this._i.Timer.quantum);
      if(NB < 1) NB = 1;
      this._ctdown = 1.0/this.rate;
    }
  }
  
  if (this._alives > 0 || NB > 0) {
    
    this.unCach(Ovoid.CACH_GEOMETRY);
    
    /* Retrouve le body pour le bounding volum */
    var body;
    for (var i = 0; i < this.link.length; i++) {
      if(this.link[i].type & Ovoid.BODY) {
          body = this.link[i];
      }
    }
    
    /* stuff pour le bounding volum */
    var min = new Ovoid.Point(Ovoid.FLOAT_MAX,
        Ovoid.FLOAT_MAX,
        Ovoid.FLOAT_MAX,
        1.0);
    var max = new Ovoid.Point(Ovoid.FLOAT_MIN,
        Ovoid.FLOAT_MIN,
        Ovoid.FLOAT_MIN,
        1.0);
        
    var rad = 0.0;
    
    /* Point pour les coordonnées du particule relatif au body 
     * pour construire le bounding volum */
    var WP = new Ovoid.Point();
    
    /* Variable pour la taille du vecteur radius pour
     * pour construire le bounding volum */
    var WS;
    
    /* Influence gravite */
    var g = new Ovoid.Vector(this.mass * this._i.opt_gravity[0], 
        this.mass * this._i.opt_gravity[1], 
        this.mass * this._i.opt_gravity[2]);
    g.scaleBy(this._i.Timer.quantum);
    
    /* facteur de damping */
    var d = Math.pow(this.damping, this._i.Timer.quantum);
    
    var L, P, V, C, U;
    this._alives = 0;
    var i = this._particles.length;
    while(i--) {
      if(this._particles[i].l > 0.0) {
        
        this._particles[i].l -= this._i.Timer.quantum;
        L = this._particles[i].l / this.life;
        
        P = this._particles[i].p;
        V = this._particles[i].v;
        C = this._particles[i].c;
        U = this._particles[i].u;
        
        /* calcul pour le bounding volum */
        WP.copy(P);
        WP.transform4Inverse(body.worldMatrix);
        
        WS = WP.size();

        if (WP.v[0] > max.v[0]) max.v[0] = WP.v[0];
        if (WP.v[1] > max.v[1]) max.v[1] = WP.v[1];
        if (WP.v[2] > max.v[2]) max.v[2] = WP.v[2];

        if (WP.v[0] < min.v[0]) min.v[0] = WP.v[0];
        if (WP.v[1] < min.v[1]) min.v[1] = WP.v[1];
        if (WP.v[2] < min.v[2]) min.v[2] = WP.v[2];
        
        if (rad < WS) rad = WS;
        
        /* ajustement de la position par la velocité */
        P.v[0] += (V.v[0] * this._i.Timer.quantum);
        P.v[1] += (V.v[1] * this._i.Timer.quantum);
        P.v[2] += (V.v[2] * this._i.Timer.quantum);
            
        V.addBy(g);
        V.scaleBy(d);

        /* Interpolation de la couleur */
        C.v[0] = this.color[1].v[0]+((this.color[0].v[0]-this.color[1].v[0])*L);
        C.v[1] = this.color[1].v[1]+((this.color[0].v[1]-this.color[1].v[1])*L);
        C.v[2] = this.color[1].v[2]+((this.color[0].v[2]-this.color[1].v[2])*L);
        C.v[3] = this.color[1].v[3]+((this.color[0].v[3]-this.color[1].v[3])*L);
        /* interpolation de la taille */
        U.v[2] = this.size[1]+((this.size[0]-this.size[1])*L);
            
        /* Ajout de la particule au buffer */
        if(!this.billboard)
          this._particles[i].bufferCopy(this._fbuffer, this._alives * 11);

        // Une particule vivante en plus
        this._alives++;

      } else {
        
        if(NB > 0) {

          P = this._particles[i].p;
          V = this._particles[i].v;
          C = this._particles[i].c;
          U = this._particles[i].u;
      
          /* Naissance de la particule */
          this._particles[i].l = this.life;
          P.copy(body.worldPosition);
          
          if(NB == 1) {
            WP.copy(P);
            WP.transform4Inverse(body.worldMatrix);

            WS = WP.size();

            if (WP.v[0] > max.v[0]) max.v[0] = WP.v[0];
            if (WP.v[1] > max.v[1]) max.v[1] = WP.v[1];
            if (WP.v[2] > max.v[2]) max.v[2] = WP.v[2];

            if (WP.v[0] < min.v[0]) min.v[0] = WP.v[0];
            if (WP.v[1] < min.v[1]) min.v[1] = WP.v[1];
            if (WP.v[2] < min.v[2]) min.v[2] = WP.v[2];
            
            if (rad < WS) rad = WS;
          }
      
          // Velocity selon le scattering
          
          // Direction de base de la particule
          V.copy(body.worldDirection);
          
          // Angle de rotation aleatoire
          var rx = (1.0-(Math.random()*2.0))*this.scattering;
          var ry = (1.0-(Math.random()*2.0))*this.scattering;
          var rz = (1.0-(Math.random()*2.0))*this.scattering;
          var ci = Math.cos(rx);
          var cj = Math.cos(ry);
          var ch = Math.cos(rz);
          var si = Math.sin(rx);
          var sj = Math.sin(ry);
          var sh = Math.sin(rz);
          var cc = ci * ch;
          var cs = ci * sh;
          var sc = si * ch;
          var ss = si * sh;
          this._vmatrix.m[0] = (cj * ch);
          this._vmatrix.m[1] = (cj * sh);
          this._vmatrix.m[2] = -sj;
          this._vmatrix.m[3] = (sj * sc - cs);
          this._vmatrix.m[4] = (sj * ss + cc);
          this._vmatrix.m[5] = (cj * si);
          this._vmatrix.m[6] = (sj * cc + ss);
          this._vmatrix.m[7] = (sj * cs - sc);
          this._vmatrix.m[8] = (cj * ci);
          
          // Transforme par la matrice du euler
          V.transform3(this._vmatrix);
          // Normalize le vecteur
          V.normalize();
          // Ajuste la taille du vecteur selon le delta random
          V.scaleBy(this.velocity + ((1.0-(Math.random()*2.0))*this.delta));
          // UV et taille du sprite de la particle
          U.set(0.0,1.0,this.size[0]);
          // Couleur de la particle
          C.copy(this.color[0]);
          
          /* Ajout de la particule au buffer */
          if(!this.billboard)
            this._particles[i].bufferCopy(this._fbuffer, this._alives * 11);
          // Alives en plus
          this._alives++;
          // Nombre de particule a cree --
          NB--;
        }
      }
    }
  }
  
  /* update bounding box et bounding sphere */
  if (!(this.cach & Ovoid.CACH_GEOMETRY)) {
    this.boundingBox.setBound(min, max);
    this.boundingSphere.setBound(min, max, rad);
    /* propage l'uncach du shape */
    for (var i = 0; i < this.link.length; i++) {
        this.link[i].unCach(Ovoid.CACH_BOUNDING_SHAPE);
    }
    this.addCach(Ovoid.CACH_GEOMETRY);
  }
};


/**
 * JavaScript Object Notation (JSON) serialization method.
 * 
 * <br><br>This method is commonly used by the <c>Ovoid.Ojson</c> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Emitter.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.EMITTER;
  /* Ovoid.Node */
  o['n'] = this.name;
  o['v'] = this.visible;
  o['u'] = this.uid;
  o['p'] = this.parent?this.parent.uid:'null';
  o['c'] = new Array();
  for(var i = 0; i < this.child.length; i++)
    o['c'][i] = this.child[i].uid;
  o['dp'] = new Array();
  for(var i = 0; i < this.depend.length; i++)
    o['dp'][i] = this.depend[i].uid;
  o['lk'] = new Array();
  for(var i = 0; i < this.link.length; i++)
    o['lk'][i] = this.link[i].uid;
  o['bmn'] = this.boundingBox.min;
  o['bmx'] = this.boundingBox.max;
  o['brd'] = this.boundingSphere.radius;
  /* Ovoid.Emitter */
  o['md'] = this.model;
  o['ms'] = this.mass;
  o['lf'] = this.life;
  o['rt'] = this.rate;
  o['vl'] = this.velocity;
  o['dm'] = this.damping;
  o['dt'] = this.delta;
  o['sc'] = this.scattering;
  o['cl'] = this.color;
  o['sz'] = this.size;
  o['em'] = this.emits;
  o['tx'] = this.texture.uid;
  o['bb'] = this.billboard;
  return o;

};
