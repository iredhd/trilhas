import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';

import { DefaultColors } from '../styles';

const CircularImage = ({ image, radius }) => (
  <View style={[styles.container]}>
    <Image
      resizeMode="cover"
      source={typeof image === 'string' ? { uri: image } : image}
      style={[styles.imageContainer, { width: radius * 2, height: radius * 2, borderRadius: radius }]}
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
  image: PropTypes.oneOfType([Image.propTypes.source, PropTypes.string]).isRequired,
};

export default CircularImage;
