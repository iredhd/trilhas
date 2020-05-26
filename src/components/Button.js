import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Typography from './Typography';

const Button = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Typography
      fontWeight="bold"
    >
      {value}
    </Typography>
  </TouchableOpacity>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
