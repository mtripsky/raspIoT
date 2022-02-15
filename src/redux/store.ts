import React, { createContext, useContext } from 'react';
import { AppState } from './types';
import { Action } from './actions';
import mqtt from 'mqtt';

const defaultMqttConnectionOptions: mqtt.IClientOptions = {
  //const url = `ws://${host}:${port}/mqtt`;
  //protocol: 'mqtt',
  port: 8883,
  host: '192.168.1.35',
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false
};

const defaultMqttTopics : string [] =[
  '/home/living-room/temperature',
  '/home/living-room/humidity',
  //'/weather/batterylevel',
  '/weather/temperature/bme280',
  '/weather/humidity/bme280',
  '/weather/pressure/bme280',
];

export const appDataEmpty: AppState = {
  locations: [],
  locationCurrentIndex: -1,
  mqttClient: {
    client: null,
    status: 'off',
    options: defaultMqttConnectionOptions,
    topics: defaultMqttTopics},
  error: null,
  currentTime: new Date(),
  currentView: 'Home',
  currentSettingsView: 'MqttSettings',
  fontViewSettings: {
    colorSchema: { textColor: '#000000', backgroundColor:'#f2f2f2'}},
  aquariumSettings: {
    timerSaveButtonActive: false,
    timerLightStart: 7,
    timerLightEnd: 18,
    lightStatus: false,
  },
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
