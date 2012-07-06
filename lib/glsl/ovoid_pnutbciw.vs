/* Position Normal Uv / Standard transform / Skin */

#define MATRIX_ARRAY_SIZE 48

/* vertex attributes */
attribute vec4 p;
attribute vec3 n;
attribute vec3 u;
attribute vec3 t;
attribute vec3 b;
attribute vec4 c;
attribute vec4 i;
attribute vec4 w;

/* enable vertex weight */
uniform bool ENw;

/* enable comput tangent */
uniform bool ENt;

/* eye view matrix */
uniform mat4 MEV;

/* xform matrices */
uniform mat4 MXF[MATRIX_ARRAY_SIZE];

/* xform normal matrices */
uniform mat3 MNR[MATRIX_ARRAY_SIZE];

/* varying fragment shader */
varying vec4 Vp;
varying vec3 Vn;
varying vec2 Vu;
varying vec3 Vt;
varying vec3 Vb;
varying vec4 Vc;

void main(void) {

	/* Position et Normal transform */
	if(ENw) { /* enable vertex weight */

		Vp = vec4(0.0, 0.0, 0.0, 0.0);
		Vn = vec3(0.0, 0.0, 0.0);
		
		Vp += (MXF[int(i.x)] * p) * w.x;
		Vn += (MNR[int(i.x)] * n) * w.x;
		
		Vp += (MXF[int(i.y)] * p) * w.y;
		Vn += (MNR[int(i.y)] * n) * w.y;
		
		Vp += (MXF[int(i.z)] * p) * w.z;
		Vn += (MNR[int(i.z)] * n) * w.z;
		
		Vp += (MXF[int(i.w)] * p) * w.w;
		Vn += (MNR[int(i.w)] * n) * w.w;
    
	} else {
	
		Vp = MXF[0] * p;
		Vn = MNR[0] * n;
	}
	
	/* Tangent et Binormal transform */
	if(ENt) { /* enable comput tangent */
	
		vec3 Cz = cross(Vn, vec3(0.0, 0.0, 1.0));
		vec3 Cy = cross(Vn, vec3(0.0, 1.0, 0.0));
		
		if(length(Cz) > length(Cy)) {
			Vt = Cz;
		} else {
			Vt = Cy;
		}
		
		Vb = cross(Vn, Vt); 
		
	} else {
	
		Vt = t;
		Vb = b;
	}
	
	/* Texcoord et color */
	Vu = u.xy;
	Vc = c;
	gl_PointSize = u.z;
	gl_Position = MEV * Vp;
}
