import React, { useState, useForm } from "react";
import Radio from '@mui/material/Radio';
import Box from "@mui/material/Box";
import { CheckBoxConfigComponent, ElementConfigComponent, PreviewElementList, ListOfPreviewElementLists } from './ConfigComponent'
import Button from '@mui/material/Button';
import moment from 'moment'

import * as ApiCalls from '../api/ApiCalls'
import { FormControlLabel, RadioGroup } from "@mui/material";

function RadioButtonsComponent(buttonMode, setButtonMode, buttons){
  console.log("rad")
  return <Box><RadioGroup>
  <FormControlLabel value="topologyId" control={<Radio checked={buttonMode==="topologyId"} onClick={e => {setButtonMode("topologyId")}}/>} label="Topology Id"></FormControlLabel>
  <FormControlLabel value="detailed" control={<Radio checked={buttonMode==="detailed"} onClick={e => {setButtonMode("detailed")}} />} label="Detailed"></FormControlLabel>
  </RadioGroup></Box>
}

function TopologyConfigDetailedButtons({probabilityOfEdgeRedrawing ,setProbabilityOfEdgeRedrawing, maxVertexDegree, setMaxVertexDegree}) {
  console.log("tcfd")
  return <Box>
    <ElementConfigComponent
      name="probabilityOfEdgeRedrawing"
      defaultValue={probabilityOfEdgeRedrawing}
      onChange={e => setProbabilityOfEdgeRedrawing(e.target.value)}
    />
    <ElementConfigComponent
      name="maxVertexDegree"
      defaultValue={maxVertexDegree}
      onChange={e => setMaxVertexDegree(e.target.value)}
    />
  </Box>
}

function topologyConfigTopologyIdButtons({topologyId, setTopologyId}) {
  <Box>
  <ElementConfigComponent
    name="topologyId"
    defaultValue={topologyId}
    onChange={e => setTopologyId(e.target.value)}
  />
  </Box>
}

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
  const [probabilityOfEdgeRedrawing, setProbabilityOfEdgeRedrawing] = useState(ApiCalls.getProbabilityOfEdgeRedrawing())
  const [maxVertexDegree, setMaxVertexDegree] = useState(ApiCalls.getMaxVertexDegree())

  const [buttonMode, setButtonMode] = useState("none")

  const [currentRoundId, setCurrentRoundId] = useState(ApiCalls.getCurrentGameId())

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
      probabilityOfEdgeRedrawing:probabilityOfEdgeRedrawing,
      maxVertexDegree:maxVertexDegree,
      createDateTime:moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      setEndRoundId:setCurrentRoundId
    })
  }

  function onBegin(){
    ApiCalls.beginGame(currentRoundId)
  }

  function onEnd(){
    ApiCalls.endGame(currentRoundId)
  }



  function setTopologyConfigDetailed(){ 
    setTopologyId(ApiCalls.getTopologyId())
    return <TopologyConfigDetailedButtons maxVertexDegree={maxVertexDegree} probabilityOfEdgeRedrawing={probabilityOfEdgeRedrawing} setProbabilityOfEdgeRedrawing={setProbabilityOfEdgeRedrawing} setMaxVertexDegree={setMaxVertexDegree}></TopologyConfigDetailedButtons>
  }
  function setTopologyConfigTopologyId(){
    setProbabilityOfEdgeRedrawing(ApiCalls.getProbabilityOfEdgeRedrawing())
    setMaxVertexDegree(ApiCalls.getMaxVertexDegree())
    return topologyConfigTopologyIdButtons
  }

  function TopologyButtonsConfigComponent(){
    console.log("aaa")
    if(buttonMode === "detailed"){
      return setTopologyConfigDetailed()
    }
    else if(buttonMode === "topologyId"){
      return setTopologyConfigTopologyId()
    }
    else{
      return <Box>Failed to load buttons</Box>
    }
  }



  function TopologyConfigComponent(){
    console.log(buttonMode)
    return (
      <Box>
        
        
      </Box>
    )
  }

  function ConfigsComponent(){
    console.log("confi")
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
      {RadioButtonsComponent(buttonMode, setButtonMode)}
      <TopologyButtonsConfigComponent></TopologyButtonsConfigComponent>
      
      
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
        <Button onClick={onBegin}>
          Begin Game
        </Button>
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
          <Button onClick={onEnd}>
            End Game
          </Button>
          <input value={currentRoundId} onChange={e => setCurrentRoundId(e.target.value)}></input>
        </Box>
      </Box>
    </Box>
    )
  }


  console.log("comp")
  return <Box
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
  
}

function Admin() {
  console.log("admin")
  return <AdminFormComponent/>
}
  
export default Admin;