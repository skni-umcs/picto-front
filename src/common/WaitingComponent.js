import Box from '@mui/material/Box';
import React from 'react';

function WaitingComponent({roundId = 0, awaitingWhom="Rundy"}) {
  return (
      <Box className="waitingComponent">
        <Box className="waitingComponentsContainer">
          <Box className="awaitingRound">Oczekiwanie {awaitingWhom}</Box>
          <Box className="awaitingRoundUserId">id rundy: {roundId}</Box>
        </Box>
      </Box>
  );
}

export default WaitingComponent;