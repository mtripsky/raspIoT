import React, { useReducer, useEffect } from 'react';
import receiver from './mqtt/MqttReceiver';
import {
  AppStateContext,
  appDataEmpty
} from './redux/store';
import { appStateReducer } from './redux/reducers';

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appDataEmpty);
  const _options = {};

  /* useEffect(() => {
    _init();
  },[])


  const _init = () => {
    state.mqttClient.client = mqtt.connect("192.168.1.34", Number(8883), "iot-view", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    for (var i = 0; i < state.mqttClient.topics.length; i++) {
      state.mqttClient.client.subscribe(state.mqttClient.topics[i], _options);
    }}

  // called when sending payload
  const _sendPayload = () => {
    const payload = mqtt.parsePayload("Hello", "World"); // topic, payload
    state.mqttClient.client.send(payload);
  }

  // called when client lost connection
  const _onConnectionLost = () => {
    console.log("onConnectionLost: ");
  }

  // called when messages arrived
  const _onMessageArrived = (message:any) => {
    console.log("onMessageArrived: " + message.payloadString);
  }

  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    for (var i = 0; i < state.mqttClient.topics.length; i++) {
      state.mqttClient.client.unsubscribe(state.mqttClient.topics[i], _options);
    }
  }

  // called when disconnecting the client
  const _onDisconnect = () => {
    state.mqttClient.client.disconnect();
  } */

  useEffect(() => {
    state.mqttClient.client = receiver.connect(state.mqttClient.options, () => {
      dispatch({ type: 'MQTT_ONLINE' });
    });
    receiver.subscribe(state.mqttClient.topics, { qos: 1 });
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
