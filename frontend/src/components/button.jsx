// Button.jsx
import React from 'react';

const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-700',
    secondary: 'bg-green-500 text-white hover:bg-green-600',
    ghost: 'bg-transparent hover:bg-gray-200 text-gray-700',
    link: 'text-blue-500 underline hover:text-blue-700',
  };

  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
