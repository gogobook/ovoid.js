/** OvoiD.JS - Built-in fragment shader - AERDS_FULLTEX_1L
 * 
 * Main fragment shader for per-pixel lighting full textured channels amibient,
 * emissive, reflexion, diffuse, specular with multiple lights.
 */
precision highp float;
uniform bool ENd;
uniform bool ENa;
uniform vec4 Ep;
uniform vec4 Ac;
uniform vec4 Lp; 
uniform vec3 Ld;
uniform vec4 Lc;
uniform float Li;
uniform float Lr;
uniform float Lf;
uniform float La;
uniform vec4 Md;
uniform vec4 Ma;
uniform vec4 Ms;
uniform vec4 Me;
uniform vec4 Mr;
uniform float Mi;
uniform float My;
uniform float Mo;
uniform sampler2D Sa;
uniform sampler2D Sd;
uniform sampler2D Ss;
uniform sampler2D Se;
uniform sampler2D Sr;
varying vec4 Vp;
varying vec3 Vn;
varying vec2 Vu;

float LT, Fw, Dw, Sw;
vec3 EV, R, LV;
vec2 Ru;
	
void main(void)
{	
  if(ENa) {
    gl_FragColor=(Ma*Md*texture2D(Sd,Vu))*Ac;
    gl_FragColor+=(Me*texture2D(Se,Vu));
    if(My!=0.0) {
      EV=normalize(Ep-Vp).xyz;
      R=normalize(reflect(EV,Vn));
      Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;
      gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;
    }
  }
  if(ENd) {
    LV=normalize(Lp-Vp).xyz;
    LT=max(dot(Vn,LV),0.0);
    Fw=clamp((-dot(LV,Ld)-(cos(La)))/(Lf),0.0,1.0);
    Dw=LT*Li*Fw;
    R=normalize(reflect(-LV,Vn));
    Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;
    gl_FragColor+=(Md*texture2D(Sd,Vu))*((Lc*Li)*Dw);
    gl_FragColor+=(Ms*texture2D(Ss,Vu))*((Lc*Li)*Sw);
  }
	gl_FragColor.a = Mo;
}
