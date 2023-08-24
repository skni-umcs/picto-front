import Button from "@mui/material/Button"
import { submit } from '../api/ApiCalls'
import Box from "@mui/material/Box";

export default function submitComponent(chosenSymbols){
    console.log(chosenSymbols)
    return <Box sx={{display:'flex', justifyContent: 'center'}}><Button onClick={() => {console.log(chosenSymbols)}}>submit</Button></Box>;
}