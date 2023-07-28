import React from "react";
import Box from "@mui/material/Box";
import './InfoComponent.css'

function TimerComponent(){
    return <Box className='infoText'>01:03</Box>
}

function UserInfoComponent(){
    return <Box className='infoText'>#64</Box>
}

export function InfoComponent(){
    return (
        <Box>
            {UserInfoComponent()}
            {TimerComponent()}
        </Box>
    )
}