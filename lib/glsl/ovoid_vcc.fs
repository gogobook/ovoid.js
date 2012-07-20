/** OvoiD.JS - Built-in fragment shader - VCC
 *
 * Main fragment shader for vertex-color flat color combined.
 */
precision highp float;
uniform vec4 C;
varying vec4 Vc;
void main(void)
{	
	gl_FragColor = Vc * C;
}
