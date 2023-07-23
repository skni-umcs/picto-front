import './App.css';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Container, ToggleButton } from "@mui/material";
import Button from "@mui/material/Button"
import { ToggleButtons } from './ToggleButtons.js'

const Wrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridGap: '75%',
  marginTop: 30
});

function getSelectionWidth(){
  return 3;
}

function getSelectionHeight(){
  return 3;
}

function getSelectionSymbols(){ 
  return [ //throws an error but these are only placeholder values
  [{value: "black", path: "black.png"}, {value: "white", path: "white.png"}, {value: "gray", path: "gray.png"}],
  [{value: "one", path: "one.png"}, {value: "two", path: "two.png"}, {value: "three", path: "three.png"}],
  [{value: "circle", path: "circle.png"}, {value: "square", path: "square.png"}, {value: "triangle", path: "triangle.png"}]
  ];
}

function getTopics(){
  return [ //throws an error but these are only placeholder values
    {value: "elephant", path: "elephant.png", chosen: false},
    {value: "kettle", path: "kettle.png", chosen: true},
    {value: "grass", path: "grass.png", chosen: false},
    {value: "knife", path: "knife.png", chosen: false}
  ]
}

function submit(){
  console.log("backend where")
}




function generateRows(height, width, selectionSymbols){
  let rows = [];
  for(let j = 0;j<width;++j){
    let columnContent = []
    for(let i = 0;i<height;++i){
      columnContent.push(selectionSymbols[j][i]);
    }
    rows.push(ToggleButtons(columnContent))
  }
  return rows;
}

function symbolSelectionComponent(){
  let selectionSymbols = getSelectionSymbols();
  let rows = generateRows(getSelectionHeight(),getSelectionWidth(), selectionSymbols);
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

function topicComponent(){
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

function submitComponent(){
  return <Button onClick={submit}>submit</Button>;
}

function siteContent(){
  return (
    <Container maxWidth={false}>
      <Wrapper>
        <Box>{topicComponent()}</Box>
        <Box>{symbolSelectionComponent()}</Box>
        <Box sx={{display:'flex', justifyContent: 'center'}}>{submitComponent()}</Box>
      </Wrapper>
    </Container>
  )
}

function App() {
  return siteContent();
}

export default App;
