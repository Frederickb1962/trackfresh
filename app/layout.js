import "./globals.css";

export const metadata = { 
  title: "TrackFresh",
  icons: {
    icon: "/icon-v3.png",
    apple: "/icon-v3.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="apple-touch-icon" href="/icon-v3.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#15803d" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
