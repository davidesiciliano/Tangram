async function loadModels() {
  let piece1ObjStr = await utils.get_objstr(baseDir + piecesModelLocations[0]);
  piecesModel[0] = new OBJ.Mesh(piece1ObjStr);

  let piece2ObjStr = await utils.get_objstr(baseDir + piecesModelLocations[1]);
  piecesModel[1] = new OBJ.Mesh(piece2ObjStr);

  let piece3ObjStr = await utils.get_objstr(baseDir + piecesModelLocations[2]);
  piecesModel[2] = new OBJ.Mesh(piece3ObjStr);

  let piece4ObjStr = await utils.get_objstr(baseDir + piecesModelLocations[3]);
  piecesModel[3] = new OBJ.Mesh(piece4ObjStr);

  let piece5ObjStr = await utils.get_objstr(baseDir + piecesModelLocations[4]);
  piecesModel[4] = new OBJ.Mesh(piece5ObjStr);

  let piece6ObjStr = await utils.get_objstr(baseDir + piecesModelLocations[5]);
  piecesModel[5] = new OBJ.Mesh(piece6ObjStr);

  let piece7ObjStr = await utils.get_objstr(baseDir + piecesModelLocations[6]);
  piecesModel[6] = new OBJ.Mesh(piece7ObjStr);

  let trayObjStr = await utils.get_objstr(baseDir + piecesModelLocations[7]);
  piecesModel[7] = new OBJ.Mesh(trayObjStr);

  //Extracts the vertices, normals, indices and uv coords from the models we imported
  for ( var i = 0; i < piecesModel.length; i++) {
    piecesVertexPositionData[i] = piecesModel[i].vertices;
    piecesNormalData[i] = piecesModel[i].vertexNormals;
    piecesIndexData[i] = piecesModel[i].indices;
  }

  /*for (var i = 8; i < 15; i++) {
    model[i] = pieces[i - 8];
  }

  //Extracts the vertices, normals, indices and uv coords from the models we imported
  for (i = 8; i < model.length; i++) {
    vertexPositionData[i] = model[i].vertices;
    normalData[i] = model[i].normals;
    indexData[i] = model[i].indices;
    texCoords[i] = model[i].texture;
  }*/
}

