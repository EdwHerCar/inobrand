import React, { createContext, useContext, useState } from 'react';

const WhatsAppButtonContext = createContext();

export const useWhatsAppButton = () => useContext(WhatsAppButtonContext);

export const WhatsAppButtonProvider = ({ children }) => {
  const [isServiceShowcaseVisible, setIsServiceShowcaseVisible] = useState(false);
  const [isSloganVisible, setIsSloganVisible] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const value = {
    isServiceShowcaseVisible,
    setIsServiceShowcaseVisible,
    isSloganVisible,
    setIsSloganVisible,
    isHeroVisible,
    setIsHeroVisible,
    isContactVisible,
    setIsContactVisible
  };

  return (
    <WhatsAppButtonContext.Provider value={value}>
      {children}
    </WhatsAppButtonContext.Provider>
  );
};