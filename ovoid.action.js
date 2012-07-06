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
 * @class Action node object.
 * <br>
 * <br>
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.
 * <br>
 * <br>
 * The Action node is the main way to make your scene interactive. This node 
 * is an abstract dependency node and is not in the world. Action nodes are used
 * to link some interactive events to call custom functions. Actually (at this 
 * developement stage) Action node principally act with the mouse Picking 
 * system. It act as an "Event detector" such of mouse over a node or mouse 
 * entering in a node, mouse click on a node, etc... and then to call the 
 * corresponding trigger function.
 * <br>
 * <br>
 * For example, Action node allow you to catch when the user is clicking on a
 * node with the left mouse button, and so associate any generic or specific 
 * function with this event.
 * <br>
 * <br>
 * <blockcode>
 * function catastrophe(node) {<br>
 * &nbsp;&nbsp;<commentcode>// Do some funny stuff</commentcode><br>
 * };<br>
 * <br>
 * var action = new Ovoid.Action("myAction");
 * action.onLmbDn = catastrophe;<br>
 * action.linkNode(mybox);<br>
 * </blockcode>
 * <br>
 * <br>
 * The Action node is presently composed of several overridable trigger 
 * methods corresponding to predefined events. For example the 
 * <code>onEnter</code> method, 
 * is called when the mouse pointer just enter over the node and the 
 * <code>onOver</code> 
 * method is constantly called as long as the mouse pointer is rolling over 
 * the node. All Action node's methods take one argument that is the 
 * implied node of the event.
 * <br>
 * <br>
 * <b>Grabbing node</b>
 * <br>
 * Action node also work with a node-grabbing system. The "node-grabbing" 
 * consists in focusing on a node while ignoring  events of others nodes. 
 * <br>
 * To understand, suppose you want to rotate a node by moving the mouse while
 * you maintain the left button pressed. While you move your mouse pointer to 
 * rotate the object, the pointer will leave the node's region, resulting the 
 * event stop, since the mouse now roll over another node. 
 * <br>
 * The "node-grabbing" prevents the side effects by forcing to focus on the 
 * grabbed node and to ignore the others. You also have to "release" the 
 * node when you want to restore the normal event dispatching.
 * <br>
 * <br>
 * There is also special methods <code>onUngrab</code> and 
 * <code>onGrab</code>. <code>onUngrab</code> is constantly 
 * called without any special event as long as the node is NOT grabbed (i.e. 
 * the normal node's status). In opposit, the <code>onGrab</code> method is 
 * constantly 
 * called as long as the node IS grabbed.
 * <br>
 * <br>
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
 * var action = new Ovoid.Action("myAction");
 * action.onLmbDn = grabnode;<br>
 * action.onGrabd = rotate;<br>
 * action.linkNode(mybox);<br>
 * </blockcode>
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

  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is penetrating over the node.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onEnter = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onEnter = function(node) {};
  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is leaving from over the node.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onLeave = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onLeave = function(node) {};
  /** Overridable event triggered function.
   * Function triggered constantly when the mouse pointer is over the node.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onOver = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onOver = function(node) {};
  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is over the node and the.
   * left mouse button is pressed.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onLmbDn = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onLmbDn = function(node) {};
  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is over the node and the.
   * left mouse button is released.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onLmbUp = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onLmbUp = function(node) {};
  /** Overridable event triggered function.
   * Function triggered constantly when the mouse pointer is over the node and the.
   * left mouse button is held.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onLmbHl = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onLmbHl = function(node) {};
  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is over the node and the 
   * middle mouse button is pressed.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onMmbDn = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onMmbDn = function(node) {};
  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is over the node and the 
   * middle mouse button is released.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onMmbUp = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onMmbUp = function(node) {};
  /** Overridable event triggered function.
   * Function triggered constantly when the mouse pointer is over the node and the 
   * middle mouse button is held.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onMmbHl = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onMmbHl = function(node) {};
  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is over the node and the 
   * right mouse button is pressed.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onRmbDn = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onRmbDn = function(node) {};
  /** Overridable event triggered function.
   * Function triggered once when the mouse pointer is over the node and the 
   * right mouse button is released.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onRmbUp = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onRmbUp = function(node) {};
  /** Overridable event triggered function.
   * Function triggered constantly when the mouse pointer is over the node and the 
   * right mouse button is held.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onRmbHl = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onRmbHl = function(node) {};
  /** Overridable event triggered function.
   * Function triggered constantly when the linked/target node(s) is grabbed.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
   * <blockcode>
   * action.onGrabd = function (node) { <codecomment>// do something</codecomment> };<br>
   * </blockcode>
   * @field 
   * @type Function
   * @param {Object} node The implied event's node. */
  this.onGrabd = function(node) {};
  /** Overridable event triggered function.
   * Function triggered constantly when the linked/target node(s) is NOT grabbed.
   * <br><br>The function sould be designed to accept one parameter that is the 
   * the implied event's node.
   * <br><br>
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
 * Link a node to this instance.
 * 
 * <br><br>If you want the Action node to take effect on a node, you have to link 
 * the node to it. You can link as many nodes you want to the same Action node 
 * instance, so all linked nodes will have the same behaviours.
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
      
      if (this.link[i].uid == Ovoid.Input.mouseLeaveUid)
        this.onLeave(this.link[i]);
      
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
