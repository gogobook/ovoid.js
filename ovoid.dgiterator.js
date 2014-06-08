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
 * @class Dependency Graph depth-first iterator.<br><br>
 * 
 * This class provides an implementation of a depth-first iterator for 
 * Node objects's dependency tree.<br><br>
 * 
 * <b>Nodes dependency graph</b><br><br>
 * 
 * The nodes dependency is a less known relationship type who describe, as its 
 * name says, the relative dependencies of nodes between them. In practice, the 
 * the dependency graph tells which nodes should be updated in 
 * order to fulfill updates of an other one.<br><br>
 * 
 * <blockcode>
 * var dgit = new Ovoid.DgIterator(node);<br>
 * while(dgit.exploreDepend()) {<br>
 * &nbsp;&nbsp;alert(dgit.current.name);<br>
 * }<br>
 * </blockcode><br><br>
 * 
 * The Node class implement this relationship through its <c>depend</c> and 
 * <c>link</c> member fields, and the relationship is created or 
 * destroyed using the <c>makeDepend</c> and <c>breakDepend</c> 
 * methods. One node can have an limitless amount of linked and depend nodes.<br><br> 
 * 
 * @see Ovoid.Node
 *
 * @param {Node} root Root Node object to begin the depth-first iteration.
 */
Ovoid.DgIterator = function(root) {

  this.root = root;
  this.current = root;
  this.currentParent = null;
  this.depth = 0;
  this.queue = new Array(128);
  this.parent = new Array(128);
  var i = 128;
  while (i--) { this.queue[i] = 0; this.parent[i] = null; }
  this.completed = false;
};


/**
 * Iteration initialization.<br><br>
 * 
 * Initialize the iterator for a new depth-first iteration trought Node's 
 * dependency tree.
 *
 * @param {Node} root Root Node object to begin iteration.
 */
Ovoid.DgIterator.prototype.init = function(root) {

  this.root = root;
  this.current = root;
  this.currentParent = null;
  var i = 128;
  while (i--) { this.queue[i] = 0; this.parent[i] = null; }
  this.depth = 0;
  this.completed = false;
};


/**
 * Iterate through the graph tree.<br><br>
 * 
 * Iterate in depth-first through the graph tree of nodes whose the current one
 * directly depends.
 *
 * @return {bool} True if it remains nodes to be explored, false if tree is 
 * entirely explored.
 */
Ovoid.DgIterator.prototype.exploreDepend = function() {

  if (!this.completed)
  {
    // Remonte l'arbre si tous les enfants du node on été visités
    while (this.queue[this.depth] == this.current.depend.length)
    {
      this.queue[this.depth] = 0;
      this.parent[this.depth] = null;

      if (this.depth == 0) {
        this.completed = true;
        return false;
      }

      this.depth--;
      this.current = this.parent[this.depth];

    }
    // Passe à l'enfant suivant
    this.parent[this.depth] = this.current;
    this.currentParent = this.current;
    this.current = this.current.depend[this.queue[this.depth]];
    this.queue[this.depth]++; this.depth++;
  }
  return !this.completed;
};


/**
 * Iterate through the graph tree.<br><br>
 * 
 * Iterate in depth-first through the graph tree of nodes whose directly depends 
 * of the current one.
 *
 * @return {bool} True if it remains nodes to be explored, false if tree is 
 * entirely explored.
 */
Ovoid.DgIterator.prototype.exploreLink = function() {

  if (!this.completed)
  {
    // Remonte l'arbre si tous les enfants du node on été visités
    while (this.queue[this.depth] == this.current.link.length)
    {
      this.queue[this.depth] = 0;
      this.parent[this.depth] = null;

      if (this.depth == 0) {
        this.completed = true;
        return false;
      }

      this.depth--;
      this.current = this.parent[this.depth];

    }
    // Passe à l'enfant suivant
    this.parent[this.depth] = this.current;
    this.currentParent = this.current;
    this.current = this.current.link[this.queue[this.depth]];
    this.queue[this.depth]++; this.depth++;
  }
  return !this.completed;
};


/**
 * Jump graph tree branch.<br><br>
 * 
 * Stop the exploration of the current depend branch and jump to 
 * the next branch.
 */
Ovoid.DgIterator.prototype.jumpDepend = function() {

  // Remonte l'arbre sans approfondir.
  this.queue[this.depth] = 0;
  this.parent[this.depth] = null;

  if (this.depth == 0) {
    this.completed = true;
    return false;
  }

  this.depth--;
  this.current = this.parent[this.depth];
};
