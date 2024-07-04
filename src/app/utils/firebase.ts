import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDIbJnq6mF_G2MrF5WPJq-rEfLBz6piu7U',
  authDomain: 'project-m-e173a.firebaseapp.com',
  projectId: 'project-m-e173a',
  storageBucket: 'project-m-e173a.appspot.com',
  messagingSenderId: '1060804860105',
  appId: '1:1060804860105:web:cd64ee5627d8c598419518',
  measurementId: 'G-QM17VRQSTM'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
