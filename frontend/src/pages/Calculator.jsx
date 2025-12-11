import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPackages, getMenuItems } from '../services/api';
import './Calculator.css';

const Calculator = () => {
  const { t, i18n } = useTranslation('calculator');
  const [packages, setPackages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [guestCount, setGuestCount] = useState(10);
  const [selectedMenuItems, setSelectedMenuItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesData, menuData] = await Promise.all([
          getPackages(),
          getMenuItems()
        ]);

        const publishedPackages = packagesData.data?.filter(pkg => pkg.publishedAt) || [];
        const availableMenu = menuData.data?.filter(item => item.publishedAt && item.available) || [];

        setPackages(publishedPackages);
        setMenuItems(availableMenu);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    if (guestCount < pkg.minGuests) {
      setGuestCount(pkg.minGuests);
    }
  };

  const handleMenuItemToggle = (itemId) => {
    setSelectedMenuItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] ? 0 : 1
    }));
  };

  const handleMenuItemQuantity = (itemId, quantity) => {
    setSelectedMenuItems(prev => ({
      ...prev,
      [itemId]: Math.max(0, quantity)
    }));
  };

  // Calculate totals
  const packageTotal = selectedPackage ? selectedPackage.pricePerChild * guestCount : 0;

  const menuTotal = Object.entries(selectedMenuItems).reduce((total, [itemId, quantity]) => {
    const item = menuItems.find(m => m.id === parseInt(itemId));
    if (item && quantity > 0) {
      return total + (item.pricePerServing * quantity);
    }
    return total;
  }, 0);

  const grandTotal = packageTotal + menuTotal;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="calculator-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Party Calculator</h1>
          <p className="page-subtitle">
            Calculate the cost of your perfect party package
          </p>
        </div>
      </section>

      <div className="calculator-container">
        <div className="container">
          <div className="calculator-grid">
            {/* Configuration Panel */}
            <div className="config-panel">
              {/* Step 1: Select Package */}
              <div className="calc-section">
                <h2>
                  <span className="step-number">1</span>
                  Select a Package
                </h2>
                <div className="package-options">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`package-option ${selectedPackage?.id === pkg.id ? 'selected' : ''}`}
                      onClick={() => handlePackageSelect(pkg)}
                    >
                      <div className="option-header">
                        <h4>{pkg.name}</h4>
                        <span className="option-price">${pkg.pricePerChild}/child</span>
                      </div>
                      <p>{pkg.shortDescription}</p>
                      <div className="option-meta">
                        <span>⏱️ {pkg.durationMinutes} min</span>
                        <span>👥 {pkg.minGuests}+ guests</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Guest Count */}
              {selectedPackage && (
                <div className="calc-section">
                  <h2>
                    <span className="step-number">2</span>
                    Number of Guests
                  </h2>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      onClick={() => setGuestCount(Math.max(selectedPackage.minGuests, guestCount - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(selectedPackage.minGuests, parseInt(e.target.value) || 0))}
                      min={selectedPackage.minGuests}
                      max={selectedPackage.maxGuests || 999}
                    />
                    <button
                      className="counter-btn"
                      onClick={() => setGuestCount(guestCount + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="counter-note">
                    Minimum: {selectedPackage.minGuests} guests
                    {selectedPackage.maxGuests && ` | Maximum: ${selectedPackage.maxGuests} guests`}
                  </p>
                </div>
              )}

              {/* Step 3: Add-ons */}
              {selectedPackage && (
                <div className="calc-section">
                  <h2>
                    <span className="step-number">3</span>
                    Add Menu Items (Optional)
                  </h2>
                  <div className="menu-items">
                    {menuItems.map((item) => (
                      <div key={item.id} className="menu-item">
                        <div className="menu-item-header">
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedMenuItems[item.id] > 0}
                              onChange={() => handleMenuItemToggle(item.id)}
                            />
                            <div>
                              <strong>{item.name}</strong>
                              <span className="menu-category">{item.category}</span>
                            </div>
                          </label>
                          <span className="menu-price">${item.pricePerServing}</span>
                        </div>
                        {selectedMenuItems[item.id] > 0 && (
                          <div className="menu-quantity">
                            <label>Quantity:</label>
                            <div className="quantity-control">
                              <button
                                onClick={() => handleMenuItemQuantity(item.id, selectedMenuItems[item.id] - 1)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={selectedMenuItems[item.id]}
                                onChange={(e) => handleMenuItemQuantity(item.id, parseInt(e.target.value) || 0)}
                                min="1"
                              />
                              <button
                                onClick={() => handleMenuItemQuantity(item.id, selectedMenuItems[item.id] + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary Panel */}
            <div className="summary-panel">
              <div className="summary-sticky">
                <h3>Price Summary</h3>

                {!selectedPackage ? (
                  <div className="summary-empty">
                    <p>Select a package to see pricing</p>
                  </div>
                ) : (
                  <>
                    <div className="summary-section">
                      <h4>Package</h4>
                      <div className="summary-item">
                        <span>{selectedPackage.name}</span>
                        <span>${selectedPackage.pricePerChild} × {guestCount}</span>
                      </div>
                      <div className="summary-total">
                        <strong>Subtotal</strong>
                        <strong>${packageTotal.toFixed(2)}</strong>
                      </div>
                    </div>

                    {Object.keys(selectedMenuItems).some(id => selectedMenuItems[id] > 0) && (
                      <div className="summary-section">
                        <h4>Menu Items</h4>
                        {Object.entries(selectedMenuItems).map(([itemId, quantity]) => {
                          if (quantity <= 0) return null;
                          const item = menuItems.find(m => m.id === parseInt(itemId));
                          if (!item) return null;
                          return (
                            <div key={itemId} className="summary-item">
                              <span>{item.name} (×{quantity})</span>
                              <span>${(item.pricePerServing * quantity).toFixed(2)}</span>
                            </div>
                          );
                        })}
                        <div className="summary-total">
                          <strong>Subtotal</strong>
                          <strong>${menuTotal.toFixed(2)}</strong>
                        </div>
                      </div>
                    )}

                    <div className="summary-grand-total">
                      <span>Total Cost</span>
                      <span className="grand-total-amount">${grandTotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-actions">
                      <Link to="/contact" className="btn btn-primary btn-block btn-lg">
                        Book This Party
                      </Link>
                      <Link to="/calendar" className="btn btn-secondary btn-block">
                        Check Availability
                      </Link>
                    </div>

                    <p className="summary-note">
                      * This is an estimate. Final pricing will be confirmed upon booking.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
