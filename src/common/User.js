import userContent from '../common/UserContent'
import { OnNextRound } from '../api/ApiCalls';  
import {useState} from 'react'

function User(){
  const [userState, setUserState] = useState("join")
  const [gameJoinId, setGameJoinId] = useState(0)
  const [userId, setUserId] = useState()
  const [alignmentGroups, setAlignmentGroups] = useState({0: "button"});
  const [chosenPicture, setChosenPictureHook] = useState(null);
  const [chosenSymbols, setChosenSymbolsObject] = useState({})
  function setChosenSymbol(symbolId, groupId){
    var newChosenSymbols = chosenSymbols
    newChosenSymbols[groupId] = symbolId
    setChosenSymbolsObject(newChosenSymbols)
  }
  function setChosenPicture(symbolId, groupId){
    setChosenPictureHook(symbolId)
  }
  function setAlignment(symbolId, groupId){
    var newAlignmentGroups = alignmentGroups
    newAlignmentGroups[groupId] = symbolId
    setAlignmentGroups(newAlignmentGroups)
  }
  OnNextRound(setUserState)
  return userContent(
    userState, 
    setUserState, 
    gameJoinId, 
    setGameJoinId,
    userId,
    setUserId,
    alignmentGroups,
    setAlignment,
    chosenPicture,
    setChosenPicture,
    chosenSymbols,
    setChosenSymbol
  )
}

export default User;