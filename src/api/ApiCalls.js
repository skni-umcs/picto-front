export function getTopics(){
    return [ //throws an error but these are only placeholder values
        {value: "elephant", path: "elephant.png", chosen: false},
        {value: "kettle", path: "kettle.png", chosen: true},
        {value: "grass", path: "grass.png", chosen: false},
        {value: "knife", path: "knife.png", chosen: false}
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
        [{value: "black", path: "black.png"}, {value: "white", path: "white.png"}, {value: "gray", path: "gray.png"}],
        [{value: "one", path: "one.png"}, {value: "two", path: "two.png"}, {value: "three", path: "three.png"}],
        [{value: "circle", path: "circle.png"}, {value: "square", path: "square.png"}, {value: "triangle", path: "triangle.png"}]
    ];
}

export function submit(){
    console.log("backend where")
}