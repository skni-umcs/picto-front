import Box from "@mui/material/Box";
import { getImages } from '../api/ApiCalls'
import { ImageListItem } from "@mui/material";

export function PictureComponent({path}){
  console.log(path)
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

export function PictureListComponent(pictures){
  let rows = []
  for(let i = 0;i<pictures.length;++i){
    if(pictures[i].chosen){
      rows.push(<Box sx={{padding: 1, borderRadius:1, border: 5, borderColor: 'error.main'}}>{<PictureComponent path={pictures[i].path}/>}</Box>)
    }
    else{
      rows.push(<PictureComponent path={pictures[i].path}/>)
    }
  }
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

export default function ImagesListComponent(){
    return PictureListComponent(getImages());
}
  