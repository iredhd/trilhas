import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Typography from './Typography';

const Button = ({ value }) => (
  <TouchableOpacity>
    <Typography
      fontWeight="bold"
    >
      {value}
    </Typography>
  </TouchableOpacity>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Button;
