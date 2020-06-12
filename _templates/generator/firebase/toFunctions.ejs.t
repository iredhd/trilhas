---
to: ./firebaseConfig.js
---
export default {
  apiKey: '<%= h.firebase.FIREBASE_API_KEY %>',
  authDomain: '<%= h.firebase.FIREBASE_AUTH_DOMAIN %>',
  databaseURL: '<%= h.firebase.FIREBASE_DATABASE_URL %>',
  projectId: '<%= h.firebase.FIREBASE_PROJECT_ID %>',
  storageBucket: '<%= h.firebase.FIREBASE_STORAGE_BUCKET %>',
  messagingSenderId: '<%= h.firebase.FIREBASE_MESSAGING_SENDER_ID %>',
  appId: '<%= h.firebase.FIREBASE_APP_ID %>',
  measurementId: '<%= h.firebase.FIREBASE_MEASUREMENT_ID %>',
};