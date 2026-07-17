import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertTriangle, Info } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: X,
  warning: AlertTriangle,
  info: Info
};

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-primary-light border-primary/30 text-primary-dark',
  info: 'bg-accent-light border-accent/30 text-accent-dark'
};

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-primary',
  info: 'text-accent'
};

export default function Toast({ message, type = 'info', isVisible, onClose, duration = 4000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const Icon = iconMap[type] || Info;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90vw]"
        >
          <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-md ${colorMap[type]}`}>
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColorMap[type]}`} />
            <p className="text-sm font-medium flex-1 leading-relaxed">{message}</p>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer flex-shrink-0"
            >
              <X className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for easy toast usage
export function useToast() {
  const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });

  const showToast = (message, type = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return { toast, showToast, hideToast };
}
