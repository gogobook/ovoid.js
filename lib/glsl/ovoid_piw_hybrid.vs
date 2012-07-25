/** OvoiD.JS - Built-in vertex shader - PIW_HYBRID
 * 
 * Main vertex shader for per-pixel lighting with Mesh or Skin deform mode 
 * choosed through boolean uniform value.
 */
#define MA 24
attribute vec4 p;
attribute vec4 i;
attribute vec4 w;
uniform bool ENw;
uniform mat4 MEV;
uniform mat4 MXF[MA];
vec4 Vp;

void main(void){
  if(ENw) {
    Vp=vec4(0.0,0.0,0.0,0.0);
    Vp+=(MXF[int(i.x)]*p)*w.x;
    Vp+=(MXF[int(i.y)]*p)*w.y;
    Vp+=(MXF[int(i.z)]*p)*w.z;
    Vp+=(MXF[int(i.w)]*p)*w.w;
  } else {
    Vp=MXF[0]*p;
  }
  gl_Position=MEV*Vp;
}
