import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig'; // Adjust the path to your Firebase config file
import { useCart } from '../hooks/useCart';

function ProductDetails() {
  const { id } = useParams(); // Assuming the product ID is passed in the URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('https://via.placeholder.com/500');
  const [quantity, setQuantity] = useState(1);
  const [farmerDetails, setFarmerDetails] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        setProduct({
          ...productData,
          harvestDate: productData.dateOfHarvest.toDate().toISOString().split('T')[0], // Convert Firestore timestamp to date
        });
        setSelectedImage(productData.productPicURL || 'https://via.placeholder.com/500');

        // Fetch farmer details using farmer_id
        const farmerRef = doc(db, 'userDetails', productData.farmer_id);
        const farmerSnap = await getDoc(farmerRef);

        if (farmerSnap.exists()) {
          setFarmerDetails(farmerSnap.data());
        } else {
          console.error('No such farmer!');
        }
      } else {
        console.error('No such product!');
      }
    };

    fetchProduct();
  }, [id]);

  const calculateExpiryDate = (harvestDate) => {
    const harvest = new Date(harvestDate);
    const expiry = new Date(harvest);
    expiry.setDate(expiry.getDate() + 15); // Assuming 15 days shelf life
    return expiry.toISOString().split('T')[0];
  };

  const expiryDate = product ? calculateExpiryDate(product.harvestDate) : '';

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product || !farmerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[100%] h-auto bg-gradient-to-br from-green-100 to-green-500 p-2">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Product Image & Thumbnails */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative w-full max-w-md mb-4">
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex space-x-4">
            {/* Thumbnail section if multiple images */}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">{product.productName}</h2>
          <p className="text-xl text-gray-600 mb-2">{product.productCategory}</p>
          <p className="text-3xl text-green-600 font-bold mb-4">₹{product.productPrice}/kg</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold text-gray-700">Date of Harvest</h4>
              <p className="text-gray-600 bg-gray-200 p-3 rounded-lg">{product.harvestDate}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold text-gray-700">Expiry Date</h4>
              <p className="text-gray-600 bg-gray-200 p-3 rounded-lg">{expiryDate}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold text-gray-700">Farm Location</h4>
              <p className="text-gray-600 bg-gray-200 p-3 rounded-lg">{product.farmLocation}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold text-gray-700">Quantity</h4>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Farmer Details */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">Farmer Details</h3>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={farmerDetails.profilePicUrl}
            alt="Farmer Profile"
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
          <div className="flex flex-col">
            <h4 className="text-2xl font-bold text-gray-800">{farmerDetails.name}</h4>
            <p className="text-lg text-gray-600 mb-2">Experience: {farmerDetails.experience}</p>
            <p className="text-lg text-gray-600 mb-2">Phone: {farmerDetails.phoneNo}</p>
            <p className="text-lg text-gray-600 mb-2">State: {farmerDetails.state}</p>
            <p className="text-lg text-gray-600 mb-2">User Type: {farmerDetails.userType}</p>
            <p className="text-lg text-gray-600">Other Details: {farmerDetails.otherDetails}</p>
            <div className="mt-4">
              <h5 className="text-xl font-semibold text-gray-800">Crops:</h5>
              <ul className="list-disc list-inside text-lg text-gray-600">
                {farmerDetails.crops.map((crop, index) => (
                  <li key={index}>{crop}</li>
                ))}
              </ul>
              <h5 className="text-xl font-semibold text-gray-800 mt-4">Fruits:</h5>
              <ul className="list-disc list-inside text-lg text-gray-600">
                {farmerDetails.fruits.map((fruit, index) => (
                  <li key={index}>{fruit}</li>
                ))}
              </ul>
              <h5 className="text-xl font-semibold text-gray-800 mt-4">Vegetables:</h5>
              <ul className="list-disc list-inside text-lg text-gray-600">
                {farmerDetails.vegetables.map((vegetable, index) => (
                  <li key={index}>{vegetable}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
