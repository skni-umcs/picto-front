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

export function submit(){
    console.log("backend where")
}