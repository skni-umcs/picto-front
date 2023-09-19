import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureListComponent} from '../common/ImageComponent';
import ImageSelectionComponent from '../listener/ImageSelectionComponent';
import {InfoComponent} from '../common/InfoComponent';
import ListenerSubmitComponent from '../listener/ListenerSubmitComponent';
import AllSelectedSymbolsComponent from '../common/AllSelectedSymbolsComponent';
import Button from '@mui/material/Button';
import {submitListener} from '../api/ApiCalls';

function ListenerComponent({userId, setUserState, images, symbols, roundId, generation, startTime, waitMs}) {
  const [chosenImage, setChosenImageObject] = useState(null);

  function setChosenImage(imageId, groupId) {
    setChosenImageObject(imageId);
  }

  if (images === null) {
    images = [];
  }
  if (symbols === null) {
    symbols = [[]];
  }

  return (
      <Container className="listenerComponent">
        <Box className="listenerWrapper">
          <InfoComponent userId={userId} generation={generation} waitMs={waitMs}/>
          <Box className="allSelectedSymbolsListener"><AllSelectedSymbolsComponent selectionSymbols={symbols} selectAll={true}/></Box>
          <ImageSelectionComponent images={images}
                                   setChosenImage={setChosenImage}/>
          <Box className="listenerSubmitContainer">{chosenImage != null && <Button
              className="listenerSubmitButton"
              onClick={() => submitListener(userId, roundId, Date.now()-startTime, chosenImage, {},
                  setUserState)}>Wyślij</Button>}</Box>
        </Box>
      </Container>
  );
}

export default ListenerComponent;