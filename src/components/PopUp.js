import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AwesomeAlert from 'react-native-awesome-alerts';

import { DefaultColors } from '../styles';

const PopUp = ({
  isVisible, title, message, onCancelPressed, onConfirmPressed, closeOnTouchOutside, isLoading,
  cancelButtonColor, confirmButtonColor, cancelButtonTextStyle, confirmButtonTextStyle,
  cancelText, confirmText, customView, contentContainerStyle, actionContainerStyle,
  messageStyle, titleStyle, onDismiss,
}) => (
  <AwesomeAlert
    onDismiss={onDismiss}
    useNativeDriver
    showProgress={isLoading}
    show={isVisible}
    title={title}
    message={message}
    closeOnTouchOutside={closeOnTouchOutside}
    closeOnHardwareBackPress={false}
    showCancelButton={!!cancelText}
    showConfirmButton={!!confirmText}
    cancelText={cancelText}
    confirmText={confirmText}
    onCancelPressed={onCancelPressed}
    onConfirmPressed={onConfirmPressed}
    progressSize="large"
    customView={customView}
    progressColor={`rgb(${DefaultColors.secondary})`}
    contentContainerStyle={[styles.container, contentContainerStyle]}
    actionContainerStyle={actionContainerStyle}
    titleStyle={[styles.title, titleStyle]}
    messageStyle={[styles.message, messageStyle]}
    cancelButtonColor={cancelButtonColor}
    confirmButtonColor={confirmButtonColor}
    cancelButtonTextStyle={[styles.cancelButtonTextStyle, cancelButtonTextStyle]}
    confirmButtonTextStyle={[styles.confirmButtonTextStyle, confirmButtonTextStyle]}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: `rgb(${DefaultColors.tertiary})`,
  },
  popUpTitleContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: `rgb(${DefaultColors.secondary})`,
  },
  title: {
    color: `rgb(${DefaultColors.secondary})`,
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    color: `rgb(${DefaultColors.secondary})`,
    fontSize: 16,
  },
  cancelButtonTextStyle: {
    color: `rgb(${DefaultColors.secondary})`,
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButtonTextStyle: {
    color: `rgb(${DefaultColors.tertiary})`,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

PopUp.defaultProps = {
  cancelButtonColor: 'rgba(0,0,0,0)',
  confirmButtonColor: `rgb(${DefaultColors.secondary})`,
  onCancelPressed: () => {},
  onConfirmPressed: () => {},
  onDismiss: () => {},
  closeOnTouchOutside: false,
  isLoading: false,
  cancelButtonTextStyle: {},
  confirmButtonTextStyle: {},
  cancelText: '',
  confirmText: '',
  title: '',
  message: '',
  contentContainerStyle: {},
  actionContainerStyle: {},
  messageStyle: {},
  titleStyle: {},
  customView: null,
};

PopUp.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  onCancelPressed: PropTypes.func,
  onConfirmPressed: PropTypes.func,
  closeOnTouchOutside: PropTypes.bool,
  isLoading: PropTypes.bool,
  cancelButtonTextStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  confirmButtonTextStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onDismiss: PropTypes.func,
  titleStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  messageStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  contentContainerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  actionContainerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  customView: PropTypes.node,
};

export default PopUp;
