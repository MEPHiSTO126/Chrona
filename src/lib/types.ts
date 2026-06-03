// Shared TypeScript interfaces matching the Django REST API contract

export interface ProductImage {
  id: string;
  image_url: string;
  is_primary: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: Category | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: Category;
  images: ProductImage[];
  price: number;
  discounted_price?: number;
  stock: number;
  is_flash_sale: boolean;
  tags: string[];
  color_variants?: string[];
  date_of_manufacture?: string;
  ratings_avg: number;
  review_count?: number;
  sale_end_time?: string; // ISO 8601 datetime
}

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  product_id: string;
  rating: number;
  title: string;
  body: string;
  images?: string[];
  created_at: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  is_default: boolean;
}

export interface Order {
  id: string;
  address: Address;
  items: CartOrderItem[];
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
}

export interface CartOrderItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Banner {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  is_active: boolean;
}
