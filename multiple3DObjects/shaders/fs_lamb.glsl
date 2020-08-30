#version 300 es

precision mediump float;

in vec3 fsNormal;
out vec4 outColor;

uniform vec4 mDiffColor; //material diffuse color
uniform vec3 lightDirection; // directional light direction vec
uniform vec4 lightColor; //directional light color

void main() {

  vec3 nNormal = normalize(fsNormal);
  vec4 lambertColor = mDiffColor * lightColor * dot(-lightDirection,nNormal);
  outColor = clamp(lambertColor, 0.0, 1.0);
}