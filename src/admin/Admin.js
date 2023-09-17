import React, {useEffect, useRef, useState} from 'react';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import {
  CheckBoxConfigComponent,
  ElementConfigComponent,
  ListOfPreviewElementLists,
  PreviewElementList,
} from './ConfigComponent';
import Button from '@mui/material/Button';
import moment from 'moment';

import * as ApiCalls from '../api/ApiCalls';
import {
  FormControl,
  FormControlLabel,
  InputLabel, MenuItem,
  RadioGroup, Select
} from '@mui/material';
import {backend} from '../api/ApiCalls';
import SymbolListComponent from './SymbolListComponent';

function TopologyConfigDetailedButtons(
    {
      setTopologyId,
      probabilityOfEdgeRedrawing,
      setProbabilityOfEdgeRedrawing,
      maxVertexDegree,
      setMaxVertexDegree,
    }) {
  useEffect(() => {
    setTopologyId(0);
  });
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
  </Box>;
}

function TopologyConfigTopologyIdButtons(
    {
      setProbabilityOfEdgeRedrawing,
      setMaxVertexDegree,
      topologyId,
      setTopologyId,
    }) {
  useEffect(() => {
    setProbabilityOfEdgeRedrawing(ApiCalls.getProbabilityOfEdgeRedrawing());
    setMaxVertexDegree(ApiCalls.getMaxVertexDegree());
  });
  return <ElementConfigComponent
      name="topologyId"
      defaultValue={topologyId}
      onChange={e => setTopologyId(e.target.value)}
  />;
}

