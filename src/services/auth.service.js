import firebase from 'firebase/app';

class AuthService {
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
    firebase.auth().signOut();
  }

  static getCurrentUser() {
    return firebase.auth().currentUser;
  }

  static isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

export default AuthService;
