import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideOnAdmin from "@/components/HideOnAdmin";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
      </body>
    </html>
  );
}
