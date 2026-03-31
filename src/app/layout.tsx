import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CountryHomeProvider } from "@/context/CountryContextHome";
import { AllCountryProvider } from "@/context/AllCountryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World University",
  description: "World University Page",
  icons: {
    icon: "https://res.cloudinary.com/dgnnshujm/image/upload/v1774957376/world-bank-logo-png_seeklogo-209082_pnat6n.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AllCountryProvider>
          <CountryHomeProvider>{children}</CountryHomeProvider>
        </AllCountryProvider>
      </body>
    </html>
  );
}
