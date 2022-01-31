import { useState } from 'react';
import mqttImage from '../images/mqtt-icon.png';
import fontImage from '../images/font-color-icon.png';
import { useAppState } from '../redux/store';
import {Column, Row, ViewButton} from '../styles';

export const SubSettingsMenuView = () => {
  const {state, dispatch } = useAppState();
  const [subsettingsValue, setSubsettingsValue] = useState('1');

  const subsettings = [
    { name: 'MqttSettings', value: '1', image: mqttImage},
    { name: 'FontSettings', value: '2', image: fontImage},
  ];

  return (
    <>
      {subsettings.map((subsetting, idx) => (
        <Row>
          <Column align='right'>
            <ViewButton
              backgroundColor={state.fontViewSettings.colorSchema.backgroundColor}
              textColor={state.fontViewSettings.colorSchema.textColor}
              key={idx}
              onClick={(e) => {
                setSubsettingsValue(e.currentTarget.value);
                dispatch({
                  type: 'CHANGE_CURRENT_SETTINGS_VIEW',
                  payload: subsetting.name
                })
              }}
            >
              <img alt=""
                src={subsetting.image}
                width={50}
              />
            </ViewButton>
          </Column>
        </Row>
      ))}
    </>
  );
};