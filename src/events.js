(function () {

  var selectShape = document.getElementById("selectShape");
  selectShape.innerText = selectedTarget.name;
  selectShape.onchange = function () {
    idSelectedTarget = document.getElementById("selectShape").value;
    selectedTarget = targets[idSelectedTarget];
    userHasSurrendered = false;
    initPositions();
  }
  for (var i = 0; i < targets.length; i++) {
    var optionToInsert = document.createElement("option");
    optionToInsert.setAttribute("value", i);
    optionToInsert.innerText = targets[i].name;
    selectShape.appendChild(optionToInsert);
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  document.getElementById("dirLightEnable").addEventListener("change", () => {
    if (document.getElementById("dirLightEnable").checked) {
      lightSwitch[0] = 1;
    } else {
      lightSwitch[0] = 0;
    }
  });

  document.getElementById("pointLightEnable").addEventListener("change", () => {
    if (document.getElementById("pointLightEnable").checked) {
      lightSwitch[1] = 1;
    } else {
      lightSwitch[1] = 0;
    }
  });

  document.getElementById("spotLightEnable").addEventListener("change", () => {
    if (document.getElementById("spotLightEnable").checked) {
      lightSwitch[2] = 1;
    } else {
      lightSwitch[2] = 0;
    }
  });

  document.getElementById("dirSlider1").addEventListener("input", (e) => {
    dirLightAlpha = utils.degToRad(e.target.value * 90);
    directionalLightDir = [
      Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
      Math.sin(dirLightAlpha),
      Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
    ];
  });

  document.getElementById("dirSlider2").addEventListener("input", (e) => {
    dirLightBeta = utils.degToRad(e.target.value * 360);
    directionalLightDir = [
      Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
      Math.sin(dirLightAlpha),
      Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
    ];
  });

  document.getElementById("pointSlider1").addEventListener("input", (e) => {
    pointLightPosition[0] = e.target.value * 40 - 20;
  });

  document.getElementById("pointSlider2").addEventListener("input", (e) => {
    pointLightPosition[1] = e.target.value * 40 - 20;
  });

  document.getElementById("spotSlider1").addEventListener("input", (e) => {
    spotLightTheta = utils.degToRad(e.target.value * 90);
    spotLightDir = [Math.cos(spotLightPhi) * Math.sin(spotLightTheta),
      Math.sin(spotLightPhi) * Math.sin(spotLightTheta),
      Math.cos(spotLightTheta)];
  });

  document.getElementById("spotSlider2").addEventListener("input", (e) => {
    spotLightPhi = utils.degToRad(e.target.value * 360);
    spotLightDir = [Math.cos(spotLightPhi) * Math.sin(spotLightTheta),
      Math.sin(spotLightPhi) * Math.sin(spotLightTheta),
      Math.cos(spotLightTheta)];
  });

  document.getElementById("spotSlider3").addEventListener("input", (e) => {
    spotLightConeIn = e.target.value * spotLightConeOut;
  });

  document.getElementById("spotSlider4").addEventListener("input", (e) => {

    spotLightConeOut = e.target.value * 180;

    if (spotLightConeOut <= spotLightConeIn)
      spotLightConeIn = spotLightConeOut;
  });

  document.getElementById("spotSlider5").addEventListener("input", (e) => {
    spotLightDecay = e.target.value * 2;
  });

  document.getElementById("dirColor").addEventListener("change", (e) => {
    var rgbcol = hexToRgb(e.target.value);
    directionalLightColor = [rgbcol.r / 255, rgbcol.g / 255, rgbcol.b / 255, 1.0];
  });

  document.getElementById("pointColor").addEventListener("change", (e) => {
    var rgbcol = hexToRgb(e.target.value);
    pointLightColor = [rgbcol.r / 255, rgbcol.g / 255, rgbcol.b / 255, 1.0];
  });

  document.getElementById("spotColor").addEventListener("change", (e) => {
    var rgbcol = hexToRgb(e.target.value);
    spotLightColor = [rgbcol.r / 255, rgbcol.g / 255, rgbcol.b / 255, 1.0];
  });

  document.getElementById("checkBtn").addEventListener("click", () => {
    if (userHasSurrendered) {
      window.alert("You can't win after having surrendered")
      return;
    }
    var correct = checkSolution();
    if(correct)
      window.alert("Soluzione Corretta");
    else
      window.alert("Soluzione Sbagliata");
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    console.log("PRESS RESET BUTTON")
    userHasSurrendered = false;
    selectedPieceIndex = -1;
    initPositions();
  });

  document.getElementById("surrenderBtn").addEventListener("click", () => {
    if (!userHasSurrendered) {
      userHasSurrendered = true;
      piecesMaterialColor = surrenderPiecesMaterialColor;
    }
  });

})();

var selectedPieceIndex = 0;
var keys = [];
var didPressKey = function (e) {
  if (!keys[e.keyCode]) {
    keys[e.keyCode] = true;
    switch (e.keyCode) {

      case 49: // piece0
        selectedPieceIndex = 0;
        break;

      case 50: // piece1
        selectedPieceIndex = 1;
        break;

      case 51: // piece2
        selectedPieceIndex = 2;
        break;

      case 52: // piece3
        selectedPieceIndex = 3;
        break;

      case 53: // piece4
        selectedPieceIndex = 4;
        break;

      case 54: // piece5
        selectedPieceIndex = 5;
        break;

      case 55: // piece6
        selectedPieceIndex = 6;
        break;

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

      case 90: // Z
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
          piecesWorldMatrixParams[selectedPieceIndex][3] -= 45.0;
        break;

      case 88: // X
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
          piecesWorldMatrixParams[selectedPieceIndex][3] += 45.0;
        break;

      case 32: // Space
        if (selectedPieceIndex >= 0 && selectedPieceIndex < pieces.length)
          if (selectedPieceIndex !== 3) {
            piecesWorldMatrixParams[selectedPieceIndex][3] += 180.0;
          } else {
            piecesWorldMatrixParams[selectedPieceIndex][4] = -piecesWorldMatrixParams[selectedPieceIndex][4];
          }
        break;
    }
    keys[e.keyCode] = false;
  }
}


//updates position of object into objectOrientation[objectIndex] = {x, y, angle}
//then stores the WorldMatrix into objectWorldMatrix[objectIndex] = MakeWorld(newX, newY, 0.0, 0.0, 0.0, newAngle, objectsInitialScale)
//function movePiece(pieceIndex, newX, newY, newAngle) {
//
//    //todo
//  piecesWorldMatrix[0] = utils.MakeWorld()
//}

function getWorldMatrixValues(pieceIndex) {
  var worldMatrix = createPieceWorldMatrix(pieceIndex)
  return [worldMatrix[0], worldMatrix[1], worldMatrix[2], worldMatrix[3], worldMatrix[4]]
}

var isMovingPiece = false;

var didMouseDown = function (e) {
  if (selectedPieceIndex != -1) {
    piecesWorldMatrixParams[selectedPieceIndex][2] = -0.10
  }

  mouseClicked = 1.0;
  drawPieces();

  let mouse = getMousePosition(e);
  pixel = new Uint8Array(4); // A single RGBA value
  gl.readPixels(mouse.x, mouse.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

  if (pixel[3] > 255 - 7) {
    selectedPieceIndex = 255 - pixel[3];
     piecesWorldMatrixParams[selectedPieceIndex][2] = -0.093;
    isMovingPiece = true;
  } else {
    selectedPieceIndex = -1;
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
  let deltaX = event.movementX * 30 / canvas.width;
  let deltaY = event.movementY * 30 / canvas.height * (canvas.height / canvas.width);
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