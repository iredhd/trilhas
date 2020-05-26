import React from 'react';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';

import { DefaultColors } from '../styles';

const Icon = ({ icon, size, color }) => (
  <Feather
    name={icon}
    size={size}
    color={color}
  />
);

Icon.defaultProps = {
  color: `rgb(${DefaultColors.primary})`,
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Icon;
