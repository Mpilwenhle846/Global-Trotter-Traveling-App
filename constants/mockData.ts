import { Flight, Hotel, Car, ExploreItem, Testimonial } from '../types';

// Helper function to generate unique, descriptive reviews
const generateReviews = (itemName: string, location: string, count: number) => {
  const reviews = [];
  const names = ['Ethan Hayes', 'Chloe Sullivan', 'Liam Garcia', 'Sophia Nguyen', 'Mason Rodriguez', 'Ava Williams', 'Noah Brown', 'Isabella Jones'];
  const positiveSentiments = [
    `Our experience with ${itemName} in ${location} was unforgettable. The service was top-notch!`,
    `I cannot recommend ${itemName} enough. A truly 5-star experience from start to finish.`,
    `Absolutely breathtaking. ${itemName} made our trip to ${location} truly special.`,
    `From the amenities to the staff, everything about ${itemName} was perfect.`,
    `A fantastic choice for anyone visiting ${location}. We will definitely be back!`,
    `Smooth journey and excellent service. Highly recommended.`,
    `The best way to travel to ${location}. Comfortable and efficient.`,
    `Wonderful! This exceeded all of our expectations.`
  ];
  for (let i = 0; i < count; i++) {
    reviews.push({
      name: names[i % names.length],
      date: `2024-05-${20 - i}`,
      text: positiveSentiments[i % positiveSentiments.length],
    });
  }
  return reviews;
};

// All image URLs are now hardcoded for reliability and relevance.

export const heroVideos = [
    'https://videos.pexels.com/video-files/3254008/3254008-hd_1920_1080_25fps.mp4',
    'https://videos.pexels.com/video-files/3015403/3015403-hd_1920_1080_25fps.mp4',
    'https://videos.pexels.com/video-files/2795733/2795733-hd_1920_1080_30fps.mp4',
    'https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4',
    'https://videos.pexels.com/video-files/4434250/4434250-hd_1920_1080_25fps.mp4',
];

// --- UNIQUE, RELEVANT IMAGE URLS FOR EACH CATEGORY ---

