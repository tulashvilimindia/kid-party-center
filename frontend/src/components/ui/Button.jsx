import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}) => {
  const classes = [
    'star-btn',
    `star-btn-${variant}`,
    `star-btn-${size}`,
    fullWidth ? 'star-btn-full' : '',
    disabled ? 'star-btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon && iconPosition === 'left' && <span className="star-btn-icon">{icon}</span>}
      <span className="star-btn-text">{children}</span>
      {icon && iconPosition === 'right' && <span className="star-btn-icon">{icon}</span>}
    </button>
  );
};

export default Button;
