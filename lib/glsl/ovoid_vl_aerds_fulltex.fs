/** OvoiD.JS - Built-in fragment shader - VL_AERDS_FULLTEX
 * 
 * Main fragment shader for per-vertex lighting full textured channels amibient,
 * emissive, reflexion, diffuse, specular with multiple lights.
 */
precision highp float;

uniform vec4 Ac;
uniform sampler2D Sd;
uniform sampler2D Ss;
uniform sampler2D Se;
uniform sampler2D Sr;
uniform vec4 Ep;
uniform bool ENa; /* enable ambient/env shading */
uniform bool ENd; /* enable ambient/env shading */
uniform vec4 Md;
uniform vec4 Ma;
uniform vec4 Ms;
uniform vec4 Me;
uniform vec4 Mr;
uniform float My;
uniform float Mo;

varying vec2 Vu;
varying vec4 Cd;
varying vec4 Cs;
varying vec3 Vn;
varying vec4 Vp;

vec3 R, EV;
vec2 Ru;

void main(void)
{	
  gl_FragColor=vec4(0.0,0.0,0.0,0.0);
  if(ENa) {
    gl_FragColor=(Md*Ma*texture2D(Sd,Vu))*Ac;
    gl_FragColor+=texture2D(Se,Vu)*Me;
    if(My!=0.0) {
      EV=normalize(Ep-Vp).xyz;
      R=normalize(reflect(EV,Vn));
      Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;
      gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;
    }
  }
  if(ENd) {
    gl_FragColor+=(Md*texture2D(Sd,Vu))*Cd;
    gl_FragColor+=(Ms*texture2D(Ss,Vu))*Cs;
  }
	gl_FragColor.a = Mo;
}