// FLIGHTS - Airline and aircraft specific images
export const flights: Flight[] = [
  {
    id: 'flight-1', title: 'Direct Flight to Tokyo', location: 'Johannesburg (JNB) -> Tokyo (HND)', priceZAR: 15500,
    images: [
        'https://images.unsplash.com/photo-1630936693910-62ad38163a99?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // ANA plane wing over clouds
        'https://plus.unsplash.com/premium_photo-1682092559719-b72195d1ef1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Japanese airline business class
        'https://images.unsplash.com/photo-1662406009228-b270717e296f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=973' // Tokyo skyline from air
    ], rating: 4.8, airline: 'Asiana Skies', duration: '17h 30m',
    reviews: generateReviews('Asiana Skies Flight', 'Tokyo', 3),
    description: { short: 'Experience unparalleled service on your way to Tokyo.', long: 'Fly in comfort with our state-of-the-art fleet. Enjoy gourmet meals, a vast entertainment library, and the serene ambiance of our cabins as you journey to the heart of Japan.' }
  },
  {
    id: 'flight-2', title: 'Cape Town to London', location: 'Cape Town (CPT) -> London (LHR)', priceZAR: 12800,
    images: [
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // British Airways plane
        'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Premium economy cabin
        'https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928' // Heathrow airport
    ], rating: 4.7, airline: 'Atlantic Wings', duration: '11h 45m',
    reviews: generateReviews('Atlantic Wings Flight', 'London', 3),
    description: { short: 'Connect the Cape to the capital of the UK.', long: 'Our direct flight offers a seamless travel experience. With spacious seating and attentive cabin crew, your holiday begins the moment you step on board.' }
  },
  {
    id: 'flight-3', title: 'New York Business Class', location: 'Johannesburg (JNB) -> New York (JFK)', priceZAR: 45000,
    images: [
        'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Delta business class cabin
        'https://images.unsplash.com/photo-1663649583976-d49abe758932?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Lie-flat business class seat
        'https://images.unsplash.com/photo-1656195328871-d277f47e353b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // JFK airport at night
    ], rating: 4.9, airline: 'Liberty Air', duration: '15h 50m',
    reviews: generateReviews('Liberty Air Business Class', 'New York', 3),
    description: { short: 'Arrive in the Big Apple rested and ready.', long: 'Our business class suite features lie-flat beds, premium dining, and exclusive lounge access. Experience the pinnacle of transatlantic travel.' }
  },
  {
    id: 'flight-4', title: 'Fly to Romantic Paris', location: 'Cape Town (CPT) -> Paris (CDG)', priceZAR: 13200,
    images: [
        'https://images.unsplash.com/photo-1626985249964-4fa612df0274?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871', // Air France plane
        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=820', // Air France economy cabin
        'https://images.unsplash.com/photo-1621853476878-b42ae4930faf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Charles de Gaulle airport
    ], rating: 4.6, airline: 'Élan Air', duration: '13h 20m',
    reviews: generateReviews('Élan Air Flight', 'Paris', 3),
    description: { short: 'Your Parisian adventure starts here.', long: 'Enjoy a touch of French elegance in the sky. We offer complimentary champagne and artisanal pastries to get you in the mood for Paris.' }
  },
  {
    id: 'flight-5', title: 'Dubai Luxury A380', location: 'Johannesburg (JNB) -> Dubai (DXB)', priceZAR: 9800,
    images: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Emirates A380
        'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Emirates first class suite
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80' // Dubai International Airport
    ], rating: 4.9, airline: 'Emirates', duration: '8h 10m',
    reviews: generateReviews('Emirates A380 Flight', 'Dubai', 3),
    description: { short: 'Experience the iconic A380 to Dubai.', long: 'Fly on the world\'s largest passenger aircraft. Enjoy spacious cabins, an award-winning entertainment system, and world-class service to the jewel of the UAE.' }
  },
  {
    id: 'flight-6', title: 'Adventure to Rio', location: 'Cape Town (CPT) -> Rio de Janeiro (GIG)', priceZAR: 14500,
    images: [
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // LATAM plane over mountains
        'https://images.unsplash.com/photo-1542296332-935532a24f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Modern airplane interior
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' // Rio de Janeiro aerial
    ], rating: 4.5, airline: 'Samba Airways', duration: '10h 30m',
    reviews: generateReviews('Samba Airways Flight', 'Rio', 3),
    description: { short: 'Cross the Atlantic to vibrant Brazil.', long: 'Get ready for carnival vibes with our friendly cabin crew and Brazilian-inspired cuisine. Your adventure to Rio de Janeiro starts with us.' }
  },
  {
    id: 'flight-7', title: 'Sydney Direct', location: 'Johannesburg (JNB) -> Sydney (SYD)', priceZAR: 18200,
    images: [
        'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871', // Qantas plane
        'https://images.unsplash.com/photo-1605685503584-77dc4af666de?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=889', // Spacious cabin
        'https://images.unsplash.com/photo-1562791098-df1ae65dee79?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=869' // Sydney Airport
    ], rating: 4.7, airline: 'Oceanic Air', duration: '14h 5m',
    reviews: generateReviews('Oceanic Air Flight', 'Sydney', 3),
    description: { short: 'Journey Down Under to the stunning city of Sydney.', long: 'Cross the Indian Ocean in comfort. Our direct route to Sydney ensures you arrive refreshed and ready to explore the iconic harbour, beaches, and vibrant city life.' }
  },
  {
    id: 'flight-8', title: 'Explore Bangkok', location: 'Cape Town (CPT) -> Bangkok (BKK)', priceZAR: 11500,
    images: [
        'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Thai Airways plane
        'https://images.unsplash.com/photo-1705831117067-92f41547b148?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Comfortable seating
        'https://images.unsplash.com/photo-1692554673955-17689a918e45?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774' // Suvarnabhumi Airport
    ], rating: 4.6, airline: 'Thai Orchid', duration: '16h 20m',
    reviews: generateReviews('Thai Orchid Flight', 'Bangkok', 3),
    description: { short: 'Discover the vibrant street life of Bangkok.', long: 'Fly to the heart of Thailand and immerse yourself in a city of contrasts, from serene temples to bustling markets. Enjoy authentic Thai hospitality on board.' }
  },
  {
    id: 'flight-9', title: 'Connect to Toronto', location: 'Johannesburg (JNB) -> Toronto (YYZ)', priceZAR: 16800,
    images: [
        'https://images.unsplash.com/photo-1507992781348-310259076fe0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Air Canada plane
        'https://images.unsplash.com/photo-1628863353529-b942b78615b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Clean cabin interior
        'https://images.unsplash.com/photo-1596492723901-f0952b66708a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1858&q=80' // Pearson Airport
    ], rating: 4.5, airline: 'Maple Leaf Air', duration: '18h 40m',
    reviews: generateReviews('Maple Leaf Air', 'Toronto', 3),
    description: { short: 'Experience Canadian hospitality on your way to Toronto.', long: 'Our flight to Toronto offers a comfortable and convenient connection to one of North America\'s most diverse cities. Enjoy the journey with our award-winning service.' }
  },
  {
    id: 'flight-10', title: 'Ancient Rome Awaits', location: 'Cape Town (CPT) -> Rome (FCO)', priceZAR: 12900,
    images: [
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=796', // ITA Airways plane
        'https://images.unsplash.com/photo-1542820229-081e0c12af0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=873', // European airline cabin
        'https://images.unsplash.com/photo-1533104816931-20fa69146254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' // Fiumicino Airport
    ], rating: 4.8, airline: 'Vita Airlines', duration: '13h 50m',
    reviews: generateReviews('Vita Airlines', 'Rome', 3),
    description: { short: 'Fly to the Eternal City and explore its history.', long: 'Journey to Rome, a city filled with ancient wonders, incredible art, and delicious food. Our flight provides a comfortable start to your Italian escapade.' }
  }
];

