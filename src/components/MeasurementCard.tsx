import React from 'react';
import {
  Title,
  MeasurementValue,
  MeasurementCardContainer,
  MeasurementExtremes,
  MeasurementTimeLastUpdate,
} from '../styles';
import { roundToOne } from '../utils/Calculator';
import { useAppState } from '../redux/store';
import {MeasurementTimeUpdate} from './MeasurementTimeUpdate';

interface MeasurementProps {
  name: string;
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
  measurementTime: Date;
}

const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

export const MeasurementCard = ({
  name,
  value,
  unit,
  minValue,
  maxValue,
  measurementTime,
}: MeasurementProps) => {
  const { state } = useAppState();
  const timeDiffSeconds = Math.trunc(
    (measurementTime.getMinutes() - state.currentTime.getMinutes()) 
  );

  return (
    <MeasurementCardContainer>
      <Title>{name}</Title>
      <MeasurementValue>
        {roundToOne(value)}
        {unit}
      </MeasurementValue>
      <MeasurementTimeUpdate 
        measurementTime={measurementTime}
      />
      <MeasurementExtremes>
        min: {roundToOne(minValue)}
        {unit}
      </MeasurementExtremes>
      <MeasurementExtremes>
        max: {roundToOne(maxValue)}
        {unit}
      </MeasurementExtremes>
    </MeasurementCardContainer>
  );
};
