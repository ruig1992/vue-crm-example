import firebase from 'firebase/app';

class CategoryService {
  static async getAll(uid) {
    const data = await firebase.database()
      .ref(`users/${uid}/categories`).once('value');

    return data.val() || {};
  }

  static async get(uid, id) {
    const data = await firebase.database()
      .ref(`users/${uid}/categories/${id}`).once('value');

    return data.val() || {};
  }

  static create(uid, data) {
    const newId = Date.now();
    firebase.database().ref(`users/${uid}/categories/${newId}`)
      .set(data);
  }
}

export default CategoryService;
