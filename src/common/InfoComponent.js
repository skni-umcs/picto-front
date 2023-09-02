import React from "react";
import Box from "@mui/material/Box";

function TimerComponent({time="01:03"}){
    return <Box className='infoText'>{time}</Box>
}

function UserInfoComponent({userId}){
    return <Box className='infoText'>{userId}</Box>
}

function RoundNumberIdComponent({roundNumber=0}) {
    return <Box className='infoText'>{roundNumber}</Box>
}

export function InfoComponent({userId}){
    return (
        <Box className='infoComponent'>
            <RoundNumberIdComponent/>
            <TimerComponent/>
            <UserInfoComponent userId={userId}/>
        </Box>
    )
}