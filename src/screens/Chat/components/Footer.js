import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { Button, Input, Spacer } from '../../../components';

const Footer = ({ onSubmitMessage }) => {
  const [message, setMessage] = useState('');

  const handleMessageSubmit = useCallback(() => {
    onSubmitMessage(message);
    setMessage('');
  });

  return (
    <View style={[
      styles.container,
      Platform.OS === 'ios' && {
        marginBottom: 10,
      },
    ]}
    >
      <View style={styles.inputContainer}>
        <Input
          fontSize={24}
          fontWeight="bold"
          value={message}
          onChangeText={setMessage}
        />
      </View>
      <Spacer horizontal size={5} />
      <Button
        value="ENVIAR"
        onPress={handleMessageSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
  },
});

Footer.propTypes = {
  onSubmitMessage: PropTypes.func.isRequired,
};

export default Footer;
