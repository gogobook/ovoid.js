/** OvoiD.JS - Built-in fragment shader - LE_AERDS_1TEX
 * 
 * Fragment shader for per-vertex lighting one texture channel for 
 * low-end configuration.
 */
precision highp float;

uniform vec4 Ac;
uniform sampler2D Sd;
uniform bool ENa;
uniform bool ENd;
uniform vec4 Md;
uniform vec4 Ms;
uniform float Mo;
uniform vec4 Fc; /* Fog color */
uniform float Fd; /* Fog density */
varying vec2 Vu;
varying vec4 Cd;
varying vec4 Cs;
vec4 D;
float Fz, Ff;

void main(void)
{	
  gl_FragColor=vec4(0.0,0.0,0.0,0.0);
  D=Md*texture2D(Sd,Vu);
  if(ENa) gl_FragColor+=(D*Ac);
  if(ENd) {
    gl_FragColor+=(D*Cd)+(Ms*Cs);
    if(Fd>0.0) {
      Fz=gl_FragCoord.z/gl_FragCoord.w;
      Ff=clamp(exp2(-Fd*Fd*Fz*Fz*1.442695),0.0,1.0);
      gl_FragColor=mix(Fc,gl_FragColor,Ff);
    }
  }
  gl_FragColor.a=Mo;
}
