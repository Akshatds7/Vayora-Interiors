'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Shield } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Admin Panel', href: '/admin/login' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-charcoal/95 backdrop-blur-md py-3 border-b border-gold/30 shadow-2xl'
          : 'bg-gradient-to-b from-obsidian/90 via-obsidian/60 to-transparent py-5'
      }`}
    >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Emblem */}
          <Link href="/" className="group flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/70 shadow-lg bg-obsidian shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Vayora Interiors Monogram"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isAdmin = link.name === 'Admin Panel';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors py-1 flex items-center space-x-1 ${
                    isActive
                      ? 'text-gold font-semibold'
                      : isAdmin
                      ? 'text-gold/90 hover:text-gold border border-gold/40 px-3 py-1 rounded-full bg-gold/10'
                      : 'text-ivory/80 hover:text-gold-light'
                  }`}
                >
                  {isAdmin && <Shield className="w-3 h-3 text-gold" />}
                  <span>{link.name}</span>
                  {isActive && !isAdmin && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full shadow-sm" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/book-consultation"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal text-xs uppercase tracking-widest font-bold hover:shadow-xl hover:scale-105 transition-all shadow-gold/20"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-ivory hover:text-gold p-2 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7 text-gold" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Slide Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[73px] bg-obsidian/98 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 border-t border-gold/20 animate-fade-in">
            <div className="flex flex-col space-y-5 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-base font-serif tracking-wider border-b border-ivory/10 pb-3 transition-colors ${
                    pathname === link.href ? 'text-gold font-semibold' : 'text-ivory hover:text-gold'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gold/60" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-3 pt-6">
              <Link
                href="/book-consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all shadow-xl"
              >
                Book Your Consultation
              </Link>
            </div>
          </div>
        )}
      </header>
  );
}
