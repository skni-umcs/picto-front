import Button from "@mui/material/Button"

import { submit } from '../api/ApiCalls'

export default function submitComponent(){
    return <Button onClick={submit}>submit</Button>;
}