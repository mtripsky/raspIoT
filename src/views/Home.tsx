import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

import { MeasurementCard } from '../components/MeasurementCard';
import { IconMeasurement } from '../components/IconMeasurement';
import { useAppState } from '../redux/store';
import {
  Column,
  Row,
  RowNoFlex,
  VertivalCenterRow,
  MeasurementContainer,
  Title,
  MeasurementValue,
  MeasurementCardContainer,
  MeasurementExtremes,
  Measurement,
  Unit,
  MeasurementDecimal,
} from '../styles';
import { roundToOne, getDecimal } from '../utils/Calculator';

const Home = () => {
  const { state, dispatch } = useAppState();
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
    <MeasurementContainer><VertivalCenterRow>
      {state.locationCurrentIndex > -1 && state.locationCurrentIndex < state.locations.length  
        ? state.locations[state.locationCurrentIndex].measurements.map((measurement, i) => (
          <Row>
             <Column>
              <IconMeasurement name={measurement.name.toLowerCase()} />
            </Column>
            <Column>
              <Row>
                <MeasurementValue>
                  {Math.floor(measurement.value)}
                  <Unit>{measurement.unit}</Unit>
                  <MeasurementDecimal>.{getDecimal(measurement.value)}</MeasurementDecimal>
                </MeasurementValue>
              </Row>
            </Column>
          </Row>
        ))
        : null}
    </VertivalCenterRow></MeasurementContainer>
  );
  // return (
  //   <Row>
  //     <Column>
  //       {state.locationCurrentIndex > -1 && state.locationCurrentIndex < state.locations.length 
  //         ? (
  //           <Carousel interval={10000} indicators={false} nextLabel={null} prevLabel={null} key={state.locations[state.locationCurrentIndex].id}>
  //             {state.locations[state.locationCurrentIndex].measurements.map((measurement, i) => (
  //               <Carousel.Item key={measurement.id}>
  //                 <MeasurementCard
  //                   name={measurement.name}
  //                   value={measurement.value}
  //                   unit={measurement.unit}
  //                   minValue={measurement.extremes.min}
  //                   maxValue={measurement.extremes.max}
  //                   measurementTime={measurement.time}
  //                 />
  //               </Carousel.Item>
  //             ))}
  //           </Carousel>) 
  //         : null}
  //     </Column>
  //   </Row>
  // );
};

export default Home;
