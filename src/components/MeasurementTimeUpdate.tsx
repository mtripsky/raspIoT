import React from 'react';
import { useAppState } from '../redux/store';
import { MeasurementTimeLastUpdate } from '../styles';

const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

interface MeasurementTimeUpdateProps {
  measurementTime: Date
}

export const MeasurementTimeUpdate = ({measurementTime} : MeasurementTimeUpdateProps) => {
  const { state } = useAppState();
  const timeDiffMinutes= Math.trunc(
    (measurementTime.getMinutes() - state.currentTime.getMinutes()) 
  );

  if(timeDiffMinutes <= 0) {
      return (
        <MeasurementTimeLastUpdate>
          (Last update: just now)
        </MeasurementTimeLastUpdate>
      );
    }
    else
    {
      return (
        <MeasurementTimeLastUpdate>
          (Last update: {rtf.format(timeDiffMinutes, 'minutes')})
        </MeasurementTimeLastUpdate>
      );
    }
};