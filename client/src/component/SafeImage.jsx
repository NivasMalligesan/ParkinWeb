// components/SafeImage.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SafeImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackType = 'default',
  ...props 
}) => {
  const { sanitizeImageUrl, getFallbackImage } = useContext(AppContext);
  const [imageSrc, setImageSrc] = useState(() => {
    // Initial sanitization
    return sanitizeImageUrl(src, fallbackType);
  });
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.warn(`Image failed to load: ${src}`);
      setImageSrc(getFallbackImage(fallbackType));
      setHasError(true);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt || "Image"}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default SafeImage;