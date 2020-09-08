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
    var correct = checkSolution(selectedTarget);
    if (correct)
      window.alert("Incredibileeee! Rete! Che gol!");
    else
      window.alert("Prova il check... non va!");
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    console.log("PRESS RESET BUTTON")
    userHasSurrendered = false;
    //todo: settare elemento selezionato a null (o valore iniziale)
    initPositions();
  });

  document.getElementById("surrenderBtn").addEventListener("click", () => {
    console.log("PRESS SURRENDER BUTTON")
    if (!userHasSurrendered) {
      userHasSurrendered = true;
      piecesInSolutionPosition();
    }
  });

})();