import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';

import { DefaultColors } from '../styles';

const CircularImage = ({ image, radius }) => (
  <View style={[styles.container]}>
    <Image
      resizeMode="cover"
      source={image}
      style={[styles.imageContainer, { width: radius, height: radius, borderRadius: radius / 2 }]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    shadowColor: `rgb(${DefaultColors.secondary})`,
    shadowOffset: { height: 5 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  imageContainer: {
    borderRadius: 50,
    resizeMode: 'cover',
  },
});

CircularImage.propTypes = {
  radius: PropTypes.number.isRequired,
  image: Image.propTypes.source.isRequired,
};

export default CircularImage;
