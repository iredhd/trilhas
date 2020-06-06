import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Input = ({
  placeholder, onChangeText, secureTextEntry, containerStyle, value,
  multiline, numberOfLines, keyboardType, autoCapitalize,
  onFocus, required,
}) => {
  const [showRequiredBorder, setShowRequiredBorder] = useState(false);

  const handleChangeText = useCallback((text) => {
    onChangeText(text);
  });

  const handleBlur = useCallback(() => {
    if (required && !value.trim()) {
      setShowRequiredBorder(true);
    } else {
      setShowRequiredBorder(false);
    }
  });

  return (
    <View style={[
      styles.container,
      multiline && {
        height: 40 * numberOfLines,
        justifyContent: 'flex-start',
        paddingVertical: 5,
      },
      showRequiredBorder && !value.trim() && {
        borderColor: `rgb(${DefaultColors.danger})`,
      },
      containerStyle,
    ]}
    >
      <TextInput
        onBlur={handleBlur}
        onSubmitEditing={handleBlur}
        onFocus={onFocus}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={`rgb(${DefaultColors.secondary})`}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChangeText}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
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

Input.defaultProps = {
  placeholder: '',
  onChangeText: () => {},
  secureTextEntry: false,
  containerStyle: {},
  value: '',
  multiline: false,
  numberOfLines: 1,
  keyboardType: 'default',
  autoCapitalize: 'sentences',
  onFocus: () => {},
  required: false,
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  containerStyle: PropTypes.instanceOf(Object),
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;
