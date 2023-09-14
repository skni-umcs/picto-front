import Box from '@mui/material/Box';

function Result({result}) {
  if(result == null) {
    result = {}
  }
  let correct = result.result === "CORRECT";
  return (<>
          {correct && <Box className="resultFieldCorrect">DOBRZE</Box>}
          {!correct && <Box className="resultFieldWrong">ŹLE</Box>}
    </>);
}

export default Result;