// HOTELS - Each with unique hotel images
export const hotels: Hotel[] = [
  {
    id: 'hotel-1', title: 'The Silo Hotel', location: 'Cape Town, South Africa', priceZAR: 12500,
    images: [
        'https://images.unsplash.com/photo-1543775224-483704519120?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=793', // Silo Hotel exterior
        'https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Silo luxury suite
        'https://images.unsplash.com/photo-1664917555352-f3f66e57ccc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Silo bathroom
    ], rating: 4.9,
    reviews: generateReviews('The Silo Hotel', 'Cape Town', 3),
    description: { short: 'Luxury art hotel with panoramic city views.', long: 'Housed in a historic grain silo, this hotel is a masterpiece of design. Enjoy rooftop infinity pool views of Table Mountain and the V&A Waterfront.' },
    amenities: ['Rooftop Pool', 'Art Gallery', 'Spa', 'Fine Dining']
  },
  {
    id: 'hotel-2', title: 'Park Hyatt Tokyo', location: 'Tokyo, Japan', priceZAR: 9800,
    images: [
        'https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774', // Park Hyatt lobby
        'https://images.unsplash.com/photo-1664227430717-9a62112984cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Park Hyatt room
        'https://images.unsplash.com/photo-1554345102-c6a6033944eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=907' // Park Hyatt city view
    ], rating: 4.8,
    reviews: generateReviews('Park Hyatt Tokyo', 'Tokyo', 3),
    description: { short: 'Iconic hotel with stunning Shinjuku skyline views.', long: 'Famous from "Lost in Translation," this hotel offers sophisticated elegance, a sky-high pool, and the legendary New York Bar with live jazz.' },
    amenities: ['Sky Pool', 'Jazz Bar', 'Spa', 'Michelin Star Restaurant']
  },
  {
    id: 'hotel-3', title: 'Le Bristol Paris', location: 'Paris, France', priceZAR: 18000,
    images: [
        'https://images.unsplash.com/photo-1746031589603-bfad70611ef6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=772', // Le Bristol facade
        'https://images.unsplash.com/photo-1626868449668-fb47a048d9cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Le Bristol suite
        'https://images.unsplash.com/photo-1723641349153-1e81030ab2b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=919' // Le Bristol pool
    ], rating: 5.0,
    reviews: generateReviews('Le Bristol Paris', 'Paris', 3),
    description: { short: 'An icon of Parisian elegance and art de vivre.', long: 'Located on the prestigious rue du Faubourg Saint-Honoré, Le Bristol offers a rooftop pool with Eiffel Tower views and a three-Michelin-star restaurant.' },
    amenities: ['Rooftop Pool', '3-Michelin Star Restaurant', 'Courtyard Garden', 'Spa']
  },
  {
    id: 'hotel-4', title: 'Four Seasons Serengeti', location: 'Serengeti, Tanzania', priceZAR: 22000,
    images: [
        'https://images.unsplash.com/photo-1661000902726-ebda7e06a23a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1031', // Safari lodge exterior
        'https://images.unsplash.com/photo-1661000821259-93e0184acb5f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1631', // Safari lodge room
        'https://images.unsplash.com/photo-1731329569575-b89066a46f30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Safari lodge pool
    ], rating: 4.9,
    reviews: generateReviews('Four Seasons Serengeti', 'Tanzania', 3),
    description: { short: 'Luxury safari lodge with an animal-viewing infinity pool.', long: 'Deep within Africa\'s finest safari destination, watch elephants gather at the watering hole from your private balcony or the stunning infinity pool.' },
    amenities: ['Infinity Pool', 'Game Drives', 'Spa', 'Discovery Centre']
  },
  {
    id: 'hotel-5', title: 'COMO Uma Ubud', location: 'Bali, Indonesia', priceZAR: 6500,
    images: [
        'https://images.unsplash.com/photo-1728048756938-de1ccee0ab15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871', // Bali resort exterior
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Bali villa
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470' // Bali pool
    ], rating: 4.7,
    reviews: generateReviews('COMO Uma Ubud', 'Bali', 3),
    description: { short: 'A tranquil retreat in the heart of Bali\'s cultural hub.', long: 'Overlooking the Tjampuhan Valley, this resort offers sun-drenched rooms, open-air yoga pavilions, and guided treks through the lush rice paddies.' },
    amenities: ['Yoga Pavilion', 'Spa', 'Pool', 'Guided Hikes']
  },
  {
    id: 'hotel-6', title: 'The Gritti Palace', location: 'Venice, Italy', priceZAR: 19500,
    images: [
        'https://images.unsplash.com/photo-1751311756783-373789362265?iThe%20Gritti%20Palacexlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Venice palace exterior
        'https://images.unsplash.com/photo-1594335954551-14ed4382eb1e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Venice luxury room
        'https://images.unsplash.com/photo-1509647924673-bbb53e22eeb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=866' // Venice canal view
    ], rating: 4.9,
    reviews: generateReviews('The Gritti Palace', 'Venice', 3),
    description: { short: 'A historic hotel on Venice\'s Grand Canal.', long: 'Experience Venetian heritage in a former noble residence. The Gritti Palace offers opulent rooms, an exceptional cooking school, and Riva yacht experiences.' },
    amenities: ['Grand Canal Terrace', 'Cooking School', 'Riva Yacht', 'Spa']
  },
  {
    id: 'hotel-7', title: 'Burj Al Arab Jumeirah', location: 'Dubai, UAE', priceZAR: 35000,
    images: [
        'https://images.unsplash.com/photo-1554289087-51d078c78d8a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Burj Al Arab exterior
        'https://plus.unsplash.com/premium_photo-1663061414669-bb34bcd3ff2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Burj suite
        'https://images.unsplash.com/photo-1728016280936-8e8c2ef3da4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=812' // Burj luxury bathroom
    ], rating: 5.0,
    reviews: generateReviews('Burj Al Arab', 'Dubai', 3),
    description: { short: 'The world-famous icon of Arabian luxury.', long: 'Experience the pinnacle of luxury with a private butler, a fleet of Rolls-Royce cars, and breathtaking views of the Arabian Gulf from your duplex suite.' },
    amenities: ['Private Butler', 'Rooftop Helipad', 'Underwater Restaurant', 'Spa']
  },
  {
    id: 'hotel-8', title: '1 Hotel Brooklyn Bridge', location: 'New York, USA', priceZAR: 11000,
    images: [
        'https://images.unsplash.com/photo-1677129667171-92abd8740fa3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Brooklyn hotel exterior
        'https://images.unsplash.com/photo-1740324351912-b9189685ab1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Brooklyn hotel room
        'https://images.unsplash.com/photo-1550459773-a3a85200f67c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1134' // Brooklyn bridge view
    ], rating: 4.8,
    reviews: generateReviews('1 Hotel Brooklyn Bridge', 'New York', 3),
    description: { short: 'Sustainable luxury with unmatched skyline views.', long: 'Located on the Brooklyn waterfront, this hotel offers stunning panoramic views of the Manhattan skyline and the Brooklyn Bridge from its rooftop pool and bar.' },
    amenities: ['Rooftop Pool & Bar', 'Sustainable Design', 'Spa', 'Cinema']
  },
  {
    id: 'hotel-9', title: 'explora Patagonia', location: 'Torres del Paine, Chile', priceZAR: 25000,
    images: [
        'https://images.unsplash.com/photo-1743510935745-b0cd869db5e8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=943', // Patagonia lodge
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Patagonia room with a view
        'https://images.unsplash.com/photo-1518557984634-82639d127346?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' // Patagonia mountain view
    ], rating: 4.9,
    reviews: generateReviews('explora Patagonia', 'Chile', 3),
    description: { short: 'An all-inclusive lodge in the heart of Patagonia.', long: 'This luxury lodge is the perfect base for exploring the breathtaking landscapes of Torres del Paine National Park, with over 40 guided hikes and horseback rides.' },
    amenities: ['All-Inclusive', 'Guided Excursions', 'Indoor Pool', 'Spa']
  },
  {
    id: 'hotel-10', title: 'The Fullerton Bay Hotel', location: 'Singapore', priceZAR: 8500,
    images: [
        'https://plus.unsplash.com/premium_photo-1697729419943-30521d527501?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=869', // Singapore hotel
        'https://images.unsplash.com/photo-1662385930165-49ebaa03b152?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Singapore room
        'https://images.unsplash.com/photo-1565880429858-ed7cb461f1b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=872' // Singapore marina view
    ], rating: 4.9,
    reviews: generateReviews('The Fullerton Bay Hotel', 'Singapore', 3),
    description: { short: 'Waterfront luxury with stunning Marina Bay views.', long: 'Enjoy sophisticated, modern luxury right on the water. The hotel features a rooftop infinity pool, chic bars, and panoramic views of the iconic Singapore skyline.' },
    amenities: ['Rooftop Pool', 'Jacuzzi', 'Fitness Center', 'Fine Dining']
  }
];

