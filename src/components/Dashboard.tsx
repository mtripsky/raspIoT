import React from 'react'
import { useAppState } from '../redux/store';
import {  MqttBadge, Column, Row, RowMenu, RowClock} from '../styles';
import { Clock } from './Clock';
import {HomeMenu } from './HomeMenu';
import {SettingsMenu} from './SettingsMenu';
import {MqttStatus} from './MqttStatus';

export const Dashboard = () => {
  const {state } = useAppState();
  const menu = state.currentView === 'Home' 
    ? <HomeMenu />
    : <SettingsMenu />

  return (
    <>
      <MqttBadge>
        <MqttStatus />
      </MqttBadge>
      <RowMenu>
        {menu}
      </RowMenu>
      <RowClock>
        <Clock />
      </RowClock>
    </>
  );
}
