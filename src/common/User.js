import { onNextRound } from '../api/ApiCalls';  
import {useState, useEffect} from 'react'

import Box from '@mui/material/Box'

import SpeakerComponent from '../speaker/SpeakerComponent';
import ListenerComponent from '../listener/ListenerComponent';
import UserJoin from './UserJoin';
import WaitingComponent from './WaitingComponent';

function User(){
  const [userState, setUserState] = useState("join")
  const [userId, setUserId] = useState()
   useEffect(() => {
     onNextRound(setUserState)
   }, [])
  
   return <Box>
       {userState === "speaker" && <SpeakerComponent userId={userId} setUserState={setUserState}/>}
       {userState === "listener" && <ListenerComponent userId={userId} setUserState={setUserState}/>}
       {userState === "join" && <UserJoin setUserState={setUserState} setUserId={setUserId}/>}
       {userState === "waiting" && <WaitingComponent/>}
   </Box>;
}

export default User;