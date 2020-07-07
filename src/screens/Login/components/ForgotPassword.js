import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView, StyleSheet, Platform,
} from 'react-native';
import i18n from 'i18n-js';
import { Form } from '@unform/mobile';
import PropTypes from 'prop-types';

import { PopUp, Input } from '../../../components';
import { Validation, Auth } from '../../../services';
import { DefaultColors } from '../../../styles';

const ForgotPassword = ({ isVisible, onClose }) => {
  const formRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(i18n.t('writeYourEmail'));
  const [textColor, setTextColor] = useState(DefaultColors.secondary);

  const handleSubmit = useCallback(async (data) => {
    formRef.current.setErrors({});
    setIsLoading(true);

    const errors = await Validation.forgotPassword(data);

    if (errors) {
      setIsLoading(false);
      return formRef.current.setErrors(errors);
    }

    const { error } = await Auth.sendRecoveryPasswordEmail(data.email);
    setIsLoading(false);

    if (error) {
      setMessage(error);
      return setTextColor(DefaultColors.danger);
    }

    return setMessage(i18n.t('recoveryPasswordEmailSent'));
  });

  const handleConfirmPress = useCallback(() => {
    formRef.current.submitForm();
  });

  const handleInputFocus = useCallback(() => {
    setMessage(i18n.t('writeYourEmail'));
    setTextColor(DefaultColors.secondary);
  });

  return (
    <PopUp
      isLoading={isLoading}
      isVisible={isVisible}
      message={!isLoading ? message : ''}
      title={!isLoading ? i18n.t('forgotPassword') : ''}
      messageStyle={{
        color: `rgb(${textColor})`,
      }}
      titleStyle={{
        color: `rgb(${textColor})`,
      }}
      onCancelPressed={onClose}
      actionContainerStyle={styles.actionContainerStyle}
      contentContainerStyle={styles.contentContainerStyle}
      customView={!isLoading ? (
        <KeyboardAvoidingView
          enabled={Platform.OS === 'ios'}
          behavior="position"
          style={styles.formContainer}
        >
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <Input
              name="email"
              keyboardType="email-address"
              placeholder={i18n.t('email')}
              autoCapitalize="none"
              onFocus={handleInputFocus}
            />
          </Form>
        </KeyboardAvoidingView>
      ) : null}
      confirmText={i18n.t('yesSendEmail')}
      cancelText={i18n.t('noCancel')}
      onConfirmPressed={handleConfirmPress}
    />
  );
};

const styles = StyleSheet.create({
  actionContainerStyle: {
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
    maxWidth: '100%',
    marginTop: 10,
  },
});

ForgotPassword.defaultProps = {
  isVisible: false,
  onClose: () => {},
};

ForgotPassword.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ForgotPassword;
