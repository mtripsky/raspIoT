import {useEffect, useState} from 'react';
import { useAppState } from './redux/store';
import Home from './views/Home';
import Settings from './views/Settings';
import {Dashboard} from './components/Dashboard'
import {
  Grid,
  Column,
  Row
} from './styles';

const App = () => {
  const { state, dispatch } = useAppState();

  const currentView = state.currentView == 'Home' 
    ? <Home />
    : <Settings />

  return (
    <Grid
      backgroundColor={state.fontViewSettings.colorSchema.backgroundColor}
      textColor={state.fontViewSettings.colorSchema.textColor}
    >
      <Row>
        <Column size={2}>
          {currentView} 
        </Column>
        <Column size={1}>
          <Dashboard />
        </Column>
      </Row>
    </Grid>
  );
};

export default App;
