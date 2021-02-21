import React, { useState } from 'react';
import mqttImage from '../images/mqtt-icon.png';
import fontImage from '../images/font-color-icon.png';
import homeIconImage from '../images/home-button.png';
import { ButtonGroup } from 'react-bootstrap';
import { useAppState } from '../redux/store';
import {Column, Row, ViewButton, ToggleButton, ColumnMenuButtons, MqttBadge} from '../styles';
import {MqttStatus} from './MqttStatus';

export const SettingsMenu = () => {
  const {state, dispatch } = useAppState();
  const [subsettingsValue, setSubsettingsValue] = useState('1');

  const subsettings = [
    { name: 'MqttSettings', value: '1', image: mqttImage},
    { name: 'FontSettings', value: '2', image: fontImage},
  ];

  return (
    <Column>
      <Row>
      <Column>
          <MqttBadge>
            <MqttStatus />
          </MqttBadge>
        </Column>
        <ColumnMenuButtons>
        <ViewButton
          backgroundColor={state.fontViewSettings.colorSchema.backgroundColor}
          textColor={state.fontViewSettings.colorSchema.textColor}
        >
          <img
            src={homeIconImage}
            width={50}
            alt='BackIcon'
            onClick={() => {
              dispatch({
                type: 'CHANGE_CURRENT_VIEW',
                payload: 'Home',
              });
            }}
          />
        </ViewButton>
        </ColumnMenuButtons>
      </Row>
      <Row>
        <ButtonGroup vertical={true}>
        {subsettings.map((subsetting, idx) => (
          <ToggleButton
            backgroundColor={state.fontViewSettings.colorSchema.backgroundColor}
            textColor={state.fontViewSettings.colorSchema.textColor}
            key={idx}
            selected={subsettingsValue === subsetting.value}
            onClick={(e) => {
              setSubsettingsValue(e.currentTarget.value);
              dispatch({
                type: 'CHANGE_CURRENT_SETTINGS_VIEW',
                payload: subsetting.name
              })
            }}
          >
            <img
              src={subsetting.image}
              width={50}
            />
          </ToggleButton>
        ))}
      </ButtonGroup>
      </Row>
    </Column>
  );
};
