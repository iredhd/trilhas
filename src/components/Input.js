import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Input = ({
  placeholder, onChangeText, secureTextEntry, containerStyle, value,
  multiline, numberOfLines,
}) => (
  <View style={[
    styles.container,
    multiline && {
      height: 40 * numberOfLines,
      justifyContent: 'flex-start',
    },
    containerStyle,
  ]}
  >
    <TextInput
      multiline={multiline}
      placeholder={placeholder}
      placeholderTextColor={`rgb(${DefaultColors.secondary})`}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
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
    elevation: 3,
  },
});

Input.defaultProps = {
  placeholder: '',
  onChangeText: () => {},
  secureTextEntry: false,
  containerStyle: {},
  value: '',
  multiline: false,
  numberOfLines: 1,
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  containerStyle: PropTypes.instanceOf(Object),
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
};

export default Input;
