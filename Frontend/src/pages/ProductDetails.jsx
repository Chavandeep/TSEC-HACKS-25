import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../hooks/useCart'

function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState('https://via.placeholder.com/500');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); 

  const product = {
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    price: 50,
    description: 'Freshly picked organic tomatoes straight from the farm. Juicy, ripe, and full of flavor.',
    harvestDate: '2024-09-15',
    location: 'Mysore, Karnataka',
    reviews: [
      { rating: 5, comment: 'Excellent quality!', user: 'Ravi' },
      { rating: 4, comment: 'Good taste, but a bit pricey.', user: 'Anjali' },
    ],
    images: [
      'https://via.placeholder.com/500',
      'https://via.placeholder.com/500/92c952',
      'https://via.placeholder.com/500/771796',
    ],
  };

  const farmer = {
    name: 'Ramesh Kumar',
    photo: 'https://via.placeholder.com/150',
    experience: '15 years',
    speciality: 'Organic Farming',
    phone: '+91 9876543210',
  };

  const calculateExpiryDate = (harvestDate) => {
    const harvest = new Date(harvestDate);
    const expiry = new Date(harvest);
    expiry.setDate(expiry.getDate() + 15); // Assuming 15 days shelf life for tomatoes
    return expiry.toISOString().split('T')[0];
  };

  const expiryDate = calculateExpiryDate(product.harvestDate);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

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
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === image ? 'border-blue-500' : 'border-gray-300'} transition-all duration-300`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-xl text-gray-600 mb-2">{product.category}</p>
          <p className="text-3xl text-green-600 font-bold mb-4">₹{product.price}/kg</p>
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
              <p className="text-gray-600 bg-gray-200 p-3 rounded-lg">{product.location}</p>
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

      {/* Farmer Information */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Meet the Farmer</h3>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img src={farmer.photo} alt={farmer.name} className="w-32 h-32 rounded-full object-cover" />
          <div>
            <h4 className="text-2xl font-semibold text-gray-700 mb-2">{farmer.name}</h4>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Experience:</span> {farmer.experience}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Speciality:</span> {farmer.speciality}</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Phone:</span> {farmer.phone}</p>
            <div className="flex space-x-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300">
                Contact Farmer
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
                Negotiate Price
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>
        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div key={index} className="flex items-start space-x-4 border-b border-gray-200 pb-4">
              <div className="flex-shrink-0">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-700 mb-1">{review.comment}</p>
                <p className="text-gray-500 text-sm">- {review.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;