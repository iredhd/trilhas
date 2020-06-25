import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Background from './Background';

const Watermark = ({ children }) => (
  <Background>
    <View style={styles.container}>
      {children}
    </View>
  </Background>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    zIndex: 2,
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    right: -20,
    bottom: -20,
    opacity: 0.1,
    width: 200,
    height: 200,
  },
});

Watermark.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Watermark;
