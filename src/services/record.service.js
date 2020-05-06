import firebase from 'firebase/app';

export const TYPE_INCOME = 'income';
export const TYPE_OUTCOME = 'outcome';

class RecordService {
  static async getAll(uid) {
    return (await firebase.database()
      .ref(`users/${uid}/records`).once('value')).val() || {};
  }

  static async get(uid, id) {
    return (await firebase.database()
      .ref(`users/${uid}/records/${id}`).once('value')).val() || {};
  }

  static create(uid, data) {
    return firebase.database().ref(`users/${uid}/records`).push(data);
  }
}

export default RecordService;
