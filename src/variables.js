var programs = new Array();
var gl;
var baseDir;
var shaderDir;

var piecesWorldMatrix = new Array();
var piecesNormalMatrix = new Array();

var vertexPositionData = new Array();
var normalData = new Array();
var indexData = new Array();
var texCoords = new Array();

var model = Array();

let modelStr = [
  'model/piece1.obj',
  'model/piece2.obj',
  'model/piece3.obj',
  'model/piece4.obj',
  'model/piece5.obj',
  'model/piece6.obj',
  'model/piece7.obj',
  'model/tray.obj'
]

var idSelectedTarget = 0;
var selectedTarget = targets[idSelectedTarget];

var userHasSurrendered = false;

var horizontalMirror = [
  -1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0];

var translate = utils.MakeWorld(-5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);

var locationsArray = [];

let ShadersType = {
  item: 0
};

var vaos = new Array();

//region: CAMERA
var cx = 0.5;
var cy = -0.5;
var cz = 20.0;
var elevation = 0.0;
var angle = 0.0;
//endregion

//region: LIGHTS
//TODO: volendo si può mettere il colore dell' ambient light variabile
var ambientLight = [0.1, 0.1, 0.1, 1.0];
var ambientLightTop = [0.2, 0.2, 0.2, 1.0];
var ambientLightBottom = [0.0, 0.0, 0.0, 1.0];
var specularShine = 120.0;
var specularColor = [1.0, 1.0, 1.0, 1.0];

//material colour
let piecesAmbientColor = [
  [0.0, 0.0, 1.0],
  [0.0, 1.0, 0.0],
  [1.0, 1.0, 0.0],
  [1.0, 192.0 / 255, 203.0 / 255],
  [1.0, 0.0, 0.0],
  [128.0 / 255, 0.0, 128.0 / 255],
  [1.0, 165.0 / 255, 0.0],
  [1.0, 1.0, 1.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0]
];

// the light types are directionalLight, pointLight, spotLight, the fourth element is needed in order to have 4 elements
// if light is active lightSwitch[n] = 1
// if light is not active lightSwitch[n] = 0
var lightSwitch = [1, 0, 0, 0];

//Directional Light
var dirLightAlpha = utils.degToRad(20);
var dirLightBeta = utils.degToRad(100);

var directionalLightDir = [
  Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
  Math.sin(dirLightAlpha),
  Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
];

var directionalLightColor = [1.0, 1.0, 1.0, 1.0];

//pointlight
var pointLightPosition = [0.0, 0.0, 10.0];
var pointLightColor = [1.0, 1.0, 1.0, 1.0];
var pointLightDecay = 3.0;
var pointLightTarget = 10.0;

//spotlight
var spotLightPos = [0.0, 0.0, 0.5];
var spotLightTheta = utils.degToRad(0);
var spotLightPhi = utils.degToRad(0);
var spotLightDir = [Math.cos(spotLightPhi) * Math.sin(spotLightTheta),
  Math.sin(spotLightPhi) * Math.sin(spotLightTheta),
  Math.cos(spotLightTheta)
];
var spotLightConeIn = 1.1;
var spotLightConeOut = 85.5;
var spotLightDecay = 0.7;
var spotLightTarget = 1.0;
var spotLightColor = [1.0, 1.0, 1.0, 1.0];
//endregion