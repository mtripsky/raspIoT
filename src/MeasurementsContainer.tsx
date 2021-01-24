import React, { useEffect, useState } from 'react';
/**
import SensorsList from './SensorsList';
import MeasurementsDashboardHeader from '../headers/MeasurementsDashboardHeader';*/
import { Card } from 'react-bootstrap';
import { firebaseDb } from './db/firebase';

import * as moment from 'moment';
import { roundToOne } from './utils/Calculator';
import './Measurements.css';

interface ISensorMeasurement {
  Name: string;
  Value: number;
  Unit: string;
  TimeStamp: string;
  LastUpdate: string;
}

interface IMeasurement {
  Value: number;
  Unit: string;
  TimeStamp: string;
  LastUpdate: string;
}

interface IPropsMeasurements {
  DbName: string;
}

const defaultMeasurement: IMeasurement = {
  Value: 0,
  Unit: '',
  TimeStamp: moment.unix(moment.now()).format('YYYY-MM-DD HH:mm'),
  LastUpdate: moment.unix(moment.now()).fromNow(),
};

function getMeasurementsAverage(sensors: ISensorMeasurement[]) {
  const size = sensors.length;
  let valueSum = 0;
  let timeStamp: string = '';
  let unit: string = '';
  let lastUpdate: string = '';
  sensors.forEach((s) => {
    // check whether the timestamp is similar within 1 minute and unit are same
    valueSum += s.Value;
    timeStamp = s.TimeStamp;
    unit = s.Unit;
    lastUpdate = s.LastUpdate;
  });

  const result: IMeasurement = {
    Value: valueSum / size,
    Unit: unit,
    TimeStamp: timeStamp,
    LastUpdate: lastUpdate,
  };
  return result;
}

function getSensorsMeasurementsFromSnapshot(
  snapshot: firebase.database.DataSnapshot
) {
  let sensors: ISensorMeasurement[] = []; // clear the array
  snapshot.forEach((child) => {
    let timestamp = moment.unix(child.child('timeStamp').val());
    sensors.push({
      Name: child.key as string,
      Value: child.child('value').val() as number,
      Unit: child.child('unit').val() as string,
      TimeStamp: timestamp.format('YYYY-MM-DD HH:mm') as string,
      LastUpdate: timestamp.fromNow(),
    });
  });

  return sensors;
}

function updateSensorMeasurement(
  child: firebase.database.DataSnapshot,
  sensors: ISensorMeasurement[]
) {
  const index: number = sensors.findIndex((s) => s.Name === child.key);
  if (index !== -1) {
    let timestamp = moment.unix(child.child('timeStamp').val());
    sensors[index] = {
      Name: child.key as string,
      Value: child.child('value').val() as number,
      Unit: child.child('unit').val() as string,
      TimeStamp: timestamp.format('YYYY-MM-DD HH:mm') as string,
      LastUpdate: timestamp.fromNow(),
    };
  }

  return sensors;
}

const MeasurementsContainer: React.FC<IPropsMeasurements> = (
  props: IPropsMeasurements
) => {
  const [measurement, setMeasurement] = React.useState<IMeasurement>(
    defaultMeasurement
  );
  const [sensors, setSensors] = React.useState<ISensorMeasurement[]>([]);

  useEffect(() => {
    const ref = firebaseDb.ref(props.DbName);

    ref.once('value', (snapshot) => {
      const querySensors = getSensorsMeasurementsFromSnapshot(snapshot);
      // NOT GOOD TO MODIFY STATE LIKE THIS
      // FIX ME: problem is that at the start sensors is empty array
      sensors.push(...querySensors);
      setMeasurement(getMeasurementsAverage(sensors));
    });

    ref.on('child_changed', (child) => {
      updateSensorMeasurement(child, sensors);
      setSensors(sensors);
      setMeasurement(getMeasurementsAverage(sensors));
    });

    return function cleanup() {
      ref.off();
    };
  }, []);

  return (
    <Card bg='Light'>
      <Card.Body>
        <div className='major-card'>
          {roundToOne(measurement.Value)}{' '}
          <span className='major-card-unit'>{measurement.Unit}</span>
        </div>
      </Card.Body>
      <Card.Footer className='bg-white'>
        <small className='text-muted'>
          Last updated {measurement.LastUpdate}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default MeasurementsContainer;
