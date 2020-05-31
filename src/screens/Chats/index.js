import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  PrivateRoute, Input, Button, LoadingWrapper, List,
} from '../../components';
import { ChatCard } from './components';

const Chats = () => {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);

  const loadChats = useCallback(() => new Promise((resolve) => {
    setTimeout(() => {
      const newGuides = [];
      for (let index = 0; index < 50; index += 1) {
        newGuides.push({
          id: Math.random().toString(),
          name: 'Ighor Redhd',
          profilePicture: 'https://instagram.fssz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82164289_3835525919805869_7911970237640081408_n.jpg?_nc_ht=instagram.fssz1-1.fna.fbcdn.net&_nc_ohc=gQP0WoRPsx8AX9JKs-F&oh=1bfd73a3604a0e5d3c4d2d18eaf1c7ba&oe=5EFBA0FB',
          cityName: 'Santos, SP - Brazil',
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        });
      }
      resolve(newGuides);
    }, 1 * 1000);
  }));

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
    if (isPaginating) {
      return;
    }

    setIsPaginating(true);
    setPage(page + 1);
    const loadedChats = await loadChats();
    setChats([...chats, ...loadedChats]);
    setIsPaginating(false);
  });

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setPage(0);
    setIsLoading(true);
    const loadedChats = await loadChats();
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
              placeholder="Nome ou cidade"
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
