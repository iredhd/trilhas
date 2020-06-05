/* eslint-disable no-console */
import React from 'react';
import { YellowBox } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import _ from 'lodash';

import Router from './src/routes';
import { store, persistor } from './src/store';
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