function AdminFormComponent() {

  const [selectionWidth, setSelectionWidth] = useState(
      ApiCalls.getSelectionWidth());
  const [selectionHeight, setSelectionHeight] = useState(
      ApiCalls.getSelectionHeight());
  const [userOneTime, setUserOneTime] = useState(ApiCalls.getUserOneTime());
  const [userTwoTime, setUserTwoTime] = useState(ApiCalls.getUserTwoTime());
  const [topicsLength, setTopicsLength] = useState(ApiCalls.getImagesLength());
  const [enableTimer, setEnableTimer] = useState(ApiCalls.getEnabledTimer());
  const [correctAnswerPoints, setCorrectAnswerPoints] = useState(
      ApiCalls.getCorrectAnswerPoints());
  const [wrongAnswerPoints, setWrongAnswerPoints] = useState(
      ApiCalls.getWrongAnswerPoints());
  const [topologyId, setTopologyId] = useState(ApiCalls.getTopologyId());
  const [probabilityOfEdgeRedrawing, setProbabilityOfEdgeRedrawing] = useState(
      ApiCalls.getProbabilityOfEdgeRedrawing());
  const [maxVertexDegree, setMaxVertexDegree] = useState(
      ApiCalls.getMaxVertexDegree());
  const [numberOfGenerations, setNumberOfGenerations] = useState(400);
  const [resultScreenTime, setResultScreenTime] = useState(5);
  const [groupId, setGroupId] = useState('');

  const [buttonMode, setButtonMode] = useState('detailed');

  const [currentRoundId, setCurrentRoundId] = useState(
      ApiCalls.getCurrentGameId());

  const [imageGroups, setImageGroups] = useState([]);

  const handleSetGroup = (event) => {
    setGroupId(event.target.value);
  };

  function onImageAdd() {
    backend.post("image/add").then(console.log("Images added to backend"));
  }

  const [symbols, setSymbols] = useState([]);
  const [images, setImages] = useState([]);

  function onSubmit() {
    ApiCalls.createGame({
      userOneNumberOfImages: topicsLength,
      userTwoNumberOfImages: topicsLength,
      userOneTime: userOneTime,
      userTwoTime: userTwoTime,
      symbolGroupsAmount: selectionWidth,
      symbolsInGroupAmount: selectionHeight,
      correctAnswerPoints: correctAnswerPoints,
      wrongAnswerPoints: wrongAnswerPoints,
      topologyId: topologyId,
      probabilityOfEdgeRedrawing: probabilityOfEdgeRedrawing,
      maxVertexDegree: maxVertexDegree,
      numberOfGenerations: numberOfGenerations,
      createDateTime: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
      groupId: groupId,
      setEndRoundId: setCurrentRoundId,
      showResultScreenTime: resultScreenTime
    });
  }

  function onBegin() {
    ApiCalls.beginGame(currentRoundId);
  }

  function onEnd() {
    ApiCalls.endGame(currentRoundId);
  }

  function onEndAll() {
    ApiCalls.endAll();
  }

  function RadioButtonsComponent({buttonMode, setButtonMode}) {
    return <Box><RadioGroup>
      <FormControlLabel
          value="topologyId"
          control={<Radio
              checked={buttonMode === 'topologyId'}
              onClick={e => {
                setButtonMode('topologyId');
              }}/>}
          label="Topology Id"></FormControlLabel>
      <FormControlLabel
          value="detailed"
          control={<Radio checked={buttonMode === 'detailed'}
                          onClick={e => {
                            setButtonMode('detailed');
                          }}/>}
          label="Detailed"></FormControlLabel>
    </RadioGroup></Box>;
  }

  function getAllSymbols() {
    console.log("Getting all symbols");
    backend.get(`symbol/all`, {withCredentials: true}).
        then(function(response) {
          let symbolsObject = response.data;
          console.log('calling all symbols got symbol object: ' + JSON.stringify(symbolsObject));
          setSymbols(symbolsObject);
        }).catch(function(error) {
      console.log(error);
    });
  }

  function getAllImageGroups() {
    console.log("Getting all images groups");
    backend.get("image/groups")
        .then(function(response){
          let imageGroups = response.data;
          console.log('calling all image groups got object: ' + JSON.stringify(imageGroups));
          setImageGroups(imageGroups);
          if(imageGroups.length > 0) {
            setGroupId(imageGroups[0].id);
          }
        })
  }

    useEffect(() => {
      getAllImageGroups();
    }, []);

  return <Box
      sx={{
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'nowrap',
        borderRadius: 1,
        flex: 1,
      }}
  >
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
          justifyContent: 'space-between',
          gap: 4,
        }}
    >
      <Button onClick={onImageAdd}>Add images</Button>
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
          name="image count"
          defaultValue={topicsLength}
          onChange={e => setTopicsLength(e.target.value)}
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
          name="numberOfGenerations"
          defaultValue={numberOfGenerations}
          onChange={e => setNumberOfGenerations(e.target.value)}
      />
      <ElementConfigComponent
          name="resultScreenTime"
          defaultValue={resultScreenTime}
          onChange={e => setResultScreenTime(e.target.value)}
      />
      <RadioButtonsComponent
          buttonMode={buttonMode}
          setButtonMode={setButtonMode}/>
      <Box>
        {buttonMode === 'detailed' && <TopologyConfigDetailedButtons
            setTopologyId={setTopologyId}
            probabilityOfEdgeRedrawing={probabilityOfEdgeRedrawing}
            setProbabilityOfEdgeRedrawing={setProbabilityOfEdgeRedrawing}
            maxVertexDegree={maxVertexDegree}
            setMaxVertexDegree={setMaxVertexDegree}/>}
        {buttonMode === 'topologyId' && <TopologyConfigTopologyIdButtons
            setProbabilityOfEdgeRedrawing={setProbabilityOfEdgeRedrawing}
            setMaxVertexDegree={setMaxVertexDegree} topologyId={topologyId}
            setTopologyId={setTopologyId}/>}
      </Box>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Image group</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupId}
            label="Image group"
            onChange={handleSetGroup}
        >
          {imageGroups.map((group) => {
            return <MenuItem value={group.id}>{group.name}</MenuItem>
          })}
        </Select>
      </FormControl>

      <SymbolListComponent symbols={symbols}/>

      {/*<PreviewElementList*/}
      {/*    name="Images"*/}
      {/*    list={ApiCalls.getImages()}*/}
      {/*/>*/}
      {/*<ListOfPreviewElementLists*/}
      {/*    name="Symbols"*/}
      {/*    list={ApiCalls.getSelectionSymbols()}*/}
      {/*/>*/}
    </Box>
    <Box
        sx={{
          width: '50%',
          flexDirection: 'column',
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <Button onClick={onEnd}>
            End Game
          </Button>
          <Button onClick={onEndAll}>
            End All Games
          </Button>
          <input
              value={currentRoundId}
              onChange={e => setCurrentRoundId(e.target.value)}></input>
        </Box>
      </Box>
    </Box>
  </Box>;

}

function Admin() {
  return <AdminFormComponent/>;
}

export default Admin;