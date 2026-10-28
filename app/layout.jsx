import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import CustomCursor from "../components/ui/CustomCursor";
import Navbar from "../components/shared/Navbar";
import GlobalBackground from "../components/shared/GlobalBackground";
import SmoothScrollController from "../providers/SmoothScrollController";
import AOSInit from "../providers/AOSInit";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Myriad Arts — Where Tradition Meets Brilliance",
  description: "A premier arts and cultural platform celebrating India's diverse artistic traditions through captivating performances, immersive workshops, and unforgettable live events.",
  icons: {
    icon: "/logos/myriad-arts-logo.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Early connection hints for the media CDN — resolves DNS + TLS without downloading video bytes */}
        <link rel="dns-prefetch" href="https://media.myriadarts.in" />
        <link rel="preconnect" href="https://media.myriadarts.in" crossOrigin="anonymous" />

        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.27/dist/lenis.css" />
      </head>
      <body className="bg-[#050505] text-white font-sans relative isolate min-h-screen">
        <Script
          src="https://unpkg.com/lenis@1.3.27/dist/lenis.min.js"
          strategy="beforeInteractive"
        />
        <Script id="lenis-init" strategy="afterInteractive">
          {`window.lenis = new Lenis({ autoRaf: true, autoToggle: true, anchors: true, allowNestedScroll: true, naiveDimensions: true, stopInertiaOnNavigate: true });`}
        </Script>
        <GlobalBackground />
        <SmoothScrollController>
          <AOSInit />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScrollController>
      </body>
    </html>
  );
}
