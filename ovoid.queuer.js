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
 * @namespace Queuer global class.
 * <br>
 * <br>
 * This class is a global static one, that means that it has no constructor and 
 * has only one instance. In the OvoiD.JS Library, global classes implements 
 * features for specific range of tasks. Global classes can be seen as several 
 * worker that accomplish their own job.
 * <br>
 * <br>
 * The Queuer global class is the main OvoiD.JS Library's queue manager. It 
 * is more or less the library's crossroad. The Queuer's purposes 
 * are (in brief):
 * <ul>
 * <li>Refresh the active scene's nodes tree</li>
 * <li>Build render queue according to the view and light linking</li>
 * <li>Build physics solver queue</li>
 * <li>Dispatch nodes trought several queues</li>
 * </ul>
 * <br>
 * <br>
 * <b>View and light culling</b>
 * One of the purpose of the queuer is to select nodes who will be drawed. 
 * Since it is not desirable to include all nodes of the active scene in the 
 * drawer stack, the Queuer implements some mecanisms that will only include 
 * the needed nodes, also called "node culling".
 * <ul>
 * <li><b>View culling</b></li>
 * The view culling mechanism consists on determin if an object is in the field 
 * of view of the active render camera. An object which is not in the field of 
 * view is not visible by definition, so it is excluded from the next 
 * rendering stack. The view culling (at this stage of development) proceeds to 
 * a frustum culling test.
 * <br>
 * This mechanism can be enabled or disabled by modifying the global option
 * <code>Ovoid.Queuer.opt_viewcull</code>
 * <br>
 * <br>
 * <li><b>Light culling</b></li>
 * The light culling mechanism consists on determin whether a light source is 
 * used for an actually rendered object. If a light illuminate none of the 
 * visibles objects, the light is useless, so it is excluded from rendering 
 * pipeline. The light culling (at this stage of development) proceeds to a 
 * light range (sphere intersection) test on every rendered object.
 * <br>
 * This mechanism can be enabled or disabled by modifying the global option 
 * <code>Ovoid.Queuer.opt_lightcull</code>
 * </ul>
 */
Ovoid.Queuer = {};


/** queuer option. Enable or disable view culling. */
Ovoid.Queuer.opt_viewcull = true;


/** queuer option. Enable or disable light culling. */
Ovoid.Queuer.opt_lightcull = true;


/** queuer option. Default camera position. */
Ovoid.Queuer.opt_defaultCameraPos = [0.0, 0.0, 10.0];


/** queuer option. Default camera rotation. */
Ovoid.Queuer.opt_defaultCameraRot = [0.0, 0.0, 0.0];


/** Dag iterator */
Ovoid.Queuer._wgit = new Ovoid.WgIterator();


/** Renderable queue stack. */
Ovoid.Queuer._qbody = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


/** Transform queue list. */
Ovoid.Queuer._qtform = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


/** Light queue list. */
Ovoid.Queuer._qlight = new Ovoid.Stack(Ovoid.MAX_LIGHT_BY_DRAW);


/** Layer queue list. */
Ovoid.Queuer._qlayer = new Ovoid.Stack(Ovoid.MAX_LAYER_BY_DRAW);


/** Physic queue list. */
Ovoid.Queuer._qphycs = new Ovoid.Stack(Ovoid.MAX_BODY_BY_DRAW);


/** Camera queue list. */
Ovoid.Queuer._rcamera = null;


/** Default rendering view camera. */
Ovoid.Queuer._dcamera = new Ovoid.Camera('defaultCamera');


