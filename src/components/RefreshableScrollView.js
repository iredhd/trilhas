import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultColors } from '../styles';

const RefreshableScrollView = ({
  children, contentContainerStyle, refreshing, onRefresh,
}) => (
  <ScrollView
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
  </ScrollView>
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
