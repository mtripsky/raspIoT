import React from 'react';
import { useAppState } from '../redux/store';
import { Column, Row} from '../styles';
import { MqttSettings } from './MqttSettings';
import { FontSettings } from './FontSettings';

const Settings = () => {
  const {state} = useAppState();

  return (
    <Row>
      <Column>
        {state.currentSettingsView === 'MqttSettings' &&
          <MqttSettings />
        }
        {state.currentSettingsView === 'FontSettings' &&
          <FontSettings />
        }
      </Column>
    </Row>
  );
};

export default Settings;
