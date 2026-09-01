export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'SUPERADMIN';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  sku: string;
  categoryId: string;
  category?: Category;
  image: string;
  featured: boolean;
  createdAt: string;
  // optional fields for richer client-side filtering
  subcategory?: string | null;
  keywords?: string[];
}

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  query: string;
  preferredContactMethod: string;
  preferredDate: string;
  preferredTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  ip?: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
