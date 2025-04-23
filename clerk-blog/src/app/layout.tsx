import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@contexts/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { NavigationBar } from "@components/layout/navigation-bar/navigation-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clerk Blog",
  description: "Criado por Anderson Kaiti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en" className="dark">
          <body
            className={`${geistSans.variable} ${geistMono.variable} bg-black antialiased`}
          >
            <NavigationBar />
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
