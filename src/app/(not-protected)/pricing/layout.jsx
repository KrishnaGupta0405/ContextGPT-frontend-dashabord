export const metadata = {
  title: "ContextGPT | Pricing",
  description: "Simple, transparent pricing for every team size. Start free, upgrade as you grow. No hidden fees.",
  keywords: ["ContextGPT pricing", "AI chatbot pricing", "chatbot plans", "free chatbot plan"],
  alternates: { canonical: "https://contextgpt.com/pricing" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ContextGPT",
    title: "ContextGPT | Pricing",
    description: "Simple, transparent pricing for every team size. Start free, upgrade as you grow.",
    url: "https://contextgpt.com/pricing",
    images: [{ url: "/icons/Contextgpt_icon.svg", width: 1200, height: 630, alt: "ContextGPT Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextGPT | Pricing",
    description: "Simple, transparent pricing. Start free, upgrade as you grow.",
    images: ["/icons/Contextgpt_icon.svg"],
  },
};

export default function PricingLayout({ children }) {
  return children;
}
