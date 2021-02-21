import React, { useState } from 'react';
import mqttImage from '../images/mqtt-icon.png';
import { useAppState } from '../redux/store';
import { Grid, Column, Row, ViewButton } from '../styles';


export const MqttSettings = () => {
  const {state, dispatch } = useAppState();

  return (
    <Grid
      backgroundColor={state.fontViewSettings.colorSchema.backgroundColor}
      textColor={state.fontViewSettings.colorSchema.textColor}
    >
      <Row>
        <Column>
         Mqtt settings
        </Column>
      </Row>
    </Grid>
    
  );
};
