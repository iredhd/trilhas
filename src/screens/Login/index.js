import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
  PublicRoute, Input, Button, LoadingWrapper, PopUp,
} from '../../components';
import { DefaultColors } from '../../styles';
import { loginWithEmailAndPassword } from '../../store/actions/Auth';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.Auth.isLoading);
  const error = useSelector((state) => state.Auth.errorMessage);
  const loggedIn = useSelector((state) => state.Auth.loggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popUp, setPopUp] = useState({
    isVisible: false,
    body: '',
  });

  const handleLogin = useCallback(async () => {
    dispatch(loginWithEmailAndPassword(email, password));
  }, [email, password]);

  useEffect(() => {
    if (error) {
      setPopUp({
        isVisible: true,
        body: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (loggedIn) {
      navigation.replace('App');
    }
  }, [loggedIn]);

  useEffect(() => () => setPopUp({
    isVisible: false,
    body: '',
  }), []);

  return (
    <PublicRoute>
      <View style={styles.container}>
        <LoadingWrapper
          isLoading={isLoading}
        >
          <View
            style={styles.centralContainer}
          >
            <View style={styles.loginPanel}>
              <Input
                placeholder="E-mail"
                containerStyle={{ marginBottom: 15, marginTop: 15 }}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                placeholder="Senha"
                secureTextEntry
                containerStyle={{ marginBottom: 20 }}
                value={password}
                onChangeText={setPassword}
              />
              <View style={styles.buttonContainer}>
                <Button
                  disabled={email.trim() === '' || password.trim() === ''}
                  onPress={handleLogin}
                  value="ENTRAR"
                />
              </View>
            </View>
          </View>
        </LoadingWrapper>
        <PopUp
          title="Ooops!"
          body={popUp.body}
          isVisible={popUp.isVisible}
          onBackdropPress={() => setPopUp({ ...popUp, isVisible: false })}
          options={[{
            label: 'OK',
            onPress: () => setPopUp({ ...popUp, isVisible: false }),
          }]}
        />
      </View>
    </PublicRoute>
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
