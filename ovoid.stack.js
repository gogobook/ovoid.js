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
 * Create a Stack object.
 *
 * @class Stack object.
 * 
 * This class provides an implementation of a fixed size Stack. The Stack object
 * extends the Javascript built-in Array object. The Stack object is designed to
 * be frequently filled and emptied without changing the Array structure nor 
 * content's data type.
 *
 * @param {int} size Size of the stack.
*/
Ovoid.Stack = function(size) {
  
  Array.call(this);
  /** Stack item count */
  this.count = 0;
  /** Stack array length */
  this.length = size;

};
Ovoid.Stack.prototype = new Array;
Ovoid.Stack.prototype.constructor = Ovoid.Stack;


/**
 * Append an item at the current index.
 * 
 * @param {*} item Something to add.
 */
Ovoid.Stack.prototype.add = function(item) {
  
  if(this.count != this.length) { 
    this[this.count] = item;
    this.count++;
  }
};


/**
 * Empty the stack.
 */
Ovoid.Stack.prototype.empty = function() {
  
  this.count = 0;
};


/**
 * Check whether stack contain the given item.
 * 
 * @param {*} item Item to search for.
 *
 * @return {bool} True if the item was found, false otherwise.
 */
Ovoid.Stack.prototype.has = function(item) {
  
  var i = this.count;
  while(i--) {
    if(this[i] === item) 
      return true;
  }
  return false;
};


/**
 * Check whether the stack is full.
 * 
 * @return {bool} True if the stack is full, false otherwise.
 */
Ovoid.Stack.prototype.isFull = function() {
  
  return (this.count === this.length)
};


/**
 * Check whether the stack is emty.
 * 
 * @return {bool} True if the stack is empty, false otherwise.
 */
Ovoid.Stack.prototype.isEmpty = function() {
  
  return !this.count;
};


/**
 * Get item at current index.
 * 
 * @return {*} The item at the current index or undefined if the index is at the
 * end of the stack.
 */
Ovoid.Stack.prototype.current = function() {
  
  return this[this.count];
};


/**
 * Step forwad the stack's index.
 */
Ovoid.Stack.prototype.forward = function() {
  
  if(this.count != this.length) { 
    this.count++;
  }
};


/**
 * Step backward the stack's index.
 */
Ovoid.Stack.prototype.backward = function() {
  
  if(this.count) { 
    this.count--;
  }
};
