import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';

export default function Timer({waitMs}) {
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
  let date = new Date(timeLeft)
  return <Box className="infoText">{(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:{(date.getSeconds() < 10 ? '0' : '') + date.getSeconds()}</Box>
}