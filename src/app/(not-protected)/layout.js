import NavigationMenuDemo from "@/components/navbar";
import Footer from "@/components/footer/Footer";
import ChatbotWidget from "@/components/chatbot-widget";
import "./not-protected.css";

export default function NotProtectedLayout({ children }) {
  return (
    <div className="not-protected-layout">
      <NavigationMenuDemo />
      {children}
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
