import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, StyleSheet, Image, View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { DefaultColors } from '../styles';
import PopUp from './PopUp';
import NoImage from '../../assets/icon.png';
import Loading from './Loading';

const CircularImage = ({
  image, radius, allowImageViewing, allowImageUpload, onImageUpload,
}) => {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const [imageToView, setImageToView] = useState(image);
  const [isLoading, setIsLoading] = useState(false);

  const togglePop = useCallback(() => setIsPopVisible(!isPopVisible));

  const handleToggleImage = useCallback(async () => {
    if (!allowImageUpload) {
      return setIsImageVisible(!isImageVisible);
    }

    let { status: actualStatus } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (actualStatus !== 'granted') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync(Permissions.CAMERA_ROLL);
      actualStatus = status;
    }

    if (actualStatus !== 'granted') {
      return togglePop();
    }

    const { uri, cancelled, base64 } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (cancelled) {
      return null;
    }

    setImageToView(uri);
    return onImageUpload({ uri, base64 });
  });

  const onLoadStart = useCallback(() => {
    setIsLoading(true);
  });

  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  });

  useEffect(() => {
    setImageToView(image);
  }, [image]);

  return (
    <TouchableOpacity
      onPress={handleToggleImage}
      style={styles.container}
      disabled={!allowImageViewing && !allowImageUpload}
    >
      <Image
        resizeMode="cover"
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        source={typeof imageToView === 'string' ? { uri: imageToView } : imageToView || NoImage}
        style={[
          styles.imageContainer,
          { width: radius * 2, height: radius * 2, borderRadius: radius },
        ]}
      />
      {isLoading && (
      <View style={styles.loadingContainer}>
        <Loading size="large" />
      </View>
      )}

      {allowImageViewing && (
      <ImageView
        images={[{
          uri: imageToView,
        }]}
        imageIndex={0}
        visible={isImageVisible}
        onRequestClose={handleToggleImage}
      />
      )}
      <PopUp
        isVisible={isPopVisible}
        title="Ooops!"
        body="Para fazer a atualização da imagem, é necesssário o acesso à galeria."
        options={[
          {
            label: 'OK',
            onPress: togglePop,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: `rgb(${DefaultColors.secondary})`,
    shadowOffset: { height: 5 },
    shadowOpacity: 0.5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 50,
    resizeMode: 'cover',
  },
  loadingContainer: {
    position: 'absolute',
  },
});

CircularImage.defaultProps = {
  allowImageViewing: false,
  image: NoImage,
  allowImageUpload: false,
  onImageUpload: () => {},
};

CircularImage.propTypes = {
  radius: PropTypes.number.isRequired,
  allowImageViewing: PropTypes.bool,
  image: PropTypes.oneOfType([
    Image.propTypes.source,
    PropTypes.string,
  ]),
  allowImageUpload: PropTypes.bool,
  onImageUpload: PropTypes.func,
};

export default CircularImage;
