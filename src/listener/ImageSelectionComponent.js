import Box from "@mui/material/Box";
import { getImages } from '../api/ApiCalls'
import { PictureToggleButtons } from '../common/PictureToggleButtons'

function generateRows(topics){
    let content = [];
    content.push(PictureToggleButtons(topics,"horizonstalToggleButton"))
    return content;
}
  
export default function ImageSelectionComponent(){
    let rows = generateRows(getImages());
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
  