import Box from "@mui/material/Box";
import { getImages } from '../api/ApiCalls'
import { ImageListItem } from "@mui/material";

export function PictureComponent({path, chosen}){
  console.log(chosen)
  return (
  <Box sx={{
    border: chosen ? "7px" : "0px",
    borderColor: 'red',
    borderStyle: "solid"
  }}>
    <ImageListItem>
      <img 
      alt="failed to load image"
      src={`${path}`}
      style={{
          maxHeight: 100,
          maxWidth: 200,
        }}
      />
    </ImageListItem>
  </Box>
  )
}

export function PictureListComponent({pictures}){
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
      {pictures.map(picture => <PictureComponent path={picture.path} chosen={picture.chosen}></PictureComponent>)}
    </Box>
  )
}

export default function ImagesListComponent(){
    return <PictureListComponent pictures={getImages()}/>;
}
  