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
 * @class Queuer Module Class.<br><br>
 * 
 * The Queuer class implements a per frame global update queue. This is 
 * what is called a Module class because used as core module for the 
 * Ovoid.Instance class. A Module class is a part of Instance class and 
 * can be used only within the Instance class.<br><br>
 * 
 * The Queuer is a kind of crossroad between all Modules and Instance 
 * who proceed to several operations, especially:.<br>
 * <ul>
 * <li>Update all Scene's node graph and dependencies.</li>
 * <li>Select, sort and dispatch nodes to prepare the rendering process.</li>
 * <li>Update and dispatch interactives events.</li>
 * </ul><br><br>
 * 
 * This Module class does not provide many public data or method since 
 * it is a very internal and critical Module.<br><br>
 * 
 * <b>Node culling</b><br><br>
 * 
 * Since it is not desirable to include all nodes of the active scene in 
 * the render stack, the Queuer implements some mecanisms to exclude 
 * nodes from the render stack according some rules to prevent useless 
 * data processing.. This mecanisms is called "node culling".<br><br>
 * 
 * <ul>
 * <li><b>View culling</b><br>
 * The view culling mechanism checks whether a node is within the view 
 * frustum of the current active camera. Also named 
 * "View frustum culling".<br><br>
 * 
 * This mechanism can be enabled or disabled by defining the option
 * <c>Instance.opt_sceneViewcull</c> to <c>true</c> or 
 * <c>false</c>.
 * </li><br>
 * 
 * <li><b>Light culling</b><br>
 * The light culling mechanism checks whether a light is needed to 
 * render the current frame and excludes all lights who does not affect 
 * any rendered node.<br><br>
 * 
 * This mechanism can be enabled or disabled by defining the option 
 * <c>Instance.opt_sceneLightcull</c> to <c>true</c> or 
 * <c>false</c>.
 * </li>
 * </ul><br><br>
 * 
 * <b>Body intersection</b><br><br>
 * 
 * For interactivity purpose, the Body node and Queuer is designed to be 
 * able handle intersection of a Body with each others through the 
 * bounding sphere. To enable or disable the Body intersection detection 
 * in a global way, you can set the 
 * <c>Instance.opt_sceneIntersectDetect</c> options to 
 * <c>true</c> or <c>false</c>.<br><br>
 * 
 * <b>Queues</b><br><br>
 * 
 * Each frames, the Queuer makes several queues (this is why it is named 
 * Queuer) of nodes which are used by other Modules classes. For 
 * example, the Queuer makes some lists of nodes which will be rendered 
 * by the Drawer (Ovoid.Drawer). The Drawer uses the Queuer's queues as 
 * a rendering stacks.<br><br>
 * 
 * These queues are currently public member of this class and can be 
 * accessed. This can be usefull for experienced developpers to create 
 * complex alorithms or custom <c>Instance.ondraw()</c> method.
 * <br><br>
 * 
 * <ul>
 * <li><b>qsolid</b><br>
 * This is the main Body nodes's list which are rendered as 
 * "non transparent" objects by the Drawer.
 * </li><br>
 * <li><b>qalpha</b><br>
 * This is the main Body nodes's list which are rendered as 
 * "transparent/FX" objects by the Drawer.
 * </li><br>
 * <li><b>qtform</b><br>
 * This is the main Transform nodes's list which are used by the Drawer 
 * to render object's helpers (bounding boxes, spheres, axis, etc.)
 * </li><br>
 * <li><b>qlight</b><br>
 * This is the main Light nodes's list which are involved in the 
 * rendering process, used to define Lights by the Drawer.
 * </li><br>
 * <li><b>qlayer</b><br>
 * This is the main Layer nodes's list which are rendered by the Drawer.
 * </li><br>
 * <li><b>qtext</b><br>
 * This is the main Text nodes's list which are rendered by the Drawer.
 * </li><br>
 * <li><b>qphycs</b><br>
 * This is the main Physics nodes's list which are tested for collisions 
 * by the Solver (Ovoid.Solver).
 * </li>
 * </ul>
 * 
 * @param {object} i Instance object to register object to.
 * 
 */
Ovoid.Queuer = function(i) {
  
  /** Instance parent */
  this._i = i;
  

  /** Dag iterator */
  this._wgit = new Ovoid.WgIterator();


  /** Solid body stack. */
  this.qsolid = new Array(Ovoid.MAX_RENDER_LAYER);


  /** Alpha body stack. */
  this.qalpha = new Array(Ovoid.MAX_RENDER_LAYER);


  /** Transform stack. */
  this.qtform = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


  /** Light stack. */
  this.qlight = new Ovoid.Stack(Ovoid.MAX_LIGHT_BY_DRAW);


  /** Layer stack. */
  this.qlayer = new Ovoid.Stack(Ovoid.MAX_LAYER_BY_DRAW);


  /** Text stack. */
  this.qtext = new Ovoid.Stack(Ovoid.MAX_LAYER_BY_DRAW);


  /** Physic stack. */
  this.qphycs = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


  /** Current render camera. */
  this._rcamera = null;
  
  /** Last audio listener position to comput velocity. */
  this._lastlwp = [0.0,0.0,0.0];

};

