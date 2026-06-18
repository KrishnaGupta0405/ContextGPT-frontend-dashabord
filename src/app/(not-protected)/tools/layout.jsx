import RecaptchaProvider from "@/components/providers/RecaptchaProvider";

export const metadata = {
  title: "ContextGPT | Free AI Tools",
  description: "Free AI tools to help you generate content, convert files, and automate tasks.",
};

export default function ToolsLayout({ children }) {
  return <RecaptchaProvider>{children}</RecaptchaProvider>;
}
