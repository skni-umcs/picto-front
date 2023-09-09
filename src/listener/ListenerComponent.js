import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureListComponent} from '../common/ImageComponent';
import ImageSelectionComponent from '../listener/ImageSelectionComponent';
import {InfoComponent} from '../common/InfoComponent';
import ListenerSubmitComponent from '../listener/ListenerSubmitComponent';

function ListenerComponent({userId, setUserState, images, symbols}) {
  const [chosenImage, setChosenImageObject] = useState(null);

  function setChosenImage(imageId, groupId) {
    setChosenImageObject(imageId);
  }

  if(images === null) {
    images = [];
  }
  if(symbols === null) {
    symbols = [[]];
  }

  return (
      <Container className="listenerComponent">
        <Box className="listenerWrapper">
          <InfoComponent userId={userId}/>
          <ImageSelectionComponent images={images} setChosenImage={setChosenImage}/>
          <PictureListComponent
              pictures={symbols[0]}
              className="symbolListComponent"/>
          <ListenerSubmitComponent
              imageSelected={chosenImage}
              setUserState={setUserState}/>
        </Box>
      </Container>
  );
}

export default ListenerComponent;