import React, { useState, useEffect } from 'react';
import { Info, ShoppingBag, Users, ChevronUp } from 'lucide-react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "heroTitle": "Welcome to Our Farmer-Consumer Connection Platform",
          "heroSubtitle": "Empowering Farmers and Consumers to Connect Directly",
          "missionTitle": "Our Mission",
          "missionText": "To transform the way farmers engage with consumers, fostering direct trade and supporting sustainable farming practices.",
          "features": {
            "smartTechTitle": "Innovative Technology",
            "smartTechDesc": "Utilizing advanced technology for seamless farmer-consumer interactions.",
            "effDistTitle": "Effective Connections",
            "effDistDesc": "Enhancing communication channels to reduce barriers and improve access.",
            "servMillionsTitle": "Reaching Millions",
            "servMillionsDesc": "Improving countless lives through our platform's innovative solutions."
          },
          "impactTitle": "Our Impact",
          "impact": {
            "beneficiaries": "Farmers Connected",
            "centers": "Engagement Points",
            "satisfaction": "User Satisfaction"
          },
          "testimonial": {
            "quote": "This platform has revolutionized how we connect with consumers. It’s both efficient and dependable.",
            "author": "Priyanka Kapoor"
          },
          "ctaTitle": "Contact Us",
          "ctaText": "Get in touch to discover how we can support your farming needs.",
          "contactNumber": "+91-1234567890"
        }
      },
      hi: {
        translation: {
          "heroTitle": "हमारे किसान-उपभोक्ता कनेक्शन प्लेटफॉर्म में आपका स्वागत है",
          "heroSubtitle": "किसानों और उपभोक्ताओं को सीधे जोड़ना",
          "missionTitle": "हमारा मिशन",
          "missionText": "किसानों और उपभोक्ताओं के बीच संपर्क के तरीके को बदलना, सीधा व्यापार प्रोत्साहित करना और टिकाऊ कृषि का समर्थन करना।",
          "features": {
            "smartTechTitle": "नवोन्मेषी तकनीक",
            "smartTechDesc": "सीमलेस किसान-उपभोक्ता इंटरएक्शन के लिए उन्नत तकनीक का उपयोग।",
            "effDistTitle": "प्रभावी कनेक्शन",
            "effDistDesc": "संचार चैनलों को बेहतर बनाना ताकि बाधाओं को कम किया जा सके और पहुंच को बढ़ाया जा सके।",
            "servMillionsTitle": "लाखों तक पहुंचना",
            "servMillionsDesc": "हमारे प्लेटफॉर्म की नवोन्मेषी समाधानों के माध्यम से अनगिनत जीवन को बेहतर बनाना।"
          },
          "impactTitle": "हमारा प्रभाव",
          "impact": {
            "beneficiaries": "किसान जुड़े",
            "centers": "एंगेजमेंट पॉइंट्स",
            "satisfaction": "उपयोगकर्ता संतोष"
          },
          "testimonial": {
            "quote": "इस प्लेटफॉर्म ने उपभोक्ताओं के साथ जुड़ने का तरीका बदल दिया है। यह कुशल और विश्वसनीय है।",
            "author": "प्रियंका कपूर"
          },
          "ctaTitle": "संपर्क करें",
          "ctaText": "जानें कि हम आपकी खेती की जरूरतों का समर्थन कैसे कर सकते हैं।",
          "contactNumber": "+91-1234567890"
        }
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the current language is not available
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

// AboutCard Component
const AboutCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105">
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-green-500 mr-3" />
      <h3 className="text-xl font-semibold text-green-800">{title}</h3>
    </div>
    <p className="text-gray-700">{description}</p>
  </div>
);

// CountUp Component
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

// About Component
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Language Selector */}
      <div className="lang p-4 mt-12">
        <select onChange={(e) => i18n.changeLanguage(e.target.value)} className="p-2 border rounded border-green-400">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Hero Section */}
      <div className="relative bg-green-600 text-white">
        <img src="/api/placeholder/1200/400" alt="Connecting Farmers and Consumers" className="w-full h-64 object-cover opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in-down">{t('heroTitle')}</h1>
            <p className="text-xl max-w-2xl mx-auto animate-fade-in-up">{t('heroSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">{t('missionTitle')}</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('missionText')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AboutCard 
            icon={Info}
            title={t('features.smartTechTitle')}
            description={t('features.smartTechDesc')}
          />
          <AboutCard 
            icon={ShoppingBag}
            title={t('features.effDistTitle')}
            description={t('features.effDistDesc')}
          />
          <AboutCard 
            icon={Users}
            title={t('features.servMillionsTitle')}
            description={t('features.servMillionsDesc')}
          />
        </div>

        {/* Animated Stats Section */}
        <div className="bg-green-600 text-white p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('impactTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-bounce">
              <p className="text-4xl font-bold mb-2"><CountUp end={1000000} duration={2000} />+</p>
              <p className="text-xl">{t('impact.beneficiaries')}</p>
            </div>
            <div className="animate-bounce" style={{animationDelay: '0.2s'}}>
              <p className="text-4xl font-bold mb-2"><CountUp end={500} duration={2000} />+</p>
              <p className="text-xl">{t('impact.centers')}</p>
            </div>
            <div className="animate-bounce" style={{animationDelay: '0.4s'}}>
              <p className="text-4xl font-bold mb-2"><CountUp end={98} duration={2000} />%</p>
              <p className="text-xl">{t('impact.satisfaction')}</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="text-center mb-16">
          <blockquote className="text-xl font-medium italic mb-4">{t('testimonial.quote')}</blockquote>
          <p className="text-lg font-semibold">- {t('testimonial.author')}</p>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-800">{t('ctaTitle')}</h2>
          <p className="text-lg mb-4">{t('ctaText')}</p>
          <a href={`tel:${t('contactNumber')}`} className="text-green-500 hover:underline">{t('contactNumber')}</a>
        </div>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default About;
