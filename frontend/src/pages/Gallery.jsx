import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getGalleryImages } from '../services/api';
import StrapiImage from '../components/common/StrapiImage';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './Gallery.css';

const EAGER_LOAD_COUNT = 8; // Load first 8 images eagerly for fast initial display

const Gallery = () => {
  const { t, i18n } = useTranslation('common');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getGalleryImages();
        const publishedImages = response.data?.filter(img => img.publishedAt) || [];
        setImages(publishedImages);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []); // No language dependency - galleries don't have internationalization

  const getFilteredImages = useCallback(() => {
    if (filter === 'all') return images;
    return images.filter(img => img.folder === filter);
  }, [filter, images]);

  const filteredImages = useMemo(() => getFilteredImages(), [getFilteredImages]);
  const categories = useMemo(
    () => ['all', ...new Set(images.map(img => img.folder).filter(Boolean))],
    [images]
  );

  const openLightbox = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const navigateLightbox = useCallback((direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  }, [filteredImages, selectedImage]);

  // Get adjacent images for preloading in lightbox
  const getAdjacentImages = useMemo(() => {
    if (!selectedImage) return { prev: null, next: null };

    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    const nextIndex = (currentIndex + 1) % filteredImages.length;

    return {
      prev: filteredImages[prevIndex],
      next: filteredImages[nextIndex]
    };
  }, [selectedImage, filteredImages]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, closeLightbox, navigateLightbox]);

  if (loading) {
    return (
      <div className="star-loading">
        <div className="star-spinner"></div>
      </div>
    );
  }

  return (
    <div className="star-gallery-page">
      {/* Page Header */}
      <section className="star-page-header">
        <div className="container">
          <h1 className="text-gradient">Party Gallery 📸</h1>
          <p className="star-page-subtitle">
            See the fun and excitement from our amazing parties!
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="star-filter-section section-sm">
        <div className="container">
          <div className="star-filter-buttons">
            {categories.map(category => (
              <Button
                key={category}
                variant={filter === category ? 'primary' : 'ghost'}
                size="md"
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? '🌟 All Photos' : `📁 ${category}`}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="star-gallery-section section">
        <div className="container">
          {filteredImages.length === 0 ? (
            <Card className="star-no-images">
              <div className="star-empty-state">
                <div className="star-empty-icon">📷</div>
                <h3>No images found</h3>
                <p>Try selecting a different category to see more photos.</p>
                <Button variant="primary" onClick={() => setFilter('all')}>
                  Show All Photos
                </Button>
              </div>
            </Card>
          ) : (
            <div className="star-gallery-grid">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="star-gallery-item"
                  onClick={() => openLightbox(image)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="star-gallery-image-wrapper">
                    <StrapiImage
                      image={image.image?.[0]}
                      alt={image.title || 'Party photo'}
                      defaultEmoji="🎉"
                      showLoading={true}
                      eager={index < EAGER_LOAD_COUNT} // Eager load first N images
                      progressive={true} // Use progressive loading
                      preload={hoveredIndex === index} // Preload on hover
                    />
                    <div className="star-gallery-overlay">
                      <div className="star-overlay-content">
                        {image.title && <h4>{image.title}</h4>}
                        {image.description && <p>{image.description}</p>}
                        <div className="star-view-icon">🔍</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="star-lightbox" onClick={closeLightbox}>
          <button
            className="star-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <button
            className="star-lightbox-nav star-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="star-lightbox-nav star-lightbox-next"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="star-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <StrapiImage
              image={selectedImage.image?.[0]}
              alt={selectedImage.title || 'Party photo'}
              defaultEmoji="🎉"
              showLoading={true}
              eager={true} // Always load lightbox image eagerly
              progressive={true}
            />
            {(selectedImage.title || selectedImage.description) && (
              <div className="star-lightbox-caption">
                {selectedImage.title && <h3>{selectedImage.title}</h3>}
                {selectedImage.description && <p>{selectedImage.description}</p>}
              </div>
            )}
          </div>

          {/* Preload adjacent images in background */}
          <div style={{ display: 'none' }}>
            {getAdjacentImages.prev && (
              <StrapiImage
                image={getAdjacentImages.prev.image?.[0]}
                preload={true}
                showLoading={false}
              />
            )}
            {getAdjacentImages.next && (
              <StrapiImage
                image={getAdjacentImages.next.image?.[0]}
                preload={true}
                showLoading={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
