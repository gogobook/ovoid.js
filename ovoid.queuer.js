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
 * Queuer global static class.
 *
 * @namespace Queuer global class.<br><br>
 * 
 * The Queuer class implements a per frame global treatment queue. It is a 
 * global static (namespace) class. The Timer class provides the common clock 
 * and times parameter calculated over each frame's refresh. Typically, Queuer 
 * will "read" the current active scene, updates all nodes and dependencies, 
 * and then build a queue (for example) of all objects which must be drawn by 
 * the Drawer, must be treated by the Solver, etc... each frame.<br><br>
 * 
 * <b>Node culling</b><br><br>
 * 
 * Since it is not desirable to include all nodes of the active scene in the 
 * drawer stack, it implements some mecanisms which only includes the needed
 * nodes. This mecanisms is called "Node Culling".<br><br>
 * 
 * <ul>
 * <li><b>View culling</b><br>
 * The view culling mechanism checks whether a node is within the view frustum 
 * of the current active camera. Also named "View frustum culling".<br><br>
 * 
 * This mechanism can be enabled or disabled by modifying the global option
 * <code>Ovoid.Queuer.opt_viewcull</code>
 * </li>
 * 
 * <li><b>Light culling</b><br>
 * The light culling mechanism checks whether a light is needed to draw the 
 * current frame. It excludes all the light that does not illuminate one of 
 * the not culled nodes.<br><br>
 * 
 * This mechanism can be enabled or disabled by modifying the global option 
 * <code>Ovoid.Queuer.opt_lightcull</code>
 * </li>
 * </ul>
 */
Ovoid.Queuer = {};


/** Enable or disable view culling. */
Ovoid.Queuer.opt_viewcull = true;


/** Enable or disable light culling. */
Ovoid.Queuer.opt_lightcull = true;


/** Enable or disable intersection detection. */
Ovoid.Queuer.opt_intersect = true;


/** Default camera position. */
Ovoid.Queuer.opt_defaultCameraPos = [0.0, 0.0, 10.0];


/** Default camera rotation. */
Ovoid.Queuer.opt_defaultCameraRot = [0.0, 0.0, 0.0];


/** Dag iterator */
Ovoid.Queuer._wgit = new Ovoid.WgIterator();


/** Body stack. */
 Ovoid.Queuer.qbody = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


/** Transform stack. */
Ovoid.Queuer.qtform = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


/** Light stack. */
Ovoid.Queuer.qlight = new Ovoid.Stack(Ovoid.MAX_LIGHT_BY_DRAW);


/** Layer stack. */
Ovoid.Queuer.qlayer = new Ovoid.Stack(Ovoid.MAX_LAYER_BY_DRAW);


/** Text stack. */
Ovoid.Queuer.qtext = new Ovoid.Stack(Ovoid.MAX_LAYER_BY_DRAW);


/** Physic stack. */
Ovoid.Queuer.qphycs = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


/** Current render camera. */
Ovoid.Queuer._rcamera = null;


/** Default rendering view camera. */
Ovoid.Queuer._dcamera = new Ovoid.Camera('defaultCamera');


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
Ovoid.Queuer.init = function() {

  Ovoid.log(3, 'Ovoid.Queuer', 'initialization');

  /* initialisation de la camera par defaut */
  
  Ovoid.Queuer._dcamera.moveXyz(Ovoid.Queuer.opt_defaultCameraPos[0],
      Ovoid.Queuer.opt_defaultCameraPos[1],
      Ovoid.Queuer.opt_defaultCameraPos[2],
      Ovoid.WORLD, Ovoid.ABSOLUTE);

  Ovoid.Queuer._dcamera.rotateXyz(Ovoid.Queuer.opt_defaultCameraRot[0],
      Ovoid.Queuer.opt_defaultCameraRot[1],
      Ovoid.Queuer.opt_defaultCameraRot[2],
      Ovoid.WORLD, Ovoid.RELATIVE);

  Ovoid.Queuer._dcamera.setView(Ovoid.Frame.size.v[0],
        Ovoid.Frame.size.v[1]);
        
  Ovoid.Queuer._dcamera.cachTransform();

  Ovoid.Queuer._dcamera.cachCamera();
  
  Ovoid.Queuer._rcamera = Ovoid.Queuer._dcamera;

  return true;
};


/**
 * Update node dependencies.
 * 
 * @param {Node} o Node Object to cach his dependencies.
 * 
 * @see Ovoid.Node
 */
