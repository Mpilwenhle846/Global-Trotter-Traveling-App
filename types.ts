
export type Page = 'Home' | 'Flights' | 'Hotels' | 'Cars' | 'Explore';

export interface Review {
  name: string;
  date: string;
  text: string;
}

export interface BaseItem {
  id: string;
  title: string;
  location: string;
  priceZAR: number;
  images: string[];
  rating: number;
  reviews: Review[];
  description: {
    short: string;
    long: string;
  };
}

export interface Flight extends BaseItem {
  airline: string;
  duration: string;
}

export interface Hotel extends BaseItem {
  amenities: string[];
}

export interface Car extends BaseItem {
  type: string;
  seats: number;
  features: string[];
}

export interface ExploreItem extends BaseItem {
  tags: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  image: string;
}

export type Item = Flight | Hotel | Car | ExploreItem;
export type ItemType = 'flight' | 'hotel' | 'car' | 'explore';