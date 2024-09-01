// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import About from './About';
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
import Translate from './Translate';
import ChalaHai from './Cbot/ChalaHai';
import FormFill from './FormFill';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import UserList from './list';
import UserProfile from './UserProfile';
import ChatInterface from './Negotiate';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import AllProducts from './pages/AllProducts';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import { CartProvider } from './contexts/CartContext';
import ProductManagement from './pages/ProductManagement';
import Test from './pages/Test';
import Inventory from './pages/Inventory';
import Farmer_Connect from './pages/Farmer_Connect';
import Negotiation from './pages/Negotiation';
import Notifications from './pages/Notifications';
import MyProfile from './myProfile';
import Loans from './pages/Loans';
import FarmVisit from './pages/FarmVisit';
import Viewer2 from './pages/Viewer2';
import Negochat from './pages/Negochat';
import ChatbotApp from './ChatbotApp';
import Home from './pages/Home/Home'


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
      <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<PublicRoute element={Home} restricted={false} />} />
          <Route path='/products' element={<PublicRoute element={AllProducts} restricted={false} />} />
          <Route path='/about' element={<PublicRoute element={About} restricted={false} />} />
          <Route path='/login' element={<PublicRoute element={Login} restricted={true} />} />
          <Route path='/signup' element={<PublicRoute element={Signup} restricted={true} />} />

          <Route path='/upload' element={<PrivateRoute element={ProductUpload} />} />
          <Route path='/management' element={<PrivateRoute element={ProductManagement} />} />
          <Route path='/desc' element={<PrivateRoute element={ProductDescription} />} />
          <Route path='/plans' element={<PrivateRoute element={Plans} />} />
          <Route path='/chatbot' element={<PrivateRoute element={Cbot} />} />
          <Route path="/chat/:negotiationId" element={<ChatInterface />} />
          <Route path='/api' element={<PrivateRoute element={Api} />} />
          <Route path='/farmerdb' element={<PrivateRoute element={FarmerDashboard} />} />
          <Route path='/retailerdb' element={<PrivateRoute element={RetailerDashboard} />} />
          <Route path='/consumerdb' element={<PrivateRoute element={ConsumerDashboard} />} />
          <Route path='/trans' element={<PrivateRoute element={Translate} />} />
          <Route path='/cha' element={<PrivateRoute element={ChalaHai} />} />
          <Route path='/fill' element={<PrivateRoute element={FormFill} />} />
          <Route path="/list" element={<PrivateRoute element={UserList} />} />
          <Route path="/profile/:id" element={<PrivateRoute element={UserProfile} />} />
          <Route path="/negotiate/:farmerId" element={<PrivateRoute element={ChatInterface} />} />
          <Route path="/product/:id" element={<PrivateRoute element={ProductDetails} />} />
          <Route path="/cart" element={<PrivateRoute element={CartPage} />} />
          <Route path="/checkout" element={<PrivateRoute element={CheckoutPage} />} />
          <Route path="/order-confirmation" element={<PrivateRoute element={OrderConfirmation} />} />
          <Route path="/posting" element={<PrivateRoute element={Test} />} />
          <Route path="/inventory" element={<PrivateRoute element={Inventory} />} />
          <Route path="/con" element={<PrivateRoute element={Farmer_Connect} />} />
          <Route path="/nego" element={<PrivateRoute element={Negotiation} />} />
          <Route path="/noti" element={<PrivateRoute element={Notifications} />} />
          <Route path="/myprofile" element={<PrivateRoute element={MyProfile} />} />
          <Route path="/loans" element={<PrivateRoute element={Loans} />} />
          <Route path="/farmvisit" element={<PrivateRoute element={FarmVisit} />} />
          <Route path="/negochat" element={<PrivateRoute element={Negochat} />} />
         
         
         
         
         
         
          <Route path="/vieww" element={<PrivateRoute element={Viewer2} />} />

        </Routes>
        <ChatbotApp/>
        <Footer/>
      </Router>
        </CartProvider>
    </LanguageProvider>
  );
}

export default App;
