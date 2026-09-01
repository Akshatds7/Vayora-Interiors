'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchApi } from '@/lib/api';
import { useSiteStore } from '@/lib/useSiteStore';
import { MapPin, Mail, Clock, Send, CheckCircle, ShieldAlert, MessageSquare, Phone, ExternalLink } from 'lucide-react';

const inquiryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  query: z.string().min(5, 'Query message must be at least 5 characters'),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

export default function ContactPage() {
  const { settings, store } = useSiteStore();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setStatus('loading');
    setServerMsg('');

    try {
      store.addConsultation({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        query: data.query,
        preferredContactMethod: 'PHONE',
        preferredDate: new Date().toISOString().slice(0, 10),
        preferredTime: 'Anytime',
      });

      const res = await fetchApi<{ message?: string }>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      setStatus('success');
      setServerMsg(res?.message || 'Thank you for your inquiry. Our senior interior consultant will contact you within 24 hours.');
      reset();
    } catch (err: any) {
      setStatus('success');
      setServerMsg('Thank you for your inquiry. Our senior interior consultant will contact you within 24 hours.');
      reset();
    }
  };

  const whatsappClean = (settings.whatsappNumber || '917394987500').replace(/[^0-9]/g, '');

  return (
    <div className="bg-ivory text-obsidian pt-28 pb-20">
      <section className="bg-obsidian text-ivory py-16 px-6 md:px-12 text-center border-b border-gold/20">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold block">
            FLAGSHIP ATELIER & CONCIERGE
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-ivory">
            Contact Vayora Interiors
          </h1>
          <p className="text-ivory/70 text-xs md:text-sm font-light">
            Inquire about our products, custom paneling dimensions, or private consultations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-sand/30 border border-sand-dark/50 rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] uppercase font-semibold text-gold tracking-widest block mb-1">
              DIRECT INQUIRY
            </span>
            <h2 className="font-serif text-3xl font-bold text-obsidian">Send Us A Message</h2>
            <p className="text-xs text-gray-600 font-light mt-1">
              Please fill in your details below and our team will get back to you promptly.
            </p>
          </div>

          {serverMsg && (
            <div
              className={`p-4 rounded-xl text-xs flex items-start space-x-3 ${
                status === 'success'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <ShieldAlert className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold">{status === 'success' ? 'Inquiry Sent' : 'Notice'}</span>
                <p>{serverMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="e.g. Eleanor Vance"
                className="w-full bg-ivory border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
              {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Phone Number (WhatsApp Preferred) *
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="e.g. +91 73949 87500"
                className="w-full bg-ivory border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
              {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address (Recommended)
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="e.g. client@example.com"
                className="w-full bg-ivory border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
              {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Inquiry Details / Message *
              </label>
              <textarea
                rows={4}
                {...register('query')}
                placeholder="Describe your surface requirement, architectural specs, or preferred timeline..."
                className="w-full bg-ivory border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
              {errors.query && <p className="text-red-500 text-[11px] mt-1">{errors.query.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-full bg-gold text-charcoal font-semibold text-xs uppercase tracking-[0.2em] hover:bg-gold-dark hover:text-ivory transition-all shadow-xl flex items-center justify-center space-x-2"
            >
              {status === 'loading' ? (
                <span>Processing Submission...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Office Details & Clickable Actions */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase font-semibold text-gold tracking-widest block mb-1">
                ATELIER LOCATIONS
              </span>
              <h2 className="font-serif text-3xl font-bold text-obsidian">Visit Our Flagship</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-sand/30 p-5 rounded-2xl border border-sand-dark/40">
                <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-obsidian text-sm">Headquarters & Showroom</h4>
                  <p className="text-xs text-gray-600 font-light mt-1">
                    {settings.address || 'New Delhi, India'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage || 'Hi Vayora Interiors')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-sand/30 p-4 rounded-2xl border border-sand-dark/40 hover:border-gold transition-colors group"
                >
                  <Phone className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block font-medium">Click-to-Call / WhatsApp</span>
                    <span className="text-xs font-bold text-obsidian font-mono">{settings.phone || '+91 73949 87500'}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email || 'vayorainteriors@gmail.com'}`}
                  className="flex items-center space-x-3 bg-sand/30 p-4 rounded-2xl border border-sand-dark/40 hover:border-gold transition-colors group"
                >
                  <Mail className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block font-medium">Click-to-Email</span>
                    <span className="text-xs font-bold text-obsidian font-mono truncate">{settings.email || 'vayorainteriors@gmail.com'}</span>
                  </div>
                </a>
              </div>

              <div className="flex items-center space-x-4 bg-sand/30 p-5 rounded-2xl border border-sand-dark/40">
                <Clock className="w-6 h-6 text-gold shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-obsidian text-sm">Showroom Operational Hours</h4>
                  <p className="text-xs text-gray-600 font-light mt-0.5">
                    Monday - Saturday: 10:00 AM - 8:00 PM IST (Private Sunday viewings by appointment)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps link / embed */}
          {settings.googleMapsUrl && (
            <div className="p-4 rounded-2xl bg-sand/30 border border-sand-dark/50 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-700">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>Google Maps Location Verified</span>
              </div>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-1 shadow-sm"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
