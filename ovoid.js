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
 * along with this program.  If not, see <link url="http://www.gnu.org/licenses/">.
 */


/** Main namespace.
 * 
 * @namespace Main namespace.
 * <br>
 * <br>
 * <b><big>PREAMBLE</big></b>
 * <br>
 * <br>
 * The author's native language of this documentation is not the english. For 
 * this reason, the documentaion may contain some misspellings and grammatical 
 * mistakes. The author apologizes for this annoyance and hopes this will 
 * not impact the overall understanding.
 * <br>
 * <br>
 * <b>OvoiD.JS Library still in developpment, is not fully tested, the 
 * documentation may have some misstakes, and it obviously remains some 
 * unknown bugs. Please send comments and bugs repports at: 
 * <br>
 * <br>
 * <u>root (at) ovoid.org</u></b>
 * <br>
 * <br>
 * <b><big>LIBRARY OVERVIEW</big></b>
 * <br>
 * <br>
 * The OvoiD.JS Library is composed of the followings main elements:
 * <br>
 * <br>
 * <ul>
 * <li><b>Global Symbolic Constants</b></li>
 * <br>
 * <br>
 * The global symbolic constants are used to substitute some integer 
 * (enum) or bitwise values to keep the program readable and understandable. 
 * Symbolic constants are recognisable by their "upper case" syntax:
 * <br>
 * <br>
 * <code>Ovoid.SYMBOLIC_CONSTANT</code>
 * <br>
 * <br>
 * The list of all symbolic constants is available in the present 
 * documentation in the _global_ section.
 * <br>
 * <br>
 * <li><b>Globals Options Variables</b></li>
 * <br>
 * <br>
 * The globals options variables are used, like any other software's options, 
 to modify or specify the library engine's behaviours and parameters. They 
 * depend on "Global classes" (see below) and are scattered in several classes 
 * documentation pages. Options variables can be recognisable by their name 
 * that have the prefix "opt_":
 * <br>
 * <br>
 * <code>Ovoid.opt_globalOption</code>
 * <br>
 * <br>
 * Global Options are modifiables by definition, so for convenience, all of 
 * them are gathered in the ovoid.config.js file who should override the 
 * first declarations.
 * <br>
 * <br>
 * <li><b>Global Classes</b></li>
 * <br>
 * <br>
 * OvoiD.JS Library engine is subdivided in several global static classes 
 * dedicated to a specific task perimeter. In fact, in the strict javascript 
 * logic, these classes are just namespaces but can be view, like in C++ 
 * language, as global static classes. Global classes are generaly 
 * interdependent with each others, this is why they are static.
 * <br>
 * <br>
 * Global classes are the following ones :
 * <br>
 * <ul>
 * <li> <code><a href="Ovoid.Frame.html">Ovoid.Frame</a></code> (Window/canvas manager)</li>
 * <li> <code><a href="Ovoid.Timer.html">Ovoid.Timer</a></code> (Time manager)</li>
 * <li> <code><a href="Ovoid.Input.html">Ovoid.Input</a></code> (Mouse/keyboard manager)</li>
 * <li> <code><a href="Ovoid.Loader.html">Ovoid.Loader</a></code> (Preloading and loading screen manager)</li>
 * <li> <code><a href="Ovoid.Queuer.html">Ovoid.Queuer</a></code> (Scene refreshing and interactivity manager)</li>
 * <li> <code><a href="Ovoid.Drawer.html">Ovoid.Drawer</a></code> (Rendering engine)</li>
 * <li> <code><a href="Ovoid.Solver.html">Ovoid.Solver</a></code> (Physics and collision engine) [Optional]</li>
 * </ul>
 * <br>
 * <br>
 * Global classes can provide some useful informations or methods for 
 * your custom applications.
 * <br>
 * <br>
 * <li><b>Node Classes</b></li>
 * <br>
 * <br>
 * Like many other 3D oriented applications, Ovoid uses nodes to represent the 
 * world and abstract objects in what is called a graph. The node classes are 
 * all at least inherited from the base class <code>Ovoid.Node</code> who 
 * provides basic functionalities like hierarchy, dependencies links and 
 * identification systems. Node classes are dedicated to be included in an 
 * Scene object (<code>Ovoid.Scene</code>).
 * <br>
 * <br>
 * Node classes's inheritances are the following:<br>
 * <ul>
 * <li><code><a href="Ovoid.Node.html">Ovoid.Node</a></code> (Node base class)
 *   <ul>
 *   <li><code><a href="Ovoid.Audio.html">Ovoid.Audio</a></code> (Audio source node)<br>
 *   <li><code><a href="Ovoid.Texture.html">Ovoid.Texture</a></code> (Texture node)<br>
 *   <li><code><a href="Ovoid.Material.html">Ovoid.Material</a></code> (Material node)<br>
 *   <li><code><a href="Ovoid.Action.html">Ovoid.Action</a></code> (Interactivity script node)<br>
 *   <li><code><a href="Ovoid.Constraint.html">Ovoid.Constraint</a></code> (Constraint base node)
 *     <ul>
 *     <li><code><a href="Ovoid.Animation.html">Ovoid.Animation</a></code> (Animation constraint node)</li>
 *     <li><code><a href="Ovoid.Physics.html">Ovoid.Physics</a></code> (Physics constraint node)</li>
 *     </ul>
 *   </li>
 *   <li><code><a href="Ovoid.Emitter.html">Ovoid.Emitter</a></code> (Particles emitter node)</li>
 *   <li><code><a href="Ovoid.Mesh.html">Ovoid.Mesh</a></code> (3D Mesh node)</li>
 *   <li><code><a href="Ovoid.Skin.html">Ovoid.Skin</a></code> (Skinning modifier node)</li>
 *   <li><code><a href="Ovoid.Track.html">Ovoid.Track</a></code> (Animation group node)</li>
 *   <li><code><a href="Ovoid.Transform.html">Ovoid.Transform</a></code> (Transformable node base class)
 *     <ul>
 *     <li><code><a href="Ovoid.Camera.html">Ovoid.Camera</a></code> (Camera node)<br>
 *     <li><code><a href="Ovoid.Light.html">Ovoid.Light</a></code> (Light node)<br>
 *     <li><code><a href="Ovoid.Body.html">Ovoid.Body</a></code> (3D Entity node)<br>
 *     <li><code><a href="Ovoid.Joint.html">Ovoid.Joint</a></code> (Skinning joint/bone node)<br>
 *     <li><code><a href="Ovoid.Sound.html">Ovoid.Sound</a></code> (Sound node)<br>
 *     <li><code><a href="Ovoid.Layer.html">Ovoid.Layer</a></code> (Overlay layer node)
 *       <ul>
 *       <li><code><a href="Ovoid.Text.html">Ovoid.Text</a></code> (Overlay text node)</li>
 *       </ul>
 *     </li>
 *    </ul>
 *   </ul>
 *  </ul>
 * <br>
 * <br>
 * Like matter is made of void, 3D scenes are made of nodes. Node classes are 
 * the main raw material of any 3D interactive application scene.
 * <br>
 * <br>
 * <li><b>Common Types Objects</b></li>
 * <br>
 * <br>
 * Ovoid uses and provides some classes for common types such as color, the 
 * vectors or matrices with methods for common operations like addition, 
 * cross product, copy of objects, comparision test, etc...    
 * <br>
 * <br>
 * Common types objects are the following ones:
 * <br>
 * <ul>
 * <li> <code><a href="Ovoid.Color.html">Ovoid.Color</a></code></li>
 * <li> <code><a href="Ovoid.Coord.html">Ovoid.Coord</a></code></li>
 * <li> <code><a href="Ovoid.Point.html">Ovoid.Point</a></code></li>
 * <li> <code><a href="Ovoid.Vector.html">Ovoid.Vector</a></code></li>
 * <li> <code><a href="Ovoid.Quaternion.html">Ovoid.Quaternion</a></code></li>
 * <li> <code><a href="Ovoid.Euler.html">Ovoid.Euler</a></code></li>
 * <li> <code><a href="Ovoid.Matrix3.html">Ovoid.Matrix3</a></code></li>
 * <li> <code><a href="Ovoid.Matrix4.html">Ovoid.Matrix4</a></code></li>
 * <li> <code><a href="Ovoid.Stack.html">Ovoid.Stack</a></code></li>
 * </ul>
 * <br>
 * <br>
 * Except Stack object, all these classes are based on the javascript's native 
 * ArrayBuffer object. They are also optimized as much as possible for 
 * performance.
 * <br>
 * <br>
 * <li><b>Special Types Objects</b></li>
 * <br>
 * <br>
 * OvoiD.JS Library also uses and provides classes for special types objects that 
 * are typical of an 3D engine such as vertices, shaders or animation curves. 
 * These objects are dedicated to library's inner job and pretty useless for 
 * common usages. However they can be very usefull for low level 
 * programming or tweaks.
 * <br>
 * <br>
 * Special types objects are the following ones:
 * <br>
 * <ul>
 * <li> <code><a href="Ovoid.BoundingBox.html">Ovoid.BoundingBox</a></code> (Generic Bouding box volum)</li>
 * <li> <code><a href="Ovoid.BoundingSphere.html">Ovoid.BoundingSphere</a></code> (Generic Bouding sphere volum)</li>
 * <li> <code><a href="Ovoid.Bspline.html">Ovoid.Bspline</a></code> (Bezier interpolated curve)</li>
 * <li> <code><a href="Ovoid.Hspline.html">Ovoid.Hspline</a></code> (Hermite interpolated curve)</li>
 * <li> <code><a href="Ovoid.Cspline.html">Ovoid.Cspline</a></code> (Cosine or linear interpolated curve)</li>
 * <li> <code><a href="Ovoid.Vertex.html">Ovoid.Vertex</a></code> (Generic mesh's vertex)</li>
 * <li> <code><a href="Ovoid.Triangle.html">Ovoid.Triangle</a></code> (Generic mesh's triangle face)</li>
 * <li> <code><a href="Ovoid.Polyset.html">Ovoid.Polyset</a></code> (Generic mesh's polygon polyset)</li>
 * <li> <code><a href="Ovoid.Particle.html">Ovoid.Particle</a></code> (Generic particle)</li>
 * <li> <code><a href="Ovoid.Shader.html">Ovoid.Shader</a></code> (GLSL shader wrapper)</li>
 * </ul>
 * <br>
 * <li><b>Scene Object And Node Graphs</b></li>
 * <br>
 * <br>
 * Since the OvoiD.JS Library is working with node system and is dedicated to 3D 
 * world  interactions, it provides a Scene object, and some graph-oriented 
 * tools. 
 * <ul>
 * <li> <code><a href="Ovoid.Scene.html">Ovoid.Scene</a></code> is the main scene object class and is more or 
 * less a "node container".</li>
 * </ul>
 * <br>
 * <br>
 * In paralel there are two main graph tool classes to iterate through 
 * node trees:
 * <ul>
 * <li> <code><a href="Ovoid.WgIterator.html">Ovoid.WgIterator</a></code> is the world's hierarchy graph's 
 * iterator, used to iterate through the nodes's hierachy trees.<br>
 * <li> <code><a href="Ovoid.DgIterator.html">Ovoid.DgIterator</a></code> is the Dependency graph iterator, used to 
 * iterate through node dependency tree.
 * </ul>
 * <br>
 * <br>
 * <li><b>Translation Classes</b></li>
 * <br>
 * <br>
 * Since OvoiD.JS Library is not able and nor destined to be able to create 3D 
 * contents, you have to import it. It provides two main ways to import 3D 
 * contents. The first is to import 3D contents from CG software exports. 
 * The second way is to import the optimized and "ready to play" contents 
 * that was exported by the dedicated class. So, you guess that it is also 
 * provided an exporter.
 * <ul>
 * <li> <code><a href="Ovoid.Collada.html">Ovoid.Collada</a></code> is the main class dedicated to the 
 * Dae/Collada files importation (and ONLY importation).</li>
 * <li> <code><a href="Ovoid.Ojson.html">Ovoid.Ojson</a></code> is the main class dedicated to the 
 * Ovoid JSON files importation AND exportation.</li>
 * </ul>
 * <br>
 * <br>
 * These classes should not necessarly be used directly for import. The global 
 * class <code><a href="Ovoid.Loader.html">Ovoid.Loader</a></code> provides an 
 * preloading interface that 
 * automatically imports data (by using these classes). See the calsses's 
 * documentations for more information about import, export and the preloading 
 * process.
 * </ul>
 * <br>
 * <br>
 * <b><big>FIRST STEPS</big></b>
 * <ul>
 * <li><b>Include OvoiD.JS Library in your web page</b></li>
 * <br>
 * <br>
 * To use the OvoiD.JS Library you first need to extract or upload the Library 
 * folder in the suitable folder of your web hosting space. Once it is done, 
 * to use the OvoiD.JS Library you have to load it with your web page. To do so, 
 * include the following lines in the header part of your HTML:
 * <br>
 * <br>
 * <blockcode>
 * &lt;script type="text/javascript" src="ovoid/ovoid-1.0.js"&gt;&lt;/script&gt;<br>
 * &lt;script type="text/javascript" src="ovoid/ovoid.config.js"&gt;&lt;/script&gt;<br>
 * </blockcode>
 * <br>
 * <br>
 * Note that the ovoid.config.js file is loaded after the main library file. 
 * This is because the globals options variables must be overrided.
 * You should also include a space for some inline javascript code by appending 
 * the following lines:
 * <br><br>
 * <blockcode>
 * &lt;script type="text/javascript"&gt;<br>
 * &nbsp;&nbsp;<codecomment>// Your inline javascript here</codecomment><br>
 * &lt;/script&gt;<br>
 * </blockcode>
 * <br>
 * <li><b>HTML5's Canvas for WebGL</b></li>
 * <br>
 * <br>
 * WebGL use the &ltcanvas&gt; element. The Canvas element can be added in your 
 * web page by adding the following line in the body tag part of your HTML:
 * <br>
 * <br>
 * <blockcode>
 * &lt;canvas <b>id="mycanvas"</b> width=800 height=600 style="border:0;"/&gt;<br>
 * </blockcode>
 * <br>
 * <br>
 * Note that the canvas's id will be usefull later.
 * <br>
 * <br>
 * <li><b>The three fundamental functions</b></li>
 * <br>
 * <br>
 * As you'll see later, Ovoid uses two overridable functions to let you 
 * express your creativity : <code>Ovoid.onload</code> and 
 * <code>Ovoid.onloop</code>. You also need any main function for launching the 
 * whole thing. So, you can add this piece of code in your inline javascript
 * dedicated space:
 * <br>
 * <br>
 * <blockcode>
 * Ovoid.onload = function {<br>
 * &nbsp;&nbsp;<codecomment>// Your futur onload code here</codecomment><br>
 * }<br>
 * <br>
 * Ovoid.onloop = function {<br>
 * &nbsp;&nbsp;<codecomment>// Your futur onloop code here</codecomment><br>
 * }<br>
 * <br>
 * function main {<br>
 * &nbsp;&nbsp;<codecomment>// Your start code here</codecomment><br>
 * }<br>
 * </blockcode>
 * <br>
 * <br>
 * Finaly you should add an "onload" trigger in your body HTML tag to 
 * automaticaly launch the <code>main()</code> function at page loading:
 * <br>
 * <br>
 * <blockcode>
 * &lt;body style="margin:0px;" <b>onload="main();"</b>&gt;<br>
 * </blockcode>
 * </ul>
 * <br>
 * <br>
 * <b><big>HELLO WORLD</big></b>
 * <br>
 * <br>
 * Before any explanation, a piece of code:
 * <br>
 * <br>
 *  <blockcode>
 * <codecomment>// Create a new scene object</codecomment><br>
 * var scene = new Ovoid.Scene("HelloWorld");<br>
 * <codecomment>// Our future nodes's references</codecomment><br>
 * var mesh, body, light;<br>
 * <br>
 * <codecomment>// Define the Ovoid.onload function</codecomment><br>
 * Ovoid.onload = function() {<br>
 * &nbsp;&nbsp;<codecomment>// Create a new Mesh node</codecomment><br>
 * &nbsp;&nbsp;mesh = scene.create(Ovoid.MESH, "HelloBoxShape");<br>
 * &nbsp;&nbsp;<codecomment>// Generate a debugging box mesh</codecomment><br>
 * &nbsp;&nbsp;mesh.genDebugBox(0, 1.0, 1);<br>
 * &nbsp;&nbsp;<codecomment>// Create GL buffers for this mesh</codecomment><br>
 * &nbsp;&nbsp;mesh.createBuffers(Ovoid.VERTEX_VEC4_P|Ovoid.VERTEX_VEC3_N, Ovoid.BUFFER_STATIC);<br>
 * &nbsp;&nbsp;<br>
 * &nbsp;&nbsp;<codecomment>// Create a new empty Body node</codecomment><br>
 * &nbsp;&nbsp;body = scene.create(Ovoid.BODY, "HelloBox");<br>
 * &nbsp;&nbsp;<codecomment>// Set mesh as Body's shape</codecomment><br>
 * &nbsp;&nbsp;body.setShape(mesh);<br>
 * &nbsp;&nbsp;<br>
 * &nbsp;&nbsp;<codecomment>// Create a new Light node</codecomment><br>
 * &nbsp;&nbsp;light = scene.create(Ovoid.LIGHT, "HelloLight");<br>
 * &nbsp;&nbsp;<codecomment>// Move our light from world's origin</codecomment><br>
 * &nbsp;&nbsp;light.moveXyz(1.0,1.0,1.0);<br>
 * &nbsp;&nbsp;<br>
 * &nbsp;&nbsp;<codecomment>// Use our scene to draw</codecomment><br>
 * &nbsp;&nbsp;Ovoid.useScene(scene);<br>
 * };<br>
 * <br>
 * <codecomment>// Define the Ovoid.onloop function </codecomment><br>
 * Ovoid.onloop = function() {<br>
 * &nbsp;&nbsp;<codecomment>// Rotate our box a little bit each frame</codecomment> <br>
 * &nbsp;&nbsp;body.rotateXyz(0.01, 0.02, 0.03);<br>
 * };<br>
 * <br>
 * function main() {<br>
 * &nbsp;&nbsp;<codecomment>// Start OvoiD.JS Library on the given canvas.</codecomment><br>
 * &nbsp;&nbsp;Ovoid.start("mycanvas");<br>
 * };<br>
 * </blockcode>
 * <br>
 * <br>
 * At this stage, some people probably think something like "Are you kidding 
 * me !? What an horribly complex monster program to just display a poor 
 * rotating green box !!"
 * <br>
 * <br>
 * There are two answers, one bad and one good. The bad one is:
 * <br> 
 * You can't imagine the horribly complex things that the library is doing in 
 * the background, to just pops a rotating green box from nowhere with five 
 * lines. 
 * <br>
 * <br>
 * The good answer is:
 * <br> 
 * Most of things described here, are in fact automatically done during the 
 * "normal" preloading and importation process of a Collada or Ojson scene file. 
 * The above code is paradoxically allready a "average level" programming.
 * <br>
 * <br>
 * Now the detailed explanations of what we done above. 
 * <ul>
 * <li><b>Create a Scene node</b></li>
 * <br>
 * <br>
 * First of all we creates a new Scene object named "HelloWorld" that will be 
 * used to store our nodes and we declares three variables for our futures 
 * nodes objects.
 * <br>
 * <br>
 * <blockcode>
 * &nbsp;&nbsp;var scene = new Ovoid.Scene("HelloWorld");<br>
 * &nbsp;&nbsp;var mesh, body, light;<br>
 * </blockcode>
 * <br>
 * <br>
 * (Note that the scene name does not realy matter and is optional. The scene 
 * name is more cosmetic or for not yet implemented features.)
 * <br>
 * <br>
 * <li><b>Override <code>Ovoid.onload</code> function</b></li>
 * <br>
 * <br>
 * After that we overrides the <code>Ovoid.onload</code> function. The 
 * <code>Ovoid.onload</code> function is called just after the library's 
 * initialization and is called only once at the begining.
 * <br>
 * <br>
 * In the <code>Ovoid.onload</code> function we first create a new Mesh node 
 * called "HelloBoxShape" by calling the <code>create</code> method of the 
 * Scene object.
 * <br>
 * <br>
 * <blockcode>
 * Ovoid.onload = function() {<br>
 * &nbsp;&nbsp;mesh = scene.create(Ovoid.MESH, "HelloBoxShape");<br>
 * </blockcode>
 * <br><br>Then we generate a debuggin box mesh structure by calling the 
 * <code>genDebugBox</code> method.
 * <br><br>
 * <blockcode>
 * &nbsp;&nbsp;mesh.genDebugBox(0, 1.0, 1);<br>
 * </blockcode>
 * <br><br>Finaly we create the OpenGL Vertex Buffer Objects (VBO) by calling the 
 * <code>createBuffers</code> method. 
 * <br><br>
 * <blockcode>
 * &nbsp;&nbsp;mesh.createBuffers(Ovoid.VERTEX_VEC4_P|Ovoid.VERTEX_VEC3_N, 
 * Ovoid.BUFFER_STATIC);<br><br>
 * </blockcode>
 * <br>
 * <br>
 * <li><b>Body node and shape concept</b></li>
 * <br>
 * <br>
 * Our box's mesh is now ready to be drawn but is NOT yet renderable. In fact 
 * Mesh objects are "abstract" and are not in the "world". To display  our box, 
 * we need to create a Body node that will be in the world and "attach" the 
 * Mesh node to this Body.
 * <br>
 * <br>
 * To make the concept more understandable, think that Body nodes are like 
 * invisible spirits without shape floating in the world . To make a visible 
 * spirit, you have to give it a shape. You now guess that you can attach the 
 * same Shape node to several Body nodes at the same time. The Body node is 
 * inherited from Transform node, and so is transformable (move, rotate, 
 * scale...). Shape nodes, like Mesh node, are NOT.
 * <br>
 * <br>
 * <blockcode>
 * &nbsp;&nbsp;body = scene.create(Ovoid.BODY, "HelloBox");<br>
 * &nbsp;&nbsp;body.setShape(mesh);<br>
 * </blockcode>
 * <br>
 * <br>
 * Because we like to see our box's colour, we need to add a light source 
 * in our scene.We do it by creating a Light node, in the same way as we created 
 * the Mesh and Body node. Then because the Light node is created at the world's 
 * origin, we move the light.
 * <br>
 * <br>
 * <blockcode>
 * &nbsp;&nbsp;light = scene.create(Ovoid.LIGHT, "HelloLight");<br>
 * &nbsp;&nbsp;light.moveXyz(1.0,1.0,1.0);<br>
 * </blockcode>
 * <br>
 * <br>
 * We finally sets our scene as active theater, and it is finished for our 
 * <code>Ovoid.onload</code> function.
 * <br><br>
 * <blockcode>
 * &nbsp;&nbsp;Ovoid.useScene(scene);<br>
 * </blockcode>
 * <br>
 * <li><b>Override <code>Ovoid.onloop</code> function</b></li>
 * <br>
 * <br>
 * Now, we overrides the <code>Ovoid.onloop</code> function. The 
 * <code>Ovoid.onloop</code> function is called at EACH frame's refresh. 
 * So it's recomended to include code carefully to prevent performance issues 
 * or strange behaviors. For stupid exemple, don't create a new node in this 
 * function without conditions: this would (depending the frame rate) create 
 * more or less 60 new nodes per seconds.
 * <br>
 * <br>
 * For this moment, we only apply a small relative rotation on the Body node to 
 * make a rotating box.
 * <br>
 * <br>
 * <blockcode>
 * Ovoid.onloop = function() {<br>
 * &nbsp;&nbsp;body.rotateXyz(0.01, 0.02, 0.03);<br>
 * };<br>
 * </blockcode>
 * <br>
 * <li><b>Main start function</b></li>
 * <br>
 * <br>
 * The final step is to create a start function that will launch library's 
 * initialization function at page load. The main initialization function 
 * is <code>Ovoid.init</code> and takes an HTML5 Canvas id as argument.
 * <br>
 * <br>
 * <blockcode>
 * function main() {<br>
 * &nbsp;&nbsp;Ovoid.init("mycanvas");<br>
 * };<br>
 * </blockcode>
 * </ul>
 * <br>
 * <br>
 * <b><big>BASIC SETTINGS</big></b>
 * <br>
 * <br>
 * <ul>
 * <li><b>Frame Modes</b></li>
 * As you can see in the example, even if the canvas size is defined in HTML, 
 * it appear at full window size. This is Because the library overrides the 
 * canvas size parameter. If you want to keep your size setting you have to 
 * set the <code>Ovoid.Frame.opt_frameMode</code> option to 
 * <code>Ovoid.FRAME_FIXED_SIZE</code>. See the <code>Ovoid.Frame</code> 
 * documentation page for more details.
 * <br>
 * <br>
 * <li><b>HUD And Debug Frame</b></li>
 * The information bar that appear at the top of client frame is the head-up 
 * display. You can hide it by setting the <code>Ovoid.opt_showHud</code> 
 * option to false. when the head-up display is enabled, you also can show 
 * the debug frame by setting the <code>Ovoid.opt_showDebug</code> to true. 
 * </ul>
 * <br>
 * <br>
 * <small>
 * <b>SOFTWARE LICENCE</b>
 * <br>
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * <br>
 * <br>
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * <br>
 * <br>
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <a href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</a>.
 * <br>
 * <br>
 * <b>FOOT NOTES</b>
 * <br>
 * What means Ovoid ? The meaning of Ovoid is in fact a very long 
 * history. First of all, Ovoid is in two parts, O and void. The O refers to 
 * the word Omeyocan. Omeyocan is the god's main living place in Aztec 
 * mythology, that mean "Two place", or "Duality joint place". The O can also 
 * refers to the ouroboros cycle. The void refers to the C/C++ void* pointer 
 * that can be interpreted as "because it is void, that can be EVERYTHING", so, 
 * a manner to speak about the energy of the void. And now, you ask yourself 
 * "What is the rapport between THIS and an javascript WebGL library ?!". The 
 * answer is : What you want !
 * </small>
 */
