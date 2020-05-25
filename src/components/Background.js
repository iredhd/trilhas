import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Background = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `rgba(${DefaultColors.primary}, .5)`,
  },
});

Background.defaultProps = {
  children: null,
};

Background.propTypes = {
  children: PropTypes.node,
};

export default Background;
