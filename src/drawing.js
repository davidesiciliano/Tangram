var programs = new Array();
var gl;
var baseDir;
var shaderDir;

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

function main() {
  var i;
  var lastUpdateTime = (new Date).getTime();

  var piecesNormalMatrix = new Array(), piecesWorldMatrix = new Array();
  var positionAttributeLocation = new Array(), normalAttributeLocation = new Array();
  var matrixLocation = new Array(), materialDiffColorHandle = new Array();
  var lightDirectionHandle = new Array(), lightColorHandle = new Array();
  var normalMatrixPositionHandle = new Array(), vertexMatrixPositionHandle = new Array();
  var materialDiffColorHandle = new Array();

  //first big triangle - positioned
  piecesWorldMatrix[0] = utils.MakeWorld(-0.95, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0);
  //middle triangle
  piecesWorldMatrix[1] = utils.MakeWorld(1.5, -1.35, -0.10, 90.0, 90.0, 0.0, 1.0);
  //first small triangle
  piecesWorldMatrix[2] = utils.MakeWorld(0.58, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0);
  //trapezoid - positioned 
  piecesWorldMatrix[3] = utils.MakeWorld(1.6, 0.55, -0.10, 0.0, 90.0, 0.0, 1.0);
  //square - positioned
  piecesWorldMatrix[4] = utils.MakeWorld(0.05, -0.9, -0.10, 0.0, 90.0, 0.0, 1.0);
  //second small triangle - positioned
  piecesWorldMatrix[5] = utils.MakeWorld(-1, -1.5, -0.10, 180.0, 90.0, 0.0, 1.0);
  //second big triangle - positioned
  piecesWorldMatrix[6] = utils.MakeWorld(0.0, 1.2, -0.10, 180.0, 90.0, 0.0, 1.0);
  //tray - positioned
  piecesWorldMatrix[7] = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 90.0, 0.0, 1.0);

  piecesNormalMatrix[0] = utils.invertMatrix(utils.transposeMatrix(piecesWorldMatrix[0]));

  var vertexPositionData = new Array();
  var normalData = new Array();
  var indexData = new Array();
  var texCoords = new Array();

  //Extracts the vertices, normals, indices and uv coords from the models we imported
  for (i = 0; i < model.length; i++) {
    vertexPositionData[i] = model[i].vertices;
    normalData[i] = model[i].vertexNormals;
    indexData[i] = model[i].indices;
    texCoords[i] = model[i].textures;

    //console.log(vertexPositionData[i]);
  }

  var perspectiveMatrix = utils.MakePerspective(30, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

  initializeProgram(gl, ShadersType.item);
  drawScene();

  function drawScene() {
    //Camera
    var viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    let lightDirMatrix = viewMatrix;
    let lightPosMatrix = viewMatrix;

    for (i = 0; i < model.length; i++) {
      gl.useProgram(programs[ShadersType.item]);

      let worldViewMatrix = utils.multiplyMatrices(viewMatrix, piecesWorldMatrix[i]);
      let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      let normalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));

      gl.uniformMatrix4fv(locationsArray[ShadersType.item].matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.item].normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.item].vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldViewMatrix));

      //LIGHTS
      gl.uniform4fv(locationsArray[ShadersType.item].materialColorHandle, [piecesAmbientColor[i][0], piecesAmbientColor[i][1], piecesAmbientColor[i][2], 1.0]);
      gl.uniform4fv(locationsArray[ShadersType.item].specularColorHandle, specularColor);
      gl.uniform4fv(locationsArray[ShadersType.item].lightSwitch, lightSwitch);
      gl.uniform1f(locationsArray[ShadersType.item].specShine, specularShine);
      gl.uniformMatrix4fv(locationsArray[ShadersType.item].lightDirMatrix, gl.FALSE, utils.transposeMatrix(lightDirMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.item].lightPosMatrix, gl.FALSE, utils.transposeMatrix(lightPosMatrix));

      //Directional Light
      let directionalLightDirTransform = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLightDir);
      gl.uniform3fv(locationsArray[ShadersType.item].directionalLightDir, directionalLightDirTransform);
      gl.uniform4fv(locationsArray[ShadersType.item].directionalLightCol, directionalLightColor);

      //Point light
      gl.uniform3fv(locationsArray[ShadersType.item].pointLightPosition, pointLightPosition);
      gl.uniform4fv(locationsArray[ShadersType.item].pointLightColor, pointLightColor);
      gl.uniform1f(locationsArray[ShadersType.item].pointLightDecay, pointLightDecay);
      gl.uniform1f(locationsArray[ShadersType.item].pointLightTarget, pointLightTarget);

      //Spot light
      gl.uniform3fv(locationsArray[ShadersType.item].spotLightPosition, spotLightPos);
      gl.uniform4fv(locationsArray[ShadersType.item].spotLightColor, spotLightColor);
      let spotLightDirTransform = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), spotLightDir);
      gl.uniform3fv(locationsArray[ShadersType.item].spotLightDir, spotLightDirTransform);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightConeOut, spotLightConeOut);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightConeIn, spotLightConeIn);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightTarget, spotLightTarget);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightDecay, spotLightDecay);

      gl.bindVertexArray(vaos[i]);
      gl.drawElements(gl.TRIANGLES, indexData[i].length, gl.UNSIGNED_SHORT, 0);
    }

    window.requestAnimationFrame(drawScene);
  }

}

async function init() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  baseDir = window.location.href.replace(page, '');
  shaderDir = baseDir + "shaders/";

  var canvas = document.getElementById("c");
  gl = canvas.getContext("webgl2");
  if (!gl) {
    document.write("GL context not opened");
    return;
  }
  utils.resizeCanvasToDisplaySize(gl.canvas);

  //SET Global states (viewport size, viewport background color, Depth test)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.85, 0.85, 0.85, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  //MultipleShaders
  await utils.loadFiles([shaderDir + 'pieces/vs.glsl', shaderDir + 'pieces/fs.glsl'], function (shaderText) {
    let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

    programs[0] = utils.createProgram(gl, vertexShader, fragmentShader);
  });

  /*await utils.loadFiles([shaderDir + 'vs_pos.glsl', shaderDir + 'fs_pos.glsl'], function (shaderText) {
    let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

    programsArray[1] = utils.createProgram(gl, vertexShader, fragmentShader);
  });

  await utils.loadFiles([shaderDir + 'vs_unlit.glsl', shaderDir + 'fs_unlit.glsl'], function (shaderText) {
    let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

    programsArray[2] = utils.createProgram(gl, vertexShader, fragmentShader);
  });*/

  await loadModels();

  main();
}

window.onload = init;
