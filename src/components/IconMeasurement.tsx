import React from 'react';
import {
  Row,
} from '../styles';
import temperature from '../images/temperature-icon.png';
import humidity from '../images/humidity-icon.png';

interface IconMeasurement {
  name: string;
}

export const IconMeasurement = ({
  name
}: IconMeasurement) => {
  if(name === 'temperature')
  {
    return (<Row><img src={temperature} width={140} alt='temperatureIcon' /></Row>)
  } else if(name === 'humidity') {
    return (<Row><img src={humidity} width={140} alt='humidityIcon' /></Row>)
  } else {
      return null;
  }
};
