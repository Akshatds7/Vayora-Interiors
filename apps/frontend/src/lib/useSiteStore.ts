'use client';

import { useState, useEffect } from 'react';
import { siteStore, EVENT_NAME, SiteData } from './siteStore';

export function useSiteStore() {
  const [data, setData] = useState<SiteData>(siteStore.getData());

  useEffect(() => {
    // Initial fetch once mounted on client
    setData(siteStore.getData());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<SiteData>;
      if (customEvent.detail) {
        setData({ ...customEvent.detail });
      } else {
        setData(siteStore.getData());
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    return () => window.removeEventListener(EVENT_NAME, handleUpdate);
  }, []);

  return {
    data,
    store: siteStore,
    products: data.products,
    categories: data.categories,
    heroSlides: data.heroSlides,
    featureCards: data.featureCards,
    services: data.services,
    processSteps: data.processSteps,
    about: data.about,
    brochure: data.brochure,
    settings: data.settings,
    consultations: data.consultations,
    subscribers: data.subscribers,
  };
}
