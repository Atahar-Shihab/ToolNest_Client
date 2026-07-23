'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ label = 'Discovering AI Tools...', size = 'md' }: LoadingSpinnerProps) {
  const containerSizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 18,
    md: 28,
    lg: 40
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          className={`${containerSizes[size]} rounded-full border-4 border-transparent border-t-primary border-r-secondary shadow-[0_0_30px_rgba(0,212,255,0.4)]`}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
        
        {/* Inner reverse spinning ring */}
        <motion.div
          className={`absolute ${containerSizes[size]} scale-75 rounded-full border-4 border-transparent border-b-secondary border-l-primary`}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />

        {/* Pulsing center icon */}
        <motion.div
          className="absolute text-primary"
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <Sparkles size={iconSizes[size]} />
        </motion.div>
      </div>

      {label && (
        <motion.p
          className="text-muted font-medium text-sm md:text-base tracking-wide flex items-center gap-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span>{label}</span>
        </motion.p>
      )}
    </div>
  );
}
