export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  is_active?: number;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  sort_order: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  description: string;
  price?: number;
  is_new?: number;
  is_active?: number;
  images: ProductImage[];
  colors: string[];
}

export interface Slide {
  id: number;
  image_path: string;
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  sort_order?: number;
  is_active?: number;
}
