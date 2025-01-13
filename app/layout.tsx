import Providers from '@components/Providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalan Peace',
  description: 'Digital Garden',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-us" suppressHydrationWarning>
      <body className="theme-light" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
