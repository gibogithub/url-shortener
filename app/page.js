'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    try {
      const response = await fetch('/api/shorturl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Failed to process URL' });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>URL Shortening Service</h1>
        <p className="subtitle">A developer utility for creating short URLs</p>
      </header>
      
      <main className="main-content">
        <section className="input-section">
          <h2>Create Short URL</h2>
          <p className="instruction">
            Submit a valid URL via POST request to receive a shortened version.
          </p>
          
          <form className="url-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="url_input" className="form-label">
                Website Address
              </label>
              <input
                id="url_input"
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a valid http:// or https:// URL"
                className="url-input"
              />
              <button type="submit" className="submit-btn">
                Generate Short URL
              </button>
            </div>
          </form>
          
          <div className="api-example">
            <h3>API Example</h3>
            <pre className="code-block">
{`POST /api/shorturl
Content-Type: application/json

{"url": "https://www.example.com"}`}
            </pre>
          </div>
        </section>
        
        {result && (
          <section className="result-section">
            <h3>Response</h3>
            <div className="result-box">
              <pre className="result-json">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
            {!result.error && result.short_url && (
              <div className="usage-info">
                <p>
                  <strong>Your shortened URL:</strong>{' '}
                  <a href={`/api/shorturl/${result.short_url}`} className="short-link">
                    /api/shorturl/{result.short_url}
                  </a>
                </p>
                <p className="redirect-info">
                  This link will redirect to: {result.original_url}
                </p>
              </div>
            )}
          </section>
        )}
        
        <section className="demo-section">
          <h2>Try It Out</h2>
          <div className="demo-example">
            <p>
              Visit this demo link:{' '}
              <a href="/api/shorturl/3" className="demo-link">
                /api/shorturl/3
              </a>
            </p>
            <p className="demo-redirect">
              → Will redirect to: https://forum.freecodecamp.org/
            </p>
          </div>
        </section>
        
        <section className="specs-section">
          <h2>Technical Specifications</h2>
          <ul className="specs-list">
            <li>POST <code>/api/shorturl</code> with a JSON body containing a &quot;url&quot; property</li>
            <li>Returns JSON with <code>original_url</code> and <code>short_url</code> properties</li>
            <li>GET <code>/api/shorturl/&lt;id&gt;</code> redirects to the original URL</li>
            <li>Invalid URLs return <code>&#123; error: &apos;invalid url&apos; &#125;</code></li>
            <li>All URLs are validated with DNS lookup</li>
          </ul>
        </section>
      </main>
      
      <footer className="footer">
        <p>Developed as a learning project</p>
        <p className="acknowledgment">
          Inspired by freeCodeCamp curriculum
        </p>
      </footer>
    </div>
  );
}