import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SiteChrome from "./components/site-chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Company – Tagline",
  description: "A short description of what your company does.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-[#0a0a0a] text-white`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
