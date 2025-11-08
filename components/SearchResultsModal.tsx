import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Item, Flight, Hotel, Car, ExploreItem, ItemType } from '../types';
import { BookingModal } from './BookingModal';
import { ArrowPathIcon, XMarkIcon, SparklesIcon } from './icons';
import { GenericCard } from './GenericPage';
import { GoogleGenAI } from '@google/genai';


interface SearchResults {
    flights: Flight[];
    hotels: Hotel[];
    cars: Car[];
    exploreItems: ExploreItem[];
}

interface SearchResultsModalProps {
    isOpen: boolean;
    onClose: () => void;
    isLoading: boolean;
    error: string | null;
    results: SearchResults | null;
    searchQuery: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ResultsSection: React.FC<{ title: string; items: Item[]; itemType: ItemType; onBook: (item: Item) => void }> = ({ title, items, itemType, onBook }) => {
    if (!items || items.length === 0) return null;

    return (
        <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-gray-800 dark:text-dark-text-primary">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map(item => <GenericCard key={item.id} item={item} itemType={itemType} onBook={onBook} />)}
            </div>
        </motion.section>
    );
};

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ isOpen, onClose, isLoading, error, results, searchQuery }) => {
    const [bookingItem, setBookingItem] = useState<Item | null>(null);
    const [sortOption, setSortOption] = useState('relevance');
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minRating: 0,
    });
    
    // State for AI Itinerary feature
    const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
    const [itineraryResult, setItineraryResult] = useState<string | null>(null);
    const [itineraryError, setItineraryError] = useState<string | null>(null);

    useEffect(() => {
        // Reset state when a new search is initiated
        if (isLoading) {
            setSortOption('relevance');
            setFilters({ minPrice: '', maxPrice: '', minRating: 0 });
            // Reset AI itinerary state
            setItineraryResult(null);
            setItineraryError(null);
            setIsGeneratingItinerary(false);
        }
    }, [isLoading]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: name === 'minRating' ? Number(value) : value }));
    };

    const handleGenerateItinerary = async () => {
        if (!results) return;

        setIsGeneratingItinerary(true);
        setItineraryResult(null);
        setItineraryError(null);

        const context = `
            Flights: ${results.flights.map(f => f.title).join(', ') || 'None'}.
            Hotels: ${results.hotels.map(h => h.title).join(', ') || 'None'}.
            Cars: ${results.cars.map(c => c.title).join(', ') || 'None'}.
            Experiences: ${results.exploreItems.map(e => e.title).join(', ') || 'None'}.
        `;

        const prompt = `
            You are a helpful travel assistant. A user has searched for "${searchQuery}".
            Based on their search, we found these options: ${context}.
            Please create a concise and exciting 3-day sample itinerary.
            1. Write a short, engaging summary paragraph for the trip.
            2. Then, recommend ONE specific flight, ONE hotel, ONE car, and ONE experience from the lists provided that would create a great trip.
            3. Format your response in simple markdown. Use a '###' heading for the summary and another for the recommendations. Use '*' for the list of recommendations. For example:

            ### Your Awesome Trip!
            (Your summary here...)

            ### Our Recommendations
            *   **Flight:** [Flight Title]
            *   **Hotel:** [Hotel Title]
            *   **Car:** [Car Title]
            *   **Experience:** [Experience Title]

            Be friendly and inspiring!
        `;
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setItineraryResult(response.text);
        } catch (err) {
            console.error("Error generating itinerary:", err);
            setItineraryError("Our AI assistant couldn't create a plan right now. Please try again later.");
        } finally {
            setIsGeneratingItinerary(false);
        }
    };
    
    const renderItinerary = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-serif font-bold mt-4 mb-2 text-gray-800 dark:text-dark-text-primary">{line.substring(4)}</h3>;
            }
            if (line.startsWith('*   **')) {
                const boldPartMatch = line.match(/\*\*(.*?)\*\*/);
                const boldPart = boldPartMatch ? boldPartMatch[1] : '';
                const rest = line.substring(line.indexOf(':**') + 3).trim();
                return (
                    <p key={index} className="my-2 text-gray-600 dark:text-dark-text-secondary">
                        <strong className="font-semibold text-gray-700 dark:text-dark-text-primary">{boldPart}</strong>
                        <span>: {rest}</span>
                    </p>
                );
            }
            if (line.trim() === '') return null;
            return <p key={index} className="my-2 text-gray-600 dark:text-dark-text-secondary">{line}</p>;
        });
    };


    const processedResults = useMemo(() => {
        if (!results) return null;

        const processCategory = (items: Item[]) => {
            if (!items) return [];
            let filteredItems = items.filter(item => {
                const minPrice = parseFloat(filters.minPrice);
                const maxPrice = parseFloat(filters.maxPrice);
                if (!isNaN(minPrice) && item.priceZAR < minPrice) return false;
                if (!isNaN(maxPrice) && item.priceZAR > maxPrice) return false;
                if (filters.minRating > 0 && item.rating < filters.minRating) return false;
                return true;
            });

            switch (sortOption) {
                case 'price-asc':
                    filteredItems.sort((a, b) => a.priceZAR - b.priceZAR);
                    break;
                case 'price-desc':
                    filteredItems.sort((a, b) => b.priceZAR - a.priceZAR);
                    break;
                case 'rating-desc':
                    filteredItems.sort((a, b) => b.rating - a.rating);
                    break;
                case 'relevance':
                default:
                    break;
            }
            return filteredItems;
        };

        return {
            flights: processCategory(results.flights),
            hotels: processCategory(results.hotels),
            cars: processCategory(results.cars),
            exploreItems: processCategory(results.exploreItems),
        };
    }, [results, filters, sortOption]);

    const hasOriginalResults = results && (results.flights.length > 0 || results.hotels.length > 0 || results.cars.length > 0 || results.exploreItems.length > 0);
    const hasProcessedResults = processedResults && (processedResults.flights.length > 0 || processedResults.hotels.length > 0 || processedResults.cars.length > 0 || processedResults.exploreItems.length > 0);

    return (
       <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-gray-100 dark:bg-dark-bg rounded-2xl w-full max-w-7xl h-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-transparent dark:border-dark-border"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center flex-shrink-0">
                            <h2 className="text-xl font-bold font-serif text-gray-800 dark:text-dark-text-primary truncate pr-4">
                                {isLoading ? "Searching..." : `Results for "${searchQuery}"`}
                            </h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface flex-shrink-0">
                                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-dark-text-secondary" />
                            </button>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto">
                           <div className="p-4 sm:p-6 lg:p-8">
                                {isLoading && (
                                    <div className="flex flex-col items-center justify-center text-gray-800 dark:text-dark-text-primary pt-16">
                                        <ArrowPathIcon className="h-16 w-16 animate-spin text-brand-accent" />
                                        <p className="mt-4 text-xl font-semibold">Searching for "{searchQuery}"...</p>
                                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-2">Our AI is finding the best deals for you.</p>
                                    </div>
                                )}
                                {error && (
                                    <div className="text-center col-span-full py-16">
                                        <h3 className="text-2xl font-serif text-red-500">Something went wrong</h3>
                                        <p className="text-gray-600 dark:text-dark-text-secondary mt-2">{error}</p>
                                    </div>
                                )}
                                {!isLoading && !error && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {hasOriginalResults && (
                                            <motion.div variants={itemVariants} className="sticky top-0 bg-gray-100/80 dark:bg-dark-bg/80 backdrop-blur-sm z-10 p-4 rounded-xl shadow-md mb-8 -mx-4 -mt-4">
                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                                                        <div className="flex items-center gap-2">
                                                            <label htmlFor="sortOptionModal" className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Sort by:</label>
                                                            <select id="sortOptionModal" name="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent">
                                                                <option value="relevance">Relevance</option>
                                                                <option value="price-asc">Price: Low to High</option>
                                                                <option value="price-desc">Price: High to Low</option>
                                                                <option value="rating-desc">Rating: High to Low</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Price (ZAR):</label>
                                                            <input type="number" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleFilterChange} className="w-24 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent" />
                                                            <input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleFilterChange} className="w-24 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent" />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <label htmlFor="minRatingModal" className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Rating:</label>
                                                            <select id="minRatingModal" name="minRating" value={filters.minRating} onChange={handleFilterChange} className="bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-brand-accent focus:border-brand-accent">
                                                                <option value="0">Any</option>
                                                                <option value="4">4+ Stars</option>
                                                                <option value="3">3+ Stars</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <motion.button
                                                            onClick={handleGenerateItinerary}
                                                            disabled={isGeneratingItinerary || !hasOriginalResults}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                        >
                                                            <SparklesIcon className="h-5 w-5" />
                                                            {isGeneratingItinerary ? 'Building Plan...' : 'AI Trip Plan'}
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        
                                        {(isGeneratingItinerary || itineraryResult || itineraryError) && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                variants={itemVariants}
                                                className="mb-8 p-6 bg-white dark:bg-dark-surface rounded-xl shadow-md border border-gray-200 dark:border-dark-border"
                                            >
                                                {isGeneratingItinerary && (
                                                    <div className="flex items-center justify-center">
                                                        <ArrowPathIcon className="h-6 w-6 animate-spin text-brand-accent mr-3" />
                                                        <p className="text-gray-700 dark:text-dark-text-secondary">Our AI is crafting your perfect trip...</p>
                                                    </div>
                                                )}
                                                {itineraryError && ( <div className="text-center text-red-500">{itineraryError}</div> )}
                                                {itineraryResult && renderItinerary(itineraryResult)}
                                            </motion.div>
                                        )}


                                        {results && !hasProcessedResults && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center col-span-full py-16">
                                                <h3 className="text-2xl font-serif text-gray-700 dark:text-dark-text-secondary">No results match your filters</h3>
                                                <p className="text-gray-500 dark:text-dark-text-secondary mt-2">Try adjusting your price or rating filters.</p>
                                            </motion.div>
                                        )}
                                        
                                        {processedResults ? (
                                            <>
                                                <ResultsSection title="Flights" items={processedResults.flights} itemType="flight" onBook={setBookingItem} />
                                                <ResultsSection title="Hotels" items={processedResults.hotels} itemType="hotel" onBook={setBookingItem} />
                                                <ResultsSection title="Car Rentals" items={processedResults.cars} itemType="car" onBook={setBookingItem} />
                                                <ResultsSection title="Experiences" items={processedResults.exploreItems} itemType="explore" onBook={setBookingItem} />
                                            </>
                                        ) : (
                                        !isLoading && <motion.div 
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }} 
                                            className="text-center col-span-full py-16"
                                            >
                                            <h3 className="text-2xl font-serif text-gray-700 dark:text-dark-text-secondary">No results found for "{searchQuery}"</h3>
                                            <p className="text-gray-500 dark:text-dark-text-secondary mt-2">Try a different search term, like "beach hotels in Thailand" or "adventure in Costa Rica".</p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                           </div>
                        </div>
                        <BookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};