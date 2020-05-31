import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import {
  Switch, Button, CircularImage, Spacer,
  Input, Typography,
} from '../../../components';
import { DefaultColors } from '../../../styles';

const ProfileForm = ({ profile, toggleProfileScreen }) => {
  const [form, setForm] = useState({ ...profile });

  useEffect(() => {
    setForm({
      ...form,
      ...profile,
    });
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CircularImage
          image={form.profilePicture}
          radius={100}
          allowImageViewing
        />
      </View>
      <View style={styles.informationContainer}>
        <View style={styles.isAGuideContainer}>
          <Typography>
            Sou um guia:
          </Typography>
          <Switch
            onChange={(isGuide) => setForm({ ...form, isGuide })}
            value={form.isGuide}
          />
        </View>
        <Spacer size={7.5} />
        <Input
          placeholder="Nome"
          value={form.name}
          onChangeText={(name) => setForm({ ...form, name })}
        />
        <Spacer size={7.5} />
        <Input
          placeholder="Cidade"
          value={form.cityName}
          onChangeText={(cityName) => setForm({ ...form, cityName })}
        />
        <Spacer size={7.5} />
        <Input
          multiline
          placeholder="Descrição"
          value={form.bio}
          onChangeText={(bio) => setForm({ ...form, bio })}
          numberOfLines={5}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          value="ATUALIZAR DADOS"
          onPress={toggleProfileScreen}
        />
        <Spacer size={15} />
        <Button
          color={`rgb(${DefaultColors.danger})`}
          value="CANCELAR"
          onPress={toggleProfileScreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
  },
  informationContainer: {
    marginVertical: 45,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  isAGuideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

ProfileForm.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    cityName: PropTypes.string,
    profilePicture: PropTypes.string,
  }).isRequired,
  toggleProfileScreen: PropTypes.func.isRequired,
};

export default ProfileForm;
