precision highp float;

uniform vec4 C; 		/* color */
uniform sampler2D Sd; 	/* fontmap checker texture sampler */

varying float 	a;  /* ASCII code */

vec2 Gu;

void main(void) {

	Gu.s = (gl_PointCoord.s * 0.0625) + (floor(mod(a, 16.0)) * 0.0625);
	Gu.t = (1.0 - (gl_PointCoord.t * 0.0625)) - (floor(a / 16.0) * 0.0625); /* flip Y */

  gl_FragColor = texture2D(Sd, Gu) * C;
}