// CARS - Each with specific car model images
export const cars: Car[] = [
  {
    id: 'car-1', title: 'BMW X5', location: 'Johannesburg, South Africa', priceZAR: 2200,
    images: [
        'https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=899', // BMW X5 exterior
        'https://images.unsplash.com/photo-1645593624916-4e4a83cd4a93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // BMW X5 interior
        'https://images.unsplash.com/photo-1640018243934-32df7cdfe339?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // BMW X5 dashboard
    ], rating: 4.8,
    reviews: generateReviews('BMW X5 Rental', 'Johannesburg', 3),
    description: { short: 'Premium SUV for city and safari adventures.', long: 'The BMW X5 offers comfort, style, and performance. Perfect for navigating Johannesburg or taking a trip to the nearby game reserves.' },
    type: 'SUV', seats: 5, features: ['Automatic', 'GPS', 'Leather Seats', 'Sunroof']
  },
  {
    id: 'car-2', title: 'Fiat 500 Convertible', location: 'Rome, Italy', priceZAR: 1300,
    images: [
        'https://images.unsplash.com/photo-1655925114275-27ee1a375713?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=879', // Fiat 500 exterior
        'https://images.unsplash.com/photo-1559141433-0784f60e7e3d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Fiat interior
        'https://images.unsplash.com/photo-1754782381967-95e9b15ced54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871' // Fiat dashboard
    ], rating: 4.7,
    reviews: generateReviews('Fiat 500 Rental', 'Rome', 3),
    description: { short: 'The perfect car for navigating historic Rome.', long: 'Embrace the Italian lifestyle. This chic convertible is ideal for zipping through narrow streets and finding hidden gems in the Eternal City.' },
    type: 'Convertible', seats: 4, features: ['Automatic', 'Compact', 'Bluetooth']
  },
  {
    id: 'car-3', title: 'Land Rover Defender', location: 'Reykjavik, Iceland', priceZAR: 3500,
    images: [
        'https://images.unsplash.com/photo-1730830812273-12c0a8a98092?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=929', // Land Rover exterior
        'https://images.unsplash.com/photo-1716093916467-d0b99b921a64?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=874', // Land Rover interior
        'https://images.unsplash.com/photo-1578564810934-c131250d3792?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871' // Land Rover off-road
    ], rating: 4.9,
    reviews: generateReviews('Land Rover Defender Rental', 'Iceland', 3),
    description: { short: 'Rugged 4x4 for Iceland\'s epic Ring Road.', long: 'Built for adventure, the Defender can handle Iceland\'s dramatic landscapes, from river crossings to gravel roads, ensuring your safety and comfort.' },
    type: '4x4', seats: 5, features: ['4-Wheel Drive', 'Heated Seats', 'GPS', 'All-Terrain Tires']
  },
  {
    id: 'car-4', title: 'Tesla Model 3', location: 'Los Angeles, USA', priceZAR: 1900,
    images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871', // Tesla exterior
        'https://images.unsplash.com/photo-1700411882056-e2bd2e61af12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871', // Tesla interior
        'https://images.unsplash.com/photo-1701311521752-9f85d68d55ed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032' // Tesla screen
    ], rating: 4.8,
    reviews: generateReviews('Tesla Model 3 Rental', 'Los Angeles', 3),
    description: { short: 'Explore LA in silent, eco-friendly style.', long: 'Cruise down the Pacific Coast Highway in this sleek electric vehicle. Enjoy cutting-edge technology and zero emissions on your California road trip.' },
    type: 'Electric Sedan', seats: 5, features: ['Autopilot', 'Glass Roof', 'Premium Sound']
  },
  {
    id: 'car-5', title: 'Mercedes-Benz G-Class', location: 'Dubai, UAE', priceZAR: 4800,
    images: [
        'https://images.unsplash.com/photo-1677137853766-7a7d0865b710?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Mercedes G exterior
        'https://images.unsplash.com/photo-1677137855528-81d64da55fe1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Mercedes interior
        'https://images.unsplash.com/photo-1700329694402-baa26366b29e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Mercedes luxury
    ], rating: 4.9,
    reviews: generateReviews('G-Class Rental', 'Dubai', 3),
    description: { short: 'The ultimate luxury SUV for exploring Dubai in style.', long: 'Make a statement wherever you go. The G-Class combines iconic design with formidable off-road capability and opulent comfort.' },
    type: 'Luxury 4x4', seats: 5, features: ['4-Wheel Drive', 'Leather Seats', 'Premium Sound', 'Sunroof']
  },
  {
    id: 'car-6', title: 'Porsche 911 Carrera', location: 'Munich, Germany', priceZAR: 6500,
    images: [
        'https://images.unsplash.com/photo-1680530943583-9b0db80fac69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032', // Porsche exterior
        'https://images.unsplash.com/photo-16042858152a8-b992500382a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032', // Porsche interior
        'https://images.unsplash.com/photo-1680530943399-5939f747d5e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032' // Porsche engine
    ], rating: 5.0,
    reviews: generateReviews('Porsche 911 Rental', 'Munich', 3),
    description: { short: 'Experience the thrill of the German Autobahn.', long: 'Unleash the power of a legendary sports car. The Porsche 911 is the perfect vehicle for scenic drives through the Bavarian Alps and high-speed runs on the Autobahn.' },
    type: 'Sports Car', seats: 4, features: ['PDK Automatic', 'Sport Chrono Package', 'Convertible']
  },
  {
    id: 'car-7', title: 'Toyota Hilux 4x4', location: 'Maun, Botswana', priceZAR: 1800,
    images: [
        'https://images.unsplash.com/photo-1629807390858-2d19718c41d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470', // Hilux exterior
        'https://images.unsplash.com/photo-1621979534678-52a815509a87?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Hilux interior
        'https://images.unsplash.com/photo-1648197323414-4255ea82d86b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Hilux off-road
    ], rating: 4.7,
    reviews: generateReviews('Toyota Hilux Rental', 'Botswana', 3),
    description: { short: 'A fully-equipped 4x4 for a self-drive safari.', long: 'Explore the wilds of the Okavango Delta. This reliable and rugged Hilux comes equipped with a rooftop tent and camping gear for the ultimate African adventure.' },
    type: '4x4 Truck', seats: 5, features: ['Rooftop Tent', 'Camping Gear', 'Long Range Fuel Tank']
  },
  {
    id: 'car-8', title: 'VW Polo', location: 'Cape Town, South Africa', priceZAR: 750,
    images: [
        'https://images.unsplash.com/photo-1587142151322-54f87d1b7c12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032', // VW Polo exterior
        'https://images.unsplash.com/photo-1666277337903-49cedba7c990?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // VW interior
        'https://images.unsplash.com/photo-1762028160585-a25cdf8db066?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // VW compact
    ], rating: 4.6,
    reviews: generateReviews('VW Polo Rental', 'Cape Town', 3),
    description: { short: 'The ideal compact car for city and coastal drives.', long: 'Economical and easy to drive, the VW Polo is perfect for exploring Cape Town, from the city bowl to the scenic Chapman\'s Peak Drive and the Winelands.' },
    type: 'Compact', seats: 5, features: ['Manual', 'Air Conditioning', 'Bluetooth']
  },
  {
    id: 'car-9', title: 'Jeep Wrangler', location: 'Moab, Utah, USA', priceZAR: 2800,
    images: [
        'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=959', // Jeep exterior
        'https://images.unsplash.com/photo-1636880827805-adbc35b7c69d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=872', // Jeep interior
        'https://images.unsplash.com/photo-1636880777476-b41a41ca590d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472' // Jeep off-road
    ], rating: 4.9,
    reviews: generateReviews('Jeep Wrangler Rental', 'Moab', 3),
    description: { short: 'The ultimate off-road vehicle for Utah\'s national parks.', long: 'Tackle the famous red-rock trails of Moab. The Jeep Wrangler is built for adventure, allowing you to explore areas other vehicles can\'t reach.' },
    type: 'Off-Road 4x4', seats: 4, features: ['4-Wheel Drive', 'Removable Top', 'All-Terrain Tires']
  },
  {
    id: 'car-10', title: 'Renault Clio', location: 'Paris, France', priceZAR: 950,
    images: [
        'https://images.unsplash.com/photo-1666335009164-2597314da8e7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470', // Renault exterior
        'https://images.unsplash.com/photo-1603116962580-c52ff4a2cf5a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Renault interior
        'https://images.unsplash.com/photo-1679398175192-92238aac595b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=886' // Renault city car
    ], rating: 4.5,
    reviews: generateReviews('Renault Clio Rental', 'Paris', 3),
    description: { short: 'A stylish and compact car for navigating Paris.', long: 'Effortlessly navigate the charming and busy streets of Paris in this compact and fuel-efficient car. Perfect for city exploration and day trips.' },
    type: 'Compact', seats: 5, features: ['Manual', 'GPS', 'Air Conditioning']
  }
];

