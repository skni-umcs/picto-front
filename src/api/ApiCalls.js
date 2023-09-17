import axios from 'axios';

export const BACKEND_IP = "api";

export const backend = axios.create({
  baseURL: BACKEND_IP,
  headers: {
    'x-session': `${localStorage.getItem('access_token')}`,
  },
});

export function submitSpeaker(
    userId, roundId, answerTime, symbolsSelected, setUserState) {
  console.log('submitSpeaker()');
  let symbolSelectedArray = Object.entries(symbolsSelected).map(
      ([groupId, id]) => {
        return {id: id};
      },
  );
  let dataToSend = {
    'userId': userId,
    'roundId': roundId,
    'answerTime': answerTime,
    'imageSelected': {id: 0},
    'symbolsSelected': symbolSelectedArray,
  };

  console.log('submit speaker has following data to send: ' + JSON.stringify(dataToSend));
  backend.post(`/round/${roundId}/speaker`, dataToSend).
      then(function(response) {
        console.log(response);
      }).
      catch(function(error) {
        console.log(error);
      });
}

export function submitListener(
    userId, roundId, answerTime, imageSelected, symbolsSelected, setUserState) {
  console.log('submitListener()');
  let dataToSend = {
    'userId': userId,
    'roundId': roundId,
    'answerTime': answerTime,
    'imageSelected': {id: imageSelected},
    'symbolsSelected': [],
  };
  console.log('submit listener has following data to send: ' + JSON.stringify(dataToSend));
  backend.post(`/round/${roundId}/listener`, dataToSend,
  ).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.log(error);
  });
}

export function createGame(
    {
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
      numberOfGenerations,
      createDateTime,
      groupId,
      setEndRoundId,
      showResultScreenTime
    },
) {
  console.log('createGame()');
  let dataToSend = {
    'userOneNumberOfImages': userOneNumberOfImages,
    'userTwoNumberOfImages': userTwoNumberOfImages,
    'userOneTime': userOneTime,
    'userTwoTime': userTwoTime,
    'symbolGroupsAmount': symbolGroupsAmount,
    'symbolsInGroupAmount': symbolsInGroupAmount,
    'numberOfGenerations': numberOfGenerations,
    'correctAnswerPoints': correctAnswerPoints,
    'wrongAnswerPoints': wrongAnswerPoints,
    'topology': {
      'id': topologyId,
      'probabilityOfEdgeRedrawing': probabilityOfEdgeRedrawing,
      'maxVertexDegree': maxVertexDegree,
    },
    'group': {
      'id': groupId,
    },
    'createDateTime': createDateTime,
    'showResultScreenTime': showResultScreenTime
  };
  console.log('create game data to send: ' + JSON.stringify(dataToSend));
  backend.post('game/admin/create', dataToSend,
  ).then(function(response) {
    console.log(response);
    setEndRoundId(response.data.id);
  }).catch(function(error) {
    console.log(error);
  });

}

export function beginGame(gameId) {
  console.log('beginGame');
  let dataToSend = {
    'gameId': gameId,
  };
  console.log('beginGame data to send: ' + JSON.stringify(dataToSend));
  backend.post(`game/${gameId}/admin/begin`, dataToSend,
  ).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.log(error);
  });
}

export function endGame(gameId) {
  console.log('endGame');
  let dataToSend = {
    'gameId': gameId,
  };
  console.log('end game got data to send: ' + JSON.stringify(dataToSend));
  backend.post(`game/${gameId}/admin/end`, dataToSend,
  ).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.log(error);
  });
}

export function endAll() {
  console.log('endAll');
  backend.post(`game/admin/end/all`,
  ).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.log(error);
  });
}

//values below are defaults that are at the moment in-code but will be dynamic later

export function getSelectionSymbols() {
  return [ //throws an error but these are only placeholder values
    [
      {id: 1, groupId: 1, value: 'black', path: 'symbols/colors/black.png'}, {
      id: 2,
      groupId: 1,
      value: 'white',
      path: 'symbols/colors/white.png',
    }, {id: 3, groupId: 1, value: 'gray', path: 'symbols/colors/gray.png'}],
    [
      {id: 4, groupId: 2, value: 'one', path: 'symbols/numbers/one.png'}, {
      id: 5,
      groupId: 2,
      value: 'two',
      path: 'symbols/numbers/two.png',
    }, {id: 6, groupId: 2, value: 'three', path: 'symbols/numbers/three.png'}],
    [
      {id: 7, groupId: 3, value: 'circle', path: 'symbols/shapes/circle.png'},
      {
        id: 8,
        groupId: 3,
        value: 'square',
        path: 'symbols/shapes/square.png',
      },
      {
        id: 9,
        groupId: 3,
        value: 'triangle',
        path: 'symbols/shapes/triangle.png',
      }],
  ];
}

export function getSelectedSymbols() {
  return [
    {value: 'black', path: 'symbols/colors/black.png'}, {
      value: 'two',
      path: 'symbols/numbers/two.png',
    }, {value: 'circle', path: 'symbols/shapes/circle.png'}];
}

export function getEnabledTimer() {
  return false;
}

export function getImagesLength() {
  return 4;
}

export function getImages() {
  return [ //throws an error but these are only placeholder values
    {
      id: 1,
      groupId: 1,
      value: 'elephant',
      path: 'images/elephant.png',
      chosen: false,
    },
    {
      id: 2,
      groupId: 1,
      value: 'kettle',
      path: 'images/kettle.png',
      chosen: true,
    },
    {
      id: 3,
      groupId: 1,
      value: 'grass',
      path: 'images/grass.png',
      chosen: false,
    },
    {
      id: 4,
      groupId: 1,
      value: 'knife',
      path: 'images/knife.png',
      chosen: false,
    },
  ];
}

export function getSelectionWidth() {
  return 3;
}

export function getSelectionHeight() {
  return 3;
}

export function getUserOneTime() {
  return 25;
}

export function getUserTwoTime() {
  return 25;
}

export function getCorrectAnswerPoints() {
  return 1;
}

export function getWrongAnswerPoints() {
  return -1;
}

export function getTopologyId() {
  return 1;
}

export function getProbabilityOfEdgeRedrawing() {
  return 0.5;
}

export function getMaxVertexDegree() {
  return 3;
}

export function getCurrentGameId() {
  return 0;
}
