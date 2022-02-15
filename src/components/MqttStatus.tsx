import React from 'react';
import { Badge } from 'react-bootstrap';
import { useAppState } from '../redux/store';

export const MqttStatus = () => {
  const { state } = useAppState();

  if (state.mqttClient.status === 'on') {
    return <Badge bg='success'>{state.mqttClient.status}</Badge>;
  } else {
    return <Badge bg='danger'>{state.mqttClient.status}</Badge>;
  }
};
