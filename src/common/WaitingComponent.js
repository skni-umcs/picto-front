import Box from '@mui/material/Box';
import React from 'react';
import {InfoComponent} from './InfoComponent';
import {Container} from '@mui/material';
import Timer from './Timer';

function WaitingComponent({generation, userId, awaitingWhom="na rundę", waitMs = 0}) {
  return (
      <Container className="waitingComponent">
        <InfoComponent generation={generation} userId={userId}/>
        <Box className="waitingComponentsContainer">
          <Box className="awaitingRound">
            <Box>Oczekiwanie {awaitingWhom}</Box>
            <Timer waitMs={waitMs}/>
          </Box>

        </Box>
      </Container>
  );
}

export default WaitingComponent;