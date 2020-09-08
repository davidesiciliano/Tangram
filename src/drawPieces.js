function drawPieces() {
  initializeProgram(gl, ShadersType.pieces);

  drawScenePieces();

  function drawScenePieces() {
    var perspectiveMatrix = utils.MakePerspective(30, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    var viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    for (i = 0; i < piecesModel.length; i++) {
      gl.useProgram(programs[ShadersType.pieces]);
        
      //updateTransformationMatrices(i);

      let worldViewMatrix = utils.multiplyMatrices(viewMatrix, createPieceWorldMatrix(i));
      let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      let normalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));

      gl.uniformMatrix4fv(locationsArray[ShadersType.pieces].matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.pieces].normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
      gl.uniformMatrix4fv(locationsArray[ShadersType.pieces].vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldViewMatrix));

      //LIGHTS
      gl.uniform4fv(locationsArray[ShadersType.pieces].materialColorHandle, [piecesMaterialColor[i][0], piecesMaterialColor[i][1], piecesMaterialColor[i][2], 1.0]);
      gl.uniform4fv(locationsArray[ShadersType.pieces].specularColorHandle, specularColor);
      gl.uniform4fv(locationsArray[ShadersType.pieces].lightSwitch, lightSwitch);
      gl.uniform1f(locationsArray[ShadersType.pieces].specShine, specularShine);

      //Directional Light
      gl.uniform3fv(locationsArray[ShadersType.pieces].directionalLightDir, directionalLightDir);
      gl.uniform4fv(locationsArray[ShadersType.pieces].directionalLightCol, directionalLightColor);

      //Point light
      gl.uniform3fv(locationsArray[ShadersType.pieces].pointLightPosition, pointLightPosition);
      gl.uniform4fv(locationsArray[ShadersType.pieces].pointLightColor, pointLightColor);
      gl.uniform1f(locationsArray[ShadersType.pieces].pointLightDecay, pointLightDecay);
      gl.uniform1f(locationsArray[ShadersType.pieces].pointLightTarget, pointLightTarget);

      //Spot light
      gl.uniform3fv(locationsArray[ShadersType.pieces].spotLightPosition, spotLightPos);
      gl.uniform4fv(locationsArray[ShadersType.pieces].spotLightColor, spotLightColor);
      gl.uniform3fv(locationsArray[ShadersType.pieces].spotLightDir, spotLightDir);
      gl.uniform1f(locationsArray[ShadersType.pieces].spotLightConeOut, spotLightConeOut);
      gl.uniform1f(locationsArray[ShadersType.pieces].spotLightConeIn, spotLightConeIn);
      gl.uniform1f(locationsArray[ShadersType.pieces].spotLightTarget, spotLightTarget);
      gl.uniform1f(locationsArray[ShadersType.pieces].spotLightDecay, spotLightDecay);
        
        gl.uniform1f(locationsArray[ShadersType.pieces].selection, mouseClicked);
    gl.uniform1f(locationsArray[ShadersType.pieces].index, ((i >> 0) & 0xFF) / 0xFF);

      gl.bindVertexArray(piecesVaos[i]);
      gl.drawElements(gl.TRIANGLES, piecesIndexData[i].length, gl.UNSIGNED_SHORT, 0);
    }

    if (mouseClicked != 2.0) {
    window.requestAnimationFrame(drawScenePieces);
  }
}}