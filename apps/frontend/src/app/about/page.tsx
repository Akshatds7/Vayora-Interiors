'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Award, Compass, ShieldCheck, CheckCircle, UserCheck } from 'lucide-react';
import { useSiteStore } from '@/lib/useSiteStore';

export default function AboutPage() {
  const { about, settings } = useSiteStore();

  return (
    <div className="bg-ivory text-obsidian pt-28 pb-20">
      {/* Header Banner */}
      <section className="bg-obsidian text-ivory py-20 px-6 md:px-12 text-center border-b border-gold/30">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block">
            {about.tagline || 'ABOUT VAYORA INTERIORS'}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-ivory">
            {about.heading || 'Transforming Spaces. Defining Interiors.'}
          </h1>
          <p className="text-gold/90 text-sm md:text-lg font-serif italic max-w-2xl mx-auto">
            {about.subheading || 'Where Quality Meets Design'}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-16">
        {/* Story */}
        <div className="bg-ivory border-2 border-gold/30 rounded-3xl p-8 md:p-12 shadow-md space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block">
            OUR STORY
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-obsidian">
            {about.storyTitle || 'Establishing Excellence in Surface & Interior Solutions'}
          </h2>
          <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-light">
            {about.storyP1}
          </p>
          {about.storyP2 && (
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-light">
              {about.storyP2}
            </p>
          )}
          {about.storyHighlight && (
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-light bg-sand/40 p-4 rounded-xl border-l-4 border-gold">
              {about.storyHighlight}
            </p>
          )}
        </div>

        {/* Experience & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-sand/30 border border-sand-dark/50 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-obsidian">Our Experience</h3>
            <p className="text-gray-700 text-xs md:text-sm font-light leading-relaxed">
              {about.experienceDesc ||
                `Although Vayora Interiors was launched in ${about.launchYear || '2026'}, our experience in the industry goes back to ${about.experienceYear || '2018'}.`}
            </p>
          </div>

          <div className="bg-sand/30 border border-sand-dark/50 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-obsidian">{about.visionTitle || 'Our Vision'}</h3>
            <p className="text-gray-700 text-xs md:text-sm font-light leading-relaxed">
              {about.visionDesc ||
                'To become a trusted name in the interior and exterior solutions industry by continuously bringing modern designs, quality materials, customized solutions, and dependable service to our customers.'}
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-obsidian text-ivory border border-gold/30 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block">
            OUR MISSION
          </span>
          <h3 className="font-serif text-3xl font-bold text-ivory">Commitment To Quality & Service</h3>
          <p className="text-ivory/80 text-xs md:text-sm font-light">At Vayora Interiors, our mission is simple:</p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light text-ivory/90">
            {[
              'To provide quality interior and exterior products.',
              'To offer modern and versatile design solutions.',
              "To understand every customer's unique requirements.",
              'To provide customized options wherever possible.',
              'To maintain professional service from selection to installation.',
              'To build long-term relationships through quality and reliability.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 bg-charcoal p-3.5 rounded-xl border border-gold/20">
                <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Founders Section */}
        <div className="bg-sand/40 border-2 border-gold/30 rounded-3xl p-8 md:p-12 space-y-8 shadow-md">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold block mb-1">
              LEADERSHIP & VISIONARIES
            </span>
            <h3 className="font-serif text-3xl font-bold text-obsidian">Our Founders</h3>
            <p className="text-xs text-gray-600 font-light mt-2 max-w-xl mx-auto">
              Together, the founders aim to build Vayora Interiors as a reliable and innovative brand for residential, commercial, and architectural interior requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {about.founders && about.founders.map((founder, idx) => (
              <div key={idx} className="bg-ivory border border-gold/40 p-8 rounded-2xl shadow-sm space-y-3 text-center">
                <div className="w-16 h-16 rounded-full bg-obsidian text-gold flex items-center justify-center mx-auto border-2 border-gold shadow-md">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-obsidian">{founder.name}</h4>
                  <p className="text-xs uppercase font-bold tracking-wider text-gold-dark mt-0.5">{founder.role}</p>
                </div>
                {founder.bio && (
                  <p className="text-xs text-gray-600 font-light leading-relaxed">{founder.bio}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-sand">
            <span className="text-xs text-gray-500 uppercase font-semibold block mb-1">Official Email Address</span>
            <a
              href={`mailto:${settings.email || 'vayorainteriors@gmail.com'}`}
              className="inline-flex items-center space-x-2 text-sm font-mono font-bold text-gold-dark hover:underline"
            >
              <Mail className="w-4 h-4 text-gold" />
              <span>{settings.email || 'vayorainteriors@gmail.com'}</span>
            </a>
          </div>
        </div>

        {/* Final Signoff */}
        <div className="bg-obsidian text-ivory rounded-3xl p-10 text-center space-y-4 border border-gold/30 shadow-xl">
          <h3 className="font-serif text-3xl font-bold text-ivory">Build Your Space With Vayora Interiors</h3>
          <p className="text-ivory/80 text-xs md:text-sm max-w-2xl mx-auto font-light">
            Whether you are designing a home, upgrading an office, renovating a commercial space, or looking for a distinctive exterior solution, Vayora Interiors offers a diverse range of products to help bring your ideas to life.
          </p>
          <p className="font-serif italic text-gold text-lg font-bold">
            Vayora Interiors — Where Quality Meets Design.
          </p>
        </div>
      </div>
    </div>
  );
}
