import { Container } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

export function ElementConfigComponent({name, value}) {
    return (
      <Container maxWidth={false}>
        { name }: {<input defaultValue={value}></input> }
      </Container>
    )
}

export function ListConfigComponent({name, value, length}) {
    let children = []
    for(let i = 0;i<length;++i){
        children.push(<ElementConfigComponent name={`${name}${i}`} value={value[i]}></ElementConfigComponent>)
    }
    return (<Box>{children}</Box>);
}

export function ListOfListConfigComponent({name, value, length}){
    let children = []
    for(let i = 0;i<length;i++){
        children.push(<ListConfigComponent name={`${name}${i}`} value={value[i]} length={value[i].length}></ListConfigComponent>)
    }
    return children;
}