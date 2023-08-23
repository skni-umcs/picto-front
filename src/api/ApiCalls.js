import axios from 'axios'
import {useEffect} from 'react'

const backend = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
}) 

export function OnNextRound(){
    console.log("onNextRound")
    useEffect(() => {
        const source = new EventSource("http://localhost:8080/round/next")
        source.onmessage = function (event) {
            console.log("b")
            console.log(event)
        };
        return () => {
            source.close();
            console.log("eventsource closed")
        }
    })

}

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

export function getUserOneTime(){
    return 25;
}

export function getUserTwoTime(){
    return 25;
}

export function getCorrectAnswerPoints(){
    return 1;
}

export function getWrongAnswerPoints(){
    return -1;
}

export function getTopologyId(){
    return 0;
}

export function getProbabilityOfEdgeRedrawing(){
    return 0.5;
}

export function getMaxVertexDegree(){
    return 3;
}

export function getCurrentGameId(){
    return 0;
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

export function createGame({
    userOneNumberOfImages, 
    userTwoNumberOfImages, 
    userOneTime, 
    userTwoTime, 
    symbolGroupsAmount, 
    symbolsInGroupAmount,
    correctAnswerPoints,
    wrongAnswerPoints,
    topologyId,
    probabilityOfEdgeRedrawing,
    maxVertexDegree,
    createDateTime,
    setEndRoundId
    }){
    backend.post("game/admin/create",
    {
        "userOneNumberOfImages": userOneNumberOfImages,
        "userTwoNumberOfImages": userTwoNumberOfImages,
        "userOneTime": userOneTime,
        "userTwoTime": userTwoTime,
        "symbolGroupsAmount": symbolGroupsAmount,
        "symbolsInGroupAmount": symbolsInGroupAmount,
        "correctAnswerPoints": correctAnswerPoints,
        "wrongAnswerPoints": wrongAnswerPoints,
        "topologyId": topologyId,
        "probabilityOfEdgeRedrawing": probabilityOfEdgeRedrawing,
        "maxVertexDegree": maxVertexDegree,        
        "createDateTime": createDateTime
    })
    .then(function (response) {
        console.log(response)
        setEndRoundId(response.data.id)
    })
    .catch(function (error) {
        console.log(error)
    })
    
}

export function beginGame(gameId) {
    backend.post(`game/${gameId}/admin/begin`,
    {
        "gameId": gameId
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    })
}

export function endGame(gameId) {
    backend.post(`game/${gameId}/admin/end`,
    {
        "gameId": gameId
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    })
}