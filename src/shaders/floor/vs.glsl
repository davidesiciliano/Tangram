#version 300 es

in vec3 inPosition;
in vec3 inNormal;
in vec2 in_uv;

uniform mat4 matrix;      //Perspective * View * World = Projection
uniform mat4 pMatrix;     //Contiene la World Matrix: serve per traslare/ruotare/scalare i pezzi
uniform mat4 nMatrix;     //World space -> inverse of the transpose of the world matrix

out vec2 uvFS;
out vec3 fsNormal;
out vec3 fsPosition;

void main() {
    uvFS = in_uv;
    fsNormal = mat3(nMatrix) * inNormal;
    fsPosition = (pMatrix * vec4(inPosition, 1.0)).xyz;
    gl_Position = matrix * vec4(inPosition, 1.0);
}