// // This is a mock API service. In a real application, you would replace this with actual API calls.

// const mockProducts = [
//   { id: 1, name: 'Product 1', price: 19.99, description: 'This is product 1', image: 'https://via.placeholder.com/150', category: 'Category 1', inStock: true, discount: 15, rating: 4 },
//   { id: 2, name: 'Product 2', price: 29.99, description: 'This is product 2', image: 'https://via.placeholder.com/150', category: 'Category 2', inStock: false, discount: 5, rating: 3 },
//   { id: 3, name: 'Product 3', price: 49.99, description: 'This is product 3', image: 'https://via.placeholder.com/150', category: 'Category 3', inStock: true, discount: 25, rating: 5 },
//   // Add more mock products as needed
// ];

  
  // export const getProducts = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve(mockProducts), 500);
  //   });
  // };
  
//   export const getProductById = (id) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const product = mockProducts.find(p => p.id === parseInt(id));
//         resolve(product);
//       }, 500);
//     });
//   };

  

import React, { useEffect, useState } from 'react';
import { firestore } from '../utils/firebase-config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import axios from 'axios';


export const getProducts = async () => {
  const productsCollectionRef = collection(firestore, 'products'); 
  const productsSnapshot = await getDocs(productsCollectionRef);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productsList
};

export const fetchWeather = async (location) => {
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
  const apiUrl = `https://open-weather13.p.rapidapi.com/city/landon/EN`;

  try {
    const response = await axios.get(apiUrl);
    return response.data; // Weather data object
  } catch (err) {
    console.error('Failed to fetch weather data:', err);
    throw new Error('Unable to fetch weather data. Please try again later.');
  }
};