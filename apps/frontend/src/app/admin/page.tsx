'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('vayora_admin_auth');
      if (isAuth) {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/admin/login');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold" />
    </div>
  );
}
