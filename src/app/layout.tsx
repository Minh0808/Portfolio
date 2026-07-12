import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tran Tan Minh | Full Stack Developer",
  description:
    "Portfolio of Tran Tan Minh, a full stack developer building scalable products with React, Next.js, Node.js, and modern backend systems.",
  keywords: [
    "Tran Tan Minh",
    "Full Stack Developer",
    "Next.js portfolio",
    "React developer",
    "Node.js developer",
  ],
  openGraph: {
    title: "Tran Tan Minh | Full Stack Developer",
    description:
      "Building scalable web applications with React, Next.js, Node.js, and modern backend technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tran Tan Minh | Full Stack Developer",
    description:
      "Building scalable web applications with React, Next.js, Node.js, and modern backend technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
