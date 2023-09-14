import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureListComponent} from '../common/ImageComponent';
import SymbolSelectionComponent from '../speaker/SymbolSelectionComponent';
import {InfoComponent} from '../common/InfoComponent';
import AllSelectedSymbolsComponent from '../common/AllSelectedSymbolsComponent';
import Button from '@mui/material/Button';
import {submitSpeaker} from '../api/ApiCalls';

function SpeakerComponent({
                            userId,
                            setUserState,
                            images,
                            symbols,
                            roundId,
                            generation,
                          }) {
  const [chosenSymbols, setChosenSymbolsObject] = useState({});
  const [answerTime, setAnswerTime] = useState(0);

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
          <Box sx={{display: 'flex', justifyContent: 'right'}}>
            {chosenSymbols != null && Object.keys(chosenSymbols).length ===
                symbols.length && <Button
                    className="speakerSubmitButton"
                    onClick={() => submitSpeaker(userId, roundId, answerTime,
                        chosenSymbols,
                        setUserState)}>submit</Button>}</Box>
        </Box>
      </Container>
  );
}

export default SpeakerComponent;