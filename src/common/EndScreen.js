import Box from '@mui/material/Box';
import React from 'react';

function EndScreen({roundId = 0, awaitingWhom="Round"}) {
  return (
      <Box className="waitingComponent">
        Thanks for playing!
      </Box>
  );
}

export default EndScreen;