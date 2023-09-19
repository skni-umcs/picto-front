import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';

function TimerComponent({time}) {

}

function UserInfoComponent({userId}) {
  return <Box className="infoText">ID: {userId}</Box>;
}

function GenerationComponent({generation = 0}) {
  return <Box className="infoText">Generacja: {generation}</Box>;
}

export function InfoComponent({userId, generation, waitMs = 0}) {
  const [timeLeft, setTimeLeft] = useState(waitMs);
  const timeLeftRef = useRef(waitMs);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    let timer;
    if(waitMs === 0) {
      timer = setInterval(function() {
        setTimeLeft(timeLeftRef.current+1000);
      }, 1000);
    }
    else {
      timer = setInterval(function() {
        let checkDate = new Date(timeLeftRef.current);
        if(checkDate.getSeconds() === 0 && checkDate.getMinutes() === 0) {
          clearInterval(timer);
        }
        else {
          setTimeLeft(timeLeftRef.current-1000);
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, []);
  return (
      <Box className="infoComponent">
        <GenerationComponent generation={generation}/>
        <Box className="infoText">Czas: {new Date(timeLeft).getMinutes()}:{new Date(timeLeft).getSeconds()}</Box>;
        <UserInfoComponent userId={userId}/>
      </Box>
  );
}