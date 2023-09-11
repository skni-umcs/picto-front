import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useState} from 'react';

function UserJoin({joinUser}) {
  const [gameId, setGameId] = useState(0);

  function onJoin() {
    joinUser(gameId);
  }

  return (
      <Box sx={{flexDirection: 'column', display: 'flex'}}
           className={'joinComponent'}>
        <Box className="joinComponentsContainer">
          <input className="joinInput" value={gameId}
                 onChange={e => setGameId(e.target.value)}></input>
          <Button className="joinButton" onClick={onJoin}>JOIN</Button>
        </Box>
      </Box>
  );
}

export default UserJoin; 