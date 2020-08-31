/* Inizializza il program (identificato da shadersType), creando per quel program l'array (globale)
contenente le location degli attributi e delle uniformi utilizzati negli shader associati. Infine
crea il Vertex Array Object e ne fa il binding. */
function initializeProgram(gl, shadersType) {
  getAttributeAndUniformLocation(gl, shadersType);
  createVAO(gl, shadersType)
}

function getAttributeAndUniformLocation(gl, shadersType) {

  var positionAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inPosition");
  var normalAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inNormal");

  var matrixLocation = gl.getUniformLocation(programsArray[shadersType], "matrix");
  var materialColorHandle = gl.getUniformLocation(programsArray[shadersType], 'materialColor');

  var normalMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'nMatrix');
  var vertexMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'pMatrix');

  //LIGHTS
  var specularColorHandle = gl.getUniformLocation(programsArray[shadersType], 'specularColor');
  var specShine = gl.getUniformLocation(programsArray[shadersType], 'SpecShine');
  //Directional Light
  var directionalLightDir = gl.getUniformLocation(programsArray[shadersType], 'LADir');
  var directionalLightCol = gl.getUniformLocation(programsArray[shadersType], 'LACol');


  //LIGHTS
  var lightSwitch = gl.getUniformLocation(programsArray[shadersType], 'lightSwitch');
  var lightDirMatrix = gl.getUniformLocation(programsArray[shadersType], 'lightDirMatrix');
  var lightPosMatrix = gl.getUniformLocation(programsArray[shadersType], 'lightPosMatrix');

  //Point light
  var pointLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LBPos');
  var pointLightColor = gl.getUniformLocation(programsArray[shadersType], 'LBCol');
  var pointLightDecay = gl.getUniformLocation(programsArray[shadersType], 'LBDecay');
  var pointLightTarget = gl.getUniformLocation(programsArray[shadersType], 'LBTarget');

  //Spotligh light
  var spotLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LCPos');
  var spotLightColor = gl.getUniformLocation(programsArray[shadersType], 'LCCol');
  var spotLightDir = gl.getUniformLocation(programsArray[shadersType], 'LCDir');
  var spotLightConeIn = gl.getUniformLocation(programsArray[shadersType], 'LCConeIn');
  var spotLightConeOut = gl.getUniformLocation(programsArray[shadersType], 'LCConeOut');
  var spotLightDecay = gl.getUniformLocation(programsArray[shadersType], 'LCDecay');
  var spotLightTarget = gl.getUniformLocation(programsArray[shadersType], 'LCTarget');


  locationsArray[0] = {
    "positionAttributeLocation": positionAttributeLocation,
    "normalAttributeLocation": normalAttributeLocation,
    "matrixLocation": matrixLocation,

    //LIGHTS

    "lightPosMatrix": lightPosMatrix,
    "lightDirMatrix": lightDirMatrix,

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
    "vertexMatrixPositionHandle": vertexMatrixPositionHandle
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

        putAttributesOnGPU(gl, locationsArray[shadersType].normalAttributeLocation, model[i].normals, 3);

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