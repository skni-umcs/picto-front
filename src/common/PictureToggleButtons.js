import * as React from 'react';
import Box from "@mui/material/Box";
import { ToggleButton } from "@mui/material";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PictureComponent } from '../common/ImageComponent';
import '../common/Common.css'

export function PictureToggleButtons(picture_array, className="horizonstalToggleButton") {
    const [alignment, setAlignment] = React.useState('button');
  
    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  
    return (
       <ToggleButtonGroup 
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        className={className}
        >
        {picture_array.map((picture) => {return <ToggleButton value={picture.value}><Box><PictureComponent path={picture.path}></PictureComponent></Box></ToggleButton>})}
      </ToggleButtonGroup>
    );
  }