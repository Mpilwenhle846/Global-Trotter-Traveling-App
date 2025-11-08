
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PaperAirplaneIcon, CheckCircleIcon } from './icons';

export const EmailSignup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('hasSeenEmailPopup');
        // Delay the popup appearing to not be too intrusive
        const timer = setTimeout(() => {
            if (!hasSeenPopup) {
                setIsVisible(true);
            }
        }, 5000); // Popup appears after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenEmailPopup', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // No real validation as per request, just check if not empty
        if (email.trim() !== '') {
            setIsSubmitted(true);
            // Hide after a few seconds
            setTimeout(() => {
                handleClose();
            }, 3000);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "110%", opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                    className="fixed bottom-6 right-6 w-full max-w-md bg-white dark:bg-dark-surface rounded-2xl shadow-2xl z-50 border border-gray-200 dark:border-dark-border overflow-hidden"
                >
                    <button onClick={handleClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg z-10" aria-label="Close newsletter signup">
                        <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-dark-text-secondary" />
                    </button>
                    
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="p-8 flex flex-col items-center justify-center text-center h-full"
                            >
                                <CheckCircleIcon className="h-12 w-12 text-green-500 mb-4" />
                                <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-dark-text-primary">Thank you for submitting!</h3>
                                <p className="text-gray-600 dark:text-dark-text-secondary mt-1">Keep an eye on your inbox for exclusive deals.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="p-8"
                            >
                                <h3 className="text-2xl font-bold font-serif text-gray-800 dark:text-dark-text-primary">Unlock 10% Off</h3>
                                <p className="text-gray-600 dark:text-dark-text-secondary mt-2 mb-4">
                                    Join our newsletter for exclusive updates, the cheapest prices, and a <strong className="font-semibold text-brand-accent">10% discount</strong> on your first flight.
                                </p>
                                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-grow bg-gray-100 dark:bg-dark-bg rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent text-gray-800 dark:text-dark-text-primary"
                                        aria-label="Email Address for newsletter"
                                    />
                                    <motion.button
                                        type="submit"
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-brand-accent text-gray-900 rounded-full p-2"
                                        aria-label="Submit email"
                                    >
                                        <PaperAirplaneIcon className="h-6 w-6" />
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
