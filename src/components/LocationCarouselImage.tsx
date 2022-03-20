import React from 'react';
import {LocationContainer} from '../styles';
import homeImage from '../images/home-icon.png';
import weatherImage from '../images/weather-icon.png';

interface LocationCarouselImageProps {
  locationName: string;
}

export const LocationCarouselImage = ({locationName}: LocationCarouselImageProps) => {
  if(locationName === 'HOME-LR'){
    return (
      <LocationContainer>
        <img src={homeImage} width={120} alt='HomeIcon' />
      </LocationContainer>)
  } else if(locationName === 'OUTSIDE') {
    return (
      <LocationContainer>
        <img src={weatherImage} width={120} alt='WeatherIcon' />
      </LocationContainer>)
  } else
  {
    return (
      <LocationContainer>
        <img src={homeImage} width={120} alt='HomeIcon' />
      </LocationContainer>)
  }
}