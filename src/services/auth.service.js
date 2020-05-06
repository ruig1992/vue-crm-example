import firebase from 'firebase/app';

export default class AuthService {
  static async register(user) {
    const userCredential = await firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password);

    return userCredential.user;
  }

  static async login(user) {
    const userCredential = await firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password);

    return userCredential.user;
  }

  static logout() {
    return firebase.auth().signOut();
  }

  static getCurrentUser() {
    return firebase.auth().currentUser;
  }

  static isAuthenticated() {
    return !!this.getCurrentUser();
  }
}
