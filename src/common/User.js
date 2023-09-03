import {backend, BACKEND_IP} from '../api/ApiCalls';
import {useEffect, useState} from 'react';

import SpeakerComponent from '../speaker/SpeakerComponent';
import ListenerComponent from '../listener/ListenerComponent';
import UserJoin from './UserJoin';
import WaitingComponent from './WaitingComponent';

import {StyledEngineProvider} from '@mui/material';
import Result from './Result';

function User() {

  const [userState, setUserState] = useState('join');
  const [userId, setUserId] = useState(null);

  function subscribeEventSource() {
    console.log('subscribeEventSource');
    console.log(userId);
    const source = new EventSource(`${BACKEND_IP}/event/${userId}`);

    const EventType = {
      AWAITING_GAME_BEGIN: 'AWAITING_GAME_BEGIN',
      AWAITING_ROUND: 'AWAITING_ROUND',
      SPEAKER_READY: 'SPEAKER_READY',
      LISTENER_READY: 'LISTENER_READY',
      SPEAKER_HOLD: 'SPEAKER_HOLD',
      LISTENER_HOLD: 'LISTENER_HOLD',
      PAUSE_GAME: 'PAUSE_GAME', //currently unused
      END_GAME: 'END_GAME',
    };

    source.addEventListener(EventType.AWAITING_GAME_BEGIN, (event) => {
      setUserState('waiting');
    });

    source.addEventListener(EventType.AWAITING_ROUND, (event) => {
      setUserState('waiting');
    });

    source.addEventListener(EventType.SPEAKER_READY, (event) => {
      setNextRoundSpeakerState();
    });

    source.addEventListener(EventType.LISTENER_READY, (event) => {
      setNextRoundListenerState();
    });

    source.addEventListener(EventType.SPEAKER_HOLD, (event) => {
      setUserState('waiting');
    });

    source.addEventListener(EventType.LISTENER_HOLD, (event) => {
      setUserState('waiting');
    });

    // source.onmessage = function (event) {
    //
    // };

    return () => {
      source.close();
      console.log('eventsource closed');
    };

  }

  function joinUser(gameId) {
    backend.post(`game/${gameId}/join`,
        {
          'gameId': gameId,
        }).then((response) => {
      let userObject = response.data;
      console.log(userObject.id);
      console.log('joinUser');
      setUserState('waiting');
      setUserId(userObject.id);
      //todo: save the incoming info into the cookie
    }).catch(function(error) {
      console.log(error);
    });
  }

  function setNextRoundSpeakerState() {
    backend.get(`round/next/${userId}`).then(function(response) {
      setUserState('speaker');
    }).catch(function(error) {
      console.log(error);
    });
  }

  function setNextRoundListenerState() {
    backend.get(`round/next/${userId}`).then(function(response) {
      setUserState('listener');
    }).catch(function(error) {
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
            <SpeakerComponent userId={userId} setUserState={setUserState}/>
        }
        {
            userState === 'listener' &&
            <ListenerComponent userId={userId} setUserState={setUserState}/>
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