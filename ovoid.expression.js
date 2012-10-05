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
 * Expression node constructor.
 * 
 * @class Expression node object.<br><br>
 * 
 * This class is a Node object inherited from <code>Ovoid.Node</code> class.<br><br>
 * 
 * The Expression node is a Constraint node who apply procedural animation or
 * effect to one other node. Expression are composed of a function dedicated to
 * apply some procedures to targeted nodes. The Expression node is typically 
 * assigned to several nodes to generate logical animation to multiple nodes at
 * once.<br><br>
 * 
 * The expression function should take three arguments. The first one is the 
 * targeted node, second one is the time quantum value (time elapsed since the
 * last frame) and the third one is the linear time value (time elapsed since 
 * the begining).<br><br>
 * 
 * <blockcode>
 * var exprfunc1 = function(node, t, l) {<br>
 * &nbsp;&nbsp;node.rotateXyz(0.0, t*0.1, 0.0);<br>
 * }<br>
 * <br>
 * var exprfunc2 = function(node, t, l) {<br>
 * &nbsp;&nbsp;node.moveXyz(0.0, Math.cos(l)*0.02, 0.0);<br>
 * }<br>
 * <br>
 * var youpi = scene.create(Ovoid.EXPRESSION, "youpiAnim");<br>
 * youpi.addExpression(exprfunc1);<br>
 * youpi.addExpression(exprfunc2);<br>
 * youpi.setTarget(box);<br>
 * youpi.play(0.8);<br>
 * </blockcode><br><br>
 * 
 * @extends Ovoid.Constraint
 *
 * @param {string} name Name of the node.
 */
Ovoid.Expression = function(name) {

  Ovoid.Constraint.call(this);
  /** node type */
  this.type |= Ovoid.EXPRESSION;
  /** Node name 
   * @type string */
  this.name = name;
  /** Expression playing stat.
   * @type bool */
  this.playing = false;
  /** Local time quantum value.
   * @type float */
  this.timeq = 0.0;
  /** Local time line value.
   * @type float */
  this.timel = 0.0;
  /** Expression playing factor.
   * Define the time factor to increment local time. The factor 
   * can be negative to decrement the local time. For example a value of -2.0
   * will decrement the time backward twice the normal speed.
   * @type float */
  this.factor = 1.0;
  /** Expression function array
   * @type Function[] */
  this.exprfunc = new Array();
};
Ovoid.Expression.prototype = new Ovoid.Constraint;
Ovoid.Expression.prototype.constructor = Ovoid.Expression;


/**
 * Add expression.<br><br>
 * 
 * Adds a function as expression to the expression list.
 *
 * @param {Function} expr Expression function. The expression function should 
 * takes three arguments where first is the target node and second the time 
 * quantum value and third the time line value:<br>
 * <code>var expr = function(node, timeq, timel) {};</code>
 */
Ovoid.Expression.prototype.addExpression = function(expr) {

  this.exprfunc.push(expr);
};


/**
 * Stop expression.<br><br>
 * 
 * Stop or pause the expression process.
 */
Ovoid.Expression.prototype.stop = function() {
  
  this.playing = false;
};


/**
 * Play expression.<br><br>
 * 
 * Play the expression process with the specified time factor pitch.
 *
 * @param {float} factor Pitch time factor.
 * Define the time factor to increment local time. The factor 
 * can be negative to decrement the local time. For example a value of -2.0
 * will decrement the time backward twice the normal speed.
 */
Ovoid.Expression.prototype.play = function(factor) {

  if (factor) this.factor = factor;
  this.playing = true;
};


/**
 * Node's caching function.<br><br>
 *
 * Ovoid implements a node's caching system to prevent useless data computing, 
 * and so optimize global performances. This function is used internally by the
 * <code>Ovoid.Queuer</code> global class and should not be called independently.
 * 
 * @private
 */
Ovoid.Expression.prototype.cachExpression = function() {

  if(!(this.cach & Ovoid.CACH_EXPRESSION))
  {
    if (this.playing)
    {
      this.timeq = this.factor * Ovoid.Timer.quantum;
      this.timel += this.timeq;
      
      var i, j, c;
      
      i = this.target.length;
      c = this.exprfunc.length;
      while (i--) {
        for ( j = 0; j < c; j++) {
          this.exprfunc[j](this.target[i], this.timeq, this.timel);
        }
      }
    }
    this.addCach(Ovoid.CACH_EXPRESSION);
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
Ovoid.Expression.prototype.toJSON = function() {
  
  var o = new Object();
  /* node type */
  o['t'] = Ovoid.EXPRESSION;
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
  /* Ovoid.Constraint */
  o['ct'] = new Array();
  for(var i = 0; i < this.target.length; i++)
    o['ct'][i] = this.target[i].uid;
  /* Ovoid.Expression */
  o['pl'] = this.playing;
  o['fc'] = this.factor;
  o['ex'] = new Array();
  for (var i = 0; i < this.exprfunc.length; i++)
    o['ex'][i] = String(this.exprfunc[i]);

  return o;
};
