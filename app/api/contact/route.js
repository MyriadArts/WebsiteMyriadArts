import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 *
 * Accepts: { name, email, queryType, message }
 * Handles only Google Sheets storage.
 *
 * Web3Forms is called directly from the browser (client-side) because
 * it validates Origin/Referer and returns HTTP 403 on server-side requests.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, queryType, message } = body;

  // ── Server-side validation ──────────────────────────────────────────────
  if (!name?.trim())      return NextResponse.json({ success: false, error: 'Name is required.'      }, { status: 422 });
  if (!email?.trim())     return NextResponse.json({ success: false, error: 'Email is required.'     }, { status: 422 });
  if (!queryType?.trim()) return NextResponse.json({ success: false, error: 'Query type is required.'}, { status: 422 });
  if (!message?.trim())   return NextResponse.json({ success: false, error: 'Message is required.'   }, { status: 422 });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 422 });
  }

  if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
    console.error('[Contact] GOOGLE_APPS_SCRIPT_URL is not set in .env.local');
    return NextResponse.json({ success: false, error: 'Server configuration error.' }, { status: 500 });
  }

  // ── Google Apps Script → Google Sheet ──────────────────────────────────
  try {
    const res = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, queryType, message }),
    });

    const text = await res.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error('[Contact] Failed to parse Google Sheets response:', text);
      return NextResponse.json(
        { success: false, error: 'Invalid response from server.' },
        { status: 502 }
      );
    }

    if (!res.ok || result.success === false) {
      console.error('[Contact] Google Sheets error:', result.error || text);
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save your submission.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[Contact] Google Sheets fetch failed:', err.message);
    return NextResponse.json(
      { success: false, error: 'Network error saving submission. Please try again.' },
      { status: 502 }
    );
  }
}
