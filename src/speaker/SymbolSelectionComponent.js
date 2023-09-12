import Box from '@mui/material/Box';
import {PictureToggleButtons} from '../common/PictureToggleButtons.js';
import {PictureComponent} from '../common/ImageComponent';

function generateRows(width, selectionSymbols) {
  const rows = [];
  for (let j = 0; j < width; ++j) {
    let height = selectionSymbols[j].length;
    let columnContent = [];
    for (let i = 0; i < height; ++i) {
      selectionSymbols[j][i].key = selectionSymbols[j][i].id
      columnContent.push(selectionSymbols[j][i]);
    }
    rows.push({columnContent, key: j});
  }
  return rows;
}

export default function SymbolSelectionComponent({chosenSymbols, setChosenSymbol, selectionSymbols}) {
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
  