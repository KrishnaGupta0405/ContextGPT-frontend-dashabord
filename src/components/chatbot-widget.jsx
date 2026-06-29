"use client";

import { useEffect } from "react";

export default function ChatbotWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://contextgpt-widget-testing.vercel.app/loader.js?instance=floating";
    script.setAttribute("data-chatbot-id", "27df3d37-8395-4d1f-a084-5609237ae367");
    if (process.env.NEXT_PUBLIC_ENV === "development") script.setAttribute("data-server", "http://localhost:9000");
    script.setAttribute("data-instance", "floating");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
