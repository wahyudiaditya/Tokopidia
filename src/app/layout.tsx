"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en" className="scrollbar-hide scroll-smooth">
      <head>
        <link rel="icon" href="/img/tokopidia-logo.png" />
      </head>
      <body>
        {!isAuthPage && <Navbar />}
        {children}
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
