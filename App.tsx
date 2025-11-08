
import React, { useState, useEffect } from 'react';
// FIX: Import Transition type from framer-motion to resolve typing error.
import { AnimatePresence, motion, Transition } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeContent } from './components/HomeContent';
import { GenericPage } from './components/GenericPage';
import { ExplorePage } from './components/ExplorePage';
import { Footer } from './components/Footer';
import { LLMAssistant } from './components/LLMAssistant';
import { SearchResultsModal } from './components/SearchResultsModal';
import { flights, hotels, cars } from './constants/mockData';
import { Page, Item, Flight, Hotel, Car, ExploreItem } from './types';
import { GoogleGenAI, Type } from "@google/genai";
import { EmailSignup } from './components/EmailSignup';


// A simple debounce hook to delay state updates during rapid input
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

interface SearchResults {
    flights: Flight[];
    hotels: Hotel[];
    cars: Car[];
    exploreItems: ExploreItem[];
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>('Home');
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [showIntro, setShowIntro] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Debounce search query to prevent excessive re-renders while typing
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // State for new search functionality
  const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setShowSearchResultsModal(true);
    setIsSearching(true);
    setSearchError(null);
    setSearchResults(null);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const reviewSchema = {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                date: { type: Type.STRING },
                text: { type: Type.STRING },
            }
        };

        const itemSchema = {
            type: Type.OBJECT,
            properties: {
                id: { type: Type.STRING, description: "A unique identifier for the item, e.g., 'flight-gen-1'." },
                title: { type: Type.STRING },
                location: { type: Type.STRING },
                priceZAR: { type: Type.NUMBER },
                images: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of 1-3 valid, high-quality image URLs from a free source like Unsplash or Pexels." },
                rating: { type: Type.NUMBER, description: "A rating between 3.5 and 5.0." },
                description: {
                    type: Type.OBJECT,
                    properties: {
                        short: { type: Type.STRING },
                        long: { type: Type.STRING },
                    },
                    required: ['short', 'long']
                },
                reviews: { type: Type.ARRAY, items: reviewSchema, description: "Generate 2-3 realistic reviews for this item." },
                // Type-specific properties
                airline: { type: Type.STRING, description: "For flights only." },
                duration: { type: Type.STRING, description: "For flights only." },
                amenities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "For hotels only." },
                type: { type: Type.STRING, description: "For cars only (e.g., 'SUV', 'Sedan')." },
                seats: { type: Type.INTEGER, description: "For cars only." },
                features: { type: Type.ARRAY, items: { type: Type.STRING }, description: "For cars only." },
                tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "For explore items only." },
            },
            required: ['id', 'title', 'location', 'priceZAR', 'images', 'rating', 'description', 'reviews']
        };
        
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                flights: { type: Type.ARRAY, items: itemSchema, description: "List of flights. Maximum 4 items." },
                hotels: { type: Type.ARRAY, items: itemSchema, description: "List of hotels. Maximum 4 items." },
                cars: { type: Type.ARRAY, items: itemSchema, description: "List of rental cars. Maximum 4 items." },
                exploreItems: { type: Type.ARRAY, items: itemSchema, description: "List of experiences or activities. Maximum 4 items." },
            },
            required: ['flights', 'hotels', 'cars', 'exploreItems']
        };

        const prompt = `Based on the user query "${query}", find relevant travel options. Generate a list of flights, hotels, rental cars, and experiences. Ensure all prices are in South African Rand (ZAR). Provide diverse and realistic results. Generate a unique ID for each item. For images, provide valid and relevant URLs from free stock photo sites like Unsplash or Pexels. Limit each category to a maximum of 4 items. If no relevant items are found for a category, return an empty array for it.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const results = JSON.parse(response.text);

        const validatedResults = {
            flights: results.flights || [],
            hotels: results.hotels || [],
            cars: results.cars || [],
            exploreItems: results.exploreItems || []
        };

        setSearchResults(validatedResults);

    } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchError("Sorry, we couldn't fetch results for your search. Please try again.");
    } finally {
        setIsSearching(false);
    }
  };

  const handleCloseSearchModal = () => {
    setShowSearchResultsModal(false);
  };


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Flights':
        return <GenericPage key="flights" title="Find Your Next Flight" items={flights} itemType="flight" searchQuery={debouncedSearchQuery} />;
      case 'Hotels':
        return <GenericPage key="hotels" title="Stay Somewhere Incredible" items={hotels} itemType="hotel" searchQuery={debouncedSearchQuery} />;
      case 'Cars':
        return <GenericPage key="cars" title="Rent a Car for Your Adventure" items={cars} itemType="car" searchQuery={debouncedSearchQuery} />;
      case 'Explore':
        return <ExplorePage key="explore" searchQuery={debouncedSearchQuery} />;
      case 'Home':
      default:
        return <HomeContent key="home" />;
    }
  };

  if (showIntro) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-dark-bg">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-4xl md:text-6xl font-serif text-dark-text-primary tracking-wider"
        >
          Global Trotter
        </motion.h1>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-dark-text-primary transition-colors duration-300 overflow-x-hidden">
      <Navbar activePage={activePage} setActivePage={setActivePage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="flex-grow">
        <Hero activePage={activePage} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <LLMAssistant />
      <EmailSignup />
      <Footer />
      <SearchResultsModal 
        isOpen={showSearchResultsModal}
        onClose={handleCloseSearchModal}
        isLoading={isSearching}
        error={searchError}
        results={searchResults}
        searchQuery={searchQuery}
      />
    </div>
  );
}
