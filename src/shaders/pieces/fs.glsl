#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fsPosition;

uniform vec4 lightSwitch;

uniform vec4 materialColor;
uniform vec4 specularColor;

//Directional
uniform vec3 LADir;
uniform vec4 LACol;

//pointlight
uniform vec3 LBPos;
uniform vec4 LBCol;
uniform float LBDecay;
uniform float LBTarget;

//spotlight
uniform vec3 LCPos;
uniform vec4 LCCol;
uniform vec3 LCDir;
uniform float LCConeIn;
uniform float LCConeOut;
uniform float LCDecay;
uniform float LCTarget;

uniform float SpecShine;

uniform float selection;
uniform float index;

out vec4 outColor;

vec4 diffuseLambert(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec4 diffColor) {
  vec4 diff = diffColor * lightCol * max(dot(normalVec, lightDir),0.0);
  return diff;
}

vec4 specularPhong(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec3 eyedirVec) {
  vec3 reflection = -reflect(lightDir, normalVec);
  vec4 spec = specularColor * lightCol * pow(clamp(dot(reflection, eyedirVec), 0.0, 1.0), SpecShine);
  return spec;
}

void main() {



  vec3 nNormal = normalize(fsNormal);
  vec3 nEyeDirection = normalize ((0.0, 0.0, 0.0) - fsPosition);

  //Directional light
  vec3 lightDirA = LADir;
  vec4 lightColA = LACol;

  // Single point light with decay
  vec3 lightPosB = LBPos;
  vec3 lightDirB = normalize(lightPosB - fsPosition);
  vec4 lightColB = LBCol * pow((LBTarget/length(lightPosB - fsPosition)), LCDecay);

  // Spotlight
  vec3 lightPosC = LCPos;
  vec3 lightDirC = normalize(lightPosC - fsPosition);

  vec4 lightColC = LCCol*pow((LCTarget/length(lightPosC - fsPosition)), LCDecay) * clamp((dot(normalize(lightPosC - fsPosition), LCDir) - cos(radians(LCConeOut/2.0))) / (cos(radians(LCConeIn/2.0)) - cos(radians(LCConeOut/2.0))), 0.0, 1.0);

  vec4 LADiffuse = diffuseLambert(lightDirA, lightColA, nNormal, materialColor);
  vec4 LBDiffuse = diffuseLambert(lightDirB, lightColB, nNormal, materialColor);
  vec4 LCDiffuse = diffuseLambert(lightDirC, lightColC, nNormal, materialColor);

  vec4 LASpecular = specularPhong(lightDirA, lightColA, nNormal, nEyeDirection);
  vec4 LBSpecular = specularPhong(lightDirB, lightColB, nNormal, nEyeDirection);
  vec4 LCSpecular = specularPhong(lightDirC, lightColC, nNormal, nEyeDirection);


  vec4 diffuse = LADiffuse * lightSwitch.x + LBDiffuse * lightSwitch.y + LCDiffuse * lightSwitch.z;

  vec4 specular = LASpecular * lightSwitch.x + LBSpecular * lightSwitch.y + LCSpecular * lightSwitch.z;

  vec4 out_color = clamp(diffuse + specular, 0.0, 1.0);
   vec4 prova = vec4(out_color.rgb, 1.0);

  if (selection == 2.) {
    prova = vec4(index, out_color.g,out_color.b, 1.);
  }
  outColor = prova;
}