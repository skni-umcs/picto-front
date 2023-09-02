import Box from "@mui/material/Box";
import { PictureToggleButtons } from '../common/PictureToggleButtons.js'

import { getSelectionHeight } from '../api/ApiCalls'
import { getSelectionWidth } from '../api/ApiCalls'

import { getSelectionSymbols } from '../api/ApiCalls'

function generateRows(height, width, selectionSymbols){
    const rows = [];
    for(let j = 0;j<width;++j){
      let columnContent = []
      for(let i = 0;i<height;++i){
        columnContent.push(selectionSymbols[j][i]);
        console.log(selectionSymbols[j][i].path)
      }
      rows.push({columnContent})
      console.log(rows)
    }
    return rows;
  }
  
export default function SymbolSelectionComponent({setChosenSymbol}){
    const selectionSymbols = getSelectionSymbols();
    const rows = generateRows(getSelectionHeight(),getSelectionWidth(), selectionSymbols, 0, 0,0, 0);
    return (
        <Box
          className={"symbolSelectionComponent"}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            p: 1,
            m: 1,
            justifyContent : 'space-between'
          }}
        >
          {rows.map(row => <PictureToggleButtons 
            picture_array={row.columnContent} 
            setChosenSymbol={setChosenSymbol} 
            groupClassName="symbolToggleButtons"
            selectedClassName="symbolSelected"
            notSelectedClassName="symbolNotSelected" 
            formLabelClassName="symbolFormLabel"
            />
          )}
        </Box>
    )
}
  