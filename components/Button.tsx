'use client';
import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  disabled = false,
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-bold transition-all relative overflow-hidden cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-2xl rounded-lg',     // text-sm → text-base
    md: 'px-7 py-3.5 text-3xl rounded-xl',       // text-base → text-lg
    lg: 'px-9 py-4 text-5xl rounded-2xl',       // text-lg → text-xl
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#FF6B9D] via-[#FEC163] to-[#FFD93D] text-white shadow-lg shadow-[#FF6B9D]/30 hover:shadow-xl hover:shadow-[#FF6B9D]/40',
    secondary:
      'bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#F093FB] text-white shadow-lg shadow-[#667EEA]/30 hover:shadow-xl hover:shadow-[#667EEA]/40',
  };

  const disabledStyle = 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-lg';

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={clsx(
        baseStyle,
        sizeStyles[size],
        variantStyles[variant],
        disabled && disabledStyle,
        className
      )}
      whileHover={
        !disabled
          ? {
              scale: 1.02,
              y: -2,
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              scale: 0.98,
              y: 0,
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={!disabled ? { opacity: 0.1 } : {}}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
