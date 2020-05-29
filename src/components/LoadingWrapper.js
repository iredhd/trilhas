import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Loading from './Loading';

const LoadingWrapper = ({ isLoading, children }) => (
  <View style={styles.container}>
    {isLoading ? (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    ) : children }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

LoadingWrapper.defaultProps = {
  isLoading: false,
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default LoadingWrapper;
