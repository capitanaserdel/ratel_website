import React from 'react';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NccModal from '@/components/NccModal';
import Preloader from '@/components/Preloader';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata = {
  title: "Ratel Plus Nigeria Limited | Broadband, Voice & Managed IT Services",
  description: "Ratel Plus is a facilities-based telecommunications service provider based in Nigeria. We offer converged VoIP services, bulk IP transit, backhaul network infrastructure, and professional training.",
  keywords: "Ratel Plus, Telecom Nigeria, VoIP Kano, BroadBand Nigeria, IP Wholesale, Metro Fiber, RatelSIM, Ratel Phone, Dala Container Terminal",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Bootstrap Icons CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        {/* Theme sniffer script to prevent Flash of Unstyled Content (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Preloader />
          <Navbar />
          
          {/* Main page content wrapper */}
          <main style={{ flex: 1 }}>
            {children}
          </main>
          
          <Footer />
          <NccModal />
        </LanguageProvider>

        {/* Zoho SalesIQ Widget Scripts */}
        <Script id="zoho-init" strategy="afterInteractive">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script 
          id="zsiqscript" 
          src="https://salesiq.zohopublic.com/widget?wc=siq10b781083ec7863635b57a327908f1286e8de4e12b168eecd50ba5d936a4f85e" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
