import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import { Animated } from 'react-native';
import i18n from 'i18n-js';
import { Form } from '@unform/mobile';
import { useDispatch } from 'react-redux';

import { Input, Spacer, Button } from '../../../components';
import { Animations } from '../../../utils';
import { Validation } from '../../../services';
import { loginWithEmailAndPassword, loginWithFacebook } from '../../../store/actions/Auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [emailInputOffsetX] = useState(new Animated.Value(150));
  const [passwordInputOffsetX] = useState(new Animated.Value(-150));
  const [loginButtonOffsetY] = useState(new Animated.Value(500));
  const [facebookLoginButtonOffsetY] = useState(new Animated.Value(-550));

  const loginFormRef = useRef(null);

  const handleSubmit = useCallback(async (data) => {
    loginFormRef.current.setErrors({});

    const errors = await Validation.login(data);

    if (errors) {
      return loginFormRef.current.setErrors(errors);
    }

    return dispatch(loginWithEmailAndPassword(data.email, data.password));
  });

  const submitLoginForm = useCallback(() => {
    loginFormRef.current.submitForm();
  });

  const handleFacebookLogin = useCallback(() => {
    dispatch(loginWithFacebook());
  });

  const springAnimation = useCallback((animatedValue, toValue) => Animated.spring(animatedValue, {
    toValue,
    ...Animations.springAnimation,
  }));

  useEffect(() => {
    Animated.parallel([
      springAnimation(emailInputOffsetX, 0),
      springAnimation(passwordInputOffsetX, 0),
      springAnimation(loginButtonOffsetY, 0),
      springAnimation(facebookLoginButtonOffsetY, 0),
    ]).start();
  }, []);

  return (
    <Form ref={loginFormRef} onSubmit={handleSubmit}>
      <Animated.View
        style={[
          {
            transform: [{
              translateX: emailInputOffsetX,
            }],
          },
        ]}
      >
        <Input
          name="email"
          placeholder={i18n.t('email')}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Animated.View>
      <Spacer size={7.5} />
      <Animated.View
        style={[
          {
            transform: [{
              translateX: passwordInputOffsetX,
            }],
          }]}
      >
        <Input
          name="password"
          placeholder={i18n.t('password')}
          secureTextEntry
        />
      </Animated.View>
      <Spacer size={15} />
      <Animated.View
        style={{
          transform: [{
            translateY: loginButtonOffsetY,
          }],
        }}
      >
        <Button
          value={i18n.t('login')}
          onPress={submitLoginForm}
        />
      </Animated.View>
      <Spacer size={7.5} />
      <Animated.View
        style={[{
          transform: [{
            translateY: facebookLoginButtonOffsetY,
          }],
        }]}
      >
        <Button
          value={i18n.t('facebookLogin')}
          onPress={handleFacebookLogin}
          buttonColor="#3f5aaa"
          color="white"
        />
      </Animated.View>
    </Form>
  );
};

export default LoginForm;
