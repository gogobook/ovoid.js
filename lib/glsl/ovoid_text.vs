attribute vec4 	p; 		/* glyph informations */

uniform mat4 MXF; 		/* layout matrix */
uniform mat4 MEV; 		/* layout matrix */

varying float 	a; 		/* ASCII code */

void main(void) {
	a = p.w;
	gl_PointSize = p.z;
	gl_Position = MEV * MXF * vec4(p.xy, 0.0, 1.0);
}
