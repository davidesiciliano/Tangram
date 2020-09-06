async function loadModels() {
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

  for (var i = 8; i < 15; i++) {
    model[i] = pieces[i - 8];
  }

  //Extracts the vertices, normals, indices and uv coords from the models we imported
  for (i = 0; i < model.length; i++) {
    vertexPositionData[i] = model[i].vertices;
    normalData[i] = model[i].vertexNormals;
    indexData[i] = model[i].indices;
    texCoords[i] = model[i].textures;
  }
}

function initPositions() {
  //region: creates world matrices for initial position of pieces
  //first big triangle
  piecesWorldMatrix[0] = utils.MakeWorld(-0.95, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0);
  piecesWorldMatrixParams[0] = [-0.95, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0];
  //middle triangle
  piecesWorldMatrix[1] = utils.MakeWorld(1.5, -1.35, -0.10, 90.0, 90.0, 0.0, 1.0);
  piecesWorldMatrixParams[1] = [1.5, -1.35, -0.10, 90.0, 90.0, 0.0, 1.0];
  //first small triangle
  piecesWorldMatrix[2] = utils.MakeWorld(0.58, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0);
  piecesWorldMatrixParams[2] = [0.58, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0];
  //trapezoid
  piecesWorldMatrix[3] = utils.MakeWorld(1.6, 0.55, -0.10, 0.0, 90.0, 0.0, 1.0);
  piecesWorldMatrixParams[3] = [1.6, 0.55, -0.10, 0.0, 90.0, 0.0, 1.0];
  //square
  piecesWorldMatrix[4] = utils.MakeWorld(0.05, -0.9, -0.10, 0.0, 90.0, 0.0, 1.0);
  piecesWorldMatrixParams[4] = [0.05, -0.9, -0.10, 0.0, 90.0, 0.0, 1.0];
  //second small triangle
  piecesWorldMatrix[5] = utils.MakeWorld(-1, -1.5, -0.10, 180.0, 90.0, 0.0, 1.0);
  piecesWorldMatrixParams[5] = [-1, -1.5, -0.10, 180.0, 90.0, 0.0, 1.0];
  //second big triangle
  piecesWorldMatrix[6] = utils.MakeWorld(0.0, 1.2, -0.10, 180.0, 90.0, 0.0, 1.0);
  piecesWorldMatrixParams[6] = [0.0, 1.2, -0.10, 180.0, 90.0, 0.0, 1.0];
  //tray - positioned
  piecesWorldMatrix[7] = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 90.0, 0.0, 1.0);

  for (i = 0; i < 8; i++) {
    // piecesWorldMatrix[i] = utils.multiplyMatrices(translate, piecesWorldMatrix[i]);
  }
  //endregione

  piecesNormalMatrix[0] = utils.invertMatrix(utils.transposeMatrix(piecesWorldMatrix[0]));

  for (i = 8; i < 15; i++) {
    piecesWorldMatrix[i] = utils.identityMatrix();
    if (selectedTarget.mirror && i == 11) {
      piecesWorldMatrix[i] = utils.multiplyMatrices(horizontalMirror, utils.identityMatrix());
    }

    var world = utils.MakeWorld(selectedTarget.translations[i - 8][0], selectedTarget.translations[i - 8][1], selectedTarget.translations[i - 8][2], 0.0, 0.0, selectedTarget.rotation[i - 8], 1.0);
    piecesWorldMatrix[i] = utils.multiplyMatrices(world, piecesWorldMatrix[i]);
  }
}

/* Inizializza il program (identificato da shadersType), creando per quel program l'array (globale)
contenente le location degli attributi e delle uniformi utilizzati negli shader associati. Infine
crea il Vertex Array Object e ne fa il binding. */
function initializeProgram(gl, shadersType) {
  getAttributeAndUniformLocation(gl, shadersType);
  createVAO(gl, shadersType)
}

