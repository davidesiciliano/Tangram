var solutionMatrices = [
    solutionMatrix(0),
    solutionMatrix(1),
    solutionMatrix(2),
    solutionMatrix(3),
    solutionMatrix(4),
    solutionMatrix(5),
    solutionMatrix(6)
]

var translations = Array();
var rotation = Array();

var precision = 0.1;

var i;

function sumArrays(v1, v2) {
      var i;
        var sum = [];
        for(i=0; i<3; i++) {
            sum[i] = v1[i] + v2[i];
        }
    return sum;
}

function subArrays(v1, v2) {
      var i;
        var sum = [];
        for(i=0; i<3; i++) {
            sum[i] = v1[i] - v2[i];
        }
    return sum;
}


function checkSolution(selectedTarget) {
    for (i = 0; i < 7; i++) {
        translations[i] = [
            piecesWorldMatrix[i][3], piecesWorldMatrix[i][7], piecesWorldMatrix[i][11]
        ]
        
    }
    
    console.log(translations)
    
    return false; 
}

