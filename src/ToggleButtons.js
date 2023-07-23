import * as React from 'react';
import './App.css';
import Box from "@mui/material/Box";
import { ToggleButton } from "@mui/material";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export function ToggleButtons(symbol_array) {
    const [alignment, setAlignment] = React.useState('button');
  
    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  
    return (
       <ToggleButtonGroup 
        orientation="vertical"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        >
        {symbol_array.map((symbol) => {return <ToggleButton value={symbol.value}><Box>{symbol.path}</Box></ToggleButton>})}
      </ToggleButtonGroup>
    );
  }