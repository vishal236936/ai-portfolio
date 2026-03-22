import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vishal Yadav — Backend Engineer | GenAI & Serverless",
  description:
    "Backend Engineer with 5+ years building production RAG pipelines, serverless architectures on AWS, and LLM-powered systems. Recently at Arm Holdings.",
  keywords: [
    "Backend Engineer",
    "GenAI",
    "RAG",
    "Pinecone",
    "LangChain",
    "OpenAI",
    "AWS Lambda",
    "Node.js",
    "TypeScript",
    "Serverless",
    "Arm Holdings",
  ],
  authors: [{ name: "Vishal Yadav", url: "https://vishal-portfolio-neon.vercel.app" }],
  creator: "Vishal Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vishal-portfolio-neon.vercel.app",
    title: "Vishal Yadav — Backend Engineer | GenAI & Serverless",
    description:
      "Backend Engineer with 5+ years building production RAG pipelines, serverless architectures on AWS, and LLM-powered systems.",
    siteName: "Vishal Yadav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Yadav — Backend Engineer | GenAI & Serverless",
    description: "RAG · AWS Lambda · Node.js · Pinecone · LangChain · OpenAI · Gemini",
  },
  // ── CRITICAL FOR MOBILE SAFARI ──
  // Prevents Safari from detecting phone numbers and making them blue links
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

// ── CRITICAL FOR MOBILE SAFARI ──
// This sets <meta name="viewport"> correctly
// Without this Safari mobile renders desktop layout at 0.3x scale — nothing works
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,          // prevents double-tap zoom breaking layout
  userScalable: false,      // prevents pinch zoom interfering with drag
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050A0F" },
    { media: "(prefers-color-scheme: light)", color: "#050A0F" },
  ],
  // viewportFit: "cover" makes content go behind iPhone notch/home bar
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Extra Safari mobile fixes */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Preconnect to speed up font/API loading on mobile */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.className} antialiased bg-[#050A0F] text-white`}
        // Prevent iOS elastic scroll bounce showing white background
        style={{ overscrollBehavior: "none" }}
      >
        {children}
      </body>
    </html>
  );
}
