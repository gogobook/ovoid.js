/** OvoiD.JS - Built-in fragment shader - C
 *
 * Main fragment shader for flat color.
 */
precision highp float;

uniform vec4 C;

void main(void) {

	gl_FragColor = C;
}

