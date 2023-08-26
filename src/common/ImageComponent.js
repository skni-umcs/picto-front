import Box from "@mui/material/Box";
import { getImages } from '../api/ApiCalls'
import { ImageListItem } from "@mui/material";

export function PictureComponent({path}){
  return (
  <ImageListItem>
  <img 
  alt="failed to load image"
  src={`${path}`}
  style={{
      borderColor: 'red',
      borderWidth: 5,
      maxHeight: 100,
      maxWidth: 200,
    }}
  />
  </ImageListItem>
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
      {pictures.map(picture => <PictureComponent path={picture.path}></PictureComponent>)}
    </Box>
  ) //need to move box to Picture Component
}

export default function ImagesListComponent(){
    return <PictureListComponent pictures={getImages()}/>;
}
  