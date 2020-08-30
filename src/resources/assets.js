/*      name: //Rappresenta il nome del pezzo
        type: //Indica se è un triangolo o un quadrilatero
        structInfo: {
            vertices: [],
            normals: [],
            indices: [],
            vertices2D: [],
            indices2D: []
        },
        drawInfo: {
            worldParams: [], //Array di 7 elementi che contiene le traslazioni, rotazioni e scaling del pezzo
            worldMatrixSolution: [], //Matrice world del pezzo nella soluzione (overlay)
            vao: [],
            vaoOverlay: [],
            ambientColor: [], //Vettore tridimensionale contenente il colore rgb
        }
*/
let assetsData = [
  {
    name: "T1",
    type: AssetType.TRIANGLE,
    structInfo: {
      vertices: [
        -1.0 / 3, -1.0 / 3, -0.05,
        2.0 / 3, -1.0 / 3, -0.05,
        -1.0 / 3, 2.0 / 3, -0.05,
        -1.0 / 3, -1.0 / 3, 0.05,
        2.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, 2.0 / 3, 0.05,
        -1.0 / 3, -1.0 / 3, -0.05,
        -1.0 / 3, -1.0 / 3, 0.05,
        2.0 / 3, -1.0 / 3, -0.05,
        2.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, -1.0 / 3, -0.05,
        -1.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, 2.0 / 3, -0.05,
        -1.0 / 3, 2.0 / 3, 0.05,
        2.0 / 3, -1.0 / 3, -0.05,
        2.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, 2.0 / 3, -0.05,
        -1.0 / 3, 2.0 / 3, 0.05
      ],
      normals: [
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0
      ],
      indices: [
        0, 2, 1,
        3, 4, 5,
        8, 7, 6,
        7, 8, 9,
        10, 11, 12,
        13, 12, 11,
        16, 15, 14,
        15, 16, 17
      ],
      vertices2D: [
        -1.0 / 3, -1.0 / 3, 0.0,
        2.0 / 3, -1.0 / 3, 0.0,
        -1.0 / 3, 2.0 / 3, 0.0,
      ],
      indices2D: [
        0, 2, 1,
      ]
    },
    drawInfo: {
      worldParams: [],
      worldMatrixSolution: [],
      vao: [],
      vaoOverlay: [],
      ambientColor: [0.0, 0.0, 1.0],
    },
  },
  {
    name: "T2",
    type: AssetType.TRIANGLE,
    structInfo: {
      vertices: [
        -1.0 / 3, -1.0 / 3, -0.05,
        2.0 / 3, -1.0 / 3, -0.05,
        -1.0 / 3, 2.0 / 3, -0.05,
        -1.0 / 3, -1.0 / 3, 0.05,
        2.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, 2.0 / 3, 0.05,
        -1.0 / 3, -1.0 / 3, -0.05,
        -1.0 / 3, -1.0 / 3, 0.05,
        2.0 / 3, -1.0 / 3, -0.05,
        2.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, -1.0 / 3, -0.05,
        -1.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, 2.0 / 3, -0.05,
        -1.0 / 3, 2.0 / 3, 0.05,
        2.0 / 3, -1.0 / 3, -0.05,
        2.0 / 3, -1.0 / 3, 0.05,
        -1.0 / 3, 2.0 / 3, -0.05,
        -1.0 / 3, 2.0 / 3, 0.05
      ],
      normals: [
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0
      ],
      indices: [
        0, 2, 1,
        3, 4, 5,
        8, 7, 6,
        7, 8, 9,
        10, 11, 12,
        13, 12, 11,
        16, 15, 14,
        15, 16, 17
      ],
      vertices2D: [
        -1.0 / 3, -1.0 / 3, 0.0,
        2.0 / 3, -1.0 / 3, 0.0,
        -1.0 / 3, 2.0 / 3, 0.0,
      ],
      indices2D: [
        0, 2, 1,
      ]

    },
    drawInfo: {
      worldParams: [],
      worldMatrixSolution: [],
      vao: [],
      vaoOverlay: [],
      ambientColor: [0.0, 1.0, 0.0],

    },
  },
  {
    name: "T3",
    type: AssetType.TRIANGLE,
    structInfo: {
      vertices: [
        -1.0 / 6, -1.0 / 6, -0.05,
        1.0 / 3, -1.0 / 6, -0.05,
        -1.0 / 6, 1.0 / 3, -0.05,
        -1.0 / 6, -1.0 / 6, 0.05,
        1.0 / 3, -1.0 / 6, 0.05,
        -1.0 / 6, 1.0 / 3, 0.05,
        -1.0 / 6, -1.0 / 6, -0.05,
        -1.0 / 6, -1.0 / 6, 0.05,
        1.0 / 3, -1.0 / 6, -0.05,
        1.0 / 3, -1.0 / 6, 0.05,
        -1.0 / 6, -1.0 / 6, -0.05,
        -1.0 / 6, -1.0 / 6, 0.05,
        -1.0 / 6, 1.0 / 3, -0.05,
        -1.0 / 6, 1.0 / 3, 0.05,
        1.0 / 3, -1.0 / 6, -0.05,
        1.0 / 3, -1.0 / 6, 0.05,
        -1.0 / 6, 1.0 / 3, -0.05,
        -1.0 / 6, 1.0 / 3, 0.05
      ],
      normals: [
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0
      ],
      indices: [
        0, 2, 1,
        3, 4, 5,
        8, 7, 6,
        7, 8, 9,
        10, 11, 12,
        13, 12, 11,
        16, 15, 14,
        15, 16, 17
      ],
      vertices2D: [
        -1.0 / 6, -1.0 / 6, 0.0,
        1.0 / 3, -1.0 / 6, 0.0,
        -1.0 / 6, 1.0 / 3, 0.0,
      ],
      indices2D: [
        0, 2, 1,
      ]

    },
    drawInfo: {
      worldParams: [],
      worldMatrixSolution: [],
      vao: [],
      vaoOverlay: [],
      ambientColor: [1.0, 1.0, 0.0],

    },
  },
  {
    name: "T4",
    type: AssetType.TRIANGLE,
    structInfo: {
      vertices: [
        -1.0 / 6, -1.0 / 6, -0.05,
        1.0 / 3, -1.0 / 6, -0.05,
        -1.0 / 6, 1.0 / 3, -0.05,
        -1.0 / 6, -1.0 / 6, 0.05,
        1.0 / 3, -1.0 / 6, 0.05,
        -1.0 / 6, 1.0 / 3, 0.05,
        -1.0 / 6, -1.0 / 6, -0.05,
        -1.0 / 6, -1.0 / 6, 0.05,
        1.0 / 3, -1.0 / 6, -0.05,
        1.0 / 3, -1.0 / 6, 0.05,
        -1.0 / 6, -1.0 / 6, -0.05,
        -1.0 / 6, -1.0 / 6, 0.05,
        -1.0 / 6, 1.0 / 3, -0.05,
        -1.0 / 6, 1.0 / 3, 0.05,
        1.0 / 3, -1.0 / 6, -0.05,
        1.0 / 3, -1.0 / 6, 0.05,
        -1.0 / 6, 1.0 / 3, -0.05,
        -1.0 / 6, 1.0 / 3, 0.05
      ],
      normals: [
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0
      ],
      indices: [
        0, 2, 1,
        3, 4, 5,
        8, 7, 6,
        7, 8, 9,
        10, 11, 12,
        13, 12, 11,
        16, 15, 14,
        15, 16, 17
      ],
      indices: [
        0, 2, 1,
        3, 4, 5,
        8, 7, 6,
        7, 8, 9,
        10, 11, 12,
        13, 12, 11,
        16, 15, 14,
        15, 16, 17
      ],
      vertices2D: [
        -1.0 / 6, -1.0 / 6, 0.0,
        1.0 / 3, -1.0 / 6, 0.0,
        -1.0 / 6, 1.0 / 3, 0.0,
      ],
      indices2D: [
        0, 2, 1,
      ]
    },
    drawInfo: {
      worldParams: [],
      worldMatrixSolution: [],
      vao: [],
      vaoOverlay: [],
      ambientColor: [1.0, 192.0 / 255, 203.0 / 255],


    },
  },
  {
    name: "T5",
    type: AssetType.TRIANGLE,
    structInfo: {
      vertices: [
        -Math.sqrt(2) / 6, -Math.sqrt(2) / 6, -0.05,
        Math.sqrt(2) / 3, -Math.sqrt(2) / 6, -0.05,
        -Math.sqrt(2) / 6, Math.sqrt(2) / 3, -0.05,
        -Math.sqrt(2) / 6, -Math.sqrt(2) / 6, 0.05,
        Math.sqrt(2) / 3, -Math.sqrt(2) / 6, 0.05,
        -Math.sqrt(2) / 6, Math.sqrt(2) / 3, 0.05,
        -Math.sqrt(2) / 6, -Math.sqrt(2) / 6, -0.05,
        -Math.sqrt(2) / 6, -Math.sqrt(2) / 6, 0.05,
        Math.sqrt(2) / 3, -Math.sqrt(2) / 6, -0.05,
        Math.sqrt(2) / 3, -Math.sqrt(2) / 6, 0.05,
        -Math.sqrt(2) / 6, -Math.sqrt(2) / 6, -0.05,
        -Math.sqrt(2) / 6, -Math.sqrt(2) / 6, 0.05,
        -Math.sqrt(2) / 6, Math.sqrt(2) / 3, -0.05,
        -Math.sqrt(2) / 6, Math.sqrt(2) / 3, 0.05,
        Math.sqrt(2) / 3, -Math.sqrt(2) / 6, -0.05,
        Math.sqrt(2) / 3, -Math.sqrt(2) / 6, 0.05,
        -Math.sqrt(2) / 6, Math.sqrt(2) / 3, -0.05,
        -Math.sqrt(2) / 6, Math.sqrt(2) / 3, 0.05
      ],
      normals: [
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0
      ],
      indices: [
        0, 2, 1,
        3, 4, 5,
        8, 7, 6,
        7, 8, 9,
        10, 11, 12,
        13, 12, 11,
        16, 15, 14,
        15, 16, 17
      ],
      vertices2D: [
        -Math.sqrt(2) / 6, -Math.sqrt(2) / 6, 0.0,
        Math.sqrt(2) / 3, -Math.sqrt(2) / 6, 0.0,
        -Math.sqrt(2) / 6, Math.sqrt(2) / 3, 0.0,
      ],
      indices2D: [
        0, 2, 1,
      ]
    },
    drawInfo: {
      worldParams: [],
      worldMatrixSolution: [],
      vao: [],
      vaoOverlay: [],
      ambientColor: [1.0, 0.0, 0.0],

    },
  },
  {
    name: "S",
    type: AssetType.QUADRILATERAL,
    structInfo: {
      vertices: [
        -0.25, -0.25, -0.05,
        0.25, -0.25, -0.05,
        0.25, 0.25, -0.05,
        -0.25, 0.25, -0.05,
        -0.25, -0.25, 0.05,
        0.25, -0.25, 0.05,
        0.25, 0.25, 0.05,
        -0.25, 0.25, 0.05,
        -0.25, -0.25, -0.05,
        -0.25, -0.25, 0.05,
        -0.25, 0.25, -0.05,
        -0.25, 0.25, 0.05,
        0.25, -0.25, -0.05,
        0.25, -0.25, 0.05,
        0.25, 0.25, -0.05,
        0.25, 0.25, 0.05,
        -0.25, -0.25, -0.05,
        -0.25, -0.25, 0.05,
        0.25, -0.25, -0.05,
        0.25, -0.25, 0.05,
        -0.25, 0.25, -0.05,
        -0.25, 0.25, 0.05,
        0.25, 0.25, -0.05,
        0.25, 0.25, 0.05
      ],
      normals: [
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0
      ],
      indices: [
        0, 2, 1,
        0, 3, 2,
        4, 5, 6,
        4, 6, 7,
        8, 9, 10,
        10, 9, 11,
        13, 12, 14,
        13, 14, 15,
        17, 16, 18,
        17, 18, 19,
        20, 21, 22,
        22, 21, 23
      ],
      vertices2D: [
        -0.25, -0.25, 0.0,
        0.25, -0.25, 0.0,
        0.25, 0.25, 0.0,
        -0.25, 0.25, 0.0
      ],
      indices2D: [
        0, 2, 1,
        0, 3, 2
      ]
    },
    drawInfo: {
      worldParams: [],
      worldMatrixSolution: [],
      vao: [],
      vaoOverlay: [],
      ambientColor: [128.0 / 255, 0.0, 128.0 / 255]


    },
  },
  {
    name: "P",
    type: AssetType.QUADRILATERAL,
    structInfo: {
      vertices: [
        -Math.sqrt(2) / 8, -Math.sqrt(2) / 8, -0.05,
        3 * Math.sqrt(2) / 8, -Math.sqrt(2) / 8, -0.05,
        Math.sqrt(2) / 8, Math.sqrt(2) / 8, -0.05,
        -3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, -0.05,

        -Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.05,
        3 * Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.05,
        Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.05,
        -3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.05,

        -Math.sqrt(2) / 8, -Math.sqrt(2) / 8, -0.05,
        -Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.05,
        -3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, -0.05,
        -3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.05,

        3 * Math.sqrt(2) / 8, -Math.sqrt(2) / 8, -0.05,
        3 * Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.05,
        Math.sqrt(2) / 8, Math.sqrt(2) / 8, -0.05,
        Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.05,

        -Math.sqrt(2) / 8, -Math.sqrt(2) / 8, -0.05,
        -Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.05,
        3 * Math.sqrt(2) / 8, -Math.sqrt(2) / 8, -0.05,
        3 * Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.05,

        -3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, -0.05,
        -3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.05,
        Math.sqrt(2) / 8, Math.sqrt(2) / 8, -0.05,
        Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.05
      ],
      normals: [
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        -Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0.0,
        -Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0.0,
        -Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0.0,
        -Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0
      ],
      indices: [
        0, 2, 1,
        0, 3, 2,
        4, 5, 6,
        4, 6, 7,
        8, 9, 10,
        10, 9, 11,
        13, 12, 14,
        13, 14, 15,
        17, 16, 18,
        17, 18, 19,
        20, 21, 22,
        22, 21, 23
      ],
      vertices2D: [
        -Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.0,
        3 * Math.sqrt(2) / 8, -Math.sqrt(2) / 8, 0.0,
        Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.0,
        -3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, 0.0,
      ],
      indices2D: [
        0, 2, 1,
        0, 3, 2
      ]
    },
    drawInfo: {
      worldParams: [],
      worldMatrixSolution: [],
      vao: [],
      vaoOverlay: [],
      ambientColor: [1.0, 165.0 / 255, 0.0],


    },
  },
]

