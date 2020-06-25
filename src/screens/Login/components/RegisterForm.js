import React, { useRef, useCallback } from 'react';
import i18n from 'i18n-js';
import { Form } from '@unform/mobile';
import { useDispatch } from 'react-redux';

import {
  Input, Spacer, AutoCompleteInput, Button,
} from '../../../components';
import { Validation } from '../../../services';
import { registerUser } from '../../../store/actions/Auth';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const registerFormRef = useRef(null);

  const submitForm = useCallback(() => {
    registerFormRef.current.submitForm();
  });

  const handleSubmit = useCallback(async (data) => {
    registerFormRef.current.setErrors({});

    const errors = await Validation.register(data);

    if (errors) {
      return registerFormRef.current.setErrors(errors);
    }

    return dispatch(registerUser(data));
  });

  const handleCityPress = useCallback((city) => {
    registerFormRef.current.setFieldValue('city', city);
  });

  return (
    <Form ref={registerFormRef} onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder={i18n.t('name')}
      />
      <Spacer size={7.5} />
      <Input
        name="email"
        placeholder={i18n.t('email')}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Spacer size={7.5} />
      <AutoCompleteInput
        name="city"
        placeholder={i18n.t('city')}
        secureTextEntry
        onPress={handleCityPress}
      />
      <Spacer size={7.5} />
      <Input
        name="password"
        placeholder={i18n.t('password')}
        secureTextEntry
      />
      <Spacer size={7.5} />
      <Input
        name="passwordConfirmation"
        placeholder={i18n.t('confirmPassword')}
        secureTextEntry
      />
      <Spacer size={15} />
      <Button
        value={i18n.t('register')}
        onPress={submitForm}
      />
    </Form>
  );
};

export default RegisterForm;
