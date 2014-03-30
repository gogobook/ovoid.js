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
 * @class World Graph depth-first iterator.<br><br>
 *
 * This class provides an implementation of a graph depth-first iterator for 
 * Node objects's hierarchy tree.<br><br>
 * 
 * <b>World hierarchy graph</b><br><br>
 * 
 * The world hierarchy is the most common and known relationship type in 3D 
 * context. It is defined by the child-parent relationship, 
 * who describes how a node will affects (leads) the transformation of one or 
 * several other nodes. In practice, each child nodes recursively undergoes the 
 * transformation (in parent space coordinate) applied to its parents.<br><br>
 * 
 * <blockcode>
 * var wgit = new Ovoid.WgIterator(node);<br>
 * while(wgit.explore()) {<br>
 * &nbsp;&nbsp;alert(dgit.current.name);<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * The Node class implement this relationship through its <c>parent</c> and 
 * <c>child</c> member fields, and the relationship is created using the 
 * <c>setParent</c> method. One node can only have one parent, and an 
 * limitless amount of children.<br><br>
 * 
 * @see Ovoid.Node
 *
 * @param {Node} root Root Node object to begin the depth-first iteration.
 */
Ovoid.WgIterator = function(root) {

  this.root = root;
  this.current = root;
  this.depth = 0;
  this.queue = new Uint16Array(128);
  this.completed = false;
};


/**
 * Iteration initialization.<br><br>
 * 
 * Initialize the iterator for a new depth-first iteration trought Node's 
 * hierarchy tree.
 *
 * @param {Node} root Root Node object to begin iteration.
 */
Ovoid.WgIterator.prototype.init = function(root) {

  this.root = root;
  this.current = root;
  var i = 128;
  while (i--) { this.queue[i] = 0.0; }
  this.depth = 0;
  this.completed = false;
};


/**
 * Iterate through the graph tree.<br><br>
 * 
 * Iterate in depth-first through the graph tree of nodes who are the direct
 * childrens of the current one.
 *
 * @return {bool} True if it remains nodes to be explored, false if tree is 
 * entirely explored.
 */
Ovoid.WgIterator.prototype.explore = function() {

  if (!this.completed)
  {
    // Remonte l'arbre si tous les enfants du node on été visités
    while (this.queue[this.depth] == this.current.child.length)
    {
      this.queue[this.depth] = 0;

      if (this.depth == 0) {
        this.completed = true;
        return false;
      }

      this.depth--;
      this.current = this.current.parent;
    }
    // Passe à l'enfant suivant
    this.current = this.current.child[this.queue[this.depth]];
    this.queue[this.depth]++; this.depth++;
  }
  return !this.completed;
};
