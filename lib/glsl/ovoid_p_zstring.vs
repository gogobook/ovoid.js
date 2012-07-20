/** OvoiD.JS - Built-in vertex shader - P_ZSTRING
 *
 * Main vertex shader for z-sized point-sprite string.
 */
attribute vec4 p;
uniform mat4 MXF;
uniform mat4 MEV;
uniform vec4 Ep;

void main(void) {
	gl_PointSize = p.z;
	gl_Position = MEV * MXF * vec4(p.xy, 0.0, 1.0);
}
