'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/InquiryModal';
import { fetchApi } from '@/lib/api';
import { Product, Category } from '@skyhome/types';
import { Search, Send, Filter, CheckCircle, RotateCcw } from 'lucide-react';

/**
 * Normalization helper to guarantee robust matching across:
 * - Uppercase/lowercase
 * - Spaces
 * - '&' vs 'and'
 * - Hyphens/underscores/special characters
 */
function normalizeSlug(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[\s\-_]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

import { useSiteStore } from '@/lib/useSiteStore';

export default function ProductsPage() {
  const { products, categories } = useSiteStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  // Robust Category Matching
  const isCategoryMatch = (prodCatId: string, selectedCat: string): boolean => {
    if (selectedCat === 'all') return true;
    if (!prodCatId) return false;

    // 1. Direct ID / slug comparison
    if (prodCatId === selectedCat) return true;

    // 2. Find target category object from list
    const targetCat = categories.find(
      (c) =>
        c.id === selectedCat ||
        c.slug === selectedCat ||
        normalizeSlug(c.id) === normalizeSlug(selectedCat) ||
        normalizeSlug(c.slug) === normalizeSlug(selectedCat) ||
        normalizeSlug(c.name) === normalizeSlug(selectedCat)
    );

    if (!targetCat) {
      // Direct string slug comparison fallback
      return normalizeSlug(prodCatId) === normalizeSlug(selectedCat);
    }

    // 3. Match product categoryId against target category id, slug, or normalized variants
    const normProdCat = normalizeSlug(prodCatId);
    return (
      prodCatId === targetCat.id ||
      prodCatId === targetCat.slug ||
      normProdCat === normalizeSlug(targetCat.id) ||
      normProdCat === normalizeSlug(targetCat.slug) ||
      normProdCat === normalizeSlug(targetCat.name)
    );
  };

  // Improved Filtered Products (Category first, then search across multiple fields)
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((prod) => {
    const matchesCat = isCategoryMatch(prod.categoryId || prod.category?.id || prod.category?.slug || '', selectedCategory);

    if (!matchesCat) return false;

    if (!normalizedSearch) return true;

    const haystack = [
      prod.title,
      prod.slug,
      prod.description,
      prod.sku,
      prod.subcategory || '',
      prod.categoryId || prod.category?.name || '',
      ...(prod.keywords || []),
    ]
      .filter(Boolean)
      .join(' | ')
      .toLowerCase();

    return haystack.includes(normalizedSearch);
  });


  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-ivory text-obsidian pt-28 pb-20 min-h-screen">
      {/* Header Banner */}
      <section className="bg-obsidian text-ivory py-16 px-6 md:px-12 text-center border-b border-gold/30">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block">
            THE VAYORA SOLUTIONS CATALOGUE
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-ivory">
            Interior & Surface Solutions
          </h1>
          <p className="text-ivory/70 text-xs md:text-sm font-light">
            Explore our curated wall panels, WPC louvers, artificial grass, blinds, curtains, exterior claddings, and SPC flooring.
          </p>
        </div>
      </section>

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-sand pb-8">
          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-gold text-charcoal shadow-md font-extrabold scale-105'
                  : 'bg-sand/60 text-obsidian/80 hover:bg-sand hover:text-obsidian'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => {
              const isActive =
                selectedCategory === cat.id ||
                selectedCategory === cat.slug ||
                normalizeSlug(selectedCategory) === normalizeSlug(cat.slug) ||
                normalizeSlug(selectedCategory) === normalizeSlug(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id || cat.slug)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 shrink-0 ${
                    isActive
                      ? 'bg-gold text-charcoal shadow-md font-extrabold scale-105'
                      : 'bg-sand/60 text-obsidian/80 hover:bg-sand hover:text-obsidian'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Result Summary Header */}
        {selectedCategory !== 'all' && (
          <div className="flex items-center justify-between bg-sand/40 p-4 rounded-2xl border border-sand-dark/40 mb-8">
            <span className="text-xs text-obsidian font-semibold">
              Showing <strong className="text-gold-dark">{filteredProducts.length}</strong> items in{' '}
              <strong className="text-gold-dark">
                {categories.find((c) => isCategoryMatch(c.id, selectedCategory))?.name || selectedCategory}
              </strong>
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-gold-dark hover:text-gold uppercase font-bold tracking-wider flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All</span>
            </button>
          </div>
        )}

        {/* Products Grid (No Rates Displayed) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-sand/20 rounded-3xl border border-sand space-y-4">
            <p className="font-serif text-xl text-gray-600">No interior items match your criteria.</p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-gold text-charcoal text-xs uppercase font-bold tracking-wider hover:bg-gold-dark hover:text-ivory transition-colors shadow-md inline-flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET FILTERS</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-ivory rounded-3xl border-2 border-gold/20 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="relative h-[280px] bg-obsidian overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-obsidian/85 backdrop-blur-md text-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-gold/40">
                    Vayora Solution
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-obsidian group-hover:text-gold-dark transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 mt-2 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sand flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold text-gray-400 font-mono">
                      SKU: {product.sku}
                    </span>
                    <button
                      onClick={() => setInquiryProduct(product)}
                      className="px-5 py-2.5 rounded-full bg-gold text-charcoal text-xs uppercase tracking-wider font-bold hover:bg-gold-dark hover:text-ivory transition-colors shadow-md flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Inquire Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {inquiryProduct && (
        <InquiryModal
          product={inquiryProduct}
          onClose={() => setInquiryProduct(null)}
        />
      )}
    </div>
  );
}
