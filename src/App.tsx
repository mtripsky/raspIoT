import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import homeImage from './images/home-icon.png';
import settingsImage from './images/settings-icon.png';
import './App.css';
import './Weather-icon-animated.css';
import './Home-icon.css';
import Clock from './components/Clock';
import { MeasurementCard } from './components/MeasurementCard';
import { MqttStatus } from './components/MqttStatus';
import { useAppState } from './redux/store';
import {
  Grid,
  Column,
  Row,
  LocationContainer,
  SettingsButton,
  MqttBadge,
} from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {
  const { state } = useAppState();
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
              <MqttBadge>
                <MqttStatus />
              </MqttBadge>
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
