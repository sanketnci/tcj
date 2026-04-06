'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-xs sm:text-sm font-medium text-text-dark-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-b-2 text-text-dark placeholder:text-text-dark-secondary/50 transition-colors focus:outline-none text-sm sm:text-base',
            error ? 'border-red-500' : 'border-glass-border focus:border-accent-gold',
            className
          )}
          {...props}
        />
        {error && (
          <motion.span
            className="block mt-2 text-xs sm:text-sm text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-xs sm:text-sm font-medium text-text-dark-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={5}
          className={cn(
            'w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-b-2 text-text-dark placeholder:text-text-dark-secondary/50 transition-colors focus:outline-none resize-none text-sm sm:text-base',
            error ? 'border-red-500' : 'border-glass-border focus:border-accent-gold',
            className
          )}
          {...props}
        />
        {error && (
          <motion.span
            className="block mt-2 text-xs sm:text-sm text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
