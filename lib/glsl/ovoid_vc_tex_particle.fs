/** OvoiD.JS - Built-in fragment shader - VC_TEX_PARTICLE
 *
 * Main fragment shader for point-sprite particle textured vertex-color
 */
precision highp float;
uniform sampler2D Sd;
varying vec4 Vc;

void main(void) {
  gl_FragColor.rgb = texture2D(Sd, gl_PointCoord).rgb * Vc.rgb;
  gl_FragColor.a = Vc.a;
}

