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
    return firebase.database().ref(`users/${uid}/categories`)
      .push(data);
  }

  static update(uid, data) {
    const { title, limit } = data;
    firebase.database().ref(`users/${uid}/categories/${data.id}`)
      .set({ title, limit });
  }
}

export default CategoryService;
