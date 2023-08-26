import Box from "@mui/material/Box";
import { getImages } from '../api/ApiCalls'
import { PictureToggleButtons } from '../common/PictureToggleButtons'

function generateRows(topics, setChosenImage){
    let content = [];
    content.push({topics,setChosenImage,className: "horizontalToggleButton"})
    return content;
}
  
export default function ImageSelectionComponent({setChosenImage}){
  let rows = generateRows(getImages(),setChosenImage);
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
        {rows.map((row) => {return <PictureToggleButtons picture_array={row.topics} setChosenSymbol={row.setChosenImage} className={row.className}/>})}
      </Box>
  )
}
  