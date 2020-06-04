import React, { useState, useEffect, useCallback } from 'react';
import {
  View, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  Switch, Button, CircularImage, Spacer,
  Input, Typography,
} from '../../../components';
import { DefaultColors } from '../../../styles';

const ProfileForm = ({ profile, toggleProfileScreen, handleSubmit }) => {
  const [form, setForm] = useState({ ...profile });

  const onImageUpload = useCallback(({ uri: profilePicture, base64: profilePictureBase64 }) => {
    setForm({
      ...form,
      profilePicture,
      profilePictureBase64,
    });
  });

  const onSubmit = useCallback(() => {
    handleSubmit(form);
  });

  useEffect(() => {
    setForm({
      ...form,
      ...profile,
    });
  }, [profile]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior="position"
      >
        <View style={styles.imageContainer}>
          <CircularImage
            image={form.profilePicture}
            radius={100}
            allowImageUpload
            onImageUpload={onImageUpload}
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
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <Button
          value="ATUALIZAR DADOS"
          onPress={onSubmit}
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
  handleSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
