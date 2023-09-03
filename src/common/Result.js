import Box from '@mui/material/Box';

function Result({joinUser}) {
  return (
      <Box sx={{flexDirection: 'column', display: 'flex'}}
           className={'joinComponent'}>
        <Box className="joinComponentsContainer">
          Temporary result screen
        </Box>
      </Box>
  );
}

export default Result;