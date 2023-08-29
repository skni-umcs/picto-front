import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

import React from "react";
import ImagesListComponent from '../common/ImageComponent'
import SymbolSelectionComponent from '../speaker/SymbolSelectionComponent'
import SpeakerSubmitComponent from '../speaker/SpeakerSubmitComponent'
import { InfoComponent } from '../common/InfoComponent'

import {useState} from "react"

const Wrapper = styled(Box)({
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    height: '100%'
  });
  

function SpeakerComponent({userId, setUserState}) {
    const [chosenSymbols, setChosenSymbolsObject] = useState({})
    function setChosenSymbol(symbolId, groupId) {
        let newChosenSymbols = chosenSymbols
        newChosenSymbols[groupId] = symbolId
        setChosenSymbolsObject(newChosenSymbols)
        console.log(chosenSymbols)
    }
    return (
    <Container className="speakerComponent">
        <Wrapper> 
        <Box><ImagesListComponent></ImagesListComponent></Box>
        <Box className="doubleSplit"><SymbolSelectionComponent setChosenSymbol={setChosenSymbol}/><InfoComponent userId={userId}/></Box>
        <Box><SpeakerSubmitComponent chosenSymbols={chosenSymbols} setUserState={setUserState}/></Box>
        </Wrapper>
    </Container>
    )
}

export default SpeakerComponent;