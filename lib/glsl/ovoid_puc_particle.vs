/** OvoiD.JS - Built-in vertex shader - PUC_PARTICLE
 *
 * Main vertex shader for point-sprite particle textured vertex-color
 */
attribute vec4 p;
attribute vec3 u;
attribute vec4 c;
uniform mat4 MEV;
uniform vec4 Ep;
varying vec4 Vc;

void main(void) {

  Vc = c;
  gl_PointSize = ((u.z * 10.0) / distance(p, Ep));
	gl_Position = MEV * p;
}
