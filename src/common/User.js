import {backend, BACKEND_IP} from '../api/ApiCalls';
import {useEffect, useRef, useState} from 'react';

import SpeakerComponent from '../speaker/SpeakerComponent';
import ListenerComponent from '../listener/ListenerComponent';
import UserJoin from './UserJoin';
import WaitingComponent from './WaitingComponent';

import {StyledEngineProvider} from '@mui/material';
import Result from './Result';
import {useCookies} from 'react-cookie';
import {EventSourcePolyfill} from 'event-source-polyfill';

function User() {

  const [userState, setUserState] = useState('join');
  const [userId, setUserId] = useState(null);
  const [cookies, setCookies, removeCookies] = useCookies();
  const [images, setImages] = useState(null);
  const [symbols, setSymbols] = useState(null);
  const [roundIdState, setRoundId] = useState(null);
  const [generationState, setGeneration] = useState(null);
  const [result, setResult] = useState(null);

  const roundIdRef = useRef(null);
  const generationRef = useRef(null);

  const [topicId, setTopicId] = useState(null);
  const [askBackendForSymbols, setAskBackendForSymbols] = useState(false);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    roundIdRef.current = roundIdState;
    if (askBackendForSymbols) {
      setSymbolsFromBackend(roundIdState);
      setAskBackendForSymbols(roundIdState);
    }
  }, [roundIdState]);

  useEffect(() => {
    generationRef.current = generationState;
  }, [generationState]);

  useEffect(() => {
    if (topicId != null && images != null) {
      images.forEach(
          (image) => {
            if (topicId === image.id) {
              image.chosen = true;
            }
          },
      );
      setReRender(true);
    }
  }, [topicId, images]);

  // useEffect(() => {
  //   localStorage.setItem('userCookie', cookies['userCookie']);
  // }, [cookies]);
  //
  // useEffect(() => {
  //   if(cookies === null) {
  //     setCookies('userCookie',localStorage.getItem('userCookie'));
  //   }
  // })

  function subscribeEventSource() {
    console.log("subscribing event source (should be called only once!)")
    const source = new EventSourcePolyfill(`${BACKEND_IP}/event`,
        {headers: {'x-session': `${cookies.userCookie}`}});

    const EventType = {
      GAME_BEGIN: 'GAME_BEGIN',
      AWAITING_ROUND: 'AWAITING_ROUND',
      SPEAKER_READY: 'SPEAKER_READY',
      LISTENER_READY: 'LISTENER_READY',
      SPEAKER_HOLD: 'SPEAKER_HOLD',
      LISTENER_HOLD: 'LISTENER_HOLD',
      RESULT_READY: 'RESULT_READY',
      PAUSE_GAME: 'PAUSE_GAME', //currently unused
      END_GAME: 'END_GAME',
    };

    source.addEventListener(EventType.GAME_BEGIN, (event) => {
      console.log("GAME_BEGIN")
      setUserState('waiting');
      callNextRound();
    });

    source.addEventListener(EventType.AWAITING_ROUND, (event) => {
      console.log('AWAITING_ROUND');
      setUserState('waiting');
      callNextRound();
    });

    source.addEventListener(EventType.SPEAKER_READY, (event) => {
      console.log('SPEAKER_READY');
      setAskBackendForSymbols(true);

      setUserState('speaker');
    });

    source.addEventListener(EventType.LISTENER_READY, async (event) => {
      console.log('LISTENER_READY');
      await setSymbolsFromBackend(roundIdRef.current);
      setUserState('listener');
    });

    source.addEventListener(EventType.SPEAKER_HOLD, (event) => {
      console.log('SPEAKER_HOLD');
      setUserState('waitingListener');
    });

    source.addEventListener(EventType.LISTENER_HOLD, (event) => {
      console.log('LISTENER_HOLD');
      setUserState('waitingSpeaker');
    });

    source.addEventListener(EventType.RESULT_READY, (event) => {
      console.log('RESULT_READY');
      setUserState('result');
      updateResult();
    });

    // source.onmessage = function(event) {
    //   console.log(event);
    // };

    return () => {
      source.close();
      console.log('eventsource closed');
    };

  }

  function joinUser(gameId) {
    console.log('user joins to' + gameId);
    backend.post(`game/${gameId}/join`,
        {
          'gameId': gameId,
        }, {withCredentials: true}).then((response) => {
      let userObject = response.data;
      console.log('user joining got following response: ' + JSON.stringify(userObject));
      setCookies('userCookie', userObject.cookie);
      setUserState('waiting');
      setUserId(userObject.id);
    }).catch(function(error) {
      console.log(error);
    });
  }

  function callNextRound() {
    console.log('callNextRound()');
    backend.get(`round/next/${userId}`, {withCredentials: true}).
        then(function(response) {
          let roundObject = response.data;
          console.log('calling next round got round object: ' + JSON.stringify(roundObject));
          let currentRoundId = roundObject.id;
          setTopicId(roundObject['topic'].id);
          setRoundId(currentRoundId);
          setGeneration(roundObject.generation);
          setImagesFromBackend(currentRoundId);
        }).catch(function(error) {
      console.log(error);
    });

  }

  function setImagesFromBackend(roundId) {
    console.log("setImagesFromBackend");
    backend.get(`round/${roundId}/images/${userId}`, {withCredentials: true}).
        then(function(response) {
          let imagesObject = response.data;
          console.log("setting images from backend got image object: "+JSON.stringify(imagesObject));
          setImages(imagesObject);
        }).
        catch(function(error) {
          console.log(error);
        });
  }

  function setSymbolsFromBackend(roundId) {
    console.log("setting symbols from backend for round: "+roundId);
    backend.get(`round/${roundId}/symbols/${userId}`, {withCredentials: true}).
        then(function(response) {
          let symbolsObject = response.data;
          let i = 0;

          console.log("setting symbols from backend got symbols object: "+JSON.stringify(symbolsObject));

          symbolsObject.forEach(
              (symbolArray) => {
                symbolArray.forEach((symbol) => {
                  symbol['groupId'] = i;
                });
                i++;
              },
          );
          console.log("symbols object after adding groupIds: "+JSON.stringify(symbolsObject));
          setSymbols(symbolsObject);
        }).
        catch(function(error) {
          console.log(error);
        });
  }

  function updateResult() {
    console.log("updateResult()");
    backend.get(`round/${roundIdRef.current}/result/${userId}`,
        {withCredentials: true}).
        then(function(response) {
          let resultObject = response.data;
          console.log("updating result got result object: "+JSON.stringify(resultObject));
          setResult(resultObject);
        }).
        catch(function(error) {
          console.log(error);
        });
  }

  useEffect(() => {
    if (userId != null) {
      subscribeEventSource(setUserState, userId);
    }
  }, [userId]);

  return (
      <StyledEngineProvider injectFirst>
        {
            userState === 'speaker' &&
            <SpeakerComponent userId={userId} setUserState={setUserState}
                              images={images}
                              symbols={symbols}
                              roundId={roundIdState}
                              generation={generationState}/>
        }
        {
            userState === 'listener' &&
            <ListenerComponent userId={userId} setUserState={setUserState}
                               images={images}
                               symbols={symbols}
                               roundId={roundIdState}
                               generation={generationState}
            />
        }
        {
            userState === 'join' &&
            <UserJoin joinUser={joinUser}/>
        }
        {
            userState === 'result' &&
            <Result/>
        }
        {
            userState === 'waiting' &&
            <WaitingComponent roundId={roundIdState}/>
        }
        {
            userState === 'waitingSpeaker' &&
            <WaitingComponent roundId={roundIdState}
                              awaitingWhom={'Speaker'}/>
        }
        {
            userState === 'waitingListener' &&
            <WaitingComponent roundId={roundIdState}
                              awaitingWhom={'Listener'}/>
        }
      </StyledEngineProvider>
  );
}

export default User;