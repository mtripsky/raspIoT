import React, { useEffect } from 'react';
import { useAppState } from '../redux/store';
import { ClockContainer } from '../styles';

interface PropsHour {
  hours: number;
  twelveHours: boolean;
}

interface PropsMinutes {
  minutes: number;
}

interface PropsSeconds {
  seconds: number;
}

interface PropsHour {
  hours: number;
  twelveHours: boolean;
}

interface PropsSeperator {
  separator: string;
}

interface PropsAmPm {
  hours: number;
}

function Hour({ twelveHours, hours }: PropsHour) {
  let h = hours;
  if (h === 0) {
    h = 12;
  }
  if (twelveHours && h > 12) {
    h -= 12;
  }
  return <span>{h}</span>;
}

function Minute({ minutes }: PropsMinutes) {
  return (
    <span>
      {minutes < 10 && '0'}
      {minutes}
    </span>
  );
}
function Second({ seconds }: PropsSeconds) {
  return (
    <span>
      {seconds < 10 && '0'}
      {seconds}
    </span>
  );
}
function Separator({ separator }: PropsSeperator) {
  return <span>{separator || ':'}</span>;
}
function Ampm({ hours }: PropsAmPm) {
  return <span>{hours >= 12 ? 'PM' : 'AM'}</span>;
}

interface Props {
  format: string;
  separator: string;
  hours: number;
  minutes: number;
  seconds: number;
  twelveHours: boolean;
}

function Formatter(props: Props) {
  const { format, separator, hours, minutes, seconds, twelveHours } = props;
  const children = format.split('').map((e: string) => {
    if (e === 'h') {
      return <Hour hours={hours} twelveHours={twelveHours} />;
    } else if (e === 'm') {
      return <Minute minutes={minutes} />;
    } else if (e === 's') {
      return <Second seconds={seconds} />;
    } else if (e === 'p') {
      return <Ampm hours={hours} />;
    } else if (e === ' ') {
      return <span />;
    } else {
      return <Separator separator={separator} />;
    }
  });

  return (
    <span>{React.Children.map(children, (c) => React.cloneElement(c))}</span>
  );
}

export const Clock = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    const interval = setInterval((): void => {
      dispatch({
        type: 'UPDATE_CURRENT_APPLICATION_TIME',
        payload: new Date(),
      });
    }, 500);

    return function cleanup(): void {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <ClockContainer
      backgroundColor={state.fontViewSettings.colorSchema.backgroundColor}
      textColor={state.fontViewSettings.colorSchema.textColor}
    >
      <Formatter
        format={'h:m:s p'}
        hours={state.currentTime.getHours()}
        minutes={state.currentTime.getMinutes()}
        seconds={state.currentTime.getSeconds()}
        twelveHours={true}
        separator={':'}
      />
    </ClockContainer>
  );
};