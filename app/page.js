'use client';

import { useState, useEffect } from 'react';

// Simple in-memory storage (will reset on server restart)
let urlCounter = 3; // Start at 3 to match the example
const urlMap = new Map([
  [1, 'https://www.google.com'],
  [2, 'https://www.github.com'],
  [3, 'https://forum.freecodecamp.org/']
]);

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // This only runs on client side
    setBaseUrl(window.location.origin);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple URL validation
    const urlPattern = /^https?:\/\/\S+\.\S+/;
    if (!urlPattern.test(url)) {
      setResult({ error: 'invalid url' });
      return;
    }
    
    // Check if URL already exists
    let shortId;
    for (const [id, originalUrl] of urlMap.entries()) {
      if (originalUrl === url) {
        shortId = id;
        break;
      }
    }
    
    // If not found, create new short URL
    if (!shortId) {
      urlCounter++;
      shortId = urlCounter;
      urlMap.set(shortId, url);
    }
    
    setResult({
      original_url: url,
      short_url: shortId
    });
  };

  return (
    <div style={styles.container}>
      <h1>URL Shortener Microservice</h1>
      
      <section style={styles.section}>
        <h2>Short URL Creation</h2>
        <p>Example: POST [project_url]/api/shorturl - https://www.google.com</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>POST URL</button>
        </form>
      </section>
      
      {result && (
        <section style={styles.section}>
          <h3>Result:</h3>
          <pre style={styles.result}>
            {JSON.stringify(result, null, 2)}
          </pre>
          {!result.error && (
            <div>
              <p>
                <a href={`/api/shorturl/${result.short_url}`}>
                  /api/shorturl/{result.short_url}
                </a>
              </p>
              <p>Will redirect to: {result.original_url}</p>
            </div>
          )}
        </section>
      )}
      
      <section style={styles.section}>
        <h3>Example Usage:</h3>
        <div>
          <p>
            <a href="/api/shorturl/3">
              {baseUrl ? `${baseUrl}/api/shorturl/3` : '/api/shorturl/3'}
            </a>
          </p>
          <p>Will redirect to: https://forum.freecodecamp.org/</p>
        </div>
      </section>
      
      <footer style={styles.footer}>
        <p>By freeCodeCamp</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  section: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '5px'
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  result: {
    backgroundColor: '#eee',
    padding: '10px',
    borderRadius: '4px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    color: '#666'
  }
};