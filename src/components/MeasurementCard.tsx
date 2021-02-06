import React from 'react';
import {
  MeasurementTitle,
  MeasurementValue,
  MeasurementCardContainer,
  MeasurementExtremes,
} from '../styles';
import { roundToOne } from '../utils/Calculator';

interface MeasurementProps {
  name: string;
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
}

export const MeasurementCard = ({
  name,
  value,
  unit,
  minValue,
  maxValue,
}: MeasurementProps) => {
  return (
    <MeasurementCardContainer>
      <MeasurementTitle>{name}</MeasurementTitle>
      <MeasurementValue>
        {roundToOne(value)}
        {unit}
      </MeasurementValue>
      <MeasurementExtremes>
        MIN: {roundToOne(minValue)}
        {unit}
      </MeasurementExtremes>
      <MeasurementExtremes>
        MAX: {roundToOne(maxValue)}
        {unit}
      </MeasurementExtremes>
    </MeasurementCardContainer>
  );
};
