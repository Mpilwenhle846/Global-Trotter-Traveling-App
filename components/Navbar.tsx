
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../types';
import { SunIcon, MoonIcon, GlobeAltIcon, XMarkIcon, Bars3Icon } from './icons';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const navItems: Page[] = ['Home', 'Flights', 'Hotels', 'Cars', 'Explore'];

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, isDarkMode, setIsDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  }

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
    ? 'py-3 bg-white/50 dark:bg-dark-bg/70 backdrop-blur-lg shadow-xl dark:shadow-black/20' 
    : 'py-6 bg-transparent'
  }`;

  return (
    <>
      <motion.nav
        className={navClasses}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-2">
          <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white cursor-pointer" onClick={() => setActivePage('Home')}>
            Global Trotter
          </h1>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative font-medium text-gray-700 dark:text-dark-text-secondary hover:text-brand-accent-dark dark:hover:text-brand-accent transition-colors"
              >
                {item}
                {activePage === item && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent-dark dark:bg-brand-accent"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 p-2 rounded-full bg-white/50 dark:bg-dark-surface/50 hover:bg-white/70 dark:hover:bg-dark-surface/70 transition-colors">
              <GlobeAltIcon className="h-5 w-5 text-gray-700 dark:text-dark-text-secondary" />
              <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">ZAR</span>
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white/50 dark:bg-dark-surface/50 hover:bg-white/70 dark:hover:bg-dark-surface/70 transition-colors"
            >
              {isDarkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-gray-700" />}
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white" /> : <Bars3Icon className="h-6 w-6 text-gray-900 dark:text-white" />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full h-screen bg-gray-100/95 dark:bg-dark-bg/95 backdrop-blur-lg z-40 pt-24 px-8"
          >
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-3xl font-serif text-gray-800 dark:text-dark-text-primary"
                >
                  {item}
                </button>
              ))}
              <div className="pt-8 flex items-center space-x-6">
                <button className="flex items-center space-x-2 p-3 rounded-full bg-white/50 dark:bg-dark-surface/50">
                  <GlobeAltIcon className="h-6 w-6 text-gray-700 dark:text-dark-text-secondary" />
                  <span className="text-md font-medium text-gray-700 dark:text-dark-text-secondary">ZAR</span>
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-3 rounded-full bg-white/50 dark:bg-dark-surface/50"
                >
                  {isDarkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-gray-700" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
