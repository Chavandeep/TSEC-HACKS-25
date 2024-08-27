import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Retrieve user info from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            if (userData) {
                const { accountType } = userData;
                navigate(`/dashboard-${accountType.toLowerCase()}`);
            } else {
                alert('User data not found!');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-600">Email</label>
                    <input 
                        type="email" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Password</label>
                    <input 
                        type="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <a href="/signup" className="text-indigo-500 hover:underline">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
