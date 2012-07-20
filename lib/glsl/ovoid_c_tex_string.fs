/** OvoiD.JS - Built-in fragment shader - C_TEX_STRING
 *
 * Main fragment for texture mapped font point-sprite
 */
precision highp float;

uniform vec4 C;
uniform sampler2D Sd;
varying float a;
vec2 Gu;

void main(void) {
	Gu.s = (gl_PointCoord.s * 0.0625) + (floor(mod(a, 16.0)) * 0.0625);
	Gu.t = (1.0 - (gl_PointCoord.t * 0.0625)) - (floor(a / 16.0) * 0.0625); /* flip Y */
  gl_FragColor = texture2D(Sd, Gu) * C;
}

