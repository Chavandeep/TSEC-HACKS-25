import React from 'react';
import Banner from './components/Banner';
import Features from './components/Features';
// import Product from './components/Product';
import Categories from './components/Categories';
import Reviews from './components/Reviews';
import Blogs from './components/Blogs';

function Home() {
  return (
    <div className="overflow-x-hidden">

      <Banner />
      <Features />
      {/* <Product /> */}
      <Categories />
      <Reviews />
      <Blogs />
    </div>
  );
}

export default Home;