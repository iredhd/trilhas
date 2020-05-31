import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { DefaultColors } from '../styles';

const CircularImage = ({ image, radius, allowImageViewing }) => {
  const [isImageVisible, setIsImageVisible] = useState(false);

  const handleToggleImage = useCallback(() => {
    setIsImageVisible(!isImageVisible);
  });

  return (
    <TouchableOpacity
      onPress={handleToggleImage}
      style={styles.container}
      disabled={!allowImageViewing}
    >
      <Image
        resizeMode="cover"
        source={typeof image === 'string' ? { uri: image } : image}
        style={[styles.imageContainer, { width: radius * 2, height: radius * 2, borderRadius: radius }]}
      />

      {allowImageViewing && (
      <ImageView
        images={[{
          uri: image,
        }]}
        imageIndex={0}
        visible={isImageVisible}
        onRequestClose={handleToggleImage}
      />
      )}
    </TouchableOpacity>
  );
};

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

CircularImage.defaultProps = {
  allowImageViewing: false,
};

CircularImage.propTypes = {
  radius: PropTypes.number.isRequired,
  allowImageViewing: PropTypes.bool,
  image: PropTypes.oneOfType([Image.propTypes.source, PropTypes.string]).isRequired,
};

export default CircularImage;
