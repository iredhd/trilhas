const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const express = require('express');
const admin = require('firebase-admin');

const routes = require('./routes');
const firebaseConfig = require('./firebaseConfig.js')
const key = require('./credentials.json')

const app = express();

admin.initializeApp({
  ...firebaseConfig,
  credential: admin.credential.cert(key)
});

app.use(cors);
app.use(routes);
app.use(express.json());

module.exports = {
  api: functions.https.onRequest(app),
};
