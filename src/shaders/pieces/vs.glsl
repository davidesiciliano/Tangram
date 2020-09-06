#version 300 es

in vec3 inPosition;
in vec3 inNormal;

uniform mat4 matrix;      //Perspective * View * World = Projection
uniform mat4 pMatrix;     //Contiene la World Matrix: serve per traslare/ruotare/scalare i pezzi
uniform mat4 nMatrix;     //World space -> inverse of the transpose of the world matrix
out vec3 fsNormal;
out vec3 fsPosition;

void main() {
//  if (selection == 7.0) {
    fsNormal = mat3(nMatrix) * inNormal;
    fsPosition = (pMatrix* vec4(inPosition, 1.0)).xyz;
    gl_Position = matrix * vec4(inPosition, 1.0);
//  } else {
//    gl_Position = matrix * vec4(0.2, 0.4, .4, 1.0);
//  }
}
