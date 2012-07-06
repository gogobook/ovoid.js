precision highp float;

uniform vec4 C; /* drawing color */
varying vec4 Vc;

void main(void)
{	
	gl_FragColor = Vc * C;
}
