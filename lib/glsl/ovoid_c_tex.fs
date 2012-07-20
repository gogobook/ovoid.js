/** OvoiD.JS - Built-in fragment shader - C_TEX
 *
 * Main fragment shader for textured flat color.
 */
precision highp float;

uniform vec4 C;
uniform sampler2D Sd;
varying vec2 Vu;

void main(void) {
	gl_FragColor = texture2D(Sd, Vu) * C;
}

