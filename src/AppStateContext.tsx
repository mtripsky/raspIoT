import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import mqtt from 'mqtt';
import {
  AppState,
  Measurement,
  MeasurementMessage,
  Error,
  Client,
} from './redux/types';
import { stat } from 'fs';
import receiver from './mqtt/MqttReceiver';

const appDataEmpty: AppState = {
  locations: [],
  mqttClient: { client: null, status: 'offline' },
  error: null,
  currentTime: new Date(),
};

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);
export const useAppState = () => {
  return useContext(AppStateContext);
};

type Action =
  | {
      type: 'NEW_MEASUREMENT_MESSAGE';
      payload: MeasurementMessage;
    }
  | {
      type: 'MQTT_ONLINE';
    }
  | {
      type: 'MQTT_CONNECTED';
      payload: Error;
    }
  | {
      type: 'UPDATE_CURRENT_APPLICATION_TIME';
      payload: Date;
    };

function GetDailyExtremes(
  oldMeasurement: Measurement,
  payload: MeasurementMessage
) {
  const newTime = new Date(payload.time);
  const dayDiff = newTime.getDay() - oldMeasurement.time.getDay();

  if (dayDiff >= 1) {
    return {
      min: payload.value,
      max: payload.value,
    };
  }

  return {
    min:
      payload.value < oldMeasurement.minValue
        ? payload.value
        : oldMeasurement.minValue,
    max:
      payload.value > oldMeasurement.maxValue
        ? payload.value
        : oldMeasurement.maxValue,
  };
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_CURRENT_APPLICATION_TIME': {
      state.currentTime = action.payload;
      return {
        ...state,
      };
    }
    case 'MQTT_ONLINE': {
      state.mqttClient.status = 'online';
      return {
        ...state,
      };
    }
    case 'NEW_MEASUREMENT_MESSAGE': {
      const indLoc = state.locations.findIndex(
        (l) => l.name === action.payload.location
      );

      if (indLoc === -1) {
        // new location
        state.locations.push({
          id: uuid(),
          name: action.payload.location,
          measurements: [],
        });
        state.locations[state.locations.length - 1].measurements.push({
          id: uuid(),
          name: action.payload.type,
          value: action.payload.value,
          unit: action.payload.unit,
          minValue: action.payload.value,
          maxValue: action.payload.value,
          time: new Date(action.payload.time),
        });
      } else {
        const indMeasurement = state.locations[indLoc].measurements.findIndex(
          (m) => m.name === action.payload.type
        );

        if (indMeasurement === -1) {
          state.locations[indLoc].measurements.push({
            id: uuid(),
            name: action.payload.type,
            value: action.payload.value,
            unit: action.payload.unit,
            minValue: action.payload.value,
            maxValue: action.payload.value,
            time: new Date(action.payload.time),
          });
        } else {
          const dailyExtremes = GetDailyExtremes(
            state.locations[indLoc].measurements[indMeasurement],
            action.payload
          );
          state.locations[indLoc].measurements[indMeasurement].id = uuid();
          state.locations[indLoc].measurements[indMeasurement].time = new Date(
            action.payload.time
          );
          state.locations[indLoc].measurements[indMeasurement].value =
            action.payload.value;
          state.locations[indLoc].measurements[indMeasurement].minValue =
            dailyExtremes.min;
          state.locations[indLoc].measurements[indMeasurement].maxValue =
            dailyExtremes.max;
        }
      }

      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

const mqttConnectionOptions: mqtt.IClientOptions = {
  protocol: 'ws',
  port: 8883,
  host: 'location.host',
};

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
