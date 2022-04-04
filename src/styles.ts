import styled from 'styled-components';

// 8. Pink & blue
//const defaultColor = '#2f3c7e';
//const defaultBackground = '#fbeaeb';

// gray-black
const defaultColor = '#000000';
const defaultBackground = '#f2f2f2';

export const AppContainer = styled.div``;

interface ColorProps {
  color: string;
}

interface GridProps {
  backgroundColor: string;
  textColor: string;
}
interface ButtonProps {
  backgroundColor: string;
  textColor: string;
}

interface ToggleButtonProps extends ButtonProps {
  selected: boolean;
}

export const Grid = styled.div<GridProps>`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  padding: 3px 10px 3px 3px;
  width: 480px;
  max-width: 480px;
  height: 320px;
  max-height: 320px;
`;

export const Measurement = styled.a`
  font-size: 300%;
`;

export const Unit = styled.b`
  position: absolute;
  padding-bottom: 10px;
  padding-right: 40px;
  width:20px
  font-size: 50%;
`;

export const MeasurementDecimal = styled.b`
  bottom: 0;
  font-size: 50%;
`;

interface ColumnProps {
  size?: number;
  align?: string;
}

interface RowProps {
  align?: string;
  borderstyle?: string;
}

export const Column = styled.div<ColumnProps>`
  text-align: ${(props) => (props.align ? props.align : 'center')};
  flex: ${(props) => (props.size ? props.size : 1)};
  padding: 0px 5px 0px;
`;

export const Row = styled.div<RowProps>`
  display: flex;
  text-align: ${(props) => (props.align ? props.align : 'center')};
  border-style: ${(props) => (props.borderstyle ? props.borderstyle : 'none')};
`;

export const RowNoFlex = styled.div<RowProps>`
  text-align: ${(props) => (props.align ? props.align : 'center')};
`;

export const MeasurementContainer = styled.div`
  height: 320px;
  width: 320px;
  max-width: 320px;
`;

export const VertivalCenterRow = styled.div`
  -ms-transform: translateY(-25%);
  transform: translateY(25%);
  text-align: center;
`;

export const RowClock = styled.div`
  display: flex;
`;

export const RowMenu = styled.div`
  display: flex;
  height: 160px;
  max-height: 160px;
`;

export const ViewButton = styled.button<ButtonProps>`
  background: ${(props) =>   props.backgroundColor };
  color: ${(props) => props.textColor };
  border: none;
  padding: 4px;
  align: right;
  text-align: right;
`;

export const FontButton = styled.button<ButtonProps>`
  background: ${(props) => props.backgroundColor };
  color: ${(props) => props.textColor };
  border: ${(props) => `4px solid ${props.textColor}`};
  text-align: center;
  font-size: 150%;
  padding: 4px;
`;

export const ToggleButton = styled.button<ToggleButtonProps>`
  background: ${(props) => props.backgroundColor };
  color: ${(props) => props.textColor};
  padding: 5px;
  border: ${(props) => props.selected ? `2px solid ${props.textColor}` : 'none'};
`;

export const ClockContainer = styled.div<GridProps>`
  text-align: center;
  font-size: 160%;
  padding: 50px 0px 20px 0px;
`;

export const LocationContainer = styled.div`
  align: center;
  padding: 10px 0px 10px 0px;
`;
export const MeasurementCardContainer = styled.div`
  text-align: center;
`;

export const Title = styled.div`
  vertical-align: text-center;
  padding: 6px 10px 10px 10px;
  font-weight: bold;
  font-size: 250%;
`;

export const MeasurementTimeLastUpdate = styled.div`
  vertical-align: text-center;
  font-size: 100%;
`;

export const MeasurementValue = styled.div`
  font-size: 435%;
`;

export const MeasurementExtremes = styled.div`
  font-size: 210%;
`;

export const MqttBadge = styled.div`
  font-size: 120%;
  text-align: right;
`;

export const MqttStatusBadge = styled.div<ColorProps>`
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: -2px;
  border-radius: 50%;
  border-style: solid;
  border-width: 0px;
  height: 30px;
  width: 30px;
  background: ${(props) => props.color }; 
`;