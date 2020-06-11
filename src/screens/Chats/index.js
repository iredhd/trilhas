import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  PrivateRoute, Input, Button, LoadingWrapper, List,
} from '../../components';
import { ChatCard } from './components';
import { Chat } from '../../services';
import { Constants } from '../../utils';

const Chats = () => {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);
  const [totallyPaginated, setTotallyPaginated] = useState(false);

  const loadChats = useCallback(({ name = '', offset = 0 } = {}) => Chat.getUserChats({ name, page: offset }));

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const loadedChats = await loadChats();
    setChats(loadedChats);
    setIsRefreshing(false);
  });

  const initialLoad = useCallback(async () => {
    setIsLoading(true);
    const loadedChats = await loadChats();
    setChats(loadedChats);
    setIsLoading(false);
  });

  const handlePaginate = useCallback(async () => {
    if (isPaginating || totallyPaginated) {
      return;
    }

    const offset = page + 1;
    setIsPaginating(true);
    setPage(offset);

    const loadedChats = await loadChats({
      name: search,
      offset,
    });

    if (loadedChats.length < Constants.LIMIT_ITEMS_PER_PAGE) {
      setTotallyPaginated(true);
    }

    setChats([...chats, ...loadedChats]);
    setIsPaginating(false);
  });

  const handleSearch = useCallback(async () => {
    setIsLoading(true);

    const offset = 0;

    setPage(offset);
    setIsLoading(true);

    const loadedChats = await loadChats({
      name: search,
      offset,
    });

    setChats(loadedChats);
    setIsLoading(false);
  });

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <PrivateRoute>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Nome"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <Button
            value="BUSCAR"
            onPress={handleSearch}
            disabled={isLoading}
          />
        </View>
        <LoadingWrapper
          isLoading={isLoading}
        >
          <List
            data={chats}
            keyExtractor={({ id }) => id}
            Card={ChatCard}
            headerTitleComplement="conversa(s) encontrada(s)"
            emptyMessage={'Ooooops!\nNenhuma conversa foi encontrada'}
            isRefreshing={isRefreshing}
            handleRefresh={handleRefresh}
            isPaginating={isPaginating}
            handlePaginate={handlePaginate}
          />
        </LoadingWrapper>
      </View>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 27,
    paddingHorizontal: 15,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
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

export default Chats;
