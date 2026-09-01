'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, FileText, Maximize2, ZoomIn, ZoomOut, CheckCircle, Sparkles, Layers, Mail } from 'lucide-react';

import { useSiteStore } from '@/lib/useSiteStore';

export default function BrochurePage() {
  const { brochure, store } = useSiteStore();
  const [activeTab, setActiveTab] = useState<'VIEWER' | 'PAGE1' | 'PAGE2'>('VIEWER');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleDownload = () => {
    store.recordBrochureDownload();
    const link = document.createElement('a');
    link.href = brochure.downloadUrl || '/vayora%20interiors%20brochure.pdf';
    link.download = brochure.filename || 'vayora interiors brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-ivory text-obsidian pt-28 pb-20 min-h-screen">
      {/* Header Banner */}
      <section className="bg-obsidian text-ivory py-16 px-6 md:px-12 text-center border-b border-gold/30">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gold/15 px-4 py-1.5 rounded-full border border-gold/40">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-light">
              OFFICIAL DIGITAL CATALOGUE 2026
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-ivory">
            Vayora Interiors Brochure
          </h1>
          <p className="text-ivory/70 text-xs md:text-sm font-light max-w-2xl mx-auto leading-relaxed">
            Browse our full catalogue of PVC panels, WPC louvers, artificial grass, blinds, curtains, exterior claddings, and SPC flooring.
          </p>

          <div className="pt-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-gold/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Brochure PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Brochure Viewer Area */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-8">
        {/* Navigation & Controls Bar */}
        <div className="bg-charcoal text-ivory p-4 rounded-2xl border border-gold/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('VIEWER')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === 'VIEWER'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'bg-obsidian text-ivory/70 hover:text-gold'
              }`}
            >
              Interactive PDF Reader
            </button>
            <button
              onClick={() => setActiveTab('PAGE1')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === 'PAGE1'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'bg-obsidian text-ivory/70 hover:text-gold'
              }`}
            >
              Page 1 (Brand & Contact)
            </button>
            <button
              onClick={() => setActiveTab('PAGE2')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === 'PAGE2'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'bg-obsidian text-ivory/70 hover:text-gold'
              }`}
            >
              Page 2 (Products)
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(75, prev - 15))}
              className="p-2 bg-obsidian text-ivory/80 hover:text-gold rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-gold">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(150, prev + 15))}
              className="p-2 bg-obsidian text-ivory/80 hover:text-gold rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-xl bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-colors shadow-md flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Display Container */}
        {activeTab === 'VIEWER' && (
          <div className="bg-obsidian border-4 border-gold/40 rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden min-h-[650px] flex items-center justify-center">
            <object
              data="/vayora%20interiors%20brochure.pdf"
              type="application/pdf"
              className="w-full h-[700px] rounded-2xl border border-gold/20"
            >
              <div className="text-center p-8 text-ivory space-y-4">
                <FileText className="w-12 h-12 text-gold mx-auto" />
                <p className="text-sm">Previewing PDF Brochure...</p>
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gold text-charcoal font-bold text-xs uppercase tracking-wider rounded-full"
                >
                  Download PDF
                </button>
              </div>
            </object>
          </div>
        )}

        {activeTab === 'PAGE1' && (
          <div className="bg-obsidian border-4 border-gold/40 rounded-3xl p-6 md:p-10 shadow-2xl text-ivory space-y-8">
            <div className="text-center space-y-2 border-b border-gold/30 pb-6">
              <span className="text-xs uppercase font-bold text-gold tracking-widest">
                VAYORA INTERIORS — BROCHURE PAGE 1
              </span>
              <h2 className="font-serif text-3xl font-bold text-ivory">Brand & Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-charcoal border border-gold/30 p-8 rounded-2xl space-y-6 text-center">
                <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto text-gold font-serif text-2xl font-bold bg-obsidian">
                  VI
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-bold text-ivory tracking-widest">VAYORA INTERIORS</h3>
                  <p className="text-gold text-xs uppercase font-bold tracking-[0.25em] mt-1">WHERE QUALITY MEETS DESIGN</p>
                </div>
                <div className="w-16 h-[2px] bg-gold mx-auto" />
                <p className="text-xs text-ivory/70 font-light leading-relaxed">
                  All Rights Reserved @vayora Interiors
                </p>
              </div>

              <div className="bg-charcoal border border-gold/30 p-8 rounded-2xl space-y-6">
                <h4 className="font-serif text-xl font-bold text-gold border-b border-gold/20 pb-3">Contact Information</h4>
                
                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <span className="text-ivory/50 uppercase block font-sans text-[10px]">Co-Founder</span>
                    <span className="text-ivory font-bold font-sans text-sm">Nikhil Srivastava</span>
                  </div>

                  <div>
                    <span className="text-ivory/50 uppercase block font-sans text-[10px]">Co-Founder</span>
                    <span className="text-ivory font-bold font-sans text-sm">Akash Soni</span>
                  </div>

                  <div>
                    <span className="text-ivory/50 uppercase block font-sans text-[10px]">Email</span>
                    <a href="mailto:vayorainteriors@gmail.com" className="text-gold font-bold hover:underline">vayorainteriors@gmail.com</a>
                  </div>

                  <div>
                    <span className="text-ivory/50 uppercase block font-sans text-[10px]">Website</span>
                    <span className="text-gold font-bold">www.vayorainteriors.com</span>
                  </div>

                  <div>
                    <span className="text-ivory/50 uppercase block font-sans text-[10px]">Location</span>
                    <span className="text-ivory font-bold">New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'PAGE2' && (
          <div className="bg-obsidian border-4 border-gold/40 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 text-ivory">
            <div className="text-center space-y-2 border-b border-gold/30 pb-6">
              <span className="text-xs uppercase font-bold text-gold tracking-widest">
                VAYORA INTERIORS — BROCHURE PAGE 2
              </span>
              <h2 className="font-serif text-3xl font-bold text-ivory">Solutions & Products Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'WALL & DECORATIVE PANELS', items: 'PVC Panels, Charcoal Panels, WPC Louvers (17mm & 23mm), Super Slim, Super Heavy' },
                { title: 'ARTIFICIAL GREENERY & GRASS', items: 'Dense Landscape Artificial Grass & Botanical Vertical Gardens' },
                { title: 'BLINDS', items: 'Roller Blinds, Zebra Blinds, Vertical Blinds, Wooden Blinds, Customised Solutions' },
                { title: 'CURTAINS & ACCESSORIES', items: 'Belgian Linen Curtains & Motorized Curtain Channel Tracks' },
                { title: 'EXTERIOR & OUTDOOR PRODUCTS', items: 'ACP Exterior Sheets & Weatherproof Cladding Panels' },
                { title: 'GLASS PRODUCTS', items: 'Acoustic Toughened Tafan Glass Dividers' },
                { title: 'PVC & SPC FLOORING', items: '100% Waterproof SPC Click Flooring, Wooden Flooring, PVC Planks' },
                { title: 'POP & GYPSUM FALSE CEILING', items: 'Acoustic False Ceiling & Decorative Roof Panels' },
                { title: 'TV PANEL & WOODEN WORK', items: 'Custom TV Backwall Entertainment Kits & Architectural Woodwork' },
              ].map((item, idx) => (
                <div key={idx} className="bg-charcoal border border-gold/20 p-5 rounded-2xl space-y-2 hover:border-gold transition-all">
                  <h4 className="font-serif text-base font-bold text-gold">{item.title}</h4>
                  <p className="text-xs text-ivory/70 font-light leading-relaxed">{item.items}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Download Callout Card */}
        <div className="bg-sand/40 border border-sand-dark/50 rounded-3xl p-8 text-center space-y-4 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-obsidian">Download Vector PDF Brochure</h3>
          <p className="text-xs text-gray-600 font-light max-w-xl mx-auto">
            Get the full resolution digital PDF file for high-quality printing, architect reviews, or offline viewing.
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-2 px-10 py-4 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-dark hover:text-ivory transition-all shadow-xl"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Brochure PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
