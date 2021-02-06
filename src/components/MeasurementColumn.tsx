import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Column, Row, MeasurementCardContainer } from '../styles';
import { MeasurementCard } from './MeasurementCard';
import { DailyExtremesCard } from './DailyExtremesCard';

interface MeasurementColumnProps {
  name: string;
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
}

export const MeasurementColumn = ({
  name,
  value,
  unit,
  minValue,
  maxValue,
}: MeasurementColumnProps) => {
  return <div></div>;
};
