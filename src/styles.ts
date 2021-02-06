import styled from 'styled-components';

export const AppContainer = styled.div``;

export const Grid = styled.div``;

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

export const ClockContainer = styled.div`
  background: red;
  text-align: center;
  font-size: 150%;
`;

export const MeasurementCardContainer = styled.div`
  background: azure;
  text-align: center;
`;

export const MeasurementTitle = styled.div`
  vertical-align: text-center;
  padding: 6px 10px 12px 10px;
  font-weight: bold;
  font-size: 200%;
`;

export const MeasurementValue = styled.div`
  font-size: 400%;
  padding: 10px 0px 10px 0px;
`;

export const MeasurementExtremes = styled.div`
  font-size: 200%;
  padding: 10px 0px 10 0px;
`;
