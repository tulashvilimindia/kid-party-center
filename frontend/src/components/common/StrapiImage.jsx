import React, { useState, useEffect, useRef } from 'react';
import './StrapiImage.css';

const STRAPI_BASE_URL = 'http://localhost:1337';

const StrapiImage = ({
  image,
  alt = 'Image',
  className = '',
  defaultEmoji = '🎉',
  showLoading = true,
  eager = false, // Load immediately without lazy loading
  progressive = true, // Load thumbnail first, then full image
  preload = false // Preload image in background
}) => {
  const [imageError, setImageError] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [fullImageLoaded, setFullImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager); // If eager, consider it in view
  const imgRef = useRef(null);

  // Get different image formats
  const getImageUrls = () => {
    if (!image || imageError) return { thumbnail: null, full: null };

    const buildUrl = (path) => {
      if (!path) return null;
      return path.startsWith('http') ? path : `${STRAPI_BASE_URL}${path}`;
    };

    // Handle string URL
    if (typeof image === 'string') {
      const url = buildUrl(image);
      return { thumbnail: url, full: url };
    }

    // Handle object with formats (Strapi structure)
    let thumbnailUrl = null;
    let fullUrl = null;

    if (image.formats) {
      // Thumbnail for progressive loading
      if (image.formats.thumbnail?.url) {
        thumbnailUrl = buildUrl(image.formats.thumbnail.url);
      }

      // Full image - prefer medium, then large, then small, then original
      if (image.formats.medium?.url) {
        fullUrl = buildUrl(image.formats.medium.url);
      } else if (image.formats.large?.url) {
        fullUrl = buildUrl(image.formats.large.url);
      } else if (image.formats.small?.url) {
        fullUrl = buildUrl(image.formats.small.url);
      }
    }

    // Fallback to main url
    if (!fullUrl && image.url) {
      fullUrl = buildUrl(image.url);
    }

    // If no thumbnail, use full image
    if (!thumbnailUrl) {
      thumbnailUrl = fullUrl;
    }

    return { thumbnail: thumbnailUrl, full: fullUrl };
  };

  const { thumbnail, full } = getImageUrls();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (eager || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [eager]);

  // Preload image if requested
  useEffect(() => {
    if (preload && full) {
      const img = new Image();
      img.src = full;
    }
  }, [preload, full]);

  // Progressive loading: load full image after thumbnail
  useEffect(() => {
    if (!progressive || !isInView || !full || !thumbnail) return;

    // If thumbnail and full are the same, skip progressive loading
    if (thumbnail === full) {
      setThumbnailLoaded(true);
      setFullImageLoaded(true);
      return;
    }

    // Load thumbnail first
    const thumbImg = new Image();
    thumbImg.onload = () => setThumbnailLoaded(true);
    thumbImg.onerror = () => setImageError(true);
    thumbImg.src = thumbnail;

    // Then load full image
    const fullImg = new Image();
    fullImg.onload = () => setFullImageLoaded(true);
    fullImg.onerror = () => {
      // If full image fails, keep thumbnail
      setFullImageLoaded(true);
    };
    fullImg.src = full;
  }, [progressive, isInView, thumbnail, full]);

  // Show placeholder if no image or error
  if (!full || imageError) {
    return (
      <div className={`strapi-image-placeholder ${className}`} ref={imgRef}>
        <span className="placeholder-emoji">{defaultEmoji}</span>
      </div>
    );
  }

  // Show loading state
  if (showLoading && !thumbnailLoaded && isInView) {
    return (
      <div className={`strapi-image-loading ${className}`} ref={imgRef}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className={`strapi-image-container ${className}`} ref={imgRef}>
      {progressive && thumbnailLoaded && !fullImageLoaded ? (
        <>
          {/* Blurred thumbnail while loading full image */}
          <img
            src={thumbnail}
            alt={alt}
            className="strapi-image strapi-image-thumbnail"
            loading={eager ? 'eager' : 'lazy'}
          />
          {/* Loading overlay */}
          <div className="strapi-image-loading-overlay">
            <div className="loading-spinner-small"></div>
          </div>
        </>
      ) : null}

      {/* Full image */}
      <img
        src={full}
        alt={alt}
        className={`strapi-image strapi-image-full ${fullImageLoaded ? 'loaded' : 'loading'}`}
        onLoad={() => {
          setThumbnailLoaded(true);
          setFullImageLoaded(true);
        }}
        onError={() => {
          setImageError(true);
        }}
        loading={eager ? 'eager' : 'lazy'}
        style={{
          opacity: fullImageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

export default StrapiImage;
