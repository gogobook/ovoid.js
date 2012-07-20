/** OvoiD.JS - Built-in vertex shader - PNUIW_HYBRID
 * 
 * Main vertex shader for per-pixel lighting with Mesh or Skin deform mode 
 * choosed through boolean uniform value.
 */
#define MA 32
attribute vec4 p;
attribute vec3 n;
attribute vec3 u;
attribute vec4 i;
attribute vec4 w;
uniform bool ENw;
uniform mat4 MEV;
uniform mat4 MXF[MA];
uniform mat3 MNR[MA];
varying vec4 Vp;
varying vec3 Vn;
varying vec2 Vu;

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
}
