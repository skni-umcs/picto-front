import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureComponent, PictureListComponent} from '../common/ImageComponent';
import SymbolSelectionComponent from '../speaker/SymbolSelectionComponent';
import SpeakerSubmitComponent from '../speaker/SpeakerSubmitComponent';
import {InfoComponent} from '../common/InfoComponent';

function SpeakerComponent({userId, setUserState, images, symbols, roundId, generation}) {
  const [chosenSymbols, setChosenSymbolsObject] = useState({});

  function setChosenSymbol(symbolId, groupId) {
    let newChosenSymbols = Object.assign({}, chosenSymbols);
    newChosenSymbols[groupId] = symbolId;
    setChosenSymbolsObject(newChosenSymbols);
  }

  function AllSelectedSymbolsComponent({selectionSymbols}) {
    let allChosenIds = [];
    Object.entries(chosenSymbols).forEach(([groupId, id]) => {
      allChosenIds.push(id);
    });
    return <Box className="allSelectedSymbols">
      {
        selectionSymbols.map(
            row => {
              return row.map(
                  symbol => {
                    if (allChosenIds.includes(symbol.id)) {
                      return <PictureComponent
                          path={symbol.path}
                          className={"symbolOverlap"}
                      />;
                    }
                  },
              );
            },
        )
      }
    </Box>;
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
            <AllSelectedSymbolsComponent selectionSymbols={symbols}/>
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