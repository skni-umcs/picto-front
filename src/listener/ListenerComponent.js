import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureListComponent} from '../common/ImageComponent';
import {getSelectedSymbols} from '../api/ApiCalls';
import ImageSelectionComponent from '../listener/ImageSelectionComponent';
import {InfoComponent} from '../common/InfoComponent';
import ListenerSubmitComponent from '../listener/ListenerSubmitComponent';

function ListenerComponent({userId, setUserState}) {
  const [chosenImage, setChosenImageObject] = useState(null);

  function setChosenImage(imageId, groupId) {
    setChosenImageObject(imageId);
  }

  return (
      <Container className="listenerComponent">
        <Box className="listenerWrapper">
          <InfoComponent userId={userId}/>
          <ImageSelectionComponent setChosenImage={setChosenImage}/>
          <PictureListComponent
              pictures={getSelectedSymbols()}
              className="symbolListComponent"/>
          <ListenerSubmitComponent
              imageSelected={chosenImage}
              setUserState={setUserState}/>
        </Box>
      </Container>
  );
}

export default ListenerComponent;