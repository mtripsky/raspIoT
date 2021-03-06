import {
  MeasurementMessage,
  Error,
  ColorSchema,
  AdvertisementDataSwitchBot,
  LastMeasurementMessage,
} from './types';

export type Action =
  | {
      type: 'NEW_MEASUREMENT_MESSAGE';
      payload: MeasurementMessage;
    }
  | {
      type: 'LATEST_MEASUREMENT_MESSAGE';
      payload: LastMeasurementMessage;
    }
  | {
      type: 'NEW_MEASUREMENT_SWITCHBOT';
      payload: AdvertisementDataSwitchBot;
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
    }
  | {
      type: 'CHANGE_CURRENT_VIEW';
      payload: string;
    }
  | {
      type: 'CHANGE_CURRENT_SETTINGS_VIEW';
      payload: string;
    }
  | {
      type: 'CHANGE_FONT_BACKGROUND_SCHEMA';
      payload: ColorSchema;
    }
  | {
      type: 'CHANGE_CURRENT_LOCATION_INDEX';
      payload: number;
    }
  | {
      type: 'AQUARIUM_LIGHT_CONTROL_TYPE';
      payload: string;
    }
  | {
      type: 'AQUARIUM_LIGHT_TIMER_SAVED';
      payload: number[];
    }
  | {
      type: 'AQUARIUM_LIGHT_MANUAL_TOGGLE';
      payload: boolean;
    };
