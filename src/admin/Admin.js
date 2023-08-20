import React, { useState } from "react";
import Box from "@mui/material/Box";
import { CheckBoxConfigComponent, ElementConfigComponent, PreviewElementList, ListOfPreviewElementLists } from './ConfigComponent'
import Button from '@mui/material/Button';
import moment from 'moment'

import * as ApiCalls from '../api/ApiCalls'

function AdminFormComponent(){

  const [selectionWidth, setSelectionWidth] = useState(ApiCalls.getSelectionWidth())
  const [selectionHeight, setSelectionHeight] = useState(ApiCalls.getSelectionHeight())
  const [userOneTime, setUserOneTime] = useState(ApiCalls.getUserOneTime())
  const [userTwoTime, setUserTwoTime] = useState(ApiCalls.getUserTwoTime())
  const [topicsLength, setTopicsLength] = useState(ApiCalls.getImagesLength())
  const [enableTimer, setEnableTimer] = useState(ApiCalls.getEnabledTimer())
  const [correctAnswerPoints, setCorrectAnswerPoints] = useState(ApiCalls.getCorrectAnswerPoints())
  const [wrongAnswerPoints, setWrongAnswerPoints] = useState(ApiCalls.getWrongAnswerPoints())
  const [topologyId, setTopologyId] = useState(ApiCalls.getTopologyId())

  function onSubmit(){
    ApiCalls.createGame({
      userOneNumberOfImages:topicsLength, 
      userTwoNumberOfImages:topicsLength, 
      userOneTime:userOneTime, 
      userTwoTime:userTwoTime, 
      symbolGroupsAmount:selectionWidth, 
      symbolsInGroupAmount:selectionHeight,
      correctAnswerPoints:correctAnswerPoints,
      wrongAnswerPoints:wrongAnswerPoints,
      topologyId:topologyId,
      createDateTime:moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS")
    })
  }

  function ConfigsComponent(){
    return (
      <Box  
      sx={{
        width: '50%',
        flexDirection: 'column',
        display: 'flex',
        flexWrap: 'nowrap',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        justifyContent : 'space-between',
        gap: 4
      }}
      >
      <ElementConfigComponent
        name="selectionWidth"
        defaultValue={selectionWidth}
        onChange={e => setSelectionWidth(e.target.value)}
      />
      <ElementConfigComponent
        name="selectionHeight"
        defaultValue={selectionHeight}
        onChange={e => setSelectionHeight(e.target.value)}
      />
      <ElementConfigComponent
        name="topicsLength"
        defaultValue={topicsLength}
        onChange={e => setTopicsLength(e.target.value)}
      />
      <CheckBoxConfigComponent
        name="enableTimer"
        defaultValue={enableTimer}
        onChange={e => setEnableTimer(e.target.value)}
      />
      <ElementConfigComponent
        name="userOneTime"
        defaultValue={userOneTime}
        onChange={e => setUserOneTime(e.target.value)}
      />
      <ElementConfigComponent
        name="userTwoTime"
        defaultValue={userTwoTime}
        onChange={e => setUserTwoTime(e.target.value)}
      />
      <ElementConfigComponent
        name="correctAnswerPoints"
        defaultValue={correctAnswerPoints}
        onChange={e => setCorrectAnswerPoints(e.target.value)}
      />
      <ElementConfigComponent
        name="wrongAnswerPoints"
        defaultValue={wrongAnswerPoints}
        onChange={e => setWrongAnswerPoints(e.target.value)}
      />
      <ElementConfigComponent
        name="topologyId"
        defaultValue={topologyId}
        onChange={e => setTopologyId(e.target.value)}
      />
      <PreviewElementList
        name="Images"
        list={ApiCalls.getImages()}
      />
      <ListOfPreviewElementLists
        name="Symbols"
        list={ApiCalls.getSelectionSymbols()}
      />
    </Box>
    )
  }

  function GameButtonsComponent(){
    return (
      <Box
      sx={{
        width: '50%',
        flexDirection: 'column',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent : 'center',
        alignItems: 'center'
      }}
    >
      <Box>
        <Button onClick={onSubmit}>
          Create Game
        </Button>
        <Button onClick={ApiCalls.beginGame}>
          Begin Game
        </Button>
        <Button onClick={ApiCalls.finishGame}>
          Finish Game
        </Button>
      </Box>
    </Box>
    )
  }

  return (
    <Box
      sx={{
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'nowrap',
        borderRadius: 1,
        flex: 1
      }}
    >
      {ConfigsComponent()}
      {GameButtonsComponent()}
    </Box>
  )
}

function Admin() {
    return AdminFormComponent()
  }
  
export default Admin;