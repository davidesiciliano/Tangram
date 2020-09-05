function main() {

  initPositions();

  var perspectiveMatrix = utils.MakePerspective(30, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

  initializeProgram(gl, ShadersType.item);
  initializeProgram(gl, ShadersType.floor);
  drawScene();

  function drawScene() {
    var viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

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

      //Directional Light
      gl.uniform3fv(locationsArray[ShadersType.item].directionalLightDir, directionalLightDir);
      gl.uniform4fv(locationsArray[ShadersType.item].directionalLightCol, directionalLightColor);

      //Point light
      gl.uniform3fv(locationsArray[ShadersType.item].pointLightPosition, pointLightPosition);
      gl.uniform4fv(locationsArray[ShadersType.item].pointLightColor, pointLightColor);
      gl.uniform1f(locationsArray[ShadersType.item].pointLightDecay, pointLightDecay);
      gl.uniform1f(locationsArray[ShadersType.item].pointLightTarget, pointLightTarget);

      //Spot light
      gl.uniform3fv(locationsArray[ShadersType.item].spotLightPosition, spotLightPos);
      gl.uniform4fv(locationsArray[ShadersType.item].spotLightColor, spotLightColor);
      gl.uniform3fv(locationsArray[ShadersType.item].spotLightDir, spotLightDir);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightConeOut, spotLightConeOut);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightConeIn, spotLightConeIn);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightTarget, spotLightTarget);
      gl.uniform1f(locationsArray[ShadersType.item].spotLightDecay, spotLightDecay);

      gl.bindVertexArray(vaos[i]);
      gl.drawElements(gl.TRIANGLES, indexData[i].length, gl.UNSIGNED_SHORT, 0);
    }
      
    //drawing floor
    gl.useProgram(programs[ShadersType.floor]);

      let worldViewMatrix = utils.multiplyMatrices(viewMatrix, floorWorldMatrix);
      let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      let normalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.floor].matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.floor].normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.floor].vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldViewMatrix));

      //LIGHTS
      gl.uniform4fv(locationsArray[ShadersType.floor].materialColorHandle, [floorAmbientColor[0], floorAmbientColor[1], floorAmbientColor[2], 1.0]);
      gl.uniform4fv(locationsArray[ShadersType.floor].specularColorHandle, specularColor);
      gl.uniform4fv(locationsArray[ShadersType.floor].lightSwitch, lightSwitch);
      gl.uniform1f(locationsArray[ShadersType.floor].specShine, specularShine);

      //Directional Light
      gl.uniform3fv(locationsArray[ShadersType.floor].directionalLightDir, directionalLightDir);
      gl.uniform4fv(locationsArray[ShadersType.floor].directionalLightCol, directionalLightColor);

      //Point light
      gl.uniform3fv(locationsArray[ShadersType.floor].pointLightPosition, pointLightPosition);
      gl.uniform4fv(locationsArray[ShadersType.floor].pointLightColor, pointLightColor);
      gl.uniform1f(locationsArray[ShadersType.floor].pointLightDecay, pointLightDecay);
      gl.uniform1f(locationsArray[ShadersType.floor].pointLightTarget, pointLightTarget);

      //Spot light
      gl.uniform3fv(locationsArray[ShadersType.floor].spotLightPosition, spotLightPos);
      gl.uniform4fv(locationsArray[ShadersType.floor].spotLightColor, spotLightColor);
      gl.uniform3fv(locationsArray[ShadersType.floor].spotLightDir, spotLightDir);
      gl.uniform1f(locationsArray[ShadersType.floor].spotLightConeOut, spotLightConeOut);
      gl.uniform1f(locationsArray[ShadersType.floor].spotLightConeIn, spotLightConeIn);
      gl.uniform1f(locationsArray[ShadersType.floor].spotLightTarget, spotLightTarget);
      gl.uniform1f(locationsArray[ShadersType.floor].spotLightDecay, spotLightDecay);

      gl.bindVertexArray(floor.vao);
      gl.drawElements(gl.TRIANGLES, floor.indices.length, gl.UNSIGNED_SHORT, 0);
      

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
      
      programs[1] = utils.createProgram(gl, vertexShader, fragmentShader);
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