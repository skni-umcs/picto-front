import './App.css';
import { DataGrid } from '@mui/x-data-grid';

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

function siteContent(){
  let selectionSymbols = getSelectionSymbols();
  let columns = generateColumns(getSelectionWidth());
  let rows = generateRows(getSelectionHeight(),columns, selectionSymbols);
  return (
    <div>
      <DataGrid slots={{columnHeaders: () => null}} hideFooter rows={rows} columns={columns}></DataGrid>
    </div>
  )
}

function App() {
  return siteContent();
}

export default App;
