import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}) => {
  const classes = [
    'star-card',
    `star-card-${variant}`,
    hover ? 'star-card-hover' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
