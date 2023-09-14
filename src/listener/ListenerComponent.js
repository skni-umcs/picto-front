import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureListComponent} from '../common/ImageComponent';
import ImageSelectionComponent from '../listener/ImageSelectionComponent';
import {InfoComponent} from '../common/InfoComponent';
import ListenerSubmitComponent from '../listener/ListenerSubmitComponent';
import AllSelectedSymbolsComponent from '../common/AllSelectedSymbolsComponent';

function ListenerComponent({userId, setUserState, images, symbols, roundId, generation}) {
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
          <InfoComponent userId={userId} generation={generation}/>
          <ImageSelectionComponent images={images}
                                   setChosenImage={setChosenImage}/>
        <AllSelectedSymbolsComponent symbols={symbols[0]} selectAll={true}/>
          <ListenerSubmitComponent
              imageSelected={chosenImage}
              setUserState={setUserState}
              userId={userId}
              roundId={roundId}/>
        </Box>
      </Container>
  );
}

export default ListenerComponent;