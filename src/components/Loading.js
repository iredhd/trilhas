import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Loading = ({ size }) => (
  <ActivityIndicator
    color={`rgb(${DefaultColors.secondary})`}
    size={size}
  />
);

Loading.defaultProps = {
  size: 'large',
};

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
};

export default Loading;
