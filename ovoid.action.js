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
 * @class Action node object.<br><br>
 * 
 * This class is a Node object inherited from <c>Ovoid.Node</c> class.<br><br>
 * 
 * The Action node is an interaction trigger. Action node is used to assign 
 * custom functions to some predefined events which occure on the target node. 
 * It node mainly work in couple with the mouse picking mecanism.
 * The Action node is a dependency node and does not takes place directly in 
 * the 3D world. The Action node is typically linked to one or more Body or 
 * Layer nodes.<br><br>
 * 
 * <blockcode>
 * function catastrophe(node) {<br>
 * &nbsp;&nbsp;<cc>// Do some funny stuff</cc><br>
 * };<br>
 * <br>
 * var action = myOvoid.Scene.newNode(Ovoid.ACTION, "myAction");<br>
 * action.onLmbDn = catastrophe;<br>
 * action.linkNode(mybox);<br>
 * </blockcode><br><br>
 * 
 * The Action node is currently composed of several overridable trigger 
 * functions corresponding to predefined events which can occur on a node. 
 * Overridables trigger function take one parameter which is the node implied 
 * in the event trigger.<br><br>
 * 
 * The Action node also provides, in couple with the Input global class, a 
 * node-grabbing system which allow some specific treatements on the node.<br><br>
 * 
 * <b>Node Grabbing</b><br><br>
 * 
 * Node-grabbing consists in focusing on a node while ignoring events of 
 * other nodes.<br><br>
 * 
 * Suppose you want to rotate a node by moving the mouse while you maintain the 
 * left button pressed. While you move your mouse pointer to rotate the object, 
 * the pointer should leave the node's region, resulting that the trigger 
 * function stops, since the mouse now rolls over another node (or the 
 * background).<br><br>
 * 
 * The "node-grabbing" prevents this kind of side effects by forcing to focus on 
 * the grabbed node while ignoring the others. You also must release the grabbed 
 * node to return in the normal interaction behaviour.<br><br>
 * 
 * <blockcode>
 * function grabnode(node) {<br>
 * &nbsp;&nbsp;myOvoid.grabNode(node)<br>
 * };<br>
 * <br>
 * function rotate(node) {<br>
 * &nbsp;&nbsp;<cc>// myOvoid.Input.intUp is an array of "key-up" input signals</cc><br>
 * &nbsp;&nbsp;if (myOvoid.Input.intUp[Ovoid.MB_LEFT]) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;myOvoid.grabRelease();<br>
 * &nbsp;&nbsp;} else {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<cc>// myOvoid.Input.mouseVelocity is a Vector object</cc><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;node.rotate(myOvoid.Input.mouseVelocity);<br>
 * &nbsp;&nbsp;}<br>
 * };<br>
 * <br>
 * var action = myOvoid.Scene.newNode(Ovoid.ACTION, "myAction");<br>
 * action.setTrigger(Ovoid.MOUSE_OVER_LEFT_DOWN, grabnode);<br>
 * action.setTrigger(Ovoid.ON_GRABBED, rotate);<br>
 * action.linkNode(mybox);<br>
 * </blockcode><br><br>
 * 
 * The Action node also provides two special overridable trigger functions 
 * related to the node-grabbing which correspond to the two main possibilities: 
 * "while node is grabbed" and "while node is NOT Grabbed". Both trigger 
 * function are called each frame while the event "node is grabbed" or "node is 
 * not grabbed" is true.<br><br>
 * 
 * <b>Node Intersections</b><br><br>
 * 
 * The Action node can also handle node intersection related events. 
 * Intersection events are based on Body's bounding spheres. If a two 
 * Body node are set as <c>intersectable</c>, all intersection between 
 * them will generate events.<br><br>
 * 
 * Action node can handle three kind of intersection events, intersect, enter 
 * and leave. The "intersect" event is generated as long a Body intersect with 
 * another, "enter" event is generated once a Body enter on another and "leave" 
 * once a Body quit from another.<br><br>
 * 
 * The event handling also can be node specific or not. That means, you can 
 * define an trigger function for intersection between two particular nodes, 
 * or, for all nodes that intersects without specific selection. Lets look 
 * at some examples.<br><br>
 * 
 * Handle an intersection between two specific nodes:<br><br>
 * 
 * <blockcode>
 * function enter(node, enternode) {<br>
 * &nbsp;&nbsp;alert(node.name "now enter in" enternode.name);
 * }<br>
 * <br>
 * var action = myOvoid.Scene.newNode(Ovoid.ACTION, "myAction");<br>
 * <cc>// Trigger function when enter mybox2</cc><br>
 * action.setTrigger(Ovoid.ON_INTERSECT_ENTER, enter, mybox2);<br>
 * <cc>// Link this action to mybox1</cc><br>
 * action.linkNode(mybox1);<br>
 * </blockcode>
 * 
 * In the above example, the event will be triggered once mybox1 and mybox2, 
 * and only mybox1 and mybox2 will intersect.
 * 
 * Handle an intersection between one node and all others:<br><br>
 * 
 * <blockcode>
 * function enter(node, enternode) {<br>
 * &nbsp;&nbsp;alert(enternode.name "now enter in" node.name);
 * }<br>
 * <br>
 * var action = myOvoid.Scene.newNode(Ovoid.ACTION, "myAction");<br>
 * <cc>// Trigger function when any Body enter (third argument is null)</cc><br>
 * action.setTrigger(Ovoid.ON_INTERSECT_ENTER, enter);<br>
 * <cc>// Link this action to mybox1</cc><br>
 * action.linkNode(mybox1);<br>
 * </blockcode>
 * 
 * In the above example, the event will be triggered once mybox1 and any 
 * Body will intersect. <i>The body must be set as <c>intersectable</c></i><br><br>
 * 
 * <b>Handled envets</b><br><br>
 * <ul>
 * <li>Ovoid.MOUSE_ENTER<br>
 * Triggered once when mouse cursor enter over the node.
 * </li>
 * <li>Ovoid.MOUSE_LEAVE<br>
 * Triggered once when mouse cursor leave from over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER<br>
 * Triggered as long the mouse cursor is over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_LEFT_DOWN<br>
 * Triggered once the left mouse button is pressed when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_LEFT_UP<br>
 * Triggered once the left mouse button is released when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_LEFT_HELD<br>
 * Triggered as long the left mouse button is pressed when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_MIDDLE_DOWN<br>
 * Triggered once the middle mouse button is pressed when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_MIDDLE_UP<br>
 * Triggered once the middle mouse button is released when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_MIDDLE_HELD<br>
 * Triggered as long the middle mouse button is pressed when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_RIGHT_DOWN<br>
 * Triggered once the right mouse button is pressed when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_RIGHT_UP<br>
 * Triggered once the right mouse button is released when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.MOUSE_OVER_RIGHT_HELD<br>
 * Triggered as long the right mouse button is pressed when mouse cursor is 
 * over the node.
 * </li>
 * <li>Ovoid.ON_GRABBED<br>
 * Triggered as long the node is grabbed.
 * </li>
 * <li>Ovoid.ON_UNGRABBED<br>
 * Triggered as long the node is not grabbed.
 * </li>
 * <li>Ovoid.ON_INTERSECT<br>
 * Triggered as long the node's bouding sphere intersects another specified 
 * node's bouding sphere.
 * </li>
 * <li>Ovoid.ON_INTERSECT_ENTER<br>
 * Triggered once the node's bouding sphere enters in another specified 
 * node's bouding sphere.
 * </li>
 * <li>Ovoid.ON_INTERSECT_LEAVE<br>
 * Triggered once the node's bouding sphere leaves from another specified 
 * node's bouding sphere.
 * </li>
 * </ul>
 * 
 * @extends Ovoid.Node
 * 
 * @param {string} name Name of the node.
 * @param {object} i Instance object to register object to.
 */
