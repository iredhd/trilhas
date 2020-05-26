import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Typography = ({
  children, fontWeight, fontSize, color,
}) => (
  <Text
    style={[
      styles.text,
      fontWeight && { fontWeight },
      fontSize && { fontSize },
      color && { color },
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    color: `rgb(${DefaultColors.secondary})`,
  },
});

Typography.defaultProps = {
  fontWeight: 'normal',
  fontSize: 20,
  color: `rgb(${DefaultColors.secondary})`,
};

Typography.propTypes = {
  children: PropTypes.string.isRequired,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

export default Typography;
