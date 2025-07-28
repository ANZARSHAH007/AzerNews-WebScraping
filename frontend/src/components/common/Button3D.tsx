import React from 'react';
import { motion } from 'framer-motion';

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const Button3D: React.FC<Button3DProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200',
    secondary: 'bg-red-600 hover:bg-red-700 text-white shadow-red-200',
    accent: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-200'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
        font-semibold rounded-lg shadow-lg border-0 transition-all duration-200
        transform-gpu perspective-1000 disabled:opacity-50 disabled:cursor-not-allowed
      `}
      whileHover={!disabled ? {
        scale: 1.05,
        rotateX: -5,
        rotateY: 5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      } : {}}
      whileTap={!disabled ? {
        scale: 0.95,
        rotateX: 2,
        rotateY: -2
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button3D;