// EXPLORE EXPERIENCES - Each with unique activity images
export const exploreItems: ExploreItem[] = [
  {
    id: 'explore-1', title: 'Private Kruger Park Safari', location: 'Kruger National Park, South Africa', priceZAR: 8500,
    images: [
        'https://images.unsplash.com/photo-1612703252506-e2f1f674752d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Safari jeep
        'https://images.unsplash.com/photo-1586943353950-95bdbe3207a1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1018', // Lions
        'https://images.unsplash.com/photo-1594916105020-b28f829993b7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Elephant close-up
    ], rating: 4.9,
    reviews: generateReviews('Kruger Safari', 'South Africa', 3),
    description: { short: 'Track the "Big Five" with an expert guide.', long: 'Embark on a full-day private game drive in one of Africa\'s most iconic reserves. Your expert guide will help you find leopards, lions, rhinos, elephants, and buffalos.' },
    tags: ['safari', 'nature', 'adventure']
  },
  {
    id: 'explore-2', title: 'Kyoto Temples & Geishas', location: 'Kyoto, Japan', priceZAR: 4200,
    images: [
        'https://images.unsplash.com/photo-1623392562431-5f0071069fa3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Kyoto temple
        'https://images.unsplash.com/photo-1593405844957-3854dae97a19?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Geisha
        'https://images.unsplash.com/photo-1565178117145-41db4d572950?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=857' // Bamboo forest
    ], rating: 4.8,
    reviews: generateReviews('Kyoto Tour', 'Japan', 3),
    description: { short: 'Discover the ancient heart of Japan.', long: 'Wander through the serene Arashiyama Bamboo Grove, visit the Golden Pavilion (Kinkaku-ji), and explore the Gion district, the traditional home of geishas.' },
    tags: ['culture', 'historic', 'asia']
  },
  {
    id: 'explore-3', title: 'Machu Picchu Sunrise Hike', location: 'Cusco, Peru', priceZAR: 6700,
    images: [
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=876', // Machu Picchu
        'https://images.unsplash.com/photo-1609973010723-fc9c81a06fa9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032', // Inca trail
        'https://images.unsplash.com/photo-1759358257675-33bfe6be7d18?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774' // Mountain view
    ], rating: 5.0,
    reviews: generateReviews('Machu Picchu Hike', 'Peru', 3),
    description: { short: 'Witness a breathtaking sunrise over the lost city.', long: 'Take an early morning journey to the legendary Inca citadel. Watch as the sun rises over the Andes, casting a golden glow on the ancient stones. A truly spiritual experience.' },
    tags: ['hike', 'wonder', 'historic']
  },
  {
    id: 'explore-4', title: 'Santorini Caldera Catamaran Cruise', location: 'Santorini, Greece', priceZAR: 3800,
    images: [
        'https://images.unsplash.com/photo-1565741478311-b3e79a17bfe3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774', // Santorini caldera
        'https://images.unsplash.com/photo-1703894173711-f3ef68c3a03d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Catamaran
        'https://images.unsplash.com/photo-1544327404-f6aed3d39dbf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774' // Greek sunset
    ], rating: 4.9,
    reviews: generateReviews('Santorini Cruise', 'Greece', 3),
    description: { short: 'Sail the Aegean and watch an iconic sunset.', long: 'Cruise around the stunning volcanic caldera, swim in hot springs, and snorkel in crystal-clear waters. The day culminates with a delicious Greek BBQ on board as you watch the world-famous Oia sunset.' },
    tags: ['romance', 'scenic', 'europe']
  },
  {
    id: 'explore-5', title: 'Hot Air Balloon Over Cappadocia', location: 'Cappadocia, Turkey', priceZAR: 5100,
    images: [
        'https://images.unsplash.com/photo-1674941237715-6f4f9a58636a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Cappadocia balloons
        'https://images.unsplash.com/photo-1695708179175-e688d112d0a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=869', // Balloon basket
        'https://images.unsplash.com/photo-1666817197657-d5e415938e83?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Fairy chimneys
    ], rating: 4.9,
    reviews: generateReviews('Cappadocia Balloon Ride', 'Turkey', 3),
    description: { short: 'Float above a fairytale landscape of "fairy chimneys".', long: 'Experience the magic of Cappadocia from above. At sunrise, hundreds of balloons fill the sky, creating a surreal and unforgettable panorama of the unique rock formations below.' },
    tags: ['adventure', 'scenic', 'unique']
  },
   {
    id: 'explore-6', title: 'Dubai Desert Safari & Dune Bashing', location: 'Dubai, UAE', priceZAR: 2800,
    images: [
        'https://images.unsplash.com/photo-1507669653186-6d573feb190c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Desert dunes
        'https://images.unsplash.com/photo-1746569867775-c994d833b6aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Dune bashing
        'https://images.unsplash.com/photo-1725909632786-c25c9b2b5a16?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032' // Desert camp
    ], rating: 4.7,
    reviews: generateReviews('Dubai Desert Safari', 'UAE', 3),
    description: { short: 'An exhilarating adventure in the Arabian desert.', long: 'Experience the thrill of dune bashing in a 4x4 vehicle, followed by a traditional Bedouin camp experience with camel riding, henna painting, and a BBQ dinner under the stars.' },
    tags: ['adventure', 'culture', 'desert']
  },
  {
    id: 'explore-7', title: 'Venetian Gondola Ride & Serenade', location: 'Venice, Italy', priceZAR: 2500,
    images: [
        'https://images.unsplash.com/photo-1720247522780-db8ba86cbfef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Gondola
        'https://images.unsplash.com/photo-1512301391659-28e9d110dd04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=873', // Venice canals
        'https://images.unsplash.com/photo-1689537047126-31cb0d075b4d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1031' // Gondolier
    ], rating: 4.8,
    reviews: generateReviews('Venice Gondola Ride', 'Italy', 3),
    description: { short: 'A classic romantic experience in the floating city.', long: 'Glide through the historic canals of Venice in a traditional gondola. Enjoy a private serenade as you pass under charming bridges and alongside magnificent palaces.' },
    tags: ['romance', 'historic', 'europe']
  },
  {
    id: 'explore-8', title: 'Northern Lights Chase', location: 'Tromsø, Norway', priceZAR: 4500,
    images: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Northern lights
        'https://images.unsplash.com/photo-1709141242276-51bd5eb3ee5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Arctic landscape
        'https://images.unsplash.com/photo-1681295180234-f6776738c218?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Aurora borealis
    ], rating: 4.9,
    reviews: generateReviews('Northern Lights Chase', 'Norway', 3),
    description: { short: 'Hunt for the spectacular Aurora Borealis.', long: 'Join a small group tour led by expert guides who will take you to the best spots to witness the magical dance of the Northern Lights in the Arctic sky.' },
    tags: ['nature', 'adventure', 'scenic']
  },
  {
    id: 'explore-9', title: 'Thai Cooking Class in Chiang Mai', location: 'Chiang Mai, Thailand', priceZAR: 1200,
    images: [
        'https://images.unsplash.com/photo-1700402871735-8a67fa40d4ed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774', // Thai cooking
        'https://images.unsplash.com/photo-1656570789237-a4e78c726f61?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Fresh ingredients
        'https://plus.unsplash.com/premium_photo-1747816992869-6f0d8c0660cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Thai market
    ], rating: 4.9,
    reviews: generateReviews('Thai Cooking Class', 'Thailand', 3),
    description: { short: 'Learn the secrets of authentic Thai cuisine.', long: 'Visit a local market to select fresh ingredients, then learn to cook classic Thai dishes like Pad Thai, Green Curry, and Mango Sticky Rice in a traditional open-air kitchen.' },
    tags: ['food', 'culture', 'asia']
  },
  {
    id: 'explore-10', title: 'Great Barrier Reef Snorkel Tour', location: 'Cairns, Australia', priceZAR: 3200,
    images: [
        'https://images.unsplash.com/photo-1682687981907-170c006e3744?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871', // Coral reef
        'https://images.unsplash.com/photo-1586508577428-120d6b072945?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928', // Snorkeling
        'https://images.unsplash.com/photo-1550016628-71132bfb9c90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=881' // Marine life
    ], rating: 4.8,
    reviews: generateReviews('Great Barrier Reef Tour', 'Australia', 3),
    description: { short: 'Explore the vibrant underwater world of the world\'s largest coral reef.', long: 'Sail to the outer reef on a modern catamaran and spend the day snorkeling or diving amongst colourful coral gardens and diverse marine life, including turtles and giant clams.' },
    tags: ['nature', 'ocean', 'adventure']
  }
];

