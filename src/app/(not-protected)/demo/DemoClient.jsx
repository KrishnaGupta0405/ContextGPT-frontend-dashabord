"use client";

import Script from "next/script";

const DemoClient = () => {
  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-4 items-center">

          {/* Left Side Content */}
          <div className="flex flex-col text-left max-w-xl mx-auto lg:mx-0">
            <span className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
              Live Demo
            </span>
            <p className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-[4rem] leading-tight mb-4">
              See for yourself.
            </p>
            <p className="text-xl text-slate-600">
              Ask the ContextGPT chatbot a question about itself.
            </p>
          </div>

          {/* Right Side — Embedded Chatbot */}
          <div className="flex justify-center lg:justify-center w-full">
            <div
              id="contextgpt-demo-container"
              className="h-[630px] w-full max-w-[500px] overflow-hidden rounded-3xl border-2 border-blue-400"
            />
          </div>

        </div>
      </div>

      <Script
        src="https://contextgpt-widget-testing.vercel.app/loader.js?instance=embedded-demo"
        data-chatbot-id="27df3d37-8395-4d1f-a084-5609237ae367"
        // data-server="http://localhost:9000"
        data-mode="embedded"
        data-container="#contextgpt-demo-container"
        data-instance="embedded-demo"
        strategy="afterInteractive"
        type="module"
      />
    </div>
  );
};

export default DemoClient;
