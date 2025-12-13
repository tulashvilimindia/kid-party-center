import axios from 'axios';
import i18n from '../i18n/i18n';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get current locale
// Normalizes locale codes: en-US → en, ka-GE → ka, ru-RU → ru
const getLocale = () => {
  const lang = i18n.language || 'en';

  // Normalize language codes to match database locales
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('ka')) return 'ka';
  if (lang.startsWith('ru')) return 'ru';

  return 'en'; // Fallback to English
};

// Packages API
export const getPackages = async () => {
  try {
    const locale = getLocale();
    const response = await api.get(`/packages?populate=*&locale=${locale}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

export const getPackageBySlug = async (slug) => {
  try {
    const locale = getLocale();
    const response = await api.get(`/packages?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

// Menu Items API
export const getMenuItems = async () => {
  try {
    const locale = getLocale();
    const response = await api.get(`/menu-items?populate=*&locale=${locale}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const getMenuItemsByCategory = async (category) => {
  try {
    const locale = getLocale();
    const response = await api.get(`/menu-items?filters[category][$eq]=${category}&populate=*&locale=${locale}`);
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
    // No locale needed - galleries content type doesn't have internationalization
    const response = await api.get(`/galleries?populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching galleries:', error);
    throw error;
  }
};

// Site Settings API
export const getSiteSettings = async () => {
  try {
    const locale = getLocale();
    const response = await api.get(`/site-setting?populate=*&locale=${locale}`);
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

// Navigation Menu API
export const getNavigationMenu = async () => {
  try {
    const locale = getLocale();
    const response = await api.get(`/navigations?populate=*&locale=${locale}&filters[isActive][$eq]=true&sort=order:asc`);
    return response.data;
  } catch (error) {
    console.error('Error fetching navigation menu:', error);
    throw error;
  }
};

// Header Menu API
export const getHeaderMenu = async () => {
  try {
    const locale = getLocale();
    const response = await api.get(`/headermenus?locale=${locale}&filters[isActive][$eq]=true&sort=order:asc&pagination[pageSize]=100`);
    return response.data;
  } catch (error) {
    console.error('Error fetching header menu:', error);
    throw error;
  }
};

// Social Links API
export const getSocialLinks = async () => {
  try {
    const locale = getLocale();
    const response = await api.get(`/socials?populate=*&locale=${locale}&filters[isActive][$eq]=true&sort=order:asc`);
    return response.data;
  } catch (error) {
    console.error('Error fetching social links:', error);
    throw error;
  }
};

// Footer API
export const getFooter = async () => {
  try {
    const locale = getLocale();
    const response = await api.get(`/footer?locale=${locale}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching footer:', error);
    throw error;
  }
};

export default api;
