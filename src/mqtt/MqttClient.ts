import mqtt from 'mqtt';

type ConnectFce = (
  options: mqtt.IClientOptions,
  callback: OnConnectedCallback
) => mqtt.MqttClient | null;

interface DisconectFce {
  (): mqtt.MqttClient | null;
}
interface SubscribeFce {
  ( topic: string | string[],
    options: mqtt.IClientPublishOptions | undefined
  ): void;
}
interface OnMessageCallback {
  (topic: string, msg: Buffer): void;
}
type OnConnectedCallback = () => void;

interface OnErrorCallback {
  (error: string): void;
}
interface OnDisconnectedCallback {
  (): void;
}
interface PublishFce {
  (topic: string, msg: string): void;
}

interface Client {
  connect: ConnectFce;
  disconnect: DisconectFce;
  subscribe: SubscribeFce;
  publish: PublishFce;
  registerCallbackOnMessage: (callback: OnMessageCallback) => void;
  registerCallbackOnDisconnected: (callback: OnDisconnectedCallback) => void;
}

let client: any = null;

const connectFce = function connect(
  options: mqtt.IClientOptions,
  callback: OnConnectedCallback
) {
  if (client === null) {
    const url = `ws://${options.host}:${options.port}/mqtt`;
    client = mqtt.connect(url, options);
    client.on('connect', (): void => {
      callback();
    });
  }
  return client;
};
const disconnectFce = function disconnect(): mqtt.MqttClient | null {
  if (client) {
    console.log('disconnecting....');
    client.end();
    client = null;
  }

  return client;
};
const subscribeFce = function subscribe(
  topic: string | string[],
  options: mqtt.IClientPublishOptions = { qos: 0 }
): void {
  client.subscribe(topic, options);
  return client;
};
const registerCallbackOnMessageFce = function registerCallbackOnMessageFce(
  callback: OnMessageCallback
): void {
  if (client) {
    client.on('message', (topic: string, message: Buffer): void => {
      callback(topic, message);
    });
  }
};
const registerCallbackOnDisconnectedClosedOfflineFce = function registerCallbackOnDisconnectedClosedOfflineFce(
  callback: OnDisconnectedCallback
) {
  if (client) {
    client.on('disconnect', () => {
      console.log('disconnect');
      callback();
    });
    client.on('close', () => {
      console.log('close');
      callback();
    });
    client.on('offline', () => {
      console.log('offline');
      callback();
    });
    client.on('error', (err: string) => {
      console.log(`error: ${err}`);
      if (!client.connected) {
        callback();
      }
    });
  }
};
const publishFce = function publish(
  topic: string,
  msg: string
) {
  if (client) {
    console.log(`publish on topic: ${topic}, msg: ${msg}`);
    client.publish(topic, msg);
  }
  return client;
};

let mqttClient: Client = {
  connect: connectFce,
  disconnect: disconnectFce,
  subscribe: subscribeFce,
  publish: publishFce,
  registerCallbackOnMessage: registerCallbackOnMessageFce,
  registerCallbackOnDisconnected: registerCallbackOnDisconnectedClosedOfflineFce,
};

export default mqttClient;
