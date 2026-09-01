'use client';

import React from 'react';
import Image from 'next/image';
import { X, CheckCircle, Send } from 'lucide-react';
import { Product } from '@skyhome/types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenInquiry: (product: Product) => void;
}

export default function QuickViewModal({ product, onClose, onOpenInquiry }: QuickViewModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fade-in">
      <div className="bg-ivory border-2 border-gold/40 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-obsidian/80 text-ivory flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 relative min-h-[280px] bg-obsidian">
          <Image src={product.image} alt={product.title} fill className="object-cover" />
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-gold bg-gold/10 px-3 py-1 rounded-full inline-block">
              VAYORA SOLUTION
            </span>
            <h3 className="font-serif text-2xl font-bold text-obsidian">{product.title}</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">{product.description}</p>
            <div className="text-[11px] font-mono text-gray-400">SKU: {product.sku}</div>
          </div>

          <div className="pt-4 border-t border-sand space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenInquiry(product);
              }}
              className="w-full py-3.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-widest hover:bg-gold-dark hover:text-ivory transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Inquire / Request Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
