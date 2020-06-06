import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  PrivateRoute, Input, Button, LoadingWrapper, List,
} from '../../components';
import { GuideCard } from './components';
import { User } from '../../services';

const GuideSearch = () => {
  const [search, setSearch] = useState('');
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);
  const [totallyPaginated, setTotallyPaginated] = useState(false);

  const loadGuides = useCallback(async ({ text, offset }) => {
    const guidesResult = await User.getUsers({ text, page: offset });
    return guidesResult;
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const loadedGuides = await loadGuides();
    setGuides(loadedGuides);
    setIsRefreshing(false);
  });

  const initialLoad = useCallback(async () => {
    // setIsLoading(true);
    // const loadedGuides = await loadGuides();
    // setGuides(loadedGuides);
    // setIsLoading(false);
  });

  const handlePaginate = useCallback(async () => {
    if (isPaginating || totallyPaginated) {
      return;
    }

    setIsPaginating(true);

    const offset = page + 1;
    setPage(offset);

    const loadedGuides = await loadGuides({
      text: search,
      offset,
    });

    if (!loadedGuides.length) {
      setTotallyPaginated(true);
    }

    setGuides([...guides, ...loadedGuides]);
    setIsPaginating(false);
  });

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setPage(0);
    setIsLoading(true);
    setTotallyPaginated(false);
    const loadedGuides = await loadGuides({
      text: search,
      offset: 0,
    });
    setGuides(loadedGuides);
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
              placeholder="Nome, cidade ou descrição"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <Button
            value="BUSCAR"
            onPress={handleSearch}
            disabled={isLoading || !search}
          />
        </View>
        <LoadingWrapper
          isLoading={isLoading}
        >
          <List
            data={guides}
            keyExtractor={({ id }) => id}
            Card={GuideCard}
            headerTitleComplement="guia(s) encontrado(s)"
            emptyMessage={'Ooooops!\nNenhum guia foi encontrado'}
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

export default GuideSearch;
