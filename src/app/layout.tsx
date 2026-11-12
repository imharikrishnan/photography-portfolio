import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harikrishnan Nandanan — Photography · Travel · Visual Stories",
  description:
    "Personal photography archive of Harikrishnan Nandanan — exploring landscapes, travel journeys, city streets, and quiet everyday moments with the Canon EOS R6 Mark III.",
  keywords: [
    "Harikrishnan Nandanan",
    "Photography",
    "Travel",
    "Visual Stories",
    "Canon EOS R6 Mark III",
    "Landscapes",
    "Street Photography",
    "Nature",
  ],
  authors: [{ name: "Harikrishnan Nandanan" }],
  openGraph: {
    title: "Harikrishnan Nandanan — Photography · Travel · Visual Stories",
    description:
      "Personal photography archive of Harikrishnan Nandanan — exploring landscapes, travel journeys, city streets, and quiet everyday moments.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#08080a] text-[#f4f2ec] selection:bg-[#f4f2ec] selection:text-[#08080a] relative">
        {/* Subtle persistent film grain overlay */}
        <div
          className="film-grain fixed inset-0 pointer-events-none z-50 opacity-30"
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
