import Box from '@mui/material/Box';
import {PictureToggleButtons} from '../common/PictureToggleButtons.js';

function generateRows(width, selectionSymbols) {
  const rows = [];
  for (let j = 0; j < width; ++j) {
    let height = selectionSymbols[j].length;
    let columnContent = [];
    for (let i = 0; i < height; ++i) {
      columnContent.push(selectionSymbols[j][i]);
      console.log(selectionSymbols[j][i].path);
    }
    rows.push({columnContent});
    console.log(rows);
  }
  return rows;
}

export default function SymbolSelectionComponent({setChosenSymbol, selectionSymbols}) {
  const rows = generateRows(selectionSymbols.length, selectionSymbols);
  return (
      <Box
          className={'symbolSelectionComponent'}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            p: 1,
            m: 1,
            justifyContent: 'space-between',
          }}
      >
        {rows.map(row => <PictureToggleButtons
                picture_array={row.columnContent}
                setChosenSymbol={setChosenSymbol}
                groupClassName="symbolToggleButtons"
                selectedClassName="symbolSelected"
                notSelectedClassName="symbolNotSelected"
                formLabelClassName="symbolFormLabel"
            />,
        )}
      </Box>
  );
}
  