import Button from "@mui/material/Button"
import { submitListener } from '../api/ApiCalls'
import Box from "@mui/material/Box";

export default function ListenerSubmitComponent({imageSelected, setUserState}){
    return <Box sx={{display:'flex', justifyContent: 'right'}}><Button className="listenerSubmitButton" onClick={() => submitListener(0, 0, 0, imageSelected, {}, setUserState)}>submit</Button></Box>;
}