let assetsFloor = {

  structInfo: {
    vertices:
      [
        -10.0, 6.0, - 0.15,
        -10.0, 6.0, -0.05,
        10.0, 6.0, -0.05,
        10.0, 6.0, -0.15,

        -10.0, 6.0, -0.05,
        -10.0, -6.0, -0.05,
        -10.0, -6.0, -0.15,
        -10.0, 6.0, -0.15,

        10.0, 6.0, -0.05,
        10.0, -6.0, -0.05,
        10.0, -6.0, - 0.15,
        10.0, 6.0, -0.15,

        10.0, 6.0, - 0.05,
        10.0, -6.0, - 0.05,
        -10.0, -6.0, -0.05,
        -10.0, 6.0, -0.05,

        10.0, 6.0, -0.15,
        10.0, -6.0, -0.15,
        -10.0, -6.0, -0.15,
        -10.0, 6.0, -0.15,

        -10.0, -6.0, -0.15,
        -10.0, -6.0, -0.05,
        10.0, -6.0, -0.05,
        10.0, -6.0, -0.15
      ],
    normals: [
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,

      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,

      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,

      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,

      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0
    ],
    indices:
      [
        // Top
        0, 1, 2,
        0, 2, 3,

        // Left
        5, 4, 6,
        6, 4, 7,

        // Right
        8, 9, 10,
        8, 10, 11,

        // Front
        13, 12, 14,
        15, 14, 12,

        // Back
        16, 17, 18,
        16, 18, 19,

        // Bottom
        21, 20, 22,
        22, 20, 23
      ],
    uv:
      [
        // Top
        0, 1,
        0, 1,
        1, 1,
        1, 0,
        // Left
        0, 0,
        1, 0,
        1, 1,
        0, 1,
        // Right
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        // Front
        5, 3,
        5, 0,
        0, 0,
        0, 3,
        // Back
        0, 0,
        0, 3,
        5, 3,
        5, 0,
        // Bottom
        1, 1,
        1, 0,
        0, 0,
        0, 1
      ],
  },
  drawInfo: {
    worldParams: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    worldMatrix: [],
    texture: null,
    vao: [],

  }
}