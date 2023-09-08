import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureListComponent} from '../common/ImageComponent';
import SymbolSelectionComponent from '../speaker/SymbolSelectionComponent';
import SpeakerSubmitComponent from '../speaker/SpeakerSubmitComponent';
import {InfoComponent} from '../common/InfoComponent';

function SpeakerComponent({userId, setUserState, images, symbols}) {
  const [chosenSymbols, setChosenSymbolsObject] = useState({});

  function setChosenSymbol(symbolId, groupId) {
    let newChosenSymbols = chosenSymbols;
    newChosenSymbols[groupId] = symbolId;
    setChosenSymbolsObject(newChosenSymbols);
    console.log(chosenSymbols);
  }

  console.log('bleblekania');
  console.log(images);
  if (images === null) {
    images = [];
  }
  if(symbols === null) {
    symbols = [];
  }
  return (
      <Container className="speakerComponent">
        <Box className="speakerWrapper">
          <InfoComponent userId={userId}/>
          <PictureListComponent pictures={images}
                                className="imageListComponent"/>
          <SymbolSelectionComponent setChosenSymbol={setChosenSymbol}
                                    selectionSymbols={symbols}/>
          <SpeakerSubmitComponent chosenSymbols={chosenSymbols}
                                  setUserState={setUserState}/>
        </Box>
      </Container>
  );
}

export default SpeakerComponent;