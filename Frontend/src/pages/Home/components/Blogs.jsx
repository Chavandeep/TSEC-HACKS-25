import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function Blogs() {
  return (
    <section className="blogs" id="blogs">
      <h1 className="text-center text-3.5xl text-black py-8">
        our <span className="bg-orange text-white px-12 py-2">blogs</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={`image/blog-${index + 1}.jpg`}
              alt=""
              className="object-cover w-full h-[25em]"
            />
            <div className="p-8">
              <div className="flex justify-between border-b border-gray-200 pb-6 mb-4">
                <a href="/" className="text-gray-500 text-lg flex items-center">
                  <FontAwesomeIcon icon={faUser} className="text-orange mr-2" /> by user
                </a>
                <a href="/" className="text-gray-500 text-lg flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="text-orange mr-2" /> 1st May, 2021
                </a>
              </div>
              <h3 className="text-2xl text-black leading-relaxed mb-2">
                Fresh And Organic Vegetables And Fruits
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-4">
                Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Veniam, Expedita.
              </p>
              <a href="/" className="mt-4 inline-block px-12 py-3 text-xl text-black border border-black rounded cursor-pointer hover:bg-orange">
                read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}