import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Packages API
export const getPackages = async () => {
  try {
    const response = await api.get('/packages?populate=*');
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

export const getPackageBySlug = async (slug) => {
  try {
    const response = await api.get(`/packages?filters[slug][$eq]=${slug}&populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

// Menu Items API
export const getMenuItems = async () => {
  try {
    const response = await api.get('/menu-items?populate=*');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const getMenuItemsByCategory = async (category) => {
  try {
    const response = await api.get(`/menu-items?filters[category][$eq]=${category}&populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    throw error;
  }
};

// Party Slots API
export const getPartySlots = async (startDate, endDate) => {
  try {
    let url = '/party-slots?populate=*&sort=date:asc,startTime:asc';

    if (startDate) {
      url += `&filters[date][$gte]=${startDate}`;
    }
    if (endDate) {
      url += `&filters[date][$lte]=${endDate}`;
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching party slots:', error);
    throw error;
  }
};

export const getAvailableSlots = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await api.get(`/party-slots?filters[date][$gte]=${today}&filters[status][$ne]=booked&populate=*&sort=date:asc`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
};

// Gallery API
export const getGalleryImages = async () => {
  try {
    const response = await api.get('/gallery-images?populate=*');
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
};

// Site Settings API
export const getSiteSettings = async () => {
  try {
    const response = await api.get('/site-setting?populate=*');
    return response.data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    throw error;
  }
};

// Contact Form API
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact-submissions', { data: formData });
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export default api;
