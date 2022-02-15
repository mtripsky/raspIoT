import { useAppState } from '../redux/store';
import { Column, Row} from '../styles';
import { MqttSettings } from './MqttSettings';
import { FontSettings } from './FontSettings';
import { AquariumSettings } from './AquariumSettings';

const Settings = () => {
  const {state} = useAppState();
  const settingsView = () => {
    switch(state.currentSettingsView) {
      case 'FontSettings': return <FontSettings />;
      case 'AquariumSettings': return <AquariumSettings />;
      case 'MqttSettings': return <MqttSettings />;
    }
  }

  return (
    <Row>
      <Column>
        {settingsView()}
      </Column>
    </Row>
  );
};

export default Settings;
