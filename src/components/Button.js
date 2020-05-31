import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Typography from './Typography';

const Button = ({
  value, onPress, disabled, color,
}) => (
  <View
    style={{ opacity: disabled ? 0.4 : 1 }}
  >
    <TouchableOpacity
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
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
