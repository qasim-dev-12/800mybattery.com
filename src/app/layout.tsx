"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HangingCTA from "@/components/Common/HangingCTA";
import ScrollToTop from "@/components/ScrollToTop";
import { Poppins } from "next/font/google";
import "../styles/index.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-NCVW64X2" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  (function () {
    document.addEventListener('click', function (e) {
      if (e.target.closest('a[href^="tel:"]')) {
        gtag('event', 'conversion', { 'send_to': 'AW-18541075580/rGKwCLmmkbsdEPy4iYlF' });
        CG.conversion();
        initCCConvertion();
      }
    });
  })();
`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  (function () {
    document.addEventListener('click', function (e) {
      if (e.target.closest('a[href^="https://wa.me/"]')) {
        gtag('event', 'conversion', { 'send_to': 'AW-18541075580/7VJGCPqJibsdEPy4iYlF' });
        CG.conversion();
        initCCConvertion();
      }
    });
  })();
`,
          }}
        />
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${poppins.className}`}>
        <Providers>
          <div className="isolate">
            <Header />
            {children}
            <Footer />
          </div>
          <HangingCTA />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

