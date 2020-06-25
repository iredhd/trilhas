import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Typography from './Typography';
import { DefaultColors } from '../styles';

const Button = ({
  value, onPress, disabled, color, buttonColor,
}) => (
  <View
    style={{ opacity: disabled ? 0.4 : 1 }}
  >
    <TouchableOpacity
      style={[
        {
          backgroundColor: `rgb(${DefaultColors.secondary})`,
          paddingHorizontal: 10,
          borderRadius: 5,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonColor && { backgroundColor: buttonColor },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Typography
        fontWeight="bold"
        color={color}
      >
        {value}
      </Typography>
    </TouchableOpacity>
  </View>
);

Button.defaultProps = {
  disabled: false,
  color: `rgb(${DefaultColors.primary})`,
  buttonColor: '',
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  buttonColor: PropTypes.string,
};

export default Button;
