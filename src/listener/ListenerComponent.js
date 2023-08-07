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

function middleComponents(){
    return [ImageSelectionComponent(), InfoComponent()]
}

function ListenerComponent() {
    return (
        <Container 
            maxWidth={false} 
            sx={{
            height: '100%'
        }}
        >
            <Wrapper>
                <Box>{SymbolListComponent()}</Box>
                <Box className="doubleSplit">{middleComponents()}</Box>
                <Box>{submitComponent()}</Box>
            </Wrapper>
    </Container>
    )
}

export default ListenerComponent;