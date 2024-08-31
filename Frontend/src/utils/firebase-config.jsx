// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCoxHQ3ZYWUSBq4hBFT5p70uKe7Z4vAnB0",
    authDomain: "farmiedemo.firebaseapp.com",
    projectId: "farmiedemo",
    storageBucket: "farmiedemo.appspot.com",
    messagingSenderId: "649821679551",
    appId: "1:649821679551:web:57f4bcbee5c4b3f8373b0a",
    measurementId: "G-WJ0SMFMJ5D"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const realtimeDb = getDatabase(app);
