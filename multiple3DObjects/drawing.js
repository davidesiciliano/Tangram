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

  var lastUpdateTime = (new Date).getTime();

  var piecesNormalMatrix = new Array(), piecesWorldMatrix = new Array();
  var positionAttributeLocation = new Array(), normalAttributeLocation = new Array();
  var matrixLocation = new Array(), materialDiffColorHandle = new Array();
  var lightDirectionHandle = new Array(), lightColorHandle = new Array();
  var normalMatrixPositionHandle = new Array(), vertexMatrixPositionHandle = new Array();
  var materialDiffColorHandle = new Array();
  var vaos = new Array();

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

    console.log(vertexPositionData[i]);
  }

  //SET Global states (viewport size, viewport background color, Depth test)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.85, 0.85, 0.85, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  //Lambert
  for (i = 0; i < model.length; i++) {
    positionAttributeLocation[i] = gl.getAttribLocation(programs[0], "inPosition");
    normalAttributeLocation[i] = gl.getAttribLocation(programs[0], "inNormal");
    matrixLocation[i] = gl.getUniformLocation(programs[0], "matrix");
    materialDiffColorHandle[i] = gl.getUniformLocation(programs[0], 'mDiffColor');
    lightDirectionHandle[i] = gl.getUniformLocation(programs[0], 'lightDirection');
    lightColorHandle[i] = gl.getUniformLocation(programs[0], 'lightColor');
    normalMatrixPositionHandle[i] = gl.getUniformLocation(programs[0], 'nMatrix');
  }
//  //Colour by position
//  positionAttributeLocation[1] = gl.getAttribLocation(programs[1], "inPosition");  
//      matrixLocation[1] = gl.getUniformLocation(programs[1], "matrix");
//
//  //Unlit
//  positionAttributeLocation[2] = gl.getAttribLocation(programs[2], "inPosition");  
//      matrixLocation[2] = gl.getUniformLocation(programs[2], "matrix");

  var perspectiveMatrix = utils.MakePerspective(30, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
  var cx = 0.0, cy = 0.0, cz = 20.0;
  var viewMatrix = utils.MakeView(cx, cy, cz, 0.0, 0.0);

  for (i = 0; i < model.length; i++) {
    vaos[i] = gl.createVertexArray();

    gl.bindVertexArray(vaos[i]);
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData[i]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation[i]);
    gl.vertexAttribPointer(positionAttributeLocation[i], 3, gl.FLOAT, false, 0, 0);

    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData[i]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation[i]);
    gl.vertexAttribPointer(normalAttributeLocation[i], 3, gl.FLOAT, false, 0, 0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData[i]), gl.STATIC_DRAW);
  }

  drawScene();

  function animate() {
    var currentTime = (new Date).getTime();
    var deltaC = (30 * (currentTime - lastUpdateTime)) / 1000.0;

    var curRotation = utils.MakeRotateXYZMatrix(deltaC, -deltaC, deltaC);

    for (i = 0; i < model.length; i++) {
      piecesWorldMatrix[i] = utils.multiplyMatrices(piecesWorldMatrix[i], curRotation);
      if (i === 0) {
        piecesNormalMatrix[i] = utils.invertMatrix(utils.transposeMatrix(piecesWorldMatrix[i]));
      }
    }

    lastUpdateTime = currentTime;
  }

  function drawScene() {
    //animate();

    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    for (i = 0; i < model.length; i++) {
      gl.useProgram(programs[0]);

      var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, piecesWorldMatrix[i]);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
      gl.uniformMatrix4fv(matrixLocation[i], gl.FALSE, utils.transposeMatrix(projectionMatrix));

      if (i === 0) {
        gl.uniformMatrix4fv(vertexMatrixPositionHandle[i], gl.FALSE, utils.transposeMatrix(piecesWorldMatrix[i]));
        gl.uniformMatrix4fv(normalMatrixPositionHandle[i], gl.FALSE, utils.transposeMatrix(piecesNormalMatrix[i]));

        gl.uniform4fv(materialDiffColorHandle[i], cubeMaterialColor);
        gl.uniform3fv(lightDirectionHandle[i], directionalLightDir);
        gl.uniform4fv(lightColorHandle[i], directionalLightColor);
      }


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

  //MultipleShaders
  await utils.loadFiles([shaderDir + 'vs_lamb.glsl', shaderDir + 'fs_lamb.glsl'], function (shaderText) {
    let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    console.log(shaderText[0])
    console.log(shaderText[1])
    let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    console.log("QUI")

    programs[0] = utils.createProgram(gl, vertexShader, fragmentShader);
  });

  await utils.loadFiles([shaderDir + 'vs_pos.glsl', shaderDir + 'fs_pos.glsl'], function (shaderText) {
    let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

    programs[1] = utils.createProgram(gl, vertexShader, fragmentShader);
  });

  await utils.loadFiles([shaderDir + 'vs_unlit.glsl', shaderDir + 'fs_unlit.glsl'], function (shaderText) {
    let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

    programs[2] = utils.createProgram(gl, vertexShader, fragmentShader);
  });

  let piece1ObjStr = await utils.get_objstr(baseDir + modelStr[0]);
  model[0] = new OBJ.Mesh(piece1ObjStr);

  let piece2ObjStr = await utils.get_objstr(baseDir + modelStr[1]);
  model[1] = new OBJ.Mesh(piece2ObjStr);

  let piece3ObjStr = await utils.get_objstr(baseDir + modelStr[2]);
  model[2] = new OBJ.Mesh(piece3ObjStr);

  let piece4ObjStr = await utils.get_objstr(baseDir + modelStr[3]);
  model[3] = new OBJ.Mesh(piece4ObjStr);

  let piece5ObjStr = await utils.get_objstr(baseDir + modelStr[4]);
  model[4] = new OBJ.Mesh(piece5ObjStr);

  let piece6ObjStr = await utils.get_objstr(baseDir + modelStr[5]);
  model[5] = new OBJ.Mesh(piece6ObjStr);

  let piece7ObjStr = await utils.get_objstr(baseDir + modelStr[6]);
  model[6] = new OBJ.Mesh(piece7ObjStr);

  let trayObjStr = await utils.get_objstr(baseDir + modelStr[7]);
  model[7] = new OBJ.Mesh(trayObjStr);

  main();
}

window.onload = init;
