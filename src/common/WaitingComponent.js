import Box from '@mui/material/Box';
import React from 'react';

function WaitingComponent({roundId = 0, awaitingWhom="Round"}) {
  return (
      <Box className="waitingComponent">
        <Box className="waitingComponentsContainer">
          <Box className="awaitingRound">Awaiting {awaitingWhom}</Box>
          <Box className="awaitingRoundUserId">roundId: {roundId}</Box>
        </Box>
      </Box>
  );
}

export default WaitingComponent;