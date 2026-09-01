'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { Product } from '@skyhome/types';
import { fetchApi } from '@/lib/api';

interface InquiryModalProps {
  product?: Product | null;
  onClose: () => void;
}

export default function InquiryModal({ product, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: product ? `I am interested in receiving a private quote and customization options for "${product.title}".` : '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await fetchApi('/inquiries', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          productTitle: product?.title,
          productId: product?.id,
        }),
      });

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fade-in">
      <div className="bg-ivory border border-gold/30 rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gold transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-obsidian">Inquiry Received</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
            Thank you for contacting Vayora Interiors. Our senior interior consultant will contact you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 rounded-full bg-gold text-charcoal font-semibold text-xs uppercase tracking-widest hover:bg-gold-dark hover:text-ivory transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-gold/20 pb-3">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gold block">
                PRIVATE ATELIER INQUIRY
              </span>
              <h3 className="font-serif text-xl font-bold text-obsidian">
                {product ? `Inquire about ${product.title}` : 'Request Interior Consultation'}
              </h3>
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lord Alexander Thorne"
                className="w-full px-4 py-2.5 rounded-lg bg-sand/30 border border-gray-300 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number (with Country Code) *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 XXXXXXXXXX"
                className="w-full px-4 py-2.5 rounded-lg bg-sand/30 border border-gray-300 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address (Optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alexander@estate.com"
                className="w-full px-4 py-2.5 rounded-lg bg-sand/30 border border-gray-300 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Inquiry / Custom Requirement *</label>
              <textarea
                required
                rows={3}
                value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                placeholder="Specify dimensions, fabric preference, or delivery timeline..."
                className="w-full px-4 py-2.5 rounded-lg bg-sand/30 border border-gray-300 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-full bg-gold text-charcoal font-semibold text-xs uppercase tracking-widest hover:bg-gold-dark hover:text-ivory transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              {status === 'loading' ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Private Inquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
