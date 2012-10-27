/** OvoiD.JS - Built-in fragment shader - VC_TEX_BILLBOARD
 *
 * Main fragment shader for point-sprite particle textured vertex-color
 */
precision highp float;
uniform sampler2D Sd;
uniform vec4 C;
varying vec2 Vu;

void main(void) {
  gl_FragColor=texture2D(Sd, Vu)*C;
}

