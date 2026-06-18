import Script from "next/script";
import NavigationMenuDemo from "@/components/navbar";
import Footer from "@/components/footer/Footer";
import "./not-protected.css";

export default function NotProtectedLayout({ children }) {
  return (
    <div className="not-protected-layout">
      <NavigationMenuDemo />
      {children}
      <Footer />
      <Script
        src="https://contextgpt-widget-testing.vercel.app/loader.js?instance=floating&chatbotId=27df3d37-8395-4d1f-a084-5609237ae367&server=http%3A%2F%2Flocalhost%3A9000"
        data-chatbot-id="27df3d37-8395-4d1f-a084-5609237ae367"
        data-server="http://localhost:9000"
        data-instance="floating"
        strategy="afterInteractive"
        type="module"
      />
    </div>
  );
}
