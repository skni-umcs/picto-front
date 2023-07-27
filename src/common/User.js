import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

import React from "react";
import imageComponent from './ImageComponent'
import symbolSelectionComponent from '../speaker/SymbolSelectionComponent'
import submitComponent from './SubmitComponent'


const Wrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridGap: '75%',
  marginTop: 30
});

function User() {
    return (
      <Container maxWidth={false}>
        <Wrapper>
          <Box>{imageComponent()}</Box>
          <Box>{symbolSelectionComponent()}</Box>
          <Box sx={{display:'flex', justifyContent: 'center'}}>{submitComponent()}</Box>
        </Wrapper>
      </Container>
    )
  }
  
export default User;
  