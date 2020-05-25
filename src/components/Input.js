import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Input = ({
  placeholder, onChangeText, secureTextEntry, containerStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={`rgb(${DefaultColors.secondary})`}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: `rgb(${DefaultColors.secondary})`,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: `rgb(${DefaultColors.tertiary})`,
    shadowColor: `rgb(${DefaultColors.secondary})`,
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.5,
  },
});

Input.defaultProps = {
  placeholder: '',
  onChangeText: () => {},
  secureTextEntry: false,
  containerStyle: {},
};

Input.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  containerStyle: PropTypes.instanceOf(Object),
};

export default Input;