/**
 * Queuer initialization.<br><br>
 * 
 * Global initialization method. This methode is called once during the library 
 * main initalization. It shouldn't be called a second time.
 * 
 * @see Ovoid.init
 *
 * @return {bool} True if initialization succeeds, false otherwise.
 */
Ovoid.Queuer.prototype._init = function() {

  /* Initialise les stack de body pour les render layers */
  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    this.qsolid[i] = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);
    this.qalpha[i] = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);
  }
  
  Ovoid._log(3, this._i, '.Queuer._init', ' done');

  return true;
};


/**
 * Update node dependencies.
 * 
 * @param {Node} o Node Object to cach his dependencies.
 * 
 * @see Ovoid.Node
 */
Ovoid.Queuer.prototype._cachDependencies = function(o) {

  var i = o.depend.length;
  while (i--) {
    if (o.depend[i].type & Ovoid.ACTION)
      o.depend[i].cachAction();
    
    if (o.depend[i].type & Ovoid.PHYSICS)
      o.depend[i].cachPhysics();
    
    if (o.depend[i].type & Ovoid.ANIMATION)
      o.depend[i].cachAnimation();
    
    if (o.depend[i].type & Ovoid.AIM)
      o.depend[i].cachAim();
      
    if (o.depend[i].type & Ovoid.EXPRESSION)
      o.depend[i].cachExpression();
      
    if (o.depend[i].type & Ovoid.MESH)
      o.depend[i].cachMesh();

    if (o.depend[i].type & Ovoid.SKIN)
      o.depend[i].cachSkin();
      
    if (o.depend[i].type & Ovoid.EMITTER)
      o.depend[i].cachEmitter();
      
    o.depend[i].addCach(Ovoid.CACH_WORLD);
  }
};


/**
 * Light culling link test.
 * 
 * @param {Body} o Body object to test light linking.
 * @param {Light[]} l Light object array to test linking.
 */
Ovoid.Queuer.prototype._lightcull = function(o, l) {
  
  /* on verifie le link lumier pour ajouter la 
   * ou les lumieres qu'il faut au render queue */
  if (this._i.opt_sceneLightcull) {
    var i = l.length;
    while (i--) {
      if (l[i].visible) {
        if (l[i].isLightening(o)) {
          if(!this.qlight.has(l[i])) {
            l[i].rendered = true;
            this.qlight.add(l[i]);
          }
        }
      }
    }
  }
};


/**
 * View culling.
 * 
 * @param {Body} o Body Object to add to stack.
 *
 * @return {bool} True if node is added in stack, false otherwise.
 */
Ovoid.Queuer.prototype._viewcull = function(o) {
  
  if (this._i.opt_sceneViewcull) {
    if (this._rcamera.isWatching(o)) {
      
      if(o.visibleRange >= o.distFromEye || o.visibleRange <= 0.0) {
        o.rendered = true;
        
        // On modifie la distance pour les particules, pour qu'elles soient toujours rendus en dernier.
        if(o.shape.type & Ovoid.EMITTER) { 
          o.distFromEye = Ovoid.FLOAT_MIN;
        }
      
        // Calcul du LOD pour le shape
        if(o.shape) {
          if(o.shape.type & Ovoid.MESH) {
            o.shape._lod = 0;
            for(var l = 0; l < Ovoid.MAX_MESH_LOD; l++) {
              if(o.shape._lodt[l] < 0)
                continue;
              if(o.distFromEye >= o.shape._lodt[l])
                o.shape._lod = l;
            }
          }
        }
        
        if(o.renderAlpha) {
          this.qalpha[o.renderLayer].add(o);
        } else {
          this.qsolid[o.renderLayer].add(o);
        }
        return true;
      } else {
        return false;
      }
    }
  } else {
    o.rendered = true;
    // Calcul de la distance à la camera
    if(o.shape.type & Ovoid.EMITTER) { 
      // Exception pour les particules, toujours dessinées en dernier.
      o.distFromEye = Ovoid.FLOAT_MIN;
    } else {
      o.distFromEye = o.worldPosition.dist(this._rcamera.worldPosition) - o.boundingSphere.radius;
    }
    if(o.renderAlpha) {
      this.qalpha[o.renderLayer].add(o);
    } else {
      this.qsolid[o.renderLayer].add(o);
    }
    return true;
  }
  return false;
};


