// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import Home from './pages/Home/Home';
import About from './About'; // Assuming you have an About page
import ProductManagement from './ProductManagement';
import ProductDescription from './ProductDesc';
import { LanguageProvider } from './contexts/LanguageContext';
import ProductUpload from './Upload';
import Plans from './Plans';
import Cbot from './Cbot/Cbot';
import Negotiate from './Negotiate';
import Api from './Cbot/Api';
import Login from './Login';
import Signup from './SignUp';
import FarmerDashboard from './FarmerDashboard';
import RetailerDashboard from './RetailerDashboard';
import ConsumerDashboard from './ConsumerDashboard';
import Header from './Header';
import Translatew from './Translatew';
import ChalaHai from './Cbot/ChalaHai';
import FormFill from './FormFill';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ListUsers from './list';
import UserList from './list';
import UserProfile from './UserProfile';
import ChatInterface from './Negotiate';

firebase.initializeApp({
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

  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<PublicRoute element={Home} restricted={false} />} />
          <Route path='/about' element={<PublicRoute element={About} restricted={false} />} />
          <Route path='/login' element={<PublicRoute element={Login} restricted={true} />} />
          <Route path='/signup' element={<PublicRoute element={Signup} restricted={true} />} />
          
          <Route path='/upload' element={<PrivateRoute element={ProductUpload} />} />
          <Route path='/management' element={<PrivateRoute element={ProductManagement} />} />
          <Route path='/desc' element={<PrivateRoute element={ProductDescription} />} />
          <Route path='/plans' element={<PrivateRoute element={Plans} />} />
          <Route path='/chatbot' element={<PrivateRoute element={Cbot} />} />
          <Route path='/nego' element={<PrivateRoute element={Negotiate} />} />
          <Route path='/api' element={<PrivateRoute element={Api} />} />
          <Route path='/farmerdb' element={<PrivateRoute element={FarmerDashboard} />} />
          <Route path='/retailerdb' element={<PrivateRoute element={RetailerDashboard} />} />
          <Route path='/consumerdb' element={<PrivateRoute element={ConsumerDashboard} />} />
          <Route path='/trans' element={<PrivateRoute element={Translatew} />} />
          <Route path='/cha' element={<PrivateRoute element={ChalaHai} />} />
          <Route path='/fill' element={<PrivateRoute element={FormFill} />} />
          <Route path="/list" element={<PrivateRoute element= {UserList} />} />
        <Route path="/profile/:id" element={<PrivateRoute element= {UserProfile} />} />
        <Route path="/negotiate/:farmerId" element={<PrivateRoute element= {ChatInterface} />} />
    
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
