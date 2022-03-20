import React from 'react';
import {
  Title,
  MeasurementValue,
  MeasurementCardContainer,
  MeasurementExtremes,
  Measurement,
  Unit,
  MeasurementDecimal,
} from '../styles';
import { roundToOne, getDecimal } from '../utils/Calculator';
import { MeasurementTimeUpdate } from './MeasurementTimeUpdate';

interface MeasurementProps {
  name: string;
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
  measurementTime: Date;
}

export const MeasurementCard = ({
  name,
  value,
  unit,
  minValue,
  maxValue,
  measurementTime,
}: MeasurementProps) => {
  return (
    <MeasurementCardContainer>
      {/* <Title>{name}</Title>
      <MeasurementValue>
        {roundToOne(value)}
        {unit}
      </MeasurementValue> */}
      <MeasurementValue>
        {Math.floor(value)}
        <Unit>{unit}</Unit>
        <MeasurementDecimal>.{getDecimal(value)}</MeasurementDecimal>
      </MeasurementValue>
      <MeasurementTimeUpdate
        measurementTime={measurementTime}
      />
      <MeasurementExtremes>
        {Math.floor(minValue)}
        <Unit>{unit}</Unit>
        <MeasurementDecimal>.{getDecimal(minValue)}</MeasurementDecimal>
      </MeasurementExtremes>
      <MeasurementExtremes>
        {Math.floor(maxValue)}
        <Unit>{unit}</Unit>
        <MeasurementDecimal>.{getDecimal(maxValue)}</MeasurementDecimal>
      </MeasurementExtremes>
    </MeasurementCardContainer>
  );
};