function initPositions() {
  //region: creates world matrices for initial position of pieces
  //first big triangle
  piecesWorldMatrix[0] = utils.MakeWorld(-0.95, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0);
  //middle triangle
  piecesWorldMatrix[1] = utils.MakeWorld(1.5, -1.35, -0.10, 90.0, 90.0, 0.0, 1.0);
  //first small triangle
  piecesWorldMatrix[2] = utils.MakeWorld(0.58, 0.125, -0.10, 0.0, 90.0, 0.0, 1.0);
  //trapezoid
  piecesWorldMatrix[3] = utils.MakeWorld(1.6, 0.55, -0.10, 0.0, 90.0, 0.0, 1.0);
  //square
  piecesWorldMatrix[4] = utils.MakeWorld(0.05, -0.9, -0.10, 0.0, 90.0, 0.0, 1.0);
  //second small triangle
  piecesWorldMatrix[5] = utils.MakeWorld(-1, -1.5, -0.10, 180.0, 90.0, 0.0, 1.0);
  //second big triangle
  piecesWorldMatrix[6] = utils.MakeWorld(0.0, 1.2, -0.10, 180.0, 90.0, 0.0, 1.0);
  //tray - positioned
  piecesWorldMatrix[7] = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 90.0, 0.0, 1.0);

  for (i = 0; i < 8; i++) {
    piecesWorldMatrix[i] = utils.multiplyMatrices(translate, piecesWorldMatrix[i]);
  }
  piecesNormalMatrix[0] = utils.invertMatrix(utils.transposeMatrix(piecesWorldMatrix[0])); //todo: questo serve? viene usato solo qui
  //endregion

  //region: floor
  floorWorldMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.5);
  floorNormalMatrix = utils.invertMatrix(utils.transposeMatrix(floorWorldMatrix));
  //endregion

  //todo: solution position
  /*
  for (i = 8; i < 15; i++) {
    piecesWorldMatrix[i] = utils.identityMatrix();
    if (selectedTarget.mirror && i === 11) {
      piecesWorldMatrix[i] = utils.multiplyMatrices(horizontalMirror, utils.identityMatrix());
    }

    var world = utils.MakeWorld(selectedTarget.translations[i - 8][0], selectedTarget.translations[i - 8][1], selectedTarget.translations[i - 8][2], 0.0, 0.0, selectedTarget.rotation[i - 8], 1.0);
    piecesWorldMatrix[i] = utils.multiplyMatrices(world, piecesWorldMatrix[i]);
  }
   */
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
  var materialColorHandle;

  if (shadersType === ShadersType.pieces || shadersType === ShadersType.targetPieces)
    materialColorHandle = gl.getUniformLocation(programs[shadersType], 'materialColor');

  //todo aggiungere shader soluzione
  /*if (shadersType === ShadersType.SOLUTION) {
    locationsArray[shadersType] = {
      "positionAttributeLocation": positionAttributeLocation,
      "normalAttributeLocation": normalAttributeLocation,
      "matrixLocation": matrixLocation,

      "materialColorHandle": materialColorHandle,
    };
    return;
  }*/

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

  //Spot light
  var spotLightPosition = gl.getUniformLocation(programs[shadersType], 'LCPos');
  var spotLightColor = gl.getUniformLocation(programs[shadersType], 'LCCol');
  var spotLightDir = gl.getUniformLocation(programs[shadersType], 'LCDir');
  var spotLightConeIn = gl.getUniformLocation(programs[shadersType], 'LCConeIn');
  var spotLightConeOut = gl.getUniformLocation(programs[shadersType], 'LCConeOut');
  var spotLightDecay = gl.getUniformLocation(programs[shadersType], 'LCDecay');
  var spotLightTarget = gl.getUniformLocation(programs[shadersType], 'LCTarget');

  if (shadersType === ShadersType.pieces) {
    locationsArray[shadersType] = {
      "positionAttributeLocation": positionAttributeLocation,
      "normalAttributeLocation": normalAttributeLocation,
      "matrixLocation": matrixLocation,

      //LIGHTS
      "lightSwitch": lightSwitch,
      "materialColorHandle": materialColorHandle,
      "specularColorHandle": specularColorHandle,
      "specShine": specShine,

      //Directional light
      "directionalLightDir": directionalLightDir,
      "directionalLightCol": directionalLightCol,

      //Point light
      "pointLightPosition": pointLightPosition,
      "pointLightColor": pointLightColor,
      "pointLightDecay": pointLightDecay,
      "pointLightTarget": pointLightTarget,

      //Spot light
      "spotLightPosition": spotLightPosition,
      "spotLightColor": spotLightColor,
      "spotLightDir": spotLightDir,
      "spotLightConeIn": spotLightConeIn,
      "spotLightConeOut": spotLightConeOut,
      "spotLightDecay": spotLightDecay,
      "spotLightTarget": spotLightTarget,

      "normalMatrixPositionHandle": normalMatrixPositionHandle,
      "vertexMatrixPositionHandle": vertexMatrixPositionHandle
    };
    return;
  }

  var textLocation = gl.getUniformLocation(programs[ShadersType.floor], "u_texture"); //in the floor i need also parameters for the texture
  var uvAttributeLocation = gl.getAttribLocation(programs[ShadersType.floor], "in_uv");

  locationsArray[shadersType] = {
    "positionAttributeLocation": positionAttributeLocation,
    "normalAttributeLocation": normalAttributeLocation,
    "matrixLocation": matrixLocation,

    //LIGHTS
    "lightSwitch": lightSwitch,
    "specularColorHandle": specularColorHandle,
    "specShine": specShine,

    //Directional light
    "directionalLightDir": directionalLightDir,
    "directionalLightCol": directionalLightCol,

    //Point light
    "pointLightPosition": pointLightPosition,
    "pointLightColor": pointLightColor,
    "pointLightDecay": pointLightDecay,
    "pointLightTarget": pointLightTarget,

    //Spot light
    "spotLightPosition": spotLightPosition,
    "spotLightColor": spotLightColor,
    "spotLightDir": spotLightDir,
    "spotLightConeIn": spotLightConeIn,
    "spotLightConeOut": spotLightConeOut,
    "spotLightDecay": spotLightDecay,
    "spotLightTarget": spotLightTarget,

    "normalMatrixPositionHandle": normalMatrixPositionHandle,
    "vertexMatrixPositionHandle": vertexMatrixPositionHandle,

    "uvAttributeLocation": uvAttributeLocation,
    "textLocation": textLocation
  };
}

function putAttributesOnGPU(gl, location, data, length) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, length, gl.FLOAT, false, 0, 0);

}

function createVAO(gl, shadersType) {
  switch (shadersType) {

    case ShadersType.pieces:
      for (var i = 0; i < piecesModel.length; i++) {

        piecesVaos[i] = gl.createVertexArray();
        gl.bindVertexArray(piecesVaos[i]);

        putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation, piecesVertexPositionData[i], 3);

        putAttributesOnGPU(gl, locationsArray[shadersType].normalAttributeLocation, piecesNormalData[i], 3);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(piecesModel[i].indices), gl.STATIC_DRAW);
      }
      break;

    case ShadersType.floor:
      floor.vao = gl.createVertexArray();
      gl.bindVertexArray(floor.vao);

      putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation, floor.vertices, 3);

      putAttributesOnGPU(gl, locationsArray[shadersType].normalAttributeLocation, floor.normals, 3);

      putAttributesOnGPU(gl, locationsArray[shadersType].uvAttributeLocation, floor.uv, 2);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(floor.indices), gl.STATIC_DRAW);

      createTexture(gl);
      break;

    /*case ShadersType.SOLUTION:

      for (var i = 0; i < assetsData.length; i++) {
        assetsData[i].drawInfo.vaoOverlay = gl.createVertexArray();
        gl.bindVertexArray(assetsData[i].drawInfo.vaoOverlay);

        putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation, assetsData[i].structInfo.vertices2D, 3);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices2D), gl.STATIC_DRAW);
      }
      break;*/
  }
}

function createTexture(gl) {
  floor.texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, floor.texture);
  var image = new Image();
  image.src = "model/wood_texture.png";
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, floor.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.generateMipmap(gl.TEXTURE_2D);
  }
}