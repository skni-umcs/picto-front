import Button from "@mui/material/Button"
import { submitSpeaker } from '../api/ApiCalls'
import Box from "@mui/material/Box";

export default function SpeakerSubmitComponent({chosenSymbols, setUserState}){
    return <Box sx={{display:'flex', justifyContent: 'center'}}><Button onClick={() => submitSpeaker(0, 0, 0, chosenSymbols,setUserState)}>submit</Button></Box>;
}