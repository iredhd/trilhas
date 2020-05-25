import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Background from './Background';
import logo from '../../assets/icon.png';

const Watermark = ({ children }) => (
  <Background>
    {children}
    <Image
      source={logo}
      style={styles.image}
    />
  </Background>
);

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
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
