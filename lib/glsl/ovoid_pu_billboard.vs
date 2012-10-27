/** OvoiD.JS - Built-in vertex shader - PUC_BILLBOARD
 *
 * Main vertex shader for point-sprite particle textured vertex-color
 */
attribute vec4 p;
attribute vec3 u;
uniform mat4 MPJ;
uniform mat4 MLA;
uniform mat4 MXF;
uniform vec4 Ep;
varying vec2 Vu;

void main(void) {

  Vu = u.xy;
  gl_Position = MPJ * (MLA * vec4(0.0,0.0,0.0,1.0) + (MXF*p));
}
