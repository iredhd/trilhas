import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { DefaultColors } from '../styles';

const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const {
    fieldName, registerField, defaultValue, error, clearError,
  } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <View style={[
      styles.container,
      rest?.multiline && {
        height: 40 * (rest?.numberOfLines || 1),
        justifyContent: 'flex-start',
        paddingVertical: 5,
      },
      error && { borderColor: `rgb(${DefaultColors.danger})` },
    ]}
    >
      <TextInput
        ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor={`rgb(${DefaultColors.secondary})`}
        onChangeText={(value) => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        onFocus={clearError}
        {...rest}
      />
    </View>
  );
};

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

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Input;
