import { Column, Row } from '../styles';
import { SubSettingsMenuView } from './SubSettingsMenuView';
import { MenuBackButton } from './MenuBackButton';

export const SettingsMenu = () => {

  return (
    <Column>
      <Row>
        <MenuBackButton imageIconName='Home' />
      </Row>
      <SubSettingsMenuView />
      </Column>
  );
};
