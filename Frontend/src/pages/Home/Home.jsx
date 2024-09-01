import React from 'react';
import Banner from './Banner';
import Features from './components/Features';
import Products from './components/Products';
import Categories from './components/Categories';
import Reviews from './components/Reviews';
import Blogs from './components/Blogs';

function App() {
  return (
    <div className="overflow-x-hidden">

      <Banner />
      <Features />
      <Products />
      <Categories />
      <Reviews />
      <Blogs />
    </div>
  );
}

export default App;