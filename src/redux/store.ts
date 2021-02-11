import React, { createContext, useContext } from 'react';
import { AppState } from './types';
import { Action } from './actions';
import mqtt from 'mqtt';

export const appDataEmpty: AppState = {
  locations: [],
  mqttClient: { client: null, status: 'offline' },
  error: null,
  currentTime: new Date(),
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

export const mqttConnectionOptions: mqtt.IClientOptions = {
  protocol: 'ws',
  port: 8883,
  host: 'location.host',
};
