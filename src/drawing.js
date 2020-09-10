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

