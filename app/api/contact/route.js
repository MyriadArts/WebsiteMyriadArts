import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * Accepts: { name, email, queryType, message }
 * Forwards submission to Google Sheets via Google Apps Script webhook.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, queryType, message } = body || {};

  // ── Server-side validation ──────────────────────────────────────────────
  const cleanName = name?.trim();
  const cleanEmail = email?.trim();
  const cleanQueryType = queryType?.trim();
  const cleanMessage = message?.trim();

  if (!cleanName)      return NextResponse.json({ success: false, error: 'Name is required.'      }, { status: 422 });
  if (!cleanEmail)     return NextResponse.json({ success: false, error: 'Email is required.'     }, { status: 422 });
  if (!cleanQueryType) return NextResponse.json({ success: false, error: 'Query type is required.'}, { status: 422 });
  if (!cleanMessage)   return NextResponse.json({ success: false, error: 'Message is required.'   }, { status: 422 });

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(cleanEmail)) {
    return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 422 });
  }

  const scriptUrl = (process.env.GOOGLE_APPS_SCRIPT_URL || '').trim();

  // If no Google Apps Script URL is set (e.g. local dev / testing), log and return success
  if (!scriptUrl) {
    console.log('[Contact Form - Dev Mode Submission]:', {
      name: cleanName,
      email: cleanEmail,
      queryType: cleanQueryType,
      message: cleanMessage,
      timestamp: new Date().toISOString()
    });
    return NextResponse.json({ 
      success: true, 
      message: 'Submission received successfully (Development Mode).' 
    }, { status: 200 });
  }

  // ── Forward to Google Apps Script ──────────────────────────────────────
  try {
    const payload = JSON.stringify({ 
      name: cleanName, 
      email: cleanEmail, 
      queryType: cleanQueryType, 
      message: cleanMessage 
    });

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: payload,
      redirect: 'follow',
      signal: AbortSignal.timeout(20000)
    });

    const text = await res.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      if (res.ok) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      console.error('[Contact] Failed to parse Google Sheets response:', text);
      return NextResponse.json(
        { success: false, error: 'Invalid response from Google Sheets webhook.' },
        { status: 502 }
      );
    }

    if (!res.ok || result.success === false) {
      console.error('[Contact] Google Sheets error:', result.error || text);
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save submission.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[Contact] Google Sheets webhook error:', err.message);
    return NextResponse.json(
      { success: false, error: 'Unable to reach Google Sheets webhook. Please verify GOOGLE_APPS_SCRIPT_URL.' },
      { status: 502 }
    );
  }
}
