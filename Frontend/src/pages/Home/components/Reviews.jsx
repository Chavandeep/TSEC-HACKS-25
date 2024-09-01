import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Autoplay } from 'swiper';
import './Reviews.css';
import 'swiper/swiper.min.css';

const reviewsData = [
  {
    id: 1,
    image: '/pic-1.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis maxime inventore illo nemo cupiditate.',
    name: 'John Doe',
    rating: 4.5
  },
  {
    id: 2,
    image: '/pic-2.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam dignissimos sequi reiciendis, illo nemo.',
    name: 'Jane Smith',
    rating: 4.0
  },
  {
    id: 3,
    image: '/pic-3.png',
    text: 'Lorem ipsum dolor sit, amet consectetur. Ipsum amet necessitatibus labore nisi officiis.',
    name: 'David Lee',
    rating: 4.5
  },
  {
    id: 4,
    image: '/pic-4.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis quasi tempore rem officia!',
    name: 'Emily Clark',
    rating: 5.0
  }
];

export default function Reviews() {
  SwiperCore.use([Autoplay]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} />}
      </>
    );
  };

  return (
    <section className="reviews" id="reviews">
      <h1 className="heading">
        Customer&apos;s <span>Review</span>
      </h1>
      <div className="reviews-slider">
        <Swiper
          loop
          autoplay={{ delay: 7500, disableOnInteraction: false }}
          slidesPerView={3}
          centeredSlides
          spaceBetween={20}
          pagination={{ clickable: true }}
          style={{ padding: '1rem' }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviewsData.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="box">
                <img src={review.image} alt={review.name} />
                <p>{review.text}</p>
                <h3>{review.name}</h3>
                <div className="stars">{renderStars(review.rating)}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}