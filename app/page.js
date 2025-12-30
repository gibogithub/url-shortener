export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        <h1 style={styles.title}>Web URL Shortener</h1>
               
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Generate Short Links</h2>
          <p style={styles.description}>Enter any valid website address</p>
          
          <form action="/api/shorturl" method="POST" style={styles.form}>
            <input
              type="text"
              name="url"
              placeholder="https://www.example.com"
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Create Short Link
            </button>
          </form>
          
          <p style={styles.hint}>Try: https://www.github.com</p>
        </div>
        
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Try Example</h2>
          <div style={styles.example}>
            <a href="/api/shorturl/3" style={styles.link}>
              /api/shorturl/3
            </a>
            <p style={styles.exampleText}>
              Redirects to: https://forum.freecodecamp.org/
            </p>
          </div>
        </div>
        
        <div style={styles.footer}>
          <p>A web project by Guilbert Paz</p>
        </div>
        
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
    width: '100%',
  },
  author: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '30px',
    textAlign: 'center',
    width: '100%',
  },
  section: {
    marginBottom: '30px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#444',
    marginBottom: '15px',
    textAlign: 'center',
    width: '100%',
  },
  description: {
    color: '#666',
    marginBottom: '20px',
    fontSize: '1rem',
    textAlign: 'center',
    width: '100%',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '15px',
    marginBottom: '15px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    textAlign: 'center',
    display: 'block',
  },
  button: {
    width: '100%',
    maxWidth: '400px',
    padding: '15px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
  },
  hint: {
    color: '#888',
    fontSize: '0.9rem',
    marginTop: '15px',
    textAlign: 'center',
    width: '100%',
  },
  example: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    display: 'inline-block',
    padding: '12px 24px',
    background: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    marginBottom: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exampleText: {
    color: '#666',
    fontSize: '0.9rem',
    textAlign: 'center',
    width: '100%',
  },
  footer: {
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    color: '#888',
    fontSize: '0.9rem',
    textAlign: 'center',
    width: '100%',
  },
};