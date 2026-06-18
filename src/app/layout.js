import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://contextgpt.com"),
  title: {
    default: "ContextGPT | AI Chatbot for Your Website",
    template: "%s | ContextGPT",
  },
  description: "Turn your website into an AI-powered chatbot in minutes. Train on your content, capture leads, and answer questions 24/7 — no coding required.",
  keywords: ["AI chatbot", "website chatbot", "customer support AI", "lead generation chatbot", "no-code chatbot"],
  authors: [{ name: "ContextGPT", url: "https://contextgpt.com" }],
  creator: "ContextGPT",
  publisher: "ContextGPT",
  icons: {
    icon: "/icons/Contextgpt_icon_website_topbar.png",
    shortcut: "/icons/Contextgpt_icon_website_topbar.png",
    apple: "/icons/Contextgpt_icon_website_topbar.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ContextGPT",
    title: "ContextGPT | AI Chatbot for Your Website",
    description: "Turn your website into an AI-powered chatbot in minutes. Train on your content, capture leads, and answer questions 24/7 — no coding required.",
    images: [{ url: "/icons/Contextgpt_icon.svg", width: 1200, height: 630, alt: "ContextGPT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextGPT | AI Chatbot for Your Website",
    description: "Turn your website into an AI-powered chatbot in minutes. Train on your content, capture leads, and answer questions 24/7 — no coding required.",
    images: ["/icons/Contextgpt_icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

import { AuthProvider } from "@/context/AuthContext";
import SessionClearer from "@/components/SessionClearer";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ContextGPT",
  url: "https://contextgpt.com",
  logo: "https://contextgpt.com/icons/Contextgpt_icon.svg",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://contextgpt.com/contact",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SessionClearer />
        <AuthProvider>
          <TooltipProvider>
            {/* <NavigationMenuDemo /> */}
            {children}
            <Toaster position="bottom-right" richColors />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
