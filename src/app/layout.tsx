import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideOnAdmin from "@/components/HideOnAdmin";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Set in .env.local / hosting env, e.g. NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// Public site origin, used to build absolute canonical and social-share URLs.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: "Bridgemead Advisory | Productivity and Performance Firm",
  description: "Bridgemead Advisory is a productivity and performance firm in Lagos. We find where performance is being lost inside your workforce, build the systems that fix it, and operate the people machinery on your behalf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <HideOnAdmin><Navbar /></HideOnAdmin>
        <main>
          {children}
        </main>
        <HideOnAdmin><Footer /></HideOnAdmin>
        {GA_ID && <HideOnAdmin><GoogleAnalytics gaId={GA_ID} /></HideOnAdmin>}
      </body>
    </html>
  );
}
