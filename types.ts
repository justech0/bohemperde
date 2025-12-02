export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price?: number; // Optional as per business model
  images: string[];
  description: string;
  colors: string[];
  isNew?: boolean;
}

export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}