Ovoid.Queuer._cachDependencies = function(o) {

  var i = o.depend.length;
  while (i--) {
    if (o.depend[i].type & Ovoid.ACTION)
      o.depend[i].cachAction();
    
    if (o.depend[i].type & Ovoid.PHYSICS)
      o.depend[i].cachPhysics();
    
    if (o.depend[i].type & Ovoid.ANIMATION)
      o.depend[i].cachAnimation();
    
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
Ovoid.Queuer._lightcull = function(o, l) {
  
  /* on verifie le link lumier pour ajouter la 
   * ou les lumieres qu'il faut au render queue */
  if (Ovoid.Queuer.opt_lightcull) {
    i = l.length;
    while (i--) {
      if (l[i].isLightening(o)) {
        if(!Ovoid.Queuer.qlight.has(l[i])) {
          l[i].rendered = true;
          Ovoid.Queuer.qlight.add(l[i]);
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
Ovoid.Queuer._viewcull = function(o) {
  
  if (Ovoid.Queuer.opt_viewcull) {
    if (Ovoid.Queuer._rcamera.isWatching(o)) {
      o.distFromEye = 
          o.worldPosition.dist(Ovoid.Queuer._rcamera.worldPosition) -
          o.boundingSphere.radius;
          
      o.rendered = true;
       Ovoid.Queuer.qbody.add(o);
      return true;
    }
  } else {
    o.rendered = true;
     Ovoid.Queuer.qbody.add(o);
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
Ovoid.Queuer._physicscull = function(o) {

  if(!(o.cach & Ovoid.CACH_PHYSICS) || o.target.rendered) {
    Ovoid.Queuer.qphycs.add(o);
  } 
};


/** 
 * Sort function for rendering order.
 * This function is typically used as class's private member and should not be 
 * called independently.
 * 
 * @param {Body} a Body object to compare distance from camera.
 * @param {Body} b Body object to compare distance from camera.
 * 
 * @return {bool} True if a is the farest from eye, false otherwise.
 * 
 * @see Ovoid.Body
 */
Ovoid.Queuer._bodyZSortFunc = function(a, b) {
  
  return a.distFromEye <= b.distFromEye;
  
};


/**
 * Reset Queuer.<br><br>
 * 
 * Clears all stacks and prepare for a new queuing process.
 */
Ovoid.Queuer.reset = function() {

  Ovoid.Queuer.qbody.empty();
  Ovoid.Queuer.qlayer.empty();
  Ovoid.Queuer.qtext.empty();
  Ovoid.Queuer.qlight.empty();
  Ovoid.Queuer.qtform.empty();
  Ovoid.Queuer.qphycs.empty();
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
Ovoid.Queuer.queueScene = function(sc) {

  /* quelques variables reutilisables */
  var o, i, j;

  /* creation de la queue de rendu */
  /* selection de la camera */
  if (sc.activeCamera) {
    Ovoid.Queuer._rcamera = sc.activeCamera;
  } else {
    Ovoid.Queuer._dcamera.cachTransform();
    Ovoid.Queuer._dcamera.cachCamera();
    Ovoid.Queuer._rcamera = Ovoid.Queuer._dcamera;
  }
  
  /* Update/Cach camera si modification de frame */
  if (Ovoid.Frame.changed) {
    Ovoid.Queuer._rcamera.setView(Ovoid.Frame.size.v[0],
        Ovoid.Frame.size.v[1]);
    Ovoid.Queuer._rcamera.cachCamera();
  }

  Ovoid.Queuer._cachDependencies(Ovoid.Queuer._rcamera);
 
  /* Update de l'audioListener */
  if(Ovoid.al.type == 3) { /* Ovoid.WEBKIT_AUDIO_API */
    var matrix = Ovoid.Queuer._rcamera.worldMatrix;
    Ovoid.al.listener.setPosition(matrix.m[12], matrix.m[13], matrix.m[14]);
    Ovoid.al.listener.setOrientation(-matrix.m[8], -matrix.m[9], -matrix.m[10],
        matrix.m[4], matrix.m[5], matrix.m[6]);
  }

  /* Uncach tous les actions */
  i = sc.action.length;
  while (i--) sc.action[i].unCach(Ovoid.CACH_ACTION);


  /* Actualisation et mise en render queue des bodys */
  Ovoid.Queuer._wgit.init(sc.world);
  while (Ovoid.Queuer._wgit.explore())
  {
    o = Ovoid.Queuer._wgit.current;
    Ovoid.Queuer._cachDependencies(o);
    
    o.rendered = false;
    if (o.visible) {
      if (o.type & Ovoid.TRANSFORM) {
        o.cachTransform();
        /* Ajoute en queue transform si le dessins des helpers 
         * est activé */
        if (Ovoid.Drawer.opt_drawHelpers)
          Ovoid.Queuer.qtform.add(o);
          
        /* Si c'est un body */
        if (o.type & Ovoid.BODY) {
          if (o.shape) {
            /* cache le body pour actualiser la bounding volum */
            o.cachBody();
            /* Ajoute au render stack si passe le view culling
             * puis test light link pour le light culling */
            if (Ovoid.Queuer._viewcull(o))
              Ovoid.Queuer._lightcull(o, sc.light);
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
          if (Ovoid.Frame.changed)
            o.setView(Ovoid.Frame.size.v[0], Ovoid.Frame.size.v[1]);
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
  if (Ovoid.Queuer.opt_intersect) {
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
            if(a.boundingSphere.worldCenter.dist2(b.boundingSphere.worldCenter) 
              <= (a.boundingSphere.radius2+b.boundingSphere.radius2)) {
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
  while (i--) Ovoid.Queuer._physicscull(sc.physics[i]);

  /* Cach des tracks d'animation, en toute fin de process pour que 
   * toutes les animations soient à jour */
  i = sc.track.length;
  while (i--) sc.track[i].cachTrack();

  /* Ordonne les bodys selon la distance à la camera */
  Ovoid.Queuer.qbody.sort(Ovoid.Queuer._bodyZSortFunc);

  /* Si le light-linking est desactivé on ajoute toutes les lumieres */
  if (!Ovoid.Queuer.opt_lightcull) {
    i = sc.light.length;
    while (i--) {
      if(!Ovoid.Queuer.qlight.has(sc.light[i])) {
        sc.light[i].rendered = true;
        Ovoid.Queuer.qlight.add(sc.light[i]);
      }
    }
  }

  /* Actualisation et mise en render queue des layers */
  Ovoid.Queuer._wgit.init(sc.overlay);
  while (Ovoid.Queuer._wgit.explore()) {
    o = Ovoid.Queuer._wgit.current;
    Ovoid.Queuer._cachDependencies(o);
    if (o.visible) {
      o.cachTransform();
      o.cachLayer();
      if (o.type & Ovoid.TEXT) {
        Ovoid.Queuer.qtext.add(o);
      } else {
        Ovoid.Queuer.qlayer.add(o);
      }
    }
  }
};
