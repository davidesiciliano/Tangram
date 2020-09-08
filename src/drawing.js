var mouseClicked = 0.0;

function main() {

  window.addEventListener("keydown", didPressKey, false);
  canvas.addEventListener("mousedown", didMouseDown);
  canvas.addEventListener('mousemove', didMoveMouse);
  canvas.addEventListener('mouseup', didMouseUp);

  initPositions();

  drawPieces();
  drawFloor()
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

    programs[ShadersType.pieces] = utils.createProgram(gl, vertexShader, fragmentShader);
  });

  await utils.loadFiles([shaderDir + 'floor/vs.glsl', shaderDir + 'floor/fs.glsl'], function (shaderText) {
    let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

    programs[ShadersType.floor] = utils.createProgram(gl, vertexShader, fragmentShader);
  });

  await loadModels();

  main();
}

window.onload = init;

//TODO: spostare tutto in events

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
          piecesWorldMatrixParams[selectedPieceIndex][4] = -piecesWorldMatrixParams[selectedPieceIndex][4];
        break;
    }

    keys[e.keyCode] = false;
  }
}


//updates position of object into objectOrientation[objectIndex] = {x, y, angle}
//then stores the WorldMatrix into objectWorldMatrix[objectIndex] = MakeWorld(newX, newY, 0.0, 0.0, 0.0, newAngle, objectsInitialScale)
function movePiece(pieceIndex, newX, newY, newAngle) {

  //todo
  piecesWorldMatrix[0] = utils.MakeWorld()
}

function getWorldMatrixValues(pieceIndex) {
  var worldMatrix = createPieceWorldMatrix(pieceIndex)
  return [worldMatrix[0], worldMatrix[1], worldMatrix[2], worldMatrix[3], worldMatrix[4]]
}

var isMovingPiece = false;

var didMouseDown = function (e) {
  if (selectedPieceIndex != -1) {
   // piecesWorldMatrixParams[selectedPieceIndex][2] = -0.10
  }

  mouseClicked = 1.0;
  drawPieces();

  let mouse = getMousePosition(e);
  pixel = new Uint8Array(4); // A single RGBA value
  gl.readPixels(mouse.x, mouse.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

  if (pixel[3] > 255 - 7) {
    selectedPieceIndex = 255 - pixel[3];
    // piecesWorldMatrixParams[selectedPieceIndex][2] = 0.0;
    isMovingPiece = true;
  }

  mouseClicked = 0.0;
  drawPieces();
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
  var rect = canvas.getBoundingClientRect();
  let deltaX = event.movementX * 20 / canvas.width;
  let deltaY = event.movementY * 20 / canvas.height * (canvas.height / canvas.width);
  return {
    deltaX: deltaX,
    deltaY: deltaY
  };
}

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  const pixelX = mouseX * gl.canvas.width / gl.canvas.clientWidth;
  const pixelY = gl.canvas.height - mouseY * gl.canvas.height / gl.canvas.clientHeight - 1;

  return {
    x: pixelX,
    y: pixelY
  };
}