import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";


import React from "react";
import { PictureListComponent } from "../common/ImageComponent"
import { getSelectedSymbols } from "../api/ApiCalls";
import ImageSelectionComponent from "../listener/ImageSelectionComponent"
import { InfoComponent } from '../common/InfoComponent'
import ListenerSubmitComponent from "../listener/ListenerSubmitComponent";

import {useState} from 'react'

const Wrapper = styled(Box)({
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    height: '100%'
  });

function SymbolListComponent() {
    return <PictureListComponent pictures={getSelectedSymbols()}/>
}

function ListenerComponent({userId, setUserState}) {
    const [chosenImage, setChosenImageObject] = useState(null)
    function setChosenImage(imageId, groupId) {
        setChosenImageObject(imageId)
    }
    return (
        <Container className="listenerComponent">
            <Wrapper>
                <Box><SymbolListComponent/></Box>
                <Box className="doubleSplit"><ImageSelectionComponent setChosenImage={setChosenImage}/><InfoComponent userId={userId}/></Box>
                <Box><ListenerSubmitComponent imageSelected={chosenImage} setUserState={setUserState}/></Box>
            </Wrapper>
    </Container>
    )
}

export default ListenerComponent;