var Ovoid = {};


/** full log string */
Ovoid._log = '';


/** log error count. */
Ovoid._lerror = 0;


/** log fatal. */
Ovoid._lfatal = false;


/** log warning count. */
Ovoid._lwarning = 0;


/** The latest WebGL error code */
Ovoid._glerror = 0;


/** Environment option.
 * Log verbosity level.
 * 
 * <br><br>Verbosity level correspond to log severity level, and are the following:
 * 0:Fatal error,
 * 1:Error,
 * 2:Warning,
 * 3:Comment 
 * 
 * <br><br>For example a value of 0 will log fatal errors only and a value of 3 will
 * log all of fatal errors, errors, warnings and comments. 
 * 
 * <br><br>Global Options are modifiables by definition, so for convenience, 
 * all of them are gathered in the ovoid.config.js file to allow you to do it.
 * @see <a href="/symbols/src/ovoid.config.js.html">ovoid.config.js</a>.
 */
Ovoid.opt_logLevel = 2;


/** Display a global error.
 * <br>
 * <br>
 * This function stop the main application loop and display an anxiogenic 
 * error message on the window. This function is used to display internal 
 * library's errors and can be used to display custom error with the 
 * appropriate error code.
 *
 * @param {int} code Error code. The error codes are the following ones:<br> 
 * 1: Non-compatible Web Browser, <br>
 * 2: WebGL Context Exception,<br>
 * 3: WebGL Context Not Found,<br>
 * 4: Initialization Failled,<br>
 * 5: Preloading Error,<br>
 * 6: Errors Flood,<br>
 * 7: On loop runtime error,<br>
 * 8: On load runtime error<br>
 * 
 * @param {string} message The error message string.
*/
Ovoid.error = function(code, message) {

  var canvas;
  /* Retrouve le canvas pour le reduire a taille minimum */
  var canvas_list = document.getElementsByTagName('canvas');
  if (canvas_list.length) {
    var canvas = canvas_list[0];
    canvas.style.width = "1px";
    canvas.style.height = "1px";
    canvas.width = 1;
    canvas.height = 1;
  }
  
  /* compose le contenu html */
  var content = '<div style="text-align:center;font-family:sans-serif;margin:20px;border-radius:16px;background-color:#343434;color:#fa0;padding:20px;">';
  content += '<h1><b><big>OvoiD.JS Error X(</big></b></h1><span style="color:#ddd;">';

  var comment = "<p>Sorry, the page you requested uses the <i>OvoiD.JS's WebGL Wrapper</i> and the library's script has stopped ";
  var browser = '</p><p>We recommands you to use the latest version of one of the followings:</p><table cellpadding=10px style="border:0;margin:auto;text-align:center;"><tr><td><a style="color:#fa0;" href="http://www.google.com/chrome/">Chrome<a></td><td><a style="color:#fa0;" href="http://www.mozilla.org/firefox/">Firefox<a></div></td></tr><tr><td><a style="color:#fa0;" href="http://www.opera.com/browser/">Opera</a></td><td><a style="color:#fa0;" href="http://www.apple.com/safari/">Safari<a></td></tr></table>';
  var dcode = '';
  
  switch(code)
  {
    case 1:
      dcode += "01 - Non-compatible Web Browser";
      comment += 'because your browser seems to be outdated or rudimentary and does not provide some essentials fonctionnalities.';
      comment += browser;
      break;
    case 2:
      dcode += "02 - WebGL Context Exception";
      comment += 'because an exception occured during the <b><a style="color:#fa0;" href="http://www.khronos.org/webgl/">WebGL<a></b> context creation. This error may be caused by not properly installed or outdated graphic drivers.';
      break;
    case 3:
      dcode += "03 - WebGL Context Not Found";
      comment += 'because no suitable <b><a style="color:#fa0;" href="http://www.khronos.org/webgl/">WebGL<a></b> implementation was found. You probably use an incompatible or outdated browser.';
      comment += browser;
      break;
    case 4:
      dcode += "04 - Initialization Failled";
      comment += "because it failed to initialize its own base components. This error may be caused by one or more global classes which encountered errors.";
      break;
    case 5:
      dcode += "05 - Preloading Error";
      comment += "because an error occurend during the data preloading process. This error may be caused by corruped loaded data or importation classes's exceptions.";
      break;
    case 6:
      dcode += "06 - Errors Flood";
      comment += "because of too many errors was reported. This error is raised when too many errors was encountered, this generaly means that something goes really wrong.";
      break;
    case 7:
      dcode += "07 - On Loop Runtime Error";
      comment += "because an exception occured during the main runtime onloop process. This error may be caused by an exception thrown within the main client program loop method (Ovoid.onloop()).";
      break;
    case 8:
      dcode += "08 - On Load Runtime Error";
      comment += "because an exception occured during the main runtime onload process. This error may be caused by an exception thrown within the main client program load method (Ovoid.onload()).";
      break;
    default:
      dcode += code + " - Unknown or custom Error";
      comment += "Unknown or custom exception thrown.";
      break;
  }

  content += "<h2><b>" + dcode + "</b></h2>";
  content += comment + '<hr>';
  content += "</p><small>If you currently are developing an application using <i>OvoiD.JS's WebGL Wrapper</i> and think this error should not occur and/or is a library's issue, you can send a bug repport with the bellow error message and comments at:<br> <b>root (@) ovoid.org</b><br><br>";
  content += 'You also can consult the OvoiD.JS reference documentation at: <br> <a style="color:#fa0;" href="http://www.ovoid.org/js/doc/">http://www.ovoid.org/js/doc/</a></small><p>';
  content += '<div style="text-align:left;padding:10px;border-radius:8px;background-color:#eee;color:#000;font-family:courier,monospace;font-size:10pt;margin:0px;">';
  content += '- Message - <br><span style="color:#a00">' + dcode + " :: " + message + '</span><br>';
  content += '- last log/backtrace -<br>';
  var logs = Ovoid._log.replace(/\n/g, '<br>');
  logs = logs.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  content += '<span style="color:#00a">' + logs;
  content += '</div></div>';
  document.write(content);

};

