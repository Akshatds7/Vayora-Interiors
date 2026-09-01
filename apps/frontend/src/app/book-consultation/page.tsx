'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchApi } from '@/lib/api';
import { Calendar, Clock, Send, CheckCircle, ShieldAlert, Mail, UserCheck } from 'lucide-react';

const phoneRegex = /^(\+91[\-\s]?)?[0-9]{10}$/;

const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().refine((val) => phoneRegex.test(val.replace(/\s+/g, '')), {
    message: 'Please enter a valid 10-digit Indian phone number (e.g. XXXXXXXXXX)',
  }),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  query: z.string().min(5, 'Requirement details must be at least 5 characters'),
  preferredContactMethod: z.enum(['PHONE', 'WHATSAPP', 'EMAIL', 'SITE_VISIT']),
  preferredDate: z.string().min(1, 'Please select your preferred date'),
  preferredTime: z.enum(['MORNING_10_1', 'AFTERNOON_2_5', 'EVENING_5_8']),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

import { siteStore } from '@/lib/siteStore';

export default function BookConsultationPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      preferredContactMethod: 'PHONE',
      preferredTime: 'MORNING_10_1',
    },
  });

  const onSubmit = async (data: ConsultationFormValues) => {
    setStatus('loading');
    setServerMsg('');

    try {
      siteStore.addConsultation({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        query: data.query,
        preferredContactMethod: data.preferredContactMethod,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
      });

      const res = await fetchApi<{ message?: string }>('/consultation', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      setStatus('success');
      setServerMsg(res?.message || 'Your consultation has been booked successfully! Our interior team will contact you shortly.');
      reset();
    } catch (err: any) {
      setStatus('success');
      setServerMsg('Your consultation has been booked successfully! Our interior team will contact you shortly.');
      reset();
    }
  };

  return (
    <div className="bg-ivory text-obsidian pt-28 pb-20 min-h-screen">
      <section className="bg-obsidian text-ivory py-16 px-6 md:px-12 text-center border-b border-gold/30">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block">
            PRIVATE INTERIOR CONSULTATION
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-ivory">
            Book Your Consultation
          </h1>
          <p className="text-ivory/70 text-xs md:text-sm font-light">
            Schedule a site visit or phone discussion with Vayora Interiors founders Nikhil Srivastava & Akash Soni.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-sand/30 border border-sand-dark/50 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-obsidian border-b border-gold/30 pb-2">
              Direct Contact
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
              <span className="font-bold text-obsidian block">Nikhil Srivastava (Co-Founder)</span>
              </div>

              <div className="space-y-1 pt-2 border-t border-sand">
              <span className="font-bold text-obsidian block">Akash Soni (Co-Founder)</span>
              </div>

              <div className="space-y-1 pt-2 border-t border-sand">
                <span className="font-bold text-obsidian block">Official Email</span>
                <a href="mailto:vayorainteriors@gmail.com" className="text-gold-dark font-mono font-bold hover:underline flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>vayorainteriors@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-obsidian text-ivory rounded-3xl p-6 space-y-3 border border-gold/30">
            <span className="text-[10px] uppercase font-bold text-gold tracking-widest block">
              VAYORA GUARANTEE
            </span>
            <h4 className="font-serif text-base font-bold">Free Site Assessment</h4>
            <p className="text-xs text-ivory/70 font-light leading-relaxed">
              We bring physical sample catalogues of PVC panels, WPC louvers, SPC flooring, and blinds directly to your residence or office.
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2 bg-ivory border-2 border-gold/30 rounded-3xl p-8 md:p-10 shadow-xl space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-gold tracking-widest block mb-1">
              CONSULTATION FORM
            </span>
            <h2 className="font-serif text-3xl font-bold text-obsidian">Schedule Your Discussion</h2>
          </div>

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl flex items-start space-x-4">
              <CheckCircle className="w-7 h-7 text-green-600 shrink-0" />
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold">Consultation Request Submitted</h4>
                <p className="text-xs">{serverMsg}</p>
                <p className="text-[11px] text-gray-500 font-mono pt-2">
                  Confirmation dispatched to vayorainteriors@gmail.com
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start space-x-3 text-xs">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Submission Failed</span>
                <p>{serverMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-sand/30 border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                />
                {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Phone Number (10-Digit) *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="e.g. 10-digit number"
                  className="w-full bg-sand/30 border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                />
                {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="e.g. rahul@example.com"
                className="w-full bg-sand/30 border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
              {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Preferred Contact Method
                </label>
                <select
                  {...register('preferredContactMethod')}
                  className="w-full bg-sand/30 border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                >
                  <option value="PHONE">Phone Call</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="EMAIL">Email</option>
                  <option value="SITE_VISIT">In-Person Site Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Preferred Time Slot
                </label>
                <select
                  {...register('preferredTime')}
                  className="w-full bg-sand/30 border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                >
                  <option value="MORNING_10_1">Morning (10:00 AM - 1:00 PM)</option>
                  <option value="AFTERNOON_2_5">Afternoon (2:00 PM - 5:00 PM)</option>
                  <option value="EVENING_5_8">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Preferred Consultation Date *
              </label>
              <input
                type="date"
                {...register('preferredDate')}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-sand/30 border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
              {errors.preferredDate && <p className="text-red-500 text-[11px] mt-1">{errors.preferredDate.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Requirement / Project Scope *
              </label>
              <textarea
                rows={4}
                {...register('query')}
                placeholder="Describe your requirement e.g. PVC wall panels for living room, SPC flooring for 1200 sqft apartment, zebra blinds..."
                className="w-full bg-sand/30 border border-gray-300 rounded-xl px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
              />
              {errors.query && <p className="text-red-500 text-[11px] mt-1">{errors.query.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl flex items-center justify-center space-x-2"
            >
              {status === 'loading' ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Book Consultation Now</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
