import React from "react";
import Box from "@mui/material/Box";
import { ElementConfigComponent, ListConfigComponent, ListOfListConfigComponent } from './ConfigComponent'

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
        value={ApiCalls.getSelectionWidth()}
        >
        </ElementConfigComponent>
        <ElementConfigComponent
        name="SelectionHeight"
        value={ApiCalls.getSelectionHeight()}
        >
        </ElementConfigComponent>
        <ElementConfigComponent
        name="TopicsLength"
        value={ApiCalls.getTopicsLength()}
        >
        </ElementConfigComponent>
        <ListConfigComponent
        name="Topics"
        value={ApiCalls.getTopics().map((topic) => {return topic.path})}
        length={ApiCalls.getTopics().length}
        >
        </ListConfigComponent>
        <ListOfListConfigComponent
        name="Symbols"
        value={ApiCalls.getSelectionSymbols().map((symbol_array) => {return symbol_array.map((symbol) => {return symbol.path})})}
        length={ApiCalls.getSelectionHeight()}
        >
        </ListOfListConfigComponent>
      </Box>
    )
  }
  
export default Admin;