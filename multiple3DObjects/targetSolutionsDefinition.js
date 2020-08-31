//swan, cat, heart, rabbit, dancing man

var targets = [
    {
        name: "swan",
        translations: [
            [5.0, 1.0, 0.0],
            [5.0, 1.0, 0.0],
            [4.59, 4.59, 0.0],
            [5.59, 1.59, 0.0],
            [4.59, 1.59, 0.0],
            [3.59, 1.59, 0.0],
            [5.0, 1.0, 0.0],
        ],
        rotation: [
            [135.0],
            [135.0],
            [-135.0],
            [0.0],
            [0.0],
            [90.0],
            [0.0]
        ],
        mirror: false
    }, 
    {
        name: "cat",
        translations: [
            [3.0, -2.5, 0.0],
            [3.83, 2.33, 0.0],
            [2.5, 5.0, 0.0],
            [5.83, -2.5, 0.0],
            [3.5, 3.0, 0.0],
            [4.5, 3.0, 0.0],
            [3.83, -1.67, 0.0]
        ],
        rotation: [
            [45.0],
            [135.0],
            [180.0], 
            [90.0], 
            [0.0],
            [-90.0],
            [-90.0]
        ],
        mirror: false,
    },
    {
        name: "camel",
        translations: [],
        rotation: [],
        mirror: false,
    },
    
    {
        name: "turtle",
        translations: [],
        rotation: [],
        mirror: false,
    }
];

export {targets};