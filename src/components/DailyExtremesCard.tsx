import React from 'react';
import { MeasurementCardContainer, MeasurementExtremes } from '../styles';
import { roundToOne } from '../utils/Calculator';

interface DailyExtremesProps {
  minValue: number;
  maxValue: number;
  unit: string;
}

export const DailyExtremesCard = ({
  minValue,
  maxValue,
  unit,
}: DailyExtremesProps) => {
  return (
    <MeasurementCardContainer>
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
