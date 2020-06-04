import firebase from 'firebase';
import uuid from 'uuid-random';

class User {
  static async getUser(id) {
    try {
      const db = firebase.firestore();

      const userRef = await db.collection('users').doc(id).get();

      const user = userRef.data();

      return this.mapUserData({
        id,
        ...user,
      });
    } catch ({ code }) {
      return {
        error: code,
      };
    }
  }

  static async upsertUser(user) {
    try {
      const db = firebase.firestore();

      const userRef = db.collection('users').doc(user.id);

      const payload = {};

      if (user.name) {
        payload.name = user.name;
      }

      if (user.bio) {
        payload.bio = user.bio;
      }

      if (user.cityName) {
        payload.city_name = user.cityName;
      }

      if (typeof user.isGuide === 'boolean') {
        payload.is_guide = user.isGuide;
      }

      await userRef.set(payload, { merge: true });

      const userData = (await userRef.get()).data();

      if (firebase.auth().currentUser.uid === user.id) {
        await firebase.auth().currentUser.updateProfile({
          displayName: userData.name,
          photoURL: userData.profile_picture,
        });
      }

      return this.mapUserData({
        id: user.id,
        ...userData,
      });
    } catch ({ code }) {
      return {
        error: code,
      };
    }
  }

  static async upsertProfilePicture(userId, imageBase64) {
    try {
      const db = firebase.firestore();
      const storage = firebase.storage();

      const userRef = db.collection('users').doc(userId);
      const userData = (await userRef.get()).data();

      if (userData.profile_picture) {
        const fileToDelete = storage.refFromURL(userData.profile_picture);

        if (fileToDelete) {
          await fileToDelete.delete();
        }
      }

      const imageRef = storage.ref().child(`profile_pictures/${uuid()}`);

      await imageRef.putString(imageBase64, 'base64', {
        contentType: 'image/jpeg',
      });

      const profilePicture = await imageRef.getDownloadURL();

      await userRef.set({
        profile_picture: profilePicture,
      }, { merge: true });

      if (firebase.auth().currentUser.uid === userId) {
        await firebase.auth().currentUser.updateProfile({
          displayName: userData.name,
          photoURL: profilePicture,
        });
      }

      return this.mapUserData({
        ...userData,
        profile_picture: profilePicture,
      });
    } catch (e) {
      return {
        error: 'Houve um erro ao trocar a sua foto.',
      };
    }
  }

  static mapUserData(user) {
    return {
      id: user.id || null,
      name: user.name || null,
      cityName: user.city_name || null,
      isGuide: user.is_guide || false,
      bio: user.bio || null,
      profilePicture: user.profile_picture || null,
      email: user.email || null,
    };
  }
}

export default User;
