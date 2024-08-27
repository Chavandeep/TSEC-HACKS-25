import React, { useEffect, useState } from 'react';
import { auth, db } from './Firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from './contexts/LanguageContext'; // Import your language context

const Header = () => {
    const [user, setUser] = useState(null);
    const [accountType, setAccountType] = useState('');
    const { language, setLanguage } = useLanguage(); // Use language context

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    setAccountType(userDoc.data().accountType);
                }
            } else {
                setUser(null);
                setAccountType('');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout failed:', error);
            alert(`Logout failed: ${error.message}`);
        }
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
                <h1 className="text-2xl font-bold mr-4">Farmie App</h1>
                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="p-2 bg-white text-black rounded"
                >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="te">Telugu</option>
                    <option value="mr">Marathi</option>
                    <option value="ta">Tamil</option>
                    <option value="gu">Gujarati</option>
                    <option value="kn">Kannada</option>
                    <option value="ml">Malayalam</option>
                    <option value="or">Odia</option>
                    <option value="as">Assamese</option>
                </select>
            </div>
            {user && (
                <div className="flex items-center">
                    <img
                        src={user.photoURL || 'https://example.com/default-profile-pic.png'}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <div className="mr-4">
                        <span className="block font-bold">{user.displayName || 'User'}</span>
                        <span className="text-sm">{accountType}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            )}
            {/* Display current language */}
            <div className="mt-4 md:mt-0">
                <span className="block font-bold">Language:</span>
                <span className="text-sm">{language.toUpperCase()}</span>
            </div>
        </header>
    );
};

export default Header;
