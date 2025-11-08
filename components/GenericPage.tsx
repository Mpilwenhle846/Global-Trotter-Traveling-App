import React, { useState, useMemo } from 'react';
// FIX: Import Variants type from framer-motion to resolve typing error.
import { motion, Variants } from 'framer-motion';
import { Item, ItemType, Review } from '../types';
import { StarIcon, MapPinIcon } from './icons';
import { BookingModal } from './BookingModal';

interface GenericCardProps {
  item: Item;
  itemType: ItemType;
  onBook: (item: Item) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// FIX: Explicitly type itemVariants with Variants to fix type incompatibility for the 'ease' property.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const GenericCard: React.FC<GenericCardProps> = ({ item, itemType, onBook }) => {
    return (
        <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-black/20 overflow-hidden group flex flex-col border border-transparent dark:border-dark-border"
            whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
        >
            <div className="relative h-56">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-brand-accent text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
                    ZAR {item.priceZAR.toLocaleString()}
                </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-dark-text-primary">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
                    <MapPinIcon className="h-4 w-4 mr-1"/>
                    <span>{item.location}</span>
                </div>
                <div className="flex items-center my-3">
                    <div className="flex">
                       {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(item.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-dark-text-primary">{item.rating.toFixed(1)} ({item.reviews.length} reviews)</span>
                </div>
                <p className="text-gray-600 dark:text-dark-text-secondary text-sm mb-4 flex-grow">{item.description.short}</p>
                <motion.button 
                    onClick={() => onBook(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-brand-accent hover:bg-brand-accent-dark text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                    Book Now
                </motion.button>
            </div>
        </motion.div>
    );
};


interface GenericPageProps {
  title: string;
  items: Item[];
  itemType: ItemType;
  searchQuery: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title, items, itemType, searchQuery }) => {
  const [bookingItem, setBookingItem] = useState<Item | null>(null);
  const [sortOption, setSortOption] = useState('relevance');

  const filteredAndSortedItems = useMemo(() => {
    let processedItems = items.filter(item => {
      const lowercasedQuery = searchQuery.toLowerCase().trim();
      if (!lowercasedQuery) return true;

      return (
        item.title.toLowerCase().includes(lowercasedQuery) ||
        item.location.toLowerCase().includes(lowercasedQuery) ||
        item.description.short.toLowerCase().includes(lowercasedQuery) ||
        item.description.long.toLowerCase().includes(lowercasedQuery)
      );
    });

    switch (sortOption) {
        case 'price-asc':
            processedItems.sort((a, b) => a.priceZAR - b.priceZAR);
            break;
        case 'price-desc':
            processedItems.sort((a, b) => b.priceZAR - a.priceZAR);
            break;
        case 'rating-desc':
            processedItems.sort((a, b) => b.rating - a.rating);
            break;
        case 'relevance':
        default:
            break;
    }
    
    return processedItems;

  }, [items, searchQuery, sortOption]);

  return (
    <div className="bg-gray-100 dark:bg-dark-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-gray-800 dark:text-dark-text-primary">{title}</h2>
        
        <div className="mb-8 flex justify-end">
            <div className="flex items-center gap-2">
                <label htmlFor="sortOption" className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Sort by:</label>
                <select id="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent">
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                </select>
            </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAndSortedItems.map((item) => (
            <GenericCard key={item.id} item={item} itemType={itemType} onBook={setBookingItem} />
          ))}
          {filteredAndSortedItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center col-span-full py-16"
            >
              <h3 className="text-2xl font-serif text-gray-700 dark:text-dark-text-secondary">No results found for "{searchQuery}"</h3>
              <p className="text-gray-500 dark:text-dark-text-secondary mt-2">Try searching for something else.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
      <BookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
    </div>
  );
};