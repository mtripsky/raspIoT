import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
//import sunny from './img-weather/sun.png';
//import cloudsun from './img-weather/sun-cloud.svg';
import './Weather-icon-animated.css';
import './Home-icon.css';
import Clock from './Clock';
import CSS from 'csstype';
import MeasurementContainer from './MeasurementsContainer';

const homeStyleBackground: CSS.Properties = {
  backgroundColor: 'rgba(0, 255, 255)',
  float: 'left',
};
const homeStyleFloat: CSS.Properties = {
  float: 'left',
};

function App() {
  return (
    <div className='grid-layout'>
      <div className='top-left'>
        <MeasurementContainer DbName='/weather/temperature' />
      </div>
      <div className='top-right'>
        <div className='icon sunny'>
          <div className='sun'>
            <div className='rays'></div>
          </div>
        </div>
      </div>
      <div className='bottom-left'>
        <MeasurementContainer DbName='/weather/humidity' />
      </div>
      <div className='bottom-right'>
        <Card bg='primary'>
          <Card.Footer>
            <Clock />
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default App;
