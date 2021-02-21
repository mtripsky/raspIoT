import React from 'react'
import { useAppState } from '../redux/store';
import {  Column, Row, RowMenu, RowClock} from '../styles';
import { Clock } from './Clock';
import {HomeMenu } from './HomeMenu';
import {SettingsMenu} from './SettingsMenu';

export const Dashboard = () => {
  const {state } = useAppState();
  const menu = state.currentView === 'Home' 
    ? <HomeMenu />
    : <SettingsMenu />

  return (
    <>
      <RowMenu>
        {menu}
      </RowMenu>
      <RowClock>
        <Clock />
      </RowClock>
    </>
  );
}
