import React from 'react';

type Variant = 'teal' | 'outline-forest' | 'pink' | 'outline';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'teal',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const variantClass = {
    teal: 'btn-teal',
    'outline-forest': 'btn-outline-forest',
    pink: 'btn-pink',
    outline: 'btn-outline',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass} ${fullWidth ? 'w-full justify-center' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
