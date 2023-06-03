import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { database } from '../../config/firebase.js';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();

async function login(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user.uid);
      })
      .catch((error) => {
        resolve(false);
      });
  });
}
async function register(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user.uid);
      })
      .catch((error) => {
        resolve(false);
      });
  });
}
async function forgotPassword(email) {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        resolve(false);
      });
  });
}
async function fetchAllData(type) {
  const reference = collection(database, type);
  const snapshot = await getDocs(reference);
  const _data = [];
  snapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      data: doc.data(),
    };
    _data.push(data);
  });
  return _data;
}
async function fetchDataById(type, id) {
  const reference = doc(database, type, id);
  const snapshot = await getDoc(reference);
  if (snapshot.exists()) {
    const data = {
      id: snapshot.id,
      data: snapshot.data(),
    };
    return data;
  } else {
    return null;
  }
}
async function fetchAllDataByValue(type, searchQuery, value) {
  const collectionRef = collection(database, type);
  const querySnapshot = await getDocs(query(collectionRef, where(searchQuery, '==', value)));
  if (!querySnapshot.empty) {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return data;
  } else {
    return null;
  }
}
async function fetchAllUserData(type, userId) {
  const collectionRef = collection(database, type);
  const querySnapshot = await getDocs(query(collectionRef, where('owner', '==', userId)));
  if (!querySnapshot.empty) {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return data;
  } else {
    return null;
  }
}
async function fetchUserDataById(type, id, userId) {
  const reference = doc(database, type, id);
  const snapshot = await getDoc(reference);
  if (snapshot.exists()) {
    if (snapshot.data().owner == userId) {
      const data = {
        id: snapshot.id,
        data: snapshot.data(),
      };
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
async function updateUserData(type, id, data, userId) {
  const objectToUpdate = await fetchUserDataById(type, id, userId);
  if(objectToUpdate === null){
    return false;
  } else if (objectToUpdate.data.owner == userId) {
    const docRef = doc(database, type, id);
    updateDoc(docRef, data);
    return objectToUpdate;
  } else {
    return false;
  }
}
async function deleteUserData(type, id, userId) {
  const objectToDelete = await fetchUserDataById(type, id, userId);
  if(objectToDelete === null){
    return false;
  } else if (objectToDelete.data.owner == userId) {
    const docRef = doc(database, type, id);
    deleteDoc(docRef);
    return objectToDelete;
  } else {
    return false;
  }
}
async function postData(type, data) {
  const docRef = await addDoc(collection(database, type), data);
  const docSnapshot = await getDoc(docRef);
  const createdId = docSnapshot.id;
  const createdData = docSnapshot.data();
  const result = {
    id: createdId,
    data: createdData,
  };
  return result;
}
async function updateData(type, id, data) {
  const docRef = doc(database, type, id);
  updateDoc(docRef, data.data);
}
async function deleteData(type, id) {
  const docRef = doc(database, type, id);
  deleteDoc(docRef);
}

export default {
  login,
  register,
  forgotPassword,
  fetchAllData,
  fetchDataById,
  fetchAllDataByValue,

  fetchAllUserData,
  fetchUserDataById,
  updateUserData,
  deleteUserData,

  postData,
  updateData,
  deleteData,
};
