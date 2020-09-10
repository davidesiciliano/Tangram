function createPieceWorldMatrix(index) {
  var param = piecesWorldMatrixParams[index];
  return utils.MakeWorld(param[0], param[1], param[2], param[3], param[4], param[5], param[6])
}

function extractAnglesFromWorldMatrix(matrix) {
  var angles = Array();
  angles[0] = Math.round(Math.atan2(matrix[9], matrix[10]) * 180 / Math.PI);
  angles[1] = Math.round(Math.atan2(-matrix[8], Math.sqrt(Math.pow(matrix[9], 2) + Math.pow(matrix[10], 2))) * 180 / Math.PI);
  angles[2] = Math.round(Math.atan2(matrix[4], matrix[0]) * 180 / Math.PI);

  return angles;
}

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

  for (var i = 8; i < 15; i++) {
    piecesModel[i] = pieces[i - 8];
  }

  //Extracts the vertices, normals, indices and uv coords from the models we imported
  for (i = 0; i < piecesModel.length; i++) {
    piecesVertexPositionData[i] = piecesModel[i].vertices;
    if (i > 7) {
      piecesNormalData[i] = piecesModel[i].normals;
    } else {
      piecesNormalData[i] = piecesModel[i].vertexNormals;
    }
    piecesIndexData[i] = piecesModel[i].indices;
  }
}

function initPositions() {
  //region: creates world matrices for initial position of pieces
  //first big triangle
  piecesWorldMatrixParams[0] = [
    initialPosition[0].tx,
    initialPosition[0].ty,
    initialPosition[0].tz,
    initialPosition[0].rx,
    initialPosition[0].ry,
    initialPosition[0].rz,
    initialPosition[0].s
  ];
  //middle triangle
  piecesWorldMatrixParams[1] = [
    initialPosition[1].tx,
    initialPosition[1].ty,
    initialPosition[1].tz,
    initialPosition[1].rx,
    initialPosition[1].ry,
    initialPosition[1].rz,
    initialPosition[1].s
  ];
  //first small triangle
  piecesWorldMatrixParams[2] = [
    initialPosition[2].tx,
    initialPosition[2].ty,
    initialPosition[2].tz,
    initialPosition[2].rx,
    initialPosition[2].ry,
    initialPosition[2].rz,
    initialPosition[2].s
  ];
  //trapezoid
  piecesWorldMatrixParams[3] = [
    initialPosition[3].tx,
    initialPosition[3].ty,
    initialPosition[3].tz,
    initialPosition[3].rx,
    initialPosition[3].ry,
    initialPosition[3].rz,
    initialPosition[3].s
  ];
  //square
  piecesWorldMatrixParams[4] = [
    initialPosition[4].tx,
    initialPosition[4].ty,
    initialPosition[4].tz,
    initialPosition[4].rx,
    initialPosition[4].ry,
    initialPosition[4].rz,
    initialPosition[4].s
  ];
  //second small triangle
  piecesWorldMatrixParams[5] = [
    initialPosition[5].tx,
    initialPosition[5].ty,
    initialPosition[5].tz,
    initialPosition[5].rx,
    initialPosition[5].ry,
    initialPosition[5].rz,
    initialPosition[5].s
  ];
  //second big triangle
  piecesWorldMatrixParams[6] = [
    initialPosition[6].tx,
    initialPosition[6].ty,
    initialPosition[6].tz,
    initialPosition[6].rx,
    initialPosition[6].ry,
    initialPosition[6].rz,
    initialPosition[6].s
  ];
  //tray
  piecesWorldMatrixParams[7] = [
    initialPosition[7].tx,
    initialPosition[7].ty,
    initialPosition[7].tz,
    initialPosition[7].rx,
    initialPosition[7].ry,
    initialPosition[7].rz,
    initialPosition[7].s
  ];

  for (i = 0; i < 8; i++) {
    piecesWorldMatrixParams[i][0] -= 4;
    piecesWorldMatrixParams[i][1] -= 1;
  }
  //endregion

  //region: floor
  floorWorldMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2);
  floorNormalMatrix = utils.invertMatrix(utils.transposeMatrix(floorWorldMatrix));
  //endregion

  for (i = 8; i < 15; i++) {
    piecesWorldMatrixParams[i] = [
      selectedTarget.translations[i - 8][0],
      selectedTarget.translations[i - 8][1],
      selectedTarget.translations[i - 8][2],
      0.0,
      0.0,
      selectedTarget.rotation[i - 8][0],
      1.0];
    if (selectedTarget.mirror && i === 11) {
      piecesWorldMatrixParams[i][3] += 180;
    }
  }

  piecesMaterialColor = initialPiecesMaterialColor;
}

function createParamsFromMatrix(matrix) {
    var rotation = Array();
    var translation = Array();
    var params = Array;
    
    translation = [matrix[3], matrix[7], matrix[11]];
    rotation = extractAnglesFromWorldMatrix(matrix);
    params = [translation[0], translation[1], translation[2], -rotation[2], rotation[0], -rotation[1], 1.0];
    return params;
}

function piecesInSolutionPosition() {
  var i;
  for (i = 0; i < piecesNumber; i++) {
      piecesWorldMatrixParams[i] = createParamsFromMatrix(solutionMatrix(i));
  }
  if (!selectedTarget.mirror) {
    piecesWorldMatrixParams[3][5] += 180.0
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
  var materialColorHandle;

  if (shadersType === ShadersType.pieces)
    materialColorHandle = gl.getUniformLocation(programs[shadersType], 'materialColor');

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

  var selection = gl.getUniformLocation(programs[shadersType], 'selection');
  var index = gl.getUniformLocation(programs[shadersType], 'index');
  var selectedColor = gl.getUniformLocation(programs[shadersType], 'selectedColor');

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
      "vertexMatrixPositionHandle": vertexMatrixPositionHandle,

      "selection": selection,
      "index": index,
      "selectedColor": selectedColor
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
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(piecesIndexData[i]), gl.STATIC_DRAW);
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
  }
}

function createTexture(gl) {
  floor.texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, floor.texture);
  var image = new Image();
  image.src = "textures/WoodFine0051_2_500.jpg";
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, floor.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.generateMipmap(gl.TEXTURE_2D);
  }
  image.crossOrigin = "anonymous";
}