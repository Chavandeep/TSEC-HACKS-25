import React from 'react';
import { Translate } from '@miracleufo/react-g-translator';
import { useLanguage } from './contexts/LanguageContext'; 

const Translatew = () => {
  const { language } = useLanguage(); // Get the current language from context

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">
        <Translate from="en" to={language}>About Us</Translate>
      </h2>
      <p className="mt-2">
        <Translate from="en" to={language}>
          Our platform is dedicated to eliminating middlemen in the agricultural supply chain. By connecting farmers directly with consumers, we ensure that farmers receive a fair price for their produce while consumers enjoy fresh and affordable products.
        </Translate>
      </p>
      <p className="mt-2">
        <Translate from="en" to={language}>
          We are committed to empowering farmers and creating a more transparent, efficient, and equitable marketplace.
        </Translate>
      </p>
    </div>
  );
};

export default Translatew;
