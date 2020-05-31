import { Dimensions } from 'react-native';

const DefaultColors = {
  primary: '148, 162, 96',
  secondary: '53, 61, 21',
  tertiary: '217, 221, 208',
  danger: '200, 0, 0',
};

const CardStyles = {
  height: 80,
  borderRadius: 5,
  marginVertical: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: Dimensions.get('window').width * 0.8,
  backgroundColor: `rgba(${DefaultColors.secondary}, 0.4)`,
};

export {
  DefaultColors,
  CardStyles,
};
