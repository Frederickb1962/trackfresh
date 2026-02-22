import "./globals.css";

export const metadata = { 
  title: "TrackFresh" 
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
