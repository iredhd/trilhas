import firebase from 'firebase';
import axios from 'axios';

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

  static async getUsers({ text, page }) {
    const perPage = 50;
    const offset = page * perPage;
    const limit = offset + perPage;

    const db = firebase.firestore();

    const userRef = db.collection('users');

    const userResult = await userRef
      .where('is_guide', '==', true)
      // .orderBy('name', 'asc')
      .get();

    if (userResult.empty) {
      return [];
    }

    const users = [];

    userResult.forEach((user) => {
      users.push(
        this.mapUserData({
          ...user.data(),
          id: user.id,
        }),
      );
    });

    const filteredUsers = users
      .filter((user) => user.name.toLowerCase().indexOf(text.toLowerCase()) >= 0)
      .filter((_, index) => index >= offset && index < limit)
      .sort((a, b) => a.name > b.name);

    return filteredUsers;
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

      if (user.cityId) {
        payload.city_id = user.cityId;
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

  static async upsertProfilePicture(userId, image) {
    try {
      const { data: userData } = await axios.post('/users/profile-picture', {
        image,
      });

      return this.mapUserData(userData);
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
