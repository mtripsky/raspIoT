import React, { useReducer, useEffect } from 'react';
import receiver from './mqtt/MqttReceiver';
import {
  AppStateContext,
  appDataEmpty,
  mqttConnectionOptions,
} from './redux/store';
import { appStateReducer } from './redux/reducers';

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appDataEmpty);

  useEffect(() => {
    state.mqttClient.client = receiver.connect(mqttConnectionOptions, () => {
      dispatch({ type: 'MQTT_ONLINE' });
    });
    receiver.subscribe('/home/living-room/#', { qos: 1 });
    receiver.registerCallbackOnMessage((topic: string, message: Buffer) => {
      dispatch({
        type: 'NEW_MEASUREMENT_MESSAGE',
        payload: JSON.parse(message.toString()),
      });
    });
    receiver.registerCallbackOnDisconnected(() => {});

    return function cleanup() {
      state.mqttClient.client = receiver.disconnect();
    };
  }, []);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