// TESTIMONIALS - Unique person images
export const testimonials: Testimonial[] = [
  {
    name: 'Aisha Khan',
    location: 'Dubai, UAE',
    quote: 'Booking our desert safari was so intuitive. The animations and dark mode on this site are absolutely stunning. Felt like a luxury experience from the start.',
    image: 'https://images.unsplash.com/photo-1445053023192-8d45cb66099d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Professional woman 1
  },
  {
    name: 'Kenji Tanaka',
    location: 'Kyoto, Japan',
    quote: 'The level of detail is incredible. Finding our cultural tour in Kyoto was easy, and the entire website feels polished and modern. A joy to use!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80', // Professional man 1
  },
  {
    name: 'Fatima Al Fassi',
    location: 'Marrakesh, Morocco',
    quote: 'I found the perfect Riad for my trip. The photos are beautiful and the descriptions are so accurate. This site is my new go-to for travel planning.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80', // Professional woman 2
  },
];

// TRAVEL TIPS
export const travelTips = [
    {
      title: 'Pro Tip: Packing',
      tip: 'Roll your clothes instead of folding them to save space and prevent wrinkles in your suitcase.',
    },
    {
      title: 'Fun Fact: France',
      tip: 'France is the most visited country in the world, attracting over 89 million tourists annually.',
    },
    {
      title: 'Pro Tip: Jet Lag',
      tip: 'Adjust your watch to your destination\'s time zone as soon as you board the plane to mentally prepare for the new time.',
    },
    {
      title: 'Fun Fact: Japan',
      tip: 'Japan has over 5.5 million vending machines, offering everything from hot noodles to fresh eggs.',
    },
    {
      title: 'Pro Tip: Local Etiquette',
      tip: 'Learn a few basic phrases in the local language, like "hello," "thank you," and "goodbye." It shows respect and can go a long way!',
    },
    {
        title: 'Fun Fact: The Vatican',
        tip: 'Vatican City is the smallest country in the world, covering just 0.44 square kilometers.',
    },
    {
      title: 'Pro Tip: Hydration',
      tip: 'Bring a reusable water bottle to stay hydrated and reduce plastic waste. Many airports have water filling stations.',
    },
];


