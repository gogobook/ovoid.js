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
 * Create new world graph iterator.
 *
 * @class World Graph depth-first iterator.
 *
 * This class provides an implementation of a graph depth-first iterator for 
 * Node objects. The world graph is the graph defined by the 
 * <code>parent</code> and <code>child</code> Node object fileds. 
 * <br>
 * <br>
 * <b>The Node world hierarchy concept</b>
 * <br>
 * <br>
 * Nodes are almost all connected ones with the others. The most known and 
 * common node relationship is the hierarchy, described with a graph of parent 
 * and child nodes, it is also the most visible. This relationship is called 
 * "world" because it affect the nodes's world transformations in space.
 * <br>
 * <br>
 * The node world hierarchy 
 * can be defined as how a node's transformations lead the transformations of 
 * another one, or from an other point of view, in which order the nodes's 
 * transformations should be treated to accomplish the global scene 
 * transformation. For example, suppose two nodes, the first is the parent of
 * the second, and so the first has the second as child. If you move the first
 * (parent) node, the second (child) node will follow the first in all its 
 * transformations. However, if you move the second (child) node, the first 
 * (parent) will not be affected by this transformation.
 * <br>
 * <br>
 * In Node object the world hierarchy graph is defined by the <code>parent</code>
 * and 
 * <code>child</code> fields. The first is a reference to an other Node object, 
 * the second is an Array of other Node objets. The <code>parent</code> is a 
 * the parent node of the Node object. The <code>child</code> Array contains all 
 * nodes who are child of the Node object.
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
 * Iteration initialization.
 * 
 * <br><br>Initialize the iterator for a new depth-first iteration trought Node's 
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
 * Iterate through the graph tree.
 * 
 * <br><br>Iterate in depth-first through the graph tree of nodes who are the direct
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
