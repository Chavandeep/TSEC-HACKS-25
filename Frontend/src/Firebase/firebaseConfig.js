import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCoxHQ3ZYWUSBq4hBFT5p70uKe7Z4vAnB0",
  authDomain: "farmiedemo.firebaseapp.com",
  projectId: "farmiedemo",
  storageBucket: "farmiedemo.appspot.com",
  messagingSenderId: "649821679551",
  appId: "1:649821679551:web:57f4bcbee5c4b3f8373b0a",
  measurementId: "G-WJ0SMFMJ5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
