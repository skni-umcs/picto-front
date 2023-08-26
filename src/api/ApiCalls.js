import axios from 'axios'

const backend = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
}) 

export function onNextRound(setUserState){
    console.log("onNextRound")
    const source = new EventSource("http://localhost:8080/round/next")
    source.onmessage = function (event) {
        var roundObject = JSON.parse(event.data)
        console.log(roundObject.id)
    };
    return () => {
        source.close();
        console.log("eventsource closed")
    }
    
}

export function getImagesLength(){
    return 4;
}

export function getImages(){
    return [ //throws an error but these are only placeholder values
        {id: 1, groupId:1, value: "elephant", path: "images/elephant.png", chosen: false},
        {id: 2, groupId:1, value: "kettle", path: "images/kettle.png", chosen: true},
        {id: 3, groupId:1, value: "grass", path: "images/grass.png", chosen: false},
        {id: 4, groupId:1, value: "knife", path: "images/knife.png", chosen: false}
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
        [{id: 1, groupId: 1, value: "black", path: "symbols/colors/black.png"}, {id: 2, groupId: 1,value: "white", path: "symbols/colors/white.png"}, {id:3,groupId: 1, value: "gray", path: "symbols/colors/gray.png"}],
        [{id: 4,groupId: 2, value: "one", path: "symbols/numbers/one.png"}, {id: 5,groupId: 2,value: "two", path: "symbols/numbers/two.png"}, {id: 6,groupId: 2,value: "three", path: "symbols/numbers/three.png"}],
        [{id: 7,groupId: 3,value: "circle", path: "symbols/shapes/circle.png"}, {id: 8,groupId: 3,value: "square", path: "symbols/shapes/square.png"}, {id: 9,groupId: 3,value: "triangle", path: "symbols/shapes/triangle.png"}]
    ];
}

export function getSelectedSymbols(){
    return [{value: "black", path: "symbols/colors/black.png"},{value: "two", path: "symbols/numbers/two.png"},{value: "circle", path: "symbols/shapes/circle.png"}];
}

export function submitSpeaker(userId, roundId, answerTime, symbolsSelected, setUserState){
    console.log(symbolsSelected)
    backend.post(`/round/${roundId}/speaker`,
    {
        "userId": userId,
        "roundId": roundId,
        "answerTime": answerTime,
        "imageSelected": {},
        "symbolsSelected": symbolsSelected
    })
    .then(function (response) {
        console.log(response)
        setUserState("waiting")
    })
    .catch(function (error){
        console.log(error)
    })
}

export function submitListener(userId, roundId, answerTime, imageSelected, symbolsSelected, setUserState){
    backend.post(`/round/${roundId}/listener`,
    {
        "userId": userId,
        "roundId": roundId,
        "answerTime": answerTime,
        "imageSelected": imageSelected,
        "symbolsSelected": symbolsSelected
    })
    .then(function (response)
    {
        console.log(response)
        setUserState("waiting")
    })
    .catch(function (error){
        console.log(error)
    })
}

export function getEnabledTimer(){
    return false;
}

export function getUserRole(){
    return 0; //0 will be speaker, 1 will be listener, anything different is waiting
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

export function joinUser(gameId, setUserState, setUserId){
    backend.post(`game/${gameId}/join`,
    {
        "gameId": gameId
    })
    .then(function (response) {
        var userObject = response.data
        console.log(response)
        setUserState("speaker")
        setUserId(userObject.id)
        //todo: save the incoming info into the cookie
    })
    .catch(function (error){
        console.log(error)
    })
}