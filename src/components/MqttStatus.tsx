import React from 'react';
import { Badge } from 'react-bootstrap';
import { useAppState } from '../AppStateContext';

export const MqttStatus = () => {
  const { state, dispatch } = useAppState();

  let badge;
  if (state.mqttClient.status === 'online') {
    return <Badge variant='success'>{state.mqttClient.status}</Badge>;
  } else {
    return <Badge variant='danger'>{state.mqttClient.status}</Badge>;
  }
};
