precision highp float;

uniform vec4 C; 		    /* color */
uniform sampler2D Sd; 	/* fontmap checker texture sampler */

/* varying fragment shader */
varying vec4 Vp;
varying vec2 Vu;
varying vec4 Vc;

void main(void) {
  gl_FragColor.rgb = texture2D(Sd, gl_PointCoord).rgb * Vc.rgb;
  gl_FragColor.a = Vc.a;
}

