'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowDown, Sparkles } from 'lucide-react';

import { useSiteStore } from '@/lib/useSiteStore';

export default function HeroCarousel() {
  const { heroSlides } = useSiteStore();
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [
    {
      id: 1,
      title: 'Vayora Interiors',
      subhead: 'Where Quality Meets Design — Premium Interior & Surface Solutions Since 2026',
      tagline: 'LUXURY WALL PANELS & WPC LOUVERS',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
      ctaPrimary: { text: 'Explore Products', href: '/products' },
      ctaSecondary: { text: 'Book Consultation', href: '/book-consultation' },
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const duration = 5000; // Auto change every 5 seconds

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered]);

  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-obsidian text-ivory"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Carousel with Ken Burns & Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center animate-ken-burns scale-105"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />
          {/* Dark Overlay Gradient for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50" />
        </motion.div>
      </AnimatePresence>

      {/* Curved Gold Borders Header Accent */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-20 overflow-hidden">
        <div className="w-full h-full border-b border-gold/30 rounded-b-[50%] bg-gradient-to-b from-obsidian/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl space-y-6 pt-12"
          >
            {/* Logo Emblem & Tagline Badge */}
            <div className="inline-flex items-center space-x-3 bg-gold/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/40 shadow-lg">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-gold-light">
                {slides[current].tagline}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-ivory drop-shadow-2xl">
              {slides[current].title}
            </h1>

            {/* Subhead */}
            <p className="text-base md:text-2xl text-gold/90 font-serif italic tracking-wide">
              {slides[current].subhead}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={slides[current].ctaPrimary.href}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all duration-300 shadow-xl shadow-gold/20"
              >
                {slides[current].ctaPrimary.text}
              </Link>
              <Link
                href={slides[current].ctaSecondary.href}
                className="px-8 py-4 rounded-full border-2 border-gold/60 bg-charcoal/50 backdrop-blur-md text-ivory font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-charcoal transition-all duration-300"
              >
                {slides[current].ctaSecondary.text}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="py-2 focus:outline-none"
            >
              <div
                className={`h-[3px] transition-all duration-500 rounded-full ${
                  current === idx ? 'w-12 bg-gold' : 'w-6 bg-ivory/30'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 bg-charcoal/80 backdrop-blur-lg px-4 py-2 rounded-full border border-gold/30">
          <button onClick={() => setIsPlaying(!isPlaying)} className="text-ivory/70 hover:text-gold p-1">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="w-[1px] h-4 bg-ivory/20" />
          <button onClick={handlePrev} className="text-ivory/70 hover:text-gold p-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-gold font-bold">
            0{current + 1} / 0{slides.length}
          </span>
          <button onClick={handleNext} className="text-ivory/70 hover:text-gold p-1">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
