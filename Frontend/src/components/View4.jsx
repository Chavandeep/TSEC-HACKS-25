import React from 'react';

const View4 = () => {
  return (
    <div>
      <h1>360° Street View</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!4v1635892522090!6m8!1m7!1sCAoSLEFGMVFpcE9ESkxrbk1QRzE5ak82NnRQd0p6X3ZPZHZyRVc1U3U3aUJjRnNp!2m2!1d12.5470116!2d76.3021338!3f112.74!4f14.50!5f0.7820865974627469"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Street View"
      ></iframe>
    </div>
  );
};

export default View4;
