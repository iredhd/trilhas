import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import {
  Typography, Button, CircularImage, Spacer,
} from '../../../components';
import { DefaultColors } from '../../../styles';

const ProfileView = ({ profile, toggleProfileScreen }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.imageContainer}>
        <CircularImage
          image={profile.profilePicture}
          radius={100}
          allowImageViewing
        />
      </View>
      <View style={styles.informationContainer}>
        <Typography
          fontSize={26}
          fontWeight="bold"
          textAlign="center"
        >
          {profile.name}
        </Typography>
        <View style={styles.centralInformationContainer}>
          <Typography
            textAlign="center"
          >
            {profile.cityName}
          </Typography>
        </View>
        <Typography
          textAlign="center"
        >
          {profile.bio}
        </Typography>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          value="ENVIAR MENSAGEM"
          onPress={() => navigation.navigate('Chat')}
        />
        <Spacer size={15} />
        <Button
          value="ATUALIZAR DADOS"
          onPress={toggleProfileScreen}
        />
        <Spacer size={15} />
        <Button
          color={`rgb(${DefaultColors.danger})`}
          value="DENUNCIAR"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingHorizontal: 15,
  },
  profileContainer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  informationContainer: {
    marginVertical: 45,
  },
  centralInformationContainer: {
    marginVertical: 15,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
});

ProfileView.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    cityName: PropTypes.string,
    profilePicture: PropTypes.string,
  }).isRequired,
  toggleProfileScreen: PropTypes.func.isRequired,
};

export default ProfileView;