/**
 * Physics culling.
 * 
 * @param {Physic} o Physic Object to add to stack.
 *
 * @return {bool} True if node is added in stack, false otherwise.
 * 
 * @see Ovoid.Physics
 */
Ovoid.Queuer.prototype._physicscull = function(o) {

  if(o.visible && o.model < 3) {
    this.qphycs.add(o);
  } 
};


/**
 * Sort function for rendering order (QuickSort Partitionner).<br><br>
 */
Ovoid.Queuer.prototype._QSzParter = function(a, p, r) {
  
  var x = a[p].distFromEye;
  var i = p-1;
  var j = r+1;
  var t;

  while(1) {
    do {
      j--;
    } while(a[j].distFromEye < x);
    do {
      i++;
    } while(a[i].distFromEye > x);
    if(i < j) {
      t = array[i];
      a[i] = a[j];
      a[j] = t;
    } else {
      return j;
    }
  }
  return j;
};


/**
 * Sort function for rendering order (QuickSort sort).<br><br>
 */
Ovoid.Queuer.prototype._QSzSort = function(a, p, r) {
  var q;
  if( p < r ) {
    q = this._QSzParter(a, p, r);
    this._QSzSort(a, p, q);
    this._QSzSort(a, q+1, r);
  }
};


/**
 * Reset Queuer.<br><br>
 * 
 * Clears all stacks and prepare for a new queuing process.
 */
Ovoid.Queuer.prototype._reset = function() {

  for(var i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    this.qsolid[i].empty();
    this.qalpha[i].empty();
  }
  this.qlayer.empty();
  this.qtext.empty();
  this.qlight.empty();
  this.qtform.empty();
  this.qphycs.empty();
};


/**
 * Queue scene.<br><br>
 * 
 * "Reads" the specified scene, updates all nodes and dependencies, 
 * and then build a queue of all objects which must be drawn by 
 * the Drawer, treated by the Solver, etc.<br><br>
 * 
 * This is the global class update. This method is automaticaly called each
 * frame during the library main loop.
 *
 * @param {Scene} sc Scene object to build queues from, usualy the active scene.
 * 
 * @see Ovoid.Scene
 * @see Ovoid.Drawer
 * @see Ovoid.Solver
 */
