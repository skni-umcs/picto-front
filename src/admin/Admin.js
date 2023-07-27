import React from "react";
import Box from "@mui/material/Box";
import { ElementConfigComponent, PreviewElementList, ListOfPreviewElementLists } from './ConfigComponent'

import * as ApiCalls from '../api/ApiCalls'

function Admin() {
    return (
      <Box  
        sx={{
          flexDirection: 'column',
          display: 'flex',
          flexWrap: 'nowrap',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          justifyContent : 'space-between',
          gap: 5
        }}
      >
        <ElementConfigComponent
        name="SelectionWidth"
        defaultValue={ApiCalls.getSelectionWidth()}
        >
        </ElementConfigComponent>
        <ElementConfigComponent
        name="SelectionHeight"
        defaultValue={ApiCalls.getSelectionHeight()}
        >
        </ElementConfigComponent>
        <ElementConfigComponent
        name="TopicsLength"
        defaultValue={ApiCalls.getImagesLength()}
        >
        </ElementConfigComponent>
        <PreviewElementList
        name="Images"
        list={ApiCalls.getImages()}
        >
        </PreviewElementList>
        <ListOfPreviewElementLists
        name="Symbols"
        list={ApiCalls.getSelectionSymbols()}
        >

        </ListOfPreviewElementLists>
      </Box>
    )
  }
  
export default Admin;