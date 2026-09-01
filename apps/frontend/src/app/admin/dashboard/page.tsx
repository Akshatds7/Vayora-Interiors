'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '@/lib/useSiteStore';
import { Product, Category, Consultation } from '@skyhome/types';
import {
  LayoutDashboard,
  Package,
  Sliders,
  Calendar,
  Wrench,
  Info,
  FileText,
  Settings,
  Mail,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  RefreshCw,
  ExternalLink,
  Download,
  Upload,
  Save,
  Check,
  AlertCircle,
  Layers,
  Sparkles,
  Phone,
  MapPin,
  Eye,
  ChevronRight,
  Filter,
  X,
  Copy,
  RotateCcw
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'products'
  | 'hero'
  | 'consultations'
  | 'services'
  | 'about'
  | 'brochure'
  | 'settings';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    data,
    store,
    products,
    categories,
    heroSlides,
    featureCards,
    services,
    processSteps,
    about,
    brochure,
    settings,
    consultations,
    subscribers,
  } = useSiteStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('vayora_admin_auth');
      if (!isAuth) {
        router.push('/admin/login');
      }
    }
  }, [router]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('vayora_admin_auth');
      sessionStorage.removeItem('vayora_admin_user');
    }
    router.push('/admin/login');
  };

  // -------------------------------------------------------------
  // PRODUCTS TAB STATE & HANDLERS
  // -------------------------------------------------------------
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('ALL');
  const [productSearch, setProductSearch] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productFormData, setProductFormData] = useState<Partial<Product>>({
    title: '',
    slug: '',
    categoryId: 'wall-decorative-panels',
    sku: '',
    description: '',
    image: '/images/pvc-panel.png',
    featured: false,
    subcategory: '',
  });

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      title: '',
      slug: '',
      categoryId: categories[0]?.id || 'wall-decorative-panels',
      sku: `VAY-${Math.floor(1000 + Math.random() * 9000)}`,
      description: '',
      image: '/images/pvc-panel.png',
      featured: false,
      subcategory: '',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormData({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.title || !productFormData.categoryId) return;

    const slug = productFormData.slug || productFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const sku = productFormData.sku || `VAY-${Math.floor(1000 + Math.random() * 9000)}`;

    if (editingProduct) {
      store.updateProduct(editingProduct.id, {
        ...productFormData,
        slug,
        sku,
      });
      showToast(`Product "${productFormData.title}" updated successfully!`);
    } else {
      store.addProduct({
        title: productFormData.title,
        slug,
        description: productFormData.description || 'Premium architectural surface solution.',
        sku,
        categoryId: productFormData.categoryId,
        image: productFormData.image || '/images/pvc-panel.png',
        featured: Boolean(productFormData.featured),
        subcategory: productFormData.subcategory || null,
        keywords: [productFormData.title.toLowerCase(), productFormData.categoryId],
      });
      showToast(`Product "${productFormData.title}" added to catalog!`);
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete product "${title}"?`)) {
      store.deleteProduct(id);
      showToast(`Product "${title}" removed.`);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = productCategoryFilter === 'ALL' || p.categoryId === productCategoryFilter;
    const matchesQuery =
      !productSearch ||
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // -------------------------------------------------------------
  // CONSULTATIONS / INQUIRIES TAB STATE & HANDLERS
  // -------------------------------------------------------------
  const [consultationStatusFilter, setConsultationStatusFilter] = useState<string>('ALL');
  const [consultationSearch, setConsultationSearch] = useState<string>('');

  const filteredConsultations = consultations.filter((c) => {
    const matchesStatus = consultationStatusFilter === 'ALL' || c.status === consultationStatusFilter;
    const matchesSearch =
      !consultationSearch ||
      c.name.toLowerCase().includes(consultationSearch.toLowerCase()) ||
      c.phone.includes(consultationSearch) ||
      (c.email && c.email.toLowerCase().includes(consultationSearch.toLowerCase())) ||
      c.query.toLowerCase().includes(consultationSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportConsultationsCsv = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Preferred Date', 'Preferred Time', 'Status', 'Query', 'Created At'];
    const rows = consultations.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.phone}"`,
      `"${c.email || ''}"`,
      `"${c.preferredDate}"`,
      `"${c.preferredTime}"`,
      `"${c.status}"`,
      `"${c.query.replace(/"/g, '""')}"`,
      `"${c.createdAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vayora_consultations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Consultation bookings exported to CSV.');
  };

  // -------------------------------------------------------------
  // HERO SLIDES TAB STATE & HANDLERS
  // -------------------------------------------------------------
  const [heroSlideForms, setHeroSlideForms] = useState(heroSlides);
  useEffect(() => {
    setHeroSlideForms(heroSlides);
  }, [heroSlides]);

  const handleSaveHeroSlides = () => {
    store.setHeroSlides(heroSlideForms);
    showToast('Homepage Hero Slides updated successfully!');
  };

  const handleAddHeroSlide = () => {
    store.addHeroSlide({
      title: 'New Luxury Showcase',
      subhead: 'Experience Master Crafts & Modern Architectural Elegance.',
      tagline: 'EXCLUSIVE VAYORA SURFACES',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
      ctaPrimary: { text: 'Explore Products', href: '/products' },
      ctaSecondary: { text: 'Book Consultation', href: '/book-consultation' },
    });
    showToast('New hero slide added!');
  };

  // -------------------------------------------------------------
  // ABOUT CONTENT TAB STATE & HANDLERS
  // -------------------------------------------------------------
  const [aboutForm, setAboutForm] = useState(about);
  useEffect(() => {
    setAboutForm(about);
  }, [about]);

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateAboutContent(aboutForm);
    showToast('About Us & Founders information updated successfully!');
  };

  // -------------------------------------------------------------
  // SERVICES TAB STATE & HANDLERS
  // -------------------------------------------------------------
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    desc: '',
    badge: 'Popular',
    iconName: 'Layers',
  });

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.title) return;

    if (editingService) {
      store.updateService(editingService.id, serviceFormData);
      showToast(`Service "${serviceFormData.title}" updated.`);
    } else {
      store.addService(serviceFormData);
      showToast(`New service "${serviceFormData.title}" created.`);
    }
    setIsServiceModalOpen(false);
  };

  // -------------------------------------------------------------
  // BROCHURE TAB STATE & HANDLERS
  // -------------------------------------------------------------
  const [brochureForm, setBrochureForm] = useState(brochure);
  useEffect(() => {
    setBrochureForm(brochure);
  }, [brochure]);

  const handleSaveBrochure = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateBrochureInfo(brochureForm);
    showToast('Digital Brochure specifications updated!');
  };

  // -------------------------------------------------------------
  // GLOBAL SETTINGS TAB STATE & HANDLERS
  // -------------------------------------------------------------
  const [settingsForm, setSettingsForm] = useState(settings);
  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(settingsForm);
    showToast('Global Site Settings & Announcement Banner updated!');
  };

  // -------------------------------------------------------------
  // BACKUP & RESET HANDLERS
  // -------------------------------------------------------------
  const handleExportBackup = () => {
    const backupJson = store.exportBackupJson();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vayora_site_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Complete website content backup downloaded!');
  };

  const handleResetCounters = () => {
    if (confirm('Are you sure you want to reset all dashboard countings (consultations, downloads, and leads) to 0?')) {
      store.resetAllCounters();
      showToast('All dashboard countings reset to 0.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all website content to factory defaults? Any custom products or edits will be restored.')) {
      store.resetToFactoryDefaults();
      showToast('All website content restored to factory defaults.');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col pt-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gold text-charcoal px-6 py-3.5 rounded-full shadow-2xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-charcoal/95 backdrop-blur-md border-b border-gold/30 px-6 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold shrink-0 bg-obsidian">
            <Image src="/images/logo.png" alt="Vayora Logo" fill className="object-contain p-1" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg font-bold text-ivory tracking-wide">
                Vayora Executive CMS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-mono font-bold border border-gold/30">
                SUPERADMIN
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ivory/60 block">
              Complete Webpage Control Center
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-full bg-obsidian border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleResetCounters}
            className="px-3.5 py-2 rounded-full bg-obsidian border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-charcoal transition-all flex items-center space-x-1.5"
            title="Reset All Countings to 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Counters</span>
          </button>

          <button
            onClick={handleExportBackup}
            title="Download JSON Backup"
            className="p-2 rounded-full bg-obsidian border border-ivory/20 text-ivory/80 hover:text-gold hover:border-gold transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider hover:bg-red-900 transition-colors flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-charcoal/80 border-r border-gold/20 p-4 shrink-0 overflow-y-auto">
          <div className="space-y-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
              { id: 'products', label: 'Products & Catalog', icon: Package, badge: products.length },
              { id: 'hero', label: 'Homepage & Hero', icon: Sliders, badge: heroSlides.length },
              { id: 'consultations', label: 'Consultations / Leads', icon: Calendar, badge: consultations.filter(c => c.status === 'PENDING').length || null },
              { id: 'services', label: 'Services Page', icon: Wrench, badge: services.length },
              { id: 'about', label: 'About Us & Founders', icon: Info, badge: null },
              { id: 'brochure', label: 'Digital Brochure', icon: FileText, badge: `${brochure.totalDownloads}` },
              { id: 'settings', label: 'Global Site Settings', icon: Settings, badge: null },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all text-left ${
                    isActive
                      ? 'bg-gold text-charcoal font-bold shadow-lg shadow-gold/20'
                      : 'text-ivory/80 hover:bg-obsidian hover:text-gold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-charcoal' : 'text-gold'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== null && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive ? 'bg-charcoal text-gold' : 'bg-obsidian border border-gold/30 text-gold'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-obsidian/90 border border-gold/20 space-y-2 text-[11px] text-ivory/60">
            <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Reactive Sync</span>
            </div>
            <p className="leading-relaxed">
              Edits automatically synchronize with all public pages and persist in browser storage.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl overflow-x-hidden">
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    ANALYTICS & ACTIVITY STREAM
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Executive Dashboard
                  </h1>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleOpenAddProduct}
                    className="px-4 py-2 rounded-full bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-1.5 shadow-md shadow-gold/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 space-y-2 shadow-xl hover:border-gold transition-colors">
                  <div className="flex items-center justify-between text-gold">
                    <span className="text-xs uppercase font-bold tracking-wider">Total Consultations</span>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {consultations.length}
                  </span>
                  <div className="text-[11px] text-amber-400 font-medium flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{consultations.filter((c) => c.status === 'PENDING').length} Pending Action</span>
                  </div>
                </div>

                <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 space-y-2 shadow-xl hover:border-gold transition-colors">
                  <div className="flex items-center justify-between text-gold">
                    <span className="text-xs uppercase font-bold tracking-wider">Catalog Products</span>
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {products.length}
                  </span>
                  <span className="text-[11px] text-ivory/60 block">
                    Across {categories.length} surface categories
                  </span>
                </div>

                <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 space-y-2 shadow-xl hover:border-gold transition-colors">
                  <div className="flex items-center justify-between text-gold">
                    <span className="text-xs uppercase font-bold tracking-wider">Brochure Downloads</span>
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {brochure.totalDownloads}
                  </span>
                  <span className="text-[11px] text-emerald-400 block font-medium">
                    2026 Volume 1 Catalogue
                  </span>
                </div>

                <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 space-y-2 shadow-xl hover:border-gold transition-colors">
                  <div className="flex items-center justify-between text-gold">
                    <span className="text-xs uppercase font-bold tracking-wider">Active Services</span>
                    <Wrench className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {services.length}
                  </span>
                  <span className="text-[11px] text-ivory/60 block">
                    Tailored surface & interior execution
                  </span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-charcoal border border-gold/20 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
                  Fast Management Shortcuts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="p-4 rounded-2xl bg-obsidian border border-ivory/10 hover:border-gold hover:text-gold transition-all text-left space-y-1 group"
                  >
                    <Package className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                    <span className="block text-xs font-bold text-ivory group-hover:text-gold">Manage Catalog</span>
                    <span className="block text-[10px] text-ivory/50">Edit & add surface products</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('consultations')}
                    className="p-4 rounded-2xl bg-obsidian border border-ivory/10 hover:border-gold hover:text-gold transition-all text-left space-y-1 group"
                  >
                    <Calendar className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                    <span className="block text-xs font-bold text-ivory group-hover:text-gold">Review Leads</span>
                    <span className="block text-[10px] text-ivory/50">Update booking statuses</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('hero')}
                    className="p-4 rounded-2xl bg-obsidian border border-ivory/10 hover:border-gold hover:text-gold transition-all text-left space-y-1 group"
                  >
                    <Sliders className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                    <span className="block text-xs font-bold text-ivory group-hover:text-gold">Edit Hero Slides</span>
                    <span className="block text-[10px] text-ivory/50">Modify titles & backgrounds</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="p-4 rounded-2xl bg-obsidian border border-ivory/10 hover:border-gold hover:text-gold transition-all text-left space-y-1 group"
                  >
                    <Settings className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                    <span className="block text-xs font-bold text-ivory group-hover:text-gold">Contact Hotline</span>
                    <span className="block text-[10px] text-ivory/50">Phone, email & announcements</span>
                  </button>
                </div>
              </div>

              {/* Recent Consultation Bookings Stream */}
              <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-ivory">Recent Consultation Bookings</h2>
                    <p className="text-xs text-ivory/60 font-light">
                      Incoming client requests from the public booking portal.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className="text-xs text-gold uppercase tracking-wider font-bold hover:underline flex items-center space-x-1"
                  >
                    <span>View All Inquiries</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-ivory/80">
                    <thead className="bg-obsidian text-gold uppercase tracking-wider text-[10px] font-bold border-b border-gold/20">
                      <tr>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Phone / WhatsApp</th>
                        <th className="py-3 px-4">Date & Slot</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ivory/10">
                      {consultations.slice(0, 5).map((c) => (
                        <tr key={c.id} className="hover:bg-obsidian/40 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-ivory font-serif text-sm">
                            {c.name}
                            {c.email && <span className="block text-[10px] text-ivory/50 font-sans font-normal">{c.email}</span>}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-gold font-bold">{c.phone}</td>
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div>{c.preferredDate}</div>
                            <div className="text-gold/80 text-[10px]">{c.preferredTime}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                c.status === 'PENDING'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                  : c.status === 'CONFIRMED'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                  : c.status === 'COMPLETED'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                                  : 'bg-red-950 text-red-300 border border-red-500/40'
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                const nextStatus = c.status === 'PENDING' ? 'CONFIRMED' : c.status === 'CONFIRMED' ? 'COMPLETED' : 'PENDING';
                                store.updateConsultationStatus(c.id, nextStatus as any);
                                showToast(`Consultation status changed to ${nextStatus}`);
                              }}
                              className="px-3 py-1 rounded-full bg-obsidian border border-gold/30 text-gold text-[10px] font-bold uppercase hover:bg-gold hover:text-charcoal transition-colors"
                            >
                              Toggle Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: PRODUCTS & CATALOG CMS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    PRODUCT CATALOG CMS
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Manage Products & Surface Finishes
                  </h1>
                </div>
                <button
                  onClick={handleOpenAddProduct}
                  className="px-5 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-2 shadow-lg shadow-gold/20 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="bg-charcoal border border-gold/20 rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search title, SKU, description..."
                    className="w-full bg-obsidian border border-ivory/20 rounded-full py-2.5 px-4 pl-10 text-xs text-ivory focus:outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3" />
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Filter className="w-4 h-4 text-gold shrink-0" />
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="w-full md:w-auto bg-obsidian border border-ivory/20 rounded-full py-2.5 px-4 text-xs text-gold font-bold focus:outline-none"
                  >
                    <option value="ALL">All Categories ({products.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({products.filter((p) => p.categoryId === c.id).length})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-charcoal border border-gold/30 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-ivory/80">
                    <thead className="bg-obsidian text-gold uppercase tracking-wider text-[10px] font-bold border-b border-gold/20">
                      <tr>
                        <th className="py-4 px-6">Image</th>
                        <th className="py-4 px-6">Product Details</th>
                        <th className="py-4 px-6">Category & SKU</th>
                        <th className="py-4 px-6">Featured</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ivory/10">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-ivory/50">
                            No products found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p) => {
                          const catName = categories.find((c) => c.id === p.categoryId)?.name || p.categoryId;
                          return (
                            <tr key={p.id} className="hover:bg-obsidian/40 transition-colors">
                              <td className="py-4 px-6">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gold/30 bg-obsidian shrink-0">
                                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                                </div>
                              </td>
                              <td className="py-4 px-6 max-w-sm">
                                <div className="font-serif text-sm font-bold text-ivory">{p.title}</div>
                                <div className="text-[11px] text-ivory/60 truncate font-light mt-0.5">{p.description}</div>
                              </td>
                              <td className="py-4 px-6 font-mono text-[11px]">
                                <div className="text-gold font-bold">{catName}</div>
                                <div className="text-ivory/50 text-[10px]">{p.sku}</div>
                              </td>
                              <td className="py-4 px-6">
                                <button
                                  onClick={() => {
                                    store.updateProduct(p.id, { featured: !p.featured });
                                    showToast(`Product featured state toggled`);
                                  }}
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    p.featured
                                      ? 'bg-gold/20 text-gold border border-gold/40'
                                      : 'bg-obsidian text-ivory/40 border border-ivory/10'
                                  }`}
                                >
                                  {p.featured ? '★ Featured' : 'Standard'}
                                </button>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenEditProduct(p)}
                                    className="p-2 rounded-lg bg-obsidian border border-ivory/20 text-gold hover:bg-gold hover:text-charcoal transition-colors"
                                    title="Edit Product"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id, p.title)}
                                    className="p-2 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900 transition-colors"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: HOMEPAGE & HERO CAROUSEL CMS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'hero' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    HOMEPAGE MANAGEMENT
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Hero Slides & Visual Showcase
                  </h1>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleAddHeroSlide}
                    className="px-4 py-2.5 rounded-full bg-obsidian border border-gold text-gold text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-all flex items-center space-x-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Slide</span>
                  </button>
                  <button
                    onClick={handleSaveHeroSlides}
                    className="px-5 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-2 shadow-lg shadow-gold/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Slides</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {heroSlideForms.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative"
                  >
                    <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-full bg-gold text-charcoal font-bold text-xs flex items-center justify-center font-mono">
                          0{idx + 1}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-ivory">Slide {idx + 1} Configuration</h3>
                      </div>
                      {heroSlideForms.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = heroSlideForms.filter((_, i) => i !== idx);
                            setHeroSlideForms(updated);
                            store.setHeroSlides(updated);
                            showToast('Slide removed.');
                          }}
                          className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                            Top Tagline Badge
                          </label>
                          <input
                            type="text"
                            value={slide.tagline}
                            onChange={(e) => {
                              const updated = [...heroSlideForms];
                              updated[idx].tagline = e.target.value;
                              setHeroSlideForms(updated);
                            }}
                            className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-gold font-mono focus:outline-none focus:border-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                            Hero Main Title
                          </label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const updated = [...heroSlideForms];
                              updated[idx].title = e.target.value;
                              setHeroSlideForms(updated);
                            }}
                            className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-serif text-base focus:outline-none focus:border-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                            Subheading / Description
                          </label>
                          <textarea
                            rows={2}
                            value={slide.subhead}
                            onChange={(e) => {
                              const updated = [...heroSlideForms];
                              updated[idx].subhead = e.target.value;
                              setHeroSlideForms(updated);
                            }}
                            className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-light focus:outline-none focus:border-gold"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                            Background Image URL
                          </label>
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => {
                              const updated = [...heroSlideForms];
                              updated[idx].image = e.target.value;
                              setHeroSlideForms(updated);
                            }}
                            className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold mb-2"
                          />
                          <div className="relative h-28 rounded-xl overflow-hidden border border-gold/30">
                            <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                              Primary CTA Label
                            </label>
                            <input
                              type="text"
                              value={slide.ctaPrimary?.text}
                              onChange={(e) => {
                                const updated = [...heroSlideForms];
                                updated[idx].ctaPrimary = { ...updated[idx].ctaPrimary, text: e.target.value };
                                setHeroSlideForms(updated);
                              }}
                              className="w-full bg-obsidian border border-ivory/20 rounded-xl px-3 py-2 text-xs text-ivory focus:outline-none focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                              Primary CTA Link
                            </label>
                            <input
                              type="text"
                              value={slide.ctaPrimary?.href}
                              onChange={(e) => {
                                const updated = [...heroSlideForms];
                                updated[idx].ctaPrimary = { ...updated[idx].ctaPrimary, href: e.target.value };
                                setHeroSlideForms(updated);
                              }}
                              className="w-full bg-obsidian border border-ivory/20 rounded-xl px-3 py-2 text-xs text-gold font-mono focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: CONSULTATIONS & LEADS CMS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'consultations' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    LEAD CAPTURE & INQUIRIES
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Consultation Requests
                  </h1>
                </div>
                <button
                  onClick={handleExportConsultationsCsv}
                  className="px-5 py-2.5 rounded-full bg-obsidian border border-gold text-gold font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-all flex items-center space-x-2 shadow-md shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-charcoal border border-gold/20 rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={consultationSearch}
                    onChange={(e) => setConsultationSearch(e.target.value)}
                    placeholder="Search name, phone, query..."
                    className="w-full bg-obsidian border border-ivory/20 rounded-full py-2.5 px-4 pl-10 text-xs text-ivory focus:outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3" />
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Filter className="w-4 h-4 text-gold shrink-0" />
                  <select
                    value={consultationStatusFilter}
                    onChange={(e) => setConsultationStatusFilter(e.target.value)}
                    className="w-full md:w-auto bg-obsidian border border-ivory/20 rounded-full py-2.5 px-4 text-xs text-gold font-bold focus:outline-none"
                  >
                    <option value="ALL">All Statuses ({consultations.length})</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-charcoal border border-gold/30 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-ivory/80">
                    <thead className="bg-obsidian text-gold uppercase tracking-wider text-[10px] font-bold border-b border-gold/20">
                      <tr>
                        <th className="py-4 px-6">Client Name</th>
                        <th className="py-4 px-6">Contact / Method</th>
                        <th className="py-4 px-6">Preferred Slot</th>
                        <th className="py-4 px-6">Requirement Query</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ivory/10">
                      {filteredConsultations.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-ivory/50">
                            No consultation requests found.
                          </td>
                        </tr>
                      ) : (
                        filteredConsultations.map((c) => (
                          <tr key={c.id} className="hover:bg-obsidian/40 transition-colors">
                            <td className="py-4 px-6 font-semibold text-ivory font-serif text-sm">
                              {c.name}
                              {c.email && (
                                <span className="block text-[10px] text-ivory/50 font-sans font-normal">
                                  {c.email}
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 font-mono text-[11px]">
                              <div className="font-bold text-gold">{c.phone}</div>
                              <div className="text-ivory/50 text-[10px]">{c.preferredContactMethod}</div>
                            </td>
                            <td className="py-4 px-6 font-mono text-[11px]">
                              <div>{c.preferredDate}</div>
                              <div className="text-gold text-[10px]">{c.preferredTime}</div>
                            </td>
                            <td className="py-4 px-6 max-w-xs truncate font-light" title={c.query}>
                              {c.query}
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={c.status}
                                onChange={(e) => {
                                  store.updateConsultationStatus(c.id, e.target.value as any);
                                  showToast(`Status updated to ${e.target.value}`);
                                }}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider focus:outline-none ${
                                  c.status === 'PENDING'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                    : c.status === 'CONFIRMED'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                    : c.status === 'COMPLETED'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                                    : 'bg-red-950 text-red-300 border border-red-500/40'
                                }`}
                              >
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                              </select>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => {
                                  if (confirm(`Delete inquiry for ${c.name}?`)) {
                                    store.deleteConsultation(c.id);
                                    showToast('Inquiry deleted.');
                                  }
                                }}
                                className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 5: SERVICES PAGE CMS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    SERVICES MANAGEMENT
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Interior & Surface Services
                  </h1>
                </div>
                <button
                  onClick={() => {
                    setEditingService(null);
                    setServiceFormData({ title: '', desc: '', badge: 'Popular', iconName: 'Layers' });
                    setIsServiceModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-2 shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-charcoal border border-gold/30 rounded-3xl p-6 space-y-4 shadow-xl hover:border-gold transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider">
                          {srv.badge || 'Service'}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingService(srv);
                              setServiceFormData({ ...srv, badge: srv.badge || 'Popular', iconName: srv.iconName || 'Layers' });
                              setIsServiceModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-obsidian text-gold hover:bg-gold hover:text-charcoal transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete service "${srv.title}"?`)) {
                                store.deleteService(srv.id);
                                showToast(`Service "${srv.title}" deleted.`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-ivory">{srv.title}</h3>
                      <p className="text-xs text-ivory/70 leading-relaxed font-light">{srv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 6: ABOUT US & FOUNDERS CMS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'about' && (
            <form onSubmit={handleSaveAbout} className="space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    ABOUT PAGE CMS
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Brand Story & Co-Founders
                  </h1>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-2 shadow-lg shadow-gold/20 shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save About Content</span>
                </button>
              </div>

              {/* Story Editor */}
              <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <h3 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
                  Brand Narrative & Timeline
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Brand Launch Year
                    </label>
                    <input
                      type="text"
                      value={aboutForm.launchYear}
                      onChange={(e) => setAboutForm({ ...aboutForm, launchYear: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Industry Experience Since
                    </label>
                    <input
                      type="text"
                      value={aboutForm.experienceYear}
                      onChange={(e) => setAboutForm({ ...aboutForm, experienceYear: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                    Main Story Paragraph 1
                  </label>
                  <textarea
                    rows={4}
                    value={aboutForm.storyP1}
                    onChange={(e) => setAboutForm({ ...aboutForm, storyP1: e.target.value })}
                    className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-3 text-xs text-ivory leading-relaxed font-light focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                    Featured Surface Range Highlight
                  </label>
                  <textarea
                    rows={3}
                    value={aboutForm.storyHighlight}
                    onChange={(e) => setAboutForm({ ...aboutForm, storyHighlight: e.target.value })}
                    className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-3 text-xs text-gold leading-relaxed font-light focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Founders Section */}
              <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <h3 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
                  Co-Founders Leadership Profiles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aboutForm.founders.map((founder, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-obsidian border border-gold/20 rounded-2xl p-6 space-y-4 shadow-md"
                    >
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={founder.name}
                          onChange={(e) => {
                            const updated = [...aboutForm.founders];
                            updated[fIdx].name = e.target.value;
                            setAboutForm({ ...aboutForm, founders: updated });
                          }}
                          className="w-full bg-charcoal border border-ivory/20 rounded-xl px-4 py-2 text-xs text-ivory font-serif font-bold focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                          Official Designation
                        </label>
                        <input
                          type="text"
                          value={founder.role}
                          onChange={(e) => {
                            const updated = [...aboutForm.founders];
                            updated[fIdx].role = e.target.value;
                            setAboutForm({ ...aboutForm, founders: updated });
                          }}
                          className="w-full bg-charcoal border border-ivory/20 rounded-xl px-4 py-2 text-xs text-gold focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                          Phone / Contact
                        </label>
                        <input
                          type="text"
                          value={founder.phone}
                          onChange={(e) => {
                            const updated = [...aboutForm.founders];
                            updated[fIdx].phone = e.target.value;
                            setAboutForm({ ...aboutForm, founders: updated });
                          }}
                          className="w-full bg-charcoal border border-ivory/20 rounded-xl px-4 py-2 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                          Executive Bio
                        </label>
                        <textarea
                          rows={2}
                          value={founder.bio}
                          onChange={(e) => {
                            const updated = [...aboutForm.founders];
                            updated[fIdx].bio = e.target.value;
                            setAboutForm({ ...aboutForm, founders: updated });
                          }}
                          className="w-full bg-charcoal border border-ivory/20 rounded-xl px-4 py-2 text-xs text-ivory/80 font-light focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 7: DIGITAL BROCHURE CMS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'brochure' && (
            <form onSubmit={handleSaveBrochure} className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    CATALOGUE & PDF MANAGER
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Digital Brochure Settings
                  </h1>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-2 shadow-lg shadow-gold/20 shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brochure Info</span>
                </button>
              </div>

              <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Brochure Title
                    </label>
                    <input
                      type="text"
                      value={brochureForm.title}
                      onChange={(e) => setBrochureForm({ ...brochureForm, title: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-serif text-base focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Edition Label
                    </label>
                    <input
                      type="text"
                      value={brochureForm.edition}
                      onChange={(e) => setBrochureForm({ ...brochureForm, edition: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-gold font-mono focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Download PDF URL / File Path
                    </label>
                    <input
                      type="text"
                      value={brochureForm.downloadUrl}
                      onChange={(e) => setBrochureForm({ ...brochureForm, downloadUrl: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Subheading / Overview
                    </label>
                    <textarea
                      rows={2}
                      value={brochureForm.subhead}
                      onChange={(e) => setBrochureForm({ ...brochureForm, subhead: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-light focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian/80 border border-gold/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-ivory/70 block">Total Recorded Downloads</span>
                    <span className="font-serif text-2xl font-bold text-gold">{brochureForm.totalDownloads}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBrochureForm({ ...brochureForm, totalDownloads: 0 });
                      store.updateBrochureInfo({ totalDownloads: 0 });
                      showToast('Download counter reset to 0');
                    }}
                    className="px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase"
                  >
                    Reset Count
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 8: GLOBAL SITE SETTINGS & CONTACT CMS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                    SITE CONFIGURATION
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-ivory">
                    Global Contacts & Announcement
                  </h1>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center space-x-2 shadow-lg shadow-gold/20 shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Global Settings</span>
                </button>
              </div>

              {/* Announcement Banner */}
              <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
                      Header Announcement Banner
                    </h3>
                    <p className="text-xs text-ivory/60 font-light">
                      Displays at the very top of all pages across the website.
                    </p>
                  </div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.announcementEnabled}
                      onChange={(e) => setSettingsForm({ ...settingsForm, announcementEnabled: e.target.checked })}
                      className="rounded border-ivory/30 bg-obsidian text-gold focus:ring-gold"
                    />
                    <span className="text-xs font-bold text-gold uppercase">Enabled</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                    Banner Message
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-3 text-xs text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Official Contacts */}
              <div className="bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <h3 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
                  Official Communication Channels
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Official Phone / Hotline
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      WhatsApp Number (with country code)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Atelier / Office City
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                      Google Maps Link
                    </label>
                    <input
                      type="text"
                      value={settingsForm.googleMapsUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsUrl: e.target.value })}
                      className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-gold font-mono focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PRODUCT ADD / EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal border border-gold/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-ivory">
                {editingProduct ? 'Edit Product Finishes' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-ivory/60 hover:text-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.title}
                    onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                    placeholder="e.g. WPC Fluted Louvers"
                    className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                    Category *
                  </label>
                  <select
                    value={productFormData.categoryId}
                    onChange={(e) => setProductFormData({ ...productFormData, categoryId: e.target.value })}
                    className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-gold font-bold focus:outline-none focus:border-gold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={productFormData.sku}
                    onChange={(e) => setProductFormData({ ...productFormData, sku: e.target.value })}
                    placeholder="VAY-WPC-008"
                    className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                    Subcategory / Size
                  </label>
                  <input
                    type="text"
                    value={productFormData.subcategory || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, subcategory: e.target.value })}
                    placeholder="e.g. 17mm or Motorized"
                    className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  placeholder="Waterproof, termite-resistant surface solution designed for luxury interiors..."
                  className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-light focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  value={productFormData.image}
                  onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                  placeholder="/images/pvc-panel.png or https://..."
                  className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-mono focus:outline-none focus:border-gold mb-2"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[10px] text-ivory/50">Quick presets:</span>
                  {[
                    '/images/pvc-panel.png',
                    '/images/wpc-louvers-17mm.png',
                    '/images/charcoal-panel.png',
                    '/images/roller-blind.png',
                    '/images/zebra-blind.png',
                    '/images/curtain.png',
                    '/images/artificial-grass.png',
                    '/images/pvc-plank-flooring.png',
                    '/images/tv-kits.png',
                    '/images/tafan-glass.png',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setProductFormData({ ...productFormData, image: preset })}
                      className="text-[10px] px-2 py-0.5 rounded bg-obsidian border border-gold/30 text-gold hover:bg-gold hover:text-charcoal"
                    >
                      {preset.replace('/images/', '').replace('.png', '')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={productFormData.featured}
                  onChange={(e) => setProductFormData({ ...productFormData, featured: e.target.checked })}
                  className="rounded border-ivory/30 bg-obsidian text-gold focus:ring-gold"
                />
                <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-ivory cursor-pointer">
                  Feature on Homepage Bestsellers
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-ivory/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-obsidian border border-ivory/20 text-xs uppercase font-bold text-ivory/70 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light shadow-lg shadow-gold/20"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SERVICE ADD / EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-charcoal border border-gold/40 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-ivory">
                {editingService ? 'Edit Interior Service' : 'Add New Interior Service'}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1 rounded-full text-ivory/60 hover:text-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceFormData.title}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                  placeholder="e.g. Acoustic Toughened Glass Partitioning"
                  className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                  Service Badge Tag
                </label>
                <input
                  type="text"
                  value={serviceFormData.badge}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, badge: e.target.value })}
                  placeholder="e.g. Popular, Precision, Motorized, Bespoke"
                  className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-gold font-bold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                  Service Scope & Description
                </label>
                <textarea
                  rows={3}
                  value={serviceFormData.desc}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, desc: e.target.value })}
                  placeholder="Certified fitting and customized architectural measurement..."
                  className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-2.5 text-xs text-ivory font-light focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-ivory/10">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-obsidian border border-ivory/20 text-xs uppercase font-bold text-ivory/70 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light shadow-lg shadow-gold/20"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
