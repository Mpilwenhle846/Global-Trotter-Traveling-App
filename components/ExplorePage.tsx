import React, { useState, useMemo } from 'react';
// FIX: Import Variants type from framer-motion to resolve typing error.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { exploreItems } from '../constants/mockData';
import { ExploreItem, Review } from '../types';
import { XMarkIcon, StarIcon, MapPinIcon } from './icons';
import { BookingModal } from './BookingModal';

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// FIX: Explicitly type itemVariants with Variants to fix type incompatibility for the 'ease' property.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const ExploreCard: React.FC<{ item: ExploreItem, onSelect: (item: ExploreItem) => void }> = ({ item, onSelect }) => (
    <motion.div
        variants={itemVariants}
        className="relative h-96 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/20 group cursor-pointer"
        onClick={() => onSelect(item)}
        whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
    >
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <div className="flex space-x-2 mb-2">
                {item.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-white/20 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full uppercase">{tag}</span>
                ))}
            </div>
            <h3 className="text-2xl font-bold font-serif">{item.title}</h3>
            <p className="text-sm opacity-90">{item.location}</p>
        </div>
    </motion.div>
);

const DetailModal: React.FC<{ item: ExploreItem, onClose: () => void, onBook: (item: ExploreItem) => void }> = ({ item, onClose, onBook }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white dark:bg-dark-surface rounded-2xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden flex flex-col border border-transparent dark:border-dark-border"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative h-64 md:h-80">
                    <img src={item.images[1]} alt={item.title} className="w-full h-full object-cover" />
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 p-2 rounded-full hover:bg-white/80 dark:hover:bg-black/80 transition-colors">
                        <XMarkIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto flex-grow">
                    <h2 className="text-3xl font-bold font-serif text-gray-800 dark:text-dark-text-primary">{item.title}</h2>
                    <div className="flex items-center text-gray-500 dark:text-dark-text-secondary mt-2">
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        <span>{item.location}</span>
                    </div>
                     <div className="flex items-center my-4">
                        <div className="flex">
                           {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(item.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-dark-text-primary">{item.rating.toFixed(1)} ({item.reviews.length} reviews)</span>
                    </div>
                    <p className="text-gray-600 dark:text-dark-text-primary my-4">{item.description.long}</p>
                    
                    <h3 className="text-xl font-bold font-serif mt-6 mb-4 text-gray-800 dark:text-dark-text-primary">Reviews</h3>
                    <div className="space-y-4">
                        {item.reviews.map((review, i) => (
                            <div key={i} className="bg-gray-100 dark:bg-dark-bg p-4 rounded-lg border border-gray-200 dark:border-dark-border">
                                <p className="font-semibold text-gray-800 dark:text-dark-text-primary">{review.name}</p>
                                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{review.date}</p>
                                <p className="text-gray-700 dark:text-dark-text-secondary mt-2 text-sm">"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-dark-surface/50 border-t border-gray-200 dark:border-dark-border flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Price per person</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary">ZAR {item.priceZAR.toLocaleString()}</p>
                    </div>
                    <motion.button 
                        onClick={() => { onClose(); onBook(item); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-brand-accent hover:bg-brand-accent-dark text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                    >
                        Book This Experience
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

interface ExplorePageProps {
  searchQuery: string;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ searchQuery }) => {
    const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
    const [bookingItem, setBookingItem] = useState<ExploreItem | null>(null);

    const [sortOption, setSortOption] = useState('popularity');
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minRating: 0,
        selectedTags: [] as string[],
    });

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        exploreItems.forEach(item => item.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: name === 'minRating' ? Number(value) : value }));
    };

    const toggleTag = (tag: string) => {
        setFilters(prev => ({
            ...prev,
            selectedTags: prev.selectedTags.includes(tag)
                ? prev.selectedTags.filter(t => t !== tag)
                : [...prev.selectedTags, tag]
        }));
    };

    const filteredAndSortedItems = useMemo(() => {
        let processedItems = exploreItems.filter(item => {
            const lowercasedQuery = searchQuery.toLowerCase().trim();
            if (!lowercasedQuery) return true;
            
            const hasTag = item.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery));
            
            return (
                item.title.toLowerCase().includes(lowercasedQuery) ||
                item.location.toLowerCase().includes(lowercasedQuery) ||
                item.description.short.toLowerCase().includes(lowercasedQuery) ||
                item.description.long.toLowerCase().includes(lowercasedQuery) ||
                hasTag
            );
        });

        processedItems = processedItems.filter(item => {
            const minPrice = parseFloat(filters.minPrice);
            const maxPrice = parseFloat(filters.maxPrice);
            if (!isNaN(minPrice) && item.priceZAR < minPrice) return false;
            if (!isNaN(maxPrice) && item.priceZAR > maxPrice) return false;
            if (filters.minRating > 0 && item.rating < filters.minRating) return false;
            if (filters.selectedTags.length > 0 && !filters.selectedTags.every(tag => item.tags.includes(tag))) return false;
            return true;
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
            case 'popularity':
            default:
                break;
        }

        return processedItems;
    }, [searchQuery, filters, sortOption]);

    return (
        <div className="bg-gray-50 dark:bg-dark-bg py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-gray-800 dark:text-dark-text-primary">Explore a World of Wonder</h2>
                
                <div className="bg-white dark:bg-dark-surface p-4 rounded-xl shadow-md mb-12 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                        {/* Sorting */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="sortOption" className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Sort by:</label>
                            <select id="sortOption" name="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent">
                                <option value="popularity">Popularity</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating-desc">Rating: High to Low</option>
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div className="flex items-center gap-2">
                             <label className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Price (ZAR):</label>
                            <input type="number" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleFilterChange} className="w-24 bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent" />
                            <input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleFilterChange} className="w-24 bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent" />
                        </div>
                        
                        {/* Rating Filter */}
                        <div className="flex items-center gap-2">
                             <label htmlFor="minRating" className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Rating:</label>
                            <select id="minRating" name="minRating" value={filters.minRating} onChange={handleFilterChange} className="bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent">
                                <option value="0">Any</option>
                                <option value="4">4+ Stars</option>
                                <option value="3">3+ Stars</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200 dark:border-dark-border">
                         <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Tags:</span>
                        {allTags.map(tag => (
                            <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 text-sm rounded-full transition-colors capitalize ${filters.selectedTags.includes(tag) ? 'bg-brand-accent text-gray-900 font-semibold' : 'bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-dark-bg/70'}`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredAndSortedItems.map(item => (
                        <ExploreCard key={item.id} item={item} onSelect={setSelectedItem} />
                    ))}
                </motion.div>
                
                {filteredAndSortedItems.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center col-span-full py-16"
                  >
                    <h3 className="text-2xl font-serif text-gray-700 dark:text-dark-text-secondary">No matching experiences found</h3>
                    <p className="text-gray-500 dark:text-dark-text-secondary mt-2">Try adjusting your filters or search query.</p>
                  </motion.div>
                )}
            </div>
            <AnimatePresence>
                {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onBook={setBookingItem} />}
            </AnimatePresence>
            <BookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
        </div>
    );
};