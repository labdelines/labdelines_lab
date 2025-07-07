import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sora } from "next/font/google";

import logo from "@/app/favicon.ico";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LABDELINES",
  description: "Co-working Space",
  icon: logo,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
