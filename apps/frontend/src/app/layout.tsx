import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBrochureButton from '@/components/FloatingBrochureButton';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';

export const metadata: Metadata = {
  title: 'Vayora Interiors',
  description: 'Discover European-inspired luxury sofas, handcrafted marble dining suites, bespoke drapery, and architectural wooden heirlooms for luxury residences, penthouses, and 5-star hotels.',
  keywords: 'luxury furniture, Restoration Hardware style, B&B Italia style, marble dining table, Italian leather sofa, high end home furnishing, interior architecture',
  openGraph: {
    title: 'Vayora Interiors',
    description: 'Bespoke European furniture, marble dining suites, and architectural interior lifestyle collections.',
    url: 'https://vayorainteriors.com',
    siteName: 'Vayora Interiors',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vayora Interiors',
    description: 'Bespoke European furniture and interior lifestyle collections.',
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory text-obsidian antialiased selection:bg-gold selection:text-charcoal flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        {/* Floating buttons wrapper visible on all pages (WhatsApp above Brochure) */}
        <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
          <FloatingWhatsAppButton />
          <FloatingBrochureButton />
        </div>

      </body>
    </html>
  );
}
