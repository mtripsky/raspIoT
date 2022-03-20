import React from 'react';
import { useAppState } from '../redux/store';
import { MqttBadge, RowMenu, RowClock } from '../styles';
import { Clock } from './Clock';
import { HomeMenu } from './HomeMenu';
import { SettingsMenu } from './SettingsMenu';
import { MqttStatus } from './MqttStatus';

export const Dashboard = () => {
  const { state } = useAppState();

  if (state.currentView === 'Home') {
    return (
      <>
        <MqttBadge>
          <MqttStatus />
        </MqttBadge>
        <RowMenu>
          <HomeMenu />
        </RowMenu>
        <RowClock>
          <Clock />
        </RowClock>
      </>
    );
  } else {
    return (
      <>
        <SettingsMenu />
      </>
    );
  }
};
