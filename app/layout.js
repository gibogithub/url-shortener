export const metadata = {
  title: 'URL Shortening Service | Web Utility',
  description: 'A free URL shortening microservice for developers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.freecodecamp.org/universal/favicons/favicon-16x16.png"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}