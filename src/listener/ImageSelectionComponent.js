import Box from '@mui/material/Box';
import {getImages} from '../api/ApiCalls';
import {PictureToggleButtons} from '../common/PictureToggleButtons';

function generateRows(topics, setChosenImage) {
  let content = [];
  content.push({topics, setChosenImage});
  return content;
}

export default function ImageSelectionComponent({images, setChosenImage}) {
  let rows = generateRows(images, setChosenImage);
  return (
      <Box
          className={'imageSelectionComponent'}
      >
        {rows.map((row) => {
          return <PictureToggleButtons
              picture_array={row.topics}
              setChosenSymbol={row.setChosenImage}
              groupClassName="imageToggleButtons"
              selectedClassName="imageSelected"
              notSelectedClassName="imageNotSelected"
              formLabelClassName="imageFormLabel"/>;
        })}
      </Box>
  );
}
  