Ovoid.Queuer.prototype._queueScene = function(sc) {

  /* quelques variables reutilisables */
  var o, i, j;

  /* creation de la queue de rendu */
  /* selection de la camera */
  this._rcamera = sc.activeCamera;
  
  /* Update/Cach camera si modification de frame */
  if (this._i.Frame.changed) {
    this._rcamera.setView(this._i.Frame.size.v[0],this._i.Frame.size.v[1]);
    this._rcamera.cachCamera();
  }

  this._cachDependencies(this._rcamera);
  
  /* Update de l'audioListener */
  if(this._i.al) { /* Ovoid.WEB_AUDIO_API */
    
    this._i.al.listener.dopplerFactor = this._i.opt_audioDopplerFactor;
            
    var matrix = this._rcamera.worldMatrix;
    
    this._i.al.listener.setPosition(matrix.m[12], matrix.m[13], matrix.m[14]);
    
    this._i.al.listener.setOrientation(-matrix.m[8], -matrix.m[9], -matrix.m[10],
        matrix.m[4], matrix.m[5], matrix.m[6]);

    this._i.al.listener.setVelocity(matrix.m[12] - this._lastlwp[0], 
        matrix.m[13] - this._lastlwp[1],
        matrix.m[14] - this._lastlwp[2] );
    
    this._lastlwp[0] = matrix.m[12];
    this._lastlwp[1] = matrix.m[13];
    this._lastlwp[2] = matrix.m[14];
  }

  /* Uncach tous les actions */
  i = sc.action.length;
  while (i--) sc.action[i].unCach(Ovoid.CACH_ACTION);
  /* Uncach toutes les expressions */
  i = sc.expression.length;
  while (i--) sc.expression[i].unCach(Ovoid.CACH_EXPRESSION);

  /* Actualise les dependences pour les materiaux */
  i = sc.material.length;
  while (i--) this._cachDependencies(sc.material[i]);

  /* Actualisation et mise en render queue des bodys */
  this._wgit.init(sc.world);
  while (this._wgit.explore())
  {
    o = this._wgit.current;
    this._cachDependencies(o);
    
    o.rendered = false;
    if (o.visible) {
      if (o.type & Ovoid.TRANSFORM) {
        o.cachTransform();
        /* Ajoute en queue transform si le dessins des helpers 
         * est activé */
        if (this._i.opt_renderDrawHelpers)
          this.qtform.add(o);
          
        /* Si c'est un body */
        if (o.type & Ovoid.BODY) {
          if(o.shape) {
            /* cache le body pour actualiser la bounding volum */
            o.cachBody();
            /* Ajoute au render stack si passe le view culling
             * puis test light link pour le light culling */
            if (this._viewcull(o))
              this._lightcull(o, sc.light);
          }
        }
        
        /* Si c'est un joint */
        if(o.type & Ovoid.JOINT) {
          if (o.skin) {
            o.cachJoint();
          }
          continue;
        }
          
        /* Si c'est un sound */
        if (o.type & Ovoid.SOUND) {
          if (o.audio) {
            o.cachSound();
          }
          continue;
        }
  
        /* Si c'est une camera */
        if (o.type & Ovoid.CAMERA) {
          if (this._i.Frame.changed)
            o.setView(this._i.Frame.size.v[0], this._i.Frame.size.v[1]);
          o.cachCamera();
          continue;
        }

        /* Si c'est une lumiere */
        if (o.type & Ovoid.LIGHT) {
          o.cachLight();
          continue;
        }
      }
    }
  }
  
  /* Verifie les intersections des bodys intersectables */
  if (this._i.opt_sceneIntersectDetect) {
    var a, b;
    /* On stock les intersections, dans un stack */
    var intersect = new Ovoid.Stack(Ovoid.MAX_BODY_INTERSECT);
    i = sc.transform.length;
    while (i--) {
      a = sc.transform[i];
      if(a.intersectable) {
        j = sc.transform.length;
        /* On vide le stack */
        intersect.empty();
        while (j--) {
          b = sc.transform[j];
          if(j != i && b.intersectable) {
            if(a.boundingSphere.worldCenter.dist(b.boundingSphere.worldCenter) 
                <= (a.boundingSphere.radius+b.boundingSphere.radius)) {
              intersect.add(b);
            }
          }
        }
        /* Verifie les différences pour enter et leave*/
        a.enter.empty();
        a.leave.empty();
        j = intersect.count;
        while (j--) {
          if(!a.intersect.has(intersect[j])) {
            a.enter.add(intersect[j])
          }
        }
        j = a.intersect.count;
        while (j--) {
          if(!intersect.has(a.intersect[j])) {
            a.leave.add(a.intersect[j])
          }
        }
        a.intersect.empty();
        j = intersect.count;
        while (j--) {
          a.intersect.add(intersect[j]);
        }
      }
    }
  }
  
  /* A optimiser, on ajoute les physics au collider stack 
   * Note à moi-même: A optimiser comment ? Avec un octree ? Bwahaha !! */
  i = sc.physics.length;
  while (i--) this._physicscull(sc.physics[i]);

  /* Cach des tracks d'animation, en toute fin de process pour que 
   * toutes les animations soient à jour */
  i = sc.track.length;
  while (i--) sc.track[i].cachTrack();

  /* Ordonne les bodys selon la distance à la camera */
  for(i = 0; i < Ovoid.MAX_RENDER_LAYER; i++) {
    this._QSzSort(this.qalpha[i], 0, this.qalpha[i].length - 1);
  }
  

  /* Si le light-linking est desactivé on ajoute toutes les lumieres */
  if (!this._i.opt_sceneLightcull) {
    i = sc.light.length;
    while (i--) {
      if(sc.light[i].visible) {
        if(!this.qlight.has(sc.light[i])) {
          sc.light[i].rendered = true;
          this.qlight.add(sc.light[i]);
        }
      }
    }
  }

  
  i = 0; /* pour le picking par defaut */
  
  /* Actualisation et mise en render queue des layers */
  this._wgit.init(sc.overlay);
  while (this._wgit.explore()) {
    o = this._wgit.current;
    this._cachDependencies(o);
    if (o.visible) {
      o.cachTransform();
      o.cachLayer();
      if (o.type & Ovoid.TEXT) {
        this.qtext.add(o);
      } else {
        /* Si le picking est off, picking de substitution */
        if (this._i.opt_renderPickingMode == 0) { 
          /* verifie si le pointeur est over */
          if(o.isPointOver(this._i.Input.mousePosition)) i = o.uid;
        }
        this.qlayer.add(o);
      }
    }
  }
  
  if (this._i.opt_renderPickingMode == 0) { 
    if(i == this._i.Input.mouseOverUid) {
      this._i.Input.mouseEnterUid = this._i.Input.mouseLeaveUid = 0;
    } else {
      this._i.Input.mouseLeaveUid = this._i.Input.mouseOverUid;
      this._i.Input.mouseEnterUid = this._i.Input.mouseOverUid = i;
    }
  }
  
};
