import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import { DefaultColors } from '../styles';

const AutoCompleteInput = ({
  placeholder, onPress, value, name,
}) => {
  const inputRef = useRef(null);

  const handlePress = useCallback(({ description: cityName, id }) => {
    onPress({ cityName, id });
  });

  const {
    fieldName, registerField, error, clearError,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, newValue) {
        inputRef.current.value = newValue;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  const handleFocus = useCallback(() => {
    clearError();
  });

  return (
    <GooglePlacesAutocomplete
      ref={inputRef}
      placeholder={placeholder}
      keyboardShouldPersistTaps="handled"
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      debounce={300}
      getDefaultValue={() => value}
      enablePoweredByContainer={false}
      disableScroll
      suppressDefaultStyles
      onPress={handlePress}
      textInputProps={{
        onFocus: handleFocus,
        placeholderTextColor: `rgb(${DefaultColors.secondary})`,
        keyboardAppearance: 'dark',
      }}
      styles={{
        textInputContainer: [
          styles.textInputContainer,
          error && {
            borderColor: `rgb(${DefaultColors.danger})`,
          },
        ],
        textInput: styles.textInput,
        row: styles.row,
        listView: styles.listView,
        separator: styles.separator,
      }}
      query={{
        key: Constants.manifest.extra.EXPO_MAPS_API_KEY,
        language: 'pt-BR',
      }}
    />
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: `rgb(${DefaultColors.secondary})`,
    height: 40,
    justifyContent: 'center',
    backgroundColor: `rgb(${DefaultColors.tertiary})`,
    shadowColor: `rgb(${DefaultColors.secondary})`,
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.5,
    elevation: 3,
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 14,
    backgroundColor: `rgb(${DefaultColors.tertiary})`,
    width: '100%',
  },
  row: {
    backgroundColor: `rgb(${DefaultColors.tertiary})`,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  listView: {
    borderWidth: 1,
    borderColor: `rgb(${DefaultColors.secondary})`,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: `rgba(${DefaultColors.secondary}, .5)`,
  },
});

AutoCompleteInput.defaultProps = {
  placeholder: '',
  value: '',
};

AutoCompleteInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default AutoCompleteInput;
