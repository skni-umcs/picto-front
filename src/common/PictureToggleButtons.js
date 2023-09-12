import * as React from 'react';
import Box from '@mui/material/Box';
import {PictureComponent} from '../common/ImageComponent';

import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

export function PictureToggleButtons(
    {
      picture_array,
      setChosenSymbol,
      groupClassName = 'symbolToggleButtons',
      selectedClassName = 'symbolSelected',
      notSelectedClassName = 'symbolNotSelected',
      formLabelClassName = 'symbolFormLabelStyle',
    }) {
  return <RadioGroup><Box className={groupClassName}>
    {
      picture_array.map((picture) => {
        return (
            <FormControlLabel
                className={formLabelClassName}
                control={
                  <Radio
                      icon={
                        <Box className={notSelectedClassName}>
                          <PictureComponent path={picture.path}/>
                        </Box>
                      }
                      checkedIcon={
                        <Box className={selectedClassName}>
                          <PictureComponent
                              path={picture.path}/>
                        </Box>
                      }
                      onClick={
                        () => setChosenSymbol(picture.id,
                            picture.groupId)}
                      value={picture.id}>
                  </Radio>
                }

            />);
      })
    }
  </Box></RadioGroup>;
}