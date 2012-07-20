/** OvoiD.JS - Built-in vertex shader - P
 *
 * Main vertex shader for simplest vertex.
 */
attribute vec4 p;
uniform mat4 MXF;
uniform mat4 MEV;

void main(void) {
	gl_Position = MEV * MXF * p; 
}
