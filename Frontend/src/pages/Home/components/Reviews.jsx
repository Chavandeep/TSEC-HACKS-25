import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const reviews = [
  {
    id: 1,
    imgSrc: '/pic-1.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis maxime inventore illo nemo cupiditate quam eligendi nihil sunt ullam, laudantium, earum in nam provident quaerat exercitationem?',
    name: 'john deo',
  },
  {
    id: 2,
    imgSrc: '/pic-2.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis maxime inventore illo nemo cupiditate quam eligendi nihil sunt ullam, laudantium, earum in nam provident quaerat exercitationem?',
    name: 'john deo',
  },
  {
    id: 3,
    imgSrc: '/pic-3.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis maxime inventore illo nemo cupiditate quam eligendi nihil sunt ullam, laudantium, earum in nam provident quaerat exercitationem?',
    name: 'john deo',
  },
  {
    id: 4,
    imgSrc: '/pic-4.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis maxime inventore illo nemo cupiditate quam eligendi nihil sunt ullam, laudantium, earum in nam provident quaerat exercitationem?',
    name: 'john deo',
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="p-6 bg-gray-100" id="reviews">
      <h1 className="text-4xl font-bold text-center mb-8">
        customer&apos;s
        <span className="text-primary"> review</span>
      </h1>
      <div className="relative">
        <div className="flex justify-center items-center overflow-hidden">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`${
                index === currentIndex ? 'block' : 'hidden'
              } w-full transition-transform`}
            >
              <div className="bg-white rounded-lg text-center p-12 shadow-lg">
                <img
                  src={review.imgSrc}
                  alt=""
                  className="h-40 w-40 rounded-full mx-auto mb-4"
                />
                <p className="text-lg text-gray-600 py-4 leading-relaxed">
                  {review.text}
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{review.name}</h3>
                <div className="text-yellow-500 text-xl">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl p-2 bg-gray-200 rounded-full shadow"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl p-2 bg-gray-200 rounded-full shadow"
        >
          ›
        </button>
      </div>
    </section>
  );
}
