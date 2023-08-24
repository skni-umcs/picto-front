import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";


import React from "react";
import { PictureListComponent } from "../common/ImageComponent"
import { getSelectedSymbols } from "../api/ApiCalls";
import ImageSelectionComponent from "../listener/ImageSelectionComponent"
import { InfoComponent } from '../common/InfoComponent'
import submitComponent from "../common/SubmitComponent";

const Wrapper = styled(Box)({
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    height: '100%'
  });

function SymbolListComponent() {
    return PictureListComponent(getSelectedSymbols())
}

function middleComponents(userId, alignment, setAlignment, setChosenImage){
    return [ImageSelectionComponent(alignment, setAlignment,setChosenImage), InfoComponent(userId)]
}

function ListenerComponent(userId, alignment, setAlignment, chosenImage, setChosenImage) {
    return (
        <Container className="fillSite">
            <Wrapper>
                <Box>{SymbolListComponent()}</Box>
                <Box className="doubleSplit">{middleComponents(userId, alignment, setAlignment, setChosenImage)}</Box>
                <Box>{submitComponent(chosenImage)}</Box>
            </Wrapper>
    </Container>
    )
}

export default ListenerComponent;