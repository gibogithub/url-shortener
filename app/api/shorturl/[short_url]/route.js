import { NextResponse } from 'next/server';

// Same in-memory storage
const urlMap = new Map([
  [1, 'https://www.google.com'],
  [2, 'https://www.github.com'],
  [3, 'https://forum.freecodecamp.org/']
]);

export async function GET(request, { params }) {
  try {
    const { short_url } = await params;
    const shortId = parseInt(short_url);
    
    if (isNaN(shortId)) {
      return NextResponse.json(
        { error: 'invalid url' },
        { status: 400 }
      );
    }
    
    const originalUrl = urlMap.get(shortId);
    
    if (!originalUrl) {
      return NextResponse.json(
        { error: 'No short URL found for the given input' },
        { status: 404 }
      );
    }
    
    // Redirect to original URL
    return NextResponse.redirect(originalUrl);
    
  } catch (error) {
    return NextResponse.json(
      { error: 'invalid url' },
      { status: 400 }
    );
  }
}