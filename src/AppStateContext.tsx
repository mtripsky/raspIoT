import React, { useReducer, useEffect } from 'react';
import mqttClient from './mqtt/MqttClient';
import {
  AppStateContext,
  appDataEmpty
} from './redux/store';
import { appStateReducer } from './redux/reducers';

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appDataEmpty);

  useEffect(() => {
    state.mqttClient.client = mqttClient.connect(state.mqttClient.options, () => {
      dispatch({ type: 'MQTT_ONLINE' });
    });
    mqttClient.subscribe(state.mqttClient.topics, { qos: 1 });
    mqttClient.registerCallbackOnMessage((topic: string, message: Buffer) => {
      dispatch({
        type: 'NEW_MEASUREMENT_MESSAGE',
        payload: JSON.parse(message.toString()),
      });
    });
    mqttClient.registerCallbackOnDisconnected(() => {});

    return function cleanup() {
      state.mqttClient.client = mqttClient.disconnect();
    };
  }, []); 

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
