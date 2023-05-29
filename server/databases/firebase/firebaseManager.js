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
async function fetchDataByValue(type, searchQuery, value) {
  const collectionRef = collection(database, type);
  const querySnapshot = await getDocs(query(collectionRef, where(searchQuery, "==", value)));
  if (!querySnapshot.empty) {
    const snapshot = querySnapshot.docs[0];
    const data = {
      id: snapshot.id,
      data: snapshot.data(),
    };
    return data;
  } else {
    return null;
  }
}
async function postData(type, data) {
  addDoc(collection(database, type), data);
}
async function updateData(type, id, data) {
  const docRef = doc(database, type, id);
  updateDoc(docRef, data);
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
  fetchDataByValue,
  postData,
  updateData,
  deleteData,
};
