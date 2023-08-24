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
  
function middleComponents(userId, setChosenSymbol){
    return [SymbolSelectionComponent(setChosenSymbol), InfoComponent(userId)]
}

function SpeakerComponent(userId, chosenSymbols, setChosenSymbol) {
    return (
    <Container className="fillSite">
        <Wrapper>
        <Box>{ImagesListComponent()}</Box>
        <Box className="doubleSplit">{middleComponents(userId, setChosenSymbol)}</Box>
        <Box>{submitComponent(chosenSymbols)}</Box>
        </Wrapper>
    </Container>
    )
}

export default SpeakerComponent;