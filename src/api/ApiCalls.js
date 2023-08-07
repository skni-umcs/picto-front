export function getImagesLength(){
    return 4;
}

export function getImages(){
    return [ //throws an error but these are only placeholder values
        {value: "elephant", path: "images/elephant.png", chosen: false},
        {value: "kettle", path: "images/kettle.png", chosen: true},
        {value: "grass", path: "images/grass.png", chosen: false},
        {value: "knife", path: "images/knife.png", chosen: false}
    ]
}

export function getSelectionWidth(){
    return 3;
}

export function getSelectionHeight(){
    return 3;
}

export function getSelectionSymbols(){ 
return [ //throws an error but these are only placeholder values
        [{value: "black", path: "symbols/colors/black.png"}, {value: "white", path: "symbols/colors/white.png"}, {value: "gray", path: "symbols/colors/gray.png"}],
        [{value: "one", path: "symbols/numbers/one.png"}, {value: "two", path: "symbols/numbers/two.png"}, {value: "three", path: "symbols/numbers/three.png"}],
        [{value: "circle", path: "symbols/shapes/circle.png"}, {value: "square", path: "symbols/shapes/square.png"}, {value: "triangle", path: "symbols/shapes/triangle.png"}]
    ];
}

export function getSelectedSymbols(){
    return [{value: "black", path: "symbols/colors/black.png"},{value: "two", path: "symbols/numbers/two.png"},{value: "circle", path: "symbols/shapes/circle.png"}];
}

export function submit(){
    console.log("backend where")
}

export function getEnabledTimer(){
    return false;
}

export function getUserRole(){
    return 1; //0 will be speaker, 1 will be listener, anything different is waiting
}

export function initializeGame(){
    console.log("initialized game")
}

export function startGame(){
    console.log("started game")
}

export function finishGame(){
    console.log("finished game")
}