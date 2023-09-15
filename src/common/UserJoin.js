import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useRef, useState} from 'react';

function UserJoin({joinUser}) {
  const [gameId, setGameId] = useState(0);
  const buttonRef = useRef(null);

  function onJoin() {
    joinUser(gameId);
  }

  const handleKeyPress = e => {
    if(e.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (
      <Box sx={{flexDirection: 'column', display: 'flex'}}
           className={'joinComponent'}>
        <Box className="joinComponentsContainer">
          <input onKeyDown={handleKeyPress} className="joinInput" value={gameId}
                 onChange={e => setGameId(e.target.value)}></input>
          <Button ref={buttonRef} className="joinButton" onClick={onJoin} autofocus>DOŁĄCZ</Button>
        </Box>
      </Box>
  );
}

export default UserJoin; 