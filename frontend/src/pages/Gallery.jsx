import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getGalleryImages } from '../services/api';
import './Gallery.css';

const Gallery = () => {
  const { t, i18n } = useTranslation('common');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

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
  }, [i18n.language]);

  const getFilteredImages = () => {
    if (filter === 'all') return images;
    return images.filter(img => img.category === filter);
  };

  const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean))];
  const filteredImages = getFilteredImages();

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Party Gallery</h1>
          <p className="page-subtitle">
            See the fun and excitement from our amazing parties!
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'All Photos' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="container">
          {filteredImages.length === 0 ? (
            <div className="no-images">
              <p>No images found in this category.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="gallery-item"
                  onClick={() => openLightbox(image)}
                >
                  <div className="gallery-image-wrapper">
                    {image.imageUrl ? (
                      <img
                        src={image.imageUrl}
                        alt={image.title || 'Party photo'}
                        loading="lazy"
                      />
                    ) : (
                      <div className="placeholder-image">
                        <span>🎉</span>
                      </div>
                    )}
                    <div className="gallery-overlay">
                      <div className="overlay-content">
                        <h4>{image.title}</h4>
                        {image.description && <p>{image.description}</p>}
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
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            ‹
          </button>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            ›
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {selectedImage.imageUrl ? (
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title || 'Party photo'}
              />
            ) : (
              <div className="placeholder-image-large">
                <span>🎉</span>
              </div>
            )}
            {(selectedImage.title || selectedImage.description) && (
              <div className="lightbox-caption">
                {selectedImage.title && <h3>{selectedImage.title}</h3>}
                {selectedImage.description && <p>{selectedImage.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
