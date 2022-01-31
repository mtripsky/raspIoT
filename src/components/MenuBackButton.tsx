import { useAppState } from '../redux/store';
import { Column, ViewButton } from '../styles';
import settingsIconImage from '../images/settings-icon.png';
import homeIconImage from '../images/home-button.png';

interface PropsMenuBackButton {
    imageIconName: string;
}

const ICON_MAP: { [id: string]: any; }  = {
    Settings: settingsIconImage,
    Home: homeIconImage
} 

export const MenuBackButton = ({imageIconName} : PropsMenuBackButton) => {
  const {state, dispatch } = useAppState();

  return (
        <Column align='right'>
          <ViewButton
            backgroundColor={state.fontViewSettings.colorSchema.backgroundColor}
            textColor={state.fontViewSettings.colorSchema.textColor}
          >
            <img
              src={ICON_MAP[imageIconName]}
              width={50}
              alt={imageIconName}
              onClick={() => {
                dispatch({
                  type: 'CHANGE_CURRENT_VIEW',
                  payload: imageIconName,
                });
              }}
            />
          </ViewButton>
        </Column>
  );
}