import React from 'react';
import {
  MeasurementTitle,
  MeasurementValue,
  MeasurementCardContainer,
  MeasurementExtremes,
  MeasurementTimeLastUpdate,
} from '../styles';
import { roundToOne } from '../utils/Calculator';
import { useAppState } from '../AppStateContext';

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
  const { state, dispatch } = useAppState();
  const timeDiffSeconds = Math.ceil(
    (measurementTime.getTime() - state.currentTime.getTime()) / 1000
  );

  return (
    <MeasurementCardContainer>
      <MeasurementTitle>{name}</MeasurementTitle>
      <MeasurementValue>
        {roundToOne(value)}
        {unit}
      </MeasurementValue>
      <MeasurementTimeLastUpdate>
        (Last update {rtf.format(timeDiffSeconds, 'second')})
      </MeasurementTimeLastUpdate>
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
