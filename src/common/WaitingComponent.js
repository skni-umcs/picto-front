import Box from "@mui/material/Box";
import React from "react";

function WaitingComponent({userId="No user id provided"}) {
    return (
        <Box className="waitingComponent">
            <Box className="waitingComponentsContainer">
                <Box className="awaitingRound">Awaiting Round</Box>
                <Box className="awaitingRoundUserId">{userId}</Box>
            </Box>
        </Box>
    )
}

export default WaitingComponent;