precision highp float;

uniform vec4 C; 		/* color */
uniform vec3 Es;		/* screen size */

uniform sampler2D Sd; 	/* fontmap checker texture sampler */

varying vec2 	Vu;

void main(void) {

	gl_FragColor = texture2D(Sd, Vu) * C;
}

