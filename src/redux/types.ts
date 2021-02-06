const moment = require('moment');

export interface Measurement {
  id: string;
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  unit: string;
  time: moment.Moment;
}

export interface Location {
  id: string;
  name: string;
  measurements: Measurement[];
}

export interface AppState {
  locations: Location[];
}

export interface MeasurementMessage {
  device: string;
  type: string;
  value: number;
  unit: string;
  location: string;
  time: moment.Moment;
  timestamp: number;
}
