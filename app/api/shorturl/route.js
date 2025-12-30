import { NextResponse } from 'next/server';
import dns from 'dns/promises';

// In-memory storage
let urlCounter = 1;
const urlDatabase = new Map(); // short_url -> original_url
const urlToId = new Map(); // original_url -> short_url

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    
    let url;
    
    // Handle both form data and JSON
    if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      url = formData.get('url');
    } else {
      const body = await request.json();
      url = body.url;
    }
    
    if (!url) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Validate URL format
    let urlObj;
    try {
      urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch (err) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Perform DNS lookup (REQUIRED by freeCodeCamp)
    try {
      await dns.lookup(urlObj.hostname);
    } catch (err) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Check if URL already exists
    if (urlToId.has(url)) {
      const short_url = urlToId.get(url);
      return NextResponse.json({
        original_url: url,
        short_url: short_url
      });
    }
    
    // Create new short URL
    const short_url = urlCounter++;
    urlDatabase.set(short_url, url);
    urlToId.set(url, short_url);
    
    return NextResponse.json({
      original_url: url,
      short_url: short_url
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'invalid url' });
  }
}