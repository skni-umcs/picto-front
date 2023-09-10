import Button from '@mui/material/Button';
import {submitListener} from '../api/ApiCalls';
import Box from '@mui/material/Box';

export default function ListenerSubmitComponent({imageSelected, setUserState, userId, roundId, answerTime}) {
  return <Box sx={{display: 'flex', justifyContent: 'right'}}><Button
      className="listenerSubmitButton"
      onClick={() => submitListener(userId, roundId, answerTime, imageSelected, {},
          setUserState)}>submit</Button></Box>;
}