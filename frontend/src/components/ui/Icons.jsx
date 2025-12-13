import React from 'react';

// Menu Icons Component - Maps icon names to SVG or emoji icons
const Icons = ({ name, size = 24, className = '' }) => {
  const iconMap = {
    // Navigation Icons
    'home': '🏠',
    'packages': '🎁',
    'calculator': '🧮',
    'calendar': '📅',
    'gallery': '📸',
    'about': 'ℹ️',
    'contact': '📞',
    'faq': '❓',

    // Action Icons
    'book': '📖',
    'phone': '📞',
    'email': '✉️',
    'location': '📍',
    'whatsapp': '💬',

    // Feature Icons
    'star': '⭐',
    'party': '🎉',
    'balloon': '🎈',
    'cake': '🎂',
    'gift': '🎁',
    'confetti': '🎊',
    'sparkles': '✨',
    'music': '🎵',
    'games': '🎮',
    'art': '🎨',
    'sports': '⚽',
    'magic': '✨',

    // Status Icons
    'check': '✓',
    'close': '✕',
    'warning': '⚠️',
    'info': 'ℹ️',

    // Social Icons
    'facebook': '📘',
    'instagram': '📷',
    'twitter': '🐦',

    // Language Icons
    'en': '🇬🇧',
    'ka': '🇬🇪',
    'ru': '🇷🇺',
  };

  const icon = iconMap[name?.toLowerCase()] || iconMap['star'];

  return (
    <span
      className={`star-icon ${className}`}
      style={{ fontSize: `${size}px` }}
      role="img"
      aria-label={name}
    >
      {icon}
    </span>
  );
};

// Star SVG Logo Component
export const StarLogo = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="url(#star-gradient)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="star-gradient" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icons;
