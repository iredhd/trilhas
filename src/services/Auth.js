import firebase from 'firebase';
import 'firebase/auth';
import User from './User';

class Auth {
  static async LoginWithEmailAndPassword(email, password) {
    try {
      const { user: AuthData } = await firebase.auth().signInWithEmailAndPassword(email, password);

      const token = await firebase.auth().currentUser.getIdToken();

      const user = await User.getUser(AuthData.uid);

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

  static async Logout() {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log('e -> ', e);
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
        return 'E-mail inválido.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/user-not-found':
        return 'Usuário inexistente.';
      case 'auth/user-disabled':
        return 'Usuário bloqueado.\nEntre em contato com suporte.';
      default:
        return 'Erro de autenticação. Tente novamente mais tarde.';
    }
  }
}

export default Auth;
