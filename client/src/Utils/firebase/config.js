import firebase from 'firebase/app';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDY1HVc_KpnV9A-1lpWwBr9ZK-H6_DICpg',
  authDomain: 'house-hunting-app-b88fa.firebaseapp.com',
  projectId: 'house-hunting-app-b88fa',
  storageBucket: 'house-hunting-app-b88fa.appspot.com',
  messagingSenderId: '636441113539',
  appId: '1:636441113539:web:6e7cfb5d86a8980f568376',
  measurementId: 'G-S7KF7GZNT3',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
