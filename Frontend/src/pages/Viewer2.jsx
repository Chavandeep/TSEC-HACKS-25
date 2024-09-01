import React, { useEffect } from 'react';

const Viewer2 = () => {
  useEffect(() => {
    function initialize() {
      const location = { lat: 12.5470116, lng: 76.3021338 }; // Updated coordinates
      const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 14,
      });
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
          position: location,
          pov: {
            heading: 112.74, // Adjusted to match the heading from the URL
            pitch: 14.50,   // Adjusted to match the pitch from the URL
          },
        },
      );

      map.setStreetView(panorama);
    }

    // Ensure that the `initialize` function is called when the component mounts
    if (window.google && window.google.maps) {
      initialize();
    } else {
      // Handle the case where Google Maps API is not loaded
      console.error('Google Maps API not loaded');
    }

    // Make sure to clean up after the component unmounts
    return () => {
      // Any necessary cleanup code here
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
      <div id="pano" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default Viewer2;
