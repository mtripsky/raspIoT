import mqtt from 'mqtt';

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

export interface ColorSchema {
  textColor: string;
  backgroundColor: string;
}

export interface FontViewSettings {
  colorSchema: ColorSchema;
}

export interface AquariumSettings{
  timerSaveButtonActive: boolean;
  timerLightStart: number;
  timerLightEnd: number;
  lightStatus: boolean;
  lightControlType: string;
  scheduledLightOn: any;
  scheduledLightOff: any;
}

export interface Client {
  client: any;
  status: string;
  options: mqtt.IClientOptions;
  topics: string[];
}
export interface AppState {
  locations: Location[];
  locationCurrentIndex: number;
  mqttClient: Client;
  //switchBot: any;
  error?: Error | null;
  currentTime: Date;
  currentView: string;
  currentSettingsView: string;
  fontViewSettings: FontViewSettings;
  aquariumSettings: AquariumSettings;
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

export interface TemperatureSwitchBot {
  c: number;
  f: number;
}

export interface ServiceDataSwitchBot {
  model: string;
  modelName: string;
  temperature: TemperatureSwitchBot;
  fahrenheit: boolean;
  humidity: number;
  battery: number;
}

export interface AdvertisementDataSwitchBot {
  id: string;
  address: string;
  rssi: number;
  serviceData: ServiceDataSwitchBot;
}