function getAttributeAndUniformLocation(gl, shadersType) {

  var positionAttributeLocation = gl.getAttribLocation(programs[shadersType], "inPosition");
  var normalAttributeLocation = gl.getAttribLocation(programs[shadersType], "inNormal");

  var matrixLocation = gl.getUniformLocation(programs[shadersType], "matrix");
  var materialColorHandle = gl.getUniformLocation(programs[shadersType], 'materialColor');

  var normalMatrixPositionHandle = gl.getUniformLocation(programs[shadersType], 'nMatrix');
  var vertexMatrixPositionHandle = gl.getUniformLocation(programs[shadersType], 'pMatrix');

  //LIGHTS
  var specularColorHandle = gl.getUniformLocation(programs[shadersType], 'specularColor');
  var specShine = gl.getUniformLocation(programs[shadersType], 'SpecShine');
  var lightSwitch = gl.getUniformLocation(programs[shadersType], 'lightSwitch');

  //Directional Light
  var directionalLightDir = gl.getUniformLocation(programs[shadersType], 'LADir');
  var directionalLightCol = gl.getUniformLocation(programs[shadersType], 'LACol');

  //Point light
  var pointLightPosition = gl.getUniformLocation(programs[shadersType], 'LBPos');
  var pointLightColor = gl.getUniformLocation(programs[shadersType], 'LBCol');
  var pointLightDecay = gl.getUniformLocation(programs[shadersType], 'LBDecay');
  var pointLightTarget = gl.getUniformLocation(programs[shadersType], 'LBTarget');

  //Spotligh light
  var spotLightPosition = gl.getUniformLocation(programs[shadersType], 'LCPos');
  var spotLightColor = gl.getUniformLocation(programs[shadersType], 'LCCol');
  var spotLightDir = gl.getUniformLocation(programs[shadersType], 'LCDir');
  var spotLightConeIn = gl.getUniformLocation(programs[shadersType], 'LCConeIn');
  var spotLightConeOut = gl.getUniformLocation(programs[shadersType], 'LCConeOut');
  var spotLightDecay = gl.getUniformLocation(programs[shadersType], 'LCDecay');
  var spotLightTarget = gl.getUniformLocation(programs[shadersType], 'LCTarget');

  var selection = gl.getUniformLocation(programs[shadersType], 'selection');
  var index = gl.getUniformLocation(programs[shadersType], 'index');

  locationsArray[shadersType] = {
    "positionAttributeLocation": positionAttributeLocation,
    "normalAttributeLocation": normalAttributeLocation,
    "matrixLocation": matrixLocation,

    //LIGHTS
    "lightSwitch": lightSwitch,
    "materialColorHandle": materialColorHandle,
    "specularColorHandle": specularColorHandle,
    "specShine": specShine,

    //directional
    "directionalLightDir": directionalLightDir,
    "directionalLightCol": directionalLightCol,

    //pointlight
    "pointLightPosition": pointLightPosition,
    "pointLightColor": pointLightColor,
    "pointLightDecay": pointLightDecay,
    "pointLightTarget": pointLightTarget,

    //spotlight
    "spotLightPosition": spotLightPosition,
    "spotLightColor": spotLightColor,
    "spotLightDir": spotLightDir,
    "spotLightConeIn": spotLightConeIn,
    "spotLightConeOut": spotLightConeOut,
    "spotLightDecay": spotLightDecay,
    "spotLightTarget": spotLightTarget,

    "normalMatrixPositionHandle": normalMatrixPositionHandle,
    "vertexMatrixPositionHandle": vertexMatrixPositionHandle,

    "selection": selection,
    "index": index,
  }
}

function putAttributesOnGPU(gl, location, data, length) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, length, gl.FLOAT, false, 0, 0);

}

function createVAO(gl, shadersType) {
  switch (shadersType) {

    case ShadersType.item:
      for (var i = 0; i < model.length; i++) {

        vaos[i] = gl.createVertexArray();
        gl.bindVertexArray(vaos[i]);

        putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation, model[i].vertices, 3);

        putAttributesOnGPU(gl, locationsArray[shadersType].normalAttributeLocation, model[i].vertexNormals, 3);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model[i].indices), gl.STATIC_DRAW);
      }
      break;

    /*case ShadersType.SOLUTION:

      for (var i = 0; i < assetsData.length; i++) {
        assetsData[i].drawInfo.vaoOverlay = gl.createVertexArray();
        gl.bindVertexArray(assetsData[i].drawInfo.vaoOverlay);

        putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation, assetsData[i].structInfo.vertices2D, 3);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices2D), gl.STATIC_DRAW);
      }
      break;

    case ShadersType.FLOOR:
      assetsFloor.drawInfo.vao = gl.createVertexArray();
      gl.bindVertexArray(assetsFloor.drawInfo.vao);

      putAttributesOnGPU(gl, locationsArray[ShadersType.FLOOR].positionAttributeLocation, assetsFloor.structInfo.vertices, 3);

      putAttributesOnGPU(gl, locationsArray[ShadersType.FLOOR].normalAttributeLocation, assetsFloor.structInfo.normals, 3);

      putAttributesOnGPU(gl, locationsArray[ShadersType.FLOOR].uvAttributeLocation, assetsFloor.structInfo.uv, 2);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsFloor.structInfo.indices), gl.STATIC_DRAW);

      createTexture(gl);
      break;*/
  }
}