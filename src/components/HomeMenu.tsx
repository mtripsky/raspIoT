import { useAppState } from '../redux/store';
import { Column, Row } from '../styles';
import {LocationCarouselImage} from './LocationCarouselImage';
import { MenuBackButton } from './MenuBackButton';

export const HomeMenu = () => {
  const {state } = useAppState();
  
  const locationImage = state.locationCurrentIndex >= 0 && state.locationCurrentIndex < state.locations.length 
    ? (<LocationCarouselImage locationName={state.locations[state.locationCurrentIndex].name} />)
    : null;

  return (
    <Column>
      <Row>
        <MenuBackButton imageIconName='Settings' />
      </Row>
      <Row>
        {locationImage}
      </Row>
    </Column>
  );
}