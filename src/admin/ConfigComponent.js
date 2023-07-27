import { Container } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

export function ElementConfigComponent({name, defaultValue}) {
    return (
      <Container maxWidth={false}>
        { name }: {<input value={defaultValue}></input> }
      </Container>
    )
}