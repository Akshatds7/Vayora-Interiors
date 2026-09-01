'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Wrench, ShieldCheck, Compass, Sparkles, Building, ArrowRight, CheckCircle } from 'lucide-react';
import { useSiteStore } from '@/lib/useSiteStore';

export default function ServicesPage() {
  const { services, processSteps } = useSiteStore();

  const getServiceIcon = (name?: string) => {
    switch (name) {
      case 'Wrench': return <Wrench className="w-8 h-8 text-gold" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-gold" />;
      case 'Building': return <Building className="w-8 h-8 text-gold" />;
      case 'Compass': return <Compass className="w-8 h-8 text-gold" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-gold" />;
      default: return <Layers className="w-8 h-8 text-gold" />;
    }
  };

  return (
    <div className="bg-ivory text-obsidian pt-28 pb-20">
      <section className="bg-obsidian text-ivory py-16 px-6 md:px-12 text-center border-b border-gold/30">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block">
            OUR PROFESSIONAL CAPABILITIES
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-ivory">
            Services & Surface Execution
          </h1>
          <p className="text-ivory/70 text-xs md:text-sm font-light">
            End-to-end material supply, custom fabrication, and professional installation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-ivory border-2 border-gold/20 rounded-3xl p-6 hover:border-gold transition-all duration-300 hover:shadow-xl space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-obsidian flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-md">
                    {getServiceIcon(srv.iconName)}
                  </div>
                  {srv.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">
                      {srv.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-obsidian">{srv.title}</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="bg-sand/30 border border-sand-dark/50 rounded-3xl p-8 md:p-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block mb-2">
              SEAMLESS EXECUTION
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-obsidian">
              Our 5-Step Process Timeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {processSteps.map((p, i) => (
              <div key={i} className="bg-ivory border border-gold/30 rounded-2xl p-6 shadow-md relative text-center space-y-3">
                <span className="font-serif text-3xl font-bold text-gold block">{p.step}</span>
                <h4 className="font-serif text-base font-bold text-obsidian">{p.title}</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-obsidian text-ivory rounded-3xl p-10 md:p-16 text-center space-y-6 border border-gold/30">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory">
            Ready To Start Your Interior Project?
          </h2>
          <p className="text-ivory/70 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Book a site consultation with Vayora Interiors founders Nikhil Srivastava and Akash Soni.
          </p>
          <Link
            href="/book-consultation"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