/**
 * Queuer initialization.
 * <br>
 * <br>
 * Global initialization method. This methode is called once during the Ovoid 
 * library's main initalization. It should not be called a second time.
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
    if (o.depend[i].type & Ovoid.ACTION) {
      o.depend[i].cachAction();
    }
    
    if (o.depend[i].type & Ovoid.PHYSICS) {
      /* Aplique la gravité */
      o.depend[i].newtonXyz(Ovoid.opt_gravity[0], 
          Ovoid.opt_gravity[1], 
          Ovoid.opt_gravity[2])
      o.depend[i].cachPhysics();
    }
    
    if (o.depend[i].type & Ovoid.ANIMATION) {
      o.depend[i].cachAnimation();
    }
    
    if (o.depend[i].type & Ovoid.MESH) {
      o.depend[i].cachMesh();
    }

    if (o.depend[i].type & Ovoid.SKIN) {
      o.depend[i].cachSkin();
    }
      
    if (o.depend[i].type & Ovoid.EMITTER) {
      o.depend[i].cachEmitter();
    }
      
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
        if(!Ovoid.Queuer._qlight.has(l[i])) {
          l[i].rendered = true;
          Ovoid.Queuer._qlight.add(l[i]);
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
      Ovoid.Queuer._qbody.add(o);
      return true;
    }
  } else {
    o.rendered = true;
    Ovoid.Queuer._qbody.add(o);
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
    Ovoid.Queuer._qphycs.add(o);
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
 * Reset Queuer.
 * <br>
 * <br>
 * Resets all Queuer's stacks to prepare for a new queuing process.
 */
Ovoid.Queuer.reset = function() {

  Ovoid.Queuer._qbody.empty();
  Ovoid.Queuer._qlayer.empty();
  Ovoid.Queuer._qlight.empty();
  Ovoid.Queuer._qtform.empty();
  Ovoid.Queuer._qphycs.empty();
};


/**
 * Queue scene.
 * <br>
 * <br>
 * Refreshes and builds queues from the specified scene. Once done, the Queuer 
 * has filled its stacks needed for the drawing and physics solving process.
 * <br>
 * <br>
 * This is the global class's update method. This methode is automaticaly 
 * called at each main loop. It shoulds not be called manually.
 *
 * @param {Scene} sc Scene object to build queues from, usualy the active scene.
 * 
 * @see Ovoid.Scene
 * @see Ovoid.Drawer
 * @see Ovoid.Solver
 */
Ovoid.Queuer.queueScene = function(sc) {

  /* quelques variables reutilisables */
  var o, i, c, x;

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

  /* Update de l'audioListener */
  if(Ovoid.al.type == 3) { /* Ovoid.WEBKIT_AUDIO_API */
    var matrix = Ovoid.Queuer._rcamera.worldMatrix;
    Ovoid.al.listener.setPosition(matrix.m[12], matrix.m[13], matrix.m[14]);
    Ovoid.al.listener.setOrientation(-matrix.m[8], -matrix.m[9], -matrix.m[10],
        matrix.m[4], matrix.m[5], matrix.m[6]);
  }
  
  Ovoid.Queuer._cachDependencies(Ovoid.Queuer._rcamera);

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
          Ovoid.Queuer._qtform.add(o);
          
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
  
  /* A optimiser, on ajoute les physics au collider stack 
   * Note à moi-même: A optimiser comment ? Avec un octree ? Bwahaha !! */
  i = sc.physics.length;
  while (i--) Ovoid.Queuer._physicscull(sc.physics[i]);

  /* Cach des tracks d'animation, en toute fin de process pour que 
   * toutes les animations soient à jour */
  i = sc.track.length;
  while (i--) sc.track[i].cachTrack();

  /* Ordonne les bodys selon la distance à la camera */
  Ovoid.Queuer._qbody.sort(Ovoid.Queuer._bodyZSortFunc);

  /* Si le light-linking est desactivé on ajoute toutes les lumieres */
  if (!Ovoid.Queuer.opt_lightcull) {
    i = sc.light.length;
    while (i--) {
      if(!Ovoid.Queuer._qlight.has(sc.light[i])) {
        sc.light[i].rendered = true;
        Ovoid.Queuer._qlight.add(sc.light[i]);
      }
    }
  }

  /* Actualisation et mise en render queue des layers */
  Ovoid.Queuer._wgit.init(sc.overlay);
  while (Ovoid.Queuer._wgit.explore()) {
    o = Ovoid.Queuer._wgit.current;
    Ovoid.Queuer._cachDependencies(o);
    if (o.visible) {
      if (o.type & Ovoid.TRANSFORM) {
        o.cachTransform();
        if (o.type & Ovoid.LAYER) {
          Ovoid.Queuer._qlayer.add(o);
        }
      }
    }
  }
};
