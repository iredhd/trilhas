import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Watermark from './Watermark';
import IconButton from './IconButton';
import { DefaultColors } from '../styles';
import { logout, refreshAuthData } from '../store/actions/Auth';

const PrivateRoute = ({ children }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(({ Auth }) => Auth.token);

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      dispatch(logout());
      navigation.replace('Auth');
    } else {
      dispatch(refreshAuthData(user));
    }
  });

  const handleMenuToggle = useCallback(() => {
    navigation.toggleDrawer();
  });

  useEffect(() => {
    axios.interceptors.request.use((config) => ({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    }));
  }, [token]);

  return (
    <Watermark>
      <View style={styles.container}>
        <IconButton
          icon="menu"
          onPress={handleMenuToggle}
          iconSize={50}
        />
      </View>
      {children}
    </Watermark>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getStatusBarHeight() + 55,
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: getStatusBarHeight(),
    backgroundColor: `rgb(${DefaultColors.secondary})`,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    marginBottom: -7,
    zIndex: 1,
    shadowColor: `rgb(${DefaultColors.secondary})`,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.5,
  },
});

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
