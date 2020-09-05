function main() {

  window.addEventListener("keydown", didPressKey, false);
  canvas.addEventListener("mousedown", didMouseDown) ;
  canvas.addEventListener('mousemove', didMoveMouse);
  canvas.addEventListener('mouseup', didMouseUp);

  initPositions();

  var perspectiveMatrix = utils.MakePerspective(30, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

  initializeProgram(gl, ShadersType.item);
  drawScene();

  function drawScene() {
    var viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    for (i = 0; i < model.length; i++) {
      gl.useProgram(programs[ShadersType.item]);

        updateTransformationMatrices(i);

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

    window.requestAnimationFrame(drawScene);
  }

}

async function init() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  baseDir = window.location.href.replace(page, '');
  shaderDir = baseDir + "shaders/";

  canvas = document.getElementById("c");
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


var selectedPieceIndex = 0;
var keys = [];
var didPressKey = function (e) {
  if (!keys[e.keyCode]) {
    keys[e.keyCode] = true;
    switch (e.keyCode) {

      case 37: 	// Left arrow
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
            piecesWorldMatrixParams[selectedPieceIndex][0] -= 0.025;
        break;

      case 39: 	// Right arrow
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
            piecesWorldMatrixParams[selectedPieceIndex][0] += 0.025;
        break;

      case 38:	// Up arrow
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
            piecesWorldMatrixParams[selectedPieceIndex][1] += 0.025;
        break;

      case 40:	// Down arrow
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
            piecesWorldMatrixParams[selectedPieceIndex][1] -= 0.025;
        break;
//
      case 90: //Z
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
          piecesWorldMatrixParams[selectedPieceIndex][3] -= 45.0;
        break;

      case 88: //X
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
            piecesWorldMatrixParams[selectedPieceIndex][3] += 45.0;
        break;

      case 32: //space
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
            piecesWorldMatrixParams[selectedPieceIndex][4] = - piecesWorldMatrixParams[selectedPieceIndex][4];
          break;
    }

    keys[e.keyCode] = false;
  }
}



//updates position of object into objectOrientation[objectIndex] = {x, y, angle}
//then stores the WorldMatrix into objectWorldMatrix[objectIndex] = MakeWorld(newX, newY, 0.0, 0.0, 0.0, newAngle, objectsInitialScale)
function movePiece(pieceIndex, newX, newY, newAngle) {

  piecesWorldMatrix[0] = utils.MakeWorld()
}

function getWorldMatrixValues(pieceIndex) {
  var worldMatrix = piecesWorldMatrix[pieceIndex]
  return [worldMatrix[0], worldMatrix[1], worldMatrix[2], worldMatrix[3], worldMatrix[4]]
}

function updateTransformationMatrices(pieceIndex) {
  if (pieceIndex < 7) {
    updateModel(pieceIndex);
  }
  // updateView();
  // updatePerspective();
}

function updateModel(pieceIndex) {
  let worldParams = piecesWorldMatrixParams[pieceIndex];
  piecesWorldMatrix[pieceIndex] = utils.MakeWorld(
      worldParams[0],
      worldParams[1],
      worldParams[2],
      worldParams[3],
      worldParams[4],
      worldParams[5],
      worldParams[6]
  );

  piecesWorldMatrix[pieceIndex] = utils.multiplyMatrices(translate, piecesWorldMatrix[pieceIndex]);
}

var isMovingPiece = false;

var didMouseDown = function (e) {
  let mouseWorldCoordinates = getMousePosition(canvas, e);
  console.log(event.clientX);
  console.log(event.screenX);
  //isMovingPiece = true;
}

var didMoveMouse = function (e) {
    if (isMovingPiece === true) {
        let params = piecesWorldMatrixParams[selectedPieceIndex];
        let movement = scaleMouseDelta(e);
        params[0] += movement.deltaX;
        params[1] -= movement.deltaY;
    }
}

var didMouseUp = function (e) {
  isMovingPiece = false;
}

function scaleMouseDelta(event) {

  let deltaX = event.movementX  * 20 / canvas.width;
  let deltaY = event.movementY * 20 / canvas.height * (canvas.height / canvas.width);
  return {
    deltaX: deltaX,
    deltaY: deltaY
  };
}

//computes where the click in world coord and returns {xClicked, yClicked}
function getMousePosition(canvas, event) {
  //click position in the canvas element (from top left corner)
  let xCanvas = event.clientX;
  let yCanvas = event.clientY;

  //remove scrolldown-scrollleft offset
  let xOffset = getBodySize().width - window.pageXOffset - canvas.width;
  let yOffset = getBodySize().height - window.pageYOffset - canvas.height;

  let realX = xCanvas - xOffset;
  let realY = yCanvas - yOffset;

  //centering + remap to interval [-1,1]
  let xPressed = (realX - canvas.width / 2.0) / canvas.width;
  let yPressed = (realY - canvas.height / 2.0) / canvas.height;
  //transformation from screen to world coordinates
  let worldScaleX = 8;
  let worldScaleY = 8 * (canvas.height / canvas.width);  //worldWidth * (aspectRatio)^-1

  //rescaling on the world size + y-axis inversion
  xPressed = xPressed * worldScaleX;
  yPressed = -yPressed * worldScaleY;

  return {
    xClicked: xPressed,
    yClicked: yPressed
  };

  //inner function: get the body width & height
  function getBodySize() {
    //cross browser version
    var limitH = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,
        document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    var limitW = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth,
        document.documentElement.scrollWidth, document.documentElement.offsetWidth);

    return {
      width: limitW,
      height: limitH
    };
  }
}

