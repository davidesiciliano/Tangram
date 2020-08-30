//region: LIGHTS
//TODO: volendo si può mettere il colore dell' ambient light variabile
var ambientLight = [0.1, 0.1, 0.1, 1.0];
var ambientLightTop = [0.2, 0.2, 0.2, 1.0];
var ambientLightBottom = [0.0, 0.0, 0.0, 1.0];
var specularShine = 120;
var specularColor = [1.0, 1.0, 1.0, 1.0];

//material colour
var cubeMaterialColor = [0.5, 0.5, 0.5, 1.0];

// the light types are [directionalLight, pointLight, spotLight]
// if light is active lightSwitch[n] = 1
// if light is not active lightSwitch[n] = 0
var lightSwitch = [1, 0, 0];

//Directional Light
var dirLightTheta = utils.degToRad(100);
var dirLightPhi = utils.degToRad(45);

var directionalLightDir = [
  Math.cos(dirLightPhi)*Math.sin(dirLightTheta),
  Math.sin(dirLightPhi)*Math.sin(dirLightTheta),
  Math.cos(dirLightTheta)
];

var directionalLightColor = [0.1, 1.0, 1.0, 1.0];



//endregion