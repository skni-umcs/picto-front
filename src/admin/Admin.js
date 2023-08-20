import React from "react";
import Box from "@mui/material/Box";
import { CheckBoxConfigComponent, ElementConfigComponent, PreviewElementList, ListOfPreviewElementLists } from './ConfigComponent'
import Button from '@mui/material/Button';

import * as ApiCalls from '../api/ApiCalls'

function ConfigsComponent(){
  return (
    <Box  
    sx={{
      width: '50%',
      flexDirection: 'column',
      display: 'flex',
      flexWrap: 'nowrap',
      p: 1,
      m: 1,
      bgcolor: 'background.paper',
      borderRadius: 1,
      justifyContent : 'space-between',
      gap: 4
    }}
  >
    <ElementConfigComponent
    name="SelectionWidth"
    defaultValue={ApiCalls.getSelectionWidth()}
    />
    <ElementConfigComponent
    name="SelectionHeight"
    defaultValue={ApiCalls.getSelectionHeight()}
    />
    <ElementConfigComponent
    name="TopicsLength"
    defaultValue={ApiCalls.getImagesLength()}
    />
    <CheckBoxConfigComponent
    name="EnableTimer"
    defaultValue={ApiCalls.getEnabledTimer()}
    />
    <PreviewElementList
    name="Images"
    list={ApiCalls.getImages()}
    />
    <ListOfPreviewElementLists
    name="Symbols"
    list={ApiCalls.getSelectionSymbols()}
    />
  </Box>
  )
}

function GameButtonsComponent(){
  return (
    <Box
    sx={{
      width: '50%',
      flexDirection: 'column',
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent : 'center',
      alignItems: 'center'
    }}
  >
    <Box>
      <Button onClick={ApiCalls.startGame}>
        Start Game
      </Button>
      <Button onClick={ApiCalls.beginGame}>
        Begin Game
      </Button>
      <Button onClick={ApiCalls.finishGame}>
        Finish Game
      </Button>
    </Box>
  </Box>
  )
}

function Admin() {
    return (
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          flexWrap: 'nowrap',
          borderRadius: 1,
          flex: 1
        }}
      >
        {ConfigsComponent()}
        {GameButtonsComponent()}
      </Box>
    )
  }
  
export default Admin;