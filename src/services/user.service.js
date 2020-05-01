import firebase from 'firebase/app';

class UserService {
  static async getInfo(id) {
    const data = await firebase.database()
      .ref(`users/${id}/info`).once('value');

    return data.val() || {};
  }

  static updateInfo(id, data) {
    firebase.database().ref(`users/${id}/info`).set(data);
  }
}

export default UserService;
