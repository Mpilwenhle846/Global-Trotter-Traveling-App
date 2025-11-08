
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroVideos } from '../constants/mockData';
import { Page } from '../types';
import { MagnifyingGlassIcon } from './icons';

interface HeroProps {
  activePage: Page;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => Promise<void>;
}

const heroTexts: Record<Page, { title: string, subtitle: string }> = {
    Home: { title: "Your Journey Begins Here", subtitle: "Discover and book amazing travel experiences worldwide." },
    Flights: { title: "Reach New Heights", subtitle: "Find the best deals on flights to your dream destinations." },
    Hotels: { title: "Rest in Luxury", subtitle: "Book incredible hotels, resorts, and villas." },
    Cars: { title: "Drive Your Adventure", subtitle: "Rent the perfect car to explore at your own pace." },
    Explore: { title: "Discover the Unseen", subtitle: "Browse our curated list of unique tours and activities." },
};

export const Hero: React.FC<HeroProps> = ({ activePage, searchQuery, setSearchQuery, handleSearch }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoIndex((prevIndex) => (prevIndex + 1) % heroVideos.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setVideoError(false);
  }, [videoIndex]);

  const { title, subtitle } = heroTexts[activePage] || heroTexts.Home;

  const onSearch = () => {
    if (searchQuery.trim()) {
        inputRef.current?.blur();
        handleSearch(searchQuery);
    }
  }

  const fallbackImageUrl = 'https://images.unsplash.com/photo-1565741478311-b3e79a17bfe3?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1920';

  return (
    <div className="relative h-screen w-full overflow-hidden bg-dark-bg">
       <AnimatePresence>
        {!videoError ? (
          <motion.video
            key={videoIndex}
            src={heroVideos[videoIndex]}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
          />
        ) : (
          <motion.img
            src={fallbackImageUrl}
            alt="Scenic travel destination"
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <AnimatePresence mode="wait">
            <motion.h1
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-4xl md:text-7xl font-serif font-bold tracking-tight text-shadow"
                 style={{textShadow: '0px 4px 10px rgba(0,0,0,0.5)'}}
            >
                {title}
            </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait">
            <motion.p
                key={subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                className="mt-4 text-lg md:text-2xl max-w-2xl font-light"
                style={{textShadow: '0px 2px 5px rgba(0,0,0,0.5)'}}
            >
                {subtitle}
            </motion.p>
        </AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
          className="mt-10 w-full max-w-3xl"
        >
          <div className="bg-white/10 dark:bg-dark-surface/50 backdrop-blur-lg rounded-full p-2 flex items-center space-x-2 shadow-2xl border border-white/20">
            <input 
              type="text"
              ref={inputRef}
              placeholder="Search for 'Paris', 'Safari', 'Beach'..." 
              className="flex-grow bg-transparent text-white placeholder-gray-300 focus:outline-none px-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch();
                }
              }}
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-accent hover:bg-brand-accent-dark text-gray-900 rounded-full p-3 flex items-center justify-center transition-colors"
              onClick={onSearch}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
