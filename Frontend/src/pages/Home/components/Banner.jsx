import React from 'react';

export default function Banner() {
  return (
    <section
      className="flex justify-center pt-44 pb-40"
      id="banner"
      style={{
        background: 'url("../image/banner-bg.webp") no-repeat center center / cover',
      }}
    >
      <div className="text-center w-[60rem]">
        <h3 className="text-3xl text-black">
          fresh and <span className="text-orange">organic</span> products
        </h3>
        <p className="py-8 text-lg text-lightColor">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam vitae perspiciatis neque soluta.
        </p>
        <button
          type="button"
          className="mt-4 inline-block px-12 py-3 text-2xl text-black border border-black rounded cursor-pointer hover:bg-orange"
        >
          shop now
        </button>
      </div>
    </section>
  );
}