Ovoid.Action = function(name, i) {

  Ovoid.Node.call(this);
  /** Node type
   * @type bitmask */
  this.type |= Ovoid.ACTION;
  /** Node name 
   * @type string */
  this.name = name;

  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is penetrating over the node.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onEnter = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onEnter = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is leaving from over the node.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onLeave = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onLeave = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered constantly when the mouse pointer is over the node.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onOver = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onOver = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is over the node and the.
   * left mouse button is pressed.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onLmbDn = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onLmbDn = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is over the node and the.
   * left mouse button is released.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onLmbUp = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onLmbUp = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered constantly when the mouse pointer is over the node and the.
   * left mouse button is held.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onLmbHl = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onLmbHl = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is over the node and the 
   * middle mouse button is pressed.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onMmbDn = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onMmbDn = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is over the node and the 
   * middle mouse button is released.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onMmbUp = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onMmbUp = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered constantly when the mouse pointer is over the node and the 
   * middle mouse button is held.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onMmbHl = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event node. */
  this.onMmbHl = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is over the node and the 
   * right mouse button is pressed.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onRmbDn = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onRmbDn = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered once when the mouse pointer is over the node and the 
   * right mouse button is released.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onRmbUp = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onRmbUp = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered constantly when the mouse pointer is over the node and the 
   * right mouse button is held.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onRmbHl = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onRmbHl = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered constantly when the linked nodes are grabbed.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onGrabd = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onGrabd = function(node) {};
  /** Overridable event triggered function.<br><br>
   * Function triggered constantly when the linked nodes are not grabbed.<br><br>
   * 
   * The function accepts one parameter which is the event's involved node.<br><br>
   * 
   * <blockcode>
   * action.onUgrabd = function (node) { <cc>// do something</cc> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onUgrabd = function(node) {};
  /** Intersect event trigger node/function.<br><br>
   * @type Array */
  this.onIntersect = [new Array(), new Array()];
  /** Intersect enter event trigger node/function.<br><br>
   * @type Array */
  this.onIntersectEnter = [new Array(), new Array()];
  /** Intersect leave event trigger node/function.<br><br>
   * @type Array */
  this.onIntersectLeave = [new Array(), new Array()];
  
  /** Ovoid.JS parent instance
   * @type Object */
  this._i = i;
};
Ovoid.Action.prototype = new Ovoid.Node;
Ovoid.Action.prototype.constructor = Ovoid.Action;


