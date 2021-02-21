import React from 'react';
import { useAppState } from '../redux/store';
import {MqttStatusBadge} from '../styles';

export const MqttStatus = () => {
  const { state } = useAppState();

  if (state.mqttClient.status === 'online') {
    return <MqttStatusBadge color={'#5cb85c'}/>;
  } else {
    return <MqttStatusBadge color={'#d9534f'}/>;
  }
};
