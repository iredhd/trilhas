import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon from './Icon';

const IconButton = ({ onPress, icon, iconSize }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Icon
      icon={icon}
      size={iconSize}
    />
  </TouchableOpacity>
);

IconButton.defaultProps = {
  iconSize: false,
};

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default IconButton;
