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

function checkSolution(selectedTarget) {
  var i;
    var j;
    //group translations and rotations of the correct solution
    for(i = 0; i < 7; i++) {
        solutionParams[i] = createParamsFromMatrix(solutionMatrix(i));
        
        //fix rotations so that they are in range 0 - 360
        //if the rotation is negative, make it positive
        for (j = 3; j < 6; j++) {
            piecesWorldMatrixParams[i][j] = piecesWorldMatrixParams[i][j] % 360.0
            
            if(piecesWorldMatrixParams[i][j] < 0) {
                piecesWorldMatrixParams[i][j] = 360.0 + piecesWorldMatrixParams[i][j]
            }
            
            if(solutionParams[i][j] < 0) {
                solutionParams[i][j] = 360.0 + solutionParams[i][j]
            }
        }
    }
        //check translations
        if(
            (length3DVector(transDiff(0, 0)) >= precision &&
            length3DVector(transDiff(0, 6)) >= precision) || (length3DVector(transDiff(6, 0)) >= precision &&
            length3DVector(transDiff(6, 6)) >= precision) || 
            (length3DVector(transDiff(2, 2)) >= precision &&
            length3DVector(transDiff(2, 5)) >= precision) ||(length3DVector(transDiff(5, 2)) >= precision &&
            length3DVector(transDiff(5, 5)) >= precision) ||
            length3DVector(transDiff(1,1)) >= precision || 
            length3DVector(transDiff(3,3)) >= precision || length3DVector(transDiff(4,4)) >= precision
        )
            {
                return false;
            }
    
    //check rotations
    for(i = 0; i < 7; i++) {
        if(i === 0 || i === 6) {
            //todo non controllare se solo uguali all'altro, ma se sono uguali alla rotazione che sarebbe necessaria per farli diventare uguali all'altro
            if (piecesWorldMatrixParams[i][3] != solutionParams[0][3] && piecesWorldMatrixParams[i][3] != solutionParams[6][3]) {
                console.log(i)
                console.log(piecesWorldMatrixParams[i])
                console.log(solutionParams[i])
                return false;
            }
        }
        else if (i === 2 || i === 5) {
            //idem
            if (piecesWorldMatrixParams[i][3] != solutionParams[2][3] && piecesWorldMatrixParams[i][3] != solutionParams[5][3]) {
                
                console.log(i)
                console.log(piecesWorldMatrixParams[i])
                console.log(solutionParams[i])
                return false;
            }
        } else{
            //todo square, angoli equivalenti
            if(piecesWorldMatrixParams[i][3] != solutionParams[i][3]) {
                
                console.log(i)
                console.log(piecesWorldMatrixParams[i])
                console.log(solutionParams[i])
                return false;
            }}
        
    
        
    }
    
    //check mirror of parallelogram
    
  return true;
}

