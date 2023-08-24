import Box from "@mui/material/Box";
import { PictureToggleButtons } from '../common/PictureToggleButtons.js'

import { getSelectionHeight } from '../api/ApiCalls'
import { getSelectionWidth } from '../api/ApiCalls'

import { getSelectionSymbols } from '../api/ApiCalls'

function generateRows(height, width, selectionSymbols, alignment, setAlignment,chosenSymbols,setChosenSymbol){
    let rows = [];
    for(let j = 0;j<width;++j){
      let columnContent = []
      for(let i = 0;i<height;++i){
        columnContent.push(selectionSymbols[j][i]);
        console.log(selectionSymbols[j][i].path)
      }
      rows.push(PictureToggleButtons(columnContent,alignment,setAlignment,chosenSymbols,setChosenSymbol))
    }
    return rows;
  }
  
export default function SymbolSelectionComponent(alignment, setAlignment,chosenSymbols, setChosenSymbol){
    let selectionSymbols = getSelectionSymbols();
    let rows = generateRows(getSelectionHeight(),getSelectionWidth(), selectionSymbols, alignment, setAlignment,chosenSymbols, setChosenSymbol);
    return (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            justifyContent : 'space-between'
          }}
        >
          {rows}
        </Box>
    )
}
  