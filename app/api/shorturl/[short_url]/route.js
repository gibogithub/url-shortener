import { NextResponse } from 'next/server';

// Pre-populate with the example data
const urlDatabase = new Map([
  [1, 'https://www.google.com'],
  [2, 'https://www.github.com'],
  [3, 'https://forum.freecodecamp.org/']
]);

export async function GET(request, { params }) {
  try {
    const { short_url } = await params;
    const shortId = parseInt(short_url);
    
    if (isNaN(shortId)) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    const originalUrl = urlDatabase.get(shortId);
    
    if (!originalUrl) {
      return NextResponse.json({ error: 'invalid url' });
    }
    
    // Redirect with 302 status (temporary redirect)
    return NextResponse.redirect(originalUrl, 302);
    
  } catch (error) {
    return NextResponse.json({ error: 'invalid url' });
  }
}