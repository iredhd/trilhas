import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import { Typography, CircularImage } from '../../../components';

const Header = ({ profile }) => {
  const navigation = useNavigation();

  const goToProfile = useCallback(() => {
    navigation.navigate('Profile', {
      id: profile.id,
    });
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={goToProfile}
    >
      <View style={styles.imageContainer}>
        <CircularImage
          image={profile.profilePicture}
          radius={40}
          allowImageViewing
        />
      </View>
      <View style={styles.informationContainer}>
        <Typography
          fontSize={24}
          fontWeight="bold"
        >
          {profile.name}
        </Typography>
        <Typography>
          {profile.cityName}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 17,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  informationContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
});

Header.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    cityName: PropTypes.string,
    profilePicture: PropTypes.string,
  }).isRequired,
};

export default Header;
