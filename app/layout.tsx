import type { Metadata } from "next";
import { Lexend, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const lexend = Lexend({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OMZ LAB - Independent Creator Platform",
  description: "The ultimate platform for creators to sell courses and digital assets with zero friction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${spaceMono.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
