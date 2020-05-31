import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({
  horizontal, vertical, size,
}) => (
  <View style={[
    horizontal && { marginHorizontal: size },
    vertical && { marginVertical: size },
  ]}
  />
);

Spacer.defaultProps = {
  horizontal: false,
  vertical: true,
};

Spacer.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Spacer;
