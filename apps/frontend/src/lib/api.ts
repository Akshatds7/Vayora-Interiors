import { Product, Category, Consultation } from '@skyhome/types';
import { siteStore } from './siteStore';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();
    if (!res.ok || data.success === false) {
      throw new Error(data.error || 'API Request Failed');
    }
    return data.data as T;
  } catch (err: any) {
    console.warn(`API call ${endpoint} failed. Error:`, err.message);
    // Use fallback for safe GET requests or store mutations when backend is offline
    const method = (options.method || 'GET').toString().toUpperCase();
    if (method === 'GET') {
      console.warn(`Using local reactive store fallback for GET ${endpoint}`);
      return getFallbackData<T>(endpoint);
    }
    
    // Handle offline mutations for consultations and subscribers
    if (endpoint.includes('/consultation') || endpoint.includes('/inquiries')) {
      if (method === 'POST' && options.body) {
        try {
          const body = JSON.parse(options.body as string);
          const saved = siteStore.addConsultation(body);
          return {
            consultation: saved,
            message: 'Your consultation has been booked successfully! Our interior specialist will contact you on your preferred date.',
          } as unknown as T;
        } catch (e) {
          // ignore
        }
      }
    }

    if (endpoint.includes('/subscribers') && method === 'POST' && options.body) {
      try {
        const body = JSON.parse(options.body as string);
        siteStore.addSubscriber(body.email);
        return { message: 'Thank you for joining the Vayora Interiors circle.' } as unknown as T;
      } catch (e) {
        // ignore
      }
    }

    throw err;
  }
}

function getFallbackData<T>(endpoint: string): T {
  if (endpoint.includes('/products')) {
    return siteStore.getProducts() as unknown as T;
  }

  if (endpoint.includes('/categories')) {
    return siteStore.getCategories() as unknown as T;
  }

  if (endpoint.includes('/consultation') || endpoint.includes('/inquiries')) {
    return siteStore.getConsultations() as unknown as T;
  }

  if (endpoint.includes('/subscribers')) {
    return siteStore.getSubscribers() as unknown as T;
  }

  return [] as unknown as T;
}

