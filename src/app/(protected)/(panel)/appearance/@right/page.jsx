"use client";

import React, { useEffect, useRef } from "react";
import { useChatbot } from "@/context/ChatbotContext";

const AppearanceRight = () => {
  const { selectedChatbot } = useChatbot();
  const chatbotId = selectedChatbot?.chatbotId || selectedChatbot?.id;
  const scriptRef = useRef(null);

  useEffect(() => {
    if (!chatbotId) return;

    // Teardown any previous embedded instance
    const prev = document.getElementById("contextgpt-appearance-script");
    if (prev) prev.remove();
    const prevHost = document.getElementById("contextgpt-appearance-widget");
    if (prevHost) prevHost.remove();

    const script = document.createElement("script");
    script.id = "contextgpt-appearance-script";
    script.type = "module";
    script.src = `https://contextgpt-widget-testing.vercel.app/loader.js?instance=appearance-preview&v=${Date.now()}`;
    script.setAttribute("data-chatbot-id", chatbotId);
    // script.setAttribute("data-server", "http://localhost:9000");
    script.setAttribute("data-mode", "embedded");
    script.setAttribute("data-container", "#contextgpt-appearance-container");
    script.setAttribute("data-instance", "appearance-preview");
    scriptRef.current = script;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById("contextgpt-appearance-script");
      if (s) s.remove();
      const h = document.getElementById("contextgpt-appearance-widget");
      if (h) h.remove();
    };
  }, [chatbotId]);

  if (!chatbotId) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400 text-sm">
        No chatbot selected.
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div
        id="contextgpt-appearance-container"
        className="h-[630px] w-full max-w-[400px] overflow-hidden rounded-2xl border"
      />
    </div>
  );
};

export default AppearanceRight;
