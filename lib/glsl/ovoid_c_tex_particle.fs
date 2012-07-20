/** OvoiD.JS - Built-in fragment shader - C_TEX_PARTICLE
 *
 * Main fragment shader for point-sprite particle textured flat color
 */
precision highp float;
uniform vec4 C;
uniform sampler2D Sd;

void main(void) {
  gl_FragColor.rgb = texture2D(Sd, gl_PointCoord).rgb * C.rgb;
  gl_FragColor.a = C.a;
}

