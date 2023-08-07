import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

import React from "react";
import ImagesListComponent from '../common/ImageComponent'
import SymbolSelectionComponent from '../speaker/SymbolSelectionComponent'
import submitComponent from '../common/SubmitComponent'
import { InfoComponent } from '../common/InfoComponent'

const Wrapper = styled(Box)({
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    height: '100%'
  });
  
function middleComponents(){
    return [SymbolSelectionComponent(), InfoComponent()]
}

function SpeakerComponent() {
    return (
    <Container 
        maxWidth={false} 
        sx={{
            height: '100%'
        }}
    >
        <Wrapper>
        <Box>{ImagesListComponent()}</Box>
        <Box className="doubleSplit">{middleComponents()}</Box>
        <Box>{submitComponent()}</Box>
        </Wrapper>
    </Container>
    )
}

export default SpeakerComponent;