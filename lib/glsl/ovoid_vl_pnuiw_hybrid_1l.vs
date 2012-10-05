/** OvoiD.JS - Built-in vertex shader - VL_PNUIW_HYBRID_LP
 *
 * Main vertex shader for per-vertex lighting with Mesh or Skin deform mode 
 * choosed through boolean uniform value.
 */
#define MA 32
attribute vec4 p;
attribute vec3 n;
attribute vec3 u;
attribute vec4 i;
attribute vec4 w;
uniform bool ENd; /* enable diffuse shading */
uniform bool ENw;
uniform mat4 MEV;
uniform mat4 MXF[MA];
uniform mat3 MNR[MA];

uniform vec4 Ep;
uniform vec4 Lp; 
uniform vec3 Ld;
uniform vec4 Lc;
uniform float Li;
uniform float Lr;
uniform float Lf;
uniform float La;
uniform float My;
uniform float Mi;

varying vec4 Vp;
varying vec3 Vn;
varying vec2 Vu;
varying vec4 Cd;
varying vec4 Cs;

vec3 LV, R, EV;
float LT, Fw;

void main(void){
  if(ENw) {
    Vp=vec4(0.0,0.0,0.0,0.0);
    Vn=vec3(0.0,0.0,0.0);
    Vp+=(MXF[int(i.x)]*p)*w.x;
    Vn+=(MNR[int(i.x)]*n)*w.x;
    Vp+=(MXF[int(i.y)]*p)*w.y;
    Vn+=(MNR[int(i.y)]*n)*w.y;
    Vp+=(MXF[int(i.z)]*p)*w.z;
    Vn+=(MNR[int(i.z)]*n)*w.z;
    Vp+=(MXF[int(i.w)]*p)*w.w;
    Vn+=(MNR[int(i.w)]*n)*w.w;
  } else {
    Vp=MXF[0]*p;
    Vn=MNR[0]*n;
  }
  Vu=u.xy;
  gl_Position=MEV*Vp;
  
  Cd=vec4(0.0,0.0,0.0,0.0);
  Cs=vec4(0.0,0.0,0.0,0.0);
  
  if(ENd) {
    EV=normalize(Ep-Vp).xyz;
    if(Lp.w==1.0){
      LV=normalize(Lp-Vp).xyz;
      LT=max(dot(Vn,LV),0.0);
      Fw=clamp((-dot(LV,Ld)-(cos(La)))/(Lf), 0.0, 1.0);
    }else{
      LV=Ld;
      LT=max(dot(Vn,LV),0.0);
      Fw=1.0;
    }
    Cd+=(Lc*Li*LT)*Fw;
    R=normalize(reflect(-LV,Vn));
    Cs+=Lc*Li*(pow(max(dot(R,EV),0.0),Mi))*Fw;
  }
}
