import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Import storage for file uploads
import { useNavigate } from 'react-router-dom';

// List of Indian states for the dropdown
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

// Crops, fruits, and vegetables for farmers
const crops = ["Wheat", "Rice", "Corn", "Barley", "Sugarcane"];
const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
const vegetables = ["Tomato", "Potato", "Onion", "Carrot", "Spinach"];

// Initialize Firebase Firestore and Storage
const firestore = firebase.firestore();
const storage = firebase.storage();

function FormFill() {
  const [userType, setUserType] = useState('');
  const [state, setState] = useState('');
  const [cropsSelected, setCropsSelected] = useState([]);
  const [fruitsSelected, setFruitsSelected] = useState([]);
  const [vegetablesSelected, setVegetablesSelected] = useState([]);
  const [otherDetails, setOtherDetails] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [formFilled, setFormFilled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const userDoc = await firestore.collection('userDetails').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserType(userData.userType || '');
          setState(userData.state || '');
          setCropsSelected(userData.crops || []);
          setFruitsSelected(userData.fruits || []);
          setVegetablesSelected(userData.vegetables || []);
          setOtherDetails(userData.otherDetails || '');
          setName(userData.name || '');
          setProfilePic(userData.profilePicUrl || '');
          setFormFilled(true);
          navigate('/myprofile'); // Redirect to /myprofile if data exists
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCropsChange = (e) => {
    const { value, checked } = e.target;
    setCropsSelected((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleFruitsChange = (e) => {
    const { value, checked } = e.target;
    setFruitsSelected((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleVegetablesChange = (e) => {
    const { value, checked } = e.target;
    setVegetablesSelected((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profilePicUrl = '';
    if (profilePic) {
      // Upload profile picture
      const uploadTask = storage.ref(`profile_pics/${profilePic.name}`).put(profilePic);
      await uploadTask;
      profilePicUrl = await storage.ref('profile_pics').child(profilePic.name).getDownloadURL();
    }

    // Prepare data for Firestore
    const formData = {
      name,
      userType,
      state,
      crops: userType === 'Farmer' ? cropsSelected : [],
      fruits: userType === 'Farmer' ? fruitsSelected : [],
      vegetables: userType === 'Farmer' ? vegetablesSelected : [],
      otherDetails: userType !== 'Farmer' ? otherDetails : '',
      profilePicUrl,
    };

    try {
      // Add or update form data in Firestore
      const user = firebase.auth().currentUser;
      if (user) {
        await firestore.collection('userDetails').doc(user.uid).set(formData, { merge: true });
        alert('Form submitted successfully!');
        navigate('/myprofile'); // Redirect to /myprofile after successful submission
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert('Failed to submit form.');
    }
  };

  // Redirect to profile if form is already filled
  if (formFilled) {
    return <div>Redirecting to your profile...</div>; // This message can be customized or replaced with a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Fill in your details</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
            required
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700">Profile Picture</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Type of User</span>
          <select 
            value={userType} 
            onChange={handleUserTypeChange} 
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select User Type</option>
            <option value="Farmer">Farmer</option>
            <option value="Retailer">Retailer</option>
            <option value="Customer">Customer</option>
          </select>
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700">State</span>
          <select 
            value={state} 
            onChange={handleStateChange} 
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </label>

        {userType === 'Farmer' && (
          <>
            <fieldset className="mb-4">
              <legend className="text-gray-700 font-semibold mb-2">Crops</legend>
              {crops.map((crop, index) => (
                <label key={index} className="block mb-1">
                  <input 
                    type="checkbox" 
                    value={crop} 
                    checked={cropsSelected.includes(crop)}
                    onChange={handleCropsChange} 
                    className="mr-2" 
                  />
                  {crop}
                </label>
              ))}
            </fieldset>

            <fieldset className="mb-4">
              <legend className="text-gray-700 font-semibold mb-2">Fruits</legend>
              {fruits.map((fruit, index) => (
                <label key={index} className="block mb-1">
                  <input 
                    type="checkbox" 
                    value={fruit} 
                    checked={fruitsSelected.includes(fruit)}
                    onChange={handleFruitsChange} 
                    className="mr-2" 
                  />
                  {fruit}
                </label>
              ))}
            </fieldset>

            <fieldset className="mb-4">
              <legend className="text-gray-700 font-semibold mb-2">Vegetables</legend>
              {vegetables.map((vegetable, index) => (
                <label key={index} className="block mb-1">
                  <input 
                    type="checkbox" 
                    value={vegetable} 
                    checked={vegetablesSelected.includes(vegetable)}
                    onChange={handleVegetablesChange} 
                    className="mr-2" 
                  />
                  {vegetable}
                </label>
              ))}
            </fieldset>
          </>
        )}

        {userType !== 'Farmer' && (
          <label className="block mb-4">
            <span className="text-gray-700">Other Details</span>
            <textarea
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              rows="4"
            />
          </label>
        )}

        <button 
          type="submit" 
          className="block w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormFill;