/* Les très TRES vielles versions ne connaissant pas l'objet console... */
if(typeof(console) == "undefined") {

  Ovoid.error(1, "console object unavailable (update your browser !)");
}

/**
 * Write a message in log string.
 * <br>
 * <br>
 * This function allow to write a preformated error, warning or information 
 * message in the log string and the javascript's console. This function is 
 * used to write library's internal log messages and can be used to write 
 * custom logs. The submited message can be effectively written or not 
 * depending on the current log level setting. For more informations see 
 * the <code>Ovoid.opt_logLevel</code> option details.
 * <br>
 * <br>
 * The written line is preformated as follow:
 * <br>
 * <br>
 * <blockcode>
 * [hh:mm:ss] LEVEL: scope :: message. <br>
 * </blockcode>
 * <br>
 * <br>
 * Note that log isn't  written in a file, but in string. You can get the log 
 * string content at any time using the <code>Ovoid.getLog</code> function.
 * 
 * @see Ovoid.getLog
 * @see Ovoid.opt_logLevel
 * 
 * @param {int} level Log severity/verbosity level. Log levels are the following 
 * ones:<br>
 * 0: FATAL,<br>
 * 1: ERROR,<br>
 * 2: WARNING,<br>
 * 3: NOTICE<br>
 * 
 * @param {string} scope Log scope. commonly the class or function from 
 * where the log is written.
 *
 * @param {string} message Details of the log message.
*/
Ovoid.log = function(level, scope, message) {

  if (message)
  {
    if (level <= Ovoid.opt_logLevel)
    {
      var log;
      var time = new Date();
      var timestamp = '[' + time.getHours() +
              ':' + time.getMinutes() +
              ':' + time.getSeconds() + '] ';

      switch (level)
      {
        case 0:
          log = timestamp + 'FATAL: ' + scope +
                  ':: ' + message + '\n';

          Ovoid._lerror++;
          Ovoid._lfatal = true;
          break;
        case 1:
          log = timestamp + 'ERROR: ' + scope +
                  ':: ' + message + '\n';

          this._lerror++;
          break;
        case 2:
          log = timestamp + 'WARNING: ' + scope +
                  ':: ' + message + '\n';

          Ovoid._lwarning++;
          break;
        case 3:
          log = timestamp + 'NOTICE: ' + scope +
                  ':: ' + message + '\n';
          break;
      }
      
      Ovoid._log = log + Ovoid._log;
      console.log(log);
      if (Ovoid._lerror > 10) {
        Ovoid.error(6, "No more, 10 errors, it's enought !");
      }

    }
  }
};


/* Preliminary incompatible browser detection */
if (typeof(Float32Array) == "undefined" || typeof(Uint16Array) == "undefined") {
  Ovoid.log(0, "Ovoid", 'Undefined Float32Array/Uint16Array objects.');
  Ovoid.error(1, "ArrayBuffer objects unavailable");
}
