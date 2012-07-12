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
 * Action node constructor.
 * 
 * @class Action node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
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
 * &nbsp;&nbsp;<codecomment>// Do some funny stuff</codecomment><br>
 * };<br>
 * <br>
 * var action = scene.create(Ovoid.ACTION, "myAction");<br>
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
 * &nbsp;&nbsp;Ovoid.grabNode(node)<br>
 * };<br>
 * <br>
 * function rotate(node) {<br>
 * &nbsp;&nbsp;<codecomment>// Ovoid.Input.intUp is an array of "key-up" input signals</codecomment><br>
 * &nbsp;&nbsp;if (Ovoid.Input.intUp[Ovoid.MB_LEFT]) {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;Ovoid.grabRelease();<br>
 * &nbsp;&nbsp;} else {<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;<codecomment>// Ovoid.Input.mouseVelocity is a Vector object</codecomment><br>
 * &nbsp;&nbsp;&nbsp;&nbsp;node.rotate(Ovoid.Input.mouseVelocity);<br>
 * &nbsp;&nbsp;}<br>
 * };<br>
 * <br>
 * var action = scene.create(Ovoid.ACTION, "myAction");<br>
 * action.onLmbDn = grabnode;<br>
 * action.onGrabd = rotate;<br>
 * action.linkNode(mybox);<br>
 * </blockcode><br><br>
 * 
 * The Action node also provides two special overridable trigger functions 
 * related to the node-grabbing which correspond to the two main possibilities: 
 * "while node is grabbed" and "while node is NOT Grabbed". Both trigger 
 * function are called each frame while the event "node is grabbed" or "node is 
 * not grabbed" is true.
 * 
 * @extends Ovoid.Node
 * 
 * @param {string} name Name of the node.
 */
Ovoid.Action = function(name) {

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
   * action.onEnter = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onLeave = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onOver = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onLmbDn = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onLmbUp = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onLmbHl = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onMmbDn = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onMmbUp = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onMmbHl = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onRmbDn = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onRmbUp = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onRmbHl = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onGrabd = function (node) { <codecomment>// do something</codecomment> };<br>
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
   * action.onUgrabd = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onUgrabd = function(node) {};

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
    node.makeDepend(this);
};


/**
 * Node's caching function.
 *
 * <br><br>Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <code>Ovoid.Queuer</code> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Action.prototype.cachAction = function() {

  if (!(this.cach & Ovoid.CACH_ACTION))
  {
    var i, j;

    /* parcours des nodes linkés à cet event */
    i = this.link.length;
    while (i--)
    {
      
      if (this.link[i].uid == Ovoid.Input.mouseLeaveUid) {
        this.onLeave(this.link[i]);
        document.body.style.cursor = 'default';
      }
      
      if (this.link[i].uid == Ovoid.Input.mouseEnterUid) {
        this.onEnter(this.link[i]);
        Ovoid.Input.mouseOverNode = this.link[i];
      }
        
      /* le pickId est-il dans le background ? */
      if (Ovoid.Input.mouseOverUid == 0) {
          Ovoid.Input.mouseOverNode = null;
      } else {
        /* La node est-elle sous la souris ? */
        if (this.link[i].uid == Ovoid.Input.mouseOverUid) {
          document.body.style.cursor = 'pointer';
          this.onOver(this.link[i]);
          /* y'a-t-il une node grabbed ? */
          if (!Ovoid.Input.grabbedNode) {
            /* si non on test tous les evenements */
            if (Ovoid.Input.intDn[0]) this.onLmbDn(this.link[i]);
            if (Ovoid.Input.intUp[0]) this.onLmbUp(this.link[i]);
            if (Ovoid.Input.intHl[0]) this.onLmbHl(this.link[i]);
            if (Ovoid.Input.intDn[1]) this.onMmbDn(this.link[i]);
            if (Ovoid.Input.intUp[1]) this.onMmbUp(this.link[i]);
            if (Ovoid.Input.intHl[1]) this.onMmbHl(this.link[i]);
            if (Ovoid.Input.intDn[2]) this.onRmbDn(this.link[i]);
            if (Ovoid.Input.intUp[2]) this.onRmbUp(this.link[i]);
            if (Ovoid.Input.intHl[2]) this.onRmbHl(this.link[i]);
          }
        }
      }

      /* cette node est-elle la grabbed one ? */
      if (this.link[i] == Ovoid.Input.grabbedNode) {
        /* modifie le curseur */
        document.body.style.cursor = 'crosshair';
        this.onGrabd(this.link[i]);
        /* on test tous les évements */
        if (Ovoid.Input.intDn[0]) this.onLmbDn(this.link[i]);
        if (Ovoid.Input.intUp[0]) this.onLmbUp(this.link[i]);
        if (Ovoid.Input.intHl[0]) this.onLmbHl(this.link[i]);
        if (Ovoid.Input.intDn[1]) this.onMmbDn(this.link[i]);
        if (Ovoid.Input.intUp[1]) this.onMmbUp(this.link[i]);
        if (Ovoid.Input.intHl[1]) this.onMmbHl(this.link[i]);
        if (Ovoid.Input.intDn[2]) this.onRmbDn(this.link[i]);
        if (Ovoid.Input.intUp[2]) this.onRmbUp(this.link[i]);
        if (Ovoid.Input.intHl[2]) this.onRmbHl(this.link[i]);
      } else {
        this.onUgrabd(this.link[i]);
      }
    }
    this.addCach(Ovoid.CACH_ACTION);
  }
};


/** 
 * JavaScript Object Notation (JSON) serialization method.
 * 
 * <br><br>This method is commonly used by the <code>Ovoid.Ojson</code> class
 * to stringify and export scene.
 *  
 * @return {Object} The JSON object version of this node.
 * 
 * @private
 */
Ovoid.Action.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['type'] = Ovoid.ACTION;
  /* Ovoid.Node */
  o['name'] = this.name;
  o['visible'] = this.visible;
  o['uid'] = this.uid;
  o['parent'] = this.parent?this.parent.uid:'null';
  o['child'] = new Array();
  for(var i = 0; i < this.child.length; i++)
    o['child'][i] = this.child[i].uid;
  o['depend'] = new Array();
  for(var i = 0; i < this.depend.length; i++)
    o['depend'][i] = this.depend[i].uid;
  o['link'] = new Array();
  for(var i = 0; i < this.link.length; i++)
    o['link'][i] = this.link[i].uid;
  /* Ovoid.Action */
  o['onEnter'] = String(this.onEnter);
  o['onLeave'] = String(this.onLeave);
  o['onOver'] = String(this.onOver);
  o['onLmbDn'] = String(this.onLmbDn);
  o['onLmbUp'] = String(this.onLmbUp);
  o['onLmbHl'] = String(this.onLmbHl);
  o['onMmbDn'] = String(this.onMmbDn);
  o['onMmbUp'] = String(this.onMmbUp);
  o['onMmbHl'] = String(this.onMmbHl);
  o['onRmbDn'] = String(this.onRmbDn);
  o['onRmbUp'] = String(this.onRmbUp);
  o['onRmbHl'] = String(this.onRmbHl);
  o['onGrabd'] = String(this.onGrabd);
  o['onUgrabd'] = String(this.onUgrabd);
  return o;
};
