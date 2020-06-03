import firebase from 'firebase';
import 'firebase/auth';
import User from './User';

class Auth {
  static async LoginWithEmailAndPassword(email, password) {
    try {
      const { user: AuthData } = await firebase.auth().signInWithEmailAndPassword(email, password);

      const user = await User.getUser(AuthData.uid);

      return {
        user,
        token: user.refreshToken,
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
