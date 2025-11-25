import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Mr.M | Full-Stack Developer & UI Engineer",
  description: "High-performance web experiences. Next.js, React, TypeScript specialist. Crafting digital precision with meticulous attention to detail.",
  keywords: ["Next.js", "React", "TypeScript", "Web Developer", "UI Engineer", "Full Stack", "Design Systems"],
  authors: [{ name: "Mr.M" }],
  creator: "Mr.M",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mrm.dev",
    title: "Mr.M | Full-Stack Developer",
    description: "Building high-performance web experiences with precision and creativity.",
    images: [
      {
        url: "https://mrm.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mr.M Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr.M | Full-Stack Developer",
    description: "High-performance web experiences built with precision.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://mrm.dev",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/20 selection:text-indigo-300`}>
        {children}
      </body>
    </html>
  );
}