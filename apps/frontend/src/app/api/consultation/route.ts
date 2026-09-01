import { NextResponse } from 'next/server';

// This route previously implemented direct SMTP sending which duplicates the Express backend implementation.
// To avoid duplicate email configurations and ensure leads are persisted in the central backend, proxy the
// consultation request to the Express API server which is the single source of truth for consultations + email.

const DUPLICATE_WINDOW_MS = 10 * 1000; // 10 seconds
const recentSubmissions = new Map<string, number>(); // small in-memory duplicate prevention

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return /^\d{10}$/.test(digits);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      preferredContactMethod,
      preferredDate,
      preferredTime,
      query,
    } = body || {};

    // Basic validation (same as before) so we can fail early at the edge
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Invalid name' }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || !isValidPhone(phone)) {
      return NextResponse.json({ success: false, error: 'Invalid phone number (expecting 10 digits)' }, { status: 400 });
    }
    if (!preferredContactMethod || typeof preferredContactMethod !== 'string') {
      return NextResponse.json({ success: false, error: 'Preferred contact method is required' }, { status: 400 });
    }
    if (!preferredDate || typeof preferredDate !== 'string') {
      return NextResponse.json({ success: false, error: 'Preferred consultation date is required' }, { status: 400 });
    }
    if (!preferredTime || typeof preferredTime !== 'string') {
      return NextResponse.json({ success: false, error: 'Preferred time slot is required' }, { status: 400 });
    }
    if (!query || typeof query !== 'string' || query.trim().length < 5) {
      return NextResponse.json({ success: false, error: 'Requirement / Project Scope is required' }, { status: 400 });
    }

    // Prevent accidental duplicates within a short window
    const submissionKey = `${name.trim().toLowerCase()}|${phone.replace(/\D/g, '')}`;
    const now = Date.now();
    const last = recentSubmissions.get(submissionKey) || 0;
    if (now - last < DUPLICATE_WINDOW_MS) {
      return NextResponse.json({ success: false, error: 'Duplicate submission detected. Please wait a moment before submitting again.' }, { status: 429 });
    }
    recentSubmissions.set(submissionKey, now);

    // Proxy to Express backend (single source of truth)
    const backendBase = process.env.BACKEND_URL || 'http://127.0.0.1:5000/api';
    const backendUrl = `${backendBase.replace(/\/+$/,'')}/consultation`;

    try {
      console.log('[Consultation Proxy] Forwarding consultation to backend:', backendUrl);
      const proxyRes = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const text = await proxyRes.text();
      let proxyData = null;
      try {
        proxyData = JSON.parse(text);
      } catch (e) {
        proxyData = text;
      }

      if (!proxyRes.ok) {
        const errMsg = proxyData?.error || `Backend returned status ${proxyRes.status}`;
        console.error('[Consultation Proxy] Backend error:', errMsg, 'raw:', proxyData);
        return NextResponse.json({ success: false, error: errMsg || 'Failed to submit consultation' }, { status: proxyRes.status });
      }

      // Success — forward backend response
      return NextResponse.json(proxyData, { status: proxyRes.status });
    } catch (fetchErr: any) {
      console.error('[Consultation Proxy] Error while calling backend:', fetchErr);
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
  } catch (err: any) {
    console.error('[Consultation Proxy] Error while proxying consultation:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

function escapeHtml(unsafe: any) {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
