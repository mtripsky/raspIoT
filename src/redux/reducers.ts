import { v4 as uuid } from 'uuid';
import { Action } from './actions';
import { AppState } from './types';
import { GetDailyExtremes } from '../utils/MeasurementsCalculator';
const Schedule = require('node-schedule');
const log = require('electron-log');

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'CHANGE_CURRENT_LOCATION_INDEX': {
      state.locationCurrentIndex = action.payload;

      return {
        ...state,
      }
    }
    case 'CHANGE_FONT_BACKGROUND_SCHEMA': {
      state.fontViewSettings.colorSchema = action.payload;
      
      return {
        ...state,
      };
    }
    case 'CHANGE_CURRENT_VIEW': {
      state.currentView = action.payload;
      return {
        ...state,
      };
    }
    case 'CHANGE_CURRENT_SETTINGS_VIEW': {
      state.currentSettingsView = action.payload;
      return {
        ...state,
      };
    }
    case 'UPDATE_CURRENT_APPLICATION_TIME': {
      state.currentTime = action.payload;
      return {
        ...state,
      };
    }
    case 'MQTT_ONLINE': {
      state.mqttClient.status = 'on';
      return {
        ...state,
      };
    }
    case 'AQUARIUM_LIGHT_CONTROL_TYPE': {
      state.aquariumSettings.lightControlType = action.payload;

      if (action.payload === 'manual') {
        state.aquariumSettings.timerSaveButtonActive = false;
        if(state.aquariumSettings.scheduledLightOn &&
          state.aquariumSettings.scheduledLightOff) {
            state.aquariumSettings.scheduledLightOn.cancel();
            state.aquariumSettings.scheduledLightOff.cancel();
          }
      } else {
        state.aquariumSettings.timerSaveButtonActive = true;
      }

      return {
        ...state,
      };
    }
    case 'AQUARIUM_LIGHT_TIMER_SAVED': {
      state.aquariumSettings.timerLightStart = action.payload[0];
      state.aquariumSettings.timerLightEnd = action.payload[1];
      state.aquariumSettings.timerSaveButtonActive = false;

      if (state.aquariumSettings.scheduledLightOn &&
        state.aquariumSettings.scheduledLightOff) {
        state.aquariumSettings.scheduledLightOn.cancel();
        state.aquariumSettings.scheduledLightOff.cancel();
      }
      const currentTime = state.currentTime.getSeconds();
      const msgOff = `{"channel": 37, "state": "OUT", "value": 0}`;
      const msgOn = `{"channel": 37, "state": "OUT", "value": 1}`;

      if (
        currentTime >= state.aquariumSettings.timerLightStart &&
        currentTime <= state.aquariumSettings.timerLightEnd
      ) {
        state.mqttClient.client.publish('/raspberrypi-pins/set', msgOn);
        state.aquariumSettings.lightStatus = true;
      } else {
        state.mqttClient.client.publish('/raspberrypi-pins/set', msgOff);
        state.aquariumSettings.lightStatus = false;
      }

      state.aquariumSettings.scheduledLightOn = Schedule.scheduleJob(
        `${state.aquariumSettings.timerLightStart} * * * * *`, (): void => {
          state.mqttClient.client.publish('/raspberrypi-pins/set', msgOn);
          state.aquariumSettings.lightStatus = true;
      });
      state.aquariumSettings.scheduledLightOff = Schedule.scheduleJob(
        `${state.aquariumSettings.timerLightEnd} * * * * *`, (): void =>{
          state.mqttClient.client.publish('/raspberrypi-pins/set', msgOff);
          state.aquariumSettings.lightStatus = false;
      });

      return {
        ...state,
      };
    }
    case 'AQUARIUM_LIGHT_MANUAL_TOGGLE': {
      log.info('Hello, log');
      log.error('Damn it, an error');
      const msg = `{"channel": 37, "state": "OUT", "value": ${action.payload}}`;
      state.mqttClient.client.publish('/raspberrypi-pins/set', msg);
      state.aquariumSettings.lightStatus = action.payload;

      return {
        ...state,
      };
    }
    case 'LATEST_MEASUREMENT_MESSAGE': {
      let indLoc = state.locations.findIndex(
        (l) => l.name === action.payload.location
      );

      if (indLoc === -1) {
        state.locations.push({
          id: uuid(),
          name: action.payload.location,
          measurements: [],
        });
        indLoc = state.locations.length - 1;
        state.locationCurrentIndex = indLoc;
      }
      
      const indMeasurement = state.locations[indLoc].measurements.findIndex(
        (m) => m.name.toLowerCase() === action.payload.type.toLowerCase()
      );

      if (indMeasurement === -1) {
        state.locations[indLoc].measurements.push({
          id: uuid(),
          name: action.payload.type,
          value: action.payload.value,
          unit: action.payload.unit,
          extremes: {
            min: action.payload.min,
            max: action.payload.max,
          },
          time: new Date(action.payload.time),
        });
      }

      return {
        ...state,
      };
    }
    case 'NEW_MEASUREMENT_MESSAGE': {
      const indLoc = state.locations.findIndex(
        (l) => l.name === action.payload.location
      );

      if (indLoc !== -1) {
        const indMeasurement = state.locations[indLoc].measurements.findIndex(
          (m) => m.name.toLowerCase() === action.payload.type.toLowerCase()
        );

        if (indMeasurement !== -1) {
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
          state.locations[indLoc].measurements[indMeasurement].extremes.min =
            dailyExtremes.min;
          state.locations[indLoc].measurements[indMeasurement].extremes.max =
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