/**
 * Link a node to this instance.<br><br>
 * 
 * Assigns a node which be affected by this instance's trigger functions.
 *
 * @param {Node} node Node to link.
 * 
 * @see Ovoid.Node
 */
Ovoid.Action.prototype.linkNode = function(node) {

    i = this.link.length;
    while (i--) {
      if(this.link[i] === node)
        return;
    }
    
    node.pickable = true;
    if(!this._i.opt_renderPickingMode) {
      Ovoid._log(2,this._i,'::Action.linkNode', this.name +
          ":: linked node '"+node.name+"' set as pickable but render picking mode is disabled, that will not work.");
    }
    if(this.onIntersect.length || this.onIntersectEnter.length || this.onIntersectLeave.length) {
      node.intersectable = true;
      if(!this._i.opt_sceneIntersectDetect) {
        Ovoid._log(2,this._i,'::Action.linkNode', this.name +
            ":: linked node '"+node.name+"' set as intersectable but intersect detection is disabled, that will not work.");
      }
    }
    node.makeDepend(this);
};

/**
 * Set triggered function.<br><br>
 * 
 * Assigns or add an event trigger function to this instance.
 *
 * @param {enum} e Event to catch. Can be one of 
 * the following symbolic constants: <br>
 * Ovoid.MOUSE_ENTER, <br>
 * Ovoid.MOUSE_LEAVE, <br>
 * Ovoid.MOUSE_OVER, <br>
 * Ovoid.MOUSE_OVER_LEFT_DOWN, <br>
 * Ovoid.MOUSE_OVER_LEFT_UP, <br>
 * Ovoid.MOUSE_OVER_LEFT_HELD, <br>
 * Ovoid.MOUSE_OVER_MIDDLE_DOWN, <br>
 * Ovoid.MOUSE_OVER_MIDDLE_UP, <br>
 * Ovoid.MOUSE_OVER_MIDDLE_HELD, <br>
 * Ovoid.MOUSE_OVER_RIGHT_DOWN, <br>
 * Ovoid.MOUSE_OVER_RIGHT_UP, <br>
 * Ovoid.MOUSE_OVER_RIGHT_HELD, <br>
 * Ovoid.ON_GRABBED,<br>
 * Ovoid.ON_UNGRABBED,<br>
 * Ovoid.ON_INTERSECT,<br>
 * Ovoid.ON_INTERSECT_ENTER,<br>
 * Ovoid.ON_INTERSECT_LEAVE
 * 
 * @param {Function} f The trigger function to call for this event.
 * 
 * @param {Node|*} [item] Additionnal trigger argument. Can be a node to define
 * an intersection trigger.
 * 
 * @see Ovoid.Node
 */
