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

  //return checkTranslations() && checkRotations();
  return checkRotations();
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
  let smallTriangleSolution2 = [225.0 , 180.0];
  let smallTriangleSolution5 = [315.0 , 270.0];
  var smallTriangleIndex = -1;
  for (i = 0; i < piecesNumber; i++) {
    if (i === 2 || i === 5) {
      switch (i) {
        case 0: //big triangles
        case 6:
          //TODO non controllare se solo uguali all'altro, ma se sono uguali alla rotazione che sarebbe necessaria per farli diventare uguali all'altro
          if (piecesWorldMatrixParams[i][3] !== solutionParams[0][3] && piecesWorldMatrixParams[i][3] !== solutionParams[6][3]) {
            console.log(i)
            console.log(piecesWorldMatrixParams[i])
            console.log(solutionParams[i])
            return false;
          }
          break;

        case 1: //middle triangle
          let xRotation = piecesWorldMatrixParams[i][3] % 360;
          let yRotation = piecesWorldMatrixParams[i][4] % 360;
          if (xRotation !== solutionParams[1][3] || yRotation !== solutionParams[1][4])
            return false
          break;

        case 2: //small triangles
          let xRotationSmall2 = piecesWorldMatrixParams[i][3] % 360;
          console.log("pezzo2 " + xRotationSmall2)
          if (xRotationSmall2 === smallTriangleSolution2[0]) {
            smallTriangleIndex = 1;
            break;
          }
          if (xRotationSmall2 === smallTriangleSolution2[1]) {
            smallTriangleIndex = 0;
            break;
          }
          return false;

        case 5:
          let xRotationSmall5 = piecesWorldMatrixParams[i][3] % 360;
          console.log("pezzo5 " + xRotationSmall5)
          if (xRotationSmall5 === smallTriangleSolution5[smallTriangleIndex]) {
            break;
          }
          return false;

        case 3: //trapezoid
          //TODO
          break;

        case 4: //square
          if (piecesWorldMatrixParams[i][3] % 2 !== solutionParams[4][3] % 2)
            return false
          break;
      }
    }
  }
  return true;
}