// FEATURED ITEMS
export const featuredHotels = hotels.slice(0, 4).map(h => ({...h, popularity: `${98 - parseInt(h.id.split('-')[1])}% booked`}));
export const featuredPlaces = exploreItems.slice(0, 4).map(e => ({...e, popularity: `${95 - parseInt(e.id.split('-')[1])}% popular`}));
export const featuredCars = cars.slice(0, 4).map(c => ({...c, popularity: `${91 - parseInt(c.id.split('-')[1])}% rented`}));

export const llmMockResponses: Record<string, string> = {
  "default": "I can help you with that! I can search for destinations, flights, hotels, cars, and experiences. What are you looking for today?",
  "hello": "Hello! How can I assist with your travel plans?",
  "flights": "I can definitely help with flights. Where would you like to fly from and to?",
  "hotels": "Looking for a place to stay? I can find the best hotels. What city are you interested in?",
  "cars": "Need a rental car? Let me know the pickup location and dates, and I'll find some great options.",
  "explore": "The world is full of adventures! Are you looking for something specific, like a beach vacation, a historic tour, or a nature hike?",
  "safari": "A safari is an amazing choice! We have incredible packages for Kruger National Park and the Serengeti. Both offer a chance to see the 'Big Five'. The Serengeti is known for the Great Migration, while Kruger offers fantastic self-drive opportunities.",
  "thanks": "You're very welcome! Is there anything else I can help you with today?",
};