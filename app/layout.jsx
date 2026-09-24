import "./globals.css";
import { Inter } from "next/font/google";
import CustomCursor from "../components/ui/CustomCursor";
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

import Navbar from "../components/shared/Navbar";
import GlobalBackground from "../components/shared/GlobalBackground";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preload"
          as="video"
          href="https://media.myriadarts.in/splash/splash-intro.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="https://media.myriadarts.in/home/hero-background.mp4?v=3"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="https://media.myriadarts.in/home/about_herovideo.mp4?v=3"
          type="video/mp4"
        />

        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#050505] text-white font-sans relative isolate min-h-screen">
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
