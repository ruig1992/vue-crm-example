import firebase from 'firebase/app';

export default class CategoryService {
  static async getAll(uid) {
    return (await firebase.database()
      .ref(`users/${uid}/categories`).once('value')).val() || {};
  }

  static async get(uid, id) {
    return (await firebase.database()
      .ref(`users/${uid}/categories/${id}`).once('value')).val();
  }

  static create(uid, data) {
    return firebase.database().ref(`users/${uid}/categories`)
      .push(data);
  }

  static update(uid, data) {
    const { title, limit } = data;
    return firebase.database().ref(`users/${uid}/categories/${data.id}`)
      .update({ title, limit });
  }
}
