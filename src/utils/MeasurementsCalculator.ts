import { Measurement, MeasurementMessage } from '../redux/types';

export const GetDailyExtremes = (
  oldMeasurement: Measurement,
  payload: MeasurementMessage
) => {
  const newTime = new Date(payload.time);
  const dayDiff = newTime.getDay() - oldMeasurement.time.getDay();

  if (dayDiff >= 1) {
    return {
      min: payload.value,
      max: payload.value,
    };
  }

  return {
    min:
      payload.value < oldMeasurement.minValue
        ? payload.value
        : oldMeasurement.minValue,
    max:
      payload.value > oldMeasurement.maxValue
        ? payload.value
        : oldMeasurement.maxValue,
  };
};
