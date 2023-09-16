import React from 'react';
import Box from '@mui/material/Box';

function TimerComponent({time = '01:03'}) {
  return <Box className="infoText">{time}</Box>;
}

function UserInfoComponent({userId}) {
  return <Box className="infoText">ID: {userId}</Box>;
}

function GenerationComponent({generation = 0}) {
  return <Box className="infoText">Generacja: {generation}</Box>;
}

export function InfoComponent({userId, generation}) {
  return (
      <Box className="infoComponent">
        <GenerationComponent generation={generation}/>
        <UserInfoComponent userId={userId}/>
      </Box>
  );
}