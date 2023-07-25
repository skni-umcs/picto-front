import Box from "@mui/material/Box";

import { getTopics } from '../api/ApiCalls'

export default function topicComponent(){
    let rows = []
    let topics = getTopics()
    for(let i = 0;i<topics.length;++i){
      if(topics[i].chosen){
        rows.push(<Box sx={{padding: 1, borderRadius:1, border: 5, borderColor: 'error.main'}}>{topics[i].path}</Box>)
      }
      else{
        rows.push(<Box>{topics[i].path}</Box>)
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
  