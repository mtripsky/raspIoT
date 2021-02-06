import React, { useState, useEffect } from 'react';
import { useAppState } from './AppStateContext';

import mqtt from 'mqtt';
import App from './App';
import { MeasurementMessage } from './redux/types';

const mqttConnectionOptions = {
  protocol: 'websockets',
  port: 8883,
  host: 'location.host',
  keepalive: 60,
};
const topics = ['/home/living-room/temperature', '/home/living-room/humidity'];
/*
interface Receiver {
  disconnect(client: mqtt.Client): void;
  connect(callback: (payload: MeasurementMessage) => any): mqtt.Client;
}

let connectFce = function connect(
  callback: (payload: MeasurementMessage) => any
): mqtt.Client {
  let client = mqtt.connect(mqttConnectionOptions);
  client.on('connect', () => {
    console.log(
      `Connected successfully to the MQTT broker. 
      HOST: ${mqttConnectionOptions.host}, PORT: ${mqttConnectionOptions.port}.`
    );
  });
  client.subscribe(topics);
  client.on('message', (topic, message) => {
    // FIX ME: now we take any message on any topic
    callback(JSON.parse(message.toString()));
  });
  client.on('error', (err) => {
    console.log(`Error occurred in Receiver. ERROR: ${err}.`);
  });

  return client;
};

let disconnectFce = function disconnect(client: mqtt.Client) {
  client.end();
}; */

export const MqttReceiver = () => {
  const { state, dispatch } = useAppState();

  const client = mqtt.connect(mqttConnectionOptions);

  useEffect(() => {
    if (client) {
      //console.log('here');
      client.on('connect', () => {
        // console.log('connected');
        //console.log(client);
      });
      client.on('error', (err) => {
        console.log(`Error occurred in Receiver. ERROR: ${err}.`);
      });
      //client.subscribe(topics);
      client.subscribe('#');
      client.on('message', (topic, message) => {
        console.log(`new message ${topic}`);
        dispatch({
          type: 'NEW_MEASUREMENT_MESSAGE',
          payload: JSON.parse(message.toString()),
        });
        // FIX ME: now we take any message on any topic
        //callback(JSON.parse(message.toString()));
      });
    } else {
      console.log('not connected');
    }
  }, [client, dispatch]);

  return <App />;
};
