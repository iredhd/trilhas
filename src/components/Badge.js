import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';
import Typography from './Typography';

const Badge = ({ value }) => (
  <View style={styles.container}>
    <Typography
      color={`rgb(${DefaultColors.primary})`}
      fontWeight="bold"
      fontSize={18}
    >
      {value.toString()}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: `rgb(${DefaultColors.secondary})`,
    paddingHorizontal: 5,
    borderRadius: 50,
  },
});

Badge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Badge;
