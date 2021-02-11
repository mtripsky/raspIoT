export interface Measurement {
  id: string;
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  unit: string;
  time: Date;
}

export interface ApplicationSettings {
  backgroundcolor: string;
}

export interface Location {
  id: string;
  name: string;
  measurements: Measurement[];
}

export interface Client {
  client: any;
  status: string;
}
export interface AppState {
  locations: Location[];
  mqttClient: Client;
  error?: Error | null;
  currentTime: Date;
}

export interface MeasurementMessage {
  device: string;
  type: string;
  value: number;
  unit: string;
  location: string;
  time: string;
  timestamp: number;
}

export interface Error {
  text: string;
}
