import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import homeImage from './images/home-icon.png';
import weatherImage from './images/weather-icon.png';
import './App.css';
//import sunny from './img-weather/sun.png';
//import cloudsun from './img-weather/sun-cloud.svg';
import './Weather-icon-animated.css';
import './Home-icon.css';
import Clock from './Clock';
import CSS from 'csstype';
import { MeasurementCard } from './components/MeasurementCard';
import { DailyExtremesCard } from './components/DailyExtremesCard';
import { useAppState } from './AppStateContext';
import { Grid, Column, Row } from './styles';
import { MeasurementMessage } from './redux/types';
const homeStyleBackground: CSS.Properties = {
  backgroundColor: 'rgba(0, 255, 255)',
  float: 'left',
};
const homeStyleFloat: CSS.Properties = {
  float: 'left',
};

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
              <Carousel
                interval={20000}
                indicators={false}
                controls={true}
                onSlide={handleSelect}
              >
                <Carousel.Item>
                  <img src={homeImage} width={120} alt='HomeIcon' />
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
