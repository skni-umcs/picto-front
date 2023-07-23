import './App.css';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

const Wrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridGap: 80,
  marginTop: 30
});

function getSelectionWidth(){
  return 3;
}

function getSelectionHeight(){
  return 3;
}

function getSelectionSymbols(){
  return [
  [{value: "black", path: "black.png"}, {value: "white", path: "white.png"}, {value: "gray", path: "gray.png"}],
  [{value: "one", path: "one.png"}, {value: "two", path: "two.png"}, {value: "three", path: "three.png"}],
  [{value: "circle", path: "circle.png"}, {value: "square", path: "square.png"}, {value: "triangle", path: "triangle.png"}]
  ];
}

function getTopics(){
  return [{value: "elephant", path: "elephant.png", chosen: false},{value: "kettle", path: "kettle.png", chosen: true},{value: "grass", path: "grass.png", chosen: false},{value: "knife", path: "knife.png", chosen: false}]
}

function generateRows(height, width, selectionSymbols){
  let rows = [];
  for(let j = 0;j<width;++j){
    let columnContent = []
    for(let i = 0;i<height;++i){
      let toAdd = <Box>{selectionSymbols[j][i].path}</Box>;
      columnContent.push(toAdd);
    }
    rows.push(<Box>{columnContent}</Box>)
  }
  return rows;
}

function symbolSelectionComponent(){
  let selectionSymbols = getSelectionSymbols();
  let rows = generateRows(getSelectionHeight(),getSelectionWidth(), selectionSymbols);
  return (
      <Box sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        justifyContent : 'space-between'
      }}>{rows}</Box>
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
    <Box sx={{
      display: 'flex',
      flexWrap: 'nowrap',
      p: 1,
      m: 1,
      bgcolor: 'background.paper',
      borderRadius: 1,
      justifyContent : 'space-between'
    }}>{rows}</Box>
  )
}

function siteContent(){
  return (
    <Container>
      <Wrapper>
        <Box>{topicComponent()}</Box>
        <Box>{symbolSelectionComponent()}</Box>
      </Wrapper>
    </Container>
  )
}

function App() {
  return siteContent();
}

export default App;
