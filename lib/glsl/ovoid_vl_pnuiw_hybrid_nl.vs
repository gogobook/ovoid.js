/** OvoiD.JS - Built-in vertex shader - VL_PNUIW_HYBRID_1P
 * 
 * Main vertex shader for per-vertex lighting with Mesh or Skin deform mode 
 * choosed through boolean uniform value.
 */
#define MA 16
#define ML 8
attribute vec4 p;
attribute vec3 n;
attribute vec3 u;
attribute vec4 i;
attribute vec4 w;
uniform bool ENw;
uniform mat4 MEV;
uniform mat4 MXF[MA];
uniform mat3 MNR[MA];

uniform vec4 Ep;
uniform vec4 Lp[ML]; 
uniform vec3 Ld[ML];
uniform vec4 Lc[ML];
uniform float Li[ML];
uniform float Lr[ML];
uniform float Lf[ML];
uniform float La[ML];
uniform bool Le[ML];
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
  
  EV=normalize(Ep-Vp).xyz;
  
  for(int i = 0; i < ML; i++) {
    if(Le[i]) {
      if(Lp[i].w==1.0){
        LV=normalize(Lp[i]-Vp).xyz;
        LT=max(dot(Vn,LV),0.0);
        Fw=clamp((-dot(LV,Ld[i])-(cos(La[i])))/(Lf[i]), 0.0, 1.0);
      }else{
        LV=Ld[i];
        LT=max(dot(Vn,LV),0.0);
        Fw=1.0;
      }
      Cd+=(Lc[i]*Li[i]*LT)*Fw;
      R=normalize(reflect(-LV,Vn));
      Cs+=Lc[i]*Li[i]*(pow(max(dot(R,EV),0.0),Mi))*Fw;
    }
  }
}
