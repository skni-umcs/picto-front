import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, {useRef, useState} from 'react';
import {Checkbox} from '@mui/material';

function UserJoin({joinUser}) {
  const [gameId, setGameId] = useState(0);
  const buttonRef = useRef(null);
  const [agreePanel, setAgreePanel] = useState(false);

  function onJoin() {
    setAgreePanel(false);
    joinUser(gameId);
  }

  function setAgreePanelClick() {
    setAgreePanel(true);
  }

  function AgreeComponent() {
    return (
        <Box className="agreeComponent">
          <Checkbox onClick={onJoin}></Checkbox>
          Wyrażam zgodę na udział w badaniu
        </Box>
    );
  }

  const handleKeyPress = e => {
    if(e.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (<>
      {agreePanel && <AgreeComponent/>}
      {!agreePanel && <Box sx={{flexDirection: 'column', display: 'flex'}}
                               className={'joinComponent'}>
      <Box className="joinComponentsContainer">
        <input onKeyDown={handleKeyPress} className="joinInput" value={gameId}
               onChange={e => setGameId(e.target.value)}></input>
        <Button ref={buttonRef} className="joinButton" onClick={setAgreePanelClick}>DOŁĄCZ</Button>
      </Box>
    </Box>}
  </>
  );
}

export default UserJoin; 