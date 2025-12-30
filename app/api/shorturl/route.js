import { NextResponse } from 'next/server';
import dns from 'dns/promises';

// In-memory storage (Vercel serverless - resets between invocations)
let urlCounter = 3; // Start at 3 to match example
const urlDatabase = new Map([
  [1, 'https://www.google.com'],
  [2, 'https://www.github.com'],
  [3, 'https://forum.freecodecamp.org/']
]);
const urlToId = new Map([
  ['https://www.google.com', 1],
  ['https://www.github.com', 2],
  ['https://forum.freecodecamp.org/', 3]
]);

export async function POST(request) {
  try {
    // Handle both form data and JSON
    const contentType = request.headers.get('content-type') || '';
    let url;
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      url = formData.get('url');
    } else {
      const body = await request.json();
      url = body.url;
    }
    
    if (!url) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Validate URL
    let urlObj;
    try {
      urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // DNS lookup (REQUIRED for tests)
    try {
      await dns.lookup(urlObj.hostname);
    } catch {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Check if exists
    if (urlToId.has(url)) {
      return NextResponse.json({
        original_url: url,
        short_url: urlToId.get(url)
      });
    }
    
    // Create new
    const short_url = ++urlCounter;
    urlDatabase.set(short_url, url);
    urlToId.set(url, short_url);
    
    return NextResponse.json({
      original_url: url,
      short_url: short_url
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'invalid url' });
  }
}