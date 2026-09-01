import { Product, Category, Consultation } from '@skyhome/types';

export interface HeroSlide {
  id: number | string;
  title: string;
  subhead: string;
  tagline: string;
  image: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  iconName?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface FounderInfo {
  name: string;
  role: string;
  phone: string;
  email: string;
  bio: string;
  image?: string;
}

export interface AboutContent {
  tagline: string;
  heading: string;
  subheading: string;
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  storyHighlight: string;
  launchYear: string;
  experienceYear: string;
  experienceDesc: string;
  visionTitle: string;
  visionDesc: string;
  founders: FounderInfo[];
}

export interface BrochureInfo {
  badge: string;
  title: string;
  subhead: string;
  downloadUrl: string;
  filename: string;
  edition: string;
  totalDownloads: number;
  features: string[];
}

export interface GlobalSiteSettings {
  brandName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  googleMapsUrl: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementLink?: string;
  experienceYearsSince: string;
  establishedYear: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface SiteData {
  products: Product[];
  categories: Category[];
  heroSlides: HeroSlide[];
  featureCards: FeatureCard[];
  services: ServiceItem[];
  processSteps: ProcessStep[];
  about: AboutContent;
  brochure: BrochureInfo;
  settings: GlobalSiteSettings;
  consultations: (Consultation & { adminNotes?: string })[];
  subscribers: { id: string; email: string; createdAt: string }[];
}

// -------------------------------------------------------------
// INITIAL DEFAULT DATA (Luxury Vayora Interiors Content)
// -------------------------------------------------------------
const INITIAL_PRODUCTS: Product[] = [
  // 1. Wall & Decorative Panels
  { id: 'pvc-panel', title: 'PVC Panel', slug: 'pvc-panel', description: 'Waterproof, termite-resistant PVC wall panels designed for quick aesthetic elevation of living rooms and bed backdrops.', sku: 'VAY-PVC-001', categoryId: 'wall-decorative-panels', subcategory: null, keywords: ['pvc','panel','wall'], image: '/images/pvc-panel.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'hot-stumping', title: 'Hot Stumping', slug: 'hot-stumping', description: 'High-gloss metallic foil hot-stamped decorative wall panels for luxury feature walls.', sku: 'VAY-HOT-002', categoryId: 'wall-decorative-panels', subcategory: null, keywords: ['hot','stamping','foil'], image: '/images/hot-stumping.png', featured: false, createdAt: new Date().toISOString() },
  { id: 'super-slim', title: 'Super Slim', slug: 'super-slim', description: 'Ultra-thin architectural wall sheets engineered for seamless curved installation.', sku: 'VAY-SLIM-003', categoryId: 'wall-decorative-panels', subcategory: null, keywords: ['slim','panel','thin'], image: '/images/super-slim.png', featured: false, createdAt: new Date().toISOString() },
  { id: 'super-heavy', title: 'Super Heavy', slug: 'super-heavy', description: 'Impact-resistant reinforced heavy-duty wall paneling for high-traffic corridors.', sku: 'VAY-HEAVY-004', categoryId: 'wall-decorative-panels', subcategory: null, keywords: ['heavy','impact','durable'], image: '/images/super-heavy.png', featured: false, createdAt: new Date().toISOString() },
  { id: 'charcoal-panel', title: 'Charcoal Panel', slug: 'charcoal-panel', description: 'High-density luxury charcoal wall panels with metallic gold and stone texture veins.', sku: 'VAY-CHAR-005', categoryId: 'wall-decorative-panels', subcategory: null, keywords: ['charcoal','dark','panel'], image: '/images/charcoal-panel.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'wpc-louvers-17mm', title: 'WPC Louvers (17mm)', slug: 'wpc-louvers-17mm', description: '17 mm fluted wood-plastic composite louvers in rich walnut and charcoal woodgrain finishes.', sku: 'VAY-WPC-006', categoryId: 'wall-decorative-panels', subcategory: '17mm', keywords: ['wpc','louvers','17mm'], image: '/images/wpc-louvers-17mm.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'wpc-louvers-23mm', title: 'WPC Louvers (23mm)', slug: 'wpc-louvers-23mm', description: '23 mm deep-groove wood-plastic composite louvers designed for architectural feature walls.', sku: 'VAY-WPC-007', categoryId: 'wall-decorative-panels', subcategory: '23mm', keywords: ['wpc','louvers','23mm'], image: '/images/wpc-louvers-23mm.png', featured: true, createdAt: new Date().toISOString() },

  // 2. Artificial Greenery & Grass
  { id: 'vertical-garden', title: 'Vertical Garden', slug: 'vertical-garden', description: 'Lush synthetic foliage green wall panels suitable for residential feature walls and exterior facades.', sku: 'VAY-VG-001', categoryId: 'artificial-greenery-grass', subcategory: null, keywords: ['vertical','garden','green'], image: '/images/vertical-garden.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'artificial-grass', title: 'Artificial Grass', slug: 'artificial-grass', description: 'Four-tone natural green artificial lawn grass with UV protection for balconies, terraces, and gardens.', sku: 'VAY-GRASS-002', categoryId: 'artificial-greenery-grass', subcategory: null, keywords: ['grass','lawn','synthetic'], image: '/images/artificial-grass.png', featured: true, createdAt: new Date().toISOString() },

  // 3. Blinds
  { id: 'roller-blind', title: 'Roller Blind', slug: 'roller-blind', description: 'Sleek blackout and translucent sun-screen roller blinds for modern residential and office windows.', sku: 'VAY-BLIND-001', categoryId: 'blinds', subcategory: null, keywords: ['roller','blind','shade'], image: '/images/roller-blind.png', featured: false, createdAt: new Date().toISOString() },
  { id: 'zebra-blind', title: 'Zebra Blind', slug: 'zebra-blind', description: 'Dual-layered light control zebra blinds offering precise privacy and natural light filtration.', sku: 'VAY-BLIND-002', categoryId: 'blinds', subcategory: null, keywords: ['zebra','blind','day-night'], image: '/images/zebra-blind.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'vertical-blind', title: 'Vertical Blind', slug: 'vertical-blind', description: 'Adjustable fabric vertical louvers designed for expansive floor-to-ceiling glass windows.', sku: 'VAY-BLIND-003', categoryId: 'blinds', subcategory: null, keywords: ['vertical','blind','louvers'], image: '/images/vertical-blind.png', featured: false, createdAt: new Date().toISOString() },
  { id: 'wooden-blind', title: 'Wooden Blind', slug: 'wooden-blind', description: 'Solid basswood horizontal blinds finished in rich dark espresso and natural oak wood stains.', sku: 'VAY-BLIND-004', categoryId: 'blinds', subcategory: null, keywords: ['wood','blind','venetian'], image: '/images/wooden-blind.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'customise-roller-blind', title: 'Customise Roller Blind', slug: 'customise-roller-blind', description: 'Tailor-made motorized roller blinds custom dimensioned to your exact window specifications.', sku: 'VAY-BLIND-005', categoryId: 'blinds', subcategory: null, keywords: ['custom','roller','motorized'], image: '/images/customise-roller-blind.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'customise-zebra-blind', title: 'Customise Zebra Blind', slug: 'customise-zebra-blind', description: 'Custom printed and sized zebra blinds with smart remote automation options.', sku: 'VAY-BLIND-006', categoryId: 'blinds', subcategory: null, keywords: ['custom','zebra','automation'], image: '/images/customise-zebra-blind.png', featured: true, createdAt: new Date().toISOString() },

  // 4. Curtains & Curtain Accessories
  { id: 'curtain', title: 'Curtain', slug: 'curtain', description: 'Belgian linen drapes, rich velvet blackout curtains, and sheer voiles tailored for luxury interiors.', sku: 'VAY-CURT-001', categoryId: 'curtains-curtain-accessories', subcategory: null, keywords: ['curtain','drape','linen'], image: '/images/curtain.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'curtain-channel', title: 'Curtain Channel', slug: 'curtain-channel', description: 'Whisper-quiet motorized and manual curtain track channels for ceiling and wall mounting.', sku: 'VAY-CURT-002', categoryId: 'curtains-curtain-accessories', subcategory: null, keywords: ['track','channel','curtains'], image: '/images/curtain-channel.png', featured: true, createdAt: new Date().toISOString() },

  // 5. Exterior & Outdoor Products
  { id: 'acp-seat-exterior', title: 'ACP Shett Exterior', slug: 'acp-seat-exterior', description: 'Weatherproof aluminum composite panels designed for modern architectural building facades.', sku: 'VAY-EXT-001', categoryId: 'exterior-outdoor-products', subcategory: null, keywords: ['acp','exterior','cladding'], image: '/images/acp-seat-exterior.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'exterior-panel', title: 'Exterior Panel', slug: 'exterior-panel', description: 'UV-stabilized exterior WPC wall cladding panels for villas, terraces, and commercial fronts.', sku: 'VAY-EXT-002', categoryId: 'exterior-outdoor-products', subcategory: null, keywords: ['exterior','cladding','wpc'], image: '/images/exterior-panel.png', featured: true, createdAt: new Date().toISOString() },

  // 6. Glass Products
  { id: 'tafan-glass', title: 'Tafan Glass', slug: 'tafan-glass', description: 'Heavy-duty acoustic toughened Tafan Glass wall dividers with slim black aluminum framing.', sku: 'VAY-GLASS-001', categoryId: 'glass-products', subcategory: null, keywords: ['glass','tafan','acoustic'], image: '/images/tafan-glass.png', featured: true, createdAt: new Date().toISOString() },

  // 7. Flooring
  { id: 'wooden-flooring', title: 'Wooden Flooring', slug: 'wooden-flooring', description: 'High-density European oak laminate wooden flooring planks with authentic grain embossing.', sku: 'VAY-FLR-001', categoryId: 'flooring', subcategory: null, keywords: ['wood','flooring','oak'], image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80', featured: true, createdAt: new Date().toISOString() },
  { id: 'pvc-flooring', title: 'PVC Flooring', slug: 'pvc-flooring', description: 'Durable anti-skid PVC vinyl sheet flooring for commercial, healthcare, and residential spaces.', sku: 'VAY-FLR-002', categoryId: 'flooring', subcategory: null, keywords: ['pvc','flooring','vinyl'], image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', featured: false, createdAt: new Date().toISOString() },
  { id: 'pvc-plank-flooring', title: 'PVC Plank Flooring', slug: 'pvc-plank-flooring', description: 'Self-adhesive luxury PVC vinyl planks in warm oak, teak, and grey stone textures.', sku: 'VAY-FLR-003', categoryId: 'flooring', subcategory: null, keywords: ['pvc','plank','flooring'], image: '/images/pvc-plank-flooring.png', featured: false, createdAt: new Date().toISOString() },
  { id: 'spc-flooring', title: 'SPC Flooring', slug: 'spc-flooring', description: '100% waterproof Stone Polymer Composite click-lock rigid core flooring with acoustic underlayment.', sku: 'VAY-FLR-004', categoryId: 'flooring', subcategory: null, keywords: ['spc','flooring','waterproof'], image: '/images/spc-flooring.png', featured: true, createdAt: new Date().toISOString() },

  // 8. Roofing / Ceiling Panels
  { id: 'roof-panel', title: 'Roof Panel', slug: 'roof-panel', description: 'Thermal insulated acoustic ceiling and roofing panels for structural protection & energy efficiency.', sku: 'VAY-CEIL-001', categoryId: 'roofing-ceiling-panels', subcategory: null, keywords: ['roof','ceiling','panel'], image: '/images/roof-panel.jpeg', featured: true, createdAt: new Date().toISOString() },

  // 9. Other Products`
  { id: 'tv-kits', title: 'TV Kits', slug: 'tv-kits', description: 'Integrated entertainment TV backwall unit combining WPC louvers, marble PVC sheets, and LED lighting.', sku: 'VAY-TV-001', categoryId: 'other-products', subcategory: null, keywords: ['tv','entertainment','backwall'], image: '/images/tv-kits.png', featured: true, createdAt: new Date().toISOString() },
  { id: 'wooden-work', title: 'Wooden Work', slug: 'wooden-work', description: 'Custom wooden joinery, cabinetry, and architectural woodwork solutions.', sku: 'VAY-WOOD-001', categoryId: 'other-products', subcategory: null, keywords: ['wood','joinery','cabinetry'], image: '/images/wooden-work.png', featured: true, createdAt: new Date().toISOString() },
];

const INITIAL_CATEGORIES: Category[] = [
  { id: 'wall-decorative-panels', name: 'Wall & Decorative Panels', slug: 'wall-decorative-panels', description: 'PVC panels, charcoal louvers, WPC louvers', image: '/images/pvc-panel.png' },
  { id: 'artificial-greenery-grass', name: 'Artificial Greenery & Grass', slug: 'artificial-greenery-grass', description: 'Vertical gardens & landscape artificial grass', image: '/images/artificial-grass.png' },
  { id: 'blinds', name: 'Blinds', slug: 'blinds', description: 'Roller, zebra, vertical & wooden blinds', image: '/images/roller-blind.png' },
  { id: 'curtains-curtain-accessories', name: 'Curtains & Curtain Accessories', slug: 'curtains-curtain-accessories', description: 'Curtains & motorized curtain channels', image: '/images/curtain.png'},
  { id: 'exterior-outdoor-products', name: 'Exterior & Outdoor Products', slug: 'exterior-outdoor-products', description: 'ACP exterior sheets & cladding', image: '/images/exterior-panel.png' },
  { id: 'glass-products', name: 'Glass Products', slug: 'glass-products', description: 'Acoustic toughened Tafan glass partitions', image:'/images/tafan-glass.png' },
  { id: 'flooring', name: 'Flooring', slug: 'flooring', description: 'SPC, PVC, wooden laminate flooring', image: '/images/pvc-plank-flooring.png' },
  { id: 'roofing-ceiling-panels', name: 'Roofing / Ceiling Panels', slug: 'roofing-ceiling-panels', description: 'POP & Gypsum false ceiling, acoustic panels', image: '/images/roof-panel.jpeg' },
  { id: 'other-products', name: 'Other Products', slug: 'other-products', description: 'TV Kits & Wooden Work', image: '/images/wooden-work.png' },
];

const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'Vayora Interiors',
    subhead: 'Where Quality Meets Design — Premium Interior & Surface Solutions Since 2026',
    tagline: 'LUXURY WALL PANELS & WPC LOUVERS',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    ctaPrimary: { text: 'Explore Products', href: '/products' },
    ctaSecondary: { text: 'Book Consultation', href: '/book-consultation' },
  },
  {
    id: 2,
    title: 'Transforming Spaces. Defining Interiors.',
    subhead: 'Specializing in PVC Panels, Artificial Greenery, Blinds, Curtains & SPC Flooring.',
    tagline: 'PREMIUM INTERIOR & EXTERIOR SOLUTIONS',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    ctaPrimary: { text: 'Download Brochure', href: '/brochure' },
    ctaSecondary: { text: 'View Services', href: '/services' },
  },
  {
    id: 3,
    title: 'Elegance Redefined For Modern Spaces',
    subhead: 'Architectural Tafan Glass, Acoustic False Ceilings, and Custom TV Wall Kits.',
    tagline: 'TAILORED RESIDENTIAL & COMMERCIAL DESIGN',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85',
    ctaPrimary: { text: 'Explore Products', href: '/products' },
    ctaSecondary: { text: 'Book Consultation', href: '/book-consultation' },
  },
];

const INITIAL_FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'feat-1',
    iconName: 'Layers',
    title: 'Modern Interior Solutions',
    desc: 'Cutting-edge wall claddings, louvers, and acoustic ceiling panels engineered for contemporary spaces.',
  },
  {
    id: 'feat-2',
    iconName: 'ShieldCheck',
    title: 'Premium Materials',
    desc: 'High-density termite-proof PVC, WPC composite louvers, 100% waterproof SPC click flooring, and UV grass.',
  },
  {
    id: 'feat-3',
    iconName: 'Sparkles',
    title: 'Customized Designs',
    desc: 'Tailored roller blinds, zebra blinds, TV wall kits, and custom dimensioned paneling solutions.',
  },
  {
    id: 'feat-4',
    iconName: 'Wrench',
    title: 'Professional Installation',
    desc: 'Certified installers executing precision fitting, channel mounting, and white-glove site delivery.',
  },
  {
    id: 'feat-5',
    iconName: 'Building',
    title: 'Residential & Commercial Projects',
    desc: 'Versatile product range optimized for homes, luxury villas, corporate offices, and commercial venues.',
  },
  {
    id: 'feat-6',
    iconName: 'Award',
    title: 'Trusted Industry Experience',
    desc: 'Deep material expertise dating back to 2018, delivering dependable quality and value.',
  },
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Interior Surface Solutions',
    desc: 'Expert curation and fitting of PVC panels, charcoal louvers, WPC fluted louvers, and decorative wall claddings.',
    badge: 'Popular',
    iconName: 'Layers',
  },
  {
    id: 'srv-2',
    title: 'Wall Panel Installation',
    desc: 'Precision jointless mounting and alignment of heavy-duty PVC panels, louvers, and stone texture sheets.',
    badge: 'Precision',
    iconName: 'Wrench',
  },
  {
    id: 'srv-3',
    title: 'Flooring Installation',
    desc: 'Certified fitting of 100% waterproof SPC click-lock flooring, wooden laminate planks, and PVC tile sheets.',
    badge: 'Waterproof',
    iconName: 'Layers',
  },
  {
    id: 'srv-4',
    title: 'Blind & Curtain Solutions',
    desc: 'Tailored measurement, motorized channel track installation, and fitting for roller, zebra, and wooden blinds.',
    badge: 'Motorized',
    iconName: 'Sparkles',
  },
  {
    id: 'srv-5',
    title: 'Exterior Panel Solutions',
    desc: 'Weatherproof ACP sheet cladding and exterior WPC panel fitting for residential facades and commercial fronts.',
    badge: 'Weatherproof',
    iconName: 'Building',
  },
  {
    id: 'srv-6',
    title: 'Wooden Work & TV Kits',
    desc: 'Custom entertainment TV backwalls combining louvers, marble PVC panels, and concealed LED strip lighting.',
    badge: 'Custom',
    iconName: 'Wrench',
  },
  {
    id: 'srv-7',
    title: 'Custom Interior Solutions',
    desc: 'Bespoke dimensioning and customization tailored specifically to your architectural blueprints.',
    badge: 'Bespoke',
    iconName: 'Sparkles',
  },
  {
    id: 'srv-8',
    title: 'Project Consultation',
    desc: 'Direct consultation with founders Nikhil Srivastava and Akash Soni to select optimal surface materials.',
    badge: 'Expert Advice',
    iconName: 'Compass',
  },
];

const INITIAL_PROCESS_STEPS: ProcessStep[] = [
  { step: '01', title: 'Consultation', desc: 'Understanding customer requirements, spatial blueprints, and design budget.' },
  { step: '02', title: 'Material Selection', desc: 'Browsing samples of PVC panels, WPC louvers, SPC flooring, and blinds.' },
  { step: '03', title: 'Design Planning', desc: 'Technical layout mapping, dimension customization, and timeline agreement.' },
  { step: '04', title: 'Installation', desc: 'Certified master installation of channels, claddings, and flooring.' },
  { step: '05', title: 'Final Handover', desc: 'Quality inspection, site cleaning, and warranty handover.' },
];

const INITIAL_ABOUT: AboutContent = {
  tagline: 'ABOUT VAYORA INTERIORS',
  heading: 'Transforming Spaces. Defining Interiors.',
  subheading: 'Where Quality Meets Design',
  storyTitle: 'Establishing Excellence in Surface & Interior Solutions',
  storyP1: 'Vayora Interiors is a growing interior and surface solutions brand established in 2026, backed by experience in the industry since 2018. With a strong understanding of interior products, materials, and modern design requirements, we have started Vayora Interiors with a vision to make stylish, durable, and practical interior solutions accessible to homes, offices, commercial spaces, and other projects.',
  storyP2: 'We specialize in a wide range of interior panels, flooring solutions, blinds, curtains, exterior products, and decorative solutions, offering customers multiple options under one roof.',
  storyHighlight: 'Our product range includes PVC Panels, Charcoal Panels, WPC Louvers, Roof Panels, TV Kits, Exterior Panels, ACP Exterior Solutions, Tafan Glass, Wooden Flooring, PVC Flooring, PVC Plank Flooring, SPC Flooring, Artificial Grass, Vertical Gardens, Roller Blinds, Zebra Blinds, Vertical Blinds, Wooden Blinds, Curtains, Curtain Channels, and customized blind solutions.',
  launchYear: '2026',
  experienceYear: '2018',
  experienceDesc: 'Although Vayora Interiors was launched in 2026, our experience in the industry goes back to 2018. This experience has helped us understand changing customer preferences, material quality, installation requirements, and the importance of delivering solutions that balance design, durability, functionality, and value.',
  visionTitle: 'Our Vision',
  visionDesc: 'To become a trusted, multi-category brand for premium surface and interior products known for exceptional quality, modern aesthetics, reliable delivery, and customer-first guidance.',
  founders: [
    {
      name: 'Nikhil Srivastava',
      role: 'Co-Founder & Interior Solutions Director',
      phone: '+91 73949 87500',
      email: 'vayorainteriors@gmail.com',
      bio: 'Leading material engineering, client consulting, and high-end panel installation standards.',
    },
    {
      name: 'Akash Soni',
      role: 'Co-Founder & Operations Lead',
      phone: '+91 73949 87500',
      email: 'vayorainteriors@gmail.com',
      bio: 'Overseeing supply chain logistics, master fitting execution, and commercial project deliveries.',
    },
  ],
};

const INITIAL_BROCHURE: BrochureInfo = {
  badge: 'OFFICIAL DIGITAL CATALOGUE 2026',
  title: 'Vayora Interiors Brochure',
  subhead: 'Browse our full catalogue of PVC panels, WPC louvers, artificial grass, blinds, curtains, exterior claddings, and SPC flooring.',
  downloadUrl: '/vayora%20interiors%20brochure.pdf',
  filename: 'vayora interiors brochure.pdf',
  edition: '2026 Edition (Volume 1)',
  totalDownloads: 0,
  features: [
    'Complete HD swatch & texture photographic charts',
    'Technical specifications, thickness & dimensions',
    'Commercial vs. residential application guides',
    'Direct consultation booking & contact numbers',
  ],
};

const INITIAL_SETTINGS: GlobalSiteSettings = {
  brandName: 'Vayora Interiors',
  tagline: 'Where Quality Meets Design',
  phone: '+91 73949 87500',
  email: 'vayorainteriors@gmail.com',
  whatsappNumber: '917394987500',
  whatsappMessage: 'Hi Vayora Interiors, I want to know more about your products and schedule a consultation.',
  address: 'New Delhi, India',
  googleMapsUrl: 'https://maps.app.goo.gl/eyWY97942wRVD4bs8',
  announcementEnabled: false,
  announcementText: '',
  announcementLink: '',
  experienceYearsSince: '2018',
  establishedYear: '2026',
};

const INITIAL_CONSULTATIONS: (Consultation & { adminNotes?: string })[] = [];

const INITIAL_SUBSCRIBERS: { id: string; email: string; createdAt: string }[] = [];

const STORAGE_KEY = 'vayora_site_content_v4';
const EVENT_NAME = 'vayora_site_data_updated';

// -------------------------------------------------------------
// STORE ENGINE
// -------------------------------------------------------------
class SiteStoreEngine {
  private data: SiteData;

  constructor() {
    this.data = this.loadFromStorage();
  }

  private getDefaultData(): SiteData {
    return {
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      heroSlides: INITIAL_HERO_SLIDES,
      featureCards: INITIAL_FEATURE_CARDS,
      services: INITIAL_SERVICES,
      processSteps: INITIAL_PROCESS_STEPS,
      about: INITIAL_ABOUT,
      brochure: INITIAL_BROCHURE,
      settings: INITIAL_SETTINGS,
      consultations: INITIAL_CONSULTATIONS,
      subscribers: INITIAL_SUBSCRIBERS,
    };
  }

  private loadFromStorage(): SiteData {
    if (typeof window === 'undefined') {
      return this.getDefaultData();
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // merge with defaults to ensure any newly added keys exist
        return {
          ...this.getDefaultData(),
          ...parsed,
          settings: { ...INITIAL_SETTINGS, ...(parsed.settings || {}) },
          about: { ...INITIAL_ABOUT, ...(parsed.about || {}) },
          brochure: { ...INITIAL_BROCHURE, ...(parsed.brochure || {}) },
        };
      }
    } catch (e) {
      console.warn('[SiteStore] Failed to parse local storage:', e);
    }
    return this.getDefaultData();
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: this.data }));
      } catch (e) {
        console.error('[SiteStore] Save failed:', e);
      }
    }
  }

  public getData(): SiteData {
    // refresh if in browser
    if (typeof window !== 'undefined') {
      this.data = this.loadFromStorage();
    }
    return this.data;
  }

  // --- PRODUCTS ---
  public getProducts(): Product[] {
    return this.getData().products;
  }

  public addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: `p-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.products = [newProduct, ...this.data.products];
    this.persist();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.persist();
    return this.data.products[idx];
  }

  public deleteProduct(id: string): boolean {
    this.data.products = this.data.products.filter((p) => p.id !== id);
    this.persist();
    return true;
  }

  // --- CATEGORIES ---
  public getCategories(): Category[] {
    return this.getData().categories;
  }

  public addCategory(cat: Omit<Category, 'id'>): Category {
    const newCat: Category = {
      ...cat,
      id: cat.slug || `cat-${Date.now()}`,
    };
    this.data.categories = [...this.data.categories, newCat];
    this.persist();
    return newCat;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const idx = this.data.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.data.categories[idx] = { ...this.data.categories[idx], ...updates };
    this.persist();
    return this.data.categories[idx];
  }

  // --- HERO SLIDES ---
  public getHeroSlides(): HeroSlide[] {
    return this.getData().heroSlides;
  }

  public setHeroSlides(slides: HeroSlide[]) {
    this.data.heroSlides = slides;
    this.persist();
  }

  public updateHeroSlide(id: number | string, updates: Partial<HeroSlide>) {
    this.data.heroSlides = this.data.heroSlides.map((s) => (s.id === id ? { ...s, ...updates } : s));
    this.persist();
  }

  public addHeroSlide(slide: Omit<HeroSlide, 'id'>): HeroSlide {
    const newSlide: HeroSlide = {
      ...slide,
      id: Date.now(),
    };
    this.data.heroSlides = [...this.data.heroSlides, newSlide];
    this.persist();
    return newSlide;
  }

  public deleteHeroSlide(id: number | string) {
    this.data.heroSlides = this.data.heroSlides.filter((s) => s.id !== id);
    this.persist();
  }

  // --- FEATURE CARDS ---
  public getFeatureCards(): FeatureCard[] {
    return this.getData().featureCards;
  }

  public updateFeatureCard(id: string, updates: Partial<FeatureCard>) {
    this.data.featureCards = this.data.featureCards.map((f) => (f.id === id ? { ...f, ...updates } : f));
    this.persist();
  }

  // --- SERVICES ---
  public getServices(): ServiceItem[] {
    return this.getData().services;
  }

  public addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    this.data.services = [...this.data.services, newService];
    this.persist();
    return newService;
  }

  public updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const idx = this.data.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.data.services[idx] = { ...this.data.services[idx], ...updates };
    this.persist();
    return this.data.services[idx];
  }

  public deleteService(id: string) {
    this.data.services = this.data.services.filter((s) => s.id !== id);
    this.persist();
  }

  // --- PROCESS STEPS ---
  public getProcessSteps(): ProcessStep[] {
    return this.getData().processSteps;
  }

  public updateProcessSteps(steps: ProcessStep[]) {
    this.data.processSteps = steps;
    this.persist();
  }

  // --- ABOUT CONTENT ---
  public getAboutContent(): AboutContent {
    return this.getData().about;
  }

  public updateAboutContent(updates: Partial<AboutContent>) {
    this.data.about = { ...this.data.about, ...updates };
    this.persist();
  }

  // --- BROCHURE INFO ---
  public getBrochureInfo(): BrochureInfo {
    return this.getData().brochure;
  }

  public updateBrochureInfo(updates: Partial<BrochureInfo>) {
    this.data.brochure = { ...this.data.brochure, ...updates };
    this.persist();
  }

  public recordBrochureDownload() {
    this.data.brochure.totalDownloads = (this.data.brochure.totalDownloads || 0) + 1;
    this.persist();
  }

  // --- GLOBAL SETTINGS ---
  public getSettings(): GlobalSiteSettings {
    return this.getData().settings;
  }

  public updateSettings(updates: Partial<GlobalSiteSettings>) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.persist();
  }

  // --- CONSULTATIONS ---
  public getConsultations(): (Consultation & { adminNotes?: string })[] {
    return this.getData().consultations;
  }

  public addConsultation(consultation: Omit<Consultation, 'id' | 'createdAt' | 'status'> & { status?: Consultation['status'] }) {
    const newBooking: Consultation & { adminNotes?: string } = {
      ...consultation,
      id: `c-${Date.now()}`,
      status: consultation.status || 'PENDING',
      createdAt: new Date().toISOString(),
      adminNotes: '',
    };
    this.data.consultations = [newBooking, ...this.data.consultations];
    this.persist();
    return newBooking;
  }

  public updateConsultationStatus(id: string, status: Consultation['status'], adminNotes?: string) {
    this.data.consultations = this.data.consultations.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : c.adminNotes,
        };
      }
      return c;
    });
    this.persist();
  }

  public deleteConsultation(id: string) {
    this.data.consultations = this.data.consultations.filter((c) => c.id !== id);
    this.persist();
  }

  // --- SUBSCRIBERS ---
  public getSubscribers() {
    return this.getData().subscribers;
  }

  public addSubscriber(email: string) {
    const exists = this.data.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    this.data.subscribers = [
      { id: `sub-${Date.now()}`, email, createdAt: new Date().toISOString() },
      ...this.data.subscribers,
    ];
    this.persist();
    return true;
  }

  public deleteSubscriber(idOrEmail: string) {
    this.data.subscribers = this.data.subscribers.filter(
      (s) => s.id !== idOrEmail && s.email.toLowerCase() !== idOrEmail.toLowerCase()
    );
    this.persist();
  }

  // --- BACKUP & RESET ---
  public exportBackupJson(): string {
    return JSON.stringify(this.data, null, 2);
  }

  public importBackupJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      this.data = { ...this.getDefaultData(), ...parsed };
      this.persist();
      return true;
    } catch (e) {
      return false;
    }
  }

  public resetAllCounters() {
    this.data.consultations = [];
    this.data.brochure.totalDownloads = 0;
    this.data.subscribers = [];
    this.persist();
  }

  public resetToFactoryDefaults() {
    this.data = this.getDefaultData();
    this.persist();
  }
}

export const siteStore = new SiteStoreEngine();
export { EVENT_NAME };
