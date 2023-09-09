import {backend, BACKEND_IP} from '../api/ApiCalls';
import {useEffect, useState} from 'react';

import SpeakerComponent from '../speaker/SpeakerComponent';
import ListenerComponent from '../listener/ListenerComponent';
import UserJoin from './UserJoin';
import WaitingComponent from './WaitingComponent';

import {StyledEngineProvider} from '@mui/material';
import Result from './Result';
import {useCookies} from 'react-cookie';
import {EventSourcePolyfill} from 'event-source-polyfill';
import {wait} from '@testing-library/user-event/dist/utils';

function User() {

  const [userState, setUserState] = useState('join');
  const [userId, setUserId] = useState(null);
  const [cookies, setCookies, removeCookies] = useCookies();
  const [images, setImages] = useState(null);
  const [symbols, setSymbols] = useState(null);

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
      PAUSE_GAME: 'PAUSE_GAME', //currently unused
      END_GAME: 'END_GAME',
    };

    source.addEventListener(EventType.GAME_BEGIN, (event) => {
      setUserState('waiting');
      callNextRound();
    });

    source.addEventListener(EventType.AWAITING_ROUND, (event) => {
      setUserState('waiting');
    });

    source.addEventListener(EventType.SPEAKER_READY, (event) => {
      setUserState("speaker");
    });

    source.addEventListener(EventType.LISTENER_READY, (event) => {
      setUserState("listener");
    });

    source.addEventListener(EventType.SPEAKER_HOLD, (event) => {
      setUserState('waiting');
    });

    source.addEventListener(EventType.LISTENER_HOLD, (event) => {
      setUserState('waiting');
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
    console.log("callNextRound");
    backend.get(`round/next/${userId}`, {withCredentials: true}).
        then(function(response) {
          console.log("inside callNextRound backend call")
          let roundObject = response.data;
          let roundId = roundObject.id;
          setImagesFromBackend(roundId);
          setSymbolsFromBackend(roundId);
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
          let symbolsObject = response.data;
          setSymbols(symbolsObject);
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
                              symbols={symbols}/>
        }
        {
            userState === 'listener' &&
            <ListenerComponent userId={userId} setUserState={setUserState}
                               images={images}
                               symbols={symbols}
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