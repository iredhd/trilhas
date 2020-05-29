import React, { useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PublicScreen, Input, Button } from '../../components';
import { DefaultColors } from '../../styles';

const Login = () => {
  const navigation = useNavigation();

  const handleLogin = useCallback(() => {
    navigation.navigate('Home');
  });

  return (
    <PublicScreen>
      <View style={styles.container}>
        <View
          style={styles.centralContainer}
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
              <Button
                onPress={handleLogin}
                value="ENTRAR"
              />
            </View>
          </View>
        </View>
      </View>
    </PublicScreen>
  );
};

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
    elevation: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Login;
