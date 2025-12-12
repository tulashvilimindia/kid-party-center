import React, { useState } from 'react';
import './StrapiImage.css';

const STRAPI_BASE_URL = 'http://localhost:1337';

const StrapiImage = ({
  image,
  alt = 'Image',
  className = '',
  defaultEmoji = '🎉',
  showLoading = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getImageUrl = () => {
    if (!image || imageError) return null;

    // Handle string URL
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${STRAPI_BASE_URL}${image}`;
    }

    // Handle object with url property
    if (image.url) {
      return image.url.startsWith('http') ? image.url : `${STRAPI_BASE_URL}${image.url}`;
    }

    // Handle object with formats
    if (image.formats) {
      // Try medium, then small, then thumbnail
      const format = image.formats.medium || image.formats.small || image.formats.thumbnail;
      if (format && format.url) {
        return format.url.startsWith('http') ? format.url : `${STRAPI_BASE_URL}${format.url}`;
      }
    }

    return null;
  };

  const imageUrl = getImageUrl();

  // Show placeholder if no image or error
  if (!imageUrl || imageError) {
    return (
      <div className={`strapi-image-placeholder ${className}`}>
        <span className="placeholder-emoji">{defaultEmoji}</span>
      </div>
    );
  }

  return (
    <>
      {showLoading && imageLoading && (
        <div className={`strapi-image-loading ${className}`}>
          <span className="loading-spinner">⏳</span>
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt}
        className={`strapi-image ${className} ${imageLoading ? 'loading' : 'loaded'}`}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        loading="lazy"
      />
    </>
  );
};

export default StrapiImage;
