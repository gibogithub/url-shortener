import { NextResponse } from 'next/server';

// In-memory storage for server
let urlCounter = 3;
const urlMap = new Map([
  [1, 'https://www.google.com'],
  [2, 'https://www.github.com'],
  [3, 'https://forum.freecodecamp.org/']
]);

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;
    
    if (!url) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Simple URL validation
    const urlPattern = /^https?:\/\/\S+\.\S+/;
    if (!urlPattern.test(url)) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Check if URL already exists
    let shortId;
    for (const [id, originalUrl] of urlMap.entries()) {
      if (originalUrl === url) {
        shortId = id;
        break;
      }
    }
    
    // If not found, create new
    if (!shortId) {
      urlCounter++;
      shortId = urlCounter;
      urlMap.set(shortId, url);
    }
    
    return NextResponse.json({
      original_url: url,
      short_url: shortId
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'invalid url' });
  }
}