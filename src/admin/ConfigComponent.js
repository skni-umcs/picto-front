import { Container } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

export function ElementConfigComponent({name, defaultValue}) {
    return (
      <Container maxWidth={false}>
        { name }: {<input defaultValue={defaultValue}></input> }
      </Container>
    )
}

export function PreviewElement({element}){
    return (
    <img 
    alt="failed to load image"
    src={require(`./${element.path}`)}
    onError={({ currentTarget }) => {
        console.log('eee xd')
        currentTarget.onerror = null; // prevents looping
        currentTarget.src="https://cdn.discordapp.com/attachments/377846006949085184/1133817331064250440/image.png";
    }}
    >
    </img>
  )
}

export function PreviewElementList({name, list}){
    return (
        <Box>
            { name }: { list.map((element, key) => {return <PreviewElement key={key} element={element}></PreviewElement>}) }
        </Box>
    )
}

export function ListOfPreviewElementLists({name, list}){
    let result = []
    for(let i = 0;i<list.length;++i){
        result.push(<PreviewElementList key={i} name={name} list={list[i]}></PreviewElementList>)
    }
    return result;
}