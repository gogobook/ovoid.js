/* vertex attributes */
attribute vec4 p;
attribute vec3 u;
attribute vec4 c;

/* eye view matrix */
uniform mat4 MEV;

/* eye position */
uniform vec4 Ep;

/* xform matrices */
uniform mat4 MXF;

/* varying fragment shader */
varying vec4 Vp;
varying vec2 Vu;
varying vec4 Vc;

float d;

void main(void) {

  Vp = p;

  d = distance(p, Ep);

	/* Texcoord et color */
	Vu = u.xy;
	Vc = c;
	
  gl_PointSize = ((u.z * 10.0) / d);
	gl_Position = MEV * Vp;
}
