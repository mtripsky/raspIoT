import React from 'react';
import { useAppState } from '../redux/store';
import { Column, Row, FontButton, Title } from '../styles';
import {ColorSchema} from '../redux/types'

export const FontSettings = () => {
  const {dispatch } = useAppState();
  const colorschemas : ColorSchema[] = [
    {textColor: '#000000', backgroundColor:'#f2f2f2'},
    {textColor: '#f9d342', backgroundColor:'#292826'},
    {textColor: '#ffffff', backgroundColor:'#0f60b6'},
    {textColor: '#2f3c7e', backgroundColor:'#fbeaeb'},
  ]

  return (
    <Row>
      <Column>
        <Row>
          <Column>
            <Title>
              UI Preferences
            </Title>
          </Column>
        </Row> 
        <Row>
          <Column>
          <Row>
          {colorschemas.map((schema, i) => (
            <Column>
              <FontButton
                backgroundColor={schema.backgroundColor}
                textColor={schema.textColor}
                onClick={(e) => {dispatch({type: 'CHANGE_FONT_BACKGROUND_SCHEMA', payload: schema})}}
              >
                TEXT
              </FontButton>
            </Column>
          ))}
          </Row>
          </Column>
        </Row>
      </Column>
    </Row>
  );
};
