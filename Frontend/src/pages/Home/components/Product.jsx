import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';

SwiperCore.use([Autoplay]);

export default function Products() {
  return (
    <section className="bg-gray-100 py-12" id="products">
      <h1 className="text-4xl font-bold text-center mb-8">
        Our <span className="text-yellow-500">Products</span>
      </h1>

      <div className="products-slider">
        <div className="swiper-wrapper">
          <Swiper
            loop
            spaceBetween={20}
            autoplay={{ delay: 7500, disableOnInteraction: false }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            centeredSlides
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: '1rem' }}
          >
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-1.png" alt="Fresh Orange" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fresh Orange</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-2.png" alt="Fresh Onion" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fresh Onion</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-3.png" alt="Fresh Meat" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fresh Meat</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-4.png" alt="Fresh Cabbage" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fresh Cabbage</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="products-slider mt-12">
        <div className="swiper-wrapper">
          <Swiper
            loop
            spaceBetween={20}
            autoplay={{ delay: 7500, disableOnInteraction: false }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            centeredSlides
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: '1rem' }}
          >
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-5.png" alt="Fresh Potato" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fresh Potato</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-6.png" alt="Fresh Avocado" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fresh Avocado</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-7.png" alt="Fresh Carrot" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Fresh Carrot</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                <img src="image/product-8.png" alt="Green Lemon" className="h-80 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Green Lemon</h3>
                <div className="text-xl text-gray-500 mb-2">$4.99/ -- 10.99/-</div>
                <div className="text-yellow-500 text-xl mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}