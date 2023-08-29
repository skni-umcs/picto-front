import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

import React from "react";
import {PictureListComponent} from '../common/ImageComponent'
import SymbolSelectionComponent from '../speaker/SymbolSelectionComponent'
import SpeakerSubmitComponent from '../speaker/SpeakerSubmitComponent'
import { InfoComponent } from '../common/InfoComponent'

import { getImages } from '../api/ApiCalls'

import {useState} from "react"

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
        <Box className="speakerWrapper"> 
            <InfoComponent userId={userId}/>
            <PictureListComponent pictures={getImages()} className="imageListComponent"/>;
            <SymbolSelectionComponent setChosenSymbol={setChosenSymbol}/>
            <SpeakerSubmitComponent chosenSymbols={chosenSymbols} setUserState={setUserState}/>
        </Box>
    </Container>
    )
}

export default SpeakerComponent;