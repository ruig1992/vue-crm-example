import firebase from 'firebase/app';

export const TYPE_INCOME = 'income';
export const TYPE_OUTCOME = 'outcome';

class RecordService {
  static async getAll(uid) {
    const data = await firebase.database()
      .ref(`users/${uid}/records`).once('value');

    return data.val() || {};
  }

  static async get(uid, id) {
    const data = await firebase.database()
      .ref(`users/${uid}/records/${id}`).once('value');

    return data.val() || {};
  }

  static create(uid, data) {
    return firebase.database().ref(`users/${uid}/records`)
      .push(data);
  }
}

export default RecordService;
