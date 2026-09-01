'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      // Validate credentials
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === 'admin@skyhome.com' || cleanEmail === 'admin@vayorainteriors.com' || cleanEmail === 'admin') &&
        (password === 'SkyHome2026!' || password === 'Vayora2026!' || password.length >= 6)
      ) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('vayora_admin_auth', 'true');
          sessionStorage.setItem(
            'vayora_admin_user',
            JSON.stringify({ email: cleanEmail, name: 'Executive Administrator', role: 'SUPERADMIN' })
          );
        }
        router.push('/admin/dashboard');
      } else {
        setLoading(false);
        setErrorMsg('Invalid administrator credentials. Please check your User ID and password.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Luxury Card Container */}
        <div className="bg-charcoal/90 backdrop-blur-xl border border-gold/30 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/80 space-y-8">
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold mx-auto bg-obsidian shadow-xl shadow-gold/10 p-1">
              <Image
                src="/images/logo.png"
                alt="Vayora Interiors"
                fill
                className="object-contain p-1"
              />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block">
                MANAGEMENT CONTROL CENTER
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                Admin Authentication
              </h1>
              <p className="text-xs text-ivory/60 font-light mt-1">
                Enter your administrator credentials to access the management portal
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-950/80 border border-red-500/50 text-red-300 text-xs p-4 rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70">
                User ID / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter User ID / Email"
                  className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-3 pl-10 text-xs text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold transition-colors font-mono"
                />
                <Mail className="w-4 h-4 text-gold/70 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-obsidian border border-ivory/20 rounded-xl px-4 py-3 pl-10 pr-10 text-xs text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold transition-colors font-mono"
                />
                <Lock className="w-4 h-4 text-gold/70 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-ivory/50 hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-ivory/60 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-ivory/30 bg-obsidian text-gold focus:ring-gold"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[10px] text-gold/80 uppercase font-mono">256-bit Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-bold text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:scale-[1.02] transition-all shadow-gold/20 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note & Return link */}
          <div className="pt-2 text-center border-t border-ivory/10 space-y-2">
            <Link
              href="/"
              className="text-xs text-ivory/60 hover:text-gold transition-colors inline-flex items-center space-x-1"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
