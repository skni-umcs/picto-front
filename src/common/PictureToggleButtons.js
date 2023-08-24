import * as React from 'react';
import Box from "@mui/material/Box";
import { PictureComponent } from '../common/ImageComponent';
import '../common/Common.css'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio'
import '../common/Common.css'
import FormControlLabel from '@mui/material/FormControlLabel'

export function PictureToggleButtons(picture_array, setChosenSymbol, className="horizonstalToggleButton") {
    return <RadioGroup className={className}>
    {
      picture_array.map((picture) => {
        return <FormControlLabel
        className='tentamten'
        control={<Radio  onClick={() => setChosenSymbol(picture.id, picture.groupId)} value={picture.id}></Radio>}
        label={<Box><PictureComponent  path={picture.path}></PictureComponent></Box>}
      />
      })
    }
  </RadioGroup>
  }