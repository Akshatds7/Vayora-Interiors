'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, ExternalLink, Phone, ShieldCheck, CheckCircle } from 'lucide-react';
import { useSiteStore } from '@/lib/useSiteStore';
import { fetchApi } from '@/lib/api';

export default function Footer() {
  const { settings, about, categories } = useSiteStore();
  const whatsappClean = (settings.whatsappNumber || '917394987500').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-obsidian text-ivory border-t border-gold/30 pt-20 pb-12 relative overflow-hidden">
      {/* Decorative Gold Curved Header Accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand Overview & Logo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold shrink-0 bg-charcoal shadow-xl">
              <Image
                src="/images/logo.png"
                alt="Vayora Interiors"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-ivory block uppercase">
                {settings.brandName || 'VAYORA INTERIORS'}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold block font-semibold">
                {settings.tagline || 'WHERE QUALITY MEETS DESIGN'}
              </span>
            </div>
          </div>
          <p className="text-ivory/70 text-xs md:text-sm leading-relaxed pr-4 font-light">
            Vayora Interiors specializes in luxury interior panels, WPC louvers, artificial grass, blinds, curtains, exterior cladding, glass products, and wooden flooring solutions designed to define contemporary architecture.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-base font-bold text-gold tracking-wider uppercase border-b border-gold/20 pb-2">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs tracking-wider uppercase">
            {[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'Brochure PDF', href: '/brochure' },
              { name: 'Services', href: '/services' },
              { name: 'About Us', href: '/about' },
              { name: 'Book Consultation', href: '/book-consultation' },
              { name: 'Admin Portal', href: '/admin/login' },
            ].map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-ivory/70 hover:text-gold transition-colors flex items-center space-x-2">
                  <span className="text-gold text-[10px]">›</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Categories */}
        <div className="space-y-4">
          <h4 className="font-serif text-base font-bold text-gold tracking-wider uppercase border-b border-gold/20 pb-2">
            Solutions
          </h4>
          <ul className="space-y-2 text-xs tracking-wider text-ivory/70 uppercase">
            {categories.slice(0, 8).map((cat) => (
              <li key={cat.id}>
                <Link href="/products" className="hover:text-gold transition-colors flex items-center space-x-2">
                  <span className="text-gold text-[10px]">›</span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Contact Info & Founders */}
        <div className="space-y-4">
          <h4 className="font-serif text-base font-bold text-gold tracking-wider uppercase border-b border-gold/20 pb-2">
            Contact & Founders
          </h4>
          <ul className="space-y-3 text-xs text-ivory/80">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>{settings.address || 'New Delhi, India'}</span>
            </li>
            {about.founders && about.founders.length > 0 ? (
              about.founders.map((f, idx) => (
                <li key={idx} className="flex flex-col space-y-0.5">
                  <div className="font-bold text-ivory">
                    <span>{f.name} ({f.role.includes('Co-Founder') ? 'Co-Founder' : f.role})</span>
                  </div>
                </li>
              ))
            ) : (
              <>
                <li className="flex flex-col space-y-1">
                  <span className="font-bold text-ivory">Nikhil Srivastava (Co-Founder)</span>
                </li>
                <li className="flex flex-col space-y-1">
                  <span className="font-bold text-ivory">Akash Soni (Co-Founder)</span>
                </li>
              </>
            )}
            <li className="flex items-center space-x-3 pt-1">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a
                href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage || 'Hi Vayora Interiors')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors font-mono"
              >
                {settings.phone || '+91 73949 87500'}
              </a>
            </li>
            <li className="flex items-center space-x-3 pt-1">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href={`mailto:${settings.email || 'vayorainteriors@gmail.com'}`} className="hover:text-gold transition-colors font-mono">
                {settings.email || 'vayorainteriors@gmail.com'}
              </a>
            </li>
            {settings.googleMapsUrl && (
              <li className="pt-2">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11px] font-semibold hover:bg-gold hover:text-charcoal transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory/50 space-y-4 md:space-y-0">
        <p>© {new Date().getFullYear()} {settings.brandName || 'Vayora Interiors'}. All Rights Reserved.</p>
        <p className="font-serif italic text-gold/80">{settings.tagline || 'Where Quality Meets Design'}</p>
      </div>
    </footer>
  );
}