Ovoid.Action.prototype.setTrigger = function(e, f, item) {
  
    switch (e)
    {
      /* Ovoid.MOUSE_ENTER */
      case 0:
        this.onEnter = f;
        break;
      /* Ovoid.MOUSE_LEAVE */
      case 1:
        this.onLeave = f;
        break;
      /* Ovoid.MOUSE_OVER */
      case 2:
        this.onOver = f;
        break;
      /* Ovoid.MOUSE_OVER_LEFT_DOWN */
      case 3: 
        this.onLmbDn = f;
        break;
      /* Ovoid.MOUSE_OVER_LEFT_UP */
      case 4: 
        this.onLmbUp = f;
        break;
      /* Ovoid.MOUSE_OVER_LEFT_HELD */
      case 5:
        this.onLmbHl = f;
        break;
      /* Ovoid.MOUSE_OVER_MIDDLE_DOWN */
      case 6:
        this.onMmbDn = f;
        break;
      /* Ovoid.MOUSE_OVER_MIDDLE_UP */
      case 7:
        this.onMmbUp = f;
        break;
      /* Ovoid.MOUSE_OVER_MIDDLE_HELD */
      case 8:
        this.onMmbHl = f;
        break;
      /* Ovoid.MOUSE_OVER_RIGHT_DOWN */
      case 9:
        this.onRmbDn = f;
        break;
      /* Ovoid.MOUSE_OVER_RIGHT_UP */
      case 10:
        this.onRmbUp = f;
        break;
      /* Ovoid.MOUSE_OVER_RIGHT_HELD */
      case 11:
        this.onRmbHl = f;
        break;
      /* Ovoid.ON_GRABBED */
      case 12:
        this.onGrabd = f;
        break;
      /* Ovoid.ON_UNGRABBED */
      case 13: 
        this.onUgrabd = f;
        break;
      /* Ovoid.ON_INTERSECT */
      case 14: 
        this.onIntersect[0].push(item);
        this.onIntersect[1].push(f);
        var i = this.link.length;
        while (i--) this.link[i].intersectable = true;
        if(item) item.intersectable = true;
        break;
      /* Ovoid.ON_INTERSECT_ENTER */
      case 15: 
        this.onIntersectEnter[0].push(item);
        this.onIntersectEnter[1].push(f);
        var i = this.link.length;
        while (i--) this.link[i].intersectable = true;
        if(item) item.intersectable = true;
        break;
      /* Ovoid.ON_INTERSECT_LEAVE */
      case 16: 
        this.onIntersectLeave[0].push(item);
        this.onIntersectLeave[1].push(f);
        var i = this.link.length;
        while (i--) this.link[i].intersectable = true;
        if(item) item.intersectable = true;
        break;
    }
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
Ovoid.Action.prototype.cachAction = function() {

  if (!(this.cach & Ovoid.CACH_ACTION))
  {
    var i, j, k, l;
    var c = this._i.Input;
    try { /* handle exceptions car des fonctions sont custom */
      
      /* parcours des nodes linkés à cet Action */
      i = this.link.length;
      while (i--)
      {
        l = this.link[i];
        
        if (l.uid == c.mouseLeaveUid) {
          this.onLeave(l);
          document.body.style.cursor = 'default';
        }
        
        if (l.uid == c.mouseEnterUid) {
          this.onEnter(l);
          c.mouseOverNode = l;
        }
          
        /* le pickId est-il dans le background ? */
        if (c.mouseOverUid == 0) {
            c.mouseOverNode = null;
        } else {
          /* La node est-elle sous la souris ? */
          if (l.uid == c.mouseOverUid) {
            document.body.style.cursor = 'pointer';
            this.onOver(l);
            /* y'a-t-il une node grabbed ? */
            if (!c.grabbedNode) {
              /* si non on test tous les evenements */
              if (c.intDn[0]) this.onLmbDn(l);
              if (c.intUp[0]) this.onLmbUp(l);
              if (c.intHl[0]) this.onLmbHl(l);
              if (c.intDn[1]) this.onMmbDn(l);
              if (c.intUp[1]) this.onMmbUp(l);
              if (c.intHl[1]) this.onMmbHl(l);
              if (c.intDn[2]) this.onRmbDn(l);
              if (c.intUp[2]) this.onRmbUp(l);
              if (c.intHl[2]) this.onRmbHl(l);
            }
          }
        }

        /* cette node est-elle la grabbed one ? */
        if (l == c.grabbedNode) {
          /* modifie le curseur */
          document.body.style.cursor = 'crosshair';
          this.onGrabd(l);
          /* on test tous les évements */
          if (c.intDn[0]) this.onLmbDn(l);
          if (c.intUp[0]) this.onLmbUp(l);
          if (c.intHl[0]) this.onLmbHl(l);
          if (c.intDn[1]) this.onMmbDn(l);
          if (c.intUp[1]) this.onMmbUp(l);
          if (c.intHl[1]) this.onMmbHl(l);
          if (c.intDn[2]) this.onRmbDn(l);
          if (c.intUp[2]) this.onRmbUp(l);
          if (c.intHl[2]) this.onRmbHl(l);
        } else {
          this.onUgrabd(l);
        }
        
        if(this._i.opt_sceneIntersectDetect) {
          /* intersections ? */
          k = this.onIntersect[0].length;
          if(l.intersect.count && k) {
            while (k --) {
              // Si l'argument est null, on applique à toutes les nodes
              j = l.intersect.count;
              if(this.onIntersect[0][k] == null) {
                while (j--) {
                  this.onIntersect[1][k](l, l.intersect[j]);
                }
              } else {
                while (j--) {
                  if(l.intersect[j] === this.onIntersect[0][k])
                    this.onIntersect[1][k](l, l.intersect[j]);
                }
              }
            }
          }
          /* intersections enter ? */
          k = this.onIntersectEnter[0].length;
          if(l.enter.count && k) {
            while (k --) {
              // Si l'argument est null, on applique à toutes les nodes
              j = l.enter.count;
              if(this.onIntersectEnter[0][k] == null) {
                while (j--) {
                  this.onIntersectEnter[1][k](l, l.enter[j]);
                }
              } else {
                while (j--) {
                  if(l.enter[j] === this.onIntersectEnter[0][k])
                    this.onIntersectEnter[1][k](l, l.enter[j]);
                }
              }
            }
          }
          /* intersections Leave ? */
          k = this.onIntersectLeave[0].length;
          if(l.leave.count && k) {
            while (k --) {
              j = l.leave.count;
              // Si l'argument est null, on applique à toutes les nodes
              if(this.onIntersectLeave[0][k] == null) {
                while (j--) {
                  this.onIntersectLeave[1][k](l, l.leave[j]);
                }
              } else {
                while (j--) {
                  if(l.leave[j] === this.onIntersectLeave[0][k])
                    this.onIntersectLeave[1][k](l, l.leave[j]);
                }
              }
            }
          }
        } // if(this._i.opt_sceneIntersectDetect)
      }
    } catch(e) {
      Ovoid._log(0, this._i, '::Action.cachAction', this.name + 
          ':: Custom function exception thrown:\n' + e.stack);
    }
    this.addCach(Ovoid.CACH_ACTION);
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
Ovoid.Action.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.ACTION;
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
  /* Ovoid.Action */
  o['onEnter'] = Ovoid.compact(this.onEnter);
  o['onLeave'] = Ovoid.compact(this.onLeave);
  o['onOver'] = Ovoid.compact(this.onOver);
  o['onLmbDn'] = Ovoid.compact(this.onLmbDn);
  o['onLmbUp'] = Ovoid.compact(this.onLmbUp);
  o['onLmbHl'] = Ovoid.compact(this.onLmbHl);
  o['onMmbDn'] = Ovoid.compact(this.onMmbDn);
  o['onMmbUp'] = Ovoid.compact(this.onMmbUp);
  o['onMmbHl'] = Ovoid.compact(this.onMmbHl);
  o['onRmbDn'] = Ovoid.compact(this.onRmbDn);
  o['onRmbUp'] = Ovoid.compact(this.onRmbUp);
  o['onRmbHl'] = Ovoid.compact(this.onRmbHl);
  o['onGrabd'] = Ovoid.compact(this.onGrabd);
  o['onUgrabd'] = Ovoid.compact(this.onUgrabd);
  o['onIntersect'] = [new Array(), new Array()];
  for(var i = 0; i < this.onIntersect[0].length; i++) {
    o['onIntersect'][0][i] = this.onIntersect[0][i].uid;
    o['onIntersect'][1][i] = Ovoid.compact(this.onIntersect[1][i]);
  }
  o['onIntersectEnter'] = [new Array(), new Array()];
  for(var i = 0; i < this.onIntersectEnter[0].length; i++) {
    o['onIntersectEnter'][0][i] = this.onIntersectEnter[0][i].uid;
    o['onIntersectEnter'][1][i] = Ovoid.compact(this.onIntersectEnter[1][i]);
  }
  o['onIntersectLeave'] = [new Array(), new Array()];
  for(var i = 0; i < this.onIntersectLeave[0].length; i++) {
    o['onIntersectLeave'][0][i] = this.onIntersectLeave[0][i].uid;
    o['onIntersectLeave'][1][i] = Ovoid.compact(this.onIntersectLeave[1][i]);
  }
  return o;
};
