import React, { useReducer, useEffect } from 'react';
import mqttClient from './mqtt/MqttClient';
import { AppStateContext, appDataEmpty } from './redux/store';
import { appStateReducer } from './redux/reducers';
//import { AdvertisementDataSwitchBot, MeasurementMessage } from './redux/types';

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
      } else {
        dispatch({
          type: 'NEW_MEASUREMENT_MESSAGE',
          payload: msg,
        });
      }
    });
    mqttClient.registerCallbackOnDisconnected(() => {});
    
    // to get status of aquarium light at the start
    const msg = `{"channel": 37}`;
    state.mqttClient.client.publish('/raspberrypi-pins/get', msg);
    
    // state.switchBot.startScan().then(() => {
    //  // dispatch({type: 'CHANGE_FONT_BACKGROUND_SCHEMA', payload: {textColor: '#ffffff', backgroundColor:'#0f60b6'}});

    //   // Set an event hander
    //   state.switchBot.onadvertisement = (ad: AdvertisementDataSwitchBot) => {
    //     dispatch({type: 'CHANGE_FONT_BACKGROUND_SCHEMA', payload:  {textColor: '#2f3c7e', backgroundColor:'#fbeaeb'}})

    //     const t = new Date();
    //     const temperatureData: MeasurementMessage = {
    //       device: ad.serviceData.modelName,
    //       type: 'Temperature',
    //       value: ad.serviceData.temperature.c,
    //       unit: '°C',
    //       location: 'HOME-BEDROOM',
    //       time: t.toString(),
    //       timestamp: t.getTime(),
    //     };
    //     const humidityData: MeasurementMessage = {
    //       device: ad.serviceData.modelName,
    //       type: 'Humidity',
    //       value: ad.serviceData.humidity,
    //       unit: '%',
    //       location: 'HOME-BEDROOM',
    //       time: t.toString(),
    //       timestamp: t.getTime(),
    //     };

    //     dispatch({
    //       type: 'NEW_MEASUREMENT_MESSAGE',
    //       payload: temperatureData,
    //     });
    //     dispatch({
    //       type: 'NEW_MEASUREMENT_MESSAGE',
    //       payload: humidityData,
    //     });
    //   };
    // });

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
