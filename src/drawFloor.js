function drawFloor() {
  initializeProgram(gl, ShadersType.floor);

  drawSceneFloor();

  function drawSceneFloor() {
    var perspectiveMatrix = utils.MakePerspective(30, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    var viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    //drawing floor
    gl.useProgram(programs[ShadersType.floor]);

    let worldViewMatrix = utils.multiplyMatrices(viewMatrix, floorWorldMatrix);
    let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);
    let normalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));

    gl.uniformMatrix4fv(locationsArray[ShadersType.floor].matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
    gl.uniformMatrix4fv(locationsArray[ShadersType.floor].normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
    gl.uniformMatrix4fv(locationsArray[ShadersType.floor].vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldViewMatrix));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, floor.texture);
    gl.uniform1i(locationsArray[ShadersType.floor].textLocation, 0);
    gl.uniformMatrix4fv(locationsArray[ShadersType.floor].perspectiveLocation, gl.FALSE, perspectiveMatrix); //todo provare a togliere

    //LIGHTS
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

    window.requestAnimationFrame(drawSceneFloor);
  }
}