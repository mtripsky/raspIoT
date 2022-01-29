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
