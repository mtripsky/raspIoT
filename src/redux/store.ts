import React, { createContext, useContext } from 'react';
import { AppState } from './types';
import { Action } from './actions';
import mqtt from 'mqtt';

const defaultMqttConnectionOptions: mqtt.IClientOptions = {
  protocol: 'ws',
  port: 8883,
  host: 'localhost',
};

const defaultMqttTopics : string [] =[
  '/home/living-room/temperature',
  '/home/living-room/humidity',
  //'/weather/batterylevel',
  '/weather/temperature/bme280',
  '/weather/humidity/bme280',
  '/weather/pressure/bme280'
];

export const appDataEmpty: AppState = {
  locations: [],
  locationCurrentIndex: -1,
  mqttClient: { client: null, status: 'off', options: defaultMqttConnectionOptions, topics: defaultMqttTopics },
  error: null,
  currentTime: new Date(),
  currentView: 'Home',
  currentSettingsView: 'MqttSettings',
  fontViewSettings: { colorSchema: { textColor: '#000000', backgroundColor:'#f2f2f2'}}
};

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const useAppState = () => {
  return useContext(AppStateContext);
};
