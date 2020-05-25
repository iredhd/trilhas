import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { PublicScreen, Input, Button } from '../../components';
import { DefaultColors } from '../../styles';

const Login = () => (
  <PublicScreen>
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={styles.centralContainer}
      >
        <View style={styles.loginPanel}>
          <Input
            placeholder="E-mail"
            containerStyle={{ marginBottom: 15, marginTop: 15 }}
          />
          <Input
            placeholder="Senha"
            secureTextEntry
            containerStyle={{ marginBottom: 20 }}
          />
          <View style={styles.buttonContainer}>
            <Button value="ENTRAR" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  </PublicScreen>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centralContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '80%',
  },
  loginPanel: {
    backgroundColor: `rgb(${DefaultColors.primary})`,
    borderRadius: 15,
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: `rgb(${DefaultColors.secondary})`,
    shadowColor: `rgb(${DefaultColors.secondary})`,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Login;
