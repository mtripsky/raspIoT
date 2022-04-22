import React, { useReducer, useEffect } from 'react';
import mqttClient from './mqtt/MqttClient';
import { AppStateContext, appDataEmpty } from './redux/store';
import { appStateReducer } from './redux/reducers';

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appDataEmpty);

  useEffect(() => {
    state.mqttClient.client = mqttClient.connect(state.mqttClient.options, () => {
       dispatch({ type: 'MQTT_ONLINE' });
    });
    mqttClient.subscribe(state.mqttClient.topics, { qos: 1 });
    mqttClient.registerCallbackOnMessage((topic: string, message: Buffer) => {
      const msg = JSON.parse(message.toString());

      if (topic.includes('esp8266')) {
        // esp8266 does not have time
        const t = new Date();

        msg.time = t.toString();
        msg.timestamp = t.getTime();
        dispatch({
          type: 'NEW_MEASUREMENT_MESSAGE',
          payload: msg,
        });
      } else if (topic === '/raspberrypi-pins/get') {
        if (msg.value) {
          state.aquariumSettings.lightStatus = msg.value;
        }
      } else if (topic === '/raspiot-client/latest-measurement') {
        dispatch({
          type: 'LATEST_MEASUREMENT_MESSAGE',
          payload: msg,
        });
      } else {
        dispatch({
          type: 'NEW_MEASUREMENT_MESSAGE',
          payload: msg,
        });
      }
    });
    mqttClient.registerCallbackOnDisconnected(() => {});

    // to get status of aquarium light at the start
    const msgPins = `{"channel": 37}`;
    state.mqttClient.client.publish('/raspberrypi-pins/get', msgPins);
    state.mqttClient.client.publish('/raspiot-client/get-latest-measurement', `{"type":"temperature", "location":"HOME-LR"}`);
    state.mqttClient.client.publish('/raspiot-client/get-latest-measurement', `{"type":"humidity", "location":"HOME-LR"}`);

    return function cleanup() {
      state.mqttClient.client = mqttClient.disconnect();
      //state.switchBot.stopScan();
    };
  }, []);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
