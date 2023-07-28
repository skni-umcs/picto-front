import { Checkbox, Container, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import {PictureComponent} from '../common/ImageComponent'

export function CheckBoxConfigComponent({name, defaultValue}){
  return (
    <Container>
      { name } : {<Checkbox defaultValue={defaultValue}></Checkbox>}
    </Container>
  )
}

export function ElementConfigComponent({name, defaultValue}) {
    return (
      <Container maxWidth={false}>
        { name }: {<input defaultValue={defaultValue}></input> }
      </Container>
    )
}

export function PreviewElement({element}){
    return (
    <ImageListItem>
    <PictureComponent path={element.path}/>
    <Box>{element.path}</Box>
    </ImageListItem>
  )
}

export function PreviewElementList({name, list}){
    return (
        <ImageList
        sx={{
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap',
            p: 1,
            m: 1,
          }}
        >
            { name }: { list.map((element, key) => {return <PreviewElement key={key} element={element}></PreviewElement>}) }
        </ImageList>
    )
}

export function ListOfPreviewElementLists({name, list}){
    let result = []
    for(let i = 0;i<list.length;++i){
        result.push(<PreviewElementList key={i} name={name} list={list[i]}></PreviewElementList>)
    }
    return result;
}