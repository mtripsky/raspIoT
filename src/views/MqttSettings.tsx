import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MqttSettingsForm } from '../components/MqttSettingsForm';
import mqttImage from '../images/mqtt-icon.png';
import { useAppState } from '../redux/store';
import { Grid, Column, Row, ViewButton, Title } from '../styles';


export const MqttSettings = () => {
  const {state, dispatch } = useAppState();

  return (
    <Row>
      <Column>
        <Row>
          <Column>
            <Title>
              MQTT preferences
            </Title>
          </Column>
        </Row>
        <Row>
          <Column align='left'>
            <MqttSettingsForm />
            <Row><h5>Connection settings:</h5></Row>
            <Row>hostname: {state.mqttClient.options.hostname}</Row>
            <Row>port: {state.mqttClient.options.port}</Row>
            <Row>subscribed topics:</Row>
              <Row>
              <small>
              <ul>
                {state.mqttClient.topics.map((topic, i) =>(
                  <li>{topic}</li>
                ))}
              </ul>
              </small>
              </Row>
          </Column>
        </Row>
      </Column>
    </Row>
  );
};
