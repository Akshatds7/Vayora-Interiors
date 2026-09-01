'use client';
import React from 'react';

// Use WhatsApp number in international format without + or spaces: country code + number.
const PHONE_NUMBER = '917394987500';
const PRESET_TEXT = encodeURIComponent('Hi, I have a question about a product.');

export default function FloatingWhatsAppButton() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${PRESET_TEXT}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="z-50 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
    >
      {/* WhatsApp SVG icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.553 4.162 1.6 5.97L0 24l6.314-1.577A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.198-1.247-6.206-3.48-8.52z" fill="#25D366"/>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.672.15-.198.297-.768.967-.942 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.785-1.48-1.754-1.653-2.051-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.074-.149-.672-1.62-.92-2.222-.242-.58-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.793.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.148.198 2.096 3.2 5.077 4.487 0 0 .037.018.055.018.297.099.572.149.814.074.248-.074 1.758-.72 2.005-1.419.248-.697.248-1.293.173-1.419-.074-.124-.272-.198-.57-.347z" fill="#FFF"/>
      </svg>
    </a>
  );
}
