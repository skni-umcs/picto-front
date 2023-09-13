import Box from '@mui/material/Box';

function Result({result}) {
  if(result == null) {
    result = {}
  }
  let correct = result.result === "CORRECT";
  return (<>
          {correct && <Box className="resultFieldCorrect">CORRECT</Box>}
          {!correct && <Box className="resultFieldWrong">WRONG</Box>}
    </>);
}

export default Result;