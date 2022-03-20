import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAppState } from '../redux/store';
import { Column, Row, RowNoFlex,FontButton, Title } from '../styles';
import {ToggleButton, Form, Button} from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

const minDistance = 1;

export const AquariumSettings = () => {
  const { state, dispatch } = useAppState();
  const [value, setValue] = React.useState([0, 24]);
  //const [automaticRadioDisabled, setAutomaticRadioDisabled] = React.useState(false);

  // useEffect(() => {
  //   const currentTime = state.currentTime.getSeconds();
  //   if (
  //     currentTime >= state.aquariumSettings.timerLightStart &&
  //     currentTime <= state.aquariumSettings.timerLightEnd &&
  //     !state.aquariumSettings.lightStatus
  //   ) {
  //     dispatch({type: 'AQUARIUM_LIGHT_MANUAL_TOGGLE', payload: true});
  //   } else if (
  //     (currentTime < state.aquariumSettings.timerLightStart
  //      || currentTime > state.aquariumSettings.timerLightEnd)
  //     && state.aquariumSettings.lightStatus )
  //   {
  //     dispatch({type: 'AQUARIUM_LIGHT_MANUAL_TOGGLE', payload: false});
  //   }
  // }, []);

  const handleChange = (event:any, newValue:any, activeThumb: any) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'AQUARIUM_LIGHT_MANUAL_TOGGLE', payload: event.target.checked});
  };

  const handleRadioChange = (event: any, value: string) => {
    value === 'manual'
      ? dispatch({type: 'AQUARIUM_LIGHT_CONTROL_TYPE', payload: 'manual'})
      : dispatch({type: 'AQUARIUM_LIGHT_CONTROL_TYPE', payload: 'automatic'}) ;
  }

  const handleSaveClick = (): void => {
    dispatch({type: 'AQUARIUM_LIGHT_TIMER_SAVED', payload: value})
  }

  return (
    <>
      <RowNoFlex>
        <Title>Aquarium</Title>
      </RowNoFlex>
      <Row>
        <Column>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={state.aquariumSettings.lightControlType}
              name="radio-buttons-group"
              onChange={handleRadioChange}
            >
              <FormControlLabel value="manual" control={<Radio />} label="Manual" />
              <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
            </RadioGroup>
          </FormControl>
        </Column>
        <Column size={3}>
            <Row>
              <Switch
                checked={state.aquariumSettings.lightStatus}
                onChange={handleSwitchChange}
                disabled={state.aquariumSettings.lightControlType==='automatic'}
              />
            </Row>
            <Row>
              <Slider
                value={value}
                step={1}
                marks
                min={0}
                max={24}
                onChange={handleChange}
                disableSwap
                disabled={state.aquariumSettings.lightControlType==='manual'}
              />
            </Row>
            <RowNoFlex align='center'>{`${value[0]}:00 - ${value[1]}:00`}</RowNoFlex>
            {(state.aquariumSettings.timerSaveButtonActive) ? <RowNoFlex><Button onClick={handleSaveClick}>Save Timer</Button></RowNoFlex> : null}
        </Column>
      </Row> 
    </>
	)
}
