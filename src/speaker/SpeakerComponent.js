import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureComponent, PictureListComponent} from '../common/ImageComponent';
import SymbolSelectionComponent from '../speaker/SymbolSelectionComponent';
import SpeakerSubmitComponent from '../speaker/SpeakerSubmitComponent';
import {InfoComponent} from '../common/InfoComponent';
import AllSelectedSymbolsComponent from '../common/AllSelectedSymbolsComponent'

function SpeakerComponent({userId, setUserState, images, symbols, roundId, generation}) {
  const [chosenSymbols, setChosenSymbolsObject] = useState({});

  function setChosenSymbol(symbolId, groupId) {
    let newChosenSymbols = Object.assign({}, chosenSymbols);
    newChosenSymbols[groupId] = symbolId;
    setChosenSymbolsObject(newChosenSymbols);
  }

  if (images === null) {
    images = [];
  }
  if (symbols === null) {
    symbols = [];
  }
  return (
      <Container className="speakerComponent">
        <Box className="speakerWrapper">
          <InfoComponent userId={userId} generation={generation}/>
          <PictureListComponent pictures={images}
                                className="imageListComponent"/>
          <Box className="symbolsWrapper">
            <SymbolSelectionComponent setChosenSymbol={setChosenSymbol}
                                      selectionSymbols={symbols}
                                      chosenSymbols={chosenSymbols}/>
            <AllSelectedSymbolsComponent selectionSymbols={symbols}
            chosenSymbols={chosenSymbols}/>
          </Box>
          <SpeakerSubmitComponent chosenSymbols={chosenSymbols}
                                  setUserState={setUserState}
                                  userId={userId}
                                  roundId={roundId}/>
        </Box>
      </Container>
  );
}

export default SpeakerComponent;