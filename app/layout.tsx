import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zentik - Notifications on iOS',
  description:
    'Zentik brings your notifications to iPhone, iPad and Apple Watch. Self-hostable, rich alerts and widgets — built to use the full iOS experience.',
  icons: { icon: '/favicon.ico' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <div className="flex flex-1 flex-col min-h-screen">
            {children}
          </div>
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
