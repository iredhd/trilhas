import React from 'react';
import { Switch as SwitchNative } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const Switch = ({ value, onChange, disabled }) => (
  <SwitchNative
    disabled={disabled}
    trackColor={{
      false: `rgba(${DefaultColors.secondary}, .4)`,
      true: `rgb(${DefaultColors.secondary})`,
    }}
    ios_backgroundColor={`rgba(${DefaultColors.secondary}, .4)`}
    onValueChange={onChange}
    value={value}
  />
);

Switch.defaultProps = {
  disabled: false,
};

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Switch;
