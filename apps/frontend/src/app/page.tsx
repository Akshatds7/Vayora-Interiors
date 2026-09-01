'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import InquiryModal from '@/components/InquiryModal';
import { useSiteStore } from '@/lib/useSiteStore';
import { Product } from '@skyhome/types';
import { ArrowRight, ShieldCheck, Sparkles, Layers, Wrench, Building, Award, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const { categories, products, featureCards, settings } = useSiteStore();
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-gold" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-gold" />;
      case 'Wrench': return <Wrench className="w-8 h-8 text-gold" />;
      case 'Building': return <Building className="w-8 h-8 text-gold" />;
      case 'Award': return <Award className="w-8 h-8 text-gold" />;
      default: return <Layers className="w-8 h-8 text-gold" />;
    }
  };

  return (
    <div className="bg-ivory text-obsidian overflow-hidden">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Brand Identity Banner with Curved Gold Border Graphics */}
      <section className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto text-center border-b border-gold/20">
        <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30 mb-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-dark">
            ESTABLISHED {settings.establishedYear || '2026'} — EXPERIENCE SINCE {settings.experienceYearsSince || '2018'}
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight max-w-4xl mx-auto leading-tight text-obsidian">
          Transforming Spaces. Defining Interiors.
        </h2>
        <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-6" />
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto font-light leading-relaxed font-sans">
          {settings.brandName || 'Vayora Interiors'} brings stylish, durable, and practical surface solutions under one roof. From PVC wall panels, WPC louvers, and SPC flooring to custom blinds, artificial grass, and toughened glass partitions, we bridge modern aesthetics with long-term reliability.
        </p>
      </section>

      {/* 3. Premium Features Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block mb-2">
            WHY {settings.brandName?.toUpperCase() || 'VAYORA INTERIORS'}
          </span>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-obsidian">
            Premium Features & Capabilities
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((item) => (
            <div
              key={item.id}
              className="bg-ivory border-2 border-gold/20 rounded-3xl p-8 hover:border-gold transition-all duration-300 hover:shadow-2xl space-y-4 text-center group bg-gradient-to-b from-ivory via-ivory to-sand/20"
            >
              <div className="w-16 h-16 rounded-full bg-obsidian text-gold flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg border border-gold/40">
                {getFeatureIcon(item.iconName)}
              </div>
              <h4 className="font-serif text-xl font-bold text-obsidian">{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Product Categories Preview */}
      <section className="py-24 bg-sand/30 border-t border-b border-sand px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-2">
                SOLUTION PORTFOLIO
              </span>
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-obsidian">
                Product Categories
              </h3>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-dark hover:text-gold transition-colors mt-4 md:mt-0"
            >
              <span>Explore Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href="/products"
                className="group relative h-[320px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block bg-obsidian border border-gold/30"
              >
                <Image
                  src={cat.image || '/images/pvc-panel.png'}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
                    VAYORA COLLECTION
                  </span>
                  <h4 className="font-serif text-2xl font-bold mb-1 group-hover:text-gold-light transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-ivory/70 line-clamp-2 font-light">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Bestsellers */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-2">
              CURATED SELECTIONS
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-obsidian">
              Featured Surface Solutions
            </h3>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-dark hover:text-gold transition-colors mt-4 md:mt-0"
          >
            <span>View All ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(p => p.featured).slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-ivory border border-gold/30 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-gold transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden bg-obsidian">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-md text-gold px-3 py-1 rounded-full text-[10px] font-mono font-bold border border-gold/40">
                  {product.sku}
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xl font-bold text-obsidian group-hover:text-gold-dark transition-colors">
                    {product.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 font-light mt-1">
                    {product.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-sand-dark/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                    Available in Stock
                  </span>
                  <button
                    onClick={() => setInquiryProduct(product)}
                    className="px-4 py-1.5 rounded-full bg-obsidian text-ivory text-xs font-bold uppercase hover:bg-gold hover:text-charcoal transition-colors shadow-sm"
                  >
                    Quick Inquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Consultation CTA Section */}
      <section className="py-24 bg-obsidian text-ivory px-6 md:px-12 relative overflow-hidden text-center border-t border-gold/30">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block">
            BUILD YOUR SPACE WITH US
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-bold text-ivory">
            Ready To Elevate Your Home Or Office Interior?
          </h3>
          <p className="text-ivory/80 text-xs md:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Schedule a private consultation with founders Nikhil Srivastava and Akash Soni to select the perfect panels, flooring, or blinds for your project.
          </p>
          <div className="pt-4">
            <Link
              href="/book-consultation"
              className="px-10 py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl"
            >
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>

      {inquiryProduct && (
        <InquiryModal
          product={inquiryProduct}
          onClose={() => setInquiryProduct(null)}
        />
      )}
    </div>
  );
}
