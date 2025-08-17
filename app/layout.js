import './globals.css';

export const metadata = {
  title: 'Health & Fitness Tips',
  description: 'Daily tips for a healthier life - Multilingual SEO-optimized blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}