import React from 'react';
import './Badge.css';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const classes = [
    'star-badge',
    `star-badge-${variant}`,
    `star-badge-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {icon && <span className="star-badge-icon">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
