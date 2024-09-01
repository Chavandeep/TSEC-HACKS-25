import React from 'react';

export default function Categories() {
  return (
    <section className="categories" id="categories">
      <h1 className="text-center text-3.5xl text-black py-8">
        products <span className="bg-orange text-white px-12 py-2">categories</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{
          img: '/cat-1.png',
          title: 'vegetables',
          discount: 'upto 45% off',
        }, {
          img: '/cat-2.png',
          title: 'fresh fruits',
          discount: 'upto 45% off',
        }, {
          img: '/cat-3.png',
          title: 'dairy products',
          discount: 'upto 45% off',
        }, {
          img: '/cat-4.png',
          title: 'fresh meat',
          discount: 'upto 45% off',
        }].map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-12 text-center outline outline-1 outline-gray-300 hover:outline-2 hover:outline-orange-500 transition-all duration-300"
          >
            <img
              src={category.img}
              alt={category.title}
              className="h-60 mx-auto my-4"
            />
            <h3 className="text-2xl text-black leading-relaxed mb-2">
              {category.title}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed mb-4">
              {category.discount}
            </p>
            <button
              type="button"
              className="inline-block px-12 py-3 text-xl text-black border border-black rounded cursor-pointer hover:bg-orange"
            >
              shop now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}