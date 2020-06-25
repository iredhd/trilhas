/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { YellowBox } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import _ from 'lodash';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import Router from './src/routes';
import { store, persistor } from './src/store';
import firebaseConfig from './firebaseConfig';
import { Device } from './src/services';
import { LocalizedStrings } from './src/utils';

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
  if (message.indexOf('Setting a timer') <= -1
    && message.indexOf('VirtualizedLists should never') <= -1
  ) {
    _console.warn(message);
  }
};

i18n.translations = {
  ...LocalizedStrings,
};

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export default function App() {
  useEffect(() => {
    Device.checkInstallationId();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
