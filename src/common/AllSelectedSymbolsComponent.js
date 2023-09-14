import Box from '@mui/material/Box';
import {Container} from '@mui/material';

import React, {useState} from 'react';
import {PictureComponent} from '../common/ImageComponent';
import ImageSelectionComponent from '../listener/ImageSelectionComponent';
import {InfoComponent} from '../common/InfoComponent';
import ListenerSubmitComponent from '../listener/ListenerSubmitComponent';

export default function AllSelectedSymbolsComponent({selectionSymbols, chosenSymbols=[], selectAll=false}) {
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
                    if (allChosenIds.includes(symbol.id) || selectAll) {
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