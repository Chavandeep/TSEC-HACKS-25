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


// Second Firebase instance (for OTP verification)
const firebaseConfig2 = {
  apiKey: "your-api-key-2",
  authDomain: "your-auth-domain-2",
  projectId: "your-project-id-2",
  storageBucket: "your-storage-bucket-2",
  messagingSenderId: "your-sender-id-2",
  appId: "your-app-id-2",
  measurementId: "your-measurement-id-2"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const app2 = firebase.initializeApp(firebaseConfig2, "otpApp");


// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const auth2 = getAuth(app2);
const db2 = getFirestore(app2);
const storage2 = getStorage(app2);

export { app, auth, db, storage };

export { app2, auth2, db2, storage2 };

