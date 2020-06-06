import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const AutoCompleteInput = ({
  placeholder, onPress, value,
}) => {
  const handlePress = useCallback(({ description: cityName, id }) => {
    onPress({ cityName, id });
  });

  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      keyboardShouldPersistTaps="handled"
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      debounce={300}
      getDefaultValue={() => value}
      enablePoweredByContainer={false}
      disableScroll
      suppressDefaultStyles
      onPress={handlePress}
      styles={{
        textInputContainer: styles.textInputContainer,
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
    borderTopColor: `rgb(${DefaultColors.secondary})`,
    borderBottomColor: `rgb(${DefaultColors.secondary})`,
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
};

export default AutoCompleteInput;
