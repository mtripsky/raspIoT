import styled from 'styled-components';

// 8. Pink & blue
//const defaultColor = '#2f3c7e';
//const defaultBackground = '#fbeaeb';

// gray-black
const defaultColor = '#000000';
const defaultBackground = '#f2f2f2';

export const AppContainer = styled.div``;

interface GridProps {
  backgroundcolor?: string;
  textcolor?: string;
}
interface ButtonProps {
  backgroundcolor?: string;
  textcolor?: string;
}

export const Grid = styled.div<GridProps>`
  background: ${(props) =>
    props.backgroundcolor ? props.backgroundcolor : defaultBackground};
  color: ${(props) => (props.textcolor ? props.textcolor : defaultColor)};
`;

interface ColumnProps {
  size?: number;
}

export const Column = styled.div<ColumnProps>`
  text-align: center;
  flex: ${(props) => (props.size ? props.size : 1)};
`;

export const Row = styled.div`
  display: flex;
`;

export const SettingsButton = styled.button<ButtonProps>`
  background: ${(props) =>
    props.backgroundcolor ? props.backgroundcolor : defaultBackground};
  color: ${(props) => (props.textcolor ? props.textcolor : defaultColor)};
  padding: 0;
  border: none;
`;

export const ClockContainer = styled.div<GridProps>`
  text-align: center;
  font-size: 150%;
  padding: 50px 0px 20px 0px;
`;

export const LocationContainer = styled.div`
  align: center;
  padding: 10px 0px 10px 0px;
`;
export const MeasurementCardContainer = styled.div`
  text-align: center;
`;

export const MeasurementTitle = styled.div`
  vertical-align: text-center;
  padding: 6px 10px 10px 10px;
  font-weight: bold;
  font-size: 200%;
`;

export const MeasurementTimeLastUpdate = styled.div`
  vertical-align: text-center;
  font-size: 100%;
`;

export const MeasurementValue = styled.div`
  font-size: 410%;
  padding: 0px 0px 0px 0px;
`;

export const MeasurementExtremes = styled.div`
  font-size: 210%;
  padding: 5px 0px 0px 0px;
`;

export const MqttBadge = styled.div`
  font-size: 170%;
`;
