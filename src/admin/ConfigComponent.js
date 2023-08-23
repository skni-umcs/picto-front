import { Checkbox, Container, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import {PictureComponent} from '../common/ImageComponent'

export function CheckBoxConfigComponent({name, defaultValue, onChange}){
  return (
    <Container>
      { name } : {<Checkbox defaultValue={defaultValue} onChange={onChange}></Checkbox>}
    </Container>
  )
}

/*export class ElementConfigComponent extends React.Component {

  constructor({name, defaultValue, onChange}) {
    super();
    this.name = name
    this.defaultValue = defaultValue
    this.onChange = onChange
    this.inputField = <input name={this.name} defaultValue={this.defaultValue} onChange={this.onChange}></input>
  }

  render() {
    return (
      <Container maxWidth={false}>
        { this.name }: { this.inputField }
      </Container>
    )
  }
}*/

export function ElementConfigComponent({name, defaultValue, onChange}){
  return (
    <Container key={name} maxWidth={false}>
      { name }: { <input key={name} name={name} value={defaultValue} onChange={onChange}></input> }
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

export function PreviewElementList({key_value, name, list}){
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
            { name }{key_value}: { list.map((element, key) => {return <PreviewElement key={key} element={element}></PreviewElement>}) }
        </ImageList>
    )
}

export function ListOfPreviewElementLists({name, list}){
    let result = []
    for(let i = 0;i<list.length;++i){
        result.push(<PreviewElementList key={i} key_value={i} name={name} list={list[i]}></PreviewElementList>)
    }
    return result;
}