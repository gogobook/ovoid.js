/** OvoiD.JS - Built-in vertex shader - PC
 *
 * Main vertex shader for colored vertex.
 */
attribute vec4 p;
attribute vec4 c;
uniform mat4 MEV;
uniform mat4 MXF;
varying vec4 Vc;

void main(void) {
	Vc = c;
	gl_Position = MEV * (MXF * p);
}
