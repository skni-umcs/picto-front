import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

import React from "react";
import ImagesListComponent from './ImageComponent'
import symbolSelectionComponent from '../speaker/SymbolSelectionComponent'
import submitComponent from './SubmitComponent'
import { InfoComponent } from '../common/InfoComponent'


const Wrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  height: '100%'
});

function middleComponents(){
  return [symbolSelectionComponent(), InfoComponent()]
}

function User() {
    return (
      <Container 
        maxWidth={false} 
        sx={{
          height: '100%'
        }}
      >
        <Wrapper>
          <Box>{ImagesListComponent()}</Box>
          <Box sx={{display: 'grid', gridTemplateColumns: "75% 25%"}}>{middleComponents()}</Box>
          <Box sx={{display:'flex', justifyContent: 'center'}}>{submitComponent()}</Box>
        </Wrapper>
      </Container>
    )
  }
  
export default User;
  