'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function FloatingBrochureButton() {
  const router = useRouter();

  const openBrochure = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to the existing brochure page (reuses viewer)
    router.push('/brochure');
  };

  return (
    <button
      onClick={openBrochure}
      aria-label="View Brochure"
      title="View Brochure"
      className={
        "z-50 w-14 h-14 md:w-16 md:h-16 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-xl hover:scale-105 focus:scale-105 transition-transform focus:outline-none ring-2 ring-gold/30"
      }
    >
      {/* Brochure/document SVG icon (inline, no external file) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7 md:w-8 md:h-8"
        aria-hidden="true"
      >
        <path d="M7 2h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7h8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12h8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 17h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Visually hidden label for screen readers (redundant with aria-label but helpful) */}
      <span className="sr-only">View Brochure</span>
    </button>
  );
}
