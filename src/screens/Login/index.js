import React, {
  useCallback, useState, useEffect,
} from 'react';
import {
  View, StyleSheet, Image, Animated, Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {
  PublicRoute, Button, LoadingWrapper, PopUp, Spacer,
} from '../../components';
import { LoginForm, RegisterForm } from './components';
import logo from '../../assets/logo.png';

const Login = () => {
  const navigation = useNavigation();

  const isLoading = useSelector((state) => state.Auth.isLoading);
  const error = useSelector((state) => state.Auth.errorMessage);
  const loggedIn = useSelector((state) => state.Auth.loggedIn);

  const [popUp, setPopUp] = useState({
    isVisible: false,
    body: '',
  });

  const [registerButtonOffsetScale] = useState(new Animated.Value(0));
  const [animatedPanelRotation] = useState(new Animated.Value(0));
  const [panelVisible, setPanelVisible] = useState('login');

  animatedPanelRotation.addListener(({ value }) => {
    if (value >= 90) {
      setPanelVisible('register');
    } else {
      setPanelVisible('login');
    }
  });

  const animatedLoginRotation = animatedPanelRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const animatedRegisterRotation = animatedPanelRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const springAnimation = useCallback((animatedValue, toValue) => Animated.spring(animatedValue, {
    toValue,
    speed: 2,
    bounciness: 14,
    useNativeDriver: true,
  }));

  const toggleFlip = useCallback(() => {
    let toValue = 0;

    if (panelVisible === 'login') {
      toValue = 180;
    }

    Animated.spring(animatedPanelRotation, {
      toValue,
      friction: 8,
      tension: 10,
    }).start();
  });

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

  useEffect(() => {
    Animated.parallel([
      springAnimation(registerButtonOffsetScale, 1),
    ]).start();

    return () => setPopUp({
      isVisible: false,
      body: '',
    });
  }, []);

  return (
    <PublicRoute>
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image
            source={logo}
            style={styles.image}
          />
        </View>
        <View style={styles.formsContainer}>
          <LoadingWrapper isLoading={isLoading}>
            <Animated.View
              style={[
                styles.loginContainer,
                {
                  transform: [{
                    rotateX: animatedLoginRotation,
                  }],
                },
                panelVisible === 'login' ? { zIndex: 1 } : { zIndex: 0 },
              ]}
            >
              <LoginForm />
              <Spacer size={30} />
              <Animated.View
                style={[
                  {
                    transform: [{
                      scale: registerButtonOffsetScale,
                    }],
                  }]}
              >
                <Button
                  value={i18n.t('goToSignIn')}
                  onPress={toggleFlip}
                />
              </Animated.View>
            </Animated.View>
            <Animated.View
              style={[
                styles.registerContainer,
                {
                  transform: [{
                    rotateX: animatedRegisterRotation,
                  }],
                },
                panelVisible === 'register' ? { zIndex: 1 } : { zIndex: 0 },
              ]}
            >
              <RegisterForm />
              <Spacer size={30} />
              <Button
                value={i18n.t('goToLogIn')}
                onPress={toggleFlip}
              />
            </Animated.View>
          </LoadingWrapper>
        </View>
      </KeyboardAwareScrollView>
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
    </PublicRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    minHeight: Dimensions.get('screen').height,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  formsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    width: '80%',
    backfaceVisibility: 'hidden',
  },
  registerContainer: {
    flex: 1,
    width: '80%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
  },
});

export default Login;
