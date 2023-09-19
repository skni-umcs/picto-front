import Box from '@mui/material/Box';
import React from 'react';
import {InfoComponent} from './InfoComponent';
import {Container} from '@mui/material';

function WaitingComponent({generation, userId, awaitingWhom="na rundę", waitMs = 0}) {
  return (
      <Container className="waitingComponent">
        <InfoComponent generation={generation} userId={userId} waitMs={waitMs} enableTimer={true}/>
        <Box className="waitingComponentsContainer">
          <Box className="awaitingRound">Oczekiwanie {awaitingWhom}</Box>
        </Box>
      </Container>
  );
}

export default WaitingComponent;