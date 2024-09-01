import React, { useState, useEffect, useRef } from 'react';
import { db } from './Firebase/firebaseConfig'; 
import { collection, query, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const ChatInterface = ({ userId }) => {
  const { negotiationId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(1000);
  const [negotiationStage, setNegotiationStage] = useState(0);
  const [userType, setUserType] = useState('');
  const messagesEndRef = useRef(null);

  const stages = [
    "Initial Offer",
    "First Negotiation",
    "Second Negotiation",
    "Final Offer"
  ];

  useEffect(() => {
    if (!userId || !negotiationId) {
      console.error("User ID or Negotiation ID is missing.");
      return;
    }

    const fetchUserType = async () => {
      try {
        const userDocRef = doc(db, 'userDetails', userId);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserType(userData.userType || '');
        } else {
          console.error("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching userType: ", error);
      }
    };

    fetchUserType();
  }, [userId, negotiationId]);

  useEffect(() => {
    if (negotiationId) {
      const messagesRef = collection(db, `negotiations/${negotiationId}/messages`);
      const q = query(messagesRef);

      const unsubscribe = onSnapshot(q, snapshot => {
        const messagesList = snapshot.docs.map(doc => doc.data());
        setMessages(messagesList);

        const latestMessage = snapshot.docs[snapshot.docs.length - 1]?.data();
        if (latestMessage?.role === 'customer' && userType === 'farmer') {
          toast(`New offer from customer: $${latestMessage.text}`);
        }
      });

      return () => unsubscribe();
    }
  }, [negotiationId, userType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAction = async (action) => {
    if (!userType) {
      toast.error("User type is not determined.");
      return;
    }

    let newMessage = '';
    switch(action) {
      case 'ACCEPT':
        newMessage = 'I accept your offer.';
        break;
      case 'REJECT':
        newMessage = 'I reject your offer.';
        break;
      case 'COUNTEROFFER':
        newMessage = `I counter with $${message}.`;
        break;
      default:
        return;
    }

    const messageObj = { role: userType.toLowerCase(), text: newMessage };
    const messagesRef = collection(db, `negotiations/${negotiationId}/messages`);

    try {
      await addDoc(messagesRef, messageObj);
      setMessage('');

      if (action === 'ACCEPT' || action === 'REJECT') {
        setNegotiationStage(stages.length - 1);
        toast(newMessage);
      } else if (action === 'COUNTEROFFER') {
        const counterOffer = parseFloat(message);
        setCurrentOffer(counterOffer);

        setTimeout(async () => {
          const farmerResponse = `Please provide a new offer.`;
          await addDoc(messagesRef, { role: 'farmer', text: farmerResponse });
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleInputChange = (e) => setMessage(e.target.value);

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-2 text-center">Crop Price Negotiation</h2>
      <div className="text-sm mb-2 text-center text-gray-600">Stage: {stages[negotiationStage]}</div>
      <div className="flex-1 overflow-auto p-4 bg-white rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-[70%] ${
              msg.role === 'farmer'
                ? 'bg-green-100 text-green-800 self-start'
                : 'bg-blue-100 text-blue-800 self-end ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4">
        <div className="flex space-x-2 mb-2">
          <input
            type="number"
            value={message}
            onChange={handleInputChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your offer"
          />
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            onClick={() => handleAction('COUNTEROFFER')}
          >
            Offer
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => handleAction('ACCEPT')}
          >
            ACCEPT
          </button>
          <button
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => handleAction('REJECT')}
          >
            REJECT
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatInterface;
