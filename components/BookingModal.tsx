import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Item } from '../types';
import { XMarkIcon, CheckCircleIcon, ArrowPathIcon } from './icons';

interface BookingModalProps {
  item: Item | null;
  onClose: () => void;
}

type BookingStep = 'details' | 'loading' | 'success';

export const BookingModal: React.FC<BookingModalProps> = ({ item, onClose }) => {
  const [step, setStep] = useState<BookingStep>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    if (item) {
      setStep('details');
      // Reset form when modal opens with a new item
      setName('');
      setEmail('');
    }
  }, [item]);
  
  // Validate form inputs
  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsFormValid(name.trim() !== '' && isEmailValid);
  }, [name, email]);

  const handleBook = () => {
    if (!isFormValid) return;
    setStep('loading');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };
  
  const handleClose = () => {
      setStep('details');
      onClose();
  }

  const renderContent = () => {
    switch (step) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-800 dark:text-dark-text-primary">
            <ArrowPathIcon className="h-16 w-16 animate-spin text-brand-accent" />
            <p className="mt-4 text-xl font-semibold">Confirming your booking...</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-800 dark:text-dark-text-primary p-6">
            <CheckCircleIcon className="h-20 w-20 text-green-500" />
            <h3 className="mt-4 text-2xl font-bold font-serif">Booking Confirmed!</h3>
            <p className="mt-2 text-gray-600 dark:text-dark-text-secondary">A confirmation for your demo booking for <strong className="font-semibold">{item?.title}</strong> would be sent to <strong className="font-semibold">{email}</strong>.</p>
            <p className="mt-4 bg-gray-100 dark:bg-dark-bg p-3 rounded-lg font-mono text-sm">
              Booking Reference: DEMO-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <button
              onClick={handleClose}
              className="mt-6 w-full bg-brand-accent hover:bg-brand-accent-dark text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Close
            </button>
          </div>
        );
      case 'details':
      default:
        return (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h2 className="text-2xl font-bold font-serif text-gray-800 dark:text-dark-text-primary">Confirm Your Booking</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg">
                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-dark-text-secondary" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex items-start space-x-4 mb-6">
                <img src={item?.images[0]} alt={item?.title} className="w-24 h-24 rounded-lg object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-dark-text-primary">{item?.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{item?.location}</p>
                  <p className="text-xl font-bold text-brand-accent mt-2">ZAR {item?.priceZAR.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-dark-text-primary mb-2">Your Information</h4>
                <div className="space-y-3">
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Full Name</label>
                      <input 
                          type="text" 
                          id="name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Doe"
                          className="mt-1 block w-full bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
                          aria-label="Full Name"
                      />
                  </div>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Email Address</label>
                      <input 
                          type="email" 
                          id="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex.doe@example.com"
                          className="mt-1 block w-full bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
                          aria-label="Email Address"
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 mt-auto bg-gray-50 dark:bg-dark-surface/50 border-t border-gray-200 dark:border-dark-border">
              <motion.button
                onClick={handleBook}
                whileHover={isFormValid ? { scale: 1.05 } : {}}
                whileTap={isFormValid ? { scale: 0.95 } : {}}
                disabled={!isFormValid}
                className="w-full bg-brand-accent hover:bg-brand-accent-dark text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book (Demo)
              </motion.button>
            </div>
          </>
        );
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={onClose} // Allow closing by clicking backdrop
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-dark-surface rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-transparent dark:border-dark-border"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};