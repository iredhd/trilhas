import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { PublicRoute, Typography, LoadingWrapper } from '../../components';

const Loading = () => {
  const navigation = useNavigation();
  const [wellcomeMessage, setWellcomeMessage] = useState('');
  const loggedIn = useSelector((state) => state.Auth.loggedIn);
  const name = useSelector((state) => state.User.name);

  const initialCheck = useCallback(async () => {
    if (!loggedIn) {
      navigation.navigate('Login');
    } else {
      setTimeout(() => {
        navigation.navigate('App');
      }, 1500);
    }
  });

  useEffect(() => {
    if (loggedIn) {
      if (name) {
        setWellcomeMessage(`Bem vindo(a) de volta,\n${name}!`);
      } else {
        setWellcomeMessage('Bem vindo de volta!');
      }
    }
  }, [loggedIn, name]);

  useEffect(() => {
    initialCheck();
  }, []);

  return (
    <PublicRoute>
      <View style={styles.container}>
        <LoadingWrapper
          isLoading={wellcomeMessage === ''}
        >
          <View style={styles.wellcomeContainer}>
            <Typography
              fontSize={22}
              fontWeight="bold"
              textAlign="center"
            >
              {wellcomeMessage}
            </Typography>
          </View>
        </LoadingWrapper>
      </View>
    </PublicRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wellcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
