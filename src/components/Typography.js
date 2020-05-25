import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Typography = ({ children, fontWeight, fontSize }) => (
  <Text
    style={[
      styles.text,
      fontWeight && { fontWeight },
      fontSize && { fontSize },
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
  fontWeight: 'regular',
  fontSize: 20,
};

Typography.propTypes = {
  children: PropTypes.string.isRequired,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Typography;
