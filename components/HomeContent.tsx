import React, { useState } from 'react';
// FIX: Import Variants type from framer-motion to resolve typing error.
import { motion, Variants } from 'framer-motion';
import { featuredHotels, featuredPlaces, featuredCars, testimonials } from '../constants/mockData';
import { Item, Testimonial, ExploreItem } from '../types';
import { StarIcon, PaperAirplaneIcon, CheckCircleIcon } from './icons';
import { TravelTips } from './TravelTips';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// FIX: Explicitly type itemVariants with Variants to fix type incompatibility for the 'ease' property.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const FeaturedCard: React.FC<{ item: Item & { popularity: string } }> = ({ item }) => {
    // Type guard to check if the item is an ExploreItem
    const isExploreItem = 'tags' in item;

    return (
        <motion.div
            variants={itemVariants}
            className="relative flex-shrink-0 w-80 h-96 rounded-xl overflow-hidden shadow-lg dark:shadow-black/20 group"
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
        >
            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                {/* Conditionally render tags for ExploreItems */}
                {isExploreItem && (
                    <div className="flex space-x-2 mb-2">
                        {(item as ExploreItem).tags.slice(0, 2).map(tag => (
                            <span key={tag} className="bg-white/20 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full uppercase">{tag}</span>
                        ))}
                    </div>
                )}
                <h3 className="text-xl font-bold font-serif">{item.title}</h3>
                <p className="text-sm opacity-90">{item.location}</p>
                <p className="mt-2 text-xs font-bold bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block">{item.popularity}</p>
            </div>
        </motion.div>
    );
};

const FeaturedSection: React.FC<{ title: string; items: (Item & { popularity: string })[] }> = ({ title, items }) => {
    const duplicatedItems = [...items, ...items];
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-gray-800 dark:text-dark-text-primary">{title}</motion.h2>
            <div className="relative w-full overflow-hidden group">
                <div className="animate-marquee space-x-6">
                    {duplicatedItems.map((item, index) => (
                        // The item itself is a motion component, so no need for an inner motion.div
                        <FeaturedCard key={`${item.id}-${index}`} item={item} />
                    ))}
                </div>
                <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-100 dark:from-dark-bg to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-100 dark:from-dark-bg to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-dark-border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
        <div className="flex items-center mb-4">
            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-brand-accent" />
            <div>
                <p className="font-bold text-lg text-gray-800 dark:text-dark-text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{testimonial.location}</p>
            </div>
        </div>
        <p className="text-gray-600 dark:text-dark-text-primary italic">"{testimonial.quote}"</p>
        <div className="flex mt-4">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-400" />)}
        </div>
    </motion.div>
);


export const HomeContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setIsSubmitted(true);
      }
  };

  return (
    <>
      <section className="pt-20 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FeaturedSection title="Featured & Popular Right Now" items={[...featuredHotels, ...featuredPlaces, ...featuredCars]} />
        </div>
      </section>
      
      <TravelTips />

      <section className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center text-gray-800 dark:text-dark-text-primary">What Our Travelers Say</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white dark:bg-dark-surface py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
              >
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-800 dark:text-dark-text-primary">Stay Ahead of the Curve</h2>
                  <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
                      Join our newsletter for exclusive updates, curated travel guides, and a <strong className="font-semibold text-brand-accent">10% discount</strong> on your first flight booking.
                  </p>

                  {isSubmitted ? (
                      <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-center gap-2 text-green-500"
                      >
                          <CheckCircleIcon className="h-8 w-8" />
                          <p className="text-lg font-semibold">Thank you for subscribing!</p>
                      </motion.div>
                  ) : (
                      <form onSubmit={handleSubmit} className="flex items-center max-w-lg mx-auto bg-gray-100 dark:bg-dark-bg p-2 rounded-full shadow-inner">
                          <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="flex-grow bg-transparent rounded-full py-3 px-6 focus:outline-none text-gray-800 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-secondary"
                              aria-label="Email Address for newsletter"
                              required
                          />
                          <motion.button
                              type="submit"
                              whileTap={{ scale: 0.95 }}
                              whileHover={{ scale: 1.05 }}
                              className="bg-brand-accent text-gray-900 rounded-full p-3 ml-2 hover:bg-brand-accent-dark transition-colors"
                              aria-label="Submit email"
                          >
                              <PaperAirplaneIcon className="h-6 w-6" />
                          </motion.button>
                      </form>
                  )}
              </motion.div>
          </div>
      </section>
    </>
  );
};