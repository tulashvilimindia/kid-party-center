import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPartySlots } from '../services/api';
import './Calendar.css';

const Calendar = () => {
  console.log('🎯 Calendar component rendering');

  const { t, i18n } = useTranslation('calendar');
  const { lang } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('available');
  const hasFetched = useRef(false);

  const currentLang = lang || i18n.language || 'en';

  useEffect(() => {
    // Reset fetch flag when language changes
    hasFetched.current = false;

    const fetchSlots = async () => {
      // Prevent duplicate fetches in StrictMode
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const response = await getPartySlots();

        // Strapi v5 returns data directly in response.data array
        let slotsData = response.data || [];

        console.log('=== RAW API RESPONSE ===');
        console.log('Full response:', response);
        console.log('Slots data:', slotsData);
        console.log('Number of slots:', slotsData.length);
        if (slotsData.length > 0) {
          console.log('First slot sample:', slotsData[0]);
        }

        // Filter for published slots
        const publishedSlots = slotsData.filter(slot => slot.publishedAt) || [];

        console.log('Published slots:', publishedSlots);
        console.log('Number of published slots:', publishedSlots.length);

        setSlots(publishedSlots);
      } catch (error) {
        console.error('Error fetching slots:', error);
        // Set empty array on error
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [i18n.language]);

  const getFilteredSlots = () => {
    const now = new Date();

    console.log('=== FILTERING SLOTS ===');
    console.log('Current filter:', filter);
    console.log('Total slots to filter:', slots.length);
    console.log('Current time:', now);

    const filtered = slots.filter(slot => {
      console.log('\n--- Filtering slot ---');
      console.log('Slot:', slot);

      // Handle both formats: combined datetime or separate date/time fields
      let slotDate;

      if (slot.date && slot.startTime) {
        // Combine date and startTime fields
        const combinedDateTime = `${slot.date}T${slot.startTime}`;
        console.log('Combined datetime string:', combinedDateTime);
        slotDate = new Date(combinedDateTime);
        console.log('Parsed slotDate:', slotDate);
      } else if (slot.startTime) {
        // Try parsing startTime directly
        slotDate = new Date(slot.startTime);
        console.log('Parsed startTime directly:', slotDate);
      } else {
        console.log('❌ No date/startTime found');
        return false;
      }

      // Filter out past slots
      if (isNaN(slotDate.getTime())) {
        console.log('❌ Invalid date');
        return false;
      }

      if (slotDate < now) {
        console.log('❌ Past slot');
        return false;
      }

      console.log('✅ Slot is in future');

      // Apply status filter
      if (filter === 'available') {
        const passes = slot.status === 'available' || slot.status === 'limited';
        console.log(`Filter check (available): ${passes} (status: ${slot.status})`);
        return passes;
      }
      if (filter === 'booked') {
        const passes = slot.status === 'booked';
        console.log(`Filter check (booked): ${passes} (status: ${slot.status})`);
        return passes;
      }

      console.log('✅ Passes all filters (showing all)');
      return true;
    });

    console.log('\n=== FILTERED RESULT ===');
    console.log('Filtered slots count:', filtered.length);
    console.log('Filtered slots:', filtered);

    return filtered;
  };

  const groupSlotsByDate = (slotsToGroup) => {
    const grouped = {};

    console.log('=== GROUPING SLOTS ===');
    console.log('Number of slots to group:', slotsToGroup.length);

    slotsToGroup.forEach((slot, index) => {
      console.log(`\n--- Processing slot ${index + 1} ---`);
      console.log('Slot data:', slot);
      console.log('slot.date value:', slot.date);
      console.log('slot.date type:', typeof slot.date);

      // Get the date for grouping
      if (!slot.date) {
        console.error('❌ No date found for slot:', slot);
        return;
      }

      // Parse date with explicit time to avoid timezone issues
      // Format is "2025-12-16", add time component
      const dateStr = slot.date + 'T00:00:00';
      console.log('Date string for parsing:', dateStr);

      const dateObj = new Date(dateStr);
      console.log('Date object created:', dateObj);
      console.log('Date object time:', dateObj.getTime());

      if (isNaN(dateObj.getTime())) {
        console.error('❌ Invalid date object for:', slot.date);
        return;
      }

      const displayDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      console.log('✅ Display date:', displayDate);

      if (!grouped[displayDate]) {
        grouped[displayDate] = [];
      }

      grouped[displayDate].push(slot);
    });

    console.log('\n=== FINAL GROUPED RESULT ===');
    console.log('Grouped slots:', grouped);

    // Sort slots within each date by startTime
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => {
        const timeA = a.startTime || '00:00';
        const timeB = b.startTime || '00:00';
        return timeA.localeCompare(timeB);
      });
    });

    return grouped;
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';

    // If it's just a time string (HH:MM:SS or HH:MM), format it directly
    if (typeof timeString === 'string' && timeString.match(/^\d{2}:\d{2}/)) {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour.toString().padStart(2, '0')}:${minutes} ${period}`;
    }

    // Try parsing as a full datetime
    const date = new Date(timeString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }

    return 'Invalid Time';
  };

  const getDayOfWeek = (slot) => {
    if (!slot || !slot.date) return '';

    // Parse the date string (format: "2025-12-16")
    const date = new Date(slot.date + 'T00:00:00');

    if (isNaN(date.getTime())) {
      console.error('Invalid date for day of week:', slot.date);
      return '';
    }

    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const filteredSlots = getFilteredSlots();
  const groupedSlots = groupSlotsByDate(filteredSlots);
  const sortedDates = Object.keys(groupedSlots).sort((a, b) => new Date(a) - new Date(b));

  if (loading) {
    console.log('🔄 LOADING STATE - Component is loading');
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p style={{color: 'white', marginTop: '20px'}}>Loading calendar data...</p>
      </div>
    );
  }

  console.log('✅ RENDER - About to render calendar with', filteredSlots.length, 'slots');

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
              <Link to={`/${currentLang}/contact`} className="btn btn-primary btn-lg">
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="calendar-grid">
              {sortedDates.map((date) => (
                <div key={date} className="date-group">
                  <div className="date-header">
                    <h3>{date}</h3>
                    <span className="day-of-week">{getDayOfWeek(groupedSlots[date][0])}</span>
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
                              <Link to={`/${currentLang}/contact`} className="btn btn-primary btn-sm">
                                Book Now
                              </Link>
                            </>
                          ) : slot.status === 'booked' ? (
                            <span className="status-badge booked">Fully Booked</span>
                          ) : slot.status === 'limited' ? (
                            <>
                              <span className="status-badge limited">Limited Spots</span>
                              <Link to={`/${currentLang}/contact`} className="btn btn-secondary btn-sm">
                                Book Now
                              </Link>
                            </>
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
              <Link to={`/${currentLang}/contact`} className="btn btn-outline">
                Contact Us
              </Link>
            </div>
            <div className="info-card">
              <div className="info-icon">📋</div>
              <h4>Plan Your Party</h4>
              <p>Use our calculator to estimate costs and explore our packages before booking.</p>
              <Link to={`/${currentLang}/calculator`} className="btn btn-outline">
                Price Calculator
              </Link>
            </div>
            <div className="info-card">
              <div className="info-icon">🎉</div>
              <h4>View Packages</h4>
              <p>Explore our party packages to find the perfect celebration for your child.</p>
              <Link to={`/${currentLang}/packages`} className="btn btn-outline">
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
