/** OvoiD.JS - Built-in vertex shader - P_ZWSTRING
 *
 * Main vertex shader for texture mapped font z-sized point-sprite string
 */
attribute vec4 p;
uniform mat4 MXF;
uniform mat4 MEV;
varying float a;

void main(void) {
	a = p.w;
	gl_PointSize = p.z;
	gl_Position = MEV * MXF * vec4(p.xy, 0.0, 1.0);
}
