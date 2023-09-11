import Button from '@mui/material/Button';
import {submitSpeaker} from '../api/ApiCalls';
import Box from '@mui/material/Box';

export default function SpeakerSubmitComponent({chosenSymbols, setUserState, userId, roundId, answerTime}) {
  return <Box sx={{display: 'flex', justifyContent: 'right'}}><Button
      className="speakerSubmitButton"
      onClick={() => submitSpeaker(userId, roundId, answerTime, chosenSymbols,
          setUserState)}>submit</Button></Box>;
}