import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { joinUser } from '../api/ApiCalls'
import {useState} from 'react'

function UserJoin({setUserState, setUserId}){
    const [gameId, setGameId] = useState(0)
    function onJoin(){
        joinUser(gameId, setUserState, setUserId)
    }
    return (
        <Box sx={{flexDirection: 'column', display: 'flex'}} className={"joinComponent"}>
            <Button className='joinButton' onClick={onJoin}>JOIN</Button>
            <input value={gameId} onChange={e => setGameId(e.target.value)}></input>
        </Box>
    )
}

export default UserJoin; 