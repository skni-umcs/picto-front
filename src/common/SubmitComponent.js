import Button from "@mui/material/Button"
import { submit } from '../api/ApiCalls'
import Box from "@mui/material/Box";

export default function submitComponent(){
    return <Box sx={{display:'flex', justifyContent: 'center'}}><Button onClick={submit}>submit</Button></Box>;
}