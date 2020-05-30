import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';

import Watermark from './Watermark';
import IconButton from './IconButton';
import { DefaultColors } from '../styles';

const PrivateRoute = ({ children }) => {
  const navigation = useNavigation();

  const handleMenuToggle = useCallback(() => {
    navigation.toggleDrawer();
  });

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
