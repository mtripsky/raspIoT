import * as React from 'react';
import { useState } from 'react';
import { useAppState } from '../redux/store';
import { Column, Row, RowNoFlex,FontButton, Title } from '../styles';
import {ToggleButton, Form} from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const minDistance = 1;

// function valuetext(value:number) {
//   return `${value}:00`;
// } 

export const AquariumSettings = () => {
	const {state, dispatch} = useAppState();
  const [value, setValue] = React.useState([0, 24]);

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

  return (
    <>
      <RowNoFlex><Title>Aquarium</Title></RowNoFlex>
        <Row>
          <Column>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="manual"
              name="radio-buttons-group"
            >
              <FormControlLabel value="manual" control={<Radio />} label="Manual" />
              <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
            </RadioGroup>
          </FormControl>
          </Column>
          <Column size={3}>
            {/* <FormControlLabel control={ */}
              <Switch 
                //defaultChecked  
                onChange={handleSwitchChange}
              />
              {/* }              label="Label" /> */}
            <Row>
              <Slider
                value={value}
                step={1}
                marks
                min={0}
                max={24}
                onChange={handleChange}
                disableSwap
              />
            </Row>
            <RowNoFlex align='center'>{`${value[0]}:00 - ${value[1]}:00`}</RowNoFlex>
          </Column>
        </Row> 
    </>
	)
}
