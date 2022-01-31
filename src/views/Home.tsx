import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import '../Weather-icon-animated.css';
import '../Home-icon.css';
import { MeasurementCard } from '../components/MeasurementCard';
import { useAppState } from '../redux/store';
import {
  Column,
  Row
} from '../styles';

const Home = () => {
  const { state, dispatch} = useAppState();
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      if(state.locations.length > 0)
      {
        const i = index + 1 >= state.locations.length ? 0 : index + 1;
        dispatch({type: 'CHANGE_CURRENT_LOCATION_INDEX', payload: i}); // it will not about new index only next time

        setIndex(index + 1);
      }
    }, 20000); // 20 second
    // Clear timeout if the component is unmounted
    return () => clearInterval(interval);
  },[index]);

  return (
    <Row>
      <Column>
        {state.locationCurrentIndex > -1 && state.locationCurrentIndex < state.locations.length 
          ? (
            <Carousel interval={5000} indicators={false}>
              {state.locations[state.locationCurrentIndex].measurements.map((measurement, i) => (
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
            </Carousel>) 
          : null}
      </Column>
    </Row>
  );
};

export default Home;
