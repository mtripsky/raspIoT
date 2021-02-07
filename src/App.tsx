import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import homeImage from './images/home-icon.png';
import weatherImage from './images/weather-icon.png';
import settingsImage from './images/settings-icon.png';
import './App.css';
//import sunny from './img-weather/sun.png';
//import cloudsun from './img-weather/sun-cloud.svg';
import './Weather-icon-animated.css';
import './Home-icon.css';
import Clock from './components/Clock';
import CSS from 'csstype';
import { MeasurementCard } from './components/MeasurementCard';
import { MqttStatus } from './components/MqttStatus';
import { DailyExtremesCard } from './components/DailyExtremesCard';
import { useAppState } from './AppStateContext';
import { Grid, Column, Row, LocationContainer, SettingsButton } from './styles';
import { MeasurementMessage } from './redux/types';

const App = () => {
  const { state, dispatch } = useAppState();
  const [index, setIndex] = useState(0);

  const handleSelect = (e: any) => {
    setIndex(e);
  };

  return (
    <Grid>
      <Row>
        <Column size={2}>
          <Row>
            <Column>
              {state.locations.length > 0 ? (
                <Carousel interval={5000} indicators={false} controls={true}>
                  {state.locations[index].measurements.map((measurement, i) => (
                    <Carousel.Item>
                      <MeasurementCard
                        name={measurement.name}
                        value={measurement.value}
                        unit={measurement.unit}
                        minValue={measurement.minValue}
                        maxValue={measurement.maxValue}
                        measurementTime={measurement.time}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : null}
            </Column>
          </Row>
        </Column>
        <Column size={1}>
          <Row>
            <Column>
              <MqttStatus />
            </Column>
            <Column>
              <SettingsButton>
                <img
                  src={settingsImage}
                  width={50}
                  alt='SettingsIcon'
                  onClick={() => {
                    console.log('click');
                  }}
                />
              </SettingsButton>
            </Column>
          </Row>
          <Row>
            <Column>
              <Carousel
                interval={20000}
                indicators={false}
                controls={true}
                onSlide={handleSelect}
              >
                <Carousel.Item>
                  <LocationContainer>
                    <img src={homeImage} width={120} alt='HomeIcon' />
                  </LocationContainer>
                </Carousel.Item>
              </Carousel>
            </Column>
          </Row>
          <Row>
            <Column>
              <Clock />
            </Column>
          </Row>
        </Column>
      </Row>
    </Grid>
  );
};

export default App;
