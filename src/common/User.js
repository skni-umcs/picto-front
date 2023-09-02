import {backend} from '../api/ApiCalls';
import {useState, useEffect, useRef} from 'react'

import SpeakerComponent from '../speaker/SpeakerComponent';
import ListenerComponent from '../listener/ListenerComponent';
import UserJoin from './UserJoin';
import WaitingComponent from './WaitingComponent';

import { StyledEngineProvider } from '@mui/material';

function User(){

    const [userState, setUserState] = useState("join")
    const [userId, setUserId] = useState(0)
    const userIdRef = useRef(userId);

    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);

    function onNextRound(){
        console.log("onNextRound")
        console.log(userId)
        const source = new EventSource("http://localhost:8080/sse")

        const EventType = {
            BEGIN_GAME: "BEGIN_GAME",
            SPEAKER_READY: "SPEAKER_READY",
            LISTENER_READY: "LISTENER_READY",
            SPEAKER_HOLD: "SPEAKER_HOLD",
            LISTENER_HOLD: "LISTENER_HOLD",
            PAUSE_GAME: "PAUSE_GAME",
            END_GAME: "END_GAME"
        };

        source.addEventListener(EventType.BEGIN_GAME, (event) => {
            console.log(event)
            console.log(userId)
            console.log("bbbbbbardf2wqr")
            setNextRoundState();
        });

        source.onmessage = function (event) {

        };
        return () => {
            source.close();
            console.log("eventsource closed")
        }

    }

    function joinUser(gameId){
        backend.post(`game/${gameId}/join`,
            {
                "gameId": gameId
            })
            .then((response) => {
                let userObject = response.data
                console.log(userObject.id)
                console.log("joinUser")
                setUserState("waiting")
                setUserId(userObject.id)
                //todo: save the incoming info into the cookie
            })
            .catch(function (error){
                console.log(error)
            })
    }

    function setNextRoundState() {
        backend.get(`round/next`)
            .then(function (response) {
                console.log(response)
                let responseData = response.data;
                let currentUserId = userIdRef.current
                console.log(userIdRef.current)
                console.log("se")
                if(responseData.userOne.id === currentUserId) {
                    setUserState("speaker")
                }
                else if(responseData.userTwo.id === currentUserId) {
                    setUserState("listener")
                }
                else {
                    //error
                    setUserState("error")
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    console.log(userId);
   useEffect(() => {
     onNextRound(setUserState, userId)
   }, [])

   return <StyledEngineProvider injectFirst>
       {userState === "speaker" && <SpeakerComponent userId={userId} setUserState={setUserState}/>}
       {userState === "listener" && <ListenerComponent userId={userId} setUserState={setUserState}/>}
       {userState === "join" && <UserJoin joinUser={joinUser}/>}
       {userState === "waiting" && <WaitingComponent userId={userId}/>}
    </StyledEngineProvider>;
}

export default User;