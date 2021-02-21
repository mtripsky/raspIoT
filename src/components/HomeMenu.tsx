import React, {useEffect, useState} from 'react'
import { Carousel } from 'react-bootstrap';
import settingsImage from '../images/settings-icon.png';
import { useAppState } from '../redux/store';
import { Column, ColumnMenuButtons, Row, ViewButton, MqttBadge } from '../styles';
import {MqttStatus} from './MqttStatus';
import {LocationCarouselImage} from './LocationCarouselImage';

export const HomeMenu = () => {
  const {state, dispatch } = useAppState();
  
  const locationImage = state.locationCurrentIndex >= 0 && state.locationCurrentIndex < state.locations.length 
    ? (<LocationCarouselImage locationName={state.locations[state.locationCurrentIndex].name} />)
    : null;

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
              src={settingsImage}
              width={50}
              alt='SettingsIcon'
              onClick={() => {
                dispatch({
                  type: 'CHANGE_CURRENT_VIEW',
                  payload: 'Settings',
                });
              }}
            />
          </ViewButton>
        </ColumnMenuButtons>
      </Row>
      <Row>
        {locationImage}
      </Row>
    </Column>
  );
}