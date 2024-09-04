import React, { useState } from 'react';
import './App.css';

const crops = {
  January: { 
    name: "Wheat", 
    info: "Ideal for winter planting. Wheat grows best in cool weather and can be harvested in late spring or early summer. Suitable for various soil types.",
    background: "/wheat-bg.jpg",
    image: "/1.png" // Add crop image path
  },
  February: { 
    name: "Barley", 
    info: "Good for cold climates. Barley is used for food, brewing, and animal feed. It’s resilient and thrives in colder temperatures.",
    background: "/barley-bg.jpg",
    image: "/9.png" // Add crop image path
  },
  March: { 
    name: "Corn", 
    info: "Best planted after the frost. Corn requires warm soil and plenty of sunlight. It’s a staple crop and grows tall.",
    background: "/corn-bg.jpg",
    image: "/12.png" // Add crop image path
  },
  April: { 
    name: "Soybean", 
    info: "Requires warm soil and lots of sunlight. Soybeans are rich in protein and are used in many food products.",
    background: "/soybean-bg.jpg",
    image: "/3.png" // Add crop image path
  },
  May: { 
    name: "Potato", 
    info: "Planted in spring, potatoes need cool temperatures to grow. They are a versatile crop used in various cuisines.",
    background: "/potato-bg.jpg",
    image: "/11.png"
  },
  June: { 
    name: "Tomato", 
    info: "Requires warm temperatures and plenty of sunlight. Tomatoes are a popular fruit used in salads, sauces, and many dishes.",
    background: "/tomato-bg.jpg",
    image: "/5.png"
  },
  July: { 
    name: "Peppers", 
    info: "Thrives in warm temperatures and full sunlight. Peppers come in various colors and flavors, often used in cooking.",
    background: "/peppers-bg.jpg",
    image: "4.png"
  },
  August: { 
    name: "Cucumber", 
    info: "Requires warm weather and plenty of water. Cucumbers are often used in salads and are refreshing during the summer.",
    background: "/cucumber-bg.jpg",
    image: "8.png"
  },
  September: { 
    name: "Pumpkin", 
    info: "Best grown in warm weather and harvested in the fall. Pumpkins are used for pies, decorations, and more.",
    background: "/pumpkin-bg.jpg",
    image: "10.png"
  },
  October: { 
    name: "Spinach", 
    info: "Grows well in cooler temperatures. Spinach is a nutritious green leafy vegetable used in salads and cooking.",
    background: "/spinach-bg.jpg",
    image: "2.png"
  },
  November: { 
    name: "Garlic", 
    info: "Planted in the fall and harvested in late spring or summer. Garlic is used in cooking for its strong flavor and health benefits.",
    background: "/garlic-bg.jpg",
    image: "6.png"
  },
  December: { 
    name: "Onion", 
    info: "Planted in fall or early spring and harvested in summer. Onions are a staple in many dishes and have various health benefits.",
    background: "/onion-bg.jpg",
    image: "7.png"
  }
};

function Calendar() {
  const [month, setMonth] = useState('January');

  const handlePrevMonth = () => {
    const months = Object.keys(crops);
    const index = months.indexOf(month);
    const prevIndex = (index - 1 + months.length) % months.length;
    setMonth(months[prevIndex]);
  };

  const handleNextMonth = () => {
    const months = Object.keys(crops);
    const index = months.indexOf(month);
    const nextIndex = (index + 1) % months.length;
    setMonth(months[nextIndex]);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="calendar">
          <div className="calendar-wrapper">
            <img src="/lol.png" alt="Calendar" className="calendar-image" />
            <div className="month-navigation">
              <button onClick={handlePrevMonth}>Back</button>
              <h2>{month}</h2>
              <button onClick={handleNextMonth}>Next</button>
            </div>
          </div>
        </div>
        <div className="crop-info" style={{ backgroundImage: `url(${crops[month].background})` }}>
          <h2 className="crop-title">Crop of the Month: {crops[month].name}</h2>
          <p>{crops[month].info}</p>
          <img src={crops[month].image} alt={crops[month].name} className="crop-image" />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
