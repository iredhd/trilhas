import React from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { DefaultColors } from '../styles';

const RefreshableScrollView = ({
  children, contentContainerStyle, refreshing, onRefresh,
}) => (
  <KeyboardAwareScrollView
    enableOnAndroid
    showsVerticalScrollIndicator={false}
    contentContainerStyle={contentContainerStyle}
    refreshControl={(
      <RefreshControl
        refreshing={refreshing}
        tintColor={`rgb(${DefaultColors.secondary})`}
        onRefresh={onRefresh}
        size={RefreshControl.LARGE}
      />
  )}
  >
    {children}
  </KeyboardAwareScrollView>
);

RefreshableScrollView.defaultProps = {
  contentContainerStyle: {},
};

RefreshableScrollView.propTypes = {
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.instanceOf(Object),
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default RefreshableScrollView;
