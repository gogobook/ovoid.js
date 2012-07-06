
attribute vec4 	p; 		/* position */
attribute vec3 	u; 		/* texcoord */

uniform vec3 Ls;		/* layer size */
uniform mat4 MXF; 		/* layout matrix */
uniform mat4 MEV; 		/* ortho matrix */

varying vec2 	Vu;

vec4 Vp;

void main(void) {

	Vp = p;
	Vp.x *= Ls.x;
	Vp.y *= Ls.y;

	Vu = u.xy;

	gl_Position = MEV * MXF * Vp; 
}
