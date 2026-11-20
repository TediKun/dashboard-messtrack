import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'MessTrack — Modern Dormitory Duty & Fines Dashboard',
  description: 'Sistem otomasi dan transparansi piket mess penghuni dengan antarmuka Bento Grid modern.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="messtrack-theme">
          <SidebarLayout>{children}</SidebarLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
