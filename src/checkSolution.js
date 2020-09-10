var translations = Array();
var rotation = Array();

var precision = 0.5;

var i;

function sumArrays(v1, v2) {
  var i;
  var sum = [];
  for (i = 0; i < 3; i++) {
    sum[i] = v1[i] + v2[i];
  }
  return sum;
}

function subArrays(v1, v2) {
  var i;
  var sum = [];
  for (i = 0; i < 3; i++) {
    sum[i] = v1[i] - v2[i];
  }
  return sum;
}

function transDiff(index1, index2) {
  return [
    solutionParams[index1][0] - piecesWorldMatrixParams[index2][0],
    solutionParams[index1][1] - piecesWorldMatrixParams[index2][1],
    solutionParams[index1][2] - piecesWorldMatrixParams[index2][2]
  ]
}

var solutionParams = Array();

function length3DVector(vector) {
  return Math.sqrt(
    Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
  )
}

function checkSolution() {
  var i;
  var j;
  //group translations and rotations of the correct solution
  for (i = 0; i < piecesNumber; i++) {
    solutionParams[i] = createParamsFromMatrix(solutionMatrix(i));

    //fix rotations so that they are in range 0 - 360
    //if the rotation is negative, make it positive
    for (j = 3; j < 6; j++) {
      piecesWorldMatrixParams[i][j] = piecesWorldMatrixParams[i][j] % 360.0

      if (piecesWorldMatrixParams[i][j] < 0) {
        piecesWorldMatrixParams[i][j] = 360.0 + piecesWorldMatrixParams[i][j]
      }

      if (solutionParams[i][j] < 0) {
        solutionParams[i][j] = 360.0 + solutionParams[i][j]
      }
    }
  }

  return checkTranslations() && checkRotations();
}

function checkTranslations() {
  if (
    (length3DVector(transDiff(0, 0)) >= precision &&
      length3DVector(transDiff(0, 6)) >= precision) || (length3DVector(transDiff(6, 0)) >= precision &&
    length3DVector(transDiff(6, 6)) >= precision) ||
    (length3DVector(transDiff(2, 2)) >= precision &&
      length3DVector(transDiff(2, 5)) >= precision) || (length3DVector(transDiff(5, 2)) >= precision &&
    length3DVector(transDiff(5, 5)) >= precision) ||
    length3DVector(transDiff(1, 1)) >= precision ||
    length3DVector(transDiff(3, 3)) >= precision || length3DVector(transDiff(4, 4)) >= precision
  ) {
    return false;
  }
  return true;
}

function checkRotations() {
  let bigTriangleSolution0 = [
    (initialPosition[0].rx + selectedTarget.rotation[0][0]) % 360,
    (initialPosition[0].rx + selectedTarget.rotation[0][1]) % 360
  ];
  let bigTriangleSolution6 = [
    (initialPosition[6].rx + selectedTarget.rotation[6][1]) % 360,
    (initialPosition[6].rx + selectedTarget.rotation[6][0]) % 360
  ];
  let bigTriangleIndex = -1;

  let smallTriangleSolution2 = [
    (initialPosition[2].rx + selectedTarget.rotation[2][0]) % 360,
    (initialPosition[2].rx + selectedTarget.rotation[2][1]) % 360
  ];
  let smallTriangleSolution5 = [
    (initialPosition[5].rx + selectedTarget.rotation[5][1]) % 360,
    (initialPosition[5].rx + selectedTarget.rotation[5][0]) % 360
  ];
  var smallTriangleIndex = -1;
  for (i = 0; i < piecesNumber; i++) {
    switch (i) {
      case 0: //big triangle
        let xRotationBig0 = piecesWorldMatrixParams[i][3] % 360;
        if (xRotationBig0 === bigTriangleSolution0[0]) {
          bigTriangleIndex = 1;
          break;
        }
        if (xRotationBig0 === bigTriangleSolution0[1]) {
          bigTriangleIndex = 0;
          break;
        }
        return false;

      case 6: //big triangle
        let xRotationBig6 = piecesWorldMatrixParams[i][3] % 360;
        if (xRotationBig6 === bigTriangleSolution6[bigTriangleIndex]) {
          break;
        }
        return false;

      case 1: //middle triangle
        let xRotation = piecesWorldMatrixParams[i][3] % 360;
        let yRotation = piecesWorldMatrixParams[i][4] % 360;
        if (xRotation !== solutionParams[1][3] || yRotation !== solutionParams[1][4])
          return false
        break;

      case 2: //small triangle
        let xRotationSmall2 = piecesWorldMatrixParams[i][3] % 360;
        if (xRotationSmall2 === smallTriangleSolution2[0]) {
          smallTriangleIndex = 1;
          break;
        }
        if (xRotationSmall2 === smallTriangleSolution2[1]) {
          smallTriangleIndex = 0;
          break;
        }
        return false;

      case 5: //small triangle
        let xRotationSmall5 = piecesWorldMatrixParams[i][3] % 360;
        if (xRotationSmall5 === smallTriangleSolution5[smallTriangleIndex]) {
          break;
        }
        return false;

      case 3: //trapezoid
        console.log(piecesWorldMatrixParams[i][4])
        let xRotationTrap = piecesWorldMatrixParams[i][3] % 180;
        if (xRotationTrap !== (solutionParams[3][3])%180) {
          return false;
        }
        if ((piecesWorldMatrixParams[i][4] <= 180) !== !selectedTarget.mirror) {
          break;
        }
        return false;

      case 4: //square
        if (piecesWorldMatrixParams[i][3] % 2 !== solutionParams[4][3] % 2)
          return false
        break;
    }
  }
  return true;
}