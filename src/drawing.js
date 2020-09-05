function main() {

  initPositions();
  drawPieces();

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
