import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Background from './Background';
import logo from '../../assets/icon.png';

const Watermark = ({ children }) => (
  <Background>
    <View style={styles.container}>
      {children}
    </View>
    <Image
      source={logo}
      style={styles.image}
    />
  </Background>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    right: -20,
    bottom: -20,
    opacity: 0.5,
    width: 200,
    height: 200,
  },
});

Watermark.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Watermark;
