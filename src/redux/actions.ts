import { MeasurementMessage, Error } from './types';

export type Action =
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
