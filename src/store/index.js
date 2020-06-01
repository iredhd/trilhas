import {
  combineReducers, applyMiddleware, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

import reducers from './reducers';

const encryptor = createEncryptor({
  secretKey: Constants.manifest.extra.EXPO_REDUX_SECRET_KEY,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
