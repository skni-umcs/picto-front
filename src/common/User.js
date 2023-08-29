import { onNextRound } from '../api/ApiCalls';  
import {useState, useEffect} from 'react'

import SpeakerComponent from '../speaker/SpeakerComponent';
import ListenerComponent from '../listener/ListenerComponent';
import UserJoin from './UserJoin';
import WaitingComponent from './WaitingComponent';

import { StyledEngineProvider } from '@mui/material';

function User(){
  const [userState, setUserState] = useState("speaker")
  const [userId, setUserId] = useState()
   useEffect(() => {
     onNextRound(setUserState)
   }, [])
  
   return <StyledEngineProvider injectFirst>
       {userState === "speaker" && <SpeakerComponent userId={userId} setUserState={setUserState}/>}
       {userState === "listener" && <ListenerComponent userId={userId} setUserState={setUserState}/>}
       {userState === "join" && <UserJoin setUserState={setUserState} setUserId={setUserId}/>}
       {userState === "waiting" && <WaitingComponent/>}
    </StyledEngineProvider>;
}

export default User;