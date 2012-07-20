/** OvoiD.JS - Built-in vertex shader - PU
 *
 * Main vertex shader for textured vertex.
 */
attribute vec4 	p;
attribute vec3 	u;
uniform mat4 MXF;
uniform mat4 MEV;
varying vec2 	Vu;

void main(void) {
	Vu = u.xy;
	gl_Position = MEV * MXF * p; 
}
