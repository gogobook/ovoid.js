precision highp float;

uniform bool ENa; /* enable ambient/env shading */
uniform bool ENd; /* enable diffuse shading */

uniform vec4 Ep; /* eye position */

uniform vec4 Ac; /* ambient lighting color */
uniform vec4 Lp;  /* light position */
uniform vec3 Ld;  /* light direction */
uniform vec4 Lc;  /* light color */
uniform float Li; /* light intensity */
uniform float Lr; /* light range */
uniform float Lf; /* light falloff */
uniform float La; /* light spot angle */
uniform bool Le;  /* light enabled */

uniform vec4 Md; /* material diffuse */
uniform vec4 Ma; /* material ambient */
uniform vec4 Ms; /* material specular */
uniform vec4 Me; /* material emissive */
uniform vec4 Mr; /* material reflection */
uniform float Mi; /* material shininess */
uniform float My; /* material reflectivity */
uniform float Mo; /* material opacity */

uniform sampler2D Sa; /* sampler ambient */
uniform sampler2D Sd; /* sampler diffuse */
uniform sampler2D Ss; /* sampler specular */
uniform sampler2D Se; /* sampler emissive */
uniform sampler2D Sr; /* sampler reflecion map */
uniform sampler2D Sn; /* sampler normal map */

varying vec4 Vp;
varying vec3 Vn;
varying vec2 Vu;
varying vec4 Vc;

float Fw, Dw, Sw;
vec3 EV, R, LV, N;
vec2 Ru;
	
void main(void)
{	

  gl_FragColor += Vc;

	EV = normalize(Ep - Vp).xyz;

	/** AMBIENT / ENVIRONEMENT LIGHTING **/
	if(ENa) { /* ambient shading enabled */
    /* ajoute l'ambient lighting */
    gl_FragColor += (Md * texture2D(Sd, Vu)) * Ac;
    
		/* ajoute le composant ambient */
		gl_FragColor += (Ma * texture2D(Sa, Vu));

		/* ajoute le composant emissive */
		gl_FragColor += (Me * texture2D(Se, Vu));

		/* calcul et ajoute le composant reflection */
		R = reflect(EV, Vn);
		R = normalize(R);
		Ru = (R.xy / (2.0 * ( 1.0 + abs(R.z) ))) + 0.5;
		gl_FragColor += (Mr * texture2D(Sr, Ru)) * My;
	}

	/** DIFFUSE / RAY LIGHTING **/
	if(ENd) { /* diffuse shading enabled */

		LV = normalize(Lp - Vp).xyz;

		/* calcul le falloff */
		Fw = clamp((-dot(LV, Ld) - (cos(La))) / (Lf), 0.0, 1.0);

		/* calcul la puissance diffuse  */
		Dw = max(dot(Vn, LV), 0.0) * Li * Fw;
		
		/* calcul et ajoute le composant diffuse */
		gl_FragColor += (Md * texture2D(Sd, Vu)) * ((Lc * Li) * Dw);

		/* calcul la puissance specular */
		R = -reflect(LV, Vn);
		R = normalize(R);
		Sw = (pow( max( dot( R, EV ), 0.0 ), Mi )) * Fw;
		
		/* calcul et ajoute le composant specular */
		gl_FragColor += (Ms * texture2D(Ss, Vu)) * ((Lc * Li) * Sw);
	}
	gl_FragColor.a = Mo;
}
