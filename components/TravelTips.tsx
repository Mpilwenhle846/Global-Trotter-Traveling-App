import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { travelTips } from '../constants/mockData';
import { GlobeAltIcon } from './icons';

export const TravelTips: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % travelTips.length);
    }, 7000); // Change tip every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTip = travelTips[currentIndex];

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-dark-border"
            >
                <div className="flex justify-center items-center mb-4">
                   <GlobeAltIcon className="h-8 w-8 text-brand-accent mr-3" />
                   <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-dark-text-primary">{currentTip.title}</h3>
                </div>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="text-lg text-gray-600 dark:text-dark-text-secondary min-h-[56px] flex items-center justify-center"
                    >
                        {currentTip.tip}
                    </motion.p>
                </AnimatePresence>
            </motion.div>
        </div>
    </section>
  );
};