import './App.css';
import { DataGrid } from '@mui/x-data-grid';
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
  return [{value: "elephant", path: "elephant.png"},{value: "kettle", path: "kettle.png"},{value: "grass", path: "grass.png"},{value: "knife", path: "knife.png"}]
}

function generateColumns(width){
  let columns = [];
  for(let i = 0;i<width;++i){
    columns.push({field: `col${i}`, width: 150});
    console.log("c");
  }
  return columns;
}
function generateRows(height, columns, selectionSymbols){
  let rows = [];
  for(let j = 0;j<height;++j){
    let toAdd = {id: j};
    for(let i = 0;i<columns.length;++i){
      toAdd[`col${i}`] = selectionSymbols[i][j].path;
    }
    rows.push(toAdd);
  }
  return rows;
}

function symbolSelectionComponent(){
  let selectionSymbols = getSelectionSymbols();
  let columns = generateColumns(getSelectionWidth());
  let rows = generateRows(getSelectionHeight(),columns, selectionSymbols);
  return (
      <DataGrid slots={{columnHeaders: () => null}} hideFooter rows={rows} columns={columns}></DataGrid>
  )
}

function topicComponent(){
  let rows = []
  let topics = getTopics()
  for(let i = 0;i<topics.length;++i){
    rows.push({id: i, 'col1': topics[i].path})
  }
  return (
    <DataGrid slots={{columnHeaders: () => null}} hideFooter rows={rows} columns={[{field: 'col1', width: 150}]}></DataGrid>
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
