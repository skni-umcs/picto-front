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
  const [result, setResult] = useState(null);

  const roundIdRef = useRef(null);

  useEffect(() => {
    roundIdRef.current = roundIdState
  }, [roundIdState]);

  function subscribeEventSource() {
    console.log('subscribeEventSource');
    console.log(cookies.userCookie);
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
      setUserState('waiting');
      callNextRound();
    });

    source.addEventListener(EventType.AWAITING_ROUND, (event) => {
      console.log("AWAITING_ROUND");
      setUserState('waiting');
      callNextRound();
    });

    source.addEventListener(EventType.SPEAKER_READY, (event) => {
      console.log("zostalem speakerem");
      setUserState('speaker');
    });

    source.addEventListener(EventType.LISTENER_READY, (event) => {
      console.log("jestem ready listenerem?")
      setUserState('listener');
    });

    source.addEventListener(EventType.SPEAKER_HOLD, (event) => {
      console.log("jestem holdowanym speakerem?")
      setUserState('waiting');
    });

    source.addEventListener(EventType.LISTENER_HOLD, (event) => {
      console.log("zostalem listenerem")
      setUserState('waiting');
    });

    source.addEventListener(EventType.RESULT_READY, (event) => {
      console.log("result");
      console.log(roundIdRef.current);
      setUserState('result')
      updateResult();
    });

    source.onmessage = function(event) {
      console.log(event);
    };

    return () => {
      source.close();
      console.log('eventsource closed');
    };

  }

  function joinUser(gameId) {
    backend.post(`game/${gameId}/join`,
        {
          'gameId': gameId,
        }, {withCredentials: true}).then((response) => {
      let userObject = response.data;
      console.log(userObject.id);
      console.log('joinUser');
      setCookies('userCookie', userObject.cookie);
      setUserState('waiting');
      setUserId(userObject.id);
    }).catch(function(error) {
      console.log(error);
    });
  }

  function callNextRound() {
    console.log('callNextRound');
    backend.get(`round/next/${userId}`, {withCredentials: true}).
        then(function(response) {
          console.log('inside callNextRound backend call');
          let roundObject = response.data;
          let currentRoundId = roundObject.id;
          setRoundId(currentRoundId);
          console.log("currentRoundId")
          console.log(currentRoundId);
          setImagesFromBackend(currentRoundId);
          setSymbolsFromBackend(currentRoundId);
          console.log(response);
        }).catch(function(error) {
      console.log(error);
    });

  }

  function setImagesFromBackend(roundId) {
    backend.get(`round/${roundId}/images/${userId}`, {withCredentials: true}).
        then(function(response) {
          let imagesObject = response.data;
          setImages(imagesObject);
        }).
        catch(function(error) {
          console.log(error);
        });
  }

  function setSymbolsFromBackend(roundId) {
    backend.get(`round/${roundId}/symbols/${userId}`, {withCredentials: true}).
        then(function(response) {
          console.log('ss');
          console.log(response);
          let symbolsObject = response.data;
          let i = 0;
          symbolsObject.forEach(
              (symbolArray) => {
                symbolArray.forEach((symbol) => {
                  symbol['groupId'] = i;
                });
                i++;
              },
          );
          console.log(symbolsObject);
          setSymbols(symbolsObject);
        }).
        catch(function(error) {
          console.log(error);
        });
  }

  function updateResult() {
    backend.get(`round/${roundIdRef.current}/result`, {withCredentials: true}).
        then(function(response) {
          let resultObject = response.data
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
                              roundId={roundIdState}/>
        }
        {
            userState === 'listener' &&
            <ListenerComponent userId={userId} setUserState={setUserState}
                               images={images}
                               symbols={symbols}
                               roundId={roundIdState}
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
            <WaitingComponent userId={userId}/>
        }
      </StyledEngineProvider>
  );
}

export default User;