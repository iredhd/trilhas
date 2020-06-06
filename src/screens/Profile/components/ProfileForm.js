import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import {
  Switch, Button, CircularImage, Spacer, Input, Typography, AutoCompleteInput,
} from '../../../components';
import { DefaultColors } from '../../../styles';

const ProfileForm = ({
  profile, toggleProfileScreen, handleSubmit,
}) => {
  const [form, setForm] = useState({ ...profile });
  const [submitDisabled, setSubmitDisabled] = useState(false);

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
    if (!form.name.trim() || !form.cityName.trim() || !form.bio.trim()) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [form]);

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
          required
          placeholder="Nome"
          value={form.name}
          onChangeText={(name) => setForm({ ...form, name })}
        />
        <Spacer size={7.5} />
        <AutoCompleteInput
          required
          placeholder="Cidade"
          value={form.cityName}
          onPress={({ cityName, id: cityId }) => {
            setForm({ ...form, cityName, cityId });
          }}
        />
        <Spacer size={7.5} />
        <Input
          required
          multiline
          placeholder="Descrição"
          value={form.bio}
          onChangeText={(bio) => setForm({ ...form, bio })}
          numberOfLines={5}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          disabled={submitDisabled}
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
