import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Loading from './Loading';
import Typography from './Typography';
import { DefaultColors } from '../styles';

const List = ({
  data, keyExtractor, Card, isRefreshing, handleRefresh, isPaginating, handlePaginate,
  contentContainerStyle, ListFooterComponentStyle, ListHeaderComponentStyle, headerTitleComplement,
  emptyMessage,
}) => (
  <FlatList
    data={data}
    keyExtractor={keyExtractor}
    renderItem={({ item }) => <Card item={item} />}
    ListHeaderComponent={data.length && (
    <Typography
      fontSize={16}
      numberOfLines={1}
    >
      {`${data.length} ${headerTitleComplement}`}
    </Typography>
    )}
    ListFooterComponent={isPaginating && Loading}
    ListEmptyComponent={(
      <Typography
        fontSize={16}
        textAlign="center"
      >
        {emptyMessage}
      </Typography>
      )}
    contentContainerStyle={[styles.listContainer, contentContainerStyle, !data.length && { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
    ListFooterComponentStyle={[styles.listFooterContainer, ListFooterComponentStyle]}
    ListHeaderComponentStyle={[styles.listHeaderContainer, ListHeaderComponentStyle]}
    onEndReached={handlePaginate}
    onEndReachedThreshold={0.2}
    refreshControl={(
      <RefreshControl
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        size={RefreshControl.LARGE}
        tintColor={`rgb(${DefaultColors.secondary})`}
      />
      )}
  />
);

const styles = StyleSheet.create({
  listHeaderContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  listFooterContainer: {
    marginTop: 10,
  },
});

List.defaultProps = {
  isRefreshing: false,
  handleRefresh: false,
  isPaginating: false,
  handlePaginate: () => {},
  contentContainerStyle: {},
  ListFooterComponentStyle: {},
  ListHeaderComponentStyle: {},
  headerTitleComplement: '',
  emptyMessage: '',
};

List.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  keyExtractor: PropTypes.func.isRequired,
  Card: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool,
  handleRefresh: PropTypes.func,
  isPaginating: PropTypes.bool,
  handlePaginate: PropTypes.func,
  contentContainerStyle: PropTypes.instanceOf(Object),
  ListFooterComponentStyle: PropTypes.instanceOf(Object),
  ListHeaderComponentStyle: PropTypes.instanceOf(Object),
  headerTitleComplement: PropTypes.string,
  emptyMessage: PropTypes.string,
};

export default List;
