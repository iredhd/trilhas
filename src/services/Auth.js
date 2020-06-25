import firebase from 'firebase';
import 'firebase/auth';
import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import i18n from 'i18n-js';

import User from './User';
import Notification from './Notifications';

class Auth {
  static async LoginWithEmailAndPassword(email, password) {
    try {
      const { user: AuthData } = await firebase.auth().signInWithEmailAndPassword(email, password);

      const token = await firebase.auth().currentUser.getIdToken();

      const user = await User.getUser(AuthData.uid);

      await User.addUserDevice();

      Notification.setPushNotificationId(user.id);

      return {
        user,
        token,
      };
    } catch ({ code }) {
      return {
        error: this.handleErrors(code),
      };
    }
  }

  static async LoginWithFacebook() {
    try {
      await Facebook.initializeAsync(Constants.manifest.extra.EXPO_FACEBOOK_APP_ID);
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        const userRef = await firebase.auth().signInWithCredential(credential);

        await User.upsertUser({
          id: userRef.user.uid,
          name: userRef.user.displayName,
          email: userRef.user.email,
        });

        const user = await User.getUser(userRef.user.uid);

        await User.addUserDevice();

        await Notification.setPushNotificationId(user.id);

        const firebaseToken = await firebase.auth().currentUser.getIdToken();

        return {
          token: firebaseToken,
          user,
        };
      }
      return {
        error: this.handleErrors(null),
      };
    } catch ({ code }) {
      return {
        error: this.handleErrors(code),
      };
    }
  }

  static async Register(userToRegister) {
    try {
      const userRef = await firebase.auth().createUserWithEmailAndPassword(userToRegister.email, userToRegister.password);

      await User.upsertUser({
        id: userRef.user.uid,
        name: userToRegister.name,
        email: userToRegister.email,
        cityName: userToRegister.city.cityName,
        cityId: userToRegister.city.id,
      });

      const user = await User.getUser(userRef.user.uid);

      await User.addUserDevice();

      await Notification.setPushNotificationId(user.id);

      const firebaseToken = await firebase.auth().currentUser.getIdToken();

      return {
        token: firebaseToken,
        user,
      };
    } catch ({ code }) {
      return {
        error: this.handleErrors(code),
      };
    }
  }

  static async Logout() {
    try {
      await User.removeUserDevice();
      return await firebase.auth().signOut();
    } catch ({ code }) {
      return {
        error: this.handleErrors(code),
      };
    }
  }

  static async refreshAuthData() {
    const token = await firebase.auth().currentUser.getIdToken();

    const user = await User.getUser(firebase.auth().currentUser.uid);

    return {
      user,
      token,
    };
  }

  static handleErrors(error) {
    switch (error) {
      case 'auth/invalid-email':
        return i18n.t('invalidEmail');
      case 'auth/wrong-password':
        return i18n.t('wrongPassword');
      case 'auth/user-not-found':
        return i18n.t('userNotFound');
      case 'auth/user-disabled':
        return i18n.t('disabledUser');
      case 'auth/email-already-in-use':
        return i18n.t('emailAlreadyInUse');
      default:
        return i18n.t('authError');
    }
  }
}

export default Auth;
