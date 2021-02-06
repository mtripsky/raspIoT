import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { AppState, Measurement, MeasurementMessage } from './redux/types';

const appDataEmpty: AppState = {
  locations: [],
};

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);
export const useAppState = () => {
  return useContext(AppStateContext);
};

type Action = {
  type: 'NEW_MEASUREMENT_MESSAGE';
  payload: MeasurementMessage;
};

function GetDailyExtremes(
  oldMeasurement: Measurement,
  payload: MeasurementMessage
) {
  console.log(`oldtime: ${oldMeasurement.time}`);
  console.log(`newtime: ${payload.time}`);
  /*
  if (payload.time.diff(oldMeasurement.time, 'day') >= 1) {
    return {
      min: payload.value,
      max: payload.value,
    };
  }*/

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
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'NEW_MEASUREMENT_MESSAGE': {
      console.log('NEW_MEASUREMENT_MESSAGE');
      const indLoc = state.locations.findIndex(
        (l) => l.name === action.payload.location
      );

      if (indLoc === -1) {
        // new location
        state.locations.push({
          id: uuid(),
          name: action.payload.location,
          measurements: [],
        });
        state.locations[state.locations.length - 1].measurements.push({
          id: uuid(),
          name: action.payload.type,
          value: action.payload.value,
          unit: action.payload.unit,
          minValue: action.payload.value,
          maxValue: action.payload.value,
          time: action.payload.time,
        });
      } else {
        const indMeasurement = state.locations[indLoc].measurements.findIndex(
          (m) => m.name === action.payload.type
        );
        console.log(state);
        console.log(indMeasurement);

        if (indMeasurement === -1) {
          state.locations[indLoc].measurements.push({
            id: uuid(),
            name: action.payload.type,
            value: action.payload.value,
            unit: action.payload.unit,
            minValue: action.payload.value,
            maxValue: action.payload.value,
            time: action.payload.time,
          });
        } else {
          const dailyExtremes = GetDailyExtremes(
            state.locations[indLoc].measurements[indMeasurement],
            action.payload
          );
          state.locations[indLoc].measurements[indMeasurement].time =
            action.payload.time;
          state.locations[indLoc].measurements[indMeasurement].value =
            action.payload.value;
          state.locations[indLoc].measurements[indMeasurement].minValue =
            dailyExtremes.min;
          state.locations[indLoc].measurements[indMeasurement].maxValue =
            dailyExtremes.max;
        }
      }

      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appDataEmpty);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
