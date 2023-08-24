import SpeakerComponent from '../speaker/SpeakerComponent'
import ListenerComponent from '../listener/ListenerComponent'
import WaitingComponent from '../common/WaitingComponent'
import UserJoin from './UserJoin';

export default function userContent(
    userState, 
    setUserState,
    gameJoinId,
    setGameJoinId,
    userId,
    setUserId,
    alignment,
    setAlignment,
    chosenPicture,
    setChosenPicture,
    chosenSymbols,
    setChosenSymbol
    ) {
    if(userState==="speaker"){
        return SpeakerComponent(userId, alignment, setAlignment, chosenSymbols, setChosenSymbol);
    }
    else if(userState==="listener"){
        return ListenerComponent(userId, alignment, setAlignment, chosenPicture, setChosenPicture);
    }
    else if(userState==="join"){
        return UserJoin(setUserState, gameJoinId, setGameJoinId, setUserId)
    }
    else{
        return WaitingComponent();
    }
}