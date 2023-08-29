import React from "react";
import Box from "@mui/material/Box";

function TimerComponent(){
    return <Box className='infoText'>01:03</Box>
}

function UserInfoComponent({userId}){
    return <Box className='infoText'>{userId}</Box>
}

export function InfoComponent({userId}){
    return (
        <Box>
            <UserInfoComponent userId={userId}/>
            <TimerComponent></TimerComponent>
        </Box>
    )
}