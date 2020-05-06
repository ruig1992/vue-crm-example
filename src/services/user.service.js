import firebase from 'firebase/app';

export default class UserService {
  static async getInfo(id) {
    return (await firebase.database()
      .ref(`users/${id}/info`).once('value')).val() || {};
  }

  static updateInfo(id, data) {
    return firebase.database().ref(`users/${id}/info`).update(data);
  }
}
