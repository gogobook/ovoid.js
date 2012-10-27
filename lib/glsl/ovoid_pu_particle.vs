/** OvoiD.JS - Built-in vertex shader - PU_PARTICLE
 *
 * Main vertex shader for point-sprite particle textured vertex-color
 */
attribute vec4 p;
attribute vec3 u;
uniform mat4 MEV;
uniform vec4 Ep;

void main(void) {

  gl_PointSize = ((u.z * 640.0) / distance(p, Ep));
	gl_Position = MEV * p;
}
