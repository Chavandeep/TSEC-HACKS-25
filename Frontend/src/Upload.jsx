import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './Firebase/firebaseConfig'; // Adjust the import path as needed

function ProductUpload() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [marketPrice, setMarketPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [dateOfHarvest, setDateOfHarvest] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [farmer_id, setFarmer_id] = useState('');

  // Get the authenticated user's UID and set it as farmer_id
  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      setFarmer_id(user.uid);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let productPicURL = '';
    if (productImage) {
      const storage = getStorage(app);
      const storageRef = ref(storage, `products/${Date.now()}_${productImage.name}`);

      try {
        // Upload image
        await uploadBytes(storageRef, productImage);

        // Get download URL
        productPicURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    try {
      const db = getFirestore(app);
      const productData = {
        productName,
        productPrice,
        marketPrice,
        productCategory,
        productPicURL, 
        description,
        dateOfHarvest: new Date(dateOfHarvest),
        farmLocation,
        farmer_id, // Authenticated user's UID
        createdAt: new Date(),
      };

      // Save product info to Firestore
      await addDoc(collection(db, 'products'), productData);
      alert('Product uploaded successfully');

      // Reset form fields
      setProductName('');
      setProductPrice('');
      setMarketPrice('');
      setProductCategory('');
      setProductImage(null);
      setImageURL('');
      setStockQuantity('');
      setDescription('');
      setDateOfHarvest('');
      setFarmLocation('');
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500 p-5">
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Upload Your Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="productCategory">
                Product Category
              </label>
              <select
                id="productCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="grains">Grains</option>
                <option value="dairy">Dairy</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="productPrice">
                Seller's Price (₹)
              </label>
              <input
                type="number"
                id="productPrice"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your selling price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="marketPrice">
                Market Price (₹)
              </label>
              <input
                type="number"
                id="marketPrice"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the current market price"
                value={marketPrice}
                onChange={(e) => setMarketPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="productImage">
                Upload Image
              </label>
              <input
                type="file"
                id="productImage"
                className="w-full border border-gray-300 rounded-lg py-2"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Product Description
            </label>
            <textarea
              id="description"
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a detailed description of the product"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="dateOfHarvest">
              Date of Harvest
            </label>
            <input
              type="datetime-local"
              id="dateOfHarvest"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dateOfHarvest}
              onChange={(e) => setDateOfHarvest(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="farmLocation">
              Farm Location
            </label>
            <input
              type="text"
              id="farmLocation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the farm location"
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductUpload;
