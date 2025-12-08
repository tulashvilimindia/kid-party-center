import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPartySlots } from '../services/api';
import './Calendar.css';

const Calendar = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('available');

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await getPartySlots();
        const publishedSlots = response.data?.filter(slot => slot.publishedAt) || [];
        setSlots(publishedSlots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const getFilteredSlots = () => {
    const now = new Date();

    return slots.filter(slot => {
      const slotDate = new Date(slot.startTime);

      // Filter out past slots
      if (slotDate < now) return false;

      // Apply status filter
      if (filter === 'available') return slot.status === 'available';
      if (filter === 'booked') return slot.status === 'booked';

      return true;
    });
  };

  const groupSlotsByDate = (slotsToGroup) => {
    const grouped = {};

    slotsToGroup.forEach(slot => {
      if (!slot.startTime) return;

      const slotDate = new Date(slot.startTime);

      // Check if date is valid
      if (isNaN(slotDate.getTime())) {
        console.error('Invalid date:', slot.startTime);
        return;
      }

      const date = slotDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(slot);
    });

    // Sort slots within each date
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    });

    return grouped;
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Time';
    }

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDayOfWeek = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const filteredSlots = getFilteredSlots();
  const groupedSlots = groupSlotsByDate(filteredSlots);
  const sortedDates = Object.keys(groupedSlots).sort((a, b) => new Date(a) - new Date(b));

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Availability Calendar</h1>
          <p className="page-subtitle">
            Check available time slots and book your perfect party date
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="calendar-filter">
        <div className="container">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
              onClick={() => setFilter('available')}
            >
              Available Slots
            </button>
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Slots
            </button>
            <button
              className={`filter-btn ${filter === 'booked' ? 'active' : ''}`}
              onClick={() => setFilter('booked')}
            >
              Booked
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="calendar-section">
        <div className="container">
          {sortedDates.length === 0 ? (
            <div className="no-slots">
              <div className="no-slots-icon">📅</div>
              <h3>No slots found</h3>
              <p>
                {filter === 'available'
                  ? 'No available slots at the moment. Please check back later or contact us.'
                  : 'No slots match your current filter.'}
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="calendar-grid">
              {sortedDates.map((date) => (
                <div key={date} className="date-group">
                  <div className="date-header">
                    <h3>{date}</h3>
                    <span className="day-of-week">{getDayOfWeek(groupedSlots[date][0].startTime)}</span>
                  </div>
                  <div className="slots-list">
                    {groupedSlots[date].map((slot) => (
                      <div
                        key={slot.id}
                        className={`slot-card ${slot.status}`}
                      >
                        <div className="slot-time">
                          <span className="time-icon">🕐</span>
                          <div>
                            <strong>{formatTime(slot.startTime)}</strong>
                            <span className="time-to">to</span>
                            <strong>{formatTime(slot.endTime)}</strong>
                          </div>
                        </div>

                        <div className="slot-info">
                          {slot.packageName && (
                            <div className="slot-package">
                              <span className="info-label">Package:</span>
                              <span>{slot.packageName}</span>
                            </div>
                          )}
                        </div>

                        <div className="slot-status">
                          {slot.status === 'available' ? (
                            <>
                              <span className="status-badge available">Available</span>
                              <Link to="/contact" className="btn btn-primary btn-sm">
                                Book Now
                              </Link>
                            </>
                          ) : slot.status === 'booked' ? (
                            <span className="status-badge booked">Booked</span>
                          ) : (
                            <span className="status-badge pending">Pending</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="calendar-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h4>Need a Custom Time?</h4>
              <p>Don't see a time that works for you? Contact us to discuss custom scheduling options.</p>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
            <div className="info-card">
              <div className="info-icon">📋</div>
              <h4>Plan Your Party</h4>
              <p>Use our calculator to estimate costs and explore our packages before booking.</p>
              <Link to="/calculator" className="btn btn-outline">
                Price Calculator
              </Link>
            </div>
            <div className="info-card">
              <div className="info-icon">🎉</div>
              <h4>View Packages</h4>
              <p>Explore our party packages to find the perfect celebration for your child.</p>
              <Link to="/packages" className="btn btn-outline">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
