import React from 'react';

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="content text-center">
        <h1 className="text-3.5xl text-black py-8">
          our <span className="bg-orange text-white px-12 py-2 inline-block clip-polygon">features</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            img: 'image/feature-img-1.png',
            title: 'fresh and organic',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!',
          }, {
            img: 'image/feature-img-2.png',
            title: 'free delivery',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!',
          }, {
            img: 'image/feature-img-3.png',
            title: 'easy payment',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!',
          }].map((feature, index) => (
            <div
              key={index}
              className="text-center bg-white shadow-lg p-12 outline outline-1 outline-gray-300 hover:outline-2 hover:outline-orange-500 transition-all duration-300"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="h-60 mx-auto my-4"
              />
              <h3 className="text-2xl text-black leading-relaxed mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-4">
                {feature.description}
              </p>
              <a
                href="/"
                className="inline-block px-12 py-3 text-xl text-black border border-black rounded cursor-pointer hover:bg-orange"
              >
                read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}