import { v4 as uuid } from 'uuid';
import { Action } from './actions';
import { AppState } from './types';
import { GetDailyExtremes } from '../utils/MeasurementsCalculator';

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
    case 'AQUARIUM_LIGHT_SLIDER_ACTIVE': {
      state.aquariumSettings.timerSaveButtonActive =
        !state.aquariumSettings.timerSaveButtonActive;
      return {
        ...state,
      };
     // timerSaveButtonActive: false,
      //timerLightStart: 7,
      //timerLightEnd: 18,
     // lightStatus: false,
    }
    case 'AQUARIUM_LIGHT_TIMER_SAVED': {
      state.aquariumSettings.timerLightStart = action.payload[0];
      state.aquariumSettings.timerLightEnd = action.payload[1];

      //state.mqttClient.client

      return {
        ...state,
      };
    }
    case 'AQUARIUM_LIGHT_MANUAL_TOGGLE': {
      const msg = `{"channel": 37, "state": "OUT", "value": ${action.payload}}`;
      state.mqttClient.client.publish('/raspberrypi-pins/set', msg);

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
