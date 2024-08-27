import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

firebase.initializeApp ({
  apiKey: "AIzaSyCoxHQ3ZYWUSBq4hBFT5p70uKe7Z4vAnB0",
  authDomain: "farmiedemo.firebaseapp.com",
  projectId: "farmiedemo",
  storageBucket: "farmiedemo.appspot.com",
  messagingSenderId: "649821679551",
  appId: "1:649821679551:web:57f4bcbee5c4b3f8373b0a",
  measurementId: "G-WJ0SMFMJ5D"
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/fill');
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen">
      <main className="flex-1 flex items-center justify-center">
        {!user && <SignIn />}
      </main>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <h2 className="text-4xl font-bold mb-4">Welcome to Farmissan</h2>
      <p className="text-lg mb-6">Sign in to continue</p>
      <button
        onClick={signInWithGoogle}
        className="px-6 py-3 text-md bg-white text-indigo-600 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
      >
        Sign In with Google
      </button>
    </div>
  );
}

export default App;
